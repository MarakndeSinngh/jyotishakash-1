import React, { useState, useEffect } from "react";
import { resolveImagePath, cn } from "../utils/imageHelper";

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}

/**
 * SmartImage component that handles environment-aware image resolution,
 * loading errors, and fallback.
 */
const SmartImage: React.FC<SmartImageProps> = ({ 
  src, 
  alt, 
  className, 
  fallbackSrc = "/fallback.png", 
  ...props 
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(resolveImagePath(src));
  const [errorCount, setErrorCount] = useState<number>(0);

  // Update image path if src prop changes
  useEffect(() => {
    const resolved = resolveImagePath(src);
    setCurrentSrc(resolved);
    setErrorCount(0);
  }, [src]);

  const handleError = () => {
    // Prevent infinite loop if fallback also fails
    if (errorCount < 2) {
      const fallback = resolveImagePath(fallbackSrc);
      console.error(`SmartImage Error: Failed to load image at ${currentSrc}. Falling back to ${fallback}.`);
      setCurrentSrc(fallback);
      setErrorCount((prev) => prev + 1);
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      onError={handleError}
      referrerPolicy="no-referrer"
      // Ensure images have a safe z-index relative to overlays if needed
      // but preserve the original className's z-index if provided.
      className={cn("relative z-10", className)}
      {...props}
    />
  );
};

export default SmartImage;
