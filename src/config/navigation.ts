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
        { label: "Astrology", path: "/programs?filter=astrology", description: "Vedic chart analysis & planetary transits" },
        { label: "Vastu", path: "/programs?filter=vastu", description: "Sacred space energy & directional alignment" },
        { label: "Name Correction", path: "/programs?filter=name", description: "Phonetic vibration & name frequency shift" },
        { label: "Gemstones", path: "/gemstones", description: "Authentic Vedic gemstone guidance & energization" },
        { label: "Meditation", path: "/meditation", description: "Guided inner stillness, mindfulness & batch learning", badge: "New" },
        { label: "Courses", path: "/programs", description: "Masterclasses & structured training programs", badge: "Programs" },
        { label: "Blogs", path: "/blogs", description: "Articles, guides & spiritual wisdom" }
      ]
    },
    { 
      label: "Media", 
      path: "/media",
      dropdown: [
        { label: "Video Library", path: "/media", description: "Watch masterclasses & live recordings" },
        { label: "Student Reviews", path: "/media", description: "Verified student feedback & transformations" },
        { label: "Success Stories", path: "/shorts", description: "Quick video shorts & life shifts", badge: "Shorts" },
        { label: "Webinars", path: "/media", description: "Interactive online sessions & events" },
        { label: "Podcasts", path: "/media", description: "Listen to spiritual dialogues & podcasts" },
        { label: "Gallery", path: "/media", description: "Photos & event highlights" }
      ]
    },
    { label: "Spiritual AI", path: "/ai" },
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
        { label: "Astrology", path: "/programs?filter=astrology" },
        { label: "Vastu", path: "/programs?filter=vastu" },
        { label: "Name Correction", path: "/programs?filter=name" },
        { label: "Gemstones", path: "/gemstones" },
        { label: "Meditation", path: "/meditation" },
        { label: "Courses", path: "/programs" },
        { label: "Blogs", path: "/blogs" }
      ]
    },
    { 
      label: "Media", 
      path: "/media",
      dropdown: [
        { label: "Video Library", path: "/media" },
        { label: "Student Reviews", path: "/media" },
        { label: "Success Stories", path: "/shorts" },
        { label: "Webinars", path: "/media" },
        { label: "Podcasts", path: "/media" },
        { label: "Gallery", path: "/media" }
      ]
    },
    { label: "Spiritual AI", path: "/ai" },
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
