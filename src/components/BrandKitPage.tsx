import { useState, type ReactNode } from 'react';
import { ArrowLeft, Download, FileText, Check, Copy, X } from 'lucide-react';

// Shared brand-kit page. Each brand (MyPro Products at /brand, MyPro Market at
// /market/brand) passes its own config. Every file shown lives in the brand's
// public kit folder (versioned, e.g. /brand-kit/v1), and the same files are in
// its zip. A revised kit goes in a new folder (v2) with a new zip name so browser
// caches never serve old artwork.
export interface BrandColor { name: string; hex: string; rgb: string; cmyk: string; role: string; main?: boolean }
export interface BrandKitConfig {
  name: string;            // "MyPro Products"
  prefix: string;          // file-name prefix, e.g. "mypro-products"
  kit: string;             // public folder of the kit
  zip: string;             // public path of the zip
  guide: string;           // public path of the guidelines PDF
  zipSize: string;         // shown under the download button
  logo: ReactNode;         // small logo for the page header
  backHref: string;
  backLabel: string;
  logoStory: string;       // first sentence of the logo section
  colors: BrandColor[];
  colorIntro: string;
  lowContrastBg: string;   // background for the "low contrast" don't
  sample: { headline: ReactNode; subhead: string; body: string };
  appIcons?: { suffix: string; label: string }[]; // app icon files, default white + blue
  whiteLogoBg?: string;    // background behind the one-color white logo, default MyPro Blue
  markNote?: string;       // caption for the mark on its own
}

type Variant = 'color' | 'reversed' | 'white' | 'black';
const VARIANTS: { id: Variant; label: string; use: string; bg: string; border?: boolean }[] = [
  { id: 'color', label: 'Full color', use: 'White and light backgrounds', bg: '#F8FAFC', border: true },
  { id: 'reversed', label: 'Reversed', use: 'Dark backgrounds', bg: '#0F172A' },
  { id: 'white', label: 'White', use: 'Blue or photo backgrounds', bg: '#468CDC' },
  { id: 'black', label: 'Black', use: 'One-color print', bg: '#FFFFFF', border: true },
];

const DEFAULT_APP_ICONS = [
  { suffix: '', label: 'App icon, white' },
  { suffix: '-blue', label: 'App icon, blue' },
];

const LOGOS = [
  { id: 'logo-horizontal', folder: 'Horizontal', title: 'Horizontal logo', note: 'Primary logo. Use this first, wherever it fits.', png: [1200, 2400], h: 'h-16 sm:h-20' },
  { id: 'logo-stacked', folder: 'Stacked', title: 'Stacked logo', note: 'For square or tall spaces.', png: [1000, 2000], h: 'h-28 sm:h-32' },
  { id: 'mark', folder: 'Mark', title: 'Mark', note: 'The house-and-check symbol on its own, for avatars and icons.', png: [512, 1024, 2048], h: 'h-24 sm:h-28' },
];

const DONTS = [
  { label: 'Stretch or squash it', style: { transform: 'scaleX(1.35)' } },
  { label: 'Change the colors', style: { filter: 'hue-rotate(140deg)' } },
  { label: 'Rotate it', style: { transform: 'rotate(-12deg)' } },
  { label: 'Use on low-contrast colors', style: {}, lowContrast: true },
  { label: 'Add shadows or effects', style: { filter: 'drop-shadow(3px 4px 3px rgba(0,0,0,.5))' } },
];


function SectionHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <div className="mb-8 max-w-2xl">
      <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#2F6DB5]">{eyebrow}</div>
      <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">{title}</h2>
      {children && <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600">{children}</p>}
    </div>
  );
}

export default function BrandKitPage({ config: c }: { config: BrandKitConfig }) {
  const KIT = c.kit;
  const P = c.prefix;
  const file = (folder: string, name: string) => `${KIT}/01-Logo/${folder}/${name}`;
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (hex: string) => {
    navigator.clipboard?.writeText(hex).then(() => {
      setCopied(hex);
      setTimeout(() => setCopied(null), 1500);
    }).catch(() => {});
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <a href={c.backHref} aria-label={`${c.name} home`}>{c.logo}</a>
          <a href={c.backHref} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2F6DB5] hover:underline">
            <ArrowLeft className="h-4 w-4" /> <span className="hidden sm:inline">Back to</span> {c.backLabel}
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-[#0F172A] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20 grid gap-10 md:grid-cols-[1.2fr_1fr] items-center">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#BCB6A5]">Brand assets</div>
            <h1 className="mt-3 text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">The {c.name} brand kit</h1>
            <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Official logos, colors and usage basics for partners, press and anyone presenting {c.name}.
              Please use these files as supplied.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={c.zip} download className="inline-flex items-center gap-2 rounded-lg bg-[#2F6DB5] hover:bg-[#255A96] px-5 py-3 text-sm font-bold text-white transition-colors">
                <Download className="h-4 w-4" /> Download full kit (.zip)
              </a>
              <a href={c.guide} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-lg border border-slate-600 hover:border-slate-400 px-5 py-3 text-sm font-bold text-white transition-colors">
                <FileText className="h-4 w-4" /> Brand guidelines (PDF)
              </a>
            </div>
            <p className="mt-3 text-xs text-slate-400">SVG and PNG logos, app icons, favicons, color files and guidelines. {c.zipSize}.</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 sm:p-10 flex items-center justify-center">
            <img src={file('Stacked/SVG', `${P}-logo-stacked-reversed.svg`)} alt={`${c.name} logo`} className="w-full max-w-xs" />
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Logos */}
        <section className="py-14 sm:py-20 border-b border-slate-200">
          <SectionHeading eyebrow="01 · Logo" title="Logo files">
            {c.logoStory}{' '}
            Each version comes as SVG (scales to any size) and transparent PNG.
          </SectionHeading>
          <div className="space-y-12">
            {LOGOS.map((logo) => (
              <div key={logo.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
                  <h3 className="text-lg font-bold">{logo.title}</h3>
                  <p className="text-sm text-slate-500">{logo.id === 'mark' && c.markNote ? c.markNote : logo.note}</p>
                </div>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                  {VARIANTS.map((v) => {
                    const base = `${P}-${logo.id}-${v.id}`;
                    return (
                      <div key={v.id} className="rounded-xl border border-slate-200 overflow-hidden flex flex-col">
                        <div
                          className={`flex items-center justify-center px-6 py-8 min-h-40 ${v.border ? 'border-b border-slate-200' : ''}`}
                          style={{ background: v.id === 'white' && c.whiteLogoBg ? c.whiteLogoBg : v.bg }}
                        >
                          <img src={file(`${logo.folder}/SVG`, `${base}.svg`)} alt={`${logo.title}, ${v.label.toLowerCase()}`} className={`${logo.h} max-w-full`} loading="lazy" />
                        </div>
                        <div className="p-3 flex-1 flex flex-col gap-2">
                          <div>
                            <div className="text-sm font-semibold">{v.label}</div>
                            <div className="text-xs text-slate-500">{v.use}</div>
                          </div>
                          <div className="mt-auto flex flex-wrap gap-1.5">
                            <a href={file(`${logo.folder}/SVG`, `${base}.svg`)} download className="rounded-md bg-slate-100 hover:bg-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700">SVG</a>
                            {logo.png.map((w) => (
                              <a key={w} href={file(`${logo.folder}/PNG`, `${base}-${w}px.png`)} download className="rounded-md bg-slate-100 hover:bg-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700">PNG {w}</a>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            <div>
              <h3 className="text-lg font-bold mb-4">App icon and favicon</h3>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
                {(c.appIcons ?? DEFAULT_APP_ICONS).map(({ suffix, label }) => ({
                  src: `${KIT}/02-App-Icon/${P}-app-icon${suffix}.svg`,
                  label,
                  files: [['SVG', `${P}-app-icon${suffix}.svg`], ['PNG 1024', `${P}-app-icon${suffix}-1024px.png`], ['PNG 512', `${P}-app-icon${suffix}-512px.png`]],
                })).map((icon) => (
                  <div key={icon.label} className="rounded-xl border border-slate-200 overflow-hidden">
                    <div className="bg-slate-100 flex items-center justify-center py-8">
                      <img src={icon.src} alt={icon.label} className="h-24 w-24 rounded-[22%] shadow-md" loading="lazy" />
                    </div>
                    <div className="p-3">
                      <div className="text-sm font-semibold mb-2">{icon.label}</div>
                      <div className="flex flex-wrap gap-1.5">
                        {icon.files.map(([l, f]) => (
                          <a key={f} href={`${KIT}/02-App-Icon/${f}`} download className="rounded-md bg-slate-100 hover:bg-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700">{l}</a>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="rounded-xl border border-slate-200 overflow-hidden">
                  <div className="bg-slate-100 flex items-end justify-center gap-5 py-8 min-h-40">
                    <img src={`${KIT}/03-Favicon/${P}-favicon.svg`} alt="" className="h-12 w-12" />
                    <img src={`${KIT}/03-Favicon/${P}-favicon.svg`} alt="" className="h-8 w-8" />
                    <img src={`${KIT}/03-Favicon/${P}-favicon.svg`} alt="" className="h-4 w-4" />
                  </div>
                  <div className="p-3">
                    <div className="text-sm font-semibold mb-2">Favicon</div>
                    <div className="flex flex-wrap gap-1.5">
                      {[['ICO', 'favicon.ico'], ['SVG', `${P}-favicon.svg`], ['PNG 32', `${P}-favicon-32px.png`], ['PNG 96', `${P}-favicon-96px.png`]].map(([l, f]) => (
                        <a key={f} href={`${KIT}/03-Favicon/${f}`} download className="rounded-md bg-slate-100 hover:bg-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700">{l}</a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Usage */}
        <section className="py-14 sm:py-20 border-b border-slate-200">
          <SectionHeading eyebrow="02 · Usage" title="Using the logo">
            Keep clear space around the logo at least the height of the house's window. Don't go smaller than 140 px wide
            for the horizontal logo, 100 px for the stacked logo, or 24 px for the mark alone.
          </SectionHeading>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {DONTS.map((d) => (
              <div key={d.label}>
                <div className="relative rounded-xl overflow-hidden h-28 flex items-center justify-center" style={{ background: d.lowContrast ? c.lowContrastBg : '#F8FAFC' }}>
                  <img src={file('Horizontal/SVG', `${P}-logo-horizontal-color.svg`)} alt="" className="w-4/5" style={d.style} />
                  <div className="absolute top-2 right-2 h-6 w-6 rounded-full bg-red-600 text-white flex items-center justify-center"><X className="h-3.5 w-3.5" /></div>
                </div>
                <div className="mt-2 text-xs font-medium text-slate-600">Don't {d.label.charAt(0).toLowerCase() + d.label.slice(1)}</div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-600">
            Write the name as <strong>{c.name}</strong>: capital M, capital P, no space in "MyPro".
          </p>
        </section>

        {/* Colors */}
        <section className="py-14 sm:py-20 border-b border-slate-200">
          <SectionHeading eyebrow="03 · Color" title="Color palette">
            {c.colorIntro} Click a swatch to copy its HEX code.
          </SectionHeading>
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            {c.colors.map((col) => (
              <button
                key={col.hex}
                type="button"
                onClick={() => copy(col.hex)}
                className="text-left rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-[#468CDC]"
              >
                <div className={`${col.main ? 'h-28' : 'h-20'} relative ${col.hex === '#FFFFFF' ? 'border-b border-slate-200' : ''}`} style={{ background: col.hex }}>
                  <span className={`absolute top-2 right-2 inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${copied === col.hex ? 'bg-white text-slate-900' : 'bg-slate-900/85 text-white'}`}>
                    {copied === col.hex ? <><Check className="h-3 w-3" /> Copied</> : <><Copy className="h-3 w-3" /> Copy</>}
                  </span>
                </div>
                <div className="p-3">
                  <div className="text-sm font-bold">{col.name}</div>
                  <div className="mt-1 font-mono text-xs text-slate-600 leading-relaxed">
                    {col.hex}<br />RGB {col.rgb}<br />CMYK {col.cmyk}
                  </div>
                  <div className="mt-1.5 text-xs text-slate-500">{col.role}</div>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-3 text-xs">
            <a href={`${KIT}/04-Colors/${P}-colors.css`} download className="font-semibold text-[#2F6DB5] hover:underline">CSS variables</a>
            <a href={`${KIT}/04-Colors/${P}-colors.json`} download className="font-semibold text-[#2F6DB5] hover:underline">JSON</a>
          </div>
        </section>

        {/* Type */}
        <section className="py-14 sm:py-20">
          <SectionHeading eyebrow="04 · Typography" title="Typeface: Inter">
            Inter is used across the website and in the wordmark. It's free from{' '}
            <a href="https://fonts.google.com/specimen/Inter" target="_blank" rel="noopener" className="text-[#2F6DB5] font-semibold hover:underline">Google Fonts</a>.
            Use Arial where Inter isn't available.
          </SectionHeading>
          <div className="grid gap-8 md:grid-cols-[1.4fr_1fr]">
            <div className="rounded-xl bg-[#F5F3EE] p-6 sm:p-8">
              <div className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">{c.sample.headline}</div>
              <div className="mt-2 text-xs text-slate-500">Headlines: Inter ExtraBold</div>
              <div className="mt-6 text-lg sm:text-xl font-semibold">{c.sample.subhead}</div>
              <div className="mt-1 text-xs text-slate-500">Subheads: Inter SemiBold</div>
              <p className="mt-6 text-sm leading-relaxed text-slate-600 max-w-lg">
                {c.sample.body}
              </p>
              <div className="mt-1 text-xs text-slate-500">Body: Inter Regular</div>
            </div>
            <div className="space-y-2 text-2xl">
              <div className="font-normal">Regular 400</div>
              <div className="font-semibold">SemiBold 600</div>
              <div className="font-bold">Bold 700</div>
              <div className="font-extrabold">ExtraBold 800</div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0F172A] text-slate-400">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row gap-3 items-center justify-between text-xs">
          <span>&copy; {new Date().getFullYear()} {c.name}. Brand kit v1.0.</span>
          <span>
            Questions about the brand? <a href="mailto:jruland@myproproducts.com" className="text-[#468CDC] hover:underline font-medium">jruland@myproproducts.com</a>
          </span>
        </div>
      </footer>
    </div>
  );
}
