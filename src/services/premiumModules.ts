import { CHALDEAN_MAP, reduceToSingleDigit } from './numerologyEngine';

export interface VehicleReport {
  plateNumber: string;
  totalCompound: number;
  reducedNumber: number;
  compatibilityScore: number;
  rating: string;
  energy: string;
  isCompatible: boolean;
  impact: string;
  advice: string;
  remedy: string;
  luckyColors: string[];
}

export interface HouseReport {
  totalSum: number;
  reducedTotal: number;
  vibe: string;
  energyVibration: string;
  wealthPotential: number;
  familyHarmony: number;
  spiritualEnergy: number;
  meaning: string;
  advice: string;
  remedy: string;
  predictions: string;
  luckyDirections: string[];
  luckyColors: string[];
}

export interface BusinessReport {
  businessName: string;
  compoundTotal: number;
  reducedTotal: number;
  brandStrength: number;
  financialPotential: number;
  growthScore: number;
  famePotential: number;
  isHarmonious: boolean;
  category: string;
  recommendations: string;
  remedy: string;
  industryFit: string[];
}

export interface ChildReport {
  driver: number;
  conductor: number;
  childDob: string;
  personalityTraits: string[];
  educationStrengths: string[];
  creativeTalents: string[];
  healthVulnerabilities: string[];
  luckyLetters: string[];
  unluckyLetters: string[];
  suggestedNames: string[];
  careerPaths: string[];
  guidanceForParents: string;
}

export interface SignatureReport {
  directionStyle: string;
  planetaryEnergy: string;
  careerImpact: string;
  financialImpact: string;
  corrections: string[];
  recommendations: string;
}

export interface LuckyDatesSuite {
  mostAuspiciousDates: number[];
  moderateDates: number[];
  avoidDates: number[];
  luckyDays: string[];
  luckyColors: string[];
  goldenHours: string[];
  monthlyForecast: Array<{ month: string; dates: number[]; focus: string }>;
}

export function analyzeVehicleNumerology(plate: string, driver: number = 1): VehicleReport {
  const clean = (plate || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  let sum = 0;
  for (const ch of clean) {
    if (/[0-9]/.test(ch)) {
      sum += Number(ch);
    } else {
      sum += CHALDEAN_MAP[ch] || 1;
    }
  }
  const reduced = reduceToSingleDigit(sum || 1);
  const friendlyNumbers: Record<number, number[]> = {
    1: [1, 2, 3, 5, 9],
    2: [1, 2, 5],
    3: [1, 2, 3, 9],
    4: [1, 5, 6, 7],
    5: [1, 5, 6],
    6: [5, 6, 7, 8],
    7: [1, 4, 6],
    8: [5, 6],
    9: [1, 3, 5]
  };

  const isCompatible = (friendlyNumbers[driver] || [1, 5, 6]).includes(reduced);
  const compatibilityScore = isCompatible ? 88 : 58;

  return {
    plateNumber: plate,
    totalCompound: sum,
    reducedNumber: reduced,
    compatibilityScore,
    rating: isCompatible ? 'Highly Auspicious' : 'Needs Neutralizer Remedy',
    energy: `Ruled by Planet Vibration ${reduced}`,
    isCompatible,
    impact: isCompatible
      ? 'Smooth, reliable travel with strong safety and prestige vibrations.'
      : 'Slight mechanical delays or friction with your birth driver frequency.',
    advice: isCompatible
      ? 'Maintain clean interior and keep a small silver coin or Ganesha idol on dashboard.'
      : 'Place a small camphor pouch or brass Hanuman/Ganesha symbol on dashboard to neutralize discordant vibrations.',
    remedy: 'Tying a small red or yellow sacred ribbon on dashboard balances mechanical friction.',
    luckyColors: ['Silver', 'Pearl White', 'Deep Navy']
  };
}

export function analyzeHouseNumerology(houseNum: string): HouseReport {
  const digits = (houseNum || '').replace(/[^0-9]/g, '');
  let sum = 0;
  for (const d of digits) sum += Number(d);
  if (sum === 0) sum = 7;
  const reduced = reduceToSingleDigit(sum);

  const houseMeanings: Record<number, { vibe: string; energy: string; wealth: number; harmony: number; spiritual: number; meaning: string }> = {
    1: { vibe: 'Leadership & Independence', energy: 'Sun Energy', wealth: 88, harmony: 75, spiritual: 78, meaning: 'Best for ambitious leaders, innovators, and individualists who want autonomy.' },
    2: { vibe: 'Peace & Domestic Harmony', energy: 'Moon Energy', wealth: 72, harmony: 92, spiritual: 82, meaning: 'Nurturing sanctuary fostering deep marital bonding and warm family peace.' },
    3: { vibe: 'Creativity & Joy', energy: 'Jupiter Energy', wealth: 85, harmony: 86, spiritual: 88, meaning: 'Vibrant social atmosphere, ideal for writers, teachers, and hosting guests.' },
    4: { vibe: 'Discipline & Foundation', energy: 'Rahu Energy', wealth: 74, harmony: 70, spiritual: 68, meaning: 'Practical, steady, and hardworking home that requires regular grounding.' },
    5: { vibe: 'Adventure & Commercial Flow', energy: 'Mercury Energy', wealth: 86, harmony: 76, spiritual: 74, meaning: 'High dynamism, constant travel, frequent parties, and active business talks.' },
    6: { vibe: 'Luxury & Domestic Bliss', energy: 'Venus Energy', wealth: 92, harmony: 94, spiritual: 80, meaning: 'Extremely lucky for families, children, beauty, and abundant material comfort.' },
    7: { vibe: 'Spiritual Sanctuary & Solitude', energy: 'Ketu Energy', wealth: 70, harmony: 78, spiritual: 95, meaning: 'Quiet haven for meditation, deep scientific research, and inner reflection.' },
    8: { vibe: 'Material Power & Authority', energy: 'Saturn Energy', wealth: 95, harmony: 68, spiritual: 76, meaning: 'Corporate directorships, building lasting real estate empire and financial stature.' },
    9: { vibe: 'Compassion & Universal Wisdom', energy: 'Mars Energy', wealth: 80, harmony: 82, spiritual: 90, meaning: 'Generous home welcoming people from all walks of life with high vitality.' }
  };

  const h = houseMeanings[reduced] || houseMeanings[1];

  return {
    totalSum: sum,
    reducedTotal: reduced,
    vibe: h.vibe,
    energyVibration: h.energy,
    wealthPotential: h.wealth,
    familyHarmony: h.harmony,
    spiritualEnergy: h.spiritual,
    meaning: h.meaning,
    advice: `Decorate the main entrance with auspicious brass Swastik or Om symbols and keep the foyer clean and illuminated.`,
    remedy: `Place natural sea salt in corner ceramic bowls to absorb stagnant electromagnetic clutter.`,
    predictions: `Residing here enhances your core connection to ${h.vibe}. Ensure clear spatial vastu flow.`,
    luckyDirections: ['Northeast', 'East', 'North'],
    luckyColors: ['Warm Ivory', 'Soft Gold', 'Earthy Beige']
  };
}

export function analyzeBusinessNumerology(name: string, driver: number = 1): BusinessReport {
  const clean = (name || 'Enterprise').toUpperCase().replace(/[^A-Z]/g, '');
  let sum = 0;
  for (const ch of clean) sum += CHALDEAN_MAP[ch] || 1;
  const reduced = reduceToSingleDigit(sum || 1);

  const isHarmonious = [1, 5, 6].includes(reduced);

  return {
    businessName: name,
    compoundTotal: sum,
    reducedTotal: reduced,
    brandStrength: isHarmonious ? 92 : 72,
    financialPotential: isHarmonious ? 89 : 68,
    growthScore: isHarmonious ? 94 : 70,
    famePotential: isHarmonious ? 91 : 75,
    isHarmonious,
    category: `Vibration ${reduced} Enterprise`,
    recommendations: `Align marketing campaigns and contracts with Wednesday or Friday for maximum client conversion.`,
    remedy: `If compound number does not match driver, add a sub-brand initial or tag line adding to 1, 5, or 6.`,
    industryFit: ['Consulting', 'E-commerce', 'Financial Services', 'Education', 'Wellness']
  };
}

export function generateChildNumerology(dob: string): ChildReport {
  const parts = (dob || '2020-01-01').split('-').map(Number);
  const day = parts[2] || 1;
  const month = parts[1] || 1;
  const year = parts[0] || 2020;

  const driver = reduceToSingleDigit(day);
  const conductor = reduceToSingleDigit(
    `${year}${month}${day}`.split('').reduce((acc, d) => acc + Number(d), 0)
  );

  return {
    driver,
    conductor,
    childDob: dob,
    personalityTraits: ['Curious Explorer', 'Empathetic Learner', 'Natural Leader', 'Artistic Imagination'],
    educationStrengths: ['Analytical Reasoning', 'Visual Arts', 'Language Acquisition', 'Scientific Logic'],
    creativeTalents: ['Musical Rhythm', 'Debate & Oratory', 'Visual Design'],
    healthVulnerabilities: ['Sensitive Digestion', 'Sleep Rhythm Balance', 'Allergic Sensitivity'],
    luckyLetters: ['A', 'R', 'S', 'M', 'K', 'V'],
    unluckyLetters: ['P', 'F', 'T'],
    suggestedNames: ['Aarav', 'Aditi', 'Reyansh', 'Saanvi', 'Kavya', 'Vihaan'],
    careerPaths: ['Technology Innovation', 'Medicine & Healthcare', 'Civil Administration', 'Creative Arts'],
    guidanceForParents: 'Nurture their independence with affectionate listening rather than rigid disciplinary coercion.'
  };
}

export function analyzeSignatureStyle(style: string): SignatureReport {
  return {
    directionStyle: style === 'RISING_UNDERLINE' ? 'Rising Trajectory (+20°)' : 'Balanced Foundation Vector',
    planetaryEnergy: 'Solar & Jovian Ascending Trajectory',
    careerImpact: 'Encourages proactive leadership decisions, swift promotions, and public respect.',
    financialImpact: 'Locks earned savings through single solid baseline support and prevents leakage.',
    corrections: [
      'Elevate the exit stroke upwards by 15-20 degrees',
      'Draw an unbroken forward underline starting under initial letter',
      'Avoid crossing back over your written name'
    ],
    recommendations: 'Practice 21 times every morning with blue or black ink on unlined paper.'
  };
}

export function generateLuckyDatesSuite(driver: number = 1, conductor: number = 1): LuckyDatesSuite {
  const luckyBase = [driver, conductor, reduceToSingleDigit(driver + conductor)].filter(n => n > 0 && n <= 9);
  const auspicious: number[] = [];
  for (const n of luckyBase) {
    [n, n + 9, n + 18, n + 27].forEach(d => {
      if (d <= 31 && !auspicious.includes(d)) auspicious.push(d);
    });
  }
  auspicious.sort((a, b) => a - b);

  return {
    mostAuspiciousDates: auspicious.slice(0, 8),
    moderateDates: [2, 11, 20, 29].filter(d => !auspicious.includes(d)),
    avoidDates: [8, 17, 26, 4, 13, 22, 31].filter(d => !auspicious.includes(d)).slice(0, 4),
    luckyDays: ['Sunday', 'Wednesday', 'Thursday'],
    luckyColors: ['Champagne Gold', 'Royal White', 'Emerald Green'],
    goldenHours: ['06:30 AM - 08:00 AM', '10:15 AM - 12:00 PM', '04:30 PM - 06:00 PM'],
    monthlyForecast: [
      { month: 'Current Quarter', dates: auspicious.slice(0, 4), focus: 'High-ticket deals, new contracts, and asset purchases' }
    ]
  };
}
