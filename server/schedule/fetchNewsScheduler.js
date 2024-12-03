// import { getFirestore, collection, addDoc, deleteDoc, getDocs } from "firebase/firestore";
// import { initializeApp } from "firebase/app";
// import axios from "axios";

// const firebaseConfig = {
//   apiKey: "AIzaSyDhytHWu2AdmMvJAHkEqiI6aTwV1yUBUsE",
//   authDomain: "parsernewsnuxt.firebaseapp.com",
//   projectId: "parsernewsnuxt",
//   storageBucket: "parsernewsnuxt.appspot.com",
//   messagingSenderId: "22078693160",
//   appId: "1:22078693160:web:caf0120ac8efe1e8a3ba1d",
//   measurementId: "G-9D1T6QD73E",
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// const CRYPTOCOMPARE_API =
//   "https://min-api.cryptocompare.com/data/v2/news/?categories=ADA,XRP,XLM,TRX,SHIBA,DOGE,EOS,LTC,USDT,&excludeCategories=Sponsored";

// const fetchAndSaveNews = async () => {
//   try {
//     console.log("[Scheduler] Запрос новостей с CryptoCompare...");
//     const response = await axios.get(CRYPTOCOMPARE_API);

//     if (response.data && response.data.Data) {
//       const newsCollection = collection(db, "news");

//       console.log("[Scheduler] Удаление старых новостей из Firestore...");
//       const oldNews = await getDocs(newsCollection);
//       oldNews.forEach(async (doc) => {
//         await deleteDoc(doc.ref);
//       });
//       console.log("[Scheduler] Старые новости успешно удалены.");

//       console.log("[Scheduler] Добавление новых новостей в Firestore...");
//       for (const article of response.data.Data) {
//         await addDoc(newsCollection, {
//           title: article.title,
//           body: article.body,
//           imageurl: article.imageurl,
//           url: article.url,
//           published_on: article.published_on,
//         });
//       }
//       console.log("[Scheduler] Новости успешно добавлены в Firestore.");
//     } else {
//       console.warn("[Scheduler] Пустой ответ от API.");
//     }
//   } catch (error) {
//     console.error("[Scheduler] Ошибка при запросе новостей:", error);
//   }
// };

// // Запускаем расписание каждые 60 минут
// setInterval(fetchAndSaveNews, 60 * 60 * 1000);
// fetchAndSaveNews();
import { getFirestore, collection, addDoc, deleteDoc, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import axios from "axios";
import translate from "translate";

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

const CRYPTOCOMPARE_API =
  // "https://min-api.cryptocompare.com/data/v2/news/?categories=ADA,XRP,XLM,TRX,SHIBA,DOGE,EOS,LTC,USDT,&excludeCategories=Sponsored";
  "https://min-api.cryptocompare.com/data/v2/news/?categories=EOS&excludeCategories=Sponsored";
// Устанавливаем движок для перевода
translate.engine = "google"; // Используется бесплатный движок Google Translate

const fetchAndSaveNews = async () => {
  try {
    console.log("[Scheduler] Запрос новостей с CryptoCompare...");
    const response = await axios.get(CRYPTOCOMPARE_API);

    if (response.data && response.data.Data) {
      const newsCollection = collection(db, "news");

      console.log("[Scheduler] Удаление старых новостей из Firestore...");
      const oldNews = await getDocs(newsCollection);
      oldNews.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
      console.log("[Scheduler] Старые новости успешно удалены.");

      console.log("[Scheduler] Перевод и добавление новых новостей...");
      for (const article of response.data.Data) {
        const titleRu = await translate(article.title, "ru");
        const bodyRu = await translate(article.body, "ru");

        await addDoc(newsCollection, {
          title: titleRu, // Переведенный заголовок
          body: bodyRu, // Переведенный текст
          imageurl: article.imageurl,
          url: article.url,
          published_on: article.published_on,
        });
      }
      console.log("[Scheduler] Новости успешно переведены и добавлены в Firestore.");
    } else {
      console.warn("[Scheduler] Пустой ответ от API.");
    }
  } catch (error) {
    console.error("[Scheduler] Ошибка при запросе новостей:", error);
  }
};

// Запускаем расписание каждые 60 минут
setInterval(fetchAndSaveNews, 60 * 60 * 1000);
fetchAndSaveNews();
