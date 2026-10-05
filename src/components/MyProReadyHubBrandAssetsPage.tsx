import { ArrowLeft } from 'lucide-react';
import MyProReadyHubBrandAssets from './MyProReadyHubBrandAssets';
import MyProReadyHubLogo from './MyProReadyHubLogo';

// The store-publishing and brand-asset kit lives on its own page, linked from
// the footer of the Ready Hub page, rather than sitting in the middle of it.
export default function MyProReadyHubBrandAssetsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <header className="border-b border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <MyProReadyHubLogo size="md" />
          <a href="/readyhub" className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-400 hover:text-cyan-300">
            <ArrowLeft className="h-4 w-4" /> Back to Ready Hub
          </a>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Brand assets &amp; store kit</h1>
        <p className="text-sm text-slate-400 mt-2 max-w-2xl">
          Logos, icons and store-listing images for MyPro Ready Hub.
        </p>
        <MyProReadyHubBrandAssets />
      </main>
    </div>
  );
}
