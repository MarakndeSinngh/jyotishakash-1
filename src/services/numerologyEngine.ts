import { DOBAnalysis, NameAnalysis, MobileAnalysis, remediesAdvice } from '../types';
import { PAIR_MEANINGS } from './pairMeanings';

export const CHALDEAN_MAP: Record<string, number> = {
  A: 1, I: 1, J: 1, Q: 1, Y: 1,
  B: 2, K: 2, R: 2,
  C: 3, G: 3, L: 3, S: 3,
  D: 4, M: 4, T: 4,
  E: 5, H: 5, N: 5, X: 5,
  U: 6, V: 6, W: 6,
  O: 7, Z: 7,
  F: 8, P: 8
};

export const PYTHAGOREAN_MAP: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
  S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
};

const VOWELS = new Set(['A', 'E', 'I', 'O', 'U']);

export function reduceToSingleDigit(num: number): number {
  let val = Math.abs(num);
  while (val > 9) {
    val = val.toString().split('').reduce((acc, d) => acc + Number(d), 0);
  }
  return val === 0 ? 1 : val;
}

export function analyzeDateOfBirth(dob: string, name: string = 'Seeker'): DOBAnalysis {
  const parts = (dob || '1990-01-01').split('-').map(Number);
  const year = parts[0] || 1990;
  const month = parts[1] || 1;
  const day = parts[2] || 1;

  const birthNumber = reduceToSingleDigit(day);
  const lifePathNumber = reduceToSingleDigit(
    `${year}${month}${day}`.split('').reduce((acc, d) => acc + Number(d), 0)
  );

  const cleanName = name.toUpperCase().replace(/[^A-Z]/g, '');
  let destinySum = 0;
  let soulUrgeSum = 0;
  let personalitySum = 0;

  for (const ch of cleanName) {
    const val = CHALDEAN_MAP[ch] || 1;
    destinySum += val;
    if (VOWELS.has(ch)) {
      soulUrgeSum += val;
    } else {
      personalitySum += val;
    }
  }

  const destinyNumber = reduceToSingleDigit(destinySum || birthNumber);
  const soulUrgeNumber = reduceToSingleDigit(soulUrgeSum || 3);
  const personalityNumber = reduceToSingleDigit(personalitySum || 4);
  const maturityNumber = reduceToSingleDigit(birthNumber + lifePathNumber);
  const attitudeNumber = reduceToSingleDigit(day + month);

  const currentYear = new Date().getFullYear();
  const personalYear = reduceToSingleDigit(day + month + currentYear);

  // Loshu Grid counts (1-9)
  const grid: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
  const allDigits = `${year}${month}${day}${birthNumber}${lifePathNumber}`.replace(/[^1-9]/g, '');
  for (const d of allDigits) {
    const num = Number(d);
    if (num >= 1 && num <= 9) {
      grid[num] = (grid[num] || 0) + 1;
    }
  }

  const missingNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(n => grid[n] === 0);

  const rulingPlanets: Record<number, string> = {
    1: 'Sun (सूर्य)',
    2: 'Moon (चन्द्र)',
    3: 'Jupiter (बृहस्पति)',
    4: 'Rahu (राहु)',
    5: 'Mercury (बुध)',
    6: 'Venus (शुक्र)',
    7: 'Ketu (केतु)',
    8: 'Saturn (शनि)',
    9: 'Mars (मंगल)'
  };

  return {
    birthNumber,
    lifePathNumber,
    destinyNumber,
    soulUrgeNumber,
    personalityNumber,
    maturityNumber,
    attitudeNumber,
    personalYear,
    missingNumbers,
    grid,
    rulingPlanet: rulingPlanets[birthNumber] || 'Cosmic Light',
    elements: {
      Water: grid[1] * 20,
      Earth: (grid[2] + grid[5] + grid[8]) * 15,
      Wood: (grid[3] + grid[4]) * 20,
      Metal: (grid[6] + grid[7]) * 20,
      Fire: grid[9] * 25
    },
    planes: [
      { name: 'Thought Plane (4-3-8)', numbers: [4, 3, 8], active: grid[4] > 0 && grid[3] > 0 && grid[8] > 0, meaning: 'Analytical planning and intellectual depth' },
      { name: 'Will Plane (9-5-1)', numbers: [9, 5, 1], active: grid[9] > 0 && grid[5] > 0 && grid[1] > 0, meaning: 'Indomitable willpower, perseverance, and drive' },
      { name: 'Action Plane (2-7-6)', numbers: [2, 7, 6], active: grid[2] > 0 && grid[7] > 0 && grid[6] > 0, meaning: 'Execution, practical action, and manifesting goals' },
      { name: 'Mental Plane (4-9-2)', numbers: [4, 9, 2], active: grid[4] > 0 && grid[9] > 0 && grid[2] > 0, meaning: 'Sharp memory and academic retention' },
      { name: 'Emotional Plane (3-5-7)', numbers: [3, 5, 7], active: grid[3] > 0 && grid[5] > 0 && grid[7] > 0, meaning: 'Compassion, spiritual heart, and artistic empathy' },
      { name: 'Practical Plane (8-1-6)', numbers: [8, 1, 6], active: grid[8] > 0 && grid[1] > 0 && grid[6] > 0, meaning: 'Commercial execution and material wealth foundation' }
    ]
  };
}

export function analyzeNameSystems(name: string = 'Seeker'): NameAnalysis {
  const clean = (name || 'Seeker').toUpperCase().replace(/[^A-Z]/g, '');
  let chaldeanCompound = 0;
  let pythagoreanCompound = 0;
  let soulUrgeSum = 0;
  let personalitySum = 0;

  for (const ch of clean) {
    const cVal = CHALDEAN_MAP[ch] || 1;
    const pVal = PYTHAGOREAN_MAP[ch] || 1;
    chaldeanCompound += cVal;
    pythagoreanCompound += pVal;
    if (VOWELS.has(ch)) {
      soulUrgeSum += cVal;
    } else {
      personalitySum += cVal;
    }
  }

  const chaldeanTotal = reduceToSingleDigit(chaldeanCompound || 1);
  const pythagoreanTotal = reduceToSingleDigit(pythagoreanCompound || 1);
  const soulUrge = reduceToSingleDigit(soulUrgeSum || 1);
  const personality = reduceToSingleDigit(personalitySum || 1);

  return {
    chaldeanCompound,
    chaldeanTotal,
    pythagoreanTotal,
    soulUrge,
    personality,
    compatibilityWithDob: chaldeanTotal === 1 || chaldeanTotal === 5 || chaldeanTotal === 6 ? 'Highly Harmonious' : 'Moderate Alignment',
    suggestedSpellings: [
      clean,
      `${clean}A`,
      clean.replace(/I$/, 'EE'),
      clean.replace(/A$/, 'AA')
    ]
  };
}

export function analyzeMobileNumber(mobile: string = ''): MobileAnalysis {
  const digits = (mobile || '').replace(/[^0-9]/g, '');
  const compoundTotal = digits.split('').reduce((acc, d) => acc + Number(d), 0) || 50;
  const reducedTotal = reduceToSingleDigit(compoundTotal);

  const pairs: Array<{ pair: string; meaning: string; positive: string; negative: string; severity?: number }> = [];
  for (let i = 0; i < digits.length - 1; i++) {
    const p = digits.substring(i, i + 2);
    const detail = PAIR_MEANINGS[p];
    if (detail) {
      pairs.push({
        pair: p,
        meaning: detail.meaning,
        positive: detail.positive,
        negative: detail.negative,
        severity: detail.severity
      });
    }
  }

  const hostileRelationships: Array<{ title: string; desc: string }> = [];
  if (digits.includes('18') || digits.includes('81')) {
    hostileRelationships.push({ title: 'Sun-Saturn Axis (18/81)', desc: 'Can generate frictions with authority and delayed results.' });
  }
  if (digits.includes('28') || digits.includes('82')) {
    hostileRelationships.push({ title: 'Moon-Saturn Vish Yoga (28/82)', desc: 'Generates occasional emotional stress and financial delays.' });
  }
  if (digits.includes('48') || digits.includes('84')) {
    hostileRelationships.push({ title: 'Rahu-Saturn Struggle Line (48/84)', desc: 'May cause sudden logistical hurdles; requires grounding.' });
  }

  const isFavorable = [1, 5, 6].includes(reducedTotal) && hostileRelationships.length === 0;

  return {
    raw: mobile,
    compoundTotal,
    reducedTotal,
    rating: isFavorable ? 'Excellent' : 'Average / Requires Remedy',
    score: isFavorable ? 88 : Math.max(50, 75 - hostileRelationships.length * 10),
    pairs,
    hostileRelationships,
    isFavorable
  };
}

export function generateRemedies(dob: string, name: string = 'Seeker'): remediesAdvice {
  const parts = (dob || '1990-01-01').split('-').map(Number);
  const day = parts[2] || 1;
  const driver = reduceToSingleDigit(day);

  const remediesMap: Record<number, remediesAdvice> = {
    1: {
      mobileEndings: ['11', '15', '19', '51'],
      luckyGems: ['Ruby (माणिक्य)', 'Garnet'],
      luckyColours: ['Golden Yellow', 'Orange', 'Saffron'],
      luckyDirections: ['East', 'Northeast'],
      rudraksha: '1 Mukhi or 12 Mukhi Rudraksha',
      yantra: 'Surya Yantra',
      lalKitabRemedies: ['Offer water to the rising Sun daily in a copper lota', 'Respect elders and fatherly figures']
    },
    2: {
      mobileEndings: ['24', '42', '26', '62'],
      luckyGems: ['Pearl (मोती)', 'Moonstone'],
      luckyColours: ['Pearl White', 'Cream', 'Silver'],
      luckyDirections: ['Northwest', 'North'],
      rudraksha: '2 Mukhi Rudraksha',
      yantra: 'Chandra Yantra',
      lalKitabRemedies: ['Drink water from a silver glass', 'Seek blessings from your mother regularly']
    },
    3: {
      mobileEndings: ['33', '35', '53', '31'],
      luckyGems: ['Yellow Sapphire (पुखराज)', 'Citrine'],
      luckyColours: ['Bright Yellow', 'Golden Amber'],
      luckyDirections: ['Northeast', 'East'],
      rudraksha: '5 Mukhi Rudraksha',
      yantra: 'Brihaspati / Guru Yantra',
      lalKitabRemedies: ['Apply saffron (kesar) or turmeric tilak on forehead', 'Support teachers and educational causes']
    },
    4: {
      mobileEndings: ['45', '54', '15', '51'],
      luckyGems: ['Hessonite (गोमेद)', 'Smoky Quartz'],
      luckyColours: ['Electric Blue', 'Grey'],
      luckyDirections: ['Southwest', 'West'],
      rudraksha: '8 Mukhi Rudraksha',
      yantra: 'Rahu Yantra',
      lalKitabRemedies: ['Keep silver coin in wallet', 'Avoid clutter and unorganized electronics at home']
    },
    5: {
      mobileEndings: ['15', '51', '55', '56'],
      luckyGems: ['Emerald (पन्ना)', 'Peridot'],
      luckyColours: ['Emerald Green', 'Parrot Green'],
      luckyDirections: ['North', 'East'],
      rudraksha: '4 Mukhi or 10 Mukhi Rudraksha',
      yantra: 'Budh Yantra',
      lalKitabRemedies: ['Feed green grass or spinach to cows on Wednesday', 'Honor business agreements with honesty']
    },
    6: {
      mobileEndings: ['66', '61', '65', '56'],
      luckyGems: ['Diamond (हीरा)', 'White Zircon', 'Opal'],
      luckyColours: ['Sparkling White', 'Cream', 'Pastel Pink'],
      luckyDirections: ['Southeast', 'South'],
      rudraksha: '6 Mukhi Rudraksha',
      yantra: 'Shukra Yantra',
      lalKitabRemedies: ['Keep home and wardrobe fragrant with natural sandalwood/rose', 'Donate white sweets to the needy']
    },
    7: {
      mobileEndings: ['71', '75', '37', '57'],
      luckyGems: ['Cat’s Eye (लहसुनिया)', 'Chrysoberyl'],
      luckyColours: ['Light Grey', 'Multi-colour', 'Soft Sand'],
      luckyDirections: ['Northwest', 'Northeast'],
      rudraksha: '9 Mukhi Rudraksha',
      yantra: 'Ketu Yantra',
      lalKitabRemedies: ['Feed stray dogs on Saturdays and Tuesdays', 'Engage in daily silent meditation']
    },
    8: {
      mobileEndings: ['85', '58', '35', '53'],
      luckyGems: ['Blue Sapphire (नीलम)', 'Amethyst', 'Iolite'],
      luckyColours: ['Dark Blue', 'Midnight Navy', 'Black'],
      luckyDirections: ['West', 'South'],
      rudraksha: '7 Mukhi or 14 Mukhi Rudraksha',
      yantra: 'Shani Yantra',
      lalKitabRemedies: ['Light a mustard oil lamp under a Peepal tree on Saturdays', 'Treat domestic helpers and laborers with respect']
    },
    9: {
      mobileEndings: ['91', '19', '95', '59'],
      luckyGems: ['Red Coral (मूंगा)', 'Carnelian'],
      luckyColours: ['Bright Red', 'Crimson', 'Maroon'],
      luckyDirections: ['South', 'East'],
      rudraksha: '3 Mukhi Rudraksha',
      yantra: 'Mangal Yantra',
      lalKitabRemedies: ['Recite Hanuman Chalisa on Tuesdays', 'Donate blood if medically fit']
    }
  };

  return remediesMap[driver] || remediesMap[1];
}
