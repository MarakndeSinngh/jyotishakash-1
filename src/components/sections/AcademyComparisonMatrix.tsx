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
    metric: 'Primary Expertise',
    icon: Target,
    raajeev: '• Advance & Practical Numerology\n• Vedic Astrology\n• Vastu Consultancy\n• Life Transformation Coaching\n• Spiritual Guidance\n• Meditation',
    shaunak: '• Chaldean Numerology\n• Pythagorean Numerology\n• Name Numerology\n• Mobile Numerology\n• Astrology Remedies\n• Numero Vastu Analysis',
    sannjoy: '• Lo Shu Grid Numerology\n• Mobile Numerology\n• Chaldean Numerology\n• Name Numerology\n• Business Numerology\n• Relationship Numerology'
  },
  {
    metric: 'Teaching Language',
    icon: Globe,
    raajeev: 'English, Hindi',
    shaunak: 'English, Hindi, Gujarati',
    sannjoy: 'Bengali, English'
  },
  {
    metric: 'Programs',
    icon: BookOpen,
    raajeev: 'Professional Numerology Certification\nAdvanced Astrology\nPractical Vastu\nSpiritual Growth\nBusiness & Brand Consultation\nMeditation for Success',
    shaunak: 'Chaldean Numerology\nPythagorean Numerology\nAdvanced Numerology\nMobile Numerology\nName Numerology\nRemedial Astrology',
    sannjoy: 'Lo Shu Grid Masterclass\nMobile Numerology\nName Numerology\nRelationship Numerology\nBusiness Numerology\nLal Kitab Remedies'
  },
  {
    metric: 'Live Learning',
    icon: Video,
    raajeev: '• Weekly Live Masterclasses\n• Personal Q&A\n• Community Mentorship',
    shaunak: '• Interactive Astrology Sessions\n• Live Chart Reading\n• Practical Case Studies',
    sannjoy: '• Bengali Live Classes\n• Weekly Q&A\n• Student Practice Sessions'
  },
  {
    metric: 'Certification',
    icon: Award,
    raajeev: '• Certified LEO Family Professional Numerologist\n• Astrologer & Vastu Expert',
    shaunak: '• Certified Chaldean & Pythagorean Numerology Practitioner',
    sannjoy: '• Certified Chaldean & Pythagorean Numerology Practitioner'
  },
  {
    metric: 'Personal Consultation',
    icon: UserCheck,
    raajeev: '• Celebrity Consultation\n• Business Numerology\n• Brand Name Correction\n• Vastu Audit\n• Life Coaching',
    shaunak: '• Lo Shu Analysis\n• Mobile Number Analysis\n• Name Correction\n• Business Numerology\n• Relationship Guidance\n• Planetary Remedies\n• Career Guidance',
    sannjoy: '• Lo Shu Analysis\n• Mobile Number Analysis\n• Name Correction\n• Business Numerology\n• Relationship Guidance'
  },
  {
    metric: 'Best Suited For',
    icon: Layers,
    raajeev: 'Entrepreneurs, Business Owners, Professionals, Spiritual Seekers, Corporate Leaders',
    shaunak: 'Astrology Learners, Vastu Consultants, Students, Researchers, Home Owners',
    sannjoy: 'Bengali Students, Beginners, Working Professionals, Business Owners, Families'
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
                      Raajeev Singh Chauhann Programs
                    </button>
                  </div>
                </th>
                <th className="p-6 text-center w-1/4 border-l border-border/20">
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-purple-400 bg-purple-400/10 px-3 py-1 rounded-full border border-purple-400/30">🎓 Senior Faculty</span>
                    <h4 className="text-lg font-bold font-cinzel text-text-primary mt-2">Shaunak S. Patthak</h4>
                    <span className="text-[10px] text-text-secondary font-medium">Master Numerologist & Astrologer</span>
                    <button
                      onClick={() => switchAcademy('shaunak')}
                      className="mt-3 px-4 py-2 bg-purple-500/10 hover:bg-purple-500 text-purple-400 hover:text-white border border-purple-500/30 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Shaunak S. Patthak Programs
                    </button>
                  </div>
                </th>
                <th className="p-6 text-center w-1/4 border-l border-border/20">
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/30">🎓 Senior Faculty</span>
                    <h4 className="text-lg font-bold font-cinzel text-text-primary mt-2">Sannjoy Biswass</h4>
                    <span className="text-[10px] text-text-secondary font-medium">Master Numerologist & Astrologer</span>
                    <button
                      onClick={() => switchAcademy('sannjoy')}
                      className="mt-3 px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white border border-emerald-500/30 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Sannjoy Biswass Programs
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
                    <td className="p-6 text-xs text-text-secondary leading-relaxed border-l border-border/20 bg-amber-500/[0.01] whitespace-pre-line">
                      {row.raajeev}
                    </td>
                    <td className="p-6 text-xs text-text-secondary leading-relaxed border-l border-border/20 bg-purple-500/[0.01] whitespace-pre-line">
                      {row.shaunak}
                    </td>
                    <td className="p-6 text-xs text-text-secondary leading-relaxed border-l border-border/20 bg-emerald-500/[0.01] whitespace-pre-line">
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
              name: 'Shaunak S. Patthak',
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
                      <p className="text-xs text-text-secondary leading-relaxed whitespace-pre-line">{val}</p>
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
