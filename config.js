import firebase from "firebase"

 const firebaseConfig = {
  apiKey: "AIzaSyBZOfIT7_-aR7Kgy5C4jXdfhI55tNtMpv4",
  authDomain: "guitar-app-b12ca.firebaseapp.com",
  projectId: "guitar-app-b12ca",
  storageBucket: "guitar-app-b12ca.appspot.com",
  messagingSenderId: "1040541913857",
  appId: "1:1040541913857:web:94e844ad66305d766f8100"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

export default firebase.firestore()