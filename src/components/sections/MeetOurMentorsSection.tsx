import React, { useEffect, useState } from 'react';
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
import { facultyService } from '../../services/facultyService';
import { Faculty } from '../../models/faculty';

export default function MeetOurMentorsSection() {
  const { switchAcademy } = useAcademy();
  const [founder, setFounder] = useState<Faculty | null>(null);
  const [facultyList, setFacultyList] = useState<Faculty[]>([]);

  useEffect(() => {
    facultyService.getAllFaculty()
      .then((all) => {
        const fnd = all.find(f => f.id === 'raajeev' || f.title.toLowerCase().includes('founder')) || all[0] || null;
        setFounder(fnd);
        setFacultyList(all.filter(f => f.id !== fnd?.id));
      })
      .catch(err => console.error('Failed to load faculty in MeetOurMentorsSection:', err));
  }, []);

  const handleSelectAcademy = (slug: string) => {
    switchAcademy(slug);
  };

  const getExpertise = (id: string) => {
    if (id === 'raajeev') return ['Chaldean Numerology', 'Vedic Astrology', 'Mobile Frequency', 'Corporate Name Alignment'];
    if (id === 'shaunak') return ['Chaldean Numerology', 'Pythagorean Numerology', 'Name Numerology', 'Mobile Numerology', 'Astrology Remedies', 'Numero Vastu Analysis'];
    return ['Lo Shu Grid Numerology', 'Mobile Numerology', 'Chaldean Numerology', 'Name Numerology', 'Business Numerology', 'Relationship Numerology'];
  };

  const getSubtitle = (id: string) => {
    if (id === 'raajeev') return 'Celebrity Astro-Numerologist • Founder, LEO Family • Life Coach';
    if (id === 'shaunak') return 'Astro-Vastu Grandmaster • Senior Faculty • Vedic Scholar';
    return 'Master Numerologist • Lo Shu Specialist • Sacred Frequency Mentor';
  };

  const getExperience = (id: string) => (id === 'raajeev' ? '20+ Years' : '15+ Years');
  const getStudents = (id: string) => (id === 'raajeev' ? '12,000+ Seekers' : '8,000+ Students');

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
         {founder && (
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
                     src={founder.image}
                     alt={founder.name}
                     className="w-full h-full object-cover rounded-full"
                   />
                 </div>

                 {/* Role Badge */}
                 <div className="inline-flex items-center gap-1.5 bg-amber-400/20 border border-amber-400/50 px-4 py-1.5 rounded-full text-xs font-extrabold text-amber-300 shadow-lg backdrop-blur-md">
                   <Crown className="w-4 h-4 text-amber-400 fill-amber-400" />
                   <span>👑 Founder</span>
                 </div>
               </div>

               {/* Right: Founder Info */}
               <div className="md:col-span-7 text-left space-y-4">
                 <div>
                   <div className="flex items-center gap-2 mb-1">
                     <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-400">LEO Family Founder</span>
                     <span className="text-amber-400 text-xs font-bold">• 5.0 ★</span>
                   </div>

                   <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-cinzel text-text-primary group-hover:text-primary transition-colors duration-300">
                     {founder.name}
                   </h3>

                   <p className="text-xs sm:text-sm font-extrabold text-primary uppercase tracking-wider mt-1">
                     {founder.title}
                   </p>

                   <p className="text-xs text-text-secondary font-medium tracking-wide mt-1 leading-snug">
                     {getSubtitle(founder.id)}
                   </p>
                 </div>

                 <p className="text-text-secondary text-xs sm:text-sm font-light leading-relaxed">
                   {founder.bio}
                 </p>

                 {/* Expertise Tags */}
                 <div className="flex flex-wrap gap-2 pt-1">
                   {getExpertise(founder.id).map((item, i) => (
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
                     <span className="text-xs font-bold font-cinzel text-text-primary">{getExperience(founder.id)}</span>
                   </div>
                   <div>
                     <span className="text-text-secondary text-[9px] uppercase tracking-wider block">Seekers</span>
                     <span className="text-xs font-bold font-cinzel text-amber-400">{getStudents(founder.id)}</span>
                   </div>
                   <div>
                     <span className="text-text-secondary text-[9px] uppercase tracking-wider block">Languages</span>
                     <span className="text-xs font-bold font-cinzel text-text-primary">{Array.isArray(founder.languages) ? founder.languages.join(' & ') : (founder.languages || 'English & Hindi')}</span>
                   </div>
                 </div>

                 {/* Action CTA */}
                 <div className="pt-2">
                   <button
                     onClick={() => handleSelectAcademy(founder.id)}
                     className="w-full sm:w-auto px-8 py-3.5 bg-primary hover:bg-amber-400 text-background font-extrabold uppercase tracking-[0.15em] text-xs rounded-xl shadow-lg hover:shadow-amber-400/40 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group-hover:scale-[1.02]"
                   >
                     <Crown className="w-4 h-4 text-background" />
                     <span>{founder.name} Programs</span>
                     <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                   </button>
                 </div>

               </div>

             </div>
           </motion.div>
         </div>
         )}


         {/* ==================================================
             2. FACULTY CARDS (Equal Size, Elegant Styling)
             ================================================== */}
         {facultyList.length > 0 && (
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
             {facultyList.map((facultyMember, index) => (
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
                     <span>🎓 Senior Faculty</span>
                     <span className="text-amber-400 font-bold ml-1">• 5.0 ★</span>
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
                       {getSubtitle(facultyMember.id)}
                     </p>
                   </div>

                   {/* Description */}
                   <p className="text-text-secondary text-xs font-light leading-relaxed">
                     {facultyMember.bio}
                   </p>

                   {/* Expertise Tags */}
                   <div className="flex flex-wrap justify-center gap-1.5 w-full">
                     {getExpertise(facultyMember.id).map((item, i) => (
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
                       <span className="text-xs font-bold font-cinzel text-text-primary">{getExperience(facultyMember.id)}</span>
                     </div>
                     <div>
                       <span className="text-text-secondary text-[9px] uppercase tracking-wider block">Alumni</span>
                       <span className="text-xs font-bold font-cinzel text-primary">{getStudents(facultyMember.id)}</span>
                     </div>
                     <div>
                       <span className="text-text-secondary text-[9px] uppercase tracking-wider block">Languages</span>
                        <span className="text-xs font-bold font-cinzel text-text-primary">{facultyMember.languages?.[0] || 'English'}</span>
                     </div>
                   </div>

                 </div>

                 {/* Card Footer Action */}
                 <div className="p-6 pt-0">
                   <button
                     onClick={() => handleSelectAcademy(facultyMember.id)}
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
         )}

      </div>
    </section>
  );
}
