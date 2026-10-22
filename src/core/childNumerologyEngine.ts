import { CHALDEAN_MAP, reduceToSingleDigit } from '../services/numerologyEngine';

export interface ChildProfileInput {
  childName?: string;
  dob?: string;
  gender?: 'BOY' | 'GIRL' | 'UNISEX' | 'MALE' | 'FEMALE' | string;
  candidateNames?: string[];
  parentPreferredLetter?: string;
  [key: string]: any;
}

export interface WisdomLetterInfo {
  letter: string;
  planet: string;
  element: string;
  recommendationHi: string;
  compatibilityNote: string;
  chaldeanValue?: number;
  planetHi?: string;
  whyConsiderHi?: string;
  elementHi?: string;
  [key: string]: any;
}

export interface CandidateNameAnalysis {
  name: string;
  chaldeanCompound: number;
  chaldeanRoot: number;
  compoundData: {
    title: string;
    description: string;
    meaning?: string;
    [key: string]: any;
  };
  dobCompatibility: {
    score: number;
    status: 'SUPPORTIVE' | 'NEUTRAL' | 'NEEDS_ATTENTION';
    statusHi: string;
    notesHi: string;
    mulankHarmonyHi?: string;
    bhagyankHarmonyHi?: string;
    whyExplanationHi?: string;
    [key: string]: any;
  };
  letterBreakdown: Array<{
    letter: string;
    value: number;
    planet: string;
    [key: string]: any;
  }>;
  firstLetterAnalysis: {
    letter: string;
    planet: string;
    vibeHi: string;
    [key: string]: any;
  };
  vowelSum: number;
  consonantSum: number;
  vowels?: { sum: number; count: number; letters?: string[]; [key: string]: any };
  consonants?: { sum: number; count: number; letters?: string[]; [key: string]: any };
  missingNumbersRestored: number[];
  missingNumberSupport?: { restored: number[]; analysisHi?: string; [key: string]: any };
  repeatedNumberCheck?: { hasHazard: boolean; warningHi?: string; note?: string; [key: string]: any };
  developmentThemes?: { intellectHi?: string; emotionHi?: string; expressionHi?: string; disciplineHi?: string; vitalityHi?: string; [key: string]: any };
  careerAndTalentThemes?: { suitableFieldsHi?: string[]; leadershipFitHi?: string; keyTalentHi?: string; [key: string]: any };
  parentingAndVastuTips?: { colorAdviceHi?: string; studyDirectionHi?: string; gemstoneAdviceHi?: string; sacredRemedyHi?: string; [key: string]: any };
  spellingVariants?: Array<{ name: string; chaldeanRoot: number; score: number; whyHi?: string; [key: string]: any }>;
  [key: string]: any;
}

export interface BabyNameDictionaryItem {
  name: string;
  gender: 'BOY' | 'GIRL' | 'UNISEX';
  startingLetter: string;
  chaldeanRoot: number;
  chaldeanCompound: number;
  meaning: string;
  meaningHi?: string;
  meaningEn?: string;
  focusGoal: string;
  [key: string]: any;
}

export interface ChildLuckyNamesReport {
  childInfo: {
    name: string;
    standardDob: string;
    mulank: number;
    bhagyank: number;
    mulankGrahaHi: string;
    bhagyankGrahaHi: string;
  };
  gridData: {
    birthGrid: Record<number, number>;
    missingNumbers: number[];
    planes: Array<{ name: string; numbers: number[]; active: boolean; meaning: string }>;
  };
  wisdomLetters: {
    highlySupportive: WisdomLetterInfo[];
    supportiveNeutral: WisdomLetterInfo[];
    cautionary: WisdomLetterInfo[];
  };
  candidateAnalyses: CandidateNameAnalysis[];
  comparisonSummary: {
    balancedOverviewHi: string;
    recommendedTopChoice: string;
  };
  parentGuidelines: {
    rulesHi: string[];
    disclaimerHi: string;
  };
}

export const CURATED_BABY_NAMES_LIBRARY: BabyNameDictionaryItem[] = [
  { name: 'Aarav', gender: 'BOY', startingLetter: 'A', chaldeanRoot: 1, chaldeanCompound: 10, meaning: 'Peaceful, calm, wisdom', focusGoal: 'LEADERSHIP' },
  { name: 'Aditi', gender: 'GIRL', startingLetter: 'A', chaldeanRoot: 5, chaldeanCompound: 14, meaning: 'Boundless, mother of gods', focusGoal: 'WISDOM' },
  { name: 'Reyansh', gender: 'BOY', startingLetter: 'R', chaldeanRoot: 6, chaldeanCompound: 24, meaning: 'Ray of light, Lord Vishnu', focusGoal: 'SUCCESS' },
  { name: 'Saanvi', gender: 'GIRL', startingLetter: 'S', chaldeanRoot: 1, chaldeanCompound: 19, meaning: 'Goddess Lakshmi', focusGoal: 'PROSPERITY' },
  { name: 'Kavya', gender: 'GIRL', startingLetter: 'K', chaldeanRoot: 3, chaldeanCompound: 12, meaning: 'Poetry in motion, artistic', focusGoal: 'CREATIVITY' },
  { name: 'Vihaan', gender: 'BOY', startingLetter: 'V', chaldeanRoot: 6, chaldeanCompound: 24, meaning: 'Dawn of a glorious new era', focusGoal: 'LEADERSHIP' },
  { name: 'Ishaan', gender: 'BOY', startingLetter: 'I', chaldeanRoot: 9, chaldeanCompound: 18, meaning: 'Lord Shiva, northeast light', focusGoal: 'SPIRITUALITY' },
  { name: 'Ananya', gender: 'GIRL', startingLetter: 'A', chaldeanRoot: 5, chaldeanCompound: 14, meaning: 'Matchless, unique charm', focusGoal: 'WISDOM' },
  { name: 'Devansh', gender: 'BOY', startingLetter: 'D', chaldeanRoot: 5, chaldeanCompound: 23, meaning: 'Part of God, divine blessing', focusGoal: 'PROSPERITY' },
  { name: 'Myra', gender: 'GIRL', startingLetter: 'M', chaldeanRoot: 1, chaldeanCompound: 10, meaning: 'Beloved, sweet fragrance', focusGoal: 'SUCCESS' }
];

const PLANET_NAMES_HI: Record<number, string> = {
  1: 'सूर्य (Sun)',
  2: 'चन्द्र (Moon)',
  3: 'बृहस्पति (Jupiter)',
  4: 'राहु (Rahu)',
  5: 'बुध (Mercury)',
  6: 'शुक्र (Venus)',
  7: 'केतु (Ketu)',
  8: 'शनि (Saturn)',
  9: 'मंगल (Mars)'
};

export function analyzeChildLuckyNamesPro(input: ChildProfileInput): ChildLuckyNamesReport {
  const name = input.childName?.trim() || 'शिशु';
  const dob = input.dob || '2023-01-01';
  const parts = dob.split('-').map(Number);
  const day = parts[2] || 1;
  const month = parts[1] || 1;
  const year = parts[0] || 2023;

  const mulank = reduceToSingleDigit(day);
  const bhagyank = reduceToSingleDigit(
    `${year}${month}${day}`.split('').reduce((acc, d) => acc + Number(d), 0)
  );

  const birthGrid: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
  const allDigits = `${year}${month}${day}${mulank}${bhagyank}`.replace(/[^1-9]/g, '');
  for (const d of allDigits) {
    const num = Number(d);
    if (num >= 1 && num <= 9) birthGrid[num] = (birthGrid[num] || 0) + 1;
  }

  const missingNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(n => birthGrid[n] === 0);

  const candidatesList = (input.candidateNames && input.candidateNames.length > 0)
    ? input.candidateNames
    : [name, 'Aarav', 'Reyansh'];

  const candidateAnalyses: CandidateNameAnalysis[] = candidatesList.map(candName => {
    const cleanCand = candName.toUpperCase().replace(/[^A-Z]/g, '');
    let compound = 0;
    let vowelSum = 0;
    let consonantSum = 0;
    const letterBreakdown: Array<{ letter: string; value: number; planet: string }> = [];

    const vowels = new Set(['A', 'E', 'I', 'O', 'U']);
    for (const ch of cleanCand) {
      const val = CHALDEAN_MAP[ch] || 1;
      compound += val;
      letterBreakdown.push({
        letter: ch,
        value: val,
        planet: PLANET_NAMES_HI[val] || 'ग्रह'
      });
      if (vowels.has(ch)) vowelSum += val;
      else consonantSum += val;
    }

    const root = reduceToSingleDigit(compound || 1);
    const friendlyNums: Record<number, number[]> = {
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

    const isSupportive = (friendlyNums[mulank] || [1, 5, 6]).includes(root);
    const status = isSupportive ? 'SUPPORTIVE' : 'NEUTRAL';

    return {
      name: candName,
      chaldeanCompound: compound,
      chaldeanRoot: root,
      compoundData: {
        title: `शुभ संख्या ${compound}`,
        description: `यह संख्या नेतृत्व और अनुकूल भाग्य कम्पन प्रदान करती है।`
      },
      dobCompatibility: {
        score: isSupportive ? 92 : 70,
        status,
        statusHi: isSupportive ? 'अत्यंत अनुकूल (Supportive)' : 'तटस्थ (Neutral)',
        notesHi: `यह नामांक मूलांक ${mulank} और भाग्यांक ${bhagyank} के साथ सकारात्मक तालमेल रखता है।`
      },
      letterBreakdown,
      firstLetterAnalysis: {
        letter: cleanCand[0] || 'A',
        planet: PLANET_NAMES_HI[CHALDEAN_MAP[cleanCand[0]] || 1] || 'सूर्य',
        vibeHi: 'आत्मविश्वास एवं रचनात्मक दृष्टिकोण'
      },
      vowelSum,
      consonantSum,
      missingNumbersRestored: missingNumbers.filter(m => m === root)
    };
  });

  return {
    childInfo: {
      name,
      standardDob: dob,
      mulank,
      bhagyank,
      mulankGrahaHi: PLANET_NAMES_HI[mulank] || 'सूर्य',
      bhagyankGrahaHi: PLANET_NAMES_HI[bhagyank] || 'बृहस्पति'
    },
    gridData: {
      birthGrid,
      missingNumbers,
      planes: [
        { name: 'विचार विमान (Thought 4-3-8)', numbers: [4, 3, 8], active: birthGrid[4] > 0 && birthGrid[3] > 0 && birthGrid[8] > 0, meaning: 'योजना एवं अध्ययन क्षमता' },
        { name: 'इच्छाशक्ति विमान (Will 9-5-1)', numbers: [9, 5, 1], active: birthGrid[9] > 0 && birthGrid[5] > 0 && birthGrid[1] > 0, meaning: 'दृढ़ संकल्प एवं साहस' },
        { name: 'कर्म विमान (Action 2-7-6)', numbers: [2, 7, 6], active: birthGrid[2] > 0 && birthGrid[7] > 0 && birthGrid[6] > 0, meaning: 'व्यावहारिक सफलता' }
      ]
    },
    wisdomLetters: {
      highlySupportive: [
        { letter: 'A', planet: 'सूर्य (Sun)', element: 'अग्नि', recommendationHi: 'सर्वोत्तम शुरुआत', compatibilityNote: 'मूलांक के साथ पूर्ण मित्र' },
        { letter: 'R', planet: 'चन्द्र/बृहस्पति', element: 'जल/काष्ठ', recommendationHi: 'शुभ समृद्धि', compatibilityNote: 'व्यक्तित्व में सकारात्मक ऊर्जा' },
        { letter: 'S', planet: 'बृहस्पति', element: 'काष्ठ', recommendationHi: 'ज्ञान एवं विद्या', compatibilityNote: 'शिक्षा में एकाग्रता' }
      ],
      supportiveNeutral: [
        { letter: 'K', planet: 'चन्द्र', element: 'जल', recommendationHi: 'रचनात्मकता', compatibilityNote: 'संतुलित प्रभाव' },
        { letter: 'M', planet: 'राहु', element: 'वायु', recommendationHi: 'दृढ़ इच्छाशक्ति', compatibilityNote: 'सावधानीपूर्वक चयन' }
      ],
      cautionary: [
        { letter: 'P', planet: 'शनि', element: 'पृथ्वी', recommendationHi: 'संघर्ष से बचें', compatibilityNote: 'मूलांक से विरोधी कंपन' }
      ]
    },
    candidateAnalyses,
    comparisonSummary: {
      balancedOverviewHi: `विश्लेषण किए गए नामों में से ${candidateAnalyses[0]?.name || name} शिशु के जन्म अंकों के साथ सबसे मधुर ग्रहीय तालमेल प्रदर्शित करता है।`,
      recommendedTopChoice: candidateAnalyses[0]?.name || name
    },
    parentGuidelines: {
      rulesHi: [
        'नाम की स्पेलिंग ऐसी रखें जिसका कुल जोड़ 1, 3, 5, या 6 बने।',
        'अनावश्यक जटिल अक्षरों को दोहराने से बचें जो नकारात्मक आवृत्तियाँ पैदा करें।',
        'घर में पुकारने का उपनाम भी मुख्य नामांक के अनुकूल होना चाहिए।'
      ],
      disclaimerHi: 'यह अंकशास्त्रीय रिपोर्ट भारतीय पारंपरिक वैदिक एवं चैल्डियन मान्यताओं पर आधारित है।'
    }
  };
}
