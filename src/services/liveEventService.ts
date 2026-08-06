import { LiveEvent } from '../models/liveEvent';

// Initial Mock Data
let MOCK_LIVE_EVENTS: LiveEvent[] = [
  {
    id: 'web-1',
    mentorId: 'raajeev',
    title: 'Vedic Alignment for Business & Brand Success',
    date: '2026-09-05',
    time: '11:00 AM - 01:00 PM IST',
    language: 'English / Hindi',
    seats: 1245,
    registrationLink: 'https://leofamily.com/webinar/vedic-business',
    banner: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
    status: 'upcoming',
    featured: true,
    createdAt: '2026-08-01'
  },
  {
    id: 'web-2',
    mentorId: 'sannjoy',
    title: 'লাইভ মাস্টারক্লাস: মোবাইল নাম্বার কীভাবে ভাগ্য নিয়ন্ত্রণ করে?',
    date: '2026-09-05',
    time: '03:00 PM - 05:00 PM IST',
    language: 'Bengali',
    seats: 850,
    registrationLink: 'https://leofamily.com/webinar/mobile-bengali',
    banner: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800',
    status: 'upcoming',
    featured: true,
    createdAt: '2026-08-02'
  },
  {
    id: 'web-3',
    mentorId: 'shaunak',
    title: 'Chaldean Compound Frequencies & Signature Masterclass',
    date: '2026-09-12',
    time: '08:00 PM - 10:00 PM IST',
    language: 'English',
    seats: 620,
    registrationLink: 'https://leofamily.com/webinar/chaldean-signature',
    banner: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
    status: 'upcoming',
    featured: false,
    createdAt: '2026-08-03'
  }
];

export const liveEventService = {
  /**
   * Get all live events (mock or future Firestore collection 'liveEvents')
   */
  async getAllLiveEvents(): Promise<LiveEvent[]> {
    // Simulated async delay or direct return
    return [...MOCK_LIVE_EVENTS];
  },

  /**
   * Get live events by mentor ID
   */
  async getLiveEventByMentor(mentorId: string): Promise<LiveEvent[]> {
    return MOCK_LIVE_EVENTS.filter(e => e.mentorId === mentorId);
  },

  /**
   * Save a new live event (create)
   */
  async saveLiveEvent(event: LiveEvent): Promise<LiveEvent> {
    const newEvent: LiveEvent = {
      ...event,
      id: event.id || `web-${Date.now()}`,
      createdAt: event.createdAt || new Date().toISOString()
    };
    MOCK_LIVE_EVENTS = [newEvent, ...MOCK_LIVE_EVENTS];
    return newEvent;
  },

  /**
   * Update an existing live event
   */
  async updateLiveEvent(id: string, updates: Partial<LiveEvent>): Promise<LiveEvent> {
    let updatedEvent: LiveEvent | null = null;
    MOCK_LIVE_EVENTS = MOCK_LIVE_EVENTS.map(event => {
      if (event.id === id) {
        updatedEvent = {
          ...event,
          ...updates,
          updatedAt: new Date().toISOString()
        };
        return updatedEvent;
      }
      return event;
    });

    if (!updatedEvent) {
      throw new Error(`LiveEvent with id ${id} not found.`);
    }

    return updatedEvent;
  },

  /**
   * Delete a live event by ID
   */
  async deleteLiveEvent(id: string): Promise<boolean> {
    const initialLength = MOCK_LIVE_EVENTS.length;
    MOCK_LIVE_EVENTS = MOCK_LIVE_EVENTS.filter(event => event.id !== id);
    return MOCK_LIVE_EVENTS.length < initialLength;
  }
};
