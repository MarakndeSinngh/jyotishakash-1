import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, HelpCircle, ArrowRight, MessageSquare, Compass } from 'lucide-react';
import { WHATSAPP_LINK } from '../../constants/contacts';

export default function HomepageCTASection() {
  const scrollToComparison = () => {
    const el = document.getElementById('comparison');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="unsure-cta" className="relative py-24 sm:py-32 bg-background text-text-primary overflow-hidden z-10">
      
      {/* Decorative Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.06)_0%,transparent_70%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-gradient-to-b from-card via-surface/40 to-card border border-primary/30 rounded-[3rem] p-8 sm:p-14 md:p-16 text-center overflow-hidden shadow-2xl"
        >
          {/* Subtle Ambient Ring */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6 max-w-3xl mx-auto">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em]">
              <HelpCircle className="w-3.5 h-3.5 text-primary animate-pulse" />
              <span>Personal Guidance</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-cinzel text-text-primary leading-tight">
              Still Unsure Which Academy or Mentor is Right for You?
            </h2>

            <p className="text-text-secondary text-base sm:text-lg font-light leading-relaxed font-sans">
              Compare our specialized academies side-by-side or speak directly with our academic guidance counselors to find the ideal learning path for your goals.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-4 pt-4">
              {/* Compare Academies Button */}
              <button
                onClick={scrollToComparison}
                className="px-8 py-5 bg-card hover:bg-surface border border-primary/40 hover:border-primary text-text-primary font-bold uppercase tracking-[0.15em] text-xs sm:text-sm rounded-xl transition-all duration-300 hover:-translate-y-0.5 shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-primary" />
                <span>Compare Academies</span>
              </button>

              {/* Book Consultation Button */}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-5 bg-primary hover:bg-amber-400 text-background font-extrabold uppercase tracking-[0.15em] text-xs sm:text-sm rounded-xl shadow-lg hover:shadow-amber-400/30 transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Book Consultation</span>
              </a>
            </div>

          </div>
        </motion.div>
      </div>

    </section>
  );
}
