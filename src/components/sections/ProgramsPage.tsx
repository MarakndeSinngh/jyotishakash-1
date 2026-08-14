import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Clock, BookOpen, Award, CheckCircle2, Star, ArrowRight, ArrowLeft, Layers } from 'lucide-react';
import { programService } from '../../services/programService';
import { Program } from '../../models/program';
import { WHATSAPP_LINK } from '../../constants/contacts';
import SmartImage from './SmartImage';

interface ProgramsPageProps {
  navigate?: (path: string) => void;
}

export default function ProgramsPage({ navigate }: ProgramsPageProps) {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('filter') || 'all';
  });

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoading(true);
        const data = await programService.getAllPrograms();
        setPrograms(data);
      } catch (err) {
        console.error('Failed to load programs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();

    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const f = params.get('filter');
      if (f) setSelectedCategory(f);
      else setSelectedCategory('all');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleTabChange = (category: string) => {
    setSelectedCategory(category);
    const newPath = category === 'all' ? '/programs' : `/programs?filter=${category}`;
    window.history.pushState({}, '', newPath);
  };

  const filteredPrograms = programs.filter(prog => {
    if (!prog.visible) return false;
    if (selectedCategory === 'all') return true;

    const t = (prog.title || '').toLowerCase();
    const d = (prog.description || '').toLowerCase();
    const sub = (prog.subtitle || '').toLowerCase();

    if (selectedCategory === 'astrology') {
      return t.includes('astrology') || t.includes('astro') || d.includes('astrology') || d.includes('astro') || sub.includes('astrology') || sub.includes('astro');
    }
    if (selectedCategory === 'vastu') {
      return t.includes('vastu') || t.includes('devta') || d.includes('vastu') || d.includes('devta') || sub.includes('vastu') || sub.includes('devta');
    }
    if (selectedCategory === 'name' || selectedCategory === 'name-correction') {
      return t.includes('name') || t.includes('mobile') || d.includes('name') || d.includes('mobile') || sub.includes('name') || sub.includes('mobile');
    }
    return true;
  });

  const getMentorDetails = (mentorId: string) => {
    switch (mentorId?.toLowerCase()) {
      case 'shaunak':
        return { name: 'Shaunak S. Patthak', short: 'Shaunak Academy', image: '/gemstone-assets/logo.jpg' };
      case 'sannjoy':
        return { name: 'Sannjoy Biswass', short: 'Sannjoy Academy', image: '/gemstone-assets/logo.jpg' };
      default:
        return { name: 'Raajeev Singh Chauhann', short: 'LEO Academy', image: '/gemstone-assets/logo.jpg' };
    }
  };

  return (
    <div className="min-h-screen bg-background text-text-primary pt-28 pb-24 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.04)_0%,transparent_70%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        
        {/* Back Button / Header */}
        <div className="mb-8 flex items-center justify-between">
          {navigate && (
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-secondary hover:text-primary transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
          )}
          <div className="text-xs font-mono text-primary uppercase tracking-widest bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
            {filteredPrograms.length} Programs Available
          </div>
        </div>

        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em]"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
            <span>LEO Family Certification Curriculums</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-cinzel tracking-tight text-text-primary"
          >
            Masterclass Programs
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary text-base sm:text-lg font-light leading-relaxed font-sans"
          >
            Explore verified occult masterclasses in Astrology, Vastu, Numerology, and Name Correction taught by world-renowned experts.
          </motion.p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-16 max-w-4xl mx-auto">
          {[
            { id: 'all', label: 'All Programs' },
            { id: 'astrology', label: 'Astrology' },
            { id: 'vastu', label: 'Vastu' },
            { id: 'name', label: 'Name Correction' },
          ].map((tab) => {
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
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

        {/* Programs Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-card border border-border/30 rounded-3xl h-[450px] animate-pulse p-6 flex flex-col justify-between">
                <div className="w-full h-48 bg-border/20 rounded-2xl mb-4" />
                <div className="space-y-3">
                  <div className="h-6 bg-border/20 rounded w-3/4" />
                  <div className="h-4 bg-border/20 rounded w-full" />
                  <div className="h-4 bg-border/20 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredPrograms.length === 0 ? (
          <div className="text-center py-20 bg-card/50 border border-border/30 rounded-3xl p-8 max-w-lg mx-auto">
            <Sparkles className="w-10 h-10 text-primary mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-cinzel font-bold text-text-primary mb-2">No Programs Found</h3>
            <p className="text-text-secondary text-sm font-light mb-6">
              There are currently no programs matching the selected filter category.
            </p>
            <button
              onClick={() => handleTabChange('all')}
              className="px-6 py-2.5 bg-primary text-background text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
            >
              View All Programs
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredPrograms.map((course) => {
                const mentor = getMentorDetails(course.mentorId);
                return (
                  <motion.div
                    key={course.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="group bg-card border border-border/30 hover:border-amber-400/50 rounded-3xl overflow-hidden flex flex-col justify-between h-full shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(212,175,55,0.2)]"
                  >
                    {/* Course Image Header */}
                    <div className="relative aspect-[16/10] bg-background overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent z-10 opacity-90" />
                      <SmartImage
                        src={course.image || '/gemstone-assets/logo.jpg'}
                        alt={course.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-85"
                      />

                      {/* Academy Profile Badge */}
                      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-card/90 border border-border/30 px-3 py-1.5 rounded-full backdrop-blur-md shadow-md">
                        <img
                          src={mentor.image}
                          alt={mentor.name}
                          className="w-5 h-5 rounded-full object-cover border border-primary/40"
                        />
                        <span className="text-[10px] font-bold text-text-primary tracking-wider uppercase">
                          {mentor.short}
                        </span>
                      </div>

                      {/* Featured Badge */}
                      {course.featured && (
                        <div className="absolute top-4 right-4 z-20">
                          <span className="bg-primary text-background text-[9px] uppercase tracking-widest font-extrabold px-3 py-1 rounded-full shadow-md">
                            Featured
                          </span>
                        </div>
                      )}

                      {/* Info Tags */}
                      <div className="absolute bottom-4 left-4 z-20 flex gap-2">
                        <span className="bg-card/90 border border-border/20 px-2.5 py-1 rounded-lg text-[9px] text-text-secondary tracking-wider flex items-center gap-1 backdrop-blur-md">
                          <Clock className="w-3 h-3 text-primary" />
                          <span>{course.duration || 'Flexible'}</span>
                        </span>
                        <span className="bg-card/90 border border-border/20 px-2.5 py-1 rounded-lg text-[9px] text-text-secondary tracking-wider flex items-center gap-1 backdrop-blur-md">
                          <BookOpen className="w-3 h-3 text-emerald-400" />
                          <span>Certification</span>
                        </span>
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold font-cinzel text-text-primary group-hover:text-primary transition-colors line-clamp-2">
                          {course.title}
                        </h3>
                        <p className="text-xs text-text-secondary line-clamp-3 font-sans font-light leading-relaxed">
                          {course.description || course.subtitle}
                        </p>
                      </div>

                      {/* Pricing & CTA */}
                      <div className="pt-4 border-t border-border/20 flex items-center justify-between gap-4">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-text-secondary block">Tuition Fee</span>
                          <div className="flex items-center gap-2">
                            {course.discountPrice ? (
                              <>
                                <span className="text-base font-extrabold text-primary">₹{course.discountPrice.toLocaleString()}</span>
                                <span className="text-xs text-text-secondary line-through">₹{course.price.toLocaleString()}</span>
                              </>
                            ) : (
                              <span className="text-base font-extrabold text-primary">₹{course.price.toLocaleString()}</span>
                            )}
                          </div>
                        </div>

                        <a
                          href={`${WHATSAPP_LINK}?text=I am interested in enrolling for the program: ${encodeURIComponent(course.title)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2.5 bg-primary hover:bg-primary/90 text-background text-xs font-extrabold tracking-wider uppercase rounded-xl transition-all duration-300 shadow-md flex items-center gap-1.5 cursor-pointer group-hover:scale-105"
                        >
                          <span>Enroll Now</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

      </div>
    </div>
  );
}
