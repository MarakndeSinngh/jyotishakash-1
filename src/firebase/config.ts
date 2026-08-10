import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAWq9p2oo_ZlHuHaWKIQDHZ0m5RJEoetIQ",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "gen-lang-client-0035321266.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "gen-lang-client-0035321266",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "gen-lang-client-0035321266.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "979849969657",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:979849969657:web:75b61ca845cb72960ec728"
};

const databaseId = import.meta.env.VITE_FIREBASE_FIRESTORE_DATABASE_ID || "ai-studio-remixleofamilyal-e5f38b4f-549e-4b53-a903-8142b9c43e41";

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