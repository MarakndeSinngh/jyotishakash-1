import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { SupportedLanguage } from '../../i18n/translations';

export const LanguageSelector: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => {
  const { language, setLanguage, currentLanguageConfig, supportedLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: SupportedLanguage) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md transition-all duration-300 border border-amber-500/30 hover:border-amber-400/70 bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-amber-600/10 hover:from-amber-500/20 hover:to-amber-600/20 shadow-sm hover:shadow-amber-500/20 ${
          isMobile ? 'text-xs w-full justify-between' : 'text-xs'
        }`}
        aria-label="Select Interface Language"
      >
        <div className="flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-amber-500 group-hover:rotate-45 transition-transform duration-500" />
          <span className="text-sm leading-none mr-0.5">{currentLanguageConfig.flag}</span>
          <span className="font-semibold text-[11px] uppercase tracking-wider text-amber-900 dark:text-amber-100 group-hover:text-amber-600 transition-colors">
            {currentLanguageConfig.shortCode}
          </span>
          <span className="hidden sm:inline font-medium text-xs text-zinc-700 dark:text-zinc-300">
            {currentLanguageConfig.nativeName}
          </span>
        </div>

        <ChevronDown
          className={`w-3.5 h-3.5 text-amber-500/80 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-amber-500' : ''
          }`}
        />

        {/* Subtle glowing ring effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400/20 to-amber-600/20 rounded-full blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`absolute z-[10000] mt-2 w-52 rounded-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-amber-500/30 shadow-2xl p-1.5 ${
              isMobile ? 'left-0' : 'right-0'
            }`}
          >
            {/* Header label */}
            <div className="px-3 py-1.5 border-b border-zinc-100 dark:border-zinc-800/80 mb-1 flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                Interface Language
              </span>
              <span className="text-[9px] text-zinc-400 font-mono">UI Text</span>
            </div>

            {/* Language Options */}
            <div className="space-y-0.5">
              {supportedLanguages.map((lang) => {
                const isSelected = language === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => handleSelect(lang.code)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-medium transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300 font-bold border border-amber-500/30'
                        : 'text-zinc-700 dark:text-zinc-300 hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base leading-none">{lang.flag}</span>
                      <div className="flex flex-col">
                        <span className="font-semibold text-xs leading-tight">{lang.nativeName}</span>
                        <span className="text-[10px] text-zinc-400 font-sans">{lang.name}</span>
                      </div>
                    </div>

                    {isSelected && <Check className="w-4 h-4 text-amber-500 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
