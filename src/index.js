import './style.css';
import {
    hideLoginError,
    showLoginState,
    showLoginForm,
    showApp,
    showLoginError,
    btnLogin,
    btnSignup,
    btnLogout,
    txtPassword
} from './ui'
// Import the functions you need from the SDKs you need
//import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js'
import {initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, connectAuthEmulator, signInWithEmailAndPassword,createUserWithEmailAndPassword } from 'firebase/auth';
    // If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
//import { analytics } from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-analytics.js'

    // Add Firebase products that you want to use
//import { auth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js'
//import { firestore } from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_Gh13Kj7XpYUJ77u-P6Rm_mluMSldj2s",
  authDomain: "cis-454-group-2.firebaseapp.com",
  databaseURL: "https://cis-454-group-2-default-rtdb.firebaseio.com",
  projectId: "cis-454-group-2",
  storageBucket: "cis-454-group-2.appspot.com",
  messagingSenderId: "316148964938",
  appId: "1:316148964938:web:d87993a8475d6aa9cd90b3",
  measurementId: "G-6LV9TBP0N2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const auth = getAuth(firebaseApp);
connectAuthEmulator(auth, "http://localhost:9099");
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
const loginEmailPassword = async () => {
    const loginEmail = txtEmail.value;
    const loginPassword = txtPassword.value;

    try{
        const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        console.log(userCredential.user);
     }
     catch(error) {
         console.log(error);
         showLoginError(error);
     }

}

btnLogin.addEventListener("click", loginEmailPassword);

const createAccount = async () => {
    try{
        const userCredential = await createUserWithEmailAndPassword(auth, loginEmail, loginPassword);
        console.log(userCredential.user);
     }
     catch(error) {
         console.log(error);
         showLoginError(error);
     }
}

btnLogin.addEventListener("click", loginEmailPassword);
//const db = getFirestore(firebaseApp);
//db.collection('todos').getDocs();
//const todosCol = collection(db, 'todos');
//const snapshot = await getDocs(todosCol);

//detect auth state
onAuthStateChanged(auth, user => {
    if(user != null) {
        console.log('logged in!');
    } else {
        console.log('No user');
    }
});