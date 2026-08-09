import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ""
};

if (!firebaseConfig.apiKey) {
  console.error('[Firebase Diagnostics] VITE_FIREBASE_API_KEY is missing or empty. Check .env.local configuration.');
} else {
  console.log('[Firebase Diagnostics] Initializing Firebase with Project ID:', firebaseConfig.projectId);
}

export const app = getApps().length === 0 && firebaseConfig.apiKey 
  ? initializeApp(firebaseConfig) 
  : (getApps()[0] || null);

export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;

if (!auth) {
  console.error('[Firebase Diagnostics] Firebase Auth failed to initialize. auth is null.');
}
if (!db) {
  console.error('[Firebase Diagnostics] Firestore failed to initialize. db is null.');
}



