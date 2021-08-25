import firebase from "firebase/app";
import 'firebase/auth'; 
import 'firebase/firestore'; 
import dotenv from 'dotenv';
dotenv.config(); 
// console.log(process.env.REACT_APP_API_KEY); 

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};


  firebase.initializeApp(firebaseConfig); // 앱의 초기화 
  
  export const firebaseInstance = firebase; 
  export const authService = firebase.auth();
  export const dbService = firebase.firestore(); 




// Firebase 초기화 방식

//   const firebaseConfig = {
//     // ...
//   };
  
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);