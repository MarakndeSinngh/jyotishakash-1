import { 
  signInWithEmailAndPassword, 
  signOut as fbSignOut, 
  onAuthStateChanged, 
  User 
} from 'firebase/auth';
import { auth } from '../firebase/config';

export const adminAuthService = {
  async signIn(email: string, password: string): Promise<User> {
    if (!auth) {
      console.error('[AdminAuthService] Firebase Auth instance is null. Check .env.local and Firebase initialization.');
      throw new Error('Firebase Auth is not initialized. Please ensure VITE_FIREBASE_* environment variables are set in .env.local and restart the server.');
    }
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  },

  async signOut(): Promise<void> {
    if (!auth) {
      return;
    }
    await fbSignOut(auth);
  },

  onAuthStateChange(callback: (user: User | null) => void) {
    if (!auth) {
      callback(null);
      return () => {};
    }
    return onAuthStateChanged(auth, callback);
  },

  getCurrentUser(): User | null {
    return auth?.currentUser || null;
  }
};
