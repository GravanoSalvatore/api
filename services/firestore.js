import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSy...',
  authDomain: 'parsernewsnuxt.firebaseapp.com',
  projectId: 'parsernewsnuxt',
  storageBucket: 'parsernewsnuxt.appspot.com',
  messagingSenderId: '22078693160',
  appId: '1:22078693160:web:caf0120ac8efe1e8a3ba1d',
  measurementId: 'G-9D1T6QD73E',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log('[Firebase] Firebase успешно инициализирован');
console.log('[Firebase] Firestore подключен');

export { db };
