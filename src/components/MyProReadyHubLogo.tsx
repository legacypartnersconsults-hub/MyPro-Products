import React from 'react';

interface MyProReadyHubLogoProps {
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function MyProReadyHubLogo({ showText = true, size = 'md', className = '' }: MyProReadyHubLogoProps) {
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
      {/* Premium Disaster-Preparedness Shield & Home SVG Icon */}
      <svg 
        viewBox="0 0 140 120" 
        className={`${iconDimensions.w} ${iconDimensions.h} flex-shrink-0`} 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Protective Shield Outline - Color Hex #6AD5F9 */}
        <path 
          d="M 12 28 C 42 10, 98 10, 128 28 C 128 72, 108 104, 70 118 C 32 104, 12 72, 12 28 Z" 
          stroke="#6AD5F9" 
          strokeWidth="9" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        
        {/* Brand Mark Group Scaled to Fit Perfectly inside Shield */}
        <g transform="translate(26.5, 26) scale(0.70)" strokeLinecap="round" strokeLinejoin="round">
          {/* Chimney - Color Hex #6AD5F9 */}
          <rect x="24" y="14" width="11" height="30" fill="#6AD5F9" />

          {/* Inner Protected Home Roof - Color Hex #6AD5F9 */}
          <path 
            d="M 2 58 L 62 12 L 92 38" 
            stroke="#6AD5F9" 
            strokeWidth="10" 
          />
          
          {/* Glowing Window/Beacon - Divided into four equal squares - Color Hex #6AD5F9 */}
          <rect x="51" y="44" width="10" height="10" fill="#6AD5F9" rx="1.5" />
          <rect x="63" y="44" width="10" height="10" fill="#6AD5F9" rx="1.5" />
          <rect x="51" y="56" width="10" height="10" fill="#6AD5F9" rx="1.5" />
          <rect x="63" y="56" width="10" height="10" fill="#6AD5F9" rx="1.5" />

          {/* Ready Green Checkmark - Color Hex #98CC44 */}
          <path 
            d="M 21 78 L 51 104 L 111 58" 
            stroke="#98CC44" 
            strokeWidth="11" 
          />
        </g>
      </svg>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col select-none">
          <div className={`${textSizes.main} font-extrabold tracking-tight leading-none`}>
            <span className="text-[#6AD5F9]">My</span>
            <span className="text-[#98CC44]">Pro</span>
            <span className="text-[#6AD5F9] ml-1">Ready Hub</span>
          </div>
          <span className={`${textSizes.sub} font-bold text-slate-400 tracking-wider block uppercase mt-0.5 leading-none`}>
            by MyPro Products &bull; Secure
          </span>
        </div>
      )}
    </div>
  );
}
