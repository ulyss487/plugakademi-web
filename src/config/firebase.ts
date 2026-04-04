import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  browserLocalPersistence,
  setPersistence,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDtca2oJcQpLMU49QBkvbpDJqciDOdz-6Y",
  authDomain: "plug-akademi.firebaseapp.com",
  projectId: "plug-akademi",
  storageBucket: "plug-akademi.firebasestorage.app",
  messagingSenderId: "276451199498",
  appId: "1:276451199498:web:5b68df2c455a5fd5f74c97",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);

export { app, auth };
