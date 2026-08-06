import { Program } from '../models/program';

// Initial Mock Programs moved from ProgramService
let MOCK_PROGRAMS: Program[] = [
  {
    id: 'prog-1',
    mentorId: 'raajeev',
    title: 'LEO Family Certified Professional Numerologist',
    subtitle: 'Master the ancient Chaldean and Pythagorean systems for professional practice.',
    description: 'Comprehensive 12-week certification covering foundational numbers, compound numbers, name correction, and predictive numerology.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
    duration: '12 Weeks',
    price: 21000,
    discountPrice: 18000,
    featured: true,
    visible: true,
    order: 1,
    createdAt: '2026-08-01'
  },
  {
    id: 'prog-2',
    mentorId: 'shaunak',
    title: 'Chaldean & Pythagorean Masterclass',
    subtitle: 'Deep dive into name frequencies and occult vibration science.',
    description: 'Learn how to calculate compound numbers, destiny numbers, and harmonize personal and corporate signatures.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
    duration: '8 Weeks',
    price: 15000,
    discountPrice: 12900,
    featured: true,
    visible: true,
    order: 2,
    createdAt: '2026-08-02'
  },
  {
    id: 'prog-3',
    mentorId: 'sannjoy',
    title: 'Lo Shu Grid & Mobile Number Numerology',
    subtitle: 'Decode mobile number energies and Lo Shu magic squares.',
    description: 'Master phone numerology, missing number remedies, and lucky mobile combinations for wealth and health.',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800',
    duration: '6 Weeks',
    price: 11000,
    discountPrice: 9900,
    featured: false,
    visible: true,
    order: 3,
    createdAt: '2026-08-03'
  },
  {
    id: 'prog-4',
    mentorId: 'raajeev',
    title: 'Business Numerology & Brand Name Correction',
    subtitle: 'Scale businesses and corporate entities using Vedic numerology principles.',
    description: 'Advanced corporate consultations, brand naming formulas, and partnership compatibility analysis.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
    duration: '4 Weeks',
    price: 18000,
    featured: false,
    visible: true,
    order: 4,
    createdAt: '2026-08-04'
  },
  {
    id: 'prog-5',
    mentorId: 'shaunak',
    title: 'Astro-Vastu Audit & Planetary Remedies',
    subtitle: 'Harmonize living and workspace energies with cosmic planetary alignments.',
    description: 'Learn directional Vastu corrections, gemstone recommendations, and color therapy.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
    duration: '6 Weeks',
    price: 14500,
    featured: false,
    visible: true,
    order: 5,
    createdAt: '2026-08-05'
  },
  {
    id: 'prog-6',
    mentorId: 'sannjoy',
    title: 'Bengali Numerology & Vastu Course',
    subtitle: 'Traditional Vedic numerology taught in Bengali.',
    description: 'Comprehensive regional masterclass for practitioners and enthusiasts in Bengali language.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800',
    duration: '6 Weeks',
    price: 9900,
    featured: false,
    visible: true,
    order: 6,
    createdAt: '2026-08-06'
  }
];

export const programRepository = {
  async getAll(): Promise<Program[]> {
    return [...MOCK_PROGRAMS];
  },

  async getById(id: string): Promise<Program | null> {
    return MOCK_PROGRAMS.find(p => p.id === id) || null;
  },

  async getByMentor(mentorId: string): Promise<Program[]> {
    return MOCK_PROGRAMS.filter(p => p.mentorId === mentorId);
  },

  async getFeatured(): Promise<Program[]> {
    return MOCK_PROGRAMS.filter(p => p.featured && p.visible);
  },

  async create(program: Program): Promise<Program> {
    const newProgram: Program = {
      ...program,
      id: program.id || `prog-${Date.now()}`,
      createdAt: program.createdAt || new Date().toISOString()
    };
    MOCK_PROGRAMS = [newProgram, ...MOCK_PROGRAMS];
    return newProgram;
  },

  async update(id: string, updates: Partial<Program>): Promise<Program> {
    let updated: Program | null = null;
    MOCK_PROGRAMS = MOCK_PROGRAMS.map(program => {
      if (program.id === id) {
        updated = {
          ...program,
          ...updates,
          updatedAt: new Date().toISOString()
        };
        return updated;
      }
      return program;
    });

    if (!updated) {
      throw new Error(`Program with id ${id} not found.`);
    }

    return updated;
  },

  async delete(id: string): Promise<boolean> {
    const initialLength = MOCK_PROGRAMS.length;
    MOCK_PROGRAMS = MOCK_PROGRAMS.filter(program => program.id !== id);
    return MOCK_PROGRAMS.length < initialLength;
  }
};
