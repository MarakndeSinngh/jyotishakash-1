import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BrandRegistry } from "../config/brandRegistry";
import { useLanguage } from "../context/LanguageContext";
import { LanguageSelector } from "./common/LanguageSelector";

interface NavbarProps {
  navigate: (path: string) => void;
  currentPath: string;
}

const Navbar = ({ navigate, currentPath }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  // Load from the centralized Brand Registry
  const brand = BrandRegistry.brand;
  const assets = BrandRegistry.assets;
  const desktopNav = BrandRegistry.navigation.desktop;
  const whatsappContact = BrandRegistry.contacts.find(c => c.id === 'ct_whatsapp');
  const consultLink = whatsappContact ? whatsappContact.url : "https://wa.me/919953713176";

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const getTranslatedNavLabel = (path: string, defaultLabel: string) => {
    if (path === '/') return t('nav.home', defaultLabel);
    if (path === '/about') return t('nav.about', defaultLabel);
    if (path === '/services') return t('nav.services', defaultLabel);
    if (path === '/numerology') return t('nav.numerology', defaultLabel) || defaultLabel;
    if (path === '/gemstones') return t('nav.gemstones', defaultLabel) || defaultLabel;
    if (path === '/calculator') return t('nav.calculator', defaultLabel);
    if (path === '/media') return t('nav.media', defaultLabel);
    if (path === '/shorts') return t('nav.shorts', defaultLabel);
    if (path === '/ai') return t('nav.ai', defaultLabel) || defaultLabel;
    if (path === '/ecosystem') return t('nav.ecosystem', defaultLabel) || defaultLabel;
    if (path === '/contact') return t('nav.contact', defaultLabel);
    return defaultLabel;
  };

  return (
    <nav className="w-full fixed top-0 left-0 z-[9999] bg-white/90 backdrop-blur-md shadow-sm border-b border-primary/15 transition-all duration-300">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
        
        {/* LOGO - Left aligned */}
        <div 
          className="flex items-center gap-2.5 cursor-pointer group shrink-0 lg:w-1/5" 
          onClick={() => handleNavigate("/")}
        >
          <img 
            src={assets.logos.light} 
            alt={brand.name} 
            className="h-10 w-10 rounded-full object-cover border border-primary/30 group-hover:scale-110 transition-transform shadow-sm" 
          />
          <span className="font-bold tracking-widest text-xs sm:text-sm font-cinzel text-gold uppercase whitespace-nowrap">
            {brand.name}
          </span>
        </div>

        {/* DESKTOP NAVIGATION - Perfectly Centered */}
        <div className="hidden lg:flex items-center justify-center flex-1 lg:w-3/5 px-2">
          <ul className="flex items-center justify-center gap-2 xl:gap-5 2xl:gap-7">
            {desktopNav.map((item, index) => {
              const translatedLabel = getTranslatedNavLabel(item.path, item.label);
              const isActive = currentPath === item.path;

              return (
                <li key={index}>
                  <button
                    onClick={() => handleNavigate(item.path)}
                    className={`text-[11px] xl:text-xs uppercase tracking-[0.12em] xl:tracking-[0.18em] font-extrabold transition-all duration-300 hover:text-primary whitespace-nowrap relative py-1.5 px-1 cursor-pointer ${
                      isActive ? 'text-primary' : 'text-zinc-800 hover:text-primary'
                    }`}
                  >
                    <span>{translatedLabel}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-1 right-1 h-[2px] bg-primary rounded-full shadow-[0_0_8px_rgba(212,175,55,0.6)]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* CTA BUTTON & LANGUAGE SELECTOR - Right aligned */}
        <div className="hidden lg:flex items-center justify-end gap-3 xl:gap-4 shrink-0 lg:w-1/5">
          <LanguageSelector />

          <a
            href={consultLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-premium px-5 xl:px-7 py-2.5 text-[10px] xl:text-xs font-extrabold tracking-[0.15em] xl:tracking-[0.2em] shadow-lg hover:scale-105 transition-all cursor-pointer uppercase whitespace-nowrap rounded-xl"
          >
            {t('nav.consultNow', 'CONSULT NOW')}
          </a>
        </div>

        {/* MOBILE & TABLET CONTROLS */}
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSelector isMobile />

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-primary hover:bg-primary/5 rounded-lg transition-all duration-300 cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-primary/10 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-3 text-xs font-bold uppercase tracking-[0.2em]">
              {desktopNav.map((item, index) => {
                const translatedLabel = getTranslatedNavLabel(item.path, item.label);
                const isActive = currentPath === item.path;

                return (
                  <button 
                    key={index}
                    onClick={() => handleNavigate(item.path)} 
                    className={`text-left py-2 px-3 rounded-lg transition-all duration-300 font-extrabold cursor-pointer ${
                      isActive ? 'bg-primary/10 text-primary border-l-2 border-primary' : 'text-zinc-800 hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    {translatedLabel}
                  </button>
                );
              })}

              <a 
                href={consultLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium w-full py-3.5 rounded-xl text-xs font-extrabold tracking-[0.2em] shadow-lg text-center cursor-pointer mt-3 uppercase"
              >
                {t('nav.consultNow', 'CONSULT NOW')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
