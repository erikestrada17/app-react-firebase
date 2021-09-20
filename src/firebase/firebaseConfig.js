// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyArwimaM0PrRde0x7C_CXMKCJGI0Ugigqc",
    authDomain: "pruebafirebase-ee21.firebaseapp.com",
    projectId: "pruebafirebase-ee21",
    storageBucket: "pruebafirebase-ee21.appspot.com",
    messagingSenderId: "433488097868",
    appId: "1:433488097868:web:74fc1257dc5207406bfae9",
    measurementId: "G-6HWHJGP09K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;