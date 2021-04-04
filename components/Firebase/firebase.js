import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

import firebaseConfig from './firebaseConfig';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();

export const loginWithEmail = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const registerWithEmail = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);
  
export const authStateChange = (authStateChanged) =>
  auth.onAuthStateChanged(authStateChanged);


export const db = firebase.firestore();

export const fire = firebase.database();

export const fireStorage = firebase.storage();

export const currentuser = auth.currentUser;

export const logout = () => auth.signOut();