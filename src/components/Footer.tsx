import React, { useState } from 'react';
import { ArrowUpRight, Shield, Layers, Zap, Database, Mail } from 'lucide-react';

interface FooterProps {
  onNavigateToSection: (sectionId: string) => void;
  onRequestDemo: () => void;
  onLaunchPortal: () => void;
}

export default function Footer({ onNavigateToSection, onRequestDemo, onLaunchPortal }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-slate-800">
          
          {/* Column 1: Company Profile */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-9 w-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                M
              </div>
              <div>
                <span className="text-white font-bold text-lg tracking-tight">MyPro</span>
                <span className="text-xs font-semibold text-blue-400 ml-1.5 uppercase tracking-wider">Products</span>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
              MyPro Products is the leading enterprise B2B software suite connecting carriers, managers, homeowners, and vetted field labor into automated, compliance-checked workflows.
            </p>
            <div className="text-xs flex items-center space-x-2 bg-slate-800/50 p-2.5 rounded-lg border border-slate-800 max-w-sm text-slate-300">
              <Shield className="h-4 w-4 text-green-400 flex-shrink-0" />
              <span>Full compliance & general liability tracking verified on 100% of jobs.</span>
            </div>
          </div>

          {/* Column 2: Solutions Navigation */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Active Suite</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onLaunchPortal}
                  className="hover:text-white flex items-center space-x-1 cursor-pointer focus:outline-none"
                >
                  <span>MyPro Market</span>
                  <ArrowUpRight className="h-3 w-3" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('product-suite')}
                  className="hover:text-white text-left focus:outline-none"
                >
                  Interactive Suite Grid
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('roi-calculator')}
                  className="hover:text-white text-left focus:outline-none"
                >
                  ROI Impact Calculator
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Audiences */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Who We Serve</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigateToSection('audience-segments')} className="hover:text-white text-left focus:outline-none">
                  Insurance Carriers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToSection('audience-segments')} className="hover:text-white text-left focus:outline-none">
                  Property Managers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToSection('audience-segments')} className="hover:text-white text-left focus:outline-none">
                  Property Owners
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToSection('audience-segments')} className="hover:text-white text-left focus:outline-none">
                  Vetted Contractors
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Sign-up */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Stay Updated</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Subscribe to "Ecosystem Audit" – our monthly B2B property tech and compliance tracking bulletin.
            </p>
            {subscribed ? (
              <div className="bg-slate-800/80 border border-blue-500/30 text-blue-400 p-3.5 rounded-lg text-xs leading-relaxed animate-fade-in">
                <span className="font-semibold block text-white mb-0.5">Subscription confirmed!</span>
                Thank you for subscribing to our monthly B2B property tech and compliance bulletin.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex space-x-2 max-w-sm">
                <div className="relative flex-grow">
                  <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-500">
                    <Mail className="h-3.5 w-3.5" />
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-8 pr-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors cursor-pointer"
                >
                  Join
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom copyright & certification bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs space-y-4 sm:space-y-0">
          <div>
            &copy; {currentYear} MyPro Products. All rights reserved. Deployed at{' '}
            <span className="text-white font-medium hover:underline cursor-pointer">myproproducts.com</span>
          </div>
          <div className="flex space-x-6">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span className="hover:text-white cursor-pointer">API Reference</span>
            <span className="flex items-center space-x-1 text-green-400">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
              <span>All Systems Operational</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
