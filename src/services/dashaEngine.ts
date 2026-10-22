export interface MahadashaCycle {
  planet: number;
  planetName: string;
  startYear: number;
  endYear: number;
  startAge: number;
  endAge: number;
  durationYears: number;
  description: string;
  careerImpact: string;
  financialImpact: string;
  healthImpact: string;
  relationshipImpact: string;
}

export interface AntardashaCycle {
  subPlanetNumber: number;
  subPlanetName: string;
  calendarYear: number;
  ageOfInfluence: number;
  forecast: string;
}

export interface DashaAnalysisReport {
  currentMahadasha: MahadashaCycle;
  currentAntardasha: AntardashaCycle;
  currentYear: number;
  personalYearNumber: number;
  personalYearForecast: string;
  mahadashasList: MahadashaCycle[];
}

export function calculateDashaAndYearForecast(dob: string, targetYear: number = new Date().getFullYear()): DashaAnalysisReport {
  const parts = dob.split('-').map(Number);
  const birthYear = parts[0] || 1990;
  const birthMonth = parts[1] || 1;
  const birthDay = parts[2] || 1;

  // Calculate Driver (Birth number)
  let driver = birthDay;
  while (driver > 9) {
    driver = driver.toString().split('').reduce((acc, d) => acc + Number(d), 0);
  }

  // Calculate Personal Year for targetYear
  const pySum = `${birthDay}${birthMonth}${targetYear}`.split('').reduce((acc, d) => acc + Number(d), 0);
  let personalYearNumber = pySum;
  while (personalYearNumber > 9) {
    personalYearNumber = personalYearNumber.toString().split('').reduce((acc, d) => acc + Number(d), 0);
  }

  const planetNames: Record<number, string> = {
    1: 'Sun (सूर्य महादशा)',
    2: 'Moon (चन्द्र महादशा)',
    3: 'Jupiter (बृहस्पति महादशा)',
    4: 'Rahu (राहु महादशा)',
    5: 'Mercury (बुध महादशा)',
    6: 'Venus (शुक्र महादशा)',
    7: 'Ketu (केतु महादशा)',
    8: 'Saturn (शनि महादशा)',
    9: 'Mars (मंगल महादशा)'
  };

  const planetDurations: Record<number, number> = {
    1: 6,
    2: 10,
    3: 16,
    4: 18,
    5: 17,
    6: 20,
    7: 7,
    8: 19,
    9: 7
  };

  const planetImpacts: Record<number, { career: string; finance: string; health: string; relationship: string; desc: string }> = {
    1: {
      desc: 'Period of high executive visibility, government connections, and leadership breakthrough.',
      career: 'Promotions to managerial roles, launching independent initiatives, and authority recognition.',
      finance: 'Consistent monetary gains from public sector, corporate clients, and stable investments.',
      health: 'High vitality, but monitor blood pressure, eye strain, and heart health.',
      relationship: 'Dignified relations, though ego conflicts must be moderated with tact.'
    },
    2: {
      desc: 'Period of emotional intuition, public empathy, creative partnerships, and travel.',
      career: 'Flourishing in hospitality, creative writing, cinema, counseling, and human resources.',
      finance: 'Fluctuating liquidity; keep liquid emergency funds and avoid impulsive speculative investments.',
      health: 'Focus on hydration, emotional calm, digestive tract, and sound sleep.',
      relationship: 'Deep emotional bonding, romantic warmth, and nurturing domestic ties.'
    },
    3: {
      desc: 'Golden period of wisdom, scholarly learning, consulting expansion, and spiritual grace.',
      career: 'High-level advisory posts, educational honors, corporate directorships, and legal success.',
      finance: 'Substantial wealth accumulation through ethical knowledge, assets, and mentorship rewards.',
      health: 'Watch out for liver fat, cholesterol, pancreatic balance, and weight gain.',
      relationship: 'Joyful family harmony, children’s scholastic success, and social veneration.'
    },
    4: {
      desc: 'Intense karmic transformational period with sudden digital breakthroughs and unexpected shifts.',
      career: 'Rapid unconventional rise in tech, media, politics, foreign markets, and high-tech ventures.',
      finance: 'Sudden unexpected windfalls alternating with sudden expenses; avoid unvetted contracts.',
      health: 'Guard against nervous tension, restless sleep, phobias, and respiratory sensitivities.',
      relationship: 'Unpredictable family dynamics; requires clear transparent communication.'
    },
    5: {
      desc: 'High-speed commercial era of versatile trading, networking, media launches, and business scaling.',
      career: 'Dynamic commercial ventures, marketing triumphs, publishing, and international trade.',
      finance: 'Rapid liquid cash turnover, diverse multiple income streams, and commercial real estate.',
      health: 'High nervous activity; practice grounding pranayama and guard against vocal strain.',
      relationship: 'Playful, lively, communicative social circle with numerous helpful alliances.'
    },
    6: {
      desc: 'Auspicious cycle of luxury, matrimonial happiness, aesthetic mastery, and vehicle acquisitions.',
      career: 'Booming prosperity in design, fashion, architecture, jewellery, food, and hospitality.',
      finance: 'Luxurious asset accumulation, high lifestyle comfort, and reliable handsome earnings.',
      health: 'Maintain hormonal balance, kidney hydration, and reduce rich sugary foods.',
      relationship: 'Sensual marital bliss, harmonious social prestige, and warm domestic celebrations.'
    },
    7: {
      desc: 'Sacred introspective period of spiritual illumination, research brilliance, and detachment.',
      career: 'Supreme breakthroughs in data science, occult sciences, philosophy, and strategic audits.',
      finance: 'Focus shifts towards value rather than blind greed; solid gains through specialized niches.',
      health: 'Prioritize mental detoxification, deep meditation, and allergy prevention.',
      relationship: 'Quiet introspection; requires understanding partners who respect solitary study hours.'
    },
    8: {
      desc: 'Mighty cycle of Saturnian perseverance, monumental industrial endurance, and permanent empire building.',
      career: 'Unshakable authority forged through hard discipline, manufacturing, judiciary, and civic infrastructure.',
      finance: 'Slow but rock-solid compounding; long-term land, metals, and enduring institutional wealth.',
      health: 'Take care of joint mobility, bone calcium, dental health, and back posture.',
      relationship: 'Loyal and enduring commitments; occasional emotional gravity that softens with time.'
    },
    9: {
      desc: 'Dynamic period of alpha vitality, courage, sports/engineering leadership, and decisive victories.',
      career: 'Commanding leadership in law enforcement, surgery, engineering, real estate, and sports.',
      finance: 'Aggressive wealth building through bold property acquisitions and decisive ventures.',
      health: 'Watch inflammation, muscular injuries, burns, and keep temper cool.',
      relationship: 'Passionate and fiercely protective, though impatience must be kept in check.'
    }
  };

  // Build sequential Mahadashas starting from driver planet
  const mahadashasList: MahadashaCycle[] = [];
  let currentStartYear = birthYear;
  let currentStartAge = 0;
  let planetSeq = driver;

  for (let i = 0; i < 9; i++) {
    const duration = planetDurations[planetSeq] || 10;
    const endYear = currentStartYear + duration;
    const endAge = currentStartAge + duration;
    const impact = planetImpacts[planetSeq] || planetImpacts[1];

    mahadashasList.push({
      planet: planetSeq,
      planetName: planetNames[planetSeq] || `Planet ${planetSeq}`,
      startYear: currentStartYear,
      endYear,
      startAge: currentStartAge,
      endAge,
      durationYears: duration,
      description: impact.desc,
      careerImpact: impact.career,
      financialImpact: impact.finance,
      healthImpact: impact.health,
      relationshipImpact: impact.relationship
    });

    currentStartYear = endYear;
    currentStartAge = endAge;
    planetSeq = (planetSeq % 9) + 1;
  }

  // Find active Mahadasha for targetYear
  const activeMahadasha =
    mahadashasList.find(m => targetYear >= m.startYear && targetYear < m.endYear) ||
    mahadashasList[0];

  // Calculate active Antardasha
  const yearsInCurrentDasha = Math.max(0, targetYear - activeMahadasha.startYear);
  const subPlanet = ((activeMahadasha.planet + yearsInCurrentDasha - 1) % 9) + 1;
  const userAge = targetYear - birthYear;

  const currentAntardasha: AntardashaCycle = {
    subPlanetNumber: subPlanet,
    subPlanetName: planetNames[subPlanet] || `Planet ${subPlanet}`,
    calendarYear: targetYear,
    ageOfInfluence: userAge,
    forecast: `In this year ${targetYear}, the energetic sub-influence is governed by ${planetNames[subPlanet]}. Expect accelerated focus on ${planetImpacts[subPlanet]?.career || 'strategic growth'}. Synchronize high-priority undertakings with this planetary vibration.`
  };

  const pyForecasts: Record<number, string> = {
    1: 'A dynamic year of fresh beginnings, pioneering initiatives, and bold leadership choices.',
    2: 'A year of diplomatic collaboration, patience, emotional bonding, and intuitive connections.',
    3: 'A year of creative expansion, self-expression, joyful networking, and intellectual recognition.',
    4: 'A year of rigorous organization, foundational discipline, hard work, and security building.',
    5: 'A year of dynamic movement, travel, exciting transformations, and commercial versatility.',
    6: 'A year of domestic harmony, relationship commitment, home embellishment, and family duties.',
    7: 'A year of spiritual self-reflection, research, meditation, and mental rejuvenation.',
    8: 'A year of material mastery, financial authority, executive scaling, and karmic harvest.',
    9: 'A year of completion, clearing stale baggage, philanthropic closure, and preparing for the next 9-year cycle.'
  };

  return {
    currentMahadasha: activeMahadasha,
    currentAntardasha,
    currentYear: targetYear,
    personalYearNumber,
    personalYearForecast: pyForecasts[personalYearNumber] || pyForecasts[1],
    mahadashasList
  };
}
