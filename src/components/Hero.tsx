import { motion } from 'motion/react';
import { ShieldCheck, Zap, Layers, ArrowRight, ArrowUpRight, Activity, Home, Briefcase } from 'lucide-react';
import { useState, useEffect } from 'react';

interface HeroProps {
  onRequestDemo: (productId?: string) => void;
  onExploreSuite: () => void;
  onLaunchPortal: () => void;
}

export default function Hero({ onRequestDemo, onExploreSuite, onLaunchPortal }: HeroProps) {
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(0);

  // Auto-cycle through ecosystem steps for the interactive mockup
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveWorkflowStep((prev) => (prev + 1) % 4);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    {
      title: '1. Incident Reported',
      actor: 'Property Manager / Consumer',
      desc: 'Smart Intake registers water, fire, or wind damage with full photo attachments.',
      color: 'border-blue-500 text-blue-600 bg-blue-50',
      badge: 'Smart Intake'
    },
    {
      title: '2. Automated Dispatch',
      actor: 'MyPro Compliance Matcher',
      desc: 'Algorithm matches the local region and criteria with a background-vetted, licensed pro.',
      color: 'border-amber-500 text-amber-600 bg-amber-50',
      badge: 'Compliance Vetting'
    },
    {
      title: '3. Real-Time Execution',
      actor: 'Field Service Professional',
      desc: 'Contractor accepts, shares real-time location, and logs milestone photos live.',
      color: 'border-indigo-500 text-indigo-600 bg-indigo-50',
      badge: 'Milestone Tracking'
    },
    {
      title: '4. Instant Carrier Audit',
      actor: 'Insurance Carrier Portal',
      desc: 'Claims file closes with structured itemized details, triggering direct electronic payout.',
      color: 'border-green-500 text-green-600 bg-green-50',
      badge: 'Auto Audit & Close'
    }
  ];

  return (
    <section id="hero" className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-gradient-to-b from-slate-50 via-white to-slate-50/50 overflow-hidden">
      {/* Decorative Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a08_1px,transparent_1px),linear-gradient(to_bottom,#0f172a08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Decorative colored glow blobs */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/10 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & Value Proposition */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 text-blue-700 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider"
            >
              <Zap className="h-3.5 w-3.5 text-blue-600 animate-pulse" />
              <span>Introducing the MyPro Ecosystem</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]"
            >
              The Unified Platform for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Property Claims</span> & Dispatch
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              MyPro Products connects insurance carriers, property managers, homeowners, and background-vetted contractors into a single automated workflow. Replace fragmentation with frictionless execution.
            </motion.p>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center lg:justify-start gap-y-3 gap-x-6 text-sm text-slate-500 font-medium"
            >
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="h-4.5 w-4.5 text-green-500" />
                <span>100% Vetted Contractors</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="h-4.5 w-4.5 text-green-500" />
                <span>Real-Time SLA Tracking</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="h-4.5 w-4.5 text-green-500" />
                <span>Fully Compliant & Insured</span>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 pt-2"
            >
              <button
                onClick={() => onRequestDemo()}
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2"
              >
                <span>Request a Demo</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={onExploreSuite}
                className="w-full sm:w-auto px-8 py-4 bg-white text-slate-800 font-bold rounded-xl border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center space-x-2"
              >
                <span>Explore Suite</span>
                <Layers className="h-5 w-5 text-slate-500" />
              </button>
            </motion.div>
          </div>

          {/* Right Column: Interactive Ecosystem Simulator */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 relative overflow-hidden"
            >
              {/* Card Header */}
              <div className="flex justify-between items-center border-b border-slate-50 pb-4 mb-4">
                <div className="flex items-center space-x-2">
                  <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">ECOSYSTEM SIMULATOR</span>
                </div>
                <div className="flex items-center space-x-1 bg-slate-50 px-2 py-1 rounded text-[11px] text-slate-500 font-mono">
                  <Activity className="h-3.5 w-3.5 text-blue-500" />
                  <span>Real-time Flow</span>
                </div>
              </div>

              {/* Workflow Flowchart Animation */}
              <div className="relative h-60 border border-slate-100 rounded-xl bg-slate-50/50 p-4 flex flex-col justify-between overflow-hidden">
                
                {/* Simulated Nodes Map */}
                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between items-center pointer-events-none">
                  {/* Intake Node */}
                  <div className={`h-11 w-11 rounded-full flex items-center justify-center border transition-all duration-300 ${
                    activeWorkflowStep === 0 ? 'bg-blue-600 border-blue-600 text-white scale-110 shadow-lg shadow-blue-200' : 'bg-white border-slate-200 text-slate-400'
                  }`}>
                    <Home className="h-5 w-5" />
                  </div>
                  {/* Vetting Node */}
                  <div className={`h-11 w-11 rounded-full flex items-center justify-center border transition-all duration-300 ${
                    activeWorkflowStep === 1 ? 'bg-amber-500 border-amber-500 text-white scale-110 shadow-lg shadow-amber-200' : 'bg-white border-slate-200 text-slate-400'
                  }`}>
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  {/* Execution Node */}
                  <div className={`h-11 w-11 rounded-full flex items-center justify-center border transition-all duration-300 ${
                    activeWorkflowStep === 2 ? 'bg-indigo-500 border-indigo-500 text-white scale-110 shadow-lg shadow-indigo-200' : 'bg-white border-slate-200 text-slate-400'
                  }`}>
                    <Briefcase className="h-5 w-5" />
                  </div>
                  {/* Payout Node */}
                  <div className={`h-11 w-11 rounded-full flex items-center justify-center border transition-all duration-300 ${
                    activeWorkflowStep === 3 ? 'bg-green-500 border-green-500 text-white scale-110 shadow-lg shadow-green-200' : 'bg-white border-slate-200 text-slate-400'
                  }`}>
                    <Layers className="h-5 w-5" />
                  </div>
                </div>

                {/* Simulated Animated laser path connecting nodes */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                  <line x1="12%" y1="50%" x2="38%" y2="50%" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 4" />
                  <line x1="38%" y1="50%" x2="62%" y2="50%" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 4" />
                  <line x1="62%" y1="50%" x2="88%" y2="50%" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 4" />

                  {/* Active Laser Line Overlay */}
                  {activeWorkflowStep === 0 && (
                    <motion.line x1="12%" y1="50%" x2="38%" y2="50%" stroke="#3b82f6" strokeWidth="3" initial={{ strokeDashoffset: 10, strokeDasharray: "5 5" }} animate={{ strokeDashoffset: 0 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} />
                  )}
                  {activeWorkflowStep === 1 && (
                    <motion.line x1="38%" y1="50%" x2="62%" y2="50%" stroke="#f59e0b" strokeWidth="3" initial={{ strokeDashoffset: 10, strokeDasharray: "5 5" }} animate={{ strokeDashoffset: 0 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} />
                  )}
                  {activeWorkflowStep === 2 && (
                    <motion.line x1="62%" y1="50%" x2="88%" y2="50%" stroke="#6366f1" strokeWidth="3" initial={{ strokeDashoffset: 10, strokeDasharray: "5 5" }} animate={{ strokeDashoffset: 0 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} />
                  )}
                  {activeWorkflowStep === 3 && (
                    <motion.circle cx="88%" cy="50%" r="6" fill="#10b981" animate={{ scale: [1, 1.8, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} />
                  )}
                </svg>

                {/* Step Labels at Top */}
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <span>Intake</span>
                  <span>Compliance</span>
                  <span>Dispatch</span>
                  <span>Settle</span>
                </div>

                {/* Dynamic Status Panel at Bottom */}
                <div className="bg-white rounded-lg p-3.5 border border-slate-100 shadow-sm relative z-10">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-600 uppercase">
                      {steps[activeWorkflowStep].badge}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">Step {activeWorkflowStep + 1} of 4</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mt-2">{steps[activeWorkflowStep].title}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    {steps[activeWorkflowStep].desc}
                  </p>
                </div>
              </div>

              {/* Selector Tabs for Manual Control */}
              <div className="grid grid-cols-4 gap-2 mt-4">
                {steps.map((step, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveWorkflowStep(idx)}
                    className={`p-2 rounded text-left border transition-all focus:outline-none ${
                      activeWorkflowStep === idx
                        ? 'border-blue-500 bg-blue-50/50 shadow-sm'
                        : 'border-slate-100 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-[9px] font-bold text-slate-400 uppercase leading-none">Step {idx + 1}</div>
                    <div className="text-[10px] font-bold text-slate-800 mt-1 truncate">{step.badge}</div>
                  </button>
                ))}
              </div>

              {/* Action and Redirect */}
              <div className="mt-5 border-t border-slate-50 pt-4 flex justify-between items-center text-xs">
                <span className="text-slate-500 font-medium">Looking for active dispatch?</span>
                <button
                  onClick={onLaunchPortal}
                  className="text-blue-600 font-bold hover:text-blue-700 flex items-center space-x-1 cursor-pointer focus:outline-none"
                >
                  <span>Go to MyPro Market</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
