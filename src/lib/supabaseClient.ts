import { createClient } from '@supabase/supabase-js';

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

const supabaseUrl = getEnv('VITE_SUPABASE_URL') || 'https://placeholder.supabase.co';
const supabaseAnonKey = getEnv('VITE_SUPABASE_ANON_KEY') || 'placeholder-anon-key';

if (!getEnv('VITE_SUPABASE_URL') || !getEnv('VITE_SUPABASE_ANON_KEY')) {
  console.warn('[Supabase Diagnostics] VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is missing. Using placeholder client.');
} else {
  console.log('[Supabase Diagnostics] Initializing Supabase client with URL:', supabaseUrl);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
