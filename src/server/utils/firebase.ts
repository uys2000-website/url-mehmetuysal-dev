// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyDR0ZUa9Jr7Lc10E_Io0mHJg8pYJc4eehs",
  authDomain: "url-mehmetuysal-dev.firebaseapp.com",
  projectId: "url-mehmetuysal-dev",
  storageBucket: "url-mehmetuysal-dev.appspot.com",
  messagingSenderId: "57733275174",
  appId: "1:57733275174:web:2c8859d45f27e5e4d690e7",
  measurementId: "G-JRC94NFJ1K",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
