import React, { useState, useRef } from "react";
import { Menu, X, ChevronDown, ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BrandRegistry } from "../config/brandRegistry";
import { useLanguage } from "../context/LanguageContext";
import { LanguageSelector } from "./common/LanguageSelector";
import { NavDropdownItem, NavItem } from "../config/types";

interface NavbarProps {
  navigate: (path: string) => void;
  currentPath: string;
}

const Navbar = ({ navigate, currentPath }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { t } = useLanguage();

  // Load from the centralized Brand Registry
  const brand = BrandRegistry.brand;
  const assets = BrandRegistry.assets;
  const desktopNav: NavItem[] = BrandRegistry.navigation.desktop;
  const mobileNav: NavItem[] = BrandRegistry.navigation.mobile;
  const whatsappContact = BrandRegistry.contacts.find(c => c.id === 'ct_whatsapp');
  const consultLink = whatsappContact ? whatsappContact.url : "https://wa.me/919953713176";

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const toggleMobileAccordion = (label: string) => {
    setExpandedMobileItem(expandedMobileItem === label ? null : label);
  };

  const getTranslatedNavLabel = (path: string, defaultLabel: string) => {
    if (path === '/') return t('nav.home', defaultLabel);
    if (path === '/about') return t('nav.about', defaultLabel);
    if (path === '/services') return t('nav.services', defaultLabel);
    if (defaultLabel === 'Learn') return t('nav.learn', 'Learn');
    if (defaultLabel === 'Media') return t('nav.media', 'Media');
    if (defaultLabel === 'Ecosystem') return t('nav.ecosystem', 'Ecosystem');
    if (path === '/numerology') return t('nav.numerology', defaultLabel) || defaultLabel;
    if (path === '/gemstones') return t('nav.gemstones', defaultLabel) || defaultLabel;
    if (path === '/ai') return t('nav.ai', defaultLabel) || defaultLabel;
    if (path === '/contact') return t('nav.contact', defaultLabel);
    return defaultLabel;
  };

  return (
    <nav className="w-full fixed top-0 left-0 z-[9999] bg-white/95 backdrop-blur-xl shadow-sm border-b border-primary/15 transition-all duration-300">
      <div className="max-w-[1480px] mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
        
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
          <ul className="flex items-center justify-center gap-1.5 xl:gap-4 2xl:gap-6">
            {desktopNav.map((item, index) => {
              const translatedLabel = getTranslatedNavLabel(item.path, item.label);
              const hasDropdown = Boolean(item.dropdown && item.dropdown.length > 0);
              const isDropdownOpen = activeDropdown === item.label;
              const isActive = currentPath === item.path || (item.dropdown?.some(d => d.path === currentPath));

              return (
                <li 
                  key={index} 
                  className="relative"
                  onMouseEnter={() => hasDropdown && handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    onClick={() => handleNavigate(item.path)}
                    className={`text-[11px] xl:text-xs uppercase tracking-[0.12em] xl:tracking-[0.16em] font-extrabold transition-all duration-200 hover:text-primary whitespace-nowrap relative py-2 px-2 flex items-center gap-1 cursor-pointer ${
                      isActive || isDropdownOpen ? 'text-primary' : 'text-zinc-800 hover:text-primary'
                    }`}
                  >
                    <span>{translatedLabel}</span>
                    {hasDropdown && (
                      <ChevronDown 
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isDropdownOpen ? 'rotate-180 text-primary' : 'text-zinc-400 group-hover:text-primary'
                        }`} 
                      />
                    )}
                    {isActive && !isDropdownOpen && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-2 right-2 h-[2px] bg-primary rounded-full shadow-[0_0_8px_rgba(212,175,55,0.6)]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>

                  {/* PREMIUM DROPDOWN MENU */}
                  <AnimatePresence>
                    {hasDropdown && isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 bg-white border border-primary/20 rounded-2xl p-3 shadow-2xl z-50 text-left space-y-1.5 backdrop-blur-2xl ring-1 ring-black/5"
                      >
                        {/* Header Tag */}
                        <div className="px-3 py-1.5 border-b border-primary/10 flex items-center justify-between text-[10px] font-extrabold uppercase tracking-widest text-primary">
                          <span className="flex items-center gap-1.5">
                            <Sparkles className="w-3 h-3 text-primary animate-pulse" />
                            {translatedLabel} Hub
                          </span>
                          <span className="text-[9px] text-zinc-400 font-sans normal-case">
                            {item.dropdown?.length} Resources
                          </span>
                        </div>

                        {/* Dropdown Items List */}
                        <div className="grid grid-cols-1 gap-1 pt-1 max-h-[380px] overflow-y-auto">
                          {item.dropdown?.map((subItem: NavDropdownItem, subIdx: number) => {
                            const isSubActive = currentPath === subItem.path;

                            return (
                              <button
                                key={subIdx}
                                onClick={() => handleNavigate(subItem.path)}
                                className={`w-full flex items-start justify-between p-2.5 rounded-xl text-left transition-all duration-200 group cursor-pointer ${
                                  isSubActive 
                                    ? 'bg-primary/10 border border-primary/30 text-primary' 
                                    : 'hover:bg-primary/5 hover:border-primary/15 border border-transparent text-zinc-800'
                                }`}
                              >
                                <div className="space-y-0.5 pr-2">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold font-cinzel text-zinc-900 group-hover:text-primary transition-colors">
                                      {subItem.label}
                                    </span>
                                    {subItem.badge && (
                                      <span className="text-[9px] font-bold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 px-1.5 py-0.2 rounded-full">
                                        {subItem.badge}
                                      </span>
                                    )}
                                  </div>
                                  {subItem.description && (
                                    <p className="text-[10px] text-zinc-500 font-sans leading-tight line-clamp-1 group-hover:text-zinc-600">
                                      {subItem.description}
                                    </p>
                                  )}
                                </div>
                                <ArrowRight className="w-3.5 h-3.5 text-primary/40 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 mt-0.5" />
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-primary/10 shadow-2xl overflow-hidden max-h-[85vh] overflow-y-auto"
          >
            <div className="flex flex-col p-5 space-y-2 text-xs font-bold uppercase tracking-[0.2em]">
              {mobileNav.map((item, index) => {
                const translatedLabel = getTranslatedNavLabel(item.path, item.label);
                const hasDropdown = Boolean(item.dropdown && item.dropdown.length > 0);
                const isExpanded = expandedMobileItem === item.label;
                const isActive = currentPath === item.path;

                if (hasDropdown) {
                  return (
                    <div key={index} className="rounded-xl border border-primary/10 overflow-hidden bg-zinc-50/50">
                      <div className="flex items-center justify-between p-3 bg-white">
                        <button 
                          onClick={() => handleNavigate(item.path)}
                          className={`text-left font-extrabold flex-1 hover:text-primary transition-colors ${
                            isActive ? 'text-primary' : 'text-zinc-800'
                          }`}
                        >
                          {translatedLabel}
                        </button>

                        <button
                          onClick={() => toggleMobileAccordion(item.label)}
                          className="p-1 text-primary hover:bg-primary/10 rounded-lg transition-colors cursor-pointer"
                          aria-label={`Expand ${item.label} menu`}
                        >
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>
                      </div>

                      {/* Expanded Submenu */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-primary/5 p-2 space-y-1 border-t border-primary/10"
                          >
                            {item.dropdown?.map((subItem: NavDropdownItem, subIdx: number) => (
                              <button
                                key={subIdx}
                                onClick={() => handleNavigate(subItem.path)}
                                className={`w-full text-left px-3 py-2 rounded-lg text-[11px] font-bold text-zinc-700 hover:text-primary hover:bg-white/80 transition-all flex items-center justify-between cursor-pointer ${
                                  currentPath === subItem.path ? 'bg-white text-primary border border-primary/20 shadow-sm' : ''
                                }`}
                              >
                                <span>• {subItem.label}</span>
                                <ArrowRight className="w-3 h-3 text-primary/40" />
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <button 
                    key={index}
                    onClick={() => handleNavigate(item.path)} 
                    className={`text-left py-2.5 px-3 rounded-xl transition-all duration-300 font-extrabold cursor-pointer ${
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
                className="btn-premium w-full py-3.5 rounded-xl text-xs font-extrabold tracking-[0.2em] shadow-lg text-center cursor-pointer mt-3 uppercase block"
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
