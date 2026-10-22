import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  Lock, 
  Download, 
  Eye, 
  Clock, 
  User, 
  Calendar,
  Grid3X3,
  Phone,
  Compass,
  Heart,
  Car,
  Home,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { NavPortalId } from './MasterNavigation';
import { ReportAccessService } from '../services/reportAccessService';

interface MyReportsHubProps {
  onNavigatePortal: (portalId: NavPortalId) => void;
  onOpenProfileModal: () => void;
}

export function MyReportsHub({ onNavigatePortal, onOpenProfileModal }: MyReportsHubProps) {
  const [activeProfile, setActiveProfile] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('leo_active_quick_profile');
      if (stored) {
        setActiveProfile(JSON.parse(stored));
      }
      const txs = ReportAccessService.getTransactions();
      setTransactions(txs || []);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const reportsList: {
    id: NavPortalId;
    title: string;
    hindiTitle: string;
    desc: string;
    icon: any;
    reportType: string;
  }[] = [
    { id: 'MASTER_REPORT', title: 'Comprehensive Master Numerology Dossier', hindiTitle: 'संपूर्ण 14-पृष्ठीय मास्टर रिपोर्ट', desc: '30+ sections covering Lo Shu, Driver-Conductor synergy, 81 combos, and life predictions.', icon: Award, reportType: 'MASTER_REPORT' },
    { id: 'CORE_LOSHU', title: 'Lo Shu Grid Magic Square', hindiTitle: 'लोशू ग्रिड व 8 जीवन तल', desc: 'Detailed 3x3 birth matrix, elemental planes, and missing numbers remedies.', icon: Grid3X3, reportType: 'LOSHU' },
    { id: 'MOBILE_NUMEROLOGY', title: 'Chaldean Mobile Number Scanner', hindiTitle: 'मोबाइल अंकशास्त्र व 81 युति विश्लेषण', desc: 'Planetary pairs analysis, phone wealth frequencies, and defect remedies.', icon: Phone, reportType: 'MOBILE_NUMEROLOGY' },
    { id: 'NAME_NUMEROLOGY', title: 'Name Correction & Resonance', hindiTitle: 'नाम अंकशास्त्र एवं शुद्धि', desc: 'Chaldean compound numbers and spelling correction for lucky vibration.', icon: User, reportType: 'NAME_NUMEROLOGY' },
    { id: 'MARRIAGE_COMPATIBILITY', title: 'Vedic Marriage Synastry v3.0', hindiTitle: 'विवाह एवं दांपत्य गुण मिलान', desc: '7-layer partner compatibility, emotional resonance, and marital remedies.', icon: Heart, reportType: 'MARRIAGE' },
    { id: 'PREMIUM_VAASTU', title: 'Numero Vastu Directional Balance', hindiTitle: 'न्यूमरो वास्तु एवं 16 दिशाएं', desc: 'Kua number directions for wealth, career, bedroom, and entrance placement.', icon: Compass, reportType: 'VASTU' },
    { id: 'PREMIUM_VEHICLE', title: 'Vehicle Numerology & Plate Vastu', hindiTitle: 'वाहन अंकशास्त्र व नंबर प्लेट', desc: 'Vehicle registration plate frequency, lucky numbers, and breakdown risks.', icon: Car, reportType: 'VEHICLE' },
    { id: 'PREMIUM_HOUSE', title: 'House & Flat Energy Diagnostics', hindiTitle: 'भवन व फ्लैट अंकशास्त्र', desc: 'Home energy vibrations, peace, and domestic prosperity alignments.', icon: Home, reportType: 'HOUSE_FLAT' },
    { id: 'PREMIUM_SIGNATURE', title: 'Signature Style & Handwriting Audit', hindiTitle: 'हस्ताक्षर एवं धन रेखा ऑडिट', desc: 'AI-assisted graphological signature analysis for financial expansion.', icon: Sparkles, reportType: 'SIGNATURE_AUDIT' },
    { id: 'PREMIUM_CHILD', title: 'Child Auspicious Names Finder', hindiTitle: 'शिशु शुभ नामाक्षर खोजक', desc: 'Auspicious first letters and planetary education alignment for babies.', icon: Sparkles, reportType: 'CHILD_NAMES' },
    { id: 'PREMIUM_LUCKY_DATES', title: 'Personalized Lucky Dates Finder', hindiTitle: 'शुभ तिथियां व मुहूर्त', desc: 'Harmonious dates for business launch, agreement signing, and travel.', icon: Calendar, reportType: 'LUCKY_DATES' },
    { id: 'PREMIUM_MEDICAL', title: 'Medical Numerology & Ayurvedic Doshas', hindiTitle: 'मेडिकल न्यूमरोलॉजी व स्वास्थ्य', desc: 'Planetary vulnerabilities, Ayurvedic Vata/Pitta/Kapha balance, and vitality.', icon: ShieldCheck, reportType: 'MEDICAL_NUMEROLOGY' }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12 font-sans text-left">
      {/* Banner */}
      <div className="bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#020617] text-white p-6 md:p-8 rounded-[32px] border border-amber-500/20 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-300 uppercase tracking-widest">
              <FileText className="w-4 h-4" /> मेरी रिपोर्ट एवं एक्सेस केंद्र
            </div>
            <h2 className="text-2xl md:text-4xl font-playfair font-bold text-white">
              My Reports &amp; Verified Access Center
            </h2>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
              आपके सभी अनलॉक किए गए वैदिक दस्तावेज, भुगतान रसीदें और सक्रिय परामर्श प्रोफाइल एक ही सुरक्षित स्थान पर।
            </p>
          </div>

          <button
            onClick={onOpenProfileModal}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-5 py-3 rounded-2xl text-xs uppercase tracking-wider transition shadow-md cursor-pointer shrink-0"
          >
            {activeProfile ? 'प्रोफाइल बदलें (Change Profile)' : 'प्रोफाइल सेट करें (Set Profile)'}
          </button>
        </div>
      </div>

      {/* Active Profile Snapshot */}
      {activeProfile && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-amber-600" />
              <span className="font-bold text-slate-800">{activeProfile.name || 'Seeker'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-600" />
              <span className="font-mono text-slate-600">{activeProfile.dob}</span>
            </div>
            {activeProfile.mobile && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-600" />
                <span className="font-mono text-slate-600">{activeProfile.mobile}</span>
              </div>
            )}
          </div>
          <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full font-bold">
            सक्रिय प्रोफाइल (Active Session)
          </span>
        </div>
      )}

      {/* Reports Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportsList.map((rep) => {
          const Icon = rep.icon;
          const isUnlocked = activeProfile
            ? ReportAccessService.hasAccess(rep.reportType as any, activeProfile.name, activeProfile.dob)
            : false;

          return (
            <div
              key={rep.id}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase ${
                    isUnlocked ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {isUnlocked ? 'अनलॉक (Ready)' : 'उपलब्ध (Available)'}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-slate-900 font-playfair">{rep.title}</h4>
                  <span className="text-[11px] text-amber-700 font-medium block mt-0.5">{rep.hindiTitle}</span>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{rep.desc}</p>
                </div>
              </div>

              <button
                onClick={() => onNavigatePortal(rep.id)}
                className="w-full bg-slate-900 hover:bg-amber-600 text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                <Eye className="w-4 h-4" />
                <span>रिपोर्ट देखें (View Report)</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyReportsHub;
