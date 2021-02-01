import * as firebase from 'firebase';
import 'firebase/storage';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyDdvCB1VRhKo9ESjS-nwd_SqocCjkvYgwg",
  authDomain: "teste-a175d.firebaseapp.com",
  projectId: "teste-a175d",
  storageBucket: "teste-a175d.appspot.com",
  messagingSenderId: "745896178544",
  appId: "1:745896178544:web:bb4ba0915fd2bc455d95b5"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage()

export { database, auth , storage,firebase,}