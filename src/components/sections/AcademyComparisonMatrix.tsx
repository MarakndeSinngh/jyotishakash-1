import React from 'react';
import { motion } from 'framer-motion';
import { 
  Check, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Globe, 
  BookOpen, 
  Video, 
  Award, 
  UserCheck, 
  Target 
} from 'lucide-react';
import { useAcademy } from '../../context/AcademyContext';

interface ComparisonRow {
  metric: string;
  icon: React.ElementType;
  raajeev: string;
  shaunak: string;
  sannjoy: string;
}

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    metric: 'Primary Focus',
    icon: Target,
    raajeev: 'Chaldean Numerology, Mobile Frequency & Name Spelling Correction',
    shaunak: 'Classical Vedic Astrology, Astro-Vastu & Dasha Calculation',
    sannjoy: 'Bengali Numerology, Lo Shu Grid Balance & Mobile Harmonics'
  },
  {
    metric: 'Instruction Language',
    icon: Globe,
    raajeev: 'English & Hindi',
    shaunak: 'English & Hinglish',
    sannjoy: 'Bengali (বাংলা) & English'
  },
  {
    metric: 'Courses Catalog',
    icon: BookOpen,
    raajeev: '4 Certified Masterclasses (Beginner to Advanced)',
    shaunak: '4 Certified Masterclasses (Beginner to Advanced)',
    sannjoy: '5 Certified Masterclasses (Beginner to Advanced)'
  },
  {
    metric: 'Live Interaction',
    icon: Video,
    raajeev: 'Weekly Live Masterclasses & Q&A with Raajeev Sir',
    shaunak: 'Dedicated Chart Reading Mentorship Circles with Shaunak Sir',
    sannjoy: 'Live Masterclasses & Direct Q&A in Native Bengali'
  },
  {
    metric: 'Certification',
    icon: Award,
    raajeev: 'Certified Occult Practitioner (Raajeev Singh Academy)',
    shaunak: 'Certified Master Numerologist (Shaunak S Patthak Academy)',
    sannjoy: 'Certified Master Numerologist (Sannjoy Biswass Academy)'
  },
  {
    metric: 'Personal Consultation',
    icon: UserCheck,
    raajeev: 'VIP Celebrity, Mobile Vibration & Corporate Brand Audit',
    shaunak: 'Horoscope Kundali Analysis & Astro-Vastu House Audit',
    sannjoy: 'Personal Lo Shu Grid & Mobile Number Remedial Consultation'
  },
  {
    metric: 'Best Suited For',
    icon: Layers,
    raajeev: 'Entrepreneurs, professionals, and students seeking rapid life alignment & brand power',
    shaunak: 'Scholars and learners wanting authentic classical astrology & spatial Vastu remedies',
    sannjoy: 'Native Bengali speakers & learners looking for practical Lo Shu grid solutions'
  }
];

export default function AcademyComparisonMatrix() {
  const { switchAcademy } = useAcademy();

  return (
    <section id="comparison" className="relative py-24 sm:py-32 bg-surface/30 text-text-primary overflow-hidden border-t border-b border-border/20 z-10">
      
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em]"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
            <span>Side-By-Side Comparison</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-cinzel tracking-tight text-text-primary"
          >
            Academy Comparison Matrix
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary text-base sm:text-lg font-light leading-relaxed font-sans"
          >
            Compare our three distinct academies side-by-side to choose the curriculum, teaching language, and mentor that best fits your goals.
          </motion.p>
        </div>

        {/* Desktop Comparison Table */}
        <div className="hidden lg:block overflow-hidden rounded-[2.5rem] border border-border/30 bg-card/80 backdrop-blur-md shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/30 bg-card">
                <th className="p-6 text-xs font-bold uppercase tracking-[0.2em] text-text-secondary w-1/4">
                  Key Metric
                </th>
                <th className="p-6 text-center w-1/4 border-l border-border/20">
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] uppercase tracking-widest font-extrabold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30">👑 Founder & Visionary</span>
                    <h4 className="text-lg font-bold font-cinzel text-text-primary mt-2">Raajeev Singh Chauhann</h4>
                    <span className="text-[10px] text-text-secondary font-medium">Founder of LEO Family</span>
                    <button
                      onClick={() => switchAcademy('raajeev')}
                      className="mt-3 px-4 py-2 bg-primary/10 hover:bg-primary text-primary hover:text-background border border-primary/30 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Explore Academy
                    </button>
                  </div>
                </th>
                <th className="p-6 text-center w-1/4 border-l border-border/20">
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-purple-400 bg-purple-400/10 px-3 py-1 rounded-full border border-purple-400/30">🎓 Senior Faculty</span>
                    <h4 className="text-lg font-bold font-cinzel text-text-primary mt-2">Dr. Shaunak S. Pathak</h4>
                    <span className="text-[10px] text-text-secondary font-medium">Astro-Vastu Grandmaster • Lead Faculty</span>
                    <button
                      onClick={() => switchAcademy('shaunak')}
                      className="mt-3 px-4 py-2 bg-purple-500/10 hover:bg-purple-500 text-purple-400 hover:text-white border border-purple-500/30 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Explore Programs
                    </button>
                  </div>
                </th>
                <th className="p-6 text-center w-1/4 border-l border-border/20">
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/30">🎓 Senior Faculty</span>
                    <h4 className="text-lg font-bold font-cinzel text-text-primary mt-2">Sannjoy Biswass</h4>
                    <span className="text-[10px] text-text-secondary font-medium">Master Numerologist • Regional Faculty</span>
                    <button
                      onClick={() => switchAcademy('sannjoy')}
                      className="mt-3 px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white border border-emerald-500/30 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Explore Programs
                    </button>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, idx) => {
                const IconComp = row.icon;
                return (
                  <tr key={idx} className="border-b border-border/15 hover:bg-surface/50 transition-colors">
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                          <IconComp className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold font-cinzel text-text-primary uppercase tracking-wider">
                          {row.metric}
                        </span>
                      </div>
                    </td>
                    <td className="p-6 text-xs text-text-secondary leading-relaxed border-l border-border/20 bg-amber-500/[0.01]">
                      {row.raajeev}
                    </td>
                    <td className="p-6 text-xs text-text-secondary leading-relaxed border-l border-border/20 bg-purple-500/[0.01]">
                      {row.shaunak}
                    </td>
                    <td className="p-6 text-xs text-text-secondary leading-relaxed border-l border-border/20 bg-emerald-500/[0.01]">
                      {row.sannjoy}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile / Tablet Accordion Cards Layout */}
        <div className="lg:hidden space-y-8">
          {[
            {
              slug: 'raajeev',
              name: 'Raajeev Singh Chauhann',
              focus: '👑 Founder & Visionary (LEO Family)',
              color: 'border-amber-400/50',
              badgeColor: 'text-amber-400 bg-amber-400/10 border border-amber-400/30'
            },
            {
              slug: 'shaunak',
              name: 'Shaunak S. Pathak',
              focus: '🎓 Senior Mentor • Gujrati Mentor',
              color: 'border-purple-400/30',
              badgeColor: 'text-purple-400 bg-purple-400/10 border border-purple-400/30'
            },
            {
              slug: 'sannjoy',
              name: 'Sannjoy Biswass',
              focus: '🎓 Senior Mentor • Bengali Mentor',
              color: 'border-emerald-400/30',
              badgeColor: 'text-emerald-400 bg-emerald-400/10 border border-emerald-400/30'
            }
          ].map((acad) => (
            <div
              key={acad.slug}
              className={`bg-card border ${acad.color} p-6 rounded-3xl space-y-4 shadow-xl`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-border/20">
                <div>
                  <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${acad.badgeColor}`}>
                    {acad.focus}
                  </span>
                  <h3 className="text-xl font-bold font-cinzel text-text-primary mt-2">{acad.name}</h3>
                </div>
                <button
                  onClick={() => switchAcademy(acad.slug)}
                  className="px-3 py-2 bg-primary text-background font-bold text-[10px] uppercase rounded-lg"
                >
                  View
                </button>
              </div>

              <div className="space-y-3 pt-2">
                {COMPARISON_ROWS.map((row, idx) => {
                  const val = acad.slug === 'raajeev' ? row.raajeev : acad.slug === 'shaunak' ? row.shaunak : row.sannjoy;
                  return (
                    <div key={idx} className="text-left space-y-1">
                      <span className="text-[10px] uppercase font-bold text-primary tracking-wider">{row.metric}:</span>
                      <p className="text-xs text-text-secondary leading-relaxed">{val}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
