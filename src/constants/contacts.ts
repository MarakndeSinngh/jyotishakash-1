import { getActiveContact, getActiveSocial, getActiveBrand } from '../config/cms';
import { WEBSITES } from '../config/websites';

export const getWhatsappLink = () => getActiveContact().whatsapp.link;
export const getWhatsappMessage = () => getActiveContact().whatsapp.message;

export const WHATSAPP_LINK = getActiveContact().whatsapp.link;
export const WHATSAPP_MESSAGE = getActiveContact().whatsapp.message;

// Export dynamically managed SOCIAL_LINKS for legacy code integration
export const SOCIAL_LINKS = {
  websites: {
    main: WEBSITES.main.url,
    founder: WEBSITES.founder.url,
    films: WEBSITES.films.url
  },
  youtube: {
    main: getActiveSocial().youtube.main,
    founder: getActiveSocial().youtube.founder,
    films: getActiveSocial().youtube.films
  },
  facebook: getActiveSocial().facebook,
  instagram: "",
  linkedin: "",
  podcast: "",
  mobileApp: ""
};

