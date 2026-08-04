export interface Brand {
  name: string;
  legalName: string;
  founder: string;
  tagline: string;
  mission: string;
  vision: string;
  description: string;
  launchYear: string;
  theme: string;
  appearance: string;
  websites?: {
    main: string;
    founder: string;
    films: string;
  };
}

export interface Organization {
  organizationName: string;
  founder: string;
  businessEmail: string;
  supportEmail: string;
  generalPhone: string;
  founderPhone: string;
  businessHours: string;
  timeZone: string;
  country: string;
  futureOfficeLocations: string[];
  futureGst: string;
  futureCin: string;
  futureRegistrationNumbers: string[];
}

export interface Website {
  id: string;
  name: string;
  category: string;
  description: string;
  url: string;
  logo: string;
  previewImage: string;
  openGraphImage: string;
  theme: string;
}

export interface Social {
  id: string;
  platform: string;
  displayName: string;
  description: string;
  category: string;
  url: string;
  username: string;
  thumbnail: string;
  banner: string;
  logo: string;
  brandColor: string;
  hoverColor: string;
  previewImage: string;
  openGraphImage: string;
  verified: boolean;
  followers: string;
  subscribers: string;
  videos: string;
  createdDate: string;
  status: string;
  displayPriority: number;
  featured: boolean;
  visible: boolean;
  openInNewTab: boolean;
  futureApiEndpoint: string;
  futureAnalytics: string;
}

export interface Contact {
  id: string;
  title: string;
  value: string;
  subtitle?: string;
  buttonText: string;
  icon: string;
  isPrimary?: boolean;
  url: string;
  email?: string;
  phone?: string;
  businessHours?: string;
}

export interface Course {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  duration: string;
  level: string;
  category: string;
  instructor: string;
  price: string;
  discount: string;
  certificate: boolean;
  featured: boolean;
  seoUrl: string;
  cmsId: string;
  badge?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: string;
  bookingLink: string;
  icon: string;
  illustration?: string;
  seoMetadata?: {
    title: string;
    description: string;
    keywords: string[];
  };
  category: string;
  featured: boolean;
}

export interface AIApp {
  id: string;
  name: string;
  description: string;
  comingSoon: boolean;
  beta: boolean;
  live: boolean;
  apiEndpoint: string;
}

export interface SEOField {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  canonicalUrl: string;
  openGraph: {
    type: string;
    locale: string;
    url: string;
    siteName: string;
    images: Array<{
      url: string;
      width: number;
      height: number;
      alt: string;
    }>;
  };
  twitterCard: {
    handle: string;
    site: string;
    cardType: string;
  };
  schemas: {
    organization: any;
    person: any;
    course?: any;
    faq?: any;
  };
}

export interface NavDropdownItem {
  label: string;
  path: string;
  description?: string;
  badge?: string;
  icon?: string;
}

export interface NavItem {
  label: string;
  path: string;
  icon?: string;
  roles?: string[];
  dropdown?: NavDropdownItem[];
}

export interface Navigation {
  desktop: NavItem[];
  mobile: NavItem[];
  footer: NavItem[];
  sidebar: NavItem[];
  admin: NavItem[];
  futureMobileApp: NavItem[];
}

export interface ThemeColors {
  themeName: string;
  description: string;
  author: string;
  version: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  border: string;
  button: string;
  shadow: string;
  gradients: {
    primary?: string;
    dark?: string;
    gold?: string;
  };
  animations: {
    transitionSpeed: string;
    hoverEffect: string;
  };
  darkVariant: string;
  lightVariant: string;
  previewImage: string;
  featured: boolean;
}

export interface BrandAssets {
  logos: {
    light: string;
    dark: string;
    symbol: string;
    footer: string;
  };
  favicons: {
    ico: string;
    png16: string;
    png32: string;
    apple: string;
  };
  icons: Record<string, string>;
  heroImages: {
    background: string;
    overlay: string;
    foreground: string;
  };
  founderPhotos: {
    portrait: string;
    consultation: string;
    candid: string;
  };
  backgroundImages: {
    starry: string;
    luxury: string;
    glow: string;
  };
  ogImages: {
    default: string;
    course: string;
    service: string;
  };
  videoCovers: {
    playlist: string;
    short: string;
  };
  videoLinks?: {
    studentReviewsPlaylist: string;
    unfilteredShort: string;
  };
  illustrations: Record<string, string>;
  certificates: {
    sample: string;
  };
  documents: Record<string, string>;
}
