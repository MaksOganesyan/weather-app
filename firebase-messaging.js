// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-TCELmYW-zpU-vfvgLizwBO4s0AXp43c",
  authDomain: "weathear-app-621cb.firebaseapp.com",
  projectId: "weathear-app-621cb",
  storageBucket: "weathear-app-621cb.firebasestorage.app",
  messagingSenderId: "590496292982",
  appId: "1:590496292982:web:15d784295e968df7a87f57",
  measurementId: "G-KB4JKNRMFD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
