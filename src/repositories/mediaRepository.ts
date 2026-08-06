import { Media } from '../models/media';

// Initial Mock Media entries moved from MediaService
let MOCK_MEDIA: Media[] = [
  {
    id: 'media-1',
    mentorId: 'raajeev',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtubeVideoId: 'dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
    category: 'Masterclass',
    featured: true,
    visible: true,
    order: 1,
    createdAt: '2026-08-01'
  },
  {
    id: 'media-2',
    mentorId: 'shaunak',
    youtubeUrl: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
    youtubeVideoId: 'jNQXAC9IVRw',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
    category: 'Chaldean',
    featured: true,
    visible: true,
    order: 2,
    createdAt: '2026-08-02'
  },
  {
    id: 'media-3',
    mentorId: 'sannjoy',
    youtubeUrl: 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
    youtubeVideoId: '3JZ_D3ELwOQ',
    thumbnail: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800',
    category: 'Lo Shu',
    featured: false,
    visible: true,
    order: 3,
    createdAt: '2026-08-03'
  },
  {
    id: 'media-4',
    mentorId: 'raajeev',
    youtubeUrl: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
    youtubeVideoId: '9bZkp7q19f0',
    thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
    category: 'Business',
    featured: false,
    visible: true,
    order: 4,
    createdAt: '2026-08-04'
  }
];

export const mediaRepository = {
  async getAll(): Promise<Media[]> {
    return [...MOCK_MEDIA];
  },

  async getById(id: string): Promise<Media | null> {
    return MOCK_MEDIA.find(m => m.id === id) || null;
  },

  async getByMentor(mentorId: string): Promise<Media[]> {
    return MOCK_MEDIA.filter(m => m.mentorId === mentorId);
  },

  async getFeatured(): Promise<Media[]> {
    return MOCK_MEDIA.filter(m => m.featured && m.visible);
  },

  async getByCategory(category: string): Promise<Media[]> {
    return MOCK_MEDIA.filter(m => m.category.toLowerCase() === category.toLowerCase());
  },

  async create(media: Media): Promise<Media> {
    const newMedia: Media = {
      ...media,
      id: media.id || `media-${Date.now()}`,
      createdAt: media.createdAt || new Date().toISOString()
    };
    MOCK_MEDIA = [newMedia, ...MOCK_MEDIA];
    return newMedia;
  },

  async update(id: string, updates: Partial<Media>): Promise<Media> {
    let updated: Media | null = null;
    MOCK_MEDIA = MOCK_MEDIA.map(item => {
      if (item.id === id) {
        updated = {
          ...item,
          ...updates,
          updatedAt: new Date().toISOString()
        };
        return updated;
      }
      return item;
    });

    if (!updated) {
      throw new Error(`Media with id ${id} not found.`);
    }

    return updated;
  },

  async delete(id: string): Promise<boolean> {
    const initialLength = MOCK_MEDIA.length;
    MOCK_MEDIA = MOCK_MEDIA.filter(item => item.id !== id);
    return MOCK_MEDIA.length < initialLength;
  }
};
