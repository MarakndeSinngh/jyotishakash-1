import { CONTACT_INFO } from './contact';
import { WEBSITES } from './websites';

export const GLOBAL_CONSTANTS = {
  whatsappLink: CONTACT_INFO.whatsapp.link,
  whatsappMessage: CONTACT_INFO.whatsapp.message,
  supportEmail: CONTACT_INFO.email,
  generalContact: CONTACT_INFO.phones.general,
  founderContact: CONTACT_INFO.phones.founder,
  siteUrls: {
    main: WEBSITES.main.url,
    founder: WEBSITES.founder.url,
    films: WEBSITES.films.url
  }
};
