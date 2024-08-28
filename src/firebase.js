// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBn9m8VH43GFrlIHN1dgBmlY-3BgdwjCDs",
  authDomain: "track-guard.firebaseapp.com",
  projectId: "track-guard",
  storageBucket: "track-guard.appspot.com",
  messagingSenderId: "1024269638309",
  appId: "1:1024269638309:web:6aea15e6899d7ea5388b4c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
