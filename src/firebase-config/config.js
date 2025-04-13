import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import { getDatabase } from "firebase/database";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCyF6S_PAm73_k_NmZZWciZoIRTQ0OVr9Q",
  authDomain: "turfease-7b1d5.firebaseapp.com",
  projectId: "turfease-7b1d5",
  storageBucket: "turfease-7b1d5.firebasestorage.app",
  messagingSenderId: "43453998064",
  appId: "1:43453998064:web:81a1cfe5108c73a2b47335",
  measurementId: "G-P8X1PH3T32"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider(app);
export const db = getFirestore(app)
export const database = getDatabase(app);

