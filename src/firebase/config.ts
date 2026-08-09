import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

/**
 * LEO FAMILY FIREBASE CONFIGURATION
 *
 * IMPORTANT:
 * - Firebase Project: leo-family-platform
 * - Firestore Database: (default)
 * - Do NOT use VITE_FIREBASE_FIRESTORE_DATABASE_ID
 * - Do NOT use firebase-applet-config.json
 * - Environment variables may override these values,
 *   but the application remains functional if .env.local is missing.
 */

const firebaseConfig = {
  apiKey:
    import.meta.env.VITE_FIREBASE_API_KEY ||
    'AIzaSyBHJTO_X6004-K3SIFOXmiFwMBfYjgxFU',

  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ||
    'leo-family-platform.firebaseapp.com',

  projectId:
    import.meta.env.VITE_FIREBASE_PROJECT_ID ||
    'leo-family-platform',

  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
    'leo-family-platform.firebasestorage.app',

  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ||
    '892277851353',

  appId:
    import.meta.env.VITE_FIREBASE_APP_ID ||
    '1:892277851353:web:7cf84c19d4ee788e33eac8',
};

/**
 * Firebase App
 */
let appInstance;

try {
  appInstance = getApps().length > 0
    ? getApp()
    : initializeApp(firebaseConfig);

  console.info(
    '[Firebase Diagnostics] Firebase initialized successfully.',
    {
      projectId: firebaseConfig.projectId,
      authDomain: firebaseConfig.authDomain,
      firestoreDatabase: '(default)',
    }
  );
} catch (error) {
  console.error(
    '[Firebase Diagnostics] Firebase initialization failed.',
    error
  );

  appInstance = null;
}

/**
 * Firebase App export
 */
export const app = appInstance;

/**
 * Firebase Authentication
 */
export const auth = app
  ? getAuth(app)
  : null;

/**
 * Firestore
 *
 * IMPORTANT:
 * Always use the DEFAULT Firestore database.
 *
 * DO NOT use:
 * getFirestore(app, databaseId)
 *
 * DO NOT read:
 * VITE_FIREBASE_FIRESTORE_DATABASE_ID
 */
export const db = app
  ? getFirestore(app)
  : null;

/**
 * Runtime diagnostics
 */
if (!app) {
  console.error(
    '[Firebase Diagnostics] Firebase App is not initialized.'
  );
}

if (!auth) {
  console.error(
    '[Firebase Diagnostics] Firebase Auth is not initialized.'
  );
} else {
  console.info(
    '[Firebase Diagnostics] Firebase Auth initialized successfully.'
  );
}

if (!db) {
  console.error(
    '[Firebase Diagnostics] Firestore is not initialized.'
  );
} else {
  console.info(
    '[Firebase Diagnostics] Firestore initialized using database: (default)'
  );
}