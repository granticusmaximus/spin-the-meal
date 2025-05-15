// Firebase config placeholder
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCpcQPwk1e6QgjhL44V9jbSVqZbEMNZgnM",
  authDomain: "spin-the-meal-6785b.firebaseapp.com",
  projectId: "spin-the-meal-6785b",
  storageBucket: "spin-the-meal-6785b.firebasestorage.app",
  messagingSenderId: "280604104163",
  appId: "1:280604104163:web:80d92f5e49355ef40efcd6",
  measurementId: "G-3GJKXREDBE"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
