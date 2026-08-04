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
  roleBadge: string;
  isFounder?: boolean;
  title: string;
  subtitle: string;
  expertise: string[];
  languages: string;
  experience: string;
  students: string;
  rating: string;
  image: string;
  fallbackImage: string;
  description: string;
}

const FOUNDER: MentorData = {
  id: 'raajeev',
  slug: 'raajeev',
  name: 'Raajeev Singh Chauhann',
  roleBadge: '👑 Founder & Visionary',
  isFounder: true,
  title: 'Founder & Visionary',
  subtitle: 'Celebrity Astrology, Numerology & Vastu Expert • Founder of LEO Family',
  expertise: ['Chaldean Numerology', 'Vedic Astrology', 'Mobile Frequency', 'Name & Signature Correction'],
  languages: 'English & Hindi',
  experience: '20+ Years',
  students: '12,000+ Students',
  rating: '5.0 ★',
  image: '/assets/teachers/Raajeev.webp',
  fallbackImage: '/gemstone-assets/rajeev-singh.jpg',
  description: 'Founder of LEO Family. Specializes in Chaldean numerical vibrations, Vedic Astrology, mobile digits alignment, signature shifts, and corporate brand positioning.'
};

const SENIOR_MENTORS: MentorData[] = [
  {
    id: 'shaunak',
    slug: 'shaunak',
    name: 'Shaunak S. Pathak',
    roleBadge: '🎓 Senior Mentor',
    title: 'Numerology & Vastu Expert',
    subtitle: 'Senior Faculty • Gujrati Learning Mentor',
    expertise: ['Numerology & Vedic Astrology', 'Planetary Dashas & Gemology', 'Gujrati Learning Mentor'],
    languages: 'English, Gujrati & Hinglish',
    experience: '22+ Years',
    students: '6,200+ Alumni',
    rating: '5.0 ★',
    image: '/assets/teachers/shaunak.webp',
    fallbackImage: '/gemstone-assets/blue-sapphire.jpg',
    description: 'Senior Faculty member specializing in Numerology, Dasha calculations, Numero Vastu, and Name Numerology.'
  },
  {
    id: 'sannjoy',
    slug: 'sannjoy',
    name: 'Sannjoy Biswass',
    roleBadge: '🎓 Senior Mentor',
    title: 'Numerologist & Vastu Expert',
    subtitle: 'Senior Faculty • Bengali Learning Mentor',
    expertise: ['Bengali Numerology', 'Lo Shu Grid Science', 'Bengali Learning Mentor'],
    languages: 'Bengali (বাংলা) & English',
    experience: '20+ Years',
    students: '7,500+ Students',
    rating: '4.9 ★',
    image: '/assets/teachers/sannjoy.webp',
    fallbackImage: '/assets/sannjoy/profile.png',
    description: 'Renowned Senior Faculty teaching authentic Lo Shu grid balancing, native language Bengali numerology, and elemental harmony.'
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
        <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)]" />
        <div className="absolute bottom-[10%] right-[15%] w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.03)_0%,transparent_70%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em]"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-primary" />
            <span>Leadership & Faculty</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-cinzel tracking-tight text-text-primary"
          >
            Meet Our Leadership & Faculty
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary text-base sm:text-lg font-light leading-relaxed font-sans"
          >
            Guided by our Founder & Visionary and supported by Senior Faculty mentors across specialized domains and languages.
          </motion.p>
        </div>

        {/* ==================================================
            1. FOUNDER SHOWCASE CARD (Prominent & Featured)
            ================================================== */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="group relative bg-card border-2 border-primary/50 hover:border-amber-400 rounded-[2.5rem] p-8 sm:p-10 shadow-2xl hover:shadow-[0_0_50px_rgba(212,175,55,0.3)] transition-all duration-500 overflow-hidden"
          >
            {/* Ambient Gold Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-amber-500/10 via-primary/10 to-transparent blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Left: Founder Portrait */}
              <div className="md:col-span-5 flex flex-col items-center text-center">
                <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full p-2 bg-gradient-to-tr from-primary via-amber-300 to-amber-600 shadow-2xl overflow-hidden mb-4 group-hover:scale-105 transition-transform duration-500">
                  <SmartImage
                    src={FOUNDER.image}
                    alt={FOUNDER.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                {/* Role Badge */}
                <div className="inline-flex items-center gap-1.5 bg-primary/15 border border-primary/40 px-4 py-1.5 rounded-full text-xs font-bold text-primary shadow-md backdrop-blur-md">
                  <span>{FOUNDER.roleBadge}</span>
                </div>
              </div>

              {/* Right: Founder Info */}
              <div className="md:col-span-7 text-left space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">LEO Family</span>
                    <span className="text-amber-400 text-xs font-bold">• {FOUNDER.rating}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-cinzel text-text-primary group-hover:text-primary transition-colors duration-300">
                    {FOUNDER.name}
                  </h3>

                  <p className="text-xs sm:text-sm font-bold text-primary uppercase tracking-wider mt-1">
                    {FOUNDER.title}
                  </p>

                  <p className="text-xs text-text-secondary font-medium tracking-wide mt-0.5">
                    {FOUNDER.subtitle}
                  </p>
                </div>

                <p className="text-text-secondary text-xs sm:text-sm font-light leading-relaxed">
                  {FOUNDER.description}
                </p>

                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {FOUNDER.expertise.map((item, i) => (
                    <span
                      key={i}
                      className="bg-primary/10 border border-primary/25 text-text-primary text-[10px] font-semibold px-3 py-1 rounded-full flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3 text-primary shrink-0" />
                      <span>{item}</span>
                    </span>
                  ))}
                </div>

                {/* Key Stats Bar */}
                <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-border/20 text-center bg-background/50 rounded-xl">
                  <div>
                    <span className="text-text-secondary text-[9px] uppercase tracking-wider block">Experience</span>
                    <span className="text-xs font-bold font-cinzel text-text-primary">{FOUNDER.experience}</span>
                  </div>
                  <div>
                    <span className="text-text-secondary text-[9px] uppercase tracking-wider block">Students</span>
                    <span className="text-xs font-bold font-cinzel text-primary">{FOUNDER.students}</span>
                  </div>
                  <div>
                    <span className="text-text-secondary text-[9px] uppercase tracking-wider block">Languages</span>
                    <span className="text-xs font-bold font-cinzel text-text-primary">{FOUNDER.languages}</span>
                  </div>
                </div>

                {/* Action CTA */}
                <div className="pt-2">
                  <button
                    onClick={() => handleSelectAcademy(FOUNDER.slug)}
                    className="w-full sm:w-auto px-8 py-3.5 bg-primary hover:bg-amber-400 text-background font-extrabold uppercase tracking-[0.15em] text-xs rounded-xl shadow-lg hover:shadow-amber-400/30 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group-hover:scale-[1.02]"
                  >
                    <span>View Founder's Academy</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>

              </div>

            </div>
          </motion.div>
        </div>


        {/* ==================================================
            2. SENIOR MENTORS GROUP (Subtle Visual Hierarchy)
            ================================================== */}
        <div className="space-y-8 pt-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border/20 text-text-secondary text-[10px] font-bold uppercase tracking-[0.2em]">
              <GraduationCap className="w-3.5 h-3.5 text-primary" />
              <span>Senior Mentors</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-text-primary">
              Senior Faculty & Specialized Mentors
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {SENIOR_MENTORS.map((mentor, index) => (
              <motion.div
                key={mentor.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group relative bg-card border border-border/30 hover:border-primary/40 rounded-[2.5rem] overflow-hidden flex flex-col justify-between transition-all duration-500 ease-out hover:-translate-y-2 shadow-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]"
              >
                {/* Card Header & Portrait */}
                <div className="relative p-6 sm:p-8 flex flex-col items-center text-center space-y-4">
                  
                  {/* Portrait */}
                  <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full p-1.5 bg-gradient-to-tr from-primary/60 via-amber-300/60 to-primary/60 shadow-lg overflow-hidden group-hover:scale-105 transition-transform duration-500">
                    <SmartImage
                      src={mentor.image}
                      alt={mentor.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>

                  {/* Role Badge */}
                  <div className="inline-flex items-center gap-1.5 bg-background/90 border border-border/30 px-3 py-1 rounded-full text-xs font-bold text-text-secondary shadow-md backdrop-blur-md">
                    <span>{mentor.roleBadge}</span>
                    <span className="text-amber-400 font-bold ml-1">• {mentor.rating}</span>
                  </div>

                  {/* Name & Title */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-text-primary group-hover:text-primary transition-colors duration-300 mb-0.5">
                      {mentor.name}
                    </h3>

                    <p className="text-xs font-bold text-primary uppercase tracking-wider">
                      {mentor.title}
                    </p>

                    <p className="text-[11px] text-text-secondary font-medium tracking-wide mt-0.5">
                      {mentor.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-text-secondary text-xs font-light leading-relaxed">
                    {mentor.description}
                  </p>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap justify-center gap-1.5 w-full">
                    {mentor.expertise.map((item, i) => (
                      <span
                        key={i}
                        className="bg-primary/5 border border-primary/15 text-text-primary text-[10px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-2.5 h-2.5 text-primary shrink-0" />
                        <span>{item}</span>
                      </span>
                    ))}
                  </div>

                  {/* Key Stats Bar */}
                  <div className="w-full grid grid-cols-3 gap-2 py-3 border-t border-b border-border/20 text-center bg-background/40 rounded-xl">
                    <div>
                      <span className="text-text-secondary text-[9px] uppercase tracking-wider block">Experience</span>
                      <span className="text-xs font-bold font-cinzel text-text-primary">{mentor.experience}</span>
                    </div>
                    <div>
                      <span className="text-text-secondary text-[9px] uppercase tracking-wider block">Students</span>
                      <span className="text-xs font-bold font-cinzel text-primary">{mentor.students}</span>
                    </div>
                    <div>
                      <span className="text-text-secondary text-[9px] uppercase tracking-wider block">Languages</span>
                      <span className="text-xs font-bold font-cinzel text-text-primary">{mentor.languages.split(',')[0]}</span>
                    </div>
                  </div>

                </div>

                {/* Card Footer Action */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => handleSelectAcademy(mentor.slug)}
                    className="w-full py-3.5 bg-card hover:bg-primary border border-primary/30 text-text-primary hover:text-background font-bold uppercase tracking-[0.15em] text-xs rounded-xl shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>View Academy</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>

              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
