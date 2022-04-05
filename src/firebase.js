import { initializeApp } from "firebase/app";

import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";

import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
    await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
    });
    }
} catch (err) {
    console.error(err);
    alert(err.message);
}
};

const logInWithEmailAndPassword = async (email, password) => {
try {
    await signInWithEmailAndPassword(auth, email, password);
} catch (err) {
    console.error(err);
    alert(err.message);
}
};
const registerWithEmailAndPassword = async (name, email, password) => {
try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
    uid: user.uid,
    name: name,
    authProvider: "local",
    email,
    });
} catch (err) {
    console.error(err);
    alert(err.message);
}
};
const sendPasswordReset = async (email) => {
try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
} catch (err) {
    console.error(err);
    alert(err.message);
}
};
const logout = () => {
signOut(auth);
};
export {
auth,
db,
signInWithGoogle,
logInWithEmailAndPassword,
signInWithEmailAndPassword,
registerWithEmailAndPassword,
sendPasswordReset,
sendPasswordResetEmail,
logout,
  };

