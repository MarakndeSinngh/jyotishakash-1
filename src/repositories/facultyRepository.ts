import { Faculty } from '../models/faculty';
import { db } from '../firebase/config';
import { collection, doc, getDoc, getDocs, setDoc, deleteDoc } from 'firebase/firestore';

const COLLECTION_NAME = 'faculty';

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
    try {
      if (!db) {
        return [...MOCK_FACULTY];
      }
      const colRef = collection(db, COLLECTION_NAME);
      const snapshot = await getDocs(colRef);
      if (snapshot.empty) {
        // Seed initial mock faculty into Firestore
        for (const faculty of MOCK_FACULTY) {
          const docRef = doc(db, COLLECTION_NAME, faculty.id);
          await setDoc(docRef, faculty);
        }
        return [...MOCK_FACULTY];
      }

      const facultyList: Faculty[] = [];
      snapshot.forEach(docSnap => {
        const data = docSnap.data() as Faculty;
        facultyList.push({
          ...data,
          id: docSnap.id
        });
      });

      // Sort by displayOrder if present
      facultyList.sort((a, b) => (a.displayOrder || 99) - (b.displayOrder || 99));
      return facultyList;
    } catch (error) {
      console.error('Error fetching faculty from Firestore:', error);
      throw error;
    }
  },

  async getById(id: string): Promise<Faculty | null> {
    try {
      if (!db) {
        return MOCK_FACULTY.find(f => f.id === id) || null;
      }
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data() as Faculty;
        return {
          ...data,
          id: docSnap.id
        };
      }
      return null;
    } catch (error) {
      console.error(`Error fetching faculty ${id} from Firestore:`, error);
      throw error;
    }
  },

  async getFounder(): Promise<Faculty | null> {
    const all = await this.getAll();
    return all.find(f => f.id === 'raajeev' || f.title.toLowerCase().includes('founder')) || all[0] || null;
  },

  async create(faculty: Faculty): Promise<Faculty> {
    const newId = faculty.id || `faculty-${Date.now()}`;
    const newFaculty: Faculty = {
      ...faculty,
      id: newId,
      createdAt: faculty.createdAt || new Date().toISOString()
    };

    try {
      if (db) {
        const docRef = doc(db, COLLECTION_NAME, newId);
        await setDoc(docRef, newFaculty);
      }
      MOCK_FACULTY = [newFaculty, ...MOCK_FACULTY.filter(f => f.id !== newId)];
      return newFaculty;
    } catch (error) {
      console.error('Error creating faculty in Firestore:', error);
      throw error;
    }
  },

  async update(id: string, updates: Partial<Faculty>): Promise<Faculty> {
    try {
      const existing = await this.getById(id);
      const updated: Faculty = {
        ...(existing || {
          id,
          name: '',
          title: '',
          image: '',
          bio: '',
          languages: [],
          consultationLink: '',
          registrationLink: ''
        }),
        ...updates,
        id,
        updatedAt: new Date().toISOString()
      };

      if (db) {
        const docRef = doc(db, COLLECTION_NAME, id);
        await setDoc(docRef, updated, { merge: true });
      }

      MOCK_FACULTY = MOCK_FACULTY.map(f => f.id === id ? updated : f);
      if (!MOCK_FACULTY.some(f => f.id === id)) {
        MOCK_FACULTY.push(updated);
      }

      return updated;
    } catch (error) {
      console.error(`Error updating faculty ${id} in Firestore:`, error);
      throw error;
    }
  },

  async delete(id: string): Promise<boolean> {
    try {
      if (db) {
        const docRef = doc(db, COLLECTION_NAME, id);
        await deleteDoc(docRef);
      }
      MOCK_FACULTY = MOCK_FACULTY.filter(faculty => faculty.id !== id);
      return true;
    } catch (error) {
      console.error(`Error deleting faculty ${id} from Firestore:`, error);
      throw error;
    }
  }
};

