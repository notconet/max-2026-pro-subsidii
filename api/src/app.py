from fastapi import FastAPI

app = FastAPI()


@app.get("/ping")
async def pong():
    return "pong"


@app.get("/svaga")
async def on_svaga():
    return "goida"
