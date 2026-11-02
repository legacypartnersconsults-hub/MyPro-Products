import BrandKitPage, { type BrandKitConfig } from './BrandKitPage';
import MyProMarketLogo from './MyProMarketLogo';

// MyPro Market brand assets page (/market/brand), linked from the Market page footer.
const config: BrandKitConfig = {
  name: 'MyPro Market',
  prefix: 'mypro-market',
  kit: '/market-brand-kit/v1',
  zip: '/market-brand-kit/MyPro-Market-Brand-Kit-2026-11.zip',
  guide: '/market-brand-kit/v1/MyPro-Market-Brand-Guidelines.pdf',
  zipSize: '1.4 MB',
  logo: <MyProMarketLogo size="sm" />,
  backHref: '/market',
  backLabel: 'MyPro Market',
  logoStory: 'The logo pairs a house with a checkmark: a repair job done right by a vetted pro. It shares its structure with the MyPro Products logo, with Market Green as its accent.',
  colors: [
    { name: 'Market Blue', hex: '#468CDC', rgb: '70 140 220', cmyk: '68 36 0 14', role: 'Primary: logo, highlights', main: true },
    { name: 'Market Green', hex: '#98C44E', rgb: '152 196 78', cmyk: '22 0 60 23', role: 'Accent: logo check, "Pro", buttons on dark', main: true },
    { name: 'Deep Blue', hex: '#2F6DB5', rgb: '47 109 181', cmyk: '74 40 0 29', role: 'Buttons, links, blue text on white' },
    { name: 'Green Dark', hex: '#557D1B', rgb: '85 125 27', cmyk: '32 0 78 51', role: 'Green text on white' },
    { name: 'Ink', hex: '#0F172A', rgb: '15 23 42', cmyk: '64 45 0 84', role: 'Headlines, dark backgrounds' },
    { name: 'Slate', hex: '#64748B', rgb: '100 116 139', cmyk: '28 17 0 45', role: 'Body copy, captions' },
    { name: 'Linen', hex: '#F5F3EE', rgb: '245 243 238', cmyk: '0 1 3 4', role: 'Soft section backgrounds' },
    { name: 'White', hex: '#FFFFFF', rgb: '255 255 255', cmyk: '0 0 0 0', role: 'Main background' },
  ],
  colorIntro: 'Market Blue and Market Green are the brand colors. Market Green is too light for small text on white, so use Deep Blue and Green Dark for text and buttons.',
  lowContrastBg: '#98C44E',
  sample: {
    headline: <>Vetted pros.<br />Jobs done right.</>,
    subhead: 'Connect property owners with licensed, insured repair pros.',
    body: 'MyPro Market matches property owners, managers and carriers with vetted contractors, and keeps every job documented from estimate to sign-off.',
  },
};

export default function MyProMarketBrandPage() {
  return <BrandKitPage config={config} />;
}
