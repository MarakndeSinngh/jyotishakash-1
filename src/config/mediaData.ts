export interface MediaVideo {
  id: string; // YouTube Video ID or playlist ID
  type: 'video' | 'playlist' | 'shorts';
  title: string;
  category: string;
  instructor: string;
  duration: string;
  views: string;
  publishedDate: string;
  description: string;
  url: string;
  featured?: boolean;
  learnings?: string[];
  relatedCourseId?: string;
  relatedCourseName?: string;
  consultationLink?: string;
  stars?: number;
  tags?: string[];
}

export const MEDIA_CATEGORIES = [
  "All",
  "Student Success Stories",
  "Free Numerology Classes",
  "Astrology",
  "Vastu",
  "Motivational Talks",
  "Meditation",
  "Business Guidance",
  "Relationship Guidance",
  "Life Transformation",
  "Webinars"
];

export const MEDIA_VIDEOS: MediaVideo[] = [
  {
    id: "RcmLxAECJAc",
    type: "video",
    title: "How Compound Planetary Frequencies Shape Your Entire Career",
    category: "Free Numerology Classes",
    instructor: "Raajeev Singh Chauhann",
    duration: "18:45",
    views: "184K",
    publishedDate: "2026-05-10",
    description: "In this comprehensive class, Raajeev Singh Chauhann explains how Chaldean planetary frequencies interact with your name and birth dates. Learn how double-digit compound numbers generate energetic currents that directly dictate your corporate success, signature power, and financial breakthroughs.",
    url: "https://youtube.com/watch?v=RcmLxAECJAc",
    featured: true,
    stars: 5,
    tags: ["Planetary Frequencies", "Chaldean Science", "Corporate Success"],
    learnings: [
      "Understand the difference between single-digit master numbers and compound numbers.",
      "How to calculate your Name Vibration number and align it to your birth grid.",
      "Why professional breakthroughs depend heavily on your active signature structure.",
      "Real-world case studies of massive film and corporate business alignments."
    ],
    relatedCourseId: "c1",
    relatedCourseName: "Complete Chaldean Numerology",
    consultationLink: "https://wa.me/919953713176?text=Hi%20Raajeev%20ji,%20I%20watched%20your%20Compound%20Planetary%20Frequencies%20class."
  },
  {
    id: "PLOFld0SYjqbZ-wCREGBGP4d96TDm7ZbDf",
    type: "playlist",
    title: "Mastering Vastu Energetics & Non-Destructive Solutions",
    category: "Vastu",
    instructor: "Raajeev Singh Chauhann",
    duration: "Playlist (12 Videos)",
    views: "340K",
    publishedDate: "2026-04-12",
    description: "Discover the profound science of Vastu Shastra without the need for demolition or reconstruction. This masterclass playlist guides you through balancing energetic directions, optimizing positive planetary nodes, and utilizing brass and gemstone corrective implants to enhance workplace health and home harmony.",
    url: "https://youtube.com/playlist?list=PLOFld0SYjqbZ-wCREGBGP4d96TDm7ZbDf",
    featured: false,
    stars: 5,
    tags: ["Vastu Correction", "Non-Destructive Vastu", "Industrial Space Harmony"],
    learnings: [
      "Identify toxic planetary directions and weak elemental quadrants in any property.",
      "Apply high-vibrational gemstone placements to cure structural imbalances.",
      "The role of center-point 'Brahmasthan' stability in continuous business profitability.",
      "Simple, cost-effective brass-wire corrections for south-facing properties."
    ],
    relatedCourseId: "c6",
    relatedCourseName: "Vastu Shastra Foundation",
    consultationLink: "https://wa.me/919953713176?text=Hi%20Raajeev%20ji,%20I%20am%20interested%20in%20a%20Vastu%20Consultation."
  },
  {
    id: "RcmLxAECJAc-reviews1",
    type: "video",
    title: "Priya Sharma's Ultimate Spiritual Name Correction Success Story",
    category: "Student Success Stories",
    instructor: "LEO Family Scholar",
    duration: "04:12",
    views: "42K",
    publishedDate: "2026-06-01",
    description: "Priya Sharma details how simple changes to her active name spelling and professional signature unlocked major opportunities in her film production career. Within 4 months of her custom correction, she signed her first major multi-crore project after a 2-year struggle.",
    url: "https://youtube.com/shorts/RcmLxAECJAc",
    stars: 5,
    tags: ["Name Correction", "Student Review", "Spiritual Alignment"],
    learnings: [
      "The fast-acting resonance of correcting active spellings on professional profiles.",
      "How name-destiny grid harmony works inside the Chaldean framework.",
      "The dynamic of signature geometry in attracting strategic investors.",
      "Releasing stubborn energetic blocks caused by mismatched compound numbers."
    ],
    relatedCourseId: "c3",
    relatedCourseName: "Premium Name Numerology",
    consultationLink: "https://wa.me/919953713176?text=Hi%20Raajeev%20ji,%20I%20want%20to%20correct%20my%20Name%20vibrations."
  },
  {
    id: "RcmLxAECJAc-astrology",
    type: "video",
    title: "Demystifying Saturn and Rahu Dasha Remediations",
    category: "Astrology",
    instructor: "Raajeev Singh Chauhann",
    duration: "12:30",
    views: "98K",
    publishedDate: "2026-03-24",
    description: "Saturn and Rahu cycles do not have to mean hardship. Raajeev Singh Chauhann demystifies active astrological dasha phases, detailing how exact gemstone selection, Vedic mantras, and charity schedules can turn obstacle phases into times of intense expansion.",
    url: "https://youtube.com/watch?v=RcmLxAECJAc",
    stars: 5,
    tags: ["Planetary Dashas", "Saturn Remediation", "Rahu Dasha Remedies"],
    learnings: [
      "The real purpose of Saturn cycles: psychological discipline and long-term security.",
      "How to avoid synthetic gemstones that intensify negative planetary nodes.",
      "Simple, active charity regimes aligned with specific days and times.",
      "Combining gemstone science with Chaldean birth grid calculations."
    ],
    relatedCourseId: "c7",
    relatedCourseName: "Astrology Essentials & Dashas",
    consultationLink: "https://wa.me/919953713176?text=Hi%20Raajeev%20ji,%20I%20am%20undergoing%20a%20challenging%20Dasha%20cycle."
  },
  {
    id: "RcmLxAECJAc-motivation",
    type: "video",
    title: "Conquering Subconscious Fears and Planetary Shadows",
    category: "Motivational Talks",
    instructor: "Raajeev Singh Chauhann",
    duration: "14:50",
    views: "115K",
    publishedDate: "2026-05-18",
    description: "In this powerful motivational session, Raajeev Singh Chauhann outlines how planetary shadows affect our mental frameworks. He shares five practical daily habits designed to reprogram your response to fear, restore your self-belief, and build unwavering mental toughness.",
    url: "https://youtube.com/watch?v=RcmLxAECJAc",
    stars: 5,
    tags: ["Planetary Shadows", "Fear Programming", "Mental Toughness"],
    learnings: [
      "How planetary alignments influence neural thought loops.",
      "The exact hour of 'Brahma Muhurta' and its role in rebuilding willpower.",
      "How to identify if your physical home environments are inducing brain fog.",
      "Techniques to create an energetic barrier around your professional space."
    ],
    relatedCourseId: "c8",
    relatedCourseName: "Meditation & Spiritual Awakening",
    consultationLink: "https://wa.me/919953713176?text=Hi%20Raajeev%20ji,%20I%20want%20to%20build%20mental%20peace."
  },
  {
    id: "RcmLxAECJAc-meditation",
    type: "video",
    title: "A Complete 10-Minute Daily Breath-Control Sadhana",
    category: "Meditation",
    instructor: "Raajeev Singh Chauhann",
    duration: "10:15",
    views: "152K",
    publishedDate: "2026-02-14",
    description: "A step-by-step guidance on authentic Vedic breath regulation (Pranayama). Designed for busy professionals, entrepreneurs, and students to calm active central nervous systems, reset adrenal fatigue, and focus raw planetary energies for mental clarity.",
    url: "https://youtube.com/watch?v=RcmLxAECJAc",
    stars: 5,
    tags: ["Pranayama", "Breathwork", "Pranic Respiration"],
    learnings: [
      "The dual-nostril alternate breathing pattern for hemispheric brain harmony.",
      "How slow, structured retention (Kumbhaka) resets physical stress responses.",
      "Selecting the ideal natural posture to avoid energetic spine blocks.",
      "How to integrate breathwork before performing key numerology calculations."
    ],
    relatedCourseId: "c8",
    relatedCourseName: "Meditation & Spiritual Awakening",
    consultationLink: "https://wa.me/919953713176?text=Hi%20Raajeev%20ji,%20I%20want%20to%20learn%20Pranayama."
  },
  {
    id: "RcmLxAECJAc-business",
    type: "video",
    title: "Chaldean Strategies for Corporate Names and Partnerships",
    category: "Business Guidance",
    instructor: "Raajeev Singh Chauhann",
    duration: "16:22",
    views: "88K",
    publishedDate: "2026-01-28",
    description: "In business, timing and naming are everything. Learn how major multinational companies use planetary consonants to build worldwide brand resonance. Discover the simple steps to calculate your corporate trade name and ensure your founding partnerships are highly compatible.",
    url: "https://youtube.com/watch?v=RcmLxAECJAc",
    stars: 5,
    tags: ["Corporate Brand Power", "Partnership Compatibility", "Chaldean Names"],
    learnings: [
      "The core letters that carry extreme wealth frequencies in business names.",
      "How to align your trade name to the industry category's planetary lord.",
      "Detecting hidden partner friction before signing incorporation structures.",
      "Selecting high-prosperity launch dates based on moon phases and planetary hours."
    ],
    relatedCourseId: "c5",
    relatedCourseName: "Business Numerology Strategy",
    consultationLink: "https://wa.me/919953713176?text=Hi%20Raajeev%20ji,%20I%20want%20to%20rebrand%20my%20business."
  },
  {
    id: "RcmLxAECJAc-relations",
    type: "video",
    title: "Harmonizing Planetary Frequencies in Relationships",
    category: "Relationship Guidance",
    instructor: "Raajeev Singh Chauhann",
    duration: "13:40",
    views: "74K",
    publishedDate: "2026-04-05",
    description: "When relationship friction arises, it's often a clash of active planetary numbers. Raajeev Singh Chauhann demonstrates how to calculate your compatibility grid and use peaceful Vedic non-destructive remedies to cultivate harmony, mutual support, and communication.",
    url: "https://youtube.com/watch?v=RcmLxAECJAc",
    stars: 5,
    tags: ["Relationship Numerology", "Compatibility Remediations", "Communication Keys"],
    learnings: [
      "Find the exact numbers that govern communication and passive empathy.",
      "Why relationship friction is often a reflection of active spatial direction imbalances.",
      "Using gentle water-energy corrects to reduce excessive fiery numbers.",
      "How to resolve grid conflicts using simple daily mutual resonance exercises."
    ],
    relatedCourseId: "c1",
    relatedCourseName: "Complete Chaldean Numerology",
    consultationLink: "https://wa.me/919953713176?text=Hi%20Raajeev%20ji,%20I%20need%20relationship%20harmony."
  },
  {
    id: "RcmLxAECJAc-transformation",
    type: "video",
    title: "The Ultimate Guide to Cellular Transformation & Remedial Healing",
    category: "Life Transformation",
    instructor: "Raajeev Singh Chauhann",
    duration: "22:15",
    views: "210K",
    publishedDate: "2026-06-14",
    description: "True healing is an energetic shift. This masterclass connects Vedic gemstone crystalline structure, planetary frequencies, and subconscious habits. See how simple adjustments to your external filters can prompt a massive positive upgrade in health, focus, and life prosperity.",
    url: "https://youtube.com/watch?v=RcmLxAECJAc",
    stars: 5,
    tags: ["Cellular Resonance", "Vedic Gemstone Crystals", "Remedial Upgrades"],
    learnings: [
      "How natural gemstones capture and funnel solar planetary spectrums into the skin.",
      "Why wearing the wrong gemstone can cause unexpected emotional spikes.",
      "The role of complete, deep cellular detoxification during planetary phase shifts.",
      "Mapping your physical body's energy chakras to specific Chaldean numbers."
    ],
    relatedCourseId: "c1",
    relatedCourseName: "Complete Chaldean Numerology",
    consultationLink: "https://wa.me/919953713176?text=Hi%20Raajeev%20ji,%20I%20am%20ready%20for%20life%20transformation."
  },
  {
    id: "RcmLxAECJAc-webinar",
    type: "video",
    title: "Chaldean Numerology Live Webinar: Interactive Destiny Grid Mapping",
    category: "Webinars",
    instructor: "Raajeev Singh Chauhann",
    duration: "1:42:10",
    views: "310K",
    publishedDate: "2026-07-01",
    description: "Re-watch our latest interactive LEO Family live webinar. Raajeev Singh Chauhann conducts live calculations for students, mapping their destiny grids on the digital board and offering precise remedial corrections in real-time.",
    url: "https://youtube.com/watch?v=RcmLxAECJAc",
    stars: 5,
    tags: ["Chaldean Live Grid", "Student Calculations", "Spiritual Webinar Session"],
    learnings: [
      "Observe live grid drawing and how planetary vacancies are analyzed.",
      "The immediate effects of combining missing numbers with proper Vedic stones.",
      "Real-time student Q&As covering mobile numerology combination frequencies.",
      "Exclusive announcements regarding our upcoming 12-Week Academy courses."
    ],
    relatedCourseId: "c1",
    relatedCourseName: "Complete Chaldean Numerology",
    consultationLink: "https://wa.me/919953713176?text=Hi%20Raajeev%20ji,%20I%20want%20to%20register%20for%20the%20next%20Live%20Webinar."
  }
];

export interface MediaShort {
  id: string;
  student: string;
  course: string;
  tag: string;
  quote: string;
  city: string;
  likes: string;
}

export const MEDIA_SHORTS: MediaShort[] = [
  {
    id: "RcmLxAECJAc",
    student: "Priya Sharma",
    course: "Name Correction",
    tag: "Film Production",
    quote: "Within exactly four months of my name vibration alignment, I unlocked a multi-crore film project!",
    city: "Mumbai, India",
    likes: "24.5K"
  },
  {
    id: "RcmLxAECJAc-short2",
    student: "Anand Verma",
    course: "Corporate Vastu",
    tag: "Real Estate",
    quote: "Our factory efficiency went up by 45% after stabilizing the south-west direction using brass rods.",
    city: "New Delhi, India",
    likes: "18.2K"
  },
  {
    id: "RcmLxAECJAc-short3",
    student: "Dr. Kabir Roy",
    course: "Mobile Numerology",
    tag: "Medical Practice",
    quote: "My patient inquiries doubled when I changed my business mobile combination. Simply incredible!",
    city: "Kolkata, India",
    likes: "12.9K"
  },
  {
    id: "RcmLxAECJAc-short4",
    student: "Elena Rostova",
    course: "Chaldean Science",
    tag: "Spiritual Coaching",
    quote: "Transitioned from a boring corporate desk job to an active numerology coach in London within a year.",
    city: "London, UK",
    likes: "31.4K"
  }
];
