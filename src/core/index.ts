import { NumerologyProfile, CompleteNumerologyProfile } from './types';
import { analyzeDateOfBirth, reduceToSingleDigit } from '../services/numerologyEngine';
import { calculateKuaNumber } from './kuaEngine';
import { getProfileIsolationKey } from '../utils/localeUtils';

export * from './types';
export * from './numerologyEngine';
export * from './kuaEngine';
export * from './luckyDatesEngine';
export * from './childNumerologyEngine';
export { getProfileIsolationKey };

export function generateCompleteNumerologyProfile(input: {
  dob: string;
  name?: string;
  mobile?: string;
  gender?: string;
}): CompleteNumerologyProfile {
  const dob = input.dob || '1990-01-01';
  const name = input.name || 'Seeker';
  const gender = input.gender || 'MALE';
  const mobile = input.mobile || '';

  const dobAnalysis = analyzeDateOfBirth(dob, name);
  const kuaProfile = calculateKuaNumber(dob, gender);

  return {
    name,
    dob,
    gender,
    mobile,
    driver: dobAnalysis.birthNumber,
    conductor: dobAnalysis.lifePathNumber,
    destinyNumber: dobAnalysis.destinyNumber,
    soulUrgeNumber: dobAnalysis.soulUrgeNumber,
    personalityNumber: dobAnalysis.personalityNumber,
    maturityNumber: dobAnalysis.maturityNumber,
    personalYear: dobAnalysis.personalYear,
    kuaNumber: kuaProfile.kuaNumber,
    loshuGrid: dobAnalysis.grid,
    missingNumbers: dobAnalysis.missingNumbers,
    rulingPlanet: dobAnalysis.rulingPlanet,
    elements: dobAnalysis.elements,
    planes: dobAnalysis.planes || []
  };
}
