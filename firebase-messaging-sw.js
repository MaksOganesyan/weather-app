importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// Инициализация Firebase
firebase.initializeApp({
  apiKey: "AIzaSyB-TCELmYW-zpU-vfvgLizwBO4s0AXp43c",
  authDomain: "weathear-app-621cb.firebaseapp.com",
  projectId: "weathear-app-621cb",
  storageBucket: "weathear-app-621cb.firebasestorage.app",
  messagingSenderId: "590496292982",
  appId: "1:590496292982:web:15d784295e968df7a87f57",
  measurementId: "G-KB4JKNRMFD"
});

const messaging = firebase.messaging();

// Обработчик для получения уведомлений в фоне
messaging.setBackgroundMessageHandler(function(payload) {
  const title = 'Прогноз погоды';
  const options = {
    body: payload.data.body,
    icon: '/image/umbrella.svg',  // Иконка для уведомления
  };
  return self.registration.showNotification(title, options);
});
