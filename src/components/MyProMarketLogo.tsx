import React from 'react';

interface MyProMarketLogoProps {
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function MyProMarketLogo({ showText = true, size = 'md', className = '' }: MyProMarketLogoProps) {
  // Dimensions based on size
  const iconDimensions = {
    sm: { h: 'h-7', w: 'w-7', viewBox: '0 0 140 120' },
    md: { h: 'h-10', w: 'w-10', viewBox: '0 0 140 120' },
    lg: { h: 'h-16', w: 'w-16', viewBox: '0 0 140 120' }
  }[size];

  const textSizes = {
    sm: { main: 'text-sm', sub: 'text-[8px]' },
    md: { main: 'text-lg', sub: 'text-[9px]' },
    lg: { main: 'text-3xl', sub: 'text-xs' }
  }[size];

  return (
    <div className={`flex items-center space-x-2.5 ${className}`}>
      {/* Precision Vector SVG Icon */}
      <svg 
        viewBox="0 0 140 120" 
        className={`${iconDimensions.w} ${iconDimensions.h} flex-shrink-0`} 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Blue Roof & Chimney - Color Hex #468CDC */}
        <rect x="24" y="14" width="11" height="30" fill="#468CDC" />
        <path 
          d="M 2 58 L 62 12 L 92 38" 
          stroke="#468CDC" 
          strokeWidth="10" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        
        {/* Window (4 panes) - Color Hex #468CDC */}
        <rect x="51" y="44" width="10" height="10" fill="#468CDC" rx="1.5" />
        <rect x="63" y="44" width="10" height="10" fill="#468CDC" rx="1.5" />
        <rect x="51" y="56" width="10" height="10" fill="#468CDC" rx="1.5" />
        <rect x="63" y="56" width="10" height="10" fill="#468CDC" rx="1.5" />
        
        {/* Green Checkmark Framing the Bottom - Color Hex #98CC44 */}
        <path 
          d="M 21 78 L 51 104 L 111 58" 
          stroke="#98CC44" 
          strokeWidth="11" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
      </svg>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col select-none">
          <div className={`${textSizes.main} font-extrabold tracking-tight leading-none`}>
            <span className="text-[#468CDC]">My</span>
            <span className="text-[#98CC44]">Pro</span>
            <span className="text-[#468CDC] ml-1">Market</span>
          </div>
          <span className={`${textSizes.sub} font-bold text-slate-400 tracking-wider block uppercase mt-0.5 leading-none`}>
            by MyPro Products
          </span>
        </div>
      )}
    </div>
  );
}
