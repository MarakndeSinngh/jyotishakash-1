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
  meditationHeroYoutubeUrl: '',
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
    meditationHeroYoutubeUrl: row.meditation_hero_youtube_url ?? CURRENT_SETTINGS.meditationHeroYoutubeUrl,
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
  if (settings.meditationHeroYoutubeUrl !== undefined) row.meditation_hero_youtube_url = settings.meditationHeroYoutubeUrl;
  if (settings.updatedAt !== undefined) row.updated_at = settings.updatedAt;
  return row;
}

export const websiteSettingsRepository = {
  async getSettings(): Promise<WebsiteSettings> {
    console.log('MEDITATION_VIDEO_LOAD_START');
    try {
      const { data, error } = await supabase
        .from('website_settings')
        .select('*')
        .eq('id', 'global')
        .maybeSingle();

      if (error) {
        console.warn('MEDITATION_VIDEO_LOAD_SUCCESS (with warning/fallback)', error.message);
        const cached = localStorage.getItem('leo_meditation_hero_url');
        if (cached !== null) {
          CURRENT_SETTINGS.meditationHeroYoutubeUrl = cached;
        }
        return { ...CURRENT_SETTINGS };
      }

      if (data) {
        console.log('MEDITATION_VIDEO_LOAD_SUCCESS', { found: true });
        const mapped = mapRowToSettings(data);
        CURRENT_SETTINGS = {
          ...CURRENT_SETTINGS,
          ...mapped,
          id: 'global'
        };
        if (CURRENT_SETTINGS.meditationHeroYoutubeUrl) {
          localStorage.setItem('leo_meditation_hero_url', CURRENT_SETTINGS.meditationHeroYoutubeUrl);
        } else {
          localStorage.removeItem('leo_meditation_hero_url');
        }
        return { ...CURRENT_SETTINGS };
      } else {
        console.log('MEDITATION_VIDEO_LOAD_SUCCESS (no global row found, fallback)');
        const cached = localStorage.getItem('leo_meditation_hero_url');
        if (cached !== null) {
          CURRENT_SETTINGS.meditationHeroYoutubeUrl = cached;
        }
        return { ...CURRENT_SETTINGS };
      }
    } catch (error: any) {
      console.warn('MEDITATION_VIDEO_LOAD_SUCCESS (exception fallback):', error);
      const cached = localStorage.getItem('leo_meditation_hero_url');
      if (cached !== null) {
        CURRENT_SETTINGS.meditationHeroYoutubeUrl = cached;
      }
      return { ...CURRENT_SETTINGS };
    }
  },

  async updateSettings(updates: Partial<WebsiteSettings>): Promise<WebsiteSettings> {
    const isRemoving = updates.meditationHeroYoutubeUrl === '';
    console.log('MEDITATION_VIDEO_SAVE_START', { updates });
    try {
      const current = await this.getSettings();
      const updated: WebsiteSettings = {
        ...current,
        ...updates,
        id: 'global',
        updatedAt: new Date().toISOString()
      };

      const rowUpdates = {
        id: 'global',
        ...mapSettingsToRow(updated)
      };

      const { data, error } = await supabase
        .from('website_settings')
        .upsert(rowUpdates, { onConflict: 'id' })
        .select()
        .single();

      if (error) {
        const errDetails = {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint
        };
        console.error('MEDITATION_VIDEO_SAVE_ERROR', errDetails);
        if (isRemoving) {
          console.error('MEDITATION_VIDEO_REMOVE_ERROR', errDetails);
        }
        throw error;
      }

      if (data) {
        CURRENT_SETTINGS = mapRowToSettings(data);
      } else {
        CURRENT_SETTINGS = updated;
      }

      if (CURRENT_SETTINGS.meditationHeroYoutubeUrl) {
        localStorage.setItem('leo_meditation_hero_url', CURRENT_SETTINGS.meditationHeroYoutubeUrl);
      } else {
        localStorage.removeItem('leo_meditation_hero_url');
      }

      if (isRemoving) {
        console.log('MEDITATION_VIDEO_REMOVE_SUCCESS');
      }
      console.log('MEDITATION_VIDEO_SAVE_SUCCESS', { data: CURRENT_SETTINGS });

      return { ...CURRENT_SETTINGS };
    } catch (error: any) {
      console.error('MEDITATION_VIDEO_SAVE_ERROR:', error);
      if (isRemoving) {
        console.error('MEDITATION_VIDEO_REMOVE_ERROR:', error);
      }
      throw error;
    }
  },

  async saveMeditationHeroVideo(youtubeUrl: string): Promise<WebsiteSettings> {
    return this.updateSettings({ meditationHeroYoutubeUrl: youtubeUrl });
  }
};
