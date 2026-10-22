export interface CompleteNumerologyProfile {
  name: string;
  dob: string;
  gender: string;
  mobile: string;
  driver: number;
  conductor: number;
  destinyNumber: number;
  soulUrgeNumber: number;
  personalityNumber: number;
  maturityNumber: number;
  personalYear: number;
  kuaNumber: number;
  loshuGrid: Record<number, number>;
  missingNumbers: number[];
  rulingPlanet: string;
  elements: Record<string, number>;
  planes: Array<{ name: string; numbers: number[]; active: boolean; meaning: string }>;
  [key: string]: any;
}

export type NumerologyProfile = CompleteNumerologyProfile;
