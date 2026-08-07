import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import appletConfig from '../../firebase-applet-config.json';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || (appletConfig as any).apiKey || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || (appletConfig as any).authDomain || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || (appletConfig as any).projectId || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || (appletConfig as any).storageBucket || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || (appletConfig as any).messagingSenderId || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || (appletConfig as any).appId || ""
};

export const app = getApps().length === 0 && firebaseConfig.apiKey ? initializeApp(firebaseConfig) : (getApps()[0] || null);
export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app, (appletConfig as any).firestoreDatabaseId || undefined) : null;
