import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AcademyConfig, ACADEMIES_REGISTRY, DEFAULT_ACADEMY_SLUG, getAllAcademies } from '../config/academies';

interface AcademyContextType {
  activeAcademy: AcademyConfig;
  activeSlug: string;
  allAcademies: AcademyConfig[];
  switchAcademy: (slug: string) => void;
  isNotFound: boolean;
  getAcademyBySlug: (slug: string) => AcademyConfig | undefined;
}

const AcademyContext = createContext<AcademyContextType | undefined>(undefined);

export const AcademyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeSlug, setActiveSlug] = useState<string>(() => {
    return parseAcademySlugFromPath(window.location.pathname);
  });

  function parseAcademySlugFromPath(pathname: string): string {
    if (pathname.startsWith('/academy/')) {
      const parts = pathname.split('/');
      const slug = parts[2]?.toLowerCase().trim();
      if (slug) return slug;
    }
    return DEFAULT_ACADEMY_SLUG;
  }

  // Determine if current slug is in registry
  const academyInRegistry = ACADEMIES_REGISTRY[activeSlug];
  const isNotFound = pathnameIsAcademyRoute(window.location.pathname) && !academyInRegistry;
  
  function pathnameIsAcademyRoute(pathname: string): boolean {
    if (!pathname.startsWith('/academy/')) return false;
    const parts = pathname.split('/').filter(Boolean);
    return parts.length >= 2;
  }

  const activeAcademy: AcademyConfig = academyInRegistry || ACADEMIES_REGISTRY[DEFAULT_ACADEMY_SLUG];

  useEffect(() => {
    const handlePopState = () => {
      const slug = parseAcademySlugFromPath(window.location.pathname);
      setActiveSlug(slug);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const switchAcademy = (slug: string) => {
    const cleanSlug = slug.toLowerCase().trim().replace(/^\/academy\/?/, '');
    setActiveSlug(cleanSlug);
    const newPath = `/academy/${cleanSlug}`;
    if (window.location.pathname !== newPath) {
      window.history.pushState({}, '', newPath);
      window.dispatchEvent(new PopStateEvent('popstate'));
    } else {
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
    window.scrollTo(0, 0);
  };

  const getAcademyBySlug = (slug: string): AcademyConfig | undefined => {
    const cleanSlug = slug.toLowerCase().trim();
    return ACADEMIES_REGISTRY[cleanSlug];
  };

  return (
    <AcademyContext.Provider
      value={{
        activeAcademy,
        activeSlug,
        allAcademies: getAllAcademies(),
        switchAcademy,
        isNotFound,
        getAcademyBySlug,
      }}
    >
      {children}
    </AcademyContext.Provider>
  );
};

export const useAcademy = (): AcademyContextType => {
  const context = useContext(AcademyContext);
  if (!context) {
    throw new Error('useAcademy must be used within an AcademyProvider');
  }
  return context;
};
