import { CompleteNumerologyProfile } from '../core/types';
import { deriveExpertConsultationDossier } from '../core/expertConsultationEngine';

export interface LocalizedPersonalYear {
  yearNumber: number;
  title: string;
  theme: string;
  forecast: string;
  careerGuidance: string;
  career?: string;
  finance?: string;
  relationships?: string;
  recommendedFocus?: string;
  relationshipAdvice: string;
  recommendedActions: string[];
  [key: string]: any;
}

export function getPlanetName(num: number, lang: string = 'en'): string {
  const map: Record<number, { en: string; hi: string }> = {
    1: { en: 'Sun', hi: 'सूर्य' },
    2: { en: 'Moon', hi: 'चन्द्र' },
    3: { en: 'Jupiter', hi: 'बृहस्पति' },
    4: { en: 'Rahu', hi: 'राहु' },
    5: { en: 'Mercury', hi: 'बुध' },
    6: { en: 'Venus', hi: 'शुक्र' },
    7: { en: 'Ketu', hi: 'केतु' },
    8: { en: 'Saturn', hi: 'शनि' },
    9: { en: 'Mars', hi: 'मंगल' }
  };
  const item = map[num] || map[1];
  return lang === 'hi' ? `${item.hi} (${item.en})` : `${item.en} (${item.hi})`;
}

export function getLocalizedNumberMeaning(num: number, lang: string = 'en') {
  return {
    number: num,
    title: getPlanetName(num, lang),
    keyword: num === 1 ? 'Leadership' : num === 5 ? 'Commerce' : 'Harmony',
    description: `Core vibration ruled by ${getPlanetName(num, lang)}.`
  };
}

export function getLocalized81Yoga(driver: number, conductor: number, lang: string = 'en') {
  return {
    combination: `${driver}-${conductor}`,
    title: `Yoga of ${getPlanetName(driver, lang)} & ${getPlanetName(conductor, lang)}`,
    description: 'Harmonious mutual resonance supporting purposeful career trajectory.',
    favorableLevel: 'HIGH'
  };
}

export function getLocalizedPlane(planeName: string, lang: string = 'en') {
  return {
    name: planeName,
    title: planeName,
    description: 'Active vibrational balance across the Lo Shu square.'
  };
}

export function getLocalizedPersonalYear(pyNum: number, yearOrLang: number | string = 'en', maybeLang: string = 'en'): LocalizedPersonalYear {
  const titles: Record<number, string> = {
    1: 'New Beginnings & Pioneering Drive',
    2: 'Patience & Cooperative Partnerships',
    3: 'Creative Expansion & Social Visibility',
    4: 'Discipline, Hard Work & Solid Foundations',
    5: 'Dynamic Freedom, Travel & Commercial Shifts',
    6: 'Domestic Harmony, Family Love & Luxury',
    7: 'Spiritual Research, Wisdom & Solitude',
    8: 'Material Authority, Financial Harvest & Power',
    9: 'Completion, Cleansing & Philanthropic Closure'
  };

  return {
    yearNumber: pyNum,
    title: titles[pyNum] || titles[1],
    theme: titles[pyNum] || titles[1],
    forecast: `Year ${pyNum} offers energetic opportunities to elevate your life path.`,
    careerGuidance: 'Focus on strategic planning and disciplined execution.',
    career: 'रणनीतिक योजना व अनुशासित निष्पादन पर ध्यान केंद्रित करें।',
    finance: 'स्थिर एवं दीर्घकालिक निवेश से धन वृद्धि के अनुकूल योग।',
    relationships: 'सहानुभूति, धैर्य एवं माधुर्य से संबंधों में प्रगाढ़ता।',
    recommendedFocus: 'आत्म-सुधार, नए कौशल व व्यक्तिगत ऊर्जा संतुलन।',
    relationshipAdvice: 'Communicate with empathy, patience, and warmth.',
    recommendedActions: ['Align daily routines with your core number', 'Practice gratitude and charity']
  };
}

export function buildLocalizedExpertDossier(profile: CompleteNumerologyProfile, lang: string = 'en'): any {
  const dossier = deriveExpertConsultationDossier(profile);
  const py = profile?.personalYear || 1;

  const monthNames = [
    'जनवरी (Jan)', 'फरवरी (Feb)', 'मार्च (Mar)', 'अप्रैल (Apr)',
    'मई (May)', 'जून (Jun)', 'जुलाई (Jul)', 'अगस्त (Aug)',
    'सितंबर (Sep)', 'अक्टूबर (Oct)', 'नवंबर (Nov)', 'दिसंबर (Dec)'
  ];

  const monthlyDashaForecast = monthNames.map((name, idx) => {
    const pm = ((py + idx + 1 - 1) % 9) + 1;
    return {
      monthIndex: idx + 1,
      monthNameActive: name,
      monthNameHi: name,
      monthNameEn: name,
      py,
      pm,
      primaryTheme: `माह ${idx + 1} अंक ${pm} ऊर्जा - प्रगति एवं नवीन अवसर`,
      careerFinanceGuidance: 'कार्यक्षेत्र में विस्तार व योजनाबद्ध निवेश से लाभ।',
      relationshipFamilyGuidance: 'पारिवारिक सहयोग व आत्मीयता में वृद्धि।'
    };
  });

  return {
    ...dossier,
    consultantSnapshot: {
      ...dossier.consultantSnapshot,
      dominantEnergy: dossier.consultantSnapshot.dominantEnergyHi,
      coreVerdict: dossier.consultantSnapshot.coreVerdictHi,
      strategicCaution: dossier.consultantSnapshot.strategicCautionHi,
      bestAvenue: dossier.consultantSnapshot.bestAvenueHi
    },
    monthlyDashaForecast
  };
}
