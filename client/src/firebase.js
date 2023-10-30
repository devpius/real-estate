// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "magimbi-estate.firebaseapp.com",
  projectId: "magimbi-estate",
  storageBucket: "magimbi-estate.appspot.com",
  messagingSenderId: "443649450796",
  appId: "1:443649450796:web:4db2cfc3e0b2c7b5fa8289",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
