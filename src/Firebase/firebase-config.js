import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA0_8R8qKihtjDcFgyOhZbQi00V0MxOMhY",
    authDomain: "my-cv-ac28e.firebaseapp.com",
    projectId: "my-cv-ac28e",
    storageBucket: "my-cv-ac28e.appspot.com",
    messagingSenderId: "55384158437",
    appId: "1:55384158437:web:2ed9dc2cfea0d120f6e40c"
};

const app = initializeApp(firebaseConfig);

export const st = getStorage(app);
export const db = getFirestore(app);
