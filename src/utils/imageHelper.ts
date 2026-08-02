import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Universal Image Resolver (AI Studio + Vercel + CDN Ready)
 */

export const resolveImagePath = (src: string): string => {
  if (!src) return "/fallback.png";

  // Full URL (CDN / external)
  if (
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith("data:")
  ) {
    return src;
  }

  // Normalize (remove leading /)
  let clean = src.replace(/^\/+/, "").toLowerCase();

  // Fallback case
  if (clean === "fallback.png") {
    // Return a reliable 1x1 transparent PNG data URL if fallback is requested
    return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
  }

  // Handle missing background.png by using a placeholder
  if (clean === "gemstone-assets/background.png" || clean === "background.png") {
    return "https://picsum.photos/seed/astrology/1920/1080?blur=2";
  }

  // If it's already a path to gemstone-assets, return it as is (with leading slash)
  if (clean.startsWith("gemstone-assets/")) {
    return `/${clean}`;
  }

  // Otherwise, assume it's a gemstone asset and prepend the directory
  return `/gemstone-assets/${clean}`;
};

/**
 * Tailwind helper
 */
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};