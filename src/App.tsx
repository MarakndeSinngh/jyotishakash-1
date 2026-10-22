import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { cmsService } from './services/cmsService';
import { websiteSettingsService } from './services/websiteSettingsService';
import { Page, Section, Service, Testimonial } from './types/cms';
import { WebsiteSettings } from './models/websiteSettings';
import { getSeoMetadata } from './config/seo';
import { BrandRegistry } from './config/brandRegistry';
import { useAcademy } from './context/AcademyContext';
import { useLanguage } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';

// Core Layout Components (Needed Immediately on Initial Load)
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import ThemeSelector from './components/ThemeSelector';

// Homepage Primary Sections
import HeroSection from './components/sections/HeroSection';
import NavratriCoursePromotionBanner from './components/sections/NavratriCoursePromotionBanner';
import TrustCredibilitySection from './components/sections/TrustCredibilitySection';
import SuccessMetricsSection from './components/sections/SuccessMetricsSection';
import MeetOurMentorsSection from './components/sections/MeetOurMentorsSection';
import FeaturedCoursesHomepage from './components/sections/FeaturedCoursesHomepage';
import AcademyComparisonMatrix from './components/sections/AcademyComparisonMatrix';
import HomepageMediaAndWebinarSection from './components/sections/HomepageMediaAndWebinarSection';
import DynamicTestimonialsHomepage from './components/sections/DynamicTestimonialsHomepage';
import HomepageCTASection from './components/sections/HomepageCTASection';
import ServicesSection from './components/sections/ServicesSection';
import TestimonialsSection from './components/sections/TestimonialsSection';

// Lazy-loaded Route Pages & Non-Homepage Sections (Split into on-demand chunks)
const AdminPortal = React.lazy(() => import('./components/admin/AdminPortal'));
const AcademyLandingPage = React.lazy(() => import('./components/sections/AcademyLandingPage'));
const AdvancedNumerologyLandingPage = React.lazy(
  () => import('./components/sections/AdvancedNumerologyLandingPage')
);
const ProgramsPage = React.lazy(() => import('./components/sections/ProgramsPage'));
const BlogsPage = React.lazy(() => import('./components/sections/BlogsPage'));
const MediaCenterPage = React.lazy(() => import('./components/sections/MediaCenterPage'));
const MeditationPage = React.lazy(() => import('./components/sections/MeditationPage'));
const ShortsPage = React.lazy(() => import('./components/sections/ShortsPage'));
const GemstonesPage = React.lazy(() => import('./components/sections/GemstonesPage'));
const AboutSection = React.lazy(() => import('./components/sections/AboutSection'));
const NumerologyCalculator = React.lazy(() => import('./components/sections/NumerologyCalculator'));
const AcademySection = React.lazy(() => import('./components/sections/AcademySection'));
const AISpiritualSection = React.lazy(() => import('./components/sections/AISpiritualSection'));
const EcosystemSection = React.lazy(() => import('./components/sections/EcosystemSection'));
const ContactSection = React.lazy(() => import('./components/sections/ContactSection'));
const CustomSection = React.lazy(() => import('./components/sections/CustomSection'));

// Lazy-loaded Optional Overlays & Drawers
const CartDrawer = React.lazy(() => import('./components/cart/CartDrawer'));
const FloatingConsultationCard = React.lazy(() => import('./components/FloatingConsultationCard'));
const StickyFloatingCTA = React.lazy(() => import('./components/StickyFloatingCTA'));

const STANDALONE_NON_CMS_ROUTES = new Set([
  '/courses/advanced-numerology-bundle',
  '/programs',
  '/blogs',
  '/media',
  '/shorts',
  '/meditation',
]);

function normalizePathname(rawPath: string): string {
  const pathOnly = (rawPath || '/').split('?')[0].split('#')[0] || '/';
  return pathOnly.length > 1 && pathOnly.endsWith('/') ? pathOnly.slice(0, -1) : pathOnly;
}

function isStandaloneNonCmsRoute(normalizedPath: string): boolean {
  if (STANDALONE_NON_CMS_ROUTES.has(normalizedPath)) return true;
  if (normalizedPath === '/admin' || normalizedPath.startsWith('/admin/')) return true;
  if (normalizedPath === '/gemstones' || normalizedPath.startsWith('/gemstones/')) return true;
  if (normalizedPath.startsWith('/academy/') && normalizedPath.split('/').filter(Boolean).length >= 2) {
    return true;
  }
  return false;
}

function BrandedRouteLoadingFallback({ label = 'Loading Experience...' }: { label?: string }) {
  return (
    <div className="min-h-screen bg-leo-ivory text-leo-text-primary pt-28 pb-24 flex flex-col items-center justify-center gap-4 px-4">
      <div className="w-10 h-10 border-4 border-leo-emerald border-t-leo-gold rounded-full animate-spin" />
      <div className="text-center space-y-1">
        <p className="font-cinzel font-bold text-sm uppercase tracking-[0.2em] text-leo-emerald">
          LEO Family Occult School
        </p>
        <p className="text-xs text-leo-text-secondary font-sans">
          {label}
        </p>
      </div>
    </div>
  );
}

function AppContent() {
  const [currentPath, setCurrentPath] = useState<string>(() => normalizePathname(window.location.pathname || '/'));
  const [pages, setPages] = useState<Page[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [settings, setSettings] = useState<WebsiteSettings | null>(null);
  const [loading, setLoading] = useState<boolean>(() => !isStandaloneNonCmsRoute(normalizePathname(window.location.pathname || '/')));

  const { activeAcademy, activeSlug } = useAcademy();
  const { t } = useLanguage();

  const normalizedPath = normalizePathname(currentPath);

  const navigate = useCallback((path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(normalizePathname(path));
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePathname(window.location.pathname || '/'));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    let isCancelled = false;
    websiteSettingsService
      .getSettings()
      .then((data) => {
        if (!isCancelled) setSettings(data);
      })
      .catch(console.error);
    return () => {
      isCancelled = true;
    };
  }, []);

  // Load CMS data only for routes that consume generic CMS page sections/services/testimonials
  useEffect(() => {
    let isCancelled = false;

    if (isStandaloneNonCmsRoute(normalizedPath)) {
      setLoading(false);
      return () => {
        isCancelled = true;
      };
    }

    async function loadCmsContent() {
      setLoading(true);
      try {
        const cleanSlug = normalizedPath === '/' ? 'home' : normalizedPath.replace(/^\/+|\/+$/g, '');
        const [allPages, pageSections, allServices, allTestimonials] = await Promise.all([
          cmsService.getPages(),
          cmsService.getSections(cleanSlug),
          cmsService.getServices(),
          cmsService.getTestimonials(),
        ]);

        if (!isCancelled) {
          setPages(allPages);
          setSections(pageSections.filter((s) => s.isActive).sort((a, b) => a.order - b.order));
          setServices(allServices);
          setTestimonials(allTestimonials);
        }
      } catch (err) {
        if (!isCancelled) {
          console.error('Error loading CMS content:', err);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    loadCmsContent();

    return () => {
      isCancelled = true;
    };
  }, [normalizedPath]);

  const isAdminRoute = normalizedPath === '/admin' || normalizedPath.startsWith('/admin/');
  const isAcademySubRoute = normalizedPath.startsWith('/academy/') && normalizedPath.split('/').filter(Boolean).length >= 2;
  const isGemstoneRoute = normalizedPath === '/gemstones' || normalizedPath.startsWith('/gemstones/');
  const shouldLoadStickyCTA = normalizedPath === '/meditation' || normalizedPath.startsWith('/academy/');

  const currentPageObj = pages.find(
    (p) => p.slug === (normalizedPath === '/' ? 'home' : normalizedPath.replace(/^\//, ''))
  );

  const seoMeta = getSeoMetadata({
    pathname: normalizedPath,
    slug: activeSlug,
    instructorName: activeAcademy?.instructorName,
    customTitle:
      normalizedPath === '/courses/advanced-numerology-bundle'
        ? 'Advanced Vedic Numerology + Super Advanced Mobile Numerology | LEO Family'
        : currentPageObj?.metaTitle || currentPageObj?.title,
    customDescription:
      normalizedPath === '/courses/advanced-numerology-bundle'
        ? 'Enroll in the Navratri Special 2026 Dual Course Package: Advanced Vedic Numerology & Super Advanced Mobile Numerology (22 Modules) taught live by Raajeev Singh Chauhann.'
        : currentPageObj?.metaDescription,
  });

  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-background text-text-primary">
        <Helmet>
          <title>Admin Portal | {BrandRegistry.brand.name}</title>
        </Helmet>
        <Suspense fallback={<BrandedRouteLoadingFallback label="Loading Admin Control Center..." />}>
          <AdminPortal navigate={navigate} currentPath={normalizedPath} />
        </Suspense>
      </div>
    );
  }

  const renderMainContent = () => {
    if (isAcademySubRoute) {
      return (
        <Suspense fallback={<BrandedRouteLoadingFallback label="Loading Academy Portal..." />}>
          <AcademyLandingPage navigate={navigate} />
        </Suspense>
      );
    }

    if (normalizedPath === '/courses/advanced-numerology-bundle') {
      return (
        <Suspense fallback={<BrandedRouteLoadingFallback label="Loading Course Curriculum..." />}>
          <AdvancedNumerologyLandingPage navigate={navigate} />
        </Suspense>
      );
    }

    if (normalizedPath === '/programs') {
      return (
        <Suspense fallback={<BrandedRouteLoadingFallback label="Loading Programs..." />}>
          <ProgramsPage navigate={navigate} />
        </Suspense>
      );
    }

    if (normalizedPath === '/blogs') {
      return (
        <Suspense fallback={<BrandedRouteLoadingFallback label="Loading Spiritual Wisdom..." />}>
          <BlogsPage navigate={navigate} />
        </Suspense>
      );
    }

    if (normalizedPath === '/media') {
      return (
        <Suspense fallback={<BrandedRouteLoadingFallback label="Loading Media Library..." />}>
          <MediaCenterPage />
        </Suspense>
      );
    }

    if (normalizedPath === '/shorts') {
      return (
        <Suspense fallback={<BrandedRouteLoadingFallback label="Loading Spiritual Shorts..." />}>
          <ShortsPage navigate={navigate} />
        </Suspense>
      );
    }

    if (normalizedPath === '/meditation') {
      return (
        <Suspense fallback={<BrandedRouteLoadingFallback label="Loading Meditation Sanctuary..." />}>
          <MeditationPage navigate={navigate} />
        </Suspense>
      );
    }

    if (isGemstoneRoute) {
      return (
        <Suspense fallback={<BrandedRouteLoadingFallback label="Loading Sacred Gemstone Collection..." />}>
          <GemstonesPage navigate={navigate} currentPath={normalizedPath} />
        </Suspense>
      );
    }

    if (normalizedPath === '/services') {
      return (
        <ServicesSection
          section={{
            pageId: 'services',
            type: 'services',
            title: 'Our Specialized Services',
            subtitle: 'Unlock your true potential with our premium, results-driven consultations.',
            order: 1,
            isActive: true,
          }}
          services={services}
        />
      );
    }

    if (loading) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      );
    }

    return (
      <Suspense fallback={<BrandedRouteLoadingFallback />}>
        <div>
          {sections.map((section, index) => {
            switch (section.type) {
              case 'hero':
                return (
                  <React.Fragment key={section.id || index}>
                          <HeroSection section={section} navigate={navigate} />
                          <NavratriCoursePromotionBanner navigate={navigate} />
                          <TrustCredibilitySection />
                          <SuccessMetricsSection />
                          <MeetOurMentorsSection />
                          <FeaturedCoursesHomepage navigate={navigate} />
                          <AcademyComparisonMatrix />
                          <HomepageMediaAndWebinarSection />
                          <DynamicTestimonialsHomepage testimonials={testimonials} />
                          <HomepageCTASection />
                  </React.Fragment>
                );
              case 'services':
                return <ServicesSection key={section.id || index} section={section} services={services} />;
              case 'testimonials':
                return <TestimonialsSection key={section.id || index} section={section} testimonials={testimonials} />;
              case 'about':
                return <AboutSection key={section.id || index} section={section} />;
              case 'gemstones':
                return <GemstonesPage key={section.id || index} navigate={navigate} currentPath={normalizedPath} />;
              case 'numerology':
                return <NumerologyCalculator key={section.id || index} />;
              case 'academy':
                return <AcademySection key={section.id || index} />;
              case 'ai':
                return <AISpiritualSection key={section.id || index} />;
              case 'ecosystem':
                return <EcosystemSection key={section.id || index} />;
              case 'contact':
                return <ContactSection key={section.id || index} />;
              case 'custom':
                return <CustomSection key={section.id || index} section={section} />;
              default:
                return null;
            }
          })}
        </div>
      </Suspense>
    );
  };

  const brandName = settings?.websiteName || BrandRegistry.brand.name;
  const footerLinks = BrandRegistry.navigation.footer;

  return (
    <div className="min-h-screen flex flex-col bg-background text-text-primary selection:bg-primary/20 selection:text-primary overflow-x-hidden">
      <Helmet>
        <title>{seoMeta.title}</title>
        <meta name="description" content={seoMeta.description} />
        <meta property="og:title" content={seoMeta.ogTitle} />
        <meta property="og:description" content={seoMeta.ogDescription} />
        <meta property="og:image" content={seoMeta.ogImage} />
        <meta property="twitter:title" content={seoMeta.twitterTitle} />
        <meta property="twitter:description" content={seoMeta.twitterDescription} />
        <meta property="twitter:image" content={seoMeta.twitterImage} />
        <link rel="canonical" href={seoMeta.canonical} />
      </Helmet>

      <Navbar navigate={navigate} currentPath={normalizedPath} />

      <main className="flex-1 pt-16">
        {renderMainContent()}
      </main>

      {!isAcademySubRoute && (
        <footer className="bg-card border-t border-border/20 py-14 px-6 text-text-secondary relative z-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-border/15">
            <div className="md:col-span-5 space-y-4">
              <div
                onClick={() => navigate('/')}
                className="flex items-center gap-3 cursor-pointer group w-fit"
              >
                <img
                  src={settings?.logoUrl || BrandRegistry.assets.logos.light}
                  alt={brandName}
                  className="w-10 h-10 rounded-full object-cover border border-primary/30"
                />
                <span className="font-bold font-cinzel tracking-widest text-base text-primary uppercase">
                  {brandName}
                </span>
              </div>
              <p className="text-xs leading-relaxed max-w-md text-text-secondary">
                {BrandRegistry.brand.description}
              </p>
            </div>

            <div className="md:col-span-4 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-text-primary font-cinzel">
                {t('footer.quickLinks', 'Quick Links')}
              </h4>
              <ul className="grid grid-cols-2 gap-2 text-xs">
                {footerLinks.map((item, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => navigate(item.path)}
                      className="hover:text-primary transition-colors cursor-pointer text-left"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-text-primary font-cinzel">
                {t('footer.contact', 'Contact')}
              </h4>
              <ul className="space-y-2 text-xs">
                <li>{BrandRegistry.organization.generalPhone}</li>
                <li>{BrandRegistry.organization.businessEmail}</li>
                <li>{BrandRegistry.organization.businessHours}</li>
              </ul>
            </div>
          </div>

          <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-xs gap-4">
            <p>
              © {new Date().getFullYear()} {brandName}. {t('footer.rightsReserved', 'All rights reserved.')}
            </p>
            <button
              onClick={() => navigate('/admin')}
              className="text-[11px] text-text-secondary/60 hover:text-primary transition-colors cursor-pointer"
            >
              Admin Portal
            </button>
          </div>
        </footer>
      )}

      {isGemstoneRoute && (
        <Suspense fallback={null}>
          <CartDrawer onNavigate={navigate} />
        </Suspense>
      )}
      <Suspense fallback={null}>
        <FloatingConsultationCard currentPath={normalizedPath} />
      </Suspense>
      {shouldLoadStickyCTA && (
        <Suspense fallback={null}>
          <StickyFloatingCTA currentPath={normalizedPath} />
        </Suspense>
      )}
      <ThemeSelector />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </ErrorBoundary>
  );
}
