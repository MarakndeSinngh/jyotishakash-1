import React from 'react';
import { Sparkles } from 'lucide-react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true
}) => {
  const iconSize = size === 'sm' ? 'w-5 h-5' : size === 'lg' ? 'w-8 h-8' : 'w-6 h-6';
  const titleSize = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-xl' : 'text-base';

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#143D2E] via-[#1E5642] to-[#C6A15B] flex items-center justify-center shadow-sm text-amber-200">
        <Sparkles className={iconSize} />
      </div>
      <div>
        <div className={`font-playfair font-bold text-slate-800 ${titleSize} tracking-wide`}>
          LEO FAMILY
        </div>
        {showSubtitle && (
          <div className="text-[9px] font-mono tracking-[0.2em] text-[#C6A15B] uppercase font-bold">
            Cosmic Numerology
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandLogo;
