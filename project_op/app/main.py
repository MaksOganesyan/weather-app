#### 1. app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import routes  # Импортируем маршруты
import uvicorn
import json

app = FastAPI()

# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Подключение маршрутов
app.include_router(routes.router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)