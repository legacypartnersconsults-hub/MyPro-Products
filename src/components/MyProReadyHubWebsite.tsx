import { useState, type ReactNode } from 'react';
import {
  ArrowLeft, ArrowRight, Bell, CheckSquare, Compass, Gauge, Lock, Map as MapIcon, MapPin, Sparkles,
} from 'lucide-react';
import MyProReadyHubLogo from './MyProReadyHubLogo';
import { MyProReadyHubPrivacySection } from './MyProReadyHubPrivacyPolicy';
import { TermsOfServiceModal } from './LegalModals';

// Look and feel follow the app itself: a dark navy welcome screen that opens
// into light, white-card screens with a blue primary, green and orange accents,
// heavy condensed numerals and Inter body text. The phone screens shown are real
// screenshots of the app, not mock-ups.

const NAVY = '#0B1426';
const INK = '#1A2233';
const MUTED = '#5B6472';
const BLUE = '#468CDC';
const GREEN = '#98C44E';
const ORANGE = '#E0A33C';
const SURFACE = '#F7F9FC';
const BORDER = 'rgba(26,34,51,0.08)';

interface MyProReadyHubWebsiteProps {
  onBackToCorporate: () => void;
  onRequestDemo: (productId: string) => void;
}

function Phone({ src, alt, className = '', eager = false }: { src: string; alt: string; className?: string; eager?: boolean }) {
  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{
        borderRadius: '2.4rem', padding: 9, background: '#0F172A',
        boxShadow: '0 28px 60px -18px rgba(11,20,38,0.55), 0 0 0 1px rgba(255,255,255,0.06) inset',
      }}
    >
      <img
        src={src} alt={alt} width={640} height={1385} loading={eager ? 'eager' : 'lazy'}
        style={{ display: 'block', width: '100%', height: 'auto', borderRadius: '1.8rem', background: '#fff' }}
      />
    </div>
  );
}

function Eyebrow({ children, color = BLUE }: { children: ReactNode; color?: string }) {
  return (
    <p style={{ fontFamily: 'var(--font-label)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color, fontWeight: 500 }}>
      {children}
    </p>
  );
}

const FEATURES = [
  { icon: MapPin, title: 'Localized Risk Detection', body: 'Threat scoring by ZIP code, from FEMA’s National Risk Index.', accent: ORANGE },
  { icon: CheckSquare, title: 'Guided Prep Checklists', body: 'Five disaster types covered: hurricane, wildfire, flood, earthquake and winter storm.', accent: BLUE },
  { icon: MapIcon, title: 'Live Weather Radar', body: 'Storm tracking, lightning, current conditions and nearby shelters.', accent: BLUE },
  { icon: Lock, title: 'Secure Home Vault', body: 'Inventory, prescriptions and documents in your private account.', accent: GREEN },
  { icon: Bell, title: 'Push Alert System', body: 'Real-time emergency and hazard notifications for your area.', accent: ORANGE },
  { icon: Gauge, title: 'MyReadyScore', body: 'Your household’s preparedness score, with the next steps to raise it.', accent: GREEN },
  { icon: Compass, title: 'ReadyRanger Mason', body: 'Your personal preparedness advisor. Ask a question any time.', accent: BLUE },
];

const SCREENS = [
  { src: '/readyhub/screens/home.jpg', title: 'Home', body: 'Local risk, your MyReadyScore and Mason’s next step.' },
  { src: '/readyhub/screens/checklist.jpg', title: 'Checklists', body: 'Guided prep for each kind of disaster.' },
  { src: '/readyhub/screens/radar.jpg', title: 'Live Radar', body: 'Animated precipitation, lightning and shelters.' },
  { src: '/readyhub/screens/comms.jpg', title: 'Emergency Comms', body: 'One-tap calling for local emergency services.' },
  { src: '/readyhub/screens/mason.jpg', title: 'Ask Mason', body: 'Answers drawn from your own household data.' },
];

export default function MyProReadyHubWebsite({ onBackToCorporate, onRequestDemo }: MyProReadyHubWebsiteProps) {
  const [termsOpen, setTermsOpen] = useState(false);

  return (
    <div style={{ background: '#fff', color: INK, fontFamily: "'Inter', sans-serif" }} className="min-h-screen antialiased">
      {/* Welcome screen: dark navy, like the app's splash */}
      <section style={{ background: `radial-gradient(120% 90% at 70% 0%, #26385f 0%, ${NAVY} 62%)`, color: '#fff' }} className="relative overflow-hidden">
        <header className="max-w-6xl mx-auto px-6 pt-5 flex items-center justify-between gap-4">
          <MyProReadyHubLogo size="md" />
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToCorporate}
              className="hidden sm:inline-flex items-center gap-1.5 text-[13px] font-semibold cursor-pointer"
              style={{ color: 'rgba(255,255,255,0.75)' }}
            >
              <ArrowLeft className="h-3.5 w-3.5" /> MyPro Products
            </button>
            <button
              onClick={() => onRequestDemo('readyhub')}
              className="rounded-xl px-4 py-2 text-[13px] font-bold cursor-pointer"
              style={{ background: GREEN, color: '#fff' }}
            >
              Request a demo
            </button>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-6 pt-14 pb-20 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <Eyebrow color="#6AD5F9">MyPro Ready Hub &middot; by MyPro Products</Eyebrow>
            <h1 style={{ fontSize: 'clamp(2.1rem, 5vw, 3.4rem)', fontWeight: 700, lineHeight: 1.12, color: '#6AD5F9', marginTop: 14 }}>
              Protect Your Assets.<br />Prepare for the Unexpected.
            </h1>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: 'rgba(255,255,255,0.78)', marginTop: 18, maxWidth: 520 }}>
              MyPro Ready Hub is a disaster-preparedness app for your home and household. See your local risk, work through guided checklists, follow storms on live radar, and keep your inventory, prescriptions and documents in one secure vault.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-8">
              <button
                onClick={() => onRequestDemo('readyhub')}
                className="inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 text-[15px] font-bold cursor-pointer"
                style={{ background: GREEN, color: '#fff' }}
              >
                Request a demo <ArrowRight className="h-4 w-4" />
              </button>
              <a href="#in-the-app" className="rounded-2xl px-6 py-3.5 text-[15px] font-semibold" style={{ color: '#fff', border: '1px solid rgba(255,255,255,0.25)' }}>
                See it in the app
              </a>
            </div>
            <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.55)', marginTop: 18 }}>7-day free trial &middot; No charge until the trial ends &middot; Cancel anytime</p>
          </div>

          <figure className="relative flex flex-col items-center lg:items-end">
            <div
              aria-hidden
              className="absolute left-1/2 lg:left-auto lg:right-[8%] top-[8%] w-[78%] max-w-[420px] aspect-square rounded-full -translate-x-1/2 lg:translate-x-0"
              style={{ background: 'radial-gradient(circle, rgba(106,213,249,0.28) 0%, rgba(106,213,249,0) 70%)' }}
            />
            <img
              src="/readyhub/readyranger-mason.webp" width={1224} height={1200} loading="eager"
              alt="ReadyRanger Mason holding up a phone showing the MyPro Ready Hub app icon"
              className="relative w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[460px] h-auto"
              style={{ filter: 'drop-shadow(0 24px 40px rgba(0,0,0,0.45))' }}
            />
            {/* Same type as the headline, at half its size */}
            <figcaption
              className="relative mt-2 text-center lg:mr-[6%] max-w-[460px]"
              style={{ fontSize: 'clamp(1.05rem, 2.5vw, 1.7rem)', fontWeight: 700, lineHeight: 1.2, color: '#6AD5F9' }}
            >
              Meet ReadyRanger Mason, your preparedness advisor.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* What's inside: white cards with a colored edge, as in the app */}
      <section style={{ background: SURFACE }} className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <Eyebrow>What&rsquo;s inside</Eyebrow>
          <h2 style={{ fontSize: 'clamp(1.7rem, 3.4vw, 2.4rem)', fontWeight: 800, lineHeight: 1.15, marginTop: 8, maxWidth: 640 }}>
            Everything your household needs to be ready, in one app
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
            {FEATURES.map(({ icon: Icon, title, body, accent }) => (
              <div key={title} className="p-5" style={{ background: '#fff', border: `1px solid ${BORDER}`, borderTop: `3px solid ${accent}`, borderRadius: 20 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: `${accent}1F`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon className="h-5 w-5" style={{ color: accent }} />
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginTop: 14 }}>{title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: MUTED, marginTop: 6 }}>{body}</p>
              </div>
            ))}
            <div className="p-5" style={{ background: INK, borderRadius: 20, color: '#fff' }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(106,213,249,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles className="h-5 w-5" style={{ color: '#6AD5F9' }} />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginTop: 14 }}>AI scanning, with your permission</h3>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: 'rgba(255,255,255,0.72)', marginTop: 6 }}>
                Scan a room, a prescription label or a policy and the app reads it for you, using Google&rsquo;s AI. It always asks first.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Real screens */}
      <section id="in-the-app" className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <Eyebrow>In the app</Eyebrow>
          <h2 style={{ fontSize: 'clamp(1.7rem, 3.4vw, 2.4rem)', fontWeight: 800, lineHeight: 1.15, marginTop: 8 }}>The real screens</h2>
          <div className="flex gap-7 overflow-x-auto pt-10 pb-6 -mx-6 px-6 snap-x" style={{ scrollbarWidth: 'thin' }}>
            {SCREENS.map((s) => (
              <figure key={s.title} className="snap-start shrink-0 w-[210px] sm:w-[230px]">
                <Phone src={s.src} alt={`${s.title} screen of the MyPro Ready Hub app`} />
                <figcaption className="mt-4 px-1">
                  <p style={{ fontSize: 15, fontWeight: 700 }}>{s.title}</p>
                  <p style={{ fontSize: 13, lineHeight: 1.55, color: MUTED, marginTop: 2 }}>{s.body}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <MyProReadyHubPrivacySection />

      {/* Footer */}
      <footer style={{ background: NAVY, color: 'rgba(255,255,255,0.7)' }} className="px-6 py-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div className="max-w-md">
            <MyProReadyHubLogo size="sm" />
            <p style={{ fontSize: 13, lineHeight: 1.65, marginTop: 14 }}>
              Questions? Call toll-free <span style={{ color: '#fff', fontWeight: 600 }}>(833) 369-7762</span> or email{' '}
              <a href="mailto:jruland@myproproducts.com" style={{ color: '#6AD5F9' }}>jruland@myproproducts.com</a>.
            </p>
            <p style={{ fontSize: 12, marginTop: 10, color: 'rgba(255,255,255,0.45)' }}>&copy; 2026 MyPro Ready Hub. All rights reserved.</p>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-3 text-[13px] font-medium">
            <button onClick={onBackToCorporate} className="hover:text-white cursor-pointer">Products Home</button>
            <button onClick={() => setTermsOpen(true)} className="hover:text-white cursor-pointer">Terms &amp; Conditions</button>
            <a href="/readyhub/privacy/" className="hover:text-white">Privacy Policy</a>
            <a href="/readyhub/delete-account/" className="hover:text-white">Delete Your Account</a>
            <a href="/readyhub/brand-assets/" className="hover:text-white">Brand assets &amp; store kit</a>
          </nav>
        </div>
      </footer>

      <TermsOfServiceModal isOpen={termsOpen} onClose={() => setTermsOpen(false)} />
    </div>
  );
}
