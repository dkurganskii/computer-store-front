import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyBDIWXnFXLFBU1CWr_nG0rfAQ6Der_KFHE",
    authDomain: "computer-store-16f57.firebaseapp.com",
    databaseURL: "https://computer-store-16f57.firebaseio.com",
    projectId: "computer-store-16f57",
    storageBucket: "computer-store-16f57.appspot.com",
    messagingSenderId: "655478448603",
    appId: "1:655478448603:web:90641e7ddad7646bcc87fe",
    measurementId: "G-RSQNYBGNCE"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// export

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
