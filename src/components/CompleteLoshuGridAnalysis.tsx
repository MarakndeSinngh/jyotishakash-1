import React, { useState } from 'react';
import { 
  Grid3X3, 
  Sparkles, 
  Compass, 
  CheckCircle2, 
  AlertCircle, 
  Award, 
  Download, 
  RefreshCw, 
  ChevronRight,
  Info,
  Calendar,
  User,
  ShieldAlert,
  Flame,
  Droplet,
  Mountain,
  Feather
} from 'lucide-react';
import DateInput from './DateInput';

interface CompleteLoshuGridAnalysisProps {
  initialProfile?: {
    name?: string;
    dob?: string;
    gender?: string;
  } | null;
}

// Lo Shu Grid standard positions:
// 4 (Wood/Wealth) | 9 (Fire/Fame) | 2 (Earth/Marriage)
// 3 (Wood/Family) | 5 (Earth/Health) | 7 (Metal/Children)
// 8 (Earth/Knowledge) | 1 (Water/Career) | 6 (Metal/Friends-Travel)

interface PlaneInfo {
  name: string;
  hindiName: string;
  numbers: number[];
  type: 'HORIZONTAL' | 'VERTICAL' | 'DIAGONAL';
  fullMeaning: string;
  emptyMeaning: string;
}

const PLANES: PlaneInfo[] = [
  {
    name: 'Mental Plane',
    hindiName: 'मानसिक तल (4-9-2)',
    numbers: [4, 9, 2],
    type: 'HORIZONTAL',
    fullMeaning: 'तीक्ष्ण स्मरणशक्ति, तार्किक क्षमता और उत्कृष्ट बौद्धिक विश्लेषण। व्यक्ति गहरे विचारों वाला और दूरदर्शी होता है।',
    emptyMeaning: 'निर्णय लेने में अनिर्णय की स्थिति या अधिक भावनात्मक सोच। मानसिक एकाग्रता हेतु बुध व सूर्य के उपाय करें।'
  },
  {
    name: 'Emotional / Heart Plane',
    hindiName: 'भावनात्मक तल (3-5-7)',
    numbers: [3, 5, 7],
    type: 'HORIZONTAL',
    fullMeaning: 'अत्यधिक संवेदनशीलता, अंतर्ज्ञान (Intuition), कलात्मक रुचि एवं दूसरों के दुख-दर्द को समझने की अद्भुत क्षमता।',
    emptyMeaning: 'भावनाओं को व्यक्त करने में कठिनाई या कठोर व्यवहार की प्रतीति। हृदय चक्र ध्यान व चांदी का उपयोग शुभ है।'
  },
  {
    name: 'Practical / Action Plane',
    hindiName: 'व्यावहारिक तल (8-1-6)',
    numbers: [8, 1, 6],
    type: 'HORIZONTAL',
    fullMeaning: 'यथार्थवादी दृष्टिकोण, कर्मठता, भौतिक सफलता और योजनाओं को व्यावहारिक धरातल पर क्रियान्वित करने का हुनर।',
    emptyMeaning: 'योजनाएं तो बहुत बनती हैं किंतु क्रियान्वयन में देरी होती है। अनुशासन व शनि-शुक्र के संतुलन की आवश्यकता।'
  },
  {
    name: 'Thought / Planning Plane',
    hindiName: 'विचार तल (4-3-8)',
    numbers: [4, 3, 8],
    type: 'VERTICAL',
    fullMeaning: 'अद्भुत योजनाकार, दूरगामी सोच, संगठन क्षमता और रणनीति बनाने में माहिर। राजनीति या उच्च प्रबंधन के अनुकूल।',
    emptyMeaning: 'बिना सोचे-समझे कार्य आरंभ करने की प्रवृत्ति। नियमित प्राणायाम व पीले रंग का प्रयोग लाभकारी है।'
  },
  {
    name: 'Will Power Plane',
    hindiName: 'इच्छाशक्ति तल (9-5-1)',
    numbers: [9, 5, 1],
    type: 'VERTICAL',
    fullMeaning: 'अटल संकल्प, विपरीत परिस्थितियों में कभी न झुकने का जज्बा, असीम ऊर्जा और जीवन में हर लक्ष्य पाने की क्षमता।',
    emptyMeaning: 'लक्ष्य से जल्दी भटक जाना या आत्म-संदेह। सूर्य गायत्री मंत्र व सूर्य को नित्य अर्घ्य देना श्रेष्ठ फलदायी है।'
  },
  {
    name: 'Action Plane',
    hindiName: 'कर्म तल (2-7-6)',
    numbers: [2, 7, 6],
    type: 'VERTICAL',
    fullMeaning: 'त्वरित निर्णय, तुरंत कर्म करने की तत्परता और परिणामों को वास्तविकता में बदलने की शक्ति।',
    emptyMeaning: 'आलस्य या अंतिम समय पर कार्यों को टालना। तांबे का कड़ा या रुद्राक्ष धारण करने से कर्म ऊर्जा जागृत होती है।'
  },
  {
    name: 'Golden Raj Yoga (Success Plane)',
    hindiName: 'स्वर्ण राजयोग (4-5-6)',
    numbers: [4, 5, 6],
    type: 'DIAGONAL',
    fullMeaning: 'परम राजयोग! अपार धन, वैभव, सामाजिक प्रतिष्ठा, व्यापारिक प्रभुत्व और सर्वसुख संपन्न जीवन की प्राप्ति।',
    emptyMeaning: 'भाग्य के साथ-साथ सतत कर्म की आवश्यकता। 5 अंक (संतुलन) स्थापित करने हेतु पन्ना या हरा धागा धारण करें।'
  },
  {
    name: 'Silver Raj Yoga (Property Plane)',
    hindiName: 'रजत राजयोग (2-5-8)',
    numbers: [2, 5, 8],
    type: 'DIAGONAL',
    fullMeaning: 'भूमि, भवन, अचल संपत्ति और स्थायी समृद्धि का प्रबल योग। रियल एस्टेट और पैतृक संपत्ति में भारी लाभ।',
    emptyMeaning: 'संपत्ति प्राप्ति में अवरोध या देरी। ईशान कोण स्वच्छ रखें और मिट्टी के बर्तन में जल भरकर रखें।'
  }
];

const NUMBER_REMEDIES: Record<number, { element: string; planet: string; direction: string; remedy: string }> = {
  1: { element: 'जल (Water)', planet: 'सूर्य (Sun/Career)', direction: 'उत्तर (North)', remedy: 'उत्तर दिशा में बहते पानी का फव्वारा या एक्वेरियम रखें। उगते सूर्य को अर्घ्य दें।' },
  2: { element: 'पृथ्वी (Earth)', planet: 'चंद्रमा (Moon/Marriage)', direction: 'दक्षिण-पश्चिम (South-West)', remedy: 'दक्षिण-पश्चिम में क्रिस्टल बॉल या गुलाबी क्वार्ट्ज रखें। माता का आशीर्वाद लें।' },
  3: { element: 'काष्ठ (Wood)', planet: 'गुरु (Jupiter/Health)', direction: 'पूर्व (East)', remedy: 'पूर्व दिशा में हरे पौधे जैसे मनी प्लांट या बांस का पौधा लगाएं। गुरुवार को चने की दाल दान करें।' },
  4: { element: 'काष्ठ (Wood)', planet: 'राहु (Rahu/Wealth)', direction: 'दक्षिण-पूर्व (South-East)', remedy: 'दक्षिण-पूर्व कोने में हरे रंग का प्रकाश करें या लकड़ी की विंड चाइम लगाएं।' },
  5: { element: 'पृथ्वी (Earth)', planet: 'बुध (Mercury/Centre-Balance)', direction: 'ब्रह्मस्थान (Centre)', remedy: 'घर का मध्य भाग खाली और स्वच्छ रखें। हरा धागा कलाई पर बांधें।' },
  6: { element: 'धातु (Metal)', planet: 'शुक्र (Venus/Luxury-Friends)', direction: 'उत्तर-पश्चिम (North-West)', remedy: 'उत्तर-पश्चिम में 6 रॉड वाली धातु की विंड चाइम लगाएं। सफेद या क्रीम कपड़े पहनें।' },
  7: { element: 'धातु (Metal)', planet: 'केतु (Ketu/Children-Creativity)', direction: 'पश्चिम (West)', remedy: 'पश्चिम दिशा में पीतल या तांबे का सजावटी सामान रखें। गणेश जी की उपासना करें।' },
  8: { element: 'पृथ्वी (Earth)', planet: 'शनि (Saturn/Knowledge)', direction: 'उत्तर-पूर्व (North-East)', remedy: 'उत्तर-पूर्व में क्रिस्टल पिरामिड रखें और अध्ययन कक्ष बनाएं। शनिवार को काले तिल दान करें।' },
  9: { element: 'अग्नि (Fire)', planet: 'मंगल (Mars/Fame-Reputation)', direction: 'दक्षिण (South)', remedy: 'दक्षिण दिशा में लाल प्रकाश या लाल मोमबत्ती जलाएं। हनुमान चालीसा का पाठ करें।' }
};

export default function CompleteLoshuGridAnalysis({ initialProfile }: CompleteLoshuGridAnalysisProps) {
  const [name, setName] = useState(initialProfile?.name || 'Seeker');
  const [dob, setDob] = useState(initialProfile?.dob || '1990-01-15');
  const [gender, setGender] = useState(initialProfile?.gender || 'MALE');

  // Calculate Driver (Mulank), Conductor (Bhagyank), Kua Number, and Grid counts
  const calculateAnalysis = () => {
    if (!dob) return null;
    const cleanDob = dob.replace(/[^0-9]/g, '');
    if (cleanDob.length < 8) return null;

    // YYYY-MM-DD or DDMMYYYY format handling
    let day = 0, month = 0, year = 0;
    if (dob.includes('-')) {
      const parts = dob.split('-');
      year = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10);
      day = parseInt(parts[2], 10);
    } else {
      day = parseInt(cleanDob.substring(0, 2), 10);
      month = parseInt(cleanDob.substring(2, 4), 10);
      year = parseInt(cleanDob.substring(4, 8), 10);
    }

    const reduceToSingle = (num: number): number => {
      let sum = num;
      while (sum > 9) {
        sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
      }
      return sum;
    };

    const mulank = reduceToSingle(day);
    
    // Bhagyank = sum of all digits in DOB
    const allDigits = `${day}${month}${year}`.split('').map(d => parseInt(d, 10));
    const totalDobSum = allDigits.reduce((acc, curr) => acc + curr, 0);
    const bhagyank = reduceToSingle(totalDobSum);

    // Kua Number calculation
    const yearDigitsSum = reduceToSingle(year.toString().split('').reduce((acc, d) => acc + parseInt(d, 10), 0));
    let kua = 0;
    if (gender === 'FEMALE') {
      kua = reduceToSingle(yearDigitsSum + 4);
    } else {
      kua = reduceToSingle(10 - yearDigitsSum);
      if (kua === 0) kua = 9;
    }

    // Populate Lo Shu Grid from DOB digits + Mulank + Bhagyank
    const gridCount: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
    
    // Add DOB digits (ignore zeros)
    allDigits.forEach(d => {
      if (d >= 1 && d <= 9) {
        gridCount[d] = (gridCount[d] || 0) + 1;
      }
    });

    // Add Driver and Conductor
    if (mulank >= 1 && mulank <= 9) gridCount[mulank] = (gridCount[mulank] || 0) + 1;
    if (bhagyank >= 1 && bhagyank <= 9) gridCount[bhagyank] = (gridCount[bhagyank] || 0) + 1;

    return {
      mulank,
      bhagyank,
      kua,
      gridCount,
      day,
      month,
      year
    };
  };

  const analysis = calculateAnalysis();

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12 font-sans text-left">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#020617] text-white p-6 md:p-8 rounded-[32px] border border-amber-500/20 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-300 uppercase tracking-widest">
              <Grid3X3 className="w-4 h-4" /> संपूर्ण लोशू ग्रिड जन्मकुंडली
            </div>
            <h2 className="text-2xl md:text-4xl font-playfair font-bold text-white">
              Lo Shu Grid &amp; Cosmic Arrows Analysis
            </h2>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
              चीन एवं प्राचीन वैदिक संस्कृति का 3x3 जादुई वर्ग, जो आपके 8 जीवन तलों (Planes), छुपे हुए राजयोगों तथा रिक्त अंकों के सटीक वैदिक उपचार प्रकट करता है।
            </p>
          </div>

          <div className="flex flex-wrap gap-3 bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <div className="text-center px-3 border-r border-white/10">
              <span className="text-[10px] text-amber-300 block uppercase font-mono">मूलांक (Driver)</span>
              <span className="text-2xl font-bold font-playfair text-white">{analysis?.mulank || '—'}</span>
            </div>
            <div className="text-center px-3 border-r border-white/10">
              <span className="text-[10px] text-amber-300 block uppercase font-mono">भाग्यांक (Destiny)</span>
              <span className="text-2xl font-bold font-playfair text-white">{analysis?.bhagyank || '—'}</span>
            </div>
            <div className="text-center px-3">
              <span className="text-[10px] text-amber-300 block uppercase font-mono">कुआ नंबर (Kua)</span>
              <span className="text-2xl font-bold font-playfair text-white">{analysis?.kua || '—'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Bar / Quick Switcher */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-amber-600" />
            <span className="font-bold text-slate-700">{name || 'Seeker'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-600" />
            <span className="font-mono text-slate-600">{dob || 'Not set'}</span>
          </div>
          <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-[11px] font-bold">
            {gender === 'FEMALE' ? 'महिला (Female)' : 'पुरुष (Male)'}
          </span>
        </div>
        <div className="text-xs text-slate-500">
          ग्रिड में जन्मतिथि + मूलांक + भाग्यांक समाहित हैं
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Visual 3x3 Magic Square */}
        <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <h3 className="font-playfair text-lg font-bold text-slate-900 flex items-center gap-2">
              <Grid3X3 className="w-5 h-5 text-amber-600" /> 3x3 लोशू ग्रिड (Lo Shu Matrix)
            </h3>
            <span className="text-[11px] font-mono text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full font-bold">
              Standard Vedic Square
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 max-w-[340px] mx-auto p-3 bg-slate-900 rounded-3xl shadow-inner border border-amber-500/30">
            {[4, 9, 2, 3, 5, 7, 8, 1, 6].map(num => {
              const count = analysis?.gridCount?.[num] || 0;
              const hasNum = count > 0;
              return (
                <div
                  key={num}
                  className={`h-24 rounded-2xl flex flex-col items-center justify-center p-2 transition-all relative ${
                    hasNum
                      ? 'bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-slate-950 shadow-md font-bold'
                      : 'bg-slate-800/80 border border-slate-700/60 text-slate-500'
                  }`}
                >
                  <span className="text-2xl font-extrabold font-mono">{hasNum ? num : '—'}</span>
                  <span className="text-[10px] tracking-tight text-center block mt-1 font-sans opacity-90">
                    {num === 4 && 'राहु (4)'}
                    {num === 9 && 'मंगल (9)'}
                    {num === 2 && 'चंद्र (2)'}
                    {num === 3 && 'गुरु (3)'}
                    {num === 5 && 'बुध (5)'}
                    {num === 7 && 'केतु (7)'}
                    {num === 8 && 'शनि (8)'}
                    {num === 1 && 'सूर्य (1)'}
                    {num === 6 && 'शुक्र (6)'}
                  </span>
                  {count > 1 && (
                    <span className="absolute top-1.5 right-2 bg-slate-950 text-amber-300 text-[10px] font-mono px-1.5 py-0.5 rounded-full font-extrabold shadow-xs">
                      x{count}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-xs text-slate-600 bg-amber-50/70 p-4 rounded-2xl border border-amber-200/60 space-y-1.5">
            <span className="font-bold text-amber-900 block flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" /> ग्रिड नियम:
            </span>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              संख्याओं की पुनरावृत्ति ऊर्जा को तीव्र करती है। अनुपस्थित संख्याएं जीवन में उस विशिष्ट तत्व व ग्रह की कमी को दर्शाती हैं, जिनका वैदिक उपचार अनिवार्य है।
            </p>
          </div>
        </div>

        {/* Planes / Arrows Analysis */}
        <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b pb-4">
            <h3 className="font-playfair text-lg font-bold text-slate-900">
              8 जीवन तल व बाण (Planes of Strength &amp; Weakness)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              ग्रिड में बनने वाले पूर्ण व अपूर्ण योगों का मनोवैज्ञानिक व आध्यात्मिक फलादेश
            </p>
          </div>

          <div className="space-y-4">
            {PLANES.map((plane, idx) => {
              const presentCount = plane.numbers.filter(n => (analysis?.gridCount?.[n] || 0) > 0).length;
              const isFull = presentCount === 3;
              const isPartial = presentCount > 0 && presentCount < 3;

              return (
                <div 
                  key={idx}
                  className={`p-4 rounded-2xl border transition-all ${
                    isFull
                      ? 'bg-emerald-50/70 border-emerald-300/80 shadow-xs'
                      : isPartial
                      ? 'bg-amber-50/40 border-amber-200/60'
                      : 'bg-slate-50/80 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-bold text-sm text-slate-800 flex items-center gap-2">
                      {isFull ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : isPartial ? (
                        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                      ) : (
                        <span className="w-4 h-4 rounded-full border border-slate-300 inline-block shrink-0" />
                      )}
                      {plane.hindiName}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                      isFull
                        ? 'bg-emerald-200 text-emerald-800'
                        : isPartial
                        ? 'bg-amber-200 text-amber-800'
                        : 'bg-slate-200 text-slate-600'
                    }`}>
                      {isFull ? 'पूर्ण (Active 100%)' : isPartial ? `आंशिक (${presentCount}/3)` : 'रिक्त (Empty)'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {isFull ? plane.fullMeaning : plane.emptyMeaning}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Missing Numbers Remedies Table */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="border-b pb-4">
          <h3 className="font-playfair text-xl font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-600" /> अनुपस्थित अंकों के वैदिक उपचार (Missing Numbers Remedies)
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            अपने ग्रिड में जो अंक नहीं हैं, उनके तत्व (Element) व दिशा को संतुलित करने के अचूक उपाय
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => {
            const count = analysis?.gridCount?.[num] || 0;
            const isMissing = count === 0;
            const info = NUMBER_REMEDIES[num];

            return (
              <div 
                key={num}
                className={`p-4 rounded-2xl border transition-all ${
                  isMissing
                    ? 'bg-rose-50/50 border-rose-200'
                    : 'bg-slate-50/50 border-slate-200 opacity-75'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold font-mono text-sm ${
                      isMissing ? 'bg-rose-500 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {num}
                    </span>
                    <span className="font-bold text-xs text-slate-800">{info.planet}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isMissing ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {isMissing ? 'लापता (Missing)' : `उपलब्ध (${count}x)`}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mb-1.5">
                  तत्व: <span className="font-semibold text-slate-700">{info.element}</span> • दिशा: <span className="font-semibold text-slate-700">{info.direction}</span>
                </div>
                <p className="text-[11px] text-slate-700 leading-relaxed font-sans">
                  उपाय: {info.remedy}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
