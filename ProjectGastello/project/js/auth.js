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
    doc
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

let userCredential = undefined;

onAuthStateChanged(auth, (user) => {
    if (user) {
        setUserImage(user);
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
    let userNameArray = document.querySelectorAll('#user-name');
    console.log(userNameArray)
    for (const user of userNameArray) {
        user.innerText = docSnap.data().name;
    }
    if (docSnap.exists()) {
        // console.log(docSnap.data());
        headerIco.src = docSnap.data().photoURL;
    } else { 
        console.log("No such document!");
    } 
}
