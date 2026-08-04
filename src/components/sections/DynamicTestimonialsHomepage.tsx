import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Sparkles, Quote, CheckCircle2 } from 'lucide-react';
import { useAcademy } from '../../context/AcademyContext';

export default function DynamicTestimonialsHomepage() {
  const { allAcademies } = useAcademy();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  // Collect testimonials from all academies
  const allTestimonials = allAcademies.flatMap((academy) => {
    return academy.testimonials.map((t) => ({
      ...t,
      academySlug: academy.slug,
      academyName: academy.shortName,
      instructorName: academy.instructorName,
      instructorAvatar: academy.assets.profileImage,
    }));
  });

  const filteredTestimonials = allTestimonials.filter((t) => {
    if (selectedFilter === 'all') return true;
    return t.academySlug === selectedFilter;
  });

  return (
    <section id="testimonials-home" className="relative py-24 sm:py-32 bg-surface/30 text-text-primary overflow-hidden border-t border-b border-border/20 z-10">
      
      {/* Decorative Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em]"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
            <span>Verified Student Reviews</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-cinzel tracking-tight text-text-primary"
          >
            Student Transformations
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary text-base sm:text-lg font-light leading-relaxed font-sans"
          >
            Real stories from business leaders, medical professionals, fashion designers, and seekers who transformed their lives through our mentor academies.
          </motion.p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-16 max-w-3xl mx-auto">
          {[
            { id: 'all', label: 'All Reviews' },
            { id: 'raajeev', label: '👑 Founder' },
            { id: 'shaunak', label: 'Shaunak S. Patthak' },
            { id: 'sannjoy', label: 'Sannjoy Biswass' },
          ].map((tab) => {
            const isActive = selectedFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-primary text-background shadow-lg scale-105 font-extrabold'
                    : 'bg-card border border-border/30 hover:border-primary/30 text-text-secondary hover:text-text-primary'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredTestimonials.map((t) => (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-card border border-border/30 hover:border-amber-400/40 p-8 rounded-3xl flex flex-col justify-between text-left shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] relative overflow-hidden"
              >
                {/* Quote Icon Accent */}
                <Quote className="absolute top-6 right-6 w-12 h-12 text-primary/10 pointer-events-none" />

                <div className="space-y-4 relative z-10">
                  {/* Academy Tag & Star Rating */}
                  <div className="flex items-center justify-between">
                    <span className="bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                      {t.academyName}
                    </span>
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(t.rating)].map((_, r) => (
                        <Star key={r} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  {/* Testimonial Quote */}
                  <p className="text-text-secondary text-xs sm:text-sm italic font-light leading-relaxed font-sans">
                    "{t.content}"
                  </p>
                </div>

                {/* Student Info Footer */}
                <div className="pt-6 mt-6 border-t border-border/15 flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-11 h-11 rounded-full object-cover border-2 border-primary/40 shadow-md"
                    />
                    <div className="text-left">
                      <h4 className="text-xs font-bold font-cinzel text-text-primary">{t.name}</h4>
                      <span className="text-[10px] text-text-secondary block font-sans">{t.role}</span>
                      {t.courseTitle && (
                        <span className="text-[9px] text-primary font-semibold block mt-0.5">
                          Course: {t.courseTitle}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
