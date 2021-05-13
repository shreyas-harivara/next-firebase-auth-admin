import firebase from "firebase";
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCrc6QT2y82A9e8YQ_QI-XZDMWzkrqm36E",
  authDomain: "otp-test-10cf5.firebaseapp.com",
  projectId: "otp-test-10cf5",
  storageBucket: "otp-test-10cf5.appspot.com",
  messagingSenderId: "768156083442",
  appId: "1:768156083442:web:72cd108659ba6573cf9c6b",
  measurementId: "G-K054W11J8P"
};

export default function firebaseClient() {
  if (!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG);
  }
}
