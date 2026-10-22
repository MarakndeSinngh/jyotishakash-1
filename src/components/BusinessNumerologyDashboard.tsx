import React, { useState } from 'react';
import { Briefcase, TrendingUp, Sparkles } from 'lucide-react';
import { analyzeBusinessNumerology, BusinessReport } from '../services/premiumModules';

interface BusinessNumerologyDashboardProps {
  initialBusinessName?: string;
  initialDriver?: number;
}

export const BusinessNumerologyDashboard: React.FC<BusinessNumerologyDashboardProps> = ({
  initialBusinessName = '',
  initialDriver = 1
}) => {
  const [name, setName] = useState(initialBusinessName);
  const [driver, setDriver] = useState(initialDriver);
  const [report, setReport] = useState<BusinessReport | null>(() => {
    return initialBusinessName ? analyzeBusinessNumerology(initialBusinessName, initialDriver) : null;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setReport(analyzeBusinessNumerology(name, driver));
  };

  return (
    <div className="bg-white border rounded-3xl p-6 md:p-8 space-y-6 shadow-xs max-w-4xl mx-auto">
      <div className="flex items-center gap-3 border-b pb-4">
        <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
          <Briefcase className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-playfair text-xl font-bold text-slate-800">व्यापार अंक ज्योतिष (Business Numerology Pro)</h2>
          <p className="text-xs text-slate-500 font-sans">कंपनी, ब्रांड व व्यापार नाम का चैल्डियन अंक विश्लेषण एवं विस्तार परामर्श</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">व्यापार या ब्रांड नाम (Brand Name)</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Leo Astro Solutions"
            className="w-full bg-slate-50 border rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">संस्थापक का मूलांक (Founder Driver)</label>
          <select
            value={driver}
            onChange={(e) => setDriver(Number(e.target.value))}
            className="w-full bg-slate-50 border rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:outline-none"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <option key={n} value={n}>मूलांक {n}</option>
            ))}
          </select>
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full bg-[#D97706] hover:bg-[#B45309] text-white py-2.5 rounded-xl text-xs font-bold uppercase transition"
          >
            ब्रांड ऑडिट करें (Analyze)
          </button>
        </div>
      </form>

      {report && (
        <div className="p-5 bg-slate-50 border rounded-2xl space-y-4 animate-in fade-in">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-3.5 rounded-xl border text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Compound</span>
              <span className="text-2xl font-bold text-[#D97706] font-mono">{report.compoundTotal}</span>
            </div>
            <div className="bg-white p-3.5 rounded-xl border text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Root Number</span>
              <span className="text-2xl font-bold text-indigo-700 font-mono">{report.reducedTotal}</span>
            </div>
            <div className="bg-white p-3.5 rounded-xl border text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Growth Potential</span>
              <span className="text-2xl font-bold text-emerald-700 font-mono">{report.growthScore}%</span>
            </div>
            <div className="bg-white p-3.5 rounded-xl border text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Brand Magnetism</span>
              <span className="text-2xl font-bold text-slate-800 font-mono">{report.brandStrength}%</span>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed font-sans">{report.recommendations}</p>
        </div>
      )}
    </div>
  );
};

export default BusinessNumerologyDashboard;
