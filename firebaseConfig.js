import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; 


const firebaseConfig = {
  apiKey: "AIzaSyDFUgXnr-y-ywKFvy4R4MoW_fbCdi4KOO0",
  authDomain: "forq-fff84.firebaseapp.com",
  projectId: "forq-fff84",
  storageBucket: "forq-fff84.appspot.com",
  messagingSenderId: "875902549515",
  appId: "1:875902549515:web:f5a1012e21175430cb110e",
  measurementId: "G-16SK52YDQP"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };