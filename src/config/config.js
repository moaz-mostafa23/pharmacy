import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAL2ywDDmEf3lmZad98_k6fMlPoSREd6mo",
    authDomain: "pharmacy-431e8.firebaseapp.com",
    projectId: "pharmacy-431e8",
    storageBucket: "pharmacy-431e8.appspot.com",
    messagingSenderId: "534091650944",
    appId: "1:534091650944:web:33a47bc602d1eb7f7b9365"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const storage = getStorage(); 

export { auth, db, storage, ref };
