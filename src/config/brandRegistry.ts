import { BRAND_INFO, BRAND_ASSETS } from './brand';
import { SOCIAL_REGISTRY } from './social';
import { CONTACTS_REGISTRY } from './contacts';
import { WEBSITES } from './websites';
import { BUSINESS_INFO } from './business';
import { ORGANIZATION_INFO } from './organization';
import { THEME_CONFIG } from './theme';
import { SEO_CONFIG } from './seo';
import { NAVIGATION_REGISTRY } from './navigation';
import { SERVICES } from './services';
import { COURSES } from './courses';
import { AI_REGISTRY } from './ai';
import { getCmsBrand, getCmsSocial, getCmsContact } from './cms';
import { Assets } from './assets';

// Master Brand Registry aggregating all enterprise resources
export const BrandRegistry = {
  // Brand basic info (with dynamic CMS override support)
  get brand() {
    const cmsBrand = getCmsBrand();
    return {
      ...BRAND_INFO,
      ...cmsBrand
    };
  },

  // Complete assets registry
  get assets() {
    return BRAND_ASSETS;
  },

  // Social accounts (with dynamic CMS overlay)
  get social() {
    const cmsSocial = getCmsSocial();
    // Overlap URLs if configured in CMS
    return SOCIAL_REGISTRY.map(item => {
      if (item.platform === 'YouTube' && item.id === 'sc_yt_main' && cmsSocial.youtube?.main) {
        return { ...item, url: cmsSocial.youtube.main };
      }
      if (item.platform === 'YouTube' && item.id === 'sc_yt_founder' && cmsSocial.youtube?.founder) {
        return { ...item, url: cmsSocial.youtube.founder };
      }
      if (item.platform === 'YouTube' && item.id === 'sc_yt_films' && cmsSocial.youtube?.films) {
        return { ...item, url: cmsSocial.youtube.films };
      }
      if (item.platform === 'Facebook' && item.id === 'sc_fb' && cmsSocial.facebook) {
        return { ...item, url: cmsSocial.facebook };
      }
      return item;
    });
  },

  // Contact options (with dynamic CMS overlay)
  get contacts() {
    const cmsContact = getCmsContact();
    return CONTACTS_REGISTRY.map(item => {
      if (item.id === 'ct_general' && cmsContact.phones?.general) {
        return { 
          ...item, 
          value: cmsContact.phones.general, 
          phone: cmsContact.phones.general,
          url: `tel:${cmsContact.phones.general.replace(/\s+/g, '')}`
        };
      }
      if (item.id === 'ct_founder' && cmsContact.phones?.founder) {
        return { 
          ...item, 
          phone: cmsContact.phones.founder,
          url: `tel:${cmsContact.phones.founder.replace(/\s+/g, '')}`
        };
      }
      if (item.id === 'ct_email' && cmsContact.email) {
        return { ...item, value: cmsContact.email, url: `mailto:${cmsContact.email}` };
      }
      if (item.id === 'ct_whatsapp' && cmsContact.whatsapp?.link) {
        return { ...item, url: cmsContact.whatsapp.link };
      }
      return item;
    });
  },

  // Digital properties registry
  get websites() {
    return WEBSITES;
  },

  // Business metadata & compliance
  get business() {
    return BUSINESS_INFO;
  },

  // Corporate Organization details
  get organization() {
    const cmsContact = getCmsContact();
    return {
      ...ORGANIZATION_INFO,
      businessEmail: cmsContact.email || ORGANIZATION_INFO.businessEmail,
      supportEmail: cmsContact.email || ORGANIZATION_INFO.supportEmail,
      generalPhone: cmsContact.phones?.general || ORGANIZATION_INFO.generalPhone,
      founderPhone: cmsContact.phones?.founder || ORGANIZATION_INFO.founderPhone,
      businessHours: cmsContact.businessHours || ORGANIZATION_INFO.businessHours
    };
  },

  // Color schemas & design tokens
  get theme() {
    return {
      ...THEME_CONFIG,
      themeName: BUSINESS_INFO.defaultTheme,
      description: "Elite cosmic design tokens for ultimate legibility and luxury branding.",
      author: "LEO Family Architect",
      version: "1.0.0",
      primary: THEME_CONFIG.primaryColor,
      secondary: THEME_CONFIG.secondaryColor,
      accent: THEME_CONFIG.secondaryColor,
      background: THEME_CONFIG.darkColor,
      surface: "#2A1805",
      text: THEME_CONFIG.lightColor,
      border: "rgba(194, 155, 71, 0.2)",
      button: THEME_CONFIG.primaryColor,
      shadow: THEME_CONFIG.glowStyle,
      gradients: {
        primary: "linear-gradient(135deg, #C29B47 0%, #E9C269 100%)",
        dark: "linear-gradient(135deg, #1C0F02 0%, #2A1805 100%)",
        gold: "linear-gradient(90deg, rgba(194,155,71,0.1) 0%, rgba(233,194,105,0.2) 50%, rgba(194,155,71,0.1) 100%)"
      },
      animations: {
        transitionSpeed: "0.3s ease-in-out",
        hoverEffect: "scale-[1.02] shadow-[0_0_20px_rgba(194,155,71,0.4)]"
      },
      darkVariant: "maharaja-gold",
      lightVariant: "maharaja-gold-light",
      previewImage: "/gemstone-assets/logo.jpg",
      featured: true
    };
  },

  // Navigation configurations
  get navigation() {
    return NAVIGATION_REGISTRY;
  },

  // Consulting services catalog
  get services() {
    return SERVICES;
  },

  // Certified curriculum & courses
  get courses() {
    return COURSES;
  },

  // Computational Artificial Intelligence suite
  get ai() {
    return AI_REGISTRY;
  },

  // Centralized SEO & Structured Schema metadata
  get seo() {
    return SEO_CONFIG;
  },

  // Centralized Founder profiles & images (CMS support)
  get founder() {
    return {
      name: BRAND_INFO.founder,
      image: Assets.founder.image,
      thumbnail: Assets.founder.thumbnail,
      avatar: Assets.founder.avatar,
      seoImage: Assets.founder.seoImage,
      openGraphImage: Assets.founder.openGraphImage,
      variants: {
        portrait: Assets.founder.image,
        consultation: Assets.founder.image,
        candid: Assets.founder.image
      }
    };
  },

  // Complete validation engine to check brand data health
  validateRegistry() {
    const errors: string[] = [];
    
    // Validate emails
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.organization.businessEmail)) {
      errors.push(`Invalid business email format: ${this.organization.businessEmail}`);
    }

    // Validate phone numbers
    const phoneRegex = /^\+?[0-9\s-]{10,20}$/;
    if (!phoneRegex.test(this.organization.generalPhone.replace(/\s+/g, ''))) {
      errors.push(`Invalid general phone format: ${this.organization.generalPhone}`);
    }

    // Validate website URLs
    Object.entries(this.websites).forEach(([key, site]) => {
      const s = site as { url: string };
      if (!s.url.startsWith("http://") && !s.url.startsWith("https://")) {
        errors.push(`Invalid digital property URL for ${key}: ${s.url}`);
      }
    });

    // Validate social accounts
    this.social.forEach(item => {
      if (item.visible && !item.url.startsWith("http")) {
        errors.push(`Invalid social URL for ${item.id}: ${item.url}`);
      }
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  }
};
