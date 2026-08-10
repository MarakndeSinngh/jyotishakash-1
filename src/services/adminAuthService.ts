import { supabase } from '../lib/supabaseClient';
import { User as SupabaseUser } from '@supabase/supabase-js';

export const adminAuthService = {
  async signIn(email: string, password: string): Promise<SupabaseUser> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      throw error;
    }

    if (!data.user) {
      throw new Error('Sign in failed: No user returned.');
    }

    // Verify admin authorization in public.admin_users using user_id
    try {
      const { data: adminRecord, error: adminError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('user_id', data.user.id)
        .single();

      if (adminError || !adminRecord) {
        await supabase.auth.signOut();
        throw new Error('You are not authorized to access the admin portal.');
      }
    } catch (err: any) {
      await supabase.auth.signOut();
      throw new Error(err.message || 'You are not authorized to access the admin portal.');
    }

    return data.user;
  },

  async signOut(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.warn('[AdminAuthService] Supabase signOut error:', error);
    }
  },

  onAuthStateChange(callback: (user: SupabaseUser | null) => void) {
    supabase.auth.getSession().then(({ data: { session } }) => {
      callback(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      callback(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  },

  async getCurrentUser(): Promise<SupabaseUser | null> {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.user ?? null;
  }
};

