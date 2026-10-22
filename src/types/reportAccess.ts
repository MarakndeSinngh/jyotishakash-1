export type CanonicalReportType =
  | 'MASTER_REPORT'
  | 'LOSHU_GRID'
  | 'MOBILE_NUMEROLOGY'
  | 'MEDICAL_NUMEROLOGY'
  | 'NUMERO_VAASTU'
  | 'DASHA_ANALYSIS'
  | 'CHILD_NAME'
  | 'SIGNATURE_AUDIT'
  | 'NAME_CORRECTION'
  | 'COMPATIBILITY_REPORT'
  | string;

export interface ReportRegistryItem {
  title: string;
  priceInr: number;
}

export const REPORT_REGISTRY: Record<string, ReportRegistryItem> = {
  MASTER_REPORT: { title: 'Master Numerology Report', priceInr: 33 },
  LOSHU_GRID: { title: 'Complete Lo Shu Grid Analysis', priceInr: 33 },
  MOBILE_NUMEROLOGY: { title: 'Mobile Vibrations & Diagnostics', priceInr: 33 },
  MEDICAL_NUMEROLOGY: { title: 'Medical Numerology & Ayurvedic Doshas', priceInr: 33 },
  NUMERO_VAASTU: { title: 'Numero Vaastu Pro', priceInr: 33 },
  DASHA_ANALYSIS: { title: 'Planetary Dasha Cycles & Forecast', priceInr: 33 },
  CHILD_NAME: { title: 'Child Lucky Names & Sound Vibration', priceInr: 33 },
  SIGNATURE_AUDIT: { title: 'AI Signature Audit Pro', priceInr: 33 },
  NAME_CORRECTION: { title: 'Name Correction & Chaldean Spelling', priceInr: 33 },
  COMPATIBILITY_REPORT: { title: 'Marriage & Relationship Compatibility', priceInr: 33 }
};

export interface ReportAccessStatus {
  hasAccess: boolean;
  isFreeEligible: boolean;
  isUnlocked: boolean;
  unlockedAt?: string;
  reportType: CanonicalReportType;
  priceInr: number;
}

export interface UserSavedReport {
  id: string;
  reportType: CanonicalReportType;
  profileKey: string;
  createdAt: string;
  reportData?: any;
}
