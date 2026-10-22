import React, { useState } from 'react';
import { Car, ShieldCheck, Sparkles } from 'lucide-react';
import { analyzeVehicleNumerology, VehicleReport } from '../services/premiumModules';

interface VehicleNumerologyDashboardProps {
  initialPlate?: string;
  initialDriver?: number;
  initialDob?: string;
  initialName?: string;
  initialMobile?: string;
  initialGender?: any;
  [key: string]: any;
}

export const VehicleNumerologyDashboard: React.FC<VehicleNumerologyDashboardProps> = ({
  initialPlate = '',
  initialDriver = 1
}) => {
  const [plate, setPlate] = useState(initialPlate);
  const [driver, setDriver] = useState(initialDriver);
  const [report, setReport] = useState<VehicleReport | null>(() => {
    return initialPlate ? analyzeVehicleNumerology(initialPlate, initialDriver) : null;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!plate.trim()) return;
    setReport(analyzeVehicleNumerology(plate, driver));
  };

  return (
    <div className="bg-white border rounded-3xl p-6 md:p-8 space-y-6 shadow-xs max-w-4xl mx-auto">
      <div className="flex items-center gap-3 border-b pb-4">
        <div className="w-10 h-10 rounded-2xl bg-amber-100 text-[#D97706] flex items-center justify-center">
          <Car className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-playfair text-xl font-bold text-slate-800">वाहन अंक ज्योतिष (Vehicle Numerology Pro)</h2>
          <p className="text-xs text-slate-500 font-sans">वाहन नंबर प्लेट का आपके मूलांक के साथ अनुकूलता एवं सुरक्षा परीक्षण</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">वाहन नंबर (Vehicle Number)</label>
          <input
            type="text"
            value={plate}
            onChange={(e) => setPlate(e.target.value.toUpperCase())}
            placeholder="e.g. DL 01 AB 1234"
            className="w-full bg-slate-50 border rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-mono focus:bg-white focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">आपका मूलांक (Driver Number)</label>
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
            विश्लेषण करें (Audit)
          </button>
        </div>
      </form>

      {report && (
        <div className="p-5 bg-slate-50 border rounded-2xl space-y-4 animate-in fade-in">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Plate Root Total</span>
              <div className="text-2xl font-bold font-playfair text-slate-800">{report.reducedNumber} ({report.rating})</div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Compatibility</span>
              <div className="text-2xl font-black font-mono text-[#D97706]">{report.compatibilityScore}/100</div>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">{report.impact}</p>
          <div className="p-3 bg-white border rounded-xl text-xs text-slate-700 space-y-1">
            <strong>सुझाव एवं उपाय (Remedy):</strong> {report.advice} {report.remedy}
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleNumerologyDashboard;
