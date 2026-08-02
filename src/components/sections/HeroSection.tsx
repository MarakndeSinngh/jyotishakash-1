import React, { useEffect, useState } from 'react';
import { Section } from '../../types/cms';
import { motion, useAnimation } from 'framer-motion';
import SmartImage from './SmartImage';
import { FounderImage } from '../common/FounderImage';
import { WHATSAPP_LINK, SOCIAL_LINKS } from '../../constants/contacts';
import { BrandRegistry } from '../../config/brandRegistry';
import { useAcademy } from '../../context/AcademyContext';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Sparkles, 
  Star, 
  Award, 
  CheckCircle2, 
  Globe, 
  Youtube, 
  Facebook, 
  Film, 
  ExternalLink, 
  BookOpen, 
  Users, 
  TrendingUp,
  MapPin,
  Compass,
  Zap,
  ChevronRight
} from 'lucide-react';

interface HeroSectionProps {
  section: Section;
}

const HeroSection: React.FC<HeroSectionProps> = ({ section }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { activeAcademy } = useAcademy();
  const { t } = useLanguage();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const trustLinks = [
    { name: "Main Website", icon: Globe, url: activeAcademy?.socialLinks?.youtube || BrandRegistry.websites.main.url, label: activeAcademy?.shortName || "Academy" },
    { name: "Facebook Page", icon: Facebook, url: activeAcademy?.socialLinks?.facebook || SOCIAL_LINKS.facebook, label: `${activeAcademy?.instructorName} Facebook` },
    { name: "YouTube Channel", icon: Youtube, url: activeAcademy?.socialLinks?.youtube || SOCIAL_LINKS.youtube.main, label: `${activeAcademy?.instructorName} YouTube` },
    { name: "Student Reviews", icon: Star, url: BrandRegistry.assets.videoLinks?.studentReviewsPlaylist || "https://youtube.com", label: "5.0 ★ Student Reviews" },
  ];

  const stats = activeAcademy?.stats && activeAcademy.stats.length > 0 ? activeAcademy.stats.map(s => ({
    value: s.value,
    label: s.label,
    desc: s.desc,
    icon: Award
  })) : [
    { value: "20+", label: "Years Experience", desc: "Scientific practice", icon: Award },
    { value: "Thousands", label: "Consultations", desc: "Global clients", icon: Zap },
    { value: "Thousands", label: "Students", desc: "Empowered globally", icon: Users },
    { value: "Multiple", label: "Online Courses", desc: "Astro, Numerology & Vastu", icon: BookOpen },
    { value: "International", label: "Community", desc: "Spanning across continents", icon: Globe },
  ];

  const badges = [
    "Practical Guidance",
    "Personalized Consultation",
    "Scientific Approach",
    "Ancient Wisdom"
  ];

  const whatsappUrl = activeAcademy?.contactDetails?.whatsapp || WHATSAPP_LINK;
  const roles = activeAcademy?.instructorTitle ? activeAcademy.instructorTitle.split(/&|,|•/).map(r => r.trim()).filter(Boolean) : ["Mentor", "Numerologist"];

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-background text-text-primary pt-24 md:pt-28 pb-12 z-10 transition-colors duration-300">
      
      {/* 🌌 COSMIC BACKGROUND ENGINE */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        
        {/* Dynamic Deep Nebula Layer */}
        <motion.div 
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.6, 0.4],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,rgba(245,158,11,0.03)_40%,transparent_70%)]"
        />
        <motion.div 
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, -5, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[20%] -right-[10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.06)_0%,rgba(139,92,246,0.03)_50%,transparent_70%)]"
        />

        {/* Ambient Dark Stars */}
        <div className="absolute inset-0 opacity-40">
          {[...Array(60)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-[2px] h-[2px] bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.1, 0.8, 0.1],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Floating Golden Particles */}
        <div className="absolute inset-0 opacity-50">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                backgroundColor: '#D4AF37',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                boxShadow: '0 0 8px #FFD700',
              }}
              animate={{
                y: [0, -40 - Math.random() * 60],
                x: [0, (Math.random() - 0.5) * 30],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 6 + Math.random() * 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 6,
              }}
            />
          ))}
        </div>

        {/* ⚛️ FLOATING SACRED GEOMETRY (Interactive Background Elements) */}
        <motion.div 
          style={{ x: mousePosition.x * 0.5, y: mousePosition.y * 0.5 }}
          className="absolute right-[5%] top-[15%] w-[400px] h-[400px] opacity-10 pointer-events-none"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full text-amber-500 animate-[spin_100s_linear_infinite]">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.2" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.15" />
            <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="0.1" />
            {[...Array(12)].map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              const x2 = 50 + 45 * Math.cos(angle);
              const y2 = 50 + 45 * Math.sin(angle);
              return (
                <line key={i} x1="50" y1="50" x2={x2} y2={y2} stroke="currentColor" strokeWidth="0.15" />
              );
            })}
            {[...Array(6)].map((_, i) => {
              const angle = (i * 60 * Math.PI) / 180;
              const cx = 50 + 15 * Math.cos(angle);
              const cy = 50 + 15 * Math.sin(angle);
              return (
                <circle key={i} cx={cx} cy={cy} r="15" fill="none" stroke="currentColor" strokeWidth="0.1" />
              );
            })}
          </svg>
        </motion.div>

        <motion.div 
          style={{ x: mousePosition.x * -0.3, y: mousePosition.y * -0.3 }}
          className="absolute left-[2%] bottom-[20%] w-[300px] h-[300px] opacity-[0.08] pointer-events-none"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-400 animate-[spin_80s_linear_infinite_reverse]">
            <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" fill="none" stroke="currentColor" strokeWidth="0.25" />
            <polygon points="50,95 95,75 95,25 50,5 5,25 5,75" fill="none" stroke="currentColor" strokeWidth="0.15" />
            <polygon points="50,15 80,32 80,68 50,85 20,68 20,32" fill="none" stroke="currentColor" strokeWidth="0.2" />
            <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="0.1" />
          </svg>
        </motion.div>
      </div>

      <div className="container mx-auto px-6 relative z-10 flex-grow flex flex-col justify-center">
        
        {/* 🔥 MAIN SPLIT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center my-auto">
          
          {/* ==================== LEFT SIDE: COGNITIVE COPY & CTAS ==================== */}
          <div className="lg:col-span-7 flex flex-col text-left space-y-8">
            
            {/* Position / Spiritual Tagline */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-3 bg-surface/40 border border-primary/20 px-4 py-2 rounded-full w-fit backdrop-blur-md"
            >
              <div className="relative">
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                <div className="absolute inset-0 bg-primary/30 blur-[4px] rounded-full animate-ping opacity-75" />
              </div>
              <span className="text-[10px] md:text-xs font-cinzel font-bold tracking-[0.25em] text-primary uppercase">
                {t('hero.tagline', 'Ancient Wisdom Powered by Modern Intelligence')}
              </span>
            </motion.div>

            {/* High Impact Headline */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-cinzel tracking-tight leading-[1.2] text-text-primary"
              >
                {t('hero.title', 'Unlock the Hidden Blueprint of Your Life')}
              </motion.h1>

              {/* High-value Premium Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-text-secondary text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-2xl font-sans"
              >
                {t('hero.subtitle', 'Experience authentic Numerology, Astrology, Vastu, Name Correction, Spiritual Guidance and AI-powered analysis designed to help you make better life decisions.')}
              </motion.p>
            </div>

            {/* CTAs with Luxury Feel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-8 py-5 bg-primary text-background font-extrabold uppercase tracking-[0.15em] text-xs md:text-sm rounded-xl text-center shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer hover:brightness-110"
                style={{ boxShadow: '0 10px 30px rgba(var(--primary-rgb), 0.3)' }}
              >
                <div className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 translate-x-full group-hover:translate-x-[-100%] transition-transform duration-1000 ease-out" />
                {t('hero.ctaText', 'Book Personal Consultation')}
              </a>

              <button
                onClick={() => {
                  const el = document.getElementById('services') || document.querySelector('[class*="services"]');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group px-8 py-5 bg-card hover:bg-surface border border-border/40 hover:border-primary/40 text-text-primary font-bold uppercase tracking-[0.15em] text-xs md:text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t('hero.secondaryCtaText', 'Explore Courses')}</span>
                <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            {/* Below CTA: Trust elements */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="space-y-4 pt-2"
            >
              <div className="flex items-center gap-2 text-primary font-sans text-sm font-semibold">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <span className="text-text-secondary">Trusted by Thousands of Students</span>
              </div>

              {/* Bullet checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
                {badges.map((badge, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-text-secondary text-xs md:text-sm">
                    <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                    <span>{badge}</span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* ==================== RIGHT SIDE: PREMIUM FOUNDER CARD ==================== */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative w-full max-w-[380px] sm:max-w-[420px] group"
            >
              {/* Glowing Background Ring Animation */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-700 rounded-[2.5rem] opacity-30 group-hover:opacity-60 blur-xl transition duration-1000 group-hover:duration-200 animate-tilt pointer-events-none" />
              
              {/* Luxury Frame Container */}
              <div className="relative bg-card border border-border/40 rounded-[2.5rem] p-5 backdrop-blur-2xl overflow-hidden flex flex-col justify-between shadow-2xl">
                
                {/* Image frame utilizing central FounderImage component for Maharaja glow & custom framings */}
                <div className="relative aspect-[4/5] w-full flex justify-center items-center">
                  <FounderImage 
                    size="xl" 
                    variant="portrait" 
                    animation="shine" 
                    priority={true} 
                    showGlow={true}
                    showFrame={true}
                    className="w-full h-full"
                  />
                  
                  {/* Absolute positioning badge for "Founder" */}
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-amber-950/80 border border-amber-400/30 px-4 py-1.5 rounded-full backdrop-blur-md z-30">
                    <p className="text-[9px] uppercase tracking-[0.25em] text-amber-300 font-bold font-cinzel text-center">
                      {activeAcademy?.shortName || activeAcademy?.name || "Instructor Academy"}
                    </p>
                  </div>
                </div>

                {/* Founder Professional Copy */}
                <div className="pt-6 pb-2 text-center relative z-10">
                  <h3 className="text-2xl font-bold font-cinzel text-text-primary tracking-wide">
                    {activeAcademy?.instructorName || "Instructor"}
                  </h3>
                  
                  {/* Professional Accreditations */}
                  <div className="flex flex-wrap justify-center gap-1.5 mt-3 mb-4">
                    {roles.map((role, rIdx) => (
                      <span 
                        key={rIdx} 
                        className="bg-primary/5 border border-primary/10 px-2.5 py-0.5 rounded-full text-[10px] text-text-primary tracking-wider hover:border-primary/45 transition-colors"
                      >
                        {role}
                      </span>
                    ))}
                  </div>

                  {/* In-app Quote block */}
                  <p className="text-text-secondary text-sm font-sans italic tracking-wide max-w-xs mx-auto border-t border-border/20 pt-3">
                    "{t('hero.quote', 'Your journey begins with understanding yourself.')}"
                  </p>
                </div>

              </div>

            </motion.div>
          </div>

        </div>

      </div>

      {/* ==================== BOTTOM OF HERO: SCROLLING TRUST BAR ==================== */}
      <div className="relative w-full border-t border-b border-border/20 bg-card/60 backdrop-blur-md py-6 mt-16 z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-3 flex items-center justify-between">
          <p className="text-[10px] uppercase font-cinzel font-bold tracking-[0.3em] text-primary">
            CONNECT WITH OUR COMMUNITY
          </p>
          <span className="text-[9px] text-text-secondary tracking-widest hidden sm:inline-block">
            ★ AUTHENTIC CHANNELS
          </span>
        </div>

        {/* Continuous Horizontal Scrolling Track */}
        <div className="relative w-full overflow-hidden flex items-center select-none py-1">
          <div className="flex gap-4 sm:gap-6 animate-[marquee_30s_linear_infinite] whitespace-nowrap min-w-full shrink-0">
            {[...trustLinks, ...trustLinks, ...trustLinks].map((link, idx) => {
              const IconComp = link.icon;
              return (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-card hover:bg-surface border border-border/40 hover:border-primary/45 px-5 py-3 rounded-xl transition-all duration-300 group shadow-md cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center text-primary border border-border/20 group-hover:scale-110 transition-transform">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] uppercase tracking-widest text-text-primary font-bold leading-tight transition-colors">
                      {link.name}
                    </span>
                    <span className="text-[9px] text-text-secondary font-sans group-hover:text-primary transition-colors">
                      {link.label}
                    </span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-text-secondary group-hover:text-primary ml-1 opacity-50 group-hover:opacity-100 transition-all" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* ==================== BELOW HERO: ANIMATED STATISTICS ==================== */}
      <div className="relative w-full bg-transparent pt-12 pb-4 z-10 border-t border-border/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {stats.map((stat, i) => {
              const StatIcon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="bg-card hover:bg-surface border border-border/20 hover:border-primary/30 p-5 rounded-2xl backdrop-blur-md transition-all duration-300 group flex flex-col items-center text-center justify-between shadow-lg"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform mb-3">
                    <StatIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-2xl md:text-3xl font-extrabold text-primary font-cinzel tracking-tight leading-none">
                      {stat.value}
                    </h4>
                    <p className="text-xs font-bold text-text-primary tracking-widest uppercase mt-2 font-cinzel">
                      {stat.label}
                    </p>
                    <p className="text-[10px] text-text-secondary font-sans mt-1 transition-colors">
                      {stat.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Styles for horizontal looping marquee */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.333333%); }
        }
      `}</style>

    </section>
  );
};

export default HeroSection;
