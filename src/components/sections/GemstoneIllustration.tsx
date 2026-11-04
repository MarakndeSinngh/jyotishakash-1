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
 * The original artwork is preserved: a smaller, sharp panel sits over
 * a softly blurred copy of the same panel to fill the surrounding space.
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

  const panelStyle: React.CSSProperties = {
    backgroundImage: `url("${src}")`,
    backgroundSize: '200% 200%',
    backgroundPosition: position,
    backgroundRepeat: 'no-repeat'
  };

  return (
    <div
      role="img"
      aria-label={`${alt}. AI-generated illustration; actual stone may differ.`}
      className={`relative isolate overflow-hidden bg-stone-900 ${className}`}
    >
      {/* Soft, enlarged version of the same panel fills the outer edges. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          ...panelStyle,
          filter: 'blur(14px) brightness(0.68) saturate(0.9)',
          transform: 'scale(1.12)'
        }}
      />

      {/* Slightly reduced clear panel: no new artwork or generated image. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[6%] overflow-hidden rounded-lg border border-white/15 shadow-lg"
        style={panelStyle}
      />

      <span className="absolute bottom-1.5 left-1.5 z-20 rounded-md bg-stone-950/75 px-1.5 py-1 text-[8px] font-semibold uppercase tracking-wide text-amber-100 backdrop-blur-sm">
        AI illustration · actual stone may differ
      </span>
    </div>
  );
};

export default GemstoneIllustration;
