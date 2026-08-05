import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useAcademy } from '../context/AcademyContext';
import { WHATSAPP_LINK } from '../constants/contacts';
import { 
  BookOpen, 
  Layers, 
  PenTool, 
  Smartphone, 
  Home as HomeIcon, 
  ArrowRight, 
  Sparkles 
} from 'lucide-react';

interface WorkshopTimelineProps {
  onStartJourney?: () => void;
}

export default function WorkshopTimeline({ onStartJourney }: WorkshopTimelineProps) {
  const { language, t } = useLanguage();
  const { activeAcademy } = useAcademy();

  const whatsappUrl = activeAcademy?.contactDetails?.whatsapp || WHATSAPP_LINK;

  const currentLangKey = language === 'gu' ? 'gu' : language === 'hi' ? 'hi' : 'en';

  const defaultSyllabus = {
    gu: {
      badge: t("curriculum.badge", "લાઇવ વર્કશોપ અભ્યાસક્રમ"),
      title: t("curriculum.title", "તમારી ૫-દિવસીય ન્યુમરોલોજી પરિવર્તન યાત્રા"),
      subtitle: t("curriculum.subtitle", "દરરોજ તમે પ્રેક્ટિકલ ચાલ્ડિયન ન્યુમરોલોજીના સિદ્ધાંતો શીખશો અને સાથે લાઈવ પ્રેડિકશન સેશનમાં ભાગ લેશો."),
      ctaTitle: t("curriculum.ctaTitle", "🎉 ૧૦૦% ફ્રી વર્કશોપ એન્લોર્નમેન્ટ"),
      ctaDesc: t("curriculum.ctaDesc", "આજે જ તમારી લાઈવ સીટ બુક કરો. વોટ્સએપ ગ્રુપ દ્વારા તુરંત એક્સેસ મેળવો."),
      ctaLimit: t("curriculum.ctaLimit", "મર્યાદિત લાઈવ સીટ્સ ઉપલબ્ધ • કોઈ ક્રેડિટ કાર્ડની જરૂર નથી"),
      days: [
        {
          day: "DAY 01",
          title: t("curriculum.day1Title", "ચાલ્ડિયન ન્યુમરોલોજીનો પરિચય"),
          topics: [
            "ન્યુમરોલોજીના પાયાના સિદ્ધાંતો",
            "લો શૂ ગ્રીડ બનાવવાની રીત",
            "વ્યક્તિત્વ અને ગુણોનું વિશ્લેષણ",
            "મિસિંગ નંબર્સની અસર"
          ],
          highlight: t("curriculum.day1Highlight", "🎯 લાઈવ વિદ્યાર્થી પૃથ્થકરણ"),
          icon: BookOpen
        },
        {
          day: "DAY 02",
          title: t("curriculum.day2Title", "૮૧ શક્તિશાળી નંબર કોમ્બિનેશન્સ"),
          topics: [
            "૮૧ કોમ્બિનેશન્સનું તાર્કિક રહસ્ય",
            "લકી અને ચેલેન્જિંગ પેટર્ન્સ",
            "વ્યવહારિક લાઈફ એપ્લિકેશન"
          ],
          highlight: t("curriculum.day2Highlight", "🔮 લાઈવ વિશ્લેષણ સત્ર"),
          icon: Layers
        },
        {
          day: "DAY 03",
          title: t("curriculum.day3Title", "નામ ન્યુમરોલોજી (Name Correction)"),
          topics: [
            "નામની વાઇબ્રેશન અને એનર્જી",
            "બિઝનેસ સ્પેલિંગ એનાલિસિસ",
            "અંધશ્રદ્ધા વગર નામ સુધારો"
          ],
          highlight: t("curriculum.day3Highlight", "✍️ લાઈવ નેમ પ્રેડિક્શન્સ"),
          icon: PenTool
        },
        {
          day: "DAY 04",
          title: t("curriculum.day4Title", "મોબાઈલ ન્યુમરોલોજી"),
          topics: [
            "મોબાઈલ નંબરની સકારાત્મક/નકારાત્મક શક્તિ",
            "પેર કોમ્બિનેશન્સનું વિશ્લેષણ",
            "બિઝનેસ સપોર્ટ નંબર્સ"
          ],
          highlight: t("curriculum.day4Highlight", "📱 લાઈવ મોબાઈલ નંબર ચેકિંગ"),
          icon: Smartphone
        },
        {
          day: "DAY 05",
          title: t("curriculum.day5Title", "ન્યુમરો વાસ્તુ અને રેમેડીઝ"),
          topics: [
            "ઘર અને ઓફિસની વાસ્તુ એનર્જી",
            "નંબરો સાથે વાસ્તુનું સંયોજન",
            "સરળ અને વ્યવહારિક ઉપાયો"
          ],
          highlight: t("curriculum.day5Highlight", "⭐ ગ્રાન્ડ લાઈવ પ્રેડિક્શન સેશન"),
          icon: HomeIcon
        }
      ]
    },
    hi: {
      badge: t("curriculum.badge", "लाइव वर्कशॉप पाठ्यक्रम"),
      title: t("curriculum.title", "आपकी 5-दिवसीय न्यूमरोलॉजी परिवर्तन यात्रा"),
      subtitle: t("curriculum.subtitle", "हर दिन आप व्यावहारिक चाल्डियन न्यूमरोलॉजी अवधारणाओं को सीखेंगे और लाइव प्रेडिक्शन सत्र में भाग लेंगे।"),
      ctaTitle: t("curriculum.ctaTitle", "🎉 100% फ्री वर्कशॉप नामांकन"),
      ctaDesc: t("curriculum.ctaDesc", "आज ही अपनी लाइव सीट सुरक्षित करें। व्हाट्सएप ग्रुप के माध्यम से तुरंत एक्सेस प्राप्त करें।"),
      ctaLimit: t("curriculum.ctaLimit", "सीमित लाइव सीटें उपलब्ध • किसी क्रेडिट कार्ड की आवश्यकता नहीं"),
      days: [
        {
          day: "DAY 01",
          title: t("curriculum.day1Title", "चाल्डियन न्यूमरोलॉजी का परिचय"),
          topics: [
            "न्यूमरोलॉजी के मूलभूत सिद्धांत",
            "लो शू ग्रिड",
            "व्यक्तिगत विशेषताएं",
            "मिसिंग नंबर्स की व्याख्या"
          ],
          highlight: t("curriculum.day1Highlight", "🎯 लाइव छात्र विश्लेषण"),
          icon: BookOpen
        },
        {
          day: "DAY 02",
          title: t("curriculum.day2Title", "81 शक्तिशाली नंबर कॉम्बिनेशन्स"),
          topics: [
            "सभी 81 कॉम्बिनेशन्स को समझना",
            "लकी और चैलेंजिंग पैटर्न",
            "व्यावहारिक व्याख्या"
          ],
          highlight: t("curriculum.day2Highlight", "🔮 लाइव प्रेडिक्शन सत्र"),
          icon: Layers
        },
        {
          day: "DAY 03",
          title: t("curriculum.day3Title", "नेम न्यूमरोलॉजी"),
          topics: [
            "नाम की तरंगें और ऊर्जा",
            "बिजनेस नेम एनालिसिस",
            "नाम में सही सुधार"
          ],
          highlight: t("curriculum.day3Highlight", "✍️ लाइव नेम प्रेडिक्शन"),
          icon: PenTool
        },
        {
          day: "DAY 04",
          title: t("curriculum.day4Title", "मोबाइल न्यूमरोलॉजी"),
          topics: [
            "मोबाइल नंबर की ऊर्जा",
            "पेयर कॉम्बिनेशन्स",
            "बिजनेस सपोर्ट नंबर"
          ],
          highlight: t("curriculum.day4Highlight", "📱 लाइव मोबाइल नंबर चेकिंग"),
          icon: Smartphone
        },
        {
          day: "DAY 05",
          title: t("curriculum.day5Title", "न्यूमरो वास्तु और रेमेडीज"),
          topics: [
            "घर की ऊर्जा",
            "कार्यालय की ऊर्जा",
            "व्यावहारिक सरल उपाय"
          ],
          highlight: t("curriculum.day5Highlight", "⭐ ग्रैंड लाइव प्रेडिक्शन सत्र"),
          icon: HomeIcon
        }
      ]
    },
    en: {
      badge: t("curriculum.badge", "Interactive Live Syllabus"),
      title: t("curriculum.title", "Your 5-Day Numerology Transformation Journey"),
      subtitle: t("curriculum.subtitle", `Every day you will learn practical Chaldean Numerology concepts followed by LIVE prediction sessions where ${activeAcademy?.instructorName || "Shaunak S. Patthak"} demonstrates real analysis using participant data.`),
      ctaTitle: t("curriculum.ctaTitle", "🎉 100% Free Workshop Enrollment"),
      ctaDesc: t("curriculum.ctaDesc", "Secure your interactive LIVE seat today. Instant access via WhatsApp."),
      ctaLimit: t("curriculum.ctaLimit", "LIMITED LIVE SLOTS AVAILABLE • NO CREDIT CARD REQUIRED"),
      days: [
        {
          day: "DAY 01",
          title: t("curriculum.day1Title", "Introduction to Chaldean Numerology"),
          topics: [
            "Fundamentals of Numerology",
            "Lo Shu Grid",
            "Personal Attributes",
            "Missing Numbers"
          ],
          highlight: t("curriculum.day1Highlight", "🎯 Live Student Analysis"),
          icon: BookOpen
        },
        {
          day: "DAY 02",
          title: t("curriculum.day2Title", "81 Powerful Number Combinations"),
          topics: [
            "Understanding all 81 combinations",
            "Lucky & Challenging Patterns",
            "Practical Interpretation"
          ],
          highlight: t("curriculum.day2Highlight", "🔮 LIVE Prediction Session using real examples"),
          icon: Layers
        },
        {
          day: "DAY 03",
          title: t("curriculum.day3Title", "Name Numerology"),
          topics: [
            "Name Vibrations",
            "Business Name Analysis",
            "Name Corrections"
          ],
          highlight: t("curriculum.day3Highlight", "✍️ LIVE Name Predictions"),
          icon: PenTool
        },
        {
          day: "DAY 04",
          title: t("curriculum.day4Title", "Mobile Numerology"),
          topics: [
            "Mobile Number Energy",
            "Pair Combinations",
            "Business Numbers"
          ],
          highlight: t("curriculum.day4Highlight", "📱 LIVE Mobile Number Checking of Participants"),
          icon: Smartphone
        },
        {
          day: "DAY 05",
          title: t("curriculum.day5Title", "Numero Vastu & Remedies"),
          topics: [
            "Home Energy",
            "Office Energy",
            "Practical Remedies"
          ],
          highlight: t("curriculum.day5Highlight", "⭐ Grand LIVE Prediction Session"),
          icon: HomeIcon
        }
      ]
    }
  };

  const content = defaultSyllabus[currentLangKey];

  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-12 py-20 lg:py-24 border-t border-border/10 relative" id="curriculum-timeline">
      {/* Decorative Radial Glow behind the timeline */}
      <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[350px] h-[350px] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[20%] left-[25%] w-[300px] h-[300px] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none"></div>

      {/* Header section with refined typography */}
      <div className="text-center mb-16 sm:mb-24 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary font-mono">
            {content.badge}
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-cinzel text-text-primary mt-1 tracking-tight">
          {content.title}
        </h2>
        <p className="text-xs sm:text-sm text-text-secondary max-w-2xl mx-auto mt-3 leading-relaxed font-sans">
          {content.subtitle}
        </p>
      </div>

      {/* Timeline Section */}
      <div className="relative max-w-4xl mx-auto z-10">
        {/* Desktop Vertical Progress Track */}
        <div className="hidden lg:block absolute left-[45px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-border/10 via-primary/30 to-border/10">
          <motion.div 
            className="absolute top-0 left-[-2px] right-[-2px] h-[80px] bg-gradient-to-b from-primary to-transparent rounded-full shadow-[0_0_15px_rgba(212,175,55,0.5)]"
            animate={{
              y: ["0%", "500%", "0%"]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        {/* Days Layout */}
        <div className="space-y-8 lg:space-y-12">
          {content.days.map((item, index) => {
            const IconComponent = item.icon;
            
            return (
              <motion.div 
                key={index}
                className="flex flex-col lg:flex-row lg:gap-12 relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Desktop Day/Icon column */}
                <div className="hidden lg:flex items-center justify-start w-[92px] shrink-0 pt-6">
                  <div className="relative flex flex-col items-center">
                    <div className="w-11 h-11 rounded-full bg-card border border-primary/40 flex items-center justify-center shadow-lg hover:border-primary transition-colors duration-300 relative z-10">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-[11px] font-mono font-bold tracking-widest text-primary mt-2.5">
                      {item.day}
                    </span>
                  </div>
                </div>

                {/* Glass Card */}
                <div className="group relative flex-1 bg-card/60 hover:bg-card border border-border/15 rounded-2xl p-6 sm:p-8 hover:border-primary/30 hover:shadow-[0_10px_35px_rgba(212,175,55,0.08)] hover:-translate-y-1.5 transition-all duration-300">
                  
                  {/* Mobile Day Badge */}
                  <div className="flex lg:hidden items-center justify-between mb-4 border-b border-border/10 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <IconComponent className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-xs font-mono font-bold tracking-widest text-primary">
                        {item.day}
                      </span>
                    </div>
                  </div>

                  {/* Day Content */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    {/* Left Grid: Title & Topics */}
                    <div className="md:col-span-7 space-y-4">
                      <h3 className="text-lg sm:text-xl font-bold font-cinzel text-text-primary group-hover:text-primary transition-colors duration-300">
                        {item.title}
                      </h3>
                      
                      <ul className="space-y-2.5 pt-1">
                        {Array.isArray(item.topics) && item.topics.map((topic, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-text-secondary leading-relaxed font-sans">
                            <span className="text-primary mt-1 shrink-0 font-bold">•</span>
                            <span className="group-hover:text-text-primary transition-colors duration-300">{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right Grid: Live Highlights Block */}
                    <div className="md:col-span-5 h-full flex flex-col justify-between pt-1 md:pt-0">
                      <div className="space-y-3.5 bg-background/50 border border-border/10 rounded-xl p-4.5 group-hover:border-primary/20 transition-all duration-300">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 tracking-wide uppercase shadow-sm">
                          <Sparkles className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span>LIVE Practical Prediction</span>
                        </div>
                        
                        <p className="text-xs text-primary font-semibold leading-relaxed font-cinzel">
                          {item.highlight}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div 
          className="mt-16 sm:mt-24 text-center relative z-20"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] bg-primary/10 blur-[60px] rounded-full pointer-events-none"></div>
          
          <div className="bg-card/80 border border-primary/20 backdrop-blur-xl rounded-[28px] p-8 max-w-2xl mx-auto shadow-2xl relative overflow-hidden">
            <h4 className="text-sm font-semibold tracking-wide text-text-secondary uppercase font-mono mb-3">
              {content.ctaTitle}
            </h4>
            <p className="text-lg sm:text-xl font-bold font-cinzel text-text-primary mb-6 leading-normal max-w-md mx-auto">
              {content.ctaDesc}
            </p>
            
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4.5 bg-gradient-to-r from-[#25D366] to-[#1FAF5A] text-white font-extrabold rounded-full shadow-[0_0_20px_rgba(37,211,102,0.25)] hover:shadow-[0_0_35px_rgba(37,211,102,0.6)] hover:scale-[1.02] active:scale-95 transition-all duration-300 text-base tracking-wide cursor-pointer"
            >
              <span>🟢 {t("hero.ctaJoin", "Reserve My FREE Seat Now")}</span>
              <ArrowRight className="w-5 h-5 text-white shrink-0" />
            </a>

            <div className="flex items-center justify-center gap-2 text-[10px] text-text-secondary/70 font-mono uppercase tracking-widest mt-4">
              <span>{content.ctaLimit}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
