import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  CheckCircle2, 
  Video, 
  Calendar, 
  Clock, 
  Award, 
  ArrowRight, 
  BookOpen,
  Radio,
  ShieldCheck
} from 'lucide-react';
import SmartImage from './SmartImage';
import { programService } from '../../services/programService';
import { Program } from '../../models/program';

interface NavratriCoursePromotionBannerProps {
  navigate?: (path: string) => void;
}

const RAZORPAY_URL = "https://rzp.io/rzp/Pyh2zDaN";

export default function NavratriCoursePromotionBanner({ navigate }: NavratriCoursePromotionBannerProps) {
  const [bundleProgram, setBundleProgram] = useState<Program | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    programService.getAllPrograms()
      .then(progs => {
        const found = progs.find(p => p.id === 'prog-navratri-numerology');
        if (found) {
          setBundleProgram(found);
          if (found.campaignActive === false || found.visible === false) {
            setIsVisible(false);
          }
        }
      })
      .catch(err => console.error('Failed to query course program state:', err));
  }, []);

  if (!isVisible) {
    return null;
  }

  const handleNavigate = (path: string) => {
    if (navigate) {
      navigate(path);
    } else {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo(0, 0);
    }
  };

  return (
    <section 
      id="navratri-campaign-banner"
      className="relative py-12 md:py-16 bg-leo-ivory text-leo-text-primary border-y border-leo-border transition-colors duration-300"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Main Banner Card */}
        <div className="relative bg-leo-card border border-leo-border rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl overflow-hidden">
          
          {/* Subtle Champagne Gold Top Accent Strip */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-leo-emerald via-leo-gold to-leo-emerald" />

          {/* Background Ambient Warm Pattern */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-leo-surface/60 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-leo-surface/50 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Badge: SPECIAL COURSE OFFER */}
              <div className="inline-flex items-center gap-2 bg-leo-surface border border-leo-border px-3.5 py-1.5 rounded-full shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-leo-gold shrink-0" />
                <span className="text-[11px] font-cinzel font-extrabold tracking-[0.2em] text-leo-emerald uppercase">
                  SPECIAL COURSE OFFER
                </span>
              </div>

              {/* Heading */}
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-cinzel text-leo-emerald tracking-tight leading-[1.2]">
                  Super Advanced Vedic Numerology
                </h2>
                
                {/* Supporting Copy */}
                <p className="text-sm sm:text-base text-leo-text-secondary font-sans font-normal leading-relaxed">
                  An advanced learning journey through Vedic Numerology concepts and practical analysis.
                </p>
              </div>

              {/* Concise Summary of the Vedic Numerology Syllabus */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-leo-surface/70 border border-leo-border text-xs text-leo-text-secondary leading-relaxed">
                <span className="font-cinzel font-bold text-leo-emerald uppercase tracking-wider block mb-1">
                  11-Module Vedic Numerology Syllabus Summary
                </span>
                Psychic &amp; Destiny Numbers (Mulank &amp; Bhagyank) · Master Numbers (11, 22, 33) · Harmonic Number Compatibility · The Complete 81 Combinations · Repetitive &amp; Missing Numbers · Authentic Vedic Grid · Profession &amp; Career Path · Marriage &amp; Relationship Compatibility · House &amp; Property Numbers · Signature &amp; Name Science · Authentic Vedic Remedies.
              </div>

              {/* Pricing Box & Schedule Detail */}
              <div className="p-4 sm:p-5 rounded-2xl bg-leo-surface border border-leo-border space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                  <div>
                    <span className="text-3xl sm:text-4xl font-extrabold font-cinzel text-leo-emerald">
                      ₹194 ONLY
                    </span>
                    <span className="text-xs text-leo-text-secondary block font-sans mt-0.5">
                      Complete course fee for the 11-module live masterclass
                    </span>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-[11px] font-bold text-leo-emerald uppercase tracking-wider block">
                      Special Course Offer
                    </span>
                    <span className="text-xs text-leo-text-secondary block">
                      11 Comprehensive Modules
                    </span>
                  </div>
                </div>

                {/* Schedule details */}
                <div className="pt-2 border-t border-leo-border flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-leo-text-secondary">
                  <span className="inline-flex items-center gap-1.5 font-medium text-leo-emerald">
                    <Radio className="w-3.5 h-3.5 text-leo-emerald" />
                    All Classes Live (2/Week)
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-leo-gold" />
                    11:00 AM–1:00 PM IST
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-leo-gold" />
                    Commencing 16 Nov
                  </span>
                </div>

                <div className="text-[10px] text-leo-text-secondary font-sans italic">
                  * Note: Schedule commences 16 November (11:00 AM – 1:00 PM). Schedule year &amp; campaign window flagged for admin confirmation.
                </div>
              </div>

              {/* 5 Core Feature Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-leo-text-primary font-medium pt-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-leo-emerald shrink-0" />
                  <span>All Classes Live</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-leo-emerald shrink-0" />
                  <span>Live Q&amp;A with Raajeev Singh Chauhann</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-leo-emerald shrink-0" />
                  <span>Two Live Classes Per Week</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-leo-emerald shrink-0" />
                  <span>1-Year Course and Recording Access</span>
                </div>
                <div className="flex items-center gap-2 sm:col-span-2">
                  <CheckCircle2 className="w-4 h-4 text-leo-emerald shrink-0" />
                  <span>Certificate of Completion</span>
                </div>
              </div>

              {/* Action Buttons: Emerald/Gold Primary + White/Ivory Secondary */}
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
                  onClick={() => handleNavigate('/courses/advanced-numerology-bundle')}
                  className="px-7 py-4 bg-leo-card hover:bg-leo-surface border border-leo-border hover:border-leo-gold text-leo-emerald font-bold uppercase tracking-[0.15em] text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <BookOpen className="w-4 h-4 text-leo-gold" />
                  <span>VIEW CURRICULUM</span>
                </button>
              </div>

              {/* Security & Verification trust strip */}
              <div className="flex items-center gap-2 text-[11px] text-leo-text-secondary pt-1">
                <ShieldCheck className="w-4 h-4 text-leo-emerald shrink-0" />
                <span>Official Razorpay Hosted Gateway · Instant Batch Enrolment</span>
              </div>

            </div>

            {/* Right Mentor Column (5 cols) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm bg-leo-surface border border-leo-border rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center space-y-4 shadow-sm">
                
                {/* Mentor Portrait with Gold border */}
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1.5 bg-gradient-to-tr from-leo-emerald via-leo-gold to-leo-emerald shadow-lg overflow-hidden">
                  <SmartImage
                    src="/assets/teachers/Raajeev.webp"
                    alt="Raajeev Singh Chauhann"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                {/* Mentor Info */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-leo-emerald bg-white border border-leo-border px-3 py-1 rounded-full shadow-xs">
                    Lead Mentor & Founder
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-leo-emerald mt-2">
                    Raajeev Singh Chauhann
                  </h3>
                  <p className="text-xs text-leo-text-secondary font-sans mt-1">
                    Master Numerologist & Occult Researcher
                  </p>
                </div>

                {/* Mentor Credentials */}
                <div className="grid grid-cols-3 gap-2 w-full pt-3 border-t border-leo-border text-center">
                  <div className="p-2 rounded-xl bg-white border border-leo-border">
                    <span className="text-sm font-cinzel font-bold text-leo-emerald block">20+</span>
                    <span className="text-[9px] text-leo-text-secondary uppercase tracking-wider block">Yrs Mastery</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-leo-border">
                    <span className="text-sm font-cinzel font-bold text-leo-emerald block">100K+</span>
                    <span className="text-[9px] text-leo-text-secondary uppercase tracking-wider block">Students</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-leo-border">
                    <span className="text-sm font-cinzel font-bold text-leo-emerald block">10+</span>
                    <span className="text-[9px] text-leo-text-secondary uppercase tracking-wider block">Countries</span>
                  </div>
                </div>

                {/* Mentor quote */}
                <p className="text-xs text-leo-text-secondary italic pt-1">
                  "All sessions are live with direct Q&A to answer your questions on your charts in real time."
                </p>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
