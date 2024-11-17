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
            saveUserLoginInfo(userId, userEmail); // Simpan informasi login pengguna
            loadExperiments(userId); // Load riwayat eksperimen pengguna
        } else {
            console.error("Pengguna tidak terautentikasi.");
            window.location.href = 'login.html'; // Redirect ke halaman login jika tidak terautentikasi
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

    // Fungsi untuk menyimpan eksperimen baru ke Firestore
    async function saveExperiment(indikator, larutan, hasil) {
        const user = auth.currentUser;
        if (user) {
            const userId = user.uid;
            try {
                await addDoc(collection(db, "users", userId, "experiments"), {
                    indicator: indikator, // Nama indikator
                    solution: larutan,    // Nama larutan
                    result: hasil,        // Hasil percobaan
                    timestamp: new Date() // Waktu percobaan
                });
                console.log("Eksperimen berhasil disimpan ke Firestore.");
                loadExperiments(userId); // Refresh tampilan setelah menyimpan eksperimen baru
            } catch (error) {
                console.error("Error menyimpan eksperimen:", error);
            }
        } else {
            console.error("Pengguna tidak terautentikasi.");
        }
    }

    // Fungsi untuk mengambil dan menampilkan riwayat eksperimen
    async function loadExperiments(userId) {
        historyContainer.innerHTML = ""; // Kosongkan kontainer

        const experimentsQuery = query(
            collection(db, "users", userId, "experiments"),
            orderBy("timestamp", "desc")
        );

        const querySnapshot = await getDocs(experimentsQuery);
        if (querySnapshot.empty) {
            const noHistoryMessage = document.createElement('p');
            noHistoryMessage.textContent = "Tidak ada riwayat eksperimen.";
            noHistoryMessage.style.color = "#666";
            historyContainer.appendChild(noHistoryMessage);
            return;
        }

        querySnapshot.forEach((doc) => {
            const experiment = doc.data();
            const experimentId = doc.id;

            const experimentRecord = document.createElement('div');
            experimentRecord.classList.add('experiment-record');

            // Tampilkan data indikator
            const indicatorBox = document.createElement('div');
            indicatorBox.classList.add('experiment-icon');
            const indicatorText = document.createElement('p');
            indicatorText.textContent = experiment.indicator;
            indicatorBox.appendChild(indicatorText);

            // Simbol "+"
            const plusSymbol = document.createElement('div');
            plusSymbol.classList.add('symbol');
            plusSymbol.textContent = '+';

            // Tampilkan data larutan
            const solutionBox = document.createElement('div');
            solutionBox.classList.add('experiment-icon');
            const solutionText = document.createElement('p');
            solutionText.textContent = experiment.solution;
            solutionBox.appendChild(solutionText);

            // Simbol "="
            const equalSymbol = document.createElement('div');
            equalSymbol.classList.add('symbol');
            equalSymbol.textContent = '=';

            // Tampilkan hasil eksperimen
            const resultBox = document.createElement('div');
            resultBox.classList.add('experiment-icon');
            const resultText = document.createElement('p');
            resultText.textContent = experiment.result;
            resultBox.appendChild(resultText);

            // Tambahkan tombol "Edit" dan "Hapus"
            const editButton = document.createElement('button');
            editButton.textContent = "Edit";
            editButton.classList.add('edit-button');
            editButton.onclick = () => editExperiment(userId, experimentId, experiment);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = "Hapus";
            deleteButton.classList.add('delete-button');
            deleteButton.onclick = () => deleteExperiment(userId, experimentId);

            // Tambahkan elemen ke kontainer riwayat eksperimen
            experimentRecord.appendChild(indicatorBox);
            experimentRecord.appendChild(plusSymbol);
            experimentRecord.appendChild(solutionBox);
            experimentRecord.appendChild(equalSymbol);
            experimentRecord.appendChild(resultBox);
            experimentRecord.appendChild(editButton);
            experimentRecord.appendChild(deleteButton);

            historyContainer.appendChild(experimentRecord);
        });
    }

    // Fungsi untuk menghapus eksperimen dari Firestore
    function deleteExperiment(userId, experimentId) {
        deleteDoc(doc(db, "users", userId, "experiments", experimentId))
            .then(() => {
                console.log("Eksperimen berhasil dihapus!");
                loadExperiments(userId); // Refresh tampilan riwayat setelah menghapus
            })
            .catch((error) => {
                console.error("Error menghapus eksperimen:", error);
            });
    }

    // Fungsi untuk mengedit eksperimen
    function editExperiment(userId, experimentId, experiment) {
        const newIndicator = prompt("Edit indikator:", experiment.indicator);
        const newSolution = prompt("Edit larutan:", experiment.solution);
        const newResult = prompt("Edit hasil:", experiment.result);

        if (newIndicator && newSolution && newResult) {
            updateDoc(doc(db, "users", userId, "experiments", experimentId), {
                indicator: newIndicator,
                solution: newSolution,
                result: newResult,
                timestamp: new Date()
            })
            .then(() => {
                console.log("Eksperimen berhasil diperbarui!");
                loadExperiments(userId); // Refresh tampilan riwayat setelah memperbarui
            })
            .catch((error) => {
                console.error("Error memperbarui eksperimen:", error);
            });
        }
    }
});
