import { reduceToDigit } from './numerologyEngine';

export function calculatePersonalYearNumber(dob: string, targetYear: number = new Date().getFullYear()): number {
  const parts = (dob || '1990-01-01').split('-').map(Number);
  const day = parts[2] || 1;
  const month = parts[1] || 1;
  return reduceToDigit(day + month + targetYear);
}
