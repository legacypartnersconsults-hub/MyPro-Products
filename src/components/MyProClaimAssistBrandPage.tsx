import BrandKitPage, { type BrandKitConfig } from './BrandKitPage';
import MyProClaimsAssistLogo from './MyProClaimsAssistLogo';

// MyPro Claim Assist brand assets page (/claimassist/brand), linked from the Claim Assist page footer.
const config: BrandKitConfig = {
  name: 'MyPro Claim Assist',
  prefix: 'mypro-claim-assist',
  kit: '/claim-assist-brand-kit/v1',
  zip: '/claim-assist-brand-kit/MyPro-Claim-Assist-Brand-Kit-2026-11.zip',
  guide: '/claim-assist-brand-kit/v1/MyPro-Claim-Assist-Brand-Guidelines.pdf',
  zipSize: '2.7 MB',
  logo: <MyProClaimsAssistLogo size="sm" />,
  backHref: '/claimassist',
  backLabel: 'MyPro Claim Assist',
  logoStory: 'The logo puts an umbrella over the MyPro house and checkmark: protection, and a claim handled right. The house and check are the same as every MyPro logo, in Claim Purple with Ready Hub Blue.',
  markNote: 'The umbrella, house and check on their own, for avatars and icons.',
  whiteLogoBg: '#5B2BD9',
  appIcons: [
    { suffix: '-purple', label: 'App icon, purple' },
    { suffix: '', label: 'App icon, white' },
  ],
  colors: [
    { name: 'Claim Purple', hex: '#5B2BD9', rgb: '91 43 217', cmyk: '58 80 0 15', role: 'Primary: logo, headlines, buttons', main: true },
    { name: 'Ready Hub Blue', hex: '#6AD5F9', rgb: '106 213 249', cmyk: '57 14 0 2', role: 'Accent: check, umbrella, "Pro"', main: true },
    { name: 'Deep Purple', hex: '#2E1384', rgb: '46 19 132', cmyk: '65 86 0 48', role: 'Dark sections, app tile gradient' },
    { name: 'Light Blue', hex: '#B4ECFD', rgb: '180 236 253', cmyk: '29 7 0 1', role: 'Umbrella panel, soft highlights' },
    { name: 'Night', hex: '#140A36', rgb: '20 10 54', cmyk: '63 81 0 79', role: 'Footer, darkest backgrounds' },
    { name: 'Slate', hex: '#64748B', rgb: '100 116 139', cmyk: '28 17 0 45', role: 'Body copy, captions' },
    { name: 'Lavender', hex: '#F3EFFD', rgb: '243 239 253', cmyk: '4 6 0 1', role: 'Soft section backgrounds' },
    { name: 'White', hex: '#FFFFFF', rgb: '255 255 255', cmyk: '0 0 0 0', role: 'Main background' },
  ],
  colorIntro: 'Claim Purple and Ready Hub Blue are the brand colors; the blue is shared with MyPro Ready Hub. Ready Hub Blue is too light for text on white, so use Claim Purple for text and buttons.',
  lowContrastBg: '#6AD5F9',
  sample: {
    headline: <>Navigate your claim<br />with confidence.</>,
    subhead: 'Document, track and review every step of your property claim.',
    body: 'MyPro Claim Assist helps homeowners organize damage photos, invoices and policy details in one place, so nothing is missed between filing and settlement.',
  },
};

export default function MyProClaimAssistBrandPage() {
  return <BrandKitPage config={config} />;
}
