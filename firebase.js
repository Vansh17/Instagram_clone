// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import firebase from 'firebase'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAW9kaPPOrOI9KFJI4BqC1I2CdLSH12og",
  authDomain: "rn-ig-clone-8f6cc.firebaseapp.com",
  projectId: "rn-ig-clone-8f6cc",
  storageBucket: "rn-ig-clone-8f6cc.appspot.com",
  messagingSenderId: "913074051139",
  appId: "1:913074051139:web:6383dba13aabcccd905cf6"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

// export default app

// *********************
// !firebaseConfig.apps.length ? firebaseConfig.initializeApp(firebaseConfig): firebaseConfig.app()

// export default firebase

// ********************************
if(!firebase.apps.length)
{
    firebase.initializeApp(firebaseConfig);
}
const db =firebase.firestore()
export { firebase,db };