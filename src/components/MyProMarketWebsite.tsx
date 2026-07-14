import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import MyProMarketLogo from './MyProMarketLogo';
import { PrivacyPolicyModal, TermsOfServiceModal } from './LegalModals';
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
  ArrowUpRight,
  AlertTriangle,
  Calculator,
  Users,
  Home,
  CheckCircle
} from 'lucide-react';
import { audiences } from '../data';
import { Audience } from '../types';

interface MyProMarketWebsiteProps {
  onBackToCorporate: () => void;
  onRequestDemo: (productId?: string, audienceId?: string) => void;
  onLaunchApp?: () => void;
}

export default function MyProMarketWebsite({ onBackToCorporate, onRequestDemo, onLaunchApp }: MyProMarketWebsiteProps) {
  const [activeTab, setActiveTab] = useState<'managers' | 'carriers' | 'contractors' | 'agents' | 'homeowners'>('managers');
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);
  const [activeLifecycleStep, setActiveLifecycleStep] = useState<number>(0);

  const marketLifecycleSteps = [
    {
      title: 'Create Your Job',
      desc: 'Detail your project requirements, upload photos, and outline your timeline—whether it is a custom home remodel, an emergency restoration, or a critical underwriting compliance repair.',
      metrics: 'Fast & Simple'
    },
    {
      title: 'Submit Your Request',
      desc: 'Once you create your job and choose your contractor, MyPro Market notifies your contractor directly. You Bypass middleman markup fees and third party brokers completely.',
      metrics: 'No Broker Fees'
    },
    {
      title: 'Match with Your Pro',
      desc: 'Connect immediately with elite, state-licensed local contractors who match your specific trade needs. Review verified real-time compliance profiles, certifications, and customer reviews.',
      metrics: '100% Vetted Pros'
    },
    {
      title: 'Get Your Job Done',
      desc: 'Monitor your project\'s trajectory in real time with automated milestone updates, fully transparent compliance reports, high-resolution progress photographs, and direct chat communication through our integrated messaging platform.',
      metrics: 'Complete Peace of Mind'
    }
  ];

  // Text/SMS Messaging Opt-in States
  const [smsName, setSmsName] = useState('');
  const [smsPhone, setSmsPhone] = useState('');
  const [smsEmail, setSmsEmail] = useState('');
  const [smsRole, setSmsRole] = useState<'homeowner' | 'carrier' | 'contractor' | 'manager'>('homeowner');
  const [smsConsent, setSmsConsent] = useState(false);
  const [termsConsent, setTermsConsent] = useState(false); // Separate Terms/Privacy consent
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [smsSubmitted, setSmsSubmitted] = useState(false);
  const [smsError, setSmsError] = useState('');

  // Legal Modal States
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  // Moved Sections: ROI states
  const [claimsCount, setClaimsCount] = useState<number>(25);
  const [averageHourlyCost, setAverageHourlyCost] = useState<number>(45);
  const [adminHoursPerClaim, setAdminHoursPerClaim] = useState<number>(6);

  const totalAdminHoursCurrently = claimsCount * adminHoursPerClaim;
  const hoursSavedByMyPro = Math.round(totalAdminHoursCurrently * 0.65); // 65% efficiency gain
  const financialSavings = hoursSavedByMyPro * averageHourlyCost;
  const turnaroundDaysReduction = 14;

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
      setSmsError('You must explicitly agree to receive SMS text messages from MyPro Market by checking the SMS consent box.');
      return;
    }
    if (!termsConsent) {
      setSmsError('You must acknowledge and agree to our Terms of Service.');
      return;
    }
    if (!privacyConsent) {
      setSmsError('You must acknowledge and agree to our Privacy Policy.');
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
            <a
              href="https://market.myproproducts.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#98C44E] hover:bg-[#85b03f] text-white font-bold text-xs px-4 py-2.5 rounded-lg shadow-md shadow-[#98C44E]/10 transition-all text-center flex items-center justify-center"
            >
              Launch App
            </a>
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
            <a
              href="https://market.myproproducts.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-[#98C44E] hover:bg-[#85b03f] text-white font-bold rounded-xl transition-all shadow-lg shadow-black/10 flex items-center justify-center space-x-2 text-center"
            >
              <span>Launch App</span>
              <ArrowRight className="h-5 w-5" />
            </a>
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
                  Designed with intuitive simplicity at its core, MyPro Market enables users to navigate the platform seamlessly. By transforming complex administration into straightforward, hassle-free actions, stakeholders can effortlessly coordinate jobs, dispatch qualified contractors, and monitor project progress through its entire lifecycle.
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
                  MyPro Market operates as a unified communication hub, instantly connecting insurance agents, insurance adjusters, property managers, homeowners, business owners and contractors. Status updates, jobsite notifications, document and invoice storage keep every stakeholder perfectly aligned.
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
                  Every project within the MyPro Market ecosystem is fully documented and auditable. Integrated cycle-time tracking, secure document storage, and structured post-job reviews deliver a completely transparent, high-performance process that ensures accountability at every milestone.
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
                  Every service provider undergoes a rigorous screening process. Active trade licensing, general liability insurance, comprehensive background checks, and industry certifications are completely transparent and accessible for all users to verify, ensuring only fully vetted and credentialed professionals service your property.
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
                        <span>Real-time job tracking, a unified communication portal, and secure document and invoice storage directly within your dashboard.</span>
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
                    <h3 className="text-xl font-bold text-slate-900">Accelerate Claim Cycles, Alleviate Insured Stress, and Minimize Adjuster Follow-ups</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Simplify claim repairs with streamlined workflows, time-cycle tracking, performance reporting, and seamless communication between adjusters, contractors and insureds.
                    </p>
                    <div className="space-y-2.5 text-xs text-slate-700">
                      <div className="flex items-center space-x-2">
                        <Check className="h-4.5 w-4.5 text-market-green" />
                        <span>MyPro Market ensures efficiency and ease of use for all stakeholders.</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="h-4.5 w-4.5 text-market-green" />
                        <span>Invite insureds to view live project details directly, fostering complete transparency while significantly reducing inbound status inquiries to adjusters.</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="h-4.5 w-4.5 text-market-green" />
                        <span>Real-time cycle-time tracking and comprehensive post-job performance reporting to facilitate seamless communication between all stakeholders.</span>
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
                    <h3 className="text-xl font-bold text-slate-900">Streamlined, Direct-to-Contractor Job Assignments</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Receive job assignments directly from the source. MyPro Market eliminates third-party intermediaries and biased dispatch algorithms, giving the original job creator complete control over contractor selection. This direct connection ensures you build genuine, long-term client relationships based purely on performance, expertise, and trust.
                    </p>
                    <div className="space-y-2.5 text-xs text-slate-700">
                      <div className="flex items-center space-x-2">
                        <Check className="h-4.5 w-4.5 text-market-green" />
                        <span>Direct-to-source opportunities, enabling you to build lasting professional relationships with key decision makers.</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="h-4.5 w-4.5 text-market-green" />
                        <span>Bypass middleman intermediaries with a platform that values your reputation and guarantees transaction transparency.</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="h-4.5 w-4.5 text-market-green" />
                        <span>Full autonomy for job creators to select your services based on performance, quality, and capability.</span>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-4 bg-white p-5 rounded-xl border border-slate-150 text-center shadow-sm">
                    <div className="text-4xl font-extrabold text-market-green">100% Direct</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Zero Intermediaries</div>
                    <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">Build authentic client relationships without third-party brokers, biased algorithms, or middleman fees.</p>
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
                    <h3 className="text-xl font-bold text-slate-900">MyPro Market: A Powerful Value-Add for Your Agency, Your Clients, and Your Staff</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Seamlessly connect your policyholders with licensed, pre-vetted contractors through an optimized, transparent framework that accelerates restoration timelines and ensures real-time communication at every milestone.
                    </p>
                    <div className="space-y-2.5 text-xs text-slate-700">
                      <div className="flex items-center space-x-2">
                        <Check className="h-4.5 w-4.5 text-market-green" />
                        <span>24/7 rapid emergency dispatch to instantly connect clients with elite, pre-vetted contractors when disaster strikes.</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="h-4.5 w-4.5 text-market-green" />
                        <span>Unified dashboard tracking that grants your agency real-time visibility into claim progress and contractor milestones.</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="h-4.5 w-4.5 text-market-green" />
                        <span>A highly optimized, stress-free experience that dramatically reduces staff inquiries and elevates client satisfaction.</span>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-4 bg-white p-5 rounded-xl border border-slate-150 text-center shadow-sm">
                    <div className="text-4xl font-extrabold text-market-blue">24/7 Relief</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">For Staff & Clients</div>
                    <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">Support your agency staff and protect client loyalty with automated, transparent restoration routing active around the clock.</p>
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
                    <h3 className="text-xl font-bold text-slate-900">Elite Vetted Contractors for Restoration, Remodels, and Compliance</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Whether you are addressing an emergency loss, planning a custom home remodel, or resolving time-sensitive underwriting inspection findings to secure your coverage, finding trustworthy professionals can be stressful. MyPro Market simplifies the process by matching you directly with elite, fully certified local contractors.
                    </p>
                    <div className="space-y-2.5 text-xs text-slate-700">
                      <div className="flex items-center space-x-2">
                        <Check className="h-4.5 w-4.5 text-market-green" />
                        <span>Programmatically vetted contractors with verified background checks, active licensing, and robust insurance coverage for all home care needs.</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="h-4.5 w-4.5 text-market-green" />
                        <span>Transparent real-time project milestones and high-resolution photo updates, keeping you fully informed at every stage of work.</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="h-4.5 w-4.5 text-market-green" />
                        <span>Comprehensive project coordination—handling everything from complex insurance claims and renovations to critical property inspection repairs.</span>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-4 bg-white p-5 rounded-xl border border-slate-150 text-center shadow-sm">
                    <div className="text-4xl font-extrabold text-market-green">4.9 / 5</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Homeowner Satisfaction Score</div>
                    <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">Achieved across thousands of home projects, from emergency repairs and custom remodels to compliance inspections.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* How MyPro Market Works Section */}
      <section id="provides" className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-market-blue bg-market-blue/5 px-3 py-1.5 rounded-full border border-market-blue/15">
              Market Workflow
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-4">
              How MyPro Market Works
            </h2>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              Connect with elite, pre-vetted contractors through a streamlined, transparent process designed for fast results and real-time tracking.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Market Workflow interactive stepper */}
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
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs text-left">
                  <div className="flex justify-between items-center font-semibold text-slate-800 border-b border-slate-150 pb-2 mb-2">
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Contractor Profile</span>
                    <span className="font-bold text-market-blue">Legacy Construction</span>
                  </div>
                  
                  <div className="space-y-3.5 mt-2.5 text-[11px] text-slate-600">
                    <div>
                      <strong className="text-slate-800 block mb-0.5">About the Company</strong>
                      <p className="leading-relaxed">A premier full-service residential and commercial contractor specializing in high-quality home remodels, emergency damage restoration, and swift underwriting compliance resolution.</p>
                    </div>

                    <div>
                      <strong className="text-slate-800 block mb-1.5">Types of Services Offered</strong>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 mt-1">
                        <div className="flex items-center space-x-1.5">
                          <Check className="h-3 w-3 text-market-green flex-shrink-0" />
                          <span>General Construction/Remodel</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                          <Check className="h-3 w-3 text-market-green flex-shrink-0" />
                          <span>Electrical</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                          <Check className="h-3 w-3 text-market-green flex-shrink-0" />
                          <span>HVAC</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                          <Check className="h-3 w-3 text-market-green flex-shrink-0" />
                          <span>Plumbing & Mechanical</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <strong className="text-slate-800 block mb-0.5">Credentials & Certifications</strong>
                      <p className="leading-relaxed">State Licensed General Contractor (#GC-8942-TX), IICRC Certified, OSHA-30 Compliant, $2M General Liability, fully bonded.</p>
                    </div>

                    <div className="flex items-center space-x-2 pt-1 border-t border-slate-200/55 mt-2">
                      <span className="h-2 w-2 rounded-full bg-market-green" />
                      <span className="font-bold text-slate-800">Background: <span className="text-market-green">Passed</span></span>
                    </div>
                  </div>
                </div>

                {/* Real-Time Job Tracking Milestones */}
                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                    <span>Real-Time Job Tracking Milestones</span>
                  </div>
                  
                  <div className="rounded-xl bg-white border border-slate-200 p-4 shadow-inner text-left">
                    <h4 className="text-xs font-extrabold text-[#468CDC] mb-4">Milestones (7)</h4>
                    
                    {/* Horizontal Milestones Line */}
                    <div className="flex items-start justify-between relative overflow-x-auto pb-2 scrollbar-none">
                      {[
                        { step: 1, label: 'Assignment Accepted/Rejected', status: 'checked' },
                        { step: 2, label: 'Customer Contacted', status: 'checked' },
                        { step: 3, label: 'Job Started', status: 'checked' },
                        { step: 4, label: 'Job Completed', status: 'active' },
                        { step: 5, label: 'COS Uploaded', status: 'pending' },
                        { step: 6, label: 'Invoice Uploaded', status: 'pending' },
                        { step: 7, label: 'Job Closed', status: 'pending' },
                      ].map((item, index, arr) => {
                        return (
                          <div key={item.step} className="flex-1 flex flex-col items-center min-w-[70px] relative">
                            {/* Connector line behind circles */}
                            {index < arr.length - 1 && (
                              <div className={`absolute top-4 left-[50%] right-[-50%] h-[2px] z-0 ${
                                item.status === 'checked' && arr[index + 1].status !== 'pending'
                                  ? 'bg-[#98C44E]' 
                                  : item.status === 'checked' && arr[index + 1].status === 'active'
                                  ? 'bg-[#98C44E]'
                                  : 'bg-slate-200'
                              }`} />
                            )}
                            
                            {/* Circle Indicator */}
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-[11px] font-bold relative z-10 shadow-sm transition-all ${
                              item.status === 'checked'
                                ? 'bg-[#98C44E] text-white'
                                : item.status === 'active'
                                ? 'bg-[#468CDC] text-white ring-4 ring-blue-100'
                                : 'bg-slate-200 text-slate-500'
                            }`}>
                              {item.status === 'checked' ? (
                                <Check className="h-4 w-4 stroke-[3]" />
                              ) : (
                                item.step
                              )}
                            </div>
                            
                            {/* Text label */}
                            <span className="text-[9px] font-bold text-center mt-2 leading-tight text-slate-600 max-w-[65px] h-10 flex items-start justify-center">
                              {item.label}
                            </span>
                          </div>
                        );
                      })}
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



      {/* Calculate Your Administrative Savings Section (Moved) */}
      <section id="roi-calculator" className="py-20 border-t border-slate-150 bg-slate-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left side: Interactive Controls */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="flex items-center space-x-2">
                <Calculator className="h-5 w-5 text-market-blue" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-nunito">IMPACT ESTIMATOR</span>
              </div>
              <h3 className="text-3xl font-bold text-slate-900 tracking-tight font-nunito">
                Calculate Your Administrative Savings
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-nunito">
                Manually managing claims, vetting credentials, checking insurance policies, and handling payout authorizations eats up vital staff hours. See how much MyPro Products recovers for your bottom line.
              </p>

              {/* Sliders Container */}
              <div className="space-y-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                {/* Slider 1 */}
                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 font-nunito">
                    <span>Claims / Dispatches per Month</span>
                    <span className="text-market-blue font-mono text-sm font-extrabold">{claimsCount} jobs</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="200"
                    step="5"
                    value={claimsCount}
                    onChange={(e) => setClaimsCount(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-market-blue focus:outline-none"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-semibold mt-1 font-mono">
                    <span>5</span>
                    <span>100</span>
                    <span>200+</span>
                  </div>
                </div>

                {/* Slider 2 */}
                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 font-nunito">
                    <span>Current Admin Hours per Claim</span>
                    <span className="text-market-blue font-mono text-sm font-extrabold">{adminHoursPerClaim} hours</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    step="1"
                    value={adminHoursPerClaim}
                    onChange={(e) => setAdminHoursPerClaim(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-market-blue focus:outline-none"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-semibold mt-1 font-mono">
                    <span>1 hr (Optimized)</span>
                    <span>8 hr</span>
                    <span>15 hr (Heavy)</span>
                  </div>
                </div>

                {/* Slider 3 */}
                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 font-nunito">
                    <span>Staff Blended Hourly Rate</span>
                    <span className="text-market-blue font-mono text-sm font-extrabold">${averageHourlyCost}/hr</span>
                  </div>
                  <input
                    type="range"
                    min="25"
                    max="120"
                    step="5"
                    value={averageHourlyCost}
                    onChange={(e) => setAverageHourlyCost(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-market-blue focus:outline-none"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-semibold mt-1 font-mono">
                    <span>$25</span>
                    <span>$70</span>
                    <span>$120</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Dynamic Visual ROI Summary */}
            <div className="lg:col-span-6 bg-slate-900 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl text-left">
              {/* Mesh background */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(70,140,220,0.15),transparent_60%)] pointer-events-none" />

              <h4 className="text-xs font-bold uppercase tracking-widest text-market-blue font-nunito">Projected Resource Recovery</h4>
              
              <div className="mt-8 grid grid-cols-2 gap-6">
                {/* Metric 1 */}
                <div className="border-l-2 border-market-blue pl-4">
                  <div className="text-3xl md:text-4xl font-extrabold tracking-tight text-white flex items-center font-nunito">
                    <Clock className="h-6 w-6 text-market-blue mr-2 flex-shrink-0" />
                    <span>{hoursSavedByMyPro}</span>
                  </div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1.5 font-nunito">Hours Saved / mo</div>
                </div>

                {/* Metric 2 */}
                <div className="border-l-2 border-green-500 pl-4">
                  <div className="text-3xl md:text-4xl font-extrabold tracking-tight text-white flex items-center font-nunito">
                    <DollarSign className="h-6 w-6 text-green-400 mr-1 flex-shrink-0" />
                    <span>{financialSavings.toLocaleString()}</span>
                  </div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1.5 font-nunito">Labor Cost Recovered</div>
                </div>

                {/* Metric 3 */}
                <div className="border-l-2 border-amber-500 pl-4">
                  <div className="text-3xl md:text-4xl font-extrabold tracking-tight text-white flex items-center font-nunito">
                    <TrendingUp className="h-6 w-6 text-amber-400 mr-2 flex-shrink-0" />
                    <span>-{turnaroundDaysReduction}d</span>
                  </div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1.5 font-nunito">Claim Duration</div>
                </div>

                {/* Metric 4 */}
                <div className="border-l-2 border-indigo-400 pl-4">
                  <div className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-nunito">
                    <span>65%</span>
                  </div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1.5 font-nunito">Efficiency Gain</div>
                </div>
              </div>

              {/* Bottom Callout */}
              <div className="mt-8 p-4 bg-slate-800/80 rounded-xl border border-slate-700 text-xs leading-relaxed text-slate-300 font-nunito">
                <span className="font-bold text-white">B2B Insights:</span> By programmatically centralizing credential auditing, workflow triggers, and milestone evidence logging, the MyPro Products suite eliminates redundant manual checking.
              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => onRequestDemo('market')}
                  className="w-full py-3 px-6 bg-market-blue hover:bg-market-blue-hover text-white font-bold rounded-xl text-center text-sm transition-colors shadow-lg shadow-market-blue/30 cursor-pointer font-nunito"
                >
                  Request a Demo
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
              <div className="flex flex-col space-y-4 items-start">
                <MyProMarketLogo size="lg" />
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5 text-[#468CDC]" />
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">STAY CONNECTED</span>
                </div>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-nunito leading-tight text-left">
                Opt In to Text / SMS Messaging
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed text-left">
                Connect and communicate effortlessly during repair events. By opting in to MyPro Market mobile text alerts, you explicitly agree to receive automated notifications and informational SMS/text messages from our business regarding your active property claims and vendor dispatches. You will receive real-time updates regarding:
              </p>
              
              <ul className="space-y-3.5 text-xs text-slate-700 font-medium text-left">
                <li className="flex items-start space-x-2.5">
                  <span className="h-5 w-5 rounded-full bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0 text-[10px] font-bold">✓</span>
                  <span><strong>Immediate Contractor Dispatches:</strong> Instant text notice when a certified professional has been assigned to your property claim.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <span className="h-5 w-5 rounded-full bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0 text-[10px] font-bold">✓</span>
                  <span><strong>Secure Repair Coordination:</strong> Receive critical job status changes, claim milestones, and repair completion notifications.</span>
                </li>
              </ul>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-[11px] text-slate-500 space-y-2 leading-relaxed text-left">
                <h4 className="font-bold text-slate-700 uppercase tracking-wide text-[10px]">Important SMS Program Disclosures:</h4>
                <p>
                  By checking the SMS Consent box and submitting the form, you agree to receive automated notifications and informational SMS alerts from MyPro Market at the mobile number provided. Consent is optional and is not a condition of purchase. Msg & data rates may apply. Msg frequency varies by active job event.
                </p>
                <p>
                  You can unsubscribe at any time by replying <strong>STOP</strong> to any of our text messages. For help or questions, reply <strong>HELP</strong> or contact our support team at jruland@myproproducts.com. We value your privacy; your mobile number and SMS consent will never be sold, shared, or rented with third parties or affiliates for marketing or promotional purposes.
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

                  {/* Separate Checkbox 1: Explicit SMS Consent */}
                  <div className="bg-white border border-slate-200 rounded-xl p-4 mt-2 text-left">
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={smsConsent}
                        onChange={(e) => setSmsConsent(e.target.checked)}
                        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#468CDC] focus:ring-[#468CDC] cursor-pointer"
                      />
                      <span className="text-xs text-slate-600 leading-relaxed select-none">
                        I explicitly consent and agree to receive automated notifications, dispatches, and informational text messages (SMS) from MyPro Market regarding active jobs, dispatches, and property claim status updates at the mobile number provided. Message & data rates may apply. Msg frequency varies by active job. I can reply <strong>STOP</strong> at any time to opt-out.
                      </span>
                    </label>
                  </div>

                  {/* Separate Checkbox 2: Terms of Service Agreement */}
                  <div className="bg-white border border-slate-200 rounded-xl p-4 mt-2 text-left">
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={termsConsent}
                        onChange={(e) => setTermsConsent(e.target.checked)}
                        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#468CDC] focus:ring-[#468CDC] cursor-pointer"
                      />
                      <span className="text-xs text-slate-600 leading-relaxed select-none">
                        I acknowledge that I have read and agree to the MyPro Market{' '}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setTermsOpen(true);
                          }}
                          className="text-[#468CDC] hover:underline font-semibold focus:outline-none"
                        >
                          Terms of Service
                        </button>
                        .
                      </span>
                    </label>
                  </div>

                  {/* Separate Checkbox 3: Privacy Policy Agreement */}
                  <div className="bg-white border border-slate-200 rounded-xl p-4 mt-2 text-left">
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={privacyConsent}
                        onChange={(e) => setPrivacyConsent(e.target.checked)}
                        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#468CDC] focus:ring-[#468CDC] cursor-pointer"
                      />
                      <span className="text-xs text-slate-600 leading-relaxed select-none">
                        I acknowledge that I have read and agree to the MyPro Market{' '}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setPrivacyOpen(true);
                          }}
                          className="text-[#468CDC] hover:underline font-semibold focus:outline-none"
                        >
                          Privacy Policy
                        </button>
                        . I understand my phone number and SMS consent will not be sold, shared, or rented with third parties or affiliates for marketing purposes.
                      </span>
                    </label>
                  </div>

                  {/* Message Frequency Disclosure */}
                  <div className="bg-slate-100/70 border border-slate-200 rounded-xl p-4 mt-2 text-left text-slate-500 text-xs space-y-1">
                    <span className="font-bold text-slate-700 block uppercase tracking-wide text-[10px]">Message Frequency Disclosure:</span>
                    <p className="leading-relaxed">
                      Message frequency varies based on active dispatch and job event activity. Standard notifications include initial assignment alerts, technician scheduling, real-time status updates, and claim completion confirmations. You can expect periodic updates only when there is active claim coordination on your property.
                    </p>
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
                      setTermsConsent(false);
                      setPrivacyConsent(false);
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
      <footer className="bg-slate-950 text-slate-500 py-12 border-t border-slate-900 text-xs text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <p className="text-slate-400">
            &copy; {new Date().getFullYear()} MyPro Market. A MyPro Products Ecosystem Suite Platform.
          </p>
          <div className="text-slate-500 max-w-md mx-auto leading-relaxed">
            Need assistance or have program questions? Contact us toll-free at <span className="text-slate-300 font-semibold">(833) 369-7762</span> or email <a href="mailto:jruland@myproproducts.com" className="text-[#468CDC] hover:underline font-medium">jruland@myproproducts.com</a>.
          </div>
          <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 pt-2 text-slate-400">
            <button onClick={() => setTermsOpen(true)} className="hover:text-slate-200 cursor-pointer focus:outline-none">Terms of Service & SMS Program Terms</button>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <button onClick={() => setPrivacyOpen(true)} className="hover:text-slate-200 cursor-pointer focus:outline-none">Privacy Policy</button>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <button onClick={onBackToCorporate} className="hover:text-slate-200 cursor-pointer focus:outline-none">Return to MyPro Products Homepage</button>
          </div>
        </div>
      </footer>

      {/* Legal Modals for Carrier and User Compliance */}
      <PrivacyPolicyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      <TermsOfServiceModal isOpen={termsOpen} onClose={() => setTermsOpen(false)} />

    </div>
  );
}
