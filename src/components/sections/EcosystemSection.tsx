import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Network, GraduationCap, Cpu, Search, Users, BookOpen, Calendar, Film, User, 
  Smartphone, Award, Library, Mic, ExternalLink, Globe, ArrowRight, Heart, 
  Sparkles, Shield, Bookmark, Flame, MessageSquare, ChevronRight, CheckCircle, 
  TrendingUp, Star, Lightbulb, Compass, Share2, ArrowUpRight, Zap
} from 'lucide-react';
import SmartImage from './SmartImage';
import { SOCIAL_LINKS } from '../../constants/contacts';
import { BrandRegistry } from '../../config/brandRegistry';
import { Assets } from '../../config/assets';

// ==========================================
// DATA STRUCTURES
// ==========================================

interface EcosystemNode {
  id: string;
  label: string;
  category: string;
  description: string;
  details: string;
  isFuture?: boolean;
  icon: React.ComponentType<any>;
}

const ECOSYSTEM_NODES: EcosystemNode[] = [
  { id: 'academy', label: 'Learning Academy', category: 'Education', description: 'Certified curriculums in Astro-Numerology & Vastu.', details: 'The premier educational wing of LEO Family, offering comprehensive offline and online masterclasses, verified certifications, and complete study workbooks.', icon: GraduationCap },
  { id: 'consultations', label: 'Personal Consultations', category: 'Services', description: 'Elite private remedial counseling with Raajeev Singh.', details: 'Private 1-on-1 consultations for industry leaders, celebrities, and corporate structures looking to align name spellings, mobile frequencies, and residential layouts.', icon: Heart },
  { id: 'ai', label: 'AI Spiritual Platform', category: 'Technology', description: 'Instant planetary alignment & number calculations.', details: 'Combining sacred ancient formulas with responsive state-of-the-art computational intelligence to provide real-time guidance reports.', icon: Cpu },
  { id: 'research', label: 'Research Institute', category: 'Science', description: 'Scientific verification of ancient vibrations.', details: 'Analyzing correlations between celestial transits, numerical frequencies, and real-life outcomes using empirical case studies of 10,000+ consults.', icon: Search },
  { id: 'community', label: 'Global Community', category: 'Network', description: 'Active practitioners spanning 10+ countries.', details: 'A nurturing collective where graduates, clients, and spiritual seekers collaborate, share remedial feedback, and grow together.', icon: Users },
  { id: 'books', label: 'Books & Guides', category: 'Library', description: 'Core textbooks and spatial layout blueprints.', details: 'Authored texts by Raajeev Singh Chauhann including "The Master of Destiny" and various interactive study materials.', icon: BookOpen },
  { id: 'events', label: 'Events & Seminars', category: 'Public', description: 'High-impact physical gatherings and retreats.', details: 'Annual retreats, corporate workshops, and live energetic initiations conducted in premium global locations.', icon: Calendar },
  { id: 'films', label: 'LEO Family Indian Films', category: 'Media', description: 'Cinematic storytelling with spiritual values.', details: 'Promoting human truth, Vedic philosophy, and emotional depth through mainstream commercial Indian cinema led by the founder.', icon: Film },
  { id: 'founder', label: 'Founder Portfolio', category: 'Personal', description: 'The personal space of Raajeev Singh Chauhann.', details: 'Access direct updates, personal blogs, direct wisdom drops, and schedule premium custom master sessions.', icon: User },
  { id: 'mobile', label: 'Mobile App', category: 'Future', description: 'Daily calculations & push remedies at your fingertips.', details: 'Our upcoming native application featuring interactive grid charts, daily planet hours tracker, and customized numerical focus.', isFuture: true, icon: Smartphone },
  { id: 'certification', label: 'Global Certification', category: 'Education', description: 'Aura of credibility for occult practitioners.', details: 'Legally backed, academically rigorous certification standardizing predictive mathematics across Vastu and Astro sciences.', icon: Award },
  { id: 'network', label: 'Student Network', category: 'Education', description: 'Dedicated alumni dashboard and practice group.', details: 'An exclusive workspace containing interactive charts, peer feedback, and continuous mentorship boards.', icon: Network },
  { id: 'knowledge', label: 'Knowledge Library', category: 'Library', description: 'A vast repository of recorded lectures & articles.', details: 'Stream 100+ hours of video lessons, read academic articles, and download remedial templates compiled over 15 years.', icon: Library },
  { id: 'podcast', label: 'Podcast Channels', category: 'Future', description: 'Weekly cosmic talks with global thought leaders.', details: 'Bridging modern entrepreneurship, scientific discoveries, and spiritual alignment in audio series format.', isFuture: true, icon: Mic }
];

interface PlatformCard {
  title: string;
  url: string;
  description: string;
  category: string;
  image: string;
}

const PLATFORM_CARDS: PlatformCard[] = [
  {
    title: "Main LEO Family Website",
    url: SOCIAL_LINKS.websites.main,
    description: "The digital mothership housing certified courses, elite consultations, and our interactive calculations workspace.",
    category: "Official Portal",
    image: "/gemstone-assets/background.png"
  },
  {
    title: "Raajeev Singh Chauhann Portal",
    url: SOCIAL_LINKS.websites.founder,
    description: "Personal portfolio, acting archives, directorial filmography, and scheduling platform for high-impact leadership consultations.",
    category: "Founder Portal",
    image: Assets.founder.image
  },
  {
    title: "LEO Family Indian Films",
    url: SOCIAL_LINKS.websites.films,
    description: "Step into our cinematic universe. Highlighting our upcoming commercial feature films, creative scripts, and human stories.",
    category: "Media Wing",
    image: "/gemstone-assets/background.png"
  },
  {
    title: "LEO Family Occult Gyan",
    url: SOCIAL_LINKS.youtube.main,
    description: "Our primary YouTube channel containing 200+ detailed educational videos about Astro, Vastu Shastra, and Mobile remedies.",
    category: "YouTube Education",
    image: "/gemstone-assets/background.png"
  },
  {
    title: "Raajeev Singh Chauhann Speeches",
    url: SOCIAL_LINKS.youtube.founder,
    description: "Official video repository of the founder's keynotes, TV appearances, and high-energy live meditation sessions.",
    category: "YouTube Personal",
    image: Assets.founder.image
  },
  {
    title: "LEO Family Films Official",
    url: SOCIAL_LINKS.youtube.films,
    description: "Teasers, trailers, musical launches, and behind-the-scenes content of commercial movies crafted under LEO Family's production.",
    category: "YouTube Cinema",
    image: "/gemstone-assets/background.png"
  },
  {
    title: "Official Facebook Community",
    url: SOCIAL_LINKS.facebook,
    description: "Connect with 50,000+ active seekers. Daily calculation discussions, immediate remedy feedback, and organic live Q&As.",
    category: "Social Network",
    image: "/gemstone-assets/background.png"
  }
];

interface MapPoint {
  x: number; // SVG coordinates (0-800)
  y: number; // SVG coordinates (0-500)
  name: string;
  role: string;
  students: string;
}

const MAP_POINTS: MapPoint[] = [
  { x: 450, y: 220, name: "Mumbai (HQ)", role: "Core Administrative Center", students: "12,500+" },
  { x: 390, y: 190, name: "Dubai", role: "Middle East Corporate Chapter", students: "1,200+" },
  { x: 280, y: 110, name: "London", role: "UK & European Learning Hub", students: "950+" },
  { x: 150, y: 140, name: "New York", role: "North American Chapter", students: "1,500+" },
  { x: 620, y: 310, name: "Sydney", role: "Oceania Practitioner Network", students: "600+" },
  { x: 550, y: 160, name: "Singapore", role: "Southeast Asian Hub", students: "800+" }
];

interface ExperienceCard {
  title: string;
  description: string;
  type: string;
  image: string;
  date: string;
}

const COMMUNITY_EXPERIENCES: ExperienceCard[] = [
  {
    title: "Weekly Occult Gyan Webinars",
    description: "Join our Sunday interactive masterclasses mapping upcoming solar transits and real-world calculation remedies.",
    type: "Online Webinar",
    image: "/gemstone-assets/background.png",
    date: "Every Sunday, 11 AM IST"
  },
  {
    title: "Vastu Shastra Intensive",
    description: "Dynamic, space-planning workshops on element balancing for residential abundance and commercial high-yield layouts.",
    type: "Live Workshop",
    image: "/gemstone-assets/background.png",
    date: "August 24, 2026 • New Delhi"
  },
  {
    title: "Vibrational Sync Meditations",
    description: "Sound and cosmic frequency meditation classes aligned to customized individual moon phases for ultimate relief.",
    type: "Meditation Session",
    image: "/gemstone-assets/background.png",
    date: "Every Moon Shift (Bi-weekly)"
  },
  {
    title: "Mastery Certification Summit",
    description: "A prestigious 3-day advanced training program for seasoned Astro-Numerologists culminating in global LEO certification.",
    type: "Masterclass",
    image: "/gemstone-assets/background.png",
    date: "October 10-12, 2026 • Mumbai"
  },
  {
    title: "Alumni Remedial Audits",
    description: "A collaborative round-table session analyzing real anonymous client case studies to refine predictive accuracy.",
    type: "Community Discussion",
    image: "/gemstone-assets/background.png",
    date: "First Thursday of Every Month"
  },
  {
    title: "LEO Global Conclave",
    description: "The grand annual gathering of scholars, practitioners, and leaders to discuss Vastu geometry and digital integration.",
    type: "Annual Gathering",
    image: "/gemstone-assets/background.png",
    date: "December 2026 • Dubai"
  }
];

interface PathwayNode {
  title: string;
  label: string;
  subtitle: string;
  description: string;
  graphic: string;
}

const PATHWAY_ROADMAP: PathwayNode[] = [
  { title: "Beginner", label: "01", subtitle: "Cosmic Awareness", description: "Discover standard number frequencies and foundational Vedic symbols. Learn to identify your own core destiny variables.", graphic: "🌱" },
  { title: "Learner", label: "02", subtitle: "Systemic Calculations", description: "Study standard Chaldean and Pythagorean tables. Grasp basic planetary houses and transit behaviors.", graphic: "📚" },
  { title: "Practitioner", label: "03", subtitle: "Remedial Application", description: "Begin formulating basic mobile number suggestions, spatial Vastu corrections, and basic spelling alignments.", graphic: "🛠️" },
  { title: "Advanced Student", label: "04", subtitle: "Synthesis Mastery", description: "Combine Astro-Numerology with high-level elemental layouts to address highly complex multi-generational blocks.", graphic: "⚡" },
  { title: "Certified Member", label: "05", subtitle: "Vetted Occult Professional", description: "Pass our comprehensive predictive exam. Receive legally verified certification and client practice standards.", graphic: "📜" },
  { title: "Mentor", label: "06", subtitle: "Educating Seekers", description: "Lead introductory training labs. Review student calculations and support community Q&A forums.", graphic: "🤝" },
  { title: "Community Leader", label: "07", subtitle: "Chapter Stewardship", description: "Head local regional groups. Conduct live physical audits, local webinars, and foster deep community bonding.", graphic: "🌟" },
  { title: "Future Contributor", label: "08", subtitle: "Ecosystem Pioneer", description: "Collaborate with our research wing to build algorithmic AI engines and expand our global literature library.", graphic: "🚀" }
];

interface ImpactStat {
  value: number;
  label: string;
  suffix: string;
  sub: string;
}

const IMPACT_STATS: ImpactStat[] = [
  { value: 15000, label: "Students Connected", suffix: "+", sub: "Globally Trained" },
  { value: 18, label: "Active Countries", suffix: "+", sub: "Spreading Occult Science" },
  { value: 120000, label: "Learning Hours", suffix: "+", sub: "Digital Video Streams" },
  { value: 8500, label: "Elite Consultations", suffix: "+", sub: "Personal Success Blueprints" },
  { value: 15, label: "Certified Courses", suffix: "+", sub: "Step-by-Step Masterclasses" },
  { value: 250, label: "Live Events Conducted", suffix: "+", sub: "Webinars & Sumits" },
  { value: 1200, label: "Video Lessons", suffix: "+", sub: "High-Fidelity Knowledge Base" },
  { value: 55000, label: "Community Members", suffix: "+", sub: "Thriving Organic Network" },
  { value: 100000, label: "Future AI Users", suffix: "+", sub: "Incepted Platforms" }
];

interface BenefitItem {
  title: string;
  description: string;
  icon: typeof Shield;
}

const MEMBER_BENEFITS: BenefitItem[] = [
  { title: "Exclusive Learning Resources", description: "Access direct worksheets, calculation sheets, and exclusive Vedic manuals reserved strictly for members.", icon: Library },
  { title: "Live Q&A Sessions", description: "Participate in bi-weekly live calculation audits and interactive question portals with senior certified mentors.", icon: MessageSquare },
  { title: "Priority Webinar Access", description: "Receive complimentary reserve tickets to premium seminars, live digital courses, and physical workshops.", icon: Calendar },
  { title: "Private Community", description: "Engage with vetted professionals, share prediction stories, and discover professional practice clients.", icon: Users },
  { title: "Course Updates", description: "Enjoy complimentary, lifetime access to revised study modules, newly discovered case studies, and calculators.", icon: BookOpen },
  { title: "Future AI Access", description: "Secure premium beta credentials for upcoming computational report tools, automated remedies, and transit charts.", icon: Cpu },
  { title: "Digital Certificates", description: "Download blockchain-verified, shares-ready certifications validating your skill in Astro-Numerology.", icon: Award },
  { title: "Networking Opportunities", description: "Collaborate with business leaders, designers, Vastu builders, and fellow occult practitioners worldwide.", icon: Network },
  { title: "Personal Growth", description: "Enjoy continuous support as you transform your career, relationships, and elevate your spiritual energy.", icon: Sparkles }
];

interface FutureMilestone {
  title: string;
  phase: string;
  status: string;
  desc: string;
}

const FUTURE_ROADMAP: FutureMilestone[] = [
  { title: "Consultations & Master Counseling", phase: "Phase I (Established)", status: "Active", desc: "Formulated and deployed elite remedial counseling processes globally. Empowered thousands of business owners and individuals." },
  { title: "LEO Family Learning Academy", phase: "Phase II (Established)", status: "Active", desc: "Structured 12+ online modules, standardizing calculation exams and establishing our accredited occult sciences academy." },
  { title: "AI Spiritual Intelligence", phase: "Phase III (Incepted)", status: "Beta Ready", desc: "Merging celestial algorithms with digital models to support automated chart calculations and rapid-remedy mapping." },
  { title: "Native Mobile Application", phase: "Phase IV (Current)", status: "In Development", desc: "A beautifully polished daily tracking companion offering push-remedies, planetary hour notification overlays, and destiny grids." },
  { title: "Global Accredited Certification", phase: "Phase V (Future)", status: "Q4 2026", desc: "Partnering with international Vedic educational bodies to standardise occult sciences and award official career credentials." },
  { title: "Occult & Vastu Research Institute", phase: "Phase VI (Future)", status: "Q2 2027", desc: "Building a physical repository and database for testing energy alignments, magnetic layout flows, and empirical statistics." },
  { title: "International Retreats & Events", phase: "Phase VII (Future)", status: "Q4 2027", desc: "Initiating luxurious, multi-day energetic alignments and spatial harmony experiences in spiritual regions worldwide." },
  { title: "Vedic Digital University", phase: "Phase VIII (Future)", status: "Q1 2028", desc: "Establishing an accredited global e-learning platform hosting fully scalable baccalaureate and master occult degrees." },
  { title: "LEO Family Global Foundation", phase: "Phase IX (Future)", status: "Visionary Plan", desc: "Establishing structured philanthropic programs offering complimentary counseling, ancient text preservation, and youth schooling." }
];

interface GalleryItem {
  title: string;
  type: string;
  image: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  { title: "Delhi Vastu Mastery Workshop", type: "Workshops", image: "/gemstone-assets/background.png" },
  { title: "Interactive Alumni calculation Roundtable", type: "Students", image: "/gemstone-assets/background.png" },
  { title: "Keynote presentation at Dubai Wellness Summit", type: "Seminars", image: Assets.founder.image },
  { title: "LEO Family Film Premiere Gathering", type: "Events", image: "/gemstone-assets/background.png" },
  { title: "Organic Q&A Streaming Live Classroom", type: "Online Sessions", image: "/gemstone-assets/background.png" },
  { title: "Behind the Scenes of LEO Indian Film Set", type: "Behind the Scenes", image: Assets.founder.image },
  { title: "Global Occult Sciences Future Forum", type: "Future Conferences", image: "/gemstone-assets/background.png" }
];

interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  category: string;
}

const TESTIMONIALS_WALL: TestimonialItem[] = [
  {
    quote: "Joining LEO Family felt like getting a key to my own subconscious. The spelling realignment helped me secure my biggest seed-funding round inside two months.",
    author: "Pranav Shah",
    role: "Tech Entrepreneur • Mumbai",
    category: "Success Stories"
  },
  {
    quote: "The Vastu and calculation textbooks are written with stunning academic precision. No folklore—just practical formulas that yield real, measurable shifts.",
    author: "Dr. Ananya Iyer",
    role: "Occult Academy Graduate",
    category: "Student Quotes"
  },
  {
    quote: "Our mission is to ensure every graduate steps into their professional consulting career with absolute calculations accuracy and ethical counseling standards.",
    author: "Prof. S. R. Sharma",
    role: "Senior Academy Instructor",
    category: "Instructor Messages"
  },
  {
    quote: "Being in the local chapter group gives me a circle of deep thinkers who cross-check my planetary charts and keep me inspired every single day.",
    author: "Miriam Vance",
    role: "Europe Community Lead • London",
    category: "Community Messages"
  },
  {
    quote: "The mobile number recommendations are simply magical. Every business call I receive now seems to convert into high-quality cooperative proposals.",
    author: "Vikram Malhotra",
    role: "Managing Director • Dubai",
    category: "Success Stories"
  },
  {
    quote: "I spent years reading random blogs on numerology. LEO Family's certified course structured my mind, turning a vague hobby into a powerful, credible profession.",
    author: "Elena Petrova",
    role: "Certified Practitioner • Sofia",
    category: "Student Quotes"
  }
];

export default function EcosystemSection() {
  // Interactivity States
  const [selectedNode, setSelectedNode] = useState<EcosystemNode | null>(ECOSYSTEM_NODES[0]);
  const [galleryFilter, setGalleryFilter] = useState<string>("All");
  const [testimonialFilter, setTestimonialFilter] = useState<string>("All");
  const [activeRoadmapStep, setActiveRoadmapStep] = useState<number>(0);
  const [hoveredMapPoint, setHoveredMapPoint] = useState<MapPoint | null>(null);
  const [countState, setCountState] = useState<Record<string, number>>({});

  // Count Up Animation Effect
  useEffect(() => {
    IMPACT_STATS.forEach(stat => {
      let start = 0;
      const end = stat.value;
      const duration = 2500; // ms
      const increment = Math.ceil(end / (duration / 50));
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          start = end;
          clearInterval(timer);
        }
        setCountState(prev => ({ ...prev, [stat.label]: start }));
      }, 50);

      return () => clearInterval(timer);
    });
  }, []);

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden" id="leo-ecosystem-experience">
      
      {/* Cinematic Glowing Background Accents */}
      <div className="absolute top-[5%] left-[10%] w-[600px] h-[600px] bg-primary/5 blur-[160px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-secondary/5 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="container mx-auto px-6 space-y-24 lg:space-y-36 relative">

        {/* ==========================================
            SECTION TITLE
            ========================================== */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em] border border-primary/20"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Occult Movement</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-6xl font-extrabold font-cinzel tracking-tight text-text-primary"
          >
            Welcome to the LEO Family Ecosystem
          </motion.h2>

          <p className="text-sm font-black tracking-widest text-primary uppercase font-mono">
            One Vision. One Community. Unlimited Learning.
          </p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-text-secondary leading-relaxed max-w-3xl mx-auto font-light"
          >
            Join thousands of learners connected through authentic knowledge, modern technology, continuous education, and lifelong personal growth. We bridge ancestral Vedas and futuristic computation to empower your cosmic path.
          </motion.p>
        </div>


        {/* ==========================================
            PART 1 — ECOSYSTEM VISUAL (Interactive Nodes Map)
            ========================================== */}
        <div className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="font-cinzel text-xs font-bold uppercase tracking-[0.3em] text-primary">Interconnections</h3>
            <h4 className="text-2xl lg:text-3xl font-extrabold font-cinzel text-text-primary">Ecosystem Interaction Map</h4>
            <p className="text-xs text-text-secondary">Click on any peripheral node to expand its core functions in our operational blueprint.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
            
            {/* Left: Dynamic interactive network nodes */}
            <div className="lg:col-span-7 flex justify-center py-6 relative">
              
              {/* Outer boundary circles for cosmic aesthetic */}
              <div className="absolute inset-4 rounded-full border border-primary/10 pointer-events-none" />
              <div className="absolute inset-16 rounded-full border border-dashed border-secondary/15 pointer-events-none" />

              <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
                
                {/* Connecting SVG Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 500 500">
                  {ECOSYSTEM_NODES.map((node, idx) => {
                    const angle = (idx * 360) / ECOSYSTEM_NODES.length;
                    const r = 180; // Distance radius
                    const x2 = 250 + r * Math.cos((angle * Math.PI) / 180);
                    const y2 = 250 + r * Math.sin((angle * Math.PI) / 180);
                    const isSelected = selectedNode?.id === node.id;

                    return (
                      <g key={node.id}>
                        {/* Glow line under selected node path */}
                        <motion.line
                          x1="250"
                          y1="250"
                          x2={x2}
                          y2={y2}
                          stroke={isSelected ? "var(--primary)" : "var(--border)"}
                          strokeWidth={isSelected ? "2" : "0.75"}
                          strokeOpacity={isSelected ? "0.8" : "0.25"}
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1 }}
                        />
                        {isSelected && (
                          <circle cx={x2} cy={y2} r="18" fill="var(--primary)" opacity="0.15" className="animate-ping" style={{ transformOrigin: `${x2}px ${y2}px` }} />
                        )}
                      </g>
                    );
                  })}
                </svg>

                {/* Center Node (LEO Family) */}
                <div className="relative z-10 w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-tr from-primary to-accent text-white flex flex-col items-center justify-center text-center p-3 shadow-2xl border-4 border-background select-none">
                  <Network className="w-6 h-6 animate-pulse mb-1" />
                  <span className="text-[10px] font-black tracking-widest font-cinzel leading-tight">LEO FAMILY</span>
                  <span className="text-[6px] tracking-wide opacity-80 uppercase font-mono mt-0.5">Global Core</span>
                </div>

                {/* Peripheral Nodes */}
                {ECOSYSTEM_NODES.map((node, idx) => {
                  const angle = (idx * 360) / ECOSYSTEM_NODES.length;
                  const r = 180; // Distance radius
                  const x = r * Math.cos((angle * Math.PI) / 180);
                  const y = r * Math.sin((angle * Math.PI) / 180);
                  const isSelected = selectedNode?.id === node.id;
                  const NodeIcon = node.icon;

                  return (
                    <motion.button
                      key={node.id}
                      onClick={() => setSelectedNode(node)}
                      whileHover={{ scale: 1.15 }}
                      className="absolute w-10 h-10 md:w-11 md:h-11 rounded-full border flex items-center justify-center cursor-pointer shadow-md transition-all z-20"
                      style={{
                        transform: `translate(${x}px, ${y}px)`,
                        backgroundColor: isSelected ? 'var(--primary)' : 'var(--card)',
                        borderColor: isSelected ? 'var(--primary)' : 'var(--border)',
                        boxShadow: isSelected ? '0 0 15px var(--primary)' : '0 2px 6px rgba(0,0,0,0.06)'
                      }}
                      title={node.label}
                    >
                      <NodeIcon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-primary'}`} />
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Right: Selected Node Details Board */}
            <div className="lg:col-span-5">
              <AnimatePresence mode="wait">
                {selectedNode && (
                  <motion.div
                    key={selectedNode.id}
                    initial={{ opacity: 0, x: 25 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -25 }}
                    className="p-6 md:p-8 bg-card rounded-3xl border border-border/20 shadow-2xl relative overflow-hidden text-left"
                  >
                    {/* Decorative aura corner */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                        {React.createElement(selectedNode.icon, { className: "w-5 h-5" })}
                      </div>
                      <div>
                        <span className="text-[9px] font-mono font-bold tracking-widest text-primary uppercase bg-primary/10 px-2 py-0.5 rounded-full">
                          {selectedNode.category}
                        </span>
                        <h4 className="text-xl font-bold font-cinzel text-text-primary mt-0.5">
                          {selectedNode.label}
                        </h4>
                      </div>
                    </div>

                    <p className="text-xs font-bold text-text-secondary uppercase tracking-widest border-b border-border/10 pb-2 mb-3">
                      {selectedNode.description}
                    </p>
                    <p className="text-sm text-text-secondary leading-relaxed mb-6">
                      {selectedNode.details}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-border/10">
                      <span className="text-[10px] text-text-secondary font-mono">
                        {selectedNode.isFuture ? "🔮 Phase IV Deployment" : "✅ Core Integrated"}
                      </span>
                      <button className="flex items-center gap-1 text-[10px] font-black text-primary uppercase tracking-widest hover:translate-x-1 transition-transform cursor-pointer">
                        <span>Access Portal</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>


        {/* ==========================================
            PART 2 — OUR DIGITAL WORLD (Official Platform Cards)
            ========================================== */}
        <div className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="font-cinzel text-xs font-bold uppercase tracking-[0.3em] text-primary">Verified Spaces</h3>
            <h4 className="text-3xl lg:text-4xl font-extrabold font-cinzel text-text-primary">Our Digital World</h4>
            <p className="text-lg text-text-secondary font-light">Official web properties, streaming academy classrooms, and media pages.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {PLATFORM_CARDS.map((card, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -8, border: "1px solid var(--primary)" }}
                className="bg-card rounded-2xl border border-border/20 overflow-hidden flex flex-col justify-between shadow-lg text-left"
              >
                <div>
                  <div className="h-44 relative overflow-hidden bg-primary/5">
                    <SmartImage
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                    <span className="absolute bottom-3 left-4 text-[9px] font-black tracking-widest uppercase text-white bg-primary/80 px-2 py-0.5 rounded">
                      {card.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <h5 className="text-base font-bold font-cinzel text-text-primary leading-snug">
                      {card.title}
                    </h5>
                    <p className="text-xs text-text-secondary leading-relaxed font-light">
                      {card.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-border/10 mt-2 bg-primary/5 flex items-center justify-between">
                  <span className="text-[10px] text-text-secondary font-mono truncate max-w-[150px]">
                    {card.url}
                  </span>
                  <a
                    href={card.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[10px] font-black text-primary uppercase tracking-widest hover:text-primary-dark cursor-pointer"
                  >
                    <span>Visit Site</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>


        {/* ==========================================
            PART 3 — GLOBAL COMMUNITY (Interactive SVG World Map)
            ========================================== */}
        <div className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="font-cinzel text-xs font-bold uppercase tracking-[0.3em] text-primary">Territory</h3>
            <h4 className="text-3xl lg:text-4xl font-extrabold font-cinzel text-text-primary">Global Presence</h4>
            <p className="text-lg text-text-secondary font-light">Hover over our active hubs to check student densities and leadership teams.</p>
          </div>

          <div className="relative max-w-5xl mx-auto border border-border/15 rounded-[3rem] bg-card/25 backdrop-blur-md p-6 lg:p-10 overflow-hidden">
            
            {/* World Map SVG background */}
            <div className="relative w-full aspect-[16/9] bg-background/5 rounded-2xl p-4 flex items-center justify-center">
              <svg className="w-full h-full text-text-secondary/10" viewBox="0 0 800 500" fill="none">
                
                {/* Continents outline paths */}
                <path d="M100 150 Q150 80 260 110 T320 220 T180 340 Z" fill="currentColor" opacity="0.35" />
                <path d="M400 90 Q490 70 560 110 T600 230 T480 320 Z" fill="currentColor" opacity="0.35" />
                <path d="M520 290 Q580 260 660 320 T700 420 Z" fill="currentColor" opacity="0.35" />
                <path d="M160 330 Q200 310 260 350 T290 460 Z" fill="currentColor" opacity="0.35" />

                {/* Connectors */}
                <motion.path 
                  d="M 450,220 Q 350,150 280,110" 
                  stroke="var(--primary)" 
                  strokeWidth="1" 
                  strokeDasharray="4,4"
                  fill="none" 
                  animate={{ strokeDashoffset: [0, -20] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
                />
                <motion.path 
                  d="M 450,220 Q 500,180 550,160" 
                  stroke="var(--primary)" 
                  strokeWidth="1" 
                  strokeDasharray="4,4"
                  fill="none" 
                  animate={{ strokeDashoffset: [0, 20] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                />
                <motion.path 
                  d="M 450,220 Q 300,100 150,140" 
                  stroke="var(--primary)" 
                  strokeWidth="1.2" 
                  strokeDasharray="4,4"
                  fill="none" 
                  animate={{ strokeDashoffset: [0, -30] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                />

                {/* Highlight Points */}
                {MAP_POINTS.map((pt, idx) => (
                  <g 
                    key={idx}
                    onMouseEnter={() => setHoveredMapPoint(pt)}
                    onMouseLeave={() => setHoveredMapPoint(null)}
                    className="cursor-pointer group"
                  >
                    <circle cx={pt.x} cy={pt.y} r="6" fill="var(--primary)" />
                    <circle cx={pt.x} cy={pt.y} r="14" stroke="var(--primary)" strokeWidth="1" fill="none" className="animate-ping" style={{ transformOrigin: `${pt.x}px ${pt.y}px`, animationDuration: '3s' }} />
                  </g>
                ))}
              </svg>

              {/* Float Map Point Info card */}
              <AnimatePresence>
                {hoveredMapPoint && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute bg-card border border-primary/30 p-4.5 rounded-xl shadow-2xl text-left max-w-[240px] z-30"
                    style={{
                      left: `${(hoveredMapPoint.x / 800) * 100}%`,
                      top: `${(hoveredMapPoint.y / 500) * 100 - 15}%`,
                      transform: 'translate(-50%, -100%)'
                    }}
                  >
                    <h6 className="text-xs font-bold font-cinzel text-text-primary">{hoveredMapPoint.name}</h6>
                    <p className="text-[9px] text-primary uppercase font-bold tracking-widest mt-0.5">{hoveredMapPoint.role}</p>
                    <p className="text-xs text-text-secondary mt-2">Active Students: <strong>{hoveredMapPoint.students}</strong></p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Static Grid showing hubs below map for smaller screens */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8 border-t border-border/10 pt-8">
              {MAP_POINTS.map((pt, idx) => (
                <div key={idx} className="p-3 bg-card border border-border/10 rounded-xl text-left hover:border-primary/30 transition-all">
                  <span className="text-[8px] font-bold text-primary uppercase tracking-widest font-mono">Hub {idx+1}</span>
                  <h6 className="text-xs font-bold text-text-primary font-cinzel mt-0.5 truncate">{pt.name}</h6>
                  <p className="text-[9px] text-text-secondary mt-1">{pt.students} Students</p>
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* ==========================================
            PART 4 — COMMUNITY EXPERIENCES (Horizontal Scroll Cards)
            ========================================== */}
        <div className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="font-cinzel text-xs font-bold uppercase tracking-[0.3em] text-primary">Activities</h3>
            <h4 className="text-3xl lg:text-4xl font-extrabold font-cinzel text-text-primary">Community Experiences</h4>
            <p className="text-lg text-text-secondary font-light">Interactive masterclasses, live calculations retreats, and alumni discussions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {COMMUNITY_EXPERIENCES.map((exp, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.01, border: "1px solid var(--primary)" }}
                className="bg-card rounded-3xl border border-border/20 overflow-hidden flex flex-col justify-between shadow-lg text-left"
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black tracking-widest text-primary uppercase font-mono">{exp.type}</span>
                    <span className="text-[9px] font-bold text-text-secondary bg-primary/10 px-2 py-0.5 rounded">{exp.date}</span>
                  </div>
                  <h5 className="text-base font-bold font-cinzel text-text-primary leading-tight">
                    {exp.title}
                  </h5>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {exp.description}
                  </p>
                </div>

                <div className="p-6 pt-2 border-t border-border/10 mt-2 bg-primary/5">
                  <button className="w-full py-2.5 rounded-xl bg-primary text-white text-[10px] font-bold tracking-widest uppercase hover:bg-primary-dark transition-all cursor-pointer">
                    Join Upcoming Event
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>


        {/* ==========================================
            PART 5 — LEARNING PATHWAYS (Roadmap)
            ========================================== */}
        <div className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="font-cinzel text-xs font-bold uppercase tracking-[0.3em] text-primary">The Process</h3>
            <h4 className="text-3xl lg:text-4xl font-extrabold font-cinzel text-text-primary">Learning Pathways</h4>
            <p className="text-lg text-text-secondary font-light">Follow our structured path to evolve from custom calculations to global mentor levels.</p>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Steps Timeline Header Bar */}
            <div className="flex overflow-x-auto gap-2 pb-4 border-b border-border/10 scrollbar-thin">
              {PATHWAY_ROADMAP.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveRoadmapStep(idx)}
                  className={`px-5 py-3 rounded-xl border flex items-center gap-3 shrink-0 cursor-pointer transition-all ${
                    activeRoadmapStep === idx 
                      ? 'bg-primary border-primary text-white shadow-md' 
                      : 'bg-card border-border/20 text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <span className="text-xs font-mono font-black">{step.label}</span>
                  <span className="text-xs font-bold font-cinzel">{step.title}</span>
                </button>
              ))}
            </div>

            {/* Selected Step Display Panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRoadmapStep}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="mt-8 p-6 md:p-10 bg-card/65 backdrop-blur-md rounded-3xl border border-primary/25 shadow-xl flex flex-col md:flex-row gap-8 items-center text-left"
              >
                {/* Large Graphic Circle */}
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-4xl shrink-0 border border-primary/30">
                  {PATHWAY_ROADMAP[activeRoadmapStep].graphic}
                </div>

                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-black tracking-widest text-primary uppercase">
                      Stage {PATHWAY_ROADMAP[activeRoadmapStep].label} of 08
                    </span>
                    <span className="text-[9px] bg-secondary/15 text-secondary px-2 py-0.5 rounded-full font-bold">
                      {PATHWAY_ROADMAP[activeRoadmapStep].subtitle}
                    </span>
                  </div>

                  <h4 className="text-2xl font-bold font-cinzel text-text-primary">
                    {PATHWAY_ROADMAP[activeRoadmapStep].title}
                  </h4>
                  
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {PATHWAY_ROADMAP[activeRoadmapStep].description}
                  </p>

                  <div className="pt-4 flex flex-wrap gap-2">
                    <span className="text-[10px] bg-primary/5 border border-primary/20 text-primary px-3 py-1 rounded-full font-mono">
                      ✓ Mandatory Calculations Passed
                    </span>
                    <span className="text-[10px] bg-primary/5 border border-primary/20 text-primary px-3 py-1 rounded-full font-mono">
                      ✓ Official Workbooks Provided
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>


        {/* ==========================================
            PART 6 — COMMUNITY IMPACT (Animated stats)
            ========================================== */}
        <div className="py-12 bg-primary/5 border-y border-primary/10">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-9 gap-6 text-center">
            {IMPACT_STATS.map((stat, idx) => (
              <div key={idx} className="space-y-1 lg:col-span-1">
                <p className="text-2xl md:text-3xl font-extrabold text-primary font-mono tracking-tight">
                  {(countState[stat.label] || 0).toLocaleString()}
                  {stat.suffix}
                </p>
                <h6 className="text-[9px] font-bold uppercase tracking-wider text-text-primary font-cinzel">
                  {stat.label}
                </h6>
                <p className="text-[8px] text-text-secondary leading-tight">
                  {stat.sub}
                </p>
              </div>
            ))}
          </div>
        </div>


        {/* ==========================================
            PART 7 — MEMBER BENEFITS (Benefit Cards)
            ========================================== */}
        <div className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="font-cinzel text-xs font-bold uppercase tracking-[0.3em] text-primary">Privileges</h3>
            <h4 className="text-3xl lg:text-4xl font-extrabold font-cinzel text-text-primary">Member Benefits</h4>
            <p className="text-lg text-text-secondary font-light">Join LEO Family to unlock permanent learning upgrades and continuous network support.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {MEMBER_BENEFITS.map((ben, idx) => {
              const BenIcon = ben.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-card border border-border/10 hover:border-primary/45 hover:shadow-xl transition-all text-left space-y-4"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <BenIcon className="w-5 h-5" />
                  </div>
                  <h5 className="text-base font-bold font-cinzel text-text-primary">
                    {ben.title}
                  </h5>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {ben.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>


        {/* ==========================================
            PART 8 — THE FUTURE ROADMAP (Interactive timeline)
            ========================================== */}
        <div className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="font-cinzel text-xs font-bold uppercase tracking-[0.3em] text-primary">Milestones</h3>
            <h4 className="text-3xl lg:text-4xl font-extrabold font-cinzel text-text-primary">The Future Roadmap</h4>
            <p className="text-lg text-text-secondary font-light">Inspect LEO Family's long-term master expansion plan and timeline goals.</p>
          </div>

          <div className="relative max-w-5xl mx-auto pt-4 pl-8 md:pl-0">
            {/* Left spine for mobile, center spine for md+ */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/10 via-primary/40 to-primary/10 -translate-x-1/2" />

            <div className="space-y-10">
              {FUTURE_ROADMAP.map((mile, idx) => {
                const isLeft = idx % 2 === 0;
                return (
                  <div key={idx} className={`flex flex-col md:flex-row items-start ${isLeft ? 'md:flex-row-reverse' : ''} relative`}>
                    
                    {/* Pulsing Node marker */}
                    <div className="absolute left-4 md:left-1/2 top-1.5 w-6 h-6 rounded-full bg-background border-4 border-primary -translate-x-1/2 z-20 flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                    </div>

                    {/* Timeline card content */}
                    <div className="w-full md:w-[45%] pl-8 md:pl-0 md:px-8 text-left">
                      <motion.div
                        whileHover={{ y: -3 }}
                        className="p-5 rounded-2xl bg-card border border-border/10 shadow-lg hover:border-primary/30 transition-all"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono font-bold text-primary">{mile.phase}</span>
                          <span className="text-[9px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                            {mile.status}
                          </span>
                        </div>
                        <h5 className="text-base font-bold font-cinzel text-text-primary">{mile.title}</h5>
                        <p className="text-xs text-text-secondary leading-relaxed mt-2">{mile.desc}</p>
                      </motion.div>
                    </div>

                    {/* Spacer */}
                    <div className="hidden md:block w-[10%]"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>


        {/* ==========================================
            PART 9 — COMMUNITY GALLERY (Premium Masonry)
            ========================================== */}
        <div className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="font-cinzel text-xs font-bold uppercase tracking-[0.3em] text-primary">Moments</h3>
            <h4 className="text-3xl lg:text-4xl font-extrabold font-cinzel text-text-primary">Ecosystem Gallery</h4>
            <p className="text-lg text-text-secondary font-light">Browse authentic photos detailing student meetups, Vastu tours, and conferences.</p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
            {["All", "Workshops", "Students", "Seminars", "Events", "Online Sessions", "Behind the Scenes"].map((f) => (
              <button
                key={f}
                onClick={() => setGalleryFilter(f)}
                className={`px-4 py-1.5 rounded-full text-[9px] font-bold tracking-wider uppercase transition-all border cursor-pointer ${
                  galleryFilter === f
                    ? 'bg-primary border-primary text-white shadow-md'
                    : 'bg-card/45 border-border/30 text-text-secondary hover:text-text-primary hover:border-primary/45'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Columns representation for masonry */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {GALLERY_ITEMS
              .filter(item => galleryFilter === "All" || item.type === galleryFilter)
              .map((item, idx) => (
                <motion.div
                  key={idx}
                  layout
                  whileHover={{ scale: 1.01 }}
                  className="group relative h-64 rounded-2xl overflow-hidden border border-border/10 bg-primary/5 cursor-pointer shadow-md"
                >
                  <SmartImage
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-left space-y-1">
                    <span className="text-[8px] font-mono font-bold tracking-widest text-primary uppercase bg-black/60 px-2 py-0.5 rounded">
                      {item.type}
                    </span>
                    <h6 className="text-sm font-bold font-cinzel text-white leading-tight">
                      {item.title}
                    </h6>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>


        {/* ==========================================
            PART 10 — TESTIMONIAL WALL (Dynamic Carousel)
            ========================================== */}
        <div className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="font-cinzel text-xs font-bold uppercase tracking-[0.3em] text-primary">Voices</h3>
            <h4 className="text-3xl lg:text-4xl font-extrabold font-cinzel text-text-primary">Ecosystem Testimonial Wall</h4>
            <p className="text-lg text-text-secondary font-light">Genuine verification letters and student quotes detailing deep transitions.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
            {["All", "Success Stories", "Student Quotes", "Instructor Messages", "Community Messages"].map((f) => (
              <button
                key={f}
                onClick={() => setTestimonialFilter(f)}
                className={`px-4 py-1.5 rounded-full text-[9px] font-bold tracking-wider uppercase transition-all border cursor-pointer ${
                  testimonialFilter === f
                    ? 'bg-primary border-primary text-white'
                    : 'bg-card/45 border-border/30 text-text-secondary hover:text-text-primary'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto text-left">
            {TESTIMONIALS_WALL
              .filter(item => testimonialFilter === "All" || item.category === testimonialFilter)
              .map((item, idx) => (
                <motion.div
                  key={idx}
                  layout
                  className="p-6 rounded-2xl bg-card border border-border/10 hover:border-primary/20 shadow-md relative flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <span className="text-[8px] font-mono font-bold tracking-widest text-primary uppercase bg-primary/10 px-2 py-0.5 rounded-full">
                      {item.category}
                    </span>
                    <p className="text-xs text-text-secondary leading-relaxed italic">
                      "{item.quote}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border/10 mt-4 flex items-center justify-between">
                    <div>
                      <h6 className="text-xs font-bold text-text-primary font-cinzel">{item.author}</h6>
                      <p className="text-[9px] text-text-secondary">{item.role}</p>
                    </div>
                    <span className="text-xs">⭐️⭐️⭐️⭐️⭐️</span>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>


        {/* ==========================================
            PART 11 — JOIN THE MOVEMENT (CTA)
            ========================================== */}
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-[3.5rem] overflow-hidden bg-card border border-primary/25 shadow-2xl p-8 md:p-16 text-center space-y-8">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-4 max-w-2xl mx-auto">
              <span className="text-[10px] font-black tracking-[0.25em] text-primary uppercase">Inception Call</span>
              <h3 className="text-3xl md:text-5xl font-extrabold font-cinzel text-text-primary tracking-tight">
                Become Part of the LEO Family Journey
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed font-light">
                Whether you're seeking custom remedial guidance, high-fidelity academic knowledge, or a supportive organic learning network, your evolution pathway begins here.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto pt-4">
              <button className="flex-1 py-3.5 px-6 rounded-xl bg-primary text-white text-xs font-bold uppercase tracking-widest hover:bg-primary-dark shadow-md cursor-pointer">
                Join the Community
              </button>
              <button className="flex-1 py-3.5 px-6 rounded-xl border border-primary text-primary text-xs font-bold uppercase tracking-widest hover:bg-primary/5 cursor-pointer">
                Explore Courses
              </button>
              <button className="flex-1 py-3.5 px-6 rounded-xl border border-border/20 text-text-secondary text-xs font-bold uppercase tracking-widest hover:border-primary/45 cursor-pointer">
                Book Consultation
              </button>
            </div>
          </div>
        </div>


        {/* ==========================================
            PART 12 — SOCIAL CONNECTION (Verified badges grid)
            ========================================= */}
        <div className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="font-cinzel text-xs font-bold uppercase tracking-[0.3em] text-primary">Interlink</h3>
            <h4 className="text-3xl lg:text-4xl font-extrabold font-cinzel text-text-primary">Verified Social Connections</h4>
            <p className="text-lg text-text-secondary font-light">Access LEO Family verified accounts spanning standard digital communities.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {[
              { label: "Official Websites", details: BrandRegistry.websites.main.url.replace("https://www.", "").replace("https://", "").split("/")[0], verified: true },
              { label: "YouTube Channels", details: BrandRegistry.social.find(s => s.id === 'sc_yt_main')?.username || "Occult Gyan TV", verified: true },
              { label: "Facebook Community", details: BrandRegistry.social.find(s => s.id === 'sc_fb')?.followers || "50K Seekers", verified: true },
              { label: "Instagram Page", details: BrandRegistry.social.find(s => s.id === 'sc_ig')?.username || "@leo.family.occult", verified: false },
              { label: "LinkedIn Network", details: BrandRegistry.social.find(s => s.id === 'sc_ln')?.username || "Founder Business", verified: false },
              { label: "Future Podcast", details: "Coming Soon", verified: false }
            ].map((soc, idx) => (
              <div key={idx} className="p-4 bg-card border border-border/10 rounded-2xl hover:border-primary/30 transition-all text-left flex flex-col justify-between">
                <span className="text-[8px] font-bold text-text-secondary uppercase tracking-wider">{soc.label}</span>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs font-bold text-text-primary font-mono truncate">{soc.details}</span>
                  {soc.verified ? (
                    <span className="text-[9px] text-blue-500 bg-blue-50 px-1 rounded font-bold">✓ Verified</span>
                  ) : (
                    <span className="text-[8px] text-text-secondary opacity-65">Upcoming</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* ==========================================
            PART 13 — DAILY CONNECTION (Daily inspiration)
            ========================================== */}
        <div className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="font-cinzel text-xs font-bold uppercase tracking-[0.3em] text-primary">Vibrational sync</h3>
            <h4 className="text-3xl lg:text-4xl font-extrabold font-cinzel text-text-primary">Your Daily Connection</h4>
            <p className="text-lg text-text-secondary font-light">Sync your daily mental state and calculation values with today's planetary transit guidance.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto text-left">
            {[
              { label: "Today's Quote", main: '"Numbers are cosmic strings. Tune them correctly to hear your life play beautiful music."', sub: "Raajeev Singh Chauhann", icon: Lightbulb },
              { label: "Today's Number", main: "Destiny Node 09", sub: "Promotes selfless action & expansion", icon: Star },
              { label: "Today's Reflection", main: "Evaluate physical boundaries before making expansion plans.", sub: "Vastu Space Alignment", icon: Compass },
              { label: "Today's Learning Tip", main: "Chaldean code treats number 9 as separate from active personal grids.", sub: "Occult Academy Secret", icon: BookOpen },
              { label: "Daily Meditation", main: "Focus on Solar plexus elements (Pancha Bhoota) for 8 minutes.", sub: "Sound vibrational sync", icon: Shield }
            ].map((daily, idx) => {
              const IconComp = daily.icon;
              return (
                <div key={idx} className="p-5 bg-card border border-border/15 rounded-2xl flex flex-col justify-between hover:border-primary/35 transition-all">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-primary">
                      <IconComp className="w-4 h-4" />
                      <span className="text-[9px] font-black uppercase tracking-widest font-mono">{daily.label}</span>
                    </div>
                    <p className="text-xs font-bold text-text-primary leading-relaxed font-cinzel">
                      {daily.main}
                    </p>
                  </div>
                  <p className="text-[9px] text-text-secondary mt-4 border-t border-border/10 pt-2 font-mono">
                    {daily.sub}
                  </p>
                </div>
              );
            })}
          </div>
        </div>


        {/* ==========================================
            PART 14 — FINAL CINEMATIC SECTION (Sacred Geometry Outro)
            ========================================== */}
        <div className="relative py-24 rounded-[4rem] overflow-hidden bg-gradient-to-tr from-[#1C0F02] to-[#3B2207] border border-primary/25 shadow-2xl text-center">
          
          {/* Glowing particle system container */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-accent rounded-full opacity-40 shadow-[0_0_8px_rgba(233,194,105,0.7)]"
                style={{
                  left: `${10 + i * 11}%`,
                  top: `${Math.random() * 80}%`
                }}
                animate={{
                  y: [0, -60, 0],
                  opacity: [0.2, 0.7, 0.2]
                }}
                transition={{
                  duration: 6 + i,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          <div className="max-w-3xl mx-auto space-y-6 relative z-10 px-6">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 mx-auto rounded-full border border-dashed border-primary/20 flex items-center justify-center opacity-70"
            >
              <Sparkles className="w-6 h-6 text-primary" />
            </motion.div>

            <h3 className="text-3xl md:text-5xl font-extrabold font-cinzel text-white leading-tight">
              Together We Learn.<br />
              Together We Grow.<br />
              Together We Inspire.
            </h3>

            <p className="text-xs uppercase tracking-[0.3em] text-[#E9C269] font-black">
              The Journey Has Just Begun.
            </p>

            <p className="text-xs text-[#D4C4B7] leading-relaxed max-w-xl mx-auto font-light">
              We preserve ancient structural formulas while embracing advanced responsive platforms, paving your transition towards holistic destiny alignment and continuous spiritual growth.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
