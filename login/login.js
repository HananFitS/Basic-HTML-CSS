// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {getAuth,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";


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
const db = getFirestore(app);


// Inputs

// Submit
// Submit
const register = document.getElementById("register");
register.addEventListener("click", function (event) {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  event.preventDefault();
  signInWithEmailAndPassword(auth, username, password)
    .then(async (userCredential) => {
      // Signed in
      const user = userCredential.user;
      alert("Logging in...");

      // Menyimpan data pengguna ke Firestore (misalnya waktu login terakhir)
      try {
        await setDoc(doc(db, "users", user.uid), {
          lastLogin: new Date().toISOString(),
          email: user.email,
        }, { merge: true }); // Menggunakan merge agar tidak menimpa data yang sudah ada
        console.log("Data pengguna berhasil disimpan ke Firestore.");
      } catch (error) {
        console.error("Gagal menyimpan data pengguna ke Firestore:", error);
      }

      // Arahkan ke halaman utama setelah login
      window.location.href = "../mainlogin/mainlogin.html";
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
});