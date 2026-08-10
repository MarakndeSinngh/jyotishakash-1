import React from 'react';
import { motion } from 'framer-motion';
import { Assets } from '../../config/assets';
import { 
  Crown, 
  GraduationCap, 
  ArrowRight, 
  Sparkles,
  CheckCircle2,
  Award,
  BookOpen
} from 'lucide-react';
import { useAcademy } from '../../context/AcademyContext';
import SmartImage from './SmartImage';

interface FounderData {
  id: string;
  slug: string;
  name: string;
  roleBadge: string;
  title: string;
  subtitle: string;
  details: string[];
  expertise: string[];
  languages: string;
  experience: string;
  students: string;
  rating: string;
  image: string;
  description: string;
}

interface FacultyData {
  id: string;
  slug: string;
  name: string;
  roleBadge: string;
  title: string;
  subtitle: string;
  expertise: string[];
  languages: string;
  experience: string;
  students: string;
  rating: string;
  image: string;
  description: string;
}

const FOUNDER: FounderData = {
  id: 'raajeev',
  slug: 'raajeev',
  name: 'Raajeev Singh Chauhann',
  roleBadge: '👑 Founder',
  title: 'Founder & Visionary',
  subtitle: 'Celebrity Astro-Numerologist • Founder, LEO Family • Life Coach',
  details: [
    'Celebrity Astro-Numerologist',
    'Founder, LEO Family',
    'Life Coach'
  ],
  expertise: ['Chaldean Numerology', 'Vedic Astrology', 'Mobile Frequency', 'Corporate Name Alignment'],
  languages: 'English & Hindi',
  experience: '20+ Years',
  students: '12,000+ Seekers',
  rating: '5.0 ★',
  image: Assets.founder.image,
  description: 'Founder and Visionary of LEO Family. Pioneer in Chaldean numerical vibrations, Vedic Astrology, signature realignment, and corporate spellings.'
};

const FACULTY: FacultyData[] = [];

export default function MeetOurMentorsSection() {
  const { switchAcademy } = useAcademy();

  const handleSelectAcademy = (slug: string) => {
    switchAcademy(slug);
  };

  return (
    <section id="mentors" className="relative py-24 sm:py-32 bg-background text-text-primary overflow-hidden z-10">
      
      {/* Background Decorative Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06)_0%,transparent_70%)]" />
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
            Meet Our Experts
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary text-base sm:text-lg font-light leading-relaxed font-sans"
          >
            Guided by our Founder & Visionary and powered by Senior Faculty grandmasters across specialized domains.
          </motion.p>
        </div>

        {/* ==================================================
            1. FOUNDER CARD (Slightly Larger, Golden Glow, Crown)
            ================================================== */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="group relative bg-card border-2 border-primary hover:border-amber-400 rounded-[2.5rem] p-8 sm:p-10 shadow-[0_0_40px_rgba(212,175,55,0.25)] hover:shadow-[0_0_60px_rgba(212,175,55,0.4)] transition-all duration-500 overflow-hidden"
          >
            {/* Ambient Gold Glow Background */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-500/15 via-primary/15 to-transparent blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Left: Founder Portrait */}
              <div className="md:col-span-5 flex flex-col items-center text-center">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full p-2.5 bg-gradient-to-tr from-primary via-amber-300 to-amber-600 shadow-2xl overflow-hidden mb-4 group-hover:scale-105 transition-transform duration-500 ring-4 ring-primary/20">
                  <SmartImage
                    src={FOUNDER.image}
                    alt={FOUNDER.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                {/* Role Badge */}
                <div className="inline-flex items-center gap-1.5 bg-amber-400/20 border border-amber-400/50 px-4 py-1.5 rounded-full text-xs font-extrabold text-amber-300 shadow-lg backdrop-blur-md">
                  <Crown className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>{FOUNDER.roleBadge}</span>
                </div>
              </div>

              {/* Right: Founder Info */}
              <div className="md:col-span-7 text-left space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-400">LEO Family Founder</span>
                    <span className="text-amber-400 text-xs font-bold">• {FOUNDER.rating}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-cinzel text-text-primary group-hover:text-primary transition-colors duration-300">
                    {FOUNDER.name}
                  </h3>

                  <p className="text-xs sm:text-sm font-extrabold text-primary uppercase tracking-wider mt-1">
                    {FOUNDER.title}
                  </p>

                  <p className="text-xs text-text-secondary font-medium tracking-wide mt-1 leading-snug">
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
                      className="bg-primary/10 border border-primary/30 text-text-primary text-[10px] font-semibold px-3 py-1 rounded-full flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3 text-primary shrink-0" />
                      <span>{item}</span>
                    </span>
                  ))}
                </div>

                {/* Key Stats Bar */}
                <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-border/20 text-center bg-background/60 rounded-xl">
                  <div>
                    <span className="text-text-secondary text-[9px] uppercase tracking-wider block">Experience</span>
                    <span className="text-xs font-bold font-cinzel text-text-primary">{FOUNDER.experience}</span>
                  </div>
                  <div>
                    <span className="text-text-secondary text-[9px] uppercase tracking-wider block">Seekers</span>
                    <span className="text-xs font-bold font-cinzel text-amber-400">{FOUNDER.students}</span>
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
                    className="w-full sm:w-auto px-8 py-3.5 bg-primary hover:bg-amber-400 text-background font-extrabold uppercase tracking-[0.15em] text-xs rounded-xl shadow-lg hover:shadow-amber-400/40 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group-hover:scale-[1.02]"
                  >
                    <Crown className="w-4 h-4 text-background" />
                    <span>{FOUNDER.name} Programs</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>

              </div>

            </div>
          </motion.div>
        </div>


        {/* ==================================================
            2. FACULTY CARDS (Equal Size, Elegant Styling)
            ================================================== */}
        <div className="space-y-8 pt-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border/20 text-text-secondary text-[10px] font-bold uppercase tracking-[0.2em]">
              <GraduationCap className="w-3.5 h-3.5 text-primary" />
              <span>LEO Family Faculty</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-text-primary">
              Senior Faculty & Master Instructors
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {FACULTY.map((facultyMember, index) => (
              <motion.div
                key={facultyMember.id}
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
                      src={facultyMember.image}
                      alt={facultyMember.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>

                  {/* Role Badge */}
                  <div className="inline-flex items-center gap-1.5 bg-background/90 border border-border/30 px-3.5 py-1 rounded-full text-xs font-bold text-text-secondary shadow-md backdrop-blur-md">
                    <span>{facultyMember.roleBadge}</span>
                    <span className="text-amber-400 font-bold ml-1">• {facultyMember.rating}</span>
                  </div>

                  {/* Name & Title */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-text-primary group-hover:text-primary transition-colors duration-300 mb-0.5">
                      {facultyMember.name}
                    </h3>

                    <p className="text-xs font-bold text-primary uppercase tracking-wider">
                      {facultyMember.title}
                    </p>

                    <p className="text-[11px] text-text-secondary font-medium tracking-wide mt-0.5">
                      {facultyMember.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-text-secondary text-xs font-light leading-relaxed">
                    {facultyMember.description}
                  </p>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap justify-center gap-1.5 w-full">
                    {facultyMember.expertise.map((item, i) => (
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
                      <span className="text-xs font-bold font-cinzel text-text-primary">{facultyMember.experience}</span>
                    </div>
                    <div>
                      <span className="text-text-secondary text-[9px] uppercase tracking-wider block">Alumni</span>
                      <span className="text-xs font-bold font-cinzel text-primary">{facultyMember.students}</span>
                    </div>
                    <div>
                      <span className="text-text-secondary text-[9px] uppercase tracking-wider block">Languages</span>
                      <span className="text-xs font-bold font-cinzel text-text-primary">{facultyMember.languages.split(',')[0]}</span>
                    </div>
                  </div>

                </div>

                {/* Card Footer Action */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => handleSelectAcademy(facultyMember.slug)}
                    className="w-full py-3.5 bg-card hover:bg-primary border border-primary/30 text-text-primary hover:text-background font-bold uppercase tracking-[0.15em] text-xs rounded-xl shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{facultyMember.name} Programs</span>
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
