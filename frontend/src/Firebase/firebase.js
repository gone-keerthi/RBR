// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';


// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyBg2VcV-nnSgG6ActEpxJgdWGNvGTlrgo8",
    authDomain: "sampleproject-9957d.firebaseapp.com",
    projectId: "sampleproject-9957d",
    storageBucket: "sampleproject-9957d.appspot.com",
    messagingSenderId: "470593826826",
    appId: "1:470593826826:web:30274a4089cc6592ec2ff3",
    measurementId: "G-4EEYQNLJJ7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const auth = firebase.auth;
export const auth = getAuth(app);
// const analytics = getAnalytics(app);