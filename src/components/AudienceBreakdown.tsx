import { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Building, Home, Briefcase, AlertTriangle, CheckCircle, Calculator, TrendingUp, Users, Clock, DollarSign } from 'lucide-react';
import { audiences } from '../data';
import { Audience } from '../types';

interface AudienceBreakdownProps {
  onRequestDemo: (productId?: string, audienceId?: string) => void;
}

export default function AudienceBreakdown({ onRequestDemo }: AudienceBreakdownProps) {
  const [activeAudienceId, setActiveAudienceId] = useState<string>('carriers');
  
  // ROI Estimator States
  const [claimsCount, setClaimsCount] = useState<number>(25);
  const [averageHourlyCost, setAverageHourlyCost] = useState<number>(45);
  const [adminHoursPerClaim, setAdminHoursPerClaim] = useState<number>(6);

  // Map string to icon
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield': return <Shield className="h-6 w-6" />;
      case 'Building': return <Building className="h-6 w-6" />;
      case 'Home': return <Home className="h-6 w-6" />;
      case 'Briefcase': return <Briefcase className="h-6 w-6" />;
      default: return <Users className="h-6 w-6" />;
    }
  };

  const activeAudience = audiences.find((a) => a.id === activeAudienceId) || audiences[0];

  // Calculations for ROI Calculator
  const totalAdminHoursCurrently = claimsCount * adminHoursPerClaim;
  const hoursSavedByMyPro = Math.round(totalAdminHoursCurrently * 0.65); // 65% efficiency gain
  const financialSavings = hoursSavedByMyPro * averageHourlyCost;
  const turnaroundDaysReduction = 14; // constant or estimated reduction in days

  return (
    <div className="bg-slate-50">
      
      {/* 1. Audience Segments Section */}
      <section id="audience-segments" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
            Tailored Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-4">
            Custom Workflows for Every Stakeholder
          </h2>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed">
            Property restoration involves complex coordination. Discover how the MyPro Products suite lifts administrative burdens for your specific role.
          </p>
        </div>

        {/* Segment Selectors */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-12">
          {audiences.map((aud) => {
            const isSelected = aud.id === activeAudienceId;
            return (
              <button
                key={aud.id}
                id={`audience-tab-${aud.id}`}
                onClick={() => setActiveAudienceId(aud.id)}
                className={`flex flex-col items-center text-center p-5 rounded-xl border transition-all focus:outline-none ${
                  isSelected
                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-150'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50/50 hover:border-slate-300'
                }`}
              >
                <div className={`p-2.5 rounded-lg mb-3 ${
                  isSelected ? 'bg-white/10 text-white' : 'bg-blue-50 text-blue-600'
                }`}>
                  {getIcon(aud.icon)}
                </div>
                <span className="text-sm font-bold tracking-tight">{aud.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Segment Breakdown Card */}
        <motion.div
          key={activeAudienceId}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left side: Problem/Solution & Benefits */}
            <div className="lg:col-span-8 space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {activeAudience.tagline}
                </h3>
              </div>

              {/* Burden Box */}
              <div className="p-4 rounded-xl bg-red-50/50 border border-red-100 flex items-start space-x-3.5">
                <AlertTriangle className="h-5.5 w-5.5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-red-800 uppercase tracking-wider">The Administrative Burden</h4>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">{activeAudience.burden}</p>
                </div>
              </div>

              {/* Solution Box */}
              <div className="p-4 rounded-xl bg-green-50/50 border border-green-100 flex items-start space-x-3.5">
                <CheckCircle className="h-5.5 w-5.5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-green-800 uppercase tracking-wider">The MyPro Solution</h4>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">{activeAudience.solution}</p>
                </div>
              </div>

              {/* Key Benefits Grid */}
              <div className="pt-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3.5">Operational Wins</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {activeAudience.keyBenefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center space-x-2.5">
                      <div className="h-2 w-2 rounded-full bg-blue-600 flex-shrink-0" />
                      <span className="text-xs font-semibold text-slate-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side: High Impact Stats Card */}
            <div className="lg:col-span-4 bg-slate-50 rounded-xl p-6 border border-slate-150 flex flex-col justify-between h-full min-h-[220px]">
              <div>
                <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded uppercase tracking-wider">
                  Target Impact
                </span>
                <div className="text-5xl font-extrabold text-blue-600 tracking-tight mt-4">
                  {activeAudience.stats.value}
                </div>
                <div className="text-sm font-bold text-slate-800 mt-1">
                  {activeAudience.stats.label}
                </div>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {activeAudience.stats.description}
                </p>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => onRequestDemo(undefined, activeAudience.id)}
                  className="w-full text-center py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md text-sm"
                >
                  Configure For My Team
                </button>
              </div>
            </div>

          </div>
        </motion.div>
      </section>

      {/* 2. Interactive B2B ROI Savings Estimator */}
      <section id="roi-calculator" className="py-20 border-t border-slate-150 bg-slate-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side: Interactive Controls */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center space-x-2">
                <Calculator className="h-5 w-5 text-blue-600" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">IMPACT ESTIMATOR</span>
              </div>
              <h3 className="text-3xl font-bold text-slate-900 tracking-tight">
                Calculate Your Administrative Savings
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Manually managing claims, vetting credentials, checking insurance policies, and handling payout authorizations eats up vital staff hours. See how much MyPro Products recovers for your bottom line.
              </p>

              {/* Sliders Container */}
              <div className="space-y-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                
                {/* Slider 1 */}
                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    <span>Claims / Dispatches per Month</span>
                    <span className="text-blue-600 font-mono text-sm font-extrabold">{claimsCount} jobs</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="200"
                    step="5"
                    value={claimsCount}
                    onChange={(e) => setClaimsCount(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-semibold mt-1">
                    <span>5</span>
                    <span>100</span>
                    <span>200+</span>
                  </div>
                </div>

                {/* Slider 2 */}
                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    <span>Current Admin Hours per Claim</span>
                    <span className="text-blue-600 font-mono text-sm font-extrabold">{adminHoursPerClaim} hours</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    step="1"
                    value={adminHoursPerClaim}
                    onChange={(e) => setAdminHoursPerClaim(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-semibold mt-1">
                    <span>1 hr (Optimized)</span>
                    <span>8 hr</span>
                    <span>15 hr (Heavy)</span>
                  </div>
                </div>

                {/* Slider 3 */}
                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    <span>Staff Blended Hourly Rate</span>
                    <span className="text-blue-600 font-mono text-sm font-extrabold">${averageHourlyCost}/hr</span>
                  </div>
                  <input
                    type="range"
                    min="25"
                    max="120"
                    step="5"
                    value={averageHourlyCost}
                    onChange={(e) => setAverageHourlyCost(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-semibold mt-1">
                    <span>$25</span>
                    <span>$70</span>
                    <span>$120</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Right side: Dynamic Visual ROI Summary */}
            <div className="lg:col-span-6 bg-slate-900 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl">
              
              {/* Mesh background */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.15),transparent_60%)] pointer-events-none" />

              <h4 className="text-xs font-bold uppercase tracking-widest text-blue-400">Projected Resource Recovery</h4>
              
              <div className="mt-8 grid grid-cols-2 gap-6">
                
                {/* Metric 1 */}
                <div className="border-l-2 border-blue-500 pl-4">
                  <div className="text-3xl md:text-4xl font-extrabold tracking-tight text-white flex items-center">
                    <Clock className="h-6 w-6 text-blue-400 mr-2 flex-shrink-0" />
                    <span>{hoursSavedByMyPro}</span>
                  </div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1.5">Hours Saved / mo</div>
                </div>

                {/* Metric 2 */}
                <div className="border-l-2 border-green-500 pl-4">
                  <div className="text-3xl md:text-4xl font-extrabold tracking-tight text-white flex items-center">
                    <DollarSign className="h-6 w-6 text-green-400 mr-1 flex-shrink-0" />
                    <span>{financialSavings.toLocaleString()}</span>
                  </div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1.5">Labor Cost Recovered</div>
                </div>

                {/* Metric 3 */}
                <div className="border-l-2 border-amber-500 pl-4">
                  <div className="text-3xl md:text-4xl font-extrabold tracking-tight text-white flex items-center">
                    <TrendingUp className="h-6 w-6 text-amber-400 mr-2 flex-shrink-0" />
                    <span>-{turnaroundDaysReduction}d</span>
                  </div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1.5">Claim Duration</div>
                </div>

                {/* Metric 4 */}
                <div className="border-l-2 border-indigo-400 pl-4">
                  <div className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                    <span>65%</span>
                  </div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1.5">Efficiency Gain</div>
                </div>

              </div>

              {/* Bottom Callout */}
              <div className="mt-8 p-4 bg-slate-800/80 rounded-xl border border-slate-700 text-xs leading-relaxed text-slate-300">
                <span className="font-bold text-white">B2B Insights:</span> By programmatically centralizing credential auditing, workflow triggers, and milestone evidence logging, the MyPro Products suite eliminates redundant manual checking.
              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => onRequestDemo(undefined, activeAudienceId)}
                  className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-center text-sm transition-colors shadow-lg shadow-blue-900/30"
                >
                  Download Complete PDF Proposal
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
