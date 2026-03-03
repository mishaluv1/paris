import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBeHBhigCuWZG31FXvBqcE1cDwHHqp-GrI",
  authDomain: "restaurant-web-1eac8.firebaseapp.com",
  projectId: "restaurant-web-1eac8",
  storageBucket: "restaurant-web-1eac8.firebasestorage.app",
  messagingSenderId: "903761663204",
  appId: "1:903761663204:web:f1ba7a270a670f2c4fc8f1"
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);