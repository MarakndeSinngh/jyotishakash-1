import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  Calendar, 
  User, 
  ChevronRight, 
  Info, 
  AlertCircle, 
  CheckCircle2, 
  Star, 
  Sparkles, 
  Grid3X3,
  Share2,
  Trash2,
  Clock,
  Heart,
  UserCheck
} from 'lucide-react';
import ShareButtons from '../ShareButtons';
import { generateReport, compareGrids, Language, NumerologyReport, CompatibilityResult } from '../../utils/numerologyEngine';
import PremiumReportView from '../numerology/PremiumReportView';
import CompatibilityReportView from '../numerology/CompatibilityReportView';

const NUMEROLOGY_MEANINGS: Record<number, { title: string; description: string; color: string }> = {
  1: {
    title: 'The Leader',
    description: 'Number 1 represents leadership, independence, and originality. A mobile number adding to 1 is excellent for business owners, managers, and those seeking to establish authority. It brings strong energy for new beginnings and self-reliance.',
    color: 'text-amber-500'
  },
  2: {
    title: 'The Peacemaker',
    description: 'Number 2 signifies harmony, partnership, and diplomacy. It is ideal for counselors, diplomats, and those in service-oriented professions. It fosters cooperation and strong relationships, though it may sometimes lack aggressive business drive.',
    color: 'text-emerald-500'
  },
  3: {
    title: 'The Communicator',
    description: 'Number 3 is the number of creativity, expression, and social interaction. Perfect for artists, writers, entertainers, and sales professionals. It brings joy, optimism, and excellent communication skills.',
    color: 'text-yellow-500'
  },
  4: {
    title: 'The Builder',
    description: 'Number 4 represents stability, hard work, and practicality. Good for accountants, engineers, and builders. It brings discipline and a strong foundation, though it can sometimes indicate a life of hard work and slow but steady progress.',
    color: 'text-blue-500'
  },
  5: {
    title: 'The Adventurer',
    description: 'Number 5 is all about freedom, travel, and dynamic change. Excellent for public figures, travelers, and those in dynamic industries. It brings excitement and adaptability, but can also lead to instability if not grounded.',
    color: 'text-cyan-500'
  },
  6: {
    title: 'The Nurturer',
    description: 'Number 6 signifies family, responsibility, and healing. Ideal for doctors, teachers, and those in hospitality. It brings a strong sense of duty, love, and protection to the bearer.',
    color: 'text-pink-500'
  },
  7: {
    title: 'The Seeker',
    description: 'Number 7 represents spirituality, analysis, and deep thought. Perfect for researchers, philosophers, and spiritual seekers. It encourages introspection and wisdom, though it may sometimes lead to isolation.',
    color: 'text-purple-500'
  },
  8: {
    title: 'The Powerhouse',
    description: 'Number 8 is the number of wealth, power, and material success. Highly recommended for CEOs, politicians, and ambitious entrepreneurs. It attracts financial abundance and authority, but requires balance to avoid materialism.',
    color: 'text-rose-500'
  },
  9: {
    title: 'The Humanitarian',
    description: 'Number 9 signifies completion, universal love, and compassion. Great for philanthropists, healers, and global leaders. It brings a broad perspective and a desire to help humanity.',
    color: 'text-orange-500'
  }
};

type PairImpact = 'Positive' | 'Negative' | 'Neutral';
interface PairMeaning {
  impact: PairImpact;
  description: string;
}

const PAIR_MEANINGS: Record<string, PairMeaning> = {
  '15': { impact: 'Positive', description: 'Brings success, leadership, and excellent communication skills.' },
  '51': { impact: 'Positive', description: 'Highly auspicious for business, wealth, and quick progress.' },
  '24': { impact: 'Positive', description: 'Attracts support, stability, and financial gains.' },
  '42': { impact: 'Positive', description: 'Good for management, steady growth, and savings.' },
  '19': { impact: 'Positive', description: 'High energy, authority, and success in career.' },
  '91': { impact: 'Positive', description: 'Leadership, ambition, and strong willpower.' },
  '28': { impact: 'Negative', description: 'May cause financial struggles, delays, and stress.' },
  '82': { impact: 'Negative', description: 'Indicates hard work with less reward, relationship issues.' },
  '48': { impact: 'Negative', description: 'Can bring sudden obstacles, legal issues, or health problems.' },
  '84': { impact: 'Negative', description: 'Prone to accidents, delays, and mental tension.' },
  '18': { impact: 'Negative', description: 'May lead to conflicts, health issues, and struggles.' },
  '81': { impact: 'Negative', description: 'Indicates authority clashes and sudden setbacks.' },
  '33': { impact: 'Positive', description: 'Excellent for creativity, teaching, and wealth.' },
  '66': { impact: 'Positive', description: 'Brings luxury, comfort, and family harmony.' },
  '55': { impact: 'Positive', description: 'Highly dynamic, good for business and mass communication.' },
  '22': { impact: 'Negative', description: 'Can cause emotional instability and confusion.' },
  '44': { impact: 'Negative', description: 'May bring sudden changes, struggles, and hard luck.' },
  '88': { impact: 'Negative', description: 'Extreme delays, heavy responsibilities, and struggles.' },
  '29': { impact: 'Negative', description: 'Emotional stress, relationship issues, and anxiety.' },
  '92': { impact: 'Negative', description: 'Aggression mixed with emotional vulnerability.' },
  '36': { impact: 'Positive', description: 'Good for knowledge, creativity, and problem-solving.' },
  '63': { impact: 'Positive', description: 'Attracts luxury, success in arts, and good fortune.' },
  '16': { impact: 'Positive', description: 'Brings luxury, charm, and success in glamorous fields.' },
  '61': { impact: 'Positive', description: 'Attracts wealth, authority, and material success.' },
  '45': { impact: 'Positive', description: 'Good for business, stability, and analytical skills.' },
  '54': { impact: 'Positive', description: 'Brings success in communication, trade, and management.' },
  '11': { impact: 'Neutral', description: 'Strong independence, but can lead to ego clashes.' },
  '77': { impact: 'Neutral', description: 'Highly spiritual and analytical, but may cause isolation.' },
  '99': { impact: 'Neutral', description: 'High energy and humanitarian, but prone to anger.' },
};

const CHALDEAN_MAP: Record<string, number> = {
  A: 1, I: 1, J: 1, Q: 1, Y: 1,
  B: 2, K: 2, R: 2,
  C: 3, G: 3, L: 3, S: 3,
  D: 4, M: 4, T: 4,
  E: 5, H: 5, N: 5, X: 5,
  U: 6, V: 6, W: 6,
  O: 7, Z: 7,
  F: 8, P: 8
};

const DESTINY_MEANINGS: Record<number, { title: string; description: string }> = {
  1: { title: 'Independent, Leader, Original', description: 'According to Chaldean numerology, your Destiny/Expression number is 1. The Sun rules the number 1. You have the qualities of the Sun and are influenced by it in your whole life. You are a born leader, highly independent, and possess strong originality. You have a pioneering spirit and are driven to achieve success.' },
  2: { title: 'Diplomatic, Peacemaker, Intuitive', description: 'According to Chaldean numerology, your Destiny/Expression number is 2. The Moon rules the number 2. You are highly intuitive, sensitive, and excel in partnerships. You are a natural peacemaker who brings harmony to any situation.' },
  3: { title: 'Creative, Entertainer, Ideal', description: 'According to Chaldean numerology, your Destiny/Expression number is 3. Jupiter rules the number 3. The 3 means Creative, Entertainer, Ideal. You have the qualities of the planet Jupiter and you are influenced by Jupiter in your whole life. The person of number 3 is a social person who is creative, communicative and dramatic. The number 3 represents artistic talents, charismatic personality and cheerful behavior.' },
  4: { title: 'Practical, Builder, Disciplined', description: 'According to Chaldean numerology, your Destiny/Expression number is 4. Uranus/Rahu rules the number 4. You are highly practical, disciplined, and hardworking. You build strong foundations and are reliable, though you may face sudden changes in life.' },
  5: { title: 'Adventurous, Communicator, Free-spirited', description: 'According to Chaldean numerology, your Destiny/Expression number is 5. Mercury rules the number 5. You are dynamic, adaptable, and love freedom. You excel in communication, travel, and thrive on change and new experiences.' },
  6: { title: 'Nurturing, Responsible, Harmonious', description: 'According to Chaldean numerology, your Destiny/Expression number is 6. Venus rules the number 6. You are deeply caring, responsible, and drawn to beauty and harmony. You are a natural healer and prioritize family and community.' },
  7: { title: 'Spiritual, Analytical, Seeker', description: 'According to Chaldean numerology, your Destiny/Expression number is 7. Neptune/Ketu rules the number 7. You are highly analytical, spiritual, and a seeker of truth. You possess deep inner wisdom and often prefer solitude for contemplation.' },
  8: { title: 'Ambitious, Powerful, Materialistic', description: 'According to Chaldean numerology, your Destiny/Expression number is 8. Saturn rules the number 8. You are driven by success, power, and material wealth. You are a strong executive and can achieve great things through hard work and discipline.' },
  9: { title: 'Humanitarian, Compassionate, Idealistic', description: 'According to Chaldean numerology, your Destiny/Expression number is 9. Mars rules the number 9. You are a true humanitarian with a broad perspective. You are compassionate, idealistic, and driven to make the world a better place.' }
};

const SOUL_URGE_MEANINGS: Record<number, { title: string; description: string }> = {
  1: { title: 'Desire for Independence', description: 'According to the vowels in your name, Soul Urge number is 1. You have a deep inner desire to lead, be independent, and stand out. You want to be recognized for your unique abilities and original ideas.' },
  2: { title: 'Desire for Harmony', description: 'According to the vowels in your name, Soul Urge number is 2. You have a strong inner desire for peace, harmony, and partnership. You seek love, understanding, and emotional connection above all else.' },
  3: { title: 'Cheerful and Artistic desire', description: 'According to the vowels in your name, Soul Urge number is 3. The 3 means Cheerful and Artistic desire. The Soul urge number three is influenced by Jupiter, so your inner desire reflects the traits of Jupiter such as artistic talents, charismatic personality and cheerful behavior. You tend to be joyful for yourself and others.' },
  4: { title: 'Desire for Stability', description: 'According to the vowels in your name, Soul Urge number is 4. You have a deep inner desire for order, stability, and a solid foundation. You seek security and want to build something lasting.' },
  5: { title: 'Desire for Freedom', description: 'According to the vowels in your name, Soul Urge number is 5. You have a strong inner desire for freedom, adventure, and change. You crave new experiences and dislike being restricted by routine.' },
  6: { title: 'Desire to Nurture', description: 'According to the vowels in your name, Soul Urge number is 6. You have a deep inner desire to care for others, create harmony, and be surrounded by beauty. You seek a loving home and family life.' },
  7: { title: 'Desire for Knowledge', description: 'According to the vowels in your name, Soul Urge number is 7. You have a strong inner desire for truth, wisdom, and spiritual understanding. You seek deeper meaning and often need time alone to reflect.' },
  8: { title: 'Desire for Success', description: 'According to the vowels in your name, Soul Urge number is 8. You have a deep inner desire for power, wealth, and material success. You want to be in control and achieve significant accomplishments.' },
  9: { title: 'Desire to Help Humanity', description: 'According to the vowels in your name, Soul Urge number is 9. You have a strong inner desire to serve others, make a difference, and express universal love. You are driven by high ideals and compassion.' }
};

const DREAM_MEANINGS: Record<number, { title: string; description: string }> = {
  1: { title: 'Impressive as a Leader', description: 'According to the consonants in your name, your Dream/Personality number is 1. You present yourself as a strong, independent, and capable leader. Others see you as confident, original, and pioneering.' },
  2: { title: 'Impressive as a Peacemaker', description: 'According to the consonants in your name, your Dream/Personality number is 2. You present yourself as cooperative, diplomatic, and approachable. Others see you as a gentle and supportive partner.' },
  3: { title: 'Impressive as an Entertainer', description: 'According to the consonants in your name, your Dream/Personality number is 3. You present yourself as charismatic, creative, and joyful. Others see you as the life of the party and a great communicator.' },
  4: { title: 'Impressive as a Builder', description: 'According to the consonants in your name, your Dream/Personality number is 4. You present yourself as reliable, hardworking, and practical. Others see you as a solid foundation and someone they can trust.' },
  5: { title: 'Impressive as an Adventurer', description: 'According to the consonants in your name, your Dream/Personality number is 5. You present yourself as dynamic, adaptable, and exciting. Others see you as a free spirit who loves change and travel.' },
  6: { title: 'Impressive as a Caregiver', description: 'According to the consonants in your name, your Dream/Personality number is 6. You present yourself as responsible, loving, and harmonious. Others see you as a nurturing figure and a protector.' },
  7: { title: 'Impressive as a Thinker', description: 'According to the consonants in your name, your Dream/Personality number is 7. You present yourself as mysterious, analytical, and spiritual. Others see you as deep, wise, and sometimes introverted.' },
  8: { title: 'Impressive as an Executive', description: 'According to the consonants in your name, your Dream/Personality number is 8. You present yourself as powerful, ambitious, and successful. Others see you as an authority figure and a strong manager.' },
  9: { title: 'Impressive as intellectual and humanitarian', description: 'According to the consonants in your name, your Dream/Personality number is 9. The 9 means Impressive as intellectual and humanitarian. The inner dream number 9 is under the dominance of Mars. You present your first impression as intellectual and real humanitarian. You are known for confidence, tolerance and courage with a magnetic personality.' }
};

const COMPATIBILITY_MATRIX: Record<number, Record<number, string>> = {
  1: { 1: 'Excellent', 2: 'Good', 3: 'Good', 4: 'Average', 5: 'Excellent', 6: 'Average', 7: 'Average', 8: 'Challenging', 9: 'Excellent' },
  2: { 1: 'Excellent', 2: 'Average', 3: 'Good', 4: 'Challenging', 5: 'Excellent', 6: 'Average', 7: 'Average', 8: 'Challenging', 9: 'Challenging' },
  3: { 1: 'Excellent', 2: 'Good', 3: 'Excellent', 4: 'Average', 5: 'Excellent', 6: 'Challenging', 7: 'Good', 8: 'Average', 9: 'Good' },
  4: { 1: 'Good', 2: 'Challenging', 3: 'Average', 4: 'Challenging', 5: 'Good', 6: 'Good', 7: 'Excellent', 8: 'Challenging', 9: 'Challenging' },
  5: { 1: 'Excellent', 2: 'Good', 3: 'Average', 4: 'Good', 5: 'Excellent', 6: 'Good', 7: 'Average', 8: 'Average', 9: 'Average' },
  6: { 1: 'Average', 2: 'Average', 3: 'Challenging', 4: 'Good', 5: 'Good', 6: 'Excellent', 7: 'Good', 8: 'Average', 9: 'Average' },
  7: { 1: 'Good', 2: 'Average', 3: 'Good', 4: 'Excellent', 5: 'Good', 6: 'Good', 7: 'Average', 8: 'Average', 9: 'Average' },
  8: { 1: 'Challenging', 2: 'Challenging', 3: 'Average', 4: 'Challenging', 5: 'Good', 6: 'Good', 7: 'Average', 8: 'Challenging', 9: 'Challenging' },
  9: { 1: 'Excellent', 2: 'Good', 3: 'Excellent', 4: 'Challenging', 5: 'Good', 6: 'Average', 7: 'Average', 8: 'Challenging', 9: 'Average' }
};

const LO_SHU_GRID_LAYOUT = [
  [4, 9, 2],
  [3, 5, 7],
  [8, 1, 6]
];

// Helper functions for Mobile Numerology
const calculateTotal = (num: string): number => {
  return num.split('').reduce((sum, digit) => sum + parseInt(digit, 10), 0);
};

const reduceToSingleDigit = (num: number): number => {
  let res = num;
  while (res > 9) {
    res = res.toString().split('').reduce((sum, digit) => sum + parseInt(digit, 10), 0);
  }
  return res;
};

const checkCondition = (num: string, final: number): { message: string; isFavorable: boolean } => {
  const hasBadDigits = /[248]/.test(num);
  const isFavorableFinal = [1, 3, 5, 6].includes(final);

  if (hasBadDigits && !isFavorableFinal) {
    return {
      message: "This number is not recommended. Please consult us before using it.",
      isFavorable: false
    };
  }

  if (hasBadDigits && isFavorableFinal) {
    return {
      message: "You may use this number, but for best results, consult us for a name correction.",
      isFavorable: true
    };
  }

  if (!hasBadDigits && isFavorableFinal) {
    return {
      message: "This is a favorable number. You can continue using it.",
      isFavorable: true
    };
  }

  return {
    message: "This number is neutral. For better growth, a consultation is recommended.",
    isFavorable: true
  };
};

export default function NumerologyCalculator() {
  const [activeTab, setActiveTab] = useState<'mobile' | 'name' | 'dob'>('mobile');
  const [mobileNumber, setMobileNumber] = useState('');
  const [mobileResult, setMobileResult] = useState<{
    total: number;
    final: number;
    message: string;
    isFavorable: boolean;
  } | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const cleanNumber = mobileNumber.replace(/\D/g, '');
    if (cleanNumber.length === 10) {
      const total = calculateTotal(cleanNumber);
      const final = reduceToSingleDigit(total);
      const { message, isFavorable } = checkCondition(cleanNumber, final);
      setMobileResult({ total, final, message, isFavorable });
      setError('');
    } else {
      setMobileResult(null);
    }
  }, [mobileNumber]);

  const [fullName, setFullName] = useState('');
  const [nameResult, setNameResult] = useState<{ 
    firstName: {
      name: string;
      compound: number;
      destiny: number;
    };
    fullName: {
      name: string;
      letters: { char: string; val: number }[]; 
      compound: number; 
      destiny: number; 
      soulUrge: number; 
      dream: number; 
    };
  } | null>(null);
  const [nameError, setNameError] = useState('');

  const [dobDate, setDobDate] = useState('');
  const [dobResult, setDobResult] = useState<{
    driver: number;
    conductor: number;
    gridCounts: Record<number, number>;
    compatibility: string;
  } | null>(null);
  const [dobError, setDobError] = useState('');

  // 🔮 Premium Numerology Report Generator State
  const [userName, setUserName] = useState('');
  const [dobMode, setDobMode] = useState<'single' | 'compare'>('single');
  const [lang, setLang] = useState<Language>('en');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [partner1Name, setPartner1Name] = useState('');
  const [partner1Dob, setPartner1Dob] = useState('');
  const [partner2Name, setPartner2Name] = useState('');
  const [partner2Dob, setPartner2Dob] = useState('');
  const [reportResult, setReportResult] = useState<NumerologyReport | null>(null);
  const [compareResult, setCompareResult] = useState<CompatibilityResult | null>(null);
  const [savedLocalReports, setSavedLocalReports] = useState<any[]>([]);

  // Loading animation status text rotation
  const loadingSteps = [
    "Scanning solar coordinates and elemental alignments...",
    "Formulating Driver and Conductor core vibrations...",
    "Synthesizing 3x3 Lo Shu Energy Matrices...",
    "Plotting missing numbers & traditional remedial planes...",
    "Generating detailed personality summaries..."
  ];

  const reloadSavedReports = () => {
    const saved = JSON.parse(localStorage.getItem('numerology_reports') || '[]');
    setSavedLocalReports(saved);
  };

  useEffect(() => {
    reloadSavedReports();
  }, [reportResult]);

  const loadSavedReport = (savedItem: any) => {
    setUserName(savedItem.name);
    setDobDate(savedItem.dob.split('/').reverse().join('-')); // Format back for input
    setReportResult(savedItem.reportData);
    setDobMode('single');
  };

  const deleteSavedReport = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const saved = JSON.parse(localStorage.getItem('numerology_reports') || '[]');
    const updated = saved.filter((r: any) => r.id !== id);
    localStorage.setItem('numerology_reports', JSON.stringify(updated));
    setSavedLocalReports(updated);
  };

  const startSingleReportGeneration = (e: React.FormEvent) => {
    e.preventDefault();
    setDobError('');
    setReportResult(null);

    if (!dobDate) {
      setDobError('Please select a valid date of birth.');
      return;
    }

    setIsLoading(true);
    setLoadingStep(0);

    // Run premium loading steps
    const interval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev >= loadingSteps.length - 1) {
          clearInterval(interval);
          const generated = generateReport(dobDate, lang);
          setReportResult(generated);
          setIsLoading(false);
          return 0;
        }
        return prev + 1;
      });
    }, 800);
  };

  const startCompareReportGeneration = (e: React.FormEvent) => {
    e.preventDefault();
    setDobError('');
    setCompareResult(null);

    if (!partner1Dob || !partner2Dob) {
      setDobError('Please select both dates of birth to compare.');
      return;
    }

    setIsLoading(true);
    setLoadingStep(0);

    const interval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev >= loadingSteps.length - 1) {
          clearInterval(interval);
          const comparison = compareGrids(
            partner1Name, partner1Dob,
            partner2Name, partner2Dob,
            lang
          );
          setCompareResult(comparison);
          setIsLoading(false);
          return 0;
        }
        return prev + 1;
      });
    }, 800);
  };

  const calculateDOBNumerology = (e: React.FormEvent) => {
    e.preventDefault();
    setDobError('');
    setDobResult(null);

    if (!dobDate) {
      setDobError('Please select a valid date of birth.');
      return;
    }

    const [year, month, day] = dobDate.split('-');
    const dateStr = `${day}${month}${year}`;

    const reduceToSingle = (num: number) => {
      if (num === 0) return 0;
      let res = num;
      while (res > 9) {
        res = res.toString().split('').reduce((a, b) => a + parseInt(b, 10), 0);
      }
      return res;
    };

    const driver = reduceToSingle(parseInt(day, 10));
    const conductor = reduceToSingle(parseInt(dateStr, 10));

    // Lo Shu Grid is populated ONLY from the actual digits of DOB (DD/MM/YYYY format)
    const counts: Record<number, number> = {};
    for (let i = 1; i <= 9; i++) counts[i] = 0;

    const dStr = day.padStart(2, '0');
    const mStr = month.padStart(2, '0');
    const yStr = year.padStart(4, '0');
    const dobDigitsStr = `${dStr}${mStr}${yStr}`;

    for (const char of dobDigitsStr) {
      const digit = parseInt(char, 10);
      if (digit > 0 && digit <= 9) {
        counts[digit]++;
      }
    }

    if (conductor >= 1 && conductor <= 9) {
      counts[conductor]++;
    }

    setDobResult({
      driver,
      conductor,
      gridCounts: counts,
      compatibility: COMPATIBILITY_MATRIX[driver][conductor] || 'Neutral'
    });
  };

  const calculateNameNumerology = (e: React.FormEvent) => {
    e.preventDefault();
    setNameError('');
    setNameResult(null);

    const trimmedFullName = fullName.trim();
    if (!trimmedFullName) {
      setNameError('Please enter a valid name using alphabets.');
      return;
    }

    const parts = trimmedFullName.toUpperCase().split(/\s+/);
    const firstName = parts[0];
    
    const vowels = ['A', 'E', 'I', 'O', 'U'];
    
    const calculatePartNumerology = (namePart: string) => {
      let total = 0;
      let vowelTotal = 0;
      let consonantTotal = 0;
      const letters: { char: string; val: number }[] = [];

      for (const char of namePart) {
        if (/[A-Z]/.test(char)) {
          const val = CHALDEAN_MAP[char] || 0;
          letters.push({ char, val });
          total += val;
          if (vowels.includes(char)) {
            vowelTotal += val;
          } else {
            consonantTotal += val;
          }
        }
      }
      return { total, vowelTotal, consonantTotal, letters };
    };

    const firstNameStats = calculatePartNumerology(firstName);
    
    let fullTotal = 0;
    let fullVowelTotal = 0;
    let fullConsonantTotal = 0;
    const fullLetters: { char: string; val: number }[] = [];

    for (let i = 0; i < parts.length; i++) {
      const partStats = calculatePartNumerology(parts[i]);
      fullTotal += partStats.total;
      fullVowelTotal += partStats.vowelTotal;
      fullConsonantTotal += partStats.consonantTotal;
      fullLetters.push(...partStats.letters);
      if (i < parts.length - 1) {
        fullLetters.push({ char: ' ', val: 0 });
      }
    }

    const reduceToSingle = (num: number) => {
      if (num === 0) return 0;
      let res = num;
      while (res > 9) {
        res = res.toString().split('').reduce((a, b) => a + parseInt(b, 10), 0);
      }
      return res;
    };

    setNameResult({ 
      firstName: {
        name: firstName,
        compound: firstNameStats.total,
        destiny: reduceToSingle(firstNameStats.total)
      },
      fullName: {
        name: trimmedFullName.toUpperCase(),
        letters: fullLetters,
        compound: fullTotal,
        destiny: reduceToSingle(fullTotal),
        soulUrge: reduceToSingle(fullVowelTotal),
        dream: reduceToSingle(fullConsonantTotal)
      }
    });
  };

  return (
    <section className="py-20 lg:py-32 bg-transparent relative overflow-hidden min-h-screen flex items-center">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-5 pointer-events-none" />
      <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl lg:text-6xl font-cinzel font-bold text-primary uppercase tracking-[0.2em] mb-6 drop-shadow-sm">
              Numerology Calculator
            </h1>
            <p className="text-text-secondary text-lg lg:text-xl font-light italic max-w-2xl mx-auto">
              Discover the hidden energy and destiny behind your mobile number or name. Does it attract wealth, success, or struggle?
            </p>
          </motion.div>

          <div className="bg-card rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-border/20 overflow-hidden">
            <div className="flex flex-col md:flex-row border-b border-border/20">
              <button 
                onClick={() => setActiveTab('mobile')}
                className={`flex-1 py-4 px-2 text-[11px] font-bold uppercase tracking-[0.2em] transition-all ${activeTab === 'mobile' ? 'bg-primary/5 text-primary border-b-2 border-primary' : 'text-text-secondary hover:bg-surface'}`}
              >
                Mobile Numerology
              </button>
              <button 
                onClick={() => setActiveTab('name')}
                className={`flex-1 py-4 px-2 text-[11px] font-bold uppercase tracking-[0.2em] transition-all ${activeTab === 'name' ? 'bg-primary/5 text-primary border-b-2 border-primary' : 'text-text-secondary hover:bg-surface'}`}
              >
                Name Numerology
              </button>
              <button 
                onClick={() => setActiveTab('dob')}
                className={`flex-1 py-4 px-2 text-[11px] font-bold uppercase tracking-[0.2em] transition-all ${activeTab === 'dob' ? 'bg-primary/5 text-primary border-b-2 border-primary' : 'text-text-secondary hover:bg-surface'}`}
              >
                Lo Shu Grid & DOB
              </button>
            </div>

            <div className="p-8 lg:p-12">
              {activeTab === 'mobile' ? (
                <>
                  <form onSubmit={(e) => e.preventDefault()} className="max-w-xl mx-auto">
                    <div className="mb-8">
                      <label htmlFor="mobile" className="block text-[11px] font-bold uppercase tracking-[0.3em] text-primary mb-4 text-center">
                        Enter Your 10-Digit Mobile Number
                      </label>
                      <input
                        type="text"
                        id="mobile"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        placeholder="e.g. 9876543210"
                        className="w-full bg-background/50 border border-border/20 rounded-xl px-6 py-4 text-center text-2xl tracking-[0.2em] font-mono text-text-primary focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                      {error && (
                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-red-500 text-sm text-center mt-3"
                        >
                          {error}
                        </motion.p>
                      )}
                    </div>
                  </form>

                  {mobileResult !== null && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="mt-16 pt-12 border-t border-border/20 text-center"
                    >
                      <div className="flex flex-col items-center justify-center mb-8">
                        <div className="flex items-center gap-3 mb-8">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <Phone className="w-6 h-6 text-primary" />
                          </div>
                          <div className="text-left">
                            <h3 className="text-xl font-bold text-text-primary">Mobile Numerology Result</h3>
                            <p className="text-text-secondary text-sm">For number: {mobileNumber}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-center gap-6 mb-10">
                          <div className="text-5xl lg:text-7xl font-cinzel font-bold text-text-primary flex items-center gap-6">
                            <span className="opacity-30">{mobileResult.total}</span>
                            <span className="text-primary">=</span>
                            <span className="text-primary gold-glow-text text-7xl lg:text-9xl">
                              {mobileResult.final}
                            </span>
                          </div>
                          
                          <div className={`px-8 py-2 rounded-full text-xs font-bold uppercase tracking-[0.3em] border-2 ${mobileResult.isFavorable ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'}`}>
                            {mobileResult.isFavorable ? 'Favorable' : 'Needs Consultation'}
                          </div>
                        </div>
                      </div>

                      <div className="max-w-2xl mx-auto mb-12">
                        <p className={`text-xl lg:text-2xl font-medium leading-relaxed italic ${mobileResult.isFavorable ? 'text-emerald-800' : 'text-rose-800'}`}>
                          "{mobileResult.message}"
                        </p>
                      </div>

                      <div className="mt-12 p-8 bg-primary/5 rounded-3xl border border-primary/10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                          <Sparkles className="w-12 h-12 text-primary" />
                        </div>
                        <p className="text-text-secondary leading-relaxed relative z-10">
                          <strong>Want a deeper analysis?</strong> A mobile number is just one part of your numerological profile. For a complete name correction and destiny alignment, book an elite consultation with Leo Family.
                        </p>
                      </div>
                      
                      <div className="mt-12 flex justify-center">
                        <ShareButtons 
                          title="My Mobile Numerology Result"
                          text={`My mobile number ${mobileNumber} has a total of ${mobileResult.total} = ${mobileResult.final}. Result: ${mobileResult.message}`}
                          url={`${window.location.origin}/numerology`}
                        />
                      </div>
                    </motion.div>
                  )}
                </>
              ) : activeTab === 'name' ? (
                <>
                  <form onSubmit={calculateNameNumerology} className="max-w-xl mx-auto">
                    <div className="mb-8">
                      <label htmlFor="name" className="block text-[11px] font-bold uppercase tracking-[0.3em] text-primary mb-4 text-center">
                        Enter Your Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Raajeev Singh Chauhann"
                        className="w-full bg-background/50 border border-border/20 rounded-xl px-6 py-4 text-center text-2xl tracking-[0.1em] font-serif text-text-primary focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                      {nameError && (
                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-red-500 text-sm text-center mt-3"
                        >
                          {nameError}
                        </motion.p>
                      )}
                    </div>

                    <div className="text-center">
                      <button 
                        type="submit"
                        className="btn-premium px-12 py-4 rounded-full text-[12px] font-bold tracking-[0.3em] text-background uppercase shadow-[0_10px_30px_rgba(var(--primary-rgb),0.2)] hover:shadow-[0_15px_40px_rgba(var(--primary-rgb),0.4)] transition-all duration-500"
                      >
                        Calculate Name Number
                      </button>
                    </div>
                  </form>

                  {nameResult !== null && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="mt-16 pt-12 border-t border-border/20 text-center"
                    >
                      <div className="flex items-center justify-between gap-4 mb-8">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="w-6 h-6 text-primary" />
                          </div>
                          <div className="text-left">
                            <h3 className="text-xl font-bold text-text-primary">Name Numerology Analysis</h3>
                            <p className="text-text-secondary text-sm">Name: {fullName}</p>
                          </div>
                        </div>
                        <ShareButtons 
                          title="My Name Numerology Analysis"
                          text={`My Full Name Number is ${nameResult.fullName.destiny}. Check out my Name Numerology analysis from Leo Family!`}
                          url={`${window.location.origin}/numerology`}
                        />
                      </div>

                      {/* First Name Results */}
                      <div className="mb-12 p-6 bg-surface rounded-2xl border border-border/20 text-left">
                        <h4 className="text-lg font-cinzel font-bold text-primary mb-4 flex items-center gap-2">
                          <Star className="w-5 h-5" /> First Name Analysis: {nameResult.firstName.name}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="flex items-center gap-4">
                            <span className="text-text-secondary font-medium">Compound Number:</span>
                            <span className="bg-primary text-background px-3 py-1 rounded-lg font-bold">
                              {nameResult.firstName.compound}
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-text-secondary font-medium">Single Digit (Destiny):</span>
                            <span className="bg-primary text-background w-8 h-8 rounded-full flex items-center justify-center font-bold">
                              {nameResult.firstName.destiny}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Full Name Letters Visualization */}
                      <div className="flex flex-wrap justify-center gap-x-2 gap-y-4 mb-8">
                        {nameResult.fullName.letters.map((l, i) => (
                          l.char === ' ' ? (
                            <div key={i} className="w-4"></div>
                          ) : (
                            <div key={i} className="flex flex-col items-center">
                              <span className="text-2xl font-cinzel font-bold text-primary">{l.char}</span>
                              <span className="text-lg font-mono font-bold text-primary/80">{l.val}</span>
                            </div>
                          )
                        ))}
                      </div>

                      <div className="flex items-center justify-center gap-4 mb-12">
                        <span className="text-lg text-text-secondary">Full Name Compound Number/Namank:</span>
                        <span className="bg-primary text-background px-4 py-1 rounded-full text-2xl font-bold shadow-md">
                          {nameResult.fullName.compound}
                        </span>
                      </div>

                      <div className="space-y-8 text-left max-w-4xl mx-auto">
                        {/* Destiny Number */}
                        <div className="bg-surface border border-border/20 rounded-2xl p-8 shadow-sm">
                          <p className="text-sm text-text-secondary mb-4">
                            <strong>Full Name Destiny Number:</strong> The Expression number, which describes who you are, and what you are, or what you become.
                          </p>
                          <div className="flex items-center gap-4 mb-4">
                            <span className="text-lg font-bold text-text-primary">Name Destiny/Expression Number or Namanak:</span>
                            <span className="bg-primary text-background w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl shadow-md">
                              {nameResult.fullName.destiny}
                            </span>
                          </div>
                          <p className="text-text-primary leading-relaxed">
                            {DESTINY_MEANINGS[nameResult.fullName.destiny]?.description || 'Meaning not found.'}
                          </p>
                        </div>

                        {/* Soul Urge Number */}
                        <div className="bg-surface border border-border/20 rounded-2xl p-8 shadow-sm">
                          <p className="text-sm text-text-secondary mb-4">
                            <strong>Soul Urge Number:</strong> The Heart Desire number, which describes your inner potentials and inner resources.
                          </p>
                          <div className="flex items-center gap-4 mb-4">
                            <span className="text-lg font-bold text-text-primary">Soul Urge/Heart Desire Number:</span>
                            <span className="bg-primary text-background w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl shadow-md">
                              {nameResult.fullName.soulUrge}
                            </span>
                          </div>
                          <p className="text-text-primary leading-relaxed">
                            {SOUL_URGE_MEANINGS[nameResult.fullName.soulUrge]?.description || 'Meaning not found.'}
                          </p>
                        </div>

                        {/* Dream Number */}
                        <div className="bg-surface border border-border/20 rounded-2xl p-8 shadow-sm">
                          <p className="text-sm text-text-secondary mb-4">
                            <strong>Dream Number:</strong> The Personality number which describes outer personality, indeed your first impression on others.
                          </p>
                          <div className="flex items-center gap-4 mb-4">
                            <span className="text-lg font-bold text-text-primary">Name Dream/Personality Number:</span>
                            <span className="bg-primary text-background w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl shadow-md">
                              {nameResult.fullName.dream}
                            </span>
                          </div>
                          <p className="text-text-primary leading-relaxed">
                            {DREAM_MEANINGS[nameResult.fullName.dream]?.description || 'Meaning not found.'}
                          </p>
                        </div>
                      </div>

                      <div className="mt-12 p-8 bg-surface rounded-2xl border border-border/20">
                        <h4 className="text-xl font-cinzel font-bold text-text-primary mb-4">Your Name Shows Your Personality - Your Birth Date Shows Your Life Pattern</h4>
                        <p className="text-text-secondary mb-6">
                          Name numerology explains how people see you and your talents. But the deeper patterns of your life come from the numbers in your birth date.
                        </p>
                        <p className="text-sm text-text-primary mb-6">
                          <strong>Is your name lucky for you?</strong> A name correction can completely change the trajectory of your life. Book a consultation with Leo Family to align your name with your date of birth using Chaldean numerology.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </>
              ) : activeTab === 'dob' ? (
                <>
                  {/* 🔮 REPORT VIEW INTEGRATION */}
                  {reportResult !== null ? (
                    <PremiumReportView 
                      report={reportResult}
                      lang={lang}
                      setLang={setLang}
                      onClose={() => setReportResult(null)}
                      userName={userName}
                      onSave={reloadSavedReports}
                    />
                  ) : compareResult !== null ? (
                    <CompatibilityReportView 
                      result={compareResult}
                      lang={lang}
                      onClose={() => setCompareResult(null)}
                    />
                  ) : isLoading ? (
                    /* Shimmering Cosmic Loader */
                    <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
                      <div className="relative w-24 h-24 flex items-center justify-center">
                        <div className="absolute w-full h-full border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin" />
                        <Sparkles className="w-10 h-10 text-amber-500 animate-pulse" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-lg font-cinzel font-bold text-amber-700 uppercase tracking-widest animate-pulse">
                          Leo Family Elite Numerology Engine
                        </h4>
                        <p className="text-xs text-zinc-500 italic max-w-md mx-auto h-8 flex items-center justify-center">
                          {loadingSteps[loadingStep]}
                        </p>
                      </div>
                    </div>
                  ) : (
                    /* Entry forms (Single / Compare toggle) */
                    <div className="space-y-8">
                      {/* Mode selection buttons */}
                      <div className="flex justify-center gap-4 max-w-md mx-auto">
                        <button
                          onClick={() => { setDobMode('single'); setDobError(''); }}
                          className={`flex-1 py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wider border transition-all ${
                            dobMode === 'single'
                              ? 'bg-amber-500 text-white border-amber-500 shadow-md'
                              : 'bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100'
                          }`}
                        >
                          <UserCheck className="w-4 h-4 inline-block mr-2" />
                          Single DOB Report
                        </button>
                        <button
                          onClick={() => { setDobMode('compare'); setDobError(''); }}
                          className={`flex-1 py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wider border transition-all ${
                            dobMode === 'compare'
                              ? 'bg-amber-500 text-white border-amber-500 shadow-md'
                              : 'bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100'
                          }`}
                        >
                          <Heart className="w-4 h-4 inline-block mr-2" />
                          Compare Compatibility
                        </button>
                      </div>

                      {/* Language picker */}
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Select Report Language:</span>
                        {(['en', 'hi', 'gu'] as Language[]).map(l => (
                          <button
                            key={l}
                            onClick={() => setLang(l)}
                            className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border transition-all ${
                              lang === l
                                ? 'bg-zinc-800 text-white border-zinc-800'
                                : 'bg-white text-zinc-500 border-zinc-200 hover:bg-zinc-50'
                            }`}
                          >
                            {l === 'en' ? 'English' : l === 'hi' ? 'Hindi' : 'Gujarati'}
                          </button>
                        ))}
                      </div>

                      {/* Mode: Single DOB Report Form */}
                      {dobMode === 'single' ? (
                        <form onSubmit={startSingleReportGeneration} className="max-w-xl mx-auto bg-white p-8 rounded-3xl border border-amber-100 shadow-lg space-y-6">
                          <div className="space-y-2">
                            <label htmlFor="userName" className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                              Your Full Name
                            </label>
                            <input
                              type="text"
                              id="userName"
                              placeholder="E.g., Leo Smith (Optional)"
                              value={userName}
                              onChange={(e) => setUserName(e.target.value)}
                              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-5 py-3 text-zinc-800 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200/50 transition-all text-sm font-medium"
                            />
                          </div>

                          <div className="space-y-2">
                            <label htmlFor="dob" className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                              Your Date of Birth
                            </label>
                            <input
                              type="date"
                              id="dob"
                              value={dobDate}
                              onChange={(e) => setDobDate(e.target.value)}
                              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-5 py-3 text-zinc-800 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200/50 transition-all text-lg font-mono text-center"
                            />
                          </div>

                          {dobError && (
                            <p className="text-rose-500 text-xs text-center font-medium">{dobError}</p>
                          )}

                          <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-white py-4 rounded-xl text-xs font-bold uppercase tracking-[0.2em] shadow-[0_10px_25px_rgba(245,158,11,0.25)] hover:shadow-[0_12px_30px_rgba(245,158,11,0.4)] hover:scale-[1.01] transition-all"
                          >
                            Generate Premium report
                          </button>
                        </form>
                      ) : (
                        /* Mode: Compare Compatibility Form */
                        <form onSubmit={startCompareReportGeneration} className="max-w-2xl mx-auto bg-white p-8 rounded-3xl border border-amber-100 shadow-lg space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Partner 1 */}
                            <div className="space-y-4">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 border-b border-amber-100 pb-2">First Person</h4>
                              <div className="space-y-1">
                                <label className="text-[10px] uppercase text-zinc-400 font-bold block">Name</label>
                                <input
                                  type="text"
                                  placeholder="Name"
                                  value={partner1Name}
                                  onChange={(e) => setPartner1Name(e.target.value)}
                                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-zinc-800 text-xs font-medium"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] uppercase text-zinc-400 font-bold block">Date of Birth</label>
                                <input
                                  type="date"
                                  value={partner1Dob}
                                  onChange={(e) => setPartner1Dob(e.target.value)}
                                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-zinc-800 text-xs font-mono"
                                />
                              </div>
                            </div>

                            {/* Partner 2 */}
                            <div className="space-y-4">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 border-b border-amber-100 pb-2">Second Person</h4>
                              <div className="space-y-1">
                                <label className="text-[10px] uppercase text-zinc-400 font-bold block">Name</label>
                                <input
                                  type="text"
                                  placeholder="Name"
                                  value={partner2Name}
                                  onChange={(e) => setPartner2Name(e.target.value)}
                                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-zinc-800 text-xs font-medium"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] uppercase text-zinc-400 font-bold block">Date of Birth</label>
                                <input
                                  type="date"
                                  value={partner2Dob}
                                  onChange={(e) => setPartner2Dob(e.target.value)}
                                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-zinc-800 text-xs font-mono"
                                />
                              </div>
                            </div>
                          </div>

                          {dobError && (
                            <p className="text-rose-500 text-xs text-center font-medium">{dobError}</p>
                          )}

                          <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-white py-4 rounded-xl text-xs font-bold uppercase tracking-[0.2em] shadow-[0_10px_25px_rgba(245,158,11,0.25)] hover:shadow-[0_12px_30px_rgba(245,158,11,0.4)] hover:scale-[1.01] transition-all"
                          >
                            Analyze compatibility
                          </button>
                        </form>
                      )}

                      {/* Saved Reports Section underneath form */}
                      {savedLocalReports.length > 0 && (
                        <div className="mt-12 p-6 bg-white rounded-3xl border border-amber-200/30 max-w-xl mx-auto shadow-sm">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-1.5 justify-center">
                            <Clock className="w-4 h-4 text-amber-500" />
                            Previously Saved Reports
                          </h4>
                          <div className="space-y-2">
                            {savedLocalReports.map((saved) => (
                              <div 
                                key={saved.id}
                                onClick={() => loadSavedReport(saved)}
                                className="flex items-center justify-between p-3 bg-zinc-50 hover:bg-amber-50/40 rounded-xl border border-zinc-100 hover:border-amber-200/40 cursor-pointer transition-all"
                              >
                                <div className="text-left">
                                  <p className="text-xs font-bold text-zinc-800 capitalize">{saved.name}</p>
                                  <p className="text-[10px] text-zinc-400 font-mono">DOB: {saved.dob} | Saved: {saved.timestamp}</p>
                                </div>
                                <button 
                                  onClick={(e) => deleteSavedReport(saved.id, e)}
                                  className="p-1.5 hover:bg-rose-50 text-rose-500 rounded-full transition-all border border-transparent hover:border-rose-100"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
