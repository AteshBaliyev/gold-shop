import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration from Firebase Console
export const firebaseConfig = {
  apiKey: "AIzaSyAOWgNuV1kkhQDemQg7-3wpWMD0XOHABYI",
  authDomain: "gold-shop-983a5.firebaseapp.com",
  projectId: "gold-shop-983a5",
  storageBucket: "gold-shop-983a5.firebasestorage.app",
  messagingSenderId: "919494452015",
  appId: "1:919494452015:web:704cfa1776200a9183f7da",
  measurementId: "G-P5583WN8SK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore database
export const db = getFirestore(app);

// Initialize Analytics safely
export let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch((err) => {
    console.warn("Firebase analytics initialization skipped:", err);
  });
}

export default app;
