import { SEOPage } from '../models/seo';

let MOCK_SEO_PAGES: SEOPage[] = [
  {
    id: 'seo-1',
    pageName: 'Homepage',
    urlSlug: '/',
    browserTitle: 'LEO Family - Numerology & Astrology Academy | Master Ancient Wisdom',
    metaDescription: 'Discover authentic Chaldean Numerology, Astro-Vastu, and Lo Shu Grid masterclasses with Founder Raajeev Singh Chauhann and expert mentors.',
    metaKeywords: 'numerology, astrology, chaldean numerology, lo shu grid, astro vastu, leo family, occult courses',
    canonicalUrl: 'https://leofamily.com/',
    ogTitle: 'LEO Family - Numerology & Astrology Academy',
    ogDescription: 'Transform your life with certified numerology and astrology masterclasses from India’s leading occult masters.',
    ogImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200',
    twitterCardImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200',
    robots: 'index, follow',
    structuredDataType: 'WebSite',
    sitemapPriority: '1.0',
    lastUpdated: '2026-08-06'
  },
  {
    id: 'seo-2',
    pageName: 'Raajeev Singh Academy',
    urlSlug: '/academy/raajeev',
    browserTitle: 'Raajeev Singh Academy - Advanced Chaldean & Name Numerology',
    metaDescription: 'Master professional Chaldean numerology, mobile numerology, and destiny corrections with Founder Raajeev Singh Chauhann.',
    metaKeywords: 'raajeev singh chauhann, chaldean numerology course, name correction numerology',
    canonicalUrl: 'https://leofamily.com/academy/raajeev',
    ogTitle: 'Raajeev Singh Academy - Master Numerologist',
    ogDescription: 'Enroll in advanced numerology certification programs led by Raajeev Singh Chauhann.',
    ogImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200',
    twitterCardImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200',
    robots: 'index, follow',
    structuredDataType: 'ProfilePage',
    sitemapPriority: '0.9',
    lastUpdated: '2026-08-05'
  },
  {
    id: 'seo-3',
    pageName: 'Shaunak Academy',
    urlSlug: '/academy/shaunak',
    browserTitle: 'Shaunak Academy - Astro-Vastu & Planetary Alignments',
    metaDescription: 'Learn precise Astro-Vastu Vinyasa and planetary remediation techniques with Senior Faculty Shaunak S. Patthak.',
    metaKeywords: 'shaunak s pathak, astro vastu course, planetary vastu, astrology certification',
    canonicalUrl: 'https://leofamily.com/academy/shaunak',
    ogTitle: 'Shaunak Academy - Astro-Vastu Expert',
    ogDescription: 'Master spatial and planetary harmony with Shaunak S. Patthak.',
    ogImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=1200',
    twitterCardImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=1200',
    robots: 'index, follow',
    structuredDataType: 'ProfilePage',
    sitemapPriority: '0.9',
    lastUpdated: '2026-08-05'
  },
  {
    id: 'seo-4',
    pageName: 'Sannjoy Academy',
    urlSlug: '/academy/sannjoy',
    browserTitle: 'Sannjoy Academy - Lo Shu Grid & Bengali Numerology Mastery',
    metaDescription: 'Unlock advanced Lo Shu Grid predictive frameworks and professional numerology systems with Master Sannjoy Biswass.',
    metaKeywords: 'sannjoy biswass, lo shu grid course, bengali numerology, numerology masterclass',
    canonicalUrl: 'https://leofamily.com/academy/sannjoy',
    ogTitle: 'Sannjoy Academy - Lo Shu & Numerology Master',
    ogDescription: 'Deepen your predictive occult practice with Sannjoy Biswass.',
    ogImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200',
    twitterCardImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200',
    robots: 'index, follow',
    structuredDataType: 'ProfilePage',
    sitemapPriority: '0.9',
    lastUpdated: '2026-08-04'
  },
  {
    id: 'seo-5',
    pageName: 'Live Webinars & Masterclasses',
    urlSlug: '/webinars',
    browserTitle: 'Live Occult Masterclasses & Workshops | LEO Family',
    metaDescription: 'Join upcoming live webinars on numerology, astro-vastu, and spiritual growth hosted by LEO Family mentors.',
    metaKeywords: 'live webinars, occult workshop, numerology webinar, free masterclass',
    canonicalUrl: 'https://leofamily.com/webinars',
    ogTitle: 'Live Occult Masterclasses | LEO Family',
    ogDescription: 'Register for upcoming live interactive masterclasses on numerology and astrology.',
    ogImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200',
    twitterCardImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200',
    robots: 'index, follow',
    structuredDataType: 'Event',
    sitemapPriority: '0.8',
    lastUpdated: '2026-08-03'
  },
  {
    id: 'seo-6',
    pageName: 'Media Library & Podcasts',
    urlSlug: '/media',
    browserTitle: 'Occult Knowledge Media Library & Videos | LEO Family',
    metaDescription: 'Explore our rich library of video lessons, podcast episodes, and occult tutorials.',
    metaKeywords: 'occult videos, numerology podcast, astro vastu tutorials',
    canonicalUrl: 'https://leofamily.com/media',
    ogTitle: 'Media Library | LEO Family',
    ogDescription: 'Watch insightful video lectures and masterclass previews.',
    ogImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200',
    twitterCardImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200',
    robots: 'index, follow',
    structuredDataType: 'CollectionPage',
    sitemapPriority: '0.7',
    lastUpdated: '2026-08-02'
  }
];

export const seoRepository = {
  async getSeoPages(): Promise<SEOPage[]> {
    return [...MOCK_SEO_PAGES];
  },

  async updateSeoPage(id: string, updates: Partial<SEOPage>): Promise<SEOPage> {
    const index = MOCK_SEO_PAGES.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error(`SEO page with id ${id} not found`);
    }
    MOCK_SEO_PAGES[index] = {
      ...MOCK_SEO_PAGES[index],
      ...updates,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    return { ...MOCK_SEO_PAGES[index] };
  },

  async createSeoPage(page: Omit<SEOPage, 'id' | 'lastUpdated'>): Promise<SEOPage> {
    const newPage: SEOPage = {
      ...page,
      id: `seo-${Date.now()}`,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    MOCK_SEO_PAGES.push(newPage);
    return { ...newPage };
  },

  async deleteSeoPage(id: string): Promise<boolean> {
    const initialLength = MOCK_SEO_PAGES.length;
    MOCK_SEO_PAGES = MOCK_SEO_PAGES.filter(p => p.id !== id);
    return MOCK_SEO_PAGES.length < initialLength;
  }
};
