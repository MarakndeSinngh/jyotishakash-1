import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Sparkles, ShieldCheck, Star } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { useLanguage } from '../context/LanguageContext';
import { WHATSAPP_LINK } from '../constants/contacts';
import SmartImage from './sections/SmartImage';

const WhatsAppIcon = () => (
  <svg 
    viewBox="0 0 24 24" 
    className="w-5 h-5 fill-white shrink-0 animate-bounce"
    xmlns="http://www.w3.org/2000/svg"
    style={{ animationDuration: "3s" }}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

interface LandingHeroProps {
  onStartJourney?: () => void;
  onExploreTools?: () => void;
  onBookWebinar?: () => void;
}

export default function LandingHero({
  onStartJourney,
  onExploreTools,
  onBookWebinar
}: LandingHeroProps) {
  const { activeAcademy } = useAcademy();
  const { language, t } = useLanguage();

  const whatsappUrl = activeAcademy?.contactDetails?.whatsapp || WHATSAPP_LINK;

  const getNextBatchDate = (): Date => {
    const now = new Date();
    const targetDays = [3, 5, 0]; // Wednesday, Friday, Sunday
    let minDiff = 8;
    let targetDate = new Date();
    for (const day of targetDays) {
      const candidate = new Date(now);
      const currentDay = now.getDay();
      let daysToAdd = day - currentDay;
      if (daysToAdd < 0) {
        daysToAdd += 7;
      } else if (daysToAdd === 0) {
        candidate.setHours(20, 0, 0, 0);
        if (now.getTime() > candidate.getTime()) {
          daysToAdd = 7;
        }
      }
      candidate.setDate(now.getDate() + daysToAdd);
      candidate.setHours(20, 0, 0, 0);
      const diff = candidate.getTime() - now.getTime();
      if (diff > 0 && daysToAdd < minDiff) {
        minDiff = daysToAdd;
        targetDate = candidate;
      }
    }
    return targetDate;
  };

  const [batchDate, setBatchDate] = useState<Date>(getNextBatchDate());

  useEffect(() => {
    setBatchDate(getNextBatchDate());
  }, [language]);

  const getFormattedDate = () => {
    return batchDate.toLocaleDateString(language === 'gu' ? 'gu-IN' : language === 'hi' ? 'hi-IN' : 'en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  if (!activeAcademy) return null;

  const isGujarati = language === 'gu';
  const isHindi = language === 'hi';

  const copy = {
    limitedSeats: isGujarati 
      ? "⚠️ મર્યાદિત ફ્રી સીટ્સ • રજીસ્ટ્રેશન ટૂંક સમયમાં બંધ થશે"
      : isHindi
      ? "⚠️ सीमित फ्री सीटें • रजिस्ट्रेशन जल्द ही बंद होगा"
      : "⚠️ Limited Free Seats • Registration Closing Soon",
    mainHeadline: activeAcademy.name || (isGujarati 
      ? "તમારા નામ અને અંકોની છુપી શક્તિથી મેળવો ૧૦૦% પ્રગતિ"
      : "Unlock 100% Growth with Name & Number Vibrations"),
    subHeadline: activeAcademy.description || activeAcademy.tagline,
    ctaJoin: isGujarati ? "🟢 મારી ફ્રી સીટ અત્યારે જ બુક કરો" : isHindi ? "🟢 मेरी फ्री सीट अभी बुक करें" : "🟢 Reserve My Free Seat Now",
    ctaSubText: "Reminders • Exclusive PDFs • Bonus Materials on WhatsApp Group",
    ratingText: "★★★★★ 4.9/5 Rating (5,000+ Alumni)",
    batchPrefix: isGujarati ? "આગામી લાઈવ બેચ શરૂ થાય છે: " : isHindi ? "अगला लाइव बैच शुरू होता है: " : "Next Live Batch Starts: ",
    timeText: isGujarati ? "સાંજે ૮:૦૦ વાગ્યે" : "At 8:00 PM IST",
    expBadge: activeAcademy.stats?.[0]?.value ? `${activeAcademy.stats[0].value} ${activeAcademy.stats[0].label}` : "10+ Years Exp.",
    studentBadge: activeAcademy.stats?.[1]?.value ? `${activeAcademy.stats[1].value} Alumni` : "15,000+ Alumni",
    communityBadge: "LEO VIP Circle",
  };

  return (
    <div className="relative w-full overflow-hidden bg-background border-b border-border/10 pb-12 sm:pb-20" id="landing-hero-section">
      {/* Background majestic radial gold glow */}
      <div className="absolute top-[10%] right-[5%] w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[5%] left-[2%] w-[400px] h-[400px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.06),transparent_80%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 pt-8 sm:pt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: Core Content */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
          
          {/* Limited Seats Urgency Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/25 w-fit mx-auto lg:mx-0 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-primary font-mono">
              {copy.limitedSeats}
            </span>
          </div>

          {/* Instructor Title Badge */}
          <div className="flex items-center gap-2 justify-center lg:justify-start">
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              {activeAcademy.instructorTitle || "Senior Faculty"}
            </span>
          </div>

          {/* Core Transformational Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.15] lg:leading-[1.1] tracking-tight font-cinzel text-text-primary">
            {copy.mainHeadline}
          </h1>

          {/* Tagline / Subheadline */}
          <p className="text-primary font-serif italic text-base sm:text-lg border-l-2 border-primary pl-4 py-1 text-left">
            "{activeAcademy.tagline}"
          </p>

          <p className="text-sm sm:text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto lg:mx-0">
            {copy.subHeadline}
          </p>

          {/* Trust Ratings Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 py-1 border-y border-border/10 w-fit mx-auto lg:mx-0">
            <div className="flex items-center gap-1.5">
              <span className="text-amber-400 text-base sm:text-lg font-sans">★★★★★</span>
              <span className="text-text-primary text-xs sm:text-sm font-semibold tracking-wide font-mono">
                {copy.ratingText}
              </span>
            </div>
            <span className="hidden sm:inline text-text-secondary/30">•</span>
            <span className="text-xs text-text-secondary font-mono uppercase tracking-widest font-bold">
              Verified Academy
            </span>
          </div>

          {/* Dynamic Real Next Batch Date Box */}
          <div className="p-4 rounded-2xl bg-card border border-border/20 w-full max-w-lg mx-auto lg:mx-0 flex items-center gap-3.5 shadow-lg">
            <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
              <Calendar className="w-5.5 h-5.5" />
            </div>
            <div className="text-left">
              <span className="text-[10px] uppercase tracking-wider text-text-secondary font-mono font-bold block">
                {copy.batchPrefix}
              </span>
              <span className="text-sm sm:text-base font-extrabold text-text-primary block mt-0.5 font-cinzel">
                {getFormattedDate()} {copy.timeText}
              </span>
            </div>
          </div>

          {/* Primary High-Converting CTA */}
          <div className="flex flex-col gap-3.5 pt-2 items-center lg:items-start w-full">
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto min-w-[290px] sm:px-10 py-4.5 bg-gradient-to-r from-[#25D366] to-[#1FAF5A] text-white font-extrabold rounded-full text-center text-sm sm:text-base shadow-[0_12px_24px_rgba(37,211,102,0.3)] hover:shadow-[0_16px_36px_rgba(37,211,102,0.55)] hover:scale-[1.03] active:scale-98 transition-all duration-300 transform flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <WhatsAppIcon />
              <span>{copy.ctaJoin}</span>
              <ArrowRight className="w-4.5 h-4.5 text-white shrink-0" />
            </a>
            
            <p className="text-[10px] sm:text-xs text-text-secondary italic text-center lg:text-left">
              {copy.ctaSubText}
            </p>
          </div>

        </div>

        {/* Right Column: Founder Image with Trust Overlays */}
        <div className="lg:col-span-5 relative w-full flex justify-center lg:justify-end mt-4 lg:mt-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="relative w-full max-w-[360px] bg-card border border-primary/25 rounded-[32px] p-5 shadow-2xl flex flex-col items-center text-center">
            <div className="relative w-full aspect-square rounded-[24px] overflow-hidden mb-5 border border-border/20 group">
              <SmartImage 
                src={activeAcademy.assets?.founderPortrait || activeAcademy.assets?.profileImage || ''} 
                alt={activeAcademy.instructorName} 
                className="w-full h-full object-cover transition-all duration-700 ease-in-out transform group-hover:scale-[1.03]"
              />
              
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/40 to-transparent p-4 flex flex-col items-center">
                <span className="text-white text-sm sm:text-base font-extrabold tracking-tight font-cinzel">
                  {activeAcademy.instructorName}
                </span>
                <span className="text-primary text-[10px] font-bold tracking-widest font-mono uppercase mt-0.5">
                  {activeAcademy.instructorTitle}
                </span>
              </div>
            </div>

            <div className="w-full space-y-4">
              <div className="h-px bg-border/10"></div>
              
              <p className="text-[11px] sm:text-xs text-text-secondary leading-relaxed italic px-2 font-serif">
                "{activeAcademy.instructorBio || activeAcademy.description}"
              </p>

              <div className="flex flex-wrap justify-center gap-1.5 pt-1">
                <span className="bg-primary/10 text-primary text-[9px] font-mono py-1 px-3 rounded-full border border-primary/20 font-bold uppercase tracking-wider">
                  {copy.expBadge}
                </span>
                <span className="bg-emerald-500/10 text-emerald-500 text-[9px] font-mono py-1 px-3 rounded-full border border-emerald-500/20 font-bold uppercase tracking-wider">
                  {copy.studentBadge}
                </span>
                <span className="bg-amber-500/10 text-amber-500 text-[9px] font-mono py-1 px-3 rounded-full border border-amber-500/20 font-bold uppercase tracking-wider">
                  {copy.communityBadge}
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
