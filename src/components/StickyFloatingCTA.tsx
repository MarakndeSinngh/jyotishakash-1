import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Clock, Users, ShieldCheck } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { useLanguage } from '../context/LanguageContext';

interface StickyFloatingCTAProps {
  currentPath: string;
}

const ALLOWED_SLUGS = ['raajeev'];

export default function StickyFloatingCTA({ currentPath }: StickyFloatingCTAProps) {
  const { activeAcademy } = useAcademy();
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  // Check if current path is one of the allowed academy pages
  const isAcademyPage = currentPath.startsWith('/academy/');
  const isAllowedAcademy = ALLOWED_SLUGS.includes(activeAcademy?.slug?.toLowerCase() || '');
  const shouldRender = isAcademyPage && isAllowedAcademy;

  useEffect(() => {
    if (!shouldRender) {
      setIsVisible(false);
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [shouldRender, currentPath]);

  if (!shouldRender) return null;

  // Centralized Registration URL from Academy Config / Teacher Registry
  const registrationUrl =
    activeAcademy?.contactDetails?.whatsapp ||
    (activeAcademy?.contactDetails?.phone
      ? `https://wa.me/${activeAcademy.contactDetails.phone.replace(/[^0-9]/g, '')}`
      : 'https://chat.whatsapp.com/HOUZ3rmuigF32SjOVco8B2?s=sh&p=a&ilr=1');

  const instructorTitle = activeAcademy?.instructorName 
    ? `${activeAcademy.instructorName}'s Masterclass`
    : 'Free Live Masterclass';

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* ==================================================
              DESKTOP STICKY BAR (Positioned directly below Navbar)
              ================================================== */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="hidden md:block fixed top-[64px] lg:top-[70px] left-0 right-0 z-[990] pointer-events-auto"
          >
            <div className="bg-[#180C02]/90 backdrop-blur-xl border-b border-[#D4AF37]/35 shadow-[0_10px_30px_rgba(0,0,0,0.5)] text-text-primary py-2.5 px-6">
              <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                
                {/* Left side: Tag & Title */}
                <div className="flex items-center gap-3 min-w-0">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#F3E5AB] text-[11px] font-bold uppercase tracking-wider font-mono shrink-0 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
                    <span>🎓 FREE LIVE MASTERCLASS</span>
                  </span>

                  <div className="flex items-center gap-2 truncate">
                    <span className="text-sm font-extrabold font-cinzel text-text-primary truncate">
                      {t('cta.reserveTitle', 'Reserve Your Free Seat')}
                    </span>
                    <span className="text-xs text-text-secondary font-sans hidden xl:inline">
                      • {instructorTitle}
                    </span>
                  </div>
                </div>

                {/* Right side: Badge & Primary CTA Button */}
                <div className="flex items-center gap-4 shrink-0">
                  <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold tracking-widest uppercase font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>LIMITED SEATS</span>
                  </div>

                  <a
                    href={registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#B8860B] text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.35)] hover:shadow-[0_0_30px_rgba(212,175,55,0.65)] hover:scale-[1.03] active:scale-95 transition-all duration-200 cursor-pointer overflow-hidden"
                  >
                    <span className="relative z-10 font-bold">
                      {t('cta.buttonText', 'Reserve My Free Seat')}
                    </span>
                    <ArrowRight className="w-4 h-4 text-black relative z-10 group-hover:translate-x-0.5 transition-transform shrink-0" />
                  </a>
                </div>

              </div>
            </div>
          </motion.div>

          {/* ==================================================
              MOBILE FLOATING BOTTOM BAR (Full-width thumb access)
              ================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="md:hidden fixed bottom-0 left-0 right-0 z-[990] p-3 bg-[#180C02]/95 backdrop-blur-2xl border-t border-[#D4AF37]/35 shadow-[0_-8px_30px_rgba(0,0,0,0.7)] pointer-events-auto"
          >
            <div className="max-w-md mx-auto flex items-center justify-between gap-3">
              
              {/* Left Info Column */}
              <div className="flex flex-col min-w-0">
                <div className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>🎓 FREE MASTERCLASS</span>
                </div>
                <span className="text-xs font-bold text-text-primary font-cinzel truncate mt-0.5">
                  {t('cta.reserveTitle', 'Reserve Your Free Seat')}
                </span>
              </div>

              {/* Right CTA Button */}
              <a
                href={registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 max-w-[210px] py-3 px-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#B8860B] text-black font-extrabold text-xs uppercase tracking-wider text-center shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.7)] active:scale-95 transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
              >
                <span className="truncate font-extrabold">{t('cta.buttonText', 'Reserve My Free Seat')}</span>
                <ArrowRight className="w-4 h-4 text-black shrink-0" />
              </a>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
