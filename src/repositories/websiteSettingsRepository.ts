import { WebsiteSettings } from '../models/websiteSettings';
import { supabase } from '../lib/supabaseClient';

let CURRENT_SETTINGS: WebsiteSettings = {
  id: 'global',
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

function mapRowToSettings(row: any): WebsiteSettings {
  return {
    id: row.id || 'global',
    websiteName: row.website_name ?? CURRENT_SETTINGS.websiteName,
    logoUrl: row.logo_url ?? CURRENT_SETTINGS.logoUrl,
    faviconUrl: row.favicon_url ?? CURRENT_SETTINGS.faviconUrl,
    primaryPhone: row.primary_phone ?? CURRENT_SETTINGS.primaryPhone,
    secondaryPhone: row.secondary_phone ?? CURRENT_SETTINGS.secondaryPhone,
    whatsappNumber: row.whatsapp_number ?? CURRENT_SETTINGS.whatsappNumber,
    supportEmail: row.support_email ?? CURRENT_SETTINGS.supportEmail,
    officeAddress: row.office_address ?? CURRENT_SETTINGS.officeAddress,
    facebookUrl: row.facebook_url ?? CURRENT_SETTINGS.facebookUrl,
    instagramUrl: row.instagram_url ?? CURRENT_SETTINGS.instagramUrl,
    youtubeUrl: row.youtube_url ?? CURRENT_SETTINGS.youtubeUrl,
    telegramUrl: row.telegram_url ?? CURRENT_SETTINGS.telegramUrl,
    linkedinUrl: row.linkedin_url ?? CURRENT_SETTINGS.linkedinUrl,
    googleAnalyticsId: row.google_analytics_id ?? CURRENT_SETTINGS.googleAnalyticsId,
    metaPixelId: row.meta_pixel_id ?? CURRENT_SETTINGS.metaPixelId,
    defaultConsultationLink: row.default_consultation_link ?? CURRENT_SETTINGS.defaultConsultationLink,
    defaultWhatsAppLink: row.default_whatsapp_link ?? CURRENT_SETTINGS.defaultWhatsAppLink,
    footerCopyright: row.footer_copyright ?? CURRENT_SETTINGS.footerCopyright,
    businessHours: row.business_hours ?? CURRENT_SETTINGS.businessHours,
    announcementBarText: row.announcement_bar_text ?? CURRENT_SETTINGS.announcementBarText,
    announcementEnable: row.announcement_enable ?? CURRENT_SETTINGS.announcementEnable,
    updatedAt: row.updated_at ?? CURRENT_SETTINGS.updatedAt
  };
}

function mapSettingsToRow(settings: Partial<WebsiteSettings>): any {
  const row: any = {};
  if (settings.websiteName !== undefined) row.website_name = settings.websiteName;
  if (settings.logoUrl !== undefined) row.logo_url = settings.logoUrl;
  if (settings.faviconUrl !== undefined) row.favicon_url = settings.faviconUrl;
  if (settings.primaryPhone !== undefined) row.primary_phone = settings.primaryPhone;
  if (settings.secondaryPhone !== undefined) row.secondary_phone = settings.secondaryPhone;
  if (settings.whatsappNumber !== undefined) row.whatsapp_number = settings.whatsappNumber;
  if (settings.supportEmail !== undefined) row.support_email = settings.supportEmail;
  if (settings.officeAddress !== undefined) row.office_address = settings.officeAddress;
  if (settings.facebookUrl !== undefined) row.facebook_url = settings.facebookUrl;
  if (settings.instagramUrl !== undefined) row.instagram_url = settings.instagramUrl;
  if (settings.youtubeUrl !== undefined) row.youtube_url = settings.youtubeUrl;
  if (settings.telegramUrl !== undefined) row.telegram_url = settings.telegramUrl;
  if (settings.linkedinUrl !== undefined) row.linkedin_url = settings.linkedinUrl;
  if (settings.googleAnalyticsId !== undefined) row.google_analytics_id = settings.googleAnalyticsId;
  if (settings.metaPixelId !== undefined) row.meta_pixel_id = settings.metaPixelId;
  if (settings.defaultConsultationLink !== undefined) row.default_consultation_link = settings.defaultConsultationLink;
  if (settings.defaultWhatsAppLink !== undefined) row.default_whatsapp_link = settings.defaultWhatsAppLink;
  if (settings.footerCopyright !== undefined) row.footer_copyright = settings.footerCopyright;
  if (settings.businessHours !== undefined) row.business_hours = settings.businessHours;
  if (settings.announcementBarText !== undefined) row.announcement_bar_text = settings.announcementBarText;
  if (settings.announcementEnable !== undefined) row.announcement_enable = settings.announcementEnable;
  if (settings.updatedAt !== undefined) row.updated_at = settings.updatedAt;
  return row;
}

export const websiteSettingsRepository = {
  async getSettings(): Promise<WebsiteSettings> {
    try {
      const { data, error } = await supabase
        .from('website_settings')
        .select('*')
        .eq('id', 'global')
        .maybeSingle();

      if (error) {
        console.warn('Could not fetch website settings from Supabase, using local fallback settings:', error.message);
        return { ...CURRENT_SETTINGS };
      }

      if (data) {
        const mapped = mapRowToSettings(data);
        CURRENT_SETTINGS = {
          ...CURRENT_SETTINGS,
          ...mapped,
          id: 'global'
        };
        return { ...CURRENT_SETTINGS };
      } else {
        console.warn('Website settings global row not found in Supabase, using local fallback settings.');
        return { ...CURRENT_SETTINGS };
      }
    } catch (error) {
      console.warn('Could not fetch website settings from Supabase, using local fallback settings:', error);
      return { ...CURRENT_SETTINGS };
    }
  },

  async updateSettings(updates: Partial<WebsiteSettings>): Promise<WebsiteSettings> {
    try {
      const current = await this.getSettings();
      const updated: WebsiteSettings = {
        ...current,
        ...updates,
        id: 'global',
        updatedAt: new Date().toISOString()
      };

      const rowUpdates = mapSettingsToRow(updated);

      const { data, error } = await supabase
        .from('website_settings')
        .update(rowUpdates)
        .eq('id', 'global')
        .select()
        .single();

      if (error) {
        console.error('Error updating website settings in Supabase:', error.message);
        throw error;
      }

      if (data) {
        CURRENT_SETTINGS = mapRowToSettings(data);
      } else {
        CURRENT_SETTINGS = updated;
      }

      return { ...CURRENT_SETTINGS };
    } catch (error) {
      console.error('Error updating website settings in Supabase:', error);
      throw error;
    }
  }
};
