async function fetchWeather() {
  const apiUrl = 'http://localhost:8000/weather'; // URL вашего FastAPI сервера
  const latitude = 55.7558; // Примерная широта (Москва)
  const longitude = 37.6173; // Примерная долгота (Москва)

  try {
      const response = await fetch(`${apiUrl}?lat=${latitude}&lon=${longitude}`);
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const weatherData = await response.json();
      console.log("Ответ от API:", weatherData); // Логируем ответ от API

      // Если данные о погоде получены, обновляем элементы на странице
      const weatherStatus = document.querySelector(".weather-status");
      const umbrellaAdvice = document.querySelector(".umbrella-advice");
      const weatherIcon = document.getElementById("weather-icon"); // Находим элемент для картинки
      const temperatureElement = document.getElementById("temperature"); // Находим элемент для температуры

      // Обновляем описание погоды
      if (weatherStatus && weatherData["Описание"]) {
          weatherStatus.textContent = weatherData["Описание"];
      }

      // Обновляем сообщение о зонте
      if (umbrellaAdvice && weatherData["Сообщение"]) {
          umbrellaAdvice.textContent = weatherData["Сообщение"];
      }

      // Обновляем картинку в зависимости от погоды
      if (weatherIcon) {
          if (weatherData["Описание"].includes("пасмурно")) {
              weatherIcon.src = "http://localhost:8000/static/image/cloudy.png"; // Пример для облачности
          } else if (weatherData["Описание"].includes("дождь")) {
              weatherIcon.src = "http://localhost:8000/static/image/rainy.png"; // Пример для дождя
          } else if (weatherData["Описание"].includes("солнечно")) {
              weatherIcon.src = "http://localhost:8000/static/image/sunny.png"; // Пример для солнечной погоды
          }
      }

      // Обновляем температуру на странице
      if (temperatureElement && weatherData["Температура воздуха"] !== undefined) {
          const temperature = weatherData["Температура воздуха"]; // Получаем температуру из ответа
          console.log("Температура из API:", temperature); // Логируем температуру
          temperatureElement.textContent = `: ${temperature}°C`; // Обновляем температуру
      }

      // Обновляем текст в зависимости от погоды
      if (umbrellaAdvice) {
          // Если облачно или дождливо, предлагаем взять зонт
          if (weatherData["Описание"].includes("пасмурно") || weatherData["Описание"].includes("дождь") || weatherData["Описание"].includes("облачно")) {
              umbrellaAdvice.textContent = "Возьмите зонт!";
          } else {
              umbrellaAdvice.textContent = "Сегодня зонт не нужен!";
          }
      }

  } catch (error) {
      console.error("Ошибка при получении данных о погоде:", error);
  }
}

// Вызываем функцию сразу после загрузки страницы
window.onload = fetchWeather;
