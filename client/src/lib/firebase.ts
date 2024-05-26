// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRjEuJOXAcKn0gQmpWczXkuGNDHvqB6YA",
  authDomain: "courses-68c78.firebaseapp.com",
  projectId: "courses-68c78",
  storageBucket: "courses-68c78.appspot.com",
  messagingSenderId: "283379090626",
  appId: "1:283379090626:web:6ff9ec850f150c5761a75b",
  measurementId: "G-KBKSBG6SMG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage()
