import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, CalendarDays, MessageCircle, Sparkles } from 'lucide-react';
import {
  DIVINE_BUSINESS_WEBINAR_BADGE,
  DIVINE_BUSINESS_WEBINAR_GROUP_URL,
  DIVINE_BUSINESS_WEBINAR_PATH,
  DIVINE_BUSINESS_WEBINAR_TITLE
} from '../../constants/divineBusinessWebinar';

interface DivineBusinessWebinarPromoCardProps {
  variant?: 'home' | 'programs';
  navigate?: (path: string) => void;
}

export default function DivineBusinessWebinarPromoCard({
  variant = 'home',
  navigate
}: DivineBusinessWebinarPromoCardProps) {
  const openDetails = () => {
    if (navigate) {
      navigate(DIVINE_BUSINESS_WEBINAR_PATH);
      return;
    }
    window.location.assign(DIVINE_BUSINESS_WEBINAR_PATH);
  };

  if (variant === 'programs') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        className="group flex h-full flex-col overflow-hidden rounded-3xl border-2 border-[#C29B47]/65 bg-[#FAF6F0] text-[#2B1704] shadow-xl transition-shadow hover:shadow-2xl"
      >
        <div className="relative flex aspect-[16/10] flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#1C0F02] via-[#3B260F] to-[#1C0F02] px-5 text-center text-[#FAF6F0]">
          <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-[#C29B47]/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-[#A86E25]/30 blur-3xl" />
          <span className="relative z-10 inline-flex items-center gap-2 rounded-full border border-[#C29B47]/60 bg-[#C29B47]/15 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#F2D797]">
            <Sparkles className="h-3.5 w-3.5" />
            {DIVINE_BUSINESS_WEBINAR_BADGE}
          </span>
          <h3 className="relative z-10 mt-5 font-cinzel text-xl font-extrabold leading-tight text-[#FAF6F0] sm:text-2xl">
            DIVINE BUSINESS
          </h3>
          <p className="relative z-10 mt-1 text-xs font-bold uppercase tracking-[0.16em] text-[#E9C269]">
            Brand Name & Logo Design
          </p>
          <div className="relative z-10 mt-5 flex flex-wrap items-center justify-center gap-2 text-[9px] font-bold tracking-wider text-[#F2D797]">
            <span>ASTROLOGY</span><span>•</span><span>NUMEROLOGY</span><span>•</span><span>PRONOLOGY</span>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#A86E25] px-3 py-1 text-[9px] font-extrabold uppercase tracking-wider text-white">Free Webinar</span>
            <span className="rounded-full border border-[#C29B47]/50 bg-white px-3 py-1 text-[9px] font-extrabold uppercase tracking-wider text-[#6D451A]">3 Days • Live</span>
          </div>
          <h4 className="font-cinzel text-lg font-extrabold leading-snug text-[#2B1704]">{DIVINE_BUSINESS_WEBINAR_TITLE}</h4>
          <p className="mt-2 flex-1 text-xs leading-relaxed text-[#5A4027]">
            Explore a distinctive brand-creation approach through traditional Astrology, Numerology and Pronology principles.
          </p>
          <div className="mt-4 flex items-center gap-2 border-t border-[#E5D4BE] pt-3 text-[10px] font-semibold text-[#6D451A]">
            <CalendarDays className="h-4 w-4 text-[#A86E25]" />
            Dates & Timing: To Be Announced
          </div>
          <button
            type="button"
            onClick={openDetails}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1C0F02] px-4 py-3 text-[11px] font-extrabold uppercase tracking-wider text-[#FAF6F0] transition hover:bg-[#3B260F]"
          >
            View Program Details <ArrowRight className="h-4 w-4" />
          </button>
          <a
            href={DIVINE_BUSINESS_WEBINAR_GROUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-[11px] font-extrabold uppercase tracking-wider text-white transition hover:bg-[#1EBD5B]"
          >
            <MessageCircle className="h-4 w-4" /> Join WhatsApp Group <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </motion.article>
    );
  }

  return (
    <section aria-label="Featured free webinar: Divine Business Brand Name and Logo Design" className="relative z-20 mx-auto w-full max-w-7xl px-5 py-7 sm:px-8 sm:py-9">
      <div className="relative overflow-hidden rounded-[2rem] border-2 border-[#C29B47]/65 bg-gradient-to-r from-[#FAF6F0] via-[#F2E9DC] to-[#FAF6F0] p-5 text-[#2B1704] shadow-2xl sm:p-8 lg:p-9">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#C29B47]/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-[30%] h-52 w-52 rounded-full bg-[#A86E25]/10 blur-3xl" />
        <div className="relative z-10 grid items-center gap-7 lg:grid-cols-[1fr_auto]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#1C0F02] px-3.5 py-2 text-[10px] font-extrabold uppercase tracking-[0.17em] text-[#E9C269] shadow">
              <Sparkles className="h-4 w-4" /> {DIVINE_BUSINESS_WEBINAR_BADGE}
            </div>
            <h2 className="mt-4 max-w-4xl font-cinzel text-2xl font-extrabold leading-tight text-[#2B1704] sm:text-3xl lg:text-4xl">
              {DIVINE_BUSINESS_WEBINAR_TITLE}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#5A4027] sm:text-base">
              Learn a distinctive approach to business brand identity through Astrology, Numerology and Pronology.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {['ASTROLOGY', 'NUMEROLOGY', 'PRONOLOGY'].map((name) => (
                <span key={name} className="rounded-full border border-[#C29B47]/55 bg-white/75 px-3 py-1.5 text-[9px] font-extrabold tracking-wider text-[#6D451A]">{name}</span>
              ))}
              <span className="rounded-full bg-[#A86E25] px-3 py-1.5 text-[9px] font-extrabold tracking-wider text-white">100% FREE • 3 DAYS</span>
            </div>
          </div>
          <div className="flex w-full flex-col gap-3 rounded-2xl border border-[#C29B47]/45 bg-white/75 p-4 shadow-sm sm:p-5 lg:min-w-[250px]">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1C0F02] text-[#E9C269]"><CalendarDays className="h-5 w-5" /></div>
              <div><span className="block text-[9px] font-extrabold uppercase tracking-wider text-[#A86E25]">Webinar Schedule</span><strong className="text-sm text-[#2B1704]">Dates & Timing TBA</strong></div>
            </div>
            <button type="button" onClick={openDetails} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1C0F02] px-5 py-3.5 text-xs font-extrabold uppercase tracking-wider text-[#FAF6F0] transition hover:bg-[#3B260F]">
              View Full Details <ArrowRight className="h-4 w-4" />
            </button>
            <a href={DIVINE_BUSINESS_WEBINAR_GROUP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3.5 text-xs font-extrabold uppercase tracking-wider text-white transition hover:bg-[#1EBD5B]">
              <MessageCircle className="h-4 w-4" /> Join WhatsApp Group <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
