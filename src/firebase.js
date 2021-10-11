import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyCTNjne9G4N6YhGuoROlodHbtxLSxgOAoE",
    authDomain: "disneyplusclone-f7503.firebaseapp.com",
    projectId: "disneyplusclone-f7503",
    storageBucket: "disneyplusclone-f7503.appspot.com",
    messagingSenderId: "602144825171",
    appId: "1:602144825171:web:ade61be2ae3ccdac9e0ba6",
    measurementId: "G-68N3DFMZZJ"
  };
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage().ref();

export { auth, provider, storage };
export default db;