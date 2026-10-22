import { CompleteNumerologyProfile } from './types';

export interface ExpertConsultationDossier {
  consultantSnapshot: {
    dominantEnergy?: string;
    coreVerdict?: string;
    strategicCaution?: string;
    bestAvenue?: string;
    dominantEnergyHi?: string;
    coreVerdictHi?: string;
    strategicCautionHi?: string;
    bestAvenueHi?: string;
    [key: string]: any;
  };
  expertSummary: {
    timeCycleGuidance: string;
    strongestTrait?: string;
    developmentArea?: string;
    careerDirection?: string;
    relationshipGuidance?: string;
    primaryRemedy?: string;
    masterAdvice?: string;
    [key: string]: any;
  };
  tithiAnkAnalysis: {
    birthDate: number;
    compoundTitle: string;
    tithiNatureHi: string;
    numericalFrequencyHi: string;
    [key: string]: any;
  };
  grahDrishti: {
    relationshipLabelHi: string;
    synergyNarrativeHi: string;
    dominantAspects: Array<{ title: string; description: string; score: number; planetPair?: string; vibeHi?: string; lifeImpactHi?: string; [key: string]: any }>;
    [key: string]: any;
  };
  uniqueAboutYou: {
    cosmicSignature: string;
    hiddenGift: string;
    distinctiveAura: string;
    [key: string]: any;
  };
  lifeChallenges: Array<{ title: string; trigger: string; mitigation: string }>;
  characteristicsProfile: {
    thinkingStyle: string;
    emotionalResponse: string;
    workHabit: string;
    socialConduct: string;
    leadershipTrait: string;
    [key: string]: any;
  };
  educationAnalysis: {
    learningStyle: string;
    studyDirection: string;
    academicStrengths: string[];
    suitableDisciplines: string[];
    [key: string]: any;
  };
  careerDeepDive: {
    primaryAvenues: string[];
    entrepreneurialFit: string;
    [key: string]: any;
  };
  lifestyleSuggestions?: {
    dailyRoutineHi?: string;
    dietaryGuidelineHi?: string;
    mindfulnessPracticeHi?: string;
    favorableTimingHi?: string;
    [key: string]: any;
  };
  balancingRemedies?: {
    primaryYantraHi?: string;
    sacredMantraHi?: string;
    luckyColorsHi?: string[];
    crystalRecommendationHi?: string;
    planetaryCharityHi?: string;
    signatureRecommendationHi?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

export function deriveExpertConsultationDossier(profile: CompleteNumerologyProfile): ExpertConsultationDossier {
  const driver = profile?.driver || 1;
  const conductor = profile?.conductor || 1;
  const day = Number((profile?.dob || '1990-01-01').split('-')[2]) || driver;

  return {
    consultantSnapshot: {
      dominantEnergy: `Resonance of Driver ${driver} & Conductor ${conductor}`,
      coreVerdict: 'High executive leadership capability with steady expansion potential.',
      strategicCaution: 'Exercise prudence during rapid contract signings.',
      bestAvenue: 'Strategic consultancy, business ownership, and innovation.',
      dominantEnergyHi: `मूलांक ${driver} एवं भाग्यांक ${conductor} का विशिष्ट समन्वय`,
      coreVerdictHi: 'उच्च नेतृत्व क्षमता और आत्म-निर्भरता के साथ निरंतर उन्नति का योग।',
      strategicCautionHi: 'महत्वपूर्ण वित्तीय अनुबंधों में अत्यधिक जल्दबाजी से बचें।',
      bestAvenueHi: 'परामर्श, प्रबंधन, नवाचार और स्वतंत्र व्यावसायिक उपक्रम।'
    },
    expertSummary: {
      timeCycleGuidance: 'वर्तमान समय चक्र में धैर्यपूर्वक दीर्घकालिक लक्ष्यों पर ध्यान केंद्रित करें।',
      strongestTrait: 'निर्णय लेने की अचूक क्षमता एवं स्वाभाविक अनुशासन।',
      developmentArea: 'सहकर्मियों के विचारों को सुनने और लचीलापन अपनाने का अभ्यास।',
      careerDirection: 'उच्च प्रबंधन, स्वतंत्र व्यवसाय, तकनीक और परामर्श के क्षेत्र।',
      relationshipGuidance: 'खुले संवाद और आपसी सम्मान से पारिवारिक समरसता सुदृढ़ होगी।',
      primaryRemedy: 'नित्य उगते सूर्य को तांबे के लोटे से जल अर्पित करें।',
      masterAdvice: 'अपने मूलांक के अनुकूल अंकों (1, 5, 6) के साथ कार्य योजनाएं आरंभ करें।'
    },
    lifestyleSuggestions: {
      dailyRoutineHi: 'प्रातः सूर्योदय से पूर्व उठकर 15 मिनट ध्यान एवं योग करें।',
      dietaryGuidelineHi: 'सात्विक, सुपाच्य एवं ताजे फलों व हरी सब्जियों का अधिक सेवन करें।',
      mindfulnessPracticeHi: 'संध्या समय 10 मिनट मौन रहकर आत्म-मंथन करें।',
      favorableTimingHi: 'प्रातः 8 बजे से 11 बजे तक का समय महत्वपूर्ण निर्णयों हेतु उत्तम है।'
    },
    balancingRemedies: {
      primaryYantraHi: 'श्री सूर्य यंत्र अथवा संपूर्ण नवग्रह यंत्र की स्थापना करें।',
      sacredMantraHi: 'ॐ सूर्याय नमः अथवा गायत्री मंत्र का नित्य 108 बार जाप करें।',
      luckyColorsHi: ['हल्का पीला (Yellow)', 'क्रीम (Cream)', 'नारंगी (Orange)'],
      crystalRecommendationHi: 'प्राकृतिक सनस्टोन अथवा माणिक्य उपरत्न धारण करें।',
      planetaryCharityHi: 'रविवार को गुड़, गेहूं अथवा तांबे के पात्र का दान करें।',
      signatureRecommendationHi: 'हस्ताक्षर को 15 से 45 डिग्री ऊपर की ओर उठावदार बनाएं।'
    },
    tithiAnkAnalysis: {
      birthDate: day,
      compoundTitle: `जन्म दिवस ऊर्जा अंक ${day}`,
      tithiNatureHi: 'सकारात्मक एवं कर्मनिष्ठ दिन कंपन',
      numericalFrequencyHi: 'यह अंक आपको स्वतंत्र विचार और निर्णय लेने की दृढ़ता देता है।'
    },
    grahDrishti: {
      relationshipLabelHi: 'मित्र ग्रहीय दृष्टि संबंध',
      synergyNarrativeHi: `मूलांक ${driver} और भाग्यांक ${conductor} के मध्य प्राकृतिक सौहार्द उपस्थित है।`,
      dominantAspects: [
        { title: 'आत्मविश्वास एवं प्रतिष्ठा', description: 'समाज में पहचान और नेतृत्व की स्वाभाविक क्षमता।', score: 85 },
        { title: 'धन संचय क्षमता', description: 'अनुशासित निवेश से स्थिर वित्तीय विस्तार।', score: 80 }
      ]
    },
    uniqueAboutYou: {
      cosmicSignature: `सौर एवं ग्रहीय प्रकाश पुंज (Solar Vibration ${driver})`,
      hiddenGift: 'गहन परिस्थितियों में शीघ्र और सटीक निर्णय लेने का सहज ज्ञान।',
      distinctiveAura: 'सम्मानजनक, प्रभावशाली एवं मार्गदर्शक आभा मंडल।'
    },
    lifeChallenges: [
      { title: 'अति-संवेदनशीलता अथवा अधीरता', trigger: 'धीमी प्रगति के समय मानसिक तनाव', mitigation: 'दैनिक 10 मिनट प्राणायाम एवं धैर्य का अभ्यास।' }
    ],
    characteristicsProfile: {
      thinkingStyle: 'रणनीतिक, तार्किक और भविष्योन्मुख सोच।',
      emotionalResponse: 'संतुलित एवं गरिमापूर्ण अभिव्यक्ति।',
      workHabit: 'समर्पण और पूर्णतावादी दृष्टिकोण।',
      socialConduct: 'सम्मानजनक, विनम्र और प्रेरक व्यवहार।',
      leadershipTrait: 'सहकर्मियों को साथ लेकर आगे बढ़ने की प्रेरणादायी शैली।'
    },
    educationAnalysis: {
      learningStyle: 'व्यावहारिक अनुप्रयोग एवं वैचारिक समझ।',
      studyDirection: 'उत्तर अथवा पूर्व दिशा की ओर मुख करके अध्ययन।',
      academicStrengths: ['तार्किक विश्लेषण', 'प्रबंधन', 'संचार कौशल'],
      suitableDisciplines: ['वाणिज्य एवं अर्थशास्त्र', 'तकनीक एवं डेटा', 'प्रशासनिक सेवाएं']
    },
    careerDeepDive: {
      primaryAvenues: ['सलाहकार एवं परामर्श', 'कॉर्पोरेट प्रबंधन', 'उद्यमशीलता एवं नवाचार'],
      entrepreneurialFit: 'उच्च — स्वतंत्र निर्णय लेने में अत्यंत कुशल।'
    }
  };
}
