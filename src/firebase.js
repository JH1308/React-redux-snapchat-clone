import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBZPob5BBjlXA8HRL09uNVo1oBRZmD2jso",
    authDomain: "snapchat-clone-18800.firebaseapp.com",
    projectId: "snapchat-clone-18800",
    storageBucket: "snapchat-clone-18800.appspot.com",
    messagingSenderId: "1012487133419",
    appId: "1:1012487133419:web:efbe22d664759acd9dc6ae"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { db, auth, storage, provider };