import React, { useState, useEffect, useRef } from 'react';
import { 
  Gift, 
  X, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  MessageSquare, 
  Minus, 
  Maximize2,
  Calendar,
  ShieldCheck,
  Award
} from 'lucide-react';

interface FloatingConsultationCardProps {
  currentPath?: string;
}

const STORAGE_KEY = 'leo_consultation_offer_dismissed';

export default function FloatingConsultationCard({ currentPath }: FloatingConsultationCardProps) {
  const [isDismissed, setIsDismissed] = useState<boolean>(true);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Check session storage on mount
  useEffect(() => {
    try {
      const dismissed = sessionStorage.getItem(STORAGE_KEY);
      if (dismissed === 'true') {
        setIsDismissed(true);
      } else {
        setIsDismissed(false);
      }
    } catch {
      setIsDismissed(false);
    }

    // Check prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia) {
      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(motionQuery.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      motionQuery.addEventListener('change', listener);
      return () => motionQuery.removeEventListener('change', listener);
    }
  }, []);

  // Handle escape key to close modal
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      // Focus close button on open
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isModalOpen]);

  const handleDismiss = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      sessionStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // Storage unavailable fallback
    }
    setIsDismissed(true);
    setIsModalOpen(false);
  };

  const handleToggleMinimize = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsMinimized(prev => !prev);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // WhatsApp link tailored for this specific personal consultation offer
  const whatsappUrl = `https://wa.me/919930117696?text=${encodeURIComponent(
    "Hello Raajeev Sir, I am a LEO Family student interested in the Special Personal Consultation Offer (Fee: ₹11,999) with Astrology & Numerology Report, Mix Bracelet, and Rudraksha Bead. Please share appointment details."
  )}`;

  const callUrl = "tel:+919930117696";

  const benefits = [
    { text: "Detailed Astrology & Numerology Report", value: null },
    { text: "Mix Bracelet", value: "Worth ₹1,900" },
    { text: "Rudraksha Bead as per astrological chart", value: "Worth ₹700" },
    { text: "Name Correction Guidance", value: null },
    { text: "Personalised Mobile Number Suggestion", value: null },
    { text: "Gemstone Suggestion as per astrological chart", value: null },
    { text: "Personal guidance for your specific concerns", value: null }
  ];

  if (isDismissed) return null;

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. FLOATING CARD CONTAINER (Positioned on the right side)                */}
      {/* ========================================================================= */}

      {/* DESKTOP VIEW: Vertically centered on right edge */}
      <aside 
        aria-label="Personal consultation special opportunity"
        className={`hidden md:block fixed right-4 lg:right-6 top-1/2 -translate-y-1/2 z-[940] pointer-events-auto ${
          prefersReducedMotion ? '' : 'transition-all duration-300 ease-out'
        }`}
      >
        {isMinimized ? (
          // Minimized Tab: Discreet vertical gold badge on right edge
          <button
            type="button"
            onClick={handleToggleMinimize}
            className="group flex items-center gap-2.5 py-3 px-3.5 bg-[#14100D]/95 hover:bg-[#1C1612] border border-[#C6A15B]/50 hover:border-[#C6A15B] rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.65)] backdrop-blur-xl text-left cursor-pointer transition-all hover:scale-105 focus-visible:ring-2 focus-visible:ring-[#C6A15B] focus-visible:outline-none"
            aria-label="Expand Personal Consultation Offer"
            title="Expand Personal Consultation Offer"
          >
            <div className="w-8 h-8 rounded-xl bg-[#C6A15B]/15 border border-[#C6A15B]/40 flex items-center justify-center shrink-0">
              <Gift className="w-4 h-4 text-[#C6A15B] group-hover:scale-110 transition-transform" />
            </div>
            <div className="pr-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C6A15B] block">
                Special Offer
              </span>
              <span className="text-xs font-cinzel font-bold text-[#F7F5EE] whitespace-nowrap block">
                Personal Guidance · ₹11,999
              </span>
            </div>
            <Maximize2 className="w-3.5 h-3.5 text-[#C6A15B]/70 group-hover:text-[#C6A15B] shrink-0 ml-1" />
          </button>
        ) : (
          // Full Expanded Desktop Card
          <div 
            className="w-[330px] lg:w-[350px] bg-[#14100D]/95 backdrop-blur-xl border border-[#C6A15B]/40 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] p-5 text-left text-[#F7F5EE] relative overflow-hidden group transition-all"
            style={{
              boxShadow: '0 20px 50px rgba(0,0,0,0.7), 0 0 25px rgba(198,161,91,0.1)'
            }}
          >
            {/* Top Accent Gold Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#14100D] via-[#C6A15B] to-[#14100D]" />

            {/* Header controls: Eyebrow + Minimize + Close */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <Gift className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
                <span className="text-[9px] font-mono font-bold tracking-[0.14em] uppercase text-[#C6A15B] leading-tight">
                  A SPECIAL OPPORTUNITY FOR LEO FAMILY STUDENTS
                </span>
              </div>

              <div className="flex items-center gap-1 shrink-0 ml-1">
                {/* Minimize Button */}
                <button
                  type="button"
                  onClick={handleToggleMinimize}
                  className="p-1 rounded-md text-[#C6A15B]/70 hover:text-[#C6A15B] hover:bg-[#C6A15B]/10 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#C6A15B] focus-visible:outline-none"
                  aria-label="Minimize consultation card"
                  title="Minimize"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>

                {/* Discreet Close Button (Dismiss for Session) */}
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="p-1 rounded-md text-[#C6A15B]/70 hover:text-[#C6A15B] hover:bg-[#C6A15B]/10 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#C6A15B] focus-visible:outline-none"
                  aria-label="Dismiss consultation offer for this session"
                  title="Dismiss for this session"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Heading */}
            <h3 className="font-cinzel font-bold text-base text-[#F7F5EE] tracking-tight mt-2.5 leading-snug">
              Personal Guidance by Raajeev Sir
            </h3>

            {/* Description */}
            <p className="text-[11.5px] text-[#E3DED2]/85 leading-relaxed font-sans mt-1.5 line-clamp-3">
              {"Facing challenges in career, business, wealth, relationships or personal life? Get personalised Astrology & Numerology insights and guidance tailored to your concerns."}
            </p>

            {/* Price Display */}
            <div className="mt-3.5 p-2.5 rounded-xl bg-[#1C1612]/90 border border-[#C6A15B]/25 flex items-baseline justify-between">
              <div>
                <span className="text-[10px] text-[#A8A29E] font-sans block">
                  Regular Price: <span className="line-through">₹21,999</span>
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-xs text-[#C6A15B] font-bold">Special Fee:</span>
                  <span className="text-base font-cinzel font-extrabold text-[#C6A15B] leading-none">
                    ₹11,999
                  </span>
                </div>
              </div>
              <span className="text-[9px] font-mono uppercase tracking-wider text-[#C6A15B] bg-[#C6A15B]/15 px-2 py-0.5 rounded border border-[#C6A15B]/30 font-bold">
                Student Privilege
              </span>
            </div>

            {/* Key Benefits Highlight (Compact preview) */}
            <div className="mt-3 pt-2.5 border-t border-[#C6A15B]/20 space-y-1.5 text-[11px] text-[#F7F5EE]/90 font-sans">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
                <span className="truncate">Detailed Astrology &amp; Numerology Report</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
                <span className="truncate">Mix Bracelet — <strong className="text-[#C6A15B] font-normal">Worth ₹1,900</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
                <span className="truncate">Rudraksha Bead — <strong className="text-[#C6A15B] font-normal">Worth ₹700</strong></span>
              </div>
            </div>

            {/* Primary CTA Button */}
            <button
              type="button"
              onClick={handleOpenModal}
              className="mt-3.5 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#C6A15B] via-[#E5C378] to-[#C6A15B] text-[#14100D] font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#C6A15B] focus-visible:outline-none"
            >
              <span>Explore Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#14100D]" />
            </button>

            {/* Supporting Text */}
            <p className="text-[9.5px] text-[#A8A29E] text-center font-sans mt-2 italic leading-tight">
              A personal guidance opportunity to gain clarity and make informed decisions.
            </p>
          </div>
        )}
      </aside>

      {/* MOBILE & TABLET VIEW: Non-intrusive floating bottom-corner pill */}
      <aside 
        aria-label="Personal consultation special opportunity"
        className="md:hidden fixed bottom-20 sm:bottom-24 right-3 sm:right-4 z-[940] pointer-events-auto"
      >
        <div className="flex items-center gap-1.5 p-1 bg-[#14100D]/95 backdrop-blur-xl border border-[#C6A15B]/40 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.7)] text-[#F7F5EE]">
          
          {/* Main Tappable Pill opens modal */}
          <button
            type="button"
            onClick={handleOpenModal}
            className="flex items-center gap-2 py-1.5 pl-3 pr-2.5 rounded-full hover:bg-[#C6A15B]/10 active:scale-95 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#C6A15B] focus-visible:outline-none text-left"
            aria-label="Explore Raajeev Sir Personal Consultation Offer: ₹11,999"
          >
            <div className="w-6 h-6 rounded-full bg-[#C6A15B]/20 border border-[#C6A15B]/50 flex items-center justify-center shrink-0">
              <Gift className="w-3 h-3 text-[#C6A15B]" />
            </div>

            <div className="flex flex-col pr-1">
              <span className="text-[8.5px] font-mono font-bold uppercase tracking-wider text-[#C6A15B] leading-none">
                Student Offer
              </span>
              <span className="text-[11px] font-cinzel font-bold text-[#F7F5EE] leading-tight whitespace-nowrap">
                Guidance by Raajeev Sir · ₹11,999
              </span>
            </div>

            <ArrowRight className="w-3 h-3 text-[#C6A15B] shrink-0" />
          </button>

          {/* Discreet Close Button for Session */}
          <button
            type="button"
            onClick={handleDismiss}
            className="w-7 h-7 rounded-full flex items-center justify-center text-[#A8A29E] hover:text-[#C6A15B] hover:bg-[#C6A15B]/15 transition-colors cursor-pointer mr-0.5 focus-visible:ring-2 focus-visible:ring-[#C6A15B] focus-visible:outline-none"
            aria-label="Dismiss consultation offer for this session"
            title="Dismiss for this session"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 2. DEDICATED CONSULTATION DETAILS MODAL                                    */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-[10001] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="consultation-modal-title"
        >
          <div 
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-xl bg-[#15110E] border border-[#C6A15B]/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative text-[#F7F5EE] my-auto overflow-hidden max-h-[92vh] overflow-y-auto ${
              prefersReducedMotion ? '' : 'transition-transform duration-200'
            }`}
            style={{
              boxShadow: '0 25px 60px rgba(0,0,0,0.85), 0 0 35px rgba(198,161,91,0.15)'
            }}
          >
            {/* Top Accent Gradient Border */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#15110E] via-[#C6A15B] to-[#15110E]" />

            {/* Close Button */}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-[#A8A29E] hover:text-[#C6A15B] hover:bg-[#C6A15B]/15 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#C6A15B] focus-visible:outline-none"
              aria-label="Close consultation details dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-3 pr-8">
              
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C6A15B]/15 border border-[#C6A15B]/30 text-[#C6A15B] text-[10px] font-mono font-bold uppercase tracking-wider">
                <Gift className="w-3.5 h-3.5" />
                <span>A SPECIAL OPPORTUNITY FOR LEO FAMILY STUDENTS</span>
              </div>

              {/* Mentor Identity */}
              <div className="flex items-center gap-3.5 pt-1">
                <img
                  src="/assets/teachers/Raajeev.webp"
                  alt="Raajeev Singh Chauhann"
                  width={52}
                  height={52}
                  className="w-13 h-13 rounded-full object-cover border-2 border-[#C6A15B]/70 shadow-md shrink-0"
                />
                <div>
                  <h2 id="consultation-modal-title" className="font-cinzel font-bold text-xl sm:text-2xl text-[#F7F5EE] leading-tight">
                    Personal Guidance by Raajeev Sir
                  </h2>
                  <p className="text-xs text-[#A8A29E] font-sans mt-0.5">
                    Founder, LEO Family Occult School · Master Astro-Numerologist
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#E3DED2]/90 leading-relaxed font-sans pt-1">
                {"Facing challenges in career, business, wealth, relationships or personal life? Get personalised Astrology & Numerology insights and guidance tailored to your concerns."}
              </p>
            </div>

            {/* Pricing Section */}
            <div className="mt-5 p-4 rounded-2xl bg-[#1C1612] border border-[#C6A15B]/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <span className="text-xs text-[#A8A29E] font-sans block">
                  Regular Price: <span className="line-through font-semibold">₹21,999</span>
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C6A15B]">
                    Special Consultation Fee:
                  </span>
                  <span className="text-2xl font-extrabold font-cinzel text-[#C6A15B] leading-none">
                    ₹11,999
                  </span>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#34D399] bg-[#34D399]/15 px-2.5 py-1 rounded-md border border-[#34D399]/30 inline-block">
                  Student Support Initiative
                </span>
                <span className="text-[10px] text-[#A8A29E] block mt-1">
                  Exclusive student benefit pricing
                </span>
              </div>
            </div>

            {/* Included Benefits List (All 7 required items) */}
            <div className="mt-6 space-y-3">
              <h4 className="font-cinzel font-bold text-xs uppercase tracking-wider text-[#C6A15B] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Complete Included Package</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#F7F5EE]">
                {benefits.map((b, idx) => (
                  <div 
                    key={idx} 
                    className={`p-3 rounded-xl bg-[#1C1612]/60 border border-[#C6A15B]/20 flex items-start gap-2.5 ${
                      idx === 6 ? 'sm:col-span-2' : ''
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <span className="font-sans leading-snug block">{b.text}</span>
                      {b.value && (
                        <span className="text-[10px] font-mono font-bold text-[#E5C378] block mt-0.5">
                          {b.value}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Supporting Text */}
            <div className="mt-5 p-3.5 rounded-xl bg-[#14100D] border border-[#C6A15B]/20 text-center">
              <p className="text-xs text-[#E3DED2] italic font-sans leading-relaxed">
                "A personal guidance opportunity to gain clarity and make informed decisions."
              </p>
            </div>

            {/* Booking & Contact Action Buttons */}
            <div className="mt-6 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Primary Booking: WhatsApp */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-gradient-to-r from-[#C6A15B] via-[#E5C378] to-[#C6A15B] text-[#14100D] font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#C6A15B] focus-visible:outline-none"
                >
                  <MessageSquare className="w-4 h-4 text-[#14100D]" />
                  <span>Book via WhatsApp</span>
                </a>

                {/* Direct Call Option */}
                <a
                  href={callUrl}
                  className="py-3 px-4 rounded-xl bg-[#1C1612] hover:bg-[#251D18] border border-[#C6A15B]/40 hover:border-[#C6A15B] text-[#F7F5EE] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#C6A15B] focus-visible:outline-none"
                >
                  <Phone className="w-4 h-4 text-[#C6A15B]" />
                  <span>Call: +91 99301 17696</span>
                </a>
              </div>

              {/* Verified Contact Support Info */}
              <div className="pt-2 flex flex-wrap items-center justify-between text-[11px] text-[#A8A29E] gap-2 border-t border-[#C6A15B]/20">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C6A15B]" />
                  Verified Founder Consultation
                </span>
                <span>General Hotline: +91 99537 13176</span>
                <span>By Appointment Only</span>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
