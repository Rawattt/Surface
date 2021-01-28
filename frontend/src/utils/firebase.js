import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyATdaLtpc0pAoVFjM6OF_8k-ZD1gdH6W9I',
    authDomain: 'surface-image.firebaseapp.com',
    projectId: 'surface-image',
    storageBucket: 'surface-image.appspot.com',
    messagingSenderId: '91127725679',
    appId: '1:91127725679:web:bc16239e1d8184436bd79a',
    measurementId: 'G-FG3M5KJ9SC'
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();

export const storage = firebaseApp.storage();
