// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import {
    getAuth,
    onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

import {
    getFirestore,
    collection,
    getDocs,
    doc,
    getDoc,
    query
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCW6-YuRBXWpBtY-Qfff9unpix7BIalTDc",
    authDomain: "project-gastello.firebaseapp.com",
    projectId: "project-gastello",
    storageBucket: "project-gastello.appspot.com",
    messagingSenderId: "797293045152",
    appId: "1:797293045152:web:4d8beb34b707ee546370c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
let userCredential = null;
let userFolders = {};
let userData = {};

onAuthStateChanged(auth, async (user) => {
    if (user) {
        userCredential = user;
        if (localStorage.getItem("folders") === null) {
            await waitWordsFromAllFolders();
            let wordsFromAllFoldersJSON = JSON.stringify(userFolders);
            localStorage.setItem("folders", wordsFromAllFoldersJSON);
        }
        if (localStorage.getItem("user") === null) {
            await getUserData();
            let userJSON = JSON.stringify(userData);
            localStorage.setItem("user", userJSON);
        }
    }
});

async function waitWordsFromAllFolders() {
    await getSettingsFolders(userCredential);
}

async function getSettingsFolders(userCredential) {
    const q = query(collection(db, "users", userCredential.uid, "word-folders"));
    const querySnapshot = await getDocs(q);
    await prepareWordsFromAllFolders(querySnapshot);
}

async function prepareWordsFromAllFolders(data) {
    // some magic
    await Promise.all(data.docs.map(async (folderDoc) => {
        if (!userFolders.hasOwnProperty(folderDoc.id)) {

            userFolders[folderDoc.id] = {
                folderName: folderDoc.data().folderName,
                isActive: false,
            };
            const qWords = query(collection(db, "users", userCredential.uid, "word-folders", folderDoc.id, "word"));
            const querySnapshotWords = await getDocs(qWords);

            await getQuerySnapshotWords(folderDoc, querySnapshotWords);
        }
    })
    )

}

async function getQuerySnapshotWords(folderDoc, querySnapshotWords) {
    await new Promise((resolve, rej) => {
        querySnapshotWords.forEach((wordDoc) => {
            userFolders[folderDoc.id][wordDoc.id] = {
                word: wordDoc.data().word,
                translation: wordDoc.data().translation
            }
        });

        resolve(userFolders);
    });
}

async function getUserData() {
    const docRef = doc(db, "users", userCredential.uid);
    const docSnap = await getDoc(docRef);
    userData.userImage = `./icons/avatars/${docSnap.data().photoURL}`;
    userData.userName = docSnap.data().name;
}