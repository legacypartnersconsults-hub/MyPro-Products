import { useState, type FormEvent, type ReactNode } from 'react';
import {
  ArrowLeft, ArrowRight, FileText, Camera, Receipt, BookOpenCheck, MessagesSquare, Scale,
  CheckCircle2, Lock, Loader2, ShieldCheck, Clock3,
} from 'lucide-react';
import MyProClaimsAssistLogo from './MyProClaimsAssistLogo';
import { submitClaimAssistSignup } from './claimAssistSignup';

// MyPro Claim Assist product page (/claimassist): hero, how it works, and an
// early-access sign-up that also asks about past claim experiences.

const STEPS = [
  {
    icon: FileText,
    title: 'Claims Documentation',
    body: 'Start your claim the right way. Claim Assist walks you through reporting the loss, logs your claim number, adjuster and deadlines, and keeps every form in one secure folder.',
  },
  {
    icon: Camera,
    title: 'Damage Documentation',
    body: 'Guided photo and video checklists for every room, so nothing is missed. Each item is time-stamped and organized the way adjusters expect to see it.',
  },
  {
    icon: Receipt,
    title: 'Invoice & Receipt Tracking',
    body: 'Snap receipts for hotels, meals, repairs and replacements. Claim Assist totals what you have spent and what is still owed, ready to submit.',
  },
  {
    icon: BookOpenCheck,
    title: 'Insurance Policy Review',
    body: 'Upload your policy and get a plain-English summary of your coverages, limits and deductibles, plus the line items homeowners most often overlook.',
  },
  {
    icon: MessagesSquare,
    title: 'Adjuster & Contractor Communication',
    body: 'Keep a running log of every call, email and visit with your adjuster and contractors, with reminders so follow-ups never slip.',
  },
  {
    icon: Scale,
    title: 'Settlement Review',
    body: 'Compare the settlement offer against your documented losses and estimates, and see where a supplement or second look may be worth requesting.',
  },
];

function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-slate-800">{label}</span>
      {hint && <span className="block text-xs text-slate-500 mt-0.5">{hint}</span>}
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

const inputCls =
  'w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#5B2BD9] focus:ring-2 focus:ring-[#5B2BD9]/20';

function EarlyAccessForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [zip, setZip] = useState('');
  const [filed, setFiled] = useState<'yes' | 'no' | ''>('');
  const [experience, setExperience] = useState('');
  const [helped, setHelped] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) return setError('Please enter your name.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setError('Please enter a valid email address.');
    if (!/^\d{5}$/.test(zip.trim())) return setError('Please enter a 5-digit ZIP code.');
    setStatus('sending');
    try {
      await submitClaimAssistSignup({
        full_name: name.trim(),
        email: email.trim().toLowerCase(),
        zip_code: zip.trim(),
        filed_claim_before: filed === '' ? null : filed === 'yes',
        claim_experience: filed === 'yes' ? experience.trim() || null : null,
        what_would_have_helped: helped.trim() || null,
      });
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'done') {
    return (
      <div className="rounded-2xl bg-white p-8 sm:p-10 text-center shadow-xl">
        <div className="mx-auto h-14 w-14 rounded-full bg-[#5B2BD9]/10 flex items-center justify-center">
          <CheckCircle2 className="h-8 w-8 text-[#5B2BD9]" />
        </div>
        <h3 className="mt-5 text-2xl font-extrabold text-slate-900">You're on the list, {name.trim().split(' ')[0]}.</h3>
        <p className="mt-2 text-slate-600 max-w-md mx-auto">
          We'll email {email.trim()} when early access opens. Thank you for sharing your experience, it helps us build the tool homeowners actually need.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl bg-white p-6 sm:p-8 shadow-xl space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name">
          <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="Jane Smith" required />
        </Field>
        <Field label="Email address">
          <input className={inputCls} type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" placeholder="jane@example.com" required />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="ZIP code">
          <input className={inputCls} value={zip} onChange={(e) => setZip(e.target.value.replace(/\D/g, '').slice(0, 5))} inputMode="numeric" autoComplete="postal-code" placeholder="33101" required />
        </Field>
        <fieldset>
          <legend className="block text-sm font-semibold text-slate-800">Have you ever filed a property insurance claim?</legend>
          <div className="mt-1.5 grid grid-cols-2 gap-2">
            {(['yes', 'no'] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setFiled(v)}
                aria-pressed={filed === v}
                className={`rounded-lg border px-3 py-2.5 text-sm font-semibold transition-colors ${
                  filed === v ? 'border-[#5B2BD9] bg-[#5B2BD9] text-white' : 'border-slate-300 bg-white text-slate-700 hover:border-[#5B2BD9]/50'
                }`}
              >
                {v === 'yes' ? 'Yes, I have' : 'Not yet'}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      {filed === 'yes' && (
        <>
          <Field label="How did the claim process go for you?" hint="What was frustrating, confusing or slow? (optional)">
            <textarea className={`${inputCls} min-h-24`} value={experience} onChange={(e) => setExperience(e.target.value)} maxLength={2000} />
          </Field>
          <Field label="What could have helped you through the process?" hint="Tools, information or support you wish you'd had. (optional)">
            <textarea className={`${inputCls} min-h-24`} value={helped} onChange={(e) => setHelped(e.target.value)} maxLength={2000} />
          </Field>
        </>
      )}
      {filed === 'no' && (
        <Field label="If you ever need to file a claim, what would you want help with most?" hint="(optional)">
          <textarea className={`${inputCls} min-h-24`} value={helped} onChange={(e) => setHelped(e.target.value)} maxLength={2000} />
        </Field>
      )}

      {error && <p className="text-sm font-medium text-red-600" role="alert">{error}</p>}
      {status === 'error' && (
        <p className="text-sm font-medium text-red-600" role="alert">
          Sorry, we couldn't save your sign-up just now. Please try again, or email{' '}
          <a className="underline" href="mailto:jruland@myproproducts.com?subject=Claim%20Assist%20early%20access">jruland@myproproducts.com</a>.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#5B2BD9] hover:bg-[#4A20BE] disabled:opacity-70 px-6 py-3.5 text-base font-bold text-white transition-colors"
      >
        {status === 'sending' ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
        {status === 'sending' ? 'Saving…' : 'Join the early access list'}
      </button>
      <p className="flex items-start gap-2 text-xs text-slate-500">
        <Lock className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
        We'll only use your information to contact you about MyPro Claim Assist and to improve the product. We never sell your data.
      </p>
    </form>
  );
}

// A static preview of the app's claim tracker for the hero.
function ClaimPreview() {
  const rows = [
    { label: 'Claim reported', done: true },
    { label: 'Damage photos (42)', done: true },
    { label: 'Policy reviewed', done: true },
    { label: 'Receipts logged ($3,840)', done: false, active: true },
    { label: 'Settlement review', done: false },
  ];
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="absolute -inset-6 rounded-[2rem] bg-[#6AD5F9]/20 blur-2xl" aria-hidden="true" />
      <div className="relative rounded-3xl bg-white p-5 shadow-2xl">
        <div className="flex items-center justify-between">
          <MyProClaimsAssistLogo size="sm" theme="tile" showText={false} />
          <span className="text-[11px] font-semibold text-slate-500">Claim #HO-2026-0417</span>
        </div>
        <div className="mt-4">
          <div className="text-xs font-semibold text-slate-500">Water damage · Kitchen &amp; hallway</div>
          <div className="mt-1 text-lg font-extrabold text-slate-900">Your claim is 60% complete</div>
          <div className="mt-2 h-2 rounded-full bg-slate-100 overflow-hidden">
            <div className="h-full w-3/5 rounded-full bg-gradient-to-r from-[#5B2BD9] to-[#6AD5F9]" />
          </div>
        </div>
        <ul className="mt-4 space-y-2.5">
          {rows.map((r) => (
            <li key={r.label} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm ${r.active ? 'bg-[#5B2BD9]/5 ring-1 ring-[#5B2BD9]/20' : ''}`}>
              {r.done ? (
                <CheckCircle2 className="h-5 w-5 text-[#5B2BD9]" />
              ) : (
                <span className={`h-5 w-5 rounded-full border-2 ${r.active ? 'border-[#5B2BD9]' : 'border-slate-300'}`} />
              )}
              <span className={r.done ? 'text-slate-500 line-through decoration-slate-300' : 'font-semibold text-slate-800'}>{r.label}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-2.5 text-xs font-medium text-amber-800">
          <Clock3 className="h-4 w-4" /> Adjuster follow-up due Friday
        </div>
      </div>
    </div>
  );
}

export default function MyProClaimAssistWebsite({ onBackToCorporate }: { onBackToCorporate: () => void }) {
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="MyPro Claim Assist home">
            <MyProClaimsAssistLogo size="md" />
          </button>
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <button onClick={() => go('how-it-works')} className="hover:text-[#5B2BD9]">How It Works</button>
            <button onClick={() => go('early-access')} className="hover:text-[#5B2BD9]">Early Access</button>
            <button onClick={onBackToCorporate} className="inline-flex items-center gap-1 hover:text-[#5B2BD9]"><ArrowLeft className="h-4 w-4" /> MyPro Products</button>
          </nav>
          <button onClick={() => go('early-access')} className="rounded-lg bg-[#5B2BD9] hover:bg-[#4A20BE] px-4 py-2 text-sm font-bold text-white">
            Get early access
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#6D3BE9] via-[#4B23B8] to-[#2E1384] text-white">
        <div className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:22px_22px]" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 grid gap-14 lg:grid-cols-[1.15fr_1fr] items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#B4ECFD] ring-1 ring-white/20">
              <ShieldCheck className="h-3.5 w-3.5" /> Coming soon · Early access open
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05]">
              Navigate Your Property Insurance Claim <span className="text-[#6AD5F9]">With Confidence</span>
            </h1>
            <p className="mt-6 text-lg text-white/85 max-w-xl leading-relaxed">
              MyPro Claim Assist is your step-by-step guide through a property damage claim. Document the damage, track every receipt, understand your policy and keep your adjuster conversations organized, all in one secure app.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => go('early-access')} className="inline-flex items-center gap-2 rounded-xl bg-[#6AD5F9] hover:bg-[#8BE0FB] px-6 py-3.5 text-base font-bold text-[#2E1384] transition-colors">
                Join the early access list <ArrowRight className="h-5 w-5" />
              </button>
              <button onClick={() => go('how-it-works')} className="rounded-xl px-6 py-3.5 text-base font-bold text-white ring-1 ring-white/40 hover:bg-white/10 transition-colors">
                See how it works
              </button>
            </div>
            <p className="mt-5 text-sm text-white/70">Built for homeowners by the team behind MyPro Market and MyPro Ready Hub.</p>
          </div>
          <ClaimPreview />
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="scroll-mt-20 py-20 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#5B2BD9]">How it works</div>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">Every step of your claim, organized</h2>
            <p className="mt-4 text-slate-600 text-lg">
              Claim Assist breaks a stressful process into clear steps, so you always know what to do next and have the records to back it up.
            </p>
          </div>
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.title} className="relative rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#6D3BE9] to-[#2E1384] text-white">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-extrabold text-[#5B2BD9]">Step {i + 1}</span>
                </div>
                <h3 className="mt-4 text-lg font-extrabold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Early access */}
      <section id="early-access" className="scroll-mt-20 py-20 sm:py-24 bg-gradient-to-br from-[#2E1384] to-[#4B23B8]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-[1fr_1.25fr] items-start">
          <div className="text-white">
            <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#6AD5F9]">Early access</div>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">Be first to try MyPro Claim Assist</h2>
            <p className="mt-4 text-white/80 text-lg leading-relaxed">
              Join the list for early access. If you've been through a claim before, tell us how it went. Your answers shape what we build first.
            </p>
            <ul className="mt-8 space-y-3 text-white/90">
              {['Early access before public launch', 'Product updates as we build', 'A direct line to the product team'].map((t) => (
                <li key={t} className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-[#6AD5F9]" /> {t}</li>
              ))}
            </ul>
          </div>
          <EarlyAccessForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#140A36] text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
          <MyProClaimsAssistLogo size="sm" theme="dark" />
          <p className="text-center">
            &copy; {new Date().getFullYear()} MyPro Claim Assist, a MyPro Products company · <a href="mailto:jruland@myproproducts.com" className="text-[#6AD5F9] hover:underline">jruland@myproproducts.com</a>
          </p>
          <div className="flex items-center gap-5">
            <a href="/claimassist/brand" className="hover:text-white">Brand Assets</a>
            <button onClick={onBackToCorporate} className="hover:text-white">Return to MyPro Products</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
