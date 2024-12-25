async function getWeather() {
    try {
        const response = await fetch('http://localhost:8000/weather?lat=55.7558&lon=37.6173');
        const data = await response.json(); // Получаем данные о погоде

        // Получаем элементы DOM для изменения
        const weatherStatusElement = document.querySelector('.weather-status');
        const weatherIconElement = document.querySelector('.weather-icon');
        const umbrellaAdviceElement = document.querySelector('.umbrella-advice');

        // Данные, полученные с API
        const weatherStatus = data["Описание"];  // Статус погоды: "Солнечно", "Дождливо", "Облачно" и т.д.
        
        // Определяем иконку в зависимости от погодных условий
        let weatherIcon = "sunny";  // По умолчанию, солнечная погода

        if (data["Есть дождь"] === "Да") {
            weatherIcon = "rainy";  // Дождливое состояние
        } else if (weatherStatus.toLowerCase().includes("облачно")) {
            weatherIcon = "cloudy";  // Облачная погода
        }

        // Обновляем картинку и подпись
        weatherStatusElement.textContent = weatherStatus;
        weatherIconElement.src = `image/${weatherIcon}.png`; // Указываем путь к картинке

        // Меняем текст в зависимости от погоды
        umbrellaAdviceElement.textContent = data["Сообщение"]; // Например, "Сегодня зонт не нужен!"
    } catch (error) {
        console.error('Ошибка при получении данных о погоде:', error);
        const weatherStatusElement = document.querySelector('.weather-status');
        if (weatherStatusElement) {
            weatherStatusElement.textContent = 'Не удалось загрузить данные о погоде.';
        }
    }
}

window.onload = getWeather;  // Загружаем данные о погоде при загрузке страницы
