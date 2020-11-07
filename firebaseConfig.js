import * as firebase from "firebase";
import firestore from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPeC4k5uDSCPe3laCkvjux1RHtjldAsRI",
  authDomain: "askans-39d12.firebaseapp.com",
  databaseURL: "https://askans-39d12.firebaseio.com",
  projectId: "askans-39d12",
  storageBucket: "askans-39d12.appspot.com",
  messagingSenderId: "238844208670",
  appId: "1:238844208670:web:46465934050d652616b00f",
  measurementId: "G-DJ040DVTNX",
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const storage = firebase.storage();
export default firebase;
