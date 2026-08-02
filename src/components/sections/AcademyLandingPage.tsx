import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  GraduationCap, 
  BookOpen, 
  ChevronRight, 
  Clock, 
  Award, 
  User, 
  Users, 
  Globe,
  Star,
  HelpCircle,
  Video,
  Play,
  CheckCircle2, 
  ArrowRight, 
  ArrowUpRight, 
  MessageCircle,
  Mail,
  Phone,
  Calendar,
  ShieldCheck,
  ChevronDown,
  ArrowLeft
} from 'lucide-react';
import { useAcademy } from '../../context/AcademyContext';
import { useLanguage } from '../../context/LanguageContext';
import { WHATSAPP_LINK } from '../../constants/contacts';
import SmartImage from './SmartImage';
import AcademyNotFound from './AcademyNotFound';

interface AcademyLandingPageProps {
  navigate?: (path: string) => void;
}

export default function AcademyLandingPage({ navigate }: AcademyLandingPageProps) {
  const { activeAcademy, isNotFound, allAcademies, switchAcademy } = useAcademy();
  const { t } = useLanguage();

  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [openFaqId, setOpenFaqId] = useState<string | null>(activeAcademy?.faqs?.[0]?.id || null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  if (isNotFound || !activeAcademy) {
    return <AcademyNotFound />;
  }

  const whatsappUrl = activeAcademy.contactDetails?.whatsapp || WHATSAPP_LINK;
  const academyLogo = activeAcademy.branding?.logo || activeAcademy.assets?.profileImage;

  // Filter courses by selected difficulty
  const filteredCourses = activeAcademy.courses.filter(course => {
    if (selectedDifficulty === 'All') return true;
    return course.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
  });

  const handleNav = (path: string) => {
    if (navigate) {
      navigate(path);
    } else {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new Event('popstate'));
    }
  };

  return (
    <div className="min-h-screen bg-background text-text-primary font-sans relative overflow-hidden selection:bg-primary/30 selection:text-text-primary">
      
      {/* Dynamic Background Glow Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb,212,175,55),0.06)_0%,transparent_70%)] blur-2xl" />
        <div className="absolute top-[40%] right-[-10%] w-[650px] h-[650px] bg-[radial-gradient(circle_at_center,rgba(var(--secondary-rgb,16,185,129),0.04)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute bottom-[5%] left-[10%] w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb,212,175,55),0.05)_0%,transparent_70%)] blur-2xl" />
      </div>

      {/* TOP ACADEMY NAV & BREADCRUMB */}
      <div className="relative z-20 pt-24 pb-4 px-6 border-b border-border/10 bg-card/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          
          <button
            onClick={() => handleNav('/academy')}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-text-secondary hover:text-primary transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('nav.allAcademies', 'All Academies')}</span>
          </button>

          {/* Quick Switcher dropdown for other academies */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold text-text-secondary tracking-widest hidden sm:inline">
              Academy:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {allAcademies.map((ac) => {
                const isActive = ac.slug === activeAcademy.slug;
                return (
                  <button
                    key={ac.id}
                    onClick={() => {
                      switchAcademy(ac.slug);
                      handleNav(`/academy/${ac.slug}`);
                    }}
                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      isActive
                        ? 'bg-primary text-background font-extrabold shadow-md'
                        : 'bg-card hover:bg-surface text-text-secondary hover:text-text-primary border border-border/20'
                    }`}
                  >
                    {ac.shortName}
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>


      {/* ==================================================
          SECTION 1: ACADEMY HERO
          ================================================== */}
      <section className="relative z-10 py-16 lg:py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Instructor Badge & Language */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-[10px] font-bold uppercase tracking-[0.2em]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{activeAcademy.instructorTitle}</span>
              </span>

              {activeAcademy.language && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-card border border-border/20 text-text-secondary text-[10px] font-medium tracking-wider">
                  <Globe className="w-3 h-3 text-primary" />
                  <span>{activeAcademy.language}</span>
                </span>
              )}
            </div>

            {/* Academy Name */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-cinzel tracking-tight leading-[1.15] text-text-primary">
              {activeAcademy.name}
            </h1>

            {/* Tagline */}
            <p className="text-primary font-serif italic text-base sm:text-lg border-l-2 border-primary pl-4 py-1">
              "{activeAcademy.tagline}"
            </p>

            {/* Biography */}
            <p className="text-text-secondary text-sm sm:text-base font-light leading-relaxed max-w-2xl font-sans">
              {activeAcademy.instructorBio || activeAcademy.description}
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group px-7 py-4 bg-primary text-background font-extrabold uppercase tracking-wider text-xs rounded-xl shadow-xl hover:shadow-primary/25 transition-all hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{activeAcademy.hero?.ctaText || 'Book Personal Consultation'}</span>
              </a>

              <a
                href="#courses"
                className="px-7 py-4 bg-card hover:bg-surface border border-border/20 hover:border-primary/40 text-text-primary font-bold uppercase tracking-wider text-xs rounded-xl transition-all hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
              >
                <span>{activeAcademy.hero?.secondaryCtaText || 'Explore Courses'}</span>
                <ChevronRight className="w-4 h-4 text-primary" />
              </a>
            </div>
          </motion.div>

          {/* Hero Right Image Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-primary/5 to-transparent rounded-[2.5rem] transform rotate-3 scale-105 blur-xl -z-10" />
              
              <div className="bg-card border border-primary/25 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-6 border border-border/20">
                  <SmartImage
                    src={activeAcademy.assets?.profileImage || activeAcademy.assets?.founderPortrait}
                    alt={activeAcademy.instructorName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-left text-white">
                    <h3 className="text-lg font-bold font-cinzel">{activeAcademy.instructorName}</h3>
                    <p className="text-[10px] uppercase tracking-wider text-amber-300 font-sans font-semibold">
                      {activeAcademy.instructorTitle}
                    </p>
                  </div>
                </div>

                {/* Quick Info Bar */}
                <div className="flex items-center justify-between text-xs text-text-secondary pt-2 border-t border-border/10">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Certified Masterclass</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400 font-bold font-cinzel">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>4.9 / 5 Rating</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>


      {/* ==================================================
          SECTION 2: ACHIEVEMENTS (STATS)
          ================================================== */}
      {activeAcademy.stats && activeAcademy.stats.length > 0 && (
        <section className="relative z-10 py-12 px-6 border-y border-border/10 bg-card/40 backdrop-blur-md">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {activeAcademy.stats.map((st, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="p-6 rounded-2xl bg-card/60 border border-border/10 hover:border-primary/25 transition-all"
                >
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-cinzel text-primary block mb-1">
                    {st.value}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-text-primary block mb-1 font-cinzel">
                    {st.label}
                  </span>
                  <span className="text-[10px] text-text-secondary block font-sans">
                    {st.desc}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* ==================================================
          SECTION 3: WHY LEARN FROM THIS INSTRUCTOR
          ================================================== */}
      {activeAcademy.whyChooseUs && activeAcademy.whyChooseUs.length > 0 && (
        <section className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary block mb-2">
              ACADEMIC ADVANTAGE
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-cinzel text-text-primary">
              Why Learn With {activeAcademy.instructorName}
            </h2>
            <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activeAcademy.whyChooseUs.map((feat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-card border border-border/15 hover:border-primary/30 p-6 rounded-2xl text-left transition-all duration-300 shadow-lg hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold font-cinzel text-text-primary mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-text-secondary text-xs font-light leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}


      {/* ==================================================
          SECTION 4: FEATURED COURSES
          ================================================== */}
      <section id="courses" className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 pb-4 border-b border-border/10">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary block mb-2">
              CURRICULUM CATALOG
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-cinzel text-text-primary">
              Featured Courses & Masterclasses
            </h2>
          </div>

          {/* Difficulty Filter */}
          <div className="flex bg-card border border-border/20 p-1 rounded-xl">
            {['All', 'Beginner', 'Intermediate', 'Advanced'].map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedDifficulty === diff 
                    ? 'bg-primary text-background font-extrabold shadow-md' 
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course) => (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group bg-card border border-border/15 hover:border-primary/30 rounded-2xl overflow-hidden flex flex-col justify-between h-full shadow-xl transition-all duration-300"
              >
                {/* Course Banner */}
                <div className="relative aspect-[4/3] bg-background overflow-hidden">
                  <SmartImage
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-90" />

                  {course.badge && (
                    <div className="absolute top-4 left-4 z-20">
                      <span className="bg-primary text-background text-[9px] uppercase tracking-widest font-extrabold px-3 py-1 rounded-full shadow-md">
                        {course.badge}
                      </span>
                    </div>
                  )}

                  <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-center text-[10px] text-white">
                    <span className="bg-black/60 backdrop-blur-md border border-white/20 px-2.5 py-1 rounded flex items-center gap-1 font-medium">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>{course.duration}</span>
                    </span>
                    <span className="bg-black/60 backdrop-blur-md border border-white/20 px-2.5 py-1 rounded flex items-center gap-1 font-medium">
                      <BookOpen className="w-3 h-3 text-emerald-400" />
                      <span>{course.format}</span>
                    </span>
                  </div>
                </div>

                {/* Course Info */}
                <div className="p-6 text-left flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] text-text-secondary tracking-wider font-bold uppercase">
                      <span>Level: {course.difficulty}</span>
                      {course.hasCertificate && <span className="text-emerald-500">Cert. Included</span>}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold font-cinzel text-text-primary group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>

                    <p className="text-text-secondary text-xs font-light leading-relaxed line-clamp-3">
                      {course.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-text-secondary">{course.instructor}</span>
                      <span className="text-primary font-bold font-cinzel text-xs">{course.price || "Inquire"}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 bg-primary hover:opacity-90 text-background font-extrabold uppercase tracking-wider text-[9px] rounded-lg transition-all text-center shadow-md cursor-pointer"
                      >
                        Enroll Now
                      </a>
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 bg-background hover:bg-card border border-border/20 text-text-secondary hover:text-text-primary font-bold uppercase tracking-wider text-[9px] rounded-lg transition-all text-center flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>Details</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>


      {/* ==================================================
          SECTION 5: STUDENT SUCCESS STORIES
          ================================================== */}
      {activeAcademy.testimonials && activeAcademy.testimonials.length > 0 && (
        <section className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary block mb-2">
              ALUMNI TESTIMONIALS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-cinzel text-text-primary">
              Student Success Stories
            </h2>
            <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activeAcademy.testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-card border border-border/15 p-8 rounded-2xl flex flex-col justify-between text-left shadow-xl hover:border-primary/25 transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating || 5)].map((_, r) => (
                      <Star key={r} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-text-secondary text-xs sm:text-sm italic font-light leading-relaxed">
                    "{t.content}"
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-border/10 flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-primary/30" />
                  <div>
                    <h4 className="text-xs font-bold font-cinzel text-text-primary">{t.name}</h4>
                    <span className="text-[10px] text-text-secondary block font-sans">{t.role}</span>
                    {t.courseTitle && <span className="text-[9px] text-primary block font-medium">{t.courseTitle}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}


      {/* ==================================================
          SECTION 6: VIDEO INTRODUCTION
          ================================================== */}
      <section className="relative z-10 py-20 px-6 max-w-5xl mx-auto">
        <div className="bg-card border border-primary/20 rounded-[2.5rem] p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="max-w-3xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em]">
              <Video className="w-3.5 h-3.5" />
              <span>Video Introduction</span>
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-cinzel text-text-primary">
              Discover the Vision & Science of {activeAcademy.instructorName}
            </h2>

            {/* Video Poster Thumbnail with Play trigger */}
            <div className="relative aspect-video max-w-2xl mx-auto rounded-2xl overflow-hidden border border-border/20 shadow-2xl group cursor-pointer" onClick={() => setIsVideoModalOpen(true)}>
              <SmartImage
                src={activeAcademy.assets?.videoPlayerPoster || activeAcademy.assets?.heroImage || activeAcademy.assets?.profileImage}
                alt="Video Introduction"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary text-background flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 fill-background ml-1" />
                </div>
              </div>
            </div>

            <p className="text-text-secondary text-xs sm:text-sm font-light max-w-xl mx-auto">
              Watch this comprehensive introduction to understand how our certified masterclasses transform theoretical knowledge into life-changing mastery.
            </p>
          </div>
        </div>
      </section>

      {/* Video Modal Preview */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <div className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-card border border-primary/30 rounded-2xl p-6 max-w-3xl w-full text-center relative shadow-2xl"
            >
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 text-text-secondary hover:text-text-primary font-bold text-lg cursor-pointer"
              >
                ✕
              </button>
              <h3 className="text-lg font-bold font-cinzel text-text-primary mb-4">
                {activeAcademy.instructorName} - Masterclass Preview
              </h3>
              <div className="aspect-video bg-black rounded-xl overflow-hidden flex items-center justify-center">
                <SmartImage
                  src={activeAcademy.assets?.videoPlayerPoster || activeAcademy.assets?.heroImage}
                  alt="Video Stream"
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
              <p className="text-xs text-text-secondary mt-4">
                Connect on WhatsApp to watch full live masterclass recordings and session highlights.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


      {/* ==================================================
          SECTION 7: FAQ
          ================================================== */}
      {activeAcademy.faqs && activeAcademy.faqs.length > 0 && (
        <section className="relative z-10 py-20 px-6 max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary block mb-2">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-cinzel text-text-primary">
              Questions About {activeAcademy.shortName}
            </h2>
            <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4" />
          </div>

          <div className="space-y-4 text-left">
            {activeAcademy.faqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-card border border-border/15 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold font-cinzel text-text-primary hover:text-primary transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-3 text-sm sm:text-base">
                      <HelpCircle className="w-4 h-4 text-primary shrink-0" />
                      <span>{faq.question}</span>
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-primary' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 pt-0 text-xs sm:text-sm text-text-secondary font-light leading-relaxed border-t border-border/10">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>
      )}


      {/* ==================================================
          SECTION 8: BOOK CONSULTATION
          ================================================== */}
      <section className="relative z-10 py-20 px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-b from-card via-background to-card border border-primary/30 rounded-[3rem] p-8 sm:p-12 lg:p-16 text-center relative overflow-hidden shadow-2xl"
        >
          <div className="relative z-10 space-y-6 max-w-3xl mx-auto">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-primary bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full inline-block">
              {activeAcademy.shortName} Consultation & Guidance
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-cinzel text-text-primary leading-tight">
              Ready to Begin Your Transformation with {activeAcademy.instructorName}?
            </h2>

            <p className="text-text-secondary text-sm sm:text-base font-light leading-relaxed">
              Schedule a private personal consultation or reserve your seat in the upcoming masterclass batch. Reach out directly via WhatsApp or phone.
            </p>

            {/* Direct Contact Options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 text-left max-w-2xl mx-auto">
              {activeAcademy.contactDetails?.phone && (
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-card border border-border/15">
                  <Phone className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-text-secondary block">Call Directly</span>
                    <span className="text-xs font-bold text-text-primary">{activeAcademy.contactDetails.phone}</span>
                  </div>
                </div>
              )}

              {activeAcademy.contactDetails?.email && (
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-card border border-border/15">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-text-secondary block">Email Support</span>
                    <span className="text-xs font-bold text-text-primary truncate">{activeAcademy.contactDetails.email}</span>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-card border border-border/15">
                <MessageCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-text-secondary block">WhatsApp Support</span>
                  <span className="text-xs font-bold text-text-primary">Instant Response</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-primary text-background font-extrabold uppercase tracking-wider text-xs rounded-xl shadow-xl hover:shadow-primary/25 transition-all hover:-translate-y-0.5 text-center cursor-pointer"
              >
                Book Consultation on WhatsApp
              </a>
              <a
                href="#courses"
                className="px-8 py-4 bg-card hover:bg-surface border border-border/20 text-text-primary font-bold uppercase tracking-wider text-xs rounded-xl transition-all hover:-translate-y-0.5 text-center cursor-pointer"
              >
                View Masterclass Schedule
              </a>
            </div>
          </div>
        </motion.div>
      </section>


      {/* ==================================================
          SECTION 9: ACADEMY FOOTER
          ================================================== */}
      <footer className="relative z-10 bg-card/90 border-t border-border/20 pt-16 pb-12 px-6 backdrop-blur-md">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-border/10 text-left">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              {academyLogo && (
                <img
                  src={academyLogo}
                  alt={activeAcademy.name}
                  className="w-10 h-10 rounded-full object-cover border border-primary/40"
                />
              )}
              <div>
                <h3 className="font-bold font-cinzel text-base text-text-primary">{activeAcademy.name}</h3>
                <span className="text-[10px] uppercase tracking-wider text-primary font-bold block">{activeAcademy.instructorTitle}</span>
              </div>
            </div>

            <p className="text-text-secondary text-xs font-light leading-relaxed max-w-md">
              {activeAcademy.description}
            </p>

            {/* Social Links */}
            {activeAcademy.socialLinks && (
              <div className="flex items-center gap-3 pt-2">
                {activeAcademy.socialLinks.youtube && (
                  <a href={activeAcademy.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-background hover:bg-primary/10 text-text-secondary hover:text-primary transition-colors">
                    YouTube
                  </a>
                )}
                {activeAcademy.socialLinks.facebook && (
                  <a href={activeAcademy.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-background hover:bg-primary/10 text-text-secondary hover:text-primary transition-colors">
                    Facebook
                  </a>
                )}
                {activeAcademy.socialLinks.instagram && (
                  <a href={activeAcademy.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-background hover:bg-primary/10 text-text-secondary hover:text-primary transition-colors">
                    Instagram
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-text-primary font-cinzel">Navigation</h4>
            <ul className="space-y-2 text-xs text-text-secondary">
              <li><a href="#courses" className="hover:text-primary transition-colors">Courses & Masterclasses</a></li>
              <li><button onClick={() => handleNav('/academy')} className="hover:text-primary transition-colors">Multi-Academy Directory</button></li>
              <li><button onClick={() => handleNav('/')} className="hover:text-primary transition-colors">LEO Family Home</button></li>
              <li><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Book Consultation</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-text-primary font-cinzel">Contact Info</h4>
            <ul className="space-y-2 text-xs text-text-secondary">
              {activeAcademy.contactDetails?.phone && (
                <li>Phone: <span className="text-text-primary font-medium">{activeAcademy.contactDetails.phone}</span></li>
              )}
              {activeAcademy.contactDetails?.email && (
                <li>Email: <span className="text-text-primary font-medium">{activeAcademy.contactDetails.email}</span></li>
              )}
              {activeAcademy.contactDetails?.address && (
                <li>Location: <span className="text-text-primary font-medium">{activeAcademy.contactDetails.address}</span></li>
              )}
              <li>Language: <span className="text-text-primary font-medium">{activeAcademy.language}</span></li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-text-secondary gap-4">
          <p>© {new Date().getFullYear()} {activeAcademy.name}. All rights reserved.</p>
          <button
            onClick={() => handleNav('/')}
            className="hover:text-primary transition-colors cursor-pointer font-medium"
          >
            Powered by LEO Family Network
          </button>
        </div>
      </footer>

    </div>
  );
}
