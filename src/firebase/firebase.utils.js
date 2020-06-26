import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAbf__HtEZuHchb20zaCHb_5Oo33IUk7Q8",
  authDomain: "clothing-shop-2b253.firebaseapp.com",
  databaseURL: "https://clothing-shop-2b253.firebaseio.com",
  projectId: "clothing-shop-2b253",
  storageBucket: "clothing-shop-2b253.appspot.com",
  messagingSenderId: "218376645684",
  appId: "1:218376645684:web:d348daab7eff0c273eee61",
  measurementId: "G-483F3KTLLF"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
