import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBG1kDi4RBQAZ8JmFv0P5RpreviRpB2Asw",
  authDomain: "intercambio-libros.firebaseapp.com",
  projectId: "intercambio-libros",
  storageBucket: "intercambio-libros.appspot.com",
  messagingSenderId: "1056919706261",
  appId: "1:1056919706261:web:48206336be32bc2883999c"
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { database, auth, storage };
