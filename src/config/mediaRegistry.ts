import { parseYoutubeUrl, getFallbackThumbnails } from '../utils/youtube';

export type TeacherId = 'raajeev' | 'shaunak' | 'sannjoy' | 'all';

export type MediaCategory =
  | 'Student Success Stories'
  | 'Testimonials'
  | 'Shorts'
  | 'Full Classes'
  | 'Free Classes'
  | 'Motivational Videos'
  | 'Webinars'
  | 'Interviews'
  | 'Astrology'
  | 'Numerology'
  | 'Vastu'
  | 'Gemstones'
  | 'Spiritual AI';

export interface MediaItem {
  id: string;
  title: string;
  description: string;
  teacherId: TeacherId;
  category: MediaCategory | string;
  youtubeUrl: string;
  youtubeVideoId: string;
  thumbnail: string;
  duration: string;
  language: string;
  featured: boolean;
  playlist?: string;
  publishDate: string;
  tags: string[];
  views?: string;
  speaker?: string;
  location?: string;
  courseName?: string;
  consultationLink?: string;
  stars?: number;
  isShort?: boolean;
  isPlaylist?: boolean;
}

/**
 * Automatically derives YouTube thumbnail URL with maxresdefault.
 * Fallback to hqdefault / mqdefault is handled dynamically by YouTubeCard component.
 */
export function getAutoYoutubeThumbnail(
  youtubeVideoId: string,
  resolution: 'maxresdefault' | 'hqdefault' | 'mqdefault' | 'sddefault' = 'maxresdefault'
): string {
  if (!youtubeVideoId) return '/gemstone-assets/background.png';
  return `https://img.youtube.com/vi/${youtubeVideoId}/${resolution}.jpg`;
}

/**
 * Extracts YouTube video ID or playlist ID from standard URL formats.
 */
export function extractYoutubeIdFromUrl(url: string): {
  id: string;
  isPlaylist: boolean;
  isShort: boolean;
} {
  const details = parseYoutubeUrl(url);
  return {
    id: details.id,
    isPlaylist: details.type === 'playlist',
    isShort: details.type === 'shorts',
  };
}

/**
 * Centralized Media Library - Single Source of Truth for all video assets
 */
export const MEDIA_REGISTRY: MediaItem[] = [
  // ==========================================
  // RAAJEEV SINGH CHAUHANN (FOUNDER & MASTER)
  // ==========================================
  {
    id: 'raajeev-01',
    title: 'How Compound Planetary Frequencies Shape Your Entire Career',
    description: 'Masterclass explaining how Chaldean planetary frequencies interact with name and birth dates to dictate corporate and financial breakthroughs.',
    teacherId: 'raajeev',
    category: 'Free Classes',
    youtubeUrl: 'https://www.youtube.com/watch?v=RcmLxAECJAc',
    youtubeVideoId: 'RcmLxAECJAc',
    thumbnail: getAutoYoutubeThumbnail('RcmLxAECJAc', 'maxresdefault'),
    duration: '18:45',
    language: 'Hindi',
    featured: true,
    publishDate: '2026-05-10',
    views: '184K',
    tags: ['Chaldean Science', 'Planetary Frequencies', 'Corporate Success', 'Name Alignment'],
    consultationLink: 'https://wa.me/919953713176?text=Hi%20Raajeev%20ji,%20I%20am%20interested%20in%20a%20consultation.',
  },
  {
    id: 'raajeev-02',
    title: 'Mastering Vastu Energetics & Non-Destructive Solutions',
    description: 'Complete Vastu Shastra playlist for balancing energetic directions using non-destructive brass and gemstone corrective implants.',
    teacherId: 'raajeev',
    category: 'Vastu',
    youtubeUrl: 'https://www.youtube.com/playlist?list=PLOFld0SYjqbZ-wCREGBGP4d96TDm7ZbDf',
    youtubeVideoId: 'PLOFld0SYjqbZ-wCREGBGP4d96TDm7ZbDf',
    thumbnail: getAutoYoutubeThumbnail('RcmLxAECJAc', 'maxresdefault'),
    duration: 'Playlist (12 Videos)',
    language: 'Hindi',
    featured: true,
    playlist: 'PLOFld0SYjqbZ-wCREGBGP4d96TDm7ZbDf',
    publishDate: '2026-04-12',
    views: '340K',
    isPlaylist: true,
    tags: ['Vastu Correction', 'Non-Destructive Vastu', 'Industrial Harmony'],
  },
  {
    id: 'raajeev-03',
    title: 'Demystifying Saturn and Rahu Dasha Remediations',
    description: 'Vedic Astrology Dasha cycles and exact gemstone selection to turn obstacle phases into times of intense expansion.',
    teacherId: 'raajeev',
    category: 'Astrology',
    youtubeUrl: 'https://www.youtube.com/watch?v=RcmLxAECJAc',
    youtubeVideoId: 'RcmLxAECJAc',
    thumbnail: getAutoYoutubeThumbnail('RcmLxAECJAc', 'maxresdefault'),
    duration: '12:30',
    language: 'Hindi',
    featured: true,
    publishDate: '2026-03-24',
    views: '98K',
    tags: ['Planetary Dashas', 'Saturn Remediation', 'Rahu Dasha Remedies'],
  },
  {
    id: 'raajeev-04',
    title: 'Conquering Subconscious Fears and Planetary Shadows',
    description: 'Spiritual willpower and mindset training to reprogram your response to fear and build mental toughness.',
    teacherId: 'raajeev',
    category: 'Motivational Videos',
    youtubeUrl: 'https://www.youtube.com/watch?v=RcmLxAECJAc',
    youtubeVideoId: 'RcmLxAECJAc',
    thumbnail: getAutoYoutubeThumbnail('RcmLxAECJAc', 'maxresdefault'),
    duration: '14:50',
    language: 'Hindi',
    featured: false,
    publishDate: '2026-05-18',
    views: '115K',
    tags: ['Mindset', 'Spiritual Willpower', 'Brahma Muhurta'],
  },
  {
    id: 'raajeev-05',
    title: 'Priya Sharma Film Producer Name Correction Success Story',
    description: 'How Priya Sharma corrected her active name spelling to unlock a major multi-crore film production project within 4 months.',
    teacherId: 'raajeev',
    category: 'Student Success Stories',
    youtubeUrl: 'https://www.youtube.com/shorts/RcmLxAECJAc',
    youtubeVideoId: 'RcmLxAECJAc',
    thumbnail: getAutoYoutubeThumbnail('RcmLxAECJAc', 'maxresdefault'),
    duration: '04:12',
    language: 'English',
    featured: true,
    publishDate: '2026-06-01',
    views: '42K',
    speaker: 'Priya Sharma',
    location: 'Mumbai, India',
    courseName: 'Name Correction Alignment',
    stars: 5,
    tags: ['Student Review', 'Film Production', 'Name Numerology'],
  },
  {
    id: 'raajeev-06',
    title: 'Chaldean Strategies for Corporate Names & Partnerships',
    description: 'How corporate brand names and partnership numbers determine long-term enterprise valuation.',
    teacherId: 'raajeev',
    category: 'Numerology',
    youtubeUrl: 'https://www.youtube.com/watch?v=RcmLxAECJAc',
    youtubeVideoId: 'RcmLxAECJAc',
    thumbnail: getAutoYoutubeThumbnail('RcmLxAECJAc', 'maxresdefault'),
    duration: '16:22',
    language: 'Hindi',
    featured: true,
    publishDate: '2026-01-28',
    views: '88K',
    tags: ['Corporate Naming', 'Chaldean Numerology', 'Business Strategy'],
  },
  {
    id: 'raajeev-07',
    title: 'Interactive Destiny Grid Mapping Live Webinar',
    description: 'Re-watch our interactive LEO Family live webinar with real-time destiny grid calculations and remedial advice.',
    teacherId: 'raajeev',
    category: 'Webinars',
    youtubeUrl: 'https://www.youtube.com/watch?v=RcmLxAECJAc',
    youtubeVideoId: 'RcmLxAECJAc',
    thumbnail: getAutoYoutubeThumbnail('RcmLxAECJAc', 'maxresdefault'),
    duration: '1:42:10',
    language: 'Hindi',
    featured: true,
    publishDate: '2026-07-01',
    views: '310K',
    tags: ['Live Webinar', 'Destiny Grid', 'Q&A'],
  },

  // ==========================================
  // SHAUNAK S. PATTHAK (GEMSTONES & VASTU)
  // ==========================================
  {
    id: 'shaunak-01',
    title: 'Vedic Gemstone Identification & Crystalline Frequency Selection',
    description: 'Shaunak S. Patthak teaches how to identify unheated natural gemstones and calculate planetary weight ratios for maximum remedial effect.',
    teacherId: 'shaunak',
    category: 'Gemstones',
    youtubeUrl: 'https://www.youtube.com/watch?v=73_3gXp9x8g',
    youtubeVideoId: '73_3gXp9x8g',
    thumbnail: getAutoYoutubeThumbnail('73_3gXp9x8g', 'maxresdefault'),
    duration: '15:20',
    language: 'Hindi',
    featured: true,
    publishDate: '2026-04-18',
    views: '120K',
    tags: ['Gemstone Science', 'Crystalline Frequencies', 'Emeralds', 'Yellow Sapphire'],
  },
  {
    id: 'shaunak-02',
    title: 'Gemstone Vastu Placements for Business Abundance',
    description: 'Using natural crystal grids and high-vibrational gemstone implants to activate financial corners in commercial properties.',
    teacherId: 'shaunak',
    category: 'Vastu',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtubeVideoId: 'dQw4w9WgXcQ',
    thumbnail: getAutoYoutubeThumbnail('dQw4w9WgXcQ', 'maxresdefault'),
    duration: '14:05',
    language: 'Hindi',
    featured: true,
    publishDate: '2026-05-22',
    views: '95K',
    tags: ['Gemstone Vastu', 'Wealth Corner', 'Commercial Properties'],
  },
  {
    id: 'shaunak-03',
    title: 'Amit Singhal Industrial Vastu & Gemstone Grid Success Story',
    description: 'Industrial plant throughput boosted 34% in 90 days following non-destructive copper and gemstone placement.',
    teacherId: 'shaunak',
    category: 'Student Success Stories',
    youtubeUrl: 'https://www.youtube.com/watch?v=73_3gXp9x8g',
    youtubeVideoId: '73_3gXp9x8g',
    thumbnail: getAutoYoutubeThumbnail('73_3gXp9x8g', 'maxresdefault'),
    duration: '12:00',
    language: 'Hindi',
    featured: true,
    publishDate: '2026-05-15',
    views: '89K',
    speaker: 'Amit Singhal',
    location: 'New Delhi, India',
    courseName: 'Industrial Gemstone Vastu',
    stars: 5,
    tags: ['Factory Vastu', 'Gemstones', 'Client Review'],
  },
  {
    id: 'shaunak-04',
    title: 'Blue Sapphire & Emerald Remedial Vibrations Masterclass',
    description: 'Understanding the intense planetary frequencies of Saturn (Shani) and Mercury (Budh) gemstones without adverse reactions.',
    teacherId: 'shaunak',
    category: 'Full Classes',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtubeVideoId: 'dQw4w9WgXcQ',
    thumbnail: getAutoYoutubeThumbnail('dQw4w9WgXcQ', 'maxresdefault'),
    duration: '22:10',
    language: 'Hindi',
    featured: false,
    publishDate: '2026-06-10',
    views: '76K',
    tags: ['Blue Sapphire', 'Emerald', 'Remedial Astrology'],
  },

  // ==========================================
  // SANNJOY BISWASS (BENGALI NUMEROLOGY & LO SHU)
  // ==========================================
  {
    id: 'sannjoy-01',
    title: 'Bengali Chaldean Numerology & Lo Shu Grid Balance Masterclass',
    description: 'Master Numerologist Sannjoy Biswass delivers a comprehensive class on Lo Shu grid balance and mobile number harmonics in Bengali.',
    teacherId: 'sannjoy',
    category: 'Numerology',
    youtubeUrl: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
    youtubeVideoId: '9bZkp7q19f0',
    thumbnail: getAutoYoutubeThumbnail('9bZkp7q19f0', 'maxresdefault'),
    duration: '20:15',
    language: 'Bengali',
    featured: true,
    publishDate: '2026-04-05',
    views: '145K',
    tags: ['Lo Shu Grid', 'Bengali Numerology', 'Mobile Harmonics', 'Name Science'],
  },
  {
    id: 'sannjoy-02',
    title: 'Mobile Number Harmonics & Name Spelling Remedies',
    description: 'Discover how daily digital vibrations and telephone combinations create magnetic attractor fields for prosperity.',
    teacherId: 'sannjoy',
    category: 'Free Classes',
    youtubeUrl: 'https://www.youtube.com/watch?v=yvD-C03p_1Q',
    youtubeVideoId: 'yvD-C03p_1Q',
    thumbnail: getAutoYoutubeThumbnail('yvD-C03p_1Q', 'maxresdefault'),
    duration: '16:40',
    language: 'Bengali',
    featured: true,
    publishDate: '2026-05-02',
    views: '110K',
    tags: ['Mobile Numerology', 'Bengali Remedies', 'Name Spellings'],
  },
  {
    id: 'sannjoy-03',
    title: 'Kolkata E-Commerce Founder Lo Shu Grid Success Story',
    description: 'How Bengali business owner Subhashish balanced his missing numbers and experienced a 300% order spike.',
    teacherId: 'sannjoy',
    category: 'Student Success Stories',
    youtubeUrl: 'https://www.youtube.com/watch?v=3AtDnEC4zak',
    youtubeVideoId: '3AtDnEC4zak',
    thumbnail: getAutoYoutubeThumbnail('3AtDnEC4zak', 'maxresdefault'),
    duration: '07:20',
    language: 'Bengali',
    featured: true,
    publishDate: '2026-06-18',
    views: '54K',
    speaker: 'Subhashish Das',
    location: 'Kolkata, West Bengal',
    courseName: 'Lo Shu Masterclass',
    stars: 5,
    tags: ['Student Review', 'Kolkata', 'Lo Shu Grid'],
  },
  {
    id: 'sannjoy-04',
    title: 'Bengali Numerology Q&A & Sacred Frequency Live Session',
    description: 'Sannjoy Biswass answers student questions live in native Bengali regarding mobile number selection and house numbers.',
    teacherId: 'sannjoy',
    category: 'Interviews',
    youtubeUrl: 'https://www.youtube.com/watch?v=E8P8_sR_7w8',
    youtubeVideoId: 'E8P8_sR_7w8',
    thumbnail: getAutoYoutubeThumbnail('E8P8_sR_7w8', 'maxresdefault'),
    duration: '45:00',
    language: 'Bengali',
    featured: false,
    publishDate: '2026-07-05',
    views: '68K',
    tags: ['Bengali Live', 'Sacred Frequency', 'House Numerology'],
  },

  // ==========================================
  // GENERAL & SPIRITUAL AI
  // ==========================================
  {
    id: 'ai-01',
    title: 'AI Spiritual Intelligence: Integrating Ancient Vedic Wisdom with Modern Tech',
    description: 'Exploring how LEO Family AI Kundali & Numerology Engine synthesizes 5,000-year-old Vedic scriptures into real-time personalized guidance.',
    teacherId: 'all',
    category: 'Spiritual AI',
    youtubeUrl: 'https://www.youtube.com/watch?v=FvV_pP4_G7o',
    youtubeVideoId: 'FvV_pP4_G7o',
    thumbnail: getAutoYoutubeThumbnail('FvV_pP4_G7o', 'maxresdefault'),
    duration: '11:15',
    language: 'English',
    featured: true,
    publishDate: '2026-07-12',
    views: '210K',
    tags: ['Spiritual AI', 'Kundali AI', 'Vedic Technology'],
  },
];

/**
 * Filter media items by teacher ID.
 * Shows items matching teacherId OR items tagged for 'all'.
 */
export function getVideosByTeacher(teacherId: TeacherId | string): MediaItem[] {
  if (!teacherId || teacherId === 'all') {
    return MEDIA_REGISTRY;
  }
  return MEDIA_REGISTRY.filter(
    (item) => item.teacherId === teacherId || item.teacherId === 'all'
  );
}

/**
 * Filter media items by category and optional teacher ID.
 */
export function getVideosByCategory(category: string, teacherId?: string): MediaItem[] {
  let list = MEDIA_REGISTRY;
  if (teacherId && teacherId !== 'all') {
    list = list.filter((item) => item.teacherId === teacherId || item.teacherId === 'all');
  }
  if (!category || category === 'All' || category === 'all') {
    return list;
  }
  return list.filter((item) => item.category.toLowerCase() === category.toLowerCase());
}

/**
 * Filter media items by playlist ID or title.
 */
export function getVideosByPlaylist(playlistId: string): MediaItem[] {
  if (!playlistId) return [];
  return MEDIA_REGISTRY.filter(
    (item) => item.playlist === playlistId || item.isPlaylist
  );
}

/**
 * Get all featured videos.
 */
export function getFeaturedVideos(teacherId?: string): MediaItem[] {
  let list = MEDIA_REGISTRY;
  if (teacherId && teacherId !== 'all') {
    list = list.filter((item) => item.teacherId === teacherId || item.teacherId === 'all');
  }
  return list.filter((item) => item.featured);
}

/**
 * Returns all media items.
 */
export function getAllMediaItems(): MediaItem[] {
  return MEDIA_REGISTRY;
}
