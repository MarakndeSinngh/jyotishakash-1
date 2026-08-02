import { Organization } from './types';
import { BUSINESS_INFO } from './business';

export const ORGANIZATION_INFO: Organization = {
  organizationName: "LEO Family",
  founder: "Raajeev Singh Chauhann",
  businessEmail: "attractabundance909@gmail.com",
  supportEmail: "attractabundance909@gmail.com",
  generalPhone: "+91 99537 13176",
  founderPhone: "+91 99301 17696",
  businessHours: "Monday - Sunday: 10:00 AM - 8:00 PM (IST)",
  timeZone: BUSINESS_INFO.timeZone,
  country: BUSINESS_INFO.country,
  futureOfficeLocations: BUSINESS_INFO.officeLocations,
  futureGst: BUSINESS_INFO.registration.gst,
  futureCin: BUSINESS_INFO.registration.cin,
  futureRegistrationNumbers: BUSINESS_INFO.registration.regNumbers
};
