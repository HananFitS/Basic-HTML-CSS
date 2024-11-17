// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {getAuth,createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATbBn-2PXLiwsROSIdl-RTAcZRNBOlOGc",
  authDomain: "tugas-pawm.firebaseapp.com",
  projectId: "tugas-pawm",
  storageBucket: "tugas-pawm.firebasestorage.app",
  messagingSenderId: "32546229721",
  appId: "1:32546229721:web:43be61960f4915c7a15dc8",
  measurementId: "G-E7M2DH8XP5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Inputs

// Submit
const register = document.getElementById("register");
register.addEventListener("click", function (event) {
  

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  event.preventDefault();
  createUserWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      alert("Creating Account...");
      window.location.href = "../main/index.html";
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      // ..
    });
});
