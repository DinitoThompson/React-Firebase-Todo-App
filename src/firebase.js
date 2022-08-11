// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnvBNY7W3ltVOLJduk4Cc8o_RuAFOA85U",
  authDomain: "todo-list-d47da.firebaseapp.com",
  projectId: "todo-list-d47da",
  storageBucket: "todo-list-d47da.appspot.com",
  messagingSenderId: "170418202517",
  appId: "1:170418202517:web:c1ce24f4fa76714799789c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
