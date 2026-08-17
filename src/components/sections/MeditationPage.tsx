import React, { useState } from 'react';
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
  Volume2
} from 'lucide-react';
import { WHATSAPP_LINK } from '../../constants/contacts';
import SmartImage from './SmartImage';

interface MeditationPageProps {
  navigate?: (path: string) => void;
}

export default function MeditationPage({ navigate }: MeditationPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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

        {/* 1. HERO SECTION */}
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
              href={`${WHATSAPP_LINK}?text=I am interested in joining the upcoming Meditation batch at LEO Family.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-primary hover:bg-primary/90 text-background font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-lg hover:scale-105 flex items-center gap-2 cursor-pointer"
            >
              <span>Join Upcoming Batch</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#batches"
              className="px-8 py-4 bg-card border border-border/40 hover:border-primary/40 text-text-primary font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <span>Explore Batches</span>
            </a>
          </motion.div>
        </section>

        {/* 2. WHY MEDITATION */}
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

        {/* 3. UPCOMING MEDITATION BATCHES */}
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
                href={`${WHATSAPP_LINK}?text=Please add me to the Meditation batch interest list at LEO Family.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 bg-primary hover:bg-primary/95 text-background font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Join Interest List / Enquire</span>
              </a>
            </div>
          </div>
        </section>

        {/* 4. WHAT YOU WILL EXPERIENCE */}
        <section className="space-y-12">
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
        </section>

        {/* 5. WHAT YOU MAY LEARN */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-card/40 border border-border/30 rounded-3xl p-8 sm:p-12 shadow-xl">
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

        {/* 7. MENTOR SECTION */}
        <section className="bg-card/70 border border-border/30 rounded-3xl p-8 sm:p-12 shadow-xl max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-8">
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-2 border-primary/40 shrink-0 bg-stone-900 shadow-lg">
            <SmartImage
              src="/gemstone-assets/logo.jpg"
              alt="Raajeev Singh Chauhann"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-4 text-center sm:text-left flex-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
              GUIDED MENTORSHIP
            </span>
            <h2 className="text-2xl font-bold font-cinzel text-text-primary">
              Raajeev Singh Chauhann
            </h2>
            <p className="text-xs text-text-secondary leading-relaxed font-light">
              Founder & Lead Mentor at LEO Family. Bringing decades of profound spiritual wisdom, occult mastery, and practical meditative teachings to help seekers establish true inner harmony and spiritual clarity.
            </p>
            {navigate && (
              <button
                onClick={() => navigate('/about')}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <span>Meet Your Mentor</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
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
              href={`${WHATSAPP_LINK}?text=I want to join the upcoming Meditation batch at LEO Family.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-primary hover:bg-primary/90 text-background font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-lg hover:scale-105 flex items-center gap-2 cursor-pointer"
            >
              <span>Join Upcoming Batch</span>
              <ArrowRight className="w-4 h-4" />
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
