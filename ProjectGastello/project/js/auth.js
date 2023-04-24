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

// Get data from localStorage
let userFolders;
let userData;
let userCredential;
function getDataFromLocalStorage() {
    userFolders = JSON.parse(localStorage.getItem("folders"));
    userData = JSON.parse(localStorage.getItem("user"));
    // console.log(userFolders)
    // console.log(userData)
    // console.log('Data has been got!')
}

onAuthStateChanged(auth, (user) => {
    if (!user) {
        return;
    }
    userCredential = user;
});

function initAuth() {
    getDataFromLocalStorage();
    setUserImage();
    setUserName();
    getUserFolders(userCredential);
    foldersForm.onsubmit = (e) => {
        e.preventDefault();
        setUserFolder(userCredential);
    }
}

const logOutButton = document.querySelector('.user_header__logout');
logOutButton.onclick = logOut;

function logOut() {
    signOut(auth).then(() => {
        localStorage.removeItem("user");
        localStorage.removeItem("folders");
        window.location = 'index.html';
    }).catch((error) => {
        alert(error.message)
    });
}

function setUserImage() {
    let headerIco = document.querySelector('.header__ico');
    headerIco.src = `./icons/avatars/${userData.userImage}`;
}

function setUserName() {
    let userNameArray = document.querySelectorAll('#user-name');
    for (const user of userNameArray) {
        user.innerText = userData.userName;
    }
}
// =========================FOLDERS=========================

const foldersForm = document.querySelector('#folders-form');
const foldersFolderNameInput = foldersForm['folders-input'];
const foldersContainer = document.querySelector('.db-folders__container');

async function setUserFolder(userCredential) {
    try {
        const foldersFolderNameInputValue = foldersFolderNameInput.value.trim();
        if (foldersFolderNameInputValue != '') {
            // add data to db
            const docRef = await addDoc(collection(db, "users", userCredential.uid, "word-folders"), {
                folderName: foldersFolderNameInputValue
            });
            const docRefId = docRef.id;

            // add data to localStorage
            userFolders[docRefId] = {
                folderName: foldersFolderNameInputValue,
                isActive: false,
                words: {}
            };
            let userFoldersJSON = JSON.stringify(userFolders);
            localStorage.setItem("folders", userFoldersJSON);

            // add data to DOM
            renderUserFolders(userCredential, foldersFolderNameInput.value, docRefId);
            foldersFolderNameInput.value = '';

            console.log("Folder written with ID: ", docRefId);
        }
    } catch (e) {
        console.error("Error adding Folder: ", e);
    }
}
async function getUserFolders(userCredential) {
    for (const key in userFolders) {
        renderUserFolders(userCredential, userFolders[key].folderName, key);
    }
}

function renderUserFolders(userCredential, folderName, folderId) {
    foldersContainer.insertAdjacentHTML(
        'beforeend',
        `<div class="db-folder">
        <div class="db-folder__image">
           <img src="./icons/magic-scroll.svg" alt="magic-scroll">
        </div>
        <div class="db-folder__title">
           ${folderName}
        </div>
        <div class="db-folder__nav db__nav">
           <button class="db-folder__save db__save" id="${folderId}">
              SAVE
           </button>
           <button class="db-folder__edit db__edit" id="${folderId}">
              EDIT
           </button>
           <button class="db-folder__delete db__delete" id="${folderId}">
              DELETE
           </button> 
        </div>
     </div>`
    )
    const folderNavs = foldersContainer.querySelectorAll(`[id='${folderId}']`);

    const folderSaveBtn = folderNavs[0];
    const folderEditBtn = folderNavs[1];
    const folderDeleteBtn = folderNavs[2];
    const folder = folderSaveBtn.parentElement.parentElement;
    const folderTextContainer = folder.querySelector('.db-folder__title');
    folder.onclick = (e) => {
        openUserWordsFromFolder(e, userCredential, folder, folderId)
    };

    folderSaveBtn.onclick = () => {
        const folderTextarea = folder.querySelector('.db-folder__textarea');
        const folderTextareaValue = folderTextarea.value.replaceAll(/\s+/g, ' ').trim();

        if (folderTextareaValue != '') {
            folderTextContainer.textContent = folderTextareaValue;

            if (userFolders[folderId].folderName == folderTextareaValue) {
                console.log('Nothing edited!')
            }
            else {
                updateUserFolder(userCredential, folderId, folderTextareaValue);
            } 
        }
        folderTextarea.remove();

        folderSaveBtn.style.display = 'none';
        folderEditBtn.style.display = 'block';
        folderDeleteBtn.style.display = 'block';
        folderTextContainer.style.display = 'block';

        folder.onclick = (e) => {
            openUserWordsFromFolder(e, userCredential, folder, folderId)
        };
    }
    folderEditBtn.onclick = () => {
        const folderText = folderTextContainer.textContent.replaceAll(/\s+/g, ' ').trim();
        const folderTextContainerHeight = folderTextContainer.offsetHeight;

        folderSaveBtn.style.display = 'block';
        folderEditBtn.style.display = 'none';
        folderDeleteBtn.style.display = 'none';
        folderTextContainer.style.display = 'none';

        folderTextContainer.insertAdjacentHTML(
            'beforebegin',
            `<textarea class="db-folder__textarea">${folderText}</textarea>`
        )
        let folderTextarea = folder.querySelector('.db-folder__textarea');
        folderTextarea.style.height = `${folderTextContainerHeight}px`;
        folder.onclick = null;
    }
    folderDeleteBtn.onclick = () => {
        const folderText = folderTextContainer.textContent.replaceAll(/\s+/g, ' ').trim();
        deleteUserFolder(userCredential, folderId, folderText, folder);
    };
}

async function deleteUserFolder(userCredential, folderId, folderName, folderContainer) {
    if (confirm(`Delete folder ${folderName}?`)) {
        try {
            // delete from db
            const q = query(collection(db, "users", userCredential.uid, "word-folders", folderId, "word"));
            const querySnapshot = await getDocs(q);
            const deleteOps = [];
            querySnapshot.forEach((doc) => {
                deleteOps.push(deleteDoc(doc.ref));
            });
            Promise.all(deleteOps).then(() => {
                deleteDoc(doc(db, "users", userCredential.uid, "word-folders", folderId));
                folderContainer.remove();
                console.log("Folder deleted with ID: ", folderId);
            });

            // delete from localStorage
            delete userFolders[folderId];
            let userFoldersJSON = JSON.stringify(userFolders);
            localStorage.setItem("folders", userFoldersJSON);
        } catch (e) {
            console.error("Error deleting Folder: ", e);
        }
    }
}

async function updateUserFolder(userCredential, folderId, newFolderName) {
    try {
        // update in db
        const docRef = doc(db, "users", userCredential.uid, "word-folders", folderId);
        await updateDoc(docRef, {
            folderName: newFolderName
        });

        // update in localStorage 
        userFolders[folderId].folderName = newFolderName;
        let userFoldersJSON = JSON.stringify(userFolders);
        localStorage.setItem("folders", userFoldersJSON);
        console.log("Folder updated with ID: ", folderId);
    } catch (e) {
        console.error("Error updating Folder: ", e.message);
    }
}

// =========================WORDS=========================

const wordsForm = document.querySelector('#words-form');
const wordsWordInput = wordsForm['words-word-input'];
const wordsTranslationInput = wordsForm['words-translation-input'];
const wordsContainer = document.querySelector('.db-words__container');

function openUserWordsFromFolder(e, userCredential, folder, folderId) {
    wordsContainer.innerText = "";
    let folderName = folder.querySelector('.db-folder__title');
    let wordsfolderName = document.querySelector('.db-words__folder-name');
    wordsfolderName.innerText = folderName.innerText;
    checkIsNotNav(e);
    getUserWords(userCredential, folderId);
    wordsForm.onsubmit = (e) => {
        e.preventDefault();
        setUserWord(userCredential, folderId)
        wordsWordInput.focus();
    };
};

async function setUserWord(userCredential, folderId) {
    try {
        const wordsWordInputValue = wordsWordInput.value.trim();
        const wordsTranslationInputValue = wordsTranslationInput.value.trim();
        if (wordsWordInputValue != '' && wordsTranslationInputValue != '') {
            // add data to db
            const docRef = await addDoc(collection(db, "users", userCredential.uid, "word-folders", folderId, "word"), {
                word: wordsWordInputValue,
                translation: wordsTranslationInputValue,
            });
            const docRefId = docRef.id;

            // add data to localStorage
            userFolders[folderId].words[docRefId] = {
                word: wordsWordInputValue,
                translation: wordsTranslationInputValue,
            };
            let userFoldersJSON = JSON.stringify(userFolders);
            localStorage.setItem("folders", userFoldersJSON);

            // add data to DOM
            renderUserWords(userCredential, wordsWordInput.value, wordsTranslationInput.value, folderId, docRef.id);
            wordsWordInput.value = '';
            wordsTranslationInput.value = '';
            console.log("Word written with ID: ", docRef.id);
        }
    } catch (e) {
        console.error("Error adding Word: ", e);
    }
}

async function getUserWords(userCredential, folderId) {
    let openedFolderObj = userFolders[folderId].words;
    for (const key in openedFolderObj) {
        let wordId = key;
        let userWord = openedFolderObj[key].word;
        let userTranslation = openedFolderObj[key].translation;

        renderUserWords(userCredential, userWord, userTranslation, folderId, wordId);
    }
}

function renderUserWords(userCredential, userWord, userTranslation, folderId, wordId) {
    wordsContainer.insertAdjacentHTML(
        'beforeend',
        `<div class="db-word">
        <div class="db-word__image">
           <img src="./icons/magic-stone.svg" alt="magic-stone">
        </div>
        <div class="db-word__info">
           <div class="db-word__word">${userWord}</div>
           <div class="db-word__translation">${userTranslation}</div>
        </div>
        <div class="db-word__nav db__nav">
           <button class="db-word__save db__save" id=${wordId}>
              SAVE
           </button>
           <button class="db-word__edit db__edit" id=${wordId}>
              EDIT
           </button>
           <button class="db-word__delete db__delete" id=${wordId}>
              DELETE
           </button>
        </div>
     </div>`
    )
    const wordNavs = wordsContainer.querySelectorAll(`[id='${wordId}']`);

    const wordSaveBtn = wordNavs[0];
    const wordEditBtn = wordNavs[1];
    const wordDeleteBtn = wordNavs[2];
    const word = wordSaveBtn.parentElement.parentElement;
    const wordTextContainer = word.querySelector('.db-word__word');
    const translationTextContainer = word.querySelector('.db-word__translation');

    wordSaveBtn.onclick = () => {
        const translationTextarea = word.querySelector('.db-word__translation-textarea');
        const wordTextarea = word.querySelector('.db-word__word-textarea');

        const wordTextareaValue = wordTextarea.value.replaceAll(/\s+/g, ' ').trim();
        const translationTextareaValue = translationTextarea.value.replaceAll(/\s+/g, ' ').trim();

        if (wordTextareaValue != '' && translationTextareaValue != '') {
            wordTextContainer.textContent = wordTextareaValue;
            translationTextContainer.textContent = translationTextareaValue;
        }

        wordTextarea.remove();
        translationTextarea.remove();

        wordSaveBtn.style.display = 'none';
        wordEditBtn.style.display = 'block';
        wordDeleteBtn.style.display = 'block';

        wordTextContainer.style.display = 'block';
        translationTextContainer.style.display = 'block';

        if (userFolders[folderId].words[wordId].word == wordTextareaValue &&
            userFolders[folderId].words[wordId].translation == translationTextareaValue) {
            console.log('Nothing edited!')
        }
        else {
            updateUserWord(userCredential, folderId, wordId, wordTextareaValue, translationTextareaValue);
        } 
    }
    wordEditBtn.onclick = () => {
        const wordText = wordTextContainer.textContent.replaceAll(/\s+/g, ' ').trim();
        const wordTextContainerHeight = wordTextContainer.offsetHeight;
        const wordTextContainerWidth = wordTextContainer.offsetWidth;

        const translationText = translationTextContainer.textContent.replaceAll(/\s+/g, ' ').trim();
        const translationTextContainerHeight = translationTextContainer.offsetHeight;
        const translationTextContainerWidth = translationTextContainer.offsetWidth;

        wordSaveBtn.style.display = 'block';
        wordEditBtn.style.display = 'none';
        wordDeleteBtn.style.display = 'none';

        wordTextContainer.style.display = 'none';
        translationTextContainer.style.display = 'none';

        wordTextContainer.insertAdjacentHTML(
            'beforebegin',
            `<textarea class="db-word__word-textarea">${wordText}</textarea>`
        )
        const wordTextarea = word.querySelector('.db-word__word-textarea');
        wordTextarea.style.height = `${wordTextContainerHeight}px`;
        wordTextarea.style.flexBasis = `${wordTextContainerWidth}px`;

        translationTextContainer.insertAdjacentHTML(
            'beforebegin',
            `<textarea class="db-word__translation-textarea">${translationText}</textarea>`
        )
        const translateTextarea = word.querySelector('.db-word__translation-textarea');
        translateTextarea.style.height = `${translationTextContainerHeight}px`;
        translateTextarea.style.flexBasis = `${translationTextContainerWidth}px`;
    }
    wordDeleteBtn.onclick = () => {
        const wordText = wordTextContainer.textContent.replaceAll(/\s+/g, ' ').trim();
        deleteUserWord(userCredential, folderId, wordId, wordText, word);
    };
}

async function deleteUserWord(userCredential, folderId, wordId, wordText, wordContainer) {
    if (confirm(`Delete word ${wordText}?`)) {
        try {
            // delete from db
            await deleteDoc(doc(db, "users", userCredential.uid, "word-folders", folderId, "word", wordId));

            // delete from localStorage
            delete userFolders[folderId].words[wordId];
            let userFoldersJSON = JSON.stringify(userFolders);
            localStorage.setItem("folders", userFoldersJSON);

            wordContainer.remove();
            console.log("Word deleted with ID: ", wordId);
        } catch (e) {
            console.error("Error deleting Word: ", e);
        }
    }
}

async function updateUserWord(userCredential, folderId, wordId, newWord, newTranslation) {
    try {
        // update in db
        const docRef = doc(db, "users", userCredential.uid, "word-folders", folderId, "word", wordId);
        await updateDoc(docRef, {
            word: newWord,
            translation: newTranslation,
        });

        // update in localStorage 
        userFolders[folderId].words[wordId].word = newWord;
        userFolders[folderId].words[wordId].translation = newTranslation;
        let userFoldersJSON = JSON.stringify(userFolders);
        localStorage.setItem("folders", userFoldersJSON);

        console.log("Word updated with ID: ", wordId);
    } catch (e) {
        console.error("Error updating Word: ", e.message);
    }
}

export default initAuth;