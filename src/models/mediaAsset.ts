export interface MediaAsset {
  id: string;
  fileName: string;
  url: string;
  category: 'Banners' | 'Faculty' | 'Programs' | 'Icons' | 'Certificates' | 'Podcasts' | 'General';
  altText: string;
  caption: string;
  tags: string[];
  width: number;
  height: number;
  fileSize: string; // e.g., '1.2 MB'
  fileType: string; // e.g., 'image/jpeg', 'image/png', 'video/mp4'
  createdDate: string;
  lastModified: string;
  usedBy: string[]; // e.g., ['Vedic Numerology Masterclass', 'Hero Banner', 'Raajeev Singh']
  visibility: 'Public' | 'Private' | 'Protected';
}
