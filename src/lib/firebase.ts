import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase web config public hota hai (secret nahi). Asli security Firestore Rules se hoti hai.
const firebaseConfig = {
  apiKey: "AIzaSyAj-XzsXgYzNMouXtG9NQQb0YCEzuakkRA",
  authDomain: "ymps-bf83c.firebaseapp.com",
  projectId: "ymps-bf83c",
  storageBucket: "ymps-bf83c.firebasestorage.app",
  messagingSenderId: "364695838510",
  appId: "1:364695838510:web:3bb89cd3d994653889e4bf",
};

// Lazy init: sirf tab chalta hai jab zarurat ho (SSR me crash nahi hoga)
function getFirebaseApp() {
  return getApps().find((a) => a.name === "[DEFAULT]") ?? initializeApp(firebaseConfig);
}

// Student account banate time teacher logout na ho, isliye alag (secondary) app use hota hai
function getSecondaryApp() {
  return getApps().find((a) => a.name === "secondary") ?? initializeApp(firebaseConfig, "secondary");
}

export const getFirebaseAuth = () => getAuth(getFirebaseApp());
export const getSecondaryAuth = () => getAuth(getSecondaryApp());
export const getDb = () => getFirestore(getFirebaseApp());
