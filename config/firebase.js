import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// :: Firebase configurations variables
const config = {
  apiKey: "AIzaSyDDUpM_r4UmcLmjaLelFiwE76Vol5zKQvw",
  authDomain: "frontend-test-jordan.firebaseapp.com",
  projectId: "frontend-test-jordan",
  storageBucket: "frontend-test-jordan.appspot.com",
  messagingSenderId: "891601119093",
  appId: "1:891601119093:web:00e38b974d2a712802953c",
};

/**
 * Initialize firebase config
 */
firebase.initializeApp(config);

/**
 * Firebase Storage reference
 */
export const storageRef = firebase.storage().ref();

/**
 * Creates reference to database
 */
export const firestoreDb = firebase.firestore();

/**
 * Returns a reference for a collection
 * @param {*} ref contains the starting route of a query from firestore database,
 * then you can keep adding docs, collections and subcollections if is needed.
 */
export const firestore = (ref) => firestoreDb.collection(ref);
