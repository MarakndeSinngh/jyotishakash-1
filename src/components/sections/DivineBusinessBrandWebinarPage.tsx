import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Compass,
  MessageCircle,
  Mic2,
  Sparkles,
  Users,
  WandSparkles
} from 'lucide-react';
import {
  DIVINE_BUSINESS_WEBINAR_BADGE,
  DIVINE_BUSINESS_WEBINAR_GROUP_URL,
  DIVINE_BUSINESS_WEBINAR_TITLE
} from '../../constants/divineBusinessWebinar';

const problems = [
  'Kya aapka business expected growth achieve nahi kar raha?',
  'Kya naye customers aur repeat enquiries nahi badh rahi hain?',
  'Kya aap ek strong business circle aur network banane mein challenge face kar rahe hain?',
  'Kya market mein aapke brand ko woh recognition nahi mil rahi jiski aap ummeed karte hain?',
  'Kya naye opportunities aur business connections aapke saath nahi jud paa rahe hain?'
];

const pillars = [
  {
    title: 'ASTROLOGY',
    subtitle: 'Planetary Alignment',
    description: 'Business context, planetary associations, and the traditional use of colours, shapes and symbols in brand identity.',
    icon: Compass
  },
  {
    title: 'NUMEROLOGY',
    subtitle: 'Power of Numbers',
    description: 'Business name number analysis, owner Mulank and Bhagyank, and numerological name combinations.',
    icon: Sparkles
  },
  {
    title: 'PRONOLOGY',
    subtitle: 'Power of Name Sounds',
    description: 'Brand-name sound, pronunciation and alphabet-pattern analysis for a meaningful and memorable identity.',
    icon: Mic2
  }
];

const learningDays = [
  {
    day: 'DAY 1',
    title: 'ASTROLOGY & BRAND ALIGNMENT',
    points: [
      'Business and brand-related astrological considerations',
      'Planetary associations with colours, shapes and symbols',
      'Connecting brand identity with business vision'
    ]
  },
  {
    day: 'DAY 2',
    title: 'NUMEROLOGY & BUSINESS NAME',
    points: [
      'Business Name Numerology and number calculation',
      'Owner Mulank and Bhagyank considerations',
      'Exploring harmonious name-number combinations'
    ]
  },
  {
    day: 'DAY 3',
    title: 'PRONOLOGY & LOGO CONCEPT',
    points: [
      'Brand-name sound and pronunciation patterns',
      'Alphabet combinations and name recall',
      'Combining all three disciplines into a logo concept'
    ]
  }
];

const audience = [
  'Business owners and entrepreneurs',
  'Startup founders and new business owners',
  'Shop owners and traders',
  'Astrologers and numerologists',
  'Branding and digital marketing professionals',
  'Anyone planning to launch a new business'
];

const faqs = [
  {
    question: 'Is this webinar free?',
    answer: 'Yes. This is an exclusive 3-day free live webinar organised by LEO Family Occult School.'
  },
  {
    question: 'What will be covered in the webinar?',
    answer: 'The sessions introduce Astrology, Numerology and Pronology as traditional approaches to brand-name selection and logo concept development.'
  },
  {
    question: 'When will the webinar take place?',
    answer: 'The dates and session timings will be announced. Join the official WhatsApp group to receive the latest schedule and joining updates.'
  },
  {
    question: 'Who should join?',
    answer: 'Business owners, entrepreneurs, startup founders, shop owners, astrologers, numerologists and people interested in brand creation are welcome.'
  },
  {
    question: 'How do I register?',
    answer: 'Join the official LEO Family WhatsApp group using the Join WhatsApp Group button on this page. Webinar announcements and joining information will be shared there.'
  }
];

interface DivineBusinessBrandWebinarPageProps {
  navigate?: (path: string) => void;
}

export default function DivineBusinessBrandWebinarPage({ navigate }: DivineBusinessBrandWebinarPageProps) {
  const [openFaq, setOpenFaq] = useState<number>(0);

  const goHome = () => {
    if (navigate) {
      navigate('/');
      return;
    }
    window.location.href = '/';
  };

  return (
    <main className="min-h-screen bg-[#FAF6F0] text-[#2B1704]">
      <Helmet>
        <title>Divine Business Brand Name & Logo Design | Free 3-Day Webinar | LEO Family</title>
        <meta
          name="description"
          content="Join LEO Family's exclusive 3-day free live webinar on Divine Business Brand Name & Logo Design through Astrology, Numerology and Pronology."
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Divine Business Brand Name & Logo Design | Free 3-Day Live Webinar" />
        <meta property="og:description" content="Explore business brand identity through Astrology, Numerology and Pronology. Join the free 3-day live webinar by LEO Family Occult School." />
        <meta property="og:url" content="https://www.leofamily.online/webinars/divine-business-brand-name-logo-design" />
        <meta property="og:image" content="https://www.leofamily.online/gemstone-assets/logo.jpg" />
        <meta property="og:image:alt" content="LEO Family Occult School" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Divine Business Brand Name & Logo Design | LEO Family" />
        <meta name="twitter:description" content="Exclusive 3-day free live webinar through Astrology, Numerology and Pronology." />
        <meta name="twitter:image" content="https://www.leofamily.online/gemstone-assets/logo.jpg" />
        <link rel="canonical" href="https://www.leofamily.online/webinars/divine-business-brand-name-logo-design" />
        <meta name="keywords" content="business brand name, logo design webinar, astrology, numerology, pronology, LEO Family" />
      </Helmet>

      <section className="relative overflow-hidden bg-gradient-to-br from-[#1C0F02] via-[#2B1704] to-[#1C0F02] text-[#FAF6F0]">
        <div className="pointer-events-none absolute -top-28 right-[-5rem] h-80 w-80 rounded-full bg-[#C29B47]/15 blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-8rem] left-[-4rem] h-80 w-80 rounded-full bg-[#A86E25]/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-16">
          <button
            type="button"
            onClick={goHome}
            className="mb-8 inline-flex items-center gap-2 text-xs font-semibold text-[#E9C269] transition hover:text-white"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            Back to LEO Family
          </button>

          <div className="mx-auto max-w-5xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#C29B47]/60 bg-[#C29B47]/15 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#F2D797] shadow-lg">
              <Sparkles className="h-4 w-4" />
              {DIVINE_BUSINESS_WEBINAR_BADGE}
            </div>

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#E9C269]">
              LEO FAMILY OCCULT SCHOOL PRESENTS
            </p>

            <h1 className="font-cinzel text-3xl font-extrabold leading-tight text-[#FAF6F0] sm:text-5xl lg:text-6xl">
              {DIVINE_BUSINESS_WEBINAR_TITLE}
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-[#E6D8C4] sm:text-lg">
              Explore a distinctive approach to brand creation by bringing together traditional Astrology,
              Numerology and Pronology principles.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={DIVINE_BUSINESS_WEBINAR_GROUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-7 py-4 text-sm font-extrabold uppercase tracking-wide text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-[#1EBD5B] sm:w-auto"
              >
                <MessageCircle className="h-5 w-5" />
                Join WhatsApp Group
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="#webinar-curriculum"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#C29B47]/70 bg-[#FAF6F0]/5 px-7 py-4 text-sm font-bold uppercase tracking-wide text-[#F2D797] transition hover:bg-[#FAF6F0]/10 sm:w-auto"
              >
                Explore 3-Day Curriculum
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mx-auto mt-9 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-[#C29B47]/35 bg-black/20 px-4 py-4">
                <CalendarDays className="mx-auto mb-2 h-5 w-5 text-[#E9C269]" />
                <span className="block text-xs font-bold uppercase tracking-wider text-[#E9C269]">Duration</span>
                <span className="mt-1 block text-sm font-semibold">3 Days</span>
              </div>
              <div className="rounded-xl border border-[#C29B47]/35 bg-black/20 px-4 py-4">
                <Sparkles className="mx-auto mb-2 h-5 w-5 text-[#E9C269]" />
                <span className="block text-xs font-bold uppercase tracking-wider text-[#E9C269]">Entry</span>
                <span className="mt-1 block text-sm font-semibold">Completely Free</span>
              </div>
              <div className="rounded-xl border border-[#C29B47]/35 bg-black/20 px-4 py-4">
                <Clock3 className="mx-auto mb-2 h-5 w-5 text-[#E9C269]" />
                <span className="block text-xs font-bold uppercase tracking-wider text-[#E9C269]">Schedule</span>
                <span className="mt-1 block text-sm font-semibold">To Be Announced</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:py-20">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#A86E25]">Does this sound familiar?</span>
          <h2 className="mt-3 font-cinzel text-2xl font-extrabold leading-tight text-[#2B1704] sm:text-3xl">
            Kya aapka business expected growth achieve nahi kar raha?
          </h2>
          <div className="mt-6 space-y-3">
            {problems.map((problem, index) => (
              <div key={problem} className="flex items-start gap-3 rounded-xl border border-[#E5D4BE] bg-white/75 p-4 shadow-sm">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#A86E25] text-xs font-extrabold text-white">
                  {index + 1}
                </span>
                <p className="text-sm font-medium leading-relaxed text-[#2B1704]">{problem}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center rounded-3xl border border-[#C29B47]/45 bg-gradient-to-br from-[#F2E9DC] to-[#FAF6F0] p-6 shadow-xl sm:p-8">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#1C0F02] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#E9C269]">
            <WandSparkles className="h-4 w-4" />
            A fresh perspective on branding
          </span>
          <h2 className="mt-5 font-cinzel text-2xl font-extrabold leading-tight text-[#2B1704] sm:text-3xl">
            Have you considered the role of your Brand Name and Brand Logo?
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#5A4027]">
            A brand name and logo shape how people recognise, remember and perceive a business. This webinar explores
            how traditional Astrology, Numerology and Pronology principles can be considered while developing a
            meaningful brand identity.
          </p>
          <p className="mt-4 border-l-2 border-[#A86E25] pl-4 text-sm font-semibold leading-relaxed text-[#2B1704]">
            Don’t just create a business name or logo. Learn an integrated approach to creating a brand identity
            that reflects your business vision.
          </p>
          <a
            href={DIVINE_BUSINESS_WEBINAR_GROUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-[#A86E25] px-5 py-3.5 text-sm font-extrabold uppercase tracking-wide text-white shadow-lg transition hover:bg-[#86551D]"
          >
            Join the Free Webinar Group
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <section className="bg-[#F2E9DC] py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <span className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#A86E25]">Three disciplines, one brand identity</span>
            <h2 className="mt-3 font-cinzel text-2xl font-extrabold text-[#2B1704] sm:text-4xl">
              Astrology + Numerology + Pronology
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#5A4027]">
              Understand how these traditional approaches can be brought into a brand-name and logo-design process.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {pillars.map(({title, subtitle, description, icon: Icon}) => (
              <article key={title} className="rounded-2xl border border-[#D7C4A9] bg-[#FAF6F0] p-6 shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1C0F02] text-[#E9C269]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-cinzel text-lg font-extrabold text-[#2B1704]">{title}</h3>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#A86E25]">{subtitle}</p>
                <p className="mt-3 text-sm leading-relaxed text-[#5A4027]">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="webinar-curriculum" className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="mb-10 text-center">
          <span className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#A86E25]">What you will learn</span>
          <h2 className="mt-3 font-cinzel text-2xl font-extrabold text-[#2B1704] sm:text-4xl">
            A 3-Day Learning Experience
          </h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {learningDays.map((day) => (
            <article key={day.day} className="rounded-2xl border border-[#E5D4BE] bg-white p-6 shadow-md">
              <span className="inline-flex rounded-full bg-[#1C0F02] px-3 py-1.5 text-[10px] font-extrabold tracking-[0.16em] text-[#E9C269]">
                {day.day}
              </span>
              <h3 className="mt-4 font-cinzel text-lg font-extrabold leading-snug text-[#2B1704]">{day.title}</h3>
              <ul className="mt-4 space-y-3">
                {day.points.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm leading-relaxed text-[#5A4027]">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#A86E25]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#1C0F02] py-14 text-[#FAF6F0] sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#E9C269]">Who should join?</span>
            <h2 className="mt-3 font-cinzel text-2xl font-extrabold text-[#FAF6F0] sm:text-3xl">
              Made for Business Builders and Brand Creators
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {audience.map((item) => (
                <li key={item} className="flex items-start gap-2 rounded-xl border border-[#C29B47]/25 bg-white/5 p-3 text-sm text-[#E6D8C4]">
                  <Users className="mt-0.5 h-4 w-4 shrink-0 text-[#E9C269]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[#C29B47]/40 bg-[#2B1704] p-6 sm:p-8">
            <span className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#E9C269]">Webinar details</span>
            <div className="mt-5 space-y-4">
              <div className="flex items-center gap-3">
                <CalendarDays className="h-5 w-5 text-[#E9C269]" />
                <div><span className="block text-[10px] font-bold uppercase tracking-wider text-[#CDBB9F]">Duration</span><strong className="text-sm">3 Days</strong></div>
              </div>
              <div className="flex items-center gap-3">
                <Clock3 className="h-5 w-5 text-[#E9C269]" />
                <div><span className="block text-[10px] font-bold uppercase tracking-wider text-[#CDBB9F]">Dates & Timing</span><strong className="text-sm">To Be Announced</strong></div>
              </div>
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-[#E9C269]" />
                <div><span className="block text-[10px] font-bold uppercase tracking-wider text-[#CDBB9F]">Registration</span><strong className="text-sm">Free Live Webinar</strong></div>
              </div>
            </div>
            <p className="mt-5 text-xs leading-relaxed text-[#CDBB9F]">
              Join the official WhatsApp group for schedule announcements, webinar updates and joining instructions.
            </p>
            <a
              href={DIVINE_BUSINESS_WEBINAR_GROUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-4 text-sm font-extrabold uppercase tracking-wide text-white shadow-lg transition hover:bg-[#1EBD5B]"
            >
              <MessageCircle className="h-5 w-5" />
              Join WhatsApp Group
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="text-center">
          <span className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#A86E25]">Need to know</span>
          <h2 className="mt-3 font-cinzel text-2xl font-extrabold text-[#2B1704] sm:text-3xl">Frequently Asked Questions</h2>
        </div>
        <div className="mt-8 space-y-3">
          {faqs.map((faq, index) => (
            <div key={faq.question} className="overflow-hidden rounded-xl border border-[#E5D4BE] bg-white">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                aria-expanded={openFaq === index}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-bold text-[#2B1704]"
              >
                {faq.question}
                <ChevronDown className={`h-4 w-4 shrink-0 text-[#A86E25] transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === index && (
                <p className="border-t border-[#E5D4BE] px-5 py-4 text-sm leading-relaxed text-[#5A4027]">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#A86E25] via-[#C29B47] to-[#A86E25] px-5 py-12 text-center text-[#1C0F02] sm:py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-cinzel text-2xl font-extrabold sm:text-4xl">
            Your Name. Your Numbers. Your Brand Identity.
          </h2>
          <p className="mt-3 text-sm font-medium text-[#2B1704]">
            Join the free 3-day live webinar and explore a new approach to brand creation.
          </p>
          <a
            href={DIVINE_BUSINESS_WEBINAR_GROUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-[#1C0F02] px-8 py-4 text-sm font-extrabold uppercase tracking-wide text-[#FAF6F0] shadow-xl transition hover:bg-[#2B1704]"
          >
            <MessageCircle className="h-5 w-5" />
            Join the Official WhatsApp Group
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <p className="mt-5 text-[11px] leading-relaxed text-[#3D260C]">
            Astrology, Numerology and Pronology are presented as traditional interpretive approaches. Brand strategy,
            design quality, market fit and execution also influence business outcomes; no business growth result is guaranteed.
          </p>
        </div>
      </section>
    </main>
  );
}
