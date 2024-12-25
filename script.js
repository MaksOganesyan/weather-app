// Инициализация Firebase (для версии 8.x)
var firebaseConfig = {
    apiKey: "AIzaSyB-TCELmYW-zpU-vfvgLizwBO4s0AXp43c",
    authDomain: "weathear-app-621cb.firebaseapp.com",
    projectId: "weathear-app-621cb",
    storageBucket: "weathear-app-621cb.firebasestorage.app",
    messagingSenderId: "590496292982",
    appId: "1:590496292982:web:15d784295e968df7a87f57",
    measurementId: "G-KB4JKNRMFD"
};

// Инициализация Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Запрос на разрешение для получения уведомлений
function requestPermission() {
  Notification.requestPermission().then(function(permission) {
    if (permission === "granted") {
      console.log("Разрешение на уведомления получено!");
      messaging.getToken({ vapidKey: BHeFesPWJaAvvy_Y6v3xI3TrXYfW1KgdhIERZDY9jfvrNxJVaQ7lRRB9JKa1ZqENI4o1at789bsDJ7XsRUCT2QE })  // Укажите свой VAPID ключ
        .then(function(token) {
          console.log("Токен для уведомлений:", token);
          // Можно отправить токен на сервер для использования
        })
        .catch(function(err) {
          console.log("Ошибка при получении токена:", err);
        });
    } else {
      console.log("Разрешение на уведомления не получено");
    }
  });
}

// Отправка уведомлений
function sendNotification(token) {
  if (token) {
    fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        'Authorization': 'key=YOUR_SERVER_KEY',  // Укажите ключ сервера
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: token,
        notification: {
          title: 'Не забудьте взять зонтик!',
          body: 'Есть вероятность дождя. Возьмите зонтик.',
        }
      })
    })
    .then(response => response.json())
    .then(data => console.log('Уведомление отправлено:', data))
    .catch(error => console.error('Ошибка при отправке уведомления:', error));
  }
}

// Привязка к переключателю
document.querySelector('.checkbox').addEventListener('change', function() {
  const isChecked = this.checked;
  if (isChecked) {
    console.log("Переключатель включен, уведомление будет отправлено.");
    requestPermission().then(() => {
      // Здесь можно отправить уведомление через Firebase, если оно необходимо
      sendNotification('YOUR_FCM_TOKEN');
    });
  } else {
    console.log("Переключатель выключен, уведомления отключены.");
  }
});
