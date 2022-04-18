import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { initializeFirestore } from "firebase/firestore";
const firebaseConfig = {
	// your config goes here
	apiKey: "AIzaSyAqygLC4ID1WxyWZVXlLX_rY368pFLEgUE",
	authDomain: "cheto-b3750.firebaseapp.com",
	projectId: "cheto-b3750",
	storageBucket: "cheto-b3750.appspot.com",
	messagingSenderId: "679103969405",
	appId: "1:679103969405:web:e27013e8b47306f02ed914",
	measurementId: "G-29W6KK0GDT",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = initializeFirestore(app, {
	experimentalForceLongPolling: true,
});

export function signIn(email, password) {
	return signInWithEmailAndPassword(auth, email, password);
}
export function signUp(email, password) {
	return createUserWithEmailAndPassword(auth, email, password);
}
