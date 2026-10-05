import { Camera, Lock, MapPin, Trash2 } from 'lucide-react';

// The full policy and the account-deletion page are standalone static pages
// (public/readyhub/privacy and public/readyhub/delete-account), generated from
// the same content the app shows in its Legal screen. This section is only a
// short, accurate summary that links to them.
const PRIVACY_URL = '/readyhub/privacy/';
const DELETION_URL = '/readyhub/delete-account/';

const CARDS = [
  {
    icon: Camera, accent: '#468CDC', title: 'Scans use Google AI',
    body: 'With your permission, photos and video you scan are sent to our servers and to Google’s AI services to read items, labels and documents. Room-scan video is not kept.',
  },
  {
    icon: Lock, accent: '#98C44E', title: 'Your private cloud vault',
    body: 'Your records and files live in your private account, encrypted in transit and at rest, with an encrypted offline copy on your phone. We never sell your data.',
  },
  {
    icon: MapPin, accent: '#E0A33C', title: 'Location you control',
    body: 'Alerts use your ZIP code or, only if you choose Current Location, your location when you use the app. No continuous background tracking.',
  },
  {
    icon: Trash2, accent: '#D9534F', title: 'Delete anytime',
    body: 'Tap Profile → Delete Account in the app for immediate deletion, or request deletion online.',
  },
];

export function MyProReadyHubPrivacySection() {
  return (
    <section id="privacy-policy" className="px-6 py-20" style={{ background: '#F7F9FC' }}>
      <div className="max-w-6xl mx-auto">
        <p style={{ fontFamily: 'var(--font-label)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#468CDC', fontWeight: 500 }}>
          Privacy
        </p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-2">
          <div>
            <h2 style={{ fontSize: 'clamp(1.7rem, 3.4vw, 2.4rem)', fontWeight: 800, lineHeight: 1.15, color: '#1A2233' }}>
              How Ready Hub handles your information
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: '#5B6472', marginTop: 10, maxWidth: 620 }}>
              A short summary. The full policy explains everything we collect, who we share it with, and how to delete it.
            </p>
          </div>
          <a
            href={PRIVACY_URL}
            className="inline-flex items-center rounded-2xl px-5 py-3 text-[14px] font-bold shrink-0"
            style={{ background: '#468CDC', color: '#fff' }}
          >
            Read the full policy
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          {CARDS.map(({ icon: Icon, accent, title, body }) => (
            <div key={title} className="p-5" style={{ background: '#fff', border: '1px solid rgba(26,34,51,0.08)', borderTop: `3px solid ${accent}`, borderRadius: 20 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: `${accent}1F`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon className="h-5 w-5" style={{ color: accent }} />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1A2233', marginTop: 14 }}>{title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: '#5B6472', marginTop: 6 }}>{body}</p>
              {title === 'Delete anytime' && (
                <a href={DELETION_URL} style={{ display: 'inline-block', marginTop: 8, fontSize: 14, fontWeight: 600, color: '#468CDC' }}>
                  Request deletion online
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
