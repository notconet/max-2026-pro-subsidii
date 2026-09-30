from contextlib import asynccontextmanager
import os
from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException
from pydantic import BaseModel, ConfigDict, Field, HttpUrl
from sqlalchemy import Column, ForeignKey, String, Table, Text, select
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship, selectinload


DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+asyncpg://subsidii:subsidii@localhost:5432/subsidii",
)


class Base(DeclarativeBase):
    pass


subsidy_sectors = Table(
    "subsidy_sectors",
    Base.metadata,
    Column("subsidy_id", ForeignKey("subsidies.id", ondelete="CASCADE"), primary_key=True),
    Column("sector_id", ForeignKey("sectors.id", ondelete="CASCADE"), primary_key=True),
)
subsidy_regions = Table(
    "subsidy_regions",
    Base.metadata,
    Column("subsidy_id", ForeignKey("subsidies.id", ondelete="CASCADE"), primary_key=True),
    Column("region_id", ForeignKey("regions.id", ondelete="CASCADE"), primary_key=True),
)
subsidy_statuses = Table(
    "subsidy_statuses",
    Base.metadata,
    Column("subsidy_id", ForeignKey("subsidies.id", ondelete="CASCADE"), primary_key=True),
    Column("status_id", ForeignKey("statuses.id", ondelete="CASCADE"), primary_key=True),
)
subsidy_goals = Table(
    "subsidy_goals",
    Base.metadata,
    Column("subsidy_id", ForeignKey("subsidies.id", ondelete="CASCADE"), primary_key=True),
    Column("goal_id", ForeignKey("goals.id", ondelete="CASCADE"), primary_key=True),
)


class DirectoryItem(Base):
    __abstract__ = True
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(255))


class Sector(DirectoryItem):
    __tablename__ = "sectors"


class Region(DirectoryItem):
    __tablename__ = "regions"


class SubsidyStatus(DirectoryItem):
    __tablename__ = "statuses"


class Goal(DirectoryItem):
    __tablename__ = "goals"


class Subsidy(Base):
    __tablename__ = "subsidies"
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(500))
    description: Mapped[str] = mapped_column(Text)
    sum: Mapped[int] = mapped_column()
    months: Mapped[int] = mapped_column()
    checklist_url: Mapped[str] = mapped_column(String(2048))
    sectors: Mapped[list[Sector]] = relationship(secondary=subsidy_sectors, lazy="selectin")
    regions: Mapped[list[Region]] = relationship(secondary=subsidy_regions, lazy="selectin")
    statuses: Mapped[list[SubsidyStatus]] = relationship(secondary=subsidy_statuses, lazy="selectin")
    goals: Mapped[list[Goal]] = relationship(secondary=subsidy_goals, lazy="selectin")


class DirectoryInfo(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    title: str


class SubsidyInfo(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    title: str
    description: str
    sum: int
    months: int
    sectors: list[DirectoryInfo]
    regions: list[DirectoryInfo]
    statuses: list[DirectoryInfo]
    goals: list[DirectoryInfo]
    checklist_url: str


class DirectoryCreate(BaseModel):
    title: str = Field(min_length=1, max_length=255)


class SubsidyCreate(BaseModel):
    title: str
    description: str
    sum: int = Field(ge=0)
    months: int = Field(ge=0)
    sectors: list[int] = Field(default_factory=list)
    regions: list[int] = Field(default_factory=list)
    statuses: list[int] = Field(default_factory=list)
    goals: list[int] = Field(default_factory=list)
    checklist_url: HttpUrl


class SearchItem(BaseModel):
    sector: int | None = None
    region: int | None = None
    status: int | None = None
    goal: int | None = None


engine = create_async_engine(DATABASE_URL, pool_pre_ping=True)
session_factory = async_sessionmaker(engine, expire_on_commit=False)


@asynccontextmanager
async def lifespan(_: FastAPI):
    async with engine.begin() as connection:
        await connection.run_sync(Base.metadata.create_all)
    yield
    await engine.dispose()


app = FastAPI(title="ПРО Субсидии API", lifespan=lifespan)


async def get_session():
    async with session_factory() as session:
        yield session


Session = Annotated[AsyncSession, Depends(get_session)]


async def load_subsidy(session: AsyncSession, subsidy_id: int) -> Subsidy:
    result = await session.execute(
        select(Subsidy)
        .options(
            selectinload(Subsidy.sectors),
            selectinload(Subsidy.regions),
            selectinload(Subsidy.statuses),
            selectinload(Subsidy.goals),
        )
        .where(Subsidy.id == subsidy_id)
    )
    subsidy = result.scalar_one_or_none()
    if subsidy is None:
        raise HTTPException(status_code=404, detail="Subsidy not found")
    return subsidy


@app.get("/ping")
async def pong():
    return "pong"


@app.post("/subsidies/search", response_model=dict[str, list[SubsidyInfo]])
async def search_subsidies(search_item: SearchItem, session: Session):
    query = select(Subsidy).options(
        selectinload(Subsidy.sectors),
        selectinload(Subsidy.regions),
        selectinload(Subsidy.statuses),
        selectinload(Subsidy.goals),
    )
    if search_item.sector is not None:
        query = query.where(Subsidy.sectors.any(Sector.id == search_item.sector))
    if search_item.region is not None:
        query = query.where(Subsidy.regions.any(Region.id == search_item.region))
    if search_item.status is not None:
        query = query.where(Subsidy.statuses.any(SubsidyStatus.id == search_item.status))
    if search_item.goal is not None:
        query = query.where(Subsidy.goals.any(Goal.id == search_item.goal))

    result = await session.execute(query.order_by(Subsidy.id))
    return {"subsidii": result.scalars().all()}


@app.get("/subsidies/{subsidy_id}", response_model=SubsidyInfo)
async def get_subsidy(subsidy_id: int, session: Session):
    return await load_subsidy(session, subsidy_id)


@app.post("/directories/{directory}", response_model=DirectoryInfo, status_code=201)
async def create_directory(directory: str, payload: DirectoryCreate, session: Session):
    directory_types: dict[str, type[DirectoryItem]] = {
        "sectors": Sector,
        "regions": Region,
        "statuses": SubsidyStatus,
        "goals": Goal,
    }
    model = directory_types[directory]
    item = model(title=payload.title)
    session.add(item)
    await session.commit()
    await session.refresh(item)
    return item


@app.post("/subsidies", response_model=SubsidyInfo, status_code=201)
async def create_subsidy(payload: SubsidyCreate, session: Session):
    models = {Sector: payload.sectors, Region: payload.regions, SubsidyStatus: payload.statuses, Goal: payload.goals}
    directories: dict[type[DirectoryItem], dict[int, DirectoryItem]] = {}
    for model, ids in models.items():
        result = await session.execute(select(model).where(model.id.in_(ids)))
        items = {item.id: item for item in result.scalars()}
        if len(items) != len(set(ids)):
            raise HTTPException(status_code=400, detail="Unknown directory item")
        directories[model] = items
    subsidy = Subsidy(
        title=payload.title,
        description=payload.description,
        sum=payload.sum,
        months=payload.months,
        checklist_url=str(payload.checklist_url),
        sectors=list(directories[Sector].values()),
        regions=list(directories[Region].values()),
        statuses=list(directories[SubsidyStatus].values()),
        goals=list(directories[Goal].values()),
    )
    session.add(subsidy)
    await session.commit()
    return await load_subsidy(session, subsidy.id)
