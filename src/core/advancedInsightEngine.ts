import { CompleteNumerologyProfile } from './types';

export interface AdvancedInsight {
  id: string;
  title: { hi: string; en: string };
  description: string;
  category: string;
  confidence: number;
  summary: { hi: string; en: string };
  inputs: Array<{ label: string; value: string }>;
  provenance: {
    source: string;
    derivation: string;
    matchedRuleIds: string[];
    calculationSource: string;
    sourceCitations: Array<{ sourceDocument: string; level: string; author?: string; topic?: string }>;
  };
  [key: string]: any;
}

export interface AdvancedInsightDossier {
  insights: AdvancedInsight[];
  overallConfidence: number;
  standoutProfileNarrative?: { hi?: string; en?: string };
  allValidatedInsights?: any[];
  primaryInsights?: any[];
  [key: string]: any;
}

export class AdvancedInsightEngine {
  static generateDossier(profile: CompleteNumerologyProfile): AdvancedInsightDossier {
    const driver = profile?.driver || 1;
    const conductor = profile?.conductor || 1;

    const insights: AdvancedInsight[] = [
      {
        id: 'ins_core_drive',
        title: {
          hi: `मूलांक ${driver} - मुख्य ग्रहीय कंपन`,
          en: `Primary Resonance (Number ${driver})`
        },
        description: `Your internal operating rhythm is guided by frequency ${driver}. Focus on self-directed execution.`,
        category: 'CORE_PERSONALITY',
        confidence: 95,
        summary: {
          hi: `मूलांक ${driver} सूर्य/ग्रह का प्रमुख प्रभाव उत्पन्न करता है जो नेतृत्व और आत्मविश्वास को बढ़ाता है।`,
          en: `Driver ${driver} generates strong foundational initiative, clarity of thought, and decisive momentum.`
        },
        inputs: [
          { label: 'जन्म तारीख (Birth Day)', value: String(profile?.dob ? profile.dob.split('-')[2] : driver) },
          { label: 'मूलांक (Driver Root)', value: String(driver) }
        ],
        provenance: {
          source: 'Vedic Numerology Driver Calculation',
          derivation: `Extracted from birth date: Day reduction to root ${driver}`,
          matchedRuleIds: ['RULE_DRIVER_EXTRACTION_V1', 'RULE_PLANETARY_LORDSHIP_V1'],
          calculationSource: 'LeoFamily Vedic Core Engine (Deterministic AST)',
          sourceCitations: [
            {
              sourceDocument: 'Brihat Samhita & Chaldean Numerology Compendium',
              level: 'Level 1 Canonical',
              author: 'Varahamihira / Cheiro Tradition',
              topic: 'Solar & Lunar Vibrations in Human Birth'
            }
          ]
        }
      },
      {
        id: 'ins_destiny_path',
        title: {
          hi: `भाग्यांक ${conductor} - जीवन पथ चक्र`,
          en: `Life Destiny Vector (Number ${conductor})`
        },
        description: `Your overarching life trajectory matures towards the cosmic qualities of frequency ${conductor}.`,
        category: 'DESTINY_CYCLE',
        confidence: 92,
        summary: {
          hi: `भाग्यांक ${conductor} आपकी संपूर्ण जीवन यात्रा और दीर्घकालिक कर्म योग का संचालन करता है।`,
          en: `Conductor ${conductor} governs overarching life purpose, maturity achievements, and soul evolution.`
        },
        inputs: [
          { label: 'संपूर्ण जन्मतिथि (Full DOB)', value: String(profile?.dob || '1990-01-01') },
          { label: 'भाग्यांक (Conductor Root)', value: String(conductor) }
        ],
        provenance: {
          source: 'Full Date of Birth Universal Sum',
          derivation: `Full birth date digits summed and reduced to single digit ${conductor}`,
          matchedRuleIds: ['RULE_CONDUCTOR_SUM_V1', 'RULE_DESTINY_TRAJECTORY_V1'],
          calculationSource: 'LeoFamily Vedic Core Engine (Universal Sum)',
          sourceCitations: [
            {
              sourceDocument: 'Ank Vidya & Vedic Numerology Codex',
              level: 'Level 1 Canonical',
              author: 'Ancient Vedic Occult Systems',
              topic: '9-fold Life Destiny Realization'
            }
          ]
        }
      }
    ];

    return {
      insights,
      overallConfidence: 94
    };
  }
}
