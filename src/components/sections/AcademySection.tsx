import React, { useState, useEffect } from 'react';
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
  Calendar, 
  Cpu, 
  ArrowRight, 
  Compass, 
  ArrowUpRight, 
  Download, 
  Check, 
  CheckCircle2, 
  Globe,
  Star,
  HelpCircle,
  Video,
  Layers,
  Zap
} from 'lucide-react';
import { Course, UpcomingEvent, FreeResource } from '../../types/academy';
import { WHATSAPP_LINK } from '../../constants/contacts';
import SmartImage from './SmartImage';
import { useAcademy } from '../../context/AcademyContext';
import { useLanguage } from '../../context/LanguageContext';
import AcademyNotFound from './AcademyNotFound';

interface AcademySectionProps {
  initialSlug?: string;
}

// 🔢 COUNTDOWN TIMER COMPONENT
const CountdownTimer: React.FC<{ targetDate: string }> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference <= 0) return null;
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) {
    return <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider">Live Session Active</span>;
  }

  return (
    <div className="flex gap-1 items-center bg-zinc-900/60 border border-white/5 rounded-lg p-1 px-1.5 backdrop-blur-md">
      <div className="flex items-center gap-0.5">
        <span className="font-mono text-[11px] font-bold text-amber-400">{timeLeft.days.toString().padStart(2, '0')}</span>
        <span className="text-[8px] text-zinc-500 uppercase">d</span>
      </div>
      <span className="text-zinc-600 text-xs">:</span>
      <div className="flex items-center gap-0.5">
        <span className="font-mono text-[11px] font-bold text-amber-400">{timeLeft.hours.toString().padStart(2, '0')}</span>
        <span className="text-[8px] text-zinc-500 uppercase">h</span>
      </div>
      <span className="text-zinc-600 text-xs">:</span>
      <div className="flex items-center gap-0.5">
        <span className="font-mono text-[11px] font-bold text-amber-400">{timeLeft.minutes.toString().padStart(2, '0')}</span>
        <span className="text-[8px] text-zinc-500 uppercase">m</span>
      </div>
      <span className="text-zinc-600 text-xs">:</span>
      <div className="flex items-center gap-0.5">
        <span className="font-mono text-[11px] font-bold text-amber-400">{timeLeft.seconds.toString().padStart(2, '0')}</span>
        <span className="text-[8px] text-zinc-500 uppercase">s</span>
      </div>
    </div>
  );
};

export default function AcademySection({ initialSlug }: AcademySectionProps) {
  const { activeAcademy: academyConfig, activeSlug, allAcademies, switchAcademy, isNotFound } = useAcademy();
  const { t } = useLanguage();

  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistName, setWaitlistName] = useState('');
  const [waitlistSuccess, setWaitlistSuccess] = useState(false);
  const [activeRoadmapStep, setActiveRoadmapStep] = useState<number>(0);

  // If the requested route in the URL does not exist, show Fallback
  if (isNotFound) {
    return <AcademyNotFound />;
  }

  const handleSelectAcademy = (slug: string) => {
    switchAcademy(slug);
  };

  // Filter Courses for active academy
  const filteredCourses = academyConfig.courses.filter(course => {
    const diffMatch = selectedDifficulty === 'All' || course.difficulty === selectedDifficulty;
    
    let catMatch = true;
    if (selectedCategory === 'Numerology') {
      catMatch = course.title.toLowerCase().includes('numerology') || course.description.toLowerCase().includes('numerology');
    } else if (selectedCategory === 'Vastu & Astro') {
      catMatch = course.title.toLowerCase().includes('vastu') || course.title.toLowerCase().includes('astrology') || course.title.toLowerCase().includes('astro');
    }

    return diffMatch && catMatch;
  });

  const handleJoinWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail || !waitlistName) return;
    setWaitlistSuccess(true);
    setTimeout(() => {
      setWaitlistEmail('');
      setWaitlistName('');
      setWaitlistSuccess(false);
    }, 4000);
  };

  return (
    <section id="academy" className="relative bg-background text-text-primary py-24 sm:py-32 overflow-hidden z-10 font-sans selection:bg-primary/30 selection:text-text-primary">
      
      {/* 🌌 AMBIENT COSMIC BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[5%] left-[10%] w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb,212,175,55),0.03)_0%,transparent_70%)]" />
        <div className="absolute top-[40%] right-[5%] w-[550px] h-[550px] bg-[radial-gradient(circle_at_center,rgba(var(--secondary-rgb,16,185,129),0.02)_0%,transparent_70%)]" />
        <div className="absolute bottom-[10%] left-[5%] w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb,212,175,55),0.025)_0%,transparent_70%)] animate-pulse" />
      </div>

      <div className="container mx-auto px-6 relative z-10">

        {/* ==================================================
            ACADEMY SELECTOR HEADER SWITCHER (Multi-Academy Engine)
            ================================================== */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/25 px-4 py-1.5 rounded-full mb-6"
          >
            <GraduationCap className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-primary">
              Multi-Academy Learning Hub
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-cinzel tracking-tight leading-tight mb-6">
            Choose Your Academy & Mentor
          </h2>

          <p className="text-text-secondary text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto mb-8">
            Select an academy below to explore specialized curriculums, masterclasses, certified roadmaps, and personal mentor guidance.
          </p>

          {/* Dynamic Academy Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 p-2 bg-card/60 border border-border/30 rounded-2xl backdrop-blur-md max-w-3xl mx-auto shadow-xl">
            {allAcademies.map((academy) => {
              const isSelected = academy.slug === activeSlug;
              return (
                <button
                  key={academy.id}
                  onClick={() => handleSelectAcademy(academy.slug)}
                  className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-primary text-background shadow-lg scale-[1.02]'
                      : 'bg-background/80 hover:bg-card text-text-secondary hover:text-text-primary border border-border/20'
                  }`}
                >
                  <img
                    src={academy.assets.profileImage}
                    alt={academy.instructorName}
                    className="w-6 h-6 rounded-full object-cover border border-white/30"
                  />
                  <span>
                    {academy.slug === 'raajeev' ? '👑 ' : '🎓 '}
                    {academy.shortName}
                  </span>
                </button>
              );
            })}
          </div>
        </div>


        {/* ==================================================
            INSTRUCTOR SHOWCASE BANNER
            ================================================== */}
        <AnimatePresence mode="wait">
          <motion.div
            key={academyConfig.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto bg-card border border-primary/20 rounded-[2.5rem] p-8 md:p-12 mb-20 shadow-2xl relative overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Left: Instructor Avatar / Portrait */}
              <div className="md:col-span-4 flex flex-col items-center text-center">
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full p-1.5 bg-gradient-to-tr from-primary via-amber-400 to-primary shadow-2xl overflow-hidden mb-4">
                  <SmartImage
                    src={academyConfig.assets.profileImage}
                    alt={academyConfig.instructorName}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary bg-primary/10 px-3.5 py-1.5 rounded-full border border-primary/20 shadow-sm flex items-center gap-1.5 mt-2">
                  <Globe className="w-3 h-3" />
                  <span>{t('common.teachingLanguage', 'Teaching Language')}: {academyConfig.language}</span>
                </span>
              </div>

              {/* Right: Academy Info */}
              <div className="md:col-span-8 text-left space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
                    {academyConfig.instructorTitle}
                  </span>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-cinzel text-text-primary">
                    {academyConfig.name}
                  </h3>
                </div>

                <p className="text-text-secondary text-sm md:text-base leading-relaxed font-light">
                  {academyConfig.description}
                </p>

                <p className="text-xs font-serif italic text-primary/90 border-l-2 border-primary pl-3 py-1">
                  "{academyConfig.tagline}"
                </p>

                {/* Stats row */}
                {academyConfig.stats && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-border/15">
                    {academyConfig.stats.map((st, i) => (
                      <div key={i} className="text-left">
                        <span className="text-lg font-bold font-cinzel text-primary block">{st.value}</span>
                        <span className="text-[9px] uppercase tracking-wider font-bold text-text-primary block">{st.label}</span>
                        <span className="text-[8px] text-text-secondary block">{st.desc}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </motion.div>
        </AnimatePresence>


        {/* ==================================================
            PART 1 — LEARNING ROADMAP (Horizontal Timeline)
            ================================================== */}
        <div className="mb-28 sm:mb-36">
          <div className="text-center mb-12">
            <span className="text-[9px] uppercase tracking-[0.3em] text-text-secondary font-cinzel block mb-2">
              CURRICULUM ARCHITECTURE
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-text-primary">
              The Path to Sovereignty
            </h3>
            <div className="w-16 h-[1px] bg-primary/30 mx-auto mt-3" />
          </div>

          <div className="relative max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 relative z-10">
              {academyConfig.learningRoadmap.map((item, idx) => {
                const isActive = idx === activeRoadmapStep;
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setActiveRoadmapStep(idx)}
                    onClick={() => setActiveRoadmapStep(idx)}
                    className="cursor-pointer"
                  >
                    <motion.div
                      whileHover={{ y: -5 }}
                      className={`h-full bg-card p-6 rounded-2xl border transition-all duration-300 text-left flex flex-col justify-between ${
                        isActive 
                          ? 'border-primary/40 shadow-[0_10px_20px_rgba(var(--primary-rgb),0.03)] bg-card/95' 
                          : 'border-border/10 bg-card/40 hover:border-border/25'
                      }`}
                    >
                      <div>
                        {/* Step Circle */}
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs font-cinzel mb-5 transition-all duration-300 ${
                          isActive 
                            ? 'bg-primary text-background shadow-md shadow-primary/20' 
                            : 'bg-background text-text-secondary'
                        }`}>
                          {item.step}
                        </div>

                        <h4 className={`text-sm font-bold uppercase tracking-wider mb-2 font-cinzel transition-colors ${
                          isActive ? 'text-primary' : 'text-text-primary'
                        }`}>
                          {item.title}
                        </h4>

                        <p className="text-text-secondary text-xs font-light leading-relaxed">
                          {item.desc}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-border/10 flex justify-end">
                        <ChevronRight className={`w-3.5 h-3.5 transition-all ${
                          isActive ? 'text-primary translate-x-1' : 'text-text-secondary/40'
                        }`} />
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>


        {/* ==================================================
            PART 2 — FEATURED COURSES
            ================================================== */}
        <div className="mb-28 sm:mb-36">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 pb-4 border-b border-border/10 max-w-6xl mx-auto">
            <div>
              <span className="text-[9px] uppercase tracking-widest text-primary font-bold block mb-1">
                {academyConfig.shortName} CATALOG
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-text-primary">
                Masterclasses & Courses
              </h3>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap gap-2.5">
              <div className="flex bg-background border border-border/10 p-1 rounded-xl">
                {['All', 'Numerology', 'Vastu & Astro'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      selectedCategory === cat 
                        ? 'bg-primary text-background font-extrabold' 
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="flex bg-background border border-border/10 p-1 rounded-xl">
                {['All', 'Beginner', 'Intermediate', 'Advanced'].map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      selectedDifficulty === diff 
                        ? 'bg-primary text-background font-extrabold' 
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <AnimatePresence mode="popLayout">
              {filteredCourses.map((course) => (
                <motion.div
                  key={course.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="group bg-card border border-border/10 hover:border-primary/30 rounded-2xl overflow-hidden flex flex-col justify-between h-full shadow-2xl transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] bg-background overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent z-10 opacity-90" />
                    <SmartImage
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                    />

                    {course.badge && (
                      <div className="absolute top-4 left-4 z-20">
                        <span className="bg-primary text-background text-[9px] uppercase tracking-widest font-extrabold px-3 py-1 rounded-full shadow-md">
                          {course.badge}
                        </span>
                      </div>
                    )}

                    <div className="absolute bottom-4 left-4 z-20 flex gap-2">
                      <span className="bg-card/90 border border-border/20 px-2.5 py-0.5 rounded text-[9px] text-text-secondary tracking-wider flex items-center gap-1 backdrop-blur-md">
                        <Clock className="w-2.5 h-2.5 text-primary" />
                        <span>{course.duration}</span>
                      </span>
                      <span className="bg-card/90 border border-border/20 px-2.5 py-0.5 rounded text-[9px] text-text-secondary tracking-wider flex items-center gap-1 backdrop-blur-md">
                        <BookOpen className="w-2.5 h-2.5 text-emerald-500" />
                        <span>{course.format}</span>
                      </span>
                    </div>
                  </div>

                  <div className="p-6 text-left flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[10px] text-text-secondary tracking-wider font-bold uppercase">
                        <span>Level: {course.difficulty}</span>
                        {course.hasCertificate && <span className="text-emerald-500">Cert. Included</span>}
                      </div>

                      <h4 className="text-base sm:text-lg font-bold font-cinzel text-text-primary group-hover:text-primary transition-colors">
                        {course.title}
                      </h4>

                      <p className="text-text-secondary text-xs font-light leading-relaxed line-clamp-3">
                        {course.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-border/10 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                          <User className="w-3.5 h-3.5 text-text-secondary/60" />
                          <span className="text-[10px]">{course.instructor}</span>
                        </div>
                        <span className="text-primary font-bold font-cinzel text-xs">{course.price || "Inquire"}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <a
                          href={WHATSAPP_LINK}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2.5 bg-primary hover:opacity-90 text-background font-extrabold uppercase tracking-wider text-[9px] rounded-lg transition-all text-center shadow-md cursor-pointer"
                        >
                          Enroll Now
                        </a>
                        <a
                          href={WHATSAPP_LINK}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2.5 bg-background hover:bg-card border border-border/15 text-text-secondary hover:text-text-primary font-bold uppercase tracking-wider text-[9px] rounded-lg transition-all text-center flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>Learn More</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>


        {/* ==================================================
            PART 3 — WHY CHOOSE US
            ================================================== */}
        <div className="mb-28 sm:mb-36">
          <div className="text-center mb-16">
            <span className="text-[9px] uppercase tracking-[0.3em] text-text-secondary font-cinzel block mb-2">
              ACADEMIC ADVANTAGE
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-cinzel text-text-primary">
              Why Learn With {academyConfig.instructorName}
            </h3>
            <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {academyConfig.whyChooseUs.map((feat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="bg-card/40 border border-border/10 hover:border-primary/20 p-6 rounded-2xl text-left transition-all duration-300 flex items-start gap-4"
              >
                <div className="w-9 h-9 rounded-xl bg-primary/5 border border-primary/20 flex items-center justify-center text-primary shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-text-primary mb-2 font-cinzel tracking-wide">
                    {feat.title}
                  </h4>
                  <p className="text-text-secondary text-xs font-light leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>


        {/* ==================================================
            PART 4 — TESTIMONIALS & REVIEWS
            ================================================== */}
        <div className="mb-28 sm:mb-36">
          <div className="text-center mb-16">
            <span className="text-[9px] uppercase tracking-[0.3em] text-primary font-cinzel block mb-2">
              STUDENT TRUST
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-cinzel text-text-primary">
              Alumnus Transformations
            </h3>
            <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {academyConfig.testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-card border border-border/15 p-8 rounded-2xl flex flex-col justify-between text-left shadow-xl"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-primary">
                    {[...Array(t.rating)].map((_, r) => (
                      <Star key={r} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-text-secondary text-xs sm:text-sm italic font-light leading-relaxed">
                    "{t.content}"
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-border/10 flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-primary/30" />
                  <div className="text-left">
                    <h5 className="text-xs font-bold font-cinzel text-text-primary">{t.name}</h5>
                    <span className="text-[10px] text-text-secondary block">{t.role}</span>
                    {t.courseTitle && <span className="text-[9px] text-primary block">{t.courseTitle}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* ==================================================
            PART 5 — UPCOMING LIVE SESSIONS
            ================================================== */}
        {academyConfig.events && academyConfig.events.length > 0 && (
          <div className="mb-28 sm:mb-36">
            <div className="text-center mb-12">
              <span className="text-[9px] uppercase tracking-[0.3em] text-text-secondary font-cinzel block mb-2">
                SYNCHRONOUS MASTERCLASSES
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-text-primary">
                Upcoming Live Sessions
              </h3>
              <div className="w-16 h-[1px] bg-primary/30 mx-auto mt-3" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {academyConfig.events.map((event) => (
                <div
                  key={event.id}
                  className="group relative bg-card border border-border/10 hover:border-primary/25 p-8 rounded-2xl flex flex-col justify-between text-left transition-all duration-300 shadow-xl"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="text-xs text-text-secondary font-cinzel font-bold">{event.date}</span>
                    </div>
                    <CountdownTimer targetDate={event.countdownTarget} />
                  </div>

                  <div className="space-y-3">
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-text-secondary/60 group-hover:text-primary transition-colors">
                      SPEAKER: {event.speaker}
                    </span>
                    <h4 className="text-lg font-bold font-cinzel text-text-primary group-hover:text-primary transition-colors">
                      {event.topic}
                    </h4>
                    <div className="flex items-center gap-1.5 pt-1">
                      <span className="text-[10px] text-text-secondary">Timing:</span>
                      <span className="text-[10px] text-text-primary font-medium">{event.time}</span>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-border/10 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-text-secondary uppercase tracking-wider block">Seats Available</span>
                      <span className="text-sm font-bold font-cinzel text-red-500 animate-pulse">
                        Only {event.seatsAvailable} left / {event.totalSeats} Total
                      </span>
                    </div>
                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 bg-primary hover:opacity-90 text-background text-[10px] uppercase tracking-wider font-extrabold px-4 py-2.5 rounded-lg transition-all shadow-md cursor-pointer"
                    >
                      <span>Register</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}


        {/* ==================================================
            PART 6 — FAQS
            ================================================== */}
        <div className="mb-28 sm:mb-36 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[9px] uppercase tracking-[0.3em] text-text-secondary font-cinzel block mb-2">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-cinzel text-text-primary">
              Questions About {academyConfig.shortName}
            </h3>
            <div className="w-16 h-[1px] bg-primary/30 mx-auto mt-3" />
          </div>

          <div className="space-y-4 text-left">
            {academyConfig.faqs.map((faq) => (
              <div key={faq.id} className="p-6 bg-card border border-border/15 rounded-2xl space-y-2">
                <h4 className="text-sm sm:text-base font-bold font-cinzel text-text-primary flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-primary shrink-0" />
                  <span>{faq.question}</span>
                </h4>
                <p className="text-xs sm:text-sm text-text-secondary font-light leading-relaxed pl-6">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>


        {/* ==================================================
            PART 7 — FREE RESOURCES
            ================================================== */}
        {academyConfig.freeResources && academyConfig.freeResources.length > 0 && (
          <div className="mb-28 sm:mb-36">
            <div className="text-center mb-16">
              <span className="text-[9px] uppercase tracking-[0.3em] text-text-secondary font-cinzel block mb-2">
                KNOWLEDGE HANDBOOKS
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-cinzel text-text-primary">
                Free Study Resources
              </h3>
              <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {academyConfig.freeResources.map((resource) => (
                <div
                  key={resource.id}
                  className="group bg-card border border-border/10 hover:border-primary/20 rounded-2xl overflow-hidden flex flex-col justify-between text-left transition-all duration-300 shadow-xl"
                >
                  <div className="relative aspect-video bg-background overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent z-10 opacity-80" />
                    <SmartImage
                      src={resource.image}
                      alt={resource.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                    />
                    <span className="absolute top-4 right-4 z-20 bg-background/90 border border-border/10 px-2.5 py-1 rounded-full text-[9px] text-primary font-bold uppercase tracking-widest">
                      {resource.type}
                    </span>
                  </div>

                  <div className="p-6 space-y-4">
                    <h4 className="text-base font-bold font-cinzel text-text-primary group-hover:text-primary transition-colors">
                      {resource.title}
                    </h4>
                    <p className="text-text-secondary text-xs font-light leading-relaxed min-h-[40px]">
                      {resource.description}
                    </p>
                    
                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 bg-background hover:bg-card text-text-secondary hover:text-text-primary font-bold uppercase tracking-wider text-[10px] rounded-lg transition-all cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-primary" />
                      <span>Download Resource</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}


        {/* ==================================================
            PART 8 — AI LEARNING ASSISTANT (Waitlist)
            ================================================== */}
        <div className="mb-28 sm:mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-r from-card via-background to-card border border-primary/30 rounded-[3rem] p-8 sm:p-12 lg:p-16 overflow-hidden max-w-4xl mx-auto shadow-2xl"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-primary/5 blur-[90px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
              
              <div className="lg:col-span-7 space-y-5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="bg-primary/10 border border-primary/30 px-3 py-1 rounded-full text-[9px] uppercase tracking-[0.2em] font-bold text-primary">
                    Coming Soon
                  </span>
                  <span className="bg-secondary/10 border border-secondary/30 px-3 py-1 rounded-full text-[9px] uppercase tracking-[0.2em] font-bold text-secondary flex items-center gap-1">
                    <Cpu className="w-3 h-3" />
                    <span>AI Companion</span>
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-cinzel text-text-primary leading-tight">
                  Meet Your AI Learning Companion
                </h3>

                <p className="text-text-secondary text-xs sm:text-sm leading-relaxed font-light">
                  Ask complex planetary questions, calculate grids, revise formulas, and receive personalized explanations with the {academyConfig.shortName} AI Companion.
                </p>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-2 text-xs text-text-secondary">
                  {[
                    "Ask Questions Live",
                    "Practical Exercises",
                    "Lesson Summaries",
                    "Revision Mode",
                    "Personalized Guidance",
                    "Grid Solvers"
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-1.5 font-sans">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 bg-card border border-border/10 p-6 sm:p-8 rounded-[2rem] shadow-2xl relative z-10">
                <AnimatePresence mode="wait">
                  {!waitlistSuccess ? (
                    <motion.form
                      key="form"
                      onSubmit={handleJoinWaitlist}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <h4 className="text-sm font-bold font-cinzel text-text-primary text-center uppercase tracking-wider">
                        Join Waitlist
                      </h4>
                      <div className="space-y-3">
                        <input
                          type="text"
                          required
                          value={waitlistName}
                          onChange={(e) => setWaitlistName(e.target.value)}
                          placeholder="Your Name"
                          className="w-full bg-background border border-border/10 rounded-xl px-4 py-3 text-xs text-text-primary placeholder-text-secondary/50 focus:outline-none focus:border-primary/40 transition-colors"
                        />
                        <input
                          type="email"
                          required
                          value={waitlistEmail}
                          onChange={(e) => setWaitlistEmail(e.target.value)}
                          placeholder="Your Email"
                          className="w-full bg-background border border-border/10 rounded-xl px-4 py-3 text-xs text-text-primary placeholder-text-secondary/50 focus:outline-none focus:border-primary/40 transition-colors"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-3 bg-primary text-background font-extrabold uppercase tracking-wider text-[10px] rounded-xl shadow-lg hover:shadow-primary/20 transition-all hover:-translate-y-0.5 cursor-pointer"
                      >
                        Submit Registration
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-6 space-y-3"
                    >
                      <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 mx-auto">
                        <Check className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-bold font-cinzel text-text-primary uppercase tracking-wider">
                        Registration Complete!
                      </h4>
                      <p className="text-text-secondary text-[11px] leading-relaxed">
                        Thank you for registering. You have been placed on our priority queue. We will contact you soon.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </motion.div>
        </div>


        {/* ==================================================
            PART 9 — FINAL CTA CARD
            ================================================== */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-gradient-to-b from-card via-background to-background border border-primary/20 rounded-[3rem] p-8 sm:p-12 lg:p-16 text-center overflow-hidden shadow-2xl max-w-4xl mx-auto"
          >
            <div className="relative z-10 space-y-6">
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-primary bg-primary/5 border border-primary/10 px-3 py-1 rounded-full">
                {academyConfig.shortName} Enrollment
              </span>

              <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-cinzel text-text-primary leading-tight">
                Begin Your Journey With <br />{academyConfig.instructorName}
              </h3>

              <p className="text-text-secondary text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed">
                Unlock certified masterclasses, practical remedies, and live mentor guidance. Take the next step today.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 bg-primary text-background font-extrabold uppercase tracking-wider text-xs rounded-xl shadow-lg hover:shadow-primary/20 transition-all hover:-translate-y-0.5 text-center cursor-pointer"
                >
                  Enroll in {academyConfig.shortName}
                </a>

                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 bg-card hover:bg-surface border border-border/15 text-text-primary font-bold uppercase tracking-wider text-xs rounded-xl transition-all hover:-translate-y-0.5 text-center cursor-pointer"
                >
                  Schedule Personal Inquiry
                </a>
              </div>
            </div>
          </motion.div>
        </div>

      </div>

    </section>
  );
}
