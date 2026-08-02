import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Cpu, 
  Compass, 
  ArrowRight, 
  ShieldCheck, 
  HelpCircle, 
  UserCheck, 
  Activity, 
  Lock, 
  Layout, 
  Layers, 
  Search, 
  MapPin, 
  BookOpen, 
  Compass as CompassIcon, 
  Award, 
  Calendar, 
  User, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  ChevronRight, 
  Star,
  RefreshCw,
  PhoneCall,
  Flame,
  Info
} from 'lucide-react';
import { WHATSAPP_LINK } from '../../constants/contacts';
import SmartImage from './SmartImage';

// MOCK DATA FOR THE CAPABILITIES
interface Capability {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  badge: 'Beta' | 'Coming Soon';
  placeholder: string;
  generatePrompt: (input: string) => string;
  mockResponse: (input: string) => string;
}

const CAPABILITIES: Capability[] = [
  {
    id: 'numerology',
    title: 'AI Numerology Insights',
    desc: 'Generate educational numerology summaries and unlock compound destiny frequencies based on planetary nodes.',
    icon: <Sparkles className="w-5 h-5 text-amber-400" />,
    badge: 'Beta',
    placeholder: 'Enter Date of Birth (e.g. 15-08-1947)',
    generatePrompt: (dob) => `Analyze destiny vibrations for birthdate: ${dob}`,
    mockResponse: (dob) => {
      const nums = dob.replace(/\D/g, '').split('').map(Number);
      const sum = nums.reduce((a, b) => a + b, 0);
      const single = sum % 9 || 9;
      return `🪐 [CHALDEAN INSIGHT] Date Alignment: ${dob}
• Core Vibration Number: ${single}
• Energetic Frequency: Powered by ${single === 1 ? 'Sun (Surya) - represents sovereign focus and leadership vitality' : single === 2 ? 'Moon (Chandra) - governs sensitive empathy, balance, and creative flow' : single === 3 ? 'Jupiter (Guru) - symbolizes immense learning expansion, strategy, and wisdom' : single === 4 ? 'Rahu - denotes innovative structures, non-traditional solutions, and digital focus' : single === 5 ? 'Mercury (Budha) - enhances sharp communication, calculation speed, and commercial flow' : single === 6 ? 'Venus (Shukra) - aligns with creative luxury, fine aesthetic sensibilities, and social grace' : single === 7 ? 'Ketu - coordinates deep research, subconscious instinct, and cosmic detachment' : single === 8 ? 'Saturn (Shani) - reflects deep patience, physical discipline, and organic scaling' : 'Mars (Mangal) - triggers vitalizing drive, dynamic courage, and technical execution'}.
• Alignment Summary: Your grid reveals strong foundation nodes. To translate this passive blueprint into practical enterprise scaling, consult with Raajeev Singh Chauhann for tailored spelling corrections.`;
    }
  },
  {
    id: 'birthchart',
    title: 'AI Birth Chart Explorer',
    desc: 'Explore planetary placements, dasha periods, and planetary conjunctions through comprehensive educational summaries.',
    icon: <Compass className="w-5 h-5 text-amber-400" />,
    badge: 'Coming Soon',
    placeholder: 'Enter Birth Time & Location (e.g. 14:35, New Delhi)',
    generatePrompt: (info) => `Map astro structures for birth context: ${info}`,
    mockResponse: (info) => {
      return `🌌 [ASTRONOMICAL INSIGHT] Coordinate Context: "${info}"
• Ascendant Anchor: Vedic system calculations place your ascendant in the active quadrant.
• Highlight Conjunction: Jupiter-Mercury connection signals an excellent aptitude for structured spiritual studies and financial geometry.
• Educational note: Real astrology requires high-precision birth rectification. This educational note maps general matrices. A professional consultation is advised for exact planetary remedies.`;
    }
  },
  {
    id: 'name',
    title: 'AI Name Insights',
    desc: 'Receive preliminary observations on your name spelling, compound values, and brand trademark alignment options.',
    icon: <User className="w-5 h-5 text-amber-400" />,
    badge: 'Beta',
    placeholder: 'Enter Full Name (e.g. Rajesh Kumar)',
    generatePrompt: (name) => `Check vibrational values for name: ${name}`,
    mockResponse: (name) => {
      const len = name.replace(/\s/g, '').length;
      const compound = (len * 3 + 7) % 52 || 1;
      return `✍️ [SIGNATURE ALIGNMENT] Name: "${name}"
• Character Count Anchor: ${len} letters.
• Calculated Compound Signature: ${compound}
• Harmonic Vibe: Aligns with the energy of ${compound % 9 === 1 ? 'Surya (Sun) - sovereign expansion' : 'Chandra (Moon) - harmonic cooperation'}.
• Core Assessment: Your current spelling carries an interesting resonance. However, minor adjustments in letter positioning can harmonize conflicts and boost commercial luck. This should only be finalized via an official consultation.`;
    }
  },
  {
    id: 'mobile',
    title: 'AI Mobile Number Explorer',
    desc: 'Calculate the total compound resonance of your active mobile number and check for recurring planetary number sets.',
    icon: <Activity className="w-5 h-5 text-amber-400" />,
    badge: 'Beta',
    placeholder: 'Enter 10-digit Mobile Number',
    generatePrompt: (num) => `Audit digital frequency: ${num}`,
    mockResponse: (num) => {
      const cleanNum = num.replace(/\D/g, '');
      if (cleanNum.length < 5) return '⚠️ Please provide a valid numerical frequency sequence.';
      const sum = cleanNum.split('').map(Number).reduce((a, b) => a + b, 0);
      const compound = sum;
      const single = sum % 9 || 9;
      return `📱 [MOBILE FREQUENCY AUDIT] Active Number: ${cleanNum}
• Combined Cumulative Sum: ${compound}
• Core Harmonic Node: ${single} (governed by ${single === 5 ? 'Mercury - ideal for swift trade and transactions' : single === 6 ? 'Venus - perfect for luxurious branding' : 'Universal Solar/Lunar Matrix'}).
• Structural Check: Contains patterns that may block incoming commercial energy. A Power Mobile Suggestion from Raajeev Singh Chauhann will align this active device to pull capital flow.`;
    }
  },
  {
    id: 'companion',
    title: 'AI Learning Companion',
    desc: 'Answer complex course-related questions, explain Chaldean grids, and help learners revise ancient Vedic scripts.',
    icon: <BookOpen className="w-5 h-5 text-amber-400" />,
    badge: 'Coming Soon',
    placeholder: 'Ask a curriculum question (e.g. What is Lo Shu?)',
    generatePrompt: (q) => `Curriculum search: ${q}`,
    mockResponse: (q) => {
      return `📖 [ACADEMIC COMPANION] Query: "${q}"
• Foundation concept: The Lo Shu grid is a 3x3 magic square with 9 sectors. Each house holds distinct planetary nodes.
• Quick Summary: It coordinates 3 horizontal vectors (Mental, Emotional, Practical) and 3 vertical columns.
• To study this systematically, enroll in our upcoming complete 'Lo Shu Grid Mastery' course on the LEO Family Academy tab!`;
    }
  },
  {
    id: 'wisdom',
    title: 'AI Daily Wisdom',
    desc: 'Offer beautifully curated daily reflections, ancient mantras, learning prompts, and spiritual alignment reminders.',
    icon: <CompassIcon className="w-5 h-5 text-amber-400" />,
    badge: 'Beta',
    placeholder: 'Press generate for today\'s celestial prompt',
    generatePrompt: () => 'Requesting daily planetary frequency guidance',
    mockResponse: () => {
      return `☀️ [DAILY CELESTIAL ALIGNMENT] 
• Today\'s Planetary Ruler: Jupiter (Guru) - Focus on structured learning and professional expansion.
• Harmonic Mantra: "Om Namo Bhagavate Vasudevaya" - coordinates wisdom grids and calms subconscious anxiety.
• Reflection Prompt: "Am I seeking temporary short-cuts or building long-term, structured expertise?"
• Action Milestone: Dedicate 15 minutes today to practice grid overlays.`;
    }
  }
];

const COMPARISONS = [
  {
    ai: "Explaining basic terms, historical contexts, and numerical counting metrics.",
    human: "Conducting highly specific personal destiny rectifications."
  },
  {
    ai: "Calculating basic single-digit/compound numbers instantaneously.",
    human: "Delivering deep intuitive solutions using decades of consulting experience."
  },
  {
    ai: "Structuring interactive learning cards and revision summaries.",
    human: "Customizing spatial Vastu alignments based on actual resident energy levels."
  },
  {
    ai: "Generating preliminary, non-binding observations.",
    human: "Providing high-stakes brand, business, and legal name signature validations."
  }
];

const ROADMAP_PHASES = [
  { phase: "Phase 1", title: "AI Learning Assistant", desc: "Interactive revision helper for Academy enrollees.", status: "In Beta Testing", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
  { phase: "Phase 2", title: "AI Numerology Explorer", desc: "Instant Chaldean compound grid calculators for open-source audits.", status: "Development", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
  { phase: "Phase 3", title: "AI Birth Chart Explorer", desc: "Vedic planetary degree calculations with precise constellation tables.", status: "Planning", color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
  { phase: "Phase 4", title: "AI Spiritual Journal", desc: "Encrypted daily mood, mantra chanting logs, and bio-rythmic alignments.", status: "Concept", color: "text-zinc-500 bg-zinc-900 border-white/5" },
  { phase: "Phase 5", title: "AI Personal Dashboard", desc: "Centralized workspace to track courses, webinars, reports, and gemstones.", status: "Concept", color: "text-zinc-500 bg-zinc-900 border-white/5" },
  { phase: "Phase 6", title: "AI Life Planning Suite", desc: "Algorithmic selection of optimal dates for weddings, business launch, and Vastu.", status: "Concept", color: "text-zinc-500 bg-zinc-900 border-white/5" }
];

export default function AISpiritualSection() {
  const [activeTab, setActiveTab] = useState<string>('numerology');
  const [sandboxInput, setSandboxInput] = useState<string>('');
  const [sandboxResponse, setSandboxResponse] = useState<string>('');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistSuccess, setWaitlistSuccess] = useState(false);

  // Active capability info
  const selectedCap = CAPABILITIES.find(c => c.id === activeTab) || CAPABILITIES[0];

  useEffect(() => {
    // Reset sandbox when switching capability
    setSandboxInput('');
    setSandboxResponse('');
  }, [activeTab]);

  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sandboxInput && selectedCap.id !== 'wisdom') return;

    setIsSimulating(true);
    setSandboxResponse('');

    setTimeout(() => {
      setSandboxResponse(selectedCap.mockResponse(sandboxInput));
      setIsSimulating(false);
    }, 1500);
  };

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail) return;
    setWaitlistSuccess(true);
    setTimeout(() => {
      setWaitlistEmail('');
      setWaitlistSuccess(false);
    }, 4000);
  };

  return (
    <section id="ai-platform" className="relative bg-background text-text-primary py-24 sm:py-32 overflow-hidden z-10 font-sans selection:bg-primary/30 selection:text-text-primary">
      
      {/* 🌌 AMBIENT COSMIC BACKGROUND (Futuristic Apple-inspired SaaS style) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] right-[10%] w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,var(--secondary-glow,rgba(168,85,247,0.035))_0%,transparent_70%)]" />
        <div className="absolute top-[50%] left-[-5%] w-[700px] h-[700px] bg-[radial-gradient(circle_at_center,var(--primary-glow,rgba(245,158,11,0.025))_0%,transparent_70%)] animate-pulse" />
        <div className="absolute bottom-[5%] right-[2%] w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,var(--primary-glow,rgba(212,175,55,0.03))_0%,transparent_70%)]" />

        {/* Slow-moving cosmic starry background */}
        <div className="absolute inset-0 opacity-[0.2]">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 bg-text-primary rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${2 + Math.random() * 5}s`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">

        {/* ==================================================
            SECTION TITLE (Cinematic layout with gold gradient)
            ================================================== */}
        <div className="max-w-4xl mx-auto text-center mb-20 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-secondary/5 border border-secondary/20 px-4 py-1.5 rounded-full mb-6"
          >
            <Cpu className="w-4 h-4 text-secondary" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-secondary">
              LEO Spiritual Intelligence Platform
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-cinzel tracking-tight leading-tight mb-6 text-text-primary">
            The Future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-secondary relative inline-block">
              Spiritual Intelligence
              <span className="absolute bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
            </span>
          </h2>

          <p className="text-text-secondary text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
            Discover how ancient wisdom and modern AI can work together to help you explore, learn, and prepare for more meaningful personal guidance.
          </p>
        </div>


        {/* ==================================================
            PART 1 — HERO AI VISUAL (WebGL-like Sacred Geometry)
            ================================================== */}
        <div className="mb-28 sm:mb-36 relative flex justify-center">
          <div className="relative w-full max-w-4xl aspect-[16/9] bg-card/85 border border-border/10 rounded-[2.5rem] p-8 overflow-hidden backdrop-blur-md shadow-2xl flex flex-col items-center justify-center">
            
            {/* Interactive Grid Map Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:4rem_4rem] z-0" />
            
            {/* Ambient Aurora Glow */}
            <div className="absolute inset-0 bg-radial-gradient(circle_at_center,var(--primary-glow,rgba(168,85,247,0.03))_0%,transparent_60%)" />

            {/* Glowing cosmic intelligence orb (Framer Motion rotating & pulsing) */}
            <div className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
              
              {/* Outer rotating astrological dial */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 border border-primary/10 rounded-full flex items-center justify-center p-4"
              >
                {/* Simulated Constellation Nodes */}
                <div className="absolute top-0 w-2 h-2 bg-primary rounded-full blur-xs" />
                <div className="absolute bottom-4 left-6 w-1.5 h-1.5 bg-secondary rounded-full" />
                <div className="absolute top-12 right-6 w-2.5 h-2.5 bg-primary/60 rounded-full" />
                <div className="absolute left-0 w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                
                {/* Simple Ring Line */}
                <svg viewBox="0 0 100 100" className="w-full h-full text-border/20 pointer-events-none">
                  <circle cx="50" cy="50" r="49" fill="none" stroke="currentColor" strokeWidth="0.1" strokeDasharray="3 3" />
                  <polygon points="50,2 91,25 91,75 50,98 9,75 9,25" fill="none" stroke="currentColor" strokeWidth="0.15" />
                </svg>
              </motion.div>

              {/* Inner Sacred Sri Yantra / Geometric Matrix */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                className="absolute w-[80%] h-[80%] border border-secondary/10 rounded-full p-8"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full text-primary/20">
                  <polygon points="50,10 90,80 10,80" fill="none" stroke="currentColor" strokeWidth="0.2" />
                  <polygon points="50,90 90,20 10,20" fill="none" stroke="currentColor" strokeWidth="0.2" />
                  <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="0.1" />
                </svg>
              </motion.div>

              {/* Central Glowing Orb with CPU Pulsing Nodes */}
              <motion.div
                animate={{ scale: [0.95, 1.05, 0.95] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute w-28 h-28 bg-gradient-to-tr from-primary via-secondary to-primary/80 rounded-full flex items-center justify-center p-0.5 shadow-[0_0_50px_rgba(168,85,247,0.3)]"
              >
                <div className="w-full h-full bg-background rounded-full flex flex-col items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-full blur-md" />
                  <Cpu className="w-8 h-8 text-primary animate-pulse relative z-10" />
                  <span className="text-[8px] font-mono tracking-[0.25em] text-text-secondary mt-1 uppercase relative z-10">LEO-CORE v1.0</span>
                </div>
              </motion.div>

              {/* Floating micro-particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    x: [0, (i % 2 === 0 ? 40 : -40) * Math.sin(i), 0],
                    y: [0, (i % 2 === 0 ? -40 : 40) * Math.cos(i), 0],
                    opacity: [0.2, 0.8, 0.2]
                  }}
                  transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute w-1.5 h-1.5 bg-primary/80 rounded-full blur-xs"
                  style={{
                    top: `${30 + i * 10}%`,
                    left: `${25 + i * 12}%`
                  }}
                />
              ))}
            </div>

            {/* Display telemetry coordinates at bottom */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-text-secondary/60 gap-2">
              <span className="tracking-wider">SYSTEM REGISTRY: CHALDEAN_MATRIX_V1</span>
              <span className="text-primary tracking-widest uppercase">● ACTIVE VEDIC NEURAL SYNC</span>
              <span className="tracking-wider">STATUS: SAFE LEARNING SPACE</span>
            </div>
          </div>
        </div>


        {/* ==================================================
            PART 2 & LIVE SANDBOX — INTERACTIVE SIMULATION
            ================================================== */}
        <div className="mb-28 sm:mb-36 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[9px] uppercase tracking-[0.3em] text-text-secondary font-cinzel block mb-2">
              APPLIED PROTOTYPING
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-text-primary">
              Vedic AI Sandbox Explorer
            </h3>
            <p className="text-text-secondary text-sm font-sans mt-2 max-w-xl mx-auto">
              Test drive our upcoming educational AI tools by switching tabs. Observe basic structural calculations in real-time.
            </p>
            <div className="w-16 h-[1px] bg-secondary/30 mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left selector: Feature Cards */}
            <div className="lg:col-span-5 space-y-4">
              {CAPABILITIES.map((cap) => {
                const isActive = cap.id === activeTab;
                return (
                  <button
                    key={cap.id}
                    onClick={() => setActiveTab(cap.id)}
                    className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-start gap-4 cursor-pointer ${
                      isActive 
                        ? 'border-secondary/40 bg-card shadow-[0_4px_20px_rgba(168,85,247,0.05)]' 
                        : 'border-border/10 bg-card/40 hover:border-border/20'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isActive ? 'bg-secondary/10 text-primary border border-secondary/20' : 'bg-background text-text-secondary'
                    }`}>
                      {cap.icon}
                    </div>

                    <div className="space-y-1.5 flex-grow">
                      <div className="flex justify-between items-center">
                        <h4 className={`text-sm font-bold font-cinzel tracking-wide transition-colors ${
                          isActive ? 'text-primary' : 'text-text-primary'
                        }`}>
                          {cap.title}
                        </h4>
                        <span className={`text-[8px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full ${
                          cap.badge === 'Beta' 
                            ? 'bg-primary/10 text-primary border border-primary/20' 
                            : 'bg-background text-text-secondary border border-border/10'
                        }`}>
                          {cap.badge}
                        </span>
                      </div>
                      <p className="text-text-secondary text-xs font-light leading-relaxed">
                        {cap.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right block: Live Interactive Sandbox Terminal */}
            <div className="lg:col-span-7 bg-card border border-secondary/20 rounded-[2.5rem] p-6 sm:p-10 shadow-2xl relative">
              <div className="absolute top-4 right-6 flex items-center gap-1.5 text-[9px] font-mono text-text-secondary">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>SANDBOX MODE</span>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold font-cinzel text-text-primary mb-2">
                    Try {selectedCap.title}
                  </h4>
                  <p className="text-text-secondary text-xs font-sans leading-relaxed">
                    This interactive terminal simulates deep mathematical analysis of name strings, dates of birth, and electronic device codes. Input parameters below.
                  </p>
                </div>

                <form onSubmit={handleSimulate} className="space-y-4">
                  {selectedCap.id !== 'wisdom' ? (
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={sandboxInput}
                        onChange={(e) => setSandboxInput(e.target.value)}
                        placeholder={selectedCap.placeholder}
                        className="w-full bg-background border border-border/10 rounded-xl px-5 py-4 text-sm text-text-primary placeholder-text-secondary/50 focus:outline-none focus:border-secondary/40 transition-colors"
                      />
                      <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary/60" />
                    </div>
                  ) : (
                    <div className="bg-background border border-border/10 rounded-xl p-4 text-center text-xs text-text-secondary">
                      Celestial vibrations are pre-calculated for today's planetary alignments. Just hit generate below.
                    </div>
                  )}

                  <div className="flex gap-3 justify-end">
                    <button
                      type="submit"
                      disabled={isSimulating}
                      className="inline-flex items-center gap-2 bg-primary text-background font-extrabold uppercase tracking-wider text-[10px] px-6 py-3.5 rounded-xl shadow-lg hover:opacity-90 transition-all disabled:opacity-50 cursor-pointer"
                    >
                      {isSimulating ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Syncing Grids...</span>
                        </>
                      ) : (
                        <>
                          <Cpu className="w-3.5 h-3.5" />
                          <span>Generate AI Insight</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Animated Output Window */}
                <AnimatePresence mode="wait">
                  {sandboxResponse && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="bg-background border border-border/15 rounded-2xl p-6 text-left font-mono text-[11px] sm:text-xs leading-relaxed space-y-3 shadow-inner relative overflow-hidden"
                    >
                      {/* Abstract decorative layout code border */}
                      <div className="absolute right-2 top-2 text-[8px] text-text-secondary/40 select-none">
                        JSON_RESP_OK
                      </div>
                      <p className="text-text-primary whitespace-pre-line">
                        {sandboxResponse}
                      </p>
                      
                      {/* Educational disclaimer notice */}
                      <div className="pt-3 border-t border-border/10 flex items-start gap-2 text-[10px] text-primary font-sans leading-relaxed">
                        <Info className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>
                          <strong>Educational Note:</strong> This output is an automated calculation based on Chaldean matrices. To resolve personal issues or establish high-stakes branding alignments, always refer to an official personalized consultation.
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>


        {/* ==================================================
            PART 3 — HOW AI WORKS (Four-Step Interactive Timeline)
            ================================================== */}
        <div className="mb-28 sm:mb-36">
          <div className="text-center mb-16">
            <span className="text-[9px] uppercase tracking-[0.3em] text-text-secondary font-cinzel block mb-2">
              OPERATIONAL CYCLE
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-cinzel text-text-primary">
              Vedic AI Synergy Loop
            </h3>
            <p className="text-text-secondary text-sm font-sans mt-2 max-w-xl mx-auto">
              Our workflows seamlessly connect automated educational tools with human mentorship to ensure deep, accurate life alignment.
            </p>
            <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto mt-4" />
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Center connector line for desktop */}
            <div className="absolute top-[50%] left-6 right-6 h-[1px] bg-border/10 hidden lg:block z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {[
                { step: "01", title: "Ask a Question", desc: "Input date of birth, name spellings, or mobile codes into our sandbox companion." },
                { step: "02", title: "Educational Insights", desc: "Our neural grids map compound vibrational values and display basic planetary balances." },
                { step: "03", title: "Understand Concepts", desc: "Review simple structural rules, study Lo Shu planes, and prepare structural questions." },
                { step: "04", title: "Personal Guidance", desc: "Book an elite personal consultation with Raajeev Singh Chauhann to receive bespoke remedies." }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-card/40 border border-border/10 rounded-2xl p-6 text-left flex flex-col justify-between h-full"
                >
                  <div className="space-y-4">
                    <span className="font-cinzel text-sm font-bold text-primary block tracking-widest uppercase">
                      STEP {item.step}
                    </span>
                    <h4 className="text-base font-bold text-text-primary font-cinzel tracking-wide">
                      {item.title}
                    </h4>
                    <p className="text-text-secondary text-xs font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  {idx < 3 && (
                    <div className="mt-6 flex justify-end">
                      <ChevronRight className="w-4 h-4 text-text-secondary/30 hidden lg:block" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* ==================================================
            PART 4 — WHY HUMAN GUIDANCE STILL MATTERS
            ================================================== */}
        <div className="mb-28 sm:mb-36">
          <div className="text-center mb-16">
            <span className="text-[9px] uppercase tracking-[0.3em] text-text-secondary font-cinzel block mb-2">
              ETHICAL BOUNDARIES
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-cinzel text-text-primary">
              Why Human Guidance Still Matters
            </h3>
            <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Column 1: AI Utility */}
            <div className="bg-card/60 border border-secondary/15 rounded-3xl p-8 text-left shadow-xl space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary">
                  <Cpu className="w-4 h-4" />
                </div>
                <h4 className="text-lg font-bold font-cinzel text-text-primary tracking-wide">
                  AI Educational Scope
                </h4>
              </div>

              <div className="space-y-3.5 text-xs text-text-secondary">
                {COMPARISONS.map((comp, idx) => (
                  <div key={idx} className="flex gap-3 items-start font-sans">
                    <span className="text-secondary font-bold shrink-0 mt-0.5 font-cinzel">✓</span>
                    <p className="leading-relaxed">{comp.ai}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Expert Consultation */}
            <div className="bg-card border border-primary/20 rounded-3xl p-8 text-left shadow-2xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[100px] pointer-events-none" />
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <UserCheck className="w-4 h-4" />
                </div>
                <h4 className="text-lg font-bold font-cinzel text-primary tracking-wide">
                  Vedic Expert Advisory
                </h4>
              </div>

              <div className="space-y-3.5 text-xs text-text-secondary">
                {COMPARISONS.map((comp, idx) => (
                  <div key={idx} className="flex gap-3 items-start font-sans">
                    <span className="text-primary font-bold shrink-0 mt-0.5">✦</span>
                    <p className="leading-relaxed">{comp.human}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>


        {/* ==================================================
            PART 5 — FUTURE AI TOOLS ROADMAP
            ================================================== */}
        <div className="mb-28 sm:mb-36">
          <div className="text-center mb-16">
            <span className="text-[9px] uppercase tracking-[0.3em] text-text-secondary font-cinzel block mb-2">
              DEVELOPMENT TIMELINE
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-cinzel text-text-primary">
              Our Future AI Roadmap
            </h3>
            <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {ROADMAP_PHASES.map((item, idx) => (
              <div
                key={idx}
                className="bg-card/30 border border-border/10 hover:border-secondary/20 p-6 rounded-2xl text-left transition-all duration-300 flex flex-col justify-between h-full"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono text-secondary font-bold uppercase tracking-wider">{item.phase}</span>
                    <span className={`text-[8px] uppercase tracking-widest font-extrabold px-2.5 py-0.5 rounded-full border ${item.color}`}>
                      {item.status}
                    </span>
                  </div>
                  <h4 className="text-base font-bold font-cinzel text-text-primary">{item.title}</h4>
                  <p className="text-text-secondary text-xs font-light leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* ==================================================
            PART 6 — PERSONAL DASHBOARD PREVIEW (Luxury Glassmorphism Mockup)
            ================================================== */}
        <div className="mb-28 sm:mb-36">
          <div className="text-center mb-16">
            <span className="text-[9px] uppercase tracking-[0.3em] text-text-secondary font-cinzel block mb-2">
              USER EXPANSION
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-cinzel text-text-primary">
              Spiritual Intelligence Dashboard Preview
            </h3>
            <p className="text-text-secondary text-sm font-sans mt-2">
              An elegant preview of our centralized dashboard for course materials, saved reports, and live webinar syncs.
            </p>
            <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto mt-4" />
          </div>

          {/* Large dashboard preview mockup container */}
          <div className="max-w-5xl mx-auto bg-card border border-border/20 rounded-[3rem] p-4 sm:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-44 h-44 bg-secondary/5 blur-3xl rounded-full pointer-events-none" />
            
            {/* Sub-header mock navbar */}
            <div className="flex flex-col sm:flex-row justify-between items-center pb-6 mb-6 border-b border-border/10 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <User className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] text-text-secondary block uppercase font-bold tracking-wider">Welcome Back</span>
                  <span className="text-xs font-bold font-cinzel text-text-primary block">Aditya Vardhan</span>
                </div>
              </div>

              {/* Status metrics bar */}
              <div className="flex gap-4 text-left">
                <div className="bg-background px-3 py-1.5 rounded-xl border border-border/10 text-[10px] font-mono">
                  <span className="text-text-secondary block">DESTINY NODE</span>
                  <span className="text-primary font-bold">VIBRATION 5 (BUDHA)</span>
                </div>
                <div className="bg-background px-3 py-1.5 rounded-xl border border-border/10 text-[10px] font-mono">
                  <span className="text-text-secondary block">ALIGNED SPELLING</span>
                  <span className="text-emerald-500 font-bold">VERIFIED SIGNATURE</span>
                </div>
              </div>
            </div>

            {/* Dashboard widgets grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-left">
              
              {/* Left sidebar widget: Today's Reflection */}
              <div className="md:col-span-4 space-y-6">
                
                {/* Today's Reflection */}
                <div className="bg-gradient-to-tr from-secondary/5 to-card border border-secondary/10 p-5 rounded-2xl">
                  <div className="flex items-center gap-2 text-secondary mb-3">
                    <Flame className="w-4 h-4" />
                    <span className="text-[9px] uppercase tracking-wider font-extrabold">Today's Reflection</span>
                  </div>
                  <p className="text-text-secondary text-xs leading-relaxed font-light">
                    "Energy expands where attention flows. Align your compound numbers before launching key trade agreements today."
                  </p>
                </div>

                {/* Saved Reports widget */}
                <div className="bg-background border border-border/10 p-5 rounded-2xl space-y-3">
                  <span className="text-[9px] text-text-secondary uppercase tracking-wider block font-bold">Saved Vedic Audits</span>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center bg-card p-2 rounded-lg border border-border/5">
                      <span className="text-text-primary truncate font-mono">Aditya_ChaldeanGrid.pdf</span>
                      <span className="text-[9px] text-emerald-500 uppercase font-bold">Active</span>
                    </div>
                    <div className="flex justify-between items-center bg-card p-2 rounded-lg border border-border/5">
                      <span className="text-text-secondary truncate font-mono">EnterpriseSpelling_v2.pdf</span>
                      <span className="text-[9px] text-text-secondary uppercase">Consulted</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Center Main widget: Course Progress & Webinars */}
              <div className="md:col-span-8 space-y-6">
                
                {/* Course Progress */}
                <div className="bg-background/20 border border-border/10 p-6 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-text-secondary uppercase tracking-wider font-bold">Active Learning</span>
                    <span className="text-xs text-primary font-mono font-bold">64% Completed</span>
                  </div>
                  <div className="space-y-2">
                    <h5 className="text-sm font-bold font-cinzel text-text-primary">Chaldean Numerology & Compound Vibrations</h5>
                    <div className="w-full bg-card h-1.5 rounded-full overflow-hidden">
                      <div className="bg-primary h-full w-[64%]" />
                    </div>
                  </div>
                </div>

                {/* Upcoming Webinar Sync widget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Webinar */}
                  <div className="bg-background border border-border/10 p-5 rounded-2xl flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-primary text-[9px] uppercase tracking-wider font-bold mb-2">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Live Session</span>
                      </div>
                      <h6 className="text-xs font-bold text-text-primary mb-1">Chaldean Planetary Dashas</h6>
                      <span className="text-[10px] text-text-secondary block">October 24, 7:00 PM IST</span>
                    </div>
                    <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-text-primary text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 pt-3 cursor-pointer">
                      <span>Launch Stream</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>

                  {/* Consultation History */}
                  <div className="bg-background border border-border/10 p-5 rounded-2xl flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-secondary text-[9px] uppercase tracking-wider font-bold mb-2">
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Consultation History</span>
                      </div>
                      <h6 className="text-xs font-bold text-text-primary mb-1">Elite Premium Correction</h6>
                      <span className="text-[10px] text-text-secondary block">Completed by Raajeev Singh</span>
                    </div>
                    <span className="text-emerald-500 text-[10px] font-bold uppercase tracking-wider block pt-3">
                      ✓ Remedial Seal Applied
                    </span>
                  </div>

                </div>

              </div>

            </div>
          </div>
        </div>


        {/* ==================================================
            PART 7 — PRIVACY & RESPONSIBLE AI
            ================================================== */}
        <div className="mb-28 sm:mb-32">
          <div className="text-center mb-16">
            <span className="text-[9px] uppercase tracking-[0.3em] text-text-secondary font-cinzel block mb-2">
              SECURITY STANDARDS
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-cinzel text-text-primary">
              Built with Privacy, Transparency & Responsibility
            </h3>
            <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: <Lock className="w-4 h-4 text-secondary" />,
                title: "Information Remains Secure",
                desc: "Your date of birth, mobile codes, and names are encrypted and never traded with marketing registries."
              },
              {
                icon: <Info className="w-4 h-4 text-primary" />,
                title: "Educational Guidance Only",
                desc: "Our automated models map mathematical grids. They do not predict timelines or dictate lifestyle decisions."
              },
              {
                icon: <UserCheck className="w-4 h-4 text-emerald-500" />,
                title: "Human-Led Consultations",
                desc: "High-stakes naming corrections and Vastu alignments remain supervised directly by expert mentors."
              },
              {
                icon: <ShieldCheck className="w-4 h-4 text-blue-500" />,
                title: "You Stay in Control",
                desc: "You maintain sovereign ownership of your parameters and can request absolute record purge at any time."
              }
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-card border border-border/10 p-6 rounded-2xl text-left space-y-3"
              >
                <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center">
                  {card.icon}
                </div>
                <h4 className="text-sm font-bold font-cinzel text-text-primary">{card.title}</h4>
                <p className="text-text-secondary text-xs font-light leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>


        {/* ==================================================
            PART 8 — JOIN THE FUTURE (Call to Action Waitlist Box)
            ================================================== */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-tr from-secondary/5 via-card to-card border border-secondary/30 rounded-[3rem] p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl text-center">
            
            {/* Ambient Purple radial backdrop */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-secondary/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/20 px-3.5 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-secondary animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-secondary font-bold">
                  BETA ENTRY WAITING LIST
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-cinzel text-text-primary leading-tight">
                Be Among the First to Experience <br />AI Spiritual Intelligence
              </h3>

              <p className="text-text-secondary text-xs sm:text-sm leading-relaxed font-light">
                Join our early access community and receive regular alerts regarding upcoming computational updates, educational features, and priority alpha-testing registries.
              </p>

              {/* Waitlist submission form */}
              <div className="max-w-md mx-auto pt-4">
                <AnimatePresence mode="wait">
                  {!waitlistSuccess ? (
                    <motion.form
                      key="form"
                      onSubmit={handleWaitlistSubmit}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col sm:flex-row gap-2"
                    >
                      <input
                        type="email"
                        required
                        value={waitlistEmail}
                        onChange={(e) => setWaitlistEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="flex-grow bg-background border border-border/10 rounded-xl px-4 py-3 text-xs text-text-primary placeholder-text-secondary/50 focus:outline-none focus:border-secondary/40 transition-colors"
                      />
                      <button
                        type="submit"
                        className="py-3 px-6 bg-primary text-background font-extrabold uppercase tracking-wider text-[10px] rounded-xl shadow-lg hover:opacity-90 transition-all cursor-pointer"
                      >
                        Join Waitlist
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl text-center text-xs text-emerald-400"
                    >
                      ✦ Awesome! You have been prioritized for beta testing. Stay tuned to your inbox.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Secondary links */}
              <div className="flex flex-wrap justify-center gap-4 pt-6 text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-primary flex items-center gap-1.5 transition-colors cursor-pointer">
                  <PhoneCall className="w-3.5 h-3.5 text-primary" />
                  <span>Book Consultation</span>
                </a>
                <span className="text-border/10">|</span>
                <a href="/academy" className="hover:text-secondary flex items-center gap-1.5 transition-colors cursor-pointer">
                  <BookOpen className="w-3.5 h-3.5 text-secondary" />
                  <span>Explore Academy Courses</span>
                </a>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
