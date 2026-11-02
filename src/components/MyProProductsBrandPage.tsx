import BrandKitPage, { type BrandKitConfig } from './BrandKitPage';
import MyProProductsLogo from './MyProProductsLogo';

// MyPro Products brand assets page (/brand), linked from the main page footer.
const config: BrandKitConfig = {
  name: 'MyPro Products',
  prefix: 'mypro-products',
  kit: '/brand-kit/v1',
  zip: '/brand-kit/MyPro-Products-Brand-Kit-2026-11.zip',
  guide: '/brand-kit/v1/MyPro-Products-Brand-Guidelines.pdf',
  zipSize: '1.4 MB',
  logo: <MyProProductsLogo size="sm" subText="Brand Assets" />,
  backHref: '/',
  backLabel: 'MyPro Products',
  logoStory: 'The logo pairs a house with a checkmark: a home that is protected, prepared and taken care of.',
  colors: [
    { name: 'MyPro Blue', hex: '#468CDC', rgb: '70 140 220', cmyk: '68 36 0 14', role: 'Primary: logo, highlights', main: true },
    { name: 'Stone', hex: '#BCB6A5', rgb: '188 182 165', cmyk: '0 3 12 26', role: 'Accent: logo check, "Pro"', main: true },
    { name: 'Deep Blue', hex: '#2F6DB5', rgb: '47 109 181', cmyk: '74 40 0 29', role: 'Buttons, links, blue text on white' },
    { name: 'Stone Dark', hex: '#7A7464', rgb: '122 116 100', cmyk: '0 5 18 52', role: 'Stone-toned text on white' },
    { name: 'Ink', hex: '#0F172A', rgb: '15 23 42', cmyk: '64 45 0 84', role: 'Headlines, dark backgrounds' },
    { name: 'Slate', hex: '#64748B', rgb: '100 116 139', cmyk: '28 17 0 45', role: 'Body copy, captions' },
    { name: 'Linen', hex: '#F5F3EE', rgb: '245 243 238', cmyk: '0 1 3 4', role: 'Soft section backgrounds' },
    { name: 'White', hex: '#FFFFFF', rgb: '255 255 255', cmyk: '0 0 0 0', role: 'Main background' },
  ],
  colorIntro: 'MyPro Blue and Stone are the brand colors. Stone is too light for small text on white, so use Deep Blue and Stone Dark for text and buttons.',
  lowContrastBg: '#BCB6A5',
  sample: {
    headline: <>Prepared homes.<br />Faster recovery.</>,
    subhead: 'Disaster prep, claims and vetted repair pros in one ecosystem.',
    body: 'MyPro Products helps property owners, managers and carriers get ready before a storm and recover faster after one.',
  },
};

export default function MyProProductsBrandPage() {
  return <BrandKitPage config={config} />;
}
