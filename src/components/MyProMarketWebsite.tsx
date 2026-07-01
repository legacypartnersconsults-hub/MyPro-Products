import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import MyProMarketLogo from './MyProMarketLogo';
import { 
  ShieldCheck, 
  Layers, 
  MapPin, 
  Clock, 
  User, 
  CheckCircle2, 
  ArrowLeft, 
  TrendingUp, 
  Search, 
  DollarSign, 
  Activity, 
  ArrowRight, 
  ChevronRight, 
  Briefcase, 
  Building, 
  Shield,
  HelpCircle,
  Star,
  Zap,
  Phone,
  Check,
  MessageSquare,
  Sparkles,
  Award
} from 'lucide-react';

interface MyProMarketWebsiteProps {
  onBackToCorporate: () => void;
  onRequestDemo: (productId?: string) => void;
  onLaunchApp?: () => void;
}

export default function MyProMarketWebsite({ onBackToCorporate, onRequestDemo, onLaunchApp }: MyProMarketWebsiteProps) {
  const [activeTab, setActiveTab] = useState<'managers' | 'carriers' | 'contractors'>('managers');
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'How does MyPro Market vet field contractors?',
      a: 'We enforce a continuous 3-tier auditing process. First, we pull real-time active status from state licensing boards. Second, we verify General Liability and Workers Compensation policies directly with insurance underwriters (ensuring a minimum $1M/$2M cover). Third, all crew leads must clear annual national background checks.'
    },
    {
      q: 'Can we integrate MyPro Market with our existing property software?',
      a: 'Absolutely. MyPro Market offers native API endpoints and webhook integrations for leading property management systems including Yardi, AppFolio, RealPage, and standard insurance claim platforms like Xactimate.'
    },
    {
      q: 'What is the standard turnaround time for dispatch?',
      a: 'For urgent emergency mitigation (e.g. active water line burst, fire board-up), our average automated acceptance time is under 5 minutes, backed by 24/7/365 emergency service response.'
    },
    {
      q: 'How does the payment authorization process operate?',
      a: 'All work is pre-scoped using standardized pricing guides approved by major insurance carriers. Once field contractors upload digital proof-of-work and dry logs, funds are verified and dispatched electronically via secure ACH, cutting payment turnaround from 60 days down to under 5 days.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-market-blue/20 selection:text-market-blue">
      
      {/* 1. standalone Banner notifying that it is part of MyPro Products umbrella */}
      <div className="bg-[#468CDC] text-white text-xs px-4 py-2.5 flex flex-col sm:flex-row justify-between items-center space-y-1.5 sm:space-y-0 shadow-sm border-b border-[#397bc7] relative z-50">
        <div className="flex items-center space-x-3">
          <span className="font-medium text-white">
            MyPro Market ensures everyone stays in touch and on the same page.
          </span>
        </div>
        <button 
          onClick={onBackToCorporate}
          className="flex items-center space-x-1 font-bold bg-[#98C44E] hover:bg-[#85b03f] text-white px-3 py-1 rounded transition-colors text-[11px]"
        >
          <ArrowLeft className="h-3 w-3" />
          <span>Back to MyPro Products Suite</span>
        </button>
      </div>

      {/* 2. Standing Navbar for cloned MyPro Market site */}
      <nav className="bg-white border-b border-slate-100 py-4 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <MyProMarketLogo size="lg" />

          <div className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-600">
            <a href="#provides" className="hover:text-market-blue transition-colors">How It Works</a>
            <a href="#key-benefits" className="hover:text-market-blue transition-colors">Who We Serve</a>
            <a href="#provides" className="hover:text-market-blue transition-colors">Core Benefits</a>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => onRequestDemo('market')}
              className="bg-transparent hover:bg-slate-50 text-slate-700 font-bold text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 transition-all"
            >
              Schedule Demo
            </button>
            <button
              onClick={onLaunchApp}
              className="bg-[#98C44E] hover:bg-[#85b03f] text-white font-bold text-xs px-4 py-2.5 rounded-lg shadow-md shadow-[#98C44E]/10 transition-all"
            >
              Launch App
            </button>
          </div>
        </div>
      </nav>

      {/* 3. Hero Section of cloned MyPro Market site */}
      <section className="relative pt-20 pb-24 md:pt-28 md:pb-32 bg-[#468CDC] overflow-hidden border-b border-market-blue/20 text-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-70 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          
          <span className="inline-flex items-center space-x-1.5 bg-white/10 border border-white/20 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-6">
            <ShieldCheck className="h-3.5 w-3.5 text-[#98c44E]" />
            <span>100% Insured & Active State Licensed Network</span>
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-nunito text-white tracking-tight max-w-4xl mx-auto leading-[1.1]">
            Restore Peace of Mind with MyPro Market
          </h1>

          <p className="text-lg sm:text-xl text-white font-nunito mt-6 max-w-3xl mx-auto leading-relaxed">
            Stop searching for unreliable contractors. MyPro Market matches insurance carriers, insurance agents, property managers and homeowners with pre-vetted contractors immediately.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={() => onRequestDemo('market')}
              className="w-full sm:w-auto px-8 py-4 bg-white text-[#468CDC] hover:bg-slate-50 font-bold rounded-xl transition-all shadow-lg shadow-black/10 flex items-center justify-center space-x-2"
            >
              <span>Schedule Demo</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <button
              onClick={onLaunchApp}
              className="w-full sm:w-auto px-8 py-4 bg-[#98C44E] hover:bg-[#85b03f] text-white font-bold rounded-xl transition-all shadow-lg shadow-black/10 flex items-center justify-center space-x-2"
            >
              <span>Launch App</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          {/* Social Proof Stats Banner */}
          <div className="mt-16 pt-12 border-t border-white/15 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-extrabold text-white">24/7/365</div>
              <div className="text-xs font-bold text-white/70 uppercase tracking-wider mt-1">Emergency Service Response</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-[#98c44E]">100%</div>
              <div className="text-xs font-bold text-white/70 uppercase tracking-wider mt-1">GL & License Vetted</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-white">&lt; 5 Min</div>
              <div className="text-xs font-bold text-white/70 uppercase tracking-wider mt-1">Match Confirmation</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-[#98c44E]">4.9 / 5</div>
              <div className="text-xs font-bold text-white/70 uppercase tracking-wider mt-1">Average Service Score</div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. "MyPro Market Provides" Section */}
      <section id="provides" className="py-24 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#468CDC] bg-[#468CDC]/10 px-3 py-1 rounded-full border border-[#468CDC]/20">
              Platform Benefits
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-4 font-nunito">
              MyPro Market Provides
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-4 leading-relaxed max-w-2xl mx-auto">
              Our comprehensive dispatch, auditing, and digital payout network is engineered from the ground up to bring unprecedented structure and speed to property claims.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Box 1: Ease of Use */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-xl bg-[#468CDC]/10 flex items-center justify-center text-[#468CDC]">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-nunito">Ease of Use</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  With our modern, intuitive dispatch dashboard, automated compliance routing, and simplified digital workflows, MyPro Market removes all the complexity from managing emergency dispatches. Property managers and insurance agents can easily coordinate claims and dispatch contractors in a fraction of the time.
                </p>
              </div>
            </div>

            {/* Box 2: Clear Communication */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-xl bg-[#98C44E]/10 flex items-center justify-center text-[#98C44E]">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-nunito">Clear Communication</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  The platform operates as a unified communication hub, instantly connecting insurance agents, property managers, and vetted field contractors. Automatic status updates, real-time job-site notifications, and synchronized chat rooms eliminate friction and keep every key stakeholder perfectly aligned.
                </p>
              </div>
            </div>

            {/* Box 3: Performance & Accountability */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-xl bg-[#468CDC]/10 flex items-center justify-center text-[#468CDC]">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-nunito">Performance & Accountability</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Every job in the MyPro Market ecosystem is fully documented and auditable. Real-time contractor GPS tracking, instant digital dry logs, transparent moisture readings, and step-by-step progress photos are uploaded live to guarantee professional-grade performance and structural accountability.
                </p>
              </div>
            </div>

            {/* Box 4: Quality and Trust */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-xl bg-[#98C44E]/10 flex items-center justify-center text-[#98C44E]">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-nunito">Quality and Trust</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  All contractors undergo continuous background checks, trade license verification, and direct-from-underwriter audits to ensure a minimum of $2,000,000 in general liability and worker's compensation cover. This programmatic screening process ensures that only premier, fully vetted service teams protect your property.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Stakeholder Audience Tabs (cloned design from mypromarket) */}
      <section id="key-benefits" className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">One Network, Three Stakeholders</h2>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              Explore how MyPro Market synchronizes communication, data auditing, and digital payouts across your property restoration workflow.
            </p>
          </div>

          <div className="flex justify-center space-x-3 mb-10 border-b border-slate-100 pb-4">
            {(['managers', 'carriers', 'contractors'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xs font-bold px-4 py-2.5 rounded-lg border focus:outline-none transition-all ${
                  activeTab === tab
                    ? 'bg-market-blue text-white border-market-blue shadow-md shadow-market-blue/10'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {tab === 'managers' && 'For Property Managers'}
                {tab === 'carriers' && 'For Insurance Carriers'}
                {tab === 'contractors' && 'For Contractors'}
              </button>
            ))}
          </div>

          <div className="bg-slate-50 rounded-2xl border border-slate-150 p-6 md:p-10">
            <AnimatePresence mode="wait">
              {activeTab === 'managers' && (
                <motion.div
                  key="managers"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
                >
                  <div className="md:col-span-8 space-y-4">
                    <h3 className="text-xl font-bold text-slate-900">Ensure Property Integrity and Slash Liability</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Dealing with midnight line bursts across hundreds of multi-family doors usually involves frantic calling and using random, unverified contractors, putting your assets and licensing at deep legal risk.
                    </p>
                    <div className="space-y-2.5 text-xs text-slate-700">
                      <div className="flex items-center space-x-2">
                        <Check className="h-4.5 w-4.5 text-market-green" />
                        <span>Instant programmatic matching with fully verified local contractors.</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="h-4.5 w-4.5 text-market-green" />
                        <span>Continuous background, state licensing, and insurance cover verification.</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="h-4.5 w-4.5 text-market-green" />
                        <span>Live GPS ETAs and status tracking directly on your dashboard.</span>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-4 bg-white p-5 rounded-xl border border-slate-150 text-center shadow-sm">
                    <div className="text-4xl font-extrabold text-market-blue">18 hr</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Staff Hours Saved / Wk</div>
                    <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">By automating work order dispatches, compliance checks, and payout tracking.</p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'carriers' && (
                <motion.div
                  key="carriers"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
                >
                  <div className="md:col-span-8 space-y-4">
                    <h3 className="text-xl font-bold text-slate-900">Mitigate Claim Bloat and Expedite Turnaround</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Carriers struggle with contractor invoice inflation, delayed damage reporting, and lack of clean visual documentation from the field. MyPro Market standardizes the claims lifecycle instantly.
                    </p>
                    <div className="space-y-2.5 text-xs text-slate-700">
                      <div className="flex items-center space-x-2">
                        <Check className="h-4.5 w-4.5 text-market-green" />
                        <span>Standardized line-item pricing verified against local market metrics.</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="h-4.5 w-4.5 text-market-green" />
                        <span>Real-time photo logs and structural moisture dry-log metrics.</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="h-4.5 w-4.5 text-market-green" />
                        <span>Comprehensive, audit-ready data packets delivered automatically.</span>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-4 bg-white p-5 rounded-xl border border-slate-150 text-center shadow-sm">
                    <div className="text-4xl font-extrabold text-market-blue">40%</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Avg Claim Cycle Reduction</div>
                    <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">Slashed administrative touchpoints from loss reporting to final vetted closure.</p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'contractors' && (
                <motion.div
                  key="contractors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
                >
                  <div className="md:col-span-8 space-y-4">
                    <h3 className="text-xl font-bold text-slate-900">Focus on the Work, Not Chasing Payouts</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Restoration pros spend too much time bidding, traveling for scopes, and waiting up to 60 days for carriers to approve and release checks. MyPro Market routes direct dispatches with pre-approved pricing parameters.
                    </p>
                    <div className="space-y-2.5 text-xs text-slate-700">
                      <div className="flex items-center space-x-2">
                        <Check className="h-4.5 w-4.5 text-market-green" />
                        <span>Pre-approved scopes that align with carrier guidelines.</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="h-4.5 w-4.5 text-market-green" />
                        <span>Direct digital verification that triggers instant electronic ACH payouts.</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="h-4.5 w-4.5 text-market-green" />
                        <span>Zero customer-acquisition cost (CAC) for dispatched regional work.</span>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-4 bg-white p-5 rounded-xl border border-slate-150 text-center shadow-sm">
                    <div className="text-4xl font-extrabold text-market-green">&lt; 5 Days</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Avg billing-to-payment cycle</div>
                    <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">Direct deposit released upon carrier validation of uploaded field photos.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* 6. FAQ Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Frequently Asked Questions</h2>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">Answers to common operational, compliance, and billing questions about the dispatch network.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setSelectedFaq(selectedFaq === idx ? null : idx)}
                  className="w-full text-left p-5 font-bold text-sm text-slate-800 hover:text-market-blue transition-colors flex justify-between items-center focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <span className="text-lg text-slate-400">{selectedFaq === idx ? '−' : '+'}</span>
                </button>
                {selectedFaq === idx && (
                  <div className="p-5 pt-0 text-xs text-slate-600 border-t border-slate-50 leading-relaxed bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. Direct Call-to-Action */}
      <section className="bg-market-blue text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_50%)] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Ready to Automate Your Restoration Dispatches?</h2>
          <p className="text-slate-100 text-base max-w-2xl mx-auto leading-relaxed">
            Configure your property portfolios, set compliant contractor filters, and instantly slash turnaround timelines. Reach out to coordinate an enterprise integration session today.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <button
              onClick={() => onRequestDemo('market')}
              className="w-full sm:w-auto px-8 py-3.5 bg-white text-market-blue hover:bg-slate-50 font-bold rounded-xl transition-all shadow-md shadow-market-blue/10"
            >
              Request Network Demo
            </button>
            <button
              onClick={onBackToCorporate}
              className="w-full sm:w-auto px-8 py-3.5 bg-market-blue-hover text-white font-bold rounded-xl border border-market-blue/50 hover:bg-slate-900/40"
            >
              View Other Products
            </button>
          </div>
        </div>
      </section>

      {/* 8. Simple Mini-Footer for Standalone page */}
      <footer className="bg-slate-950 text-slate-500 py-10 border-t border-slate-900 text-xs text-center">
        <p>&copy; {new Date().getFullYear()} MyPro Market. A MyPro Products Ecosystem Suite Platform.</p>
        <div className="flex justify-center space-x-6 mt-3">
          <span className="hover:text-slate-300 cursor-pointer">Terms & Agreements</span>
          <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
          <span className="hover:text-slate-300 cursor-pointer" onClick={onBackToCorporate}>Return to MyPro Products Homepage</span>
        </div>
      </footer>

    </div>
  );
}
