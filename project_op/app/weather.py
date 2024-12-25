import httpx

API_KEY = '7cf04ab4aae387708bf059e52db99cf8'

async def get_weather_async(latitude: float, longitude: float):
    url = f"http://api.openweathermap.org/data/2.5/weather?lat={latitude}&lon={longitude}&appid={API_KEY}&units=metric&lang=ru"
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url)
            response.raise_for_status()
            weather_data = response.json()
            has_rain = any(item["main"] == "Rain" for item in weather_data["weather"])
            weather_info = {
                "Температура воздуха": round(weather_data["main"]["temp"]),
                "Описание": weather_data["weather"][0]["description"],
                "Город": weather_data["name"],
                "Страна": weather_data["sys"]["country"],
                "Есть дождь": "Да" if has_rain else "Нет",
                "Сообщение": "Следует взять зонт!" if has_rain else "Сегодня зонт не нужен :)",
                "Уведомление": "Отправляется" if has_rain else "Не отправляется"
            }
            return weather_info
        except httpx.HTTPStatusError as http_err:
            return {"error": f"HTTP error occurred: {http_err.response.status_code}"}
        except Exception as err:
            return {"error": f"An error occurred: {err}"}