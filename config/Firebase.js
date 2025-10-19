import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCqPYZI_sA-xrL0pvY7dOcSIu5F2ve-eTE",
  authDomain: "proyecto-integrador-a2f99.firebaseapp.com",
  projectId: "proyecto-integrador-a2f99",
  storageBucket: "proyecto-integrador-a2f99.firebasestorage.app",
  messagingSenderId: "68841259497",
  appId: "1:68841259497:web:28c4b3c19171e3fc5b4b78",
  measurementId: "G-X6YD8CRWME",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
