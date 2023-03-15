// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    setPersistence,
    browserSessionPersistence 
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
 
onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(user)
      console.log(uid)
    } else {
        console.log('sign out')
    }
  });

const logOutButton = document.querySelector('.user_header__logout');
logOutButton.onclick = logOut;
function logOut(){
    signOut(auth).then(() => {
        window.location = 'index.html';  
      }).catch((error) => {
        alert(error.message)
      });
}