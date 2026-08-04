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
  logo: {
    light: "/gemstone-assets/logo.jpg",
    dark: "/gemstone-assets/logo.jpg",
    gold: "/gemstone-assets/logo.jpg"
  },
  background: {
    starry: "/gemstone-assets/background.png"
  }
};
