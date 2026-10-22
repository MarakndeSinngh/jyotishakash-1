import React, { useState } from 'react';
import { 
  Sparkles, 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Edit3,
  User,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

interface NameNumerologyDashboardProps {
  nameAnalysis?: any;
  mulank?: number;
  bhagyank?: number;
  mobile?: string;
  dob?: string;
}

const CHALDEAN_MAP: Record<string, number> = {
  A: 1, I: 1, J: 1, Q: 1, Y: 1,
  B: 2, K: 2, R: 2,
  C: 3, G: 3, L: 3, S: 3,
  D: 4, M: 4, T: 4,
  E: 5, H: 5, N: 5, X: 5,
  U: 6, V: 6, W: 6,
  O: 7, Z: 7,
  F: 8, P: 8
};

const PYTHAGOREAN_MAP: Record<string, number> = {
  A: 1, J: 1, S: 1,
  B: 2, K: 2, T: 2,
  C: 3, L: 3, U: 3,
  D: 4, M: 4, V: 4,
  E: 5, N: 5, W: 5,
  F: 6, O: 6, X: 6,
  G: 7, P: 7, Y: 7,
  H: 8, Q: 8, Z: 8,
  I: 9, R: 9
};

const COMPOUND_MEANINGS: Record<number, { title: string; meaning: string; status: 'EXCELLENT' | 'GOOD' | 'NEEDS_CORRECTION' }> = {
  14: { title: 'The Magnetic Messenger (14=5)', meaning: 'तीव्र आकर्षण, व्यापार में सफलता और लोकप्रियता। जोखिम से सावधान रहें।', status: 'GOOD' },
  19: { title: 'The Prince of Heaven (19=1)', meaning: 'सर्वश्रेष्ठ सफलता का अंक! सूर्य की पूर्ण कृपा, मान-सम्मान और दीर्घायु।', status: 'EXCELLENT' },
  23: { title: 'The Royal Star of the Lion (23=5)', meaning: 'परम शुभ राजयोग अंक! उच्च पद, व्यापारिक प्रभुत्व व मित्रों का भरपूर सहयोग।', status: 'EXCELLENT' },
  24: { title: 'Love & Family Prosperity (24=6)', meaning: 'शुक्र का शुभ अंक। पारिवारिक सुख, कला में प्रतिष्ठा और निरंतर धन प्रवाह।', status: 'EXCELLENT' },
  27: { title: 'The Sceptre (27=9)', meaning: 'साहस, नेतृत्व व आध्यात्मिक बल। विरोधियों पर विजय प्राप्त होती है।', status: 'EXCELLENT' },
  32: { title: 'Communication Mastery (32=5)', meaning: 'जनसंचार, मीडिया और व्यापार में अपार ख्याति दिलाने वाला चमत्कारी अंक।', status: 'EXCELLENT' },
  33: { title: 'Master Teacher (33=6)', meaning: 'आध्यात्मिक ज्ञान, परोपकार एवं समाज में पूज्यनीय स्थान।', status: 'EXCELLENT' },
  37: { title: 'The Lucky Star (37=1)', meaning: 'प्रेम, दांपत्य और साझेदारी में अपार सफलता। सूर्य-केतु का शुभ संयोजन।', status: 'EXCELLENT' },
  41: { title: 'Rapid Growth (41=5)', meaning: 'नवीन विचारों द्वारा त्वरित व्यापारिक विस्तार।', status: 'EXCELLENT' },
  42: { title: 'Gentle Harmonizer (42=6)', meaning: 'मित्रता और सुख-शांति का प्रतीक।', status: 'GOOD' }
};

export default function NameNumerologyDashboard({
  nameAnalysis,
  mulank = 1,
  bhagyank = 5,
  mobile = '',
  dob = ''
}: NameNumerologyDashboardProps) {
  const [testName, setTestName] = useState(nameAnalysis?.cleanName || 'RAAJEEV SINGH');

  const clean = testName.toUpperCase().replace(/[^A-Z ]/g, '');
  const words = clean.split(' ').filter(w => w.length > 0);

  const calculateChaldean = (str: string) => {
    let sum = 0;
    const breakdown: { char: string; val: number }[] = [];
    for (const ch of str) {
      if (CHALDEAN_MAP[ch]) {
        sum += CHALDEAN_MAP[ch];
        breakdown.push({ char: ch, val: CHALDEAN_MAP[ch] });
      }
    }
    const single = sum > 9 ? sum.toString().split('').reduce((a, b) => a + parseInt(b, 10), 0) : sum;
    const finalSingle = single > 9 ? single.toString().split('').reduce((a, b) => a + parseInt(b, 10), 0) : single;
    return { compound: sum, single: finalSingle, breakdown };
  };

  const fullChaldean = calculateChaldean(clean.replace(/\s+/g, ''));
  const compoundInfo = COMPOUND_MEANINGS[fullChaldean.compound] || {
    title: `Compound Number ${fullChaldean.compound}`,
    meaning: `नामांक ${fullChaldean.compound} का एकल अंक ${fullChaldean.single} बनता है।`,
    status: fullChaldean.single === 1 || fullChaldean.single === 5 || fullChaldean.single === 6 ? 'EXCELLENT' : 'GOOD'
  };

  const isCompatibleWithMulank = [1, 5, 6].includes(fullChaldean.single);

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12 font-sans text-left">
      {/* Banner */}
      <div className="bg-gradient-to-br from-[#1E1B4B] via-[#0F172A] to-[#020617] text-white p-6 md:p-8 rounded-[32px] border border-indigo-500/20 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-indigo-300 uppercase tracking-widest">
              <Sparkles className="w-4 h-4" /> चालडीयन एवं पाइथागोरियन नाम अंकशास्त्र
            </div>
            <h2 className="text-2xl md:text-4xl font-playfair font-bold text-white">
              Chaldean Name Correction &amp; Resonance
            </h2>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
              अपने नाम की वर्तनी (Spelling) को मूलांक ({mulank}) और भाग्यांक ({bhagyank}) की अनुकूल ग्रहीय तरंगों (1, 5, 6) पर संरेखित कर जीवन में सफलता, स्वास्थ्य और सौभाग्य आकर्षित करें।
            </p>
          </div>

          <div className="flex gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-center">
            <div className="px-3 border-r border-white/10">
              <span className="text-[10px] text-indigo-200 block uppercase font-mono">कम्पाउंड अंक</span>
              <span className="text-3xl font-bold font-playfair text-white">{fullChaldean.compound}</span>
            </div>
            <div className="px-3">
              <span className="text-[10px] text-indigo-200 block uppercase font-mono">एकल नामांक</span>
              <span className="text-3xl font-bold font-playfair text-amber-300">{fullChaldean.single}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Name Correction Input */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-4">
          <div>
            <h3 className="font-playfair text-lg font-bold text-slate-900 flex items-center gap-2">
              <Edit3 className="w-5 h-5 text-indigo-600" /> लाइव नाम वर्तनी परीक्षक (Live Name Spell Tester)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              अक्षरों को घटाकर या बढ़ाकर देखें कि आपका नामांक किस शुभ संख्या पर पहुंचता है
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600">सुझावित शुभ नामांक:</span>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-mono font-bold px-2 py-0.5 rounded-md">1</span>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-mono font-bold px-2 py-0.5 rounded-md">5</span>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-mono font-bold px-2 py-0.5 rounded-md">6</span>
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">
            अंग्रेजी में नाम लिखें (Enter Full Name in English)
          </label>
          <input
            type="text"
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
            className="w-full px-5 py-3.5 bg-slate-50 border-2 border-indigo-200 rounded-2xl text-lg font-mono font-bold uppercase tracking-wider text-slate-900 focus:outline-none focus:border-indigo-600 shadow-xs"
            placeholder="E.G. RAAJEEV SINGH CHAUHANN"
          />
        </div>

        {/* Word by Word Breakdown */}
        <div className="space-y-4 pt-2">
          <span className="text-xs font-bold text-slate-700 uppercase block">
            शब्द-दर-शब्द चालडीयन विभाजन (Word-by-Word Chaldean Breakdown):
          </span>
          <div className="flex flex-wrap gap-4">
            {words.map((w, idx) => {
              const calc = calculateChaldean(w);
              return (
                <div key={idx} className="bg-indigo-50/70 border border-indigo-200/80 p-4 rounded-2xl space-y-2 min-w-[160px]">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm text-indigo-950 font-mono tracking-wider">{w}</span>
                    <span className="text-xs font-mono bg-white px-2 py-0.5 rounded-md font-bold text-indigo-700 shadow-2xs">
                      ={calc.compound} ({calc.single})
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {calc.breakdown.map((b, i) => (
                      <span key={i} className="text-[10px] font-mono bg-white/80 px-1.5 py-0.5 rounded text-slate-700">
                        {b.char}:{b.val}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Compound Number Meaning Card */}
        <div className={`p-6 rounded-2xl border ${
          compoundInfo.status === 'EXCELLENT'
            ? 'bg-emerald-50/80 border-emerald-300'
            : 'bg-amber-50/80 border-amber-300'
        } space-y-3`}>
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-600" /> {compoundInfo.title}
            </span>
            <span className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase ${
              compoundInfo.status === 'EXCELLENT' ? 'bg-emerald-200 text-emerald-900' : 'bg-amber-200 text-amber-900'
            }`}>
              {compoundInfo.status === 'EXCELLENT' ? 'अति शुभ योग (Royal Star)' : 'संतुलित योग'}
            </span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-sans">
            {compoundInfo.meaning}
          </p>
        </div>
      </div>
    </div>
  );
}
