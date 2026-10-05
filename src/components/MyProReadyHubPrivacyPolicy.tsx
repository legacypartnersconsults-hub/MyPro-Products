import { Shield, Lock, MapPin, Camera, Trash2, FileText } from 'lucide-react';

// The full policy and the account-deletion page are standalone static pages
// (public/readyhub/privacy and public/readyhub/delete-account), generated from
// the same content the app shows in its Legal screen. This section is only a
// short, accurate summary that links to them.
const PRIVACY_URL = '/readyhub/privacy/';
const DELETION_URL = '/readyhub/delete-account/';

export function MyProReadyHubPrivacySection() {
  return (
    <div id="privacy-policy" className="mt-16 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 text-left">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6 mb-6">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="inline-flex items-center space-x-1.5 text-[10px] font-bold text-cyan-400 bg-cyan-950/50 px-2.5 py-1 rounded-full border border-cyan-800/50 uppercase tracking-wider">
              <Shield className="h-3 w-3" />
              <span>Privacy</span>
            </span>
          </div>
          <h3 className="text-2xl font-extrabold text-white tracking-tight">MyPro Ready Hub Privacy &amp; Data</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            A short summary of how Ready Hub handles your information. The full policy explains everything we collect, who we share it with, and how to delete it.
          </p>
        </div>
        <div className="flex items-center space-x-2 flex-shrink-0">
          <a
            href={PRIVACY_URL}
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl text-xs font-bold transition-all shadow-md shadow-cyan-950"
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Read Full Policy</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-4 space-y-2">
          <div className="p-2 bg-cyan-950/60 text-cyan-400 rounded-lg w-fit"><Camera className="h-4 w-4" /></div>
          <h4 className="text-xs font-bold text-white">Scans use Google AI</h4>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Photos and video you scan are sent to our servers and to Google&rsquo;s AI services to read items, labels and documents. Room-scan video is not kept.
          </p>
        </div>

        <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-4 space-y-2">
          <div className="p-2 bg-cyan-950/60 text-cyan-400 rounded-lg w-fit"><Lock className="h-4 w-4" /></div>
          <h4 className="text-xs font-bold text-white">Your private cloud vault</h4>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Your records and files live in your private account, encrypted in transit and at rest, with an encrypted offline copy on your phone. We never sell your data.
          </p>
        </div>

        <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-4 space-y-2">
          <div className="p-2 bg-cyan-950/60 text-cyan-400 rounded-lg w-fit"><MapPin className="h-4 w-4" /></div>
          <h4 className="text-xs font-bold text-white">Location you control</h4>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Alerts use your ZIP code or, only if you choose Current Location, your location when you use the app. No continuous background tracking.
          </p>
        </div>

        <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-4 space-y-2">
          <div className="p-2 bg-rose-950/60 text-rose-400 rounded-lg w-fit"><Trash2 className="h-4 w-4" /></div>
          <h4 className="text-xs font-bold text-white">Delete anytime</h4>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Tap <strong>Profile &rarr; Delete Account</strong> in the app for immediate deletion, or <a href={DELETION_URL} className="text-cyan-400 hover:underline">request deletion online</a>.
          </p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <a href={PRIVACY_URL} className="text-cyan-400 hover:underline font-semibold">Privacy Policy</a>
          <a href={DELETION_URL} className="text-cyan-400 hover:underline font-semibold">Delete your account</a>
        </div>
        <div>
          <span>Questions? </span>
          <a href="mailto:jruland@myproproducts.com" className="text-cyan-400 hover:underline font-semibold">jruland@myproproducts.com</a>
        </div>
      </div>
    </div>
  );
}
