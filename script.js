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
          // Устанавливаем картинку в зависимости от описания погоды
          if (weatherData["Описание"].includes("пасмурно")) {
              weatherIcon.src = "image/cloudy.png"; // Пример для облачности
          } else if (weatherData["Описание"].includes("дождь")) {
              weatherIcon.src = "image/rainy.png"; // Пример для дождя
          } else if (weatherData["Описание"].includes("солнечно")) {
              weatherIcon.src = "image/sunny.png"; // Пример для солнечной погоды
          }
      }
  } catch (error) {
      console.error("Ошибка при получении данных о погоде:", error);
  }
}

// Вызываем функцию сразу после загрузки страницы
window.onload = fetchWeather;
