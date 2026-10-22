import React from 'react';
import { MobileAnalysis } from '../types';
import { Phone, ShieldCheck, AlertTriangle } from 'lucide-react';

interface MobileDiagnosticsPanelProps {
  mobileData?: MobileAnalysis | null;
  personalDetails?: any;
  dobData?: any;
  nameData?: any;
  remedies?: any;
  isQuickMode?: boolean;
  onAnalyzeAnother?: () => void;
  [key: string]: any;
}

export const MobileDiagnosticsPanel: React.FC<MobileDiagnosticsPanelProps> = ({ mobileData }) => {
  if (!mobileData) return null;

  return (
    <div className="bg-white border rounded-3xl p-6 md:p-8 space-y-6 shadow-xs max-w-4xl mx-auto">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-[#D97706] flex items-center justify-center">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-playfair text-xl font-bold text-slate-800">मोबाइल अंक निदान (Mobile Diagnostics)</h2>
            <p className="text-xs text-slate-500 font-sans">संख्या: {mobileData.raw || '—'}</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">Vibrational Score</span>
          <span className="text-2xl font-black font-mono text-[#D97706]">{mobileData.score}/100</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-50 p-4 rounded-2xl border text-center">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Compound Total</span>
          <span className="text-2xl font-bold text-slate-800 font-mono">{mobileData.compoundTotal}</span>
        </div>
        <div className="bg-slate-50 p-4 rounded-2xl border text-center">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Reduced Root</span>
          <span className="text-2xl font-bold text-indigo-700 font-mono">{mobileData.reducedTotal}</span>
        </div>
        <div className="bg-slate-50 p-4 rounded-2xl border text-center">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Rating Category</span>
          <span className="text-xs font-bold text-emerald-700 block mt-1">{mobileData.rating}</span>
        </div>
        <div className="bg-slate-50 p-4 rounded-2xl border text-center">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Hostile Combinations</span>
          <span className="text-xs font-bold text-slate-700 block mt-1">{mobileData.hostileRelationships.length} Found</span>
        </div>
      </div>

      {mobileData.pairs.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-playfair text-base font-bold text-slate-800">सक्रिय संख्या जोड़े (Consecutive Vibrational Pairs)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {mobileData.pairs.slice(0, 6).map((p, i) => (
              <div key={i} className="p-3.5 bg-slate-50 border rounded-2xl text-xs space-y-1">
                <div className="flex justify-between font-bold">
                  <span className="font-mono text-amber-700">Pair: {p.pair}</span>
                  <span className="text-slate-600 font-normal">{p.meaning}</span>
                </div>
                <p className="text-[11px] text-slate-500">{p.positive}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileDiagnosticsPanel;
