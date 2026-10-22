export * from './reportAccess';
export * from './academy';
export * from './course';
export * from './enrollment';
export * from './student';
export * from './cms';

export interface PersonalDetails {
  name: string;
  dob: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER' | string;
  mobile?: string;
  email?: string;
}

export interface DOBAnalysis {
  birthNumber: number;
  lifePathNumber: number;
  destinyNumber: number;
  soulUrgeNumber: number;
  personalityNumber: number;
  maturityNumber: number;
  attitudeNumber: number;
  personalYear: number;
  missingNumbers: number[];
  grid: Record<number, number>;
  rulingPlanet: string;
  elements: Record<string, number>;
  planes?: Array<{ name: string; numbers: number[]; active: boolean; meaning: string }>;
  [key: string]: any;
}

export interface NameAnalysis {
  chaldeanTotal: number;
  chaldeanCompound: number;
  pythagoreanTotal: number;
  soulUrge: number;
  personality: number;
  compatibilityWithDob: string;
  suggestedSpellings: string[];
  [key: string]: any;
}

export interface MobileAnalysis {
  raw: string;
  compoundTotal: number;
  reducedTotal: number;
  rating: string;
  score: number;
  pairs: Array<{ pair: string; meaning: string; positive: string; negative: string; severity?: number }>;
  hostileRelationships: Array<{ title: string; desc: string }>;
  isFavorable: boolean;
  [key: string]: any;
}

export interface remediesAdvice {
  mobileEndings: string[];
  luckyGems: string[];
  luckyColours: string[];
  luckyDirections: string[];
  rudraksha: string;
  yantra: string;
  lalKitabRemedies: string[];
  gemstones?: string[];
  colors?: string[];
  [key: string]: any;
}
