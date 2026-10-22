export interface NumeroVaastuResult {
  kuaNumber: number;
  rulingElement: string;
  groupType: 'EAST_GROUP' | 'WEST_GROUP';
  directions: {
    success: { direction: string; description: string };
    health: { direction: string; description: string };
    family: { direction: string; description: string };
    personalDev: { direction: string; description: string };
    avoidList: string[];
  };
  remedies: {
    idealBedFacing: string;
    idealDeskFacing: string;
  };
  colourCorrection: {
    luckyColours: string[];
    balanceColours: string[];
    antiColours: string[];
  };
  zonesReport: {
    careerZone: { enhancement: string };
    moneyZone: { enhancement: string };
    relationshipZone: { enhancement: string };
  };
  loShuVaastuRemedies: Array<{
    digit: number;
    title: string;
    element: string;
    zone: string;
    remedy: string;
    impact: string;
  }>;
}

export function generateNumeroVaastuReport(dob: string, gender: string = 'MALE', name: string = 'Seeker'): NumeroVaastuResult {
  const parts = dob.split('-').map(Number);
  const year = parts[0] || 1990;

  // Calculate Kua Number based on lunar birth year & gender
  // Sum of last two digits of birth year
  const lastTwoDigitsSum = (year % 100)
    .toString()
    .split('')
    .reduce((acc, digit) => acc + Number(digit), 0);
  let reducedYear = lastTwoDigitsSum;
  while (reducedYear > 9) {
    reducedYear = reducedYear.toString().split('').reduce((acc, d) => acc + Number(d), 0);
  }

  const isFemale = (gender || '').toUpperCase() === 'FEMALE';
  let kuaNumber: number;

  if (isFemale) {
    kuaNumber = reducedYear + 5;
    while (kuaNumber > 9) {
      kuaNumber = kuaNumber.toString().split('').reduce((acc, d) => acc + Number(d), 0);
    }
    if (kuaNumber === 5) kuaNumber = 8; // Female Kua 5 becomes 8
  } else {
    kuaNumber = 10 - reducedYear;
    while (kuaNumber > 9) {
      kuaNumber = kuaNumber.toString().split('').reduce((acc, d) => acc + Number(d), 0);
    }
    if (kuaNumber === 5) kuaNumber = 2; // Male Kua 5 becomes 2
  }

  // East Group: 1, 3, 4, 9
  // West Group: 2, 6, 7, 8
  const isEastGroup = [1, 3, 4, 9].includes(kuaNumber);
  const groupType: 'EAST_GROUP' | 'WEST_GROUP' = isEastGroup ? 'EAST_GROUP' : 'WEST_GROUP';

  const elementMap: Record<number, string> = {
    1: 'Water (जल)',
    2: 'Earth (पृथ्वी)',
    3: 'Wood (काष्ठ)',
    4: 'Wood / Wind (काष्ठ)',
    6: 'Hard Metal (स्वर्ण धातु)',
    7: 'Soft Metal (चांदी धातु)',
    8: 'Mountain Earth (अचल पृथ्वी)',
    9: 'Fire (अग्नि)'
  };

  const luckyColoursMap: Record<number, { lucky: string[]; balance: string[]; anti: string[] }> = {
    1: { lucky: ['Deep Navy', 'Royal Blue', 'Black'], balance: ['White', 'Metallic Silver'], anti: ['Bright Red', 'Yellow Ochre'] },
    2: { lucky: ['Warm Ochre', 'Terracotta', 'Beige'], balance: ['Rose Gold', 'Warm White'], anti: ['Forest Green', 'Dark Brown'] },
    3: { lucky: ['Emerald Green', 'Jade', 'Forest Green'], balance: ['Ocean Blue', 'Teal'], anti: ['Metallic Chrome', 'Pure White'] },
    4: { lucky: ['Mint Green', 'Pastel Jade', 'Olive'], balance: ['Sky Blue', 'Turquoise'], anti: ['Polished Steel', 'Bright Gold'] },
    6: { lucky: ['Metallic White', 'Champagne Gold', 'Platinum'], balance: ['Earth Beige', 'Pale Sand'], anti: ['Crimson Red', 'Neon Coral'] },
    7: { lucky: ['Silvery White', 'Moonlight Cream', 'Soft Grey'], balance: ['Light Sandstone', 'Ivory'], anti: ['Bright Scarlet', 'Fiery Orange'] },
    8: { lucky: ['Earthy Brown', 'Clay Terracotta', 'Sand'], balance: ['Warm Amber', 'Coral'], anti: ['Emerald Green', 'Deep Olive'] },
    9: { lucky: ['Crimson Red', 'Royal Purple', 'Burgundy'], balance: ['Emerald Green', 'Teal'], anti: ['Midnight Black', 'Deep Navy Blue'] }
  };

  const colors = luckyColoursMap[kuaNumber] || luckyColoursMap[1];

  const directionsData: Record<number, any> = {
    1: {
      success: { direction: 'Southeast (SE)', description: 'Activates rapid financial growth, client attraction, and career promotions.' },
      health: { direction: 'East (E)', description: 'Invigorates physical vitality, restful sleep, and immunity.' },
      family: { direction: 'South (S)', description: 'Fosters domestic bliss, warm reputation, and mutual understanding.' },
      personalDev: { direction: 'North (N)', description: 'Deepens intuition, study concentration, and spiritual clarity.' },
      avoidList: ['West', 'Northwest', 'Southwest', 'Northeast']
    },
    2: {
      success: { direction: 'Northeast (NE)', description: 'Unlocks solid asset building, property deals, and long-term monetary stability.' },
      health: { direction: 'West (W)', description: 'Accelerates recuperation, builds mental stamina, and lowers stress.' },
      family: { direction: 'Northwest (NW)', description: 'Attracts helpful mentors, family loyalty, and trustworthy alliances.' },
      personalDev: { direction: 'Southwest (SW)', description: 'Grounds emotional peace, relationship harmony, and leadership authority.' },
      avoidList: ['North', 'East', 'Southeast', 'South']
    },
    3: {
      success: { direction: 'South (S)', description: 'Magnifies public fame, social visibility, and executive achievements.' },
      health: { direction: 'North (N)', description: 'Calms blood pressure, restores vitality, and cleanses bodily fluids.' },
      family: { direction: 'Southeast (SE)', description: 'Promotes sibling harmony, financial blessings, and warm domestic joy.' },
      personalDev: { direction: 'East (E)', description: 'Sparks creative breakthroughs, entrepreneurial vision, and wisdom.' },
      avoidList: ['West', 'Northwest', 'Southwest', 'Northeast']
    },
    4: {
      success: { direction: 'North (N)', description: 'Generates progressive income flow, digital expansion, and business deals.' },
      health: { direction: 'South (S)', description: 'Nourishes the heart, improves energy flow, and banishes lethargy.' },
      family: { direction: 'East (E)', description: 'Strengthens ancestral goodwill, joyful children, and loving marriage.' },
      personalDev: { direction: 'Southeast (SE)', description: 'Enriches artistic communication, writing clarity, and wealth mastery.' },
      avoidList: ['West', 'Northwest', 'Southwest', 'Northeast']
    },
    6: {
      success: { direction: 'West (W)', description: 'Harvests abundant financial ROI, commercial expansion, and closing high-ticket deals.' },
      health: { direction: 'Northeast (NE)', description: 'Clarifies mental vision, strengthens spine and bones, promotes deep peace.' },
      family: { direction: 'Southwest (SW)', description: 'Deepens marital affection, mutual respect, and household tranquility.' },
      personalDev: { direction: 'Northwest (NW)', description: 'Cultivates executive majesty, corporate command, and guardian support.' },
      avoidList: ['North', 'East', 'Southeast', 'South']
    },
    7: {
      success: { direction: 'Northwest (NW)', description: 'Draws powerful patron mentors, international partnerships, and high credibility.' },
      health: { direction: 'Southwest (SW)', description: 'Protects the digestive tract, calms anxiety, and restores sound sleep.' },
      family: { direction: 'Northeast (NE)', description: 'Inspires spiritual family unity, scholastic laurels, and pure bonding.' },
      personalDev: { direction: 'West (W)', description: 'Fine-tunes creative eloquence, precision design, and magnetic charm.' },
      avoidList: ['North', 'East', 'Southeast', 'South']
    },
    8: {
      success: { direction: 'Southwest (SW)', description: 'Anchors supreme real-estate wealth, authoritative management, and unwavering stability.' },
      health: { direction: 'Northwest (NW)', description: 'Soothes nervous tension, enhances joint mobility, and bolsters stamina.' },
      family: { direction: 'West (W)', description: 'Harmonizes children’s growth, domestic joy, and pleasant conversations.' },
      personalDev: { direction: 'Northeast (NE)', description: 'Deepens meditative insight, sacred learning, and strategic foresight.' },
      avoidList: ['North', 'East', 'Southeast', 'South']
    },
    9: {
      success: { direction: 'East (E)', description: 'Ignites unstoppable entrepreneurial initiative, leadership honors, and early morning luck.' },
      health: { direction: 'Southeast (SE)', description: 'Strengthens lungs and liver, purifies prana, and sharpens vitality.' },
      family: { direction: 'North (N)', description: 'Fosters cool communicative warmth, emotional understanding, and marital trust.' },
      personalDev: { direction: 'South (S)', description: 'Illuminates spiritual enlightenment, inner courage, and dignified confidence.' },
      avoidList: ['West', 'Northwest', 'Southwest', 'Northeast']
    }
  };

  const defaultDir = directionsData[kuaNumber] || directionsData[1];

  return {
    kuaNumber,
    rulingElement: elementMap[kuaNumber] || 'Cosmic Ether',
    groupType,
    directions: defaultDir,
    remedies: {
      idealBedFacing: defaultDir.health.direction,
      idealDeskFacing: defaultDir.success.direction
    },
    colourCorrection: {
      luckyColours: colors.lucky,
      balanceColours: colors.balance,
      antiColours: colors.anti
    },
    zonesReport: {
      careerZone: {
        enhancement: `Activate the North sector of your workspace with a brass or copper turtle and crystal clear water element to stimulate continuous cash flow.`
      },
      moneyZone: {
        enhancement: `Energize the Southeast wealth corner with lush indoor green jade plants in ceramic pots and eliminate all heavy junk or dust.`
      },
      relationshipZone: {
        enhancement: `Harmonize the Southwest relationship sector with dual rose quartz crystals and warm amber illumination; avoid all blue or black water objects here.`
      }
    },
    loShuVaastuRemedies: [
      {
        digit: 1,
        title: 'Water Element (Career/North)',
        element: 'Water (North - 1)',
        zone: 'North Career Zone',
        remedy: 'Place a small indoor water fountain or brass vessel with clean water and fresh flowers.',
        impact: 'Attracts incoming new client leads and removes career stagnation.'
      },
      {
        digit: 2,
        title: 'Earth Element (Relationships/Southwest)',
        element: 'Earth (Southwest - 2/5/8)',
        zone: 'Southwest Relationship Zone',
        remedy: 'Add natural yellow stones, crystals, or terracotta earthenware to anchor emotional groundedness.',
        impact: 'Cements marital trust and guards against unexpected household arguments.'
      },
      {
        digit: 4,
        title: 'Wood Element (Wealth/Southeast)',
        element: 'Wood (East / Southeast - 3/4)',
        zone: 'East / Southeast Growth Zone',
        remedy: 'Position 4 stalks of lucky bamboo in fresh water or healthy broad-leaf money plants.',
        impact: 'Catalyzes rapid financial expansion, academic mastery, and physical vitality.'
      },
      {
        digit: 6,
        title: 'Metal Element (Mentors & Luxury/Northwest)',
        element: 'Metal (West / Northwest - 6/7)',
        zone: 'Northwest Helpful Friends Zone',
        remedy: 'Hang a 6-rod hollow brass wind chime to disperse stale energy and summon supportive mentors.',
        impact: 'Attracts influential business patrons, government approvals, and cooperative bankers.'
      }
    ]
  };
}
