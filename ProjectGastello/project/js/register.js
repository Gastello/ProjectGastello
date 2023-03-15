// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

import {
    getFirestore,
    collection,
    setDoc,
    addDoc,
    doc,
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

const registerForm = document.querySelector('#register');

const userRegisterEmail = registerForm['input_email'];
const userRegisterPassword = registerForm['input_password'];
const userRegisterName = registerForm['input_username'];

registerForm.onsubmit = register;

function register(e) {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, userRegisterEmail.value, userRegisterPassword.value)
        .then(() => { 
            setUser().then(()=>{
                window.location = 'home.html';
            }) 
        })
        .catch(error => {
            alert(error.message)
        })
}
let userCredential = undefined;

onAuthStateChanged(auth, (user) => {
    if (user) {
        userCredential = user;
    }
});

async function setUser() {
    // Add a new document in collection "users" 
    const userRegisterImage = document.querySelector('.swiper-slide-active').children[0].src.split('/'); 
    try {
        await setDoc(doc(db, "users", `${userCredential.uid}`), {
            email: userRegisterEmail.value,
            name: userRegisterName.value,
            photoURL: `./icons/avatars/${userRegisterImage[userRegisterImage.length - 1]}`
        });
        console.log('data added!');
    } catch (e) {
        console.error("Error adding document: ", e);
    }
} 