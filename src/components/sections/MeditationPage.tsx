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

  const professions = [
    "Doctor", "Teacher", "Student", "Businessman", "Entrepreneur", "Professional", "Employee", "Homemaker", "Artist", "Creator", "Coach"
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
      q: "How can I join the webinar?",
      a: "You can click any of the WhatsApp Group buttons on this page to join our official WhatsApp group for instant webinar access and updates."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-text-primary pt-28 pb-24 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[15%] left-[10%] w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)]" />
        <div className="absolute top-[60%] right-[5%] w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.03)_0%,transparent_70%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-5xl space-y-24">
        
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
            <span>3 DAYS FREE LIVE MEDITATION WEBINAR</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-cinzel tracking-tight text-text-primary leading-tight"
          >
            Quiet the Mind. <span className="text-primary gold-glow-text">Awaken Within.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card/80 border border-border/40 rounded-3xl p-6 sm:p-10 shadow-xl space-y-4 max-w-2xl mx-auto text-left"
          >
            <div className="space-y-2 text-center">
              <span className="text-primary text-xs font-bold uppercase tracking-widest">🧘‍♂️ WHAT IF… YOUR LIFE DOESN'T NEED ANOTHER SOLUTION?</span>
              <h3 className="text-lg sm:text-xl font-bold font-cinzel text-text-primary">
                WHAT IF… YOU JUST NEED TO CALM YOUR MIND?
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-light text-center">
              Today, we have almost everything—Money. Career. Business. Family. Success. Comfort. Technology. But still… Stress. Overthinking. Anxiety. Relationship Problems. Emotional Pressure. Health Concerns.
            </p>
            <div className="border-t border-border/30 pt-4 text-center space-y-2">
              <p className="text-xs text-text-secondary font-light">And sometimes—</p>
              <p className="text-sm font-bold font-cinzel text-text-primary">EVERYTHING IS FINE OUTSIDE… BUT NOTHING FEELS FINE INSIDE.</p>
              <p className="text-primary font-serif italic text-base pt-1">"सब कुछ होते हुए भी… मैं खुश क्यों नहीं हूँ?"</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
          >
            <a
              href={MEDITATION_WHATSAPP_GROUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm uppercase tracking-widest rounded-xl transition-all duration-300 shadow-xl hover:scale-105 flex items-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>JOIN MEDITATION WHATSAPP GROUP</span>
            </a>
          </motion.div>
        </section>

        {/* HERO YOUTUBE VIDEO SECTION */}
        {heroVideoId && (
          <section className="max-w-4xl mx-auto">
            <div className="bg-card/70 border border-border/40 rounded-3xl p-4 sm:p-6 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-stone-950 border border-border/30 shadow-inner">
                <iframe
                  src={`https://www.youtube.com/embed/${heroVideoId}?autoplay=0&rel=0&modestbranding=1`}
                  title="Meditation Featured Video"
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </section>
        )}

        {/* SECTION 1: EVERY TRANSFORMATION BEGINS WITH THE MIND */}
        <section className="bg-card/80 border border-border/40 rounded-3xl p-8 sm:p-12 shadow-xl space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary bg-primary/10 px-3.5 py-1 rounded-full border border-primary/20">
              SECTION 01
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-cinzel text-text-primary">
              Every Transformation Begins With The Mind
            </h2>
          </div>
          <div className="space-y-4 text-center max-w-2xl mx-auto text-xs sm:text-sm text-text-secondary font-light leading-relaxed">
            <p>We keep trying to fix everything outside.</p>
            <p>But our thoughts, emotions and inner state can deeply influence the way we experience our life.</p>
            <p className="text-primary font-semibold text-sm sm:text-base py-2">
              इसलिए असली बदलाव की शुरुआत बाहर से नहीं… अंदर से होनी चाहिए।
            </p>
          </div>
          <div className="border-t border-border/30 pt-8 max-w-2xl mx-auto space-y-4">
            <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest justify-center">
              <Sparkles className="w-4 h-4" />
              <span>🧘‍♂️ THE POWER OF MEDITATION</span>
            </div>
            <p className="text-center text-xs text-text-secondary">Meditation is not just sitting with closed eyes. It is a journey of:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                "Understanding Your Mind",
                "Connecting With Yourself",
                "Finding Inner Calm",
                "Building Awareness",
                "Creating Positive Change"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-background border border-border/20 text-xs text-text-primary font-medium">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2: I HAVE PERSONALLY SEEN THE TRANSFORMATION… */}
        <section className="bg-gradient-to-br from-card via-stone-900 to-card border border-border/40 rounded-3xl p-8 sm:p-12 shadow-xl space-y-6 text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary bg-primary/10 px-3.5 py-1 rounded-full border border-primary/20">
            SECTION 02
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-cinzel text-text-primary">
            I Have Personally Seen The Transformation…
          </h2>
          <div className="max-w-2xl mx-auto space-y-4 text-xs sm:text-sm text-text-secondary font-light leading-relaxed">
            <p>Many times, one person starts working on themselves through meditation…</p>
            <p>But the transformation doesn't stop with that person.</p>
            <p className="text-primary font-semibold text-sm sm:text-base py-1">
              जब एक व्यक्ति अंदर से बदलता है, तो उसका असर पूरे परिवार पर पड़ सकता है।
            </p>
            <p>When one person becomes calmer—Relationships can become better.</p>
            <p>When one person becomes emotionally stronger—The whole family can experience a positive shift.</p>
          </div>
          <div className="pt-2">
            <span className="inline-block px-6 py-2 rounded-full bg-primary/20 border border-primary/40 text-primary text-xs font-bold uppercase tracking-widest">
              INNER TRANSFORMATION
            </span>
          </div>
        </section>

        {/* SECTION 3: 3 DAYS FREE LIVE MEDITATION WEBINAR */}
        <section className="bg-card/90 border-2 border-primary/40 rounded-3xl p-8 sm:p-12 shadow-2xl text-center space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/25">
            SECTION 03 • FREE WEBINAR
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-cinzel text-text-primary">
            3 Days Free Live Meditation Webinar
          </h2>
          <p className="text-sm font-bold text-emerald-400">YES — IT'S COMPLETELY FREE!</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl mx-auto py-2 text-xs">
            <div className="bg-background/80 border border-border/30 p-3 rounded-xl flex flex-col items-center justify-center space-y-1">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-stone-400 text-[10px]">TIME</span>
              <strong className="text-text-primary">5:00 AM – 6:00 AM</strong>
            </div>
            <div className="bg-background/80 border border-border/30 p-3 rounded-xl flex flex-col items-center justify-center space-y-1">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="text-stone-400 text-[10px]">DURATION</span>
              <strong className="text-text-primary">3 Days Live</strong>
            </div>
            <div className="bg-background/80 border border-border/30 p-3 rounded-xl flex flex-col items-center justify-center space-y-1">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-stone-400 text-[10px]">MODE & ACCESS</span>
              <strong className="text-text-primary">Online • 100% Free</strong>
            </div>
          </div>

          <div className="pt-2">
            <a
              href={MEDITATION_WHATSAPP_GROUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-xl hover:scale-105 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>JOIN MEDITATION WHATSAPP GROUP</span>
            </a>
          </div>
        </section>

        {/* SECTION 4: BUT THERE'S ONE SMALL CONDITION… */}
        <section className="bg-card/70 border border-border/40 rounded-3xl p-8 sm:p-12 shadow-xl space-y-6 text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary bg-primary/10 px-3.5 py-1 rounded-full border border-primary/20">
            SECTION 04
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-cinzel text-text-primary">
            But There's One Small Condition…
          </h2>
          <div className="max-w-xl mx-auto space-y-4 text-xs sm:text-sm text-text-secondary font-light leading-relaxed">
            <p className="text-text-primary font-bold text-base">YOU HAVE TO WAKE UP AT 5 AM.</p>
            <p className="text-primary font-semibold">सुबह 5 बजे उठना आसान नहीं है।</p>
            <p className="font-serif italic text-stone-300">"If you want to achieve something, you have to sacrifice something."</p>
            <p>For just three days… थोड़ी नींद का त्याग कीजिए। अपने लिए एक घंटा निकालिए।</p>
            <p className="font-bold text-text-primary">Wake up at 5:00 AM. Sit with yourself. And experience—THE POWER OF MEDITATION.</p>
          </div>
        </section>

        {/* SECTION 5: 5:00 AM – 6:00 AM */}
        <section className="bg-gradient-to-r from-card via-stone-900 to-card border-2 border-primary/40 rounded-3xl p-8 sm:p-12 shadow-2xl text-center space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1)_0%,transparent_70%)] pointer-events-none" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/25">
            SECTION 05 • MORNING SILENCE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-cinzel text-primary gold-glow-text">
            5:00 AM – 6:00 AM
          </h2>
          <p className="text-sm sm:text-base font-bold text-text-primary">
            When most of the world is still sleeping… YOU WILL BE AWAKE WITHIN.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-stone-400 font-mono">
            <span className="px-3 py-1 rounded-lg bg-background/80 border border-border/30">No Noise</span>
            <span className="px-3 py-1 rounded-lg bg-background/80 border border-border/30">No Distraction</span>
            <span className="px-3 py-1 rounded-lg bg-background/80 border border-border/30">No Office Pressure</span>
            <span className="px-3 py-1 rounded-lg bg-background/80 border border-border/30">No Social Media</span>
          </div>
          <p className="text-xs sm:text-sm text-text-secondary pt-2">
            Just—<strong className="text-text-primary">YOU + YOUR BREATH + YOUR MIND + YOUR INNER ENERGY</strong>
          </p>
          <p className="text-primary font-semibold text-sm sm:text-base pt-2">
            और यहीं से शुरू हो सकती है—YOUR INNER TRANSFORMATION JOURNEY.
          </p>
        </section>

        {/* SECTION 6: THIS WEBINAR IS FOR EVERYONE */}
        <section className="bg-card/80 border border-border/40 rounded-3xl p-8 sm:p-12 shadow-xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary bg-primary/10 px-3.5 py-1 rounded-full border border-primary/20">
              SECTION 06
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-cinzel text-text-primary">
              This Webinar Is For Everyone
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm font-light">Your profession doesn't matter.</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
            {professions.map((prof, idx) => (
              <span key={idx} className="px-4 py-2 rounded-xl bg-background border border-border/30 text-xs font-semibold text-text-primary shadow-sm hover:border-primary/50 transition-colors">
                {prof}
              </span>
            ))}
          </div>

          <div className="max-w-2xl mx-auto bg-background/80 border border-border/30 rounded-2xl p-6 space-y-3 text-xs sm:text-sm text-text-secondary font-light">
            <div className="space-y-2">
              <p>अगर आपके अंदर Stress है—<strong className="text-text-primary">This is for you.</strong></p>
              <p>अगर Overthinking है—<strong className="text-text-primary">This is for you.</strong></p>
              <p>अगर Relationship Issues हैं—<strong className="text-text-primary">This is for you.</strong></p>
              <p>अगर Emotional Pressure है—<strong className="text-text-primary">This is for you.</strong></p>
              <p>अगर Life में सब कुछ होते हुए भी emptiness है—<strong className="text-text-primary">This is for you.</strong></p>
            </div>
            <div className="pt-3 border-t border-border/20 text-center">
              <p className="text-primary font-bold text-sm sm:text-base font-cinzel">
                अगर आप Inner Peace चाहते हैं—THIS IS FOR YOU.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 7: MAYBE YOU DON'T NEED TO CHANGE YOUR WHOLE LIFE… */}
        <section className="bg-card/70 border border-border/40 rounded-3xl p-8 sm:p-12 shadow-xl space-y-6 text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary bg-primary/10 px-3.5 py-1 rounded-full border border-primary/20">
            SECTION 07
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-cinzel text-primary gold-glow-text">
            MAYBE YOU DON'T NEED TO CHANGE YOUR WHOLE LIFE…
          </h2>
          <p className="text-base sm:text-xl font-extrabold font-cinzel text-text-primary">
            MAYBE YOU JUST NEED TO CHANGE YOUR INNER STATE.
          </p>
          <div className="max-w-xl mx-auto space-y-3 text-xs sm:text-sm text-text-secondary font-light">
            <p>Sometimes you don't need more money. You don't need another achievement. You don't need another distraction.</p>
            <p className="text-primary font-semibold pt-1">आपको बस थोड़ी देर रुकने की जरूरत है।</p>
            <p className="font-bold text-text-primary">To breathe. To observe. To listen to yourself. And to reconnect with the person within you.</p>
          </div>
        </section>

        {/* SECTION 8: YOUR MENTOR */}
        <section className="bg-card/90 border border-border/40 rounded-3xl p-8 sm:p-12 shadow-2xl max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-8 relative overflow-hidden">
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
                SECTION 08 • YOUR MENTOR
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-cinzel text-text-primary">
                RAAJEEV SINGH CHAUHANN
              </h3>
              <p className="text-[11px] sm:text-xs font-semibold text-primary/90 tracking-wide uppercase">
                Meditation Coach | Spiritual Healer | Life Coach | Occult Teacher
              </p>
            </div>

            <p className="text-xs text-text-secondary leading-relaxed font-light">
              Rajeev Singh Chauhann is not just a Meditation Coach. He brings together Meditation, Spirituality, Healing, Mindset and Personal Transformation to help people work on themselves at a deeper level.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold">
              <span>✨ 10+ YEARS OF EXPERIENCE</span>
            </div>

            <p className="text-xs text-text-secondary leading-relaxed font-light">
              He has worked with and guided thousands of people through different journeys of personal growth, meditation, spirituality, healing and life transformation.
            </p>

            <p className="text-primary font-semibold text-xs pt-1">
              उनका उद्देश्य सिर्फ meditation सिखाना नहीं है। उनका उद्देश्य है—<br />
              <strong className="text-text-primary font-cinzel">"पहले व्यक्ति को अंदर से बदलना।"</strong>
            </p>

            <p className="text-[11px] text-stone-400 font-light">
              Because when the person changes—their thoughts change, their emotions change, their relationships can change, and their entire experience of life can change.
            </p>
          </div>
        </section>

        {/* SECTION 9: WHY LEARN MEDITATION FROM RAAJEEV SINGH CHAUHANN? */}
        <section className="space-y-16 pt-6">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em]">
              <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
              <span>SECTION 09 • MULTIDISCIPLINARY GUIDANCE</span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold font-cinzel text-text-primary leading-tight">
              Why Learn Meditation From <span className="text-primary gold-glow-text">Raajeev Singh Chauhann</span>?
            </h2>

            <p className="text-text-secondary text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
              Learning meditation is not only about learning how to sit quietly. With the right guidance, it can become a structured journey into awareness, inner work and deeper self-understanding.
            </p>
          </div>

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

          <div className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-card via-stone-900 to-card border border-primary/30 shadow-2xl text-center space-y-4 overflow-hidden max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />
            
            <div className="inline-flex items-center gap-2 text-primary text-[10px] font-bold uppercase tracking-[0.3em]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ONE MENTOR. MULTIPLE DIMENSIONS OF INNER WORK.</span>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-cinzel text-text-primary">
              One Mentor. Multiple Dimensions of Inner Work.
            </h3>

            <p className="text-xs sm:text-sm text-text-secondary max-w-2xl mx-auto leading-relaxed font-light">
              Instead of learning meditation in isolation, students can explore meditation alongside complementary spiritual practices and occult knowledge under one guided learning environment.
            </p>
          </div>

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
        </section>

        {/* SECTION 10: 3 DAYS. 3 MORNINGS. ONE POWERFUL EXPERIENCE. */}
        <section className="bg-card/70 border border-border/40 rounded-3xl p-8 sm:p-12 shadow-xl space-y-6 text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary bg-primary/10 px-3.5 py-1 rounded-full border border-primary/20">
            SECTION 10
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold font-cinzel text-text-primary">
            3 Days. 3 Mornings. One Powerful Experience.
          </h2>
          <div className="max-w-xl mx-auto space-y-3 text-xs sm:text-sm text-text-secondary font-light">
            <p>You don't need a huge commitment. You just need—<strong className="text-text-primary">3 Days. 1 Hour Every Morning. 5:00 AM – 6:00 AM.</strong></p>
            <p className="text-primary font-semibold pt-1">अपने लिए सिर्फ तीन दिन निकालिए।</p>
            <p>Maybe you discover a new way of looking at your life. Maybe you discover a calmer version of yourself.</p>
            <p className="font-bold text-text-primary font-cinzel text-base pt-1">
              Maybe these three mornings become—THE BEGINNING OF SOMETHING BEAUTIFUL.
            </p>
          </div>
        </section>

        {/* SECTION 11: DON'T JUST READ ABOUT MEDITATION… EXPERIENCE IT. */}
        <section className="bg-gradient-to-br from-card via-stone-900 to-card border border-border/40 rounded-3xl p-8 sm:p-12 shadow-xl space-y-6 text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary bg-primary/10 px-3.5 py-1 rounded-full border border-primary/20">
            SECTION 11
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-cinzel text-text-primary">
            Don't Just Read About Meditation… Experience It.
          </h2>
          <div className="max-w-xl mx-auto space-y-3 text-xs sm:text-sm text-text-secondary font-light">
            <p>Videos देखना आसान है। दूसरों की transformation stories सुनना आसान है।</p>
            <p className="text-text-primary font-semibold">लेकिन real experience तब होगा—जब आप खुद बैठेंगे। खुद अपनी breath को महसूस करेंगे। खुद अपने mind को observe करेंगे। और खुद अपने अंदर की शक्ति को experience करेंगे।</p>
          </div>
          <div className="pt-2">
            <span className="inline-block px-6 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-extrabold uppercase tracking-widest">
              DON'T JUST BELIEVE. EXPERIENCE.
            </span>
          </div>
        </section>

        {/* SECTION 12: FINAL WEBINAR CTA */}
        <section className="bg-card/90 border-2 border-primary/40 rounded-3xl p-8 sm:p-12 shadow-2xl text-center space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/25">
            SECTION 12 • JOIN WEBINAR
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-cinzel text-text-primary">
            🎁 3 Days Free Live Meditation Webinar
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-stone-300 font-mono">
            <span className="px-3 py-1 rounded-lg bg-background border border-border/30">🌅 5:00 AM – 6:00 AM</span>
            <span className="px-3 py-1 rounded-lg bg-background border border-border/30">📅 3 Days Live</span>
            <span className="px-3 py-1 rounded-lg bg-background border border-border/30">💻 Online</span>
            <span className="px-3 py-1 rounded-lg bg-background border border-border/30">💯 100% Free</span>
          </div>
          <div className="pt-2">
            <a
              href={MEDITATION_WHATSAPP_GROUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-xl hover:scale-105 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>JOIN MEDITATION WHATSAPP GROUP</span>
            </a>
          </div>
        </section>

        {/* SECTION 13: HOW TO JOIN? */}
        <section className="bg-card/70 border border-border/40 rounded-3xl p-8 sm:p-12 shadow-xl space-y-6 text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary bg-primary/10 px-3.5 py-1 rounded-full border border-primary/20">
            SECTION 13
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-cinzel text-text-primary">
            How To Join?
          </h2>
          <div className="max-w-xl mx-auto space-y-4 text-xs sm:text-sm text-text-secondary font-light leading-relaxed">
            <p className="text-primary font-semibold">नीचे दिखाई दे रहे WHATSAPP GROUP ICON पर CLICK करें।</p>
            <p>No need to search for any link. बस WhatsApp Group का ICON दिखाई दे रहा है—उस पर CLICK करें और GROUP JOIN करें।</p>
            <p className="text-text-primary font-medium">
              Meditation से related सभी important links, webinar updates, joining details और future session information इसी WhatsApp Group में share की जाएगी। इसलिए सिर्फ page पढ़कर मत जाइए। GROUP जरूर JOIN करें।
            </p>
            <p className="text-[11px] text-stone-400 italic">
              (Note: The floating WhatsApp Join button remains available while you browse the page.)
            </p>
          </div>
        </section>

        {/* SECTION 14: GIVE YOURSELF ONE CHANCE. */}
        <section className="bg-card/70 border border-border/40 rounded-3xl p-8 sm:p-12 shadow-xl space-y-6 text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary bg-primary/10 px-3.5 py-1 rounded-full border border-primary/20">
            SECTION 14
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-cinzel text-primary gold-glow-text">
            Give Yourself One Chance.
          </h2>
          <div className="max-w-xl mx-auto space-y-3 text-xs sm:text-sm text-text-secondary font-light">
            <p>You have spent years doing things for—Your Career. Your Business. Your Family. Your Responsibilities. Everyone Around You.</p>
            <p className="text-primary font-semibold pt-1">अब सिर्फ 3 दिन… खुद के लिए।</p>
            <p className="font-bold text-text-primary">Wake up at 5 AM. थोड़ी नींद का त्याग कीजिए। And give yourself a chance to experience—THE BRILLIANT POWER OF MEDITATION.</p>
          </div>
        </section>

        {/* SECTION 15: FINAL CLOSING */}
        <section className="bg-gradient-to-br from-card via-stone-900 to-card border-2 border-primary/40 rounded-3xl p-8 sm:p-12 shadow-2xl text-center space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/25">
            SECTION 15 • FINAL CLOSING
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-cinzel text-text-primary">
            🌟 MAYBE THESE 3 DAYS ARE NOT JUST 3 DAYS…
          </h2>
          <p className="text-lg font-bold font-cinzel text-primary">
            MAYBE THEY ARE THE BEGINNING OF A NEW YOU.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-stone-300 font-mono">
            <span className="px-3 py-1 rounded-lg bg-background border border-border/30">🌅 5:00 AM – 6:00 AM</span>
            <span className="px-3 py-1 rounded-lg bg-background border border-border/30">🧘‍♂️ 3 Days Free Live Meditation</span>
            <span className="px-3 py-1 rounded-lg bg-background border border-border/30">⚡ Limited Seats</span>
          </div>
          <div className="space-y-2 text-xs text-text-secondary">
            <p className="text-primary font-semibold">👇 WHATSAPP GROUP ICON पर CLICK करें और अभी JOIN करें।</p>
            <p>Meditation से related सभी links और updates इसी WhatsApp Group में मिलेंगी।</p>
          </div>
          <div className="pt-2 flex flex-col items-center gap-2 text-xs font-bold text-text-primary uppercase tracking-widest">
            <p>GIVE YOURSELF A CHANCE.</p>
            <p>EXPERIENCE THE POWER.</p>
            <p>EXPERIENCE THE TRANSFORMATION.</p>
            <p className="text-primary pt-1">🧘‍♂️ MEDITATE. 🌿 HEAL WITHIN. ✨ TRANSFORM YOUR LIFE.</p>
          </div>
          <div className="pt-4">
            <a
              href={MEDITATION_WHATSAPP_GROUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-xl hover:scale-105 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>JOIN MEDITATION WHATSAPP GROUP</span>
            </a>
          </div>
        </section>

        {/* SECTION 16: FREQUENTLY ASKED QUESTIONS & DISCLAIMER */}
        <section className="space-y-12 max-w-3xl mx-auto">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary bg-primary/10 px-3.5 py-1 rounded-full border border-primary/20">
              SECTION 16 • FAQ & DISCLAIMER
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-cinzel text-text-primary">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="bg-card border border-border/30 rounded-2xl overflow-hidden transition-all shadow-md">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-cinzel font-bold text-xs sm:text-sm text-text-primary hover:text-primary transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-primary shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-text-secondary leading-relaxed font-light border-t border-border/20 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* SECTION 16 IMPORTANT NOTE DISCLAIMER */}
          <div className="bg-background/90 border border-border/30 rounded-2xl p-6 text-center space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary block">IMPORTANT NOTE</span>
            <p className="text-[11px] text-stone-400 font-light leading-relaxed">
              "Meditation is a supportive wellness, self-awareness and personal-growth practice. It is not a substitute for diagnosis, treatment or cure of any medical condition. If you are experiencing a serious physical or mental health condition, please consult a qualified healthcare professional."
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
