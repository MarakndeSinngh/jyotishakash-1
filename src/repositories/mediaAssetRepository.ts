import { MediaAsset } from '../models/mediaAsset';

let MOCK_MEDIA_ASSETS: MediaAsset[] = [
  {
    id: 'asset-1',
    fileName: 'hero-banner-numerology.jpg',
    url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200',
    category: 'Banners',
    altText: 'Vedic Numerology Masterclass Banner with Occult Symbols',
    caption: 'Main promotional banner for the upcoming Vedic Numerology cohort.',
    tags: ['hero', 'numerology', 'banner', 'masterclass'],
    width: 1920,
    height: 1080,
    fileSize: '1.4 MB',
    fileType: 'image/jpeg',
    createdDate: '2026-08-01',
    lastModified: '2026-08-05',
    usedBy: ['Homepage', 'Vedic Numerology Masterclass', 'Hero Section'],
    visibility: 'Public'
  },
  {
    id: 'asset-2',
    fileName: 'raajeev-singh-portrait.jpg',
    url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
    category: 'Faculty',
    altText: 'Founder Raajeev Singh Chauhann teaching Chaldean Numerology',
    caption: 'Official high-resolution portrait of Master Raajeev Singh Chauhann.',
    tags: ['faculty', 'raajeev singh', 'portrait', 'mentor'],
    width: 1200,
    height: 1200,
    fileSize: '950 KB',
    fileType: 'image/jpeg',
    createdDate: '2026-07-15',
    lastModified: '2026-08-02',
    usedBy: ['Raajeev Singh Academy', 'Faculty Directory', 'About Us'],
    visibility: 'Public'
  },
  {
    id: 'asset-3',
    fileName: 'shaunak-pathak-vastu.jpg',
    url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800',
    category: 'Faculty',
    altText: 'Senior Faculty Shaunak S. Patthak inspecting Astro-Vastu blueprint',
    caption: 'Official portrait of Shaunak S. Patthak for Astro-Vastu programs.',
    tags: ['faculty', 'shaunak', 'vastu', 'mentor'],
    width: 1200,
    height: 1200,
    fileSize: '820 KB',
    fileType: 'image/jpeg',
    createdDate: '2026-07-20',
    lastModified: '2026-08-03',
    usedBy: ['Shaunak Academy', 'Faculty Directory'],
    visibility: 'Public'
  },
  {
    id: 'asset-4',
    fileName: 'sannjoy-biswass-lo-shu.jpg',
    url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
    category: 'Faculty',
    altText: 'Master Sannjoy Biswass explaining Lo Shu Grid matrix',
    caption: 'Official portrait of Master Sannjoy Biswass for Lo Shu programs.',
    tags: ['faculty', 'sannjoy', 'lo shu', 'numerology'],
    width: 1200,
    height: 1200,
    fileSize: '1.1 MB',
    fileType: 'image/jpeg',
    createdDate: '2026-07-22',
    lastModified: '2026-08-01',
    usedBy: ['Sannjoy Academy', 'Faculty Directory'],
    visibility: 'Public'
  },
  {
    id: 'asset-5',
    fileName: 'chaldean-numerology-badge.png',
    url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600',
    category: 'Certificates',
    altText: 'LEO Family Certified Master Numerologist Gold Seal',
    caption: 'Gold embossed certification badge awarded upon course completion.',
    tags: ['badge', 'certificate', 'gold seal', 'accreditation'],
    width: 800,
    height: 800,
    fileSize: '450 KB',
    fileType: 'image/png',
    createdDate: '2026-07-10',
    lastModified: '2026-07-30',
    usedBy: ['Student Dashboard', 'Certificate Generator'],
    visibility: 'Protected'
  },
  {
    id: 'asset-6',
    fileName: 'occult-podcast-ep1.mp4',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-with-green-screen-41551-large.mp4',
    category: 'Podcasts',
    altText: 'Episode 1: Secrets of Chaldean Number 8 and Saturnian Wisdom',
    caption: 'Video podcast recording featuring Raajeev Singh Chauhann.',
    tags: ['podcast', 'video', 'saturn', 'chaldean'],
    width: 1920,
    height: 1080,
    fileSize: '24.5 MB',
    fileType: 'video/mp4',
    createdDate: '2026-08-04',
    lastModified: '2026-08-04',
    usedBy: ['Media Library', 'Podcast Section'],
    visibility: 'Public'
  }
];

export const mediaAssetRepository = {
  async getAssets(): Promise<MediaAsset[]> {
    return [...MOCK_MEDIA_ASSETS];
  },

  async getAssetById(id: string): Promise<MediaAsset | null> {
    const asset = MOCK_MEDIA_ASSETS.find(a => a.id === id);
    return asset ? { ...asset } : null;
  },

  async createAsset(asset: Omit<MediaAsset, 'id' | 'createdDate' | 'lastModified'>): Promise<MediaAsset> {
    const newAsset: MediaAsset = {
      ...asset,
      id: `asset-${Date.now()}`,
      createdDate: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0]
    };
    MOCK_MEDIA_ASSETS.unshift(newAsset);
    return { ...newAsset };
  },

  async updateAsset(id: string, updates: Partial<MediaAsset>): Promise<MediaAsset> {
    const index = MOCK_MEDIA_ASSETS.findIndex(a => a.id === id);
    if (index === -1) {
      throw new Error(`Media asset with id ${id} not found`);
    }
    MOCK_MEDIA_ASSETS[index] = {
      ...MOCK_MEDIA_ASSETS[index],
      ...updates,
      lastModified: new Date().toISOString().split('T')[0]
    };
    return { ...MOCK_MEDIA_ASSETS[index] };
  },

  async deleteAsset(id: string): Promise<boolean> {
    const initialLength = MOCK_MEDIA_ASSETS.length;
    MOCK_MEDIA_ASSETS = MOCK_MEDIA_ASSETS.filter(a => a.id !== id);
    return MOCK_MEDIA_ASSETS.length < initialLength;
  }
};
