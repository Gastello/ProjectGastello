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

onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(user)
      console.log(uid)
    } else {
        window.location = 'index.html';
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

const home__logoButton = document.querySelector('.home__logo');
home__logoButton.onclick = addData;
async function addData(){
    try {
        const docRef = await addDoc(collection(db, "users"), {
          first: "Ada",
          last: "Lovelace",
          born: 1815
        }); 
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}