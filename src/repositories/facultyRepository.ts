import { Faculty } from '../models/faculty';

let MOCK_FACULTY: Faculty[] = [
  {
    id: 'raajeev',
    name: 'Raajeev Singh Chauhann',
    title: 'Founder & Chief Mentor',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    bio: 'Renowned expert in Vedic Numerology, Business Numerology & Vastu with over 15 years of transforming thousands of lives and businesses globally.',
    languages: ['English', 'Hindi'],
    consultationLink: 'https://leofamily.com/consult/raajeev',
    registrationLink: 'https://leofamily.com/webinar/raajeev',
    facebookUrl: 'https://facebook.com/raajeevsinghchauhann',
    youtubeUrl: 'https://youtube.com/@raajeevsinghchauhann',
    displayOrder: 1,
    active: true,
    createdAt: '2026-08-01'
  },
  {
    id: 'shaunak',
    name: 'Shaunak S. Patthak',
    title: 'Master Numerologist & Astrologer',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800',
    bio: 'Specialist in Chaldean and Pythagorean Numerology, destiny numbers, name corrections, and deep occult vibration science.',
    languages: ['English', 'Hindi', 'Gujarati'],
    consultationLink: 'https://leofamily.com/consult/shaunak',
    registrationLink: 'https://leofamily.com/webinar/shaunak',
    facebookUrl: 'https://facebook.com/shaunakspatthak',
    youtubeUrl: 'https://youtube.com/@shaunakpatthak',
    displayOrder: 2,
    active: true,
    createdAt: '2026-08-02'
  },
  {
    id: 'sannjoy',
    name: 'Sannjoy Biswass',
    title: 'Master Numerologist & Astrologer',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800',
    bio: 'Expert in Lo Shu Grid, Mobile Number Numerology, and traditional Vedic consultations with dedicated regional Bengali mentoring.',
    languages: ['English', 'Hindi', 'Bengali'],
    consultationLink: 'https://leofamily.com/consult/sannjoy',
    registrationLink: 'https://leofamily.com/webinar/sannjoy',
    facebookUrl: 'https://facebook.com/sannjoybiswass',
    youtubeUrl: 'https://youtube.com/@sannjoybiswass',
    displayOrder: 3,
    active: true,
    createdAt: '2026-08-03'
  }
];

export const facultyRepository = {
  async getAll(): Promise<Faculty[]> {
    return [...MOCK_FACULTY];
  },

  async getById(id: string): Promise<Faculty | null> {
    return MOCK_FACULTY.find(f => f.id === id) || null;
  },

  async getFounder(): Promise<Faculty | null> {
    return MOCK_FACULTY.find(f => f.id === 'raajeev' || f.title.toLowerCase().includes('founder')) || MOCK_FACULTY[0] || null;
  },

  async create(faculty: Faculty): Promise<Faculty> {
    const newFaculty: Faculty = {
      ...faculty,
      id: faculty.id || `faculty-${Date.now()}`,
      createdAt: faculty.createdAt || new Date().toISOString()
    };
    MOCK_FACULTY = [newFaculty, ...MOCK_FACULTY];
    return newFaculty;
  },

  async update(id: string, updates: Partial<Faculty>): Promise<Faculty> {
    let updated: Faculty | null = null;
    MOCK_FACULTY = MOCK_FACULTY.map(faculty => {
      if (faculty.id === id) {
        updated = {
          ...faculty,
          ...updates,
          updatedAt: new Date().toISOString()
        };
        return updated;
      }
      return faculty;
    });

    if (!updated) {
      throw new Error(`Faculty with id ${id} not found.`);
    }

    return updated;
  },

  async delete(id: string): Promise<boolean> {
    const initialLength = MOCK_FACULTY.length;
    MOCK_FACULTY = MOCK_FACULTY.filter(faculty => faculty.id !== id);
    return MOCK_FACULTY.length < initialLength;
  }
};
