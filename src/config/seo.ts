import { BRAND_INFO } from './brand';
import { WEBSITES } from './websites';
import { SOCIAL_REGISTRY } from './social';
import { CONTACTS_REGISTRY } from './contacts';

// Local helper to resolve primary values easily
const mainUrl = WEBSITES.main.url;
const logoUrl = `${mainUrl}/gemstone-assets/logo.jpg`;
const generalPhone = CONTACTS_REGISTRY.find(c => c.id === 'ct_general')?.phone || "+91 99537 13176";
const founderPhone = CONTACTS_REGISTRY.find(c => c.id === 'ct_founder')?.phone || "+91 99301 17696";
const emailAddress = CONTACTS_REGISTRY.find(c => c.id === 'ct_email')?.value || "attractabundance909@gmail.com";

export const SEO_CONFIG = {
  defaultTitle: `${BRAND_INFO.name} | ${BRAND_INFO.tagline}`,
  defaultDescription: "Transform your frequency with ancient Vedic Wisdom, Vastu alignment, certified Numerology courses, and premium spiritual consulting by Raajeev Singh Chauhann.",
  canonical: mainUrl,
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: mainUrl,
    siteName: BRAND_INFO.name,
    images: [
      {
        url: logoUrl,
        width: 1200,
        height: 630,
        alt: BRAND_INFO.name
      }
    ]
  },
  twitter: {
    handle: "@leofamily",
    site: "@leofamily",
    cardType: "summary_large_image"
  },
  schemas: {
    organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": BRAND_INFO.name,
      "url": mainUrl,
      "logo": logoUrl,
      "sameAs": [
        WEBSITES.founder.url,
        WEBSITES.films.url,
        SOCIAL_REGISTRY.find(s => s.id === 'sc_yt_main')?.url || "https://youtube.com/@leofamilyoccultgyan",
        SOCIAL_REGISTRY.find(s => s.id === 'sc_yt_founder')?.url || "https://youtube.com/@raajeevsinghchauhann",
        SOCIAL_REGISTRY.find(s => s.id === 'sc_yt_films')?.url || "https://youtube.com/@leofamilyindianfilms",
        SOCIAL_REGISTRY.find(s => s.id === 'sc_fb')?.url || "https://facebook.com/RaajeevSinghChauhann"
      ],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": generalPhone,
          "contactType": "general enquiries",
          "email": emailAddress,
          "areaServed": "Global",
          "availableLanguage": ["English", "Hindi"]
        },
        {
          "@type": "ContactPoint",
          "telephone": founderPhone,
          "contactType": "Founder Consultation",
          "email": emailAddress,
          "areaServed": "Global",
          "availableLanguage": ["English", "Hindi"]
        }
      ]
    },
    person: {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": BRAND_INFO.founder,
      "jobTitle": "Spiritual Mentor, Astrologer, and Filmmaker",
      "worksFor": {
        "@type": "Organization",
        "name": BRAND_INFO.name
      },
      "url": WEBSITES.founder.url,
      "sameAs": [
        SOCIAL_REGISTRY.find(s => s.id === 'sc_yt_founder')?.url || "https://youtube.com/@raajeevsinghchauhann",
        SOCIAL_REGISTRY.find(s => s.id === 'sc_fb')?.url || "https://facebook.com/RaajeevSinghChauhann"
      ]
    }
  }
};
