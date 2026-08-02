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
    image: "/assets/Raajeev.png",
    alt: "Raajeev Singh Chauhann, Founder of LEO Family",
    width: 800,
    height: 1000,
    priority: true,
    thumbnail: "/assets/Raajeev.png",
    avatar: "/assets/Raajeev.png",
    seoImage: "/assets/Raajeev.png",
    openGraphImage: "/assets/Raajeev.png"
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
