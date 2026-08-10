import { createClient, SupabaseClient } from '@supabase/supabase-js';

const getEnv = (key: string): string => {
  try {
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
      // @ts-ignore
      return import.meta.env[key];
    }
  } catch (e) {}
  try {
    if (typeof process !== 'undefined' && process.env && process.env[key]) {
      return process.env[key] || '';
    }
  } catch (e) {}
  return '';
};

const supabaseUrl = getEnv('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnv('VITE_SUPABASE_ANON_KEY');

let supabaseInstance: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
  console.log('[Supabase Diagnostics] Initializing Supabase client with URL:', supabaseUrl);
  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn('[Supabase Diagnostics] VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is missing. Supabase client is uninitialized.');
}

const createDummyClient = () => {
  return new Proxy({} as SupabaseClient, {
    get(target, prop) {
      return (...args: any[]) => {
        console.error(`[Supabase Error] Attempted to call supabase.${String(prop)}, but VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are not configured.`);
        throw new Error('Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
      };
    }
  });
};

export const supabase: SupabaseClient = supabaseInstance || createDummyClient();

