import { BRAND_INFO } from './brand';
import { WEBSITES } from './websites';
import { SOCIAL_REGISTRY } from './social';
import { CONTACTS_REGISTRY } from './contacts';

// Central branding asset references
const mainUrl = WEBSITES.main.url;
const logoUrl = `${mainUrl}/gemstone-assets/logo.jpg`;
const defaultFavicon = "/gemstone-assets/logo.jpg";
const generalPhone = CONTACTS_REGISTRY.find(c => c.id === 'ct_general')?.phone || "+91 99537 13176";
const founderPhone = CONTACTS_REGISTRY.find(c => c.id === 'ct_founder')?.phone || "+91 99301 17696";
const emailAddress = CONTACTS_REGISTRY.find(c => c.id === 'ct_email')?.value || "attractabundance909@gmail.com";

export const DEFAULT_SEO = {
  title: "LEO Family | India's Premier Spiritual Learning Platform",
  description: "Discover authentic Numerology, Astrology, Vastu, Gemstones, Name Science and AI-powered spiritual guidance from the experts at LEO Family.",
  siteName: "LEO Family",
  favicon: defaultFavicon,
  image: defaultFavicon,
  canonical: mainUrl,
};

// Central Route Title Registry
export const ROUTE_TITLE_MAP: Record<string, string> = {
  '/': "LEO Family | India's Premier Spiritual Learning Platform",
  '/about': "About LEO Family | Our Mission, Vision & Founder",
  '/media': "LEO Family Media Library",
  '/shorts': "LEO Family Media Library",
  '/ai': "LEO Family Spiritual AI",
  '/contact': "Contact LEO Family",
  '/programs': "Programs | LEO Family",
  '/gemstones': "Gemstones | LEO Family",
  '/numerology': "Numerology | LEO Family",
  '/services': "Services | LEO Family",
  '/ecosystem': "Ecosystem | LEO Family",
  '/academy': "Programs | LEO Family",
  '/meditation': "Meditation Classes & Guided Meditation | Leo Family Occult School",
};

// Known Dedicated Instructor Page Titles
export const INSTRUCTOR_TITLES: Record<string, string> = {
  raajeev: "Raajeev Singh Chauhann Programs | LEO Family",
  shaunak: "Shaunak S. Patthak Programs | LEO Family",
  sannjoy: "Sannjoy Biswass Programs | LEO Family",
};

export interface SeoMetadataOptions {
  pathname?: string;
  slug?: string;
  instructorName?: string;
  customTitle?: string;
  customDescription?: string;
  customImage?: string;
}

export interface ResolvedSeoMetadata {
  title: string;
  description: string;
  siteName: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  favicon: string;
  canonical: string;
}

/**
 * Reusable metadata helper that centralizes title, description,
 * Open Graph, Twitter, and favicon resolution across all pages.
 */
export function getSeoMetadata(options: SeoMetadataOptions = {}): ResolvedSeoMetadata {
  const currentPathname = options.pathname || (typeof window !== 'undefined' ? window.location.pathname : '/');
  const rawPath = currentPathname.toLowerCase().trim();
  const normalizedPath = rawPath.length > 1 && rawPath.endsWith('/') ? rawPath.slice(0, -1) : rawPath;

  let resolvedTitle: string | undefined;

  // 1. Explicit Homepage rule: NEVER use instructor name on the homepage
  if (normalizedPath === '' || normalizedPath === '/') {
    resolvedTitle = ROUTE_TITLE_MAP['/'];
  } 
  // 2. Exact static route matches
  else if (ROUTE_TITLE_MAP[normalizedPath]) {
    resolvedTitle = ROUTE_TITLE_MAP[normalizedPath];
  } 
  // 3. Instructor / Academy pages: /academy/:slug
  else if (normalizedPath.startsWith('/academy/')) {
    const parts = normalizedPath.split('/').filter(Boolean);
    const pathSlug = parts[1] ? parts[1].toLowerCase() : options.slug?.toLowerCase();

    if (pathSlug && INSTRUCTOR_TITLES[pathSlug]) {
      resolvedTitle = INSTRUCTOR_TITLES[pathSlug];
    } else if (options.instructorName && options.instructorName !== 'LEO Family' && options.instructorName !== 'Academy') {
      resolvedTitle = `${options.instructorName} Programs | LEO Family`;
    } else {
      resolvedTitle = "Programs | LEO Family";
    }
  } 
  // 4. Custom title override
  else if (options.customTitle) {
    resolvedTitle = options.customTitle.includes('LEO Family')
      ? options.customTitle
      : `${options.customTitle} | LEO Family`;
  } 
  // 5. Default fallback
  else {
    resolvedTitle = DEFAULT_SEO.title;
  }

  const description = options.customDescription || (normalizedPath === '/meditation' 
    ? "Explore guided meditation learning and upcoming meditation batches at Leo Family Occult School with structured practice, awareness and inner growth."
    : DEFAULT_SEO.description);
  const image = options.customImage || DEFAULT_SEO.image;
  const canonical = typeof window !== 'undefined' ? (window.location.origin + normalizedPath) : `${mainUrl}${normalizedPath}`;

  return {
    title: resolvedTitle,
    description,
    siteName: DEFAULT_SEO.siteName,
    ogTitle: resolvedTitle,
    ogDescription: description,
    ogImage: image,
    twitterTitle: resolvedTitle,
    twitterDescription: description,
    twitterImage: image,
    favicon: DEFAULT_SEO.favicon,
    canonical,
  };
}

export const SEO_CONFIG = {
  defaultTitle: DEFAULT_SEO.title,
  defaultDescription: DEFAULT_SEO.description,
  canonical: mainUrl,
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: mainUrl,
    siteName: DEFAULT_SEO.siteName,
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

