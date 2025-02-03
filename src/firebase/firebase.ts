// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD76yugeu6E4kHOpt2R96jPJfb9XOxtWaA",
  authDomain: "jikkotets.firebaseapp.com",
  projectId: "jikkotets",
  storageBucket: "jikkotets.firebasestorage.app",
  messagingSenderId: "842274677137",
  appId: "1:842274677137:web:086eaa174bd8f0ae2efa30",
  measurementId: "G-DBGFCJ8JQ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);