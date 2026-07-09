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

  return (
    <section id="product-suite" className="py-24 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#468CDC] bg-[#468CDC]/5 px-3 py-1.5 rounded-full border border-[#468CDC]/15">
            Unified Property Ecosystem
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-4">
            The MyPro Products Suite
          </h2>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed">
            The comprehensive ecosystem built for disaster preparedness, detailed property and content inventory, seamless claim documentation, and direct-to-contractor repair assignments.
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
                      : 'border-[#468CDC]/30 bg-slate-50/30 shadow-md ring-1 ring-[#468CDC]/10'
                    : 'border-slate-200 bg-white shadow-sm'
                } ${selectedProduct === product.id ? product.id === 'readyhub' ? 'ring-2 ring-cyan-400' : 'ring-2 ring-[#468CDC]' : ''}`}
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
                    {product.id === 'claimassist' && <ShieldAlert className="h-6 w-6 m-1 text-purple-600" />}
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
                    <h3 className="text-xl font-extrabold text-slate-900 mt-4 group-hover:text-[#468CDC]">
                      {product.name}
                    </h3>
                    <p className={`text-sm font-semibold mt-1 ${product.id === 'readyhub' ? 'text-cyan-600' : 'text-[#468CDC]'}`}>
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
                          <CheckCircle2 className={`h-4.5 w-4.5 flex-shrink-0 mt-0.5 ${isActive ? product.id === 'readyhub' ? 'text-cyan-500' : 'text-[#468CDC]' : 'text-slate-400'}`} />
                          <span className="text-xs text-slate-700 leading-relaxed font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col space-y-3">
                    {isActive ? (
                      <button
                        onClick={(e) => { e.stopPropagation(); if (product.id === 'readyhub') { onLaunchReadyHub(); } else { onLaunchPortal(); } }}
                        className={`w-full text-center py-3 text-white font-bold rounded-xl transition-all flex items-center justify-center space-x-2 shadow-md cursor-pointer ${
                          product.id === 'readyhub' 
                            ? 'bg-cyan-500 hover:bg-cyan-600 shadow-cyan-100' 
                            : 'bg-[#468CDC] hover:bg-[#3b7cbd] shadow-[#468CDC]/10'
                        }`}
                      >
                        <span>Launch App</span>
                        <ArrowUpRight className="h-4.5 w-4.5" />
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-full text-center py-3 bg-slate-100 text-slate-400 font-bold rounded-xl transition-all flex items-center justify-center space-x-2 cursor-not-allowed text-xs"
                      >
                        <span>Coming Soon</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
