import React, { useState } from 'react';
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
  Compass, 
  Radio
} from 'lucide-react';

interface AdvancedNumerologyLandingPageProps {
  navigate?: (path: string) => void;
}

const RAZORPAY_URL = "https://rzp.io/rzp/Pyh2zDaN";

// Super Advanced Vedic Numerology Modules (11 Modules)
const VEDIC_MODULES = [
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

// Single-course FAQs for Super Advanced Vedic Numerology
const FAQS = [
  {
    q: 'What is included in the Super Advanced Vedic Numerology course?',
    a: 'This course provides complete, practitioner-grade training in Super Advanced Vedic Numerology across all 11 comprehensive modules — taught live by master mentor Raajeev Singh Chauhann for a complete course fee of ₹194.'
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
    a: 'Click any "ENROLL NOW — ₹194" or "PAY NOW TO ENROLL — ₹194" button to be redirected to our official Razorpay payment gateway. After payment, you will receive confirmation and student portal onboarding instructions.'
  }
];

export default function AdvancedNumerologyLandingPage({ navigate }: AdvancedNumerologyLandingPageProps) {
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

  return (
    <div className="min-h-screen bg-leo-ivory text-leo-text-primary pt-24 pb-36 sm:pb-32 relative overflow-hidden font-sans transition-colors duration-300">
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
        
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
            <span className="text-leo-emerald font-semibold">Super Advanced Vedic Numerology</span>
          </button>

          <span className="text-[10px] font-mono uppercase tracking-widest text-leo-emerald bg-leo-surface border border-leo-border px-3 py-1 rounded-full">
            Special Course Offer
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
              <div className="inline-flex items-center gap-2 bg-leo-surface border border-leo-border px-3.5 py-1.5 rounded-full w-fit shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-leo-gold shrink-0" />
                <span className="text-xs font-cinzel font-extrabold tracking-[0.2em] text-leo-emerald uppercase">
                  SPECIAL COURSE OFFER
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-5xl lg:text-[2.85rem] font-extrabold font-cinzel tracking-tight leading-[1.15] text-leo-emerald">
                Super Advanced Vedic Numerology
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-leo-text-secondary font-normal leading-relaxed font-sans">
                An advanced learning journey through Vedic Numerology concepts and practical analysis. Taught live by founder <strong className="text-leo-text-primary font-medium">Raajeev Singh Chauhann</strong> with real-time interactive Q&amp;A.
              </p>

              {/* Offer Price Highlight Box */}
              <div className="p-5 sm:p-6 rounded-3xl bg-leo-card border border-leo-border shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                  <div>
                    <span className="text-3xl sm:text-4xl font-extrabold font-cinzel text-leo-emerald">
                      ₹194 ONLY
                    </span>
                    <span className="text-xs text-leo-text-secondary block font-sans mt-0.5">
                      Complete course fee for all 11 comprehensive modules
                    </span>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-[11px] text-leo-emerald font-semibold uppercase tracking-wider block">
                      Special Course Offer
                    </span>
                    <span className="text-xs text-leo-text-secondary block">
                      11 Practitioner-Grade Modules
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
                  <span>ENROLL NOW — ₹194</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={scrollToCurriculum}
                  className="px-7 py-4 bg-leo-card hover:bg-leo-surface border border-leo-border hover:border-leo-gold text-leo-emerald font-bold uppercase tracking-[0.15em] text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                >
                  <BookOpen className="w-4 h-4 text-leo-gold" />
                  <span>View Curriculum</span>
                </button>
              </div>

            </div>

            {/* Right Hero Mentor Showcase Card - Above the fold, prioritized loading */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md bg-leo-card border border-leo-border rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col items-center text-center space-y-4">
                
                {/* Mentor Photo with Gold Gradient Ring - Eager, High Priority LCP Image with explicit dimensions */}
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full p-1.5 bg-gradient-to-tr from-leo-emerald via-leo-gold to-leo-emerald shadow-lg overflow-hidden shrink-0">
                  <img
                    src="/assets/teachers/Raajeev.webp"
                    alt="Raajeev Singh Chauhann - Master Occultist & Founder"
                    width={192}
                    height={192}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                {/* Identity */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-leo-emerald bg-leo-surface border border-leo-border px-3 py-1 rounded-full">
                    Lead Mentor &amp; Founder
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-leo-emerald mt-2">
                    Raajeev Singh Chauhann
                  </h3>
                  <p className="text-xs text-leo-text-secondary font-sans mt-1">
                    Founder, LEO Family Occult School · Master Occultist &amp; Spiritual Researcher
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
        {/* SECTION 2: COURSE OVERVIEW & CORE LEARNING PILLARS */}
        {/* ========================================================================= */}
        <section className="py-16 border-b border-leo-border">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-leo-emerald bg-leo-surface border border-leo-border px-3.5 py-1 rounded-full">
              Structured Practitioner Mastery
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-cinzel text-leo-emerald">
              What You Will Master in Super Advanced Vedic Numerology
            </h2>
            <p className="text-sm sm:text-base text-leo-text-secondary font-normal leading-relaxed font-sans">
              Your birth date provides a mathematical cosmic blueprint. Across 11 methodical modules, you will learn how to decode planetary vibrations and apply them to real-world life, career, relationship, and remedial analysis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 sm:p-8 rounded-3xl bg-leo-card border border-leo-border shadow-2xs hover:border-leo-gold/50 transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-leo-surface border border-leo-border flex items-center justify-center">
                <Compass className="w-6 h-6 text-leo-emerald" />
              </div>
              <h3 className="text-xl font-bold font-cinzel text-leo-emerald">
                1. Core Number Vibrations &amp; The 81 Combinations
              </h3>
              <p className="text-sm text-leo-text-secondary font-normal leading-relaxed">
                Master Psychic (Mulank) and Destiny (Bhagyank) calculations, Master Numbers (11, 22, 33), the Harmonic Number Compatibility Matrix, all 81 Psychic-Destiny permutations, repetitive and missing numbers, and the Authentic Vedic Grid.
              </p>
              <div className="text-xs font-mono font-semibold text-leo-emerald pt-2">
                Modules 1 – 6 · Foundational &amp; Diagnostic Science
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-leo-card border border-leo-border shadow-2xs hover:border-leo-gold/50 transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-leo-surface border border-leo-border flex items-center justify-center">
                <Award className="w-6 h-6 text-leo-emerald" />
              </div>
              <h3 className="text-xl font-bold font-cinzel text-leo-emerald">
                2. Applied Life Analysis, Signature Science &amp; Remedies
              </h3>
              <p className="text-sm text-leo-text-secondary font-normal leading-relaxed">
                Apply Vedic Numerology directly to profession and career path selection, marriage and relationship compatibility, house and property number science, signature and name science alignment, and authentic non-dogmatic Vedic remedies.
              </p>
              <div className="text-xs font-mono font-semibold text-leo-emerald pt-2">
                Modules 7 – 11 · Practical &amp; Remedial Application
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: UNIFIED FULL PROGRAM CURRICULUM CONTAINER */}
        {/* Single unified curriculum container for Super Advanced Vedic Numerology */}
        {/* ========================================================================= */}
        <section id="curriculum-section" className="py-16 border-b border-leo-border">
          <div className="max-w-4xl mx-auto text-center space-y-3 mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-leo-emerald bg-leo-surface border border-leo-border px-3.5 py-1 rounded-full">
              Complete 11-Module Syllabus
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-cinzel text-leo-emerald">
              Full Program Curriculum
            </h2>
            <p className="text-sm sm:text-base text-leo-text-secondary font-normal leading-relaxed">
              Explore all 11 modules of Super Advanced Vedic Numerology in one unified curriculum container below — no tabs, no switching, and no hidden content.
            </p>
          </div>

          {/* Unified Single Curriculum Box */}
          <div className="bg-leo-card border border-leo-border rounded-3xl shadow-sm overflow-hidden">
            
            {/* Top Container Header */}
            <div className="px-6 sm:px-8 py-5 bg-leo-surface border-b border-leo-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-5 h-5 text-leo-gold shrink-0" />
                <span className="font-cinzel font-bold text-sm sm:text-base text-leo-emerald">
                  Super Advanced Vedic Numerology · 11 Comprehensive Modules
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-leo-emerald bg-leo-card px-3 py-1 rounded-full border border-leo-border">
                ₹194 Complete Course
              </span>
            </div>

            {/* Unified Curriculum Body: Balanced 2-Column Grid on Desktop, Vertical Stack on Mobile */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Course Heading & Summary */}
              <div className="space-y-2 pb-4 border-b border-leo-border/80">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-leo-surface border border-leo-border text-leo-emerald text-[11px] font-mono font-bold uppercase tracking-wider">
                    <Compass className="w-3.5 h-3.5 text-leo-gold shrink-0" />
                    Complete Syllabus
                  </span>
                  <span className="text-xs font-mono font-bold text-leo-gold bg-leo-surface px-2.5 py-0.5 rounded-md border border-leo-border/60">
                    11 Modules
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold font-cinzel text-leo-emerald leading-snug">
                  SUPER ADVANCED VEDIC NUMEROLOGY (11 MODULES)
                </h3>

                <p className="text-xs sm:text-sm text-leo-text-secondary leading-relaxed font-sans">
                  Master foundational planetary vibrations, 81 Psychic-Destiny permutations, the authentic Vedic Grid, relationship matching, career guidance, house &amp; signature science, and remedies.
                </p>
              </div>

              {/* All 11 Modules of Super Advanced Vedic Numerology */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {VEDIC_MODULES.map((item, index) => (
                  <div
                    key={`vedic-${index}`}
                    className={`p-4 sm:p-5 rounded-2xl bg-leo-surface/60 hover:bg-leo-surface border border-leo-border/70 hover:border-leo-gold/50 shadow-2xs transition-all flex items-start gap-3.5 ${
                      index === VEDIC_MODULES.length - 1 ? 'md:col-span-2' : ''
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-leo-card border border-leo-border flex items-center justify-center shrink-0 text-leo-emerald font-mono text-xs font-bold shadow-2xs mt-0.5">
                      {index + 1}
                    </div>
                    <div className="space-y-1 min-w-0 flex-1">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-leo-gold block font-bold">
                        {item.module}
                      </span>
                      <h4 className="text-sm font-bold font-cinzel text-leo-emerald leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-xs text-leo-text-secondary font-normal font-sans leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Bottom Inner Summary & Enrollment Bar */}
            <div className="px-6 sm:px-8 py-5 bg-leo-surface/70 border-t border-leo-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-leo-text-secondary text-center sm:text-left">
                All 11 modules taught 100% Live by Raajeev Singh Chauhann with interactive Q&amp;A in every session.
              </span>
              <a
                href={RAZORPAY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-leo-emerald hover:bg-emerald-900 text-leo-ivory text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-xs shrink-0 flex items-center gap-1.5"
              >
                <span>ENROLL NOW — ₹194</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

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
                  100% Live Classes with Direct Q&amp;A in Every Session
                </h3>
                <p className="text-sm sm:text-base text-leo-text-secondary font-normal leading-relaxed font-sans">
                  Unlike pre-recorded static video libraries, all sessions of this course are conducted live. You get direct interaction with Raajeev Singh Chauhann, allowing you to ask real questions, analyze student chart examples, and solve doubts instantly.
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
                  ENROLL NOW — ₹194
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
                1-Year Full Recording Access Across Web &amp; Mobile App
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

            <div className="p-6 sm:p-8 rounded-3xl bg-leo-card border border-leo-border shadow-2xs space-y-4">
              <h3 className="text-lg font-bold font-cinzel text-leo-emerald">
                Who Is This Course For?
              </h3>
              <div className="space-y-3 text-xs text-leo-text-secondary font-normal leading-relaxed">
                <div className="p-3.5 rounded-xl bg-leo-surface border border-leo-border">
                  <strong className="text-leo-emerald block font-semibold">Aspiring &amp; Practicing Occultists</strong>
                  <span>Deepen your diagnostic accuracy, master all 81 Psychic-Destiny combinations, and apply the Authentic Vedic Grid in professional consultations.</span>
                </div>
                <div className="p-3.5 rounded-xl bg-leo-surface border border-leo-border">
                  <strong className="text-leo-emerald block font-semibold">Business Owners &amp; Professionals</strong>
                  <span>Align career paths, partnerships, commercial signatures, and house or office property numbers with favorable planetary frequencies.</span>
                </div>
                <div className="p-3.5 rounded-xl bg-leo-surface border border-leo-border">
                  <strong className="text-leo-emerald block font-semibold">Beginners &amp; Seekers</strong>
                  <span>Understand the hidden numerical forces behind your relationships, life patterns, and career trajectory without dogmatic superstition.</span>
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
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-leo-card border border-leo-border overflow-hidden transition-colors shadow-2xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-leo-surface/50 transition-colors"
                  >
                    <span className="font-cinzel font-bold text-sm sm:text-base text-leo-emerald">
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-leo-gold shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-leo-text-secondary font-normal leading-relaxed border-t border-leo-border/60">
                      {faq.a}
                    </div>
                  )}
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
              Begin Your Vedic Numerology Mastery Today
            </h2>

            <p className="text-sm sm:text-base text-leo-text-secondary max-w-2xl mx-auto font-normal leading-relaxed font-sans">
              Enroll in <strong className="text-leo-text-primary font-medium">Super Advanced Vedic Numerology</strong> (11 Comprehensive Modules) for ₹194.
            </p>

            <div className="flex flex-col items-center justify-center gap-1.5 pt-2">
              <span className="text-3xl sm:text-4xl font-extrabold font-cinzel text-leo-emerald">
                ₹194 ONLY
              </span>
              <span className="text-xs text-leo-text-secondary">
                Complete Course Fee
              </span>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={RAZORPAY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-10 py-4 bg-leo-emerald hover:bg-emerald-900 text-leo-ivory font-extrabold uppercase tracking-[0.15em] text-xs sm:text-sm rounded-xl text-center shadow-md transition-all hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>ENROLL NOW — ₹194</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={() => handleNavigate('/programs')}
                className="w-full sm:w-auto px-7 py-4 bg-leo-card hover:bg-leo-surface border border-leo-border hover:border-leo-gold text-leo-emerald text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-2xs"
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

      {/* ==================================================
          PERSISTENT FLOATING CTA: PAY NOW TO ENROLL — ₹194
          Matches /academy/raajeev style, placement & responsive behavior
          ================================================== */}
      <div className="fixed bottom-0 left-0 right-0 z-[990] bg-[#143D2E]/95 backdrop-blur-xl border-t border-[#C6A15B]/40 shadow-[0_-10px_35px_rgba(0,0,0,0.35)] py-3 px-4 sm:px-6 pointer-events-auto pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] transition-transform duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-4">
          
          {/* Left Column: Avatar + Program Information */}
          <div className="flex items-center gap-3 min-w-0">
            <img
              src="/assets/teachers/Raajeev.webp"
              alt="Raajeev Singh Chauhann"
              width={40}
              height={40}
              loading="lazy"
              decoding="async"
              className="w-10 h-10 rounded-full object-cover border-2 border-[#C6A15B]/70 shadow-md shrink-0 hidden sm:block"
            />
            <div className="text-left min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C6A15B] shrink-0">
                  SPECIAL COURSE OFFER • ₹194
                </span>
                <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#143D2E] border border-[#C6A15B]/30 text-[#F7F5EE] text-[9px] font-mono tracking-tight">
                  ✨ Live Masterclass + 1-Yr Access
                </span>
              </div>
              <p className="text-xs sm:text-sm font-bold font-cinzel text-[#F7F5EE] truncate mt-0.5">
                Super Advanced Vedic Numerology
              </p>
            </div>
          </div>

          {/* Right Column: Pricing & PAY NOW TO ENROLL — ₹194 Button */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <div className="hidden lg:flex flex-col items-end">
              <span className="text-sm font-extrabold font-cinzel text-[#C6A15B] leading-none">
                ₹194 ONLY
              </span>
              <span className="text-[10px] text-[#F7F5EE]/70">
                Complete Course Fee
              </span>
            </div>

            <a
              href={RAZORPAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              title="Pay now to enroll in Super Advanced Vedic Numerology"
              className="group relative inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3 rounded-xl sm:rounded-full bg-gradient-to-r from-[#C6A15B] via-[#E5C378] to-[#C6A15B] text-[#143D2E] font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(198,161,91,0.45)] hover:shadow-[0_0_30px_rgba(198,161,91,0.7)] hover:scale-[1.03] active:scale-95 transition-all duration-200 cursor-pointer shrink-0 focus:outline-none focus:ring-2 focus:ring-[#C6A15B] focus:ring-offset-2 focus:ring-offset-[#143D2E]"
            >
              <span className="relative z-10 font-black tracking-wider whitespace-nowrap">
                PAY NOW TO ENROLL — ₹194
              </span>
              <ArrowRight className="w-4 h-4 text-[#143D2E] relative z-10 group-hover:translate-x-1 transition-transform shrink-0" />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
