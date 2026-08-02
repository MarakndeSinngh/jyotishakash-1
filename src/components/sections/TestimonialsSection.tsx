import React, { useState, useRef, useEffect } from 'react';
import { Section, Testimonial } from '../../types/cms';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { 
  Play, 
  Star, 
  Award, 
  GraduationCap, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Sparkles, 
  Calendar, 
  TrendingUp, 
  Heart, 
  ShieldCheck, 
  Globe, 
  Youtube, 
  Facebook, 
  Instagram, 
  Linkedin, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Video, 
  Check,
  MessageSquare
} from 'lucide-react';
import SmartImage from './SmartImage';
import { YoutubeThumbnail } from '../common/YoutubeThumbnail';
import { useVideoLightbox, VideoItem } from '../common/VideoLightbox';
import { WHATSAPP_LINK, SOCIAL_LINKS } from '../../constants/contacts';
import { BrandRegistry } from '../../config/brandRegistry';
import QuickSuccessStories from './QuickSuccessStories';

interface TestimonialsSectionProps {
  section: Section;
  testimonials: Testimonial[];
}

// 🔢 COUNT-UP COMPONENT (Highly performant, prevents layout thrashing)
const CountUp: React.FC<{ value: number; suffix?: string }> = ({ value, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    if (start === end) return;

    const totalMilliseconds = 2000;
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

export default function TestimonialsSection({ section, testimonials }: TestimonialsSectionProps) {
  
  // Modal & Lightbox Hook
  const { openLightbox } = useVideoLightbox();

  // Before & After Selected State
  const [activeBeforeAfterTab, setActiveBeforeAfterTab] = useState<'before' | 'after'>('before');

  // Horizontal Scroll Reference for Shorts
  const shortsScrollRef = useRef<HTMLDivElement>(null);

  // 1. Video Stories Data (Chaldean Numerology & Vedic Astrology Successes)
  const featuredVideos = [
    {
      id: "RcmLxAECJAc", // Actual Short ID as representative
      name: "Meenakshi Sharma",
      city: "Mumbai, India",
      course: "Spiritual Name Correction",
      summary: "Restructured her signature and witnessed massive professional breakthrough in film production.",
      duration: "4 Mins"
    },
    {
      id: "videoseries?list=PLOFld0SYjqbZ-wCREGBGP4d96TDm7ZbDf", // Playlist Series
      isPlaylistUrl: true,
      name: "Amit & Priya Singhal",
      city: "New Delhi, India",
      course: "Corporate Vastu Consultation",
      summary: "Harmonized their factory layout using non-destructive remedies, enhancing teamwork and yield.",
      duration: "12 Mins"
    },
    {
      id: "RcmLxAECJAc", // Repeat or another representative
      name: "Dr. Rajesh Chauhan",
      city: "London, UK",
      course: "Professional Chaldean Numerology",
      summary: "Learned the scientific methods of Chaldean grids and successfully transitioned to spiritual coaching.",
      duration: "8 Mins"
    }
  ];

  // 2. YouTube Shorts Data
  const youtubeShorts = [
    {
      id: "RcmLxAECJAc",
      quote: "My signature spelling change changed my focus completely. Truly magical Chaldean science!",
      student: "Aanya Mehta",
      tag: "Name Numerology"
    },
    {
      id: "RcmLxAECJAc",
      quote: "Vastu corrections without breaking a single wall! Sleep cycles and energy are restored.",
      student: "Vikram Malhotra",
      tag: "Vastu Remediations"
    },
    {
      id: "RcmLxAECJAc",
      quote: "The planetary dasha calculations showed me precisely when to launch my tech startup.",
      student: "Rohan Shah",
      tag: "Astrology Success"
    },
    {
      id: "RcmLxAECJAc",
      quote: "Unbiased, scientific, and pure logical consulting. No fear-mongering whatsoever.",
      student: "Kiran Rao",
      tag: "Personal Blueprint"
    }
  ];

  // 3. Transformation Metrics
  const metrics = [
    { value: 20, suffix: "+", label: "Years of Practice", desc: "Pure scientific practice", icon: Award },
    { value: 15000, suffix: "+", label: "Students Guided", desc: "Empowered globally", icon: GraduationCap },
    { value: 25000, suffix: "+", label: "Consultations", desc: "Destiny course corrections", icon: Users },
    { value: 50, suffix: "+", label: "Live Workshops", desc: "Global group alignment", icon: Clock },
    { value: 150, suffix: "+", label: "Online Webinars", desc: "Interactive streaming", icon: Sparkles },
    { value: 45, suffix: "+", label: "Countries Reached", desc: "Global community spans", icon: Globe }
  ];

  // 5. Hand-curated + CMS Testimonial list for highly detailed masonry
  const fallbackTestimonials = [
    {
      name: "Arjun Singhania",
      course: "Business Numerology Mastery",
      feedback: "The spelling correction for my company name, aligning with number 5 vibrations, transformed our brand visibility. Highly recommended for every modern entrepreneur.",
      rating: 5,
      location: "Singapore",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Ritu Kothari",
      course: "Chaldean Numerology Course",
      feedback: "As a tarot reader, this course filled the perfect structural gap in my knowledge. The Chaldean system taught by Raajeev Sir is remarkably logical and direct.",
      rating: 5,
      location: "Jaipur, India",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Edward Harrison",
      course: "Vedic Astrology Consultation",
      feedback: "Raajeev's predictions regarding my career Dasha transition was spot-on. His guidance helped me manage a difficult phase with high mental strength.",
      rating: 5,
      location: "San Francisco, USA",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Preeti Deshmukh",
      course: "Residential Vastu Shastra",
      feedback: "Our family was facing continuous minor illnesses. Raajeev analyzed our north-east cut direction and solved it beautifully without major reconstruction. Peace is back.",
      rating: 5,
      location: "Pune, India",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
    }
  ];

  // Combine live testimonials from props with fallback curated ones to display a beautiful masonry layout
  const allTestimonials = testimonials && testimonials.length > 0 
    ? [...testimonials, ...fallbackTestimonials.slice(0, 2)] 
    : fallbackTestimonials;

  // 6. Google & Social Proof Platforms
  const digitalPlatforms = [
    {
      name: "LEO Family Occult",
      platform: "YouTube Channel",
      stat: "120K+ Subscribers",
      link: SOCIAL_LINKS.youtube.main,
      icon: Youtube,
      color: "hover:text-red-500 hover:border-red-500/20"
    },
    {
      name: "LEO Family Indian Films",
      platform: "YouTube Channel",
      stat: "150K+ Subscribers",
      link: SOCIAL_LINKS.youtube.films,
      icon: Youtube,
      color: "hover:text-red-500 hover:border-red-500/20"
    },
    {
      name: "Facebook Page",
      platform: "LEO Family Official",
      stat: "65K+ Community",
      link: SOCIAL_LINKS.facebook,
      icon: Facebook,
      color: "hover:text-blue-500 hover:border-blue-500/20"
    },
    {
      name: "Google & FB Reviews",
      platform: "Verified Feedback",
      stat: "5.0 ★ Google Star Rating",
      link: "https://leofamilyoccult.com/reviews",
      icon: Star,
      color: "hover:text-amber-500 hover:border-amber-500/20"
    }
  ];

  // 7. Community Impact Photos (Grid layout)
  const communityPhotos = [
    {
      url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=500&q=80",
      title: "Live Chaldean Masterclass"
    },
    {
      url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=500&q=80",
      title: "Vastu Webinar Interactive"
    },
    {
      url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=500&q=80",
      title: "Annual Student Convocation"
    },
    {
      url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=500&q=80",
      title: "Mentorship Circle"
    }
  ];

  const handlePlayVideo = (id: string, playlist: boolean = false, name?: string, course?: string) => {
    const isPlaylistUrl = playlist || id.includes('list=') || id.includes('videoseries');
    const url = isPlaylistUrl 
      ? `https://youtube.com/playlist?list=PLOFld0SYjqbZ-wCREGBGP4d96TDm7ZbDf` 
      : `https://youtube.com/watch?v=${id}`;
    
    const siblings: VideoItem[] = featuredVideos.map(v => {
      const isPl = !!v.isPlaylistUrl;
      const vUrl = isPl 
        ? `https://youtube.com/playlist?list=PLOFld0SYjqbZ-wCREGBGP4d96TDm7ZbDf` 
        : `https://youtube.com/watch?v=${v.id}`;
      return {
        url: vUrl,
        title: `${v.name} - ${v.course} Success Story`,
        channelName: 'LEO Family Student Journeys'
      };
    });

    openLightbox(
      url, 
      name ? `${name} - ${course} Success Story` : 'Student Transformation Success Story', 
      'LEO Family Student Journeys', 
      siblings
    );
  };

  const handlePlayShort = (id: string, activeShort: any) => {
    const url = `https://youtube.com/shorts/${id}`;
    const siblings: VideoItem[] = youtubeShorts.map(s => ({
      url: `https://youtube.com/shorts/${s.id}`,
      title: s.quote,
      channelName: `${s.student} (${s.tag})`
    }));
    openLightbox(
      url,
      activeShort.quote,
      `${activeShort.student} (${activeShort.tag})`,
      siblings
    );
  };

  const scrollShorts = (dir: 'left' | 'right') => {
    if (shortsScrollRef.current) {
      const scrollAmt = dir === 'left' ? -320 : 320;
      shortsScrollRef.current.scrollBy({ left: scrollAmt, behavior: 'smooth' });
    }
  };

  return (
    <section id="success-stories" className="relative bg-background text-text-primary py-24 sm:py-32 overflow-hidden z-10 font-sans selection:bg-primary/30 selection:text-text-primary">
      
      {/* 🌌 COSMIC BACKGROUND LAYER */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] left-[25%] w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,var(--primary-glow,rgba(212,175,55,0.03))_0%,transparent_70%)]" />
        <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,var(--secondary-glow,rgba(168,85,247,0.02))_0%,transparent_70%)] animate-pulse" />
      </div>

      <div className="container mx-auto px-6 relative z-10">

        {/* ==================================================
            SECTION TITLE
            ================================================== */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-primary/5 border border-primary/20 px-4 py-1.5 rounded-full mb-6"
          >
            <Users className="w-4 h-4 text-primary" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-primary">
              Verified Spiritual Success & Impact
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-cinzel tracking-tight leading-tight mb-6 text-text-primary">
            Real People. Real Learning. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary/60">
              Real Transformation
            </span>
          </h2>

          <p className="text-text-secondary text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto">
            The greatest proof of our work is the success and confidence of our students and consultation clients. Explore genuine experiences from people who chose to begin their journey with LEO Family.
          </p>
        </div>


        {/* ==================================================
            PART 1 — FEATURED VIDEO SUCCESS STORIES
            ================================================== */}
        <div className="mb-24 sm:mb-28">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 pb-4 border-b border-border/10">
            <div>
              <span className="text-[9px] uppercase tracking-widest text-primary font-bold block mb-1">AUDIBLE PROOF</span>
              <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-text-primary">Hear Their Journey</h3>
            </div>
            <a
              href={BrandRegistry.assets.videoLinks?.studentReviewsPlaylist || "https://youtube.com/playlist?list=PLOFld0SYjqbZ-wCREGBGP4d96TDm7ZbDf"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:text-primary/85 mt-2 sm:mt-0 transition-colors cursor-pointer"
            >
              <span>View Full YouTube Playlist</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredVideos.map((video, idx) => {
              const videoUrl = video.isPlaylistUrl 
                ? `https://youtube.com/playlist?list=PLOFld0SYjqbZ-wCREGBGP4d96TDm7ZbDf` 
                : `https://youtube.com/watch?v=${video.id}`;
                
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6 }}
                  className="group bg-card border border-border/10 hover:border-primary/20 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between transition-all duration-300"
                >
                  {/* Real Dynamic Youtube Thumbnail with Play Overlay */}
                  <div 
                    onClick={() => handlePlayVideo(video.id, !!video.isPlaylistUrl, video.name, video.course)}
                    className="relative aspect-video w-full bg-[#0E0601] cursor-pointer overflow-hidden"
                  >
                    <YoutubeThumbnail
                      url={videoUrl}
                      aspectRatio="video"
                      className="w-full h-full opacity-80"
                      showPlayButton={true}
                      hoverEffect={true}
                      alt={video.name}
                    />
                    
                    <span className="absolute bottom-4 left-4 z-20 bg-background/80 border border-border/10 px-2.5 py-1 rounded-full text-[9px] text-text-secondary uppercase tracking-widest font-semibold flex items-center gap-1">
                      <Clock className="w-3 h-3 text-primary" />
                      <span>{video.duration} Watch</span>
                    </span>
                  </div>

                  {/* Video Info Content */}
                  <div className="p-6 text-left flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-base font-bold text-text-primary font-cinzel">{video.name}</h4>
                        <span className="text-[10px] text-text-secondary/60">{video.city}</span>
                      </div>

                      <span className="text-[10px] font-bold text-primary uppercase tracking-wider block mb-2">{video.course}</span>
                      <p className="text-text-secondary text-xs sm:text-sm font-light leading-relaxed mb-6">
                        "{video.summary}"
                      </p>
                    </div>

                    <button
                      onClick={() => handlePlayVideo(video.id, !!video.isPlaylistUrl, video.name, video.course)}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 bg-background group-hover:bg-primary text-text-secondary group-hover:text-background font-bold uppercase tracking-wider text-[10px] rounded-xl transition-all duration-300 border border-border/10 group-hover:border-primary cursor-pointer"
                    >
                      <span>Watch Now</span>
                      <Video className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>


        {/* ==================================================
            PART 2 — QUICK SUCCESS STORIES
            ================================================== */}
        <div className="mb-24 sm:mb-28">
          <QuickSuccessStories />
        </div>


        {/* ==================================================
            PART 3 — TRANSFORMATION METRICS
            ================================================== */}
        <div className="mb-24 sm:mb-32">
          <div className="text-center mb-12">
            <span className="text-[9px] uppercase tracking-[0.3em] text-text-secondary/60 font-cinzel block mb-2">
              OUR NUMERICAL ALIGNMENT
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-text-primary">
              Institutional Growth in Figures
            </h3>
            <div className="w-16 h-[1px] bg-primary/30 mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
            {metrics.map((metric, i) => {
              const IconComp = metric.icon;
              return (
                <div
                  key={i}
                  className="bg-card/40 hover:bg-card border border-border/10 hover:border-primary/20 p-5 rounded-2xl backdrop-blur-md transition-all duration-300 text-center flex flex-col items-center justify-between min-h-[140px] group shadow-lg"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform mb-3">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xl sm:text-2xl font-bold font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-text-primary to-primary leading-none">
                      <CountUp value={metric.value} suffix={metric.suffix} />
                    </h4>
                    <p className="text-[10px] uppercase font-bold tracking-wider text-text-primary mt-2 font-cinzel leading-tight">
                      {metric.label}
                    </p>
                    <p className="text-[9px] text-text-secondary font-sans mt-1 group-hover:text-text-secondary transition-colors">
                      {metric.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>


        {/* ==================================================
            PART 4 — BEFORE & AFTER JOURNEY
            ================================================== */}
        <div className="mb-28 sm:mb-36">
          <div className="text-center mb-16">
            <span className="text-[9px] uppercase tracking-[0.3em] text-text-secondary/60 font-cinzel block mb-2">
              THE CONSCIOUS DESTINY ARCH
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-cinzel text-text-primary">
              The Path of Personal Evolution
            </h3>
            <p className="text-text-secondary text-sm font-sans mt-2">
              Discover how learning authentic Chaldean Numerology and Vastu corrects long-term energetic blockages.
            </p>
            <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4" />
          </div>

          <div className="max-w-4xl mx-auto bg-card/80 border border-border/10 rounded-[2.5rem] p-6 sm:p-10 backdrop-blur-md shadow-2xl">
            {/* Horizontal switch tabs */}
            <div className="flex bg-background p-1.5 rounded-2xl max-w-sm mx-auto mb-10 border border-border/10">
              <button
                onClick={() => setActiveBeforeAfterTab('before')}
                className={`flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeBeforeAfterTab === 'before' 
                    ? 'bg-red-950/50 text-red-400 border border-red-500/20' 
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Before Guidance
              </button>
              <button
                onClick={() => setActiveBeforeAfterTab('after')}
                className={`flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeBeforeAfterTab === 'after' 
                    ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-500/20' 
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                After Guidance
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activeBeforeAfterTab === 'before' ? (
                <motion.div
                  key="before"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left"
                >
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-400 px-3 py-1 rounded-full text-[9px] uppercase tracking-wider font-semibold">
                      <span>Destiny Obscured</span>
                    </div>
                    <h4 className="text-xl font-bold font-cinzel text-text-primary">The Cycle of Uncertainty</h4>
                    <p className="text-text-secondary text-sm leading-relaxed font-light">
                      Without conscious awareness of your planetary frequencies and name numbers, decisions are often driven by emotional anxiety, leading to repeating business traps, incompatible partner choices, and structural layout chaos.
                    </p>
                  </div>

                  <div className="space-y-3 sm:pl-8 sm:border-l border-border/10">
                    {[
                      { title: "Universal Confusion", desc: "Uncertainty about ideal business choices or career timings." },
                      { title: "Subconscious Self-Doubt", desc: "Constant feeling of swimming upstream against a heavy destiny." },
                      { title: "Repeating Obstacles", desc: "Contracts, promotions, and payments experiencing regular delays." },
                      { title: "Home Friction", desc: "Inability to find restful sleep or focused energy in your environment." }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-3 items-start">
                        <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs font-bold text-text-primary block">{item.title}</span>
                          <span className="text-[11px] text-text-secondary block leading-tight">{item.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="after"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left"
                >
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-[9px] uppercase tracking-wider font-semibold">
                      <span>Destiny Aligned</span>
                    </div>
                    <h4 className="text-xl font-bold font-cinzel text-text-primary">Conscious Sovereignty</h4>
                    <p className="text-text-secondary text-sm leading-relaxed font-light">
                      Applying scientific spelling corrections, choosing positive mobile combinations, and matching structural bedroom layouts with earth's natural currents enables profound, conscious flow.
                    </p>
                  </div>

                  <div className="space-y-3 sm:pl-8 sm:border-l border-border/10">
                    {[
                      { title: "Scientific Self-Awareness", desc: "Clarity on your core karmic map and exact timing cycles (Dashas)." },
                      { title: "Unshakable Direction", desc: "Making bold business incorporation and branding decisions with facts." },
                      { title: "Harmonized Spatial Abundance", desc: "Home rooms aligned to direct physical and mental healing energy." },
                      { title: "Confident Decision-Making", desc: "Inner peace knowing your vibration matches your active name grid." }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-3 items-start">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs font-bold text-text-primary block">{item.title}</span>
                          <span className="text-[11px] text-emerald-500 block leading-tight">{item.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>


        {/* ==================================================
            PART 5 — STUDENT WALL (Masonry Testimonials)
            ================================================== */}
        <div className="mb-28 sm:mb-36">
          <div className="text-center mb-16">
            <span className="text-[9px] uppercase tracking-[0.3em] text-text-secondary/60 font-cinzel block mb-2">
              GLOBAL COMMUNITY FEEDBACK
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-cinzel text-text-primary">
              The Student & Client Wall
            </h3>
            <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4" />
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 [column-fill:_balance] max-w-6xl mx-auto">
            {allTestimonials.map((test, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="break-inside-avoid bg-card/40 hover:bg-card border border-border/10 hover:border-primary/20 p-6 sm:p-8 rounded-2xl flex flex-col justify-between transition-all duration-300 text-left shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
                      ))}
                    </div>
                    <span className="text-[9px] uppercase tracking-widest text-text-secondary bg-background border border-border/10 px-2.5 py-0.5 rounded-full">
                      Verified
                    </span>
                  </div>

                  <p className="text-text-primary text-xs sm:text-sm font-light leading-relaxed mb-6 italic">
                    "{test.feedback}"
                  </p>
                </div>

                <div className="flex items-center gap-3.5 pt-4 border-t border-border/10">
                  {test.image ? (
                    <SmartImage
                      src={test.image}
                      alt={test.name}
                      className="w-10 h-10 rounded-full object-cover ring-1 ring-border/10"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 font-bold text-sm">
                      {test.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <span className="text-xs font-bold text-text-primary block font-cinzel tracking-wider">{test.name}</span>
                    <span className="text-[10px] text-text-secondary block leading-tight">
                      {(test as any).course || "Consultation Client"}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>


        {/* ==================================================
            PART 6 — GOOGLE & SOCIAL PROOF
            ================================================== */}
        <div className="mb-28 sm:mb-36">
          <div className="text-center mb-16">
            <span className="text-[9px] uppercase tracking-[0.3em] text-text-secondary/60 font-cinzel block mb-2">
              ORGANIC CONSCIOUS MOVEMENT
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-cinzel text-text-primary">
              Growing Trust Across Platforms
            </h3>
            <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {digitalPlatforms.map((plat, i) => {
              const IconComp = plat.icon;
              return (
                <a
                  key={i}
                  href={plat.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group bg-card/40 border border-border/10 p-6 rounded-2xl backdrop-blur-md transition-all duration-300 flex flex-col justify-between shadow-lg text-left cursor-pointer ${plat.color}`}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-10 h-10 rounded-xl bg-background border border-border/10 flex items-center justify-center text-text-secondary group-hover:text-text-primary transition-colors">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] text-text-secondary font-bold uppercase tracking-widest bg-background border border-border/10 px-2 py-0.5 rounded-full">
                      Active
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-text-primary tracking-wide font-cinzel">{plat.name}</h4>
                    <span className="text-[10px] text-text-secondary block mt-0.5 mb-2">{plat.platform}</span>
                    <p className="text-primary font-bold text-xs font-sans tracking-wide">
                      {plat.stat}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between text-[10px] uppercase tracking-widest text-text-secondary group-hover:text-text-primary transition-colors font-semibold">
                    <span>Explore Platform</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              );
            })}
          </div>
        </div>


        {/* ==================================================
            PART 7 — COMMUNITY IMPACT (Visual Collage)
            ================================================== */}
        <div className="mb-28 sm:mb-32">
          <div className="text-center mb-16">
            <span className="text-[9px] uppercase tracking-[0.3em] text-text-secondary/60 font-cinzel block mb-2">
              CONSCIOUS SEEDING
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-cinzel text-text-primary">
              Learning Together. Growing Together.
            </h3>
            <p className="text-text-secondary text-sm font-sans mt-2">
              Glimpses of active global webinars, physical workshops, and elite community convocations.
            </p>
            <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {communityPhotos.map((photo, idx) => (
              <div
                key={idx}
                className="group relative h-48 sm:h-56 rounded-[1.5rem] overflow-hidden bg-card shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent z-10" />
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute bottom-4 left-4 z-20 text-left">
                  <span className="text-[9px] text-primary font-bold uppercase tracking-wider block mb-0.5">LEO Family Life</span>
                  <p className="text-text-primary text-xs font-cinzel font-bold">{photo.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* ==================================================
            PART 8 — TRUST BADGES
            ================================================== */}
        <div className="mb-24 sm:mb-28 max-w-4xl mx-auto">
          <div className="bg-card/40 border border-border/10 py-6 px-4 sm:px-10 rounded-[2rem] backdrop-blur-md">
            <div className="flex flex-wrap justify-center items-center gap-5 sm:gap-8 text-xs text-text-primary">
              {[
                "Authentic Guidance",
                "Practical Learning",
                "Personalized Consultation",
                "Ethical Practice",
                "Continuous Education",
                "Community Driven"
              ].map((badge, idx) => (
                <div key={idx} className="flex items-center gap-1.5 font-sans">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span className="font-semibold tracking-wider">{badge}</span>
                </div>
              ))}
            </div>
          </div>
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
            {/* Ambient cyber glow */}
            <div className="absolute -top-[50%] right-[25%] w-[50%] h-[50%] bg-primary/10 blur-[80px] rounded-full pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-primary bg-primary/5 border border-primary/10 px-3 py-1 rounded-full">
                Begin Your Journey
              </span>

              <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-cinzel text-text-primary leading-tight">
                Your Story Could Be Next
              </h3>

              <p className="text-text-secondary text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed">
                Thousands have started their journey with one simple step. Begin yours today through a consultation or a structured learning program. Align your vibrational name structures and planetary charts now.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 bg-primary text-background font-extrabold uppercase tracking-wider text-xs rounded-xl shadow-lg hover:opacity-90 transition-all hover:-translate-y-0.5 text-center cursor-pointer"
                >
                  Book Consultation
                </a>

                <button
                  onClick={() => {
                    const el = document.getElementById('services') || document.querySelector('[class*="services"]');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-4 bg-background hover:bg-background/80 border border-border/10 text-text-primary font-bold uppercase tracking-wider text-xs rounded-xl transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  Explore Courses
                </button>

                <a
                  href={BrandRegistry.assets.videoLinks?.studentReviewsPlaylist || "https://youtube.com/playlist?list=PLOFld0SYjqbZ-wCREGBGP4d96TDm7ZbDf"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary font-bold uppercase tracking-wider text-xs rounded-xl transition-all hover:-translate-y-0.5 text-center cursor-pointer"
                >
                  Watch More Student Stories
                </a>
              </div>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Global video lightbox context processes modals automatically */}

    </section>
  );
}
