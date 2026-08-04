import { Assets } from './assets';
import { ORGANIZATION_INFO } from './organization';

export interface FounderProfile {
  name: string;
  title: string;
  organization: string;
  tagline: string;
  bio: string;
  philosophy: string;
  extendedPhilosophy: string;
  experienceYears: string;
  image: string;
  consultationPhone: string;
  consultationLink: string;
  specializations: string[];
  roles: { title: string; label: string }[];
}

export const FOUNDER_PROFILE: FounderProfile = {
  name: "Raajeev Singh Chauhann",
  title: "Founder & Visionary",
  organization: "LEO Family",
  tagline: "Founder of LEO Family • Celebrity Astro-Numerologist • Vastu Expert • Filmmaker",
  bio: "Founder of LEO Family, celebrity Astro-Numerologist, Astrologer, Vastu Expert, and filmmaker. Raajeev Singh Chauhann has dedicated over two decades to decoding cosmic geometry, Chaldean numerical vibrations, and spatial energy alignment, transforming thousands of lives and top business brands globally.",
  philosophy: "My mission has always been to make authentic spiritual knowledge understandable, practical, and beneficial for everyone. The sciences of Astro-Numerology and Vastu should not remain locked in complex manuals or traditional academic terms. They must translate directly to the physical success, prosperity, and peace of mind you experience daily.",
  extendedPhilosophy: "At LEO Family, we do not teach passive speculation. We train you in the actual code of cosmic values. Each calculation grid is a map to align your personal vibrational frequencies with auspicious periods of flow.",
  experienceYears: "20+ Years Experience",
  image: Assets.founder.image,
  consultationPhone: ORGANIZATION_INFO.founderPhone,
  consultationLink: "https://wa.me/919930117696",
  specializations: [
    "Astro-Numerology Matrix",
    "Chaldean Number Frequency",
    "Commercial & Residential Vastu",
    "Name & Signature Realignment",
    "Corporate Brand Energy Tuning"
  ],
  roles: [
    { title: "LEO Family", label: "Enterprise Founder" },
    { title: "Celebrity Advisor", label: "Astro-Numerology" },
    { title: "Languages", label: "English & Hindi" },
    { title: "Vedic Science", label: "Chaldean Matrix" },
    { title: "Spatial Harmony", label: "Vastu Architecture" },
    { title: "Indian Films", label: "Cinematic Media" }
  ]
};
