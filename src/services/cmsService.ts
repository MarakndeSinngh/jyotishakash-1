import { Page, Section, Service, Testimonial } from '../types/cms';
import { Gemstone, GEMSTONES } from '../constants/gemstones';
import { supabaseTestimonialRepository } from '../repositories/supabaseTestimonialRepository';

// Mock data for initial development
const MOCK_PAGES: Page[] = [
  {
    title: "LEO Family | India's Premier Spiritual Learning Platform",
    slug: 'home',
    template: 'default',
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: 'About LEO Family | Our Mission, Vision & Founder',
    slug: 'about',
    template: 'default',
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: 'Gemstones | LEO Family',
    slug: 'gemstones',
    template: 'default',
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: 'Numerology | LEO Family',
    slug: 'numerology',
    template: 'default',
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: 'Programs | LEO Family',
    slug: 'academy',
    template: 'default',
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: 'LEO Family Spiritual AI',
    slug: 'ai',
    template: 'default',
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: 'Ecosystem | LEO Family',
    slug: 'ecosystem',
    template: 'default',
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: 'Contact LEO Family',
    slug: 'contact',
    template: 'default',
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const MOCK_SECTIONS: Section[] = [
  {
    pageId: 'home',
    type: 'hero',
    title: "Mastering Destiny Through Numbers",
    subtitle: 'Celebrity Numerologist & Vastu Expert. Align your energy with the universe for unprecedented success.',
    image: "/gemstone-assets/background.png",
    order: 1,
    isActive: true
  },
  {
    pageId: 'home',
    type: 'services',
    title: 'Our Specialized Services',
    subtitle: 'Unlock your true potential with our premium, results-driven consultations.',
    order: 2,
    isActive: true
  },
  {
    pageId: 'home',
    type: 'testimonials',
    title: 'What Our Elite Clients Say',
    subtitle: 'Real transformations from people who achieved total life alignment through Leo Family.',
    order: 3,
    isActive: true
  },
  {
    pageId: 'about',
    type: 'about',
    title: 'Raajeev Singh Chauhann',
    subtitle: 'Founder of Leo Family | Filmmaker | Bollywood Numerologist',
    order: 1,
    isActive: true
  },
  {
    pageId: 'gemstones',
    type: 'gemstones',
    title: 'The Leo Family Gemstone Collection',
    subtitle: 'The Science of Planetary Alignment',
    order: 1,
    isActive: true
  },
  {
    pageId: 'contact',
    type: 'contact',
    title: 'Connect with Destiny',
    subtitle: 'Get In Touch',
    order: 1,
    isActive: true
  },
  {
    pageId: 'numerology',
    type: 'numerology',
    title: 'Mobile Numerology',
    subtitle: 'Calculate Your Destiny Number',
    order: 1,
    isActive: true
  },
  {
    pageId: 'academy',
    type: 'academy',
    title: 'Learn Ancient Wisdom. Transform Your Future.',
    subtitle: 'Whether you are beginning your spiritual journey or looking to deepen your knowledge, LEO Family offers structured learning designed to help you grow with confidence.',
    order: 1,
    isActive: true
  },
  {
    pageId: 'ai',
    type: 'ai',
    title: 'The Future of Spiritual Intelligence',
    subtitle: 'Discover how ancient wisdom and modern AI can work together to help you explore, learn, and prepare for more meaningful personal guidance.',
    order: 1,
    isActive: true
  },
  {
    pageId: 'ecosystem',
    type: 'ecosystem',
    title: 'Welcome to the LEO Family Ecosystem',
    subtitle: 'One Vision. One Community. Unlimited Learning.',
    order: 1,
    isActive: true
  },
  {
    pageId: 'contact',
    type: 'contact',
    title: "Let's Begin Your Journey",
    subtitle: "Whether you're seeking personal guidance, learning opportunities, or simply have a question, our team is here to help.",
    order: 1,
    isActive: true
  }
];

const MOCK_SERVICES: Service[] = [
  { 
    title: 'Signature Name Correction', 
    description: 'Align your identity with the universe using the combined wisdom of Chaldean and Pythagorean systems for ultimate success.', 
    price: 5100, 
    isFeatured: true, 
    order: 1 
  },
  { 
    title: 'Power Mobile Suggestion', 
    description: 'Transform your digital footprint. Get expert suggestions (₹2,999) or let us provide the perfect number for you (₹5,999) to attract wealth.', 
    price: 2999, 
    isFeatured: true, 
    order: 2 
  },
  { 
    title: 'Elite Consultation Report', 
    description: 'Our most comprehensive VIP digital report. Includes Name Correction, Mobile Suggestion, and tailored Remedies for total life alignment.', 
    price: 21999, 
    isFeatured: true, 
    order: 3 
  },
  { 
    title: 'Vedic Gemstone Selection', 
    description: 'Discover the precise gemstone needed to balance your planetary energies based on expert planetary alignment analysis.', 
    price: 0, 
    isFeatured: true, 
    order: 4 
  }
];

const MOCK_TESTIMONIALS: Testimonial[] = [
  { name: 'Amit S.', feedback: 'The Vedic reading was incredibly accurate. It gave me the confidence to change my career path.', rating: 5 },
  { name: 'Priya K.', feedback: 'Leo Family helped me understand my relationship dynamics better than any therapy.', rating: 5 },
  { name: 'Rajesh M.', feedback: 'The gemstone recommendation worked wonders for my business growth. Highly recommended!', rating: 5 }
];

export const cmsService = {
  // Pages
  async getPages(): Promise<Page[]> {
    return MOCK_PAGES;
  },

  // Sections
  async getSections(pageId: string): Promise<Section[]> {
    return MOCK_SECTIONS.filter(s => s.pageId === pageId);
  },

  async getAllSections(): Promise<Section[]> {
    return MOCK_SECTIONS;
  },

  // Services
  async getServices(): Promise<Service[]> {
    return MOCK_SERVICES;
  },

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    try {
      const testimonials = await supabaseTestimonialRepository.getPublished();
      if (testimonials && testimonials.length > 0) {
        return testimonials;
      }
    } catch (error) {
      console.warn('Could not fetch testimonials from Supabase, returning empty array:', error);
    }
    return [];
  },

  // Gemstones
  async getGemstones(): Promise<(Gemstone & { id: string })[]> {
    return GEMSTONES.map((g, i) => ({ ...g, id: `gem-${i}` }));
  }
};

