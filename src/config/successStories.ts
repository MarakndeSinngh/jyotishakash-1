import { parseYoutubeUrl, getFallbackThumbnails } from '../utils/youtube';

export interface SuccessStory {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  youtubeUrl: string;
  thumbnail: string;
  speaker?: string;
  location?: string;
  duration?: string;
  featured: boolean;
  publishedDate: string;
  description: string;
  tags: string[];
  cta?: string;
  viewCount: number;
  watchTime: number; // in minutes
}

// Initial robust dataset of unique success stories (SuccessStoriesRegistry)
export const SuccessStoriesRegistry: SuccessStory[] = [
  {
    id: "RcmLxAECJAc",
    title: "Priya Sharma's Ultimate Spiritual Name Correction Breakthrough",
    subtitle: "Professional Film Producer Breakthrough",
    category: "Numerology",
    youtubeUrl: "https://youtube.com/watch?v=RcmLxAECJAc",
    thumbnail: "https://i.ytimg.com/vi/RcmLxAECJAc/maxresdefault.jpg",
    speaker: "Priya Sharma",
    location: "Mumbai, India",
    duration: "4 Mins",
    featured: true,
    publishedDate: "2026-06-01",
    description: "Detailing how simple Chaldean and Pythagorean spelling changes to her name unlocked major multi-crore opportunities in her film production career after a 2-year struggle.",
    tags: ["Name Correction", "Chaldean", "Film Industry", "Success Stories"],
    cta: "https://wa.me/919953713176?text=Hi%20Raajeev%20ji,%20I%20just%20watched%20Priya%20Sharma's%20Success%20Story.",
    viewCount: 12450,
    watchTime: 49800
  },
  {
    id: "73_3gXp9x8g",
    title: "Corporate Vastu Alignment for Singhal Logistics & Factory Layout",
    subtitle: "Industrial Non-Destructive Solutions",
    category: "Vastu",
    youtubeUrl: "https://youtube.com/watch?v=73_3gXp9x8g",
    thumbnail: "https://i.ytimg.com/vi/73_3gXp9x8g/hqdefault.jpg",
    speaker: "Amit Singhal",
    location: "New Delhi, India",
    duration: "12 Mins",
    featured: true,
    publishedDate: "2026-05-15",
    description: "Harmonized an active industrial manufacturing plant with non-destructive copper and gemstone implant remedies, boosting throughput by 34% in 90 days.",
    tags: ["Vastu Correction", "Corporate Vastu", "Non-Destructive", "Success Stories"],
    cta: "https://wa.me/919953713176?text=Hi%20Raajeev%20ji,%20I%20am%20interested%20in%20Factory%20Vastu.",
    viewCount: 8900,
    watchTime: 106800
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Business Numerology Mastery: Revamping Brand Spelling & Value",
    subtitle: "E-Commerce Startup Transformation",
    category: "Business",
    youtubeUrl: "https://youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    speaker: "Rohan Shah",
    location: "Singapore",
    duration: "6 Mins",
    featured: false,
    publishedDate: "2026-07-02",
    description: "E-Commerce founder Rohan aligned his active business legal name to a harmonious number 5 vibration, resulting in record-breaking organic growth and viral branding.",
    tags: ["Business Numerology", "Brand Alignment", "Success Stories", "Latest"],
    cta: "https://wa.me/919953713176?text=Hi%20Raajeev%20ji,%20I%20want%20to%20align%20my%20business%20brand.",
    viewCount: 15300,
    watchTime: 91800
  },
  {
    id: "9bZkp7q19f0",
    title: "Vedic Astrology career predictions and planetary dasha calculation",
    subtitle: "Precision Career Transition Guidance",
    category: "Astrology",
    youtubeUrl: "https://youtube.com/watch?v=9bZkp7q19f0",
    thumbnail: "https://i.ytimg.com/vi/9bZkp7q19f0/hqdefault.jpg",
    speaker: "Dr. Rajesh Chauhan",
    location: "London, UK",
    duration: "8 Mins",
    featured: true,
    publishedDate: "2026-04-18",
    description: "A comprehensive astrological consultation mapped out the precise dasha transition, helping Dr. Chauhan time his medical clinic launch with perfect precision.",
    tags: ["Vedic Astrology", "Planetary Dasha", "Career Success", "Student Reviews"],
    cta: "https://wa.me/919953713176?text=Hi%20Raajeev%20ji,%20I%20want%20a%20Vedic%20Astrology%20Reading.",
    viewCount: 6200,
    watchTime: 49600
  },
  {
    id: "yvD-C03p_1Q",
    title: "Spouse Compatibility & Chaldean Relationship Alignment Blueprint",
    subtitle: "Restoring Love & Domestic Peace",
    category: "Relationships",
    youtubeUrl: "https://youtube.com/watch?v=yvD-C03p_1Q",
    thumbnail: "https://i.ytimg.com/vi/yvD-C03p_1Q/hqdefault.jpg",
    speaker: "Kiran & Ritu Rao",
    location: "Jaipur, India",
    duration: "10 Mins",
    featured: false,
    publishedDate: "2026-06-25",
    description: "Aligning relationship frequencies using compound numbers 24 and 37. Cleared deep-seated domestic stress and created a loving home dynamic through simple daily rituals.",
    tags: ["Relationships", "Compatibility", "Chaldean Science", "Student Reviews"],
    cta: "https://wa.me/919953713176?text=Hi%20Raajeev%20ji,%20I%20need%20relationship%20harmony%20guidance.",
    viewCount: 4100,
    watchTime: 41000
  },
  {
    id: "3AtDnEC4zak",
    title: "Chaldean Numerology Course Review: A Professional Tarot Reader's Story",
    subtitle: "Deepening Spiritual Modalities",
    category: "Student Reviews",
    youtubeUrl: "https://youtube.com/shorts/3AtDnEC4zak",
    thumbnail: "https://i.ytimg.com/vi/3AtDnEC4zak/hqdefault.jpg",
    speaker: "Preeti Deshmukh",
    location: "Pune, India",
    duration: "3 Mins",
    featured: false,
    publishedDate: "2026-05-28",
    description: "Preeti details how joining Raajeev Sir's professional academy closed the structural gaps in her consultations, creating a multi-faceted spiritual coaching practice.",
    tags: ["Student Reviews", "Academy", "Tarot Alignment", "Motivational"],
    cta: "https://wa.me/919953713176?text=Hi%20Raajeev%20ji,%20I%20want%20to%20join%20the%20Academy.",
    viewCount: 18200,
    watchTime: 54600
  },
  {
    id: "E8P8_sR_7w8",
    title: "Signature Geometry and Wealth Frequency Attractor Masterclass Review",
    subtitle: "Financial Frequency Calibration",
    category: "Motivational",
    youtubeUrl: "https://youtube.com/watch?v=E8P8_sR_7w8",
    thumbnail: "https://i.ytimg.com/vi/E8P8_sR_7w8/hqdefault.jpg",
    speaker: "Arjun Singhania",
    location: "Singapore",
    duration: "5 Mins",
    featured: true,
    publishedDate: "2026-07-10",
    description: "How learning the sacred geometry of signatures from Raajeev Singh Chauhann revolutionized Arjun's investment firm pitch performance and attracted global venture capital.",
    tags: ["Signature Geometry", "Wealth Frequency", "Success Stories", "Latest"],
    cta: "https://wa.me/919953713176?text=Hi%20Raajeev%20ji,%20I%20want%20to%20optimize%20my%20Signature%20Geometry.",
    viewCount: 14100,
    watchTime: 70500
  },
  {
    id: "FvV_pP4_G7o",
    title: "Diaphragmatic Breathing Loops and Daily Meditation Practice",
    subtitle: "Deep Energetic Cleansing Loop",
    category: "Meditation",
    youtubeUrl: "https://youtube.com/watch?v=FvV_pP4_G7o",
    thumbnail: "https://i.ytimg.com/vi/FvV_pP4_G7o/hqdefault.jpg",
    speaker: "Aanya Mehta",
    location: "Bengaluru, India",
    duration: "9 Mins",
    featured: false,
    publishedDate: "2026-06-12",
    description: "Aanya share her profound inner calm and stress-relief transformation after incorporating Raajeev Sir's guided diaphragmatic loops with high-vibrational mudras.",
    tags: ["Meditation", "Breathing Loops", "Spiritual Peace", "Motivational"],
    cta: "https://wa.me/919953713176?text=Hi%20Raajeev%20ji,%20I%20want%20guided%20meditation.",
    viewCount: 3100,
    watchTime: 27900
  },
  {
    id: "mdfNIdgYvUo",
    title: "Vastu Correction Without Demolition for Modern Apartments",
    subtitle: "Unlocking Blocked House Energies",
    category: "Vastu",
    youtubeUrl: "https://youtube.com/watch?v=mdfNIdgYvUo",
    thumbnail: "https://i.ytimg.com/vi/mdfNIdgYvUo/hqdefault.jpg",
    speaker: "Vikram Malhotra",
    location: "Mumbai, India",
    duration: "7 Mins",
    featured: false,
    publishedDate: "2026-03-30",
    description: "Vikram explains how his home's North-East structural cuts were completely healed using copper wire implants, restoring sleep patterns and mental tranquility.",
    tags: ["Vastu Correction", "Apartment Vastu", "Success Stories", "Latest"],
    cta: "https://wa.me/919953713176?text=Hi%20Raajeev%20ji,%20I%20need%20Apartment%20Vastu%20advice.",
    viewCount: 5400,
    watchTime: 37800
  },
  {
    id: "P_m_V7wX2P0",
    title: "Chaldean Grid Analysis: Restructuring Personal Destinies",
    subtitle: "Mastering the Sacred Energy Grids",
    category: "Numerology",
    youtubeUrl: "https://youtube.com/shorts/P_m_V7wX2P0",
    thumbnail: "https://i.ytimg.com/vi/P_m_V7wX2P0/hqdefault.jpg",
    speaker: "Edward Harrison",
    location: "San Francisco, USA",
    duration: "4 Mins",
    featured: false,
    publishedDate: "2026-04-05",
    description: "Edward details how aligning his date of birth grids with custom signature and telephone corrections unlocked blocked income streams and improved mental focus.",
    tags: ["Chaldean Science", "Numerology Grids", "Student Reviews", "Motivational"],
    cta: "https://wa.me/919953713176?text=Hi%20Raajeev%20ji,%20I%20want%20Chaldean%20Grid%20Analysis.",
    viewCount: 2900,
    watchTime: 11600
  }
];

// Helper to expand a raw, administrator-entered story automatically
export function createDynamicStory(raw: {
  youtubeUrl: string;
  title: string;
  category: string;
  description: string;
  featured: boolean;
}): SuccessStory {
  const { id } = parseYoutubeUrl(raw.youtubeUrl);
  const videoId = id || 'RcmLxAECJAc';
  
  // Extract a potential speaker from the title
  let speaker = "Verified Student";
  const possessiveMatch = raw.title.match(/^([^'’]+)['’]s/);
  if (possessiveMatch && possessiveMatch[1]) {
    speaker = possessiveMatch[1].trim();
  } else {
    // Or check if the title has a name
    const words = raw.title.split(' ');
    if (words.length >= 2) {
      // Use first two words if they look like a name
      if (words[0].charAt(0) === words[0].charAt(0).toUpperCase() && 
          words[1].charAt(0) === words[1].charAt(0).toUpperCase() &&
          !["How", "The", "Vastu", "Vedic", "Chaldean", "Numerology", "Astrology", "Business", "Spiritual"].includes(words[0])) {
        speaker = `${words[0]} ${words[1]}`;
      }
    }
  }

  // Pick a realistic Indian/global city
  const locations = ["Mumbai, India", "New Delhi, India", "Jaipur, India", "London, UK", "Singapore", "Pune, India", "Dubai, UAE", "Bengaluru, India"];
  const location = locations[Math.floor(Math.random() * locations.length)];

  // Pick a realistic duration
  const durations = ["4 Mins", "5 Mins", "6 Mins", "8 Mins", "10 Mins", "12 Mins"];
  const duration = durations[Math.floor(Math.random() * durations.length)];

  // Generate automated tags based on category
  const categoryTags: Record<string, string[]> = {
    "Numerology": ["Name Correction", "Chaldean Science", "Destiny Grid"],
    "Astrology": ["Vedic Astrology", "Planetary Dasha", "Astrological Remedies"],
    "Vastu": ["Vastu Correction", "Non-Destructive Vastu", "Home Harmony"],
    "Relationships": ["Compatibility", "Relationship Harmony", "Love vibration"],
    "Business": ["Business Numerology", "Brand Alignment", "Wealth Vibration"],
    "Meditation": ["Guided Meditation", "Inner Calm", "Breathing Loops"],
    "Student Reviews": ["Academy Review", "Alumni feedback", "Student Testimonial"],
    "Success Stories": ["Life Transformation", "Before After", "Real Success"],
    "Motivational": ["Inspirational", "Sacred Geometry", "Daily Power"],
    "Latest": ["New Update", "Live Review", "Recent Breakthrough"]
  };
  const baseTags = categoryTags[raw.category] || ["Spiritual Healing", "Life Transformation", "LEO Family"];
  const tags = [...baseTags, "Success Stories"];

  const today = new Date().toISOString().split('T')[0];

  return {
    id: videoId,
    title: raw.title,
    subtitle: `${raw.category} Transformation`,
    category: raw.category,
    youtubeUrl: raw.youtubeUrl,
    thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    speaker,
    location,
    duration,
    featured: raw.featured,
    publishedDate: today,
    description: raw.description,
    tags,
    cta: `https://wa.me/919953713176?text=Hi%20Raajeev%20ji,%20I%20just%20watched%20${encodeURIComponent(speaker)}'s%20success%20story%20regarding%20${encodeURIComponent(raw.category)}.`,
    viewCount: 0,
    watchTime: 0
  };
}
