import { Brand, BrandAssets } from './types';
import { BUSINESS_INFO } from './business';
import { WEBSITES } from './websites';
import { Assets } from './assets';

export const BRAND_INFO: Brand = {
  name: "LEO Family",
  legalName: BUSINESS_INFO.legalName,
  founder: "Raajeev Singh Chauhann",
  tagline: "Ancient Wisdom × Modern Intelligence",
  mission: BUSINESS_INFO.mission,
  vision: BUSINESS_INFO.vision,
  description: BUSINESS_INFO.description,
  launchYear: BUSINESS_INFO.launchYear,
  theme: BUSINESS_INFO.defaultTheme,
  appearance: BUSINESS_INFO.defaultAppearance,
  websites: {
    main: WEBSITES.main.url,
    founder: WEBSITES.founder.url,
    films: WEBSITES.films.url
  }
};

export const BRAND_ASSETS: BrandAssets = {
  logos: {
    light: "/gemstone-assets/logo.jpg",
    dark: "/gemstone-assets/logo.jpg",
    symbol: "/gemstone-assets/logo.jpg",
    footer: "/gemstone-assets/logo.jpg"
  },
  favicons: {
    ico: "/favicon.ico",
    png16: "/favicon-16x16.png",
    png32: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png"
  },
  icons: {
    sparkles: "Sparkles",
    phone: "Phone",
    star: "Star",
    gem: "Gem",
    home: "Home",
    trendingUp: "TrendingUp",
    globe: "Globe",
    mail: "Mail",
    check: "Check",
    copy: "Copy"
  },
  heroImages: {
    background: "/gemstone-assets/background.png",
    overlay: "linear-gradient(to bottom, rgba(28, 15, 2, 0.3), rgba(28, 15, 2, 0.95))",
    foreground: "/gemstone-assets/logo.jpg"
  },
  founderPhotos: {
    portrait: Assets.founder.image,
    consultation: Assets.founder.image,
    candid: Assets.founder.image
  },
  backgroundImages: {
    starry: "/gemstone-assets/background.png",
    luxury: "/gemstone-assets/background.png",
    glow: "/gemstone-assets/background.png"
  },
  ogImages: {
    default: "/gemstone-assets/logo.jpg",
    course: "/gemstone-assets/background.png",
    service: "/gemstone-assets/background.png"
  },
  videoCovers: {
    playlist: "https://i.ytimg.com/vi/RcmLxAECJAc/maxresdefault.jpg",
    short: "https://i.ytimg.com/vi/RcmLxAECJAc/maxresdefault.jpg"
  },
  videoLinks: {
    studentReviewsPlaylist: "https://youtube.com/playlist?list=PLOFld0SYjqbZ-wCREGBGP4d96TDm7ZbDf",
    unfilteredShort: "https://youtube.com/shorts/RcmLxAECJAc"
  },
  illustrations: {},
  certificates: {
    sample: "/gemstone-assets/background.png"
  },
  documents: {}
};
