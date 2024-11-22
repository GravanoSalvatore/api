import { getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDhytHWu2AdmMvJAHkEqiI6aTwV1yUBUsE",
  authDomain: "parsernewsnuxt.firebaseapp.com",
  projectId: "parsernewsnuxt",
  storageBucket: "parsernewsnuxt.appspot.com",
  messagingSenderId: "22078693160",
  appId: "1:22078693160:web:caf0120ac8efe1e8a3ba1d",
  measurementId: "G-9D1T6QD73E",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default defineEventHandler(async () => {
  try {
    console.log("[API] Получение новостей из Firestore...");
    const newsCollection = collection(db, "news");
    const snapshot = await getDocs(newsCollection);

    const news = [];
    snapshot.forEach((doc) => {
      news.push({ id: doc.id, ...doc.data() });
    });

    console.log("[API] Новости успешно получены:", news);
    return news;
  } catch (error) {
    console.error("[API] Ошибка при получении новостей:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Ошибка сервера при получении новостей",
    });
  }
});
