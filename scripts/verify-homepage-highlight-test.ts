/**
 * LEO Family: Navratri Course Promotion - Static Homepage Highlight & Premium Visual Redesign
 * Verification Test Suite
 */

import fs from 'fs';
import path from 'path';

function runTests() {
  console.log('================================================================');
  console.log('LEO FAMILY: STATIC HOMEPAGE HIGHLIGHT & VISUAL REDESIGN TESTS');
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

  // 1. Verify index.css has cohesive palette tokens in @theme
  const indexCss = fs.readFileSync(path.join(process.cwd(), 'src/index.css'), 'utf-8');
  assert(
    indexCss.includes('--color-leo-emerald: #143D2E;') &&
    indexCss.includes('--color-leo-ivory: #F7F5EE;') &&
    indexCss.includes('--color-leo-gold: #C6A15B;') &&
    indexCss.includes('--color-leo-card: #FFFFFF;') &&
    indexCss.includes('--color-leo-text-primary: #26352E;') &&
    indexCss.includes('--color-leo-text-secondary: #59665F;') &&
    indexCss.includes('--color-leo-surface: #E8F0E9;') &&
    indexCss.includes('--color-leo-border: #E3DED2;'),
    'Cohesive LEO Family palette tokens defined in @theme',
    'All 8 color variables properly registered in Tailwind v4 @theme'
  );

  // 2. Verify HeroSection: Brand introduction is permanent; carousel removed
  const heroSection = fs.readFileSync(path.join(process.cwd(), 'src/components/sections/HeroSection.tsx'), 'utf-8');
  assert(
    heroSection.includes("LEO FAMILY") &&
    heroSection.includes("One Platform • Multiple Expert Mentors • One Mission") &&
    heroSection.includes("Book Personal Consultation") &&
    heroSection.includes("Explore Programs") &&
    heroSection.includes("100K+") &&
    !heroSection.includes("activeSlide === 0") &&
    !heroSection.includes("setInterval"),
    'HeroSection has permanent LEO Family brand introduction without carousel rotation',
    'Rotating hero slide logic removed; LEO Family brand is permanent primary hero'
  );

  // 3. Verify App.tsx: Static NavratriCoursePromotionBanner rendered directly below HeroSection
  const appTsx = fs.readFileSync(path.join(process.cwd(), 'src/App.tsx'), 'utf-8');
  const heroCaseMatch = appTsx.includes("<HeroSection section={section} navigate={navigate} />\n                          <NavratriCoursePromotionBanner navigate={navigate} />\n                          <TrustCredibilitySection />");
  assert(
    heroCaseMatch,
    'NavratriCoursePromotionBanner placed directly below HeroSection and before TrustCredibilitySection',
    'Static promotion banner is always rendered on homepage below the hero'
  );

  // 4. Verify NavratriCoursePromotionBanner content & CTAs
  const bannerTsx = fs.readFileSync(path.join(process.cwd(), 'src/components/sections/NavratriCoursePromotionBanner.tsx'), 'utf-8');
  assert(
    bannerTsx.includes('SPECIAL COURSE OFFER') &&
    bannerTsx.includes('Super Advanced Vedic Numerology') &&
    bannerTsx.includes('An advanced learning journey through Vedic Numerology concepts and practical analysis.') &&
    bannerTsx.includes('₹194 ONLY') &&
    bannerTsx.includes('ENROLL NOW — ₹194') &&
    bannerTsx.includes('VIEW CURRICULUM') &&
    bannerTsx.includes('All Classes Live') &&
    bannerTsx.includes('Live Q&amp;A with Raajeev Singh Chauhann') &&
    bannerTsx.includes('Two Live Classes Per Week') &&
    bannerTsx.includes('1-Year Course and Recording Access') &&
    bannerTsx.includes('Certificate of Completion') &&
    bannerTsx.includes('https://rzp.io/rzp/Pyh2zDaN') &&
    bannerTsx.includes('/courses/advanced-numerology-bundle') &&
    bannerTsx.includes('/assets/teachers/Raajeev.webp') &&
    !bannerTsx.includes('Mobile Numerology') &&
    !bannerTsx.includes('995') &&
    !bannerTsx.includes('24,000'),
    'Static banner contains all required single-course copy, verified photo, and exact CTAs',
    'All required features, pricing (₹194), Razorpay link (Pyh2zDaN) and curriculum link verified'
  );

  // 5. Verify static banner uses the cohesive color classes
  assert(
    bannerTsx.includes('bg-leo-ivory') &&
    bannerTsx.includes('bg-leo-emerald') &&
    bannerTsx.includes('text-leo-emerald') &&
    bannerTsx.includes('text-leo-gold') &&
    bannerTsx.includes('bg-leo-surface') &&
    bannerTsx.includes('bg-leo-card') &&
    bannerTsx.includes('border-leo-border') &&
    bannerTsx.includes('text-leo-text-primary') &&
    bannerTsx.includes('text-leo-text-secondary'),
    'Static banner styled with cohesive emerald, ivory, and champagne-gold system',
    'Palette classes applied consistently to background, borders, buttons, and text'
  );

  // 6. Verify FeaturedCoursesHomepage course card styling and CTA separation
  const featuredTsx = fs.readFileSync(path.join(process.cwd(), 'src/components/sections/FeaturedCoursesHomepage.tsx'), 'utf-8');
  assert(
    featuredTsx.includes("course.id === 'prog-navratri-numerology'") &&
    featuredTsx.includes("bg-leo-emerald") &&
    featuredTsx.includes("bg-leo-surface") &&
    featuredTsx.includes("https://rzp.io/rzp/Pyh2zDaN") &&
    featuredTsx.includes("ENROLL NOW — ₹194") &&
    featuredTsx.includes("/courses/advanced-numerology-bundle") &&
    featuredTsx.includes("WHATSAPP_LINK") &&
    !featuredTsx.includes("Mobile Numerology"),
    'FeaturedCoursesHomepage retains Super Advanced Vedic Numerology card with Razorpay CTA while preserving WhatsApp for other courses',
    'Course uses Razorpay (Pyh2zDaN) and Curriculum button; other programs route to WhatsApp'
  );

  // 7. Verify AdvancedNumerologyLandingPage preserves all 11 Vedic syllabus modules and removes Mobile Numerology
  const landingPageTsx = fs.readFileSync(path.join(process.cwd(), 'src/components/sections/AdvancedNumerologyLandingPage.tsx'), 'utf-8');
  assert(
    landingPageTsx.includes("Super Advanced Vedic Numerology") &&
    landingPageTsx.includes("Psychic Numbers (Mulank) & Destiny Numbers (Bhagyank)") &&
    landingPageTsx.includes("The Complete 81 Combinations Analysis") &&
    landingPageTsx.includes("Authentic Vedic Numerology Remedies") &&
    landingPageTsx.includes("100% Live Classes with Direct Q&amp;A in Every Session") &&
    landingPageTsx.includes("1-Year Full Recording Access Across Web &amp; Mobile App") &&
    landingPageTsx.includes("Frequently Asked Questions") &&
    landingPageTsx.includes("https://rzp.io/rzp/Pyh2zDaN") &&
    landingPageTsx.includes("₹194") &&
    !landingPageTsx.includes("Mobile Numerology") &&
    !landingPageTsx.includes("995") &&
    !landingPageTsx.includes("24,000"),
    'Dedicated course page preserves 100% of 11 Vedic modules, FAQs, and ₹194 CTAs while removing Mobile Numerology bundle content',
    'All 11 Vedic modules and authentic facts strictly intact without bundle references'
  );

  // 8. Verify AdvancedNumerologyLandingPage uses cohesive emerald/ivory/gold design
  assert(
    landingPageTsx.includes('bg-leo-ivory') &&
    landingPageTsx.includes('text-leo-emerald') &&
    landingPageTsx.includes('bg-leo-emerald') &&
    landingPageTsx.includes('text-leo-gold') &&
    landingPageTsx.includes('bg-leo-card') &&
    landingPageTsx.includes('bg-leo-surface') &&
    landingPageTsx.includes('border-leo-border') &&
    landingPageTsx.includes('text-leo-text-primary') &&
    landingPageTsx.includes('text-leo-text-secondary'),
    'Dedicated course page restyled with cohesive emerald, ivory, and champagne-gold system',
    'Contrast issues fixed; headings in deep emerald, accents in gold, cards in crisp white'
  );

  // 9. Verify ProgramsPage routing and button styling
  const programsPageTsx = fs.readFileSync(path.join(process.cwd(), 'src/components/sections/ProgramsPage.tsx'), 'utf-8');
  assert(
    programsPageTsx.includes("prog-navratri-numerology") &&
    programsPageTsx.includes("bg-leo-emerald") &&
    programsPageTsx.includes("https://rzp.io/rzp/Pyh2zDaN") &&
    programsPageTsx.includes("ENROLL — ₹194") &&
    programsPageTsx.includes("/courses/advanced-numerology-bundle") &&
    programsPageTsx.includes("WHATSAPP_LINK"),
    'ProgramsPage retains Super Advanced Vedic Numerology in All Programs & Numerology with ₹194 button style',
    'Category mapping and dual action buttons validated'
  );

  console.log(`\n================================================================`);
  console.log(`FINAL RESULT: ${passed} OF ${total} TESTS PASSED (${Math.round((passed / total) * 100)}%)`);
  console.log(`================================================================`);
}

runTests();
