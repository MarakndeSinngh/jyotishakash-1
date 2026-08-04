import React from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  GraduationCap, 
  Users, 
  Award, 
  Globe, 
  ArrowRight, 
  Sparkles,
  BookOpen,
  CheckCircle2
} from 'lucide-react';
import { useAcademy } from '../../context/AcademyContext';
import SmartImage from './SmartImage';

interface MentorData {
  id: string;
  slug: string;
  name: string;
  title: string;
  expertise: string[];
  languages: string;
  experience: string;
  students: string;
  rating: string;
  image: string;
  fallbackImage: string;
  description: string;
}

const MENTORS: MentorData[] = [
  {
    id: 'raajeev',
    slug: 'raajeev',
    name: 'Raajeev Singh Chauhann',
    title: 'Founding Astro-Numerologist< Astro Vastu Expert & Celebrity Consultant',
    expertise: ['Chaldean Numerology', 'Vedic Astrology', 'Mobile Frequency', 'Name & Signature Correction'],
    languages: 'English & Hindi',
    experience: '20+ Years',
    students: '12,000+ Students',
    rating: '5.0 ★',
    image: '/assets/teachers/Raajeev.webp',
    fallbackImage: '/gemstone-assets/rajeev-singh.jpg',
    description: 'Specializes in Chaldean numerical vibrations, Vedic Astrology, mobile digits alignment, signature shifts, and corporate brand positioning.'
  },
  {
    id: 'shaunak',
    slug: 'shaunak',
    name: 'Shaunak S Patthak',
    title: 'Certified Numerology Expert',
    expertise: ['Numerology & Vedic Astrology', 'Planetary Dashas & Gemology'],
    languages: 'English, Gujrati & Hinglish',
    experience: '22+ Years',
    students: '6,200+ Alumni',
    rating: '5.0 ★',
    image: '/assets/teachers/shaunak.webp',
    fallbackImage: '/gemstone-assets/blue-sapphire.jpg',
    description: 'Expert in Numerology, Dasha calculations, Numero Vastu and Name Numerology.'
  },
  {
    id: 'sannjoy',
    slug: 'sannjoy',
    name: 'Sannjoy Biswass',
    title: 'Master Numerologist & Sacred Frequency Mentor',
    expertise: ['Bengali Numerology', 'Lo Shu Grid Science', 'Mobile Frequency & Remedies'],
    languages: 'Bengali (বাংলা) & English',
    experience: '20+ Years',
    students: '7,500+ Students',
    rating: '4.9 ★',
    image: '/assets/teachers/sannjoy.webp',
    fallbackImage: '/assets/sannjoy/profile.png',
    description: 'Renowned Bengali Master Numerologist teaching authentic Lo Shu grid balancing, native language numerology, and elemental harmony.'
  }
];

export default function MeetOurMentorsSection() {
  const { switchAcademy } = useAcademy();

  const handleSelectAcademy = (slug: string) => {
    switchAcademy(slug);
  };

  return (
    <section id="mentors" className="relative py-24 sm:py-32 bg-background text-text-primary overflow-hidden z-10">
      
      {/* Background Decorative Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.04)_0%,transparent_70%)]" />
        <div className="absolute bottom-[10%] right-[15%] w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.03)_0%,transparent_70%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em]"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-primary" />
            <span>World-Class Faculty</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-cinzel tracking-tight text-text-primary"
          >
            Meet Our Mentors
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary text-base sm:text-lg font-light leading-relaxed font-sans"
          >
            Learn directly from industry leaders, celebrity consultants, and Vedic grandmasters. Discover each mentor's specialization and find the academy tailored to your spiritual journey.
          </motion.p>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
          {MENTORS.map((mentor, index) => (
            <motion.div
              key={mentor.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative bg-card border border-border/30 hover:border-amber-400/50 rounded-[2.5rem] overflow-hidden flex flex-col justify-between transition-all duration-500 ease-out hover:-translate-y-2.5 shadow-xl hover:shadow-[0_0_40px_rgba(212,175,55,0.25)]"
            >
              {/* Card Header & Portrait */}
              <div className="relative p-6 sm:p-8 flex flex-col items-center text-center">
                
                {/* Gold Accent Glow Behind Photo */}
                <div className="absolute top-8 w-36 h-36 rounded-full bg-gradient-to-tr from-amber-500/20 via-primary/30 to-amber-300/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Profile Portrait */}
                <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full p-1.5 bg-gradient-to-tr from-primary via-amber-300 to-amber-600 shadow-xl overflow-hidden mb-5 group-hover:scale-105 transition-transform duration-500">
                  <SmartImage
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                {/* Rating Badge */}
                <div className="inline-flex items-center gap-1.5 bg-background/90 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-bold text-amber-400 shadow-md mb-3 backdrop-blur-md">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{mentor.rating}</span>
                </div>

                {/* Name & Title */}
                <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-text-primary group-hover:text-primary transition-colors duration-300 mb-1">
                  {mentor.name}
                </h3>

                <p className="text-xs font-semibold text-primary/90 uppercase tracking-wider mb-4 font-sans line-clamp-2">
                  {mentor.title}
                </p>

                {/* Description */}
                <p className="text-text-secondary text-xs sm:text-sm font-light leading-relaxed mb-6">
                  {mentor.description}
                </p>

                {/* Primary Expertise Tags */}
                <div className="flex flex-wrap justify-center gap-2 mb-6 w-full">
                  {mentor.expertise.map((item, i) => (
                    <span
                      key={i}
                      className="bg-primary/10 border border-primary/20 text-text-primary text-[10px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3 text-primary shrink-0" />
                      <span>{item}</span>
                    </span>
                  ))}
                </div>

                {/* Key Stats Bar */}
                <div className="w-full grid grid-cols-3 gap-2 py-3 border-t border-b border-border/20 text-center bg-background/40 rounded-xl mb-6">
                  <div>
                    <span className="text-text-secondary text-[9px] uppercase tracking-wider block">Experience</span>
                    <span className="text-xs font-bold font-cinzel text-text-primary">{mentor.experience}</span>
                  </div>
                  <div>
                    <span className="text-text-secondary text-[9px] uppercase tracking-wider block">Students</span>
                    <span className="text-xs font-bold font-cinzel text-primary">{mentor.students}</span>
                  </div>
                  <div>
                    <span className="text-text-secondary text-[9px] uppercase tracking-wider block">Language</span>
                    <span className="text-xs font-bold font-cinzel text-text-primary">{mentor.languages.split('&')[0]}</span>
                  </div>
                </div>

              </div>

              {/* Card Footer Action */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => handleSelectAcademy(mentor.slug)}
                  className="w-full py-4 bg-primary hover:bg-amber-400 text-background font-extrabold uppercase tracking-[0.15em] text-xs rounded-xl shadow-lg hover:shadow-amber-400/30 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group-hover:scale-[1.02]"
                >
                  <span>View Academy</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
