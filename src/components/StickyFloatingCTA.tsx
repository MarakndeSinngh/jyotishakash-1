import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Clock, Users, ShieldCheck, MessageCircle } from 'lucide-react';
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
  const [showNotice, setShowNotice] = useState(true);

  const isMeditation = currentPath === '/meditation';
  const isAcademyPage = currentPath.startsWith('/academy/');
  const isAllowedAcademy = ALLOWED_SLUGS.includes(activeAcademy?.slug?.toLowerCase() || '');
  const shouldRender = (isAcademyPage && isAllowedAcademy) || isMeditation;

  const isRaajeev = activeAcademy?.slug?.toLowerCase() === 'raajeev' || isMeditation;

  useEffect(() => {
    if (!shouldRender) {
      setIsVisible(false);
      return;
    }

    const handleScroll = () => {
      setIsVisible(true);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [shouldRender, currentPath]);

  // Auto-collapse the expanded notice after 6 seconds
  useEffect(() => {
    if (isRaajeev && shouldRender) {
      const timer = setTimeout(() => {
        setShowNotice(false);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [isRaajeev, shouldRender]);

  if (!shouldRender) return null;

  const registrationUrl = isMeditation
    ? 'https://chat.whatsapp.com/E1CeluFqVlIGWzMYVSQ2F9'
    : isRaajeev
    ? 'https://chat.whatsapp.com/JSJ1cD0uUS2AYNabbH8IC3'
    : (activeAcademy?.contactDetails?.whatsapp ||
      (activeAcademy?.contactDetails?.phone
        ? `https://wa.me/${activeAcademy.contactDetails.phone.replace(/[^0-9]/g, '')}`
        : 'https://chat.whatsapp.com/HOUZ3rmuigF32SjOVco8B2?s=sh&p=a&ilr=1'));

  const ctaButtonText = isMeditation ? 'JOIN MEDITATION BATCH' : isRaajeev ? 'JOIN WHATSAPP GROUP' : t('cta.buttonText', 'Reserve My Free Seat');
  const ctaTitle = isMeditation ? 'JOIN MEDITATION WHATSAPP GROUP' : isRaajeev ? 'JOIN OUR OFFICIAL WHATSAPP GROUP' : t('cta.reserveTitle', 'Reserve Your Free Seat');
  const ctaTag = isMeditation ? '🌿 LIVE WEBINAR UPDATES' : isRaajeev ? '🎓 OFFICIAL WHATSAPP GROUP' : '🎓 FREE LIVE MASTERCLASS';
  const ctaBadge = isMeditation ? '3 DAYS FREE' : isRaajeev ? 'LIVE UPDATES' : 'LIMITED SEATS';

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
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              boxShadow: isRaajeev ? [
                '0 10px 30px rgba(0,0,0,0.5), 0 0 0 0 rgba(212,175,55,0.5)',
                '0 10px 30px rgba(0,0,0,0.5), 0 0 20px 4px rgba(212,175,55,0.4)',
                '0 10px 30px rgba(0,0,0,0.5), 0 0 0 0 rgba(212,175,55,0)'
              ] : '0 10px 30px rgba(0,0,0,0.5)'
            }}
            transition={{ 
              duration: 0.4, 
              ease: 'easeOut',
              boxShadow: { duration: 2, repeat: isRaajeev ? 2 : 0, repeatType: 'loop' }
            }}
            className="hidden md:block fixed top-[64px] lg:top-[70px] left-0 right-0 z-[990] pointer-events-auto"
          >
            <div className="bg-[#180C02]/95 backdrop-blur-xl border-b-2 border-[#D4AF37]/50 shadow-[0_10px_35px_rgba(0,0,0,0.6)] text-text-primary py-3 px-6 relative overflow-hidden">
              {/* Subtle light shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/10 to-transparent pointer-events-none animate-pulse" />

              <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 relative z-10">
                
                {/* Left side: Tag & Title */}
                <div className="flex items-center gap-3 min-w-0">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#F3E5AB] text-[11px] font-bold uppercase tracking-wider font-mono shrink-0 shadow-sm">
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/20" />
                    <span>{ctaTag}</span>
                  </span>

                  <div className="flex flex-col truncate">
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-sm font-extrabold font-cinzel text-text-primary truncate">
                        {ctaTitle}
                      </span>
                      {isRaajeev && showNotice && (
                        <span className="hidden lg:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono tracking-tight animate-fade-in">
                          ✨ Live Updates • PDFs • Announcements
                        </span>
                      )}
                    </div>
                    {isRaajeev && showNotice && (
                      <span className="text-[11px] text-[#F3E5AB]/80 font-light tracking-wide lg:hidden">
                        Live Updates • PDFs • Announcements
                      </span>
                    )}
                  </div>
                </div>

                {/* Right side: Badge & Primary CTA Button */}
                <div className="flex items-center gap-4 shrink-0">
                  <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold tracking-widest uppercase font-mono shadow-inner">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>{ctaBadge}</span>
                  </div>

                  <a
                    href={registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Join WhatsApp Group for instant updates"
                    className="group relative inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#B8860B] text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(212,175,55,0.45)] hover:shadow-[0_0_35px_rgba(212,175,55,0.75)] hover:scale-[1.04] active:scale-95 transition-all duration-200 cursor-pointer overflow-hidden"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-950 fill-emerald-900 shrink-0" />
                    <span className="relative z-10 font-black tracking-wider">
                      {ctaButtonText}
                    </span>
                    <ArrowRight className="w-4 h-4 text-black relative z-10 group-hover:translate-x-1 transition-transform shrink-0" />
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
            animate={{ 
              opacity: 1, 
              y: 0,
              boxShadow: isRaajeev ? [
                '0 -8px 30px rgba(0,0,0,0.7), 0 0 0 0 rgba(212,175,55,0.4)',
                '0 -8px 30px rgba(0,0,0,0.7), 0 0 20px 4px rgba(212,175,55,0.3)',
                '0 -8px 30px rgba(0,0,0,0.7), 0 0 0 0 rgba(212,175,55,0)'
              ] : '0 -8px 30px rgba(0,0,0,0.7)'
            }}
            transition={{ 
              duration: 0.3, 
              ease: 'easeOut',
              boxShadow: { duration: 2, repeat: isRaajeev ? 2 : 0, repeatType: 'loop' }
            }}
            className="md:hidden fixed bottom-0 left-0 right-0 z-[990] p-3.5 bg-[#180C02]/98 backdrop-blur-2xl border-t-2 border-[#D4AF37]/50 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] pointer-events-auto"
          >
            <div className="max-w-md mx-auto flex flex-col gap-2">
              
              {isRaajeev && showNotice && (
                <div className="flex items-center justify-between text-[11px] text-[#F3E5AB] bg-background/60 border border-[#D4AF37]/20 px-3 py-1 rounded-lg">
                  <span className="font-medium">✨ Get Webinar Updates & PDFs</span>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Free Access</span>
                </div>
              )}

              <div className="flex items-center justify-between gap-3">
                {/* Left Info Column */}
                <div className="flex flex-col min-w-0">
                  <div className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{ctaTag}</span>
                  </div>
                  <span className="text-xs font-bold text-text-primary font-cinzel truncate mt-0.5">
                    {ctaTitle}
                  </span>
                </div>

                {/* Right CTA Button */}
                <a
                  href={registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 max-w-[210px] py-3.5 px-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#B8860B] text-black font-extrabold text-xs uppercase tracking-wider text-center shadow-[0_0_25px_rgba(212,175,55,0.5)] hover:shadow-[0_0_35px_rgba(212,175,55,0.8)] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-950 fill-emerald-900 shrink-0" />
                  <span className="truncate font-black">{ctaButtonText}</span>
                  <ArrowRight className="w-4 h-4 text-black shrink-0" />
                </a>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

