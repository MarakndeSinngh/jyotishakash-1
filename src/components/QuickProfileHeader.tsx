import React from 'react';
import { PersonalDetails, DOBAnalysis } from '../types';
import { User, Calendar, Edit3, RotateCcw } from 'lucide-react';

interface QuickProfileHeaderProps {
  personalDetails?: PersonalDetails | null;
  dobData?: DOBAnalysis | null;
  onEditProfile?: () => void;
  onResetProfile?: () => void;
}

export const QuickProfileHeader: React.FC<QuickProfileHeaderProps> = ({
  personalDetails,
  dobData,
  onEditProfile,
  onResetProfile
}) => {
  if (!personalDetails) return null;

  return (
    <div className="mb-6 p-4 bg-gradient-to-r from-amber-50/80 via-white to-amber-50/50 border border-amber-200/60 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-xs print:hidden">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-[#D97706] flex items-center justify-center font-bold">
          <User className="w-4 h-4" />
        </div>
        <div>
          <div className="text-xs font-bold text-slate-800 flex items-center gap-2">
            <span>{personalDetails.name || 'Seeker'}</span>
            <span className="text-[10px] font-mono text-slate-500">({personalDetails.dob})</span>
          </div>
          <div className="text-[10px] text-slate-500 flex items-center gap-2 mt-0.5 font-mono">
            <span>मूलांक: <strong className="text-slate-800">{dobData?.birthNumber || '—'}</strong></span>
            <span>•</span>
            <span>भाग्यांक: <strong className="text-slate-800">{dobData?.lifePathNumber || '—'}</strong></span>
            <span>•</span>
            <span>नामांक: <strong className="text-slate-800">{dobData?.destinyNumber || '—'}</strong></span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {onEditProfile && (
          <button
            onClick={onEditProfile}
            className="flex items-center gap-1 text-[11px] font-bold text-[#D97706] hover:bg-amber-100/50 px-2.5 py-1.5 rounded-xl transition cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" /> संपादित करें
          </button>
        )}
        {onResetProfile && (
          <button
            onClick={onResetProfile}
            className="flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:bg-slate-100 px-2.5 py-1.5 rounded-xl transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> रीसेट
          </button>
        )}
      </div>
    </div>
  );
};

export default QuickProfileHeader;
