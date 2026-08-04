import React, { useState } from "react";
import { motion } from "framer-motion";
import { Assets } from "../../config/assets";
import { useAcademy } from "../../context/AcademyContext";

export interface FounderImageProps {
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'custom' | string;
  variant?: 'portrait' | 'consultation' | 'candid' | 'rounded' | 'circle' | 'square';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
  priority?: boolean;
  className?: string;
  showGlow?: boolean;
  showFrame?: boolean;
  animation?: 'none' | 'hover-lift' | 'pulse-glow' | 'shine' | 'float';
  lazy?: boolean;
  theme?: 'maharaja' | 'classic' | 'dark' | 'light';
  id?: string;
}

export const FounderImage: React.FC<FounderImageProps> = ({
  src: srcProp,
  alt: altProp,
  size = 'md',
  variant = 'portrait',
  rounded = '2xl',
  priority = false,
  className = '',
  showGlow = true,
  showFrame = true,
  animation = 'hover-lift',
  lazy = true,
  theme = 'maharaja',
  id,
}) => {
  const [hasFailed, setHasFailed] = useState(false);
  const { activeAcademy } = useAcademy();

  // Central Source of Truth: Active Academy Assets or Assets Registry
  const registryImage = srcProp || activeAcademy?.assets?.profileImage || activeAcademy?.assets?.founderPortrait || Assets.founder.image;
  const imageAlt = altProp || activeAcademy?.instructorName || Assets.founder.alt;
  const fallbackImage = "/assets/teachers/Raajeev.webp";
  const displaySrc = hasFailed ? fallbackImage : registryImage;

  // Modern size styling mapping to prevent CLS (Cumulative Layout Shift)
  let sizeClasses = "";
  let width = 800;
  let height = 1000;

  switch (size) {
    case 'xs':
      sizeClasses = "w-10 h-10";
      width = 40;
      height = 40;
      break;
    case 'sm':
      sizeClasses = "w-24 h-24 sm:w-28 sm:h-28";
      width = 112;
      height = 112;
      break;
    case 'md':
      sizeClasses = "w-48 h-56 sm:w-56 sm:h-64";
      width = 224;
      height = 256;
      break;
    case 'lg':
      sizeClasses = "w-72 h-80 sm:w-80 sm:h-96";
      width = 320;
      height = 384;
      break;
    case 'xl':
      sizeClasses = "w-full max-w-[360px] aspect-[4/5] sm:max-w-[420px]";
      width = 420;
      height = 525;
      break;
    case 'custom':
      sizeClasses = "";
      break;
    default:
      sizeClasses = size;
  }

  // Rounded corner mappings
  const roundedClass = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
    full: 'rounded-full',
  }[rounded] || 'rounded-2xl';

  // Float animation with framer-motion properties
  const floatAnimation = animation === 'float' ? {
    y: [0, -10, 0]
  } : undefined;

  const floatTransition = animation === 'float' ? {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut" as const
  } : undefined;

  return (
    <motion.div
      id={id || `founder-img-${variant}`}
      className={`relative inline-block overflow-visible ${sizeClasses} ${className}`}
      animate={floatAnimation}
      transition={floatTransition}
    >
      {/* Soft Maharaja Gold Ambient Radial Glow */}
      {showGlow && theme === 'maharaja' && (
        <div className="absolute inset-0 -m-6 bg-[radial-gradient(circle,_rgba(233,194,105,0.25)_0%,_transparent_70%)] blur-2xl rounded-full opacity-80 pointer-events-none animate-pulse" />
      )}

      {/* Glassmorphism Outer Container & Luxury Golden Frame */}
      <div 
        className={`
          relative w-full h-full p-[3px] overflow-hidden transition-all duration-500
          ${roundedClass}
          ${showFrame ? 'bg-gradient-to-tr from-amber-600 via-yellow-300 to-amber-700 shadow-[0_10px_35px_rgba(28,15,2,0.6)]' : 'bg-transparent'}
          ${animation === 'hover-lift' ? 'hover:scale-[1.03] hover:shadow-[0_20px_50px_rgba(194,155,71,0.4)]' : ''}
        `}
      >
        {/* Subtle Sacred Geometry Backdrop for Blend Treatment */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(42,24,5,0.9)_0%,_rgba(10,5,2,0.95)_100%)] z-0" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_#C29B47_1px,_transparent_1px)] bg-[size:16px_16px] z-0 pointer-events-none" />

        {/* Floating Sparkle Particles */}
        {showGlow && (
          <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
            <span className="absolute w-1 h-1 bg-yellow-300 rounded-full top-1/4 left-1/4 animate-ping" style={{ animationDelay: '0.5s', animationDuration: '3s' }} />
            <span className="absolute w-1.5 h-1.5 bg-amber-400 rounded-full bottom-1/3 right-1/4 animate-ping" style={{ animationDelay: '1.2s', animationDuration: '4.5s' }} />
          </div>
        )}

        {/* Glass Layer */}
        <div className={`relative w-full h-full overflow-hidden bg-amber-950/10 backdrop-blur-sm z-10 ${roundedClass}`}>
          {/* Main Founder Image */}
          <img
            src={displaySrc}
            srcSet={`${displaySrc}?w=400 400w, ${displaySrc}?w=800 800w`}
            sizes="(max-width: 640px) 280px, (max-width: 1024px) 450px, 800px"
            alt={imageAlt}
            width={width}
            height={height}
            loading={priority ? "eager" : lazy ? "lazy" : "eager"}
            decoding="async"
            // @ts-ignore
            fetchPriority={priority ? "high" : "auto"}
            onError={() => {
              if (!hasFailed) {
                setHasFailed(true);
              }
            }}
            className={`
              w-full h-full object-cover object-top transition-transform duration-700
              ${animation === 'hover-lift' ? 'hover:scale-105' : ''}
            `}
          />

          {/* Golden Animated Shine Wave */}
          {animation === 'shine' && (
            <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full rotate-12 animate-[shimmer_6s_infinite] pointer-events-none z-20" />
          )}
        </div>
      </div>

      {/* Styled Shine keyframes injection */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-150%) rotate(12deg); }
          50% { transform: translateX(150%) rotate(12deg); }
          100% { transform: translateX(150%) rotate(12deg); }
        }
      `}</style>
    </motion.div>
  );
};
