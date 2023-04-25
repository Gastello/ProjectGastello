// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import {
    getAuth,
    onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

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

let userFolders = JSON.parse(localStorage.getItem("folders"));

onAuthStateChanged(auth, (user) => {
    if (!user) {
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

const gears = document.querySelectorAll('.db-gear');
const gamesSettingsWrapper = document.querySelector('.games-settings__wrapper');
const gamesSettingsFolder = document.querySelector('.games-settings__folders');
const gamesSettingsFolders = gamesSettingsFolder.children;
let allPacks = document.querySelector('#all-packs');

for (const gear of gears) {
    gear.onclick = gearClicked;
}

function folderActivateOnClick(e, folder) {
    if (e.currentTarget == allPacks && e.currentTarget.classList.contains('active-folder')) {
        for (const el of gamesSettingsFolders) {
            el.classList.remove('active-folder');
            for (const folderKey in userFolders) {
                userFolders[folderKey].isActive = false;
            }
        }
    }
    else if (e.currentTarget == allPacks) {
        for (const el of gamesSettingsFolders) {
            el.classList.add('active-folder');
            for (const folderKey in userFolders) {
                userFolders[folderKey].isActive = true;
            }
        }
    }
    else {
        folder.classList.toggle('active-folder');
        allPacks.classList.remove('active-folder');
        userFolders[folder.id].isActive ? userFolders[folder.id].isActive = false : userFolders[folder.id].isActive = true;
    }
    let userFoldersJSON = JSON.stringify(userFolders);
    localStorage.setItem("folders", userFoldersJSON);
}

function gearClicked() {
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
        folderActivateOnClick(e, allPacks);
    }
    userFolders = JSON.parse(localStorage.getItem("folders"));
    renderAllFolders();
}

async function renderAllFolders() {
    for (const key in userFolders) {
        renderSettingsFolders(userFolders[key].folderName, key);
    }
}

function renderSettingsFolders(folderName, folderId) {
    gamesSettingsFolder.insertAdjacentHTML(
        'beforeend',
        `<div class="db-folder ${userFolders[folderId].isActive ? "active-folder" : ''}" id="${folderId}">
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
        folderActivateOnClick(e, folder);
    }
}

function getActiveFoldersFromSettings() {
    let arr = []
    let userFolders = JSON.parse(localStorage.getItem("folders"));
    for (const folderKey in userFolders) {
        if (userFolders[folderKey].isActive == true) {
            for (const wordObjKey in userFolders[folderKey].words) {
                arr.push(
                    {
                        word: userFolders[folderKey].words[wordObjKey].word,
                        translation: userFolders[folderKey].words[wordObjKey].translation
                    }
                );
            }
        }
    }
    return arr;
}

export { shuffle, gearClicked, getActiveFoldersFromSettings };