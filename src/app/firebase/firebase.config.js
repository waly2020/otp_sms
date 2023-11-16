// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO : Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAhMunKjWB9iDdnw1XwxgExnzUSKJpTs48",
//   authDomain: "fa-cabalou.firebaseapp.com",
//   projectId: "fa-cabalou",
//   storageBucket: "fa-cabalou.appspot.com",
//   messagingSenderId: "35974563868",
//   appId: "1:35974563868:web:66f2512d4b1b6fbd8537d9"
// };
const firebaseConfig = {
  apiKey: "AIzaSyC5C5XPYkYo28ae55Y7NQsIyKxuCfCYVIo",
  authDomain: "teste-api-otp.firebaseapp.com",
  projectId: "teste-api-otp",
  storageBucket: "teste-api-otp.appspot.com",
  messagingSenderId: "1049416110840",
  appId: "1:1049416110840:web:3ef673968a9acb9e26210d"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);