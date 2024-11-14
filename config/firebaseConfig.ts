// C:\Users\iverson\Documents\GitHub\trackguard\config\firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBn9m8VH43GFrlIHN1dgBmlY-3BgdwjCDs",
  authDomain: "track-guard.firebaseapp.com",
  databaseURL: "https://track-guard-default-rtdb.firebaseio.com",
  projectId: "track-guard",
  storageBucket: "track-guard.appspot.com",
  messagingSenderId: "1024269638309",
  appId: "1:1024269638309:web:6aea15e6899d7ea5388b4c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const database = getDatabase(app);
