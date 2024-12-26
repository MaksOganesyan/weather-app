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

      // Получаем описание погоды и приводим к нижнему регистру
      const weatherDescription = weatherData["Описание"] ? weatherData["Описание"].toLowerCase() : "";

      // Логируем описание погоды для диагностики
      console.log("Описание погоды (нижний регистр):", weatherDescription);

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
          console.log("Описание погоды:", weatherDescription); // Логируем описание для проверки

          // Расширим условия для обработки различных типов погоды
          if (weatherDescription.includes("пасмурно") || weatherDescription.includes("облачно")) {
              weatherIcon.src = "http://localhost:8000/static/image/cloudy.png"; // Пример для облачности
              console.log("Погода облачная, иконка: cloudy.png");
          } else if (weatherDescription.includes("дождь")) {
              weatherIcon.src = "http://localhost:8000/static/image/rainy.png"; // Пример для дождя
              console.log("Погода дождливая, иконка: rainy.png");
          } else if (weatherDescription.includes("солнечно")) {
              weatherIcon.src = "http://localhost:8000/static/image/sunny.png"; // Пример для солнечной погоды
              console.log("Погода солнечная, иконка: sunny.png");
          } else {
              weatherIcon.src = "http://localhost:8000/static/image/default.png"; // Если нет совпадений, ставим дефолтное изображение
              console.log("Неизвестная погода, иконка: default.png");
          }
      }

      // Обновляем температуру на странице
      if (temperatureElement && weatherData["Температура воздуха"] !== undefined) {
          const temperature = weatherData["Температура воздуха"]; // Получаем температуру из ответа
          console.log("Температура из API:", temperature); // Логируем температуру
          temperatureElement.textContent = `${temperature}°C`; // Обновляем температуру
      }

      // Обновляем текст в зависимости от погоды
      if (umbrellaAdvice) {
          // Если облачно или дождливо, предлагаем взять зонт
          if (weatherDescription.includes("пасмурно") || weatherDescription.includes("дождь") || weatherDescription.includes("облачно")) {
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
