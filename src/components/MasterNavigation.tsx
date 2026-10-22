import React from 'react';
import { 
  Compass, Phone, User, Heart, Car, Home, Briefcase, FileText, 
  Baby, Calendar, Sparkles, Award, FileSpreadsheet, Lock
} from 'lucide-react';

export type NavPortalId =
  | 'HOME'
  | 'CORE_LOSHU'
  | 'CORE_DASHBOARD'
  | 'MOBILE_NUMEROLOGY'
  | 'NAME_NUMEROLOGY'
  | 'MARRIAGE_COMPATIBILITY'
  | 'PREMIUM_VEHICLE'
  | 'PREMIUM_HOUSE'
  | 'PREMIUM_BUSINESS'
  | 'PREMIUM_SIGNATURE'
  | 'PREMIUM_CHILD'
  | 'PREMIUM_LUCKY_DATES'
  | 'PREMIUM_MEDICAL'
  | 'PREMIUM_VAASTU'
  | 'PREMIUM_DASHA'
  | 'AI_CONSULTATION'
  | 'MASTER_REPORT'
  | 'MY_REPORTS'
  | 'CORE_MOBILE'
  | 'CORE_COMPATIBILITY'
  | 'CORE_REMEDIES'
  | 'PREMIUM_CONSULTATIONS'
  | 'ADMIN';

interface MasterNavigationProps {
  currentPortalId: NavPortalId;
  onSelectPortal: (id: NavPortalId) => void;
}

export const MasterNavigation: React.FC<MasterNavigationProps> = ({
  currentPortalId,
  onSelectPortal
}) => {
  const links: Array<{ id: NavPortalId; label: string; icon: any }> = [
    { id: 'HOME', label: 'होम (Hub)', icon: Compass },
    { id: 'MASTER_REPORT', label: 'मास्टर रिपोर्ट', icon: Award },
    { id: 'CORE_LOSHU', label: 'लोशू ग्रिड', icon: Compass },
    { id: 'MOBILE_NUMEROLOGY', label: 'मोबाइल अंक', icon: Phone },
    { id: 'NAME_NUMEROLOGY', label: 'नाम सुधार', icon: User },
    { id: 'MARRIAGE_COMPATIBILITY', label: 'विवाह मिलान', icon: Heart },
    { id: 'PREMIUM_SIGNATURE', label: 'हस्ताक्षर ऑडिट', icon: FileText },
    { id: 'PREMIUM_CHILD', label: 'शिशु नामकरण', icon: Baby },
    { id: 'PREMIUM_VEHICLE', label: 'वाहन अंक', icon: Car },
    { id: 'MY_REPORTS', label: 'मेरी रिपोर्ट्स', icon: FileSpreadsheet }
  ];

  return (
    <div className="mb-6 overflow-x-auto pb-2 scrollbar-none print:hidden">
      <div className="flex items-center gap-2 min-w-max">
        {links.map((lnk) => {
          const Icon = lnk.icon;
          const isActive = currentPortalId === lnk.id;
          return (
            <button
              key={lnk.id}
              onClick={() => onSelectPortal(lnk.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-semibold transition cursor-pointer border ${
                isActive
                  ? 'bg-[#143D2E] text-amber-200 border-[#C6A15B]/50 shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-slate-400'}`} />
              <span>{lnk.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MasterNavigation;
