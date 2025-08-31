// frontend/src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdIvk0z-5vMSqP36NxTDFlOewnfAcIcag",
  authDomain: "smartprice-v2.firebaseapp.com",
  projectId: "smartprice-v2",
  storageBucket: "smartprice-v2.firebasestorage.app",
  messagingSenderId: "1071386621857",
  appId: "1:1071386621857:web:09b4e597f49a2b83bffde0",
  measurementId: "G-2MXPF9PZGW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;