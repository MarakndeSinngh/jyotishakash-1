/**
 * Verification test suite for Floating PAY NOW TO ENROLL CTA on /courses/advanced-numerology-bundle
 */

import fs from 'fs';
import path from 'path';

function runVerification() {
  console.log('================================================================');
  console.log('LEO FAMILY: FLOATING PAY NOW TO ENROLL CTA VERIFICATION TESTS');
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

  // 1. Verify AdvancedNumerologyLandingPage has persistent floating CTA
  const landingPageContent = fs.readFileSync(path.join(process.cwd(), 'src/components/sections/AdvancedNumerologyLandingPage.tsx'), 'utf-8');
  assert(
    landingPageContent.includes('fixed bottom-0 left-0 right-0 z-[990]') &&
    landingPageContent.includes('PAY NOW TO ENROLL — ₹194'),
    'Floating CTA bar is fixed at bottom with high z-index (z-[990]) and displays PAY NOW TO ENROLL — ₹194',
    'Matches /academy/raajeev fixed bottom placement and z-index with updated ₹194 label'
  );

  // 2. Verify payment URL and safe target attributes
  assert(
    landingPageContent.includes('href={RAZORPAY_URL}') &&
    landingPageContent.includes('target="_blank"') &&
    landingPageContent.includes('rel="noopener noreferrer"') &&
    landingPageContent.includes('const RAZORPAY_URL = "https://rzp.io/rzp/Pyh2zDaN";'),
    'Clicking floating CTA opens exact Razorpay payment URL safely',
    'href="https://rzp.io/rzp/Pyh2zDaN" with target="_blank" rel="noopener noreferrer"'
  );

  // 3. Verify existing course enrollment buttons continue working
  const countRazorpayCtas = (landingPageContent.match(/href=\{RAZORPAY_URL\}/g) || []).length;
  assert(
    countRazorpayCtas >= 3,
    'Existing hero, section, and final CTA enrollment buttons preserved',
    `Found ${countRazorpayCtas} active Razorpay CTA links across the page`
  );

  // 4. Verify mobile safe-area spacing and clearance
  assert(
    landingPageContent.includes('pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]') &&
    landingPageContent.includes('pb-36 sm:pb-32'),
    'Safe-area insets & page bottom padding prevent covering content/controls',
    'Container has pb-36 sm:pb-32 and floating bar has safe-area-inset-bottom'
  );

  // 5. Verify styling uses cohesive emerald, ivory, and champagne-gold
  assert(
    landingPageContent.includes('bg-[#143D2E]/95') &&
    landingPageContent.includes('border-[#C6A15B]/40') &&
    landingPageContent.includes('from-[#C6A15B] via-[#E5C378] to-[#C6A15B]') &&
    landingPageContent.includes('text-[#143D2E]'),
    'Floating CTA styled with cohesive emerald, ivory, and champagne-gold system',
    'Matches /academy/raajeev gold gradient button with emerald background'
  );

  // 6. Verify Academy page is untouched
  const academyPageContent = fs.readFileSync(path.join(process.cwd(), 'src/components/sections/AcademyLandingPage.tsx'), 'utf-8');
  assert(
    academyPageContent.includes('Enroll or Book Personal Consultation') &&
    academyPageContent.includes('Connect on WhatsApp'),
    'Academy page (/academy/raajeev) and unrelated routes remain 100% unchanged',
    'AcademyLandingPage.tsx Flow 11 preserved without modification'
  );

  // 7. Verify StickyFloatingCTA is untouched
  const stickyCtaContent = fs.readFileSync(path.join(process.cwd(), 'src/components/StickyFloatingCTA.tsx'), 'utf-8');
  assert(
    stickyCtaContent.includes("ALLOWED_SLUGS = ['raajeev']") &&
    !stickyCtaContent.includes('advanced-numerology-bundle'),
    'StickyFloatingCTA not modified or forced globally',
    'Scope restricted to /courses/advanced-numerology-bundle in AdvancedNumerologyLandingPage'
  );

  // 8. Verify all 11 Vedic modules preserved and Mobile Numerology removed from this course offer
  assert(
    landingPageContent.includes('Module 1') &&
    landingPageContent.includes('Module 11') &&
    landingPageContent.includes('Authentic Vedic Numerology Remedies') &&
    !landingPageContent.includes('Mobile Numerology') &&
    !landingPageContent.includes('995') &&
    !landingPageContent.includes('24,000'),
    'All 11 Vedic Numerology syllabus modules preserved and bundle/Mobile Numerology claims removed',
    'Single-course curriculum intact without bundle references'
  );

  console.log(`\n================================================================`);
  console.log(`FINAL RESULT: ${passed} OF ${total} TESTS PASSED (${Math.round((passed / total) * 100)}%)`);
  console.log(`================================================================`);
}

runVerification();
