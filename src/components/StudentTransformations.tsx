import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Star, ShieldCheck, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAcademy } from '../context/AcademyContext';
import { WHATSAPP_LINK } from '../constants/contacts';

interface Testimonial {
  name: string;
  city: string;
  category: string;
  quote: {
    gu: string;
    hi: string;
    en: string;
  };
  avatarUrl: string;
}

export default function StudentTransformations() {
  const { language, t } = useLanguage();
  const { activeAcademy } = useAcademy();

  const WHATSAPP_URL = activeAcademy?.contactDetails?.whatsapp || "https://chat.whatsapp.com/HOUZ3rmuigF32SjOVco8B2?s=sh&p=a&ilr=1";

  const testimonialsData: Testimonial[] = [
    {
      name: "Amit Shah",
      city: "Ahmedabad",
      category: "Business Growth",
      quote: {
        gu: "મારું નવું પર્સનલ નામ અને મોબાઈલ નંબર શોનક સરના ગણિતના સિદ્ધાંત મુજબ પસંદ કર્યા પછી મારા રોકાયેલા નાણાં પાછા મળવાના શરુ થયા. બિલકુલ અંધશ્રદ્ધા વગરનું તાર્કિક માર્ગદર્શન.",
        hi: "शौनक सर के गणितीय सिद्धांतों के अनुसार अपने ब्रांड नाम और मोबाइल नंबर को संरेखित करने के बाद, हमारे रुके हुए व्यवसायिक अनुबंध कुछ ही महीनों में सुचारू हो गए।",
        en: "After aligning my corporate brand spelling with Shaunak's mathematical principles, our pending contract flow opened up within months. The logical, fear-free methodology is what makes this course outstanding."
      },
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150"
    },
    {
      name: "Pratiksha Patel",
      city: "Surat",
      category: "Mobile Numerology",
      quote: {
        gu: "મોબાઈલ ન્યુમરોલોજી વિશે મને શંકા હતી પરંતુ શોનક સરે મારા બિઝનેસ નંબરનું એનાલિસિસ કરીને જે બદલાવ કરાવ્યો તેનાથી ક્લાયન્ટ કોમ્યુનિકેશન બહુ સરળ થઈ ગયું.",
        hi: "मोबाइल न्यूमरोलॉजी को लेकर मैं संशय में थी, लेकिन शौनक सर द्वारा मेरे बिजनेस नंबर के विश्लेषण के बाद सही नंबर चुनते ही हमारी व्यावसायिक बातचीत में तुरंत सुधार आया!",
        en: "I was highly skeptical about Mobile Numerology until I analyzed my business support line. Selecting a new number with a high-resonance partner combination cleared our communication blockages almost instantly!"
      },
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
    },
    {
      name: "Rajeshbhai Joshi",
      city: "Rajkot",
      category: "Name Correction",
      quote: {
        gu: "મારા નામના સ્પેલિંગમાં નેગેટિવ વાઇબ્રેશન હતું. શોનક સરના માર્ગદર્શનથી કોઈ કાનૂની દસ્તાવેજ બદલ્યા વગર માત્ર સોશિયલ મીડિયા સ્પેલિંગ બદલવાથી આત્મવિશ્વાસમાં અદ્ભુત વધારો થયો.",
        hi: "मेरे व्यक्तिगत नाम के हिज्जे में नकारात्मक कंपन था। शौनक सर ने बिना किसी कानूनी दस्तावेज परिवर्तन के एक मामूली वर्तनी सुधार का सुझाव दिया, जिससे मेरी स्पष्टता और आत्मविश्वास में भारी वृद्धि हुई।",
        en: "My personal name spelling had a heavy conflict vibration. Shaunak guided me through a minor spelling adjustment that required no legal documents. I've felt a significant shift in my clarity and confidence."
      },
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150"
    },
    {
      name: "Deepa Mehta",
      city: "Mumbai",
      category: "Career",
      quote: {
        gu: "મારા પર્સનલ યર અને નંબર સાયકલને સમજીને મેં ૨૦૨૬માં મારો કરિયર ચેન્જ પ્લેન કર્યો. કોઈ અંધશ્રદ્ધા નહીં, પરંતુ તાર્કિક પદ્ધતિથી મોટો ફાયદો થયો.",
        hi: "अपने पर्सनल ईयर और पीक साइकिल्स को समझकर मुझे 2026 में अपने करियर परिवर्तन की सही समय सीमा तय करने में मदद मिली। यह कोई अंधविश्वास नहीं, बल्कि करियर विकास का व्यावहारिक रोडमैप है।",
        en: "Understanding my Personal Year and peak cycles helped me time my career transition perfectly in 2026. This isn't superstition; it's a structural roadmap for professional growth."
      },
      avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150"
    },
    {
      name: "Hardik Trivedi",
      city: "Vadodara",
      category: "Relationship",
      quote: {
        gu: "કોમ્પેટીબિલીટી નંબર્સ શીખ્યા પછી પરિવાર અને સંબંધીઓના વ્યવહારને સમજવામાં ઘણી મદદ મળી. ઘરમાં સુમેળ અને આદરનું વાતાવરણ બન્યું.",
        hi: "कोर अनुकूलता संख्याओं के बारे में सीखने से हमें एक-दूसरे के स्वाभाविक व्यवहार को समझने में मदद मिली। हमारा पारिवारिक संचार अब सद्भाव और आपसी सम्मान से भरा है।",
        en: "Learning about core compatibility numbers allowed us to understand each other's natural behaviors. Our family communication is now full of harmony and mutual respect."
      },
      avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150&h=150"
    },
    {
      name: "Nidhi Vyas",
      city: "Jamnagar",
      category: "Personal Growth",
      quote: {
        gu: "ચાલ્ડિયન ન્યુમરોલોજી સિસ્ટમ ખૂબ જ લોજિકલ છે. મિસિંગ નંબર્સની સમજણથી મને મારા સ્વભાવની ખામીઓ ઓળખીને સરળ ઉપાયો દ્વારા સુધારો કરવાનો રસ્તો મળ્યો.",
        hi: "चाल्डियन न्यूमरोलॉजी प्रणाली बहुत तार्किक है। मिसिंग नंबरों की व्याख्या ने मुझे अपने व्यवहारिक पैटर्न पर स्पष्ट दृष्टिकोण दिया और व्यावहारिक दैनिक उपायों से संतुलन बनाना सिखाया।",
        en: "The Chaldean Numerology system is so logical. The missing numbers explanation gave me a clear perspective on my behavioral patterns and how to balance them with practical daily remedies."
      },
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150"
    }
  ];

  const langKey = language === 'gu' ? 'gu' : language === 'hi' ? 'hi' : 'en';

  const badgeText = t("transformations.badge", language === 'gu' ? "પ્રમાણિત અનુભવો" : language === 'hi' ? "प्रमाणित परिणाम" : "Empirical Results");
  const titleText = t("transformations.title", language === 'gu' ? "વિદ્યાર્થીઓનું વાસ્તવિક પરિવર્તન" : language === 'hi' ? "वास्तविक छात्र परिवर्तन" : "Real Student Transformations");
  const subtitleText = t("transformations.subtitle", language === 'gu' ? "જુઓ કેવી રીતે ચાલ્ડિયન ન્યુમરોલોજી દ્વારા વિદ્યાર્થીઓએ તેમના આત્મવિશ્વાસ, બિઝનેસ અને જીવનમાં પ્રગતિ મેળવી." : language === 'hi' ? "जानें कि कैसे व्यावहारिक चाल्डियन न्यूमरोलॉजी ने छात्रों को सीखने के माध्यम से अपने आत्मविश्वास, व्यवसाय और जीवन की दिशा में सुधार करने में मदद की।" : "Discover how practical Chaldean Numerology has helped students improve their confidence, business decisions, relationships and life direction through practical learning.");
  const verifiedText = t("transformations.verified", language === 'gu' ? "પ્રમાણિત વર્કશોપ સહભાગી" : language === 'hi' ? "सत्यापित कार्यशाला प्रतिभागी" : "Verified Workshop Participant");
  const trustBannerText = t("transformations.trustBanner", language === 'gu' ? "હજારો વિદ્યાર્થીઓએ LEO Family વર્કશોપ દ્વારા પોતાની ન્યુમરોલોજી યાત્રા શરૂ કરી છે." : language === 'hi' ? "हजारों शिक्षार्थियों ने LEO Family कार्यशालाओं के माध्यम से अपनी न्यूमरोलॉजी यात्रा शुरू की है।" : "Thousands of learners have started their Numerology journey through Leo Family workshops.");
  const ctaBtnText = t("hero.ctaJoin", language === 'gu' ? "મારી ફ્રી સીટ અત્યારે જ બુક કરો" : language === 'hi' ? "मेरी फ्री सीट अभी बुक करें" : "Reserve My FREE Seat Now");

  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-12 py-20 lg:py-24 border-t border-border/10 relative" id="student-transformations">
      {/* Decorative Golden / Ambient radial aura background */}
      <div className="absolute top-[30%] right-[10%] w-[350px] h-[350px] bg-primary/10 blur-[110px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[20%] left-[10%] w-[350px] h-[350px] bg-amber-500/5 blur-[130px] rounded-full pointer-events-none"></div>

      {/* Header section */}
      <div className="text-center mb-16 sm:mb-20 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
          <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-primary font-mono">
            {badgeText}
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-cinzel text-text-primary mt-1 tracking-tight">
          {titleText}
        </h2>
        <p className="text-xs sm:text-sm text-text-secondary max-w-2xl mx-auto mt-3 leading-relaxed font-sans">
          {subtitleText}
        </p>
      </div>

      {/* Testimonials Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {testimonialsData.map((item, index) => (
          <motion.div
            key={index}
            className="group relative bg-card/60 hover:bg-card border border-border/15 rounded-[24px] p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:border-primary/30 hover:shadow-[0_15px_35px_rgba(212,175,55,0.06)] transition-all duration-300 hover:-translate-y-2 h-full"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
          >
            <div className="space-y-5 relative z-10">
              {/* Star rating + Category Badge Row */}
              <div className="flex items-center justify-between">
                <div className="flex gap-1" aria-label="5 out of 5 stars rating">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[9px] uppercase tracking-wider font-mono font-bold bg-primary/10 border border-primary/20 text-primary px-2.5 py-1 rounded-full">
                  {item.category}
                </span>
              </div>

              {/* Quote block */}
              <p className="text-xs sm:text-sm leading-[1.7] text-text-primary/90 font-sans italic">
                "{item.quote[langKey] || item.quote.en}"
              </p>
            </div>

            {/* Student metadata + verification footer */}
            <div className="pt-4 border-t border-border/10 space-y-3 relative z-10">
              <div className="flex items-center gap-3.5">
                <img
                  src={item.avatarUrl}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-10 h-10 object-cover rounded-full border border-border/20 grayscale group-hover:grayscale-0 transition-all duration-300 shrink-0"
                />
                <div className="min-w-0">
                  <span className="text-xs font-bold text-text-primary block truncate font-cinzel">
                    {item.name}
                  </span>
                  <span className="text-[10px] text-text-secondary block mt-0.5 font-mono">
                    {item.city}
                  </span>
                </div>
              </div>

              {/* Verified Badge */}
              <div className="inline-flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono font-medium tracking-wide">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{verifiedText}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trust Banner & CTA */}
      <motion.div
        className="mt-16 sm:mt-24 text-center relative z-10 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col items-center justify-center p-6 sm:p-8 bg-card/80 border border-border/15 rounded-3xl backdrop-blur-xl relative overflow-hidden shadow-2xl">
          <div className="flex gap-1.5 mb-4" aria-label="5 star rating">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-5 h-5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <p className="text-sm sm:text-base font-medium leading-relaxed text-text-primary/80 font-sans">
            {trustBannerText}
          </p>
          
          <div className="h-px w-16 bg-border/20 my-5"></div>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-[#25D366] to-[#1FAF5A] text-white font-extrabold rounded-full shadow-[0_0_15px_rgba(37,211,102,0.25)] hover:shadow-[0_0_30px_rgba(37,211,102,0.55)] hover:scale-[1.02] active:scale-95 transition-all duration-300 text-sm tracking-wide cursor-pointer"
          >
            <span>🟢 {ctaBtnText}</span>
            <ArrowRight className="w-4 h-4 text-white shrink-0" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
