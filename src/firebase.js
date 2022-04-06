import { initializeApp } from "firebase/app";

import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    updateProfile
} from "firebase/auth";

import { getDatabase, ref, set, get, child } from "firebase/database";

import {
    getFirestore,
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
        await signInWithPopup(auth, googleProvider)
            .then(function (result) {
                const userData = {
                    uid: result.user.uid,
                    email: result.user.email,
                    projects: [""]
                }

                const dbRef = ref(getDatabase());
                get(child(dbRef, `users/${result.user.uid}`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        console.log(snapshot.val());
                    } else {
                        let db = getDatabase();
                        set(ref(db, 'users/' + result.user.uid), userData)

                    }
                }).catch((error) => {
                    console.error(error);
                });

                return updateProfile(result.user, { displayName: result.user.displayName })

            }).catch(function (error) {
                console.log(error);
            });


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
        await createUserWithEmailAndPassword(auth, email, password)
            .then(function (result) {
                const userData = {
                    uid: result.user.uid,
                    email: result.user.email,
                    projects: [""]
                }

                let database = getDatabase();
                set(ref(database, 'users/' + result.user.uid), userData);
                return updateProfile(result.user, { displayName: name })

            }).catch(function (error) {
                console.log(error);
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