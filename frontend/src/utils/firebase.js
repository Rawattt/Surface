import firebase from 'firebase';

// Create a file 'firebasedata.js' and export firebase cofig data in it
import firebaseConfig from './firebasedata';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();

export const storage = firebaseApp.storage();
