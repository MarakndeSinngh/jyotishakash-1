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
  ArrowLeft,
  Calculator,
  Download,
  FileText,
  Compass,
  Gem,
  ExternalLink,
  Layers,
  Sparkle
} from 'lucide-react';
import { useAcademy } from '../../context/AcademyContext';
import { useLanguage } from '../../context/LanguageContext';
import { WHATSAPP_LINK } from '../../constants/contacts';
import { getVideosByTeacher, getAutoYoutubeThumbnail, MediaItem } from '../../config/mediaRegistry';
import SmartImage from './SmartImage';
import AcademyNotFound from './AcademyNotFound';
import LandingHero from '../LandingHero';

interface AcademyLandingPageProps {
  navigate?: (path: string) => void;
}

/* ==================================================
   SUB-COMPONENT: LIVE COUNTDOWN
   ================================================== */
function LiveCountdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +new Date(targetDate) - +new Date();
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3 font-mono text-center my-4">
      <div className="bg-background/90 border border-primary/30 p-2 sm:p-3 rounded-xl min-w-[55px] sm:min-w-[70px] shadow-lg">
        <span className="text-base sm:text-2xl font-extrabold text-primary block">{timeLeft.days}</span>
        <span className="text-[9px] uppercase tracking-wider text-text-secondary block">Days</span>
      </div>
      <span className="text-primary font-bold text-base sm:text-xl">:</span>
      <div className="bg-background/90 border border-primary/30 p-2 sm:p-3 rounded-xl min-w-[55px] sm:min-w-[70px] shadow-lg">
        <span className="text-base sm:text-2xl font-extrabold text-primary block">{timeLeft.hours}</span>
        <span className="text-[9px] uppercase tracking-wider text-text-secondary block">Hours</span>
      </div>
      <span className="text-primary font-bold text-base sm:text-xl">:</span>
      <div className="bg-background/90 border border-primary/30 p-2 sm:p-3 rounded-xl min-w-[55px] sm:min-w-[70px] shadow-lg">
        <span className="text-base sm:text-2xl font-extrabold text-primary block">{timeLeft.minutes}</span>
        <span className="text-[9px] uppercase tracking-wider text-text-secondary block">Mins</span>
      </div>
      <span className="text-primary font-bold text-base sm:text-xl">:</span>
      <div className="bg-background/90 border border-primary/30 p-2 sm:p-3 rounded-xl min-w-[55px] sm:min-w-[70px] shadow-lg">
        <span className="text-base sm:text-2xl font-extrabold text-primary block">{timeLeft.seconds}</span>
        <span className="text-[9px] uppercase tracking-wider text-text-secondary block">Secs</span>
      </div>
    </div>
  );
}

export default function AcademyLandingPage({ navigate }: AcademyLandingPageProps) {
  const { activeAcademy, isNotFound, switchAcademy } = useAcademy();
  const { t } = useLanguage();

  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);
  const [activeVideoModal, setActiveVideoModal] = useState<MediaItem | null>(null);
  const [activeToolTab, setActiveToolTab] = useState<'numerology' | 'gemstone'>('numerology');
  
  // Interactive Calculator State
  const [userName, setUserName] = useState('');
  const [userDob, setUserDob] = useState('');
  const [calcResult, setCalcResult] = useState<{
    lifePath: number;
    rulingPlanet: string;
    gemstone: string;
    advice: string;
  } | null>(null);

  // Gemstone Finder State
  const [selectedGoal, setSelectedGoal] = useState<'wealth' | 'career' | 'health' | 'harmony'>('wealth');

  if (isNotFound || !activeAcademy) {
    return <AcademyNotFound />;
  }

  const whatsappUrl = activeAcademy.contactDetails?.whatsapp || WHATSAPP_LINK;
  const academyLogo = activeAcademy.branding?.logo || activeAcademy.assets?.profileImage;

  // Set default opened FAQ
  if (openFaqId === null && activeAcademy.faqs?.[0]?.id) {
    setOpenFaqId(activeAcademy.faqs[0].id);
  }

  // Filter courses by selected difficulty
  const filteredCourses = activeAcademy.courses.filter(course => {
    if (selectedDifficulty === 'All') return true;
    return course.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
  });

  // Get teacher's videos from Centralized Media Registry
  const teacherVideos = getVideosByTeacher(activeAcademy.slug);

  const handleNav = (path: string) => {
    if (navigate) {
      navigate(path);
    } else {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new Event('popstate'));
    }
  };

  const handleCalculateDestiny = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userDob) return;
    const digits = userDob.replace(/\D/g, '');
    let sum = digits.split('').reduce((acc, curr) => acc + parseInt(curr || '0', 10), 0);
    while (sum > 9 && sum !== 11 && sum !== 22) {
      sum = sum.toString().split('').reduce((acc, curr) => acc + parseInt(curr, 10), 0);
    }
    
    const planetMap: Record<number, { planet: string; gem: string; advice: string }> = {
      1: { planet: 'Sun (Surya)', gem: 'Ruby (Manikya)', advice: 'Focus on leadership, executive authority, and solar alignment.' },
      2: { planet: 'Moon (Chandra)', gem: 'Pearl (Moti)', advice: 'Strengthen emotional equilibrium and intuitive decision-making.' },
      3: { planet: 'Jupiter (Guru)', gem: 'Yellow Sapphire (Pukhraj)', advice: 'Expand spiritual wisdom, mentorship, and high-value advisory.' },
      4: { planet: 'Rahu (North Node)', gem: 'Hessonite (Gomed)', advice: 'Harness non-linear innovation and structural discipline.' },
      5: { planet: 'Mercury (Budh)', gem: 'Emerald (Panna)', advice: 'Optimize commerce, communication, and analytical intelligence.' },
      6: { planet: 'Venus (Shukra)', gem: 'Diamond / White Zircon', advice: 'Activate aesthetic harmony, luxury, and brand magnetism.' },
      7: { planet: 'Ketu (South Node)', gem: 'Cat’s Eye (Lehsuniya)', advice: 'Master deep research, esoteric science, and inner clarity.' },
      8: { planet: 'Saturn (Shani)', gem: 'Blue Sapphire (Neelam)', advice: 'Build enduring legacy systems with strict karmic discipline.' },
      9: { planet: 'Mars (Mangal)', gem: 'Red Coral (Moonga)', advice: 'Direct vital force, courage, and decisive execution.' },
    };

    const details = planetMap[sum] || planetMap[1];
    setCalcResult({
      lifePath: sum,
      rulingPlanet: details.planet,
      gemstone: details.gem,
      advice: details.advice,
    });
  };

  return (
    <div className="min-h-screen bg-background text-text-primary font-sans relative overflow-hidden selection:bg-primary/30 selection:text-text-primary pb-24">
      
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

          {/* Current Faculty Programs Indicator */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
              {activeAcademy.instructorName} Academy
            </span>
          </div>

        </div>
      </div>

      {/* ==================================================
          FLOW 1: HERO SECTION (LandingHero)
          ================================================== */}
      <LandingHero />

      {/* ==================================================
          FLOW 2: FEATURED PROGRAMS (Courses & Masterclasses)
          ================================================== */}
      <section id="courses" className="relative z-10 py-20 px-6 max-w-7xl mx-auto border-t border-border/10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 pb-4 border-b border-border/10">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary block mb-2">
              CURRICULUM CATALOG
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-cinzel text-text-primary">
              Featured Programs & Masterclasses
            </h2>
            <p className="text-xs text-text-secondary mt-1">
              Official courses designed and delivered exclusively by {activeAcademy.instructorName}
            </p>
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
                      {course.hasCertificate && <span className="text-emerald-500 font-semibold">Cert. Included</span>}
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
                      <span className="text-primary font-bold font-cinzel text-sm">{course.price || "Inquire"}</span>
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
          FLOW 3: WORKSHOP TIMELINE (Learning Roadmap)
          ================================================== */}
      {activeAcademy.learningRoadmap && activeAcademy.learningRoadmap.length > 0 && (
        <section className="relative z-10 py-20 px-6 max-w-6xl mx-auto border-t border-border/10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary block mb-2">
              CURRICULUM ROADMAP
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-cinzel text-text-primary">
              Workshop Learning Timeline
            </h2>
            <p className="text-xs text-text-secondary mt-2">
              Step-by-step mastery framework structured by {activeAcademy.instructorName}
            </p>
            <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4" />
          </div>

          <div className="relative">
            {/* Timeline Center Line */}
            <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-[2px] bg-gradient-to-b from-primary/10 via-primary/40 to-primary/10 -translate-x-1/2" />

            <div className="space-y-8 relative">
              {activeAcademy.learningRoadmap.map((item, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className={`flex flex-col md:flex-row items-center gap-6 ${
                      isEven ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Content Box */}
                    <div className="w-full md:w-1/2">
                      <div className="bg-card border border-border/15 hover:border-primary/30 p-6 rounded-2xl shadow-xl transition-all text-left relative">
                        <span className="text-xs font-mono font-extrabold text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full mb-3 inline-block">
                          Step {item.step}
                        </span>
                        <h3 className="text-base sm:text-lg font-bold font-cinzel text-text-primary mb-2">
                          {item.title}
                        </h3>
                        <p className="text-text-secondary text-xs font-light leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    {/* Timeline Dot */}
                    <div className="relative z-10 w-10 h-10 rounded-full bg-primary text-background font-bold font-mono text-sm flex items-center justify-center shadow-lg border-4 border-background shrink-0">
                      {item.step}
                    </div>

                    {/* Empty Spacer */}
                    <div className="hidden md:block w-1/2" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ==================================================
          FLOW 4: INTERACTIVE LEARNING TOOLS
          ================================================== */}
      <section className="relative z-10 py-20 px-6 max-w-5xl mx-auto border-t border-border/10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Learning Suite</span>
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-cinzel text-text-primary">
            Astro-Vastu & Gemstone Calculations
          </h2>
          <p className="text-xs text-text-secondary mt-2">
            Experience immediate insights using {activeAcademy.instructorName}’s calculation formulas
          </p>
        </div>

        {/* Tools Card Container */}
        <div className="bg-card border border-primary/20 rounded-[2.5rem] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Tab Switcher */}
          <div className="flex justify-center gap-2 mb-8">
            <button
              onClick={() => setActiveToolTab('numerology')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                activeToolTab === 'numerology'
                  ? 'bg-primary text-background shadow-lg'
                  : 'bg-background text-text-secondary hover:text-text-primary border border-border/20'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Life Path & Planetary Ruling Tool</span>
            </button>

            <button
              onClick={() => setActiveToolTab('gemstone')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                activeToolTab === 'gemstone'
                  ? 'bg-primary text-background shadow-lg'
                  : 'bg-background text-text-secondary hover:text-text-primary border border-border/20'
              }`}
            >
              <Gem className="w-4 h-4" />
              <span>Gemstone Frequency Alignment</span>
            </button>
          </div>

          {/* TAB 1: DESTINY CALCULATOR */}
          {activeToolTab === 'numerology' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <form onSubmit={handleCalculateDestiny} className="grid grid-cols-1 sm:grid-cols-12 gap-4 text-left">
                <div className="sm:col-span-5 space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">Full Name</label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 bg-background border border-border/30 rounded-xl text-xs text-text-primary focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="sm:col-span-5 space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">Date of Birth</label>
                  <input
                    type="date"
                    value={userDob}
                    onChange={(e) => setUserDob(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-background border border-border/30 rounded-xl text-xs text-text-primary focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="sm:col-span-2 flex items-end">
                  <button
                    type="submit"
                    className="w-full py-3 bg-primary text-background font-extrabold uppercase tracking-wider text-xs rounded-xl shadow-lg hover:opacity-90 transition-all cursor-pointer"
                  >
                    Calculate
                  </button>
                </div>
              </form>

              {/* CALCULATION RESULT BOX */}
              {calcResult && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-background/80 border border-primary/30 rounded-2xl text-left space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/10 pb-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">
                      Destiny Number: <span className="text-lg font-mono text-text-primary ml-1">{calcResult.lifePath}</span>
                    </span>
                    <span className="text-xs font-semibold text-text-primary font-cinzel">
                      Ruling Lord: <span className="text-primary">{calcResult.rulingPlanet}</span>
                    </span>
                  </div>

                  <p className="text-xs text-text-secondary font-light leading-relaxed">
                    <strong className="text-text-primary">Prescribed Remedy: </strong>
                    {calcResult.advice}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                    <span className="text-xs text-emerald-500 font-bold flex items-center gap-1">
                      <Gem className="w-4 h-4" />
                      Recommended Gemstone: {calcResult.gemstone}
                    </span>
                    <a
                      href={`${whatsappUrl}?text=Hi%20${encodeURIComponent(activeAcademy.instructorName)},%20my%20Destiny%20Number%20is%20${calcResult.lifePath}%20(${calcResult.rulingPlanet}).%20I%20would%20like%20a%20detailed%20consultation.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-background rounded-lg text-[10px] font-extrabold uppercase tracking-wider cursor-pointer"
                    >
                      <span>Discuss Chart with {activeAcademy.shortName}</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* TAB 2: GEMSTONE ALIGNMENT */}
          {activeToolTab === 'gemstone' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 text-left">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">Select Primary Goal / Focus Area</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'wealth', label: 'Financial Abundance', gem: 'Yellow Sapphire & Green Emerald' },
                    { id: 'career', label: 'Career Executive Power', gem: 'Ruby & Blue Sapphire' },
                    { id: 'health', label: 'Vitality & Health Vastu', gem: 'Red Coral & Pearl' },
                    { id: 'harmony', label: 'Mental Peace & Relationships', gem: 'Natural Pearl & White Zircon' },
                  ].map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setSelectedGoal(g.id as any)}
                      className={`p-4 rounded-xl border text-xs font-bold font-cinzel transition-all cursor-pointer text-center ${
                        selectedGoal === g.id
                          ? 'border-primary bg-primary/10 text-primary shadow-md'
                          : 'border-border/20 bg-background text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-background/80 border border-primary/30 rounded-2xl space-y-3">
                <h4 className="text-sm font-bold font-cinzel text-primary flex items-center gap-2">
                  <Gem className="w-4 h-4 text-primary" />
                  <span>Scientific Crystalline Recommendation</span>
                </h4>
                <p className="text-xs text-text-secondary font-light leading-relaxed">
                  Based on classical Vedic scriptural standards, targeting {selectedGoal.toUpperCase()} requires unheated natural gemstone frequencies paired with exact planetary weight ratios and directional Vastu placement.
                </p>
                <div className="pt-2 flex justify-end">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-background rounded-xl text-xs font-extrabold uppercase tracking-wider cursor-pointer"
                  >
                    <span>Request Gemstone Audit</span>
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </section>

      {/* ==================================================
          FLOW 5: STUDENT TRANSFORMATIONS (Testimonials)
          ================================================== */}
      {activeAcademy.testimonials && activeAcademy.testimonials.length > 0 && (
        <section className="relative z-10 py-20 px-6 max-w-7xl mx-auto border-t border-border/10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary block mb-2">
              VERIFIED SUCCESS STORIES
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-cinzel text-text-primary">
              Student Transformations
            </h2>
            <p className="text-xs text-text-secondary mt-1">
              Real outcomes experienced by scholars of {activeAcademy.instructorName}
            </p>
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
                    <h4 className="text-xs font-bold font-cinzel text-text-text-primary">{t.name}</h4>
                    <span className="text-[10px] text-text-secondary block font-sans">{t.role}</span>
                    {t.courseTitle && <span className="text-[9px] text-primary block font-medium mt-0.5">{t.courseTitle}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ==================================================
          FLOW 6: VIDEO GALLERY
          ================================================== */}
      <section className="relative z-10 py-20 px-6 max-w-7xl mx-auto border-t border-border/10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-2">
            <Video className="w-3.5 h-3.5" />
            <span>Masterclass Media Library</span>
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-cinzel text-text-primary">
            Video Gallery & Free Classes
          </h2>
          <p className="text-xs text-text-secondary mt-1">
            Watch lectures and guidance by {activeAcademy.instructorName}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teacherVideos.slice(0, 4).map((vid) => (
            <div
              key={vid.id}
              onClick={() => setActiveVideoModal(vid)}
              className="bg-card border border-border/15 hover:border-primary/30 rounded-2xl overflow-hidden shadow-xl cursor-pointer group transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-video overflow-hidden bg-black">
                <img
                  src={vid.thumbnail || getAutoYoutubeThumbnail(vid.youtubeVideoId)}
                  alt={vid.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-background flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-background ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded text-[9px] text-white font-mono">
                  {vid.duration}
                </div>
              </div>

              <div className="p-4 text-left space-y-2">
                <span className="text-[9px] uppercase tracking-wider text-primary font-bold block">
                  {vid.category}
                </span>
                <h3 className="text-xs font-bold font-cinzel text-text-primary line-clamp-2 group-hover:text-primary transition-colors">
                  {vid.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VIDEO MODAL LIGHTBOX */}
      <AnimatePresence>
        {activeVideoModal && (
          <div className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-card border border-primary/30 rounded-2xl p-6 max-w-3xl w-full text-center relative shadow-2xl"
            >
              <button
                onClick={() => setActiveVideoModal(null)}
                className="absolute top-4 right-4 text-text-secondary hover:text-text-primary font-bold text-lg cursor-pointer"
              >
                ✕
              </button>
              <h3 className="text-base font-bold font-cinzel text-text-primary mb-4 pr-8 text-left">
                {activeVideoModal.title}
              </h3>
              <div className="aspect-video bg-black rounded-xl overflow-hidden">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeVideoModal.youtubeVideoId}?autoplay=1&rel=0`}
                  title={activeVideoModal.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
              <p className="text-xs text-text-secondary mt-4 text-left">
                {activeVideoModal.description}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================================================
          FLOW 7: UPCOMING WEBINAR & LIVE COUNTDOWN
          ================================================== */}
      {activeAcademy.events && activeAcademy.events.length > 0 && (
        <section className="relative z-10 py-20 px-6 max-w-5xl mx-auto border-t border-border/10">
          <div className="bg-gradient-to-br from-card via-background to-card border border-primary/30 rounded-[2.5rem] p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
            <div className="max-w-3xl mx-auto space-y-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em]">
                <Calendar className="w-3.5 h-3.5" />
                <span>Upcoming Live Masterclass</span>
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-cinzel text-text-primary">
                {activeAcademy.events[0].topic}
              </h2>

              <p className="text-xs sm:text-sm text-text-secondary font-light">
                Speaker: <strong className="text-primary font-cinzel">{activeAcademy.events[0].speaker}</strong> • Date: <strong className="text-text-primary">{activeAcademy.events[0].date} ({activeAcademy.events[0].time})</strong>
              </p>

              {/* LIVE COUNTDOWN TIMER */}
              {activeAcademy.events[0].countdownTarget && (
                <LiveCountdown targetDate={activeAcademy.events[0].countdownTarget} />
              )}

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <span className="text-xs font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-4 py-2 rounded-full">
                  ⚠️ Only {activeAcademy.events[0].seatsAvailable} Seats Remaining
                </span>

                <a
                  href={`${whatsappUrl}?text=Hi%20${encodeURIComponent(activeAcademy.instructorName)},%20I%20would%20like%20to%20reserve%20a%20seat%20for%20the%20live%20masterclass:%20${encodeURIComponent(activeAcademy.events[0].topic)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 bg-primary text-background font-extrabold uppercase tracking-wider text-xs rounded-xl shadow-xl hover:shadow-primary/25 transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  Reserve Seat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ==================================================
          FLOW 8: COURSE DASHBOARD PREVIEW
          ================================================== */}
      <section className="relative z-10 py-20 px-6 max-w-6xl mx-auto border-t border-border/10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Student Portal Experience</span>
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-cinzel text-text-primary">
            Course Dashboard Preview
          </h2>
          <p className="text-xs text-text-secondary mt-1">
            Seamless access to video archives, lecture notes, certificates, and direct faculty Q&A
          </p>
        </div>

        {/* Dashboard Mockup Card */}
        <div className="bg-card border border-primary/20 rounded-[2.5rem] p-6 sm:p-10 shadow-2xl text-left space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-bold font-cinzel">
                SP
              </div>
              <div>
                <h4 className="text-sm font-bold font-cinzel text-text-primary">Shaunak Scholar Dashboard</h4>
                <span className="text-[10px] text-emerald-400 font-semibold">● Active Student Account</span>
              </div>
            </div>

            <span className="text-xs font-extrabold text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-lg font-mono">
              Course Progress: 68% Completed
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-background/80 border border-border/20 rounded-2xl space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                Active Masterclass
              </h5>
              <p className="text-xs font-bold text-text-primary font-cinzel">Vedic Astrology & Planetary Dasha Mastery</p>
              <div className="w-full bg-card h-2 rounded-full overflow-hidden border border-border/20">
                <div className="bg-primary h-full w-[68%]" />
              </div>
              <span className="text-[10px] text-text-secondary block">8 of 12 Modules Completed</span>
            </div>

            <div className="p-5 bg-background/80 border border-border/20 rounded-2xl space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                Downloadable Worksheets
              </h5>
              <ul className="text-xs text-text-secondary space-y-1.5 font-light">
                <li className="flex items-center gap-1.5 text-text-primary">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Vedic Chart Reading Guide (PDF)</span>
                </li>
                <li className="flex items-center gap-1.5 text-text-primary">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Gemstone & Metal Matrix Sheet</span>
                </li>
              </ul>
            </div>

            <div className="p-5 bg-background/80 border border-border/20 rounded-2xl space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                Accredited Certification
              </h5>
              <p className="text-xs text-text-secondary font-light leading-relaxed">
                Receive an official verified certificate signed by {activeAcademy.instructorName} upon final assessment.
              </p>
              <span className="text-[10px] text-emerald-400 font-bold block">✓ Guaranteed Verification ID</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          FLOW 9: FREQUENTLY ASKED QUESTIONS
          ================================================== */}
      {activeAcademy.faqs && activeAcademy.faqs.length > 0 && (
        <section className="relative z-10 py-20 px-6 max-w-4xl mx-auto border-t border-border/10">
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
          FLOW 10: CONSULTATION SUITE
          ================================================== */}
      <section className="relative z-10 py-20 px-6 max-w-5xl mx-auto border-t border-border/10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-b from-card via-background to-card border border-primary/30 rounded-[3rem] p-8 sm:p-12 lg:p-16 text-center relative overflow-hidden shadow-2xl"
        >
          <div className="relative z-10 space-y-6 max-w-3xl mx-auto">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-primary bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full inline-block">
              {activeAcademy.shortName} Personal Guidance
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-cinzel text-text-primary leading-tight">
              Book a Private Consultation with {activeAcademy.instructorName}
            </h2>

            <p className="text-text-secondary text-sm sm:text-base font-light leading-relaxed">
              Analyze your birth chart, planetary dasha cycles, business Vastu grid, or gemstone compatibility in a 1-on-1 private session.
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
                View Masterclass Catalog
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ==================================================
          FLOW 11: STICKY FLOATING CTA (StickyFloatingCTA)
          ================================================== */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 border-t border-primary/30 py-3 px-6 backdrop-blur-lg shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            {academyLogo && (
              <img src={academyLogo} alt={activeAcademy.instructorName} className="w-9 h-9 rounded-full object-cover border border-primary/40 shrink-0 hidden sm:block" />
            )}
            <div className="text-left min-w-0">
              <span className="text-[10px] uppercase font-bold tracking-wider text-primary block truncate">
                {activeAcademy.instructorName}
              </span>
              <p className="text-xs font-bold font-cinzel text-text-primary truncate">
                Enroll or Book Personal Consultation
              </p>
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-primary text-background font-extrabold uppercase tracking-wider text-[10px] sm:text-xs rounded-xl shadow-lg hover:opacity-90 transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Connect on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* ==================================================
          FLOW 12: PREMIUM FOOTER
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
                  <a href={activeAcademy.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-background hover:bg-primary/10 text-text-secondary hover:text-primary transition-colors text-xs font-bold">
                    YouTube
                  </a>
                )}
                {activeAcademy.socialLinks.facebook && (
                  <a href={activeAcademy.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-background hover:bg-primary/10 text-text-secondary hover:text-primary transition-colors text-xs font-bold">
                    Facebook
                  </a>
                )}
                {activeAcademy.socialLinks.instagram && (
                  <a href={activeAcademy.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-background hover:bg-primary/10 text-text-secondary hover:text-primary transition-colors text-xs font-bold">
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
              <li><button onClick={() => handleNav('/academy')} className="hover:text-primary transition-colors cursor-pointer">Multi-Academy Directory</button></li>
              <li><button onClick={() => handleNav('/')} className="hover:text-primary transition-colors cursor-pointer">LEO Family Home</button></li>
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
