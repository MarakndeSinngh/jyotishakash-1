import React, { useState } from 'react';
import { 
  Sparkles, 
  Award, 
  Gift, 
  CheckCircle2, 
  Phone, 
  MessageSquare, 
  Mail, 
  Calendar, 
  User, 
  ShieldCheck, 
  ArrowRight,
  Star,
  Clock,
  Compass
} from 'lucide-react';
import { CONTACT_INFO } from '../config/contacts';

interface AIConsultationPortalProps {
  initialProfile?: {
    name?: string;
    dob?: string;
    mobile?: string;
    gender?: string;
  } | null;
  onProfileUpdate?: (profile: any) => void;
}

export default function AIConsultationPortal({
  initialProfile,
  onProfileUpdate
}: AIConsultationPortalProps) {
  const [concernCategory, setConcernCategory] = useState<string>('CAREER_BUSINESS');
  const [userQuery, setUserQuery] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const whatsappMessage = encodeURIComponent(
    `Namaste Raajeev Sir, I am interested in booking the Personal Consultation Offer (₹11,999). Name: ${initialProfile?.name || 'Student'}, DOB: ${initialProfile?.dob || 'Not specified'}, Concern: ${concernCategory}`
  );
  const whatsappUrl = `https://wa.me/919953713176?text=${whatsappMessage}`;

  const benefits = [
    { title: 'Detailed Astrology & Numerology Report', desc: 'Comprehensive chart analysis with Mulank, Bhagyank, and planetary transits.' },
    { title: 'Mix Bracelet — Worth ₹1,900', desc: 'Energized crystal & gemstone bracelet customized for your elemental balance.' },
    { title: 'Rudraksha Bead as per astrological chart — Worth ₹700', desc: 'Authentic blessed Rudraksha aligned with your ruling deity and birth chart.' },
    { title: 'Name Correction Guidance', desc: 'Chaldean & Pythagorean spelling vibration optimization for career and prosperity.' },
    { title: 'Personalised Mobile Number Suggestion', desc: 'Guidance on choosing an auspicious 10-digit mobile number with positive yogas.' },
    { title: 'Gemstone Suggestion as per astrological chart', desc: 'Precise recommendation on wearing suitable metals, finger, and day.' },
    { title: 'Personal guidance for your specific concerns', desc: 'One-on-one direct clarity with Raajeev Sir for career, business, wealth, and relationships.' }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12 font-sans text-left">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#020617] text-white p-6 md:p-10 rounded-[32px] border border-amber-500/20 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-300 uppercase tracking-widest">
            <Star className="w-4 h-4 fill-amber-300 text-amber-300" /> A SPECIAL OPPORTUNITY FOR LEO FAMILY STUDENTS
          </div>

          <h2 className="text-3xl md:text-5xl font-playfair font-bold text-white leading-tight">
            Personal Guidance by Raajeev Sir
          </h2>

          <p className="text-xs md:text-base text-slate-300 max-w-3xl leading-relaxed">
            Facing challenges in career, business, wealth, relationships or personal life? Get personalised Astrology &amp; Numerology insights and guidance tailored to your concerns.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-6">
            <div className="bg-white/5 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10">
              <span className="text-[10px] text-slate-400 block uppercase font-mono">Regular Price</span>
              <span className="text-lg line-through text-slate-400 font-bold">₹21,999</span>
            </div>
            <div className="bg-gradient-to-r from-amber-500/20 to-amber-600/30 px-6 py-3 rounded-2xl border border-amber-500/40">
              <span className="text-[10px] text-amber-300 block uppercase font-mono font-bold">Special Consultation Fee</span>
              <span className="text-3xl font-black text-amber-300 font-playfair">₹11,999</span>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold px-6 py-4 rounded-2xl text-xs uppercase tracking-wider flex items-center gap-2 transition shadow-lg cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Explore Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <p className="text-xs text-amber-200/80 font-sans italic pt-1">
            A personal guidance opportunity to gain clarity and make informed decisions.
          </p>
        </div>
      </div>

      {/* Two Column Layout: Benefits & Booking Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Included Benefits */}
        <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b pb-4">
            <h3 className="font-playfair text-xl font-bold text-slate-900 flex items-center gap-2">
              <Gift className="w-5 h-5 text-amber-600" /> Included Benefits &amp; Student Privileges
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Every personal consultation comes with verified remedial items and customized reports
            </p>
          </div>

          <div className="space-y-4">
            {benefits.map((b, i) => (
              <div key={i} className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-amber-50/40 border border-amber-200/60">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs md:text-sm text-slate-900">{b.title}</h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1">
            <span className="font-bold text-slate-800 block">📞 Direct Consultation Coordinates:</span>
            <div>Phone: <span className="font-bold text-slate-800">{CONTACT_INFO.phones.founder}</span> / <span className="font-bold text-slate-800">{CONTACT_INFO.phones.general}</span></div>
            <div>Email: <span className="font-bold text-slate-800">{CONTACT_INFO.email}</span></div>
            <div>Hours: <span className="font-bold text-slate-800">{CONTACT_INFO.businessHours}</span></div>
          </div>
        </div>

        {/* Concern Submission / Inquiry Form */}
        <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
          <div className="border-b pb-4">
            <h3 className="font-playfair text-xl font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-600" /> Book / Inquire Now
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Share your primary area of concern for an initial review by the LeoFamily team
            </p>
          </div>

          {isSubmitted ? (
            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-300 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-base text-emerald-900">Inquiry Received!</h4>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Thank you! Our consultation coordinator will contact you shortly on WhatsApp / Phone to schedule your session with Raajeev Sir.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider"
              >
                <MessageSquare className="w-4 h-4" /> Message on WhatsApp Now
              </a>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsSubmitted(true);
              }}
              className="space-y-4"
            >
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase block mb-1">
                  Primary Area of Concern
                </label>
                <select
                  value={concernCategory}
                  onChange={(e) => setConcernCategory(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-amber-500"
                >
                  <option value="CAREER_BUSINESS">Career, Promotion &amp; Business Expansion</option>
                  <option value="WEALTH_FINANCE">Wealth, Debts &amp; Financial Stability</option>
                  <option value="MARRIAGE_RELATIONSHIP">Marriage, Love &amp; Partner Compatibility</option>
                  <option value="HEALTH_VITALITY">Health, Energy &amp; Chronic Obstacles</option>
                  <option value="NAME_MOBILE">Name &amp; Mobile Number Correction</option>
                  <option value="CHILD_EDUCATION">Child Education &amp; Name Selection</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase block mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  defaultValue={initialProfile?.name || ''}
                  placeholder="Enter full name"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase block mb-1">
                  WhatsApp Mobile Number
                </label>
                <input
                  type="text"
                  required
                  defaultValue={initialProfile?.mobile || ''}
                  placeholder="10-digit mobile number"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase block mb-1">
                  Brief description of your situation
                </label>
                <textarea
                  rows={3}
                  value={userQuery}
                  onChange={(e) => setUserQuery(e.target.value)}
                  placeholder="E.g., Seeking advice on career switch and suitable gemstone..."
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Submit Consultation Request</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
