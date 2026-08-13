import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import SmartImage from './SmartImage';
import { FounderImage } from '../common/FounderImage';
import { YoutubeThumbnail } from '../common/YoutubeThumbnail';
import { useVideoLightbox } from '../common/VideoLightbox';
import { useMedia } from '../../media/MediaProvider';
import { WHATSAPP_LINK, SOCIAL_LINKS } from '../../constants/contacts';
import { BrandRegistry } from '../../config/brandRegistry';
import { 
  Award, 
  CheckCircle2, 
  Globe, 
  Youtube, 
  Facebook, 
  Film, 
  ExternalLink, 
  BookOpen, 
  Users, 
  Zap, 
  Heart, 
  Compass, 
  Sparkles, 
  Star, 
  GraduationCap, 
  ShieldCheck, 
  ArrowUpRight,
  MessageSquareHeart,
  ChevronRight,
  Tv
} from 'lucide-react';

// CountUp Component for animated statistics
const CountUp: React.FC<{ value: number; suffix?: string }> = ({ value, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    if (start === end) return;

    const totalMilliseconds = 1500;
    const incrementTime = Math.max(Math.floor(totalMilliseconds / end), 16);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / (totalMilliseconds / incrementTime));
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

export default function TrustCredibilitySection() {
  const { openLightbox } = useVideoLightbox();
  
  // Part 1 Stats Data
  const statsData = [
    { value: 20, suffix: "+", label: "Years Experience", desc: "Scientific Vedic & Astro practice", icon: Award },
    { value: 15000, suffix: "+", label: "Students Guided", desc: "Empowered globally through courses", icon: GraduationCap },
    { value: 25000, suffix: "+", label: "Consultations", desc: "For families, professionals & leaders", icon: Zap },
    { value: 12, suffix: "+", label: "Online Courses", desc: "Astro, Numerology & Vastu", icon: BookOpen },
    { value: 10, suffix: "+ Countries", label: "Global Presence", desc: "Spanning across 6 continents", icon: Globe },
    { value: 100, suffix: "K+", label: "Digital Followers", desc: "Strong and active organic community", icon: Users },
  ];

  // Part 2 Why Trust Us Cards
  const trustReasons = [
    {
      title: "Practical & Personalized Guidance",
      desc: "Every consultation is tailored to your unique birth chart and numbers rather than relying on generic computerized predictions.",
      icon: Compass
    },
    {
      title: "Ancient Wisdom + Modern Thinking",
      desc: "Traditional Vedic knowledge presented in a highly scientific, structured, and practical way for today's dynamic world.",
      icon: Sparkles
    },
    {
      title: "Ethical & Transparent Approach",
      desc: "No fear-mongering or superstitious myths. We focus purely on positive self-awareness, personal growth, and informed decision-making.",
      icon: ShieldCheck
    },
    {
      title: "Continuous Learning",
      desc: "Regular workshops, interactive webinars, expert-guided masterclasses, and rich educational content help deepen your occult knowledge.",
      icon: BookOpen
    },
    {
      title: "Growing Global Community",
      desc: "Be part of an elite, progressive group of thousands of learners, spiritual seekers, and industry leaders spanning multiple countries.",
      icon: Users
    },
    {
      title: "Lifetime Learning Ecosystem",
      desc: "Our students continue their growth journey long-term through advanced webinars, community groups, and modern AI-powered guidance tools.",
      icon: Zap
    }
  ];

  // Part 4 Digital Ecosystem
  const ecosystemProps = [
    {
      title: "LEO Family",
      link: SOCIAL_LINKS.websites.main,
      desc: "The central hub for authentic masterclasses, professional consultations, and premium spiritual community guidance.",
      tag: "Main Ecosystem Hub"
    },
    {
      title: "Raajeev Singh Chauhann",
      link: SOCIAL_LINKS.websites.founder,
      desc: "The official personal portal of our founder, covering his core spiritual philosophy, public media engagements, and luxury consultations.",
      tag: "Founder's Portal"
    },
    {
      title: "LEO Family Indian Films",
      link: SOCIAL_LINKS.websites.films,
      desc: "Bridging the arts and spirituality. High-production motivational films, inspirational web series, and rich lifestyle content.",
      tag: "Creative Media Wing"
    }
  ];

  // Part 5 Official Social Channels (Editable with CMS placeholder philosophy)
  const socialChannels = [
    {
      platform: "YouTube – LEO Family Indian Films",
      link: SOCIAL_LINKS.youtube.films,
      followers: "150K+ Subscribers",
      desc: "Creative content, short films, and high-production spiritual messages.",
      icon: Youtube,
      color: "hover:text-red-500 hover:border-red-500/30"
    },
    {
      platform: "YouTube – LEO Family Occult Gyan",
      link: SOCIAL_LINKS.youtube.main,
      followers: "120K+ Subscribers",
      desc: "In-depth scientific guides, tutorials, and interactive learning videos on Vedic sciences.",
      icon: Youtube,
      color: "hover:text-red-500 hover:border-red-500/30"
    },
    {
      platform: "YouTube – Raajeev Singh Chauhann",
      link: SOCIAL_LINKS.youtube.founder,
      followers: "80K+ Subscribers",
      desc: "Personal videos, spiritual mentorship lectures, and motivational life coaching series.",
      icon: Youtube,
      color: "hover:text-red-500 hover:border-red-500/30"
    },
    {
      platform: "Facebook – Raajeev Singh Chauhann",
      link: SOCIAL_LINKS.facebook,
      followers: "65K+ Followers",
      desc: "Daily guidance pearls, vastu tips, and direct interactions with our global community.",
      icon: Facebook,
      color: "hover:text-blue-500 hover:border-blue-500/30"
    }
  ];

  // Part 6 Real Student Experiences
  const { items: media, openPlayer } = useMedia();

  const studentReviews = media.filter(
    item => item.category === "Student Reviews" && item.visibility !== 'private'
  );

  const spiritualShorts = media.filter(
    item => item.category === "Trending Spiritual Shorts" && item.visibility !== 'private'
  );

  console.log("HOME_MEDIA_DEBUG", {
    totalMedia: media.length,
    studentReviewsCount: studentReviews.length,
    spiritualShortsCount: spiritualShorts.length,
    studentReviews,
    spiritualShorts
  });

  const reviewItem = studentReviews[0];
  const shortItem = spiritualShorts[0];

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

  // Part 7 Trust Badges
  const trustBadges = [
    "Authentic Guidance",
    "Practical Learning",
    "Personalized Consultation",
    "Ethical Practice",
    "Continuous Education",
    "Community Driven"
  ];

  return (
    <div className="relative bg-background text-text-primary py-24 sm:py-32 overflow-hidden z-10 font-sans selection:bg-primary/30 selection:text-text-primary">
      
      {/* 🔮 BACKGROUND EFFECTS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Subtle Radial Gradients */}
        <div className="absolute top-[10%] left-[5%] w-[80%] h-[60%] bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.05)_0%,transparent_70%)]" />
        <div className="absolute bottom-[10%] right-[5%] w-[70%] h-[50%] bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.03)_0%,transparent_70%)]" />
        
        {/* Fine Floating Dust Particles */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-[1.5px] h-[1.5px] bg-amber-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${3 + Math.random() * 6}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">

        {/* ==================================================
            SECTION TITLE
            ================================================== */}
        <div className="max-w-4xl mx-auto text-center mb-20 sm:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-card border border-primary/20 px-4 py-1.5 rounded-full mb-6 backdrop-blur-md"
          >
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Gold Standard Occult Institution
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-cinzel tracking-tight leading-tight text-text-primary mb-8"
          >
            Trusted by Thousands. <br className="hidden sm:inline" />
            Guided by <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary/80">Experience</span>. Built on <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Authentic Wisdom</span>.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-text-secondary text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto"
          >
            For over two decades, LEO Family has been helping individuals, families, professionals, entrepreneurs, and students make better life decisions through authentic Numerology, Astrology, Vastu, and practical spiritual guidance.
          </motion.p>
        </div>


        {/* ==================================================
            PART 1 — TRUST METRICS
            ================================================== */}
        <div className="mb-24 sm:mb-32">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {statsData.map((stat, i) => {
              const StatIcon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="bg-card border border-border/15 hover:border-primary/40 p-6 sm:p-8 rounded-[2rem] backdrop-blur-md transition-all duration-300 group flex flex-col items-start justify-between min-h-[160px] shadow-lg relative"
                >
                  <div className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <StatIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-text-primary via-primary/80 to-primary font-cinzel tracking-tight leading-none">
                      <CountUp value={stat.value} suffix={stat.suffix} />
                    </h3>
                    <p className="text-xs sm:text-sm font-bold text-text-primary tracking-wider uppercase mt-3 font-cinzel">
                      {stat.label}
                    </p>
                    <p className="text-[11px] sm:text-xs text-text-secondary/80 font-sans mt-1.5 group-hover:text-text-secondary transition-colors">
                      {stat.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>


        {/* ==================================================
            PART 2 — WHY PEOPLE TRUST LEO FAMILY
            ================================================== */}
        <div className="mb-28 sm:mb-36">
          <div className="text-center mb-16">
            <h3 className="text-2xl sm:text-3xl font-bold font-cinzel text-text-primary tracking-wider">
              Why Professionals & Seekers Trust LEO Family
            </h3>
            <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {trustReasons.map((reason, i) => {
              const ReasonIcon = reason.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group bg-card border border-border/20 hover:border-primary/30 p-8 rounded-2xl backdrop-blur-sm transition-all duration-300 flex flex-col justify-between shadow-xl"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-all duration-500 mb-6 shadow-md">
                      <ReasonIcon className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-text-primary tracking-wide mb-3 group-hover:text-primary transition-colors">
                      {reason.title}
                    </h4>
                    <p className="text-text-secondary text-sm font-light leading-relaxed">
                      {reason.desc}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center text-[10px] uppercase tracking-widest text-primary/60 font-semibold group-hover:text-primary transition-colors">
                    <span>Vedic Standard</span>
                    <CheckCircle2 className="w-3.5 h-3.5 ml-1.5 text-emerald-500" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>


        {/* ==================================================
            PART 3 — FOUNDER AUTHORITY
            ================================================== */}
        <div id="founder-biography" className="mb-28 sm:mb-36">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative bg-card border border-border/20 rounded-[3rem] p-8 sm:p-12 lg:p-16 backdrop-blur-2xl overflow-hidden shadow-2xl"
          >
            {/* Corner Decorative Elements */}
            <div className="absolute top-6 left-6 w-6 h-6 border-t-2 border-l-2 border-primary/30 pointer-events-none" />
            <div className="absolute top-6 right-6 w-6 h-6 border-t-2 border-r-2 border-primary/30 pointer-events-none" />
            <div className="absolute bottom-6 left-6 w-6 h-6 border-b-2 border-l-2 border-primary/30 pointer-events-none" />
            <div className="absolute bottom-6 right-6 w-6 h-6 border-b-2 border-r-2 border-primary/30 pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Side: Founder Portrait Image */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-[340px] aspect-[4/5] flex justify-center items-center">
                  <FounderImage 
                    size="xl" 
                    variant="portrait" 
                    animation="shine" 
                    showGlow={true}
                    showFrame={true}
                    className="w-full h-full"
                  />
                </div>
              </div>

              {/* Right Side: Copywriting Content */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-block bg-primary/5 border border-primary/20 px-3 py-1 rounded-full">
                  <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-primary">
                    Sought-after Celebrity Occultist
                  </p>
                </div>

                <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-cinzel text-text-primary leading-tight">
                  Meet the Founder
                </h3>

                <h4 className="text-xl font-bold font-sans text-primary">
                  Raajeev Singh Chauhann
                </h4>

                {/* Accreditations Row */}
                <div className="flex flex-wrap gap-2 pt-1 pb-2 border-b border-border/10">
                  {[
                    "Founder of LEO Family",
                    "Numerologist",
                    "Astrologer",
                    "Vastu Expert",
                    "Life Coach",
                    "Spiritual Mentor"
                  ].map((badge, idx) => (
                    <span 
                      key={idx} 
                      className="bg-background border border-border/20 px-3 py-1 rounded-lg text-xs text-text-secondary tracking-wide"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Biography details */}
                <div className="space-y-4 text-text-secondary text-sm sm:text-base font-light leading-relaxed">
                  <p>
                    With over twenty years of rigorous practice in Vedic Astrology, Chaldean Numerology, and Vastu Shastra, <strong>Raajeev Singh Chauhann</strong> has established himself as a prominent and trusted authority across India and the international spiritual community. 
                  </p>
                  <p>
                    As an acclaimed filmmaker, actor, and spiritual mentor, he seamlessly bridges the divide between deep traditional practices and modern-day application. His holistic guidance has transformed the destinies of corporate leaders, creative artists, entrepreneurs, and students, empowering them with clarity, strength, and structural harmony.
                  </p>
                  <p className="italic border-l-2 border-primary/40 pl-4 py-1 text-text-primary font-serif">
                    "Spiritual intelligence is not about escapism; it is about absolute alignment. By aligning your inner vibrations and outer physical surroundings, you naturally clear the obstacles of destiny."
                  </p>
                </div>

                {/* Premium Button CTA */}
                <div className="pt-4">
                  <a
                    href="https://raajeevsinghchauhann.online"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-6 py-4 bg-primary hover:bg-primary/95 text-background font-bold uppercase tracking-wider text-xs rounded-xl shadow-md transition-all duration-300 hover:-translate-y-0.5 group"
                  >
                    <span>Know More About Raajeev Singh Chauhann</span>
                    <ArrowUpRight className="w-4 h-4 text-background group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>

              </div>

            </div>
          </motion.div>
        </div>


        {/* ==================================================
            PART 4 — DIGITAL ECOSYSTEM
            ================================================== */}
        <div className="mb-28 sm:mb-36">
          <div className="text-center mb-16">
            <h3 className="text-2xl sm:text-3xl font-bold font-cinzel text-text-primary tracking-wider">
              Explore the LEO Family Ecosystem
            </h3>
            <p className="text-text-secondary text-sm font-sans mt-2">
              Authentic vertical spaces built to foster consciousness, education, and creative excellence.
            </p>
            <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {ecosystemProps.map((eco, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="group bg-card border border-border/15 hover:border-primary/30 p-8 rounded-2xl backdrop-blur-md transition-all duration-300 flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[9px] uppercase tracking-widest text-primary font-bold bg-primary/5 border border-primary/10 px-2.5 py-1 rounded-full">
                      {eco.tag}
                    </span>
                    <Globe className="w-4 h-4 text-text-secondary group-hover:text-primary transition-colors" />
                  </div>
                  <h4 className="text-xl font-bold font-cinzel text-text-primary tracking-wide mb-3 group-hover:text-primary transition-colors">
                    {eco.title}
                  </h4>
                  <p className="text-text-secondary text-sm font-light leading-relaxed mb-6">
                    {eco.desc}
                  </p>
                </div>

                <a
                  href={eco.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-between px-5 py-3.5 bg-background group-hover:bg-primary text-text-secondary group-hover:text-background font-bold uppercase tracking-wider text-[10px] rounded-xl transition-all duration-300 border border-border/20 group-hover:border-primary"
                >
                  <span>Visit Platform</span>
                  <ArrowUpRight className="w-4 h-4 text-text-secondary group-hover:text-background transition-colors" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>


        {/* ==================================================
            PART 5 — OFFICIAL SOCIAL CHANNELS
            ================================================== */}
        <div className="mb-28 sm:mb-36">
          <div className="text-center mb-16">
            <h3 className="text-2xl sm:text-3xl font-bold font-cinzel text-text-primary tracking-wider">
              Follow Our Official Channels
            </h3>
            <p className="text-text-secondary text-sm font-sans mt-2">
              Stay connected with authentic Vedic knowledge, interactive occult guides, and spiritual filmmaking.
            </p>
            <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {socialChannels.map((chan, i) => {
              const SocialIcon = chan.icon;
              return (
                <motion.a
                  key={i}
                  href={chan.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group bg-card border border-border/10 p-6 rounded-2xl backdrop-blur-md transition-all duration-300 flex flex-col justify-between shadow-lg ${chan.color}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-background border border-border/10 flex items-center justify-center text-text-secondary group-hover:text-text-primary transition-colors">
                        <SocialIcon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] text-primary font-sans font-semibold">
                        {chan.followers}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-text-primary tracking-wide mb-1.5 font-cinzel">
                      {chan.platform}
                    </h4>
                    <p className="text-text-secondary text-xs font-light font-sans group-hover:text-text-primary transition-colors">
                      {chan.desc}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between text-[10px] uppercase tracking-widest text-text-secondary group-hover:text-text-primary transition-colors font-semibold">
                    <span>Subscribe</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>


        {/* ==================================================
            PART 6 — REAL STUDENT EXPERIENCES
            ================================================== */}
        <div className="mb-28 sm:mb-36">
          <div className="text-center mb-16">
            <h3 className="text-2xl sm:text-3xl font-bold font-cinzel text-text-primary tracking-wider">
              Hear From Our Students
            </h3>
            <p className="text-text-secondary text-sm font-sans mt-2">
              Unfiltered video journals and genuine experiences from students globally.
            </p>
            <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  onClick={() => {
                    if (rev.item) {
                      openPlayer(rev.item);
                    } else {
                      openLightbox(rev.link, rev.title, 'LEO Family Reviews', siblingVideos);
                    }
                  }}
                  className="group bg-card border border-border/15 rounded-[2rem] overflow-hidden flex flex-col justify-between shadow-2xl cursor-pointer"
                >
                  {/* Real Dynamic Youtube Thumbnail with Play Button */}
                  <div className="relative aspect-video w-full bg-[#0E0601] overflow-hidden">
                    <YoutubeThumbnail
                      url={rev.link}
                      aspectRatio="video"
                      className="w-full h-full opacity-80"
                      showPlayButton={true}
                      hoverEffect={true}
                      alt={rev.title}
                    />
                    
                    <span className="absolute top-4 left-4 z-20 bg-background/90 border border-primary/20 px-3 py-1 rounded-full text-[10px] text-primary uppercase tracking-widest font-bold">
                      {rev.tag}
                    </span>
                  </div>

                  <div className="p-6 sm:p-8 text-left space-y-3">
                    <h4 className="text-xl font-bold text-text-primary font-cinzel tracking-wide">
                      {rev.title}
                    </h4>
                    <p className="text-text-secondary text-xs sm:text-sm font-light leading-relaxed">
                      {rev.desc}
                    </p>
                    
                    <div className="pt-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (rev.item) {
                            openPlayer(rev.item);
                          } else {
                            openLightbox(rev.link, rev.title, 'LEO Family Reviews', siblingVideos);
                          }
                        }}
                        className="inline-flex items-center gap-2 px-5 py-3 bg-background group-hover:bg-primary border border-border/20 text-text-secondary group-hover:text-background font-bold uppercase tracking-wider text-[10px] rounded-xl transition-all cursor-pointer"
                      >
                        <span>{rev.buttonText}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>


        {/* ==================================================
            PART 7 — TRUST BADGES
            ================================================== */}
        <div className="mb-24 sm:mb-32">
          <div className="bg-card border border-border/10 py-8 px-6 sm:px-12 rounded-[2rem] backdrop-blur-md">
            <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10">
              {trustBadges.map((badge, idx) => (
                <div key={idx} className="flex items-center gap-2 text-text-secondary text-sm font-sans">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="font-semibold tracking-wider">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* ==================================================
            PART 8 — FINAL CTA
            ================================================== */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-gradient-to-b from-card via-background to-background border border-primary/20 rounded-[3rem] p-8 sm:p-12 lg:p-16 text-center overflow-hidden shadow-2xl max-w-4xl mx-auto"
          >
            {/* Glowing gradient circles under CTA card */}
            <div className="absolute -top-[50%] left-[25%] w-[50%] h-[50%] bg-primary/10 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 space-y-6">
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-primary bg-primary/5 border border-primary/10 px-3 py-1 rounded-full">
                Begin Your Transformation
              </span>

              <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-cinzel text-text-primary leading-tight">
                Your Journey Can Start Today
              </h3>

              <p className="text-text-secondary text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed">
                Whether you seek personal guidance, structured learning, or spiritual growth, LEO Family offers multiple ways to begin your journey. Align your personal energies and change the shape of your tomorrow.
              </p>

              {/* Grid of multiple buttons */}
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 pt-4">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 bg-primary text-background font-bold uppercase tracking-wider text-xs rounded-xl shadow-lg hover:shadow-primary/20 transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  Book Consultation
                </a>

                <button
                  onClick={() => {
                    const el = document.getElementById('services') || document.querySelector('[class*="services"]');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-4 bg-card hover:bg-surface border border-border/20 text-text-primary font-bold uppercase tracking-wider text-xs rounded-xl transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  Explore Courses
                </button>

                <a
                  href={BrandRegistry.assets.videoLinks?.studentReviewsPlaylist || "https://youtube.com/playlist?list=PLOFld0SYjqbZ-wCREGBGP4d96TDm7ZbDf"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 bg-card hover:bg-surface border border-border/20 text-text-primary font-bold uppercase tracking-wider text-xs rounded-xl transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  Watch Student Reviews
                </a>

                <a
                  href={SOCIAL_LINKS.websites.main}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary font-bold uppercase tracking-wider text-xs rounded-xl transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  Join Community
                </a>
              </div>
            </div>
          </motion.div>
        </div>


      </div>

    </div>
  );
}
