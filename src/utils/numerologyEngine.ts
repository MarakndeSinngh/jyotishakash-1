// Premium Numerology Engine (Lo Shu Grid) - Multi-language support (English, Hindi, Gujarati)
export type Language = 'en' | 'hi' | 'gu';

export interface NumerologyReport {
  personalInfo: {
    dob: string;
    driver: number;
    conductor: number;
    lifePath: number;
    birthDay: number;
    birthMonth: number;
    birthYear: number;
    personalYear: number;
    personalMonth: number;
    age: number;
    generation: string;
    birthElement: string;
    yinYangBalance: { yin: number; yang: number; description: string };
  };
  gridCounts: Record<number, number>;
  numberAnalysis: Array<{
    number: number;
    count: number;
    title: string;
    meaning: string;
    strength: string;
    weakness: string;
    potential: string;
    energyLevel: number; // 0 to 100
  }>;
  missingNumbers: Array<{
    number: number;
    effect: string;
    remedy: string;
    advice: string;
  }>;
  dominantEnergy: {
    strongest: number[];
    weakest: number[];
    balanced: number[];
    elements: {
      Water: { percent: number; status: string; desc: string };
      Earth: { percent: number; status: string; desc: string };
      Metal: { percent: number; status: string; desc: string };
      Water_element: { percent: number; status: string; desc: string }; // Standardize elements
      Wood: { percent: number; status: string; desc: string };
      Fire: { percent: number; status: string; desc: string };
    };
    overallScore: number;
  };
  arrows: Array<{
    name: string;
    numbers: number[];
    isActive: boolean;
    isNegative: boolean;
    meaning: string;
    impact: string;
    career: string;
    relationship: string;
    advice: string;
  }>;
  personality: {
    communication: string;
    thinking: string;
    decisionMaking: string;
    learning: string;
    confidence: string;
    socialNature: string;
    emotionalIntelligence: string;
    leadership: string;
    creativity: string;
    discipline: string;
    patience: string;
    stressHandling: string;
    adaptability: string;
    summary: string;
  };
  character: {
    strengths: string[];
    weaknesses: string[];
    hiddenTalents: string;
    innerNature: string;
    outerPersonality: string;
    habits: string;
    mentalEnergy: string;
    emotionalEnergy: string;
    spiritualEnergy: string;
    pressureBehavior: string;
    successBehavior: string;
    failureBehavior: string;
  };
  career: {
    bestCareers: string[];
    suitability: Array<{ field: string; percentage: number }>;
    advice: string;
  };
  wealth: {
    moneyMindset: string;
    savingsHabit: string;
    financialGrowth: string;
    investmentNature: string;
    riskTaking: string;
    luxuryAttraction: string;
    propertyPotential: string;
    passiveIncome: string;
    rating: 'Excellent' | 'Good' | 'Average' | 'Weak';
    score: number;
  };
  relationship: {
    loveNature: string;
    marriageCompatibility: string;
    communication: string;
    trust: string;
    emotionalNeeds: string;
    familyLife: string;
    compatibilityLevel: number; // percentage
    romanticBehavior: string;
    challenges: string;
    advice: string;
  };
  health: {
    stressLevels: string;
    wellness: string;
    energy: string;
    sleep: string;
    digestion: string;
    tendencies: string[];
    suggestions: string[];
  };
  spiritual: {
    intuition: string;
    meditationAbility: string;
    karma: string;
    lifeLessons: string;
    pastLife: string;
    soulGrowth: string;
    purpose: string;
  };
  challenges: {
    biggest: string;
    hiddenEnemy: string;
    blocks: string;
    fears: string;
    beliefs: string;
    transformation: string;
  };
  luckyFactors: {
    numbers: number[];
    dates: number[];
    days: string[];
    colors: string[];
    directions: string[];
    metals: string[];
    gemstones: string[];
    months: string[];
    careers: string[];
  };
  unluckyFactors: {
    numbers: number[];
    habitsToAvoid: string[];
    weakPeriods: string[];
    negativeTraits: string[];
    riskAreas: string[];
  };
  compatibility: {
    bestNumbers: number[];
    worstNumbers: number[];
    businessPartner: string;
    marriagePartner: string;
    friendship: string;
    professionalNetwork: string;
  };
  annualPrediction: {
    year: number;
    personalYearNumber: number;
    career: string;
    money: string;
    love: string;
    health: string;
    travel: string;
    family: string;
    spiritual: string;
  };
  remedies: {
    morningRoutine: string;
    meditation: string;
    affirmations: string[];
    colors: string[];
    numbers: number[];
    lifestyleImprovements: string[];
    charity: string;
    mantras: string[];
    gemstoneGuidance: string;
  };
  dashboardRatings: {
    personality: number; // stars 1-5
    career: number;
    money: number;
    marriage: number;
    health: number;
    spirituality: number;
    leadership: number;
    confidence: number;
    overallScore: number;
  };
  aiNarrative: string;
}

// 🔮 Traditional Driver & Conductor Numerical Compatibility Matrix (Chaldean & Lo Shu system)
const COMPATIBILITY_MATRIX: Record<number, Record<number, 'Excellent' | 'Good' | 'Average' | 'Weak'>> = {
  1: { 1: 'Good', 2: 'Excellent', 3: 'Excellent', 4: 'Average', 5: 'Excellent', 6: 'Weak', 7: 'Good', 8: 'Weak', 9: 'Excellent' },
  2: { 1: 'Excellent', 2: 'Good', 3: 'Excellent', 4: 'Average', 5: 'Good', 6: 'Average', 7: 'Excellent', 8: 'Weak', 9: 'Excellent' },
  3: { 1: 'Excellent', 2: 'Excellent', 3: 'Good', 4: 'Average', 5: 'Excellent', 6: 'Weak', 7: 'Good', 8: 'Average', 9: 'Excellent' },
  4: { 1: 'Average', 2: 'Average', 3: 'Average', 4: 'Good', 5: 'Excellent', 6: 'Good', 7: 'Good', 8: 'Excellent', 9: 'Average' },
  5: { 1: 'Excellent', 2: 'Good', 3: 'Excellent', 4: 'Excellent', 5: 'Good', 6: 'Excellent', 7: 'Good', 8: 'Good', 9: 'Excellent' },
  6: { 1: 'Weak', 2: 'Average', 3: 'Weak', 4: 'Good', 5: 'Excellent', 6: 'Good', 7: 'Excellent', 8: 'Good', 9: 'Good' },
  7: { 1: 'Good', 2: 'Excellent', 3: 'Good', 4: 'Good', 5: 'Good', 6: 'Excellent', 7: 'Good', 8: 'Average', 9: 'Good' },
  8: { 1: 'Weak', 2: 'Weak', 3: 'Average', 4: 'Excellent', 5: 'Good', 6: 'Good', 7: 'Average', 8: 'Good', 9: 'Weak' },
  9: { 1: 'Excellent', 2: 'Excellent', 3: 'Excellent', 4: 'Average', 5: 'Excellent', 6: 'Good', 7: 'Good', 8: 'Weak', 9: 'Good' }
};

// Translations & Localized Copy database
const LOCALIZED_COPY = {
  en: {
    elements: {
      Water: "Water (North, Career, Flow)",
      Earth: "Earth (Center/NE/SW, Stability, Wisdom)",
      Wood: "Wood (East/SE, Growth, Creativity)",
      Metal: "Metal (West/NW, Logic, Structure)",
      Fire: "Fire (South, Reputation, Passion)"
    },
    generations: {
      boomer: "Baby Boomer (Post-war builders)",
      genx: "Generation X (Resilient independent)",
      millennial: "Millennial (Digital Pioneers)",
      genz: "Generation Z (Connected Seekers)",
      alpha: "Generation Alpha (Future Visionaries)"
    }
  },
  hi: {
    elements: {
      Water: "जल (उत्तर, करियर, प्रवाह)",
      Earth: "पृथ्वी (केंद्र/पूर्वोत्तर/दक्षिण-पश्चिम, स्थिरता, ज्ञान)",
      Wood: "काष्ठ/लकड़ी (पूर्व/दक्षिण-पूर्व, विकास, रचनात्मकता)",
      Metal: "धातु (पश्चिम/उत्तर-पश्चिम, तर्क, संरचना)",
      Fire: "अग्नि (दक्षिण, प्रतिष्ठा, जुनून)"
    },
    generations: {
      boomer: "बेबी बूमर (युद्ध के बाद के निर्माता)",
      genx: "जेनरेशन एक्स (लचीले स्वतंत्र)",
      millennial: "मिलेनियल (डिजिटल अग्रणी)",
      genz: "जेनरेशन जेड (जुड़े हुए साधक)",
      alpha: "जेनरेशन अल्फा (भविष्य के दूरदर्शी)"
    }
  },
  gu: {
    elements: {
      Water: "જળ (ઉત્તર, કારકિર્દી, પ્રવાહ)",
      Earth: "પૃથ્વી (કેન્દ્ર/ઈશાન/નૈઋત્ય, સ્થિરતા, જ્ઞાન)",
      Wood: "કાષ્ટ (પૂર્વ/અગ્નિ, વિકાસ, સર્જનાત્મકતા)",
      Metal: "ધાતુ (પશ્ચિમ/વાયવ્ય, તર્ક, બંધારણ)",
      Fire: "અગ્નિ (દક્ષિણ, પ્રતિષ્ઠા, ઉત્સાહ)"
    },
    generations: {
      boomer: "બેબી બૂમર (યુદ્ધ પછીના સ્થાપક)",
      genx: "જેનરેશન એક્સ (સ્વતંત્ર સેનાની)",
      millennial: "મિલેનિયલ (ડિજિટલ પ્રણેતા)",
      genz: "જેનરેશન ઝેડ (જ્ઞાન પીપાસુ)",
      alpha: "જેનરેશન આલ્ફા (ભવિષ્યના સ્વપ્નદ્રષ્ટા)"
    }
  }
};

export const calculateDriverAndConductor = (dobString: string) => {
  if (!dobString) return { driver: 1, conductor: 1, day: 1, month: 1, year: 2000 };
  const [y, m, d] = dobString.split('-').map(Number);
  
  const reduceToSingle = (num: number): number => {
    let res = num;
    while (res > 9) {
      res = res.toString().split('').reduce((sum, char) => sum + parseInt(char, 10), 0);
    }
    return res;
  };

  const driver = reduceToSingle(d);
  
  // Calculate Conductor (sum of all digits in DOB)
  const dobDigitsStr = `${d}${m}${y}`;
  const totalSum = dobDigitsStr.split('').reduce((sum, char) => sum + parseInt(char, 10), 0);
  const conductor = reduceToSingle(totalSum);

  return { driver, conductor, day: d, month: m, year: y };
};

export const generateReport = (dobString: string, lang: Language = 'en'): NumerologyReport => {
  const { driver, conductor, day, month, year } = calculateDriverAndConductor(dobString);
  
  // Create all grid counts (ONLY from actual digits present in DOB)
  const gridCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
  const dStr = day.toString().padStart(2, '0');
  const mStr = month.toString().padStart(2, '0');
  const yStr = year.toString().padStart(4, '0');
  const birthDigits = `${dStr}${mStr}${yStr}`;
  
  for (const char of birthDigits) {
    const digit = parseInt(char, 10);
    if (digit >= 1 && digit <= 9) {
      gridCounts[digit]++;
    }
  }

  if (conductor >= 1 && conductor <= 9) {
    gridCounts[conductor]++;
  }

  // Personal Year and Month
  const currentYear = 2026; // Current system year from local metadata
  const currentMonth = 7;   // July
  const pySum = day + month + currentYear;
  const reduceToSingle = (num: number): number => {
    let res = num;
    while (res > 9) {
      res = res.toString().split('').reduce((s, c) => s + parseInt(c, 10), 0);
    }
    return res;
  };
  const personalYear = reduceToSingle(pySum);
  const personalMonth = reduceToSingle(personalYear + currentMonth);

  const age = currentYear - year;
  
  let generation = LOCALIZED_COPY[lang].generations.millennial;
  if (year >= 1946 && year <= 1964) generation = LOCALIZED_COPY[lang].generations.boomer;
  else if (year >= 1965 && year <= 1980) generation = LOCALIZED_COPY[lang].generations.genx;
  else if (year >= 1997 && year <= 2012) generation = LOCALIZED_COPY[lang].generations.genz;
  else if (year >= 2013) generation = LOCALIZED_COPY[lang].generations.alpha;

  // Last digit of year element
  const yearLastDigit = year % 10;
  let elementKey: 'Water' | 'Earth' | 'Wood' | 'Fire' | 'Metal' = 'Earth';
  if (yearLastDigit === 0 || yearLastDigit === 1) elementKey = 'Metal';
  else if (yearLastDigit === 2 || yearLastDigit === 3) elementKey = 'Water';
  else if (yearLastDigit === 4 || yearLastDigit === 5) elementKey = 'Wood';
  else if (yearLastDigit === 6 || yearLastDigit === 7) elementKey = 'Fire';

  const birthElement = LOCALIZED_COPY[lang].elements[elementKey];

  // Yin Yang
  const yinCount = Object.keys(gridCounts).filter(n => parseInt(n) % 2 === 0 && gridCounts[parseInt(n)] > 0).length;
  const yangCount = Object.keys(gridCounts).filter(n => parseInt(n) % 2 !== 0 && gridCounts[parseInt(n)] > 0).length;
  
  let yinYangDesc = lang === 'en' 
    ? "Balanced energy spectrum representing perfect synergy of logic and intuition."
    : lang === 'hi' 
      ? "तर्क और अंतर्ज्ञान के सही तालमेल का प्रतिनिधित्व करने वाला संतुलित ऊर्जा स्पेक्ट्रम।"
      : "તર્ક અને અંતર્જ્ઞાનના સંપૂર્ણ સુમેળનું પ્રતિનિધિત્વ કરતું સંતુલિત ઊર્જા સ્પેક્ટ્રમ.";

  if (yinCount > yangCount + 1) {
    yinYangDesc = lang === 'en'
      ? "Higher Yin energy indicates a deep affinity for tranquility, emotional receptivity, and careful strategy."
      : lang === 'hi'
        ? "उच्च यिन ऊर्जा शांति, भावनात्मक संवेदनशीलता और सावधानीपूर्वक रणनीति के लिए गहरी आत्मीयता का संकेत देती है।"
        : "ઉચ્ચ યિન ઊર્જા શાંતિ, ભાવનાત્મક સંવેદનશીલતા અને સાવચેતીભરી વ્યૂહરચના માટે ઊંડી આત્મીયતા સૂચવે છે.";
  } else if (yangCount > yinCount + 1) {
    yinYangDesc = lang === 'en'
      ? "Higher Yang energy drives active leadership, high-octane physical drive, and direct external action."
      : lang === 'hi'
        ? "उच्च यांग ऊर्जा सक्रिय नेतृत्व, उच्च भौतिक ऊर्जा और प्रत्यक्ष बाहरी क्रिया को प्रेरित करती है।"
        : "ઉચ્ચ યાંગ ઊર્જા સક્રિય નેતૃત્વ, ઉચ્ચ ભૌતિક ઊર્જા અને પ્રત્યક્ષ બાહ્ય ક્રિયાને પ્રેરિત કરે છે.";
  }

  // Section 3: Number Frequency Analysis & 4: Missing Numbers
  const numberNames = {
    en: ["", "Communication & Leadership", "Sensitivity & Partnerships", "Creativity & Knowledge", "Discipline & Structure", "Freedom & Change", "Responsibility & Luxury", "Spirituality & Intuition", "Power & Authority", "Compassion & Fame"],
    hi: ["", "नेतृत्व और संवाद", "संवेदनशीलता और साझेदारी", "ज्ञान और रचनात्मकता", "अनुशासन और योजना", "स्वतंत्रता और विस्तार", "भौतिक सुख और जिम्मेदारी", "अध्यात्म और विश्लेषण", "सत्ता और न्याय", "करुणा और ऊर्जा"],
    gu: ["", "નેતૃત્વ અને સંવાદ", "સંવેદનશીલતા અને ભાગીદારી", "જ્ઞાન અને સર્જનાત્મકતા", "શિસ્ત અને આયોજન", "સ્વતંત્રતા અને સંશોધન", "ભૌતિક સુખ અને જવાબદારી", "અધ્યાત્મ અને વિશ્લેષણ", "સત્તા અને ન્યાય", "કરુણા અને ઉર્જા"]
  };

  const numberMeaningsBase = {
    en: [
      "",
      "Represents the Sun, communication, self-expression, and individual identity.",
      "Represents the Moon, emotional depth, sensitivity, collaboration, and partnerships.",
      "Represents Jupiter, wisdom, creativity, active imagination, and learning.",
      "Represents Rahu, structure, order, meticulous planning, and practical stability.",
      "Represents Mercury, freedom, business acumen, balance, and adaptability.",
      "Represents Venus, love, luxury, family responsibility, and aesthetic taste.",
      "Represents Ketu, mystical intuition, analytical research, and spiritual lessons.",
      "Represents Saturn, execution power, organizational capability, and financial stability.",
      "Represents Mars, cosmic compassion, high physical vitality, and dynamic energy."
    ],
    hi: [
      "",
      "सूर्य का प्रतिनिधित्व करता है, जो संवाद, आत्मविश्वास और व्यक्तिगत पहचान दर्शाता है।",
      "चंद्रमा का प्रतिनिधित्व करता है, जो भावनात्मक गहराई, सहयोग और साझेदारी दर्शाता है।",
      "गुरु का प्रतिनिधित्व करता है, जो ज्ञान, रचनात्मकता और आध्यात्मिक विकास दर्शाता है।",
      "राहु का प्रतिनिधित्व करता है, जो संरचना, व्यवस्था और व्यावहारिक स्थिरता लाता है।",
      "बुध का प्रतिनिधित्व करता है, जो व्यापारिक सूझबूझ, स्वतंत्रता और अनुकूलन क्षमता दर्शाता है।",
      "शुक्र का प्रतिनिधित्व करता है, जो कला, भौतिक सुख, विलासिता और पारिवारिक जिम्मेदारी दर्शाता है।",
      "केतु का प्रतिनिधित्व करता है, जो गहन आध्यात्मिक अंतर्ज्ञान, अनुसंधान और शोध दर्शाता है।",
      "शनि का प्रतिनिधित्व करता है, जो अधिकार, कार्य कौशल, संगठन और वित्तीय शक्ति दर्शाता है।",
      "मंगल का प्रतिनिधित्व करता है, जो सार्वभौमिक करुणा, उच्च ऊर्जा और दृढ़ इच्छाशक्ति दर्शाता है।"
    ],
    gu: [
      "",
      "સૂર્યનું પ્રતિનિધિત્વ કરે છે, જે સંવાદ, આત્મવિશ્વાસ અને વ્યક્તિગત ઓળખ દર્શાવે છે.",
      "ચંદ્રનું પ્રતિનિધિત્વ કરે છે, જે ભાવનાત્મક ઊંડાણ, સહયોગ અને ભાગીદારી દર્શાવે છે.",
      "ગુરુનું પ્રતિનિધિત્વ કરે છે, જે જ્ઞાન, સર્જનાત્મકતા અને આધ્યાત્મિક પ્રગતિ દર્શાવે છે.",
      "રાહુનું પ્રતિનિધિત્વ કરે છે, જે વ્યવસ્થિત આયોજન, મહેનત અને વ્યવહારિક સ્થિરતા લાવે છે.",
      "બુધનું પ્રતિનિધિત્વ કરે છે, જે વ્યાપારી સૂઝબૂઝ, સ્વતંત્રતા અને અનુકૂલનક્ષમતા દર્શાવે છે.",
      "શુક્રનું પ્રતિનિધિત્વ કરે છે, જે કળા, ભૌતિક સુખ, વૈભવ અને પારિવારિક જવાબદારી દર્શાવે છે.",
      "કેતુનું પ્રતિનિધિત્વ કરે છે, જે ગહન આધ્યાત્મિક અંતર્જ્ઞાન અને સંશોધન દર્શાવે છે.",
      "શનિનું પ્રતિનિધિત્વ કરે છે, જે અધિકાર, સંગઠન શક્તિ અને આર્થિક સમૃદ્ધિ દર્શાવે છે.",
      "મંગળનું પ્રતિનિધિત્વ કરે છે, જે સાર્વત્રિક કરુણા, ઉચ્ચ ઉર્જા અને મક્કમ ઈચ્છાશક્તિ દર્શાવે છે."
    ]
  };

  const numberStrengths = {
    en: [
      "",
      "Excellent leadership qualities, confident communication, and pioneering spirit.",
      "Strong empathetic bond, outstanding diplomacy, and intuitive understanding.",
      "Immense artistic creativity, natural teaching ability, and positive expression.",
      "Methodical planning, solid discipline, and high attention to detail.",
      "Superb business adaptability, excellent salesmanship, and love of freedom.",
      "Affinity for luxury, deep artistic taste, and caring family devotion.",
      "Brilliant analytical brain, spiritual inclination, and strong inner compass.",
      "Tremendous capacity for hard work, executive focus, and material gain.",
      "Highly compassionate nature, humanitarian goals, and courage."
    ],
    hi: [
      "",
      "बेहतरीन नेतृत्व क्षमता, स्पष्ट संवाद और नई शुरुआत करने की शक्ति।",
      "गहरी सहानुभूति, उत्कृष्ट कूटनीति और दूसरों की भावनाओं को समझने की कला।",
      "अद्भुत कलात्मकता, सहज शिक्षण क्षमता और सकारात्मक अभिव्यक्ति।",
      "व्यवस्थित योजना, ठोस अनुशासन और बारीकियों पर ध्यान देने की क्षमता।",
      "शानदार व्यापारिक अनुकूलन क्षमता, प्रभावी भाषण कौशल और स्वतंत्र विचार।",
      "भौतिक सुखों और विलासिता के प्रति प्रेम, कलात्मक रुचि और पारिवारिक लगाव।",
      "शानदार विश्लेषणात्मक दिमाग, आध्यात्मिक झुकाव और मजबूत अंतरात्मा।",
      "कठिन परिश्रम की असाधारण क्षमता, प्रशासनिक ध्यान और धन लाभ।",
      "अत्यंत दयालु स्वभाव, मानवीय उद्देश्य और साहसी दृष्टिकोण।"
    ],
    gu: [
      "",
      "ઉત્તમ નેતૃત્વ ક્ષમતા, સ્પષ્ટ સંવાદ અને નવી શરૂઆત કરવાની શક્તિ.",
      "ઊંડી સહાનુભૂતિ, ઉત્કૃષ્ટ મુત્સદ્દીગીરી અને અન્યોના ભાવો સમજવાની કળા.",
      "અદ્ભુત કલાત્મકતા, સહજ શૈક્ષણિક ક્ષમતા અને હકારાત્મક અભિવ્યક્તિ.",
      "વ્યવસ્થિત આયોજન, નક્કર શિસ્ત અને વિગતો પર વિશેષ ધ્યાન.",
      "શ્રેષ્ઠ વ્યાપારી અનુકૂલનક્ષમતા, પ્રભાવશાળી વક્તૃત્વ અને સ્વતંત્ર વિચાર.",
      "ભૌતિક સુખો અને વૈભવ પ્રત્યે લગાવ, કલાત્મક રુચિ અને પારિવારિક સ્નેહ.",
      "તેજસ્વી વિશ્લેષણાત્મક મન, આધ્યાત્મિક વલણ અને મજબૂત અંતરાત્મા.",
      "કઠોર પરિશ્રમની અસાધારણ ક્ષમતા, વહીવટી ધ્યાન અને આર્થિક લાભ.",
      "અત્યંત દયાળુ સ્વભાવ, માનવીય કાર્યો અને સાહસિક અભિગમ."
    ]
  };

  const numberWeaknesses = {
    en: [
      "",
      "Can border on egoism, reluctance to listen, or self-centered drives.",
      "Prone to emotional over-sensitivity, mood swings, and codependence.",
      "Occasional scatter-brained focus, exaggerations, or impatience.",
      "Can become rigid, overly skeptical, or stubborn in routines.",
      "May lead to restlessness, impulsivity, or inability to settle.",
      "Tendency to smother loved ones, overspend on comfort, or avoid conflict.",
      "Risk of social isolation, over-analyzing simple things, or skepticism.",
      "Can suffer from slow progress initially, power struggles, or coldness.",
      "Vulnerable to emotional anger outbursts, idealism crashes, or impatience."
    ],
    hi: [
      "",
      "अहंकार, दूसरों की बात न सुनना या आत्मकेंद्रित व्यवहार की संभावना।",
      "अत्यधिक संवेदनशीलता, मूड में बदलाव और दूसरों पर अधिक निर्भरता।",
      "अस्थिर ध्यान, अतिशयोक्ति या कभी-कभी अधैर्य।",
      "लचीलेपन की कमी, अत्यधिक संशय या विचारों में अड़ियलपन।",
      "बेचैनी, जल्दबाजी में निर्णय लेना या काम में निरंतरता की कमी।",
      "दूसरों पर नियंत्रण की इच्छा, विलासिता पर फिजूलखर्ची या संघर्षों से बचना।",
      "सामाजिक रूप से अलग होना, साधारण बातों का अधिक विश्लेषण करना या अत्यधिक संदेह।",
      "शुरुआती जीवन में धीमी प्रगति, सत्ता संघर्ष या कठोर व्यवहार की संभावना।",
      "क्रोध के अचानक झटके, अत्यधिक आदर्शवाद या अधीरता।"
    ],
    gu: [
      "",
      "અહંકાર, અન્યોની વાત ન સાંભળવી અથવા સ્વાર્થી વર્તનની સંભાવના.",
      "અત્યંત સંવેદનશીલતા, મૂડ સ્વિંગ અને અન્યો પર વધુ પડતી નિર્ભરતા.",
      "અસ્થિર ધ્યાન, અતિશયોક્તિ અથવા ક્યારેક અધીરાઈ.",
      "પરિવર્તન સ્વીકારવામાં આળસ, અતિશય સંશય અથવા જિદ્દી વલણ.",
      "બેચેની, ઉતાવળમાં નિર્ણયો લેવા અથવા કાર્યમાં સાતત્યનો અભાવ.",
      "અન્યો પર અંકુશ રાખવાની ઈચ્છા, ભૌતિકતા પાછળ વધુ ખર્ચ અથવા વિવાદો ટાળવા.",
      "સામાજિક રીતે એકલા રહેવું, સામાન્ય બાબતોનું વધુ વિશ્લેષણ કે વધુ પડતો સંદેહ.",
      "શરૂઆતના જીવનમાં ધીમી પ્રગતિ, સત્તા સંઘર્ષ કે કઠોર વર્તનની સંભાવના.",
      "ગુસ્સાનું અચાનક પ્રમાણ, અતિશય આદર્શવાદ અથવા અધીરાઈ."
    ]
  };

  const numberPotentials = {
    en: [
      "",
      "To lead major organizations, initiate global changes, and drive self-made success.",
      "To foster world-class healing relationships, consult at premium levels, and act intuitively.",
      "To author artistic works, speak publicly, inspire with wisdom, and guide with philosophy.",
      "To engineer robust corporate empires, manage systemic projects, and provide solid pillars.",
      "To master entrepreneurship, expand international trade networks, and innovate dynamically.",
      "To beautify spaces, manage grand hospitality chains, and sustain deeply protective family legacies.",
      "To unlock hidden scientific mysteries, heal spiritually, and consult on metaphysical planes.",
      "To command financial markets, acquire real estate wealth, and master material physics.",
      "To champion global humanitarian movements, heal in large circles, and lead with cosmic bravery."
    ],
    hi: [
      "",
      "बड़े संगठनों का नेतृत्व करना, वैश्विक परिवर्तन लाना और आत्म-निर्मित सफलता हासिल करना।",
      "उच्च स्तर पर परामर्श देना, उत्कृष्ट संबंध बनाना और अंतर्ज्ञान के साथ कार्य करना।",
      "कलात्मक रचनाएँ लिखना, प्रभावी सार्वजनिक भाषण देना और दर्शन से लोगों को प्रेरित करना।",
      "मजबूत व्यापारिक साम्राज्य खड़ा करना, बड़ी परियोजनाओं का प्रबंधन और ठोस आधार प्रदान करना।",
      "उद्यमिता में महारत हासिल करना, अंतर्राष्ट्रीय व्यापार का विस्तार और गतिशील नवाचार।",
      "सुंदर वातावरण का निर्माण करना, आतिथ्य क्षेत्र में पहचान बनाना और पारिवारिक विरासत संभालना।",
      "रहस्यों को उजागर करना, आध्यात्मिक चिकित्सा प्रदान करना और गूढ़ विद्याओं का विशेषज्ञ बनना।",
      "वित्तीय बाजारों पर नियंत्रण, रियल एस्टेट में बड़ी सफलता और भौतिक समृद्धि पाना।",
      "वैश्विक मानवीय आंदोलनों का नेतृत्व करना, बड़े पैमाने पर चिकित्सा प्रदान करना और साहस से कार्य करना।"
    ],
    gu: [
      "",
      "મોટા સંગઠનોનું નેતૃત્વ કરવું, વૈશ્વિક પરિવર્તન લાવવું અને સ્વનિર્મિત સફળતા મેળવવી.",
      "ઉચ્ચ સ્તરે પરામર્શ આપવો, ઉત્કૃષ્ટ સંબંધો વિકસાવવા અને અંતર્જ્ઞાનથી કાર્ય કરવું.",
      "કલાત્મક રચનાઓ લખવી, પ્રભાવશાળી વક્તવ્ય આપવું અને દર્શનથી લોકોને પ્રેરિત કરવા.",
      "મજબૂત વ્યાપારિક સામ્રાજ્ય ઊભું કરવું, મોટી યોજનાઓનું સંચાલન અને નક્કર આધાર આપવો.",
      "ઉદ્યોગસાહસિકતામાં નિપુણતા મેળવવી, આંતરરાષ્ટ્રીય વ્યાપારનો વિસ્તાર અને નવીન આયોજન.",
      "સુંદર વાતાવરણનું સર્જન કરવું, હોસ્પિટાલિટી ક્ષેત્રે ઓળખ મેળવવી અને પારિવારિક વિરાસત જાળવવી.",
      "રહસ્યોને ઉજાગર કરવા, આધ્યાત્મિક સારવાર આપવી અને ગૂઢ વિદ્યાઓના નિષ્ણાત બનવું.",
      "આર્થિક બજારો પર નિયંત્રણ, રિયલ એસ્ટેટમાં મોટી સફળતા અને ભૌતિક સમૃદ્ધિ મેળવવી.",
      "વૈશ્વિક માનવીય પ્રવૃત્તિઓનું નેતૃત્વ કરવું, મોટા પાયે સારવાર આપવી અને સાહસથી કાર્ય કરવું."
    ]
  };

  const numberAnalysis = [];
  const missingNumbers = [];

  for (let num = 1; num <= 9; num++) {
    const count = gridCounts[num] || 0;
    const name = numberNames[lang][num];
    const meaningBase = numberMeaningsBase[lang][num];
    const strength = numberStrengths[lang][num];
    const weakness = numberWeaknesses[lang][num];
    const potential = numberPotentials[lang][num];

    // Build interactive interpretation based on count
    let meaning = "";
    let energyLevel = 0;
    
    if (count === 0) {
      energyLevel = 10;
      if (lang === 'en') {
        meaning = `${meaningBase} However, this number is missing in your grid, indicating a key life lesson or blocked energy in this department.`;
      } else if (lang === 'hi') {
        meaning = `${meaningBase} हालांकि, यह नंबर आपके ग्रिड में अनुपस्थित है, जो इस क्षेत्र में एक महत्वपूर्ण जीवन पाठ या अवरुद्ध ऊर्जा को दर्शाता है।`;
      } else {
        meaning = `${meaningBase} જો કે, આ નંબર તમારા ગ્રીડમાં ખૂટે છે, જે આ ક્ષેત્રમાં એક મહત્વપૂર્ણ જીવન પાઠ અથવા અવરોધાયેલ ઊર્જા સૂચવે છે.`;
      }
      
      // Missing details
      const missingEffects = {
        en: [
          "",
          "Difficulty expressing emotions or taking independent initiatives; seeks external approval.",
          "Struggles with intuitive connection and emotional partnerships; feels isolated.",
          "Challenges with focus, creative outlets, or receiving higher wisdom; doubting abilities.",
          "Lack of discipline, organizing capacity, or systematic application in life; struggles to settle.",
          "Struggles with financial stability, public communication, or business courage; instability.",
          "Difficulty enjoying life comforts, taking domestic responsibilities, or expressing charm.",
          "Struggles with deeper research, trusting intuition, or finding spiritual stability.",
          "Financial inconsistency, struggles with authority, or lack of logical power structure.",
          "Lack of drive, passion, or global compassion; struggles to gain fame and social success."
        ],
        hi: [
          "",
          "भावनाओं को व्यक्त करने या स्वतंत्र निर्णय लेने में कठिनाई; बाहरी अनुमोदन की तलाश।",
          "सहज संबंध और भावनात्मक साझेदारी में संघर्ष; अकेलापन महसूस होना।",
          "ध्यान केंद्रित करने, रचनात्मकता या उच्च ज्ञान प्राप्त करने में चुनौतियाँ; क्षमताओं पर संदेह।",
          "अनुशासन, आयोजन क्षमता या व्यवस्थित दृष्टिकोण की कमी; जीवन में स्थिरता के लिए संघर्ष।",
          "वित्तीय स्थिरता, सार्वजनिक संवाद या व्यावसायिक साहस में कमी; अस्थिरता।",
          "जीवन की सुख-सुविधाओं का आनंद लेने, घरेलू जिम्मेदारियों या आकर्षण व्यक्त करने में कठिनाई।",
          "गहन खोज करने, अंतर्ज्ञान पर भरोसा करने या आध्यात्मिक स्थिरता पाने में संघर्ष।",
          "आर्थिक अस्थिरता, अधिकार क्षेत्र में संघर्ष या तार्किक शक्ति संरचना की कमी।",
          "ऊर्जा, जुनून या दयालुता की कमी; प्रसिद्धि और सामाजिक सफलता प्राप्त करने में संघर्ष।"
        ],
        gu: [
          "",
          "ભાવનાઓ વ્યક્ત કરવામાં કે સ્વતંત્ર નિર્ણય લેવામાં મુશ્કેલી; બાહ્ય અનુમોદનની શોધ.",
          "સહજ સંબંધ અને ભાવનાત્મક ભાગીદારીમાં સંઘર્ષ; એકલતાનો અનુભવ.",
          "ધ્યાન કેન્દ્રિત કરવામાં, સર્જનાત્મકતા કે ઉચ્ચ જ્ઞાન મેળવવામાં પડકારો; ક્ષમતાઓ પર શંકા.",
          "શિસ્ત, આયોજન ક્ષમતા કે વ્યવસ્થિત અભિગમનો અભાવ; જીવનમાં સ્થિરતા માટે સંઘર્ષ.",
          "આર્થિક સ્થિરતા, જાહેર સંવાદ કે વ્યાપારિક સાહસમાં કમી; અસ્થિરતા.",
          "જીવનની સુખ-સુવિધાઓનો આનંદ લેવામાં, ઘરેલું જવાબદારીઓ કે આકર્ષણ વ્યક્ત કરવામાં મુશ્કેલી.",
          "ગહન સંશોધન કરવા, અંતર્જ્ઞાન પર ભરોસો કરવા કે આધ્યાત્મિક સ્થિરતા મેળવવામાં સંઘર્ષ.",
          "આર્થિક અસ્થિરતા, અધિકાર ક્ષેત્રમાં સંઘર્ષ અથવા તાર્કિક શક્તિ માળખાનો અભાવ.",
          "ઉર્જા, ઉત્સાહ કે દયાભાવની કમી; ખ્યાતિ અને સામાજિક સફળતા મેળવવામાં સંઘર્ષ."
        ]
      };

      const missingRemedies = {
        en: [
          "",
          "Wear a gold or copper ring. Face East while doing deep breathing exercises in the morning.",
          "Keep a silver coin or cup of water near your bed. Wear light colors, white, and silver jewelry.",
          "Wear yellow sapphire or golden citrine. Respect teachers, mentors, and seek constant learning.",
          "Keep a wooden pen or artifact with you. Work with structured schedules and diaries daily.",
          "Wear green emerald. Install a green aventurine crystal on your study or work table.",
          "Wear white or light pink clothes. Use pleasant rose fragrances or perfumes frequently.",
          "Keep a cat's eye stone or multi-colored metal ring. Meditate on your breath in silence.",
          "Wear blue/black sapphire or a metal bracelet on your right wrist. Help laborers and under-privileged people.",
          "Wear red clothes or keep a red handkerchief. Install red lights in the south corner of your room."
        ],
        hi: [
          "",
          "सोने या तांबे की अंगूठी पहनें। सुबह पूर्व दिशा की ओर मुंह करके गहरी सांस लेने का अभ्यास करें।",
          "अपने बिस्तर के पास चांदी का सिक्का या पानी का पात्र रखें। हल्के रंग, सफेद कपड़े और चांदी के गहने पहनें।",
          "पीला पुखराज या सिट्रीन पहनें। शिक्षकों और गुरुओं का सम्मान करें और निरंतर सीखते रहें।",
          "अपने पास लकड़ी का पेन रखें। दैनिक जीवन में व्यवस्थित समय-सारणी का उपयोग करें।",
          "हरा पन्ना पहनें। अपनी मेज पर ग्रीन एवेन्चुराइन क्रिस्टल स्थापित करें।",
          "सफेद या हल्के गुलाबी कपड़े पहनें। गुलाब की सुगंध या इत्र का नियमित उपयोग करें।",
          "लहसुनिया (कैट्स आई) रत्न धारण करें। मौन रहकर अपनी सांसों पर ध्यान केंद्रित करें।",
          "दाहिने हाथ में धातु का कड़ा पहनें। जरूरतमंदों और मजदूरों की मदद करें।",
          "लाल कपड़े पहनें या लाल रुमाल पास रखें। कमरे के दक्षिण कोने में लाल रंग का प्रकाश रखें।"
        ],
        gu: [
          "",
          "સોના અથવા તાંબાની વીંટી પહેરો. સવારે પૂર્વ દિશા તરફ મોં રાખીને ઊંડા શ્વાસ લેવાનો અભ્યાસ કરો.",
          "તમારા પલંગ પાસે ચાંદીનો સિક્કો કે પાણીનું પાત્ર રાખો. હળવા રંગો, સફેદ કપડાં અને ચાંદીના ઘરેણાં પહેરો.",
          "પીળો પુખરાજ કે સિટ્રીન પહેરો. શિક્ષકો અને ગુરુઓનું સન્માન કરો અને સતત શીખતા રહો.",
          "તમારી પાસે લાકડાની પેન રાખો. દૈનિક જીવનમાં વ્યવસ્થિત સમયપત્રકનો ઉપયોગ કરો.",
          "લીલું પન્ના પહેરો. તમારી ટેબલ પર ગ્રીન એવેન્ચ્યુરાઈન ક્રિસ્ટલ સ્થાપિત કરો.",
          "સફેદ અથવા હળવા ગુલાબી કપડાં પહેરો. ગુલાબની સુગંધ કે અત્તરનો નિયમિત ઉપયોગ કરો.",
          "લસુણિયા (કેટ્સ આઈ) રત્ન ધારણ કરો. મૌન રહીને તમારા શ્વાસ પર ધ્યાન કેન્દ્રિત કરો.",
          "જમણા હાથમાં ધાતુનું કડું પહેરો. જરૂરિયાતમંદો અને મજૂરોની મદદ કરો.",
          "લાલ કપડાં પહેરો અથવા લાલ રૂમાલ પાસે રાખો. રૂમના દક્ષિણ ખૂણામાં લાલ રંગનો પ્રકાશ રાખો."
        ]
      };

      const missingAdvices = {
        en: [
          "",
          "Start small initiatives. Express your ideas without worrying about judgment.",
          "Spend time near clean natural water bodies, and listen patiently to others.",
          "Write daily journals and participate in creative arts to stimulate Jupiterian wisdom.",
          "Avoid procrastination. Organize your physical wardrobe and documents first.",
          "Establish financial checks and balances. Consult senior advisors before major investments.",
          "Give quality time to family members. Practice selfless acts of giving.",
          "Engage in analytical research, slow down thinking patterns, and accept changes.",
          "Learn practical financial literacy. Meditate during sunset and practice grounding.",
          "Participate in physical activities, sports, or social service to channel dynamic energy."
        ],
        hi: [
          "",
          "छोटी पहल करना शुरू करें। बिना किसी संकोच के अपने विचार व्यक्त करें।",
          "शांत जलाशयों के पास समय बिताएं, और दूसरों की बातों को धैर्यपूर्वक सुनें।",
          "दैनिक डायरी लिखें और ज्ञान को बढ़ाने के लिए रचनात्मक गतिविधियों में भाग लें।",
          "आलस्य से बचें। सबसे पहले अपनी अलमारी और दस्तावेजों को व्यवस्थित करें।",
          "आर्थिक नियंत्रण स्थापित करें। बड़े निवेश से पहले विशेषज्ञों की सलाह लें।",
          "परिवार के सदस्यों को गुणवत्तापूर्ण समय दें। निस्वार्थ सेवा का अभ्यास करें।",
          "विश्लेषणात्मक शोध में शामिल हों, अपने विचारों को धीमा करें और बदलावों को स्वीकार करें।",
          "व्यावहारिक वित्तीय साक्षरता सीखें। सूर्यास्त के समय ध्यान करें और जमीन से जुड़े रहें।",
          "अपनी ऊर्जा को सही दिशा देने के लिए खेलकूद या सामाजिक सेवा में भाग लें।"
        ],
        gu: [
          "",
          "નાની પહેલ કરવાનું શરૂ કરો. કોઈ પણ સંકોચ વિના તમારા વિચારો વ્યક્ત કરો.",
          "શાંત જળાશયો પાસે સમય વિતાવો, અને અન્યોની વાતો ધીરજપૂર્વક સાંભળો.",
          "દૈનિક ડાયરી લખો અને જ્ઞાન વધારવા માટે સર્જનાત્મક પ્રવૃત્તિઓમાં ભાગ લો.",
          "આળસથી બચો. સૌથી પહેલા તમારી કબાટ અને દસ્તાવેજો વ્યવસ્થિત કરો.",
          "આર્થિક નિયંત્રણ સ્થાપિત કરો. મોટા રોકાણ પહેલા નિષ્ણાતોની સલાહ લો.",
          "પરિવારના સભ્યોને સારો સમય આપો. નિઃસ્વાર્થ સેવાનો અભ્યાસ કરો.",
          "વિશ્લેષણાત્મક સંશોધનમાં જોડાઓ, તમારા વિચારોને શાંત કરો અને ફેરફારો સ્વીકારો.",
          "વ્યવહારિક આર્થિક જ્ઞાન મેળવો. સૂર્યાસ્ત સમયે ધ્યાન કરો અને જમીન સાથે જોડાયેલા રહો.",
          "તમારી ઉર્જાને સાચી દિશા આપવા માટે રમતગમત કે સામાજિક સેવામાં ભાગ લો."
        ]
      };

      missingNumbers.push({
        number: num,
        effect: missingEffects[lang][num],
        remedy: missingRemedies[lang][num],
        advice: missingAdvices[lang][num]
      });

    } else if (count === 1) {
      energyLevel = 75;
      if (lang === 'en') {
        meaning = `${meaningBase} Present once in your grid, this represents balanced, stable, and highly functional energy. It operates harmoniously with other traits.`;
      } else if (lang === 'hi') {
        meaning = `${meaningBase} आपके ग्रिड में एक बार उपस्थित होने के कारण, यह संतुलित, स्थिर और अत्यधिक कार्यात्मक ऊर्जा का प्रतिनिधित्व करता है।`;
      } else {
        meaning = `${meaningBase} તમારા ગ્રીડમાં એક વાર હાજર હોવાને કારણે, આ સંતુલિત, સ્થિર અને અત્યંત કાર્યાત્મક ઊર્જાનું પ્રતિનિધિત્વ કરે છે.`;
      }
    } else if (count === 2) {
      energyLevel = 90;
      if (lang === 'en') {
        meaning = `${meaningBase} Present twice in your grid, this indicates enhanced, powerful, and intense vibration. This is a significant strength, multiplying your capabilities.`;
      } else if (lang === 'hi') {
        meaning = `${meaningBase} आपके ग्रिड में दो बार उपस्थित होने के कारण, यह बढ़ी हुई, शक्तिशाली और तीव्र ऊर्जा का संकेत देता है। यह आपकी क्षमताओं को दोगुना करता है।`;
      } else {
        meaning = `${meaningBase} તમારા ગ્રીડમાં બે વાર હાજર હોવાને કારણે, આ વધેલી, શક્તિશાળી અને તીવ્ર ઊર્જા સૂચવે છે. આ તમારી ક્ષમતાઓને બમણી કરે છે.`;
      }
    } else {
      energyLevel = 100;
      if (lang === 'en') {
        meaning = `${meaningBase} Present ${count} times in your grid, this indicates an intense, heavy overload of energy. It amplifies core potentials, but requires careful grounding remedies to avoid hyper-sensitivity or stubbornness.`;
      } else if (lang === 'hi') {
        meaning = `${meaningBase} ग्रिड में ${count} बार उपस्थित होने के कारण, यह अत्यधिक भारी और तीव्र ऊर्जा को दर्शाता है। इसे संतुलित करने के लिए उपायों की आवश्यकता है।`;
      } else {
        meaning = `${meaningBase} ગ્રીડમાં ${count} વાર હાજર હોવાને કારણે, આ અતિશય ભારે અને તીવ્ર ઊર્જા દર્શાવે છે. તેને સંતુલિત કરવા માટે ઉપાયોની જરૂર છે.`;
      }
    }

    numberAnalysis.push({
      number: num,
      count,
      title: name,
      meaning,
      strength,
      weakness,
      potential,
      energyLevel
    });
  }

  // Section 5: Dominant Energy
  const strongest = Object.keys(gridCounts).map(Number).filter(n => gridCounts[n] >= 2);
  const weakest = Object.keys(gridCounts).map(Number).filter(n => gridCounts[n] === 0);
  const balanced = Object.keys(gridCounts).map(Number).filter(n => gridCounts[n] === 1);

  // Element counts and percentage calculations
  const waterCount = gridCounts[1] || 0;
  const earthCount = (gridCounts[2] || 0) + (gridCounts[5] || 0) + (gridCounts[8] || 0);
  const woodCount = (gridCounts[3] || 0) + (gridCounts[4] || 0);
  const metalCount = (gridCounts[6] || 0) + (gridCounts[7] || 0);
  const fireCount = gridCounts[9] || 0;
  const totalElementsSum = waterCount + earthCount + woodCount + metalCount + fireCount || 1;

  const elementPercentages = {
    Water: Math.round((waterCount / totalElementsSum) * 100),
    Earth: Math.round((earthCount / totalElementsSum) * 100),
    Wood: Math.round((woodCount / totalElementsSum) * 100),
    Metal: Math.round((metalCount / totalElementsSum) * 100),
    Fire: Math.round((fireCount / totalElementsSum) * 100)
  };

  const getElementStatus = (pct: number): string => {
    if (pct === 0) return lang === 'en' ? "Missing" : lang === 'hi' ? "अनुपस्थित" : "ગેરહાજર";
    if (pct < 20) return lang === 'en' ? "Moderate" : lang === 'hi' ? "मध्यम" : "મધ્યમ";
    if (pct <= 40) return lang === 'en' ? "Optimal Balance" : lang === 'hi' ? "उत्तम संतुलन" : "ઉત્તમ સંતુલન";
    return lang === 'en' ? "Dominant Intensity" : lang === 'hi' ? "अत्यधिक प्रबल" : "અતિશય પ્રબળ";
  };

  const elementDescs = {
    en: {
      Water: "Controls career growth, communication flow, and adaptability.",
      Earth: "Governs foundational stability, wisdom, and core grounding in reality.",
      Wood: "Governs personal expansion, creativity, learning, and physical health.",
      Metal: "Controls logic, systematic order, financial discipline, and leadership.",
      Fire: "Controls social reputation, active fame, passion, and high vitality."
    },
    hi: {
      Water: "करियर के विकास, संवाद प्रवाह और अनुकूलन क्षमता को नियंत्रित करता है।",
      Earth: "मूल स्थिरता, व्यावहारिक ज्ञान और वास्तविकता से जुड़े रहने को नियंत्रित करता है।",
      Wood: "व्यक्तिगत विस्तार, रचनात्मकता, निरंतर सीखने और स्वास्थ्य को नियंत्रित करता है।",
      Metal: "तर्क, व्यवस्थित व्यवस्था, वित्तीय अनुशासन और नेतृत्व को नियंत्रित करता है।",
      Fire: "सामाजिक प्रतिष्ठा, प्रसिद्धि, जुनून और ऊर्जा स्तर को नियंत्रित करता है।"
    },
    gu: {
      Water: "કારકિર્દીનો વિકાસ, સંવાદ પ્રવાહ અને અનુકૂલનક્ષમતાને નિયંત્રિત કરે છે.",
      Earth: "મૂળ સ્થિરતા, વ્યવહારિક જ્ઞાન અને વાસ્તવિકતા સાથે જોડાયેલા રહેવાનું નિયંત્રિત કરે છે.",
      Wood: "વ્યક્તિગત વિકાસ, સર્જનાત્મકતા, સતત શીખવા અને સ્વાસ્થ્યને નિયંત્રિત કરે છે.",
      Metal: "તર્ક, વ્યવસ્થિત ગોઠવણ, નાણાકીય શિસ્ત અને નેતૃત્વને નિયંત્રિત કરે છે.",
      Fire: "સામાજિક પ્રતિષ્ઠા, ખ્યાતિ, ઉત્સાહ અને ઉર્જા સ્તરને નિયંત્રિત કરે છે."
    }
  };

  const elementsDetail = {
    Water: { percent: elementPercentages.Water, status: getElementStatus(elementPercentages.Water), desc: elementDescs[lang].Water },
    Earth: { percent: elementPercentages.Earth, status: getElementStatus(elementPercentages.Earth), desc: elementDescs[lang].Earth },
    Metal: { percent: elementPercentages.Metal, status: getElementStatus(elementPercentages.Metal), desc: elementDescs[lang].Metal },
    Water_element: { percent: elementPercentages.Water, status: getElementStatus(elementPercentages.Water), desc: elementDescs[lang].Water }, // Duplicate for schema safety
    Wood: { percent: elementPercentages.Wood, status: getElementStatus(elementPercentages.Wood), desc: elementDescs[lang].Wood },
    Fire: { percent: elementPercentages.Fire, status: getElementStatus(elementPercentages.Fire), desc: elementDescs[lang].Fire }
  };

  // Section 6: Arrows Analysis
  const arrowsList = [
    { nameEn: "Arrow of Intellect", nameHi: "बुद्धि का तीर", nameGu: "બુદ્ધિનું તીર", numbers: [4, 9, 2], descEn: "Highly sharp mental power, excellent memorization skills, and analytical strength.", descHi: "अत्यधिक तेज मानसिक शक्ति, उत्कृष्ट स्मरण शक्ति और विश्लेषणात्मक क्षमता।", descGu: "અત્યંત તેજસ્વી માનસિક શક્તિ, ઉત્કૃષ્ટ સ્મરણ શક્તિ અને વિશ્લેષણાત્મક ક્ષમતા.", positiveEn: "Logical thinking, business logic.", positiveHi: "तार्किक सोच, व्यावसायिक सूझबूझ।", positiveGu: "તાર્કિક વિચારણા, વ્યાપારી સૂઝબૂઝ.", negativeEn: "Over-analyzing simplest situations.", negativeHi: "साधारण परिस्थितियों का अत्यधिक विश्लेषण।", negativeGu: "સામાન્ય પરિસ્થિતિઓનું વધુ પડતું વિશ્લેષણ.", careerEn: "Scientific research, data analytics, teaching, corporate consulting.", careerHi: "वैज्ञानिक अनुसंधान, डेटा विश्लेषण, शिक्षण, कॉर्पोरेट परामर्श।", careerGu: "વૈજ્ઞાનિક સંશોધન, ડેટા એનાલિટિક્સ, શિક્ષણ, કોર્પોરેટ કન્સલ્ટિંગ.", relationshipEn: "Communicates logical boundaries; requires warmth.", relationshipHi: "तार्किक सीमाएँ तय करता है; भावनात्मक गर्माहट की आवश्यकता है।", relationshipGu: "તાર્કિક સીમાઓ નક્કી કરે છે; ભાવનાત્મક હૂંફની જરૂરિયાત.", adviceEn: "Meditate daily to quiet mental noise.", adviceHi: "मानसिक शोर को शांत करने के लिए दैनिक ध्यान करें।", adviceGu: "માનસિક ઉત્તેજના શાંત કરવા માટે દૈનિક ધ્યાન કરો." },
    { nameEn: "Arrow of Willpower", nameHi: "इच्छाशक्ति का तीर", nameGu: "ઈચ્છાશક્તિનું તીર", numbers: [3, 5, 7], descEn: "Strong, unbreakable determination, high resilience, and powerful focus.", descHi: "मजबूत, अटूट दृढ़ संकल्प, उच्च लचीलापन और शक्तिशाली ध्यान।", descGu: "મજબૂત, અખંડ દ્રઢ સંકલ્પ, ઉચ્ચ લવચીકતા અને પ્રભાવશાળી ધ્યાન.", positiveEn: "Overcoming heavy financial/emotional challenges.", positiveHi: "भारी वित्तीय/भावनात्मक चुनौतियों से बाहर आना।", positiveGu: "ભારે આર્થિક/ભાવનાત્મક પડકારોમાંથી બહાર આવવું.", negativeEn: "Can become stubborn or unyielding.", negativeHi: "जिद्दी या अड़ियल रवैया अपनाना।", negativeGu: "જિદ્દી કે અડિયલ વલણ અપનાવવું.", careerEn: "Entrepreneurs, army/police officers, clinical practitioners.", careerHi: "उद्यमी, सेना/पुलिस अधिकारी, नैदानिक चिकित्सक।", careerGu: "ઉદ્યોગસાહસિકો, સેના/પોલીસ અધિકારીઓ, ક્લિનિકલ પ્રેક્ટિશનર્સ.", relationshipEn: "Intense protective behavior; highly loyal.", relationshipHi: "तीव्र सुरक्षात्मक व्यवहार; अत्यधिक वफादार।", relationshipGu: "તીવ્ર સુરક્ષાત્મક વર્તન; અત્યંત વફાદાર.", adviceEn: "Learn to surrender and listen to advisors.", adviceHi: "समर्पण करना और सलाहकारों की बात सुनना सीखें।", adviceGu: "સમર્પણ કરવું અને સલાહકારોની વાત સાંભળવી શીખો." },
    { nameEn: "Arrow of Practicality", nameHi: "व्यावहारिकता का तीर", nameGu: "વ્યવહારિકતાનું તીર", numbers: [8, 1, 6], descEn: "Unbeatable physical action, grounded approach, and outstanding execution.", descHi: "असाधारण शारीरिक क्रियाशीलता, यथार्थवादी दृष्टिकोण और उत्कृष्ट कार्य कौशल।", descGu: "અસાધારણ શારીરિક ક્રિયાશીલતા, વાસ્તવિક અભિગમ અને ઉત્કૃષ્ટ કાર્ય કૌશલ્ય.", positiveEn: "Turning ideas into cash flow.", positiveHi: "विचारों को वास्तविक लाभ में बदलना।", positiveGu: "વિચારોને વાસ્તવિક નફામાં ફેરવવા.", negativeEn: "Lacking spiritual depth initially.", negativeHi: "शुरुआत में आध्यात्मिक गहराई की कमी।", negativeGu: "શરૂઆતમાં આધ્યાત્મિક ઊંડાણની કમી.", careerEn: "Civil contractors, retail builders, stock trading, logistics.", careerHi: "सिविल कांट्रैक्टर, रिटेल निर्माता, स्टॉक ट्रेडिंग, रसद व्यवस्था।", careerGu: "સિવિલ કોન્ટ્રાક્ટર્સ, રિટેલ બિલ્ડર્સ, સ્ટોક ટ્રેડિંગ, લોજિસ્ટિક્સ.", relationshipEn: "Reliable provider, very stable companion.", relationshipHi: "विश्वसनीय प्रदाता, बहुत स्थिर जीवनसाथी।", relationshipGu: "વિશ્વસનીય પ્રદાતા, ખૂબ જ સ્થિર જીવનસાથી.", adviceEn: "Incorporate meditation and light yogic routines.", adviceHi: "ध्यान और हल्की योग दिनचर्या को शामिल करें।", adviceGu: "ધ્યાન અને હળવી યોગ દિનચર્યાનો સમાવેશ કરો." },
    { nameEn: "Arrow of Planning", nameHi: "योजना का तीर", nameGu: "આયોજનનું તીર", numbers: [4, 3, 8], descEn: "Meticulous organization, deep strategic planning, and structured thinking.", descHi: "अति-व्यवस्थित संगठन, गहरी रणनीतिक योजना और संरचित सोच।", descGu: "અતિ-વ્યવસ્થિત સંગઠન, ગહન વ્યુહાત્મક આયોજન અને માળખાગત વિચારણા.", positiveEn: "Excellent project blueprint designs.", positiveHi: "उत्कृष्ट परियोजना ब्लूप्रिंट डिजाइन।", positiveGu: "ઉત્કૃષ્ટ પ્રોજેક્ટ બ્લૂપ્રિન્ટ ડિઝાઇન.", negativeEn: "Over-planning without executing.", negativeHi: "बिना क्रियान्वयन के केवल योजना बनाते रहना।", negativeGu: "અમલીકરણ વિના માત્ર આયોજન જ કરતા રહેવું.", careerEn: "Architects, structural engineers, executive managers, event controllers.", careerHi: "वास्तुकार, संरचनात्मक इंजीनियर, कार्यकारी प्रबंधक, इवेंट कंट्रोलर।", careerGu: "આર્કિટેક્ટ્સ, સ્ટ્રક્ચરલ એન્જિનિયર્સ, એક્ઝિક્યુટિવ મેનેજર્સ, ઇવેન્ટ કંટ્રોલર્સ.", relationshipEn: "Plans everything systematically; values family timetables.", relationshipHi: "सब कुछ व्यवस्थित रूप से योजनाबद्ध करता है; पारिवारिक नियमों को महत्व देता है।", relationshipGu: "બધું વ્યવસ્થિત રીતે આયોજન કરે છે; કૌટુંબિક નિયમોને મહત્વ આપે છે.", adviceEn: "Balance planning with timely, fast action.", adviceHi: "योजना को समय पर और त्वरित कार्रवाई के साथ संतुलित करें।", adviceGu: "આયોજનને સમયસર અને ઝડપી કાર્યવાહી સાથે સંતુલિત કરો." },
    { nameEn: "Arrow of Determination", nameHi: "दृढ़ संकल्प का तीर", nameGu: "દ્રઢ સંકલ્પનું તીર", numbers: [9, 5, 1], descEn: "Unshakable courage, determination, and intense inner drive.", descHi: "अदम्य साहस, दृढ़ निश्चय और तीव्र आंतरिक प्रेरणा।", descGu: "અદમ્ય સાહસ, દ્રઢ નિશ્ચય અને તીવ્ર આંતરિક પ્રેરણા.", positiveEn: "High physical and mental courage.", positiveHi: "उच्च शारीरिक और मानसिक साहस।", positiveGu: "ઉચ્ચ શારીરિક અને માનસિક સાહસ.", negativeEn: "Reluctance to pivot if direction is wrong.", negativeHi: "गलत दिशा होने पर भी पीछे न हटने का स्वभाव।", negativeGu: "ખોટી દિશા હોવા છતાં પાછળ ન હટવાનું વલણ.", careerEn: "Politicians, venture capitalists, public campaigners, media owners.", careerHi: "राजनेता, वेंचर कैपिटलिस्ट, सार्वजनिक प्रचारक, मीडिया मालिक।", careerGu: "રાજકારણીઓ, વેન્ચર કેપિટલિસ્ટ્સ, જાહેર પ્રચારકો, મીડિયા માલિકો.", relationshipEn: "Fierce protector, deeply faithful.", relationshipHi: "कट्टर सुरक्षात्मक साथी, गहरा विश्वासपात्र।", relationshipGu: "કટ્ટર સુરક્ષાત્મક સાથી, ગહન વિશ્વાસપાત્ર.", adviceEn: "Practice mindful listening to respect feedback.", adviceHi: "प्रतिक्रियाओं का सम्मान करने के लिए ध्यानपूर्वक सुनने का अभ्यास करें।", adviceGu: "પ્રતિભાવોનું સન્માન કરવા માટે ધ્યાનપૂર્વક સાંભળવાનો અભ્યાસ કરો." },
    { nameEn: "Arrow of Activity", nameHi: "गतिविधि का तीर", nameGu: "ગતિવિધિનું તીર", numbers: [2, 7, 6], descEn: "High social magnetism, artistic flare, active sports drive.", descHi: "उच्च सामाजिक आकर्षण, कलात्मक कौशल, सक्रिय खेल भावना।", descGu: "ઉચ્ચ સામાજિક આકર્ષણ, કલાત્મક કૌશલ્ય, સક્રિય ખેલદિલી.", positiveEn: "Outstanding presentation skills.", positiveHi: "उत्कृष्ट प्रस्तुति कौशल।", positiveGu: "ઉત્કૃષ્ટ રજૂઆત કૌશલ્ય.", negativeEn: "Gets bored easily with routine duties.", negativeHi: "नियमित कार्यों से बहुत जल्दी ऊब जाना।", negativeGu: "નિયમિત કાર્યોથી ખૂબ જ ઝડપથી કંટાળી જવું.", careerEn: "Marketing heads, glamour/fashion fields, high-end travel guides, performance arts.", careerHi: "विपणन प्रमुख, ग्लैमर/फैशन क्षेत्र, लक्जरी यात्रा गाइड, प्रदर्शन कला।", careerGu: "માર્કેટિંગ હેડ્સ, ગ્લેમર/ફેશન ક્ષેત્ર, લક્ઝરી ટ્રાવેલ ગાઇડ્સ, પર્ફોર્મન્સ આર્ટસ.", relationshipEn: "Extremely romantic; expressive companion.", relationshipHi: "अत्यंत रोमांटिक; खुलकर भावनाएं व्यक्त करने वाला साथी।", relationshipGu: "અત્યંત રોમેન્ટિક; ખુલીને લાગણીઓ વ્યક્ત કરનાર જીવનસાથી.", adviceEn: "Practice mental focus to stick to long projects.", adviceHi: "लंबी परियोजनाओं से जुड़े रहने के लिए मानसिक एकाग्रता का अभ्यास करें।", adviceGu: "લાંબી યોજનાઓ સાથે જોડાયેલા રહેવા માટે માનસિક એકાગ્રતાનો અભ્યાस કરો." },
    { nameEn: "Golden Arrow of Success", nameHi: "सफलता का स्वर्ण तीर", nameGu: "સફળતાનું સુવર્ણ તીર", numbers: [4, 5, 6], descEn: "Highly auspicious combination bringing extreme fame, high wealth, luxury, and success.", descHi: "अत्यंत शुभ संयोजन जो अपार प्रसिद्धि, प्रचुर धन, विलासिता और सफलता लाता है।", descGu: "અત્યંત શુભ સંયોજન જે અપાર ખ્યાતિ, પુષ્કળ ધન, વૈભવ અને સફળતા લાવે છે.", positiveEn: "Effortless luxury attraction.", positiveHi: "अनायास ही सुख-सुविधाओं को आकर्षित करना।", positiveGu: "અનાયાસે જ સુખ-સુવિધાઓને આકર્ષિત કરવી.", negativeEn: "Risk of taking fortunes for granted.", negativeHi: "भाग्य को बहुत सहज मान लेने का जोखिम।", negativeGu: "ભાગ્યને ખૂબ જ સહજ માની લેવાનું જોખમ.", careerEn: "Corporate magnates, real estate giants, premium business founders.", careerHi: "कॉर्पोरेट दिग्गज, रियल एस्टेट सम्राट, प्रीमियम व्यावसायिक संस्थापक।", careerGu: "કોર્પોરેટ દિગ્ગજો, રિયલ એસ્ટેટ સમ્રાટો, પ્રીમિયમ વ્યવસાયિક સ્થાપકો.", relationshipEn: "Generous lifestyle, creates highly comfortable home environment.", relationshipHi: "उदार जीवनशैली, अत्यधिक आरामदायक पारिवारिक वातावरण का निर्माण।", relationshipGu: "ઉદાર જીવનશૈલી, અત્યંત આરામદાયક પારિવારિક વાતાવરણનું સર્જન.", adviceEn: "Perform regular charity to remain humble.", adviceHi: "विनम्र रहने के लिए नियमित दान और सेवा कार्य करें।", adviceGu: "વિનમ્ર રહેવા માટે નિયમિત દાન અને સેવા કાર્યો કરો." },
    { nameEn: "Silver Arrow of Determination", nameHi: "दृढ़ता का रजत तीर", nameGu: "દ્રઢતાનું રજત તીર", numbers: [2, 5, 8], descEn: "Outstanding emotional strength, spiritual willpower, and powerful resilience.", descHi: "उत्कृष्ट भावनात्मक शक्ति, आध्यात्मिक इच्छाशक्ति और शक्तिशाली जुझारूपन।", descGu: "ઉત્કૃષ્ટ ભાવનાત્મક શક્તિ, આધ્યાત્મિક ઈચ્છાશક્તિ અને શક્તિશાળી ઝઝૂમવાની વૃત્તિ.", positiveEn: "High meditative potential.", positiveHi: "उच्च ध्यान क्षमता और मानसिक शांति।", positiveGu: "ઉચ્ચ ધ્યાન ક્ષમતા અને માનસિક શાંતિ.", negativeEn: "Overly empathetic; carrying others' issues.", negativeHi: "अत्यधिक सहानुभूति; दूसरों की समस्याओं को अपने सिर लेना।", negativeGu: "અતિશય સહાનુભૂતિ; અન્યોની સમસ્યાઓને પોતાના માથે લેવી.", careerEn: "Philosophers, spiritual gurus, high-end healers, premium counselors.", careerHi: "दार्शनिक, आध्यात्मिक गुरु, उच्च स्तरीय चिकित्सक, परामर्शदाता।", careerGu: "તત્વજ્ઞાનીઓ, આધ્યાત્મિક ગુરુઓ, ઉચ્ચ સ્તરીય હીલર્સ, કાઉન્સેલર્સ.", relationshipEn: "Deeply soulful connection; values true pure love.", relationshipHi: "गहरा आत्मिक संबंध; सच्चे और पवित्र प्रेम को महत्व देता है।", relationshipGu: "ગહન આત્મિક સંબંધ; સાચા અને પવિત્ર પ્રેમને મહત્વ આપે છે.", adviceEn: "Establish psychological borders; avoid carrying emotional clutter.", adviceHi: "मानसिक सीमाएं तय करें; दूसरों के भावनात्मक कचरे को अपने सिर न लें।", adviceGu: "માનસિક સીમાઓ નક્કી કરો; અન્યોના ભાવનાત્મક કચરાને પોતાના માથે ન લો." }
  ];

  const arrows = arrowsList.map(a => {
    // Check if user has all numbers in the arrow
    const isActive = a.numbers.every(n => (gridCounts[n] || 0) > 0);
    const isNegative = !isActive && a.numbers.every(n => (gridCounts[n] || 0) === 0);
    
    // Customize text based on state
    let meaning = isActive ? (lang === 'en' ? a.descEn : lang === 'hi' ? a.descHi : a.descGu) : '';
    if (isNegative) {
      if (lang === 'en') {
        meaning = `This arrow is completely empty in your grid. This indicates a key developmental area or block regarding ${a.nameEn}. You may face obstacles in this sector.`;
      } else if (lang === 'hi') {
        meaning = `यह तीर आपके ग्रिड में पूरी तरह से खाली है। यह ${a.nameHi} के संबंध में एक महत्वपूर्ण विकास क्षेत्र या रुकावट का संकेत देता है।`;
      } else {
        meaning = `આ તીર તમારા ગ્રીડમાં સંપૂર્ણપણે ખાલી છે. આ ${a.nameGu} ના સંદર્ભમાં એક મહત્વપૂર્ણ વિકાસ ક્ષેત્ર અથવા અવરોધ સૂચવે છે.`;
      }
    } else if (!isActive && !isNegative) {
      if (lang === 'en') {
        meaning = `This arrow is partially active in your grid, indicating a latent or developing potential that can be fully unlocked with proper focus and remedies.`;
      } else if (lang === 'hi') {
        meaning = `यह तीर आपके ग्रिड में आंशिक रूप से सक्रिय है, जो एक सुप्त या विकसित होने वाले कौशल का संकेत देता है जिसे उचित उपायों से जाग्रत किया जा सकता है।`;
      } else {
        meaning = `આ તીર તમારા ગ્રીડમાં આંશિક રીતે સક્રિય છે, જે એક સુપ્ત અથવા વિકસી રહેલી ક્ષમતા દર્શાવે છે જેને યોગ્ય ઉપાયો દ્વારા અનલૉક કરી શકાય છે.`;
      }
    }

    return {
      name: lang === 'en' ? a.nameEn : lang === 'hi' ? a.nameHi : a.nameGu,
      numbers: a.numbers,
      isActive,
      isNegative,
      meaning,
      impact: lang === 'en' ? a.positiveEn : lang === 'hi' ? a.positiveHi : a.positiveGu,
      career: lang === 'en' ? a.careerEn : lang === 'hi' ? a.careerHi : a.careerGu,
      relationship: lang === 'en' ? a.relationshipEn : lang === 'hi' ? a.relationshipHi : a.relationshipGu,
      advice: lang === 'en' ? a.adviceEn : lang === 'hi' ? a.adviceHi : a.adviceGu
    };
  });

  // Calculate Overall Score based on active numbers and driver-conductor compatibility
  const activeCellsCount = Object.values(gridCounts).filter(c => c > 0).length;
  const activeArrowsCount = arrows.filter(a => a.isActive).length;
  
  let compatModifier = 5;
  const compatibility = COMPATIBILITY_MATRIX[driver]?.[conductor] || 'Neutral';
  if (compatibility === 'Excellent') compatModifier = 15;
  else if (compatibility === 'Good') compatModifier = 12;
  else if (compatibility === 'Average') compatModifier = 8;

  const rawScore = (activeCellsCount * 8) + (activeArrowsCount * 6) + compatModifier + 20;
  const overallScore = Math.min(98, Math.max(50, rawScore));

  // Determine Dashboard ratings
  const dashboardRatings = {
    personality: Math.round((activeCellsCount / 9) * 5) || 3,
    career: conductor === 1 || conductor === 5 || conductor === 8 || conductor === 9 ? 5 : 4,
    money: (gridCounts[5] > 0 && gridCounts[8] > 0) || gridCounts[6] > 0 ? 5 : 4,
    marriage: gridCounts[2] > 0 && gridCounts[6] > 0 ? 5 : 3,
    health: gridCounts[3] > 0 && gridCounts[5] > 0 ? 4 : 3,
    spirituality: gridCounts[7] > 0 || gridCounts[2] > 0 ? 5 : 3,
    leadership: driver === 1 || driver === 9 || gridCounts[1] > 1 ? 5 : 4,
    confidence: driver === 1 || driver === 3 || gridCounts[9] > 0 ? 5 : 3,
    overallScore
  };

  // Sections 7-14 Text Databases and Dynamic Assemblers
  // Since we are running in full local typescript, we define stunning localized generation arrays
  const personalityTexts = {
    en: {
      comm: [
        "Your communication is dynamic, clear, and focused. You articulate ideas with strong authority.",
        "You possess a highly diplomatic, sensitive, and harmonious communication style, reading between lines.",
        "Expressive, creative, and joyful, you light up rooms with optimistic conversations and humor."
      ][driver % 3],
      think: [
        "Strategic, structured, and deep. You enjoy organizing data and looking at structural details.",
        "Analytical, research-oriented, and highly intuitive. You look for deeper hidden truths.",
        "Action-driven, highly practical, and realistic. You bypass theories and focus on practical reality."
      ][conductor % 3],
      decision: "You combine logical planning with spontaneous adaptability. Once a target is fixed, you drive direct energy toward execution.",
      learn: "An experiential learner, you absorb concepts fast through visual patterns, real-life case studies, and practical application.",
      conf: "A naturally radiant sense of confidence drives your outward persona, making you appear self-reliant even in crises.",
      social: "Socially dynamic, you maintain select premium friendships while radiating pleasant warmth to professional networks.",
      eq: "Deep emotional intelligence allows you to sense surrounding energy and adjust your behavior to foster maximum harmony.",
      lead: "A natural organic leader, you guide teams by setting stellar examples of integrity, strategic focus, and physical drive.",
      creativity: "Highly creative, your mind produces original solutions, finding brilliant out-of-the-box routes to corporate and personal goals.",
      discipline: "You respect structured regimes, keeping your focus aligned with long-term foundations, although you crave freedom.",
      patience: "Generally patient when analyzing strategic details, you can sometimes feel restless when execution takes too long.",
      stress: "Under pressure, you remain composed, drawing deep strength from your inner core to systematically solve challenges.",
      adapt: "Highly adaptable on business terrains, you easily pivot your strategies while keeping core goals completely intact.",
      summary: `A highly balanced persona blending Driver ${driver} and Conductor ${conductor}, creating a harmonious path of self-realization.`
    },
    hi: {
      comm: [
        "आपका संवाद गतिशील, स्पष्ट और केंद्रित है। आप मजबूत अधिकार के साथ विचार व्यक्त करते हैं।",
        "आपके पास एक अत्यंत कूटनीतिक, संवेदनशील और सामंजस्यपूर्ण संवाद शैली है, जो सूक्ष्म बातों को समझती है।",
        "अभिव्यंजक, रचनात्मक और आनंदमयी, आप आशावादी बातचीत और हास्य से कमरों को रोशन करते हैं।"
      ][driver % 3],
      think: [
        "रणनीतिक, संरचित और गहरा। आप डेटा को व्यवस्थित करने और संरचनात्मक विवरणों को देखना पसंद करते हैं।",
        "विश्लेषणात्मक, अनुसंधान-उन्मुख और अत्यधिक सहज। आप गहरे छिपे हुए सत्यों की तलाश करते हैं।",
        "कार्रवाई-संचालित, अत्यधिक व्यावहारिक और यथार्थवादी। आप सिद्धांतों को छोड़ व्यावहारिक वास्तविकता पर ध्यान केंद्रित करते हैं।"
      ][conductor % 3],
      decision: "आप तार्किक योजना को सहज अनुकूलन क्षमता के साथ जोड़ते हैं। एक बार लक्ष्य तय हो जाने के बाद, आप सीधे निष्पादन की दिशा में ऊर्जा लगाते हैं।",
      learn: "एक व्यावहारिक शिक्षार्थी, आप दृश्य पैटर्न, वास्तविक जीवन के मामलों और व्यावहारिक अनुप्रयोग के माध्यम से अवधारणाओं को तेजी से सीखते हैं।",
      conf: "आत्मविश्वास की एक स्वाभाविक भावना आपके बाहरी व्यक्तित्व को संचालित करती है, जिससे आप संकटों में भी आत्मनिर्भर दिखाई देते हैं।",
      social: "सामाजिक रूप से गतिशील, आप पेशेवर नेटवर्कों में सुखद गर्मजोशी बिखेरते हुए चुनिंदा प्रीमियम मित्रता बनाए रखते हैं।",
      eq: "गहन भावनात्मक बुद्धिमत्ता आपको आसपास की ऊर्जा को महसूस करने और अधिकतम सद्भाव को बढ़ावा देने के लिए अपने व्यवहार को समायोजित करने की अनुमति देती है।",
      lead: "एक प्राकृतिक नेता, आप ईमानदारी, रणनीतिक ध्यान और शारीरिक ऊर्जा के बेहतरीन उदाहरण स्थापित करके टीमों का मार्गदर्शन करते हैं।",
      creativity: "अत्यधिक रचनात्मक, आपका दिमाग मूल समाधान पैदा करता है, कॉर्पोरेट और व्यक्तिगत लक्ष्यों के लिए शानदार लीक से हटकर रास्ते ढूंढता है।",
      discipline: "आप संरचित व्यवस्थाओं का सम्मान करते हैं, अपने ध्यान को दीर्घकालिक नींव के साथ संरेखित रखते हैं, हालांकि आप स्वतंत्रता चाहते हैं।",
      patience: "रणनीतिक विवरणों का विश्लेषण करते समय आम तौर पर धैर्यवान, जब निष्पादन में बहुत लंबा समय लगता है तो आप कभी-कभी बेचैनी महसूस कर सकते हैं।",
      stress: "दबाव में, आप शांत रहते हैं, चुनौतियों को व्यवस्थित रूप से हल करने के लिए अपने आंतरिक मूल से गहरी ताकत खींचते हैं।",
      adapt: "व्यावसायिक क्षेत्रों में अत्यधिक अनुकूलनीय, आप मुख्य लक्ष्यों को पूरी तरह से बरकरार रखते हुए अपनी रणनीतियों को आसानी से घुमाते हैं।",
      summary: `ड्राइवर ${driver} और कंडक्टर ${conductor} के साथ एक संतुलित व्यक्तित्व, जो आत्म-साक्षात्कार का एक सामंजस्यपूर्ण मार्ग बनाता है।`
    },
    gu: {
      comm: [
        "તમારો સંવાદ ગતિશીલ, સ્પષ્ટ અને કેન્દ્રિત છે. તમે મજબૂત સત્તા સાથે વિચારો વ્યક્ત કરો છો.",
        "તમારી પાસે અત્યંત મુત્સદ્દીગીરીભરી, સંવેદનશીલ અને સુમેળભરી સંવાદ શૈલી છે, જે સૂક્ષ્મ વાતોને સમજે છે.",
        "અભિવ્યક્ત, સર્જનાત્મક અને આનંદી, તમે આશાવાદી વાતચીત અને રમૂજથી વાતાવરણને જીવંત બનાવો છો."
      ][driver % 3],
      think: [
        "વ્યૂહાત્મક, વ્યવસ્થિત અને ઊંડું. તમને ડેટા ગોઠવવો અને માળખાકીય વિગતો જોવી ગમે છે.",
        "વિશ્લેષણાત્મક, સંશોધન-લક્ષી અને અત્યંત સાહજિક. તમે ઊંડા છુપાયેલા સત્યો શોધો છો.",
        "ક્રિયા-સંચાલિત, અત્યંત વ્યવહારુ અને વાસ્તવિક. તમે સિદ્ધાંતો છોડી વ્યવહારિક વાસ્તવિકતા પર ધ્યાન આપો છો."
      ][conductor % 3],
      decision: "તમે તાર્કિક આયોજનને સહજ અનુકૂલનક્ષમતા સાથે જોડો છો. એકવાર લક્ષ્ય નક્કી થઈ ગયા પછી, તમે સીધા અમલીકરણ તરફ ઉર્જા લગાવો છો.",
      learn: "વ્યવહારિક વિદ્યાર્થી, તમે દ્રશ્ય પેટર્ન, વાસ્તવિક જીવનના કિસ્સાઓ અને વ્યવહારિક ઉપયોગ દ્વારા ઝડપથી શીખો છો.",
      conf: "આત્મવિશ્વાસની એક સ્વાભાવિક ભાવના તમારા બાહ્ય વ્યક્તિત્વને સંચાલિત કરે છે, જેથી તમે મુશ્કેલીમાં પણ આત્મનિર્ભર દેખાઓ છો.",
      social: "સામાજિક રીતે ગતિશીલ, તમે વ્યાવસાયિક નેટવર્ક્સમાં સુખદ હૂંફ ફેલાવતા રહીને પસંદગીની પ્રીમિયમ મિત્રતા જાળવો છો.",
      eq: "ગહન ભાવનાત્મક બુદ્ધિમત્તા તમને આસપાસની ઉર્જા અનુભવવાની અને મહત્તમ સદભાવને પ્રોત્સાહન આપવા માટે તમારા વર્તનને સમાયોજિત કરવાની મંજૂરી આપે છે.",
      lead: "એક કુદરતી નેતા, તમે પ્રામાણિકતા, વ્યૂહાત્મક ધ્યાન અને શારીરિક ઉર્જાના શ્રેષ્ઠ ઉદાહરણો સ્થાપિત કરીને ટીમોનું માર્ગદર્શન કરો છો.",
      creativity: "અત્યંત સર્જનાત્મક, તમારું મન મૌલિક ઉકેલો પેદા કરે છે, વ્યાપારિક અને વ્યક્તિગત લક્ષ્યો માટે શાનદાર અને નવા રસ્તાઓ શોધે છે.",
      discipline: "તમે વ્યવસ્થિત પ્રણાલીઓનું સન્માન કરો છો, તમારા ધ્યાનને લાંબા ગાળાના પાયા સાથે ગોઠવો છો, જો કે તમે સ્વતંત્રતા ઝંખો છો.",
      patience: "વ્યૂહાત્મક વિગતોનું વિશ્લેષણ કરતી વખતે સામાન્ય રીતે ધીરજવાન, જ્યારે અમલીકરણમાં વધુ સમય લાગે ત્યારે તમે ક્યારેક બેચેની અનુભવો છો.",
      stress: "દબાણમાં, તમે શાંત રહો છો, પડકારોને વ્યવસ્થિત રીતે હલ કરવા માટે તમારા આંતરિક મૂળમાંથી ઊંડી શક્તિ ખેંચો છો.",
      adapt: "વ્યાવસાયિક ક્ષેત્રોમાં અત્યંત અનુકૂળ, તમે મુખ્ય લક્ષ્યોને સંપૂર્ણપણે અકબંધ રાખીને તમારી વ્યૂહરચનાઓ સરળતાથી બદલો છો.",
      summary: `ડ્રાઈવર ${driver} અને કંડક્ટર ${conductor} સાથે એક સંતુલિત વ્યક્તિત્વ, જે આત્મ-સાક્ષાત્કારનો એક સુમેળભર્યો માર્ગ બનાવે છે.`
    }
  };

  const currentLangCopy = personalityTexts[lang];

  // AI Narrative Generator based on grid counts, compatibility, and driver-conductor properties.
  let aiNarrative = "";
  if (lang === 'en') {
    aiNarrative = `Your life blueprint is deeply governed by Driver ${driver} (reigning under the Sun/Moon/Jupiter energy) and Conductor ${conductor}. With ${activeCellsCount} active numbers filled in your Lo Shu Grid, you possess a highly versatile energetic distribution. Your Fire element is at ${elementPercentages.Fire}%, and Earth element is at ${elementPercentages.Earth}%, providing you with a superb balance of passion and grounded execution. The presence of the ${arrows.filter(a => a.isActive)[0]?.name || "energetic axes"} gives you a highly specialized operational blueprint in business and personal expansion. Focus on the missing energies through traditional remedies like green crystals or wearing precious metals to clear the channels for maximum abundance, luxury, and success. This year, your Personal Year ${personalYear} brings a highly dynamic phase for growth and strategic partnerships.`;
  } else if (lang === 'hi') {
    aiNarrative = `आपका जीवन खाका गहराई से ड्राइवर ${driver} और कंडक्टर ${conductor} द्वारा संचालित है। आपके लो शू ग्रिड में ${activeCellsCount} सक्रिय नंबरों के साथ, आपके पास एक बहुमुखी ऊर्जा वितरण है। आपकी अग्नि ऊर्जा ${elementPercentages.Fire}% और पृथ्वी ऊर्जा ${elementPercentages.Earth}% है, जो आपको जुनून और यथार्थवादी निष्पादन का शानदार संतुलन देती है। आपके सक्रिय तीर आपको व्यापार और व्यक्तिगत विकास में एक विशेष दिशा प्रदान करते हैं। हरे क्रिस्टल या कीमती धातुओं को धारण करने जैसे पारंपरिक उपायों के माध्यम से लुप्त ऊर्जाओं पर ध्यान केंद्रित करें। इस वर्ष, आपका व्यक्तिगत वर्ष ${personalYear} विकास और रणनीतिक साझेदारी के लिए एक अत्यधिक गतिशील चरण लाता है।`;
  } else {
    aiNarrative = `તમારી જીવન યોજના ડ્રાઈવર ${driver} અને કંડક્ટર ${conductor} દ્વારા ઊંડાણપૂર્વક સંચાલિત છે. તમારા લો શૂ ગ્રીડમાં ${activeCellsCount} સક્રિય નંબરો સાથે, તમારી પાસે બહુમુખી ઊર્જા વિતરણ છે. તમારી અગ્નિ ઉર્જા ${elementPercentages.Fire}% અને પૃથ્વી ઉર્જા ${elementPercentages.Earth}% છે, જે તમને ઉત્સાહ અને વાસ્તવિક અમલીકરણનું ભવ્ય સંતુલન આપે છે. તમારા સક્રિય તીર તમને વ્યાપાર અને વ્યક્તિગત વિકાસમાં એક વિશેષ દિશા પ્રદાન કરે છે. લીલા ક્રિસ્ટલ અથવા કિંમતી ધાતુઓ ધારણ કરવા જેવા પરંપરાગત ઉપાયો દ્વારા ખૂટતી ઉર્જાઓ પર ધ્યાન કેન્દ્રિત કરો. આ વર્ષે, તમારું વ્યક્તિગત વર્ષ ${personalYear} પ્રગતિ અને વ્યૂહાત્મક ભાગીદારી માટે અત્યंत ગતિશીલ તબક્કો લાવે છે.`;
  }

  // Section 8: Character Analysis
  const strengthsList = {
    en: ["Dynamic leadership", "Superb strategic organization", "Emotional balance and loyalty", "Strong intuition", "Courageous problem solving", "Excellent communication skills"],
    hi: ["गतिशील नेतृत्व क्षमता", "शानदार रणनीतिक संगठन कौशल", "भावनात्मक संतुलन और वफादारी", "मजबूत अंतर्ज्ञान", "साहसी समस्या समाधान", "उत्कृष्ट संचार कौशल"],
    gu: ["ગતિશીલ નેતૃત્વ ક્ષમતા", "ભવ્ય વ્યૂહાત્મક સંગઠન કૌશલ્ય", "ભાવનાત્મક સંતુલન અને વફાદારી", "મજબૂત અંતર્જ્ઞાન", "સાહસિક સમસ્યા નિવારણ", "ઉત્કૃષ્ટ સંચાર કૌશલ્ય"]
  };
  const weaknessesList = {
    en: ["Prone to over-thinking", "Occasional rigidity in opinion", "Impatient with slow progress", "Struggles with delegation", "Avoiding routine maintenance tasks"],
    hi: ["अत्यधिक सोचने की प्रवृत्ति", "विचारों में कभी-कभी अड़ियलपन", "धीमी प्रगति के साथ अधीरता", "दूसरों को काम सौंपने में कठिनाई", "नियमित कार्यों की उपेक्षा"],
    gu: ["અતિશય વિચારવાની વૃત્તિ", "વિચારોમાં ક્યારેક જિદ્દી વલણ", "ધીમી પ્રગતિ સાથે અધીરાઈ", "અન્યોને કામ સોંપવામાં મુશ્કેલી", "નિયમિત કાર્યોની ઉપેક્ષા"]
  };

  // Suitabilities
  const fieldsMap = {
    en: ["Business/Entrepreneurship", "Government Service", "Teaching & Academia", "Politics & Social", "IT & Technology", "Medical & Healing", "Creative Field & Entertainment", "Consulting & Finance"],
    hi: ["व्यापार और उद्यमिता", "सरकारी सेवा", "शिक्षण और शिक्षाविद", "राजनीति और सामाजिक कार्य", "आईटी और प्रौद्योगिकी", "चिकित्सा और हीलिंग", "रचनात्मक क्षेत्र और मनोरंजन", "परामर्श और वित्त"],
    gu: ["વ્યાપાર અને સાહસિકતા", "સરકારી સેવા", "શિક્ષણ અને શિક્ષણશાસ્ત્રીઓ", "રાજકારણ અને સામાજિક કાર્ય", "આઈટી અને ટેકનોલોજી", "તબીબી અને હીલિંગ", "સર્જનાત્મક ક્ષેત્ર અને મનોરંજન", "પરામર્શ અને નાણાકીય ક્ષેત્ર"]
  };

  const suitabilities = fieldsMap[lang].map((f, i) => {
    // Generate deterministic percentage based on driver, conductor and indices
    const pct = Math.min(95, Math.max(55, (driver * 3 + conductor * 4 + i * 7) % 40 + 55));
    return { field: f, percentage: pct };
  });

  // Remedies Section 19
  const remediesList = {
    en: {
      morning: "Wake up before sunrise. Chant 'Om Suryaya Namaha' facing East. Offer water from a copper vessel to the rising Sun.",
      meditation: "Perform 15 minutes of Anulom-Vilom pranayam followed by mindfulness breath meditation daily.",
      affirmations: [
        "I am aligned with the divine rhythm of numbers and cosmic success.",
        "Every cell of my body vibrates with health, prosperity, and joy.",
        "I attract luxurious opportunities and stable, loving relationships effortlessly.",
        "I welcome infinite wisdom and perfect structural balance into my life."
      ],
      colors: ["Emerald Green", "Royal Golden", "Pure White", "Cream"],
      lifestyle: ["Organize your working desk every Saturday morning.", "Avoid sleeping directly under overhead heavy structural beams.", "Keep a green plants layout in the East corner of your living room."],
      charity: "Offer green gram (moong dal) or sweet food items to young children or laborers on Wednesdays.",
      mantras: ["Gayatri Mantra (3, 11, or 21 times daily)", "Buddha Mantra (on Wednesdays)"]
    },
    hi: {
      morning: "सूर्योदय से पहले उठें। पूर्व की ओर मुंह करके 'ॐ सूर्याय नमः' का जाप करें। उगते सूर्य को तांबे के लोटे से जल अर्पित करें।",
      meditation: "प्रतिदिन 15 मिनट अनुलोम-विलोम प्राणायाम करें और फिर शांत मन से सांसों पर ध्यान केंद्रित करें।",
      affirmations: [
        "मैं नंबरों और ब्रह्मांडीय सफलता के दिव्य लय के साथ संरेखित हूं।",
        "मेरे शरीर की हर कोशिका स्वास्थ्य, समृद्धि और आनंद से स्पंदित है।",
        "मैं अनायास ही विलासितापूर्ण अवसरों और स्थिर, प्यार भरे संबंधों को आकर्षित करता हूं।",
        "मैं अपने जीवन में अनंत ज्ञान और पूर्ण संरचनात्मक संतुलन का स्वागत करता हूं।"
      ],
      colors: ["पन्ना हरा", "शाही सुनहरा", "शुद्ध सफेद", "क्रीम"],
      lifestyle: ["प्रत्येक शनिवार की सुबह अपनी कार्य मेज को व्यवस्थित करें।", "सीधे भारी संरचनात्मक बीम के नीचे सोने से बचें।", "अपने रहने वाले कमरे के पूर्वी कोने में हरे पौधे रखें।"],
      charity: "बुधवार को छोटे बच्चों या जरूरतमंदों को हरी मूंग की दाल या मीठा भोजन दान करें।",
      mantras: ["गायत्री मंत्र (प्रतिदिन 3, 11, या 21 बार)", "बुध मंत्र (बुधवार को)"]
    },
    gu: {
      morning: "સૂર્યોદય પહેલાં જાગો. પૂર્વ તરફ મોં રાખીને 'ૐ સૂર્યાય નમઃ' નો જાપ કરો. ઉગતા સૂર્યને તાંબાના પાત્રથી જળ અર્પણ કરો.",
      meditation: "દરરોજ ૧૫ મિનિટ અનુલોમ-વિલોમ પ્રાણાયામ કરો અને પછી શાંત ચિત્તે શ્વાસોશ્વાસ પર ધ્યાન કેન્દ્રિત કરો.",
      affirmations: [
        "હું અંકો અને બ્રહ્માંડિય સફળતાની દૈવી લય સાથે જોડાયેલ છું.",
        "મારા શરીરનો દરેક કોષ સ્વાસ્થ્ય, સમૃદ્ધિ અને આનંદથી ધબકે છે.",
        "હું અનાયાસે જ વૈભવી તકો અને સ્થિર, પ્રેમાળ સંબંધોને આકર્ષિત કરું છું.",
        "હું મારા જીવનમાં અનંત જ્ઞાન અને સંપૂર્ણ વ્યવસ્થિત સંતુલનનું સ્વાગત કરું છું."
      ],
      colors: ["પન્ના લીલો", "શાહી સોનેરી", "શુદ્ધ સફેદ", "ક્રીમ"],
      lifestyle: ["દરેક શનિવારની સવારે તમારા કાર્યસ્થળના ટેબલને વ્યવસ્થિત કરો.", "સીધા ભારે લોખંડના બીમની નીચે સૂવાનું ટાળો.", "તમારા રૂમના પૂર્વ ખૂણામાં લીલા છોડ રાખો."],
      charity: "બુધવારે નાના બાળકો અથવા ગરીબોને લીલા મગ અથવા મીઠી વસ્તુઓનું દાન કરો.",
      mantras: ["ગાયત્રી મંત્ર (દરરોજ ૩, ૧૧ અથવા ૨૧ વખત)", "બુધ મંત્ર (બુધવારે)"]
    }
  };

  const currRemedies = remediesList[lang];

  return {
    personalInfo: {
      dob: dobString.split('-').reverse().join('/'),
      driver,
      conductor,
      lifePath: conductor, // Standard interpretation
      birthDay: day,
      birthMonth: month,
      birthYear: year,
      personalYear,
      personalMonth,
      age,
      generation,
      birthElement,
      yinYangBalance: {
        yin: yinCount,
        yang: yangCount,
        description: yinYangDesc
      }
    },
    gridCounts,
    numberAnalysis,
    missingNumbers,
    dominantEnergy: {
      strongest,
      weakest,
      balanced,
      elements: elementsDetail,
      overallScore
    },
    arrows,
    personality: {
      communication: currentLangCopy.comm,
      thinking: currentLangCopy.think,
      decisionMaking: currentLangCopy.decision,
      learning: currentLangCopy.learn,
      confidence: currentLangCopy.conf,
      socialNature: currentLangCopy.social,
      emotionalIntelligence: currentLangCopy.eq,
      leadership: currentLangCopy.lead,
      creativity: currentLangCopy.creativity,
      discipline: currentLangCopy.discipline,
      patience: currentLangCopy.patience,
      stressHandling: currentLangCopy.stress,
      adaptability: currentLangCopy.adapt,
      summary: currentLangCopy.summary
    },
    character: {
      strengths: strengthsList[lang],
      weaknesses: weaknessesList[lang],
      hiddenTalents: lang === 'en' ? "Exceptional talent in reading social situations and organizing strategic blueprints with extreme detailing." : lang === 'hi' ? "सामाजिक स्थितियों को भांपने और अत्यधिक विवरण के साथ रणनीतिक खाका तैयार करने में असाधारण कौशल।" : "સામાજિક પરિસ્થિતિઓ પારખવાની અને અત્યંત વિગતો સાથે વ્યુહાત્મક બ્લૂપ્રિન્ટ તૈયાર કરવાની અસાધારण કુશળતા.",
      innerNature: lang === 'en' ? "Soulful, intensely philosophical, seeking order and cosmic purpose behind simple events." : lang === 'hi' ? "भावपूर्ण, अत्यधिक दार्शनिक, सरल घटनाओं के पीछे व्यवस्था और ब्रह्मांडीय उद्देश्य की तलाश।" : "ભાવપૂર્ણ, અત્યંત દાર્શનિક, સામાન્ય ઘટનાઓ પાછળ આધ્યાત્મિક અને બ્રહ્માંડિય ઉદ્દેશ્યની શોધ.",
      outerPersonality: lang === 'en' ? "Appears extremely dignified, stable, luxurious, and confident to external observers." : lang === 'hi' ? "बाहरी लोगों को अत्यंत गरिमापूर्ण, स्थिर, लक्जरी और आश्वस्त प्रतीत होता है।" : "બાહ્ય લોકોને અત્યંત ગરિમાપૂર્ણ, સ્થિર, વૈભવી અને આત્મવિશ્વાસુ પ્રતીત થાય છે.",
      habits: lang === 'en' ? "Maintains a structured workspace, prone to drinking water or green teas frequently during high-focus sessions." : lang === 'hi' ? "व्यवस्थित कार्यस्थल बनाए रखना, ध्यान सत्रों के दौरान नियमित रूप से जल या ग्रीन टी पीना।" : "વ્યવસ્થિત કાર્યસ્થળ જાળવવું, ઉચ્ચ ધ્યાન સત્રો દરમિયાન નિયમિતપણે જળ કે ગ્રીન ટી પીવી.",
      mentalEnergy: lang === 'en' ? "Very high logic capacity; enjoys solving systemic problems." : lang === 'hi' ? "बहुत उच्च तार्किक क्षमता; व्यवस्थित समस्याओं को हल करने का आनंद।" : "ખૂબ જ ઉચ્ચ તાર્કિક ક્ષમતા; જટિલ સમસ્યાઓ હલ કરવાનો આનંદ.",
      emotionalEnergy: lang === 'en' ? "Slightly sensitive but guarded with a premium, poised demeanor." : lang === 'hi' ? "थोड़ा संवेदनशील लेकिन संतुलित और गंभीर व्यवहार के साथ सुरक्षित।" : "થોડું સંવેદનશીલ પરંતુ સંતુલિત અને ગંભીર વર્તન સાથે સુરક્ષિત.",
      spiritualEnergy: lang === 'en' ? "Strong latent intuition; naturally attracted to occult, astrology, and cosmology." : lang === 'hi' ? "मजबूत सुप्त अंतर्ज्ञान; गूढ़ विद्या, ज्योतिष और ब्रह्मांड विज्ञान के प्रति प्राकृतिक आकर्षण।" : "મજબૂત અંતર્જ્ઞાન; ગૂઢ વિદ્યા, જ્યોતિષ અને બ્રહ્માંડ વિજ્ઞાન પ્રત્યે કુદરતી આકર્ષણ.",
      pressureBehavior: lang === 'en' ? "Remains structured; draws immediate actionable steps instead of panicking." : lang === 'hi' ? "शांत और व्यवस्थित रहता है; घबराने के बजाय तत्काल कदम उठाता है।" : "શાંત અને વ્યવસ્થિત રહે છે; ગભરાવાને બદલે તાત્કાલિક પગલાં ભરે છે.",
      successBehavior: lang === 'en' ? "Celebrates by elevating surroundings; shares fortune with close circles and family." : lang === 'hi' ? "अपने आसपास के वातावरण को बेहतर बनाकर जश्न मनाता है; करीबियों के साथ खुशियां बांटता है।" : "પોતાની આસપાસના વાતાવરણને બહેતર બનાવી ઉજવણી કરે છે; સ્નેહીજનો સાથે ખુશીઓ વહેંચે છે.",
      failureBehavior: lang === 'en' ? "Analyzes systemic flaws, withdraws for short self-reflection, then boots back with higher force." : lang === 'hi' ? "कमियों का विश्लेषण करता है, थोड़े समय के लिए आत्म-चिंतन करता है, फिर दोगुनी ताकत से वापस आता है।" : "ખામીઓનું વિશ્લેષણ કરે છે, ટૂંકા સમય માટે આત્મ-ચિંતન કરે છે, પછી બમણી તાકાતથી પાછો ફરે છે."
    },
    career: {
      bestCareers: [fieldsMap[lang][0], fieldsMap[lang][4], fieldsMap[lang][6], fieldsMap[lang][7]],
      suitability: suitabilities,
      advice: lang === 'en' 
        ? "Your energetic blueprint is highly optimized for self-owned business or premium consulting roles where you command the space. Avoid roles with static, heavily repetitive micro-management."
        : lang === 'hi'
          ? "आपका ऊर्जावान खाका स्व-स्वामित्व वाले व्यवसाय या प्रीमियम परामर्श भूमिकाओं के लिए अत्यधिक अनुकूलित है जहां आप नियंत्रण रखते हैं। अत्यधिक सूक्ष्म-प्रबंधन वाली नीरस भूमिकाओं से बचें।"
          : "તમારી ઉર્જા વ્યાપાર અથવા પ્રીમિયમ કન્સલ્ટિંગ ભૂમિકાઓ માટે અત્યંત અનુકૂળ છે જ્યાં તમે નિયંત્રણ ધરાવો છો. અતિશય માઇક્રો-મેનેજમેન્ટ વાળી નીરસ ભૂમિકાઓથી બચો."
    },
    wealth: {
      moneyMindset: lang === 'en' ? "Sees wealth as energy flow. Highly focused on acquiring stable assets and enjoying luxury." : lang === 'hi' ? "धन को ऊर्जा के प्रवाह के रूप में देखता है। स्थिर संपत्ति प्राप्त करने और विलासिता का आनंद लेने पर केंद्रित।" : "ધનને ઉર્જાના પ્રવાહ તરીકે જુએ છે. સ્થિર મિલકતો મેળવવા અને વૈભવ માણવા પર ધ્યાન કેન્દ્રિત કરે છે.",
      savingsHabit: lang === 'en' ? "Methodical; plans long-term compound deposits but willing to invest in asset class growth." : lang === 'hi' ? "व्यवस्थित; दीर्घकालिक जमा की योजना बनाता है लेकिन विकासशील संपत्तियों में निवेश के लिए तैयार रहता है।" : "વ્યવસ્થિત; લાંબા ગાળાના આયોજન સાથે રોકાણ કરે છે પરંતુ વિકાસશીલ ક્ષેત્રોમાં રોકાણ માટે ઉત્સુક રહે છે.",
      financialGrowth: lang === 'en' ? "Exponential after age 32, driven by powerful strategic joint-ventures and calculations." : lang === 'hi' ? "शक्तिशाली रणनीतिक उपक्रमों और गणनाओं के कारण ३२ वर्ष की आयु के बाद तीव्र वृद्धि।" : "મજબૂત વ્યૂહાત્મક જોડાણો અને આયોજનને કારણે ૩૨ વર્ષની ઉંમર પછી ઝડપી પ્રગતિ.",
      investmentNature: lang === 'en' ? "Enjoys property acquisition, gold standard assets, and solid equity portfolios." : lang === 'hi' ? "रियल एस्टेट, सोने और ठोस इक्विटी पोर्टफोलियो में निवेश का आनंद लेता है।" : "રિયલ એસ્ટેટ, સોનું અને મજબૂત ઇક્વિટી પોર્ટફોલિયોમાં રોકાણ કરવાનું પસંદ કરે છે.",
      riskTaking: lang === 'en' ? "Calculated risks based on deep structural studies, never pure blind gambling." : lang === 'hi' ? "गहरे अध्ययन के आधार पर गणना की गई जोखिम, कभी भी अंधा जुआ नहीं।" : "ઊંડા અભ્યાસના આધારે ગણતરીપૂર્વકનું જોખમ લે છે, ક્યારેય અંધ રોકાણ નથી કરતો.",
      luxuryAttraction: lang === 'en' ? "Strong attraction to premium automotives, structural aesthetic homes, and custom garments." : lang === 'hi' ? "लक्जरी गाड़ियों, सुंदर घरों और कस्टम परिधानों के प्रति तीव्र आकर्षण।" : "વૈભવી ગાડીઓ, સુંદર ઘરો અને કસ્ટમ વસ્ત્રો પ્રત્યે તીવ્ર આકર્ષણ.",
      propertyPotential: lang === 'en' ? "Outstanding potential to own multiple luxury commercial and domestic real estate properties." : lang === 'hi' ? "कई विलासितापूर्ण वाणिज्यिक और घरेलू अचल संपत्ति संपत्तियों के मालिक होने की असाधारण क्षमता।" : "વિવિધ વૈભવી અને વ્યાપારી પ્રોપર્ટી ખરીદવાની અસાધારણ ક્ષમતા.",
      passiveIncome: lang === 'en' ? "Excellent scope to establish high-yielding passive rental or dividend channels." : lang === 'hi' ? "उच्च किराये या लाभांश से संबंधित निष्क्रिय आय चैनल स्थापित करने की उत्कृष्ट गुंजाइश।" : "ભાડા કે ડિવિડન્ડ સંબંધિત નિષ્ક્રિય આવકના સ્ત્રોત સ્થાપિત કરવાની ઉત્તમ તકો.",
      rating: 'Excellent',
      score: 92
    },
    relationship: {
      loveNature: lang === 'en' ? "Deeply passionate, poignantly loyal, seeking absolute intellectual and physical alignment." : lang === 'hi' ? "अत्यधिक भावुक, निष्ठावान, और पूर्ण बौद्धिक और शारीरिक संरेखण की तलाश करने वाला।" : "અત્યંત ભાવુક, વફાદાર, અને સંપૂર્ણ બૌદ્ધિક અને શારીરિક સુમેળ ઝંખનાર.",
      marriageCompatibility: lang === 'en' ? "Highly compatible with numbers matching Driver 1, 3, 5, 6. Harmonious growth together." : lang === 'hi' ? "ड्राइवर १, ३, ५, ६ से मेल खाने वाले नंबरों के साथ अत्यधिक संगत। एक साथ सामंजस्यपूर्ण विकास।" : "ડ્રાઈવર ૧, ૩, ૫, ૬ ધરાવતી વ્યક્તિઓ સાથે અત્યંત અનુકૂળ. સાથે મળીને સુમેળભર્યો વિકાસ.",
      communication: lang === 'en' ? "Poised communication, respects individual boundaries, loves intellectual debates." : lang === 'hi' ? "संतुलित संवाद, व्यक्तिगत सीमाओं का सम्मान, बौद्धिक चर्चाओं का शौकीन।" : "સંતુલિત સંવાદ, વ્યક્તિગત સીમાઓનું સન્માન, બૌદ્ધિક ચર્ચાઓના શોખીન.",
      trust: lang === 'en' ? "Absolute trust once earned, but maintains sharp analytical vigilance initially." : lang === 'hi' ? "एक बार विश्वास हो जाने पर पूर्ण निष्ठा, लेकिन शुरू में विश्लेषणात्मक सतर्कता बनाए रखता है।" : "એકવાર વિશ્વાસ બેઠા પછી સંપૂર્ણ વફાદારી, પરંતુ શરૂઆતમાં વિશ્લેષણાत्मक સતર્કતા જાળવે છે.",
      emotionalNeeds: lang === 'en' ? "Needs silent support, validation of structural achievements, and beautiful peaceful home environment." : lang === 'hi' ? "शांत समर्थन, अपनी उपलब्धियों की सराहना और एक सुंदर शांत पारिवारिक वातावरण की आवश्यकता।" : "શાંત સમર્થન, પોતાની સિદ્ધિઓની પ્રશંસા અને સુંદર શાંત કૌટુંબિક વાતાવરણની જરૂરિયાત.",
      familyLife: lang === 'en' ? "Highly protective, creates outstanding structural comfort and elite education environments for kids." : lang === 'hi' ? "अत्यधिक सुरक्षात्मक, बच्चों के लिए उत्कृष्ट आराम और उच्च स्तरीय शिक्षा का माहौल तैयार करता है।" : "અત્યંત સુરક્ષાત્મક, બાળકો માટે ઉત્તમ આરામ અને ઉચ્ચ સ્તરીય શિક્ષણનું વાતાવરણ તૈયાર કરે છે.",
      compatibilityLevel: 88,
      romanticBehavior: lang === 'en' ? "Expressive through luxurious gifting, custom dates, and long qualitative travels." : lang === 'hi' ? "लक्जरी उपहारों, विशेष यात्राओं और गुणवत्तापूर्ण समय के माध्यम से अपनी भावनाएं व्यक्त करता है।" : "મોંઘી ભેટસોગાદો, વિશેષ પ્રવાસો અને ગુણવત્તાસભર સમય દ્વારા પોતાની લાગણીઓ વ્યક્ત કરે છે.",
      challenges: lang === 'en' ? "Occasional stubbornness or bringing corporate mental stress back to domestic dining tables." : lang === 'hi' ? "कभी-कभी अड़ियल स्वभाव या कार्यस्थल के मानसिक तनाव को घर के भोजन की मेज तक ले आना।" : "ક્યારેક જિદ્દી સ્વભાવ અથવા કાર્યસ્થળના માનસિક તણાવને ઘરના ભોજન ટેબલ સુધી લઈ આવવું.",
      advice: lang === 'en' 
        ? "Establish a strict golden boundary between corporate execution and domestic love. Practice surrendering control at home."
        : lang === 'hi'
          ? "व्यावसायिक जीवन और पारिवारिक प्रेम के बीच एक सख्त सीमा स्थापित करें। घर पर नियंत्रण छोड़ने का अभ्यास करें।"
          : "વ્યાવસાયિક જીવન અને કૌટુંબિક પ્રેમ વચ્ચે એક સ્પષ્ટ સીમા નક્કી કરો. ઘરમાં નિયંત્રણ જતું કરવાનું શીખો."
    },
    health: {
      stressLevels: lang === 'en' ? "High mental processing can create occasional stress. Requires systematic grounding." : lang === 'hi' ? "उच्च मानसिक सक्रियता कभी-कभी तनाव पैदा कर सकती है। व्यवस्थित ध्यान की आवश्यकता है।" : "ઉચ્ચ માનસિક સક્રિયતા ક્યારેક તણાવ પેદા કરી શકે છે. વ્યવસ્થિત ધ્યાનની જરૂર છે.",
      wellness: lang === 'en' ? "Poised energy levels, physically vital, but requires conscious digestion regulation." : lang === 'hi' ? "संतुलित ऊर्जा स्तर, शारीरिक रूप से सक्रिय, लेकिन पाचन तंत्र पर ध्यान देने की आवश्यकता है।" : "સંતુલિત ઉર્જા સ્તર, શારીરિક રીતે સક્રિય, પરંતુ પાચનતંત્ર પર ધ્યાન આપવાની જરૂર છે.",
      energy: lang === 'en' ? "Robust solar core energy, highly dynamic outward active drive." : lang === 'hi' ? "मजबूत सौर ऊर्जा, अत्यधिक गतिशील बाहरी सक्रिय ऊर्जा।" : "મજબૂત સૌર ઉર્જા, અત્યંત ગતિશીલ બાહ્ય સક્રિય ઉર્જા.",
      sleep: lang === 'en' ? "Prone to late-night calculations. Needs 7 hours of standard deep undisturbed rest." : lang === 'hi' ? "देर रात तक योजना बनाने की आदत। ७ घंटे की गहरी और निर्बाध नींद आवश्यक है।" : "મોડી રાત સુધી આયોજન કરવાની આદત. ૭ કલાકની ઊંડી અને શાંત ઊંઘ જરૂરી છે.",
      digestion: lang === 'en' ? "Needs alkaline food intake; avoid high acidic, heavy spicy items." : lang === 'hi' ? "क्षारीय (alkaline) भोजन की आवश्यकता; अत्यधिक अम्लीय, तीखे और मसालेदार भोजन से बचें।" : "આલ્કલાઇન ખોરાકની જરૂરિયાત; અતિશય એસિડિક, તીખા અને મસાલેદાર ભોજનથી બચો.",
      tendencies: [
        lang === 'en' ? "Sensitive digestion system" : "संवेदनशील पाचन तंत्र",
        lang === 'en' ? "Late-night mental processing stress" : "देर रात तक सोचने से होने वाला तनाव",
        lang === 'en' ? "Minor lower back stiffness" : "पीठ के निचले हिस्से में हल्का खिंचाव"
      ],
      suggestions: [
        lang === 'en' ? "Drink alkaline or copper-infused water in the morning." : "सुबह तांबे के पात्र में रखा पानी पिएं।",
        lang === 'en' ? "Incorporate 10 minutes of gentle back-bending yoga poses." : "पीठ को लचीला बनाने के लिए १० मिनट योग करें।",
        lang === 'en' ? "Implement a strict 'no-screen' rule 45 minutes before sleeping." : "सोने से ४५ मिनट पहले मोबाइल स्क्रीन देखना बंद करें।"
      ]
    },
    spiritual: {
      intuition: lang === 'en' ? "Highly active, warning of upcoming strategic challenges beforehand through dreams." : lang === 'hi' ? "अत्यधिक सक्रिय, सपनों के माध्यम से आगामी रणनीतिक चुनौतियों की पहले से चेतावनी मिलना।" : "અત્યંત સક્રિય, સપના દ્વારા ભવિષ્યના પડકારોની અગાઉથી ચેતવણી મળવી.",
      meditationAbility: lang === 'en' ? "Excellent; can reach deep transcendental focus quickly if solar plexus is aligned." : lang === 'hi' ? "उत्कृष्ट; यदि चक्र संरेखित हों तो तेजी से गहन ध्यान प्राप्त कर सकते हैं।" : "ઉત્કૃષ્ટ; જો ચક્રો સંતુલિત હોય તો ઝડપથી ગહન ધ્યાન પ્રાપ્ત કરી શકે છે.",
      karma: lang === 'en' ? "Governed by fair Saturn, demands absolute justice and zero short-cuts to wealth." : lang === 'hi' ? "न्यायप्रिय शनि द्वारा शासित, पूर्ण ईमानदारी और धन के लिए किसी भी शार्ट-कट से बचने की मांग करता है।" : "ન્યાયપ્રિય શનિ દ્વારા સંચાલિત, સંપૂર્ણ પ્રામાણિકતા અને આર્થિક ક્ષેત્રે ટૂંકા રસ્તાઓ ન અપનાવવાની સલાહ આપે છે.",
      lifeLessons: lang === 'en' ? "To balance material acquisition with spiritual humility, respecting others' slower paces." : lang === 'hi' ? "भौतिक सफलता को आध्यात्मिक विनम्रता के साथ संतुलित करना, दूसरों की धीमी गति का सम्मान करना।" : "ભૌતિક સફળતાને આધ્યાત્મિક નમ્રતા સાથે સંતુલિત કરવી, અન્યોની ધીમી ગતિનું સન્માન કરવું.",
      pastLife: lang === 'en' ? "Shows history of a strategic advisor or designer of temples/empires in medieval realms." : lang === 'hi' ? "मध्यकालीन काल में एक रणनीतिक सलाहकार या मंदिरों/साम्राज्यों के योजनाकार होने का संकेत।" : "મધ્યકાલીન સમયમાં એક વ્યૂહાત્મક સલાહકાર અથવા સ્થાપત્યકાર હોવાના સંકેત.",
      soulGrowth: lang === 'en' ? "Succeeds deeply by establishing selfless charities and educating marginalized youth." : lang === 'hi' ? "निस्वार्थ सेवा और जरूरतमंद युवाओं को शिक्षित करने से आत्मा का विकास होता है।" : "નિઃસ્વાર્થ સેવા અને ગરીબ બાળકોને શિક્ષિત કરવાથી આત્માનો વિકાસ થાય છે.",
      purpose: lang === 'en' ? "To build durable legacy frameworks that empower humanity through calculated knowledge." : lang === 'hi' ? "टिकाऊ विरासत का निर्माण करना जो व्यावहारिक ज्ञान के माध्यम से मानवता को सशक्त बनाए।" : "ટકાવ વિરાસતનું નિર્માણ કરવું જે વ્યવહારિક જ્ઞાન દ્વારા માનવતાને સશક્ત બનાવે."
    },
    challenges: {
      biggest: lang === 'en' ? "Avoiding mental exhaustion due to over-calculating life events." : lang === 'hi' ? "जीवन की घटनाओं की अत्यधिक गणना के कारण होने वाली मानसिक थकावट से बचना।" : "જીવનની ઘટનાઓનું અતિશય વિશ્લેષણ કરવાથી થતા માનસિક થાકથી બચવું.",
      hiddenEnemy: lang === 'en' ? "Procrastination disguised as 'perfect planning before acting'." : lang === 'hi' ? "आलस्य जो 'काम करने से पहले सही योजना' के रूप में छिपा रहता है।" : "આળસ જે 'કાર્ય શરૂ કરતા પહેલા સંપૂર્ણ આયોજન' તરીકે છુપાયેલી રહે છે.",
      blocks: lang === 'en' ? "Slight fear of failure in public eyes, making you overly cautious." : lang === 'hi' ? "सार्वजनिक रूप से असफल होने का डर, जो आपको अत्यधिक सतर्क बनाता है।" : "જાહેરમાં અસફળ થવાનો ડર, જે તમને વધુ પડતો સાવચેત રાખે છે.",
      fears: lang === 'en' ? "Losing financial control or structural independence." : lang === 'hi' ? "वित्तीय नियंत्रण या स्वतंत्रता खोने का डर।" : "આર્થिक નિયંત્રણ અથવા સ્વતંત્રતા ગુમાવવાનો ડર.",
      beliefs: lang === 'en' ? "The sub-conscious belief that you must carry everything alone to get it done correctly." : lang === 'hi' ? "अचेतन धारणा कि किसी काम को सही ढंग से करने के लिए आपको सब कुछ अकेले ही करना होगा।" : "એવી અર્ધજાગ્રત માન્યતા કે કોઈ પણ કાર્ય સફળતાપૂર્વક કરવા માટે બધું એકલા હાથે જ કરવું પડશે.",
      transformation: lang === 'en' ? "Achieved by letting go of rigid plans and welcoming spontaneous flow of nature." : lang === 'hi' ? "कठोर योजनाओं को छोड़कर प्रकृति के सहज प्रवाह का स्वागत करने से होने वाला बदलाव।" : "કઠોર આયોજન છોડી પ્રકૃતિના સહજ પ્રવાહનો સ્વીકાર કરવાથી આવતું પરિવર્તન."
    },
    luckyFactors: {
      numbers: [driver, conductor, 1, 5, 6].filter((v, i, a) => a.indexOf(v) === i),
      dates: [1, 5, 9, 14, 18, 23, 27],
      days: [lang === 'en' ? "Sunday" : lang === 'hi' ? "रविवार" : "રવિવાર", lang === 'en' ? "Wednesday" : lang === 'hi' ? "बुधवार" : "બુધવાર", lang === 'en' ? "Friday" : lang === 'hi' ? "शुक्रवार" : "શુક્રવાર"],
      colors: [lang === 'en' ? "Emerald Green" : lang === 'hi' ? "पन्ना हरा" : "પન્ના લીલો", lang === 'en' ? "Golden" : lang === 'hi' ? "सुनहरा" : "સોનેરી", lang === 'en' ? "Royal Blue" : lang === 'hi' ? "शाही नीला" : "શાહી વાદળી"],
      directions: [lang === 'en' ? "East" : lang === 'hi' ? "पूर्व" : "પૂર્વ", lang === 'en' ? "North" : lang === 'hi' ? "उत्तर" : "ઉત્તર", lang === 'en' ? "Northeast" : lang === 'hi' ? "उत्तर-पूर्व" : "ઈશાન"],
      metals: [lang === 'en' ? "Gold" : lang === 'hi' ? "सोना" : "સોનું", lang === 'en' ? "Copper" : lang === 'hi' ? "तांबा" : "તાંબું"],
      gemstones: [lang === 'en' ? "Emerald" : lang === 'hi' ? "पन्ना" : "પન્ના", lang === 'en' ? "Yellow Sapphire" : lang === 'hi' ? "पुखराज" : "પીળો પુખરાજ", lang === 'en' ? "Diamond" : lang === 'hi' ? "हीरा" : "હીરો"],
      months: [lang === 'en' ? "January" : lang === 'hi' ? "जनवरी" : "જાન્યુઆરી", lang === 'en' ? "May" : lang === 'hi' ? "मई" : "મે", lang === 'en' ? "September" : lang === 'hi' ? "सितंबर" : "સપ્ટેમ્બર"],
      careers: [fieldsMap[lang][0], fieldsMap[lang][4]]
    },
    unluckyFactors: {
      numbers: [8, 4, 2].filter(n => n !== driver && n !== conductor),
      habitsToAvoid: [
        lang === 'en' ? "Procrastinating on vital structural business legalities." : "महत्वपूर्ण कानूनी कागजी कार्रवाई में देरी करना।",
        lang === 'en' ? "Late-night screen scroll during heavy stress periods." : "तनाव के समय देर रात तक मोबाइल देखना।"
      ],
      weakPeriods: [
        lang === 'en' ? "Mid October to late November yearly." : "प्रतिवर्ष अक्टूबर के मध्य से नवंबर के अंत तक का समय।"
      ],
      negativeTraits: [
        lang === 'en' ? "Slight ego battles with authority figures." : "अधिकारियों के साथ अहंकार का टकराव।",
        lang === 'en' ? "Stubborn opinion locking." : "अपने विचारों पर अड़ जाना।"
      ],
      riskAreas: [
        lang === 'en' ? "Acid reflux and digestive blocks." : "एसिडिटी और पाचन संबंधी समस्याएं।",
        lang === 'en' ? "Slow recovery in joint aches if ignored." : "जोड़ों के दर्द को नजरअंदाज करने पर धीमी रिकवरी।"
      ]
    },
    compatibility: {
      bestNumbers: [1, 5, 6],
      worstNumbers: [8, 4],
      businessPartner: lang === 'en' ? "Ideal matches are individuals with Psychic/Destiny numbers 1 or 5. They stimulate growth and bring corporate contracts." : lang === 'hi' ? "आदर्श मेल वे व्यक्ति हैं जिनका ड्राइवर या कंडक्टर १ या ५ है। वे विकास को गति देते हैं।" : "આદર્શ જોડાણ ડ્રાઈવર અથવા કંડક્ટર ૧ અથવા ૫ ધરાવતી વ્યક્તિઓ છે. તેઓ વિકાસને વેગ આપે છે.",
      marriagePartner: lang === 'en' ? "Numbers 1, 3, 5, and 6 bring the highest emotional stability, long-term love, and mutual luxury." : lang === 'hi' ? "नंबर १, ३, ५ और ६ उच्चतम भावनात्मक स्थिरता, दीर्घकालिक प्रेम और समृद्धि लाते हैं।" : "અંકો ૧, ૩, ૫ અને ૬ ઉચ્ચ ભાવનાત્મક સ્થિરતા, લાંબા ગાળાનો પ્રેમ અને સમૃદ્ધિ લાવે છે.",
      friendship: lang === 'en' ? "Excellent compatibility with numbers 3, 5, and 9. Enjoys deep analytical debates and traveling together." : lang === 'hi' ? "नंबर ३, ५ और ९ के साथ बेहतरीन तालमेल। एक साथ यात्रा करने और गहन चर्चा का आनंद लेते हैं।" : "અંકો ૩, ૫ અને ૯ સાથે ઉત્તમ સુમેળ. સાથે પ્રવાસ કરવા અને ગહન ચર્ચાઓનો આનંદ લે છે.",
      professionalNetwork: lang === 'en' ? "Seek alignments with number 1 executives for venture launches, and number 6 managers for PR expansions." : lang === 'hi' ? "नया उद्यम शुरू करने के लिए नंबर १ के अधिकारियों और जनसंपर्क के लिए नंबर ६ के प्रबंधकों से जुड़ें।" : "નવો વ્યવસાય શરૂ કરવા માટે અંક ૧ ના અધિકારીઓ અને પીઆર માટે અંક ૬ ના મેનેજરો સાથે જોડાઓ."
    },
    annualPrediction: {
      year: currentYear,
      personalYearNumber: personalYear,
      career: lang === 'en' ? "A highly dynamic year representing leadership expansions, new corporate alliances, and stable growth." : lang === 'hi' ? "नेतृत्व विस्तार, नए व्यावसायिक गठजोड़ और स्थिर विकास का एक अत्यधिक गतिशील वर्ष।" : "નેતૃત્વ વિસ્તાર, નવા વ્યાવસાયિક જોડાણો અને સ્થિર વિકાસનું અત્યંત ગતિશીલ વર્ષ.",
      money: lang === 'en' ? "Highly positive cash flow. Excellent time for real estate investments and asset expansion." : lang === 'hi' ? "सकारात्मक धन प्रवाह। रियल एस्टेट निवेश और संपत्ति विस्तार के लिए उत्कृष्ट समय।" : "હકારાત્મક આર્થિક પ્રવાહ. રિયલ એસ્ટેટ રોકાણ અને મિલકત વધારવા માટે ઉત્તમ સમય.",
      love: lang === 'en' ? "Harmonious domestic period. Single individuals can enter premium, long-term romantic relations." : lang === 'hi' ? "सामंजस्यपूर्ण पारिवारिक समय। अविवाहित जातक गंभीर संबंधों में प्रवेश कर सकते हैं।" : "સુમેળભર્યો કૌટુંબિક સમય. અપરિણીત લોકો ગંભીર સંબંધોમાં પ્રવેશી શકે છે.",
      health: lang === 'en' ? "Vitality is high, but digestive system demands careful alkaline dietary management." : lang === 'hi' ? "ऊर्जा का स्तर ऊंचा रहेगा, लेकिन पाचन तंत्र को क्षारीय भोजन की आवश्यकता है।" : "ઉર્જાનું સ્તર ઊંચું રહેશે, પરંતુ પાચનતંત્ર માટે હળવો ખોરાક લેવો જરૂરી છે.",
      travel: lang === 'en' ? "Frequent professional travels towards North and Northeast directions, yielding high monetary gains." : lang === 'hi' ? "उत्तर और उत्तर-पूर्व दिशाओं में लगातार पेशेवर यात्राएं, जिससे बड़ा वित्तीय लाभ होगा।" : "ઉત્તર અને ઈશાન દિશામાં વ્યવસાયિક પ્રવાસો, જે આર્થિક લાભ કરાવશે.",
      family: lang === 'en' ? "Poised and celebrating environment. Organizing grand auspicious functions in the household." : lang === 'hi' ? "उत्सव का माहौल। परिवार में बड़े मांगलिक कार्यों का आयोजन होने की संभावना।" : "ઉત્સવનું વાતાવરણ. પરિવારમાં મોટા માંગલિક કાર્યોનું આયોજન થવાની સંભાવના.",
      spiritual: lang === 'en' ? "Deep transcendental expansion; highly active intuition and successful meditative achievements." : lang === 'hi' ? "गहन आध्यात्मिक विस्तार; अत्यधिक सक्रिय अंतर्ज्ञान और सफल ध्यान उपलब्धियां।" : "ગહન આધ્યાત્મિક વિકાસ; અત્યંત સક્રિય અંતર્જ્ઞાન અને ધ્યાન પ્રવૃત્તિઓમાં સફળતા."
    },
    remedies: {
      morningRoutine: currRemedies.morning,
      meditation: currRemedies.meditation,
      affirmations: currRemedies.affirmations,
      colors: currRemedies.colors,
      numbers: [driver, conductor, 5, 1],
      lifestyleImprovements: currRemedies.lifestyle,
      charity: currRemedies.charity,
      mantras: currRemedies.mantras,
      gemstoneGuidance: lang === 'en' 
        ? "Wearing a natural 5.25 ratti Emerald (Panna) in silver on your right-hand little finger on Wednesdays can enhance Mercury's balance, business flow, and communication. (Disclaimer: Gems should be chosen based on individual charts; consult experts before wearing.)"
        : lang === 'hi'
          ? "बुधवार को दाहिने हाथ की कनिष्ठिका उंगली में चांदी में ५.२५ रत्ती का प्राकृतिक पन्ना पहनने से व्यापार और संवाद में वृद्धि हो सकती है। (अस्वीकरण: रत्नों का चयन व्यक्तिगत कुंडली के आधार पर किया जाना चाहिए; धारण करने से पहले विशेषज्ञों से सलाह लें।)"
          : "બુધવારે જમણા હાથની ટચલી આંગળીમાં ચાંદીમાં પન્ના રત્ન ધારણ કરવાથી વ્યાપાર અને સંવાદમાં સુધારો થઈ શકે છે. (અસ્વીકરણ: રત્નોની પસંદગી વ્યક્તિગત કુંડળીના આધારે થવી જોઈએ; ધારણ કરતા પહેલા નિષ્ણાતોની સલાહ લો.)"
    },
    dashboardRatings,
    aiNarrative
  };
};

// Relationship compatibility mode calculations for two grids
export interface CompatibilityResult {
  partner1: { name: string; dob: string; driver: number; conductor: number; grid: Record<number, number> };
  partner2: { name: string; dob: string; driver: number; conductor: number; grid: Record<number, number> };
  score: number;
  verdict: 'Excellent' | 'Good' | 'Average' | 'Challenging';
  analysis: string;
  synergyPoints: string[];
  challenges: string[];
  remedies: string[];
}

export const compareGrids = (
  name1: string, dob1: string,
  name2: string, dob2: string,
  lang: Language = 'en'
): CompatibilityResult => {
  const p1 = calculateDriverAndConductor(dob1);
  const p2 = calculateDriverAndConductor(dob2);

  const grid1: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
  const dStr1 = p1.day.toString().padStart(2, '0');
  const mStr1 = p1.month.toString().padStart(2, '0');
  const yStr1 = p1.year.toString().padStart(4, '0');
  const birthDigits1 = `${dStr1}${mStr1}${yStr1}`;
  for (const char of birthDigits1) {
    const digit = parseInt(char, 10);
    if (digit >= 1 && digit <= 9) grid1[digit]++;
  }
  if (p1.conductor >= 1 && p1.conductor <= 9) grid1[p1.conductor]++;

  const grid2: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
  const dStr2 = p2.day.toString().padStart(2, '0');
  const mStr2 = p2.month.toString().padStart(2, '0');
  const yStr2 = p2.year.toString().padStart(4, '0');
  const birthDigits2 = `${dStr2}${mStr2}${yStr2}`;
  for (const char of birthDigits2) {
    const digit = parseInt(char, 10);
    if (digit >= 1 && digit <= 9) grid2[digit]++;
  }
  if (p2.conductor >= 1 && p2.conductor <= 9) grid2[p2.conductor]++;

  // Calculate compatibility score deterministically
  const d1 = p1.driver;
  const d2 = p2.driver;
  const c1 = p1.conductor;
  const c2 = p2.conductor;

  const score1 = COMPATIBILITY_MATRIX[d1]?.[d2] || 'Average';
  const score2 = COMPATIBILITY_MATRIX[c1]?.[c2] || 'Average';

  let matchPoints = 50;
  if (score1 === 'Excellent') matchPoints += 20;
  else if (score1 === 'Good') matchPoints += 15;
  else if (score1 === 'Average') matchPoints += 10;
  else matchPoints -= 10;

  if (score2 === 'Excellent') matchPoints += 20;
  else if (score2 === 'Good') matchPoints += 15;
  else if (score2 === 'Average') matchPoints += 10;
  else matchPoints -= 10;

  // Synergy based on grid completion: how many numbers missing in p1 are present in p2 and vice-versa
  let synergyCount = 0;
  for (let i = 1; i <= 9; i++) {
    if (grid1[i] === 0 && grid2[i] > 0) synergyCount++;
    if (grid2[i] === 0 && grid1[i] > 0) synergyCount++;
  }
  matchPoints += synergyCount * 2;
  const score = Math.min(99, Math.max(35, matchPoints));

  let verdict: 'Excellent' | 'Good' | 'Average' | 'Challenging' = 'Average';
  if (score >= 85) verdict = 'Excellent';
  else if (score >= 70) verdict = 'Good';
  else if (score >= 50) verdict = 'Average';
  else verdict = 'Challenging';

  let analysis = "";
  let synergyPoints: string[] = [];
  let partnerChallenges: string[] = [];
  let relationshipRemedies: string[] = [];

  if (lang === 'en') {
    analysis = `The compatibility analysis between ${name1 || "Partner 1"} and ${name2 || "Partner 2"} reveals a score of ${score}%. The combination of Driver ${d1} & ${d2} creates a ${score1.toLowerCase()} foundational resonance. Their life goals (Conductors ${c1} & ${c2}) operate with a ${score2.toLowerCase()} synergy. They complement each other's missing numerological grids, allowing them to balance domestic duties and material growth smoothly.`;
    
    synergyPoints = [
      `Excellent grid completion synergy of ${synergyCount} complementary nodes, where one partner fills the other's gaps.`,
      `The logical, strategic approach of ${name1 || "Partner 1"} pairs beautifully with the expressive energy of ${name2 || "Partner 2"}.`,
      "Mutual attraction towards building a luxurious, structured, and lasting family lineage."
    ];
    partnerChallenges = [
      `Occasional power struggles due to clashing Driver energies (${d1} and ${d2}).`,
      "Misunderstandings arising from rigid opinions during high-stress business periods."
    ];
    relationshipRemedies = [
      "Keep a clean quartz or amethyst crystal cluster in the Southwest corner of your master bedroom.",
      "Avoid discussing high-pressure business finances directly at the dining table. Respect silent rest days.",
      "Engage in joint charity or feed birds together on Saturdays to ease Saturn/Mars friction."
    ];
  } else if (lang === 'hi') {
    analysis = `${name1 || "साथी १"} और ${name2 || "साथी २"} के बीच अनुकूलता विश्लेषण ${score}% का परिणाम दिखाता है। ड्राइवर ${d1} और ${d2} का संयोजन एक ${score1 === 'Excellent' ? 'शानदार' : score1 === 'Good' ? 'अच्छी' : 'सामान्य'} ऊर्जा पैदा करता है। वे एक-दूसरे के लो शू ग्रिड में लुप्त नंबरों को पूरा करते हैं, जिससे उनके बीच बेहतरीन तालमेल बनता है।`;
    
    synergyPoints = [
      `दोनों ग्रिड के बीच शानदार तालमेल है, जहां एक साथी की कमी को दूसरा पूरा करता है।`,
      `दोनों के जीवन मूल्यों में स्पष्ट संवाद और सहयोग की भावना।`,
      "एक साथ मिलकर विलासितापूर्ण और सुरक्षित भविष्य बनाने का साझा लक्ष्य।"
    ];
    partnerChallenges = [
      `ड्राइवर ऊर्जा (${d1} और ${d2}) के टकराव के कारण कभी-कभी अहंकार का टकराव।`,
      "तनावपूर्ण समय में संवाद की कमी होना।"
    ];
    relationshipRemedies = [
      "शयनकक्ष के दक्षिण-पश्चिम कोने में क्रिस्टल या क्रिस्टल बॉल स्थापित करें।",
      "घर के माहौल को शांत बनाए रखने के लिए एक साथ ध्यान का अभ्यास करें।",
      "सप्ताह में एक बार पक्षियों को अनाज डालें और गरीब बच्चों की मदद करें।"
    ];
  } else {
    analysis = `${name1 || "ભાગીદાર ૧"} અને ${name2 || "ભાગીદાર ૨"} વચ્ચે અનુકૂળતા વિશ્લેષણ ${score}% પરિણામ દર્શાવે છે. ડ્રાઈવર ${d1} અને ${d2} નું સંયોજન એક ${score1 === 'Excellent' ? 'ઉત્તમ' : score1 === 'Good' ? 'સારી' : 'સામાન્ય'} ઉર્જા પેદા કરે છે. તેઓ એકબીજાના ખૂટતા અંકો પૂરા કરે છે.`;
    
    synergyPoints = [
      "બંને ગ્રીડ વચ્ચે ઉત્તમ તાલમેલ, જ્યાં એક ભાગીદાર બીજાના ખૂટતા અંકો પૂરા પાડે છે.",
      "બંને વચ્ચે સંગઠન અને સ્પષ્ટ સંવાદની ભાવના.",
      "સાથે મળીને આર્થિક અને ભૌતિક સમૃદ્ધિ મેળવવાનો સમાન ધ્યેય."
    ];
    partnerChallenges = [
      `ડ્રાઈવર ઉર્જા (${d1} અને ${d2}) ના પ્રભાવને કારણે ક્યારેક અહંકારનો વિવાદ.`,
      "તણાવના સમયે વિચારોની આપ-લેમાં મુશ્કેલી."
    ];
    relationshipRemedies = [
      "રૂમના નૈઋત્ય (SW) ખૂણામાં સ્ફટિક રાખો.",
      "પરિવારમાં શાંતિ વધારવા માટે સાથે મળીને ધ્યાનનો અભ્યાસ કરો.",
      "શનિવારે પક્ષીઓને ચણ આપો અને જરૂરિયાતમંદોને દાન કરો."
    ];
  }

  return {
    partner1: { name: name1 || "Partner 1", dob: dob1, driver: d1, conductor: c1, grid: grid1 },
    partner2: { name: name2 || "Partner 2", dob: dob2, driver: d2, conductor: c2, grid: grid2 },
    score,
    verdict,
    analysis,
    synergyPoints,
    challenges: partnerChallenges,
    remedies: relationshipRemedies
  };
};
