import { Navigation } from './types';

export const NAVIGATION_REGISTRY: Navigation = {
  desktop: [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { 
      label: "Learn", 
      path: "/numerology",
      dropdown: [
        { label: "Numerology", path: "/numerology", description: "Calculate core numbers & destiny blueprint" },
        { label: "Astrology", path: "/services", description: "Vedic chart analysis & planetary transits" },
        { label: "Vastu", path: "/services", description: "Sacred space energy & directional alignment" },
        { label: "Name Correction", path: "/numerology", description: "Phonetic vibration & name frequency shift" },
        { label: "Mobile Numerology", path: "/numerology", description: "Lucky phone digit vibration analysis" },
        { label: "Free Courses", path: "/academy", description: "Masterclasses & introductory video lessons", badge: "Free" },
        { label: "Blogs", path: "/media", description: "Articles, guides & spiritual wisdom" }
      ]
    },
    { label: "Gemstones", path: "/gemstones" },
    { 
      label: "Media", 
      path: "/media",
      dropdown: [
        { label: "Video Library", path: "/media", description: "Watch masterclasses & live recordings" },
        { label: "Student Reviews", path: "/media", description: "Verified student feedback & transformations" },
        { label: "Success Stories", path: "/shorts", description: "Quick video shorts & life shifts", badge: "Shorts" },
        { label: "Live Webinars", path: "/media", description: "Interactive online sessions & events" },
        { label: "Podcasts", path: "/media", description: "Listen to spiritual dialogues & podcasts" },
        { label: "Gallery", path: "/media", description: "Photos & event highlights" }
      ]
    },
    { label: "Spiritual AI", path: "/ai" },
    { 
      label: "Ecosystem", 
      path: "/ecosystem",
      dropdown: [
        { label: "LEO Family", path: "/ecosystem", description: "Our grand spiritual organization" },
        { label: "Academy", path: "/academy", description: "3 Master Mentors & specialized courses", badge: "Academies" },
        { label: "Indian Films", path: "/media", description: "Spiritual cinema & creative productions" },
        { label: "Consultation", path: "/contact", description: "Book 1-on-1 private guidance session" },
        { label: "Community", path: "/about", description: "Global network of seekers & alumni" },
        { label: "Events", path: "/contact", description: "Upcoming workshops & spiritual retreats" }
      ]
    },
    { label: "Contact", path: "/contact" }
  ],
  mobile: [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { 
      label: "Learn", 
      path: "/numerology",
      dropdown: [
        { label: "Numerology", path: "/numerology" },
        { label: "Astrology", path: "/services" },
        { label: "Vastu", path: "/services" },
        { label: "Name Correction", path: "/numerology" },
        { label: "Mobile Numerology", path: "/numerology" },
        { label: "Free Courses", path: "/academy" },
        { label: "Blogs", path: "/media" }
      ]
    },
    { label: "Gemstones", path: "/gemstones" },
    { 
      label: "Media", 
      path: "/media",
      dropdown: [
        { label: "Video Library", path: "/media" },
        { label: "Student Reviews", path: "/media" },
        { label: "Success Stories", path: "/shorts" },
        { label: "Live Webinars", path: "/media" },
        { label: "Podcasts", path: "/media" },
        { label: "Gallery", path: "/media" }
      ]
    },
    { label: "Spiritual AI", path: "/ai" },
    { 
      label: "Ecosystem", 
      path: "/ecosystem",
      dropdown: [
        { label: "LEO Family", path: "/ecosystem" },
        { label: "Academy", path: "/academy" },
        { label: "Indian Films", path: "/media" },
        { label: "Consultation", path: "/contact" },
        { label: "Community", path: "/about" },
        { label: "Events", path: "/contact" }
      ]
    },
    { label: "Contact", path: "/contact" }
  ],
  footer: [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Numerology Calculator", path: "/numerology" },
    { label: "Vedic Gemstones", path: "/gemstones" },
    { label: "Academy", path: "/academy" },
    { label: "Media Center", path: "/media" },
    { label: "Spiritual Shorts", path: "/shorts" },
    { label: "Spiritual AI", path: "/ai" },
    { label: "Ecosystem", path: "/ecosystem" },
    { label: "Contact Us", path: "/contact" }
  ],
  sidebar: [
    { label: "Dashboard", path: "/admin/dashboard", icon: "LayoutDashboard", roles: ["admin"] },
    { label: "Branding CMS", path: "/admin/cms", icon: "Settings", roles: ["admin"] },
    { label: "Consultation Queue", path: "/admin/consultations", icon: "Clock", roles: ["admin"] },
    { label: "Student List", path: "/admin/students", icon: "Users", roles: ["admin"] }
  ],
  admin: [
    { label: "Control Center", path: "/admin" },
    { label: "Brand Settings", path: "/admin/settings" },
    { label: "Data Import", path: "/admin/import" }
  ],
  futureMobileApp: [
    { label: "Home Feed", path: "/app/feed" },
    { label: "Daily Transits", path: "/app/transits" },
    { label: "AI Oracle", path: "/app/oracle" },
    { label: "Chat Support", path: "/app/chat" },
    { label: "Profile", path: "/app/profile" }
  ]
};
