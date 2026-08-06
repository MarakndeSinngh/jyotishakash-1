export interface SEOPage {
  id: string;
  pageName: string;
  urlSlug: string;
  browserTitle: string;
  metaDescription: string;
  metaKeywords: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterCardImage: string;
  robots: 'index, follow' | 'noindex, nofollow' | 'index, nofollow' | 'noindex, follow';
  structuredDataType: 'WebSite' | 'Organization' | 'Course' | 'Article' | 'FAQPage' | 'ProfilePage' | 'Event' | 'CollectionPage';
  sitemapPriority: string;
  lastUpdated: string;
}
