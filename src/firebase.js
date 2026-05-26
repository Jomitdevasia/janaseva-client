// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration (copied from Firebase console)
const firebaseConfig = {
  apiKey: "AIzaSyAsgib2NdSdZI7uukOkVVogLxe20gtRvhU",
  authDomain: "janaseva-portal.firebaseapp.com",
  projectId: "janaseva-portal",
  storageBucket: "janaseva-portal.firebasestorage.app",
  messagingSenderId: "702496847918",
  appId: "1:702496847918:web:ef593410171eb014d847bf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);