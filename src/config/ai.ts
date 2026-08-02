import { AIApp } from './types';

export const AI_REGISTRY: AIApp[] = [
  {
    id: "ai1",
    name: "AI Spiritual Assistant",
    description: "Get direct answers about destiny, compound vibrations, and Vedic gemstone selections from the LEO Family AI model.",
    comingSoon: false,
    beta: true,
    live: true,
    apiEndpoint: "/api/ai/assistant"
  },
  {
    id: "ai2",
    name: "AI Numerology Engine",
    description: "Instantly calculate compound name spellings and mobile combination frequencies with customized recommendations.",
    comingSoon: false,
    beta: false,
    live: true,
    apiEndpoint: "/api/ai/numerology"
  },
  {
    id: "ai3",
    name: "AI Horoscope Analysis",
    description: "Deep insights into your planetary cycles (Dashas), birth chart transits, and daily remedial guidance.",
    comingSoon: true,
    beta: false,
    live: false,
    apiEndpoint: "/api/ai/horoscope"
  },
  {
    id: "ai4",
    name: "AI Premium Reports",
    description: "Generate 50+ page customized Astro-Numerology life reports with advanced spatial energy diagrams and solutions.",
    comingSoon: true,
    beta: false,
    live: false,
    apiEndpoint: "/api/ai/reports"
  },
  {
    id: "ai5",
    name: "AI Learning Cohorts",
    description: "Personalized educational tracks that adapt based on your progress through Chaldean, Vastu, and Lo Shu Grid modules.",
    comingSoon: true,
    beta: true,
    live: false,
    apiEndpoint: "/api/ai/learning"
  }
];
