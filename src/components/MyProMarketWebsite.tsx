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
  Award,
  ArrowUpRight
} from 'lucide-react';

interface MyProMarketWebsiteProps {
  onBackToCorporate: () => void;
  onRequestDemo: (productId?: string) => void;
  onLaunchApp?: () => void;
}

export default function MyProMarketWebsite({ onBackToCorporate, onRequestDemo, onLaunchApp }: MyProMarketWebsiteProps) {
  const [activeTab, setActiveTab] = useState<'managers' | 'carriers' | 'contractors' | 'agents' | 'homeowners'>('managers');
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);
  const [activeLifecycleStep, setActiveLifecycleStep] = useState<number>(0);

  const marketLifecycleSteps = [
    {
      title: 'Damage Intake',
      desc: 'Owner or property manager files damage report online. Automated checklist pre-categorizes standard claim items.',
      metrics: 'Minutes vs Hours'
    },
    {
      title: 'Vetting Compliance',
      desc: 'MyPro automated system checks background records, state licensing, active general liability, and worker comp insurance.',
      metrics: '100% Guaranteed Compliance'
    },
    {
      title: 'Instant Dispatch',
      desc: 'The best-fitting local vetted contractor receives dispatch details, accepts instantly, and coordinates arrival with the occupant.',
      metrics: '<15 min Avg Acceptance'
    },
    {
      title: 'Real-time Tracking',
      desc: 'Field crew uploads milestone photos, material sheets, and digital dry-log reports live to the carrier portal.',
      metrics: 'Continuous Progress Feed'
    },
    {
      title: 'Standard Audit & Pay',
      desc: 'Platform automatically generates structured, carrier-compliant billing reports, facilitating immediate, secure payouts.',
      metrics: 'Payout in Days, Not Months'
    }
  ];

  // Text/SMS Messaging Opt-in States
  const [smsName, setSmsName] = useState('');
  const [smsPhone, setSmsPhone] = useState('');
  const [smsEmail, setSmsEmail] = useState('');
  const [smsRole, setSmsRole] = useState<'homeowner' | 'carrier' | 'contractor' | 'manager'>('homeowner');
  const [smsConsent, setSmsConsent] = useState(false);
  const [smsSubmitted, setSmsSubmitted] = useState(false);
  const [smsError, setSmsError] = useState('');

  const handleSmsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSmsError('');

    if (!smsName.trim()) {
      setSmsError('Please enter your full name.');
      return;
    }
    const cleanPhone = smsPhone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setSmsError('Please enter a valid 10-digit mobile phone number.');
      return;
    }
    if (!smsEmail.trim() || !smsEmail.includes('@')) {
      setSmsError('Please enter a valid email address.');
      return;
    }
    if (!smsConsent) {
      setSmsError('You must explicitly consent to receive SMS alerts to opt in.');
      return;
    }

    setSmsSubmitted(true);
  };

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
          <span className="hidden sm:inline text-white/40">|</span>
          <a href="#sms-optin" className="font-semibold text-white hover:text-slate-200 underline flex items-center space-x-1">
            <span>Opt In to Text Alerts &rarr;</span>
          </a>
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
            <a href="#sms-optin" className="text-[#468CDC] hover:text-[#3b7cbd] transition-colors flex items-center space-x-1">
              <span className="h-2 w-2 bg-[#98C44E] rounded-full animate-pulse inline-block"></span>
              <span>SMS Opt-In</span>
            </a>
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
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Ensuring everyone stays in touch and on the same page</h2>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              Explore how MyPro Market synchronizes communication, data auditing, and digital payouts across your property restoration workflow.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-10 border-b border-slate-100 pb-4">
            {(['managers', 'carriers', 'contractors', 'agents', 'homeowners'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xs font-bold px-4 py-2.5 rounded-lg border focus:outline-none transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-market-blue text-white border-market-blue shadow-md shadow-market-blue/10'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {tab === 'managers' && 'For Property Managers'}
                {tab === 'carriers' && 'For Insurance Carriers'}
                {tab === 'contractors' && 'For Contractors'}
                {tab === 'agents' && 'For Insurance Agents'}
                {tab === 'homeowners' && 'For Homeowners'}
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

              {activeTab === 'agents' && (
                <motion.div
                  key="agents"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
                >
                  <div className="md:col-span-8 space-y-4">
                    <h3 className="text-xl font-bold text-slate-900">Build Local Authority and Protect Policyholder Loyalty</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Agents are the first line of contact after disaster strikes but often lack visibility into mitigation scheduling. MyPro Market empowers local agents with real-time tracking of active local dispatches.
                    </p>
                    <div className="space-y-2.5 text-xs text-slate-700">
                      <div className="flex items-center space-x-2">
                        <Check className="h-4.5 w-4.5 text-market-green" />
                        <span>Direct dashboard transparency to track assigned contractor ETA for active clients.</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="h-4.5 w-4.5 text-market-green" />
                        <span>Automated SMS/text status alerts sent to client's phone immediately.</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="h-4.5 w-4.5 text-market-green" />
                        <span>Seamless claim submission flow that initiates programmatic dispatching.</span>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-4 bg-white p-5 rounded-xl border border-slate-150 text-center shadow-sm">
                    <div className="text-4xl font-extrabold text-market-blue">98%</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Policyholder Retention Rate</div>
                    <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">Maintained by delivering immediate, fully audited emergency response when help is needed most.</p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'homeowners' && (
                <motion.div
                  key="homeowners"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
                >
                  <div className="md:col-span-8 space-y-4">
                    <h3 className="text-xl font-bold text-slate-900">Elite Vetted Service Teams Dispatched to Your Door</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Homeowners suffer high anxiety waiting hours to find certified help or struggling with complex insurance claims documentation. MyPro Market manages everything seamlessly for you.
                    </p>
                    <div className="space-y-2.5 text-xs text-slate-700">
                      <div className="flex items-center space-x-2">
                        <Check className="h-4.5 w-4.5 text-market-green" />
                        <span>Programmatically vetted contractors with full licensing and background checks.</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="h-4.5 w-4.5 text-market-green" />
                        <span>Clear real-time repair progress tracking with visual photo updates.</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="h-4.5 w-4.5 text-market-green" />
                        <span>Secure claims processing directly coordinated with your insurance carrier.</span>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-4 bg-white p-5 rounded-xl border border-slate-150 text-center shadow-sm">
                    <div className="text-4xl font-extrabold text-market-green">4.9 / 5</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Homeowner Satisfaction Score</div>
                    <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">From thousands of emergency repair and restoration completions managed on-platform.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* Property Repair Claims Lifecycle Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-market-blue bg-market-blue/5 px-3 py-1.5 rounded-full border border-market-blue/15">
              Claims Lifecycle
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-4">
              Property Repair Claims Lifecycle
            </h2>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              See how the vetting ecosystem and real-time tracking operate seamlessly under our flagship application.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Claims Lifecycle interactive stepper */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-market-blue" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">INTERACTIVE DEEP DIVE</span>
              </div>

              {/* Vertical Stepper */}
              <div className="space-y-4">
                {marketLifecycleSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start space-x-4 p-4 rounded-xl transition-all cursor-pointer border ${
                      activeLifecycleStep === idx 
                        ? 'bg-white shadow-md border-market-blue/20 ring-1 ring-market-blue/5' 
                        : 'bg-white/50 hover:bg-white border-slate-200/60'
                    }`}
                    onClick={() => setActiveLifecycleStep(idx)}
                  >
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 transition-colors ${
                      activeLifecycleStep === idx 
                        ? 'bg-market-blue text-white' 
                        : 'bg-slate-200 text-slate-600'
                    }`}>
                      {idx + 1}
                    </div>
                    <div className="flex-grow text-left">
                      <div className="flex justify-between items-center flex-wrap gap-2">
                        <h4 className={`text-sm font-bold ${activeLifecycleStep === idx ? 'text-market-blue' : 'text-slate-800'}`}>
                          {step.title}
                        </h4>
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded transition-colors ${
                          activeLifecycleStep === idx 
                            ? 'bg-market-blue/10 text-market-blue border border-market-blue/20'
                            : 'bg-slate-100 text-slate-500 border border-slate-200/50'
                        }`}>
                          {step.metrics}
                        </span>
                      </div>
                      {activeLifecycleStep === idx && (
                        <p className="text-xs text-slate-600 mt-2 leading-relaxed font-nunito">
                          {step.desc}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Real-time Tracking and Vetting Interactive Visualization */}
            <div className="lg:col-span-5 bg-white border border-slate-150 rounded-2xl p-6 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-market-blue/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-5">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="h-5 w-5 text-market-green" />
                  <span className="text-xs font-bold text-slate-800">MyPro Verified Compliance Profile</span>
                </div>
                <span className="text-[10px] font-bold bg-green-50 text-market-green px-2 py-0.5 rounded border border-market-green/20 uppercase tracking-wide">
                  100% Compliant
                </span>
              </div>

              <div className="space-y-5">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                  <div className="flex justify-between items-center font-semibold text-slate-800 border-b border-slate-100 pb-2 mb-2">
                    <span>Pro Contractor ID:</span>
                    <span className="font-mono text-slate-500">PRO-8942-TX</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-600 text-left">
                    <div className="flex items-center space-x-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-market-green" />
                      <span>Licensing: <strong className="text-slate-800">Verified Active</strong></span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-market-green" />
                      <span>GL Insurance: <strong className="text-slate-800">$2M Active</strong></span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-market-green" />
                      <span>Auto Policy: <strong className="text-slate-800">Active</strong></span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-market-green" />
                      <span>Background: <strong className="text-slate-800">Passed</strong></span>
                    </div>
                  </div>
                </div>

                {/* Real-Time Live Map Claim Trace */}
                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                    <span>Real-time claim tracking</span>
                    <span className="text-market-blue flex items-center space-x-1">
                      <span className="h-2 w-2 rounded-full bg-market-blue animate-ping"></span>
                      <span className="font-semibold text-[10px]">Active dispatch trace</span>
                    </span>
                  </div>
                  
                  <div className="h-36 rounded-xl bg-slate-100 border border-slate-200 relative overflow-hidden flex flex-col justify-between p-4 shadow-inner">
                    {/* Grid lines mock map */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />
                    <div className="relative z-10 flex justify-between items-start text-[10px] text-slate-400 font-mono">
                      <span>Lat/Lng: 29.7604° N, 95.3698° W</span>
                      <span>Job: #9042-W</span>
                    </div>
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center space-x-2 bg-white/95 backdrop-blur-sm p-2 rounded-lg border border-slate-100 shadow-sm max-w-[190px] text-left">
                        <Clock className="h-4 w-4 text-market-blue flex-shrink-0" />
                        <div className="text-[10px]">
                          <div className="font-bold text-slate-800 leading-none">ETA to Property</div>
                          <div className="text-slate-500 mt-1">8 minutes (Distance: 3.4 mi)</div>
                        </div>
                      </div>
                      <div className="h-9 w-9 rounded-full bg-market-blue flex items-center justify-center text-white border-2 border-white shadow-lg shadow-market-blue/40 animate-bounce">
                        <Activity className="h-4.5 w-4.5" />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onLaunchApp}
                  className="w-full py-3 bg-market-blue hover:bg-market-blue-hover text-white text-xs font-bold rounded-xl text-center flex items-center justify-center space-x-2 transition-colors shadow-md shadow-market-blue/10 cursor-pointer"
                >
                  <span>Launch Live Portal</span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5.5 SMS Opt-In Section */}
      <section id="sms-optin" className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Context, Disclosures & Benefits */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-[#468CDC]" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">STAY CONNECTED</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-nunito leading-tight text-left">
                Opt In to Text / SMS Messaging
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed text-left">
                Connect and communicate effortlessly during repair events. By opting in to MyPro Market mobile text alerts, you will receive real-time automated updates regarding:
              </p>
              
              <ul className="space-y-3.5 text-xs text-slate-700 font-medium text-left">
                <li className="flex items-start space-x-2.5">
                  <span className="h-5 w-5 rounded-full bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0 text-[10px] font-bold">✓</span>
                  <span><strong>Immediate Contractor Dispatches:</strong> Instant notice when a professional has been assigned to your property claim.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <span className="h-5 w-5 rounded-full bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0 text-[10px] font-bold">✓</span>
                  <span><strong>Live ETA & Tracking Status:</strong> Know exactly when help will arrive with live arrival ETA notifications.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <span className="h-5 w-5 rounded-full bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0 text-[10px] font-bold">✓</span>
                  <span><strong>Secure Repair Coordination:</strong> Receive critical checklists, job status changes, and repair completion notifications.</span>
                </li>
              </ul>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-[11px] text-slate-500 space-y-2 leading-relaxed text-left">
                <h4 className="font-bold text-slate-700 uppercase tracking-wide text-[10px]">Important SMS Program Disclosures:</h4>
                <p>
                  By checking the consent box and submitting the form, you agree to receive automated notifications and informational SMS alerts from MyPro Market. Msg & data rates may apply. Msg frequency varies by active job event.
                </p>
                <p>
                  You can unsubscribe at any time by replying <strong>STOP</strong> to any of our text messages. For help or questions, reply <strong>HELP</strong> or contact our support team. We value your privacy; your mobile number will never be sold or shared with unapproved third parties.
                </p>
              </div>
            </div>

            {/* Right Column: Opt-In Form Card */}
            <div className="lg:col-span-7 bg-slate-50 rounded-2xl border border-slate-150 p-6 sm:p-8 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/30 rounded-full blur-2xl pointer-events-none" />
              
              {!smsSubmitted ? (
                <form onSubmit={handleSmsSubmit} className="space-y-4">
                  <div className="border-b border-slate-200/80 pb-4 mb-4 text-left">
                    <h3 className="text-lg font-bold text-slate-900 font-nunito">SMS Consent Form</h3>
                    <p className="text-xs text-slate-500 mt-1">Please provide your mobile details below to enroll in automatic dispatch text alerts.</p>
                  </div>

                  {smsError && (
                    <div className="bg-rose-50 border border-rose-100 rounded-lg p-3 text-rose-600 text-xs flex items-center space-x-2 text-left">
                      <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse flex-shrink-0" />
                      <span>{smsError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Full Name</label>
                      <input
                        type="text"
                        value={smsName}
                        onChange={(e) => setSmsName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#468CDC] focus:ring-1 focus:ring-[#468CDC]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Mobile Phone Number</label>
                      <input
                        type="tel"
                        value={smsPhone}
                        onChange={(e) => setSmsPhone(e.target.value)}
                        placeholder="(555) 000-0000"
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#468CDC] focus:ring-1 focus:ring-[#468CDC]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Email Address</label>
                      <input
                        type="email"
                        value={smsEmail}
                        onChange={(e) => setSmsEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#468CDC] focus:ring-1 focus:ring-[#468CDC]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Your Account Role</label>
                      <select
                        value={smsRole}
                        onChange={(e) => setSmsRole(e.target.value as any)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#468CDC] focus:ring-1 focus:ring-[#468CDC]"
                      >
                        <option value="homeowner">Homeowner / Consumer</option>
                        <option value="manager">Property Manager</option>
                        <option value="carrier">Insurance Carrier / Agent</option>
                        <option value="contractor">Field Contractor</option>
                      </select>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl p-4 mt-2 text-left">
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={smsConsent}
                        onChange={(e) => setSmsConsent(e.target.checked)}
                        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#468CDC] focus:ring-[#468CDC] cursor-pointer"
                      />
                      <span className="text-xs text-slate-600 leading-relaxed select-none">
                        I explicitly consent to receive automated text messages and mobile alerts from MyPro Market regarding active jobs, dispatches, and property claim status updates. Message & data rates may apply. Replying <strong>STOP</strong> at any time stops further messages.
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full text-center py-3 bg-[#468CDC] hover:bg-[#3b7cbd] text-white font-bold rounded-xl transition-all shadow-md text-sm mt-4 cursor-pointer"
                  >
                    Enroll in Text Alerts
                  </button>
                </form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-4"
                >
                  <div className="h-16 w-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto border border-green-100">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 font-nunito">Opt-In Registration Successful!</h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{smsName}</strong>. Your mobile number <strong>{smsPhone}</strong> has been enrolled under the <strong>{smsRole}</strong> role. A verification text message is on its way to your device.
                  </p>
                  <div className="bg-white border border-slate-200 rounded-lg p-3 max-w-sm mx-auto text-[11px] text-slate-500">
                    Remember: reply <strong>STOP</strong> at any time to opt-out.
                  </div>
                  <button
                    onClick={() => {
                      setSmsSubmitted(false);
                      setSmsName('');
                      setSmsPhone('');
                      setSmsEmail('');
                      setSmsConsent(false);
                    }}
                    className="mt-4 px-5 py-2 text-xs font-bold text-[#468CDC] hover:text-[#3b7cbd] focus:outline-none"
                  >
                    Enroll Another Device
                  </button>
                </motion.div>
              )}

            </div>

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
