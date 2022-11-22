// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgT00xM4fmbg4ZsWlX3D6mW7tELaL6M2Q",
  authDomain: "south-uno22.firebaseapp.com",
  projectId: "south-uno22",
  storageBucket: "south-uno22.appspot.com",
  messagingSenderId: "1071678153174",
  appId: "1:1071678153174:web:8f8e3b2d037c07043fc477"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const firestore = app.firestore();

export {app, firestore}