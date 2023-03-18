// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import {
    getAuth,
    onAuthStateChanged,
    signOut,
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDoc,
    getDocs,
    doc,
    deleteDoc,
    updateDoc,
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

onAuthStateChanged(auth, (user) => {
    if (user) {
        userCredential = user;
    } else {
        window.location = 'index.html';
    }
});

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

const gear = document.querySelector('.db-gear');
const gamesSettingsCross = document.querySelector('.games-settings__cross');
const gamesSettingsWrapper = document.querySelector('.games-settings__wrapper');
const gamesSettingsFolder = document.querySelector('.games-settings__folders');
const gamesSettingsFolders = gamesSettingsFolder.children;
let allPacks = document.querySelector('#all-packs');
let wordsFromAllFolders = {};
let chosenWords = [];

function folderActive(e, folder) {
    if (e.currentTarget == allPacks && e.currentTarget.classList.contains('active-folder')) {
        for (const el of gamesSettingsFolders) {
            el.classList.remove('active-folder');
            for (const folderKey in wordsFromAllFolders) {
                wordsFromAllFolders[folderKey].isActive = false;
            }
        }
    }
    else if (e.currentTarget == allPacks) {
        for (const el of gamesSettingsFolders) {
            el.classList.add('active-folder');
            for (const folderKey in wordsFromAllFolders) {
                wordsFromAllFolders[folderKey].isActive = true;
            }
        }
    }
    else {
        folder.classList.toggle('active-folder');
        allPacks.classList.remove('active-folder');
        wordsFromAllFolders[folder.id].isActive ? wordsFromAllFolders[folder.id].isActive = false : wordsFromAllFolders[folder.id].isActive = true;
    }
}

gear.onclick = () => {
    chosenWords = [];
    openModalWindow(gamesSettingsWrapper);
    gamesSettingsFolder.innerHTML = `<div class="db-folder" id="all-packs">
    <div class="db-folder__image">
       <img src="./icons/magic-scroll.svg" alt="magic-scroll">
    </div>
    <div class="db-folder__title">
       ALL PACKS
    </div>
    </div>`;
    allPacks = document.querySelector('#all-packs');
    allPacks.onclick = (e) => {
        folderActive(e, allPacks);
    }
    getSettingsFolders(userCredential);
}

gamesSettingsCross.onclick = () => {
    closeModalWindow(gamesSettingsWrapper);
    getActiveFoldersFromSettings(); 
    chosenWords = shuffle(chosenWords);
    console.log(chosenWords);
}

async function getSettingsFolders(userCredential) {
    const q = query(collection(db, "users", userCredential.uid, "word-folders"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (folderDoc) => {
        await renderSettingsFolders(folderDoc.data().folderName, folderDoc.id);
        wordsFromAllFolders[folderDoc.id] = {
            folderName: folderDoc.data().folderName,
            isActive: false,
        };

        const qWords = query(collection(db, "users", userCredential.uid, "word-folders", folderDoc.id, "word"));
        const querySnapshotWords = await getDocs(qWords);
        querySnapshotWords.forEach(async (wordDoc) => {
            wordsFromAllFolders[folderDoc.id][wordDoc.id] = {
                word: wordDoc.data().word,
                translation: wordDoc.data().translation
            }
        });
    });
}

function renderSettingsFolders(folderName, folderId) {
    gamesSettingsFolder.insertAdjacentHTML(
        'beforeend',
        `<div class="db-folder" id="${folderId}">
        <div class="db-folder__image">
           <img src="./icons/magic-scroll.svg" alt="magic-scroll">
        </div>
        <div class="db-folder__title">
           ${folderName}
        </div>
     </div>`
    );
    const folder = gamesSettingsFolder.querySelector(`[id='${folderId}']`);

    folder.onclick = (e) => {
        folderActive(e, folder);
    }
}

function getActiveFoldersFromSettings() {
    for (const folderKey in wordsFromAllFolders) {
        for (const wordObjKey in wordsFromAllFolders[folderKey]) {
            if (wordsFromAllFolders[folderKey].isActive == true && wordObjKey != 'isActive' && wordObjKey != 'folderName') {
                chosenWords.push(
                    {
                        word: wordsFromAllFolders[folderKey][wordObjKey].word,
                        translation: wordsFromAllFolders[folderKey][wordObjKey].translation
                    }
                )
            }
        }
    }
}





