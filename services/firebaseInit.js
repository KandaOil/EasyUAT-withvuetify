// import firebase from "firebase";
import firebase, {
  storage
} from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyDNcNewPPfarxEDujgygVFrmZNZhfc9eDo",
  authDomain: "easy-uat.firebaseapp.com",
  databaseURL: "https://easy-uat.firebaseio.com",
  projectId: "easy-uat",
  storageBucket: "easy-uat.appspot.com",
  messagingSenderId: "276141307751"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const firestore = firebase.firestore();
const store = firebase.storage();

firestore.settings({
  timestampsInSnapshots: true
});

export {
  firestore,
  store
};
