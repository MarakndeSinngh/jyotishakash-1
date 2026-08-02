import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Sun, Moon, Check } from 'lucide-react';
import { useTheme, THEME_PRESETS, ThemeType, ModeType } from './ThemeContext';

const ThemeSelector: React.FC = () => {
  const { theme: currentTheme, mode: currentMode, setTheme, setMode, resetTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside the panel
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed bottom-8 left-8 z-[100] flex items-center space-x-4">
      <div className="group relative">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 rounded-full bg-card/90 backdrop-blur-xl border border-primary/20 shadow-xl flex items-center justify-center text-primary transition-all duration-300 hover:border-primary/50 cursor-pointer"
          title="Customize Theme System"
        >
          <Palette className="w-5 h-5" />
        </motion.button>

        {/* Dropdown panel - works with hover on desktop and click toggle on touch screens */}
        <div 
          className={`absolute bottom-full left-0 mb-4 transition-all duration-300 ${
            isOpen 
              ? 'opacity-100 pointer-events-auto translate-y-0' 
              : 'opacity-0 pointer-events-none translate-y-4 md:group-hover:opacity-100 md:group-hover:pointer-events-auto md:group-hover:translate-y-0'
          }`}
        >
          <div className="bg-card/95 backdrop-blur-2xl border border-border/40 rounded-3xl p-5 shadow-2xl min-w-[260px] space-y-5">
            
            {/* Header */}
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-text-primary">
                Branded Palettes
              </h4>
              <p className="text-[9px] text-text-secondary mt-0.5">
                Vedic color frequencies
              </p>
            </div>

            {/* Presets List */}
            <div className="space-y-1.5">
              {THEME_PRESETS.map((preset) => {
                const isSelected = currentTheme === preset.id;
                const isMaharaja = preset.id === 'maharaja-gold';
                return (
                  <button
                    key={preset.id}
                    onClick={() => {
                      setTheme(preset.id);
                      // Don't close on selection so user can see the effect
                    }}
                    className={`w-full flex flex-col p-2.5 rounded-xl transition-all duration-200 cursor-pointer text-left border ${
                      isSelected 
                        ? 'bg-primary/10 border-primary/30 text-primary' 
                        : 'hover:bg-primary/5 border-transparent text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    <div className="w-full flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4.5 h-4.5 rounded-full border border-white/20 shadow-inner shrink-0" 
                          style={{ backgroundColor: preset.color }}
                        />
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[11px] font-semibold tracking-wide">
                            {preset.name}
                          </span>
                          {isMaharaja && (
                            <span className="text-[7.5px] font-black tracking-widest bg-amber-500/20 text-amber-800 dark:text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/30 shrink-0">
                              ⭐ Recommended
                            </span>
                          )}
                        </div>
                      </div>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                      )}
                    </div>
                    {isMaharaja && (
                      <div className="pl-7.5 mt-0.5 text-[8.5px] text-text-secondary font-medium tracking-wide">
                        Luxury Royal Indian Experience
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Divider */}
            <div className="h-[1px] bg-border/20" />

            {/* Mode Switcher */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-text-primary block">
                Vibe Mode
              </span>
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-background/50 rounded-xl border border-border/20">
                <button
                  onClick={() => setMode('light')}
                  className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    currentMode === 'light'
                      ? 'bg-primary text-background shadow-md'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>Light</span>
                </button>
                <button
                  onClick={() => setMode('dark')}
                  className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    currentMode === 'dark'
                      ? 'bg-primary text-background shadow-md'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>Dark</span>
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="h-[1px] bg-border/20" />

            {/* Reset to Default */}
            <button
              onClick={() => resetTheme()}
              className="w-full py-1.5 text-center text-[9px] font-bold tracking-widest uppercase border border-dashed border-border/40 hover:border-primary/50 text-text-secondary hover:text-primary rounded-xl transition-all cursor-pointer"
            >
              Reset to Default
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;
