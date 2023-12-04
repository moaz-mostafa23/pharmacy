import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAL2ywDDmEf3lmZad98_k6fMlPoSREd6mo",
    authDomain: "pharmacy-431e8.firebaseapp.com",
    projectId: "pharmacy-431e8",
    storageBucket: "pharmacy-431e8.appspot.com",
    messagingSenderId: "534091650944",
    appId: "1:534091650944:web:33a47bc602d1eb7f7b9365"
  };

  firebase.initializeApp(firebaseConfig)

  const auth = firebase.auth()
  const db = firebase.firestore()
  const storage = firebase.storage()

  export {auth, db, storage}