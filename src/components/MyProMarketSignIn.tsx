import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Mail, Lock, ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import MyProMarketLogo from './MyProMarketLogo';

interface MyProMarketSignInProps {
  onSignInSuccess: () => void;
  onBackToWebsite: () => void;
}

export default function MyProMarketSignIn({ onSignInSuccess, onBackToWebsite }: MyProMarketSignInProps) {
  const [email, setEmail] = useState('j.fletcher@enterprise-pm.com');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Please enter your work email.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setIsLoading(true);

    // Simulate enterprise authentication
    setTimeout(() => {
      setIsLoading(false);
      onSignInSuccess();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-between text-slate-100 font-sans antialiased selection:bg-market-blue/20 selection:text-market-blue">
      {/* Top Bar Navigation */}
      <div className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex justify-between items-center relative z-50">
        <button
          onClick={onBackToWebsite}
          className="flex items-center space-x-2 text-xs font-bold text-slate-400 hover:text-white transition-all"
          id="btn-signin-back-to-site"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to MyPro Market website</span>
        </button>
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#98C44E] bg-[#98C44E]/10 border border-[#98C44E]/20 px-2.5 py-1 rounded">
          Enterprise Access
        </span>
      </div>

      {/* Main Form Area */}
      <div className="flex-grow flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-8 space-y-6"
          id="signin-container-card"
        >
          {/* Brand Logo Alignment */}
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <MyProMarketLogo size="lg" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold tracking-tight text-white font-nunito">Sign In to Your Account</h2>
              <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                Enter your credentials below to access the MyPro Market dispatch and compliance vetting system.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-900/20 border border-red-500/30 text-red-400 text-xs rounded-lg font-medium">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Work Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                  <Mail className="h-4 w-4" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-[#468CDC] focus:ring-2 focus:ring-[#468CDC]/15 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Password
                </label>
                <a href="#forgot" className="text-[10px] font-bold text-[#468CDC] hover:underline" onClick={(e) => e.preventDefault()}>
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                  <Lock className="h-4 w-4" />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-[#468CDC] focus:ring-2 focus:ring-[#468CDC]/15 transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#98C44E] hover:bg-[#85b03f] disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-[#98C44E]/10 flex items-center justify-center space-x-2 mt-2"
              id="btn-signin-submit"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4.5 w-4.5 animate-spin" />
                  <span className="text-sm">Authenticating Portal Credentials...</span>
                </>
              ) : (
                <>
                  <span className="text-sm">Sign In to Dashboard</span>
                  <ArrowRight className="h-4.5 w-4.5" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Assist */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-400 flex items-start space-x-2.5">
            <ShieldCheck className="h-5 w-5 text-[#98C44E] flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-slate-300 block">Simulated Credentials Active</span>
              <p className="leading-relaxed text-[11px]">
                Click <strong className="text-white">Sign In to Dashboard</strong> directly to access the fully responsive B2B dispatch portal.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="py-6 text-center text-[10px] text-slate-500 border-t border-slate-800/50 bg-slate-950">
        <div>MyPro Market Dispatch Portal is standard-compliant and SOC2 Vetted.</div>
        <div className="mt-1">© 2026 MyPro Products Group. All Rights Reserved.</div>
      </footer>
    </div>
  );
}
