/**
 * LEO Family: Temporary consultation-ad and course visibility pause checks.
 * Confirms that the public offer is hidden without deleting its admin/database record.
 */

import fs from 'fs';
import path from 'path';

function runTests() {
  console.log('================================================================');
  console.log('LEO FAMILY: TEMPORARY CONSULTATION & COURSE HIDE TESTS');
  console.log('================================================================\n');

  let passed = 0;
  let total = 0;

  function assert(condition: boolean, testName: string, detail: string) {
    total++;
    if (condition) {
      console.log(`[PASS] Test ${total}: ${testName}\n       -> ${detail}`);
      passed++;
    } else {
      console.error(`[FAIL] Test ${total}: ${testName}\n       -> ${detail}`);
      process.exitCode = 1;
    }
  }

  const read = (filePath: string) =>
    fs.readFileSync(path.join(process.cwd(), filePath), 'utf-8');

  const app = read('src/App.tsx');
  const hero = read('src/components/sections/HeroSection.tsx');
  const featured = read('src/components/sections/FeaturedCoursesHomepage.tsx');
  const programs = read('src/components/sections/ProgramsPage.tsx');
  const server = read('server.ts');
  const seo = read('src/config/seo.ts');
  const repository = read('src/repositories/supabaseProgramRepository.ts');
  const adminPrograms = read('src/components/admin/ProgramsView.tsx');

  // 1. Keep the normal LEO Family homepage hero and its main content.
  assert(
    app.includes("import HeroSection from './components/sections/HeroSection';") &&
    hero.includes('LEO FAMILY') &&
    app.includes('<HeroSection section={section} navigate={navigate} />') &&
    app.includes('<TrustCredibilitySection />') &&
    app.includes('<FeaturedCoursesHomepage navigate={navigate} />'),
    'Main LEO Family homepage remains intact',
    'Brand hero, trust section and featured-programs section are still mounted'
  );

  // 2. Remove the special course campaign banner from the homepage layout.
  assert(
    !app.includes('NavratriCoursePromotionBanner') &&
    !app.includes('<NavratriCoursePromotionBanner'),
    'Temporary course promotion banner is no longer mounted on the homepage',
    'The banner component is preserved in the repository but removed from the public homepage layout'
  );

  // 3. Hide the floating consultation advertisement from the homepage only.
  assert(
    app.includes("const FloatingConsultationCard = React.lazy(() => import('./components/FloatingConsultationCard'));") &&
    app.includes("{normalizedPath !== '/' && (") &&
    app.includes('<FloatingConsultationCard currentPath={normalizedPath} />'),
    'Floating consultation advertisement is hidden on the homepage',
    'The ad is not mounted at /; existing behaviour on other routes is preserved'
  );

  // 4. Hide the special course from homepage featured-program cards.
  assert(
    featured.includes("program.id !== 'prog-navratri-numerology'") &&
    featured.includes('const filteredCourses = featuredPrograms;'),
    'Paused course is excluded from homepage Featured Courses',
    'Other featured programs continue through the existing filtering and rendering flow'
  );

  // 5. Hide the course from the public Programs page and category filter.
  assert(
    programs.includes("if (prog.id === 'prog-navratri-numerology') return false;") &&
    !programs.includes("numerology: ['prog-1', 'prog-6', 'prog-navratri-numerology']") &&
    programs.includes("numerology: ['prog-1', 'prog-6']"),
    'Paused course is excluded from public Programs and Numerology listings',
    'Existing Numerology program IDs remain in the category mapping'
  );

  // 6. Old in-app course links redirect safely; navigate must be declared before the effect.
  const navigateDeclarationIndex = app.indexOf('const navigate = useCallback');
  const redirectEffectIndex = app.indexOf('// Keep the retired course URL safe');
  assert(
    app.includes("if (normalizedPath === '/courses/advanced-numerology-bundle')") &&
    app.includes("navigate('/programs')") &&
    !app.includes('AdvancedNumerologyLandingPage') &&
    navigateDeclarationIndex >= 0 &&
    redirectEffectIndex > navigateDeclarationIndex,
    'Legacy course route redirects without a temporal-dead-zone error',
    'navigate is initialized before the redirect useEffect invokes it'
  );

  // 7. Direct HTTP requests receive a temporary server-side redirect.
  assert(
    server.includes('app.get("/courses/advanced-numerology-bundle"') &&
    server.includes('res.redirect(302, "/programs")'),
    'Direct course URL receives a temporary redirect',
    'HTTP clients are sent to /programs without serving old course content or metadata'
  );

  // 8. Remove obsolete route-specific SEO title from the public SEO registry.
  assert(
    !seo.includes("'/courses/advanced-numerology-bundle'") &&
    !server.includes('Super Advanced Vedic Numerology | LEO Family'),
    'Retired course SEO metadata is removed',
    'The old course title is no longer advertised by the route registry or server handler'
  );

  // 9. Preserve the course record and Admin Panel controls for future reactivation.
  assert(
    repository.includes("id: 'prog-navratri-numerology'") &&
    repository.includes('NAVRATRI_NUMEROLOGY_BUNDLE_PROGRAM') &&
    adminPrograms.includes('programService.getAllPrograms()') &&
    adminPrograms.includes('programService.updateProgram(editingProgram.id, formData)'),
    'Course data and Admin Panel management are preserved',
    'No program/database record is deleted; authorized administrators retain management access'
  );

  console.log(`\n================================================================`);
  console.log(`FINAL RESULT: ${passed} OF ${total} TESTS PASSED (${Math.round((passed / total) * 100)}%)`);
  console.log(`================================================================`);
}

runTests();
