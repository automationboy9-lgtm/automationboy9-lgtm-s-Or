import React, { useState } from 'react';
import { School, Landmark, GraduationCap, Shield } from 'lucide-react';
import { Institution } from '../types';

interface InstitutionLogoProps {
  institution?: Partial<Institution> | {
    name?: string;
    shortName?: string;
    logoColor?: string;
    logo?: string;
    logoUrl?: string;
    type?: string;
  };
  name?: string;
  shortName?: string;
  logoColor?: string;
  logoUrl?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  showBorder?: boolean;
}

export const InstitutionLogo: React.FC<InstitutionLogoProps> = ({
  institution,
  name: propName,
  shortName: propShortName,
  logoColor: propLogoColor,
  logoUrl: propLogoUrl,
  size = 'md',
  className = '',
  showBorder = true
}) => {
  const [imageError, setImageError] = useState(false);

  const name = propName || institution?.name || 'Institution';
  const shortName = propShortName || institution?.shortName || (name ? name.substring(0, 4).toUpperCase() : 'SCH');
  const logoColor = propLogoColor || institution?.logoColor || '#059669';
  const logoSrc = propLogoUrl || institution?.logoUrl || institution?.logo || '';
  const type = institution?.type || '';

  const sizeClasses = {
    xs: 'w-6 h-6 text-[9px] rounded-lg',
    sm: 'w-8 h-8 text-[10px] rounded-xl',
    md: 'w-11 h-11 text-xs rounded-xl',
    lg: 'w-14 h-14 text-sm rounded-2xl',
    xl: 'w-18 h-18 text-base rounded-2xl',
    '2xl': 'w-24 h-24 text-xl rounded-3xl'
  };

  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
    '2xl': 'w-10 h-10'
  };

  const borderClass = showBorder 
    ? 'border border-slate-200/80 dark:border-slate-700/80 shadow-sm' 
    : '';

  // If a valid logo URL is available and hasn't errored out yet
  if (logoSrc && !imageError) {
    return (
      <div 
        className={`relative flex items-center justify-center shrink-0 overflow-hidden bg-white dark:bg-slate-800 p-1 ${sizeClasses[size]} ${borderClass} ${className}`}
        title={name}
      >
        <img
          src={logoSrc}
          alt={`${name} emblem`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain rounded-md transition-transform duration-200 hover:scale-105"
          onError={() => setImageError(true)}
          loading="lazy"
        />
      </div>
    );
  }

  // Fallback to custom stylized crest badge with institution color & initials
  const initials = shortName.length <= 5 
    ? shortName 
    : shortName.split(' ').map(w => w[0]).join('').substring(0, 4);

  return (
    <div
      className={`relative flex flex-col items-center justify-center shrink-0 font-black text-white select-none transition-all duration-200 overflow-hidden ${sizeClasses[size]} ${borderClass} ${className}`}
      style={{
        backgroundColor: logoColor,
        background: `linear-gradient(135deg, ${logoColor} 0%, ${adjustBrightness(logoColor, -25)} 100%)`
      }}
      title={name}
    >
      {/* Subtle background crest watermark */}
      <div className="absolute inset-0 opacity-15 flex items-center justify-center pointer-events-none">
        {type.includes('Polytechnic') ? (
          <Landmark className={iconSizes[size]} />
        ) : type.includes('College') ? (
          <GraduationCap className={iconSizes[size]} />
        ) : (
          <Shield className={iconSizes[size]} />
        )}
      </div>

      <span className="relative z-10 font-black tracking-tight leading-none text-center px-0.5">
        {initials}
      </span>
    </div>
  );
};

// Helper to darken color for gradient
function adjustBrightness(hex: string, percent: number): string {
  if (!hex || !hex.startsWith('#')) return '#0f172a';
  const cleanHex = hex.replace('#', '');
  if (cleanHex.length !== 6) return hex;
  
  const num = parseInt(cleanHex, 16);
  let r = (num >> 16) + percent;
  let g = ((num >> 8) & 0x00FF) + percent;
  let b = (num & 0x0000FF) + percent;
  
  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));
  
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export default InstitutionLogo;
