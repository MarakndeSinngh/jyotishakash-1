import { WebsiteSettings } from '../models/websiteSettings';

let CURRENT_SETTINGS: WebsiteSettings = {
  id: 'settings-1',
  websiteName: 'LEO Family - Numerology & Astrology Academy',
  logoUrl: '/gemstone-assets/logo.jpg',
  faviconUrl: '/favicon.ico',
  primaryPhone: '+91 9953713176',
  secondaryPhone: '+91 9876543210',
  whatsappNumber: '+919953713176',
  supportEmail: 'support@leofamily.com',
  officeAddress: '108 Occult Wisdom Tower, Connaught Place, New Delhi, India - 110001',
  facebookUrl: 'https://facebook.com/leofamily',
  instagramUrl: 'https://instagram.com/leofamily',
  youtubeUrl: 'https://youtube.com/@leofamily',
  telegramUrl: 'https://t.me/leofamily',
  linkedinUrl: 'https://linkedin.com/company/leofamily',
  googleAnalyticsId: 'G-XXXXXXXXXX',
  metaPixelId: '123456789012345',
  defaultConsultationLink: 'https://leofamily.com/consult',
  defaultWhatsAppLink: 'https://wa.me/919953713176',
  footerCopyright: '© 2026 LEO Family Academy. All Rights Reserved.',
  businessHours: 'Mon - Sat: 9:00 AM - 7:00 PM IST',
  announcementBarText: '🌟 Special Masterclass Announcement: Register for our upcoming Vedic Numerology live session today!',
  announcementEnable: true,
  updatedAt: new Date().toISOString()
};

export const websiteSettingsRepository = {
  async getSettings(): Promise<WebsiteSettings> {
    return { ...CURRENT_SETTINGS };
  },

  async updateSettings(updates: Partial<WebsiteSettings>): Promise<WebsiteSettings> {
    CURRENT_SETTINGS = {
      ...CURRENT_SETTINGS,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return { ...CURRENT_SETTINGS };
  }
};
