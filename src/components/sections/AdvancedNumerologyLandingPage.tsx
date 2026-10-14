import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Award, 
  BookOpen, 
  ArrowRight, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  Video, 
  Smartphone, 
  Compass, 
  Radio
} from 'lucide-react';
import SmartImage from './SmartImage';

interface AdvancedNumerologyLandingPageProps {
  navigate?: (path: string) => void;
}

const RAZORPAY_URL = "https://rzp.io/rzp/znXO15N";

export default function AdvancedNumerologyLandingPage({ navigate }: AdvancedNumerologyLandingPageProps) {
  const [activeCourseTab, setActiveCourseTab] = useState<'vedic' | 'mobile'>('vedic');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleNavigate = (path: string) => {
    if (navigate) {
      navigate(path);
    } else {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo(0, 0);
    }
  };

  const scrollToCurriculum = () => {
    const el = document.getElementById('curriculum-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Course 1: Advanced Vedic Numerology Modules
  const vedicModules = [
    {
      module: 'Module 1',
      title: 'Psychic Numbers (Mulank) & Destiny Numbers (Bhagyank)',
      description: 'Foundational calculations, core planetary vibrations, inner motivations, and external karmic direction.'
    },
    {
      module: 'Module 2',
      title: 'Master Numbers & Special Vibrations (11, 22, 33)',
      description: 'Deconstructing master soul frequencies, karmic challenges, spiritual potential, and leadership indicators.'
    },
    {
      module: 'Module 3',
      title: 'Harmonic Number Compatibility Matrix',
      description: 'Analytical evaluation of friendly, neutral, and hostile number relationships across personal and professional spheres.'
    },
    {
      module: 'Module 4',
      title: 'The Complete 81 Combinations Analysis',
      description: 'Systematic study of all 81 Psychic-Destiny permutations, detailing behavioral tendencies, career peaks, and life obstacles.'
    },
    {
      module: 'Module 5',
      title: 'Repetitive & Missing Numbers',
      description: 'Identifying excessive energetic buildup and planetary voids in birth charts to understand psychological patterns and hidden talents.'
    },
    {
      module: 'Module 6',
      title: 'The Authentic Vedic Grid (Loshu vs. Vedic Energy Mapping)',
      description: 'Mapping the 9 planetary houses in the birth grid to analyze elemental balance, directional energies, and life planes.'
    },
    {
      module: 'Module 7',
      title: 'Profession & Career Path Analysis',
      description: 'Aligning business partnerships, job sectors, and wealth creation avenues with ruling planetary numbers.'
    },
    {
      module: 'Module 8',
      title: 'Marriage & Relationship Compatibility',
      description: 'Detailed synastry matching, timing of marriage, mitigating relationship discord, and harmony calculation.'
    },
    {
      module: 'Module 9',
      title: 'House & Property Number Science',
      description: 'Calculating residential, apartment, and office address frequencies to create peace, stability, and commercial success.'
    },
    {
      module: 'Module 10',
      title: 'Signature & Name Science Analysis',
      description: 'Crafting powerful personal and commercial signatures aligned with planetary geometry for growth and public recognition.'
    },
    {
      module: 'Module 11',
      title: 'Authentic Vedic Numerology Remedies',
      description: 'Practical, non-dogmatic remedies including yantras, planetary mantra vibrations, color therapy, and lifestyle alignments.'
    }
  ];

  // Course 2: Super Advanced Mobile Numerology Modules
  const mobileModules = [
    {
      module: 'Module 1',
      title: 'Telecommunication Vibrations & Everyday Digital Energy',
      description: 'Understanding how continuous mobile frequencies shape our subconscious thoughts, conversations, and business negotiations.'
    },
    {
      module: 'Module 2',
      title: 'Special Number Pairings & Micro-Vibrations',
      description: 'Detailed analysis of high-impact two-digit and three-digit pairs that either accelerate growth or trigger recurring setbacks.'
    },
    {
      module: 'Module 3',
      title: 'Modified Numbers & Digital Frequency Tuning',
      description: 'Calculating total sums, compound intermediate values, and secret root numbers behind modern 10-digit SIM sequences.'
    },
    {
      module: 'Module 4',
      title: 'The Vedic Grid in Mobile Numerology',
      description: 'Plotting mobile digits across the Vedic grid to locate energetic clusters, missing planes, and financial channels.'
    },
    {
      module: 'Module 5',
      title: '81 Combinations in Mobile Numbers',
      description: 'Evaluating how your phone number interacts directly with your unique Psychic and Destiny numbers.'
    },
    {
      module: 'Module 6',
      title: 'Repetitive & Hostile Numbers in Phone Sequences',
      description: 'Diagnosing conflicting digits that trigger financial depletion, health stress, or communication misunderstandings.'
    },
    {
      module: 'Module 7',
      title: 'Planetary Conjunctions in Mobile Sequences',
      description: 'Analyzing planetary conjunctions (e.g., Sun-Mercury Budhaditya, Saturn-Rahu, Venus-Mercury) created by adjacent digits.'
    },
    {
      module: 'Module 8',
      title: 'Rajyoga Combinations in Mobile Numbers',
      description: 'Identifying elite numerical sequences that attract authority, commercial success, financial windfalls, and leadership.'
    },
    {
      module: 'Module 9',
      title: 'Device Charging Directions & Sacred Placement',
      description: 'Geographical placement and charging orientation to align electromagnetic device fields with positive Vastu directions.'
    },
    {
      module: 'Module 10',
      title: 'Colors, Covers, and Wallpaper Frequency Science',
      description: 'Selecting mobile cases, screen wallpapers, and themes aligned with individual planetary rulers to channel prosperity.'
    },
    {
      module: 'Module 11',
      title: 'Strategic Mobile Number Selection Protocol',
      description: 'A complete step-by-step checklist to select, verify, and activate the ultimate phone number for personal and business use.'
    }
  ];

  // FAQs from supplied course document
  const faqs = [
    {
      q: 'What is included in this Navratri Special Offer bundle?',
      a: 'This bundle provides complete access to two comprehensive courses: (1) Advanced Vedic Numerology and (2) Super Advanced Mobile Numerology. Both are taught live by master mentor Raajeev Singh Chauhann for a single combined fee of ₹995.'
    },
    {
      q: 'Are the classes pre-recorded or live?',
      a: 'All sessions are conducted live. You will have the opportunity for real-time interactive learning and direct live Q&A with Raajeev Singh Chauhann during every class.'
    },
    {
      q: 'What is the weekly schedule of the classes?',
      a: 'Classes are held twice a week from 11:00 AM to 1:00 PM IST, commencing 16 November.'
    },
    {
      q: 'What happens if I miss a live class?',
      a: 'High-definition session recordings will be uploaded to both the LEO Family website portal and the official mobile application after each class. You receive 1 full year of unlimited on-demand recording access.'
    },
    {
      q: 'Will I receive a certificate upon completion?',
      a: 'Yes, an authentic Certificate of Completion will be awarded by LEO Family Occult School after you finish the course curriculum.'
    },
    {
      q: 'Do I need prior knowledge of Numerology to join?',
      a: 'No prior background is required. The curriculum methodically begins with core principles and elevates to professional consultant-level methods, making it accessible for dedicated beginners while profoundly valuable for practicing occultists.'
    },
    {
      q: 'How do I complete enrollment?',
      a: 'Click any "ENROLL NOW — ₹995" button to be redirected to our secure Razorpay payment gateway. After payment, you will receive immediate confirmation and student portal onboarding instructions.'
    }
  ];

  return (
    <div className="min-h-screen bg-leo-ivory text-leo-text-primary pt-24 pb-24 relative overflow-hidden font-sans transition-colors duration-300">
      
      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => handleNavigate('/')}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-leo-text-secondary hover:text-leo-emerald transition-colors cursor-pointer"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>Home</span>
            <span className="text-leo-border">/</span>
            <span className="text-leo-emerald font-semibold">Navratri Offer 2026</span>
          </button>

          <span className="text-[10px] font-mono uppercase tracking-widest text-leo-emerald bg-leo-surface border border-leo-border px-3 py-1 rounded-full">
            Special Launch
          </span>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 1: HERO & ENROLLMENT CTA */}
        {/* ========================================================================= */}
        <section className="relative py-8 md:py-12 border-b border-leo-border">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Hero Details */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-leo-surface border border-leo-border px-3.5 py-1.5 rounded-full w-fit shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-leo-gold shrink-0" />
                <span className="text-xs font-cinzel font-extrabold tracking-[0.2em] text-leo-emerald uppercase">
                  NAVRATRI SPECIAL OFFER 2026
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-5xl lg:text-[2.85rem] font-extrabold font-cinzel tracking-tight leading-[1.15] text-leo-emerald">
                Advanced Vedic Numerology <br className="hidden sm:inline" />
                <span className="text-leo-gold font-cinzel">+ Super Advanced Mobile Numerology</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-leo-text-secondary font-normal leading-relaxed font-sans">
                Two practitioner-grade masterclasses unified into one complete learning package. Taught live by founder <strong className="text-leo-text-primary font-medium">Raajeev Singh Chauhann</strong> with real-time interactive Q&A.
              </p>

              {/* Offer Price Highlight Box */}
              <div className="p-5 sm:p-6 rounded-3xl bg-leo-card border border-leo-border shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                  <div>
                    <span className="text-3xl sm:text-4xl font-extrabold font-cinzel text-leo-emerald">
                      ₹995 ONLY
                    </span>
                    <span className="text-xs text-leo-text-secondary block font-sans mt-0.5">
                      For both complete courses combined
                    </span>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-xs text-leo-text-secondary line-through block">
                      Stated Combined Value: Approx. ₹24,000
                    </span>
                    <span className="text-[11px] text-leo-emerald font-semibold uppercase tracking-wider">
                      Navratri Special Launch
                    </span>
                  </div>
                </div>

                {/* Key Schedule & Highlights */}
                <div className="pt-3 border-t border-leo-border grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-leo-text-primary">
                  <div className="flex items-center gap-2">
                    <Radio className="w-4 h-4 text-leo-emerald shrink-0" />
                    <span>All Classes Live (2 Classes/Week)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-leo-gold shrink-0" />
                    <span>11:00 AM – 1:00 PM IST</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-leo-gold shrink-0" />
                    <span>Commencing 16 November</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-leo-emerald shrink-0" />
                    <span>Certificate of Completion</span>
                  </div>
                </div>

                <div className="text-[10px] text-leo-text-secondary font-sans italic pt-1">
                  * Note: Schedule commences 16 November (11:00 AM – 1:00 PM IST). Schedule year and campaign window are flagged for administrator confirmation.
                </div>
              </div>

              {/* CTAs: Emerald Primary + Card Secondary */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <a
                  href={RAZORPAY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-leo-emerald hover:bg-emerald-900 text-leo-ivory font-extrabold uppercase tracking-[0.15em] text-xs sm:text-sm rounded-xl text-center shadow-md transition-all hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>ENROLL NOW — ₹995</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={scrollToCurriculum}
                  className="px-7 py-4 bg-leo-card hover:bg-leo-surface border border-leo-border hover:border-leo-gold text-leo-emerald font-bold uppercase tracking-[0.15em] text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <BookOpen className="w-4 h-4 text-leo-gold" />
                  <span>View Curriculum</span>
                </button>
              </div>

            </div>

            {/* Right Hero Mentor Showcase Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md bg-leo-card border border-leo-border rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col items-center text-center space-y-4">
                
                {/* Mentor Photo with Gold Gradient Ring */}
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full p-1.5 bg-gradient-to-tr from-leo-emerald via-leo-gold to-leo-emerald shadow-lg overflow-hidden">
                  <SmartImage
                    src="/assets/teachers/Raajeev.webp"
                    alt="Raajeev Singh Chauhann"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                {/* Identity */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-leo-emerald bg-leo-surface border border-leo-border px-3 py-1 rounded-full">
                    Lead Mentor & Founder
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-leo-emerald mt-2">
                    Raajeev Singh Chauhann
                  </h3>
                  <p className="text-xs text-leo-text-secondary font-sans mt-1">
                    Founder, LEO Family Occult School · Master Occultist & Spiritual Researcher
                  </p>
                </div>

                {/* Mentor Stats */}
                <div className="grid grid-cols-3 gap-2 w-full pt-3 border-t border-leo-border text-center">
                  <div className="p-2.5 rounded-xl bg-leo-surface border border-leo-border">
                    <span className="text-base font-cinzel font-bold text-leo-emerald block">20+</span>
                    <span className="text-[9px] text-leo-text-secondary uppercase tracking-wider block">Yrs Mastery</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-leo-surface border border-leo-border">
                    <span className="text-base font-cinzel font-bold text-leo-emerald block">100K+</span>
                    <span className="text-[9px] text-leo-text-secondary uppercase tracking-wider block">Students</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-leo-surface border border-leo-border">
                    <span className="text-base font-cinzel font-bold text-leo-emerald block">10+</span>
                    <span className="text-[9px] text-leo-text-secondary uppercase tracking-wider block">Countries</span>
                  </div>
                </div>

                <div className="text-[11px] text-leo-text-secondary font-sans italic pt-1">
                  "Authentic occult knowledge is mathematical, practical, and transformative when understood through pure Vedic principles."
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: NAVRATRI OFFER INTRODUCTION */}
        {/* ========================================================================= */}
        <section className="py-16 border-b border-leo-border">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-leo-emerald bg-leo-surface border border-leo-border px-3.5 py-1 rounded-full">
              The Dual Power Advantage
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-cinzel text-leo-emerald">
              Why Vedic + Mobile Numerology Together?
            </h2>
            <p className="text-sm sm:text-base text-leo-text-secondary font-normal leading-relaxed font-sans">
              Your birth date provides the fixed cosmic blueprint given by the universe. Your mobile number provides the active, continuous daily vibration you broadcast to the world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 sm:p-8 rounded-3xl bg-leo-card border border-leo-border shadow-xs hover:border-leo-gold/50 transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-leo-surface border border-leo-border flex items-center justify-center">
                <Compass className="w-6 h-6 text-leo-emerald" />
              </div>
              <h3 className="text-xl font-bold font-cinzel text-leo-emerald">
                1. Advanced Vedic Numerology
              </h3>
              <p className="text-sm text-leo-text-secondary font-normal leading-relaxed">
                Decode your innate destiny, psychic inclinations, master karmic numbers, and the complete 81 Psychic-Destiny combinations. Understand your favorable professions, relationship compatibility, signature alignment, and Vedic remedial yantras.
              </p>
              <div className="text-xs font-mono font-semibold text-leo-emerald pt-2">
                11 Comprehensive Practical Modules
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-leo-card border border-leo-border shadow-xs hover:border-leo-gold/50 transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-leo-surface border border-leo-border flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-leo-emerald" />
              </div>
              <h3 className="text-xl font-bold font-cinzel text-leo-emerald">
                2. Super Advanced Mobile Numerology
              </h3>
              <p className="text-sm text-leo-text-secondary font-normal leading-relaxed">
                Transform everyday digital communication into a tool for financial growth, authority, and tranquility. Learn special digit pairings, modified numbers, hostile frequencies to avoid, Rajyoga combinations, and exact mobile number selection.
              </p>
              <div className="text-xs font-mono font-semibold text-leo-emerald pt-2">
                11 High-Impact Applied Modules
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTIONS 3 & 4: COMPLETE CURRICULUM ACCORDION/TABS */}
        {/* ========================================================================= */}
        <section id="curriculum-section" className="py-16 border-b border-leo-border">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-leo-emerald bg-leo-surface border border-leo-border px-3.5 py-1 rounded-full">
              Exhaustive Course Syllabus
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-cinzel text-leo-emerald">
              Full Program Curriculum
            </h2>
            <p className="text-sm sm:text-base text-leo-text-secondary font-normal leading-relaxed">
              Explore every topic covered across both masterclasses. No superficial overviews — every module is grounded in authentic Vedic science and practical real-world application.
            </p>

            {/* Course Switcher Tabs */}
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              <button
                type="button"
                onClick={() => setActiveCourseTab('vedic')}
                className={`px-6 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeCourseTab === 'vedic'
                    ? 'bg-leo-emerald text-leo-ivory font-extrabold shadow-md scale-102'
                    : 'bg-leo-card border border-leo-border text-leo-text-secondary hover:text-leo-emerald hover:border-leo-gold/40'
                }`}
              >
                Course 1: Vedic Numerology (11 Modules)
              </button>
              <button
                type="button"
                onClick={() => setActiveCourseTab('mobile')}
                className={`px-6 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeCourseTab === 'mobile'
                    ? 'bg-leo-emerald text-leo-ivory font-extrabold shadow-md scale-102'
                    : 'bg-leo-card border border-leo-border text-leo-text-secondary hover:text-leo-emerald hover:border-leo-gold/40'
                }`}
              >
                Course 2: Mobile Numerology (11 Modules)
              </button>
            </div>
          </div>

          {/* Module List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {(activeCourseTab === 'vedic' ? vedicModules : mobileModules).map((item, index) => (
              <div
                key={index}
                className="p-5 rounded-2xl bg-leo-card border border-leo-border hover:border-leo-gold/50 shadow-xs transition-all flex items-start gap-4"
              >
                <div className="w-9 h-9 rounded-xl bg-leo-surface border border-leo-border flex items-center justify-center shrink-0 text-leo-emerald font-mono text-xs font-bold">
                  {index + 1}
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-leo-gold block font-semibold">
                    {item.module}
                  </span>
                  <h4 className="text-sm font-bold font-cinzel text-leo-emerald">
                    {item.title}
                  </h4>
                  <p className="text-xs text-leo-text-secondary font-normal font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 5: LIVE CLASSES & DIRECT Q&A */}
        {/* ========================================================================= */}
        <section className="py-16 border-b border-leo-border">
          <div className="p-8 sm:p-12 rounded-3xl bg-leo-card border border-leo-border shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-leo-emerald bg-leo-surface border border-leo-border px-3.5 py-1 rounded-full">
                  Interactive Learning
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-cinzel text-leo-emerald">
                  100% Live Classes with Direct Q&A in Every Session
                </h3>
                <p className="text-sm sm:text-base text-leo-text-secondary font-normal leading-relaxed font-sans">
                  Unlike pre-recorded static video libraries, all sessions of this course bundle are conducted live. You get direct interaction with Raajeev Singh Chauhann, allowing you to ask real questions, analyze student chart examples, and solve doubts instantly.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-leo-text-primary">
                  <div className="p-3.5 rounded-xl bg-leo-surface border border-leo-border">
                    <strong className="text-leo-emerald block font-cinzel text-sm">2 Classes / Week</strong>
                    <span className="text-[11px] text-leo-text-secondary">Structured rhythm for deep absorption</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-leo-surface border border-leo-border">
                    <strong className="text-leo-emerald block font-cinzel text-sm">11:00 AM – 1:00 PM</strong>
                    <span className="text-[11px] text-leo-text-secondary">2-hour intensive deep-dive classes</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-leo-surface border border-leo-border">
                    <strong className="text-leo-emerald block font-cinzel text-sm">Commencing 16 Nov</strong>
                    <span className="text-[11px] text-leo-text-secondary">Schedule year flagged for admin confirmation</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-leo-surface border border-leo-border text-center space-y-3.5">
                <Sparkles className="w-8 h-8 text-leo-gold" />
                <h4 className="font-cinzel font-bold text-base text-leo-emerald">
                  Ready to Join the Live Batch?
                </h4>
                <p className="text-xs text-leo-text-secondary font-normal">
                  Direct enrollment via official Razorpay hosted checkout.
                </p>
                <a
                  href={RAZORPAY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-leo-emerald hover:bg-emerald-900 text-leo-ivory font-extrabold uppercase tracking-wider text-xs rounded-xl transition-all text-center shadow-md cursor-pointer block"
                >
                  ENROLL NOW — ₹995
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTIONS 6 & 7: 1-YEAR RECORDING ACCESS & WHO IS THIS FOR */}
        {/* ========================================================================= */}
        <section className="py-16 border-b border-leo-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-leo-emerald bg-leo-surface border border-leo-border px-3.5 py-1 rounded-full">
                Never Miss a Lesson
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-cinzel text-leo-emerald">
                1-Year Full Recording Access Across Web & Mobile App
              </h2>
              <p className="text-sm text-leo-text-secondary font-normal leading-relaxed font-sans">
                Every live class is archived in crystal-clear high definition and uploaded to both the LEO Family student web portal and the official mobile application.
              </p>
              <ul className="space-y-3 text-xs text-leo-text-primary pt-2">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-leo-emerald shrink-0" />
                  <span>Rewatch and review complex calculations at your own convenience.</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-leo-emerald shrink-0" />
                  <span>Access from any desktop, laptop, Android, or iOS device.</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-leo-emerald shrink-0" />
                  <span>Full 365 days of active recording library availability.</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-leo-emerald shrink-0" />
                  <span>Comprehensive downloadable reference materials and notes.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-leo-card border border-leo-border shadow-xs space-y-4">
              <h3 className="text-lg font-bold font-cinzel text-leo-emerald">
                Who Is This Course Bundle For?
              </h3>
              <div className="space-y-3 text-xs text-leo-text-secondary font-normal leading-relaxed">
                <div className="p-3.5 rounded-xl bg-leo-surface border border-leo-border">
                  <strong className="text-leo-emerald block font-semibold">Aspiring & Practicing Occultists</strong>
                  <span>Deepen your diagnostic accuracy, learn 81 combinations, and add high-demand Mobile Numerology to your consulting repertoire.</span>
                </div>
                <div className="p-3.5 rounded-xl bg-leo-surface border border-leo-border">
                  <strong className="text-leo-emerald block font-semibold">Business Owners & Consultants</strong>
                  <span>Select prosperous business names, optimize company SIM numbers, and align office addresses for commercial growth.</span>
                </div>
                <div className="p-3.5 rounded-xl bg-leo-surface border border-leo-border">
                  <strong className="text-leo-emerald block font-semibold">Beginners & Seekers</strong>
                  <span>Understand the hidden numerical forces behind your relationships, health, and career trajectory without dogmatic superstition.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 9: COMPLETE FAQ ACCORDION */}
        {/* ========================================================================= */}
        <section className="py-16 border-b border-leo-border">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-leo-emerald bg-leo-surface border border-leo-border px-3.5 py-1 rounded-full">
              Got Questions?
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-cinzel text-leo-emerald">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-leo-text-secondary font-normal leading-relaxed">
              Transparent answers regarding course access, schedules, certificates, and enrollment.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-leo-card border border-leo-border overflow-hidden transition-colors shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-leo-surface/50 transition-colors"
                  >
                    <span className="font-cinzel font-bold text-sm sm:text-base text-leo-emerald">
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-leo-gold shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-leo-text-secondary shrink-0" />
                    )}
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-leo-text-secondary font-normal leading-relaxed border-t border-leo-border/60">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 10: FINAL ENROLLMENT CTA */}
        {/* ========================================================================= */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto p-8 sm:p-14 rounded-3xl bg-leo-card border border-leo-border text-center space-y-6 shadow-md relative overflow-hidden">
            
            {/* Top Accent line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-leo-emerald via-leo-gold to-leo-emerald" />

            <div className="inline-flex items-center gap-2 bg-leo-surface border border-leo-border px-3.5 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-leo-gold" />
              <span className="text-[10px] sm:text-xs font-cinzel font-bold tracking-[0.2em] text-leo-emerald uppercase">
                Secure Your Spot in the Live Batch
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold font-cinzel text-leo-emerald tracking-tight">
              Begin Your Numerology Mastery Today
            </h2>

            <p className="text-sm sm:text-base text-leo-text-secondary max-w-2xl mx-auto font-normal leading-relaxed font-sans">
              Enroll in both <strong className="text-leo-text-primary font-medium">Advanced Vedic Numerology</strong> and <strong className="text-leo-text-primary font-medium">Super Advanced Mobile Numerology</strong> for ₹995.
            </p>

            <div className="flex flex-col items-center justify-center gap-1.5 pt-2">
              <span className="text-3xl sm:text-4xl font-extrabold font-cinzel text-leo-emerald">
                ₹995 ONLY
              </span>
              <span className="text-xs text-leo-text-secondary line-through">
                Combined Approximate Value: ₹24,000
              </span>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={RAZORPAY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-10 py-4 bg-leo-emerald hover:bg-emerald-900 text-leo-ivory font-extrabold uppercase tracking-[0.15em] text-xs sm:text-sm rounded-xl text-center shadow-md transition-all hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>ENROLL NOW — ₹995</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={() => handleNavigate('/programs')}
                className="w-full sm:w-auto px-7 py-4 bg-leo-card hover:bg-leo-surface border border-leo-border hover:border-leo-gold text-leo-emerald text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-xs"
              >
                View All Programs
              </button>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-[11px] text-leo-text-secondary">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-leo-emerald" />
                Verified Razorpay Hosted Checkout
              </span>
              <span>•</span>
              <span>100% Live Classes + Recordings</span>
              <span>•</span>
              <span>Certificate of Completion</span>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
