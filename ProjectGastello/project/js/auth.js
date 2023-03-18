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
    setDoc,
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

const foldersForm = document.querySelector('#folders-form');
const foldersFolderNameInput = foldersForm['folders-input'];
const foldersContainer = document.querySelector('.db-folders__container');

onAuthStateChanged(auth, (user) => {
    if (user) {
        setUserImage(user);
        setUserName(user);
        getUserFolders(user);
        foldersForm.onsubmit = (e) => {
            e.preventDefault();
            setUserFolder(user);
            foldersFolderNameInput.focus();
        }
    } else {
        window.location = 'index.html';
    }
});

const logOutButton = document.querySelector('.user_header__logout');
logOutButton.onclick = logOut;
function logOut() {
    signOut(auth).then(() => {
        window.location = 'index.html';
    }).catch((error) => {
        alert(error.message)
    });
}

async function setUserImage(userCredential) {
    const docRef = doc(db, "users", userCredential.uid);
    const docSnap = await getDoc(docRef);
    let headerIco = document.querySelector('.header__ico');
    headerIco.src = `./icons/avatars/${docSnap.data().photoURL}`;
}

async function setUserName(userCredential) {
    const docRef = doc(db, "users", userCredential.uid);
    const docSnap = await getDoc(docRef);
    let userNameArray = document.querySelectorAll('#user-name');
    for (const user of userNameArray) {
        user.innerText = docSnap.data().name;
    }
}


async function setUserFolder(userCredential) {
    try {
        const foldersFolderNameInputValue = foldersFolderNameInput.value.trim();
        if (foldersFolderNameInputValue != '') {
            const docRef = await addDoc(collection(db, "users", userCredential.uid, "word-folders"), {
                folderName: foldersFolderNameInputValue
            });

            renderUserFolders(userCredential, foldersFolderNameInput.value, docRef.id);
            foldersFolderNameInput.value = '';
            console.log("Folder written with ID: ", docRef.id);
        }
    } catch (e) {
        console.error("Error adding Folder: ", e);
    }
}
async function getUserFolders(userCredential) {
    const q = query(collection(db, "users", userCredential.uid, "word-folders"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
        await renderUserFolders(userCredential, doc.data().folderName, doc.id);
    });
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
            updateUserFolder(userCredential, folderId, folderTextareaValue);
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

        } catch (e) {
            console.error("Error deleting Folder: ", e);
        }
    }
}

async function updateUserFolder(userCredential, folderId, newFolderName) {
    try {
        const docRef = doc(db, "users", userCredential.uid, "word-folders", folderId);
        await updateDoc(docRef, {
            folderName: newFolderName
        });
        console.log("Folder updated with ID: ", folderId);
    } catch (e) {
        console.error("Error updating Folder: ", e.message);
    }
}



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
            const docRef = await addDoc(collection(db, "users", userCredential.uid, "word-folders", folderId, "word"), {
                word: wordsWordInputValue,
                translation: wordsTranslationInputValue,
            });

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
    const q = query(collection(db, "users", userCredential.uid, "word-folders", folderId, "word"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
        await renderUserWords(userCredential, doc.data().word, doc.data().translation, folderId, doc.id);
    });
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

        updateUserWord(userCredential, folderId, wordId, wordTextareaValue, translationTextareaValue);
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
            await deleteDoc(doc(db, "users", userCredential.uid, "word-folders", folderId, "word", wordId));
            wordContainer.remove();
            console.log("Word deleted with ID: ", wordId);
        } catch (e) {
            console.error("Error deleting Word: ", e);
        }
    }
}

async function updateUserWord(userCredential, folderId, wordId, newWord, newTranslation) {
    try {
        const docRef = doc(db, "users", userCredential.uid, "word-folders", folderId, "word", wordId);
        await updateDoc(docRef, {
            word: newWord,
            translation: newTranslation,
        });
        console.log("Word updated with ID: ", wordId);
    } catch (e) {
        console.error("Error updating Word: ", e.message);
    }
}