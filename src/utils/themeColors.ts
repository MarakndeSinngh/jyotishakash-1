export type ThemeType = 'leo-gold' | 'cosmic-purple' | 'emerald-wisdom' | 'royal-blue' | 'light-luxury' | 'maharaja-gold';
export type ModeType = 'light' | 'dark';

export interface ColorScheme {
  primary: string;
  primaryRgb: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  card: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
}

export const THEME_COLORS: Record<ThemeType, Record<ModeType, ColorScheme>> = {
  'leo-gold': {
    light: {
      primary: '#D4AF37',
      primaryRgb: '212, 175, 55',
      secondary: '#AA7C11',
      accent: '#10B981',
      background: '#FAF9F6',
      surface: '#FFFDF9',
      card: '#FFFFFF',
      textPrimary: '#1C1917',
      textSecondary: '#57534E',
      border: '#E7E5E4',
    },
    dark: {
      primary: '#F3CD5C',
      primaryRgb: '243, 205, 92',
      secondary: '#D4AF37',
      accent: '#34D399',
      background: '#0C0A09',
      surface: '#1C1917',
      card: '#262220',
      textPrimary: '#F5F5F4',
      textSecondary: '#A8A29E',
      border: '#3F3A36',
    },
  },
  'cosmic-purple': {
    light: {
      primary: '#8B5CF6',
      primaryRgb: '139, 92, 246',
      secondary: '#D8B4FE',
      accent: '#F59E0B',
      background: '#FAF5FF',
      surface: '#FFFDF9',
      card: '#FFFFFF',
      textPrimary: '#2E1065',
      textSecondary: '#5B21B6',
      border: '#F3E8FF',
    },
    dark: {
      primary: '#A78BFA',
      primaryRgb: '167, 139, 250',
      secondary: '#C084FC',
      accent: '#FBBF24',
      background: '#05050C',
      surface: '#0B0B1E',
      card: '#12122A',
      textPrimary: '#F5F3FF',
      textSecondary: '#D8B4FE',
      border: '#24244D',
    },
  },
  'emerald-wisdom': {
    light: {
      primary: '#10B981',
      primaryRgb: '16, 185, 129',
      secondary: '#34D399',
      accent: '#F59E0B',
      background: '#F0FDF4',
      surface: '#FFFDF9',
      card: '#FFFFFF',
      textPrimary: '#064E3B',
      textSecondary: '#047857',
      border: '#DCFCE7',
    },
    dark: {
      primary: '#34D399',
      primaryRgb: '52, 211, 153',
      secondary: '#6EE7B7',
      accent: '#FBBF24',
      background: '#051C15',
      surface: '#092D23',
      card: '#0E3D30',
      textPrimary: '#ECFDF5',
      textSecondary: '#A7F3D0',
      border: '#114D3E',
    },
  },
  'royal-blue': {
    light: {
      primary: '#3B82F6',
      primaryRgb: '59, 130, 246',
      secondary: '#93C5FD',
      accent: '#F59E0B',
      background: '#EFF6FF',
      surface: '#FFFDF9',
      card: '#FFFFFF',
      textPrimary: '#1E3A8A',
      textSecondary: '#1D4ED8',
      border: '#DBEAFE',
    },
    dark: {
      primary: '#60A5FA',
      primaryRgb: '96, 165, 250',
      secondary: '#3B82F6',
      accent: '#FBBF24',
      background: '#090D16',
      surface: '#111827',
      card: '#1E293B',
      textPrimary: '#ECFEFF',
      textSecondary: '#93C5FD',
      border: '#2D3748',
    },
  },
  'light-luxury': {
    light: {
      primary: '#C5A880',
      primaryRgb: '197, 168, 128',
      secondary: '#E5D5C0',
      accent: '#4B5563',
      background: '#FAF8F5',
      surface: '#FFFDFB',
      card: '#FFFFFF',
      textPrimary: '#2D2924',
      textSecondary: '#6B6259',
      border: '#F0ECE3',
    },
    dark: {
      primary: '#E5D5C0',
      primaryRgb: '229, 213, 192',
      secondary: '#C5A880',
      accent: '#D1D5DB',
      background: '#181614',
      surface: '#24211E',
      card: '#2D2A26',
      textPrimary: '#F5F0EA',
      textSecondary: '#C0B7AD',
      border: '#3E3A35',
    },
  },
  'maharaja-gold': {
    light: {
      primary: '#A86E25',
      primaryRgb: '168, 110, 37',
      secondary: '#C29B47',
      accent: '#E9C269',
      background: '#FAF6F0',
      surface: '#F2E9DC',
      card: '#FFFFFF',
      textPrimary: '#2B1704',
      textSecondary: '#5A4027',
      border: '#E5D4BE',
    },
    dark: {
      primary: '#A86E25',
      primaryRgb: '168, 110, 37',
      secondary: '#C29B47',
      accent: '#E9C269',
      background: '#1C0F02',
      surface: '#2B1704',
      card: '#3B2207',
      textPrimary: '#F6F1E9',
      textSecondary: '#D4C4B7',
      border: 'rgba(194, 155, 71, 0.35)',
    },
  },
};
