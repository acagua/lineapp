import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
  apiKey: "AIzaSyC1q4wJR3ypcME7lkATSuZtYfbyf2Ljtkg",
  authDomain: "lineapp-1a46c.firebaseapp.com",
  projectId: "lineapp-1a46c",
  storageBucket: "lineapp-1a46c.appspot.com",
  messagingSenderId: "526677408973",
  appId: "1:526677408973:web:afb6f641661a7b5d0f3d84",
  measurementId: "G-7CKRVN292M"
};

  firebase.initializeApp(firebaseConfig);

  const db  = firebase.firestore();

  export { 
      db,
      firebase
  }