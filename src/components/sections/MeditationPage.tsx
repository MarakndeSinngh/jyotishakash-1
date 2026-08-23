import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Clock, 
  Calendar, 
  Users, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Heart, 
  ShieldCheck, 
  Compass, 
  HelpCircle, 
  ChevronDown, 
  MessageCircle,
  Award,
  Zap,
  Volume2,
  Play,
  Scroll,
  Layers,
  Flame,
  ArrowDown
} from 'lucide-react';
import { WHATSAPP_LINK } from '../../constants/contacts';
import SmartImage from './SmartImage';
import { websiteSettingsService } from '../../services/websiteSettingsService';
import { parseYoutubeUrl } from '../../utils/youtube';

const MEDITATION_WHATSAPP_GROUP_URL = 'https://chat.whatsapp.com/E1CeluFqVlIGWzMYVSQ2F9';

interface MeditationPageProps {
  navigate?: (path: string) => void;
}

export default function MeditationPage({ navigate }: MeditationPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [heroYoutubeUrl, setHeroYoutubeUrl] = useState<string>('');
  const [isPlayingHeroVideo, setIsPlayingHeroVideo] = useState(false);

  useEffect(() => {
    async function loadHeroVideo() {
      try {
        const settings = await websiteSettingsService.getSettings();
        if (settings?.meditationHeroYoutubeUrl) {
          setHeroYoutubeUrl(settings.meditationHeroYoutubeUrl);
        }
      } catch (err) {
        console.error('Failed to load meditation hero video setting:', err);
      }
    }
    loadHeroVideo();
  }, []);

  const parsedHero = parseYoutubeUrl(heroYoutubeUrl);
  const heroVideoId = parsedHero.id;

  const whyMeditationCards = [
    {
      title: "Inner Peace",
      description: "Cultivate deep tranquility and quiet the constant mental chatter through proven meditative techniques.",
      icon: Heart
    },
    {
      title: "Mental Clarity",
      description: "Shed mental fog and gain sharp focus to navigate life's complexities with calm discernment.",
      icon: Compass
    },
    {
      title: "Focus & Concentration",
      description: "Train the mind to stay anchored in the present moment, improving productivity and awareness.",
      icon: Zap
    },
    {
      title: "Emotional Balance",
      description: "Develop equanimity in the face of stress, reactivity, and emotional fluctuations.",
      icon: ShieldCheck
    },
    {
      title: "Self Awareness",
      description: "Discover your deeper inner self beyond thoughts, roles, and external distractions.",
      icon: Sparkles
    },
    {
      title: "Spiritual Growth",
      description: "Deepen your spiritual journey and establish a strong foundation for higher inner exploration.",
      icon: Award
    }
  ];

  const experienceSteps = [
    { step: "01", title: "Understand", desc: "Grasp the core philosophy and mechanics of the mind." },
    { step: "02", title: "Practice", desc: "Learn correct posture, breathing, and concentration anchors." },
    { step: "03", title: "Guided Meditation", desc: "Experience live guided sessions with expert mentorship." },
    { step: "04", title: "Develop Daily Practice", desc: "Build sustainable habits to meditate independently every day." },
    { step: "05", title: "Deepen Awareness", desc: "Expand consciousness and integrate mindfulness into daily life." }
  ];

  const learningModules = [
    "Meditation Fundamentals & Philosophy",
    "Preparation and Posture for Stability",
    "Breath Awareness (Prana & Anapanasati)",
    "Concentration (Dharana) Techniques",
    "Guided Meditation & Deep Relaxation",
    "Mindfulness and Present-Moment Awareness",
    "Developing and Maintaining a Regular Practice",
    "Inner Stillness and Mental Equilibrium"
  ];

  const targetAudience = [
    { title: "Beginners", desc: "Complete newcomers looking for a structured, step-by-step introduction to meditation." },
    { title: "Working Professionals", desc: "Individuals seeking stress relief, mental clarity, and work-life balance." },
    { title: "Students", desc: "Learners wanting improved concentration, memory, and emotional resilience." },
    { title: "Spiritual Seekers", desc: "Practitioners wishing to deepen their inner exploration and meditative depth." },
    { title: "Structured Seekers", desc: "People looking for a disciplined, authentic meditation practice." },
    { title: "Existing Practitioners", desc: "Those wanting live guided sessions and refinement under expert mentorship." }
  ];

  const raajeevDifferentiators = [
    {
      title: "Meditation Beyond Relaxation",
      content: "Learn meditation as a disciplined practice for developing awareness, stillness, concentration and a deeper connection with your inner self—not merely as a short relaxation exercise.",
      icon: Compass,
      tag: "Deep Awareness"
    },
    {
      title: "Ho'oponopono & Inner Healing",
      content: "Introduce the Ho'oponopono prayer as part of the inner-work journey, focusing on forgiveness, emotional release, acceptance and cultivating a more peaceful relationship with oneself.",
      icon: Heart,
      tag: "Emotional Release"
    },
    {
      title: "Explore the Akashic Records",
      content: "For students interested in deeper spiritual exploration, sessions may introduce the concept and practice of working with Akashic Records as a contemplative and spiritual framework for self-reflection and exploration.",
      icon: Scroll,
      tag: "Contemplative Depth"
    },
    {
      title: "Healing & Energy Awareness",
      content: "The meditation journey may also introduce students to spiritual healing concepts and practices, helping them explore awareness of emotions, energy and inner balance.",
      icon: Zap,
      tag: "Energy Awareness"
    },
    {
      title: "Chakra Balancing",
      content: "Go beyond basic meditation by exploring chakra awareness and balancing practices as part of a broader spiritual and energy-oriented approach.",
      icon: Sparkles,
      tag: "Chakra Alignment"
    },
    {
      title: "Guidance from an Occult Specialist",
      content: "Raajeev Singh Chauhann's wider experience in occult and spiritual disciplines allows meditation to be taught within a broader framework of self-awareness, energy practices and spiritual exploration. The benefit is that students can understand how different spiritual practices can complement their meditation journey.",
      icon: Award,
      tag: "Holistic Mastery"
    }
  ];

  const beneficialPoints = [
    {
      num: "01",
      title: "Broader Spiritual Perspective",
      desc: "Understand meditation within a wider spiritual framework."
    },
    {
      num: "02",
      title: "Structured Guidance",
      desc: "Learn through guided sessions rather than trying to build a practice entirely on your own."
    },
    {
      num: "03",
      title: "Multiple Inner-Work Practices",
      desc: "Explore meditation alongside practices such as Ho'oponopono, chakra awareness and other spiritual approaches taught in the sessions."
    },
    {
      num: "04",
      title: "Deeper Self-Exploration",
      desc: "Use meditation as a foundation for reflection, awareness and understanding your inner experiences."
    },
    {
      num: "05",
      title: "Integrated Learning",
      desc: "Learn from a mentor whose broader knowledge spans meditation, occult sciences and related spiritual disciplines."
    }
  ];

  const visualJourney = [
    { step: "CALM", desc: "Still the mental turbulence" },
    { step: "AWARENESS", desc: "Anchor in conscious presence" },
    { step: "INNER EXPLORATION", desc: "Reflective inquiry & emotional release" },
    { step: "ENERGY AWARENESS", desc: "Chakra balance & subtle flow" },
    { step: "SPIRITUAL PRACTICE", desc: "Sustained holistic integration" }
  ];

  const faqs = [
    {
      q: "Is meditation suitable for beginners?",
      a: "Yes, our meditation curriculum is thoughtfully structured to be completely beginner-friendly, guiding you step-by-step from basics to sustained practice."
    },
    {
      q: "Do I need previous meditation experience?",
      a: "No prior experience is necessary. All teachings begin from foundational principles."
    },
    {
      q: "Are the sessions live?",
      a: "Yes, batches feature live online interactive sessions led directly under expert guidance."
    },
    {
      q: "How long is each session?",
      a: "Sessions typically range from 60 to 90 minutes, combining instruction, guided practice, and Q&A."
    },
    {
      q: "What should I bring to the session?",
      a: "A comfortable seat or meditation cushion, a quiet space, a notebook for reflections, and an open mind."
    },
    {
      q: "Is the batch online or offline?",
      a: "Current batches are conducted live online via interactive video conferencing, accessible from anywhere."
    },
    {
      q: "Are recordings provided?",
      a: "Yes, enrolled participants receive access to session recordings for review and continued practice."
    },
    {
      q: "Which language is used?",
      a: "Sessions are conducted in clear, accessible English and Hindi blend for effortless understanding."
    },
    {
      q: "How can I join the next batch?",
      a: "You can click 'Join Upcoming Batch' or connect with our team via WhatsApp to reserve your spot on the interest list."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-text-primary pt-28 pb-24 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[15%] left-[10%] w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)]" />
        <div className="absolute top-[60%] right-[5%] w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.03)_0%,transparent_70%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl space-y-24">
        
        {/* Back Navigation */}
        {navigate && (
          <div className="mb-[-12px]">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-secondary hover:text-primary transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
          </div>
        )}

        {/* 1. HERO SECTION (WITH FEATURED YOUTUBE VIDEO) */}
        <section className="text-center max-w-4xl mx-auto space-y-6 pt-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em]"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
            <span>LEO FAMILY MEDITATION ACADEMY</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-cinzel tracking-tight text-text-primary leading-tight"
          >
            Quiet the Mind. <span className="text-primary gold-glow-text">Awaken Within.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary text-base sm:text-xl font-light leading-relaxed font-sans max-w-2xl mx-auto"
          >
            Experience a sacred, structured journey into meditation under expert guidance. Develop inner stillness, mental clarity, emotional balance, and a profound connection with your true self.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <a
              href={MEDITATION_WHATSAPP_GROUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-primary hover:bg-primary/90 text-background font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-lg hover:scale-105 flex items-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Join Meditation WhatsApp Group</span>
            </a>
            <a
              href="#batches"
              className="px-8 py-4 bg-card border border-border/40 hover:border-primary/40 text-text-primary font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <span>Explore Batches</span>
            </a>
          </motion.div>

          {/* HERO VIDEO / FEATURED PLAYER */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="pt-8 max-w-4xl mx-auto"
          >
            {heroVideoId ? (
              <div className="relative w-full aspect-video rounded-3xl overflow-hidden border-2 border-primary/40 bg-stone-950 shadow-2xl group">
                {!isPlayingHeroVideo ? (
                  <>
                    <img
                      src={`https://i.ytimg.com/vi/${heroVideoId}/maxresdefault.jpg`}
                      alt="Meditation Featured Video"
                      className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://i.ytimg.com/vi/${heroVideoId}/hqdefault.jpg`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/20 pointer-events-none" />
                    
                    <div className="absolute top-4 left-4 z-10">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-950/80 border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                        <Sparkles className="w-3 h-3 text-primary animate-pulse" />
                        Featured Meditation Guidance
                      </span>
                    </div>

                    <button
                      onClick={() => setIsPlayingHeroVideo(true)}
                      aria-label="Play Meditation Video"
                      className="absolute inset-0 flex items-center justify-center z-20 cursor-pointer group/btn"
                    >
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary text-background flex items-center justify-center shadow-2xl group-hover/btn:scale-110 transition-transform duration-300">
                        <Play className="w-8 h-8 fill-background ml-1" />
                      </div>
                    </button>
                  </>
                ) : (
                  <iframe
                    src={`https://www.youtube.com/embed/${heroVideoId}?autoplay=1&rel=0`}
                    title="Meditation Featured Video"
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
            ) : (
              <div className="relative w-full aspect-video rounded-3xl overflow-hidden border-2 border-primary/30 bg-gradient-to-br from-card via-stone-900 to-stone-950 shadow-xl flex flex-col items-center justify-center text-center p-8 space-y-3">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06)_0%,transparent_70%)] pointer-events-none" />
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shadow-md relative z-10">
                  <Sparkles className="w-7 h-7 animate-pulse" />
                </div>
                <div className="space-y-1 relative z-10">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">MEDITATION JOURNEY</span>
                  <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-text-primary">Quiet Awareness & Inner Peace</h3>
                  <p className="text-xs text-text-secondary font-light max-w-md mx-auto">
                    Explore inner stillness and guided awareness. Configure a featured meditation video in the Admin panel to display it here.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </section>

        {/* 2. WHY LEARN MEDITATION FROM RAAJEEV SINGH CHAUHANN? (PREMIUM SECTION) */}
        <section className="space-y-16 pt-6">
          {/* Section Introduction */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em]">
              <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
              <span>MULTIDISCIPLINARY SPIRITUAL GUIDANCE</span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold font-cinzel text-text-primary leading-tight">
              Why Learn Meditation From <span className="text-primary gold-glow-text">Raajeev Singh Chauhann</span>?
            </h2>

            <p className="text-text-secondary text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
              Learning meditation is not only about learning how to sit quietly. With the right guidance, it can become a structured journey into awareness, inner work and deeper self-understanding.
            </p>

            <p className="text-xs sm:text-sm text-stone-400 font-light leading-relaxed max-w-2xl mx-auto">
              Raajeev Singh Chauhann brings together meditation with his wider experience in numerology, astrology, vastu and occult/spiritual practices, creating a broader context for students who want to explore meditation beyond basic relaxation.
            </p>
          </div>

          {/* 6 Key Differentiator Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {raajeevDifferentiators.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="bg-card/90 border border-border/40 hover:border-primary/50 rounded-3xl p-7 space-y-4 shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group flex flex-col justify-between"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors pointer-events-none" />
                  
                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-surface/80 border border-border/30 text-stone-400">
                        {card.tag}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold font-cinzel text-text-primary group-hover:text-primary transition-colors">
                      {card.title}
                    </h3>

                    <p className="text-xs text-text-secondary leading-relaxed font-light">
                      {card.content}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-border/20 flex items-center gap-1.5 text-[11px] font-semibold text-primary/80">
                    <Sparkles className="w-3 h-3 text-primary" />
                    <span>Holistic Dimension</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Highlighted Differentiator Banner */}
          <div className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-card via-stone-900 to-card border border-primary/30 shadow-2xl text-center space-y-4 overflow-hidden max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />
            
            <div className="inline-flex items-center gap-2 text-primary text-[10px] font-bold uppercase tracking-[0.3em]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE CORE PHILOSOPHY</span>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-cinzel text-text-primary">
              One Mentor. Multiple Dimensions of Inner Work.
            </h3>

            <p className="text-xs sm:text-sm text-text-secondary max-w-2xl mx-auto leading-relaxed font-light">
              Instead of learning meditation in isolation, students can explore meditation alongside complementary spiritual practices and occult knowledge under one guided learning environment.
            </p>
          </div>

          {/* Why This Approach Can Be Beneficial */}
          <div className="bg-card/50 border border-border/30 rounded-3xl p-8 sm:p-12 shadow-xl space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
                LEARNING ADVANTAGE
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-cinzel text-text-primary">
                Why This Approach Can Be Beneficial
              </h3>
              <p className="text-xs text-stone-400 font-light">
                Discover the distinctive depth of studying meditation within a multifaceted spiritual framework.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {beneficialPoints.map((item, idx) => (
                <div 
                  key={idx} 
                  className={`bg-background/90 border border-border/30 rounded-2xl p-6 space-y-3 relative hover:border-primary/40 transition-colors ${
                    idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black font-mono px-2 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20">
                      {item.num}
                    </span>
                    <h4 className="text-sm font-bold font-cinzel text-text-primary">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* A Personalized Learning Journey */}
          <div className="bg-card/70 border border-border/30 rounded-3xl p-8 sm:p-12 shadow-xl space-y-8 text-center">
            <div className="space-y-2 max-w-xl mx-auto">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
                PROGRESSION
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-cinzel text-text-primary">
                A Personalized Learning Journey
              </h3>
              <p className="text-xs text-stone-400 font-light">
                A natural inward path progressing from calm to sustained spiritual discipline.
              </p>
            </div>

            {/* Visual Journey Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
              {visualJourney.map((journey, idx) => (
                <div key={idx} className="relative flex flex-col items-center">
                  <div className="w-full bg-background border border-border/40 hover:border-primary/40 rounded-2xl p-5 space-y-2 transition-colors h-full flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-primary font-mono block mb-1">
                        STAGE 0{idx + 1}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold font-cinzel text-text-primary tracking-wide">
                        {journey.step}
                      </h4>
                    </div>
                    <p className="text-[11px] text-text-secondary font-light leading-snug">
                      {journey.desc}
                    </p>
                  </div>
                  {idx < visualJourney.length - 1 && (
                    <div className="hidden lg:flex absolute -right-2 top-1/2 -translate-y-1/2 z-20 text-primary/40 pointer-events-none">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <p className="text-xs sm:text-sm text-stone-300 font-serif italic max-w-xl mx-auto pt-2 border-t border-border/20">
              "Every practice begins with awareness. The deeper journey develops through consistent learning, reflection and practice."
            </p>
          </div>

          {/* Premium Mentor Callout Card */}
          <div className="bg-gradient-to-br from-card via-card/90 to-stone-900 border-2 border-primary/40 rounded-3xl p-8 sm:p-12 shadow-2xl max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-2 border-primary/50 shrink-0 bg-stone-900 shadow-xl relative group">
              <SmartImage
                src="/assets/teachers/Raajeev.webp"
                alt="Raajeev Singh Chauhann"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="space-y-4 text-center sm:text-left flex-1 relative z-10">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
                  LEAD MENTOR & SPIRITUAL GUIDE
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-cinzel text-text-primary">
                  RAAJEEV SINGH CHAUHANN
                </h3>
                <p className="text-[11px] sm:text-xs font-semibold text-primary/90 tracking-wide uppercase">
                  Occult Specialist • Spiritual Mentor • Numerologist • Astrologer • Vastu Expert
                </p>
              </div>

              <p className="text-xs text-text-secondary leading-relaxed font-light">
                Founder & Lead Mentor at LEO Family. Bringing decades of profound spiritual wisdom, occult mastery, and practical meditative teachings to help seekers establish true inner harmony, awareness, and spiritual clarity.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <button
                  onClick={() => {
                    if (navigate) {
                      navigate('/academy/raajeev');
                    } else {
                      window.location.href = '/academy/raajeev';
                    }
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-background rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all duration-300 shadow-md hover:scale-105 cursor-pointer"
                >
                  <span>EXPLORE HIS APPROACH</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Deep Meditation Callout CTA */}
          <div className="text-center max-w-3xl mx-auto bg-card/90 border border-border/40 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-5 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06)_0%,transparent_70%)] pointer-events-none" />
            
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
              EXPAND YOUR PRACTICE
            </span>

            <h3 className="text-2xl sm:text-4xl font-extrabold font-cinzel text-text-primary">
              Your Meditation Journey Can Go Deeper.
            </h3>

            <p className="text-xs sm:text-sm text-text-secondary font-light max-w-xl mx-auto leading-relaxed">
              Learn meditation as a foundation for awareness, inner work and spiritual exploration—with guidance from a mentor who works across multiple dimensions of occult and spiritual knowledge.
            </p>

            <div className="pt-2 flex justify-center">
              <a
                href={MEDITATION_WHATSAPP_GROUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-primary hover:bg-primary/90 text-background font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-lg hover:scale-105 flex items-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>JOIN THE NEXT MEDITATION BATCH</span>
              </a>
            </div>
          </div>
        </section>

        {/* 3. BATCH STARTING SOON - PROMINENT WHATSAPP CTA */}
        <section className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-card via-stone-900 to-card border-2 border-primary/40 shadow-2xl overflow-hidden text-center space-y-6"
          >
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em]">
              <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
              <span>UPCOMING MEDITATION COHORT</span>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-cinzel text-text-primary tracking-wide">
                BATCH STARTING SOON
              </h2>
              <p className="text-text-secondary text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-2xl mx-auto">
                Join the Meditation WhatsApp Group to receive updates about the upcoming batch, including batch dates, timings, enrollment information and other important announcements.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={MEDITATION_WHATSAPP_GROUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 sm:px-10 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm uppercase tracking-widest rounded-xl transition-all duration-300 shadow-xl hover:scale-105 flex items-center justify-center gap-3 cursor-pointer group"
              >
                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>JOIN MEDITATION WHATSAPP GROUP</span>
              </a>
            </div>
          </motion.div>
        </section>

        {/* 3. WHY MEDITATION / BENEFITS */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-bold font-cinzel text-text-primary">
              Why Practice Meditation?
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm font-light">
              The transformative dimensions of inner stillness and conscious awareness in modern life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyMeditationCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-card border border-border/30 hover:border-primary/40 rounded-3xl p-8 space-y-4 shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold font-cinzel text-text-primary">{card.title}</h3>
                  <p className="text-xs text-text-secondary leading-relaxed font-light">{card.description}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* 4. WHAT YOU WILL LEARN / EXPERIENCE */}
        <section className="space-y-16">
          {/* 4A. What You Will Experience */}
          <div className="space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="text-2xl sm:text-4xl font-bold font-cinzel text-text-primary">
                What You Will Experience
              </h2>
              <p className="text-stone-400 text-xs sm:text-sm font-light">
                A progressive, guided learning journey designed to establish lasting inner stillness.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {experienceSteps.map((item, idx) => (
                <div key={idx} className="bg-card border border-border/30 rounded-2xl p-6 relative flex flex-col justify-between space-y-4 shadow-md">
                  <span className="text-2xl font-black text-primary/30 font-mono">{item.step}</span>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold font-cinzel text-text-primary">{item.title}</h3>
                    <p className="text-[11px] text-text-secondary leading-relaxed font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4B. What You May Learn (Curriculum) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-card/40 border border-border/30 rounded-3xl p-8 sm:p-12 shadow-xl">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary bg-primary/10 px-3.5 py-1 rounded-full border border-primary/20">
                CURRICULUM
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-cinzel text-text-primary">
                What You May Learn
              </h2>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-light">
                Our structured modules cover the essential pillars of meditation, breathwork, posture, and deep relaxation.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {learningModules.map((mod, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3.5 rounded-xl bg-background border border-border/30 text-xs text-text-primary font-medium">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>{mod}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. UPCOMING MEDITATION BATCHES */}
        <section id="batches" className="bg-card/60 border border-border/30 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary bg-primary/10 px-3.5 py-1 rounded-full border border-primary/20">
              UPCOMING BATCH
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-cinzel text-text-primary">
              Meditation Foundation Batch
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary font-light">
              Beginner Friendly • Live Online Mentorship
            </p>
          </div>

          <div className="max-w-2xl mx-auto bg-background/80 border border-border/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border/20">
                <Calendar className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <span className="text-stone-400 block uppercase text-[10px]">Starting Date</span>
                  <strong className="text-text-primary">Coming Soon (Announcing Shortly)</strong>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border/20">
                <Clock className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <span className="text-stone-400 block uppercase text-[10px]">Duration</span>
                  <strong className="text-text-primary">4 Weeks Structured</strong>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border/20">
                <Users className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <span className="text-stone-400 block uppercase text-[10px]">Mode</span>
                  <strong className="text-text-primary">Live Online Interactive</strong>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border/20">
                <BookOpen className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <span className="text-stone-400 block uppercase text-[10px]">Level</span>
                  <strong className="text-text-primary">Beginner Friendly</strong>
                </div>
              </div>
            </div>

            <div className="text-center py-6 border-y border-border/20 space-y-2">
              <h3 className="text-base font-bold font-cinzel text-text-primary">New Meditation Batches Coming Soon</h3>
              <p className="text-xs text-text-secondary max-w-md mx-auto font-light">
                Join our interest list to receive priority notification, curriculum details, and schedule updates for the upcoming batch.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={MEDITATION_WHATSAPP_GROUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>JOIN MEDITATION WHATSAPP GROUP</span>
              </a>
            </div>
          </div>
        </section>

        {/* 6. WHO IS THIS FOR? */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-bold font-cinzel text-text-primary">
              Who Is This For?
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm font-light">
              Whether you are taking your first steps into meditation or seeking structured guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {targetAudience.map((aud, idx) => (
              <div key={idx} className="bg-card border border-border/30 rounded-2xl p-6 space-y-2 shadow-md">
                <h3 className="text-sm font-bold font-cinzel text-text-primary flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  {aud.title}
                </h3>
                <p className="text-xs text-text-secondary font-light leading-relaxed">{aud.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. STUDENT EXPERIENCES (EMPTY STATE) */}
        <section className="text-center py-12 bg-card/30 border border-border/20 rounded-3xl p-8 max-w-xl mx-auto space-y-3">
          <Sparkles className="w-8 h-8 text-primary mx-auto opacity-60" />
          <h3 className="text-lg font-cinzel font-bold text-text-primary">Student Experiences</h3>
          <p className="text-xs text-text-secondary font-light">
            Verified meditation testimonials and practitioner reflections will be published here upon batch completion.
          </p>
        </section>

        {/* 9. FAQ */}
        <section className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-4xl font-bold font-cinzel text-text-primary">
              Frequently Asked Questions
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm font-light">
              Everything you need to know about our meditation batches and sessions.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="bg-card border border-border/30 rounded-2xl overflow-hidden shadow-xs">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-bold text-text-primary hover:text-primary transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-primary shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-text-secondary font-light leading-relaxed border-t border-border/20 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 10. FINAL CTA */}
        <section className="text-center max-w-3xl mx-auto bg-card/80 border border-border/40 rounded-3xl p-10 sm:p-16 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06)_0%,transparent_70%)] pointer-events-none" />
          
          <h2 className="text-3xl sm:text-4xl font-extrabold font-cinzel text-text-primary">
            YOUR JOURNEY WITHIN BEGINS HERE
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary font-light max-w-xl mx-auto leading-relaxed">
            Discover the power of a consistent meditation practice with guided learning and supportive sessions.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={MEDITATION_WHATSAPP_GROUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-lg hover:scale-105 flex items-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Join Meditation WhatsApp Group</span>
            </a>
            <a
              href={`${WHATSAPP_LINK}?text=I have an enquiry regarding LEO Family Meditation classes.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-card border border-border/40 hover:border-primary/40 text-text-primary font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <span>Contact Us</span>
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
