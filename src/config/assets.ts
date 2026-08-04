// Strongly typed Asset Registry for the LEO Family ecosystem.
// All images, logos, and banners must be managed here to prevent hardcoding.

export interface AssetDetails {
  image: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}

export const Assets = {
  founder: {
    image: "/assets/teachers/Raajeev.webp",
    alt: "Raajeev Singh Chauhann, Founder of LEO Family",
    width: 800,
    height: 1000,
    priority: true,
    thumbnail: "/assets/teachers/Raajeev.webp",
    avatar: "/assets/teachers/Raajeev.webp",
    seoImage: "/assets/teachers/Raajeev.webp",
    openGraphImage: "/assets/teachers/Raajeev.webp"
  },
  teachers: {
    shaunak: {
      image: "/assets/teachers/shaunak.webp",
      alt: "Shaunak S. Patthak, Senior Faculty",
      avatar: "/assets/teachers/shaunak.webp",
      portrait: "/assets/teachers/shaunak.webp",
      seoImage: "/assets/teachers/shaunak.webp",
      openGraphImage: "/assets/teachers/shaunak.webp"
    },
    sannjoy: {
      image: "/assets/teachers/sannjoy/profile.png",
      alt: "Sannjoy Biswass",
      avatar: "/assets/teachers/sannjoy/profile.png",
      portrait: "/assets/teachers/sannjoy/profile.png",
      seoImage: "/assets/teachers/sannjoy/profile.png",
      openGraphImage: "/assets/teachers/sannjoy/profile.png"
    }
  },
  logo: {
    light: "/gemstone-assets/logo.jpg",
    dark: "/gemstone-assets/logo.jpg",
    gold: "/gemstone-assets/logo.jpg"
  },
  background: {
    starry: "/gemstone-assets/background.png"
  }
};
