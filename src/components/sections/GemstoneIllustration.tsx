import React from 'react';

interface GemstoneIllustrationProps {
  src: string;
  panel?: number;
  alt: string;
  className?: string;
}

const PANEL_POSITIONS = [
  'left top',
  'right top',
  'left bottom',
  'right bottom'
];

/**
 * Displays one quadrant from a four-gem AI illustration sheet.
 * These images are illustrative only and must never count as product,
 * natural-origin, treatment, quality, or laboratory verification.
 */
const GemstoneIllustration: React.FC<GemstoneIllustrationProps> = ({
  src,
  panel = 0,
  alt,
  className = ''
}) => {
  const position = PANEL_POSITIONS[Math.max(0, Math.min(3, Math.trunc(panel)))];

  return (
    <div
      role="img"
      aria-label={`${alt}. AI-generated illustration; actual stone may differ.`}
      className={`relative overflow-hidden bg-stone-900 ${className}`}
      style={{
        backgroundImage: `url("${src}")`,
        backgroundSize: '200% 200%',
        backgroundPosition: position,
        backgroundRepeat: 'no-repeat'
      }}
    >
      <span className="absolute bottom-1.5 left-1.5 z-20 rounded-md bg-stone-950/75 px-1.5 py-1 text-[8px] font-semibold uppercase tracking-wide text-amber-100 backdrop-blur-sm">
        AI illustration · actual stone may differ
      </span>
    </div>
  );
};

export default GemstoneIllustration;
