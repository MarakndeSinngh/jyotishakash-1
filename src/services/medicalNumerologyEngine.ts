export interface MedicalNumerologyResult {
  disclaimer: string;
  dominantDosha: 'Vata' | 'Pitta' | 'Kapha';
  secondaryDosha: string;
  prakritiType: string;
  doshaComposition: {
    vata: number;
    pitta: number;
    kapha: number;
  };
  scores: {
    healthScore: number;
    digestiveScore: number;
    immunityScore: number;
    stressLevel: number;
    sleepQuality: number;
  };
  weakBodySystems: string[];
  dietRecommendations: {
    recommendedFoods: string[];
    foodsToAvoid: string[];
    recommendedFastingDay: string;
  };
  ayurvedicLifestyle: {
    yogaSuggestions: string[];
    pranayamaSuggestions: string[];
    sleepHygieneTip: string;
    morningRoutine: string;
  };
}

export function generateMedicalNumerologyReport(dob: string, name: string): MedicalNumerologyResult {
  const parts = dob.split('-').map(Number);
  const day = parts[2] || 1;
  const month = parts[1] || 1;
  const year = parts[0] || 1990;

  // Reduce birth day to root (Driver)
  let driver = day;
  while (driver > 9) {
    driver = driver.toString().split('').reduce((acc, digit) => acc + Number(digit), 0);
  }

  // Reduce entire DOB to root (Conductor)
  const fullSum = `${day}${month}${year}`.split('').reduce((acc, digit) => acc + Number(digit), 0);
  let conductor = fullSum;
  while (conductor > 9) {
    conductor = conductor.toString().split('').reduce((acc, digit) => acc + Number(digit), 0);
  }

  // Planetary Ayurvedic mapping
  // 1 (Sun), 9 (Mars) -> Pitta
  // 2 (Moon), 6 (Venus) -> Kapha
  // 4 (Rahu), 5 (Mercury), 7 (Ketu), 8 (Saturn) -> Vata
  // 3 (Jupiter) -> Kapha / Pitta balance
  let vata = 33;
  let pitta = 33;
  let kapha = 34;

  if ([1, 9].includes(driver)) {
    pitta = 50;
    vata = 25;
    kapha = 25;
  } else if ([2, 6].includes(driver)) {
    kapha = 50;
    vata = 25;
    pitta = 25;
  } else if ([4, 7, 8].includes(driver)) {
    vata = 50;
    pitta = 30;
    kapha = 20;
  } else if (driver === 5) {
    vata = 45;
    pitta = 35;
    kapha = 20;
  } else if (driver === 3) {
    kapha = 40;
    pitta = 40;
    vata = 20;
  }

  const dominantDosha: 'Vata' | 'Pitta' | 'Kapha' =
    pitta >= vata && pitta >= kapha ? 'Pitta' :
    vata >= pitta && vata >= kapha ? 'Vata' : 'Kapha';

  const secondaryDosha =
    dominantDosha === 'Pitta' ? (vata >= kapha ? 'Vata' : 'Kapha') :
    dominantDosha === 'Vata' ? (pitta >= kapha ? 'Pitta' : 'Kapha') :
    (pitta >= vata ? 'Pitta' : 'Vata');

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const planetFastingDays: Record<number, string> = {
    1: 'Sunday (Sun)',
    2: 'Monday (Moon)',
    3: 'Thursday (Jupiter)',
    4: 'Saturday (Rahu/Saturn)',
    5: 'Wednesday (Mercury)',
    6: 'Friday (Venus)',
    7: 'Tuesday/Thursday (Ketu)',
    8: 'Saturday (Saturn)',
    9: 'Tuesday (Mars)'
  };

  const weakSystemsMap: Record<number, string[]> = {
    1: ['Cardiovascular System', 'Eyes & Vision', 'Circulatory Vitality'],
    2: ['Digestive Fluids & Stomach', 'Lymphatic System', 'Emotional Nervous System'],
    3: ['Liver & Gallbladder', 'Pancreatic Enzyme Balance', 'Arterial Blood'],
    4: ['Nervous System & Synapses', 'Respiratory Bronchi', 'Lower Colon'],
    5: ['Neuro-Cognitive Pathways', 'Speech Organs & Vocal Cords', 'Skin Permeability'],
    6: ['Reproductive & Hormonal System', 'Kidney Filtration', 'Throat & Thyroid'],
    7: ['Autonomic Nervous System', 'Pineal & Pituitary Gland', 'Skin Allergies'],
    8: ['Skeletal System & Joints', 'Teeth & Bone Mineral Density', 'Chronic Fatigue'],
    9: ['Blood Pressure & Marrow', 'Muscular Regeneration', 'Inflammation Threshold']
  };

  return {
    disclaimer: 'This medical numerology audit is for holistic lifestyle guidance and preventive Ayurvedic harmony only. Consult certified medical practitioners for diagnostic evaluations.',
    dominantDosha,
    secondaryDosha,
    prakritiType: `${dominantDosha}-${secondaryDosha} Prakriti`,
    doshaComposition: { vata, pitta, kapha },
    scores: {
      healthScore: Math.min(95, 65 + ((driver * 7) % 28)),
      digestiveScore: Math.min(92, 60 + ((conductor * 6) % 30)),
      immunityScore: Math.min(94, 62 + (((driver + conductor) * 5) % 30)),
      stressLevel: Math.max(25, 45 + ((driver * 8) % 35)),
      sleepQuality: Math.min(90, 60 + ((month * 7) % 30))
    },
    weakBodySystems: weakSystemsMap[driver] || ['Digestive tract', 'Nervous system', 'Joints'],
    dietRecommendations: {
      recommendedFoods: dominantDosha === 'Pitta'
        ? ['Cooling cucumber, melon, and coconut water', 'Soaked almonds and organic ghee', 'Basmati rice, oats, and sweet juicy apples', 'Coriander, fennel, and mint herbal infusions']
        : dominantDosha === 'Vata'
        ? ['Warm cooked soups, stews, and porridges', 'Healthy sesame oil and cow ghee', 'Cooked root vegetables, beets, carrots', 'Warm golden turmeric milk with nutmeg at night']
        : ['Warm light soups, barley, and quinoa', 'Ginger, black pepper, and cinnamon spiced teas', 'Steamed cruciferous greens and bitter gourd', 'Raw honey and pomegranate'],
      foodsToAvoid: dominantDosha === 'Pitta'
        ? ['Excess green chillies, mustard, and vinegar', 'Deep-fried spicy street snacks', 'Fermented red wines and sour citrus marinades', 'Excessive table salt']
        : dominantDosha === 'Vata'
        ? ['Raw dry salads and cold iced beverages', 'Carbonated fizzy soft drinks', 'Stale refrigerated leftovers', 'Dry crackers and popcorn on empty stomach']
        : ['Heavy chilled ice creams and milkshakes', 'Excess refined sweets and deep-fried flours', 'Banana milkshakes and dense cheese', 'Excess oily gravies'],
      recommendedFastingDay: planetFastingDays[driver] || 'Thursday'
    },
    ayurvedicLifestyle: {
      yogaSuggestions: dominantDosha === 'Pitta'
        ? ['Chandra Namaskar (Moon Salutations)', 'Sheetali Pranayama', 'Supta Baddha Konasana (Reclining Bound Angle)']
        : dominantDosha === 'Vata'
        ? ['Vrikshasana (Tree Pose for Grounding)', 'Paschimottanasana (Gentle Forward Bend)', 'Balasana (Child Pose)']
        : ['Surya Namaskar (Sun Salutations 12 rounds)', 'Bhujangasana (Cobra Pose)', 'Dhanurasana (Bow Pose)'],
      pranayamaSuggestions: dominantDosha === 'Pitta'
        ? ['Sheetkari & Sheetali Cooling Breath (10 mins)', 'Anulom Vilom (Gentle alternate nostril)']
        : dominantDosha === 'Vata'
        ? ['Nadi Shodhana with deep slow exhalation (12 mins)', 'Bhramari (Bee Breath for grounding anxiety)']
        : ['Kapalabhati (Rapid abdominal cleansing)', 'Bhastrika (Bellows breath for metabolic spark)'],
      sleepHygieneTip: 'Retire to bed before 10:15 PM in a completely dark, EMF-reduced room with warm foot massage (Padabhyanga)',
      morningRoutine: 'Awaken in Brahma Muhurta (5:00 - 5:45 AM), drink 500ml warm copper-infused water, and perform 15 minutes of grounding meditation'
    }
  };
}
