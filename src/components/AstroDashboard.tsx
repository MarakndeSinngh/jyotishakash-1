import React from 'react';
import { DOBAnalysis, NameAnalysis, MobileAnalysis, remediesAdvice } from '../types';
import { Compass, Sparkles, Sun, Moon, Award } from 'lucide-react';

interface AstroDashboardProps {
  dobData?: DOBAnalysis | null;
  nameData?: NameAnalysis | null;
  mobileData?: MobileAnalysis | null;
  remedies?: remediesAdvice | null;
  name?: string;
  profile?: any;
  [key: string]: any;
}

export const AstroDashboard: React.FC<AstroDashboardProps> = ({
  dobData,
  nameData,
  mobileData,
  remedies,
  name = 'Seeker'
}) => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Overview Card */}
      <div className="bg-gradient-to-br from-[#143D2E] via-[#1B4D3B] to-[#0D291F] text-white p-6 md:p-8 rounded-3xl shadow-md border border-[#C6A15B]/30 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="text-[10px] font-mono text-amber-300 uppercase tracking-widest font-bold block mb-1">
              VEDIC ASTRO-NUMEROLOGY BLUEPRINT
            </span>
            <h2 className="text-2xl md:text-3xl font-playfair font-bold text-amber-100">
              {name}
            </h2>
            <p className="text-xs text-emerald-200 mt-1 font-sans">
              Ruling Planet: {dobData?.rulingPlanet || 'Surya (Sun)'} • Personal Year: {dobData?.personalYear || 1}
            </p>
          </div>
          <div className="flex gap-3">
            <div className="bg-white/10 backdrop-blur-xs border border-white/15 px-4 py-2.5 rounded-2xl text-center">
              <span className="text-[9px] font-mono uppercase text-amber-200 block">मूलांक (Driver)</span>
              <span className="text-2xl font-bold font-playfair text-white">{dobData?.birthNumber || 1}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs border border-white/15 px-4 py-2.5 rounded-2xl text-center">
              <span className="text-[9px] font-mono uppercase text-amber-200 block">भाग्यांक (Destiny)</span>
              <span className="text-2xl font-bold font-playfair text-white">{dobData?.lifePathNumber || 1}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs border border-white/15 px-4 py-2.5 rounded-2xl text-center">
              <span className="text-[9px] font-mono uppercase text-amber-200 block">नामांक (Name)</span>
              <span className="text-2xl font-bold font-playfair text-white">{nameData?.chaldeanTotal || 1}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid and Planes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-playfair text-base font-bold text-slate-800 flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#D97706]" /> लोशू ग्रिड (Lo Shu Magic Square)
          </h3>
          <div className="grid grid-cols-3 gap-2 max-w-[260px] mx-auto text-center font-mono font-bold text-base">
            {[4, 9, 2, 3, 5, 7, 8, 1, 6].map(num => {
              const count = dobData?.grid?.[num] || 0;
              return (
                <div
                  key={num}
                  className={`h-16 rounded-xl flex flex-col items-center justify-center border transition ${
                    count > 0 ? 'bg-amber-50/80 border-amber-300 text-amber-900' : 'bg-slate-50 border-slate-200 text-slate-300'
                  }`}
                >
                  <span className="text-base">{count > 0 ? num : '—'}</span>
                  {count > 1 && <span className="text-[9px] text-amber-700 font-normal">x{count}</span>}
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-playfair text-base font-bold text-slate-800 flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-700" /> सक्रिय राजयोग एवं ऊर्जा विमान
          </h3>
          <div className="space-y-2.5">
            {dobData?.planes?.map((pl, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
                  pl.active ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-400'
                }`}
              >
                <div>
                  <span className="font-bold block">{pl.name}</span>
                  <span className="text-[10px] text-slate-500">{pl.meaning}</span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                  pl.active ? 'bg-emerald-200 text-emerald-800' : 'bg-slate-200 text-slate-600'
                }`}>
                  {pl.active ? 'सक्रिय (Active)' : 'निष्क्रिय'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AstroDashboard;
