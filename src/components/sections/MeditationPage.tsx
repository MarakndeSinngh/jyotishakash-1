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

      <div className="container mx-auto px-5 sm:px-6 relative z-10 max-w-4xl space-y-16">

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
            HERO SECTION (CONTAINING THE COMPLETE UNEDITED CONTENT)
        ============================================================ */}
        <section className="text-center space-y-10 pt-2">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em]"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
            <span>LEO FAMILY MEDITATION ACADEMY</span>
          </motion.div>

          {/* Main Heading */}
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

          {/* Hero YouTube Video */}
          {!isLoadingVideo && heroVideoId && (
            <div className="bg-card/70 border border-border/40 rounded-3xl p-4 sm:p-6 shadow-2xl relative overflow-hidden my-8">
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
          )}

          {/* WhatsApp CTA Button */}
          <div className="flex justify-center pt-2 pb-4">
            <a
              href={MEDITATION_WHATSAPP_GROUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm uppercase tracking-widest rounded-xl transition-all duration-300 shadow-xl hover:scale-105 flex items-center gap-2 cursor-pointer text-center"
            >
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span>JOIN MEDITATION WHATSAPP GROUP</span>
            </a>
          </div>

          {/* COMPLETE SUPPLIED LONG-FORM HERO CONTENT CONTAINER */}
          <div className="bg-card/80 border border-border/40 rounded-3xl p-6 sm:p-12 shadow-xl space-y-10 text-left">
            
            {/* 1. What if... */}
            <div className="space-y-4 text-center">
              <h2 className="text-xl sm:text-2xl font-bold font-cinzel text-text-primary">
                🧘‍♂️ WHAT IF… YOUR LIFE DOESN’T NEED ANOTHER SOLUTION?
              </h2>
              <p className="text-base sm:text-lg font-bold text-primary">
                WHAT IF… YOU JUST NEED TO CALM YOUR MIND?
              </p>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-text-secondary leading-relaxed font-light">
              <p>Today, we have almost everything—</p>
              <p className="font-medium text-text-primary">
                Money. Career. Business. Family. Success. Comfort. Technology.
              </p>
              <p>But still…</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
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
                    className="px-4 py-3 rounded-xl bg-background/80 border border-border/30 text-text-primary font-medium"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="border-t border-border/30 pt-6 mt-4 space-y-3 text-center">
                <p>And sometimes…</p>
                <p className="font-extrabold font-cinzel text-text-primary text-base sm:text-lg">
                  EVERYTHING IS FINE OUTSIDE…
                </p>
                <p className="font-extrabold font-cinzel text-primary text-base sm:text-lg">
                  BUT NOTHING FEELS FINE INSIDE.
                </p>
              </div>
            </div>

            {/* 2. Every transformation begins with the mind */}
            <div className="border-t border-border/30 pt-8 space-y-6 text-center">
              <h3 className="text-2xl sm:text-3xl font-extrabold font-cinzel text-text-primary">
                🧠 EVERY TRANSFORMATION BEGINS WITH THE MIND
              </h3>

              <div className="max-w-2xl mx-auto space-y-3 text-sm sm:text-base text-text-secondary font-light">
                <p>We keep trying to fix everything outside.</p>
                <p>
                  But our thoughts, emotions, and inner state deeply influence
                  the way we experience life.
                </p>
                <p>And this is where—</p>
              </div>

              <h4 className="text-xl sm:text-2xl font-extrabold font-cinzel text-primary pt-2">
                🧘‍♂️ THE POWER OF MEDITATION
              </h4>

              <p className="text-sm sm:text-base text-text-secondary">
                can make a meaningful difference.
              </p>

              <p className="text-text-primary font-semibold text-sm sm:text-base">
                Meditation is not just sitting with closed eyes.
              </p>

              <p className="text-xs sm:text-sm text-text-secondary">
                It is a journey of:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-2xl mx-auto pt-2">
                {[
                  'Understanding Your Mind',
                  'Connecting With Yourself',
                  'Finding Inner Calm',
                  'Building Awareness',
                  'Creating Positive Change',
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-background border border-border/25 text-sm text-text-primary font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Inner transformation meets family harmony */}
            <div className="border-t border-border/30 pt-8 space-y-6 text-center">
              <h3 className="text-2xl sm:text-3xl font-extrabold font-cinzel text-text-primary">
                ✨ INNER TRANSFORMATION MEETS FAMILY HARMONY
              </h3>

              <div className="max-w-2xl mx-auto space-y-4 text-sm sm:text-base text-text-secondary font-light">
                <p>
                  When one person starts working on themselves through
                  meditation, the transformation doesn't stop with them.
                </p>
                <p className="text-primary font-semibold text-base sm:text-lg">
                  जब एक व्यक्ति अंदर से बदलता है, तो उसका असर पूरे परिवार पर पड़ता
                  है।
                </p>
                <p>
                  When you become calmer, your relationships improve.
                </p>
                <p>
                  When you become emotionally stronger, your entire family
                  experiences a positive shift.
                </p>
              </div>
            </div>

            {/* 4. The 5 AM commitment */}
            <div className="border-t border-border/30 pt-8 space-y-6 text-center">
              <h3 className="text-2xl sm:text-3xl font-extrabold font-cinzel text-primary gold-glow-text">
                🔥 THE 5 AM COMMITMENT
              </h3>

              <div className="max-w-2xl mx-auto space-y-4 text-sm sm:text-base text-text-secondary font-light">
                <p className="text-text-primary font-bold text-lg">
                  YOU HAVE TO WAKE UP AT 5 AM.
                </p>
                <p className="text-primary font-medium">
                  सुबह 5 बजे उठना आसान नहीं है। But remember—
                </p>
                <p className="font-serif italic text-text-primary text-base">
                  “If you want to achieve something, you have to sacrifice a little
                  sleep.”
                </p>
                <p>For just three days, give yourself one hour.</p>
              </div>

              <div className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-primary/10 border border-primary/30 text-primary">
                <Clock className="w-5 h-5" />
                <span className="text-lg sm:text-xl font-extrabold">
                  🌅 5:00 AM – 6:00 AM
                </span>
              </div>

              <div className="max-w-2xl mx-auto space-y-4 text-sm sm:text-base text-text-secondary font-light pt-2">
                <p className="font-bold text-text-primary">
                  When most of the world is still sleeping… YOU WILL BE AWAKE
                  WITHIN.
                </p>
                <p>No noise. No distraction. No office pressure. No social media.</p>
                <p>Just—</p>
                <p className="text-primary font-extrabold text-base sm:text-lg font-cinzel">
                  YOU + YOUR BREATH + YOUR MIND + YOUR INNER ENERGY
                </p>
              </div>
            </div>

            {/* 5. This webinar is for everyone */}
            <div className="border-t border-border/30 pt-8 space-y-6 text-center">
              <h3 className="text-2xl sm:text-3xl font-extrabold font-cinzel text-text-primary">
                💫 THIS WEBINAR IS FOR EVERYONE
              </h3>

              <p className="text-sm text-text-secondary">
                Whether you are a:
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
                {professions.map((prof) => (
                  <span
                    key={prof}
                    className="px-4 py-2 rounded-xl bg-background border border-border/30 text-xs sm:text-sm font-semibold text-text-primary"
                  >
                    {prof}
                  </span>
                ))}
              </div>

              <div className="max-w-2xl mx-auto space-y-3 text-sm sm:text-base text-text-secondary font-light pt-2">
                <p className="font-bold text-text-primary">
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
                    className="px-4 py-2.5 rounded-xl bg-background/80 border border-border/25 text-sm text-text-primary"
                  >
                    {item}
                  </div>
                ))}

                <div className="pt-2">
                  <p className="text-primary font-extrabold text-base sm:text-lg">
                    अगर आप Inner Peace चाहते हैं — THIS IS FOR YOU.
                  </p>
                </div>
              </div>
            </div>

            {/* 6. Change your inner state */}
            <div className="border-t border-border/30 pt-8 space-y-6 text-center">
              <h3 className="text-2xl sm:text-3xl font-extrabold font-cinzel text-primary">
                🌿 CHANGE YOUR INNER STATE
              </h3>

              <div className="max-w-2xl mx-auto space-y-4 text-sm sm:text-base text-text-secondary font-light">
                <p>
                  Sometimes you don't need more money, another achievement, or a
                  new distraction.
                </p>
                <p className="text-text-primary font-semibold">
                  आपको बस थोड़ी देर रुकने की जरूरत है—To breathe, observe,
                  listen, and reconnect with the person within you.
                </p>
              </div>
            </div>

            {/* 7. Your Mentor */}
            <div className="border-t border-border/30 pt-8 space-y-6">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl overflow-hidden border-2 border-primary/50 shrink-0 bg-stone-900 shadow-xl">
                  <SmartImage
                    src="/assets/teachers/Raajeev.webp"
                    alt="Raajeev Singh Chauhann"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-3 text-center sm:text-left">
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
                    👤 YOUR MENTOR
                  </span>

                  <h3 className="text-2xl sm:text-3xl font-extrabold font-cinzel text-text-primary">
                    RAAJEEV SINGH CHAUHANN
                  </h3>

                  <p className="text-xs font-semibold text-primary/90 uppercase tracking-wide">
                    Meditation Coach | Spiritual Healer | Life Coach | Occult Teacher
                  </p>

                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold">
                    <Award className="w-3.5 h-3.5" />
                    <span>10+ Years of Experience</span>
                  </div>
                </div>
              </div>

              <div className="max-w-2xl mx-auto space-y-4 text-sm sm:text-base text-text-secondary font-light pt-2">
                <p>
                  With 10+ years of experience, Rajeev Singh Chauhann brings
                  together Meditation, Spirituality, Healing, and Mindset to help
                  thousands of people transform at a deeper level.
                </p>
                <p className="text-primary font-semibold">
                  उनका उद्देश्य है: <strong className="font-cinzel">“पहले व्यक्ति को अंदर से बदलना।”</strong>
                </p>
                <p>
                  Because when the person changes, their thoughts, emotions,
                  relationships, and overall experience of life change.
                </p>
              </div>
            </div>

            {/* 8. Experience it */}
            <div className="border-t border-border/30 pt-8 space-y-6 text-center">
              <h3 className="text-2xl sm:text-3xl font-extrabold font-cinzel text-text-primary">
                ⚡ DON'T JUST READ ABOUT MEDITATION… EXPERIENCE IT
              </h3>

              <div className="max-w-2xl mx-auto space-y-4 text-sm sm:text-base text-text-secondary font-light">
                <p>
                  Videos देखना और transformation stories सुनना आसान है, लेकिन
                  real experience तब होगा जब आप खुद बैठेंगे और अपनी breath को
                  महसूस करेंगे।
                </p>
                <p>
                  You have spent years working for your career, business, and
                  family.
                </p>
                <p className="text-primary font-extrabold text-base">
                  Now, give just 3 days to yourself.
                </p>
              </div>
            </div>

            {/* 9. Webinar details */}
            <div className="border-t border-border/30 pt-8 space-y-6 text-center">
              <h3 className="text-2xl sm:text-3xl font-extrabold font-cinzel text-primary gold-glow-text">
                🎁 WEBINAR DETAILS
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mx-auto text-xs">
                <div className="bg-background/80 border border-border/30 p-3.5 rounded-xl flex flex-col items-center justify-center space-y-1">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="text-stone-400 text-[10px]">TIME</span>
                  <strong className="text-text-primary">5:00 AM – 6:00 AM</strong>
                </div>
                <div className="bg-background/80 border border-border/30 p-3.5 rounded-xl flex flex-col items-center justify-center space-y-1">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span className="text-stone-400 text-[10px]">DURATION</span>
                  <strong className="text-text-primary">3 Days Live</strong>
                </div>
                <div className="bg-background/80 border border-border/30 p-3.5 rounded-xl flex flex-col items-center justify-center space-y-1">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="text-stone-400 text-[10px]">FORMAT</span>
                  <strong className="text-text-primary">Online • 100% Free</strong>
                </div>
              </div>
            </div>

            {/* 10. How to join */}
            <div className="border-t border-border/30 pt-8 space-y-6 text-center">
              <h3 className="text-2xl sm:text-3xl font-extrabold font-cinzel text-text-primary">
                📲 HOW TO JOIN?
              </h3>

              <div className="max-w-2xl mx-auto space-y-4 text-sm sm:text-base text-text-secondary font-light">
                <p className="text-primary font-semibold">
                  नीचे दिखाई दे रहे WHATSAPP GROUP ICON पर CLICK करें।
                </p>
                <p>WhatsApp Group join करें।</p>
                <p className="text-xs text-stone-400">
                  Note: Meditation से related सभी links, updates, और session details इसी Group में share किए जाएंगे।
                </p>
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
            </div>

            {/* 11. Final Closing */}
            <div className="border-t border-border/30 pt-8 space-y-6 text-center">
              <h3 className="text-xl sm:text-2xl font-extrabold font-cinzel text-text-primary">
                MAYBE THESE 3 DAYS ARE THE BEGINNING OF A NEW YOU.
              </h3>

              <div className="pt-2 space-y-2">
                <p className="text-primary text-base sm:text-lg font-extrabold font-cinzel">
                  🧘‍♂️ MEDITATE.
                </p>
                <p className="text-primary text-base sm:text-lg font-extrabold font-cinzel">
                  🌿 HEAL WITHIN.
                </p>
                <p className="text-primary text-base sm:text-lg font-extrabold font-cinzel">
                  ✨ TRANSFORM YOUR LIFE.
                </p>
              </div>
            </div>

            {/* 12. Important Note */}
            <div className="border-t border-border/30 pt-8">
              <div className="bg-background/90 border border-border/30 rounded-2xl p-6 text-center space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                    IMPORTANT NOTE
                  </span>
                </div>
                <p className="text-[11px] text-stone-400 font-light leading-relaxed max-w-3xl mx-auto">
                  Meditation is a supportive wellness, self-awareness, and personal-growth practice. It is not a substitute for diagnosis, treatment, or cure of any medical condition. If you are experiencing a serious physical or mental health condition, please consult a qualified healthcare professional.
                </p>
              </div>
            </div>

          </div>

        </section>

        {/* ============================================================
            FAQ SECTION (RETAINED AS REQUESTED FOR PAGE COMPLETENESS)
        ============================================================ */}
        <section className="space-y-8 max-w-3xl mx-auto pt-10">
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

      </div>
    </div>
  );
}
