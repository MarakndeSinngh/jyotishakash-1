import React, { useState, useEffect, useRef } from 'react';
import { Section } from '../../types/cms';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  BookOpen, Award, Film, Users, Star, MessageCircle, Sparkles, Zap, 
  ChevronRight, Globe, CheckCircle2, ChevronLeft, MapPin, Play, 
  Calendar, ExternalLink, RefreshCw, Layers, Heart, Compass, Eye, Info,
  ShieldCheck
} from 'lucide-react';
import SmartImage from './SmartImage';
import { FounderImage } from '../common/FounderImage';
import { SOCIAL_LINKS } from '../../constants/contacts';
import { Assets } from '../../config/assets';
import { useAcademy } from '../../context/AcademyContext';
import { useLanguage } from '../../context/LanguageContext';

const raajeevPhoto = Assets.founder.image;
const WHATSAPP_WEBINAR_LINK = "https://chat.whatsapp.com/FplsKSBYPbI5DLFWKSKP5o";

interface AboutSectionProps {
  section: Section;
}

// ==========================================
// INTERACTIVE ECOSYSTEM NODES
// ==========================================
interface EcosystemNode {
  id: string;
  label: string;
  category: string;
  description: string;
  link?: string;
  details: string;
}

const ECOSYSTEM_NODES: EcosystemNode[] = [
  { id: 'center', label: 'LEO FAMILY', category: 'Core', description: 'The overarching spiritual and educational collective.', details: 'The central hub coordinating all calculations, research, courses, and media assets.' },
  { id: 'founder', label: 'Raajeev Singh Website', category: 'Personal', description: 'The personal portfolio and official portal of the founder.', link: SOCIAL_LINKS.websites.founder, details: 'Access direct publications, personal achievements, and exclusive blogs.' },
  { id: 'films', label: 'LEO Family Indian Films', category: 'Media', description: 'Premium cinematic storytelling and media productions.', link: SOCIAL_LINKS.websites.films, details: 'Blending values, spiritual wisdom, and high-impact human stories in mainstream media.' },
  { id: 'courses', label: 'Certified Courses', category: 'Education', description: 'Professional curriculum in Astrology, Numerology, and Vastu.', link: '/academy', details: 'Step-by-step masterclasses with physical study materials and global certifications.' },
  { id: 'consultations', label: 'Elite Consultations', category: 'Services', description: 'Private, high-impact guidance sessions.', link: '/contact', details: 'Personalized Astro-Numerology remedial analysis for industry leaders.' },
  { id: 'ai', label: 'AI Spiritual Platform', category: 'Tech', description: 'Planetary alignments and calculator portals.', link: '/ai', details: 'Combining traditional formulas with automated, responsive algorithms.' },
  { id: 'community', label: 'Global Community', category: 'Network', description: 'Interactive alumni and practitioner groups.', link: SOCIAL_LINKS.facebook, details: 'Regular discussion groups and remedial audits spanning 10+ countries.' },
  { id: 'youtube', label: 'YouTube Channels', category: 'Media', description: 'Frequent video analysis and weekly readings.', link: SOCIAL_LINKS.youtube.main, details: 'Watch video masterclasses, client testimonials, and planetary insights.' },
  { id: 'facebook', label: 'Facebook Community', category: 'Social', description: 'Active organic community and daily updates.', link: SOCIAL_LINKS.facebook, details: 'Daily Astro-Numerology guides and collective energetic shifts discussed daily.' },
  { id: 'app', label: 'Mobile App', category: 'Future', description: 'Upcoming native daily tracking and calculations.', details: 'A modern companion app for push-remedies, planetary hours, and personal daily numbers.' },
  { id: 'portal', label: 'Members Portal', category: 'Future', description: 'Private, continuous learning vault.', details: 'Exclusive workspace for graduates to utilize interactive chart grids.' }
];

// ==========================================
// TIMELINE MILESTONES
// ==========================================
interface Milestone {
  id: number;
  year: string;
  title: string;
  description: string;
  extended: string;
  icon: typeof Star;
}

const MILESTONES: Milestone[] = [
  { id: 1, year: '1998', title: 'Early Inspiration', description: 'First deep encounter with cosmic vibrations.', extended: 'Witnessed the profound structural pattern of destiny calculations, igniting a lifelong passion for decoding cosmic geometry.', icon: Sparkles },
  { id: 2, year: '2004', title: 'Years of Intensive Study', description: 'Mastering traditional Vedic texts & formulas.', extended: 'Dedicated years to studying original scriptures, ancient Vastu layouts, and planetary influences alongside master mentors.', icon: BookOpen },
  { id: 3, year: '2010', title: 'Helping Individuals', description: 'Commenced professional private consultations.', extended: 'Helped family offices and professionals reorganize their life layouts with practical, rapid-remedy formulations.', icon: Heart },
  { id: 4, year: '2014', title: 'Teaching First Students', description: 'Expanding to organized educational masterclasses.', extended: 'Empowered practitioners with a simplified, reproducible system of predictions based on real-world case studies.', icon: Users },
  { id: 5, year: '2017', title: 'Building LEO Family', description: 'Consolidating the official Astro-Numerology school.', extended: 'Incorporated Leo Family to host certified curriculums, standardizing calculations and research frameworks.', icon: Award },
  { id: 6, year: '2019', title: 'Creating Accredited Courses', description: 'Authoring standard textbooks and guides.', extended: 'Published 12+ structured online modules to ensure high-fidelity transmission of energy and vibration sciences.', icon: Layers },
  { id: 7, year: '2021', title: 'Digital Transformation', description: 'Going completely global via virtual classrooms.', extended: 'Transformed traditional class models to accessible digital layouts, reaching students across multiple continents.', icon: Globe },
  { id: 8, year: '2024', title: 'AI Spiritual Platform', description: 'Incepting automated calculative engines.', extended: 'Infused traditional calculations with modern tech systems to provide instant planetary reports.', icon: Zap },
  { id: 9, year: '2026', title: 'Global Learning Community', description: 'Cultivating the premier alumni network.', extended: 'Empowering thousands of students internationally, proving that ancient wisdom is the ultimate guide to modern destiny.', icon: Compass }
];

// ==========================================
// CORE VALUES
// ==========================================
const CORE_VALUES = [
  { title: 'Authenticity', desc: 'No vague promises. Pure calculation-backed remedies anchored in genuine ancient Vedic sciences.', icon: ShieldCheck },
  { title: 'Continuous Growth', desc: 'Empowering you to learn, adapt, and expand your consciousness every single day.', icon: Zap },
  { title: 'Integrity', desc: 'Upholding strict confidentiality and absolute precision across all guidance and consultations.', icon: Award },
  { title: 'Compassion', desc: 'Guiding every seeker with deep empathy, acknowledging their unique cosmic blueprint.', icon: Heart },
  { title: 'Practical Guidance', desc: 'Focusing on actionable, modern remedies that fit seamlessly into busy modern life.', icon: CheckCircle2 },
  { title: 'Wisdom', desc: 'Deep scientific synthesis of Astro, Numerology, and Vastu to ensure absolute accuracy.', icon: Sparkles },
  { title: 'Community', desc: 'Building a nurturing, collaborative network of like-minded practitioners worldwide.', icon: Users },
  { title: 'Learning', desc: 'Providing highly structured, world-class resources, worksheets, and textbooks.', icon: BookOpen }
];

// ==========================================
// AREAS OF EXPERTISE
// ==========================================
interface ExpertiseItem {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  impact: string;
}

const EXPERTISE_ITEMS: ExpertiseItem[] = [
  { id: 'num', name: 'Numerology', shortDesc: 'The vibration of numbers', fullDesc: 'Mapping the cosmic imprint of your birthdate and life path numbers to clarify career, health, and relationship cycles.', impact: 'Harmonize personal vibrations for effortless career advancement.' },
  { id: 'astro', name: 'Astrology', shortDesc: 'Planetary alignments', fullDesc: 'Vedic chart analysis evaluating planetary houses and transient blocks to identify precise periods of high potential.', impact: 'Dodge planetary blocks and capitalize on high-yielding cycles.' },
  { id: 'vastu', name: 'Vastu Shastra', shortDesc: 'Spatial energy architecture', fullDesc: 'Balancing magnetic fields and five elements (Pancha Bhoota) in physical locations to foster peace and financial flows.', impact: 'Redesign workspace layout to unlock immediate abundance.' },
  { id: 'name', name: 'Name Analysis', shortDesc: 'Spelling alignment', fullDesc: 'Realigning the spelling of personal names or business brands to establish highly positive numerical frequencies.', impact: 'Transform brand reach and customer trust instantly.' },
  { id: 'mob', name: 'Mobile Numerology', shortDesc: 'Digital contact frequency', fullDesc: 'Analyzing mobile and contact numbers to ensure they attract opportunities, positive queries, and helpful partnerships.', impact: 'Turn your communication channel into a magnet for luck.' },
  { id: 'biz', name: 'Business Guidance', shortDesc: 'Corporate energetic planning', fullDesc: 'Corporate Astro-Numerology outlining partner compatibility, launch dates, brand colors, and structural planning.', impact: 'Safeguard investments with calculated, auspicious start dates.' },
  { id: 'med', name: 'Meditation', shortDesc: 'Vibrational quietude', fullDesc: 'Tailored meditative systems designed to calm active minds and sync mental state to positive planetary frequencies.', impact: 'Erase stress and tap into supreme intuitive pathways.' },
  { id: 'spiritual', name: 'Spiritual Development', shortDesc: 'Consciousness scaling', fullDesc: 'Holistic mentoring guiding candidates from mechanical calculations to deep, intuitive spiritual insight.', impact: 'Achieve true self-mastery and serve others with absolute clarity.' }
];

// ==========================================
// MEDIA & APPEARANCES
// ==========================================
const MEDIA_GALLERY = [
  { title: "Bollywood Exclusive Interview", category: "Interviews", desc: "Raajeev discussing astro-remedies with prominent industry actors.", type: "video", date: "Jan 2026", duration: "12 Min" },
  { title: "Global Numerology Summit Dubai", category: "Seminars", desc: "Keynote presentation detailing structural vibrations of names.", type: "image", date: "Nov 2025" },
  { title: "The Cosmic Alignment Podcast", category: "Podcasts", desc: "An in-depth episode explaining mobile numerology trends.", type: "audio", date: "Sep 2025", duration: "45 Min" },
  { title: "National TV Special Feature", category: "Television", desc: "Live remedial calculations for national television viewers.", type: "video", date: "May 2025" },
  { title: "Elite Corporate Masterclass", category: "Workshops", desc: "Vastu planning for premium modern corporate headquarters.", type: "image", date: "Mar 2025" },
  { title: "Leading Digital Press Feature", category: "Digital Features", desc: "In-depth editorial covering the digital expansion of LEO Family.", type: "image", date: "Dec 2024" }
];

// ==========================================
// BOOKS & PUBLICATIONS
// ==========================================
const PUBLICATIONS = [
  { title: "The Master of Destiny", category: "Book", desc: "The comprehensive textbook detailing practical Astro-Numerology formulas.", pages: "320 Pages", status: "Available Now" },
  { title: "Sacred Spatial Alchemy", category: "Study Guide", desc: "An illustrated, step-by-step workbook for residential and office Vastu.", pages: "180 Pages", status: "Exclusive Alumni Release" },
  { title: "Planetary Hours & Daily Vibrations", category: "Research Paper", desc: "A scientific study on matching personal name spelling to current Saturn transits.", pages: "45 Pages", status: "Free Digital Download" }
];

// ==========================================
// DAILY INSPIRATIONS
// ==========================================
const INSPIRATIONAL_QUOTES = [
  { text: "Numbers are not mere characters; they are the rhythmic code of the universe. Align your number, align your life.", context: "Address to the Global Alumni Group" },
  { text: "Timeless ancient wisdom is not meant to be kept in sealed books. It must be made practical, accessible, and life-changing.", context: "From the introduction of 'The Master of Destiny'" },
  { text: "Your birth date is your cosmic contract. Numerology is simply reading the fine print to unlock your absolute best potential.", context: "Interview on National Television" },
  { text: "True space harmony is achieved when the five natural elements support your physical body, creating effortless abundance.", context: "Keynote on Modern Spatial Vastu" }
];

export default function AboutSection({ section }: AboutSectionProps) {
  const { activeAcademy } = useAcademy();
  const { t } = useLanguage();

  // States
  const [activeMilestone, setActiveMilestone] = useState<number>(MILESTONES[0].id);
  const [activeExpertise, setActiveExpertise] = useState<string>(EXPERTISE_ITEMS[0].id);
  const [showExpertiseModal, setShowExpertiseModal] = useState<boolean>(false);
  const [activeQuoteIdx, setActiveQuoteIdx] = useState<number>(0);
  const [mediaFilter, setMediaFilter] = useState<string>("All");
  const [hoveredNode, setHoveredNode] = useState<EcosystemNode | null>(null);

  // Ink Reveal scroll targets and transforms
  const letterContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: letterContainerRef,
    offset: ["start end", "end start"]
  });

  const springScroll = useSpring(scrollYProgress, { stiffness: 45, damping: 18 });

  const circleRadius = useTransform(springScroll, [0.1, 0.42], ["0%", "150%"]);
  const clipPathStyle = useTransform(circleRadius, (r) => `circle(${r} at 50% 50%)`);
  
  const opacityStyle = useTransform(springScroll, [0.08, 0.22], [0, 1]);
  const yStyle = useTransform(springScroll, [0.08, 0.28], [50, 0]);
  
  const displacementScale = useTransform(springScroll, [0.1, 0.35, 0.42], [100, 30, 0]);
  const filterStyle = useTransform(displacementScale, (scale) => scale > 0.5 ? `url(#founder-ink-bleed)` : "none");

  // Auto-rotating Quotes
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveQuoteIdx((prev) => (prev + 1) % INSPIRATIONAL_QUOTES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  // SEO Schema Injection
  useEffect(() => {
    const personSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Raajeev Singh Chauhann",
      "jobTitle": ["Astro-Numerologist", "Astrologer", "Vastu Expert", "Founder", "Author"],
      "image": raajeevPhoto,
      "worksFor": {
        "@type": "Organization",
        "name": "LEO Family",
        "logo": "/gemstone-assets/logo.jpg"
      },
      "description": "Founder of LEO Family. Renowned Astro-Numerologist, Astrologer, and Vastu Expert transforming lives globally.",
      "knowsAbout": ["Numerology", "Astrology", "Vastu Shastra", "Life Coaching", "Cinematic Storytelling"]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(personSchema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden" id="meet-founder-experience">
      {/* Background Spiritual Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 blur-[150px] rounded-full translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 space-y-24 lg:space-y-36">

        {/* ==========================================
            SECTION HEADER
            ========================================== */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('about.badge', 'Meet the Visionary')}</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-6xl font-extrabold font-cinzel tracking-tight text-text-primary"
          >
            {t('about.title', 'Meet the Visionary')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-text-secondary leading-relaxed max-w-3xl mx-auto font-light"
          >
            {t('about.subtitle', 'Every great institution begins with a vision. Discover the journey, philosophy, and mission of our dedicated instructors—making ancient wisdom practical, accessible, and relevant for today\'s world.')}
          </motion.p>
        </div>


        {/* ==========================================
            PART 1 — FOUNDER SHOWCASE (Split-Screen)
            ========================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT SIDE - Portrait Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-[420px] aspect-[4/5] group"
            >
              {/* Outer Golden Aura */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-primary via-secondary to-accent rounded-[2.5rem] opacity-35 blur-md group-hover:opacity-70 transition-opacity duration-700 -z-10" />
              
              {/* Floating Dust Particles */}
              <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden rounded-[2.5rem]">
                {[...Array(6)].map((_, i) => (
                  <motion.div 
                    key={i}
                    className="absolute w-1 h-1 bg-accent rounded-full opacity-60 shadow-[0_0_8px_rgba(233,194,105,0.8)]"
                    style={{
                      left: `${15 + i * 15}%`,
                      top: `${80 - i * 10}%`
                    }}
                    animate={{
                      y: [0, -40, 0],
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 4 + i,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>

              {/* Luxury Frame Container */}
              <div className="relative w-full h-full flex justify-center items-center">
                <FounderImage 
                  size="xl" 
                  variant="portrait" 
                  animation="shine" 
                  showGlow={true}
                  showFrame={true}
                  className="w-full h-full"
                />
              </div>

              {/* Decorative badges overlay */}
              <div className="absolute -bottom-5 -right-5 md:-right-8 bg-card border border-border/40 p-4.5 rounded-2xl shadow-2xl flex items-center gap-3.5 z-20">
                <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <Award className="w-5.5 h-5.5" />
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-text-secondary font-black">MASTER LEVEL</p>
                  <p className="text-sm font-bold text-text-primary">15+ Yrs Practice</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDE - Founder Credentials & Roles */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <p className="text-sm font-black tracking-widest text-primary uppercase font-mono">Founding Visionary</p>
              <h2 className="text-3xl lg:text-5xl font-extrabold font-cinzel text-text-primary">
                {activeAcademy?.instructorName || "Instructor"}
              </h2>
              <p className="text-lg text-text-secondary font-light max-w-xl">
                {activeAcademy?.instructorBio || activeAcademy?.description || "A multifaceted mentor combining science and ancient wisdom to transform lives globally."}
              </p>
            </div>

            {/* Premium Badges Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { title: activeAcademy?.shortName || "Academy", label: "Enterprise" },
                { title: activeAcademy?.instructorTitle || "Instructor", label: "Master" },
                { title: "Language", label: activeAcademy?.language || "Global" },
                { title: "Vedic Science", label: "Cosmic" },
                { title: "Practical Solutions", label: "Empower" },
                { title: "Courses", label: `${activeAcademy?.courses?.length || 5}+ Modules` }
              ].map((role, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="p-3 bg-card border border-border/10 rounded-xl flex flex-col justify-center hover:border-primary/30 hover:shadow-md transition-all group"
                >
                  <span className="text-[11px] font-bold text-text-primary group-hover:text-primary transition-colors">{role.title}</span>
                  <span className="text-[8px] tracking-widest uppercase text-text-secondary mt-0.5">{role.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Additional info block */}
            <div className="flex gap-4 p-4.5 bg-primary/5 rounded-2xl border border-primary/10">
              <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <p className="text-xs text-text-secondary leading-relaxed">
                <strong>{activeAcademy?.instructorName}</strong> serves as the master instructor at <strong>{activeAcademy?.name}</strong>, offering structured curriculums, live webinars, and personal consultations in {activeAcademy?.language || "Bengali, English, and Hindi"}.
              </p>
            </div>
          </div>
        </div>


        {/* ==========================================
            PART 2 — PERSONAL PHILOSOPHY (The Styled Letter)
            ========================================== */}
        <div ref={letterContainerRef} className="max-w-4xl mx-auto relative">
          
          {/* SVG filter for organic ink bleed distortion edge */}
          <svg className="absolute w-0 h-0 pointer-events-none" width="0" height="0">
            <defs>
              <filter id="founder-ink-bleed">
                <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="4" result="noise" />
                <motion.feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale={displacementScale}
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>
            </defs>
          </svg>

          {/* Background layered watercolor/ink stains */}
          <motion.div
            style={{
              scale: useTransform(springScroll, [0.1, 0.32], [0.1, 1.15]),
              opacity: useTransform(springScroll, [0.1, 0.32], [0, 0.08]),
              rotate: useTransform(springScroll, [0.1, 0.32], [-30, 10]),
            }}
            className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-primary/40 blur-3xl pointer-events-none mix-blend-multiply dark:mix-blend-screen"
          />
          <motion.div
            style={{
              scale: useTransform(springScroll, [0.18, 0.4], [0.1, 1.3]),
              opacity: useTransform(springScroll, [0.18, 0.4], [0, 0.06]),
              rotate: useTransform(springScroll, [0.18, 0.4], [20, -15]),
            }}
            className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full bg-secondary/30 blur-3xl pointer-events-none mix-blend-multiply dark:mix-blend-screen"
          />

          <motion.div 
            style={{
              clipPath: clipPathStyle,
              opacity: opacityStyle,
              y: yStyle,
              filter: filterStyle,
            }}
            className="relative bg-card/45 backdrop-blur-md rounded-[2.5rem] border border-border/20 p-8 lg:p-14 shadow-xl space-y-8"
          >
            {/* Soft decorative background leaf or geometry */}
            <div className="absolute top-8 right-8 text-primary/5 select-none pointer-events-none">
              <Sparkles className="w-40 h-40" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="font-cinzel text-xs font-bold uppercase tracking-[0.3em] text-primary">Philosophy</h3>
              <h4 className="text-2xl lg:text-3xl font-extrabold font-cinzel text-text-primary">A Message from the Founder</h4>
            </div>

            <div className="text-text-secondary text-base lg:text-lg leading-[1.8] font-light space-y-6 relative">
              <p className="first-letter:text-5xl first-letter:font-bold first-letter:font-cinzel first-letter:text-primary first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                "My mission has always been to make authentic spiritual knowledge understandable, practical, and beneficial for everyone. The sciences of Astro-Numerology and Vastu should not remain locked in complex manuals or traditional academic terms. They must translate directly to the physical success, prosperity, and peace of mind you experience daily."
              </p>
              <p>
                "At LEO Family, we do not teach passive speculation. We train you in the actual code of cosmic values. Each calculation grid is a map to align your personal vibrational frequencies with auspicious periods of flow."
              </p>
            </div>

            {/* Signature Animation */}
            <div className="pt-6 flex flex-col items-end border-t border-border/10">
              <div className="w-44 text-center">
                <svg className="w-full h-12 text-primary overflow-visible" viewBox="0 0 150 50">
                  {/* Real animating signature path concept */}
                  <motion.path
                    d="M 10,35 Q 25,10 40,25 T 70,15 T 100,30 T 130,20 Q 140,10 145,25"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                </svg>
                <p className="text-[10px] font-black uppercase tracking-widest text-primary mt-1">{activeAcademy?.instructorName || "Instructor"}</p>
                <p className="text-[8px] uppercase tracking-widest text-text-secondary">{activeAcademy?.shortName || activeAcademy?.name || "Academy"}</p>
              </div>
            </div>
          </motion.div>
        </div>


        {/* ==========================================
            PART 3 — JOURNEY TIMELINE
            ========================================== */}
        <div className="space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h3 className="font-cinzel text-xs font-bold uppercase tracking-[0.3em] text-primary">Evolution</h3>
            <h4 className="text-3xl lg:text-4xl font-extrabold font-cinzel text-text-primary">Journey & Milestones</h4>
            <p className="text-xs text-text-secondary uppercase tracking-widest font-medium">Click on any milestone to reveal detailed archives</p>
          </div>

          <div className="relative max-w-5xl mx-auto pt-6">
            {/* Center spine line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/10 via-primary/40 to-primary/10 -translate-x-1/2" />

            <div className="space-y-10">
              {MILESTONES.map((step, idx) => {
                const isLeft = idx % 2 === 0;
                const isSelected = activeMilestone === step.id;
                const Icon = step.icon;

                return (
                  <div key={step.id} className={`flex flex-col md:flex-row items-start ${isLeft ? 'md:flex-row-reverse' : ''} relative`}>
                    
                    {/* Node Dot */}
                    <div 
                      onClick={() => setActiveMilestone(step.id)}
                      className="absolute left-6 md:left-1/2 top-1 w-10 h-10 rounded-full border-4 border-background -translate-x-1/2 flex items-center justify-center cursor-pointer z-30 transition-all duration-300"
                      style={{
                        backgroundColor: isSelected ? 'var(--primary)' : 'var(--card)',
                        boxShadow: isSelected ? '0 0 15px var(--primary)' : '0 4px 10px rgba(0,0,0,0.1)',
                      }}
                    >
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-primary'}`} />
                    </div>

                    {/* Timeline Card */}
                    <div className="w-full md:w-[45%] pl-14 md:pl-0 md:px-8">
                      <motion.div
                        onClick={() => setActiveMilestone(step.id)}
                        whileHover={{ scale: 1.01 }}
                        className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer text-left ${
                          isSelected 
                            ? 'bg-card border-primary shadow-xl ring-1 ring-primary/20' 
                            : 'bg-card/50 border-border/20 hover:border-primary/20 hover:bg-card'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-black tracking-widest text-primary uppercase font-mono">{step.year}</span>
                          <span className="text-[9px] uppercase tracking-wider text-text-secondary bg-primary/10 px-2 py-0.5 rounded-full font-bold">Phase {step.id}</span>
                        </div>
                        <h5 className="text-base font-bold text-text-primary font-cinzel tracking-tight mb-1">{step.title}</h5>
                        <p className="text-xs text-text-secondary leading-relaxed">{step.description}</p>
                        
                        {/* Expanded details */}
                        <AnimatePresence initial={false}>
                          {isSelected && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden mt-3 pt-3 border-t border-border/10 text-xs text-text-secondary/90 leading-relaxed space-y-2"
                            >
                              <p>{step.extended}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </div>

                    {/* Spacer for MD screens */}
                    <div className="hidden md:block w-[10%]"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>


        {/* ==========================================
            PART 4 — CORE VALUES
            ========================================== */}
        <div className="space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h3 className="font-cinzel text-xs font-bold uppercase tracking-[0.3em] text-primary">Core Values</h3>
            <h4 className="text-3xl lg:text-4xl font-extrabold font-cinzel text-text-primary">What We Stand For</h4>
            <p className="text-lg text-text-secondary font-light">Elegance, accuracy, and compassion anchoring our global mission.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_VALUES.map((val, idx) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.05)" }}
                  className="p-6 rounded-2xl bg-card border border-border/20 text-left space-y-4 hover:border-primary/45 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Icon className="w-5.5 h-5.5" />
                  </div>
                  <h5 className="text-base font-bold font-cinzel text-text-primary">{val.title}</h5>
                  <p className="text-xs text-text-secondary leading-relaxed">{val.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>


        {/* ==========================================
            PART 5 — AREAS OF EXPERTISE (Circular Dial)
            ========================================== */}
        <div className="space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h3 className="font-cinzel text-xs font-bold uppercase tracking-[0.3em] text-primary">Specializations</h3>
            <h4 className="text-3xl lg:text-4xl font-extrabold font-cinzel text-text-primary">Areas of Expertise</h4>
            <p className="text-lg text-text-secondary font-light">Click any discipline on the wheel or list below to inspect its core mechanics.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-5xl mx-auto">
            
            {/* LEFT: Circular Wheel Interface */}
            <div className="lg:col-span-6 flex justify-center py-6">
              <div className="relative w-80 h-80 md:w-[380px] md:h-[380px] rounded-full border border-border/20 flex items-center justify-center">
                
                {/* Slow Rotating Background Rings */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-4 rounded-full border border-dashed border-primary/25 pointer-events-none"
                />
                
                {/* Dial Center */}
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-tr from-primary to-accent text-white flex flex-col items-center justify-center shadow-lg text-center p-3 relative z-20">
                  <Compass className="w-6 h-6 md:w-8 md:h-8 animate-spin-slow mb-1" />
                  <span className="text-[9px] font-black tracking-widest uppercase font-mono">Expertise</span>
                  <span className="text-[7.5px] tracking-wide opacity-80 uppercase">Dial Selector</span>
                </div>

                {/* Surrounding Nodes */}
                {EXPERTISE_ITEMS.map((item, idx) => {
                  const angle = (idx * 360) / EXPERTISE_ITEMS.length;
                  const radius = 130; // Radius distance
                  const isSelected = activeExpertise === item.id;

                  // Translate calculations
                  const x = radius * Math.cos((angle * Math.PI) / 180);
                  const y = radius * Math.sin((angle * Math.PI) / 180);

                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => {
                        setActiveExpertise(item.id);
                        setShowExpertiseModal(true);
                      }}
                      whileHover={{ scale: 1.1 }}
                      className="absolute w-12 h-12 md:w-14 md:h-14 rounded-full border flex items-center justify-center cursor-pointer transition-all z-20 shadow-sm"
                      style={{
                        transform: `translate(${x}px, ${y}px)`,
                        backgroundColor: isSelected ? 'var(--primary)' : 'var(--card)',
                        borderColor: isSelected ? 'var(--primary)' : 'var(--border)',
                      }}
                    >
                      <span className={`text-[8.5px] font-black tracking-tighter uppercase ${isSelected ? 'text-white' : 'text-text-secondary'}`}>
                        {item.name.split(' ')[0]}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* RIGHT: Detailed Explanation of Selection */}
            <div className="lg:col-span-6">
              <AnimatePresence mode="wait">
                {EXPERTISE_ITEMS.filter(it => it.id === activeExpertise).map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-6 lg:p-8 bg-card rounded-3xl border border-border/20 shadow-xl space-y-6 text-left relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary" />
                      <span className="text-[10px] uppercase font-bold tracking-widest text-primary">Core Specialization</span>
                    </div>

                    <h4 className="text-2xl font-bold font-cinzel text-text-primary">{item.name}</h4>
                    <p className="text-xs tracking-widest font-bold uppercase text-text-secondary">{item.shortDesc}</p>
                    <p className="text-sm text-text-secondary leading-relaxed">{item.fullDesc}</p>

                    <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                      <p className="text-[10px] font-black tracking-widest text-primary uppercase mb-1">Expected Real-World Outcome</p>
                      <p className="text-xs text-text-primary font-medium">{item.impact}</p>
                    </div>

                    <button
                      onClick={() => setShowExpertiseModal(true)}
                      className="inline-flex items-center gap-1.5 text-xs text-primary font-bold tracking-wider hover:translate-x-1 transition-transform"
                    >
                      <span>Read Full Integration Guideline</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ==========================================
            PART 6 — MEDIA & PUBLIC APPEARANCES
            ========================================== */}
        <div className="space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h3 className="font-cinzel text-xs font-bold uppercase tracking-[0.3em] text-primary">Gallery</h3>
            <h4 className="text-3xl lg:text-4xl font-extrabold font-cinzel text-text-primary">Media & Public Appearances</h4>
            <p className="text-lg text-text-secondary font-light">Watch seminars, interviews, workshops, and weekly podcast releases.</p>
          </div>

          {/* Gallery Filters */}
          <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
            {["All", "Interviews", "Seminars", "Podcasts", "Television", "Workshops"].map((filter) => (
              <button
                key={filter}
                onClick={() => setMediaFilter(filter)}
                className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all border cursor-pointer ${
                  mediaFilter === filter
                    ? 'bg-primary border-primary text-white'
                    : 'bg-card/45 border-border/30 text-text-secondary hover:text-text-primary hover:border-primary/55'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Media Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {MEDIA_GALLERY
              .filter(item => mediaFilter === "All" || item.category === mediaFilter)
              .map((item, idx) => (
                <motion.div
                  key={idx}
                  layout
                  className="group bg-card rounded-2xl border border-border/20 overflow-hidden text-left hover:border-primary/30 transition-all flex flex-col justify-between"
                >
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono tracking-wider font-bold text-primary bg-primary/10 px-2 py-0.5 rounded uppercase">
                        {item.category}
                      </span>
                      <span className="text-[9px] text-text-secondary font-medium flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {item.date}
                      </span>
                    </div>
                    <h5 className="text-base font-bold text-text-primary font-cinzel tracking-tight leading-tight">
                      {item.title}
                    </h5>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="px-6 pb-6 pt-3 border-t border-border/10 flex items-center justify-between bg-primary/5">
                    <span className="text-[10px] text-text-secondary font-mono">
                      {item.type === 'video' ? '🎬 Video Clip' : item.type === 'audio' ? '🎙️ Podcast Audio' : '📸 Summit Image'}
                    </span>
                    <button className="flex items-center gap-1 text-[10px] font-black text-primary uppercase tracking-widest hover:text-primary-dark cursor-pointer">
                      <span>View Archive</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>


        {/* ==========================================
            PART 7 — BOOKS & PUBLICATIONS (Bookshelf Layout)
            ========================================== */}
        <div className="space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h3 className="font-cinzel text-xs font-bold uppercase tracking-[0.3em] text-primary">Library</h3>
            <h4 className="text-3xl lg:text-4xl font-extrabold font-cinzel text-text-primary">Books & Publications</h4>
            <p className="text-lg text-text-secondary font-light">Core textbooks, spatial blueprints, and digital calculation sheets.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
            {/* Wood bookshelf board under cards on MD+ screens */}
            <div className="absolute left-0 right-0 bottom-[-16px] h-4 bg-gradient-to-r from-amber-950 via-amber-800 to-amber-950 rounded shadow-md hidden md:block border-t border-amber-600/30" />

            {PUBLICATIONS.map((book, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-card rounded-2xl border border-border/20 p-6 text-left flex flex-col justify-between shadow-lg relative group transition-all"
              >
                {/* Book Spine color marker */}
                <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-primary via-secondary to-accent rounded-l-2xl" />
                
                <div className="space-y-4 pl-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] tracking-widest font-bold uppercase text-primary font-mono">{book.category}</span>
                    <span className="text-[8.5px] font-medium text-text-secondary bg-primary/10 px-2 py-0.5 rounded">{book.pages}</span>
                  </div>
                  <h5 className="text-base font-bold font-cinzel text-text-primary leading-tight group-hover:text-primary transition-colors">{book.title}</h5>
                  <p className="text-xs text-text-secondary leading-relaxed">{book.desc}</p>
                </div>

                <div className="pt-6 pl-2 mt-4 border-t border-border/10 flex flex-col gap-3">
                  <span className="text-[9px] font-black tracking-widest text-primary uppercase font-mono">{book.status}</span>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 rounded-lg bg-primary/10 text-primary text-[10px] font-bold tracking-wider uppercase hover:bg-primary hover:text-white transition-all text-center cursor-pointer">
                      Read Blueprint
                    </button>
                    <button className="flex-1 py-2 rounded-lg border border-border/20 hover:border-primary/45 text-[10px] font-bold tracking-wider uppercase text-text-secondary text-center cursor-pointer">
                      Order Copy
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>


        {/* ==========================================
            PART 8 — GLOBAL MISSION (Interactive SVG Map)
            ========================================== */}
        <div className="space-y-12 bg-card/20 backdrop-blur-md p-8 lg:p-14 rounded-[3rem] border border-border/10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h3 className="font-cinzel text-xs font-bold uppercase tracking-[0.3em] text-primary">Global Reach</h3>
            <h4 className="text-3xl lg:text-4xl font-extrabold font-cinzel text-text-primary">Global Learning Community</h4>
            <p className="text-lg text-text-secondary font-light">Bridging digital platforms and offline coaching to support seekers in 10+ countries.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
            
            {/* World Map SVG Left */}
            <div className="lg:col-span-7 flex justify-center">
              <div className="relative w-full max-w-[500px] aspect-[16/10] bg-background/40 border border-border/10 rounded-2xl p-4 overflow-hidden">
                <svg className="w-full h-full text-text-secondary/15" viewBox="0 0 800 500" fill="none">
                  {/* Simplified world map outline paths representing continents */}
                  <path d="M120 150 Q160 100 240 120 T300 200 T200 350 Z" fill="currentColor" opacity="0.3" />
                  <path d="M420 100 Q500 80 580 120 T620 220 T520 300 Z" fill="currentColor" opacity="0.3" />
                  <path d="M540 280 Q600 250 680 300 T720 400 Z" fill="currentColor" opacity="0.3" />
                  <path d="M180 320 Q220 300 280 340 T320 450 Z" fill="currentColor" opacity="0.3" />
                  
                  {/* Glowing Connection Lines / Arcs */}
                  <motion.path 
                    d="M 450,220 Q 300,100 200,200" 
                    stroke="var(--primary)" 
                    strokeWidth="1.5" 
                    strokeDasharray="4,4"
                    fill="none" 
                    animate={{ strokeDashoffset: [0, -20] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  />
                  <motion.path 
                    d="M 450,220 Q 550,120 650,240" 
                    stroke="var(--primary)" 
                    strokeWidth="1.5" 
                    strokeDasharray="4,4"
                    fill="none" 
                    animate={{ strokeDashoffset: [0, 20] }}
                    transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
                  />
                  <motion.path 
                    d="M 450,220 Q 400,320 300,380" 
                    stroke="var(--primary)" 
                    strokeWidth="1.5" 
                    strokeDasharray="4,4"
                    fill="none" 
                    animate={{ strokeDashoffset: [0, -20] }}
                    transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                  />

                  {/* Nodes with pulsing effects */}
                  {/* India - Mumbai */}
                  <circle cx="450" cy="220" r="8" fill="var(--primary)" />
                  <circle cx="450" cy="220" r="16" stroke="var(--primary)" strokeWidth="1" fill="none" className="animate-ping" style={{ transformOrigin: '450px 220px' }} />
                  <text x="465" y="225" fill="var(--text-primary)" fontSize="10" fontWeight="bold">Mumbai (HQ)</text>

                  {/* Dubai */}
                  <circle cx="390" cy="190" r="5" fill="var(--secondary)" />
                  <circle cx="390" cy="190" r="10" stroke="var(--secondary)" strokeWidth="1" fill="none" className="animate-pulse" style={{ transformOrigin: '390px 190px' }} />
                  <text x="370" y="175" fill="var(--text-secondary)" fontSize="8">Dubai</text>

                  {/* London */}
                  <circle cx="280" cy="110" r="5" fill="var(--secondary)" />
                  <text x="250" y="95" fill="var(--text-secondary)" fontSize="8">London</text>

                  {/* Singapore */}
                  <circle cx="530" cy="280" r="5" fill="var(--secondary)" />
                  <text x="540" y="290" fill="var(--text-secondary)" fontSize="8">Singapore</text>

                  {/* USA - New York */}
                  <circle cx="150" cy="160" r="5" fill="var(--secondary)" />
                  <text x="110" y="180" fill="var(--text-secondary)" fontSize="8">New York</text>
                </svg>
              </div>
            </div>

            {/* Core KPI metrics Right */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2 text-left">
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Growth Analytics</span>
                <h5 className="text-2xl font-bold font-cinzel text-text-primary">Expanding Vedic Reach</h5>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "15,000+", label: "Students Trained", desc: "Across accredited modules" },
                  { value: "10+ Co.", label: "Global Presence", desc: "Active family transits" },
                  { value: "12+ Pro", label: "Certified Courses", desc: "Vastu, Astro & Numbers" },
                  { value: "100K+", label: "Digital Members", desc: "Organic community" }
                ].map((stat, i) => (
                  <div key={i} className="p-4 bg-card rounded-xl border border-border/10 text-left">
                    <p className="text-2xl font-bold font-cinzel text-primary leading-none mb-1">{stat.value}</p>
                    <p className="text-[11px] font-bold text-text-primary">{stat.label}</p>
                    <p className="text-[9px] text-text-secondary leading-tight">{stat.desc}</p>
                  </div>
                ))}
              </div>

              <div className="p-4.5 bg-primary/5 rounded-2xl border border-primary/10 text-left flex items-start gap-3">
                <Globe className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <p className="text-xs text-text-secondary leading-relaxed">
                  With active student bodies in <strong>India, UAE, Singapore, UK, US, and Canada</strong>, LEO Family serves as the leading, highly trustworthy resource for ancient energetic wisdom translation.
                </p>
              </div>
            </div>

          </div>
        </div>


        {/* ==========================================
            PART 9 — THE LEO FAMILY ECOSYSTEM (Connected Node Graph)
            ========================================== */}
        <div className="space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h3 className="font-cinzel text-xs font-bold uppercase tracking-[0.3em] text-primary">Federation</h3>
            <h4 className="text-3xl lg:text-4xl font-extrabold font-cinzel text-text-primary">The LEO Family Ecosystem</h4>
            <p className="text-lg text-text-secondary font-light">Hover or tap on any surrounding node to inspect its specific purpose and relations.</p>
          </div>

          <div className="max-w-4xl mx-auto p-6 bg-card border border-border/15 rounded-[2.5rem] relative min-h-[420px] flex flex-col justify-between">
            <div className="absolute top-4 right-4 text-[9px] font-mono tracking-wider font-bold text-primary flex items-center gap-1">
              <RefreshCw className="w-3 h-3 animate-spin" />
              <span>Interactive Graph</span>
            </div>

            {/* Graph Visual Frame */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center flex-1">
              {/* Active Node explanation Panel left */}
              <div className="md:col-span-5 text-left space-y-4">
                <span className="text-[9px] font-bold text-primary uppercase tracking-widest">Ecosystem Component</span>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={hoveredNode ? hoveredNode.id : 'default'}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-3"
                  >
                    <h5 className="text-lg font-bold font-cinzel text-text-primary">
                      {hoveredNode ? hoveredNode.label : 'Explore LEO Family'}
                    </h5>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {hoveredNode ? hoveredNode.details : 'Hover or select any node in the directory on the right to discover the multi-tiered ecosystem managed by Raajeev Singh Chauhann.'}
                    </p>
                    {hoveredNode && hoveredNode.link && (
                      <a
                        href={hoveredNode.link}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                      >
                        <span>Access Platform URL</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Node selection Grid right */}
              <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {ECOSYSTEM_NODES.map((node) => {
                  const isCenter = node.id === 'center';
                  const isHovered = hoveredNode?.id === node.id;
                  
                  return (
                    <button
                      key={node.id}
                      onMouseEnter={() => setHoveredNode(node)}
                      onClick={() => setHoveredNode(node)}
                      className={`p-3 rounded-xl border text-left transition-all duration-300 relative overflow-hidden ${
                        isCenter 
                          ? 'col-span-2 sm:col-span-3 bg-primary text-white border-primary shadow-lg font-cinzel' 
                          : isHovered
                            ? 'bg-primary/10 border-primary text-primary'
                            : 'bg-background hover:bg-primary/5 border-border/10 text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className={`text-[10px] font-bold ${isCenter ? 'text-white' : 'text-text-primary'}`}>
                          {node.label}
                        </span>
                        <span className={`text-[7px] tracking-widest uppercase mt-0.5 ${isCenter ? 'text-white/80' : 'text-text-secondary'}`}>
                          {node.category}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>


        {/* ==========================================
            PART 10 — DAILY INSPIRATION (Quote Slider)
            ========================================== */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-tr from-primary/5 via-secondary/5 to-accent/5 p-8 lg:p-14 rounded-3xl border border-border/15 text-center relative overflow-hidden">
            {/* Quotation Marks */}
            <span className="absolute top-4 left-6 text-7xl font-serif text-primary/10 select-none">“</span>
            <span className="absolute bottom-4 right-6 text-7xl font-serif text-primary/10 select-none">”</span>

            <div className="space-y-6">
              <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-primary font-mono">Daily Inspiration</span>
              
              <div className="min-h-[100px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeQuoteIdx}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    className="text-lg lg:text-xl font-cinzel italic text-text-primary leading-relaxed"
                  >
                    {INSPIRATIONAL_QUOTES[activeQuoteIdx].text}
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="space-y-1">
                <p className="text-[11px] font-black uppercase tracking-widest text-primary">Raajeev Singh Chauhann</p>
                <p className="text-[9px] text-text-secondary">{INSPIRATIONAL_QUOTES[activeQuoteIdx].context}</p>
              </div>

              {/* Slider Dots */}
              <div className="flex justify-center gap-1.5 pt-2">
                {INSPIRATIONAL_QUOTES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveQuoteIdx(idx)}
                    className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                      activeQuoteIdx === idx ? 'bg-primary w-5' : 'bg-border/40 hover:bg-border'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>


        {/* ==========================================
            PART 11 — PERSONAL CONSULTATION (Booking Card)
            ========================================== */}
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-border/30 bg-card shadow-2xl p-8 lg:p-14 text-left">
            
            {/* Subtle glow layer */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 blur-[100px] rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
              <div className="md:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[9px] font-bold uppercase tracking-widest">
                  <Zap className="w-3 h-3 text-primary animate-bounce" />
                  <span>Elite Consultation Session</span>
                </div>
                <h3 className="text-2xl lg:text-4xl font-extrabold font-cinzel text-text-primary leading-tight">
                  Begin Your Journey with Personalized Guidance
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed max-w-xl">
                  Connect with Raajeev directly for corporate alignment, residential spatial audits, brand spellings, and private chart readings. Achieve effortless success through calculation.
                </p>
              </div>

              <div className="md:col-span-4 flex flex-col gap-3">
                <a
                  href="https://wa.me/919999999999" // Use Whatsapp link
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-premium py-4.5 px-6 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-center shadow-lg cursor-pointer"
                >
                  Book Consultation
                </a>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="py-4 px-6 rounded-2xl border border-border/20 text-text-secondary hover:text-primary hover:border-primary/50 text-[10px] font-bold uppercase tracking-widest text-center transition-all cursor-pointer"
                >
                  Visit Founder Page
                </button>
              </div>
            </div>
          </div>
        </div>


        {/* ==========================================
            PART 12 — FINAL VISION (Closing Cinematic)
            ========================================== */}
        <div className="relative py-24 rounded-[3.5rem] overflow-hidden text-center border border-border/10 bg-gradient-to-tr from-card via-background to-card shadow-3xl">
          
          {/* Rotating Sri Yantra or Sacred Geometry representation in background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
            <svg className="w-[500px] h-[500px] animate-spin-slow text-primary" viewBox="0 0 200 200" fill="none" stroke="currentColor">
              <polygon points="100,20 170,140 30,140" strokeWidth="0.5" />
              <polygon points="100,180 170,60 30,60" strokeWidth="0.5" />
              <polygon points="100,40 160,130 40,130" strokeWidth="0.5" />
              <polygon points="100,160 160,70 40,70" strokeWidth="0.5" />
              <circle cx="100" cy="100" r="80" strokeWidth="0.5" />
              <circle cx="100" cy="100" r="40" strokeWidth="0.5" />
            </svg>
          </div>

          <div className="max-w-2xl mx-auto space-y-6 relative z-10 px-6">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary font-mono">The Cosmic Horizon</span>
            
            <h3 className="text-3xl lg:text-5xl font-extrabold font-cinzel text-text-primary tracking-tight">
              The Journey Has Just Begun.
            </h3>

            <p className="text-sm text-text-secondary leading-relaxed font-light">
              "Our vision is to preserve timeless wisdom while embracing modern technology, empowering people worldwide through education, guidance, and innovation."
            </p>

            {/* Glowing Spark */}
            <div className="flex justify-center pt-4">
              <div className="w-10 h-[1.5px] bg-gradient-to-r from-transparent via-primary to-transparent" />
            </div>
          </div>
        </div>

      </div>

      {/* ==========================================
          INTERACTIVE POPUP MODAL (For Wheel Items)
          ========================================== */}
      <AnimatePresence>
        {showExpertiseModal && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowExpertiseModal(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-card border border-border/30 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6 text-left"
            >
              {EXPERTISE_ITEMS.filter(it => it.id === activeExpertise).map((item) => (
                <div key={item.id} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary font-mono">Detailed Analysis</span>
                    <button 
                      onClick={() => setShowExpertiseModal(false)}
                      className="p-1 rounded-lg hover:bg-primary/5 text-text-secondary hover:text-text-primary text-[10px] font-bold tracking-widest uppercase cursor-pointer"
                    >
                      Close
                    </button>
                  </div>

                  <h4 className="text-2xl font-bold font-cinzel text-text-primary">{item.name}</h4>
                  <p className="text-xs tracking-widest font-bold uppercase text-text-secondary border-b border-border/10 pb-2">{item.shortDesc}</p>
                  
                  <div className="space-y-3 text-sm text-text-secondary leading-relaxed">
                    <p>{item.fullDesc}</p>
                    <p>Within the LEO Family curriculum, this discipline is taught not as an abstract lore, but through strict mathematical grids and chronological planetary periods. Students analyze live database examples to master accuracy.</p>
                  </div>

                  <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                    <p className="text-[10px] font-black tracking-widest text-primary uppercase mb-1">Expected Real-World Outcome</p>
                    <p className="text-xs text-text-primary font-medium">{item.impact}</p>
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button 
                      onClick={() => setShowExpertiseModal(false)}
                      className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer"
                    >
                      Acknowledge
                    </button>
                    <a 
                      href="/academy"
                      className="px-4 py-2 bg-primary text-white hover:bg-primary-dark rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all text-center cursor-pointer"
                    >
                      Explore Courses
                    </a>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
