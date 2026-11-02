import { RH_SHIELD_PATH, RH_EMBLEM_LAYOUT } from './readyHubLogoArt';

export interface MyProReadyHubLogoProps {
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'horizontal' | 'stacked' | 'icon';
  theme?: 'dark' | 'light' | 'auto';
  className?: string;
}

export default function MyProReadyHubLogo({ 
  showText = true, 
  size = 'md', 
  variant = 'horizontal',
  theme = 'auto',
  className = '' 
}: MyProReadyHubLogoProps) {
  // Dimensions based on size
  const iconDimensions = {
    sm: { h: 'h-7', w: 'w-7' },
    md: { h: 'h-10', w: 'w-10' },
    lg: { h: 'h-16', w: 'w-16' },
    xl: { h: 'h-24', w: 'w-24' }
  }[size];

  const textSizes = {
    sm: { main: 'text-sm', sub: 'text-[8px]' },
    md: { main: 'text-lg', sub: 'text-[9px]' },
    lg: { main: 'text-3xl', sub: 'text-xs' },
    xl: { main: 'text-4xl', sub: 'text-sm' }
  }[size];

  const isStacked = variant === 'stacked';

  return (
    <div className={`flex ${isStacked ? 'flex-col items-center text-center space-y-2' : 'items-center space-x-2.5'} ${className}`}>
      {/* Ready Hub emblem (brand kit v2): a symmetric shield around the refined MyPro
          house-and-check mark, centred on both axes. Same artwork as readyHubLogoArt.ts. */}
      <svg
        viewBox="0 0 120 120"
        className={`${iconDimensions.w} ${iconDimensions.h} flex-shrink-0`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <g transform="translate(0 -2.6)">
          {/* Shield - Cyan #6AD5F9 */}
          <path d={RH_SHIELD_PATH} stroke="#6AD5F9" strokeWidth={RH_EMBLEM_LAYOUT.shieldStroke} strokeLinejoin="round" />
          <g transform={`translate(60 ${RH_EMBLEM_LAYOUT.houseCenterY}) scale(${RH_EMBLEM_LAYOUT.houseScale}) translate(-60 -60)`}>
            <g strokeLinecap="round" strokeLinejoin="round" strokeWidth="10">
              {/* Chimney and roof - Cyan #6AD5F9 */}
              <path d="M26 25H36V38.78L26 46.61Z" fill="#6AD5F9" stroke="none" />
              <path d="M14 56L60 20L106 56" stroke="#6AD5F9" />
              {/* Ready check - Green #98CC44 */}
              <path d="M29 82L52 100L94 67" stroke="#98CC44" />
            </g>
            {/* Window - Green #98CC44 */}
            <g fill="#98CC44">
              <rect x="49" y="46" width="10" height="10" rx="1.5" />
              <rect x="61" y="46" width="10" height="10" rx="1.5" />
              <rect x="49" y="58" width="10" height="10" rx="1.5" />
              <rect x="61" y="58" width="10" height="10" rx="1.5" />
            </g>
          </g>
        </g>
      </svg>

      {/* Brand Text without "Secure" */}
      {showText && (
        <div className={`flex flex-col select-none ${isStacked ? 'items-center text-center' : 'text-left justify-center'}`}>
          <div className={`${textSizes.main} font-extrabold tracking-tight leading-none`}>
            <span className="text-[#6AD5F9]">My</span>
            <span className="text-[#98CC44]">Pro</span>
          </div>
          <div className={`${textSizes.main} font-extrabold tracking-tight leading-none text-[#6AD5F9] mt-0.5`}>
            Ready Hub
          </div>
          <span className={`${textSizes.sub} font-bold text-slate-400 tracking-wider block uppercase mt-1 leading-none`}>
            by MyPro Products
          </span>
        </div>
      )}
    </div>
  );
}
