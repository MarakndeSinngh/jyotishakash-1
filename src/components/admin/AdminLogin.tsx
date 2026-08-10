import React, { useState } from 'react';
import { Lock, Mail, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { adminAuthService } from '../../services/adminAuthService';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export default function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [email, setEmail] = useState('admin@leofamily.com');
  const [password, setPassword] = useState('Password');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await adminAuthService.signIn(email, password);
      onLoginSuccess();
    } catch (err: any) {
      console.error('Admin login error:', err);
      let message = 'Unable to sign in. Please try again.';
      const errMessage = err?.message || '';
      if (errMessage.includes('Invalid login credentials') || errMessage.includes('Invalid email or password')) {
        message = 'Invalid email or password.';
      } else if (errMessage.includes('not authorized')) {
        message = 'You are not authorized to access the admin portal.';
      } else if (errMessage) {
        message = errMessage;
      }
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background decorative glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-stone-200/80 p-8 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-700 mb-4 border border-amber-500/20 shadow-inner">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-medium mb-2 border border-amber-200/50">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Secure Portal
          </div>
          <h1 className="text-2xl font-bold font-cinzel text-stone-900 tracking-wide">
            LEO Family Admin
          </h1>
          <p className="text-sm text-stone-500 mt-1">
            Sign in to manage academy, webinars, and programs
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">
              Admin Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-stone-50/50 border border-stone-200 rounded-xl text-stone-900 text-sm focus:outline-none focus:border-amber-600 focus:bg-white transition-all"
                placeholder="admin@leofamily.com"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600">
                Password
              </label>
              <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-xs text-amber-700 hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-stone-50/50 border border-stone-200 rounded-xl text-stone-900 text-sm focus:outline-none focus:border-amber-600 focus:bg-white transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-stone-500">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-stone-300 text-amber-600 focus:ring-amber-500" />
              <span>Remember this device</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 bg-stone-900 hover:bg-stone-800 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Access Admin Portal</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-stone-100 text-center">
          <p className="text-xs text-stone-400">
            Protected by LEO Family Security & Supabase Auth
          </p>
          <div className="mt-3">
            <a
              href="/"
              className="text-xs text-amber-700 hover:text-amber-800 font-medium inline-flex items-center gap-1"
            >
              ← Return to LEO Family Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
