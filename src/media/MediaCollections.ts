import { MediaCollection, MediaCategory, MediaSpeaker } from './MediaTypes';

export const MEDIA_COLLECTIONS: MediaCollection[] = [
  {
    id: "success-stories",
    name: "Quick Success Stories",
    description: "Real feedback and jaw-dropping life breakthroughs from LEO Family students around the world.",
    priority: 100
  },
  {
    id: "student-reviews",
    name: "Student Reviews",
    description: "Deep reviews and testimonials of courses, gemstones, name correction, and astrology.",
    priority: 95
  },
  {
    id: "numerology-masterclass",
    name: "Numerology Masterclass",
    description: "Core lectures on Chaldean and Vedic numerology, destiny grids, and name alignments.",
    priority: 90
  },
  {
    id: "free-classes",
    name: "Free Numerology Classes",
    description: "Get started for free with foundational numerology lessons by Raajeev Singh Chauhann.",
    priority: 85
  },
  {
    id: "astrology",
    name: "Astrology & Dasha Remediations",
    description: "Planetary alignments, gemstone selection, and navigating challenging dasha periods.",
    priority: 80
  },
  {
    id: "vastu",
    name: "Vastu Shastra Energetics",
    description: "Workplace, factory, and home spatial optimizations using non-destructive remedies.",
    priority: 75
  },
  {
    id: "relationship-guidance",
    name: "Relationship Guidance",
    description: "Aligning relationship grids and resolving spatial blocks to foster ultimate communication and harmony.",
    priority: 70
  },
  {
    id: "business-guidance",
    name: "Business & Corporate Strategy",
    description: "Brand name vibration alignments, corporate partnerships, and launch date picking.",
    priority: 65
  },
  {
    id: "meditation",
    name: "Meditation & Breathwork Sadhana",
    description: "Daily Vedic alternate breathing (Pranayama) and subconscious fear cleansings.",
    priority: 60
  },
  {
    id: "motivation",
    name: "Motivation & Mindset",
    description: "Vedic wisdom, conquoring subconscious fears, and aligning your mindset with abundance.",
    priority: 55
  },
  {
    id: "webinars",
    name: "Webinars & Live Events",
    description: "Full recordings of interactive masterclasses, live calculations, and student Q&A sessions.",
    priority: 50
  },
  {
    id: "founder-messages",
    name: "Founder Messages & Vision",
    description: "Personal guidelines and spiritual notes from Raajeev Singh Chauhann.",
    priority: 45
  },
  {
    id: "trending",
    name: "Trending Now",
    description: "Most active high-vibrational videos watched by our community this week.",
    priority: 40
  },
  {
    id: "popular",
    name: "Most Popular",
    description: "All-time favorite breakthrough videos with over 100K+ combined student views.",
    priority: 35
  },
  {
    id: "editors-picks",
    name: "Editor's Picks",
    description: "Highly recommended foundational lessons handpicked for new seekers.",
    priority: 30
  }
];

export const MEDIA_CATEGORIES: MediaCategory[] = [
  { id: "all", name: "All", description: "Browse all media categories" },
  { id: "success-stories", name: "Student Success Stories", description: "Firsthand accounts of name, vastu, and gemstone corrections." },
  { id: "free-classes", name: "Free Numerology Classes", description: "Deep dives into planetary numbers, compound calculations, and signatures." },
  { id: "astrology", name: "Astrology", description: "Planetary cycles, dashas, nakshatras, and remedial gemstones." },
  { id: "vastu", name: "Vastu", description: "Non-destructive residential, commercial, and industrial corrections." },
  { id: "motivation", name: "Motivational Talks", description: "Vedic mindset training, willpower expansion, and releasing fear blocks." },
  { id: "meditation", name: "Meditation", description: "Breathing sadhanas, brain hemispheric balancing, and inner peace." },
  { id: "business", name: "Business Guidance", description: "Trade name configurations, partners, and high-frequency business hours." },
  { id: "relationship", name: "Relationship Guidance", description: "Family grid calculations, communication fixes, and water-remedies." },
  { id: "life-transformation", name: "Life Transformation", description: "Holistic integration of mind, body, environment, and destiny." },
  { id: "webinars", name: "Webinars", description: "Recorded live interactive seminars and student board-mappings." }
];

export const MEDIA_SPEAKERS: MediaSpeaker[] = [
  {
    id: "raajeev-chauhann",
    name: "Raajeev Singh Chauhann",
    role: "Founder, Celebrity Numerologist & Vastu Expert",
    bio: "Pioneering non-destructive Vastu remedies and Chaldean planetary frequency alignments for over two decades.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "leo-scholar",
    name: "LEO Family Scholar",
    role: "Verified Graduate / Success Story",
    bio: "A certified practitioner of Chaldean science trained under the direct guidance of Raajeev Singh Chauhann."
  }
];
