export interface KuaProfile {
  kuaNumber: number;
  group: 'EAST' | 'WEST' | 'EAST_GROUP' | 'WEST_GROUP' | string;
  element: string;
  luckyDirections: string[];
  unluckyDirections: string[];
  favourableDirections?: any;
  favorableDirections?: any;
  remedy: string;
  [key: string]: any;
}

export function calculateKuaNumber(year: number | string, gender: string = 'MALE'): KuaProfile {
  const y = Number(String(year).replace(/[^0-9]/g, '').slice(-4)) || 1990;
  const lastTwo = (y % 100).toString().split('').reduce((acc, d) => acc + Number(d), 0);
  let reduced = lastTwo;
  while (reduced > 9) {
    reduced = reduced.toString().split('').reduce((acc, d) => acc + Number(d), 0);
  }

  const isFemale = (gender || '').toUpperCase() === 'FEMALE';
  let kua = isFemale ? reduced + 5 : 10 - reduced;
  while (kua > 9) {
    kua = kua.toString().split('').reduce((acc, d) => acc + Number(d), 0);
  }
  if (kua === 5) kua = isFemale ? 8 : 2;

  const isEast = [1, 3, 4, 9].includes(kua);
  const shengChiDir = isEast ? 'Southeast' : 'Northeast';
  return {
    kuaNumber: kua,
    group: isEast ? 'EAST' : 'WEST',
    element: kua === 1 ? 'Water' : [2, 5, 8].includes(kua) ? 'Earth' : [3, 4].includes(kua) ? 'Wood' : [6, 7].includes(kua) ? 'Metal' : 'Fire',
    luckyDirections: isEast ? ['North', 'South', 'East', 'Southeast'] : ['West', 'Northwest', 'Southwest', 'Northeast'],
    unluckyDirections: isEast ? ['West', 'Northwest', 'Southwest', 'Northeast'] : ['North', 'South', 'East', 'Southeast'],
    favourableDirections: {
      shengChi: { direction: shengChiDir, description: 'Supreme Wealth & Prosperity' },
      tianYi: { direction: isEast ? 'East' : 'West', description: 'Health & Vitality' },
      yanNian: { direction: isEast ? 'South' : 'Northwest', description: 'Harmony & Love' },
      fuWei: { direction: isEast ? 'North' : 'Southwest', description: 'Clarity & Peace' }
    },
    favorableDirections: {
      shengChi: { direction: shengChiDir, description: 'Supreme Wealth & Prosperity' }
    },
    remedy: 'Align office desk and bedroom facing towards your prime auspicious direction.'
  };
}
