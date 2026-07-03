import { motion } from 'motion/react';
import { ShieldCheck, Zap, Layers, ArrowRight } from 'lucide-react';

interface HeroProps {
  onRequestDemo: (productId?: string) => void;
  onExploreSuite: () => void;
  onLaunchPortal: () => void;
}

export default function Hero({ onRequestDemo, onExploreSuite, onLaunchPortal }: HeroProps) {
  return (
    <section id="hero" className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-white overflow-hidden">
      {/* Decorative Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a08_1px,transparent_1px),linear-gradient(to_bottom,#0f172a08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Decorative colored glow blobs */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/10 w-96 h-96 bg-slate-300/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-slate-50 border border-slate-200 text-slate-700 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider"
          >
            <Zap className="h-3.5 w-3.5 text-[#468CDC] animate-pulse" />
            <span>Introducing the MyPro Ecosystem</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]"
          >
            The Unified Suite for <span className="text-[#468CDC]">Property Repair</span>, <span className="text-[#BCB6A5]">Disaster Prep</span>, and <span className="text-[#468CDC]">Claim Management</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal"
          >
            Connect insurance carriers, background-vetted contractors, consumers, and homeowners in one smart environment. 
            From dispatch through <span className="font-semibold text-slate-900">MyPro Market</span>, interactive prep through <span className="font-semibold text-slate-900">MyPro Ready Hub</span>, and complete guidance with <span className="font-semibold text-slate-900">MyPro Claim Assist</span>.
          </motion.p>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-y-3 gap-x-6 text-sm text-slate-500 font-medium"
          >
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="h-4.5 w-4.5 text-[#BCB6A5]" />
              <span>100% Vetted Contractors</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="h-4.5 w-4.5 text-[#BCB6A5]" />
              <span>Real-Time SLA Tracking</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="h-4.5 w-4.5 text-[#BCB6A5]" />
              <span>Homeowner & Consumer Guided</span>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2"
          >
            <button
              onClick={() => onRequestDemo()}
              className="w-full sm:w-auto px-8 py-4 bg-[#468CDC] hover:bg-[#3b7cbd] text-white font-bold rounded-xl transition-all shadow-lg shadow-slate-200 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Request a Demo</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <button
              onClick={onExploreSuite}
              className="w-full sm:w-auto px-8 py-4 bg-white text-slate-800 font-bold rounded-xl border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Explore Suite</span>
              <Layers className="h-5 w-5 text-slate-500" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
