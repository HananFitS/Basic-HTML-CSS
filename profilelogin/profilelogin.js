// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, updateDoc, setDoc, query, orderBy } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyATbBn-2PXLiwsROSIdl-RTAcZRNBOlOGc",
    authDomain: "tugas-pawm.firebaseapp.com",
    projectId: "tugas-pawm",
    storageBucket: "tugas-pawm.appspot.com",
    messagingSenderId: "32546229721",
    appId: "1:32546229721:web:43be61960f4915c7a15dc8",
    measurementId: "G-E7M2DH8XP5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', () => {
    const historyContainer = document.getElementById('history-container');

    // Cek status login pengguna
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const userId = user.uid;
            const userEmail = user.email;
            saveUserLoginInfo(userId, userEmail); 
            loadExperiments(userId); 
        } else {
            console.error("Pengguna tidak terautentikasi.");
            window.location.href = 'login.html'; 
        }
    });

    // Fungsi untuk menyimpan informasi login pengguna
    async function saveUserLoginInfo(userId, email) {
        try {
            await setDoc(doc(db, "users", userId), {
                email: email,
                lastLogin: new Date().toISOString()
            }, { merge: true });
            console.log("Informasi pengguna berhasil disimpan di Firestore.");
        } catch (error) {
            console.error("Error menyimpan informasi pengguna:", error);
        }
    }

    // Fungsi untuk mengambil dan menampilkan riwayat eksperimen

});
