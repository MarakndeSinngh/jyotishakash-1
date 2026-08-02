import React, { useState, useRef } from 'react';
import { Section, Service } from '../../types/cms';
import { motion, AnimatePresence } from 'framer-motion';
import { WHATSAPP_LINK } from '../../constants/contacts';
import { 
  TrendingUp, 
  Heart, 
  Activity, 
  GraduationCap, 
  Home, 
  Compass, 
  Sparkles, 
  CheckCircle2, 
  Star, 
  ArrowRight, 
  User, 
  Zap, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  MessageSquare,
  HelpCircle,
  Cpu,
  ArrowUpRight,
  ChevronRight
} from 'lucide-react';

interface ServicesSectionProps {
  section: Section;
  services: Service[];
}

interface LifeChallenge {
  id: string;
  title: string;
  desc: string;
  icon: React.ComponentType<any>;
}

export default function ServicesSection({ section, services }: ServicesSectionProps) {
  const [activeChallenge, setActiveChallenge] = useState<string>('career');
  const recommendationSectionRef = useRef<HTMLDivElement>(null);

  // STEP 1: Life Challenges Data
  const challenges: LifeChallenge[] = [
    {
      id: 'career',
      title: 'Career & Business',
      desc: '"I need clarity about my career path, ideal business endeavors, or financial direction."',
      icon: TrendingUp
    },
    {
      id: 'relationships',
      title: 'Relationships & Marriage',
      desc: '"I want deep, authentic understanding in my marriage, familial relationships, or partner compatibility."',
      icon: Heart
    },
    {
      id: 'health',
      title: 'Health & Well-being',
      desc: '"I want customized holistic guidance to recover mental peace, physical vitality, and positive energy."',
      icon: Activity
    },
    {
      id: 'education',
      title: 'Education & Students',
      desc: '"I need direction for studies, concentration enhancement, competitive exams, or future planning."',
      icon: GraduationCap
    },
    {
      id: 'home',
      title: 'Home & Vastu',
      desc: '"I want to optimize the structural directions, peace, and abundance of my home or workplace."',
      icon: Home
    },
    {
      id: 'growth',
      title: 'Personal Growth',
      desc: '"I want to understand my core strengths, personal karmic roadmap, and make better life decisions."',
      icon: Compass
    }
  ];

  // STEP 2: Recommended Guidance Mapping (Dynamic based on selected challenge)
  const recommendedServices: Record<string, Array<{
    title: string;
    description: string;
    idealFor: string;
    outcomes: string;
    duration: string;
    image: string;
  }>> = {
    career: [
      {
        title: "Business Numerology",
        description: "Maximize your business fortunes. Select high-vibration brand names, align partner compatibility, determine ideal dates for incorporation, and design lucky brand logos.",
        idealFor: "Entrepreneurs, startup founders, freelancers, and business partners.",
        outcomes: "Accelerated brand recognition, optimized cash flow, and long-term legal stability.",
        duration: "60 Minutes",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80"
      },
      {
        title: "Astrology Consultation",
        description: "Analyze your planetary Dashas and house planetary alignments to navigate promotions, career transitions, and find the fields aligned with your Kundali.",
        idealFor: "Working professionals, corporate leaders, and career-changers.",
        outcomes: "Precise timing for crucial career milestones and scientific remedial gem alignment.",
        duration: "45 Minutes",
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80"
      },
      {
        title: "Power Mobile Suggestion",
        description: "Transform your most frequent digital companion into a wealth magnet. Get custom-tailored active mobile numbers aligned with your financial frequencies.",
        idealFor: "Sales professionals, traders, business owners, and digital marketers.",
        outcomes: "Enhanced premium client attraction, balanced communications, and reduced payment delays.",
        duration: "30 Minutes",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80"
      }
    ],
    relationships: [
      {
        title: "Compatibility Analysis",
        description: "Synergize the astrological and numerological charts of two individuals to decipher structural bonding, deep communication style, and karmic connections.",
        idealFor: "Couples considering marriage, business partners, or family members experiencing discord.",
        outcomes: "Reduced relationship friction, profound mutual understanding, and practical remedial alignment.",
        duration: "60 Minutes",
        image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=600&q=80"
      },
      {
        title: "Relationship Astrology",
        description: "A comprehensive investigation of your 7th house, Venus/Mars placements, and relationship-specific planetary cycles.",
        idealFor: "Individuals seeking their life partner or facing emotional blockages in dating.",
        outcomes: "Precise timeframe predictions for marriage, identifying core subconscious blocks, and targeted remedies.",
        duration: "45 Minutes",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80"
      }
    ],
    health: [
      {
        title: "Personal Healing Guidance",
        description: "Vedic remedial guidance, custom planetary chants, natural gemstone recommendation, and spiritual remedies to elevate your personal pranic energy fields.",
        idealFor: "Seekers facing chronic stress, anxious blockages, or energetic exhaustion.",
        outcomes: "Restored inner balance, emotional resilience, clear mental processing, and calm auric field.",
        duration: "60 Minutes",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80"
      },
      {
        title: "Vastu Harmony Assessment",
        description: "Examine spatial layouts to align directional energies, correct natural element blockages, and introduce flow of positivity in physical spaces.",
        idealFor: "Individuals experiencing persistent household stress, sleep issues, or negative atmosphere.",
        outcomes: "Substantially deeper sleep cycles, lowered everyday friction, and vitalized home environment.",
        duration: "90 Minutes",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"
      }
    ],
    education: [
      {
        title: "Student Destiny Roadmap",
        description: "Vedic Numerology structure tailored to match academic strengths. Signature correction for peak confidence and identification of favorable higher education fields.",
        idealFor: "Students, academic researchers, and young graduates preparing for exams.",
        outcomes: "Unshakable career direction, balanced focus fields, and academic spelling alignment.",
        duration: "45 Minutes",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80"
      },
      {
        title: "Focus & Anxiety Mentorship",
        description: "Practical lifestyle adjustments and targeted spiritual remedies to enhance concentration and conquer examination panic.",
        idealFor: "Students under intense academic pressure or preparing for elite competitive exams.",
        outcomes: "Eliminated focus anxiety, high-efficiency retention, and a calm, confident academic mindset.",
        duration: "30 Minutes",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80"
      }
    ],
    home: [
      {
        title: "Residential Vastu Consultation",
        description: "Detailed evaluation of entrances, master bedrooms, kitchens, and bathrooms to align with cosmic energy fields. Remedial changes without structural demolition.",
        idealFor: "New homebuyers, homeowners, and individuals renovating their residential layouts.",
        outcomes: "Harmonized directional vibes, spatial peace, and structural barriers removal.",
        duration: "90 Minutes",
        image: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=600&q=80"
      },
      {
        title: "Commercial Vastu Audit",
        description: "Tailored layout tuning for offices, corporate headquarters, and retail shops to foster employee collaboration, productivity, and uninterrupted financial flow.",
        idealFor: "Business owners, executives, and commercial real estate developers.",
        outcomes: "Enhanced corporate productivity, balanced financial avenues, and active client attraction.",
        duration: "90 Minutes",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80"
      }
    ],
    growth: [
      {
        title: "Premium Life Blueprint",
        description: "Our signature in-depth analysis combining Chaldean Numerology, Astrological Natal Chart mapping, and spiritual consultation for full self-discovery.",
        idealFor: "Seekers at crossroads, change makers, or individuals pursuing deep spiritual meaning.",
        outcomes: "Ultimate clarity on lifetime goals, identification of major life phases (Dashas), and clear remedial path.",
        duration: "75 Minutes",
        image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=600&q=80"
      }
    ]
  };

  // STEP 3: Featured Services Data
  const featuredServices = [
    {
      title: "Signature Name Correction",
      rating: "5.0 ★ Highly Requisitioned",
      desc: "Align your identity and spelling with cosmic vibrations. Melds Chaldean, Pythagorean, and Vedic methodologies to craft an optimal energetic name signature.",
      price: "₹5,100",
      ideal: "Professionals, celebrities, and startup founders.",
      accent: "from-amber-600/20 via-amber-950/40 to-yellow-950/20",
    },
    {
      title: "Vastu Shastra Spatial Consultation",
      rating: "4.9 ★ Structural Success",
      desc: "Detailed evaluation of directional flow and spatial layout in your home or corporate office. Balanced energy centers without breaking structures.",
      price: "Inquire",
      ideal: "Property owners, developers, and corporate managers.",
      accent: "from-emerald-950/20 via-zinc-900/40 to-amber-950/10",
    },
    {
      title: "Elite Consultation Report (VIP)",
      rating: "5.0 ★ Master's Premium Choice",
      desc: "The absolute flagship digital dossier. Comprises full Name Spell Alignment, active Power Mobile Selection, and complete Vedic Astro remedies.",
      price: "₹21,999",
      ideal: "Corporate elites, business founders, and prominent seekers.",
      accent: "from-amber-500/20 via-yellow-600/10 to-amber-950/40",
    }
  ];

  // STEP 4: Why Choose Us comparison data
  const comparisonCards = [
    { title: "Personalized Guidance", text: "Deep custom chart mapping; zero auto-generated templates." },
    { title: "Practical Recommendations", text: "Achievable, scientific lifestyle remedies rather than ritual drama." },
    { title: "Ethical Consultation", text: "Constructive feedback and self-awareness over superstitious fear." },
    { title: "Confidential Discussion", text: "100% secure personal privacy standards for high-profile clients." },
    { title: "Structured Analysis", text: "Vedic science blended with modern rational and pragmatic thinking." },
    { title: "Action-Oriented Insights", text: "Clear directions designed to enable conscious, everyday decisions." }
  ];

  // STEP 5: How It Works timeline
  const timelineSteps = [
    { step: "1", title: "Choose Your Area", desc: "Identify your immediate life challenges in Career, Relationships, or Personal Growth.", icon: Compass },
    { step: "2", title: "Book Consultation", desc: "Reserve your slot through WhatsApp and submit your precise date, time, and place of birth.", icon: Calendar },
    { step: "3", title: "Personalized Analysis", desc: "Raajeev Singh Chauhann personally maps your planetary charts and numerological grids.", icon: Sparkles },
    { step: "4", title: "Apply Remedies", desc: "Receive practical recommendations and spelling corrections for seamless energy alignment.", icon: CheckCircle2 }
  ];

  const handleChallengeClick = (id: string) => {
    setActiveChallenge(id);
    setTimeout(() => {
      recommendationSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  };

  return (
    <section id="services" className="relative bg-background text-text-primary py-24 sm:py-32 overflow-hidden z-10 font-sans selection:bg-primary/30 selection:text-text-primary">
      
      {/* 🌌 AMBIENT COSMIC ELEMENTS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[15%] right-[5%] w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,var(--primary-glow,rgba(212,175,55,0.03))_0%,transparent_70%)] animate-pulse" />
        <div className="absolute bottom-[20%] left-[2%] w-[450px] h-[450px] bg-[radial-gradient(circle_at_center,var(--secondary-glow,rgba(168,85,247,0.02))_0%,transparent_70%)]" />
        
        {/* Floating sacred grid */}
        <div className="absolute right-[2%] top-[30%] opacity-[0.03] w-[350px] h-[350px] pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full text-text-primary animate-[spin_120s_linear_infinite]">
            <rect x="10" y="10" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="0.2" />
            <line x1="10" y1="10" x2="90" y2="90" stroke="currentColor" strokeWidth="0.1" />
            <line x1="90" y1="10" x2="10" y2="90" stroke="currentColor" strokeWidth="0.1" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.15" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">

        {/* ==================================================
            SECTION HEADER
            ================================================== */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-primary/5 border border-primary/20 px-4 py-1.5 rounded-full mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-primary">
              Vedic Pathfinders & Solutions
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-cinzel tracking-tight leading-tight mb-6 text-text-primary">
            Find the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary/60">Guidance</span> You Need
          </h2>

          <p className="text-text-secondary text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
            Every person's journey is unique. Explore authentic spiritual guidance designed to help you make informed decisions in different areas of life.
          </p>
        </div>


        {/* ==================================================
            STEP 1 — LIFE CHALLENGES
            ================================================== */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h3 className="text-xs uppercase font-bold tracking-[0.3em] text-text-secondary font-cinzel">
              Step 1: Identify Your Immediate Life Area
            </h3>
            <div className="w-16 h-[1px] bg-primary/30 mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((chal) => {
              const IconComp = chal.icon;
              const isActive = activeChallenge === chal.id;
              return (
                <motion.div
                  key={chal.id}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  className={`relative group p-8 rounded-2xl border transition-all duration-500 flex flex-col justify-between text-left h-full ${
                    isActive 
                      ? 'bg-card border-primary/40 shadow-[0_15px_30px_rgba(245,158,11,0.05)]' 
                      : 'bg-card/40 border-border/10 hover:border-primary/20 hover:bg-card/80'
                  }`}
                >
                  <div>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 ${
                      isActive 
                        ? 'bg-primary text-background shadow-md shadow-primary/20' 
                        : 'bg-background text-primary group-hover:bg-primary group-hover:text-background'
                    }`}>
                      <IconComp className="w-5 h-5" />
                    </div>

                    <h4 className="text-lg sm:text-xl font-bold font-cinzel text-text-primary mb-3 group-hover:text-primary transition-colors">
                      {chal.title}
                    </h4>

                    <p className="text-text-secondary text-sm leading-relaxed font-light italic">
                      {chal.desc}
                    </p>
                  </div>

                  <div className="mt-8">
                    <button
                      onClick={() => handleChallengeClick(chal.id)}
                      className={`w-full inline-flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                        isActive 
                          ? 'bg-primary text-background' 
                          : 'bg-background/40 text-text-secondary hover:bg-background/80 hover:text-text-primary border border-border/10'
                      }`}
                    >
                      <span>Explore Guidance</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>


        {/* ==================================================
            STEP 2 — RECOMMENDED GUIDANCE
            ================================================== */}
        <div ref={recommendationSectionRef} className="mb-28 sm:mb-36 pt-12 scroll-mt-24">
          <div className="text-center mb-12">
            <h3 className="text-xs uppercase font-bold tracking-[0.3em] text-text-secondary font-cinzel">
              Step 2: Recommended Consultations for {challenges.find(c => c.id === activeChallenge)?.title}
            </h3>
            <p className="text-text-secondary text-xs mt-2 font-sans">
              Based on your selection, these structured programs are highly aligned with your energy goals.
            </p>
            <div className="w-16 h-[1px] bg-primary/30 mx-auto mt-3" />
          </div>

          <div className="max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeChallenge}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {recommendedServices[activeChallenge]?.map((serv, sIdx) => (
                  <div 
                    key={sIdx}
                    className="group bg-card border border-border/10 hover:border-primary/30 rounded-[2rem] overflow-hidden flex flex-col justify-between transition-all duration-500 shadow-2xl"
                  >
                    {/* Visual Segment */}
                    <div className="relative aspect-video w-full bg-background overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent z-10 opacity-90" />
                      <img
                        src={serv.image}
                        alt={serv.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                      />
                      <div className="absolute top-4 left-4 z-20 bg-background/80 border border-border/10 px-3 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-md">
                        <Clock className="w-3.5 h-3.5 text-primary" />
                        <span className="text-[10px] text-text-secondary font-medium">{serv.duration} Session</span>
                      </div>
                    </div>

                    {/* Copywriting Segment */}
                    <div className="p-6 sm:p-8 text-left space-y-4 flex-grow flex flex-col justify-between">
                      <div className="space-y-3">
                        <h4 className="text-xl sm:text-2xl font-bold font-cinzel text-text-primary group-hover:text-primary transition-colors">
                          {serv.title}
                        </h4>
                        <p className="text-text-secondary text-sm font-light leading-relaxed">
                          {serv.description}
                        </p>
                        
                        <div className="pt-3 space-y-2.5 border-t border-border/10">
                          <div className="flex items-start gap-2.5 text-xs">
                            <span className="text-primary font-semibold uppercase tracking-wider shrink-0 w-24">Ideal For:</span>
                            <span className="text-text-secondary">{serv.idealFor}</span>
                          </div>
                          <div className="flex items-start gap-2.5 text-xs">
                            <span className="text-emerald-500 font-semibold uppercase tracking-wider shrink-0 w-24">Outcomes:</span>
                            <span className="text-text-secondary">{serv.outcomes}</span>
                          </div>
                        </div>
                      </div>

                      {/* Interaction Buttons */}
                      <div className="pt-6 grid grid-cols-2 gap-4">
                        <a
                          href={WHATSAPP_LINK}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-3.5 bg-primary text-background font-extrabold uppercase tracking-wider text-[10px] sm:text-xs rounded-xl transition-all shadow-md text-center hover:opacity-90 cursor-pointer"
                        >
                          Book Consultation
                        </a>
                        <a
                          href={WHATSAPP_LINK}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-3.5 bg-background border border-border/10 text-text-secondary hover:text-text-primary font-bold uppercase tracking-wider text-[10px] sm:text-xs rounded-xl transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <span>Learn More</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>


        {/* ==================================================
            STEP 3 — FEATURED SERVICES (Luxury Showcase)
            ================================================== */}
        <div className="mb-28 sm:mb-36">
          <div className="text-center mb-16">
            <h3 className="text-xs uppercase font-bold tracking-[0.3em] text-text-secondary font-cinzel mb-4">
              Step 3: Our Most Requested Solutions
            </h3>
            <h4 className="text-2xl sm:text-3xl font-bold font-cinzel text-text-primary">
              Signature Programs Under High Authority
            </h4>
            <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredServices.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="group relative bg-card border border-primary/20 hover:border-primary/50 rounded-[2.5rem] p-8 sm:p-10 transition-all duration-500 overflow-hidden shadow-2xl flex flex-col justify-between h-full"
              >
                {/* Radiant top accent */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent blur-2xl opacity-60 pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[9px] uppercase tracking-wider text-primary font-bold bg-primary/5 border border-primary/20 px-3 py-1 rounded-full">
                      {feat.rating}
                    </span>
                    <Star className="w-4 h-4 text-primary fill-primary animate-pulse" />
                  </div>

                  <h4 className="text-2xl font-bold font-cinzel text-text-primary leading-tight mb-4 group-hover:text-primary transition-colors">
                    {feat.title}
                  </h4>

                  <p className="text-text-secondary text-sm font-light leading-relaxed mb-6">
                    {feat.desc}
                  </p>

                  <div className="space-y-1 pb-6 border-b border-border/10">
                    <span className="text-[10px] uppercase text-text-secondary/60 tracking-wider font-semibold block">Highly Ideal For</span>
                    <p className="text-text-secondary text-xs font-medium">{feat.ideal}</p>
                  </div>
                </div>

                <div className="relative z-10 pt-6 mt-6">
                  <div className="flex items-baseline justify-between mb-6">
                    <div>
                      <span className="text-[9px] uppercase text-text-secondary/60 tracking-widest block">Client Investment</span>
                      <span className="text-2xl sm:text-3xl font-bold font-cinzel text-primary">{feat.price}</span>
                    </div>
                    <span className="text-[10px] text-text-secondary/60 tracking-wider">Expert Consulting</span>
                  </div>

                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center py-4 bg-primary text-background font-extrabold uppercase tracking-wider text-xs rounded-xl shadow-lg hover:opacity-90 transition-all hover:-translate-y-0.5 text-center cursor-pointer"
                  >
                    <span>Book Consultation Now</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>


        {/* ==================================================
            STEP 4 — WHY CHOOSE THIS SERVICE
            ================================================== */}
        <div className="mb-28 sm:mb-36">
          <div className="text-center mb-16">
            <h3 className="text-xs uppercase font-bold tracking-[0.3em] text-text-secondary font-cinzel mb-4">
              Step 4: The Scientific Vedic Mandate
            </h3>
            <h4 className="text-2xl sm:text-3xl font-bold font-cinzel text-text-primary">
              Pragmatic Consulting vs. Superstitious Dogma
            </h4>
            <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {comparisonCards.map((comp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-card/40 border border-border/10 hover:border-primary/20 p-6 sm:p-8 rounded-2xl text-left transition-all duration-300 flex items-start gap-4"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-text-primary mb-2 font-cinzel tracking-wide">
                    {comp.title}
                  </h4>
                  <p className="text-text-secondary text-xs sm:text-sm font-light leading-relaxed">
                    {comp.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>


        {/* ==================================================
            STEP 5 — HOW IT WORKS
            ================================================== */}
        <div className="mb-28 sm:mb-36">
          <div className="text-center mb-16">
            <h3 className="text-xs uppercase font-bold tracking-[0.3em] text-text-secondary font-cinzel mb-4">
              Step 5: Operational Roadmap
            </h3>
            <h4 className="text-2xl sm:text-3xl font-bold font-cinzel text-text-primary">
              The Seamless Path to Personal Clarity
            </h4>
            <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4" />
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Connecting line */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-y-1/2 hidden lg:block" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {timelineSteps.map((step, idx) => {
                const StepIcon = step.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                    className="relative bg-card/80 border border-border/10 p-8 rounded-3xl text-center flex flex-col items-center justify-between group shadow-xl hover:border-primary/20 transition-all duration-300"
                  >
                    {/* Top counter circle */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-background border border-primary/40 text-primary text-xs font-bold flex items-center justify-center font-cinzel">
                      {step.step}
                    </div>

                    <div className="w-12 h-12 rounded-xl bg-primary/5 border border-primary/15 flex items-center justify-center text-primary group-hover:scale-110 transition-transform mb-4 mt-2">
                      <StepIcon className="w-5 h-5" />
                    </div>

                    <div>
                      <h4 className="text-base sm:text-lg font-bold font-cinzel text-text-primary mb-2 tracking-wide">
                        {step.title}
                      </h4>
                      <p className="text-text-secondary text-xs font-light leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>


        {/* ==================================================
            STEP 6 — STILL NOT SURE?
            ================================================== */}
        <div className="mb-24 sm:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-b from-card to-background border border-border/10 rounded-[2.5rem] p-8 sm:p-12 text-center max-w-4xl mx-auto overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary-glow,rgba(212,175,55,0.03))_0%,transparent_70%)] pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mx-auto">
                <HelpCircle className="w-6 h-6 animate-pulse" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold font-cinzel text-text-primary leading-tight">
                Not Sure Which Consultation Is Right for You?
              </h3>

              <p className="text-text-secondary text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
                Let us help you identify the most suitable consultation based on your current life goals, personal questions, and cosmic charts.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 bg-primary text-background font-extrabold uppercase tracking-wider text-xs rounded-xl shadow-lg hover:opacity-90 transition-all hover:-translate-y-0.5 text-center cursor-pointer"
                >
                  Talk to an Expert
                </a>

                <button
                  onClick={() => {
                    const el = document.getElementById('founder-biography');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-4 bg-background border border-border/10 text-text-secondary hover:text-text-primary font-bold uppercase tracking-wider text-xs rounded-xl transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  Explore All Services
                </button>
              </div>
            </div>
          </motion.div>
        </div>


        {/* ==================================================
            STEP 7 — AI COMING SOON
            ================================================== */}
        <div>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-r from-card via-background to-card border border-primary/30 rounded-[3rem] p-8 sm:p-12 lg:p-16 overflow-hidden max-w-4xl mx-auto shadow-2xl"
          >
            {/* Cyberpunk glowing background rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/5 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute -right-12 -top-12 w-24 h-24 bg-secondary/5 blur-[50px] rounded-full pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
              
              <div className="lg:col-span-8 space-y-5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="bg-primary/10 border border-primary/30 px-3 py-1 rounded-full text-[9px] uppercase tracking-[0.2em] font-bold text-primary">
                    Coming Soon
                  </span>
                  <span className="bg-secondary/10 border border-secondary/30 px-3 py-1 rounded-full text-[9px] uppercase tracking-[0.2em] font-bold text-secondary flex items-center gap-1">
                    <Cpu className="w-3 h-3" />
                    <span>AI Powered</span>
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-cinzel text-text-primary leading-tight">
                  AI Spiritual Assistant
                </h3>

                <p className="text-text-secondary text-xs sm:text-sm leading-relaxed font-light">
                  Soon you'll be able to receive instant, preliminary guidance and astrological calculation reports through our AI-powered spiritual assistant before booking a personalized consultation with Raajeev Singh Chauhann.
                </p>
              </div>

              <div className="lg:col-span-4 flex justify-center lg:justify-end">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 bg-primary text-background font-extrabold uppercase tracking-wider text-xs rounded-xl shadow-lg hover:opacity-90 transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Join Waitlist</span>
                  <ChevronRight className="w-4 h-4 text-background" />
                </a>
              </div>

            </div>
          </motion.div>
        </div>


      </div>

    </section>
  );
}
