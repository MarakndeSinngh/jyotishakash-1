import React, { useState } from "react";
import { Menu, X, ChevronDown, GraduationCap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BrandRegistry } from "../config/brandRegistry";
import { getAllAcademies } from "../config/academies";
import { useLanguage } from "../context/LanguageContext";
import { LanguageSelector } from "./common/LanguageSelector";

interface NavbarProps {
  navigate: (path: string) => void;
  currentPath: string;
}

const Navbar = ({ navigate, currentPath }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAcademyDropdownOpen, setIsAcademyDropdownOpen] = useState(false);
  const { t } = useLanguage();

  // Load from the centralized Brand Registry and Multi-Academy Engine
  const brand = BrandRegistry.brand;
  const assets = BrandRegistry.assets;
  const desktopNav = BrandRegistry.navigation.desktop;
  const whatsappContact = BrandRegistry.contacts.find(c => c.id === 'ct_whatsapp');
  const consultLink = whatsappContact ? whatsappContact.url : "https://wa.me/919953713176";
  const academies = getAllAcademies();

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    setIsAcademyDropdownOpen(false);
  };

  const getTranslatedNavLabel = (path: string, defaultLabel: string) => {
    if (path === '/') return t('nav.home', defaultLabel);
    if (path === '/about') return t('nav.about', defaultLabel);
    if (path === '/services') return t('nav.services', defaultLabel);
    if (path === '/academy') return t('nav.academy', defaultLabel);
    if (path === '/calculator') return t('nav.calculator', defaultLabel);
    if (path === '/media') return t('nav.media', defaultLabel);
    if (path === '/shorts') return t('nav.shorts', defaultLabel);
    if (path === '/contact') return t('nav.contact', defaultLabel);
    return defaultLabel;
  };

  return (
    <nav className="w-full fixed top-0 left-0 z-[9999] bg-white/85 backdrop-blur-md shadow-sm border-b border-primary/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        
        {/* LOGO */}
        <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => handleNavigate("/")}>
          <img 
            src={assets.logos.light} 
            alt={brand.name} 
            className="h-10 w-10 rounded-full object-cover border border-primary/30 group-hover:scale-110 transition-transform" 
          />
          <span className="font-semibold tracking-widest text-sm font-cinzel text-gold uppercase">
            {brand.name}
          </span>
        </div>

        {/* NAV ITEMS - Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {desktopNav.map((item, index) => {
            const isAcademy = item.path === '/academy';
            const translatedLabel = getTranslatedNavLabel(item.path, item.label);
            
            if (isAcademy) {
              return (
                <li key={index} className="relative" onMouseLeave={() => setIsAcademyDropdownOpen(false)}>
                  <button
                    onClick={() => handleNavigate('/academy')}
                    onMouseEnter={() => setIsAcademyDropdownOpen(true)}
                    className={`text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 hover:text-primary flex items-center gap-1.5 ${
                      currentPath.startsWith('/academy') ? 'text-primary' : 'text-zinc-800'
                    }`}
                  >
                    <span>{translatedLabel}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isAcademyDropdownOpen ? 'rotate-180 text-primary' : ''}`} />
                  </button>

                  {/* Academy Selector Dropdown */}
                  <AnimatePresence>
                    {isAcademyDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-72 bg-white border border-primary/20 rounded-2xl p-2.5 shadow-2xl z-50 text-left space-y-1 backdrop-blur-xl"
                      >
                        <div className="px-3 py-1.5 border-b border-zinc-100 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary">
                          <GraduationCap className="w-3.5 h-3.5" />
                          <span>{t('nav.selectAcademy', 'Select Instructor Academy')}</span>
                        </div>
                        
                        {academies.map((ac) => (
                          <button
                            key={ac.id}
                            onClick={() => handleNavigate(`/academy/${ac.slug}`)}
                            className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left hover:bg-primary/5 transition-colors cursor-pointer ${
                              currentPath === `/academy/${ac.slug}` ? 'bg-primary/10 border border-primary/20' : ''
                            }`}
                          >
                            <img src={ac.assets.profileImage} alt={ac.instructorName} className="w-8 h-8 rounded-full object-cover border border-primary/30" />
                            <div>
                              <span className="text-xs font-bold font-cinzel text-zinc-900 block leading-tight">{ac.shortName}</span>
                              <span className="text-[9px] text-zinc-500 block truncate font-sans">{ac.instructorTitle}</span>
                            </div>
                          </button>
                        ))}

                        <button
                          onClick={() => handleNavigate('/academy')}
                          className="w-full text-center py-2 text-[10px] uppercase font-extrabold tracking-widest text-primary hover:bg-primary/5 rounded-lg transition-colors mt-1 block"
                        >
                          {t('nav.viewAllAcademies', 'View All Academies →')}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            }

            return (
              <li key={index}>
                <button
                  onClick={() => handleNavigate(item.path)}
                  className={`text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 hover:text-primary ${
                    currentPath === item.path ? 'text-primary' : 'text-zinc-800'
                  }`}
                >
                  {translatedLabel}
                </button>
              </li>
            );
          })}
        </ul>

        {/* CTA BUTTON & LANGUAGE SELECTOR - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageSelector />

          <a
            href={consultLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-premium px-8 py-3 text-xs tracking-[0.2em] shadow-lg hover:scale-105 transition-all cursor-pointer uppercase"
          >
            {t('nav.consultNow', 'CONSULT NOW')}
          </a>
        </div>

        {/* MOBILE CONTROLS */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSelector isMobile />

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-primary hover:bg-primary/5 rounded-lg transition-all duration-500 cursor-pointer"
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
            className="md:hidden bg-white border-t border-primary/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4 text-xs font-bold uppercase tracking-[0.2em]">
              {desktopNav.map((item, index) => {
                const translatedLabel = getTranslatedNavLabel(item.path, item.label);

                if (item.path === '/academy') {
                  return (
                    <div key={index} className="space-y-2 py-1">
                      <button 
                        onClick={() => handleNavigate('/academy')}
                        className={`text-left font-extrabold flex items-center justify-between w-full ${currentPath.startsWith('/academy') ? 'text-primary' : 'text-zinc-800'}`}
                      >
                        <span>{translatedLabel}</span>
                      </button>
                      
                      <div className="pl-4 space-y-2 border-l-2 border-primary/20">
                        {academies.map((ac) => (
                          <button
                            key={ac.id}
                            onClick={() => handleNavigate(`/academy/${ac.slug}`)}
                            className="block text-left text-[11px] text-zinc-600 hover:text-primary py-1 font-semibold"
                          >
                            • {ac.shortName}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <button 
                    key={index}
                    onClick={() => handleNavigate(item.path)} 
                    className={`text-left py-2 transition-all duration-300 ${currentPath === item.path ? 'text-primary' : 'text-zinc-800'}`}
                  >
                    {translatedLabel}
                  </button>
                );
              })}

              <a 
                href={consultLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium w-full py-4 rounded-full text-xs font-bold tracking-[0.2em] shadow-lg text-center cursor-pointer mt-2 uppercase"
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
