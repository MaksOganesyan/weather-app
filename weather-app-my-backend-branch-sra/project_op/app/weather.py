import httpx

API_KEY = '7cf04ab4aae387708bf059e52db99cf8'

async def get_weather_async(latitude: float, longitude: float):
    url = f"http://api.openweathermap.org/data/2.5/weather?lat={latitude}&lon={longitude}&appid={API_KEY}&units=metric&lang=ru"
    
    async with httpx.AsyncClient() as client:
        try:
            # Выполняем асинхронный GET-запрос
            response = await client.get(url)
            
            # Проверка успешного ответа (status code 2xx)
            response.raise_for_status()
            
            # Парсим JSON-ответ
            weather_data = response.json()

            # Проверка наличия необходимых данных в ответе
            if 'weather' not in weather_data or 'main' not in weather_data:
                return {"error": "Invalid response structure from the weather API"}

            # Получаем описание погоды и проверку на дождь
            description = weather_data['weather'][0].get("description", "Нет описания")
            has_rain = any(item["main"] == "Rain" for item in weather_data["weather"])

            # Формируем информацию о погоде
            weather_info = {
                "Температура воздуха": round(weather_data["main"].get("temp", 0)),  # Округляем температуру
                "Описание": description,
                "Город": weather_data.get("name", "Неизвестно"),
                "Страна": weather_data.get("sys", {}).get("country", "Неизвестно"),
                "Есть дождь": "Да" if has_rain else "Нет",
                "Сообщение": "Следует взять зонт!" if has_rain else "Сегодня зонт не нужен :)",
                "Уведомление": "Отправляется" if has_rain else "Не отправляется"
            }
            return weather_info

        except httpx.HTTPStatusError as http_err:
            return {"error": f"HTTP error occurred: {http_err.response.status_code} - {http_err.response.text}"}
        except Exception as err:
            return {"error": f"An error occurred: {err}"}
