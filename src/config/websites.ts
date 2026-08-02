import { Website } from './types';
import { Assets } from './assets';

export const WEBSITES: Record<string, Website> = {
  main: {
    id: "w1",
    name: "LEO Family",
    category: "Main Platform",
    description: "Official gateway to Astro-Numerology calculators, gemstone consultation, and spiritual wisdom.",
    url: "https://www.leofamily.online",
    logo: "/gemstone-assets/logo.jpg",
    previewImage: "/gemstone-assets/background.png",
    openGraphImage: "/gemstone-assets/logo.jpg",
    theme: "Maharaja Gold"
  },
  founder: {
    id: "w2",
    name: "Raajeev Singh Chauhann Official",
    category: "Personal Brand Portfolio",
    description: "Official portfolio of Raajeev Singh Chauhann - spiritual mentor, celebrity Astro-Numerologist, and filmmaker.",
    url: "https://raajeevsinghchauhann.online",
    logo: Assets.founder.image,
    previewImage: Assets.founder.image,
    openGraphImage: Assets.founder.image,
    theme: "Royal Amber"
  },
  films: {
    id: "w3",
    name: "LEO Family Indian Films",
    category: "Cinematic & Media Production",
    description: "Production house blending cinema with high spiritual concepts, short films, and life coaching programs.",
    url: "https://leofamilyindianfilms.online",
    logo: "/gemstone-assets/logo.jpg",
    previewImage: "/gemstone-assets/background.png",
    openGraphImage: "/gemstone-assets/logo.jpg",
    theme: "Vedic Crimson"
  }
};
