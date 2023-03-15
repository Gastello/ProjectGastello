// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    setPersistence,
    browserLocalPersistence 
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return signInWithEmailAndPassword(auth, email, password);
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
  }); 

const loginForm = document.querySelector('#login'); 
const loginRegisterEmail = loginForm['input_login'];
const loginRegisterPassword = loginForm['input_password'];  

loginForm.onsubmit = login; 

function login(e){
    e.preventDefault();
    signInWithEmailAndPassword(auth, loginRegisterEmail.value, loginRegisterPassword.value)
        .then((userCredential) => { 
            window.location = 'home.html';  
        })
        .catch(error => {
            alert(error.message)
        })
} 