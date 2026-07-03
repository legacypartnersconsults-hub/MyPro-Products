import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Shield, ArrowRight, ArrowLeft, Mail, Building2, User, Phone, Layers, Zap, Database, Check, ShieldCheck } from 'lucide-react';
import { products, audiences } from '../data';
import { DemoInquiry } from '../types';

interface DemoRequestFormProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProductId?: string;
  preselectedAudienceId?: string;
  isMarketOnly?: boolean;
}

export default function DemoRequestForm({
  isOpen,
  onClose,
  preselectedProductId = '',
  preselectedAudienceId = '',
  isMarketOnly = false
}: DemoRequestFormProps) {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<DemoInquiry>({
    productId: '',
    audienceId: '',
    fullName: '',
    email: '',
    companyName: '',
    phone: '',
    companySize: '1-10',
    message: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const marketAudiences = [
    {
      id: 'carriers',
      title: 'Insurance Carriers',
      icon: 'Shield',
    },
    {
      id: 'agents',
      title: 'Insurance Agents',
      icon: 'ShieldCheck',
    },
    {
      id: 'managers',
      title: 'Property Managers',
      icon: 'Building2',
    },
    {
      id: 'contractors',
      title: 'Contractors',
      icon: 'Briefcase',
    },
  ];

  const currentAudiences = isMarketOnly ? marketAudiences : audiences;

  // Sync props when modal is opened
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setErrors({});
      setFormData({
        productId: isMarketOnly ? 'market' : (preselectedProductId || 'market'),
        audienceId: isMarketOnly 
          ? (preselectedAudienceId === 'consumers' ? 'agents' : (preselectedAudienceId || 'carriers'))
          : (preselectedAudienceId || 'carriers'),
        fullName: '',
        email: '',
        companyName: '',
        phone: '',
        companySize: '11-50',
        message: ''
      });
    }
  }, [isOpen, preselectedProductId, preselectedAudienceId, isMarketOnly]);

  if (!isOpen) return null;

  const validateStep1 = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.productId) newErrors.productId = 'Please select a product of interest.';
    if (!formData.audienceId) newErrors.audienceId = 'Please select your primary industry segment.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required.';
    
    // Email regex
    if (!formData.email.trim()) {
      newErrors.email = 'Work Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid work email address.';
    }

    if (!formData.companyName.trim()) newErrors.companyName = 'Company or Organization name is required.';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else if (step === 2) {
      if (validateStep2()) {
        // Trigger simulated submission
        setStep(3);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const getSelectedProductDetails = () => {
    if (isMarketOnly) {
      return { id: 'market', name: 'MyPro Market', tagline: 'The Property Damage Claims & Dispatch Network' };
    }
    return products.find((p) => p.id === formData.productId);
  };

  const getSelectedAudienceDetails = () => {
    const aud = currentAudiences.find((a) => a.id === formData.audienceId);
    if (aud) return aud;
    if (formData.audienceId === 'agents') {
      return { id: 'agents', title: 'Insurance Agents', icon: 'ShieldCheck' };
    }
    return { id: 'carriers', title: 'Insurance Carriers', icon: 'Shield' };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Container */}
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-2xl w-full relative z-10 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {isMarketOnly ? 'Request MyPro Market Demo' : 'Request an Enterprise Demo'}
            </h3>
            <p className="text-xs text-blue-600 mt-1 font-nunito font-semibold">
              Your inquiry will be sent directly to jruland@myproproducts.com.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Multi-step progress tracker */}
        {step < 3 && (
          <div className="bg-blue-50 px-6 py-3 flex justify-between items-center text-xs border-b border-blue-100/50">
            <div className="flex items-center space-x-2">
              <span className={`h-5 w-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                step >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                {step > 1 ? <Check className="h-3 w-3" /> : '1'}
              </span>
              <span className={`font-semibold ${step === 1 ? 'text-blue-700' : 'text-slate-500'}`}>Scope & Segment</span>
            </div>
            <div className="h-px bg-blue-200 flex-grow mx-4" />
            <div className="flex items-center space-x-2">
              <span className={`h-5 w-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                step === 2 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                2
              </span>
              <span className={`font-semibold ${step === 2 ? 'text-blue-700' : 'text-slate-500'}`}>Contact & Firmographics</span>
            </div>
          </div>
        )}

        {/* Scrollable Form Body */}
        <div className="p-6 overflow-y-auto flex-grow">
          <AnimatePresence mode="wait">
            
            {/* Step 1: Scope & Segment Selection */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                {/* Product Selection */}
                {!isMarketOnly ? (
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
                      1. Select Product Interest
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {products.map((prod) => {
                        const isSelected = formData.productId === prod.id;
                        return (
                          <div
                            key={prod.id}
                            onClick={() => setFormData({ ...formData, productId: prod.id })}
                            className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                              isSelected
                                ? 'border-blue-600 bg-blue-50/20 shadow-sm'
                                : 'border-slate-200 hover:border-slate-300 bg-white'
                            }`}
                          >
                            <div>
                              <div className="flex justify-between items-center">
                                <span className="font-bold text-sm text-slate-900">{prod.name}</span>
                                {prod.status !== 'active' && (
                                  <span className="text-[9px] font-bold uppercase bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded border border-amber-100">
                                    {prod.status}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                                {prod.tagline}
                              </p>
                            </div>
                            <div className="mt-3 flex justify-end">
                              <span className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                                isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300'
                              }`}>
                                {isSelected && <Check className="h-2.5 w-2.5 stroke-[3px]" />}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {errors.productId && (
                      <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.productId}</p>
                    )}
                  </div>
                ) : (
                  <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Product of Interest</span>
                      <span className="text-sm font-bold text-[#468CDC]">MyPro Market Claims & Dispatch</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase bg-[#98C44E] text-white px-2.5 py-1 rounded">
                      Selected
                    </span>
                  </div>
                )}

                {/* Audience Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
                    {isMarketOnly ? 'Select Your Primary Segment' : '2. Primary Industry Segment'}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {currentAudiences.map((aud) => {
                      const isSelected = formData.audienceId === aud.id;
                      return (
                        <div
                          key={aud.id}
                          onClick={() => setFormData({ ...formData, audienceId: aud.id })}
                          className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'border-blue-600 bg-blue-50/20 shadow-sm'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`p-1.5 rounded-lg ${
                              isSelected ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'
                            }`}>
                              {aud.id === 'carriers' && <Shield className="h-4.5 w-4.5" />}
                              {aud.id === 'agents' && <ShieldCheck className="h-4.5 w-4.5" />}
                              {aud.id === 'managers' && <Building2 className="h-4.5 w-4.5" />}
                              {aud.id === 'consumers' && <User className="h-4.5 w-4.5" />}
                              {aud.id === 'contractors' && <Phone className="h-4.5 w-4.5" />}
                            </div>
                            <span className="font-bold text-xs text-slate-800">{aud.title}</span>
                          </div>
                          <span className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300'
                          }`}>
                            {isSelected && <Check className="h-2.5 w-2.5 stroke-[3px]" />}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  {errors.audienceId && (
                    <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.audienceId}</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 2: Contact & Firmographic Details */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Full Name
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <User className="h-4 w-4" />
                      </span>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className={`w-full pl-9 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500 transition-colors ${
                          errors.fullName ? 'border-red-500 bg-red-50/10' : 'border-slate-200 bg-white'
                        }`}
                      />
                    </div>
                    {errors.fullName && <p className="text-xs text-red-500 mt-1 font-semibold">{errors.fullName}</p>}
                  </div>

                  {/* Work Email */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Work Email
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Mail className="h-4 w-4" />
                      </span>
                      <input
                        type="email"
                        placeholder="john@carrier.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full pl-9 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500 transition-colors ${
                          errors.email ? 'border-red-500 bg-red-50/10' : 'border-slate-200 bg-white'
                        }`}
                      />
                    </div>
                    {errors.email && <p className="text-xs text-red-500 mt-1 font-semibold">{errors.email}</p>}
                  </div>

                  {/* Company Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Company Name
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Building2 className="h-4 w-4" />
                      </span>
                      <input
                        type="text"
                        placeholder="E enterprise Logistics"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className={`w-full pl-9 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500 transition-colors ${
                          errors.companyName ? 'border-red-500 bg-red-50/10' : 'border-slate-200 bg-white'
                        }`}
                      />
                    </div>
                    {errors.companyName && <p className="text-xs text-red-500 mt-1 font-semibold">{errors.companyName}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Phone Number
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Phone className="h-4 w-4" />
                      </span>
                      <input
                        type="tel"
                        placeholder="(555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full pl-9 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500 transition-colors ${
                          errors.phone ? 'border-red-500 bg-red-50/10' : 'border-slate-200 bg-white'
                        }`}
                      />
                    </div>
                    {errors.phone && <p className="text-xs text-red-500 mt-1 font-semibold">{errors.phone}</p>}
                  </div>
                </div>

                {/* Company Size */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Company Size
                  </label>
                  <select
                    value={formData.companySize}
                    onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/25 bg-white"
                  >
                    <option value="1-10">1 - 10 Employees</option>
                    <option value="11-50">11 - 50 Employees</option>
                    <option value="51-200">51 - 200 Employees</option>
                    <option value="201-1000">201 - 1,000 Employees</option>
                    <option value="1000+">1,000+ Employees</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Project Goals / Additional Requirements (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe your property management, claims dispatch, or software integration requirements."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/25"
                  />
                </div>
              </motion.div>
            )}

            {/* Step 3: Success Confirmation */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-6"
              >
                <div className="inline-flex items-center justify-center h-16 w-16 bg-green-50 rounded-full text-green-600 border-2 border-green-200 animate-bounce">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                
                <div>
                  <h4 className="text-2xl font-extrabold text-slate-900 tracking-tight">Demo Inquiry Confirmed!</h4>
                  <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-bold text-slate-800">{formData.fullName}</span>. Your request has been successfully processed and sent to <span className="font-bold text-blue-600">jruland@myproproducts.com</span>.
                  </p>
                </div>

                {/* Summary Box */}
                <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 text-xs text-left max-w-md mx-auto space-y-2">
                  <div className="text-slate-400 font-bold uppercase tracking-wider pb-1.5 border-b border-slate-200/60">
                    Demonstration Parameters
                  </div>
                  <div>
                    <span className="text-slate-500 font-medium">Selected Product:</span>{' '}
                    <span className="font-bold text-slate-800">{getSelectedProductDetails()?.name || 'MyPro Market'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-medium">Industry Role:</span>{' '}
                    <span className="font-bold text-slate-800">{getSelectedAudienceDetails()?.title || 'Insurance Carrier'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-medium">Company Name:</span>{' '}
                    <span className="font-bold text-slate-800">{formData.companyName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-medium">Work Email:</span>{' '}
                    <span className="font-bold text-slate-800">{formData.email}</span>
                  </div>
                </div>

                <div className="text-xs text-slate-400 flex items-center justify-center space-x-1.5">
                  <Shield className="h-4 w-4 text-blue-500" />
                  <span>
                    A confirmation copy has been sent to your email and jruland@myproproducts.com.
                  </span>
                </div>

                <button
                  onClick={onClose}
                  className="w-full max-w-xs py-3 bg-[#98C44E] hover:bg-[#85b03f] text-white font-bold rounded-xl transition-all shadow-md"
                >
                  {isMarketOnly ? 'Return to MyPro Market' : 'Return to Ecosystem Suite'}
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Modal Footer (Controls) */}
        {step < 3 && (
          <div className="p-6 border-t border-slate-100 flex justify-between items-center bg-slate-50">
            {step > 1 ? (
              <button
                onClick={handleBack}
                className="flex items-center space-x-1.5 text-xs font-bold text-slate-600 hover:text-slate-800 focus:outline-none"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={handleNext}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-all flex items-center space-x-2"
            >
              <span>{step === 2 ? 'Submit Demo Request' : 'Next Step'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
