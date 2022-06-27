// Import the functions you need from the SDKs you need
import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVLjpbtdiqE5g1liCL1ApUN1WRIUIaVRc",
  authDomain: "beatsup-d524d.firebaseapp.com",
  projectId: "beatsup-d524d",
  storageBucket: "beatsup-d524d.appspot.com",
  messagingSenderId: "216801393335",
  appId: "1:216801393335:web:2b07b89ccb51711f326b32",
  measurementId: "G-01ZDXS5G8C"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export default storage;