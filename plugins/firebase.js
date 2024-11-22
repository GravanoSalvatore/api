import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export default defineNuxtPlugin(() => {
  console.log("[Firebase] Инициализация Firebase...");

  const firebaseConfig = {
    apiKey: "AIzaSyDhytHWu2AdmMvJAHkEqiI6aTwV1yUBUsE",
    authDomain: "parsernewsnuxt.firebaseapp.com",
    projectId: "parsernewsnuxt",
    storageBucket: "parsernewsnuxt.appspot.com",
    messagingSenderId: "22078693160",
    appId: "1:22078693160:web:caf0120ac8efe1e8a3ba1d",
    measurementId: "G-9D1T6QD73E",
  };

  try {
    const app = initializeApp(firebaseConfig);
    console.log("[Firebase] Firebase успешно инициализирован");

    const db = getFirestore(app);
    console.log("[Firebase] Firestore подключен");

    return { provide: { db } };
  } catch (error) {
    console.error("[Firebase] Ошибка инициализации Firebase:", error);
    throw error;
  }
});
