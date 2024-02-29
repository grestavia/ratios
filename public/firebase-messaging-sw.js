// public/firebase-messaging-sw.js

importScripts("https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/9.1.2/firebase-messaging.js");

const firebaseConfig = {
    apiKey: "AIzaSyBo-uAkO5cZQnf6xw23ORfHhP_14JwGLJw",
    authDomain: "ratio-chat-app.firebaseapp.com",
    projectId: "ratio-chat-app",
    storageBucket: "ratio-chat-app.appspot.com",
    messagingSenderId: "891675590626",
    appId: "1:891675590626:web:0505d3ab8f9786c03703bb",
    measurementId: "G-TCPSYZ5S39"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
