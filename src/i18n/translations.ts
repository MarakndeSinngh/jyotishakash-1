import enTranslation from '../locales/en/translation.json';
import hiTranslation from '../locales/hi/translation.json';
import bnTranslation from '../locales/bn/translation.json';
import guTranslation from '../locales/gu/translation.json';

export type SupportedLanguage = 'en' | 'hi' | 'bn' | 'gu';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
  shortCode: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', shortCode: 'EN' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳', shortCode: 'HI' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩', shortCode: 'BN' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳', shortCode: 'GU' },
];

function flattenTranslations(obj: Record<string, any>, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {};
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null) {
      Object.assign(result, flattenTranslations(value, fullKey));
    } else if (typeof value === 'string') {
      result[fullKey] = value;
    }
  }
  return result;
}

export const TRANSLATIONS: Record<SupportedLanguage, Record<string, string>> = {
  en: flattenTranslations(enTranslation),
  hi: flattenTranslations(hiTranslation),
  bn: flattenTranslations(bnTranslation),
  gu: flattenTranslations(guTranslation),
};

