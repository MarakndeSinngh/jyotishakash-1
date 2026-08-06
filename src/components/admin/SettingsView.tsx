import React, { useState, useEffect } from 'react';
import { Settings, Shield, Bell, Database, Globe, Save, CheckCircle2, Phone, Mail, MapPin, Share2, BarChart3, Link as LinkIcon, Megaphone } from 'lucide-react';
import { websiteSettingsService } from '../../services/websiteSettingsService';
import { WebsiteSettings } from '../../models/websiteSettings';

export default function SettingsView() {
  const [settings, setSettings] = useState<WebsiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSettings() {
      try {
        setLoading(true);
        const data = await websiteSettingsService.getSettings();
        setSettings(data);
      } catch (err: any) {
        console.error('Failed to load website settings:', err);
        setError('Failed to load settings');
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleChange = (field: keyof WebsiteSettings, value: any) => {
    if (!settings) return;
    setSettings({
      ...settings,
      [field]: value
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    try {
      await websiteSettingsService.updateSettings(settings);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      console.error('Failed to save settings:', err);
      setError('Failed to save settings');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 text-stone-500 text-xs">
        Loading website settings...
      </div>
    );
  }

  if (!settings) return null;

  return (
    <div className="space-y-6 max-w-5xl pb-16">
      <div>
        <h1 className="text-2xl font-bold font-cinzel text-stone-900">Website & Portal Settings</h1>
        <p className="text-xs text-stone-500">Centralized CMS settings, branding, communication channels, analytics, and global configurations</p>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Website settings successfully updated and synchronized across LEO Family.
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* ==================== GENERAL BRANDING ==================== */}
        <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-stone-800 flex items-center gap-2">
            <Globe className="w-4 h-4 text-amber-700" /> General & Branding
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                Website Name
              </label>
              <input
                type="text"
                value={settings.websiteName}
                onChange={(e) => handleChange('websiteName', e.target.value)}
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                Support Email
              </label>
              <input
                type="email"
                value={settings.supportEmail}
                onChange={(e) => handleChange('supportEmail', e.target.value)}
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                Logo URL
              </label>
              <input
                type="text"
                value={settings.logoUrl}
                onChange={(e) => handleChange('logoUrl', e.target.value)}
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                Favicon URL
              </label>
              <input
                type="text"
                value={settings.faviconUrl}
                onChange={(e) => handleChange('faviconUrl', e.target.value)}
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
              />
            </div>
          </div>
        </div>


        {/* ==================== CONTACT & COMMUNICATION ==================== */}
        <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-stone-800 flex items-center gap-2">
            <Phone className="w-4 h-4 text-amber-700" /> Contact & Communication Channels
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                Primary Phone
              </label>
              <input
                type="text"
                value={settings.primaryPhone}
                onChange={(e) => handleChange('primaryPhone', e.target.value)}
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                Secondary Phone
              </label>
              <input
                type="text"
                value={settings.secondaryPhone}
                onChange={(e) => handleChange('secondaryPhone', e.target.value)}
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                WhatsApp Number
              </label>
              <input
                type="text"
                value={settings.whatsappNumber}
                onChange={(e) => handleChange('whatsappNumber', e.target.value)}
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                Business Hours
              </label>
              <input
                type="text"
                value={settings.businessHours}
                onChange={(e) => handleChange('businessHours', e.target.value)}
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                Office Address
              </label>
              <input
                type="text"
                value={settings.officeAddress}
                onChange={(e) => handleChange('officeAddress', e.target.value)}
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
              />
            </div>
          </div>
        </div>


        {/* ==================== SOCIAL & COMMUNITY ==================== */}
        <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-stone-800 flex items-center gap-2">
            <Share2 className="w-4 h-4 text-amber-700" /> Social & Community Links
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                Facebook URL
              </label>
              <input
                type="text"
                value={settings.facebookUrl}
                onChange={(e) => handleChange('facebookUrl', e.target.value)}
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                Instagram URL
              </label>
              <input
                type="text"
                value={settings.instagramUrl}
                onChange={(e) => handleChange('instagramUrl', e.target.value)}
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                YouTube URL
              </label>
              <input
                type="text"
                value={settings.youtubeUrl}
                onChange={(e) => handleChange('youtubeUrl', e.target.value)}
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                Telegram URL
              </label>
              <input
                type="text"
                value={settings.telegramUrl}
                onChange={(e) => handleChange('telegramUrl', e.target.value)}
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                LinkedIn URL
              </label>
              <input
                type="text"
                value={settings.linkedinUrl}
                onChange={(e) => handleChange('linkedinUrl', e.target.value)}
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
              />
            </div>
          </div>
        </div>


        {/* ==================== ANALYTICS & PIXELS ==================== */}
        <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-stone-800 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-amber-700" /> Analytics & Tracking IDs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                Google Analytics ID
              </label>
              <input
                type="text"
                value={settings.googleAnalyticsId}
                onChange={(e) => handleChange('googleAnalyticsId', e.target.value)}
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                Meta Pixel ID
              </label>
              <input
                type="text"
                value={settings.metaPixelId}
                onChange={(e) => handleChange('metaPixelId', e.target.value)}
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
              />
            </div>
          </div>
        </div>


        {/* ==================== DEFAULT LINKS & FOOTER ==================== */}
        <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-stone-800 flex items-center gap-2">
            <LinkIcon className="w-4 h-4 text-amber-700" /> Default Links & Footer
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                Default Consultation Button Link
              </label>
              <input
                type="text"
                value={settings.defaultConsultationLink}
                onChange={(e) => handleChange('defaultConsultationLink', e.target.value)}
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                Default WhatsApp Link
              </label>
              <input
                type="text"
                value={settings.defaultWhatsAppLink}
                onChange={(e) => handleChange('defaultWhatsAppLink', e.target.value)}
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                Footer Copyright Text
              </label>
              <input
                type="text"
                value={settings.footerCopyright}
                onChange={(e) => handleChange('footerCopyright', e.target.value)}
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
              />
            </div>
          </div>
        </div>


        {/* ==================== ANNOUNCEMENT BAR ==================== */}
        <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-stone-800 flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-amber-700" /> Top Announcement Bar
            </h2>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.announcementEnable}
                onChange={(e) => handleChange('announcementEnable', e.target.checked)}
                className="rounded border-stone-300 text-amber-600 focus:ring-amber-500 w-4 h-4"
              />
              <span className="text-xs font-semibold text-stone-700">Enable Announcement Bar</span>
            </label>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
              Announcement Text
            </label>
            <input
              type="text"
              value={settings.announcementBarText}
              onChange={(e) => handleChange('announcementBarText', e.target.value)}
              className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
            />
          </div>
        </div>


        {/* ==================== FIREBASE STATUS ==================== */}
        <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-stone-800 flex items-center gap-2">
            <Database className="w-4 h-4 text-amber-700" /> Firebase & Database Integration
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-stone-50 border border-stone-200">
              <div>
                <h4 className="text-xs font-semibold text-stone-900">Firestore Database Sync</h4>
                <p className="text-[11px] text-stone-500">Real-time synchronization for website settings & records</p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                Ready for Firestore
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-8 py-3.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            Save All Settings
          </button>
        </div>
      </form>
    </div>
  );
}
