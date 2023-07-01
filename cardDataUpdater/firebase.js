// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  databaseURL: "https://king-of-the-pack.firebaseio.com",
  authDomain: "king-of-the-pack.firebaseapp.com",
  projectId: "king-of-the-pack",
  storageBucket: "king-of-the-pack.appspot.com",
  messagingSenderId: "577076052518",
  appId: "1:577076052518:web:a45cd4bd7cfc463f199ce7",
  measurementId: "G-C3FY37KGKM",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore();