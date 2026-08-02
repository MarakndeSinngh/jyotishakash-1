import { Contact } from './types';

export const CONTACTS_REGISTRY: Contact[] = [
  {
    id: "ct_general",
    title: "General Enquiries",
    value: "+91 99537 13176",
    subtitle: "⚡ Primary Hotline",
    buttonText: "Call Support",
    icon: "Phone",
    isPrimary: true,
    url: "tel:+919953713176",
    email: "attractabundance909@gmail.com",
    phone: "+91 99537 13176",
    businessHours: "Monday - Sunday: 10:00 AM - 8:00 PM (IST)"
  },
  {
    id: "ct_founder",
    title: "Personal Consultation",
    value: "Raajeev Singh Chauhann",
    subtitle: "⭐ Founder Consultation",
    buttonText: "Book Consultation",
    icon: "Star",
    url: "tel:+919930117696",
    phone: "+91 99301 17696",
    email: "attractabundance909@gmail.com",
    businessHours: "By Appointment Only"
  },
  {
    id: "ct_email",
    title: "Email Us",
    value: "attractabundance909@gmail.com",
    subtitle: "Corporate Inquiries",
    buttonText: "Send Email",
    icon: "Mail",
    url: "mailto:attractabundance909@gmail.com"
  },
  {
    id: "ct_whatsapp",
    title: "WhatsApp Chat",
    value: "+91 99537 13176",
    subtitle: "⚡ Instant Support",
    buttonText: "Chat on WhatsApp",
    isPrimary: true,
    icon: "MessageSquare",
    url: "https://wa.me/919953713176"
  }
];

export const CONTACT_INFO = {
  email: "attractabundance909@gmail.com",
  phones: {
    founder: "+91 99301 17696",
    general: "+91 99537 13176"
  },
  whatsapp: {
    link: "https://wa.me/919953713176",
    message: "Hello Leo Family, I would like to consult with you."
  },
  businessHours: "Monday - Sunday: 10:00 AM - 8:00 PM (IST)",
  address: "Mumbai, India (Global Online Operations)"
};
