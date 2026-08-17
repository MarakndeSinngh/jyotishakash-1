import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Clock, 
  BookOpen, 
  Award, 
  User, 
  ArrowUpRight, 
  CheckCircle2, 
  Star 
} from 'lucide-react';
import { useAcademy } from '../../context/AcademyContext';
import { WHATSAPP_LINK } from '../../constants/contacts';
import { useContentEngine } from '../../hooks/useContentEngine';
import SmartImage from './SmartImage';

export default function FeaturedCoursesHomepage() {
  const { switchAcademy } = useAcademy();
  const [selectedTab, setSelectedTab] = useState<string>('all');
  const { data, loading, error } = useContentEngine({ type: 'homepage' });

  const homepageData = data as any;
  const rawPrograms = homepageData?.featuredPrograms || [];
  const founder = homepageData?.founder;
  const facultyMembers = homepageData?.facultyMembers || [];

  const facultyTabs: { id: string; label: string }[] = [];
  if (founder && founder.active !== false) {
    facultyTabs.push({
      id: founder.id || 'raajeev',
      label: '👑 Founder'
    });
  }
  facultyMembers.forEach((f: any) => {
    if (f.active !== false && f.id !== (founder?.id || 'raajeev')) {
      let label = f.name;
      if (f.id === 'shaunak') label = 'Shaunak S. Patthak';
      else if (f.id === 'sannjoy') label = 'Sannjoy Biswass';
      facultyTabs.push({
        id: f.id,
        label
      });
    }
  });

  const tabs = [
    { id: 'all', label: 'All Programs' },
    ...facultyTabs
  ];

  useEffect(() => {
    if (selectedTab !== 'all' && !tabs.some(t => t.id === selectedTab)) {
      setSelectedTab('all');
    }
  }, [tabs, selectedTab]);

  const filteredRawPrograms = selectedTab === 'all' 
    ? rawPrograms 
    : rawPrograms.filter((p: any) => p.mentorId === selectedTab);

  const featuredPrograms = filteredRawPrograms.map((prog: any) => ({
    ...prog,
    academySlug: prog.mentorId || 'raajeev',
    academyShortName: prog.mentorId === 'shaunak' ? 'Shaunak Academy' : prog.mentorId === 'sannjoy' ? 'Sannjoy Academy' : 'LEO Academy',
    academyInstructor: prog.mentorId === 'shaunak' ? 'Shaunak S. Patthak' : prog.mentorId === 'sannjoy' ? 'Sannjoy Biswass' : 'Raajeev Singh Chauhann',
    academyProfileImage: prog.image || '/gemstone-assets/logo.jpg',
    difficulty: prog.difficulty || 'All Levels',
    format: prog.format || 'Live & Recorded',
    hasCertificate: prog.hasCertificate ?? true,
    badge: prog.badge || (prog.featured ? 'Featured' : undefined),
  }));

  const filteredCourses = featuredPrograms;

  return (
    <section id="featured-courses" className="relative py-24 sm:py-32 bg-background text-text-primary overflow-hidden z-10">
      
      {/* Background Decorative Element */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[30%] left-[5%] w-[450px] h-[450px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)]" />
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
            <span>Curated Masterclasses</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-cinzel tracking-tight text-text-primary"
          >
            LEO FAMILY Masterclasses
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary text-base sm:text-lg font-light leading-relaxed font-sans"
          >
            Explore flagship certifications offered across LEO Family via ContentEngine. Select an expert tab to filter programs.
          </motion.p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-16 max-w-3xl mx-auto">
          {tabs.map((tab) => {
            const isActive = selectedTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
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

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-20 bg-card/50 border border-border/30 rounded-3xl p-8 max-w-lg mx-auto">
            <Sparkles className="w-10 h-10 text-primary mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-cinzel font-bold text-text-primary mb-2">No Programs Available</h3>
            <p className="text-text-secondary text-sm font-light">
              There are currently no featured masterclasses matching this selection.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredCourses.map((course) => (
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
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-contain object-center transition-transform duration-700 group-hover:scale-105 bg-background"
                  />

                  {/* Academy Profile Badge */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-card/90 border border-border/30 px-3 py-1.5 rounded-full backdrop-blur-md shadow-md">
                    <img
                      src={course.academyProfileImage}
                      alt={course.academyInstructor}
                      className="w-5 h-5 rounded-full object-cover border border-primary/40"
                    />
                    <span className="text-[10px] font-bold text-text-primary tracking-wider uppercase">
                      {course.academyShortName}
                    </span>
                  </div>

                  {/* Course Badge */}
                  {course.badge && (
                    <div className="absolute top-4 right-4 z-20">
                      <span className="bg-primary text-background text-[9px] uppercase tracking-widest font-extrabold px-3 py-1 rounded-full shadow-md">
                        {course.badge}
                      </span>
                    </div>
                  )}

                  {/* Info Tags */}
                  <div className="absolute bottom-4 left-4 z-20 flex gap-2">
                    <span className="bg-card/90 border border-border/20 px-2.5 py-1 rounded-lg text-[9px] text-text-secondary tracking-wider flex items-center gap-1 backdrop-blur-md">
                      <Clock className="w-3 h-3 text-primary" />
                      <span>{course.duration}</span>
                    </span>
                    <span className="bg-card/90 border border-border/20 px-2.5 py-1 rounded-lg text-[9px] text-text-secondary tracking-wider flex items-center gap-1 backdrop-blur-md">
                      <BookOpen className="w-3 h-3 text-emerald-400" />
                      <span>{course.format}</span>
                    </span>
                  </div>
                </div>

                {/* Course Body */}
                <div className="p-6 text-left flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[10px] text-text-secondary tracking-wider font-bold uppercase">
                      <span>Level: {course.difficulty}</span>
                      {course.hasCertificate && (
                        <span className="text-emerald-400 flex items-center gap-1">
                          <Award className="w-3 h-3" /> Cert. Included
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold font-cinzel text-text-primary group-hover:text-primary transition-colors duration-300">
                      {course.title}
                    </h3>

                    <p className="text-text-secondary text-xs sm:text-sm font-light leading-relaxed line-clamp-3">
                      {course.description}
                    </p>
                  </div>

                  {/* Pricing and Action */}
                  <div className="pt-4 border-t border-border/15 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                        <User className="w-3.5 h-3.5 text-primary" />
                        <span className="text-[11px] font-medium">{course.academyInstructor}</span>
                      </div>
                      <span className="text-primary font-bold font-cinzel text-sm">{course.price ? `₹${course.price.toLocaleString()}` : "Inquire"}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <a
                        href={WHATSAPP_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-3 bg-primary hover:opacity-90 text-background font-extrabold uppercase tracking-wider text-[10px] rounded-xl transition-all text-center shadow-md cursor-pointer"
                      >
                        Enroll Now
                      </a>
                      <button
                        onClick={() => switchAcademy(course.academySlug)}
                        className="py-3 bg-background hover:bg-card border border-border/20 text-text-secondary hover:text-text-primary font-bold uppercase tracking-wider text-[10px] rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>View Programs</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            </AnimatePresence>
          </div>
        )}

      </div>
    </section>
  );
}
