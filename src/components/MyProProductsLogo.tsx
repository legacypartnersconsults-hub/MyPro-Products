import React from 'react';

interface MyProProductsLogoProps {
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  subText?: string;
}

export default function MyProProductsLogo({ showText = true, size = 'md', className = '', subText = 'Ecosystem' }: MyProProductsLogoProps) {
  // Dimensions based on size
  const iconDimensions = {
    sm: { h: 'h-7', w: 'w-7' },
    md: { h: 'h-10', w: 'w-10' },
    lg: { h: 'h-16', w: 'w-16' }
  }[size];

  const textSizes = {
    sm: { main: 'text-sm', sub: 'text-[8px]' },
    md: { main: 'text-lg', sub: 'text-[9px]' },
    lg: { main: 'text-3xl', sub: 'text-xs' }
  }[size];

  return (
    <div className={`flex items-center space-x-2.5 ${className}`}>
      {/* Brand mark (v1.0 brand kit, see /brand). Both roof slopes and the long arm of the
          check share one angle, every stroke is 10 units, and the mark is centred in its box. */}
      <svg
        viewBox="4 4 112 112"
        className={`${iconDimensions.w} ${iconDimensions.h} flex-shrink-0`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <g strokeLinecap="round" strokeLinejoin="round" strokeWidth="10">
          {/* Chimney, roof and window - MyPro Blue #468CDC */}
          <path d="M26 25H36V38.78L26 46.61Z" fill="#468CDC" stroke="none" />
          <path d="M14 56L60 20L106 56" stroke="#468CDC" />
          {/* Checkmark - Stone #BCB6A5 */}
          <path d="M29 82L52 100L94 67" stroke="#BCB6A5" />
        </g>
        <g fill="#468CDC">
          <rect x="49" y="46" width="10" height="10" rx="1.5" />
          <rect x="61" y="46" width="10" height="10" rx="1.5" />
          <rect x="49" y="58" width="10" height="10" rx="1.5" />
          <rect x="61" y="58" width="10" height="10" rx="1.5" />
        </g>
      </svg>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col select-none text-left">
          <div className={`${textSizes.main} font-extrabold tracking-tight leading-none`}>
            <span className="text-[#468CDC]">My</span>
            <span className="text-[#BCB6A5]">Pro</span>
            <span className="text-[#468CDC] ml-1">Products</span>
          </div>
          <span className={`${textSizes.sub} font-bold text-slate-400 tracking-wider block uppercase mt-0.5 leading-none`}>
            {subText}
          </span>
        </div>
      )}
    </div>
  );
}
