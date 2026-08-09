import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBHJTO_X6004-K3SIFOXmiFwMBfYjgxFUQ",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "leo-family-platform.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "leo-family-platform",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "leo-family-platform.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "892277851353",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:892277851353:web:7cf84c19d4ee788e33eac8"
};

const databaseId = import.meta.env.VITE_FIREBASE_FIRESTORE_DATABASE_ID;

if (!firebaseConfig.apiKey) {
  console.error('[Firebase Diagnostics] VITE_FIREBASE_API_KEY is missing or empty.');
} else {
  console.log('[Firebase Diagnostics] Initializing Firebase with Project ID:', firebaseConfig.projectId, 'and Database ID:', databaseId || '(default)');
}

export const app = getApps().length === 0 && firebaseConfig.apiKey 
  ? initializeApp(firebaseConfig) 
  : (getApps()[0] || null);

export const auth = app ? getAuth(app) : null;
export const db = app 
  ? databaseId 
    ? getFirestore(app, databaseId) 
    : getFirestore(app) 
  : null;

if (!auth) {
  console.error('[Firebase Diagnostics] Firebase Auth failed to initialize. auth is null.');
}
if (!db) {
  console.error('[Firebase Diagnostics] Firestore failed to initialize. db is null.');
}



