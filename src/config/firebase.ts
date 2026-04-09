import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  browserLocalPersistence,
  setPersistence,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDtca2oJcQpLMU49QBkvbpDJqciDOdz-6Y",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "plug-akademi.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "plug-akademi",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "plug-akademi.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "276451199498",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:276451199498:web:5b68df2c455a5fd5f74c97",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);

export { app, auth };
