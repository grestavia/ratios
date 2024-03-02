import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBo-uAkO5cZQnf6xw23ORfHhP_14JwGLJw",
    authDomain: "ratio-chat-app.firebaseapp.com",
    projectId: "ratio-chat-app",
    storageBucket: "ratio-chat-app.appspot.com",
    messagingSenderId: "891675590626",
    appId: "1:891675590626:web:0505d3ab8f9786c03703bb",
    measurementId: "G-TCPSYZ5S39"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
