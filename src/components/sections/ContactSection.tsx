import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, Mail, MessageSquare, MessageCircle, Check, MapPin, 
  Clock, ArrowRight, ExternalLink, ChevronDown, Sparkles, 
  Award, Shield, Star, UserCheck, Users, BookOpen, Compass, 
  Lock, GraduationCap, Calendar, ArrowUpRight, CheckCircle2, 
  Building2, Globe, HelpCircle, Send, Heart, Briefcase, 
  PhoneCall, Home, Copy, Facebook, Youtube, Settings, RefreshCw
} from 'lucide-react';
import { WHATSAPP_LINK } from '../../constants/contacts';
import { SocialCard } from '../SocialCard';
import { getActiveBrand, getActiveContact, getActiveSocial, saveCmsBrand, saveCmsSocial, saveCmsContact, resetCmsData } from '../../config/cms';
import { WEBSITES } from '../../config/websites';
import { useAcademy } from '../../context/AcademyContext';

// SEO Schema injection helper
const SeoSchemaMarkup: React.FC = () => {
  useEffect(() => {
    const brand = getActiveBrand();
    const contact = getActiveContact();
    const social = getActiveSocial();

    const mainUrl = brand.websites?.main || WEBSITES.main.url;
    const founderUrl = brand.websites?.founder || WEBSITES.founder.url;
    const filmsUrl = brand.websites?.films || WEBSITES.films.url;

    const schema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": brand.name,
      "url": mainUrl,
      "logo": `${mainUrl}/gemstone-assets/logo.jpg`,
      "sameAs": [
        founderUrl,
        filmsUrl,
        social.youtube.main,
        social.youtube.founder,
        social.youtube.films,
        social.facebook
      ],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": contact.phones.general,
          "contactType": "general enquiries",
          "email": contact.email,
          "areaServed": "Global",
          "availableLanguage": ["English", "Hindi"]
        },
        {
          "@type": "ContactPoint",
          "telephone": contact.phones.founder,
          "contactType": "Founder Consultation",
          "email": contact.email,
          "areaServed": "Global",
          "availableLanguage": ["English", "Hindi"]
        }
      ]
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "leo-contact-schema";
    script.innerHTML = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const existing = document.getElementById("leo-contact-schema");
      if (existing) {
        existing.remove();
      }
    };
  }, []);

  return null;
};

// Reusable animated cards and items
interface QuickContactCardProps {
  title: string;
  value: string;
  subtitle?: string;
  buttonText: string;
  icon: React.ReactNode;
  onClick: () => void;
  isPrimary?: boolean;
}

const QuickContactCard: React.FC<QuickContactCardProps> = ({
  title,
  value,
  subtitle,
  buttonText,
  icon,
  onClick,
  isPrimary = false
}) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative rounded-3xl p-8 border backdrop-blur-md overflow-hidden flex flex-col justify-between h-full transition-all duration-300 ${
        isPrimary 
          ? "border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent shadow-[0_20px_50px_rgba(16,185,129,0.15)]"
          : "border-[#C29B47]/20 bg-card/45 hover:border-[#C29B47]/50 shadow-lg shadow-[#1C0F02]/5"
      }`}
    >
      {/* Decorative background glow */}
      {isPrimary && (
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
      )}
      {!isPrimary && (
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      )}

      <div>
        <div className="flex items-center justify-between mb-6">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${
            isPrimary 
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
              : "bg-primary/10 border-primary/20 text-primary"
          }`}>
            {icon}
          </div>
          {subtitle && (
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              {subtitle}
            </span>
          )}
        </div>

        <h3 className="font-cinzel text-xs uppercase tracking-[0.2em] text-text-secondary/70 mb-2">{title}</h3>
        <p className="text-xl lg:text-2xl font-bold font-sans text-text-primary tracking-wide break-all mb-8">{value}</p>
      </div>

      <button
        onClick={onClick}
        className={`w-full py-4 rounded-xl font-bold uppercase tracking-wider text-xs transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
          isPrimary
            ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20 hover:brightness-110 hover:shadow-xl hover:shadow-emerald-500/35"
            : "border border-[#C29B47]/30 text-[#C29B47] hover:bg-[#C29B47] hover:text-white"
        }`}
      >
        <span>{buttonText}</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

// Types for Dynamic consultations
interface ConsultationType {
  title: string;
  icon: React.ReactNode;
  description: string;
  duration: string;
}

const ContactSection: React.FC = () => {
  const { activeAcademy } = useAcademy();
  const formSectionRef = useRef<HTMLDivElement>(null);
  const [selectedConsultation, setSelectedConsultation] = useState("Personal Numerology Consultation");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [copiedValue, setCopiedValue] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Dynamic CMS States for dynamic rendering and instant updates
  const [brand, setBrand] = useState(getActiveBrand());
  const [contact, setContact] = useState(getActiveContact());
  const [social, setSocial] = useState(getActiveSocial());
  const [isCmsOpen, setIsCmsOpen] = useState(false);
  const [cmsForm, setCmsForm] = useState({
    brandName: brand.name,
    founderName: brand.founder,
    tagline: brand.tagline,
    mainUrl: brand.websites?.main || WEBSITES.main.url,
    founderUrl: brand.websites?.founder || WEBSITES.founder.url,
    filmsUrl: brand.websites?.films || WEBSITES.films.url,
    youtubeMain: social.youtube.main,
    youtubeFounder: social.youtube.founder,
    youtubeFilms: social.youtube.films,
    facebookUrl: social.facebook,
    email: contact.email,
    generalPhone: contact.phones.general,
    founderPhone: contact.phones.founder,
    businessHours: contact.businessHours
  });

  const handleCmsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCmsForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCmsSave = () => {
    const updatedBrand = {
      ...brand,
      name: cmsForm.brandName,
      founder: cmsForm.founderName,
      tagline: cmsForm.tagline,
      websites: {
        main: cmsForm.mainUrl,
        founder: cmsForm.founderUrl,
        films: cmsForm.filmsUrl
      }
    };

    const updatedSocial = {
      ...social,
      youtube: {
        main: cmsForm.youtubeMain,
        founder: cmsForm.youtubeFounder,
        films: cmsForm.youtubeFilms
      },
      facebook: cmsForm.facebookUrl
    };

    const updatedContact = {
      ...contact,
      email: cmsForm.email,
      phones: {
        general: cmsForm.generalPhone,
        founder: cmsForm.founderPhone
      },
      businessHours: cmsForm.businessHours
    };

    saveCmsBrand(updatedBrand);
    saveCmsSocial(updatedSocial);
    saveCmsContact(updatedContact);

    setBrand(updatedBrand);
    setSocial(updatedSocial);
    setContact(updatedContact);
    
    // Show success notification via window alert or custom notification
    alert("✨ Maharaja Gold Brand System updated successfully! Changes applied in real-time.");
  };

  const handleCmsReset = () => {
    if (window.confirm("Are you sure you want to reset all brand configurations to defaults?")) {
      resetCmsData();
      const defaultBrand = getActiveBrand();
      const defaultSocial = getActiveSocial();
      const defaultContact = getActiveContact();

      setBrand(defaultBrand);
      setSocial(defaultSocial);
      setContact(defaultContact);

      setCmsForm({
        brandName: defaultBrand.name,
        founderName: defaultBrand.founder,
        tagline: defaultBrand.tagline,
        mainUrl: defaultBrand.websites?.main || WEBSITES.main.url,
        founderUrl: defaultBrand.websites?.founder || WEBSITES.founder.url,
        filmsUrl: defaultBrand.websites?.films || WEBSITES.films.url,
        youtubeMain: defaultSocial.youtube.main,
        youtubeFounder: defaultSocial.youtube.founder,
        youtubeFilms: defaultSocial.youtube.films,
        facebookUrl: defaultSocial.facebook,
        email: defaultContact.email,
        generalPhone: defaultContact.phones.general,
        founderPhone: defaultContact.phones.founder,
        businessHours: defaultContact.businessHours
      });
      alert("✨ Brand configurations reset to system defaults.");
    }
  };

  // Form states
  const [formFields, setFormFields] = useState({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    country: '',
    city: '',
    preferredDate: '',
    preferredTime: 'Morning (10:00 AM - 1:00 PM)',
    message: '',
    agreed: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormFields(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormFields(prev => ({ ...prev, [name]: value }));
    }
  };

  const scrollToForm = (consultationName?: string) => {
    if (consultationName) {
      setSelectedConsultation(consultationName);
    }
    formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedValue(label);
    setTimeout(() => setCopiedValue(null), 2000);
  };

  // WhatsApp pre-filled message generator
  const getWhatsAppLink = () => {
    const text = `Hello Leo Family,

My Name is: ${formFields.fullName || '[Your Name]'}
Phone Number: ${formFields.phoneNumber || '[Your Phone]'}
Email Address: ${formFields.emailAddress || '[Your Email]'}
Country: ${formFields.country || '[Your Country]'}
City: ${formFields.city || '[Your City]'}
I would like guidance regarding: ${selectedConsultation}
Preferred Date: ${formFields.preferredDate || '[Preferred Date]'}
Preferred Time: ${formFields.preferredTime}

Message: ${formFields.message || 'I would like to book a luxury consultation.'}`;

    return `${WHATSAPP_LINK}?text=${encodeURIComponent(text)}`;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formFields.agreed) {
      alert("Please agree to the privacy statement to proceed.");
      return;
    }
    // Simulate premium submit action & show modal
    setShowSuccessModal(true);
  };

  // Consultation Services data
  const consultationTypes: ConsultationType[] = [
    {
      title: "Personal Numerology Consultation",
      icon: <Sparkles className="w-6 h-6" />,
      description: "Comprehensive blueprint analysis of your life frequency. Includes lucky dates, core destiny correction suggestions, and planetary alignment strategies.",
      duration: "60 Mins"
    },
    {
      title: "Astrology Consultation",
      icon: <Compass className="w-6 h-6" />,
      description: "Deep dive into your Vedic Janmakundali. Unlock structural insights, identify current celestial blockages, and get dynamic remedies.",
      duration: "60 Mins"
    },
    {
      title: "Vastu Consultation",
      icon: <Home className="w-6 h-6" />,
      description: "Harmonize physical directions in your home, commercial office, or industrial space. Attract abundant wealth, good health, and positive energy flow.",
      duration: "90 Mins"
    },
    {
      title: "Business Guidance",
      icon: <Briefcase className="w-6 h-6" />,
      description: "Exclusively designed for entrepreneurs. Establish fortunate brand names, align launch dates, select auspicious color schemes, and audit partners.",
      duration: "45 Mins"
    },
    {
      title: "Relationship Guidance",
      icon: <Heart className="w-6 h-6" />,
      description: "Evaluate matching parameters, pinpoint planetary compatibility gaps, and resolve continuous misunderstandings to align couples.",
      duration: "45 Mins"
    },
    {
      title: "Name Analysis",
      icon: <UserCheck className="w-6 h-6" />,
      description: "Detailed evaluation of phonetic energies and spelling vibrations of your full name based on Chaldean and Pythagorean systems.",
      duration: "30 Mins"
    },
    {
      title: "Mobile Number Analysis",
      icon: <PhoneCall className="w-6 h-6" />,
      description: "Determine if your mobile number total aligns with your birth date and career goals. Unlock high-vibration power configurations.",
      duration: "30 Mins"
    },
    {
      title: "Course Counselling",
      icon: <GraduationCap className="w-6 h-6" />,
      description: "Connect with academy experts to outline your learning path in professional Numerology, Vastu Science, or Astrology.",
      duration: "30 Mins"
    }
  ];

  // Why Contact Us Features
  const features = [
    {
      title: "Personalized Guidance",
      icon: <Sparkles className="w-5 h-5 text-primary" />,
      description: "No generic templates. Every consultation is calculated individually based on your precise planetary frequency and unique soul chart."
    },
    {
      title: "Confidential Discussion",
      icon: <Lock className="w-5 h-5 text-primary" />,
      description: "Your life details, charts, and personal records are guarded with absolute confidentiality. Enter a safe, premium studio environment."
    },
    {
      title: "Experienced Mentorship",
      icon: <Award className="w-5 h-5 text-primary" />,
      description: "Direct guidance from Raajeev Singh Chauhann and certified master-level experts with a proven legacy of transforming global lives."
    },
    {
      title: "Structured Learning",
      icon: <GraduationCap className="w-5 h-5 text-primary" />,
      description: "Clear academy learning tracks with authentic resources, student certifications, live practice sessions, and expert coaching."
    },
    {
      title: "Ethical Consultation",
      icon: <Shield className="w-5 h-5 text-primary" />,
      description: "We lead with empowerment, clarity, and positive remedies. No fear-based astrology or heavy negative prophecies."
    },
    {
      title: "Friendly Support",
      icon: <Users className="w-5 h-5 text-primary" />,
      description: "Our dedicated relationships team walks beside you at every step, offering guidance on schedules, courses, and remedy integrations."
    }
  ];

  // FAQs data
  const faqItems = [
    {
      q: "How do I book a consultation?",
      a: "Simply choose your desired category from Section 2, or fill in your preferences directly in our Luxury Contact Form. You can choose to 'Submit Enquiry' (which notifies our team instantly) or click 'Send via WhatsApp' to open a prefilled chat."
    },
    {
      q: "Which consultation is right for me?",
      a: "If you're seeking general life optimization and correction, the 'Personal Numerology Consultation' or 'Elite Consultation Report' is ideal. For career blockages or family disputes, 'Astrology' provides profound remedies. For spatial blockages, select 'Vastu'."
    },
    {
      q: "Can I join courses from outside India?",
      a: "Yes! LEO Family has a highly respected global reach. Our students live across the USA, UK, Canada, UAE, Europe, and Australia. All classes are conducted online via Zoom with global session timings."
    },
    {
      q: "How are consultations conducted?",
      a: "All personal consultations are conducted privately via direct Zoom video sessions or secure phone calls. You will receive customized charts, written remedies, and direct access to follow-up query support."
    },
    {
      q: "What payment methods are available?",
      a: "We support a highly secure suite of domestic and international payment avenues. This includes UPI, Indian Net Banking, all standard Indian Debit/Credit cards, international credit cards, and PayPal."
    },
    {
      q: "Can beginners join the courses?",
      a: "Absolutely! The LEO Family Occult Science & Vedic Academy starts from the very foundation (Level 1) and progresses to professional master levels. No prior background is needed to succeed."
    }
  ];



  return (
    <section id="contact-consultation" className="relative py-24 lg:py-36 overflow-hidden">
      <SeoSchemaMarkup />

      {/* Atmospheric Star Particles (Framer Motion) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(20)].map((_, idx) => (
          <motion.div
            key={idx}
            className="absolute rounded-full bg-[#C29B47]/25"
            style={{
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
        {/* Soft elegant lights */}
        <div className="absolute top-[5%] right-[10%] w-[45vw] h-[45vw] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[5%] w-[40vw] h-[40vw] bg-amber-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        
        {/* ==========================================
            PAGE HEADER (Title & Subtitle)
            ========================================== */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block opacity-90 font-cinzel"
          >
            Luxury Consultation Hub
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-4xl lg:text-7xl font-bold font-cinzel gold-glow-text mb-6 tracking-wide"
          >
            Let's Begin <br className="hidden sm:block" /> Your Journey
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="text-text-secondary text-base lg:text-lg leading-relaxed mb-4"
          >
            Whether you're seeking personal guidance, learning opportunities, or simply have a question, our team is here to help.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xs font-semibold tracking-wider uppercase text-[#C29B47]"
          >
            Choose the most convenient way to connect with us.
          </motion.p>
        </div>

        {/* ==========================================
            SECTION 1 — QUICK CONTACT OPTIONS
            ========================================== */}
        <div className="mb-24 lg:mb-32">
          <div className="text-center mb-10">
            <h2 className="font-cinzel text-lg lg:text-xl font-bold tracking-widest text-[#C29B47] uppercase">
              Quick Contact Gateways
            </h2>
            <div className="h-[1px] w-12 bg-primary/40 mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            
            {/* Card 1 — Phone Call */}
            <QuickContactCard
              title={`Call ${brand.name}`}
              value={contact.phones.general}
              buttonText="Call Now"
              icon={<Phone className="w-6 h-6" />}
              onClick={() => window.open(`tel:${contact.phones.general.replace(/\s/g, '')}`)}
            />

            {/* Card 2 — Personal Founder Consultation */}
            <QuickContactCard
              title="Personal Consultation"
              value={brand.founder}
              subtitle="⭐ Founder Consultation"
              buttonText="Book Consultation"
              icon={<Star className="w-6 h-6 text-amber-500 fill-amber-500" />}
              onClick={() => {
                copyToClipboard(contact.phones.founder, "Founder Phone");
                window.open(`tel:${contact.phones.founder.replace(/\s/g, '')}`);
              }}
            />

            {/* Card 3 — Email Us */}
            <QuickContactCard
              title="Email Us"
              value={contact.email}
              buttonText="Send Email"
              icon={<Mail className="w-6 h-6" />}
              onClick={() => window.open(`mailto:${contact.email}?subject=LEO Family Enquiry`)}
            />

            {/* Card 4 — WhatsApp (Primary Contact Method) */}
            <QuickContactCard
              title="WhatsApp Chat"
              value={contact.phones.general}
              subtitle="⚡ Primary Method"
              buttonText="Chat on WhatsApp"
              isPrimary={true}
              icon={<MessageCircle className="w-6 h-6" />}
              onClick={() => window.open(contact.whatsapp.link, "_blank")}
            />
          </div>
        </div>

        {/* ==========================================
            SECTION 2 — CONSULTATION TYPES
            ========================================== */}
        <div className="mb-24 lg:mb-32">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-primary/70 font-semibold font-cinzel">Discover Cosmic Pathways</span>
            <h2 className="font-cinzel text-2xl lg:text-4xl font-bold tracking-wider text-text-primary mt-1">
              Consultation Portals
            </h2>
            <p className="text-sm text-text-secondary mt-3">
              Select an elite service category to prepopulate your request and secure tailored scheduling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {consultationTypes.map((item, idx) => {
              const isSelected = selectedConsultation === item.title;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6 }}
                  className={`p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                    isSelected
                      ? "border-[#C29B47] bg-[#FAF6F0]/80 dark:bg-[#2B1704]/40 shadow-md"
                      : "border-border/30 bg-card/30 hover:border-[#C29B47]/40"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isSelected ? "bg-primary text-[#1C0F02]" : "bg-primary/10 text-primary"
                      }`}>
                        {item.icon}
                      </div>
                      <span className="text-[10px] font-mono font-medium opacity-70 flex items-center gap-1 bg-border/20 px-2 py-0.5 rounded-md">
                        <Clock className="w-3 h-3" /> {item.duration}
                      </span>
                    </div>

                    <h3 className="font-cinzel text-sm font-bold tracking-wide text-text-primary mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-text-secondary leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>

                  <button
                    onClick={() => scrollToForm(item.title)}
                    className={`w-full py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-[#C29B47] text-white"
                        : "bg-border/20 text-text-primary hover:bg-[#C29B47] hover:text-white"
                    }`}
                  >
                    {isSelected ? "Selected" : "Book Now"}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ==========================================
            SECTION 3 — CONTACT FORM & MAP
            ========================================== */}
        <div ref={formSectionRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mb-24 lg:mb-32">
          
          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-card/45 backdrop-blur-md rounded-3xl border border-[#C29B47]/20 p-8 lg:p-12 shadow-xl"
          >
            <div className="mb-8">
              <span className="text-xs tracking-[0.2em] font-semibold text-[#C29B47] uppercase font-cinzel">Submit Secure Inquiry</span>
              <h3 className="font-cinzel text-xl lg:text-3xl font-bold text-text-primary mt-1">
                Luxury Booking Studio
              </h3>
              <p className="text-xs text-text-secondary mt-1">
                Currently request path: <span className="text-primary font-medium">{selectedConsultation}</span>
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-[0.15em] uppercase text-text-secondary">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formFields.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    className="w-full text-sm bg-background/50 border border-border/10 focus:border-[#C29B47]/50 rounded-xl px-4 py-3.5 focus:outline-none transition-all duration-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-[0.15em] uppercase text-text-secondary">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    required
                    value={formFields.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="e.g., +91 99537 13176"
                    className="w-full text-sm bg-background/50 border border-border/10 focus:border-[#C29B47]/50 rounded-xl px-4 py-3.5 focus:outline-none transition-all duration-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-bold tracking-[0.15em] uppercase text-text-secondary">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="emailAddress"
                    required
                    value={formFields.emailAddress}
                    onChange={handleInputChange}
                    placeholder="name@domain.com"
                    className="w-full text-sm bg-background/50 border border-border/10 focus:border-[#C29B47]/50 rounded-xl px-4 py-3.5 focus:outline-none transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-[0.15em] uppercase text-text-secondary">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={formFields.preferredDate}
                    onChange={handleInputChange}
                    className="w-full text-sm bg-background/50 border border-border/10 focus:border-[#C29B47]/50 rounded-xl px-4 py-3.5 focus:outline-none transition-all duration-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-[0.15em] uppercase text-text-secondary">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formFields.country}
                    onChange={handleInputChange}
                    placeholder="e.g., India"
                    className="w-full text-sm bg-background/50 border border-border/10 focus:border-[#C29B47]/50 rounded-xl px-4 py-3.5 focus:outline-none transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-[0.15em] uppercase text-text-secondary">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formFields.city}
                    onChange={handleInputChange}
                    placeholder="e.g., Mumbai"
                    className="w-full text-sm bg-background/50 border border-border/10 focus:border-[#C29B47]/50 rounded-xl px-4 py-3.5 focus:outline-none transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-[0.15em] uppercase text-text-secondary">
                    Preferred Time Slot
                  </label>
                  <select
                    name="preferredTime"
                    value={formFields.preferredTime}
                    onChange={handleInputChange}
                    className="w-full text-sm bg-background/50 border border-border/10 focus:border-[#C29B47]/50 rounded-xl px-4 py-3.5 focus:outline-none transition-all duration-300 appearance-none cursor-pointer"
                  >
                    <option className="bg-card">Morning (10:00 AM - 1:00 PM)</option>
                    <option className="bg-card">Afternoon (1:00 PM - 5:00 PM)</option>
                    <option className="bg-card">Evening (5:00 PM - 8:00 PM)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-[0.15em] uppercase text-text-secondary">
                  Selected Category
                </label>
                <select
                  value={selectedConsultation}
                  onChange={(e) => setSelectedConsultation(e.target.value)}
                  className="w-full text-sm bg-background/50 border border-border/10 focus:border-[#C29B47]/50 rounded-xl px-4 py-3.5 focus:outline-none transition-all duration-300 appearance-none cursor-pointer text-primary font-medium"
                >
                  {consultationTypes.map((c, i) => (
                    <option key={i} value={c.title} className="bg-card text-text-primary">
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-[0.15em] uppercase text-text-secondary">
                  Personal Message / Key Concerns
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formFields.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about yourself, your birth details if available, and specific questions..."
                  className="w-full text-sm bg-background/50 border border-border/10 focus:border-[#C29B47]/50 rounded-xl px-4 py-3.5 focus:outline-none transition-all duration-300 resize-none"
                />
              </div>

              {/* Checkbox agreement */}
              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  name="agreed"
                  id="agreed-checkbox"
                  required
                  checked={formFields.agreed}
                  onChange={handleInputChange}
                  className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-[#C29B47] cursor-pointer"
                />
                <label htmlFor="agreed-checkbox" className="text-xs text-text-secondary cursor-pointer leading-normal">
                  I agree to be contacted regarding my enquiry and understand my data will be handled in full compliance with the privacy parameters.
                </label>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-bold text-xs uppercase tracking-widest text-white bg-gradient-to-r from-[#A86E25] via-[#C29B47] to-[#E9C269] hover:brightness-110 shadow-lg shadow-primary/20 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Enquiry</span>
                </button>

                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-xl font-bold text-xs uppercase tracking-widest text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:brightness-110 shadow-lg shadow-emerald-500/20 transition-all duration-300 text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send via WhatsApp</span>
                </a>
              </div>

            </form>
          </motion.div>

          {/* Timeline / Quick Info Side */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            
            {/* Why Us Cards snippet */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#FAF6F0] dark:bg-card/30 rounded-3xl border border-[#C29B47]/20 p-8 flex-1 flex flex-col justify-between"
            >
              <div>
                <h4 className="font-cinzel text-xs font-bold uppercase tracking-widest text-[#C29B47] mb-6">
                  VIP Concierge Guidelines
                </h4>
                <ul className="space-y-5">
                  <li className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-text-primary">Global Virtual Sessions</h5>
                      <p className="text-xs text-text-secondary leading-normal">All interactive sessions are conducted cleanly over Zoom, complete with session blueprints.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-text-primary">Response Standards</h5>
                      <p className="text-xs text-text-secondary leading-normal">Enquiries submitted via form receive dedicated coordinator responses within 24 standard business hours.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-text-primary">Priority Founder Channels</h5>
                      <p className="text-xs text-text-secondary leading-normal">Direct alignment requests with founder Raajeev Singh Chauhann are matched to specialized scheduling tracks.</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Shimmering Brand Assurance Card */}
              <div className="mt-8 p-4 rounded-2xl bg-gradient-to-r from-[#A86E25]/15 to-[#E9C269]/5 border border-[#C29B47]/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 text-primary/30">
                  <Award className="w-16 h-16 stroke-[1]" />
                </div>
                <h5 className="text-xs font-cinzel font-bold text-[#C29B47] uppercase tracking-wider mb-1">
                  Established Integrity
                </h5>
                <p className="text-[11px] text-text-secondary leading-normal">
                  LEO Family guarantees maximum accuracy, genuine Vedic alignments, and elite support at every step of your personal evolution.
                </p>
              </div>
            </motion.div>

            {/* Quick Contact Numbers Copier */}
            <div className="bg-card/45 rounded-3xl border border-[#C29B47]/20 p-6 space-y-4">
              <h4 className="font-cinzel text-[10px] font-bold uppercase tracking-widest text-text-secondary">
                Direct Clipboard Access
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-background/40 rounded-xl border border-border/25">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium text-text-primary">{contact.phones.general}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(contact.phones.general.replace(/\s/g, ''), "General")}
                    className="p-1.5 hover:bg-border/30 rounded-lg transition-colors text-text-secondary hover:text-primary cursor-pointer"
                  >
                    {copiedValue === "General" ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-background/40 rounded-xl border border-border/25">
                  <div className="flex items-center gap-3">
                    <Star className="w-4 h-4 text-[#C29B47]" />
                    <span className="text-xs font-medium text-text-primary">{contact.phones.founder}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(contact.phones.founder.replace(/\s/g, ''), "Founder")}
                    className="p-1.5 hover:bg-border/30 rounded-lg transition-colors text-text-secondary hover:text-primary cursor-pointer"
                  >
                    {copiedValue === "Founder" ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ==========================================
            SECTION 4 — WHY CONTACT US
            ========================================== */}
        <div className="mb-24 lg:mb-32">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-[#C29B47] font-semibold font-cinzel">Uncompromising Quality</span>
            <h2 className="font-cinzel text-2xl lg:text-4xl font-bold tracking-wider text-text-primary mt-1">
              Why Contact Us
            </h2>
            <div className="h-[1px] w-12 bg-primary/40 mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="p-8 rounded-2xl border border-[#C29B47]/15 bg-card/30 flex gap-5 items-start transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  {feat.icon}
                </div>
                <div>
                  <h4 className="font-cinzel text-sm font-bold tracking-wide text-text-primary mb-2">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ==========================================
            SECTION 5 — RESPONSE TIMELINE
            ========================================== */}
        <div className="mb-24 lg:mb-32">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-[#C29B47] font-semibold font-cinzel">Streamlined Journey</span>
            <h2 className="font-cinzel text-2xl lg:text-4xl font-bold tracking-wider text-text-primary mt-1">
              Response Timeline
            </h2>
            <p className="text-xs text-text-secondary mt-2">
              From initial contact to final alignment - five beautiful steps of evolution.
            </p>
          </div>

          <div className="relative">
            {/* Connection line for desktop */}
            <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-primary/10 via-[#C29B47]/45 to-primary/10 z-0" />

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 relative z-10">
              
              <div className="text-center bg-card/10 lg:bg-transparent p-6 lg:p-0 rounded-2xl border border-border/10 lg:border-none">
                <div className="w-12 h-12 rounded-full bg-[#1C0F02] dark:bg-[#FAF6F0] border border-[#C29B47] text-primary dark:text-[#1C0F02] font-cinzel font-bold text-sm flex items-center justify-center mx-auto mb-4 shadow-lg">
                  1
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary mb-1">Submit Enquiry</h4>
                <p className="text-[11px] text-text-secondary leading-normal max-w-[180px] mx-auto">
                  Fill out our online secure form or send an instant WhatsApp query.
                </p>
              </div>

              <div className="text-center bg-card/10 lg:bg-transparent p-6 lg:p-0 rounded-2xl border border-border/10 lg:border-none">
                <div className="w-12 h-12 rounded-full bg-[#1C0F02] dark:bg-[#FAF6F0] border border-[#C29B47] text-primary dark:text-[#1C0F02] font-cinzel font-bold text-sm flex items-center justify-center mx-auto mb-4 shadow-lg">
                  2
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary mb-1">Expert Review</h4>
                <p className="text-[11px] text-text-secondary leading-normal max-w-[180px] mx-auto">
                  Our core panel reviews your planetary parameters and request tags.
                </p>
              </div>

              <div className="text-center bg-card/10 lg:bg-transparent p-6 lg:p-0 rounded-2xl border border-border/10 lg:border-none">
                <div className="w-12 h-12 rounded-full bg-[#1C0F02] dark:bg-[#FAF6F0] border border-[#C29B47] text-primary dark:text-[#1C0F02] font-cinzel font-bold text-sm flex items-center justify-center mx-auto mb-4 shadow-lg">
                  3
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary mb-1">We Contact You</h4>
                <p className="text-[11px] text-text-secondary leading-normal max-w-[180px] mx-auto">
                  A relationship officer connects to finalise coordinates and schedules.
                </p>
              </div>

              <div className="text-center bg-card/10 lg:bg-transparent p-6 lg:p-0 rounded-2xl border border-border/10 lg:border-none">
                <div className="w-12 h-12 rounded-full bg-[#1C0F02] dark:bg-[#FAF6F0] border border-[#C29B47] text-primary dark:text-[#1C0F02] font-cinzel font-bold text-sm flex items-center justify-center mx-auto mb-4 shadow-lg">
                  4
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary mb-1">Schedule Session</h4>
                <p className="text-[11px] text-text-secondary leading-normal max-w-[180px] mx-auto">
                  Reserve your private Zoom slot and receive initial prep files.
                </p>
              </div>

              <div className="text-center bg-card/10 lg:bg-transparent p-6 lg:p-0 rounded-2xl border border-border/10 lg:border-none">
                <div className="w-12 h-12 rounded-full bg-[#A86E25] border border-[#C29B47] text-white font-cinzel font-bold text-sm flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse">
                  5
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary mb-1">Begin Journey</h4>
                <p className="text-[11px] text-text-secondary leading-normal max-w-[180px] mx-auto">
                  Access deep cosmic clarity, certified learning, and success.
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* ==========================================
            SECTION 6 — FREQUENTLY ASKED QUESTIONS
            ========================================== */}
        <div className="mb-24 lg:mb-32">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-[#C29B47] font-semibold font-cinzel">Clarifying Curiosities</span>
            <h2 className="font-cinzel text-2xl lg:text-4xl font-bold tracking-wider text-text-primary mt-1">
              Frequently Asked
            </h2>
            <p className="text-xs text-text-secondary mt-2">
              Everything you need to know before securing your high-vibration consultation.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#C29B47]/20 bg-card/25 overflow-hidden transition-colors duration-300"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                  >
                    <span className="font-cinzel text-xs sm:text-sm font-bold tracking-wide text-text-primary">
                      {faq.q}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-primary shrink-0"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 pt-0 text-xs sm:text-sm text-text-secondary leading-relaxed border-t border-border/10">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* ==========================================
            SECTION 7 — OFFICE INFORMATION & MAP
            ========================================== */}
        <div className="mb-24 lg:mb-32">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-[#C29B47] font-semibold font-cinzel">Physical Coordinates</span>
            <h2 className="font-cinzel text-2xl lg:text-4xl font-bold tracking-wider text-text-primary mt-1">
              Office Information
            </h2>
            <div className="h-[1px] w-12 bg-primary/40 mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            <div className="lg:col-span-5 bg-card/45 rounded-3xl border border-[#C29B47]/20 p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <img src="/gemstone-assets/logo.jpg" alt="Leo Family Logo" className="w-12 h-12 rounded-full object-cover border border-[#C29B47]/30" />
                  <div>
                    <h3 className="font-cinzel text-base font-bold text-primary">LEO Family</h3>
                    <p className="text-[10px] uppercase font-mono tracking-widest text-text-secondary">Occult Science & Vedic Hub</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider font-semibold text-[#C29B47] block mb-1">Corporate Email</span>
                    <a href={`mailto:${contact.email}`} className="text-sm font-medium text-text-primary hover:text-primary transition-colors">
                      {contact.email}
                    </a>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider font-semibold text-[#C29B47] block mb-1">Founder Hotlines</span>
                      <a href={`tel:${contact.phones.founder.replace(/\s/g, '')}`} className="text-xs font-semibold text-text-primary hover:text-primary block">
                        {contact.phones.founder}
                      </a>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider font-semibold text-[#C29B47] block mb-1">General Inquiries</span>
                      <a href={`tel:${contact.phones.general.replace(/\s/g, '')}`} className="text-xs font-semibold text-text-primary hover:text-primary block">
                        {contact.phones.general}
                      </a>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-border/15">
                    <span className="text-[9px] uppercase tracking-wider font-semibold text-[#C29B47] block mb-1">Future Office Address</span>
                    <p className="text-xs text-text-secondary leading-normal">
                      Vedic Astrology & Vastu Centre, Signature Towers, BKC, Mumbai, Maharashtra 400051, India. <span className="italic opacity-85">(CMS Editable Address)</span>
                    </p>
                  </div>

                  <div>
                    <span className="text-[9px] uppercase tracking-wider font-semibold text-[#C29B47] block mb-1">Consultation Hours</span>
                    <p className="text-xs text-text-secondary font-medium">
                      {contact.businessHours}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-2 bg-primary/10 border border-primary/20 p-3 rounded-xl text-xs text-primary">
                <Globe className="w-4 h-4 shrink-0" />
                <span>Virtual Consultation slots aligned with GMT/EST/IST.</span>
              </div>
            </div>

            {/* Google Maps Premium Placeholder Card */}
            <div className="lg:col-span-7 rounded-3xl border border-[#C29B47]/20 bg-background/60 overflow-hidden relative min-h-[350px] lg:min-h-full flex flex-col justify-between">
              
              {/* Elegant golden map matrix overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(#C29B47_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
              
              {/* Compass center art decoration */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.06]">
                <Compass className="w-72 h-72 stroke-[1] spin-slow text-[#C29B47]" />
              </div>

              {/* Header inside map block */}
              <div className="p-6 relative z-10 bg-gradient-to-b from-card/85 to-transparent">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-amber-600 dark:text-amber-400">
                  Future Location Center
                </span>
                <h4 className="font-cinzel text-sm font-bold text-text-primary tracking-wide">
                  Mumbai BKC Headquarter Map
                </h4>
              </div>

              {/* Center visual targeting mark */}
              <div className="flex flex-col items-center justify-center py-16 relative z-10">
                <div className="relative">
                  <span className="absolute inset-0 rounded-full border-2 border-[#C29B47] animate-ping opacity-45" />
                  <div className="w-16 h-16 rounded-full bg-[#1C0F02] border-2 border-[#C29B47] flex items-center justify-center text-primary relative z-10 shadow-xl">
                    <MapPin className="w-6 h-6 animate-bounce" />
                  </div>
                </div>
                <p className="text-xs font-bold text-text-primary font-cinzel mt-4 uppercase tracking-widest text-shadow-gold">
                  LEO FAMILY STUDIOS
                </p>
                <p className="text-[10px] text-text-secondary mt-1">BKC, Mumbai, Maharashtra 400051</p>
              </div>

              {/* Map Footer status */}
              <div className="p-4 bg-card/90 relative z-10 border-t border-border/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-[10px] text-text-secondary flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Map service configured for elite local & global coordinates.
                </p>
                <button
                  onClick={() => window.open("https://maps.google.com")}
                  className="px-4 py-1.5 rounded bg-[#C29B47]/20 border border-[#C29B47]/40 hover:bg-[#C29B47] hover:text-white transition-colors duration-200 text-[10px] uppercase font-bold tracking-wider cursor-pointer"
                >
                  Open Google Maps
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* ==========================================
            SECTION 8 — CONNECT WITH US (Social Cards)
            ========================================== */}
        <div className="mb-24 lg:mb-32">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-[#C29B47] font-semibold font-cinzel">Verified Connections</span>
            <h2 className="font-cinzel text-2xl lg:text-4xl font-bold tracking-wider text-text-primary mt-1">
              Connect With Us
            </h2>
            <div className="h-[1px] w-12 bg-primary/40 mx-auto mt-2" />
          </div>

          <div className="space-y-12">
            <div>
              <h3 className="font-cinzel text-xs font-bold tracking-widest uppercase text-[#C29B47] mb-6 flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#C29B47]" /> Official Digital Hubs
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SocialCard url={brand.websites.main} />
                <SocialCard url={brand.websites.founder} />
                <SocialCard url={brand.websites.films} />
              </div>
            </div>

            <div>
              <h3 className="font-cinzel text-xs font-bold tracking-widest uppercase text-[#C29B47] mb-6 flex items-center gap-2">
                <Youtube className="w-4 h-4 text-red-500" /> Verified Broadcast Channels & Community
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <SocialCard url={social.youtube.main} />
                <SocialCard url={social.youtube.founder} />
                <SocialCard url={social.youtube.films} />
                <SocialCard url={social.facebook} />
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            SECTION 9 — FINAL CTA (Luxury Consulting Card)
            ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[2.5rem] bg-gradient-to-br from-[#1C0F02] via-[#2B1704] to-[#3B2207] p-8 lg:p-16 border border-[#C29B47]/40 shadow-2xl overflow-hidden text-center"
        >
          {/* Background vector geometry */}
          <div className="absolute inset-0 bg-[radial-gradient(#C29B47_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] block font-cinzel">
              Secure Alignment
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold font-cinzel text-white leading-tight">
              Your Next Chapter Begins Today
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Every meaningful journey begins with a single conversation. Whether you seek clarity, structured learning, or spiritual growth, we would be honored to guide you.
            </p>

            {/* CTA Triple Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              
              <button
                onClick={() => scrollToForm()}
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider text-[#1C0F02] bg-primary hover:bg-[#C29B47] hover:text-white transition-all duration-300 shadow-md shadow-primary/20 cursor-pointer"
              >
                Book Consultation
              </button>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white border border-[#C29B47]/40 bg-white/5 hover:bg-[#C29B47]/20 transition-all duration-300 text-center cursor-pointer block"
              >
                Chat on WhatsApp
              </a>

              <button
                onClick={() => {
                  // Scroll or navigate to academy
                  window.location.hash = "academy";
                  const academyEl = document.getElementById("academy");
                  if (academyEl) {
                    academyEl.scrollIntoView({ behavior: "smooth" });
                  } else {
                    // Fail-safe redirect if on another sub-path
                    window.location.pathname = "/academy";
                  }
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider text-text-primary hover:text-primary transition-all duration-300 cursor-pointer"
              >
                Explore Courses
              </button>

            </div>
          </div>
        </motion.div>

      </div>

      {/* SUCCESS MODAL */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSuccessModal(false)}
              className="absolute inset-0 bg-[#1C0F02]/85 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-[#FAF6F0] dark:bg-[#2B1704] border border-[#C29B47] rounded-3xl p-8 max-w-md w-full relative z-10 text-center shadow-2xl"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-500 flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 stroke-[2.5]" />
              </div>

              <h3 className="font-cinzel text-xl font-bold text-text-primary mb-2">
                Enquiry Received Successfully
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed mb-6">
                Thank you, <span className="text-primary font-bold">{formFields.fullName}</span>! Our relationship coordination team has secured your slot preferences for <span className="text-[#C29B47] font-semibold">{selectedConsultation}</span>. We will connect with you via email or phone within 24 hours.
              </p>

              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  setFormFields({
                    fullName: '',
                    phoneNumber: '',
                    emailAddress: '',
                    country: '',
                    city: '',
                    preferredDate: '',
                    preferredTime: 'Morning (10:00 AM - 1:00 PM)',
                    message: '',
                    agreed: false
                  });
                }}
                className="w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-[#C29B47] hover:brightness-110 transition-all cursor-pointer"
              >
                Close Portal
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* BRAND CMS CONTROL CENTER DASHBOARD */}
      <div className="mt-16 border-t border-white/5 pt-16 max-w-5xl mx-auto px-6 relative z-10 pb-16">
        <div className="bg-gradient-to-br from-[#2A1604]/90 to-[#1C0F02]/95 border border-[#C29B47]/30 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden text-left">
          {/* Subtle gold decorative background highlights */}
          <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-[#C29B47]/5 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-64 h-64 rounded-full bg-[#C29B47]/5 blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#C29B47]/10 text-[#C29B47] rounded-2xl border border-[#C29B47]/20">
                <Settings className="w-6 h-6 animate-spin" style={{ animationDuration: '6s' }} />
              </div>
              <div>
                <h3 className="font-cinzel text-lg font-bold text-white tracking-wider uppercase">
                  LEO Family CMS Brand Control Center
                </h3>
                <p className="text-[10px] uppercase font-mono tracking-widest text-[#C29B47]/80">
                  Update global brand, social & contact details in real-time
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCmsOpen(!isCmsOpen)}
              className="px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider bg-[#C29B47]/15 hover:bg-[#C29B47]/25 text-[#C29B47] border border-[#C29B47]/30 transition-all duration-300 cursor-pointer flex items-center gap-2"
            >
              {isCmsOpen ? "Collapse CMS Panel" : "Expand CMS Panel"}
              <ChevronDown className={`w-4 h-4 transform transition-transform duration-300 ${isCmsOpen ? "rotate-180" : ""}`} />
            </button>
          </div>

          <AnimatePresence>
            {isCmsOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  {/* Brand Information Section */}
                  <div className="space-y-4 p-5 rounded-2xl bg-black/30 border border-white/5">
                    <h4 className="font-cinzel text-xs font-bold text-[#C29B47] uppercase tracking-wider border-b border-white/5 pb-2">
                      1. Brand Information
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] uppercase font-bold text-stone-400 block mb-1">Brand Name</label>
                        <input
                          type="text"
                          name="brandName"
                          value={cmsForm.brandName}
                          onChange={handleCmsChange}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#1C0F02] border border-white/10 text-white text-xs font-sans focus:border-[#C29B47] outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold text-stone-400 block mb-1">Founder Name</label>
                        <input
                          type="text"
                          name="founderName"
                          value={cmsForm.founderName}
                          onChange={handleCmsChange}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#1C0F02] border border-white/10 text-white text-xs font-sans focus:border-[#C29B47] outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold text-stone-400 block mb-1">Brand Tagline</label>
                        <input
                          type="text"
                          name="tagline"
                          value={cmsForm.tagline}
                          onChange={handleCmsChange}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#1C0F02] border border-white/10 text-white text-xs font-sans focus:border-[#C29B47] outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Core Web Properties */}
                  <div className="space-y-4 p-5 rounded-2xl bg-black/30 border border-white/5">
                    <h4 className="font-cinzel text-xs font-bold text-[#C29B47] uppercase tracking-wider border-b border-white/5 pb-2">
                      2. Official Web Portals
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] uppercase font-bold text-stone-400 block mb-1">Main Website URL</label>
                        <input
                          type="text"
                          name="mainUrl"
                          value={cmsForm.mainUrl}
                          onChange={handleCmsChange}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#1C0F02] border border-white/10 text-white text-xs font-sans focus:border-[#C29B47] outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold text-stone-400 block mb-1">Founder Website URL</label>
                        <input
                          type="text"
                          name="founderUrl"
                          value={cmsForm.founderUrl}
                          onChange={handleCmsChange}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#1C0F02] border border-white/10 text-white text-xs font-sans focus:border-[#C29B47] outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold text-stone-400 block mb-1">Indian Films Website URL</label>
                        <input
                          type="text"
                          name="filmsUrl"
                          value={cmsForm.filmsUrl}
                          onChange={handleCmsChange}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#1C0F02] border border-white/10 text-white text-xs font-sans focus:border-[#C29B47] outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Social Outlets */}
                  <div className="space-y-4 p-5 rounded-2xl bg-black/30 border border-white/5">
                    <h4 className="font-cinzel text-xs font-bold text-[#C29B47] uppercase tracking-wider border-b border-white/5 pb-2">
                      3. Social Media & Media Channels
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] uppercase font-bold text-stone-400 block mb-1">YouTube Occult Gyan URL</label>
                        <input
                          type="text"
                          name="youtubeMain"
                          value={cmsForm.youtubeMain}
                          onChange={handleCmsChange}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#1C0F02] border border-white/10 text-white text-xs font-sans focus:border-[#C29B47] outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold text-stone-400 block mb-1">YouTube Founder URL</label>
                        <input
                          type="text"
                          name="youtubeFounder"
                          value={cmsForm.youtubeFounder}
                          onChange={handleCmsChange}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#1C0F02] border border-white/10 text-white text-xs font-sans focus:border-[#C29B47] outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold text-stone-400 block mb-1">YouTube Indian Films URL</label>
                        <input
                          type="text"
                          name="youtubeFilms"
                          value={cmsForm.youtubeFilms}
                          onChange={handleCmsChange}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#1C0F02] border border-white/10 text-white text-xs font-sans focus:border-[#C29B47] outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold text-stone-400 block mb-1">Facebook Page URL</label>
                        <input
                          type="text"
                          name="facebookUrl"
                          value={cmsForm.facebookUrl}
                          onChange={handleCmsChange}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#1C0F02] border border-white/10 text-white text-xs font-sans focus:border-[#C29B47] outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Core Communications */}
                  <div className="space-y-4 p-5 rounded-2xl bg-black/30 border border-white/5">
                    <h4 className="font-cinzel text-xs font-bold text-[#C29B47] uppercase tracking-wider border-b border-white/5 pb-2">
                      4. Communications Gateways
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] uppercase font-bold text-stone-400 block mb-1">Corporate Email</label>
                        <input
                          type="text"
                          name="email"
                          value={cmsForm.email}
                          onChange={handleCmsChange}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#1C0F02] border border-white/10 text-white text-xs font-sans focus:border-[#C29B47] outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold text-stone-400 block mb-1">General Support Phone</label>
                        <input
                          type="text"
                          name="generalPhone"
                          value={cmsForm.generalPhone}
                          onChange={handleCmsChange}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#1C0F02] border border-white/10 text-white text-xs font-sans focus:border-[#C29B47] outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold text-stone-400 block mb-1">Founder Hotline Phone</label>
                        <input
                          type="text"
                          name="founderPhone"
                          value={cmsForm.founderPhone}
                          onChange={handleCmsChange}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#1C0F02] border border-white/10 text-white text-xs font-sans focus:border-[#C29B47] outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold text-stone-400 block mb-1">Consultation Hours</label>
                        <input
                          type="text"
                          name="businessHours"
                          value={cmsForm.businessHours}
                          onChange={handleCmsChange}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#1C0F02] border border-white/10 text-white text-xs font-sans focus:border-[#C29B47] outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Save and Reset Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-4 border-t border-white/5">
                  <button
                    onClick={handleCmsReset}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-white transition-colors duration-200 border border-white/10 hover:border-white/20 bg-black/20 flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Restore Defaults
                  </button>
                  <button
                    onClick={handleCmsSave}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-[10px] font-bold uppercase tracking-widest text-[#1C0F02] bg-[#C29B47] hover:bg-[#E9C269] transition-all duration-300 shadow-lg shadow-[#C29B47]/10 flex items-center justify-center gap-2"
                  >
                    Save CMS Changes
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

    </section>
  );
};

export default ContactSection;
