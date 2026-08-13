import React, { useEffect, useState } from 'react';
import { Assets } from '../../config/assets';
import { Section } from '../../types/cms';
import { motion } from 'framer-motion';
import SmartImage from './SmartImage';
import { WHATSAPP_LINK, SOCIAL_LINKS } from '../../constants/contacts';
import { BrandRegistry } from '../../config/brandRegistry';
import { useAcademy } from '../../context/AcademyContext';
import { useLanguage } from '../../context/LanguageContext';
import { facultyService } from '../../services/facultyService';
import { Faculty } from '../../models/faculty';
import { YoutubeThumbnail } from '../common/YoutubeThumbnail';
import { useVideoLightbox } from '../common/VideoLightbox';
import { useMedia } from '../../media/MediaProvider';
import { 
  Sparkles, 
  Star, 
  Award, 
  CheckCircle2, 
  Globe, 
  Youtube, 
  Facebook, 
  ExternalLink, 
  BookOpen, 
  Users, 
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Compass,
  ArrowUpRight
} from 'lucide-react';

interface HeroSectionProps {
  section?: Section;
}

const FLOATING_STATS = [
  { value: '100K+', label: 'Students', sublabel: 'Empowered Globally' },
  { value: '10+', label: 'Countries', sublabel: 'International Alumni' },
  { value: '4.9★', label: 'Rating', sublabel: 'Student Satisfaction' }
];

const HeroSection: React.FC<HeroSectionProps> = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mentors, setMentors] = useState<Faculty[]>([]);
  const { switchAcademy } = useAcademy();
  const { t } = useLanguage();
  const { openLightbox } = useVideoLightbox();
  const { items: media, openPlayer, refresh } = useMedia();

  useEffect(() => {
    refresh();
  }, [refresh]);

  const studentReviews = media
    .filter(item => item.category === "Student Reviews" && item.visibility !== 'private')
    .sort((a, b) => {
      const timeA = new Date(a.createdAt || a.updatedAt || 0).getTime();
      const timeB = new Date(b.createdAt || b.updatedAt || 0).getTime();
      return timeB - timeA;
    });

  const spiritualShorts = media
    .filter(item => item.category === "Trending Spiritual Shorts" && item.visibility !== 'private')
    .sort((a, b) => {
      const timeA = new Date(a.createdAt || a.updatedAt || 0).getTime();
      const timeB = new Date(b.createdAt || b.updatedAt || 0).getTime();
      return timeB - timeA;
    });

  const reviewItem = studentReviews.length > 0 ? studentReviews[0] : undefined;
  const shortItem = spiritualShorts.length > 0 ? spiritualShorts[0] : undefined;

  const reviewsData = [
    {
      title: reviewItem ? reviewItem.title : "Deep Student Reviews",
      link: reviewItem ? reviewItem.youtubeUrl : (BrandRegistry.assets.videoLinks?.studentReviewsPlaylist || "https://youtube.com/playlist?list=PLOFld0SYjqbZ-wCREGBGP4d96TDm7ZbDf"),
      desc: reviewItem ? reviewItem.description : "Comprehensive video journals of professionals and business owners sharing their genuine transformations.",
      tag: "Student Reviews",
      image: reviewItem ? reviewItem.thumbnail : "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",
      buttonText: "WATCH REVIEWS",
      item: reviewItem
    },
    {
      title: shortItem ? shortItem.title : "Bite-Sized Student Shorts",
      link: shortItem ? shortItem.youtubeUrl : (BrandRegistry.assets.videoLinks?.unfilteredShort || "https://youtube.com/shorts/RcmLxAECJAc"),
      desc: shortItem ? shortItem.description : "Quick, unfiltered student experiences and profound insights captured directly from our live webinars.",
      tag: "Trending Spiritual Shorts",
      image: shortItem ? shortItem.thumbnail : "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
      buttonText: "WATCH SHORTS",
      item: shortItem
    }
  ];

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

  useEffect(() => {
    facultyService.getAllFaculty()
      .then(setMentors)
      .catch(err => console.error('Failed to load active faculty in HeroSection:', err));
  }, []);

  const trustLinks = [
    { name: "Main Website", icon: Globe, url: BrandRegistry.websites.main.url, label: "LEO Family Ecosystem" },
    { name: "Facebook Page", icon: Facebook, url: SOCIAL_LINKS.facebook, label: "Official Facebook" },
    { name: "YouTube Channel", icon: Youtube, url: SOCIAL_LINKS.youtube.main, label: "Official YouTube Channel" },
    { name: "Student Reviews", icon: Star, url: BrandRegistry.assets.videoLinks?.studentReviewsPlaylist || "https://youtube.com", label: "4.9★ Verified Reviews" },
  ];

  const handleExploreAcademies = () => {
    const el = document.getElementById('mentors') || document.getElementById('comparison') || document.getElementById('featured-courses');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between overflow-hidden bg-background text-text-primary pt-24 md:pt-32 pb-12 z-10 transition-colors duration-300">
      
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
          {[...Array(50)].map((_, i) => (
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
          {[...Array(20)].map((_, i) => (
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

        {/* ⚛️ FLOATING SACRED GEOMETRY */}
        <motion.div 
          style={{ x: mousePosition.x * 0.5, y: mousePosition.y * 0.5 }}
          className="absolute right-[5%] top-[10%] w-[400px] h-[400px] opacity-10 pointer-events-none"
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
          </svg>
        </motion.div>
      </div>

      <div className="container mx-auto px-6 relative z-10 flex-grow flex flex-col justify-center max-w-7xl">
        
        {/* 🔥 MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center my-auto">
          
          {/* ==================== LEFT SIDE: LEO FAMILY BRAND COPY & CTAS ==================== */}
          <div className="lg:col-span-5 flex flex-col text-left space-y-7">
            
            {/* Tagline / Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2.5 bg-surface/50 border border-primary/30 px-4 py-2 rounded-full w-fit backdrop-blur-md shadow-sm"
            >
              <div className="relative">
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                <div className="absolute inset-0 bg-primary/30 blur-[4px] rounded-full animate-ping opacity-75" />
              </div>
              <span className="text-[10px] sm:text-xs font-cinzel font-bold tracking-[0.25em] text-primary uppercase">
                India's Leading Spiritual Ecosystem
              </span>
            </motion.div>

            {/* HERO TITLE & SUBTITLE */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-cinzel tracking-tight leading-[1.1] text-text-primary"
              >
                LEO FAMILY
              </motion.h1>

              {/* Subtitle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.25 }}
                className="space-y-1 font-cinzel font-bold text-lg sm:text-xl text-amber-400"
              >
                <p>One Platform • Multiple Expert Mentors • One Mission</p>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.35 }}
                className="text-text-secondary text-sm sm:text-base font-light leading-relaxed max-w-xl font-sans"
              >
                Discover authentic Numerology, Astrology, Vastu, Gemstones, Spiritual Science and AI-powered learning from India's leading experts under ONE unified organization.
              </motion.p>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.45 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2"
            >
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-7 py-4 bg-primary text-background font-extrabold uppercase tracking-[0.15em] text-xs rounded-xl text-center shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer hover:brightness-110 flex items-center justify-center gap-2"
                style={{ boxShadow: '0 10px 25px rgba(212, 175, 55, 0.3)' }}
              >
                <span>Book Personal Consultation</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <button
                onClick={handleExploreAcademies}
                className="group px-7 py-4 bg-card hover:bg-surface border border-primary/30 hover:border-primary text-text-primary font-bold uppercase tracking-[0.15em] text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Compass className="w-4 h-4 text-primary" />
                <span>Explore Programs</span>
              </button>
            </motion.div>

            {/* FLOATING STATISTICS BADGES */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.55 }}
              className="grid grid-cols-3 gap-3 pt-4 border-t border-border/20 max-w-xl"
            >
              {FLOATING_STATS.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-card/90 border border-amber-400/25 rounded-2xl p-3 text-center backdrop-blur-md hover:border-amber-400/50 transition-colors shadow-md"
                >
                  <span className="text-xl sm:text-2xl font-extrabold font-cinzel text-amber-400 block leading-tight">
                    {stat.value}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-text-primary font-cinzel block mt-0.5">
                    {stat.label}
                  </span>
                  <span className="text-[9px] text-text-secondary font-sans block hidden sm:block">
                    {stat.sublabel}
                  </span>
                </div>
              ))}
            </motion.div>

          </div>

          {/* ==================== RIGHT SIDE: PREMIUM 3-MENTOR SHOWCASE ==================== */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="space-y-4"
            >
              {/* Showcase Header Badge */}
              <div className="flex items-center justify-between pb-2">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
                  The Master Mentor
                </span>
                <span className="text-[10px] text-text-secondary font-cinzel uppercase tracking-widest hidden sm:inline">
                  Select an Academy
                </span>
              </div>
                    {/* Mentors Side By Side */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
                {mentors.map((mentor, index) => {
                  const roleBadge = mentor.id === 'raajeev' || mentor.title.toLowerCase().includes('founder') ? '👑 Founder' : '🎓 Senior Faculty';
                  return (
                  <motion.div
                    key={mentor.id}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="group relative bg-card/90 border border-amber-400/35 hover:border-amber-400 rounded-[2rem] p-5 backdrop-blur-md flex flex-col justify-between items-center text-center shadow-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all duration-300"
                  >
                    {/* Glowing Accent Ring Behind Photo */}
                    <div className="absolute top-4 w-28 h-28 rounded-full bg-gradient-to-tr from-amber-500/20 via-primary/30 to-amber-300/10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    {/* Mentor Photo Container */}
                    <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-primary via-amber-300 to-amber-600 shadow-md overflow-hidden mb-3 group-hover:scale-105 transition-transform duration-300">
                      <SmartImage
                        src={mentor.image}
                        alt={mentor.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>

                    {/* Role Badge */}
                    <span className="text-[9px] font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 border border-amber-400/30 px-2.5 py-0.5 rounded-full mb-2">
                      {roleBadge}
                    </span>

                    {/* Name */}
                    <h3 className="text-sm sm:text-base font-bold font-cinzel text-text-primary group-hover:text-primary transition-colors leading-tight mb-1">
                      {mentor.name}
                    </h3>

                    {/* Title */}
                    <p className="text-[11px] font-semibold text-text-secondary font-sans leading-snug mb-4 min-h-[32px]">
                      {mentor.title}
                    </p>

                    {/* View Academy Button */}
                    <button
                      onClick={() => switchAcademy(mentor.id)}
                      className="w-full py-2.5 bg-primary/10 hover:bg-primary text-primary hover:text-background border border-primary/30 font-bold uppercase tracking-wider text-[10px] rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm group-hover:bg-primary group-hover:text-background"
                    >
                      <span>{mentor.name} Programs</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>

                  </motion.div>
                );})}
              </div>

              {/* Compact Media Cards: Student Reviews & Trending Spiritual Shorts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {reviewsData.map((rev, i) => {
                  const siblingVideos = reviewsData.map(v => ({
                    url: v.link,
                    title: v.title,
                    channelName: 'LEO Family Reviews'
                  }));

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                      onClick={() => {
                        if (rev.item) {
                          openPlayer(rev.item);
                        } else {
                          openLightbox(rev.link, rev.title, 'LEO Family Reviews', siblingVideos);
                        }
                      }}
                      className="group bg-card/90 border border-border/20 hover:border-primary/40 rounded-2xl overflow-hidden flex flex-col justify-between shadow-lg hover:shadow-xl cursor-pointer transition-all p-3.5 space-y-3"
                    >
                      {/* Compact Thumbnail */}
                      <div className="relative aspect-video w-full bg-[#0E0601] overflow-hidden rounded-xl">
                        <YoutubeThumbnail
                          url={rev.link}
                          aspectRatio="video"
                          className="w-full h-full opacity-85"
                          showPlayButton={true}
                          hoverEffect={true}
                          alt={rev.title}
                        />
                        <span className="absolute top-2.5 left-2.5 z-20 bg-background/90 border border-primary/25 px-2 py-0.5 rounded-full text-[9px] text-primary uppercase tracking-widest font-bold">
                          {rev.tag}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="space-y-1.5 text-left px-1">
                        <h4 className="text-xs sm:text-sm font-bold text-text-primary font-cinzel tracking-tight line-clamp-1">
                          {rev.title}
                        </h4>
                        <p className="text-text-secondary text-[11px] font-light leading-relaxed line-clamp-2">
                          {rev.desc}
                        </p>
                      </div>

                      {/* Action Button */}
                      <div className="pt-1 px-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (rev.item) {
                              openPlayer(rev.item);
                            } else {
                              openLightbox(rev.link, rev.title, 'LEO Family Reviews', siblingVideos);
                            }
                          }}
                          className="w-full inline-flex items-center justify-center gap-1.5 py-2 bg-background group-hover:bg-primary border border-border/20 text-text-secondary group-hover:text-background font-bold uppercase tracking-wider text-[9px] rounded-xl transition-all cursor-pointer shadow-xs"
                        >
                          <span>{rev.buttonText}</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

            </motion.div>
          </div>

        </div>

      </div>

      {/* ==================== BOTTOM TRUST BAR ==================== */}
      <div className="relative w-full border-t border-b border-border/20 bg-card/60 backdrop-blur-md py-4 mt-12 z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-2 flex items-center justify-between">
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
                  className="inline-flex items-center gap-3 bg-card hover:bg-surface border border-border/40 hover:border-primary/45 px-5 py-2.5 rounded-xl transition-all duration-300 group shadow-md cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-lg bg-background flex items-center justify-center text-primary border border-border/20 group-hover:scale-110 transition-transform">
                    <IconComp className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] uppercase tracking-widest text-text-primary font-bold leading-tight">
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

