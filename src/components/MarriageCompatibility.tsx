import React, { useState } from 'react';
import { 
  Heart, 
  Sparkles, 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  Award, 
  ArrowRight,
  Flame,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import DateInput from './DateInput';

// Planetary compatibility matrix for Driver (1 to 9)
// 1: Sun, 2: Moon, 3: Jupiter, 4: Rahu, 5: Mercury, 6: Venus, 7: Ketu, 8: Saturn, 9: Mars
const PLANETARY_HARMONY: Record<number, { friends: number[]; neutral: number[]; enemies: number[]; ruler: string }> = {
  1: { ruler: 'सूर्य (Sun)', friends: [1, 2, 3, 5, 9], neutral: [4, 7], enemies: [6, 8] },
  2: { ruler: 'चंद्र (Moon)', friends: [1, 2, 3, 5], neutral: [7, 9], enemies: [4, 6, 8] },
  3: { ruler: 'गुरु (Jupiter)', friends: [1, 2, 3, 9], neutral: [5, 7], enemies: [4, 6, 8] },
  4: { ruler: 'राहु (Rahu)', friends: [1, 5, 6, 7, 8], neutral: [3], enemies: [2, 4, 9] },
  5: { ruler: 'बुध (Mercury)', friends: [1, 2, 3, 5, 6], neutral: [7, 8, 9], enemies: [4] },
  6: { ruler: 'शुक्र (Venus)', friends: [1, 4, 5, 6, 7, 8], neutral: [9], enemies: [2, 3] },
  7: { ruler: 'केतु (Ketu)', friends: [1, 4, 5, 6, 7], neutral: [2, 3], enemies: [8, 9] },
  8: { ruler: 'शनि (Saturn)', friends: [4, 5, 6, 7, 8], neutral: [3], enemies: [1, 2, 9] },
  9: { ruler: 'मंगल (Mars)', friends: [1, 2, 3, 5], neutral: [6, 7], enemies: [4, 8] }
};

export default function MarriageCompatibility() {
  const [partner1Name, setPartner1Name] = useState('Rahul');
  const [partner1Dob, setPartner1Dob] = useState('1992-05-14');
  const [partner1Gender, setPartner1Gender] = useState<'MALE' | 'FEMALE'>('MALE');

  const [partner2Name, setPartner2Name] = useState('Priya');
  const [partner2Dob, setPartner2Dob] = useState('1994-08-23');
  const [partner2Gender, setPartner2Gender] = useState<'MALE' | 'FEMALE'>('FEMALE');

  const reduceToSingle = (num: number): number => {
    let sum = num;
    while (sum > 9) {
      sum = sum.toString().split('').reduce((acc, d) => acc + parseInt(d, 10), 0);
    }
    return sum;
  };

  const calculateNumbers = (dobString: string) => {
    if (!dobString) return { mulank: 1, bhagyank: 1 };
    const clean = dobString.replace(/[^0-9]/g, '');
    let day = 1, month = 1, year = 1990;
    if (dobString.includes('-')) {
      const parts = dobString.split('-');
      year = parseInt(parts[0], 10) || 1990;
      month = parseInt(parts[1], 10) || 1;
      day = parseInt(parts[2], 10) || 1;
    } else if (clean.length >= 8) {
      day = parseInt(clean.substring(0, 2), 10);
      month = parseInt(clean.substring(2, 4), 10);
      year = parseInt(clean.substring(4, 8), 10);
    }
    const mulank = reduceToSingle(day);
    const digits = `${day}${month}${year}`.split('').map(d => parseInt(d, 10));
    const bhagyank = reduceToSingle(digits.reduce((a, b) => a + b, 0));
    return { mulank, bhagyank, day, month, year };
  };

  const p1 = calculateNumbers(partner1Dob);
  const p2 = calculateNumbers(partner2Dob);

  // Synastry score evaluation
  const evaluateCompatibility = () => {
    const p1Rules = PLANETARY_HARMONY[p1.mulank] || PLANETARY_HARMONY[1];
    const p2Rules = PLANETARY_HARMONY[p2.mulank] || PLANETARY_HARMONY[1];

    let score = 50; // base

    // 1. Driver to Driver
    if (p1Rules.friends.includes(p2.mulank)) score += 18;
    else if (p1Rules.enemies.includes(p2.mulank)) score -= 18;
    else score += 8;

    // 2. Conductor to Conductor
    const p1BhagyaRules = PLANETARY_HARMONY[p1.bhagyank] || PLANETARY_HARMONY[1];
    if (p1BhagyaRules.friends.includes(p2.bhagyank)) score += 15;
    else if (p1BhagyaRules.enemies.includes(p2.bhagyank)) score -= 12;
    else score += 5;

    // 3. Driver to Conductor cross
    if (p1Rules.friends.includes(p2.bhagyank) && p2Rules.friends.includes(p1.bhagyank)) score += 12;
    else if (p1Rules.enemies.includes(p2.bhagyank)) score -= 8;

    // Boundary cap
    score = Math.max(30, Math.min(98, score));

    let status = 'उत्तम सामंजस्य (Excellent Compatibility)';
    let color = 'text-emerald-600 bg-emerald-50 border-emerald-300';
    if (score < 60) {
      status = 'वैदिक उपाय आवश्यक (Remedies Required)';
      color = 'text-amber-700 bg-amber-50 border-amber-300';
    } else if (score < 75) {
      status = 'मध्यम व अनुकूल (Good & Harmonious)';
      color = 'text-blue-700 bg-blue-50 border-blue-300';
    }

    return { score, status, color };
  };

  const result = evaluateCompatibility();

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12 font-sans text-left">
      {/* Banner */}
      <div className="bg-gradient-to-br from-[#4A0E17] via-[#2D0A10] to-[#170407] text-white p-6 md:p-8 rounded-[32px] border border-rose-500/20 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-rose-300 uppercase tracking-widest">
              <Heart className="w-4 h-4 fill-rose-300 text-rose-300" /> वैदिक विवाह एवं जीवनसाथी गुण मिलान
            </div>
            <h2 className="text-2xl md:text-4xl font-playfair font-bold text-white">
              Vedic Marriage &amp; Partner Synastry v3.0
            </h2>
            <p className="text-xs md:text-sm text-rose-100/80 max-w-2xl leading-relaxed">
              मूलांक एवं भाग्यांक के 7-परतीय ग्रहीय तालमेल द्वारा आपसी समझ, प्रेम, वित्तीय समृद्धि, पारिवारिक संतुलन एवं कलह निवारक उपचारों का संपूर्ण विश्लेषण।
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-center min-w-[160px]">
            <span className="text-[10px] text-rose-200 block uppercase font-mono tracking-widest">सामंजस्य स्कोर</span>
            <span className="text-4xl font-black font-playfair text-white">{result.score}%</span>
            <span className="text-[11px] block text-rose-200 mt-1 font-semibold">{result.status.split('(')[0]}</span>
          </div>
        </div>
      </div>

      {/* Two Column Partner Profile Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Partner 1 */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <span className="font-bold text-sm text-slate-800 flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" /> प्रथम साथी (Partner 1)
            </span>
            <span className="text-xs font-mono bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full font-bold">
              मूलांक: {p1.mulank} | भाग्यांक: {p1.bhagyank}
            </span>
          </div>
          <div>
            <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">नाम (Name)</label>
            <input
              type="text"
              value={partner1Name}
              onChange={(e) => setPartner1Name(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-rose-500"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">जन्म तिथि (Date of Birth)</label>
            <DateInput
              id="partner1-dob"
              value={partner1Dob}
              onChange={setPartner1Dob}
              className="py-2.5 bg-slate-50"
            />
          </div>
          <div className="pt-2 text-xs text-slate-500 space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
            <div>स्वामी ग्रह: <span className="font-bold text-slate-700">{PLANETARY_HARMONY[p1.mulank]?.ruler}</span></div>
            <div>तत्व: <span className="font-bold text-slate-700">{p1.mulank === 1 || p1.mulank === 9 ? 'अग्नि (Fire)' : p1.mulank === 2 ? 'जल (Water)' : 'पृथ्वी/वायु'}</span></div>
          </div>
        </div>

        {/* Partner 2 */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <span className="font-bold text-sm text-slate-800 flex items-center gap-2">
              <Users className="w-4 h-4 text-rose-600" /> द्वितीय साथी (Partner 2)
            </span>
            <span className="text-xs font-mono bg-rose-50 text-rose-700 px-2.5 py-0.5 rounded-full font-bold">
              मूलांक: {p2.mulank} | भाग्यांक: {p2.bhagyank}
            </span>
          </div>
          <div>
            <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">नाम (Name)</label>
            <input
              type="text"
              value={partner2Name}
              onChange={(e) => setPartner2Name(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-rose-500"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">जन्म तिथि (Date of Birth)</label>
            <DateInput
              id="partner2-dob"
              value={partner2Dob}
              onChange={setPartner2Dob}
              className="py-2.5 bg-slate-50"
            />
          </div>
          <div className="pt-2 text-xs text-slate-500 space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
            <div>स्वामी ग्रह: <span className="font-bold text-slate-700">{PLANETARY_HARMONY[p2.mulank]?.ruler}</span></div>
            <div>तत्व: <span className="font-bold text-slate-700">{p2.mulank === 1 || p2.mulank === 9 ? 'अग्नि (Fire)' : p2.mulank === 2 ? 'जल (Water)' : 'पृथ्वी/वायु'}</span></div>
          </div>
        </div>
      </div>

      {/* 7-Layer Synastry Breakdown */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <h3 className="font-playfair text-xl font-bold text-slate-900 border-b pb-4">
          7-स्तरीय वैदिक गुण मिलान विश्लेषण (7-Layer Synastry Report)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <span className="font-bold text-xs text-slate-800 block flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 1. मूलांक तालमेल (Driver-to-Driver)
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              {p1.mulank} ({PLANETARY_HARMONY[p1.mulank]?.ruler}) एवं {p2.mulank} ({PLANETARY_HARMONY[p2.mulank]?.ruler}) के मध्य संबंध: {
                PLANETARY_HARMONY[p1.mulank]?.friends.includes(p2.mulank) ? 'परम मित्र संबंध! दोनों की मूल प्रकृति एक दूसरे का सम्मान करेगी।' :
                PLANETARY_HARMONY[p1.mulank]?.enemies.includes(p2.mulank) ? 'विरोधी ग्रह ऊर्जा। अहंकार के टकराव से बचने हेतु धैर्य आवश्यक है।' :
                'तटस्थ एवं संतुलित संबंध। आपसी संवाद से प्रेम बना रहेगा।'
              }
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <span className="font-bold text-xs text-slate-800 block flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 2. भाग्यांक तालमेल (Destiny-to-Destiny)
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              दीर्घकालिक जीवन लक्ष्य व कर्म ऊर्जा ({p1.bhagyank} और {p2.bhagyank}): {
                p1.bhagyank === p2.bhagyank ? 'समान जीवन पथ! सामाजिक व आध्यात्मिक दृष्टिकोण में गहरी समानता रहेगी।' :
                'परस्पर पूरक दृष्टिकोण। एक का प्रबंधन दूसरे की प्रेरणा बनेगा।'
              }
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <span className="font-bold text-xs text-slate-800 block flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600" /> 3. वित्तीय एवं भौतिक समृद्धि
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              दोनों का संयुक्त भाग्यांक भौतिक सुख-सुविधाओं और धन वृद्धि के लिए अनुकूल योग बनाता है। व्यापार या संयुक्त निवेश में स्थिरता रहेगी।
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <span className="font-bold text-xs text-slate-800 block flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-purple-600" /> 4. भावनात्मक एवं मानसिक समरसता
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              आपसी बातचीत और संकट के समय एक दूसरे को संबल देने की क्षमता प्रबल है। तनावपूर्ण पलों में शांत रहकर निर्णय लेना श्रेष्ठ रहेगा।
            </p>
          </div>
        </div>

        {/* Remedial Advice */}
        <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-300 space-y-2">
          <span className="font-bold text-amber-900 text-xs flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" /> सुखद दांपत्य हेतु वैदिक परामर्श व उपाय (Marital Harmony Remedies)
          </span>
          <p className="text-xs text-amber-800 leading-relaxed">
            1. शयनकक्ष के दक्षिण-पश्चिम कोने में क्रिस्टल या गुलाबी क्वार्ट्ज रखें।<br />
            2. शुक्रवार के दिन सुगंधित अगरबत्ती या इत्र का प्रयोग करें तथा मां लक्ष्मी की आराधना करें।<br />
            3. यदि मूलांक में विरोधी योग हो, तो दोनों साथी हल्के पीले या क्रीम वस्त्रों का अधिक उपयोग करें।
          </p>
        </div>
      </div>
    </div>
  );
}
