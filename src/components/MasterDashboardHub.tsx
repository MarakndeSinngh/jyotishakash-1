import React from 'react';
import { 
  Compass, 
  Sparkles, 
  Phone, 
  User, 
  Calendar, 
  Grid3X3, 
  Heart, 
  Car, 
  Home, 
  Award, 
  ShieldCheck, 
  ArrowRight,
  Star,
  Gift,
  FileText,
  Clock,
  TrendingUp,
  MessageSquare
} from 'lucide-react';
import { NavPortalId } from './MasterNavigation';
import { BrandLogo } from './BrandLogo';

interface MasterDashboardHubProps {
  personalDetails: any;
  dobData: any;
  nameData: any;
  mobileData: any;
  remedies: any;
  profile: any;
  onNavigate: (portalId: NavPortalId) => void;
  onOpenProfileModal: () => void;
}

export function MasterDashboardHub({
  personalDetails,
  dobData,
  nameData,
  mobileData,
  remedies,
  profile,
  onNavigate,
  onOpenProfileModal
}: MasterDashboardHubProps) {
  const tools = [
    { id: 'MOBILE_NUMEROLOGY' as NavPortalId, title: 'मोबाइल स्कैनर', engTitle: 'Mobile Numerology', desc: '81 ग्रह युति व मोबाइल नंबर की धन तरंगें', icon: Phone, color: 'text-amber-500 bg-amber-500/10' },
    { id: 'CORE_LOSHU' as NavPortalId, title: 'लोशू ग्रिड जन्मकुंडली', engTitle: 'Lo Shu 3x3 Magic Square', desc: '8 जीवन तल, छुपे राजयोग व अनुपस्थित अंक', icon: Grid3X3, color: 'text-emerald-500 bg-emerald-500/10' },
    { id: 'CORE_DASHBOARD' as NavPortalId, title: '81 युति एवं ग्रह योग', engTitle: 'Vedic Combinations Matrix', desc: 'मूलांक-भाग्यांक तालमेल व विस्तृत कुंडली', icon: Compass, color: 'text-blue-500 bg-blue-500/10' },
    { id: 'NAME_NUMEROLOGY' as NavPortalId, title: 'नाम अंकशास्त्र शुद्धि', engTitle: 'Chaldean Name Correction', desc: 'वर्तनी शुद्धि व 1-5-6 शुभ अंकों पर संरेखन', icon: User, color: 'text-indigo-500 bg-indigo-500/10' },
    { id: 'MARRIAGE_COMPATIBILITY' as NavPortalId, title: 'विवाह गुण मिलान', engTitle: 'Vedic Marriage Synastry', desc: '7-परतीय जीवनसाथी तालमेल व दांपत्य उपाय', icon: Heart, color: 'text-rose-500 bg-rose-500/10' },
    { id: 'PREMIUM_VAASTU' as NavPortalId, title: 'न्यूमरो वास्तु एवं 16 दिशाएं', engTitle: 'Numero Vastu & Kua Balance', desc: 'कुआ नंबर के आधार पर 4 शुभ व 4 वर्जित दिशाएं', icon: Compass, color: 'text-teal-500 bg-teal-500/10' },
    { id: 'PREMIUM_VEHICLE' as NavPortalId, title: 'वाहन अंकशास्त्र', engTitle: 'Vehicle Numerology & Plate Vastu', desc: 'नंबर प्लेट ऊर्जा, सुरक्षा व दुर्घटना निवारण', icon: Car, color: 'text-cyan-500 bg-cyan-500/10' },
    { id: 'PREMIUM_HOUSE' as NavPortalId, title: 'भवन व फ्लैट वास्तु', engTitle: 'House & Flat Energy', desc: 'घर का नंबर, ऊर्जा स्पंदन व गृह शांति', icon: Home, color: 'text-violet-500 bg-violet-500/10' },
    { id: 'PREMIUM_SIGNATURE' as NavPortalId, title: 'हस्ताक्षर व धन रेखा ऑडिट', engTitle: 'Signature & Handwriting Audit', desc: 'करियर उत्थान हेतु हस्ताक्षर की दिशा व रेखा', icon: Sparkles, color: 'text-yellow-500 bg-yellow-500/10' },
    { id: 'PREMIUM_CHILD' as NavPortalId, title: 'शिशु शुभ नामाक्षर', engTitle: 'Child Lucky Names Finder', desc: 'ग्रहीय बुद्धि व भाग्यशाली प्रथम अक्षर', icon: Star, color: 'text-amber-500 bg-amber-500/10' },
    { id: 'PREMIUM_LUCKY_DATES' as NavPortalId, title: 'शुभ तिथियां खोजक', engTitle: 'Personalized Lucky Dates', desc: 'व्यापार, गृह प्रवेश व यात्रा हेतु अनुकूल दिन', icon: Calendar, color: 'text-emerald-500 bg-emerald-500/10' },
    { id: 'PREMIUM_MEDICAL' as NavPortalId, title: 'मेडिकल न्यूमरोलॉजी', engTitle: 'Ayurvedic Medical Numerology', desc: 'त्रिदोष (वात-पित्त-कफ) व ग्रहीय स्वास्थ्य रक्षा', icon: ShieldCheck, color: 'text-rose-500 bg-rose-500/10' }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12 font-sans text-left">
      {/* Hero Welcome Banner */}
      <div className="bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#020617] text-white p-6 md:p-10 rounded-[32px] border border-amber-500/20 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-300 uppercase tracking-widest">
                <Sparkles className="w-4 h-4" /> LEOFAMILY OCCULT SYSTEMS
              </div>
              <h1 className="text-3xl md:text-5xl font-playfair font-bold text-white mt-2">
                {personalDetails?.name ? `स्वागत है, ${personalDetails.name}` : 'वैदिक अंकशास्त्र महामंच'}
              </h1>
              <p className="text-xs md:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
                राजीव सिंह चौहान द्वारा शोधित चालडीयन, पाइथागोरियन एवं वैदिक अंकशास्त्र का भारत का सबसे प्रामाणिक एवं संपूर्ण पोर्टल।
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={onOpenProfileModal}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-5 py-3 rounded-2xl text-xs uppercase tracking-wider transition shadow-md cursor-pointer"
              >
                {personalDetails ? 'प्रोफाइल एडिट करें' : 'जन्म विवरण दर्ज करें'}
              </button>
              <button
                onClick={() => onNavigate('MASTER_REPORT')}
                className="bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-3 rounded-2xl text-xs uppercase tracking-wider transition border border-white/20 cursor-pointer flex items-center gap-1.5"
              >
                <Award className="w-4 h-4 text-amber-300" />
                <span>मास्टर रिपोर्ट (14 Pages)</span>
              </button>
            </div>
          </div>

          {/* Core Numbers Bar */}
          {personalDetails && dobData && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
              <div className="bg-white/5 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-center">
                <span className="text-[10px] text-amber-300 block uppercase font-mono">मूलांक (Driver)</span>
                <span className="text-2xl font-bold font-playfair text-white">{dobData.birthNumber}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">{dobData.rulingPlanet || 'Surya'}</span>
              </div>
              <div className="bg-white/5 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-center">
                <span className="text-[10px] text-amber-300 block uppercase font-mono">भाग्यांक (Destiny)</span>
                <span className="text-2xl font-bold font-playfair text-white">{dobData.lifePathNumber}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">जीवन पथ</span>
              </div>
              <div className="bg-white/5 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-center">
                <span className="text-[10px] text-amber-300 block uppercase font-mono">नामांक (Name)</span>
                <span className="text-2xl font-bold font-playfair text-white">{nameData?.chaldeanTotal || 1}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">चालडीयन कंपन</span>
              </div>
              <div className="bg-white/5 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-center">
                <span className="text-[10px] text-amber-300 block uppercase font-mono">पर्सनल ईयर</span>
                <span className="text-2xl font-bold font-playfair text-white">{dobData.personalYear || 1}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">वार्षिक चक्र</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Special Personal Guidance Offer Spotlight */}
      <div className="bg-gradient-to-r from-[#172554] via-[#1E1B4B] to-[#31102A] p-6 md:p-8 rounded-3xl border border-amber-500/30 text-white shadow-lg relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">
            <Gift className="w-3.5 h-3.5" /> A SPECIAL OPPORTUNITY FOR LEO FAMILY STUDENTS
          </div>
          <h3 className="text-2xl font-playfair font-bold text-white">
            Personal Guidance by Raajeev Sir
          </h3>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            Facing challenges in career, business, wealth, relationships or personal life? Get personalised Astrology &amp; Numerology insights and guidance tailored to your concerns.
          </p>
          <div className="flex items-center gap-4 pt-1">
            <span className="text-xs line-through text-slate-400">Regular: ₹21,999</span>
            <span className="text-xl font-bold text-amber-300 font-playfair">Special: ₹11,999</span>
            <span className="text-[11px] text-emerald-300 font-semibold">• Includes Mix Bracelet (₹1,900) &amp; Rudraksha (₹700)</span>
          </div>
        </div>

        <button
          onClick={() => onNavigate('AI_CONSULTATION')}
          className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold px-6 py-3.5 rounded-2xl text-xs uppercase tracking-wider transition shadow-md cursor-pointer shrink-0 flex items-center gap-2"
        >
          <span>Explore Consultation</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 12 Core Occult Portals Grid */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-playfair text-xl font-bold text-slate-900">
              12 मुख्य वैदिक एवं अंकशास्त्र विश्लेषण (12 Core Occult Suites)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              अपनी जन्म कुंडली, मोबाइल, नाम एवं वास्तु के सभी पहलुओं का सूक्ष्म अध्ययन करें
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => onNavigate(t.id)}
                className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-amber-500/50 hover:shadow-md transition-all text-left flex flex-col justify-between space-y-3 cursor-pointer group"
              >
                <div className="flex items-start justify-between">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${t.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono group-hover:text-amber-600 transition">
                    Explore →
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 group-hover:text-amber-700 transition">
                    {t.title}
                  </h4>
                  <span className="text-[10px] font-mono text-slate-400 block mb-1">{t.engTitle}</span>
                  <p className="text-xs text-slate-500 leading-relaxed">{t.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MasterDashboardHub;
