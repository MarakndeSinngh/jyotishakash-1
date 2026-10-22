import React, { useState } from 'react';
import { Calendar, Sparkles, Star } from 'lucide-react';
import { generateLuckyDatesSuite, LuckyDatesSuite } from '../services/premiumModules';

interface LuckyDatesDashboardProps {
  initialDriver?: number;
  initialConductor?: number;
}

export const LuckyDatesDashboard: React.FC<LuckyDatesDashboardProps> = ({
  initialDriver = 1,
  initialConductor = 1
}) => {
  const [driver, setDriver] = useState(initialDriver);
  const [conductor, setConductor] = useState(initialConductor);
  const [suite, setSuite] = useState<LuckyDatesSuite>(() => generateLuckyDatesSuite(initialDriver, initialConductor));

  const handleUpdate = () => {
    setSuite(generateLuckyDatesSuite(driver, conductor));
  };

  return (
    <div className="bg-white border rounded-3xl p-6 md:p-8 space-y-6 shadow-xs max-w-4xl mx-auto">
      <div className="flex items-center gap-3 border-b pb-4">
        <div className="w-10 h-10 rounded-2xl bg-amber-100 text-[#D97706] flex items-center justify-center">
          <Calendar className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-playfair text-xl font-bold text-slate-800">शुभ तिथियां एवं स्वर्णिम मुहूर्त (Lucky Dates Suite)</h2>
          <p className="text-xs text-slate-500 font-sans">अनुबंध, यात्रा, गृह प्रवेश एवं महत्वपूर्ण कार्यों हेतु भाग्यशाली तिथियां</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 bg-slate-50 p-4 rounded-2xl border">
        <div>
          <label className="block text-[11px] font-bold text-slate-600 mb-1">मूलांक (Driver)</label>
          <select
            value={driver}
            onChange={(e) => {
              setDriver(Number(e.target.value));
              setSuite(generateLuckyDatesSuite(Number(e.target.value), conductor));
            }}
            className="bg-white border rounded-xl px-3 py-1.5 text-xs text-slate-800"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <option key={n} value={n}>मूलांक {n}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-600 mb-1">भाग्यांक (Conductor)</label>
          <select
            value={conductor}
            onChange={(e) => {
              setConductor(Number(e.target.value));
              setSuite(generateLuckyDatesSuite(driver, Number(e.target.value)));
            }}
            className="bg-white border rounded-xl px-3 py-1.5 text-xs text-slate-800"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <option key={n} value={n}>भाग्यांक {n}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-emerald-50/70 border border-emerald-100 rounded-2xl space-y-2">
          <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase block">⭐ सर्वाधिक शुभ तिथियां</span>
          <div className="flex flex-wrap gap-2 pt-1">
            {suite.mostAuspiciousDates.map((d) => (
              <span key={d} className="w-8 h-8 rounded-full bg-emerald-600 text-white font-mono font-bold flex items-center justify-center text-xs">
                {d}
              </span>
            ))}
          </div>
        </div>

        <div className="p-4 bg-amber-50/70 border border-amber-100 rounded-2xl space-y-2">
          <span className="text-[10px] font-mono font-bold text-amber-800 uppercase block">🟡 मध्यम अनुकूल तिथियां</span>
          <div className="flex flex-wrap gap-2 pt-1">
            {suite.moderateDates.map((d) => (
              <span key={d} className="w-8 h-8 rounded-full bg-amber-500 text-white font-mono font-bold flex items-center justify-center text-xs">
                {d}
              </span>
            ))}
          </div>
        </div>

        <div className="p-4 bg-rose-50/70 border border-rose-100 rounded-2xl space-y-2">
          <span className="text-[10px] font-mono font-bold text-rose-800 uppercase block">⚠️ परिहार्य तिथियां (Avoid)</span>
          <div className="flex flex-wrap gap-2 pt-1">
            {suite.avoidDates.map((d) => (
              <span key={d} className="w-8 h-8 rounded-full bg-rose-500 text-white font-mono font-bold flex items-center justify-center text-xs">
                {d}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LuckyDatesDashboard;
