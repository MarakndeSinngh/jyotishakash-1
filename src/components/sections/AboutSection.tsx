import React, { useState, useEffect, useRef } from 'react';
import { Section } from '../../types/cms';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  BookOpen, Award, Film, Users, Star, MessageCircle, Sparkles, Zap, 
  ChevronRight, Globe, CheckCircle2, ChevronLeft, MapPin, Play, 
  Calendar, ExternalLink, RefreshCw, Layers, Heart, Compass, Eye, Info,
  ShieldCheck, Crown, GraduationCap
} from 'lucide-react';
import SmartImage from './SmartImage';
import { FounderImage } from '../common/FounderImage';
import { SOCIAL_LINKS } from '../../constants/contacts';
import { Assets } from '../../config/assets';
import { BRAND_INFO } from '../../config/brand';
import { ORGANIZATION_INFO } from '../../config/organization';
import { useLanguage } from '../../context/LanguageContext';
import { useAcademy } from '../../context/AcademyContext';

const raajeevPhoto = Assets.founder.image;
const WHATSAPP_CONSULTATION_LINK = "https://wa.me/919930117696";

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
// FACULTY DATA
// ==========================================
interface FacultyMember {
  id: string;
  slug: string;
  name: string;
  roleBadge: string;
  title: string;
  subtitle: string;
  experience: string;
  students: string;
  rating: string;
  languages: string;
  image: string;
  expertise: string[];
  description: string;
}

const FACULTY_MEMBERS: FacultyMember[] = [
  {
    id: 'shaunak',
    slug: 'shaunak',
    name: 'Shaunak S. Patthak',
    roleBadge: '🎓 Senior Faculty',
    title: 'Senior Faculty',
    subtitle: 'Astro-Vastu Grandmaster • Lead Faculty',
    experience: '22+ Years',
    students: '6,200+ Alumni',
    rating: '5.0 ★',
    languages: 'English, Gujarati & Hindi',
    image: Assets.teachers.shaunak.image,
    expertise: ['Numerology & Vedic Astrology', 'Planetary Dashas & Gemology', 'Astro-Vastu Calculations'],
    description: 'Lead Faculty member specializing in Astro-Vastu, planetary Dashas, and deep numerical matrix transformations.'
  },
  {
    id: 'sannjoy',
    slug: 'sannjoy',
    name: 'Sannjoy Biswass',
    roleBadge: '🎓 Senior Faculty',
    title: 'Senior Faculty',
    subtitle: 'Master Numerologist • Regional Faculty',
    experience: '20+ Years',
    students: '7,500+ Students',
    rating: '4.9 ★',
    languages: 'Bengali (বাংলা) & English',
    image: Assets.teachers.sannjoy.image,
    expertise: ['Lo Shu Grid Science', 'Bengali Numerology', 'Mobile & Spatial Harmony'],
    description: 'Master Numerologist and Regional Faculty leading authentic Lo Shu grid balancing and Bengali language masterclasses.'
  }
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
// DAILY INSPIRATIONS
// ==========================================
const INSPIRATIONAL_QUOTES = [
  { text: "Numbers are not mere characters; they are the rhythmic code of the universe. Align your number, align your life.", context: "Address to the Global Alumni Group" },
  { text: "Timeless ancient wisdom is not meant to be kept in sealed books. It must be made practical, accessible, and life-changing.", context: "From the introduction of 'The Master of Destiny'" },
  { text: "Your birth date is your cosmic contract. Numerology is simply reading the fine print to unlock your absolute best potential.", context: "Interview on National Television" },
  { text: "True space harmony is achieved when the five natural elements support your physical body, creating effortless abundance.", context: "Keynote on Modern Spatial Vastu" }
];

export default function AboutSection({ section }: AboutSectionProps) {
  const { t } = useLanguage();
  const { switchAcademy } = useAcademy();

  // States
  const [activeMilestone, setActiveMilestone] = useState<number>(MILESTONES[0].id);
  const [activeExpertise, setActiveExpertise] = useState<string>(EXPERTISE_ITEMS[0].id);
  const [showExpertiseModal, setShowExpertiseModal] = useState<boolean>(false);
  const [activeQuoteIdx, setActiveQuoteIdx] = useState<number>(0);
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
    <section className="py-20 lg:py-32 relative overflow-hidden" id="about-leo-family">
      {/* Background Spiritual Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 blur-[150px] rounded-full translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 space-y-24 lg:space-y-36">

        {/* ==========================================
            FLOW STEP 1: ABOUT LEO FAMILY
            ========================================== */}
        <div className="space-y-12">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('about.badge', 'Spiritual & Educational Collective')}</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl lg:text-6xl font-extrabold font-cinzel tracking-tight text-text-primary"
            >
              {t('about.title', 'About LEO Family')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-text-secondary leading-relaxed max-w-3xl mx-auto font-light"
            >
              {t('about.subtitle', 'LEO Family is a premier global spiritual and educational institution dedicated to bridging ancient Vedic sciences—Astro-Numerology, Vastu Shastra, and sacred geometry—with modern practical guidance, cinematic media, and cutting-edge digital intelligence.')}
            </motion.p>
          </div>

          {/* Institutional Highlights Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { label: 'Global Students', value: '15,000+', desc: 'Across 10+ countries' },
              { label: 'Expert Academies', value: '3 Master', desc: 'Astro, Numbers & Vastu' },
              { label: 'Certified Modules', value: '12+ Courses', desc: 'Beginner to Professional' },
              { label: 'Vedic Research', value: '20+ Years', desc: 'Proven calculation models' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 bg-card border border-border/20 rounded-2xl text-center space-y-1 hover:border-primary/40 transition-all shadow-sm"
              >
                <p className="text-2xl lg:text-3xl font-extrabold font-cinzel text-primary">{stat.value}</p>
                <p className="text-xs font-bold text-text-primary uppercase tracking-wider">{stat.label}</p>
                <p className="text-[10px] text-text-secondary">{stat.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Ecosystem Connected Node Graph */}
          <div className="max-w-4xl mx-auto p-6 bg-card border border-border/15 rounded-[2.5rem] relative min-h-[380px] flex flex-col justify-between shadow-lg">
            <div className="flex items-center justify-between pb-4 border-b border-border/10">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-widest text-text-primary">The LEO Family Ecosystem Directory</span>
              </div>
              <div className="text-[9px] font-mono tracking-wider font-bold text-primary flex items-center gap-1">
                <RefreshCw className="w-3 h-3 animate-spin" />
                <span>Interactive Directory</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center flex-1 pt-4">
              {/* Active Node explanation Panel */}
              <div className="md:col-span-5 text-left space-y-3">
                <span className="text-[9px] font-bold text-primary uppercase tracking-widest">Selected Entity</span>
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
                      {hoveredNode ? hoveredNode.details : 'Select any branch or asset below to inspect its dedicated function within the overarching LEO Family organization.'}
                    </p>
                    {hoveredNode && hoveredNode.link && (
                      <a
                        href={hoveredNode.link}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                      >
                        <span>Access Entity Portal</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Node selection Grid */}
              <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {ECOSYSTEM_NODES.map((node) => {
                  const isCenter = node.id === 'center';
                  const isHovered = hoveredNode?.id === node.id;
                  
                  return (
                    <button
                      key={node.id}
                      onMouseEnter={() => setHoveredNode(node)}
                      onClick={() => setHoveredNode(node)}
                      className={`p-3 rounded-xl border text-left transition-all duration-300 relative overflow-hidden cursor-pointer ${
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
            FLOW STEP 2: MEET THE FOUNDER — RAAJEEV SINGH CHAUHANN
            ========================================== */}
        <div className="space-y-16 pt-8 border-t border-border/10">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em]"
            >
              <Crown className="w-3.5 h-3.5 text-primary" />
              <span>Founding Visionary</span>
            </motion.div>
            <h2 className="text-3xl lg:text-5xl font-extrabold font-cinzel text-text-primary">
              Meet the Founder — Raajeev Singh Chauhann
            </h2>
            <p className="text-base text-text-secondary font-light">
              Founder & Visionary of LEO Family • Celebrity Astro-Numerologist • Vastu Expert • Filmmaker
            </p>
          </div>

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
                <div className="absolute -inset-1.5 bg-gradient-to-tr from-primary via-secondary to-accent rounded-[2.5rem] opacity-35 blur-md group-hover:opacity-70 transition-opacity duration-700 -z-10" />
                
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

                <div className="absolute -bottom-5 -right-5 md:-right-8 bg-card border border-border/40 p-4.5 rounded-2xl shadow-2xl flex items-center gap-3.5 z-20">
                  <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <Award className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-text-secondary font-black">FOUNDER & VISIONARY</p>
                    <p className="text-sm font-bold text-text-primary">20+ Yrs Experience</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* RIGHT SIDE - Founder Credentials & Bio */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <h3 className="text-2xl lg:text-4xl font-bold font-cinzel text-text-primary">
                  {BRAND_INFO.founder}
                </h3>
                <p className="text-lg text-text-secondary font-light max-w-xl leading-relaxed">
                  Founder of LEO Family, celebrity Astro-Numerologist, Astrologer, Vastu Expert, and filmmaker. Raajeev Singh Chauhann has dedicated over two decades to decoding cosmic geometry, Chaldean numerical vibrations, and spatial energy alignment, transforming thousands of lives and top business brands globally.
                </p>
              </div>

              {/* Roles Badges Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { title: "LEO Family", label: "Enterprise Founder" },
                  { title: "Celebrity Advisor", label: "Astro-Numerology" },
                  { title: "Languages", label: "English & Hindi" },
                  { title: "Vedic Science", label: "Chaldean Matrix" },
                  { title: "Spatial Harmony", label: "Vastu Architecture" },
                  { title: "Indian Films", label: "Cinematic Media" }
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

              <div className="flex gap-4 p-4.5 bg-primary/5 rounded-2xl border border-primary/10">
                <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <p className="text-xs text-text-secondary leading-relaxed">
                  <strong>{BRAND_INFO.founder}</strong> serves as the Founder & Visionary of <strong>LEO Family</strong>, establishing the core calculation standards, authorizing certified masterclass modules, and guiding personal consultations worldwide.
                </p>
              </div>
            </div>
          </div>

          {/* Founder Philosophy (A Message from the Founder) */}
          <div ref={letterContainerRef} className="max-w-4xl mx-auto relative pt-8">
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

            <motion.div 
              style={{
                clipPath: clipPathStyle,
                opacity: opacityStyle,
                y: yStyle,
                filter: filterStyle,
              }}
              className="relative bg-card/45 backdrop-blur-md rounded-[2.5rem] border border-border/20 p-8 lg:p-14 shadow-xl space-y-8"
            >
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

              {/* Signature */}
              <div className="pt-6 flex flex-col items-end border-t border-border/10">
                <div className="w-44 text-center">
                  <svg className="w-full h-12 text-primary overflow-visible" viewBox="0 0 150 50">
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
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary mt-1">{BRAND_INFO.founder}</p>
                  <p className="text-[8px] uppercase tracking-widest text-text-secondary">Founder & Visionary, LEO Family</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>


        {/* ==========================================
            FLOW STEP 3: OUR MISSION
            ========================================== */}
        <div className="space-y-12 pt-8 border-t border-border/10" id="our-mission">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em]"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <span>Core Purpose</span>
            </motion.div>
            <h2 className="text-3xl lg:text-4xl font-extrabold font-cinzel text-text-primary">
              Our Mission
            </h2>
            <p className="text-lg text-text-secondary font-light">
              Empowering individuals, families, and organizations through authentic, rapid-remedy Vedic calculation systems.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-card border border-border/20 rounded-[2.5rem] p-8 lg:p-12 shadow-xl space-y-8">
            <p className="text-lg lg:text-xl text-text-primary font-cinzel text-center leading-relaxed">
              "To demystify ancient Vedic sciences—Astro-Numerology, Vastu Shastra, and sacred geometry—and translate them into practical, actionable, and rapid-remedy solutions that transform human lives, careers, and global business brands."
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-border/10">
              {[
                { title: "Calculation-Backed", desc: "Rooted strictly in mathematical Vedic grids and astronomical planetary transits." },
                { title: "Actionable Remedies", desc: "Simple, highly effective daily spelling, name, and spatial alignments." },
                { title: "Life Transformation", desc: "Clear career blocks, health stagnations, and financial bottlenecks effortlessly." }
              ].map((pillar, idx) => (
                <div key={idx} className="p-4 bg-background/50 rounded-xl border border-border/10 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                    0{idx + 1}
                  </div>
                  <h4 className="text-sm font-bold text-text-primary font-cinzel">{pillar.title}</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* ==========================================
            FLOW STEP 4: OUR VISION
            ========================================== */}
        <div className="space-y-12 pt-8 border-t border-border/10" id="our-vision">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em]"
            >
              <Compass className="w-3.5 h-3.5 text-primary" />
              <span>Future Horizon</span>
            </motion.div>
            <h2 className="text-3xl lg:text-4xl font-extrabold font-cinzel text-text-primary">
              Our Vision
            </h2>
            <p className="text-lg text-text-secondary font-light">
              Bridging timeless spiritual heritage with AI technology and global educational accessibility.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-card border border-border/20 rounded-[2.5rem] p-8 lg:p-12 shadow-xl space-y-8">
            <p className="text-lg lg:text-xl text-text-primary font-cinzel text-center leading-relaxed">
              "To build a world-class global ecosystem where timeless spiritual wisdom coexists with cutting-edge technology and AI, empowering seekers across every continent to discover and fulfill their true cosmic destiny."
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-border/10">
              {[
                { title: "Global Reach", desc: "Expanding accredited masterclasses across 50+ countries with localized language support." },
                { title: "AI Integration", desc: "Utilizing calculated planetary engines to deliver instant energetic reports globally." },
                { title: "Preserving Wisdom", desc: "Protecting authentic Vedic scriptural precision for future generations." }
              ].map((pillar, idx) => (
                <div key={idx} className="p-4 bg-background/50 rounded-xl border border-border/10 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                    0{idx + 1}
                  </div>
                  <h4 className="text-sm font-bold text-text-primary font-cinzel">{pillar.title}</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* ==========================================
            FLOW STEP 5: OUR JOURNEY
            ========================================== */}
        <div className="space-y-12 pt-8 border-t border-border/10" id="our-journey">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h3 className="font-cinzel text-xs font-bold uppercase tracking-[0.3em] text-primary">Evolution</h3>
            <h2 className="text-3xl lg:text-4xl font-extrabold font-cinzel text-text-primary">Our Journey & Milestones</h2>
            <p className="text-xs text-text-secondary uppercase tracking-widest font-medium">Click on any milestone to inspect historical archives</p>
          </div>

          <div className="relative max-w-5xl mx-auto pt-6">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/10 via-primary/40 to-primary/10 -translate-x-1/2" />

            <div className="space-y-10">
              {MILESTONES.map((step, idx) => {
                const isLeft = idx % 2 === 0;
                const isSelected = activeMilestone === step.id;
                const Icon = step.icon;

                return (
                  <div key={step.id} className={`flex flex-col md:flex-row items-start ${isLeft ? 'md:flex-row-reverse' : ''} relative`}>
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

                    <div className="hidden md:block w-[10%]"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>


        {/* ==========================================
            FLOW STEP 6: OUR VALUES
            ========================================== */}
        <div className="space-y-12 pt-8 border-t border-border/10" id="our-values">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h3 className="font-cinzel text-xs font-bold uppercase tracking-[0.3em] text-primary">Core Values</h3>
            <h2 className="text-3xl lg:text-4xl font-extrabold font-cinzel text-text-primary">Our Values</h2>
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
            FLOW STEP 7: MEET OUR EXPERT FACULTY
            (Shaunak S. Patthak & Sannjoy Biswass ONLY)
            ========================================== */}
        <div className="space-y-12 pt-8 border-t border-border/10" id="meet-our-expert-faculty">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em]"
            >
              <GraduationCap className="w-3.5 h-3.5 text-primary" />
              <span>Senior Faculty</span>
            </motion.div>
            <h2 className="text-3xl lg:text-5xl font-extrabold font-cinzel text-text-primary">
              Meet Our Expert Faculty
            </h2>
            <p className="text-base text-text-secondary font-light">
              Distinguished scholars and master instructors leading specialized curriculums across LEO Family.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {FACULTY_MEMBERS.map((faculty) => (
              <motion.div
                key={faculty.id}
                whileHover={{ y: -6 }}
                className="bg-card border border-border/20 rounded-3xl p-6 lg:p-8 shadow-xl flex flex-col justify-between space-y-6 text-left hover:border-primary/40 transition-all group relative overflow-hidden"
              >
                <div className="space-y-6">
                  {/* Faculty Header Card */}
                  <div className="flex items-center gap-5">
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-primary/30 shrink-0 shadow-md">
                      <SmartImage
                        src={faculty.image}
                        alt={faculty.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        {faculty.roleBadge}
                      </span>
                      <h3 className="text-xl font-bold font-cinzel text-text-primary group-hover:text-primary transition-colors">
                        {faculty.name}
                      </h3>
                      <p className="text-xs font-semibold text-text-secondary">{faculty.subtitle}</p>
                    </div>
                  </div>

                  {/* Bio & Stats */}
                  <p className="text-xs text-text-secondary leading-relaxed font-light">
                    {faculty.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-[10px] font-medium text-text-secondary bg-background/50 p-3 rounded-xl border border-border/10">
                    <div><strong className="text-text-primary">Experience:</strong> {faculty.experience}</div>
                    <div><strong className="text-text-primary">Alumni:</strong> {faculty.students}</div>
                    <div className="col-span-2"><strong className="text-text-primary">Languages:</strong> {faculty.languages}</div>
                  </div>

                  {/* Expertise Tags */}
                  <div className="space-y-2">
                    <span className="text-[9px] font-black uppercase tracking-widest text-primary font-mono block">Specializations</span>
                    <div className="flex flex-wrap gap-1.5">
                      {faculty.expertise.map((exp, i) => (
                        <span key={i} className="text-[10px] bg-primary/5 text-text-primary px-2.5 py-1 rounded-lg border border-primary/10">
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-4 border-t border-border/10">
                  <button
                    onClick={() => switchAcademy(faculty.slug)}
                    className="w-full py-3 rounded-xl bg-primary/10 hover:bg-primary hover:text-white text-primary text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>View Faculty Masterclasses</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>


        {/* ==========================================
            FLOW STEP 8: BOOK CONSULTATION
            ========================================== */}
        <div className="space-y-12 pt-8 border-t border-border/10" id="book-consultation">
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-border/30 bg-card shadow-2xl p-8 lg:p-14 text-left">
              
              <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 blur-[100px] rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none" />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
                <div className="md:col-span-8 space-y-4">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[9px] font-bold uppercase tracking-widest">
                    <Zap className="w-3 h-3 text-primary animate-bounce" />
                    <span>Elite Guidance & Consultation</span>
                  </div>
                  <h3 className="text-2xl lg:text-4xl font-extrabold font-cinzel text-text-primary leading-tight">
                    Begin Your Journey with LEO Family
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed max-w-xl">
                    Connect directly with Raajeev Singh Chauhann and LEO Family for corporate brand alignment, residential spatial Vastu audits, mobile number realignment, and personal horoscope analysis.
                  </p>
                </div>

                <div className="md:col-span-4 flex flex-col gap-3">
                  <a
                    href={WHATSAPP_CONSULTATION_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-premium py-4 px-6 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-center shadow-lg cursor-pointer"
                  >
                    Book Consultation
                  </a>
                  <a
                    href="/contact"
                    className="py-3.5 px-6 rounded-2xl border border-border/20 text-text-secondary hover:text-primary hover:border-primary/50 text-[10px] font-bold uppercase tracking-widest text-center transition-all cursor-pointer"
                  >
                    Contact Office
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
