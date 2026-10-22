import React from 'react';
import { X, Lock, CheckCircle2 } from 'lucide-react';
import { CanonicalReportType } from '../types/reportAccess';

interface ReportPaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportType?: CanonicalReportType;
  onUnlocked?: () => void;
}

export const ReportPaywallModal: React.FC<ReportPaywallModalProps> = ({
  isOpen,
  onClose,
  reportType = 'MASTER_REPORT',
  onUnlocked
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center space-y-4 shadow-xl border relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="w-12 h-12 bg-amber-100 text-[#D97706] rounded-2xl flex items-center justify-center mx-auto">
          <Lock className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold font-playfair text-slate-800">
          Unlocking {reportType.replace('_', ' ')}
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          Access the complete detailed personalized consultation portfolio.
        </p>
        <button
          onClick={() => {
            if (onUnlocked) onUnlocked();
            onClose();
          }}
          className="w-full bg-gradient-to-r from-[#D97706] to-[#F59E0B] text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:from-[#B45309] hover:to-[#D97706] transition"
        >
          Unlock Now (₹33)
        </button>
      </div>
    </div>
  );
};

export default ReportPaywallModal;
