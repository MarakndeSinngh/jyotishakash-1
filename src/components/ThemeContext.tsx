import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeType = 'leo-gold' | 'cosmic-purple' | 'emerald-wisdom' | 'royal-blue' | 'light-luxury' | 'maharaja-gold';
export type ModeType = 'light' | 'dark';

export interface ThemePreset {
  id: ThemeType;
  name: string;
  color: string; // Theme representative color
}

export const THEME_PRESETS: ThemePreset[] = [
  { id: 'maharaja-gold', name: '👑 Maharaja Gold', color: '#A86E25' },
  { id: 'leo-gold', name: 'Leo Gold', color: '#D4AF37' },
  { id: 'cosmic-purple', name: 'Cosmic Purple', color: '#8B5CF6' },
  { id: 'emerald-wisdom', name: 'Emerald Wisdom', color: '#10B981' },
  { id: 'royal-blue', name: 'Royal Blue', color: '#3B82F6' },
  { id: 'light-luxury', name: 'Light Luxury', color: '#C5A880' },
];

interface ThemeContextType {
  theme: ThemeType;
  mode: ModeType;
  setTheme: (theme: ThemeType) => void;
  setMode: (mode: ModeType) => void;
  resetTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Validate and read initial states synchronously from localStorage to prevent flash
  const [theme, setThemeState] = useState<ThemeType>(() => {
    try {
      const saved = localStorage.getItem('leo-family-theme');
      const validThemes: ThemeType[] = ['leo-gold', 'cosmic-purple', 'emerald-wisdom', 'royal-blue', 'light-luxury', 'maharaja-gold'];
      return (saved && validThemes.includes(saved as ThemeType)) ? (saved as ThemeType) : 'maharaja-gold';
    } catch {
      return 'maharaja-gold';
    }
  });

  const [mode, setModeState] = useState<ModeType>(() => {
    try {
      const saved = localStorage.getItem('leo-family-mode');
      const validModes: ModeType[] = ['light', 'dark'];
      return (saved && validModes.includes(saved as ModeType)) ? (saved as ModeType) : 'light';
    } catch {
      return 'light';
    }
  });

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('leo-family-theme', newTheme);
      // Dispatch custom storage event for local iframe/tab sync in same window
      window.dispatchEvent(new Event('local-storage-update'));
    } catch (e) {
      console.warn('Storage quota exceeded or disabled', e);
    }
  };

  const setMode = (newMode: ModeType) => {
    setModeState(newMode);
    try {
      localStorage.setItem('leo-family-mode', newMode);
      // Dispatch custom storage event for local iframe/tab sync in same window
      window.dispatchEvent(new Event('local-storage-update'));
    } catch (e) {
      console.warn('Storage quota exceeded or disabled', e);
    }
  };

  const resetTheme = () => {
    setThemeState('maharaja-gold');
    setModeState('light');
    try {
      localStorage.setItem('leo-family-theme', 'maharaja-gold');
      localStorage.setItem('leo-family-mode', 'light');
      window.dispatchEvent(new Event('local-storage-update'));
    } catch (e) {
      console.warn('Storage quota exceeded or disabled', e);
    }
  };

  // 1. Listen for cross-tab and cross-iframe localStorage changes
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      const validThemes: ThemeType[] = ['leo-gold', 'cosmic-purple', 'emerald-wisdom', 'royal-blue', 'light-luxury', 'maharaja-gold'];
      const validModes: ModeType[] = ['light', 'dark'];

      if (e.key === 'leo-family-theme' && e.newValue) {
        if (validThemes.includes(e.newValue as ThemeType)) {
          setThemeState(e.newValue as ThemeType);
        }
      }
      if (e.key === 'leo-family-mode' && e.newValue) {
        if (validModes.includes(e.newValue as ModeType)) {
          setModeState(e.newValue as ModeType);
        }
      }
    };

    // 2. Also listen for custom events within the same page/window if inside sub-iframes or route changes
    const handleLocalUpdate = () => {
      const savedTheme = localStorage.getItem('leo-family-theme') as ThemeType;
      const savedMode = localStorage.getItem('leo-family-mode') as ModeType;
      const validThemes: ThemeType[] = ['leo-gold', 'cosmic-purple', 'emerald-wisdom', 'royal-blue', 'light-luxury', 'maharaja-gold'];
      const validModes: ModeType[] = ['light', 'dark'];

      if (savedTheme && validThemes.includes(savedTheme) && savedTheme !== theme) {
        setThemeState(savedTheme);
      }
      if (savedMode && validModes.includes(savedMode) && savedMode !== mode) {
        setModeState(savedMode);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('local-storage-update', handleLocalUpdate);
    window.addEventListener('popstate', handleLocalUpdate); // sync on route navigation events

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('local-storage-update', handleLocalUpdate);
      window.removeEventListener('popstate', handleLocalUpdate);
    };
  }, [theme, mode]);

  // 3. Keep root/body class lists strictly locked to the state with MutationObserver
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    const expectedThemeClass = `theme-${theme}`;
    const expectedModeClass = mode;

    const classesToRemove = [
      'theme-leo-gold',
      'theme-cosmic-purple',
      'theme-emerald-wisdom',
      'theme-royal-blue',
      'theme-light-luxury',
      'theme-maharaja-gold',
      'dark',
      'light',
    ].filter(cls => cls !== expectedThemeClass && cls !== expectedModeClass);

    const applyClasses = () => {
      classesToRemove.forEach(cls => {
        if (root.classList.contains(cls)) root.classList.remove(cls);
        if (body.classList.contains(cls)) body.classList.remove(cls);
      });

      if (!root.classList.contains(expectedThemeClass)) root.classList.add(expectedThemeClass);
      if (!root.classList.contains(expectedModeClass)) root.classList.add(expectedModeClass);
      if (!body.classList.contains(expectedThemeClass)) body.classList.add(expectedThemeClass);
      if (!body.classList.contains(expectedModeClass)) body.classList.add(expectedModeClass);
    };

    applyClasses();

    // Set up MutationObserver to guard against other components/libraries modifying/resetting classes
    const observer = new MutationObserver(() => {
      applyClasses();
    });

    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    observer.observe(body, { attributes: true, attributeFilter: ['class'] });

    return () => {
      observer.disconnect();
    };
  }, [theme, mode]);

  return (
    <ThemeContext.Provider value={{ theme, mode, setTheme, setMode, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
