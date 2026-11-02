// MyPro Claim Assist logo (concepts A1 and A3). The house and check are the same
// refined MyPro mark used by MyPro Products, Market and Ready Hub; an umbrella sits
// over the house. Colors: Claims Purple #5B2BD9 and Ready Hub Blue #6AD5F9.

export const CA_PURPLE = '#5B2BD9';
export const CA_BLUE = '#6AD5F9';
export const CA_BLUE_LIGHT = '#B4ECFD';

interface MarkColors {
  house: string;
  accent: string;
  canopy: string;
  panel: string;
}

// Drawn in the shared 120-unit house grid; the umbrella sits above it, so the
// whole mark fits in viewBox "0 -44 120 152".
export function ClaimsAssistMark({ house, accent, canopy, panel }: MarkColors) {
  return (
    <>
      <g transform="translate(0 2)">
        <path
          d="M4 0C4 -21 28 -33 60 -33C92 -33 116 -21 116 0Q104.8 -6.5 93.6 0Q82.4 -6.5 71.2 0Q60 -6.5 48.8 0Q37.6 -6.5 26.4 0Q15.2 -6.5 4 0Z"
          fill={canopy}
        />
        <path d="M60 -33C50 -24 47.8 -12 48.8 0Q60 -6.5 71.2 0C72.2 -12 70 -24 60 -33Z" fill={panel} />
        <path d="M60 -33V-40" stroke={canopy} strokeWidth="5" strokeLinecap="round" />
      </g>
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="10">
        <path d="M26 25H36V38.78L26 46.61Z" fill={house} stroke="none" />
        <path d="M14 56L60 20L106 56" stroke={house} />
        <path d="M29 82L52 100L94 67" stroke={accent} />
      </g>
      <g fill={house}>
        <rect x="49" y="46" width="10" height="10" rx="1.5" />
        <rect x="61" y="46" width="10" height="10" rx="1.5" />
        <rect x="49" y="58" width="10" height="10" rx="1.5" />
        <rect x="61" y="58" width="10" height="10" rx="1.5" />
      </g>
    </>
  );
}

interface MyProClaimsAssistLogoProps {
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  /** 'light' for white/light backgrounds, 'dark' for dark backgrounds, 'tile' for the A3 purple app tile */
  theme?: 'light' | 'dark' | 'tile';
  className?: string;
}

export default function MyProClaimsAssistLogo({ showText = true, size = 'md', theme = 'light', className = '' }: MyProClaimsAssistLogoProps) {
  const icon = { sm: 'h-8 w-7', md: 'h-11 w-10', lg: 'h-20 w-[4.5rem]' }[size];
  const tile = { sm: 'h-8 w-8 rounded-lg', md: 'h-11 w-11 rounded-xl', lg: 'h-16 w-16 rounded-2xl' }[size];
  const text = { sm: { main: 'text-sm', sub: 'text-[8px]' }, md: { main: 'text-xl', sub: 'text-[11px]' }, lg: { main: 'text-4xl', sub: 'text-lg' } }[size];
  const dark = theme !== 'light';
  const colors: MarkColors = dark
    ? { house: '#FFFFFF', accent: CA_BLUE, canopy: CA_BLUE, panel: CA_BLUE_LIGHT }
    : { house: CA_PURPLE, accent: CA_BLUE, canopy: CA_BLUE, panel: CA_BLUE_LIGHT };

  const mark = (
    <svg viewBox="0 -44 120 152" className={theme === 'tile' ? 'h-[78%] w-[78%]' : `${icon} flex-shrink-0`} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ClaimsAssistMark {...colors} />
    </svg>
  );

  return (
    <div className={`flex items-center space-x-2.5 ${className}`}>
      {theme === 'tile' ? (
        <div className={`${tile} flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-[#6D3BE9] to-[#2E1384]`}>{mark}</div>
      ) : mark}
      {showText && (
        <div className="flex flex-col select-none text-left">
          <div className={`${text.main} font-extrabold tracking-tight leading-none`}>
            <span className={theme === 'light' ? 'text-[#5B2BD9]' : 'text-white'}>My</span>
            <span className="text-[#6AD5F9]">Pro</span>
          </div>
          <div className={`${text.sub} font-extrabold tracking-tight leading-none mt-0.5 ${theme === 'light' ? 'text-[#5B2BD9]' : 'text-white'}`}>
            Claim Assist
          </div>
        </div>
      )}
    </div>
  );
}
