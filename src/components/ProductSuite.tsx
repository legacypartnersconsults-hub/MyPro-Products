import { useState } from 'react';
import { motion } from 'motion/react';
import { Layers, ShieldAlert, Database, CheckCircle2, ArrowRight, ArrowUpRight, HelpCircle, Activity, ShieldCheck, Clock, TrendingUp } from 'lucide-react';
import { products } from '../data';
import { Product } from '../types';
import MyProMarketLogo from './MyProMarketLogo';
import MyProReadyHubLogo from './MyProReadyHubLogo';

interface ProductSuiteProps {
  onRequestDemo: (productId: string) => void;
  onLaunchPortal: () => void;
  onLaunchReadyHub: () => void;
}

export default function ProductSuite({ onRequestDemo, onLaunchPortal, onLaunchReadyHub }: ProductSuiteProps) {
  const [selectedProduct, setSelectedProduct] = useState<string>('market');
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

  return (
    <section id="product-suite" className="py-24 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
            Unified Property Ecosystem
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-4">
            The MyPro Products Suite
          </h2>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed">
            From single-incident dispatches to full-portfolio automated vendor flows and predictive property risk audits.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
          {products.map((product) => {
            const isActive = product.status === 'active';
            const isBeta = product.status === 'beta';
            
            return (
              <motion.div
                key={product.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className={`flex flex-col h-full rounded-2xl border transition-all relative overflow-hidden ${
                  isActive
                    ? product.id === 'readyhub'
                      ? 'border-cyan-200 bg-slate-50/30 shadow-md ring-1 ring-cyan-50'
                      : 'border-blue-200 bg-slate-50/30 shadow-md ring-1 ring-blue-50'
                    : 'border-slate-200 bg-white shadow-sm'
                } ${selectedProduct === product.id ? product.id === 'readyhub' ? 'ring-2 ring-cyan-400' : 'ring-2 ring-blue-600' : ''}`}
                onClick={() => setSelectedProduct(product.id)}
              >
                {/* Product Badge */}
                <div className="p-6 pb-0 flex justify-between items-start">
                  <div className={`p-1.5 rounded-xl border ${
                    product.id === 'market' || product.id === 'readyhub'
                      ? 'bg-slate-50 border-slate-100' 
                      : 'bg-purple-50 border-purple-100 text-purple-700'
                  }`}>
                    {product.id === 'market' && <MyProMarketLogo showText={false} size="md" />}
                    {product.id === 'readyhub' && <MyProReadyHubLogo showText={false} size="md" />}
                    {product.id === 'pulse' && <Database className="h-6 w-6 m-1 text-purple-600" />}
                  </div>

                  <div>
                    {product.status === 'active' ? (
                      <span className="text-xs font-bold bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full uppercase tracking-wider">
                        {product.badge}
                      </span>
                    ) : product.status === 'beta' ? (
                      <span className="text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-full uppercase tracking-wider animate-pulse">
                        {product.badge}
                      </span>
                    ) : (
                      <span className="text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200 px-3 py-1 rounded-full uppercase tracking-wider">
                        {product.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900 mt-4 group-hover:text-blue-600">
                      {product.name}
                    </h3>
                    <p className={`text-sm font-semibold mt-1 ${product.id === 'readyhub' ? 'text-cyan-600' : 'text-blue-600'}`}>
                      {product.tagline}
                    </p>
                    <p className="text-sm text-slate-600 mt-4 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Feature bullet list */}
                    <div className="mt-6 space-y-2.5">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Core Capabilities</h4>
                      {product.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <CheckCircle2 className={`h-4.5 w-4.5 flex-shrink-0 mt-0.5 ${isActive ? product.id === 'readyhub' ? 'text-cyan-500' : 'text-blue-600' : 'text-slate-400'}`} />
                          <span className="text-xs text-slate-700 leading-relaxed font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col space-y-3">
                    {isActive ? (
                      <>
                        <button
                          onClick={(e) => { e.stopPropagation(); if (product.id === 'readyhub') { onLaunchReadyHub(); } else { onLaunchPortal(); } }}
                          className={`w-full text-center py-3 text-white font-bold rounded-xl transition-all flex items-center justify-center space-x-2 shadow-md cursor-pointer ${
                            product.id === 'readyhub' 
                              ? 'bg-cyan-500 hover:bg-cyan-600 shadow-cyan-100' 
                              : 'bg-blue-600 hover:bg-blue-700 shadow-blue-100'
                          }`}
                        >
                          <span>Launch App</span>
                          <ArrowUpRight className="h-4.5 w-4.5" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); onRequestDemo(product.id); }}
                          className="w-full text-center py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold rounded-xl transition-all border border-slate-200 text-xs"
                        >
                          Request Enterprise Demo
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={(e) => { e.stopPropagation(); onRequestDemo(product.id); }}
                        className="w-full text-center py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all flex items-center justify-center space-x-2"
                      >
                        <span>Join Waitlist & Request Demo</span>
                        <ArrowRight className="h-4.5 w-4.5" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* MyPro Market Deep Dive - Interactive claims lifecycle and real-time tracking */}
        {selectedProduct === 'market' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8 relative"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Claims Lifecycle interactive stepper */}
              <div className="lg:col-span-7">
                <div className="flex items-center space-x-2 mb-4">
                  <Activity className="h-5 w-5 text-blue-600" />
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">INTERACTIVE DEEP DIVE</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                  MyPro Market Property Damage Claims Lifecycle
                </h3>
                <p className="text-sm text-slate-600 mt-2">
                  See how the vetting ecosystem and real-time tracking operate seamlessly under our flagship application.
                </p>

                {/* Vertical Stepper */}
                <div className="mt-6 space-y-4">
                  {marketLifecycleSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start space-x-4 p-3 rounded-lg transition-all cursor-pointer ${
                        activeLifecycleStep === idx 
                          ? 'bg-white shadow-sm border border-slate-100' 
                          : 'hover:bg-slate-100/50'
                      }`}
                      onClick={() => setActiveLifecycleStep(idx)}
                    >
                      <div className={`h-7 w-7 rounded-full flex items-center justify-center font-bold text-xs ${
                        activeLifecycleStep === idx 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-slate-200 text-slate-600'
                      }`}>
                        {idx + 1}
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-center flex-wrap">
                          <h4 className={`text-sm font-bold ${activeLifecycleStep === idx ? 'text-blue-600' : 'text-slate-800'}`}>
                            {step.title}
                          </h4>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 py-0.5 bg-slate-100/80 rounded mt-0.5">
                            {step.metrics}
                          </span>
                        </div>
                        {activeLifecycleStep === idx && (
                          <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                            {step.desc}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real-time Tracking and Vetting Interactive Visualization */}
              <div className="lg:col-span-5 bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
                <div className="flex justify-between items-center border-b border-slate-50 pb-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="h-5 w-5 text-green-500" />
                    <span className="text-xs font-bold text-slate-800">MyPro Verified Compliance Profile</span>
                  </div>
                  <span className="text-[10px] font-bold bg-green-50 text-green-700 px-2 py-0.5 rounded border border-green-100 uppercase">
                    100% Compliant
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs">
                    <div className="flex justify-between items-center font-semibold text-slate-800">
                      <span>Pro Contractor ID:</span>
                      <span className="font-mono text-slate-500">PRO-8942-TX</span>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                      <div>Licensing: <span className="font-bold text-green-600">Verified (State active)</span></div>
                      <div>GL Insurance: <span className="font-bold text-green-600">$2,000,000 Active</span></div>
                      <div>Auto Policy: <span className="font-bold text-green-600">Active (Standard)</span></div>
                      <div>Background: <span className="font-bold text-green-600">Passed (Annual check)</span></div>
                    </div>
                  </div>

                  {/* Real-Time Live Map Claim Trace mock */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                      <span>Real-time claim tracking</span>
                      <span className="text-blue-600 flex items-center space-x-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-ping"></span>
                        <span className="font-normal text-[10px]">Active dispatch trace</span>
                      </span>
                    </div>
                    <div className="h-32 rounded-lg bg-slate-100 border border-slate-200 relative overflow-hidden flex flex-col justify-between p-3">
                      {/* Grid lines mock map */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />
                      <div className="relative z-10 flex justify-between items-start text-[10px] text-slate-400 font-mono">
                        <span>Lat/Lng: 29.7604° N, 95.3698° W</span>
                        <span>Job: #9042-W</span>
                      </div>
                      <div className="relative z-10 flex items-center justify-between">
                        <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm p-1.5 rounded border border-slate-100 shadow-sm max-w-[180px]">
                          <Clock className="h-3.5 w-3.5 text-blue-600" />
                          <div className="text-[10px]">
                            <div className="font-bold text-slate-800 leading-none">ETA to Property</div>
                            <div className="text-slate-500 mt-0.5">8 minutes (Distance: 3.4 mi)</div>
                          </div>
                        </div>
                        <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white border-2 border-white shadow shadow-blue-500 animate-bounce">
                          <Activity className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={onLaunchPortal}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg text-center flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                  >
                    <span>Inspect Active Portal</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}
