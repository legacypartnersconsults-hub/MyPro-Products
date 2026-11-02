interface MyProMarketLogoProps {
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function MyProMarketLogo({ showText = true, size = 'md', className = '' }: MyProMarketLogoProps) {
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
      {/* MyPro Market mark (brand kit v1, see /market/brand): same refined geometry as the
          MyPro Products mark, with Market Green #98C44E as the accent. */}
      <svg
        viewBox="4 4 112 112"
        className={`${iconDimensions.w} ${iconDimensions.h} flex-shrink-0`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <g strokeLinecap="round" strokeLinejoin="round" strokeWidth="10">
          {/* Chimney and roof - Market Blue #468CDC */}
          <path d="M26 25H36V38.78L26 46.61Z" fill="#468CDC" stroke="none" />
          <path d="M14 56L60 20L106 56" stroke="#468CDC" />
          {/* Checkmark - Market Green #98C44E */}
          <path d="M29 82L52 100L94 67" stroke="#98C44E" />
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
            <span className="text-[#98C44E]">Pro</span>
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
