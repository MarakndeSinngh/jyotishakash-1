import { BRAND_INFO } from './brand';
import { SOCIAL_INFO } from './social';
import { CONTACT_INFO } from './contact';

// Local storage keys
const CMS_BRAND_KEY = 'leo_family_cms_brand';
const CMS_SOCIAL_KEY = 'leo_family_cms_social';
const CMS_CONTACT_KEY = 'leo_family_cms_contact';

export const getCmsBrand = () => {
  try {
    const saved = localStorage.getItem(CMS_BRAND_KEY);
    if (saved) return { ...BRAND_INFO, ...JSON.parse(saved) };
  } catch (e) {
    console.error("Failed to load CMS brand", e);
  }
  return BRAND_INFO;
};

export const getCmsSocial = () => {
  try {
    const saved = localStorage.getItem(CMS_SOCIAL_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...SOCIAL_INFO,
        ...parsed,
        youtube: { ...SOCIAL_INFO.youtube, ...parsed.youtube },
        previews: { ...SOCIAL_INFO.previews, ...parsed.previews }
      };
    }
  } catch (e) {
    console.error("Failed to load CMS social", e);
  }
  return SOCIAL_INFO;
};

export const getCmsContact = () => {
  try {
    const saved = localStorage.getItem(CMS_CONTACT_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...CONTACT_INFO,
        ...parsed,
        phones: { ...CONTACT_INFO.phones, ...parsed.phones },
        whatsapp: { ...CONTACT_INFO.whatsapp, ...parsed.whatsapp }
      };
    }
  } catch (e) {
    console.error("Failed to load CMS contact", e);
  }
  return CONTACT_INFO;
};

export const saveCmsBrand = (data: typeof BRAND_INFO) => {
  localStorage.setItem(CMS_BRAND_KEY, JSON.stringify(data));
};

export const saveCmsSocial = (data: typeof SOCIAL_INFO) => {
  localStorage.setItem(CMS_SOCIAL_KEY, JSON.stringify(data));
};

export const saveCmsContact = (data: typeof CONTACT_INFO) => {
  localStorage.setItem(CMS_CONTACT_KEY, JSON.stringify(data));
};

export const resetCmsData = () => {
  localStorage.removeItem(CMS_BRAND_KEY);
  localStorage.removeItem(CMS_SOCIAL_KEY);
  localStorage.removeItem(CMS_CONTACT_KEY);
};
export const getActiveContact = () => getCmsContact();
export const getActiveSocial = () => getCmsSocial();
export const getActiveBrand = () => getCmsBrand();
