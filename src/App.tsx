import React, { useState, useEffect } from 'react';
import { Page, Section, Service, Testimonial } from './types/cms';
import { cmsService } from './services/cmsService';
import { websiteSettingsService } from './services/websiteSettingsService';
import { WebsiteSettings } from './models/websiteSettings';
import HeroSection from './components/sections/HeroSection';
import TrustCredibilitySection from './components/sections/TrustCredibilitySection';
import ServicesSection from './components/sections/ServicesSection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import MeetOurMentorsSection from './components/sections/MeetOurMentorsSection';
import FeaturedCoursesHomepage from './components/sections/FeaturedCoursesHomepage';
import HomepageMediaAndWebinarSection from './components/sections/HomepageMediaAndWebinarSection';
import DynamicTestimonialsHomepage from './components/sections/DynamicTestimonialsHomepage';
import SuccessMetricsSection from './components/sections/SuccessMetricsSection';
import HomepageCTASection from './components/sections/HomepageCTASection';
import AboutSection from './components/sections/AboutSection';
import EcosystemSection from './components/sections/EcosystemSection';
import GemstonesPage from './components/sections/GemstonesPage';
import NumerologyCalculator from './components/sections/NumerologyCalculator';
import ContactSection from './components/sections/ContactSection';
import CustomSection from './components/sections/CustomSection';
import AcademySection from './components/sections/AcademySection';
import AISpiritualSection from './components/sections/AISpiritualSection';
import MediaCenterPage from './components/sections/MediaCenterPage';
import ShortsPage from './components/sections/ShortsPage';
import AcademyLandingPage from './components/sections/AcademyLandingPage';
import ProgramsPage from './components/sections/ProgramsPage';
import BlogsPage from './components/sections/BlogsPage';
import AdminPortal from './components/admin/AdminPortal';
import ErrorBoundary from './components/ErrorBoundary';
import ThemeSelector from './components/ThemeSelector';
import { MediaPlayer } from './media/MediaPlayer';
import { useTheme } from './components/ThemeContext';
import SmartImage from './components/sections/SmartImage';
import { AnimatePresence, motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Navbar from "./components/Navbar";
import StickyFloatingCTA from "./components/StickyFloatingCTA";
import { THEME_COLORS } from './utils/themeColors';
import { Sparkles } from 'lucide-react';
import { getActiveBrand } from './config/cms';
import { useAcademy } from './context/AcademyContext';
import { useLanguage } from './context/LanguageContext';
import { getSeoMetadata } from './config/seo';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [page, setPage] = useState<Page | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme, mode } = useTheme();
  const currentColors = THEME_COLORS[theme][mode];
  const [brand, setBrand] = useState(getActiveBrand());
  const [settings, setSettings] = useState<WebsiteSettings | null>(null);
  const { activeAcademy } = useAcademy();
  const { t, setLanguage } = useLanguage();

  useEffect(() => {
    websiteSettingsService.getSettings().then(setSettings).catch(console.error);
  }, []);

  const appBrandName = settings?.websiteName || brand.name;

  // Keep brand configuration synchronized in real-time on path navigation
  useEffect(() => {
    setBrand(getActiveBrand());
    if (currentPath === '/') {
      setLanguage('en');
    }
  }, [currentPath]);

  // Centralized SEO Resolution
  const seo = getSeoMetadata({
    pathname: currentPath,
    slug: activeAcademy?.slug,
    instructorName: activeAcademy?.instructorName,
    customTitle: page?.title,
  });

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    loadContent();
    const timeout = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timeout);
  }, [currentPath]);

  const loadContent = async () => {
    setLoading(true);
    try {
      if (currentPath === '/media' || currentPath === '/shorts' || currentPath.startsWith('/academy/')) {
        setPage(null);
        setSections([]);
        setLoading(false);
        return;
      }
      const isAcademyRoute = currentPath.startsWith('/academy');
      const slug = currentPath === '/' ? 'home' : isAcademyRoute ? 'academy' : currentPath.replace('/', '');
      const pages = await cmsService.getPages();
      let currentPage = pages.find(p => p.slug === slug && p.isPublished);
      if (!currentPage && isAcademyRoute) {
        currentPage = pages.find(p => p.slug === 'academy');
      }

      if (currentPage) {
        setPage(currentPage);
        const [secData, servData, testData] = await Promise.all([
          cmsService.getSections(currentPage.slug),
          cmsService.getServices(),
          cmsService.getTestimonials()
        ]);
        setSections(secData);
        setServices(servData);
        setTestimonials(testData);
      } else if (isAcademyRoute) {
        setSections([{
          id: 'sec_academy_fallback',
          pageId: 'page_academy',
          type: 'academy',
          title: 'Academy',
          order: 1,
          isActive: true,
          content: ''
        }]);
      }
    } catch (error) {
      console.error('Failed to load content:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    const isMaharaja = theme === 'maharaja-gold' && mode === 'dark';
    return (
      <div 
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{
          backgroundColor: isMaharaja ? '#1C0F02' : 'var(--background)',
        }}
      >
        {/* Background Image during loading for seamless transition */}
        {!isMaharaja && (
          <div className="absolute inset-0 z-0 opacity-30">
            <SmartImage
              src="/gemstone-assets/background.png"
              alt="Loading Background"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        {isMaharaja ? (
          <div className="relative z-10 flex flex-col items-center gap-6">
            <div className="relative w-20 h-20 flex items-center justify-center">
              {/* Pulsing golden rings */}
              <motion.div 
                className="absolute inset-0 rounded-full border-2 border-[#A86E25]/30"
                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute inset-2 rounded-full border-2 border-[#C29B47]/50"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              />
              {/* Shimmering Center Logo */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#A86E25] to-[#E9C269] flex items-center justify-center shadow-lg relative overflow-hidden">
                <Sparkles className="w-6 h-6 text-[#1C0F02]" />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full"
                  animate={{ x: ['100%', '-100%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </div>
            
            <div className="text-center space-y-1">
              <h2 className="font-cinzel text-base font-bold tracking-[0.25em] text-[#E9C269]">
                MAHARAJA GOLD
              </h2>
              <p className="text-[10px] font-mono tracking-[0.3em] text-[#D4C4B7] uppercase animate-pulse">
                Aligning Planetary Frequencies...
              </p>
            </div>
          </div>
        ) : (
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="text-[10px] font-bold tracking-[0.3em] text-primary uppercase animate-pulse">
              Loading {brand.name}...
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <ErrorBoundary>
      {currentPath.startsWith('/admin') ? (
        <AdminPortal navigate={navigate} currentPath={currentPath} />
      ) : (
        <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content="LEO Family, Numerology, Vedic Astrology, Vastu, Gemstones, Name Science, AI Spiritual Intelligence, Raajeev Singh Chauhann, Shaunak S. Patthak, Sannjoy Biswass" />
        <meta property="og:title" content={seo.ogTitle} />
        <meta property="og:description" content={seo.ogDescription} />
        <meta property="og:image" content={seo.ogImage} />
        <meta property="og:site_name" content={seo.siteName} />
        <meta property="twitter:title" content={seo.twitterTitle} />
        <meta property="twitter:description" content={seo.twitterDescription} />
        <meta property="twitter:image" content={seo.twitterImage} />
        <link rel="icon" type="image/jpeg" href={seo.favicon} />
        <link rel="canonical" href={seo.canonical} />
      </Helmet>
      <motion.div 
        className="min-h-screen relative font-sans text-text-primary"
        style={{
          "--primary": currentColors.primary,
          "--secondary": currentColors.secondary,
          "--accent": currentColors.accent,
          "--background": currentColors.background,
          "--surface": currentColors.surface,
          "--card": currentColors.card,
          "--text-primary": currentColors.textPrimary,
          "--text-secondary": currentColors.textSecondary,
          "--border": currentColors.border,
          "--primary-rgb": currentColors.primaryRgb,
        } as any}
        animate={{
          "--primary": currentColors.primary,
          "--secondary": currentColors.secondary,
          "--accent": currentColors.accent,
          "--background": currentColors.background,
          "--surface": currentColors.surface,
          "--card": currentColors.card,
          "--text-primary": currentColors.textPrimary,
          "--text-secondary": currentColors.textSecondary,
          "--border": currentColors.border,
          "--primary-rgb": currentColors.primaryRgb,
        } as any}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >

        {/* ✅ STATIC BACKGROUND FIX */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          {theme === 'maharaja-gold' && mode === 'dark' ? (
            <div className="absolute inset-0 bg-gradient-to-br from-[#1C0F02] via-[#2B1704] to-[#3B2207]" />
          ) : (
            <SmartImage
              src="/gemstone-assets/background.png"
              alt="Background"
              className="w-full h-full object-cover"
            />
          )}
          {/* Subtle overlay to ensure text readability across all themes */}
          <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-background/60" />

          {/* Cinematic Effects */}
          <div className="absolute inset-0 pointer-events-none">
            {theme === 'maharaja-gold' && mode === 'dark' ? (
              <>
                {/* Maharaja Gold Soft Radial Center Glows */}
                <motion.div 
                  className="absolute top-[15%] left-[25%] w-[50%] h-[50%] rounded-full bg-[#7C5110]/25 blur-[120px]"
                  animate={{
                    x: [0, 15, -10, 0],
                    y: [0, -20, 15, 0],
                    scale: [1, 1.05, 0.95, 1],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div 
                  className="absolute bottom-[20%] right-[15%] w-[40%] h-[40%] rounded-full bg-[#A86E25]/10 blur-[100px]"
                  animate={{
                    x: [0, -10, 15, 0],
                    y: [0, 15, -10, 0],
                    scale: [1, 0.95, 1.05, 1],
                  }}
                  transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </>
            ) : (
              <>
                <div className="floating-glow top-[10%] left-[20%] w-[40%] h-[40%] bg-primary/10" />
                <div className="floating-glow bottom-[20%] right-[10%] w-[30%] h-[30%] bg-secondary/10" />
              </>
            )}
            
            {/* Dust Particles / Floating Bronze Particles */}
            {[...Array(15)].map((_, i) => (
              <div 
                key={i} 
                className="dust-particle" 
                style={{ 
                  left: `${Math.random() * 100}%`, 
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 15}s`,
                  opacity: theme === 'maharaja-gold' ? 0.25 : (0.1 + Math.random() * 0.3),
                  backgroundColor: theme === 'maharaja-gold' ? '#C29B47' : undefined,
                  boxShadow: theme === 'maharaja-gold' ? '0 0 6px rgba(194,155,71,0.4)' : undefined,
                }} 
              />
            ))}
          </div>
        </div>

        {/* NAVBAR */}
        <Navbar navigate={navigate} currentPath={currentPath} />

        {/* STICKY FLOATING CTA BAR (For Shaunak, Raajeev, Sannjoy Academy Programs) */}
        <StickyFloatingCTA currentPath={currentPath} />

        {/* MAIN CONTENT */}
        <main className={`relative z-10 ${
          currentPath === '/' || currentPath === '/gemstones' || currentPath === '/numerology' || currentPath === '/academy' || currentPath.startsWith('/academy/') || currentPath.startsWith('/programs') || currentPath === '/blogs' || currentPath === '/ai' || currentPath === '/ecosystem' || currentPath === '/contact' || currentPath === '/media' || currentPath === '/shorts'
            ? 'pt-0'
            : 'pt-24'
        }`}>
          <AnimatePresence mode="wait">
            {currentPath === '/media' ? (
              <MediaCenterPage key="media-center" />
            ) : currentPath === '/shorts' ? (
              <ShortsPage key="shorts-page" navigate={navigate} />
            ) : currentPath.startsWith('/programs') ? (
              <ProgramsPage key="programs-page" navigate={navigate} />
            ) : currentPath === '/blogs' ? (
              <BlogsPage key="blogs-page" navigate={navigate} />
            ) : currentPath.startsWith('/academy/') ? (
              <AcademyLandingPage key="academy-landing" navigate={navigate} />
            ) : (
              sections
                .filter(s => s.isActive)
                .sort((a, b) => a.order - b.order)
                .map((section, idx) => {
                  switch (section.type) {
                    case 'hero':
                      return (
                        <React.Fragment key={idx}>
                          <HeroSection section={section} />
                          <TrustCredibilitySection />
                          {currentPath === '/' && (
                            <>
                              <MeetOurMentorsSection />
                              <FeaturedCoursesHomepage />
                              <HomepageMediaAndWebinarSection />
                            </>
                          )}
                        </React.Fragment>
                      );
                    case 'services':
                      return <ServicesSection key={idx} section={section} services={services} />;
                    case 'testimonials':
                      return (
                        <React.Fragment key={idx}>
                          {currentPath === '/' ? (
                            <>
                              <DynamicTestimonialsHomepage testimonials={testimonials} />
                              <SuccessMetricsSection />
                              <HomepageCTASection />
                            </>
                          ) : (
                            <TestimonialsSection section={section} testimonials={testimonials} />
                          )}
                        </React.Fragment>
                      );
                    case 'about':
                      return <AboutSection key={idx} section={section} />;
                    case 'ecosystem':
                      return <EcosystemSection key={idx} />;
                    case 'gemstones':
                      return <GemstonesPage key={idx} />;
                    case 'numerology':
                      return <NumerologyCalculator key={idx} />;
                    case 'academy':
                      return <AcademySection key={idx} />;
                    case 'ai':
                      return <AISpiritualSection key={idx} />;
                    case 'contact':
                      return <ContactSection key={idx} />;
                    case 'custom':
                      return <CustomSection key={idx} section={section} />;
                    default:
                      return null;
                  }
                })
            )}
          </AnimatePresence>
        </main>

        <MediaPlayer />
        <ThemeSelector />

        {/* FOOTER */}
        <footer className="bg-card/85 backdrop-blur-md py-16 text-center text-sm text-text-secondary border-t border-border/40 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center gap-2">
                <img src={settings?.logoUrl || "/gemstone-assets/logo.jpg"} alt={appBrandName} className="h-8 w-8 rounded-full object-cover grayscale opacity-50" />
                <span className="font-semibold tracking-[0.3em] text-[10px] font-cinzel text-text-secondary uppercase">
                  {appBrandName}
                </span>
              </div>
              <p className="text-[10px] tracking-widest uppercase opacity-60 text-text-secondary">
                {settings?.footerCopyright || `© ${new Date().getFullYear()} ${appBrandName}. All rights reserved.`}
              </p>
            </div>
          </div>
        </footer>

      </motion.div>
        </>
      )}
    </ErrorBoundary>
  );
}