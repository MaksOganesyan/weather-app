from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import uvicorn
from fastapi.responses import JSONResponse
from weather import get_weather_async  # Импортируйте вашу функцию
import os

# Создаем объект приложения FastAPI
app = FastAPI()

# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Можно заменить на список разрешенных доменов
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Эндпоинт для получения погоды
@app.get("/weather")
async def get_weather(lat: float, lon: float):
    # Проверка допустимости координат
    if not (-90 <= lat <= 90):
        raise HTTPException(status_code=400, detail="Широта должна быть в диапазоне от -90 до 90")
    if not (-180 <= lon <= 180):
        raise HTTPException(status_code=400, detail="Долгота должна быть в диапазоне от -180 до 180")

    weather_info = await get_weather_async(lat, lon)
    if "error" in weather_info:
        return JSONResponse(status_code=400, content=weather_info)
    return weather_info

# Определяем директорию текущего файла
image_directory = os.path.dirname(os.path.abspath(__file__))

# Указываем путь к папке с изображениями
static_directory = os.path.join(image_directory, "static")

# Проверяем, существует ли директория
if not os.path.exists(static_directory):
    raise RuntimeError(f"Static directory '{static_directory}' does not exist")

# Монтируем папку с изображениями в FastAPI
app.mount("/project_op", StaticFiles(directory=static_directory), name="project_op")

# Запуск сервера
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
