import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Clock,
  Calendar,
  Users,
  CheckCircle2,
  ArrowLeft,
  Heart,
  ShieldCheck,
  ChevronDown,
  MessageCircle,
  Award,
  Play,
} from 'lucide-react';
import SmartImage from './SmartImage';
import { websiteSettingsService } from '../../services/websiteSettingsService';
import { parseYoutubeUrl } from '../../utils/youtube';

const MEDITATION_WHATSAPP_GROUP_URL =
  'https://chat.whatsapp.com/E1CeluFqVlIGWzMYVSQ2F9';

interface MeditationPageProps {
  navigate?: (path: string) => void;
}

export default function MeditationPage({ navigate }: MeditationPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [heroYoutubeUrl, setHeroYoutubeUrl] = useState('');
  const [isLoadingVideo, setIsLoadingVideo] = useState(true);

  useEffect(() => {
    async function loadHeroVideo() {
      try {
        const settings = await websiteSettingsService.getSettings();

        if (settings?.meditationHeroYoutubeUrl) {
          setHeroYoutubeUrl(settings.meditationHeroYoutubeUrl);
        }
      } catch (err) {
        console.error(
          'Failed to load meditation hero video setting:',
          err
        );
      } finally {
        setIsLoadingVideo(false);
      }
    }

    loadHeroVideo();
  }, []);

  const parsedHero = parseYoutubeUrl(heroYoutubeUrl);
  const heroVideoId = parsedHero.id;

  const professions = [
    'Doctor',
    'Teacher',
    'Student',
    'Businessman',
    'Entrepreneur',
    'Professional',
    'Employee',
    'Homemaker',
    'Artist',
    'Creator',
    'Coach',
  ];

  const faqs = [
    {
      q: 'Is meditation suitable for beginners?',
      a: 'Yes. The 3-day live meditation webinar is designed as an accessible introduction to meditation and inner awareness. No previous meditation experience is required.',
    },
    {
      q: 'Do I need previous meditation experience?',
      a: 'No prior experience is required. Come with an open mind, a quiet space and a willingness to experience the practice.',
    },
    {
      q: 'What time is the free webinar?',
      a: 'The webinar is scheduled from 5:00 AM to 6:00 AM for 3 consecutive live days.',
    },
    {
      q: 'Is the webinar really free?',
      a: 'Yes. The 3-day live meditation webinar is 100% free.',
    },
    {
      q: 'How can I join?',
      a: 'Click any JOIN MEDITATION WHATSAPP GROUP button or the floating WhatsApp group button and join the official group. Meditation-related links, updates and session details will be shared there.',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-text-primary pt-28 pb-24 relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[8%] left-[8%] w-[620px] h-[620px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06)_0%,transparent_70%)]" />
        <div className="absolute top-[42%] right-[0%] w-[560px] h-[560px] bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.035)_0%,transparent_70%)]" />
        <div className="absolute bottom-[8%] left-[25%] w-[520px] h-[520px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.04)_0%,transparent_70%)]" />
      </div>

      <div className="container mx-auto px-5 sm:px-6 relative z-10 max-w-5xl space-y-20 sm:space-y-24">

        {/* Back Navigation */}
        {navigate && (
          <div className="mb-[-8px]">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-secondary hover:text-primary transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
          </div>
        )}

        {/* ============================================================
            HERO
        ============================================================ */}
        <section className="text-center max-w-4xl mx-auto space-y-7 pt-2">
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
            Quiet the Mind.{' '}
            <span className="text-primary gold-glow-text">
              Awaken Within.
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card/80 border border-border/40 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6 text-left"
          >
            <div className="space-y-3 text-center">
              <h2 className="text-xl sm:text-2xl font-bold font-cinzel text-text-primary">
                🧘‍♂️ WHAT IF… YOUR LIFE DOESN'T NEED ANOTHER SOLUTION?
              </h2>
              <p className="text-base sm:text-lg font-bold text-primary">
                WHAT IF… YOU JUST NEED TO CALM YOUR MIND?
              </p>
            </div>

            <div className="space-y-3 text-sm sm:text-base text-text-secondary leading-relaxed">
              <p>Today, we have almost everything—</p>
              <p className="font-medium text-text-primary">
                Money. Career. Business. Family. Success. Comfort. Technology.
              </p>
              <p>But still…</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {[
                  'Stress है।',
                  'Overthinking है।',
                  'Anxiety है।',
                  'Relationship Problems हैं।',
                  'Emotional Pressure है।',
                  'Health Concerns हैं।',
                ].map((item) => (
                  <div
                    key={item}
                    className="px-4 py-2.5 rounded-xl bg-background/80 border border-border/30 text-text-primary"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="border-t border-border/30 pt-5 mt-5 space-y-3 text-center">
                <p>And sometimes…</p>
                <p className="font-extrabold font-cinzel text-text-primary text-base sm:text-lg">
                  EVERYTHING IS FINE OUTSIDE…
                </p>
                <p className="font-extrabold font-cinzel text-primary text-base sm:text-lg">
                  BUT NOTHING FEELS FINE INSIDE.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center pt-1"
          >
            <a
              href={MEDITATION_WHATSAPP_GROUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 sm:px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm uppercase tracking-widest rounded-xl transition-all duration-300 shadow-xl hover:scale-105 flex items-center gap-2 cursor-pointer text-center"
            >
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span>JOIN MEDITATION WHATSAPP GROUP</span>
            </a>
          </motion.div>
        </section>

        {/* ============================================================
            HERO YOUTUBE VIDEO
        ============================================================ */}
        {!isLoadingVideo && heroVideoId && (
          <section className="max-w-4xl mx-auto">
            <div className="bg-card/70 border border-border/40 rounded-3xl p-4 sm:p-6 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />

              <div className="relative rounded-2xl overflow-hidden aspect-video bg-stone-950 border border-border/30 shadow-inner">
                <iframe
                  src={`https://www.youtube.com/embed/${heroVideoId}?autoplay=0&rel=0&modestbranding=1`}
                  title="Meditation Featured Video"
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />

                <div className="absolute top-4 left-4 pointer-events-none">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/65 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest">
                    <Play className="w-3 h-3 fill-current" />
                    Meditation Video
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ============================================================
            EVERY TRANSFORMATION BEGINS WITH THE MIND
        ============================================================ */}
        <section className="bg-card/80 border border-border/40 rounded-3xl p-7 sm:p-12 shadow-xl space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary bg-primary/10 px-3.5 py-1 rounded-full border border-primary/20">
              INNER AWARENESS
            </span>

            <h2 className="text-2xl sm:text-4xl font-bold font-cinzel text-text-primary">
              🧠 EVERY TRANSFORMATION BEGINS WITH THE MIND
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-text-secondary font-light leading-relaxed">
              <p>We keep trying to fix everything outside.</p>
              <p>
                But our thoughts, emotions, and inner state deeply influence
                the way we experience life.
              </p>
            </div>
          </div>

          <div className="border-t border-border/30 pt-8 max-w-3xl mx-auto text-center space-y-5">
            <p className="text-text-secondary text-sm sm:text-base">
              And this is where—
            </p>

            <h3 className="text-2xl sm:text-3xl font-extrabold font-cinzel text-primary">
              🧘‍♂️ THE POWER OF MEDITATION
            </h3>

            <p className="text-sm sm:text-base text-text-secondary">
              can make a meaningful difference.
            </p>

            <p className="text-sm sm:text-base text-text-primary font-semibold">
              Meditation is not just sitting with closed eyes.
            </p>

            <p className="text-xs sm:text-sm text-text-secondary">
              It is a journey of:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              {[
                'Understanding Your Mind',
                'Connecting With Yourself',
                'Finding Inner Calm',
                'Building Awareness',
                'Creating Positive Change',
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-background border border-border/25"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm text-text-primary font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            INNER TRANSFORMATION MEETS FAMILY HARMONY
        ============================================================ */}
        <section className="bg-gradient-to-br from-card via-stone-900 to-card border border-border/40 rounded-3xl p-7 sm:p-12 shadow-xl space-y-7 text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary bg-primary/10 px-3.5 py-1 rounded-full border border-primary/20">
            INNER TRANSFORMATION
          </span>

          <h2 className="text-2xl sm:text-4xl font-bold font-cinzel text-text-primary">
            ✨ INNER TRANSFORMATION MEETS FAMILY HARMONY
          </h2>

          <div className="max-w-3xl mx-auto space-y-5 text-sm sm:text-base text-text-secondary font-light leading-relaxed">
            <p>
              When one person starts working on themselves through meditation,
              the transformation doesn't stop with them.
            </p>

            <p className="text-primary font-semibold text-base sm:text-lg">
              जब एक व्यक्ति अंदर से बदलता है, तो उसका असर पूरे परिवार पर पड़ता
              है।
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left pt-2">
              <div className="rounded-2xl bg-background/80 border border-border/30 p-5">
                <Heart className="w-5 h-5 text-primary mb-3" />
                <p>
                  When you become calmer, your relationships improve.
                </p>
              </div>

              <div className="rounded-2xl bg-background/80 border border-border/30 p-5">
                <Users className="w-5 h-5 text-primary mb-3" />
                <p>
                  When you become emotionally stronger, your entire family
                  experiences a positive shift.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            THE 5 AM COMMITMENT
        ============================================================ */}
        <section className="bg-card/80 border-2 border-primary/35 rounded-3xl p-7 sm:p-12 shadow-2xl text-center space-y-7">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/25">
            THE 5 AM COMMITMENT
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-cinzel text-primary gold-glow-text">
            🔥 THE 5 AM COMMITMENT
          </h2>

          <p className="text-xl sm:text-2xl font-extrabold text-text-primary">
            YOU HAVE TO WAKE UP AT 5 AM.
          </p>

          <div className="max-w-2xl mx-auto space-y-4 text-sm sm:text-base text-text-secondary leading-relaxed">
            <p>
              सुबह 5 बजे उठना आसान नहीं है। But remember—
            </p>

            <p className="font-serif italic text-text-primary text-base sm:text-lg">
              “If you want to achieve something, you have to sacrifice a little
              sleep.”
            </p>

            <p>For just three days, give yourself one hour.</p>
          </div>

          <div className="inline-flex items-center gap-3 px-6 sm:px-8 py-4 rounded-2xl bg-primary/10 border border-primary/30 text-primary">
            <Clock className="w-6 h-6" />
            <span className="text-xl sm:text-2xl font-extrabold">
              🌅 5:00 AM – 6:00 AM
            </span>
          </div>
        </section>

        {/* ============================================================
            MORNING EXPERIENCE
        ============================================================ */}
        <section className="bg-gradient-to-r from-card via-stone-900 to-card border border-primary/35 rounded-3xl p-7 sm:p-12 shadow-2xl text-center space-y-7 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1)_0%,transparent_70%)] pointer-events-none" />

          <div className="relative z-10 space-y-7">
            <h2 className="text-3xl sm:text-5xl font-extrabold font-cinzel text-primary gold-glow-text">
              🌅 5:00 AM – 6:00 AM
            </h2>

            <p className="text-base sm:text-xl font-bold text-text-primary">
              When most of the world is still sleeping…
              <br />
              YOU WILL BE AWAKE WITHIN.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm">
              {[
                'No noise.',
                'No distraction.',
                'No office pressure.',
                'No social media.',
              ].map((item) => (
                <span
                  key={item}
                  className="px-4 py-2 rounded-xl bg-background/80 border border-border/30 text-text-primary"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="pt-2 space-y-4">
              <p className="text-text-secondary text-sm sm:text-base">
                Just—
              </p>

              <p className="text-primary font-extrabold text-sm sm:text-xl font-cinzel">
                YOU + YOUR BREATH + YOUR MIND + YOUR INNER ENERGY
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================
            THIS WEBINAR IS FOR EVERYONE
        ============================================================ */}
        <section className="bg-card/80 border border-border/40 rounded-3xl p-7 sm:p-12 shadow-xl space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-4xl font-bold font-cinzel text-text-primary">
              💫 THIS WEBINAR IS FOR EVERYONE
            </h2>

            <p className="text-sm sm:text-base text-text-secondary">
              Whether you are a:
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {professions.map((profession) => (
              <span
                key={profession}
                className="px-4 py-2 rounded-xl bg-background border border-border/30 text-xs sm:text-sm font-semibold text-text-primary"
              >
                {profession}
              </span>
            ))}
          </div>

          <div className="max-w-3xl mx-auto space-y-3 text-sm sm:text-base text-text-secondary leading-relaxed">
            <p className="text-center font-medium text-text-primary">
              Your profession doesn't matter.
            </p>

            {[
              'अगर Stress है — This is for you.',
              'अगर Overthinking है — This is for you.',
              'अगर Relationship Issues हैं — This is for you.',
              'अगर Emotional Pressure है — This is for you.',
              'अगर Life में सब कुछ होते हुए भी Emptiness है — This is for you.',
            ].map((item) => (
              <div
                key={item}
                className="px-5 py-3 rounded-xl bg-background/80 border border-border/25"
              >
                {item}
              </div>
            ))}

            <div className="pt-3 text-center">
              <p className="text-primary font-extrabold text-base sm:text-lg">
                अगर आप Inner Peace चाहते हैं — THIS IS FOR YOU.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================
            CHANGE YOUR INNER STATE
        ============================================================ */}
        <section className="bg-card/70 border border-border/40 rounded-3xl p-7 sm:p-12 shadow-xl space-y-7 text-center">
          <h2 className="text-2xl sm:text-4xl font-bold font-cinzel text-primary gold-glow-text">
            🌿 CHANGE YOUR INNER STATE
          </h2>

          <div className="max-w-3xl mx-auto space-y-5 text-sm sm:text-base text-text-secondary leading-relaxed">
            <p>
              Sometimes you don't need more money, another achievement, or a
              new distraction.
            </p>

            <p className="text-text-primary font-semibold">
              आपको बस थोड़ी देर रुकने की जरूरत है—
            </p>

            <p className="text-primary font-bold">
              To breathe, observe, listen, and reconnect with the person within
              you.
            </p>
          </div>
        </section>

        {/* ============================================================
            YOUR MENTOR
        ============================================================ */}
        <section className="bg-card/90 border border-border/40 rounded-3xl p-7 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-8">
            <div className="w-36 h-36 sm:w-48 sm:h-48 rounded-3xl overflow-hidden border-2 border-primary/50 shrink-0 bg-stone-900 shadow-xl">
              <SmartImage
                src="/assets/teachers/Raajeev.webp"
                alt="Raajeev Singh Chauhann"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-5 text-center sm:text-left">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
                  👤 YOUR MENTOR: RAAJEEV SINGH CHAUHANN
                </span>

                <h2 className="text-2xl sm:text-4xl font-extrabold font-cinzel text-text-primary mt-2">
                  RAAJEEV SINGH CHAUHANN
                </h2>

                <p className="text-[11px] sm:text-xs font-semibold text-primary/90 tracking-wide uppercase mt-2">
                  Meditation Coach | Spiritual Healer | Life Coach | Occult Teacher
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold">
                <Award className="w-4 h-4" />
                <span>10+ YEARS OF EXPERIENCE</span>
              </div>

              <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                With 10+ years of experience, Rajeev Singh Chauhann brings
                together Meditation, Spirituality, Healing, and Mindset to help
                thousands of people transform at a deeper level.
              </p>

              <p className="text-primary font-semibold text-sm sm:text-base">
                उनका उद्देश्य है:{' '}
                <strong className="text-text-primary font-cinzel">
                  “पहले व्यक्ति को अंदर से बदलना।”
                </strong>
              </p>

              <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                Because when the person changes, their thoughts, emotions,
                relationships, and overall experience of life change.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================
            EXPERIENCE IT
        ============================================================ */}
        <section className="bg-gradient-to-br from-card via-stone-900 to-card border border-border/40 rounded-3xl p-7 sm:p-12 shadow-xl space-y-7 text-center">
          <h2 className="text-2xl sm:text-4xl font-bold font-cinzel text-text-primary">
            ⚡ DON'T JUST READ ABOUT MEDITATION… EXPERIENCE IT
          </h2>

          <div className="max-w-3xl mx-auto space-y-5 text-sm sm:text-base text-text-secondary leading-relaxed">
            <p>
              Videos देखना और transformation stories सुनना आसान है, लेकिन real
              experience तब होगा जब आप खुद बैठेंगे और अपनी breath को महसूस
              करेंगे।
            </p>

            <p>
              You have spent years working for your career, business, and
              family.
            </p>

            <p className="text-primary font-extrabold text-lg sm:text-xl font-cinzel">
              Now, give just 3 days to yourself.
            </p>
          </div>
        </section>

        {/* ============================================================
            WEBINAR DETAILS
        ============================================================ */}
        <section className="bg-card/90 border-2 border-primary/40 rounded-3xl p-7 sm:p-12 shadow-2xl text-center space-y-7 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />

          <div className="relative z-10 space-y-7">
            <h2 className="text-2xl sm:text-4xl font-extrabold font-cinzel text-text-primary">
              🎁 WEBINAR DETAILS
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              <div className="bg-background/80 border border-border/30 rounded-2xl p-5">
                <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-[10px] uppercase tracking-widest text-stone-400">
                  Time
                </p>
                <p className="font-bold text-text-primary mt-1">
                  5:00 AM – 6:00 AM
                </p>
              </div>

              <div className="bg-background/80 border border-border/30 rounded-2xl p-5">
                <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-[10px] uppercase tracking-widest text-stone-400">
                  Duration
                </p>
                <p className="font-bold text-text-primary mt-1">
                  3 Days Live
                </p>
              </div>

              <div className="bg-background/80 border border-border/30 rounded-2xl p-5">
                <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-[10px] uppercase tracking-widest text-stone-400">
                  Format
                </p>
                <p className="font-bold text-text-primary mt-1">Online</p>
              </div>

              <div className="bg-background/80 border border-border/30 rounded-2xl p-5">
                <Sparkles className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-[10px] uppercase tracking-widest text-stone-400">
                  Fee
                </p>
                <p className="font-bold text-emerald-400 mt-1">
                  100% FREE
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-bold uppercase tracking-widest">
              ⚡ Seats: Limited
            </div>
          </div>
        </section>

        {/* ============================================================
            HOW TO JOIN
        ============================================================ */}
        <section className="bg-card/70 border border-border/40 rounded-3xl p-7 sm:p-12 shadow-xl space-y-7 text-center">
          <h2 className="text-2xl sm:text-4xl font-bold font-cinzel text-text-primary">
            📲 HOW TO JOIN?
          </h2>

          <div className="max-w-3xl mx-auto space-y-5 text-sm sm:text-base text-text-secondary leading-relaxed">
            <p className="text-primary font-extrabold">
              नीचे दिखाई दे रहे WHATSAPP GROUP ICON पर CLICK करें।
            </p>

            <p>WhatsApp Group join करें।</p>

            <p className="bg-background/80 border border-border/30 rounded-2xl p-5">
              <strong className="text-text-primary">Note:</strong> Meditation
              से related सभी links, updates, और session details इसी Group में
              share किए जाएंगे।
            </p>
          </div>

          <a
            href={MEDITATION_WHATSAPP_GROUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-xl hover:scale-105 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>JOIN MEDITATION WHATSAPP GROUP</span>
          </a>
        </section>

        {/* ============================================================
            FINAL MESSAGE
        ============================================================ */}
        <section className="bg-gradient-to-br from-card via-stone-900 to-card border-2 border-primary/40 rounded-3xl p-8 sm:p-14 shadow-2xl text-center space-y-7 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.09)_0%,transparent_70%)] pointer-events-none" />

          <div className="relative z-10 space-y-7">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold font-cinzel text-text-primary leading-tight">
              MAYBE THESE 3 DAYS ARE THE BEGINNING OF A NEW YOU.
            </h2>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="px-4 py-2 rounded-xl bg-background border border-border/30 text-xs sm:text-sm">
                🌅 5:00 AM – 6:00 AM
              </span>
              <span className="px-4 py-2 rounded-xl bg-background border border-border/30 text-xs sm:text-sm">
                🧘‍♂️ 3 DAYS FREE LIVE MEDITATION
              </span>
              <span className="px-4 py-2 rounded-xl bg-background border border-border/30 text-xs sm:text-sm">
                ⚡ LIMITED SEATS
              </span>
            </div>

            <div className="pt-3 space-y-2">
              <p className="text-primary text-lg sm:text-xl font-extrabold font-cinzel">
                🧘‍♂️ MEDITATE.
              </p>
              <p className="text-primary text-lg sm:text-xl font-extrabold font-cinzel">
                🌿 HEAL WITHIN.
              </p>
              <p className="text-primary text-lg sm:text-xl font-extrabold font-cinzel">
                ✨ TRANSFORM YOUR LIFE.
              </p>
            </div>

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

        {/* ============================================================
            FAQ
        ============================================================ */}
        <section className="space-y-8 max-w-3xl mx-auto">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-cinzel text-text-primary">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;

              return (
                <div
                  key={idx}
                  className="bg-card border border-border/30 rounded-2xl overflow-hidden shadow-md"
                >
                  <button
                    onClick={() =>
                      setOpenFaq(isOpen ? null : idx)
                    }
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-cinzel font-bold text-xs sm:text-sm text-text-primary hover:text-primary transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>

                    <ChevronDown
                      className={`w-4 h-4 text-primary shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-text-secondary leading-relaxed font-light border-t border-border/20 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ============================================================
            IMPORTANT NOTE
        ============================================================ */}
        <section className="bg-background/90 border border-border/30 rounded-2xl p-6 sm:p-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
              IMPORTANT NOTE
            </span>
          </div>

          <p className="text-[11px] sm:text-xs text-stone-400 font-light leading-relaxed max-w-4xl mx-auto">
            Meditation is a supportive wellness, self-awareness, and
            personal-growth practice. It is not a substitute for diagnosis,
            treatment, or cure of any medical condition. If you are
            experiencing a serious physical or mental health condition, please
            consult a qualified healthcare professional.
          </p>
        </section>
      </div>
    </div>
  );
}
