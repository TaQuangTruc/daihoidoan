// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMLRKoE5W6Ke1AHMGoYM4iJY2DROLrHXs",
  authDomain: "thulinhsinhvien-ebf15.firebaseapp.com",
  databaseURL: "https://thulinhsinhvien-ebf15-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "thulinhsinhvien-ebf15",
  storageBucket: "thulinhsinhvien-ebf15.firebasestorage.app",
  messagingSenderId: "816568065430",
  appId: "1:816568065430:web:79e5c693cceb5bfad491b7",
  measurementId: "G-7SYMXDZD5Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const database = getDatabase(app);

export default database;
