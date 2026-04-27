import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAWRyNy7gszmWp7bdsnfaMA7Ie9Ui9LoKs",
  authDomain: "stellarpawpark.firebaseapp.com",
  projectId: "stellarpawpark",
  storageBucket: "stellarpawpark.firebasestorage.app",
  messagingSenderId: "597999869308",
  appId: "1:597999869308:web:f593adf65041546c9198f9",
  measurementId: "G-RTVKT3JYCH",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export default db;
export { auth };