import { 
  signInWithEmailAndPassword, 
  signOut as fbSignOut, 
  onAuthStateChanged, 
  User 
} from 'firebase/auth';
import { auth } from '../firebase/config';
import { supabase } from '../lib/supabaseClient';

export const adminAuthService = {
  async signIn(email: string, password: string): Promise<User> {
    if (!auth) {
      console.error('[AdminAuthService] Firebase Auth instance is null. Check .env.local and Firebase initialization.');
      throw new Error('Firebase Auth is not initialized. Please ensure VITE_FIREBASE_* environment variables are set in .env.local and restart the server.');
    }
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    // Also authenticate with Supabase Auth for RLS faculty updates
    try {
      const { error: sbError } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (sbError) {
        console.warn('[AdminAuthService] Supabase Auth sign-in warning:', sbError.message);
      }
    } catch (sbErr) {
      console.warn('[AdminAuthService] Supabase Auth sign-in exception:', sbErr);
    }

    return userCredential.user;
  },

  async signOut(): Promise<void> {
    if (auth) {
      await fbSignOut(auth);
    }
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.warn('[AdminAuthService] Supabase signOut warning:', e);
    }
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
