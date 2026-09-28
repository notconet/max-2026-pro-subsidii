# ПРО Субсидии
MAX приложение для помощи в поисках субсидий.

## Архитектура

Проект поделен на 3 части:
- [`bot`](bot): MAX бот, точка входа.
- [`web`](web): WebApp на React.
- [`api`](api): API на FastAPI.


## Запуск
#### Подготовка окружения
```bash
# Скопировать и заполнить переменные в .env
cp .env.example .env
```
#### При локальной разработке:
- Запуск всех компонентов
```bash
docker compose up --build
```

#### При выгрузке в продакшн:
- Запуск только api и bot
- Сборка фронтенда в статические файлы
```bash
# 1. Запуск api и bot
docker compose --file prod.docker-compose.yaml up --build -d

# 2. Сборка фронтенда
cd web
pnpm install
pnpm build  # -> web/dist
```