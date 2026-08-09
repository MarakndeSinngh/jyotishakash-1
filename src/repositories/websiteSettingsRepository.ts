import { WebsiteSettings } from '../models/websiteSettings';
import { db } from '../firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const COLLECTION_NAME = 'websiteSettings';
const DOCUMENT_ID = 'global';

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
    try {
      if (!db) {
        return { ...CURRENT_SETTINGS };
      }
      const docRef = doc(db, COLLECTION_NAME, DOCUMENT_ID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data() as WebsiteSettings;
        CURRENT_SETTINGS = {
          ...CURRENT_SETTINGS,
          ...data,
          id: DOCUMENT_ID
        };
        return { ...CURRENT_SETTINGS };
      } else {
        // Initialize default document in Firestore if not exists
        await setDoc(docRef, CURRENT_SETTINGS);
        return { ...CURRENT_SETTINGS };
      }
    } catch (error) {
      console.warn('Could not fetch website settings from Firestore, using local fallback settings:', error);
      return { ...CURRENT_SETTINGS };
    }
  },

  async updateSettings(updates: Partial<WebsiteSettings>): Promise<WebsiteSettings> {
    try {
      const current = await this.getSettings();
      const updated: WebsiteSettings = {
        ...current,
        ...updates,
        id: DOCUMENT_ID,
        updatedAt: new Date().toISOString()
      };

      if (db) {
        const docRef = doc(db, COLLECTION_NAME, DOCUMENT_ID);
        await setDoc(docRef, updated, { merge: true });
      }

      CURRENT_SETTINGS = updated;
      return { ...CURRENT_SETTINGS };
    } catch (error) {
      console.error('Error updating website settings in Firestore:', error);
      throw error;
    }
  }
};
