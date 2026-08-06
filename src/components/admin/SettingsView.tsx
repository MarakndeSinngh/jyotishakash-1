import React, { useState } from 'react';
import { Settings, Shield, Bell, Database, Globe, Save, CheckCircle2 } from 'lucide-react';

export default function SettingsView() {
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold font-cinzel text-stone-900">Portal Settings</h1>
        <p className="text-xs text-stone-500">Configure Firebase backend, security rules, notification preferences, and API gateways</p>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Settings successfully updated and synchronized with server.
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-stone-700 flex items-center gap-2">
            <Globe className="w-4 h-4 text-amber-700" /> General Academy Configuration
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                Portal Name
              </label>
              <input
                type="text"
                defaultValue="LEO Family Admin Portal"
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                Support Email
              </label>
              <input
                type="email"
                defaultValue="support@leofamily.com"
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-stone-700 flex items-center gap-2">
            <Database className="w-4 h-4 text-amber-700" /> Firebase & Database Integration
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-stone-50 border border-stone-200">
              <div>
                <h4 className="text-xs font-semibold text-stone-900">Firestore Database Sync</h4>
                <p className="text-[11px] text-stone-500">Real-time synchronization for student enrollments and records</p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                Connected
              </span>
            </div>
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-stone-50 border border-stone-200">
              <div>
                <h4 className="text-xs font-semibold text-stone-900">Firebase Authentication</h4>
                <p className="text-[11px] text-stone-500">Secure JWT tokens & multi-factor authentication ready</p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                Ready
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-stone-700 flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-700" /> Notifications & WhatsApp Reminders
          </h2>
          <div className="space-y-3 text-xs text-stone-700">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-stone-300 text-amber-600 focus:ring-amber-500 w-4 h-4" />
              <span>Send automatic WhatsApp reminders 1 hour before live webinars</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-stone-300 text-amber-600 focus:ring-amber-500 w-4 h-4" />
              <span>Email notification to admins on new course enrollment</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold shadow-md transition-all inline-flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Configuration
          </button>
        </div>
      </form>
    </div>
  );
}
