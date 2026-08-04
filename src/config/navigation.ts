import { Navigation } from './types';

export const NAVIGATION_REGISTRY: Navigation = {
  desktop: [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Numerology", path: "/numerology" },
    { label: "Vedic Gemstones", path: "/gemstones" },
    { label: "Media Center", path: "/media" },
    { label: "Shorts", path: "/shorts" },
    { label: "Spiritual AI", path: "/ai" },
    { label: "Ecosystem", path: "/ecosystem" },
    { label: "Contact", path: "/contact" }
  ],
  mobile: [
    { label: "Home", path: "/" },
    { label: "About Raajeev S. Chauhann", path: "/about" },
    { label: "Numerology Calculator", path: "/numerology" },
    { label: "Vedic Gemstones Collection", path: "/gemstones" },
    { label: "LEO Media Center", path: "/media" },
    { label: "Spiritual Shorts", path: "/shorts" },
    { label: "Spiritual AI Assistant", path: "/ai" },
    { label: "LEO Ecosystem Hub", path: "/ecosystem" },
    { label: "Contact & Consult", path: "/contact" }
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
