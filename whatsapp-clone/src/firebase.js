import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBUqCwCa5p7WDXTLZRgHpvGQVjvDaE41CA",
    authDomain: "whatsapp-clone-70ebe.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-70ebe.firebaseio.com",
    projectId: "whatsapp-clone-70ebe",
    storageBucket: "whatsapp-clone-70ebe.appspot.com",
    messagingSenderId: "1090364189456",
    appId: "1:1090364189456:web:52cfdf5b849f70ccc65395"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db= firebaseApp.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth,provider} ;
export default db;