import React, { useState } from 'react';
import { 
  Compass, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Award, 
  Home, 
  TrendingUp, 
  Heart, 
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

interface NumeroVastuDashboardProps {
  profile?: any;
  dob?: string;
  name?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
}

const KUA_DIRECTIONS: Record<number, {
  group: 'EAST' | 'WEST';
  element: string;
  trigram: string;
  favorable: { name: string; dir: string; benefit: string }[];
  unfavorable: { name: string; dir: string; risk: string }[];
}> = {
  1: {
    group: 'EAST',
    element: 'जल (Water)',
    trigram: 'कान (Kan)',
    favorable: [
      { name: 'शेंग ची (Sheng Chi)', dir: 'दक्षिण-पूर्व (SE)', benefit: 'सर्वश्रेष्ठ धन, समृद्धि व व्यापारिक सफलता' },
      { name: 'तियान यी (Tian Yi)', dir: 'पूर्व (East)', benefit: 'दीर्घायु, उत्तम स्वास्थ्य व मानसिक शांति' },
      { name: 'यान नियन (Yan Nian)', dir: 'दक्षिण (South)', benefit: 'दांपत्य सुख, प्रेम व पारिवारिक मधुरता' },
      { name: 'फू वेई (Fu Wei)', dir: 'उत्तर (North)', benefit: 'एकाग्रता, आत्म-विकास व शिक्षा' }
    ],
    unfavorable: [
      { name: 'हुओ हाई (Huo Hai)', dir: 'पश्चिम (West)', risk: 'छोटे विवाद व रुकावटें' },
      { name: 'वू गुई (Wu Gui)', dir: 'उत्तर-पूर्व (NE)', risk: 'आर्थिक धोखा व कलह' },
      { name: 'लिउ शा (Liu Sha)', dir: 'उत्तर-पश्चिम (NW)', risk: 'कानूनी उलझनें' },
      { name: 'ज्यू मिंग (Jue Ming)', dir: 'दक्षिण-पश्चिम (SW)', risk: 'गंभीर हानि व स्वास्थ्य संकट' }
    ]
  },
  2: {
    group: 'WEST',
    element: 'पृथ्वी (Earth)',
    trigram: 'कुन (Kun)',
    favorable: [
      { name: 'शेंग ची (Sheng Chi)', dir: 'उत्तर-पूर्व (NE)', benefit: 'भूमि, भवन, ज्ञान व धन प्राप्ति' },
      { name: 'तियान यी (Tian Yi)', dir: 'पश्चिम (West)', benefit: 'आरोग्य व शारीरिक शक्ति' },
      { name: 'यान नियन (Yan Nian)', dir: 'उत्तर-पश्चिम (NW)', benefit: 'मित्रों का सहयोग व मधुर संबंध' },
      { name: 'फू वेई (Fu Wei)', dir: 'दक्षिण-पश्चिम (SW)', benefit: 'स्थिरता व व्यक्तिगत शांति' }
    ],
    unfavorable: [
      { name: 'हुओ हाई (Huo Hai)', dir: 'पूर्व (East)', risk: 'योजनाओं में अड़चन' },
      { name: 'वू गुई (Wu Gui)', dir: 'दक्षिण-पूर्व (SE)', risk: 'अचानक खर्चे' },
      { name: 'लिउ शा (Liu Sha)', dir: 'दक्षिण (South)', risk: 'प्रतिष्ठा को ठेस' },
      { name: 'ज्यू मिंग (Jue Ming)', dir: 'उत्तर (North)', risk: 'करियर में ठहराव' }
    ]
  },
  3: {
    group: 'EAST',
    element: 'काष्ठ (Wood)',
    trigram: 'झेन (Zhen)',
    favorable: [
      { name: 'शेंग ची (Sheng Chi)', dir: 'दक्षिण (South)', benefit: 'ख्याति, यश व सामाजिक पहचान' },
      { name: 'तियान यी (Tian Yi)', dir: 'उत्तर (North)', benefit: 'करियर वृद्धि व स्वास्थ्य' },
      { name: 'यान नियन (Yan Nian)', dir: 'दक्षिण-पूर्व (SE)', benefit: 'पारिवारिक सौहार्द' },
      { name: 'फू वेई (Fu Wei)', dir: 'पूर्व (East)', benefit: 'ऊर्जा व प्रेरणा' }
    ],
    unfavorable: [
      { name: 'हुओ हाई (Huo Hai)', dir: 'दक्षिण-पश्चिम (SW)', risk: 'भावनात्मक तनाव' },
      { name: 'वू गुई (Wu Gui)', dir: 'उत्तर-पश्चिम (NW)', risk: 'सहकर्मियों से अनबन' },
      { name: 'लिउ शा (Liu Sha)', dir: 'उत्तर-पूर्व (NE)', risk: 'निर्णय में भ्रम' },
      { name: 'ज्यू मिंग (Jue Ming)', dir: 'पश्चिम (West)', risk: 'शारीरिक दुर्बलता' }
    ]
  },
  4: {
    group: 'EAST',
    element: 'काष्ठ (Wood)',
    trigram: 'शुन (Xun)',
    favorable: [
      { name: 'शेंग ची (Sheng Chi)', dir: 'उत्तर (North)', benefit: 'असीम अवसर व व्यापार विस्तार' },
      { name: 'तियान यी (Tian Yi)', dir: 'दक्षिण (South)', benefit: 'प्रतिष्ठा व आरोग्यता' },
      { name: 'यान नियन (Yan Nian)', dir: 'पूर्व (East)', benefit: 'दीर्घकालिक रिश्ते' },
      { name: 'फू वेई (Fu Wei)', dir: 'दक्षिण-पूर्व (SE)', benefit: 'रचनात्मकता व शांति' }
    ],
    unfavorable: [
      { name: 'हुओ हाई (Huo Hai)', dir: 'उत्तर-पश्चिम (NW)', risk: 'यात्रा में असुविधा' },
      { name: 'वू गुई (Wu Gui)', dir: 'दक्षिण-पश्चिम (SW)', risk: 'विश्वासघात' },
      { name: 'लिउ शा (Liu Sha)', dir: 'पश्चिम (West)', risk: 'व्यर्थ की चिंता' },
      { name: 'ज्यू मिंग (Jue Ming)', dir: 'उत्तर-पूर्व (NE)', risk: 'वित्तीय अस्थिरता' }
    ]
  },
  5: {
    group: 'WEST', // Male becomes 2, Female becomes 8
    element: 'पृथ्वी (Earth)',
    trigram: 'मध्य (Centre)',
    favorable: [
      { name: 'शेंग ची (Sheng Chi)', dir: 'उत्तर-पूर्व (NE)', benefit: 'अखंड लक्ष्मी व सौभाग्य' },
      { name: 'तियान यी (Tian Yi)', dir: 'पश्चिम (West)', benefit: 'उत्तम स्वास्थ्य व जीवन शक्ति' },
      { name: 'यान नियन (Yan Nian)', dir: 'उत्तर-पश्चिम (NW)', benefit: 'सद्भाव व सामाजिक मान' },
      { name: 'फू वेई (Fu Wei)', dir: 'दक्षिण-पश्चिम (SW)', benefit: 'मानसिक संतुलन' }
    ],
    unfavorable: [
      { name: 'हुओ हाई (Huo Hai)', dir: 'पूर्व (East)', risk: 'कार्यों में विलंब' },
      { name: 'वू गुई (Wu Gui)', dir: 'दक्षिण-पूर्व (SE)', risk: 'झगड़े' },
      { name: 'लिउ शा (Liu Sha)', dir: 'दक्षिण (South)', risk: 'अपयश' },
      { name: 'ज्यू मिंग (Jue Ming)', dir: 'उत्तर (North)', risk: 'हानि' }
    ]
  },
  6: {
    group: 'WEST',
    element: 'धातु (Metal)',
    trigram: 'कियान (Qian)',
    favorable: [
      { name: 'शेंग ची (Sheng Chi)', dir: 'पश्चिम (West)', benefit: 'उच्च पद, धन व नेतृत्व' },
      { name: 'तियान यी (Tian Yi)', dir: 'उत्तर-पूर्व (NE)', benefit: 'सुरक्षा व आरोग्य' },
      { name: 'यान नियन (Yan Nian)', dir: 'दक्षिण-पश्चिम (SW)', benefit: 'वैवाहिक सुख' },
      { name: 'फू वेई (Fu Wei)', dir: 'उत्तर-पश्चिम (NW)', benefit: 'आत्म-विश्वास' }
    ],
    unfavorable: [
      { name: 'हुओ हाई (Huo Hai)', dir: 'दक्षिण-पूर्व (SE)', risk: 'खर्चों की अधिकता' },
      { name: 'वू गुई (Wu Gui)', dir: 'पूर्व (East)', risk: 'पारिवारिक मनमुटाव' },
      { name: 'लिउ शा (Liu Sha)', dir: 'उत्तर (North)', risk: 'करियर गतिरोध' },
      { name: 'ज्यू मिंग (Jue Ming)', dir: 'दक्षिण (South)', risk: 'स्वास्थ्य विकार' }
    ]
  },
  7: {
    group: 'WEST',
    element: 'धातु (Metal)',
    trigram: 'दुई (Dui)',
    favorable: [
      { name: 'शेंग ची (Sheng Chi)', dir: 'उत्तर-पश्चिम (NW)', benefit: 'आकर्षण, कला व धन लाभ' },
      { name: 'तियान यी (Tian Yi)', dir: 'दक्षिण-पश्चिम (SW)', benefit: 'मानसिक शांति व स्वास्थ्य' },
      { name: 'यान नियन (Yan Nian)', dir: 'उत्तर-पूर्व (NE)', benefit: 'स्थायी मित्रता' },
      { name: 'फू वेई (Fu Wei)', dir: 'पश्चिम (West)', benefit: 'प्रसन्नता व वाक्-चातुर्य' }
    ],
    unfavorable: [
      { name: 'हुओ हाई (Huo Hai)', dir: 'उत्तर (North)', risk: 'अनिर्णय' },
      { name: 'वू गुई (Wu Gui)', dir: 'दक्षिण (South)', risk: 'अशांति' },
      { name: 'लिउ शा (Liu Sha)', dir: 'दक्षिण-पूर्व (SE)', risk: 'दुर्घटना का भय' },
      { name: 'ज्यू मिंग (Jue Ming)', dir: 'पूर्व (East)', risk: 'परिश्रम का फल न मिलना' }
    ]
  },
  8: {
    group: 'WEST',
    element: 'पृथ्वी (Earth)',
    trigram: 'जेन (Gen)',
    favorable: [
      { name: 'शेंग ची (Sheng Chi)', dir: 'दक्षिण-पश्चिम (SW)', benefit: 'अचल संपत्ति व दीर्घकालिक स्थिरता' },
      { name: 'तियान यी (Tian Yi)', dir: 'उत्तर-पश्चिम (NW)', benefit: 'दिव्य कृपा व सुरक्षा' },
      { name: 'यान नियन (Yan Nian)', dir: 'पश्चिम (West)', benefit: 'सद्भावना' },
      { name: 'फू वेई (Fu Wei)', dir: 'उत्तर-पूर्व (NE)', benefit: 'आध्यात्मिक ज्ञान व ध्यान' }
    ],
    unfavorable: [
      { name: 'हुओ हाई (Huo Hai)', dir: 'दक्षिण (South)', risk: 'क्रोध' },
      { name: 'वू गुई (Wu Gui)', dir: 'उत्तर (North)', risk: 'अचानक हानि' },
      { name: 'लिउ शा (Liu Sha)', dir: 'पूर्व (East)', risk: 'कड़वाहट' },
      { name: 'ज्यू मिंग (Jue Ming)', dir: 'दक्षिण-पूर्व (SE)', risk: 'धन की चोरी या व्यय' }
    ]
  },
  9: {
    group: 'EAST',
    element: 'अग्नि (Fire)',
    trigram: 'ली (Li)',
    favorable: [
      { name: 'शेंग ची (Sheng Chi)', dir: 'पूर्व (East)', benefit: 'तेजस्वी व्यक्तित्व व पदोन्नति' },
      { name: 'तियान यी (Tian Yi)', dir: 'दक्षिण-पूर्व (SE)', benefit: 'स्फूर्ति व आरोग्यता' },
      { name: 'यान नियन (Yan Nian)', dir: 'उत्तर (North)', benefit: 'गहरे संबंध व यश' },
      { name: 'फू वेई (Fu Wei)', dir: 'दक्षिण (South)', benefit: 'आत्मविश्वास' }
    ],
    unfavorable: [
      { name: 'हुओ हाई (Huo Hai)', dir: 'उत्तर-पूर्व (NE)', risk: 'सुस्ती' },
      { name: 'वू गुई (Wu Gui)', dir: 'पश्चिम (West)', risk: 'असुरक्षा की भावना' },
      { name: 'लिउ शा (Liu Sha)', dir: 'दक्षिण-पश्चिम (SW)', risk: 'तनाव' },
      { name: 'ज्यू मिंग (Jue Ming)', dir: 'उत्तर-पश्चिम (NW)', risk: 'साहस की कमी' }
    ]
  }
};

export const NumeroVastuDashboard: React.FC<NumeroVastuDashboardProps> = ({
  profile,
  dob = '1990-01-15',
  name = 'Seeker',
  gender = 'MALE'
}) => {
  // Calculate Kua Number
  const calculateKua = () => {
    let year = 1990;
    if (dob && dob.includes('-')) {
      year = parseInt(dob.split('-')[0], 10) || 1990;
    }
    const reduceToSingle = (num: number): number => {
      let sum = num;
      while (sum > 9) {
        sum = sum.toString().split('').reduce((acc, d) => acc + parseInt(d, 10), 0);
      }
      return sum;
    };
    const yearDigitsSum = reduceToSingle(year.toString().split('').reduce((acc, d) => acc + parseInt(d, 10), 0));
    let kua = 0;
    if (gender === 'FEMALE') {
      kua = reduceToSingle(yearDigitsSum + 4);
    } else {
      kua = reduceToSingle(10 - yearDigitsSum);
      if (kua === 0) kua = 9;
    }
    if (kua === 5) {
      kua = gender === 'FEMALE' ? 8 : 2;
    }
    return kua;
  };

  const kuaNumber = calculateKua();
  const kuaInfo = KUA_DIRECTIONS[kuaNumber] || KUA_DIRECTIONS[1];

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12 font-sans text-left">
      {/* Banner */}
      <div className="bg-gradient-to-br from-[#064E3B] via-[#022C22] to-[#01140E] text-white p-6 md:p-8 rounded-[32px] border border-emerald-500/20 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-300 uppercase tracking-widest">
              <Compass className="w-4 h-4" /> न्यूमरो वास्तु एवं 16 दिशा संतुलन
            </div>
            <h2 className="text-2xl md:text-4xl font-playfair font-bold text-white">
              Numero Vastu &amp; Kua Directional Balance
            </h2>
            <p className="text-xs md:text-sm text-emerald-100/80 max-w-2xl leading-relaxed">
              आपके कुआ नंबर ({kuaNumber}) के आधार पर घर, कार्यालय, सोने की दिशा व कार्यक्षेत्र की 4 महाशुभ और 4 वर्जित दिशाओं का वैज्ञानिक वास्तु विश्लेषण।
            </p>
          </div>

          <div className="flex gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-center">
            <div className="px-3 border-r border-white/10">
              <span className="text-[10px] text-emerald-200 block uppercase font-mono">कुआ नंबर</span>
              <span className="text-3xl font-bold font-playfair text-amber-300">{kuaNumber}</span>
            </div>
            <div className="px-3">
              <span className="text-[10px] text-emerald-200 block uppercase font-mono">समूह (Group)</span>
              <span className="text-sm font-bold font-playfair text-white block mt-1">
                {kuaInfo.group === 'EAST' ? 'पूर्व समूह (East Group)' : 'पश्चिम समूह (West Group)'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Favorable Directions */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="border-b pb-4">
          <h3 className="font-playfair text-xl font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" /> 4 अति शुभ दिशाएं (4 Auspicious Directions)
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            इन दिशाओं की ओर मुख करके बैठना, सोना या मुख्य द्वार रखना सर्वोच्च सफलता देता है
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {kuaInfo.favorable.map((fav, i) => (
            <div key={i} className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="font-bold text-xs text-emerald-900 uppercase font-mono">{fav.name}</span>
                <span className="text-xs font-bold bg-emerald-600 text-white px-2.5 py-0.5 rounded-lg shadow-2xs">
                  {fav.dir}
                </span>
              </div>
              <p className="text-xs text-emerald-800 font-semibold">{fav.benefit}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4 Unfavorable Directions */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="border-b pb-4">
          <h3 className="font-playfair text-xl font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" /> 4 वर्जित दिशाएं व सावधानियां (4 Inauspicious Directions)
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            इन दिशाओं की ओर सिर करके सोने या मुख करके कार्य करने से बचें
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {kuaInfo.unfavorable.map((unfav, i) => (
            <div key={i} className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="font-bold text-xs text-amber-900 uppercase font-mono">{unfav.name}</span>
                <span className="text-xs font-bold bg-amber-600 text-white px-2.5 py-0.5 rounded-lg shadow-2xs">
                  {unfav.dir}
                </span>
              </div>
              <p className="text-xs text-amber-800">{unfav.risk}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NumeroVastuDashboard;
