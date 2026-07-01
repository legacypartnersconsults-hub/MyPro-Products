import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Layers, 
  Plus, 
  MapPin, 
  Clock, 
  AlertCircle, 
  User, 
  CheckCircle2, 
  ArrowLeft, 
  TrendingUp, 
  Filter, 
  Search, 
  DollarSign, 
  UploadCloud, 
  FileText,
  Activity,
  Check
} from 'lucide-react';

interface MyProMarketPortalProps {
  onBackToCorporate: () => void;
}

interface ClaimTicket {
  id: string;
  propertyAddress: string;
  damageType: 'Water' | 'Fire' | 'Wind' | 'Mold';
  reportedDate: string;
  status: 'Intake' | 'Vetted Match' | 'En Route' | 'In Progress' | 'Under Audit' | 'Completed';
  assignedPro: string;
  proRating: string;
  proPhone: string;
  photosUploaded: string[];
  estimatedCost: string;
}

export default function MyProMarketPortal({ onBackToCorporate }: MyProMarketPortalProps) {
  // Mock claims database that is stateful so users can create tickets in real time
  const [claims, setClaims] = useState<ClaimTicket[]>([
    {
      id: 'CLM-9042-W',
      propertyAddress: '1402 Post Oak Blvd, Houston, TX 77056',
      damageType: 'Water',
      reportedDate: '2026-06-26',
      status: 'En Route',
      assignedPro: 'Texas Restoration Pros LLC',
      proRating: '4.9/5',
      proPhone: '(713) 555-8942',
      photosUploaded: ['/assets/dry_log_1.jpg'],
      estimatedCost: '$3,850'
    },
    {
      id: 'CLM-8173-F',
      propertyAddress: '883 Westheimer Rd, Houston, TX 77027',
      damageType: 'Fire',
      reportedDate: '2026-06-25',
      status: 'Under Audit',
      assignedPro: 'Lone Star Remediation',
      proRating: '4.8/5',
      proPhone: '(281) 555-0193',
      photosUploaded: ['/assets/fire_damage_1.jpg', '/assets/fire_damage_2.jpg'],
      estimatedCost: '$14,200'
    },
    {
      id: 'CLM-7711-W',
      propertyAddress: '512 River Oaks Dr, Houston, TX 77019',
      damageType: 'Wind',
      reportedDate: '2026-06-24',
      status: 'Completed',
      assignedPro: 'Coastal Emergency Roofers',
      proRating: '4.95/5',
      proPhone: '(409) 555-1102',
      photosUploaded: ['/assets/roof_tarps.jpg'],
      estimatedCost: '$1,950'
    }
  ]);

  const [activeClaimId, setActiveClaimId] = useState<string>('CLM-9042-W');
  const [filterType, setFilterType] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Ticket creation form states
  const [isCreatingTicket, setIsCreatingTicket] = useState<boolean>(false);
  const [newAddress, setNewAddress] = useState<string>('');
  const [newDamageType, setNewDamageType] = useState<'Water' | 'Fire' | 'Wind' | 'Mold'>('Water');
  const [newEstimatedCost, setNewEstimatedCost] = useState<string>('$2,500');

  // Photo uploading simulation state
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Filter & Search computation
  const filteredClaims = claims.filter((claim) => {
    const matchesFilter = filterType === 'All' || claim.damageType === filterType;
    const matchesSearch = claim.propertyAddress.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          claim.assignedPro.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const activeClaim = claims.find((c) => c.id === activeClaimId) || claims[0];

  // Submit new simulated ticket
  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddress.trim()) return;

    const newTicket: ClaimTicket = {
      id: `CLM-${Math.floor(1000 + Math.random() * 9000)}-${newDamageType[0]}`,
      propertyAddress: newAddress,
      damageType: newDamageType,
      reportedDate: new Date().toISOString().split('T')[0],
      status: 'Intake',
      assignedPro: 'Auto-Matching Verified Vendor...',
      proRating: 'N/A',
      proPhone: 'Matching algorithm running...',
      photosUploaded: uploadedPhotos,
      estimatedCost: newEstimatedCost
    };

    setClaims([newTicket, ...claims]);
    setActiveClaimId(newTicket.id);
    setIsCreatingTicket(false);
    setNewAddress('');
    setUploadedPhotos([]);

    // Simulate automatic B2B matching engine lifecycle steps in 3 seconds!
    setTimeout(() => {
      setClaims((currentClaims) => 
        currentClaims.map((c) => 
          c.id === newTicket.id 
            ? { 
                ...c, 
                status: 'Vetted Match', 
                assignedPro: 'Lone Star Remediation', 
                proRating: '4.8/5', 
                proPhone: '(281) 555-0193' 
              } 
            : c
        )
      );
    }, 4000);
  };

  // Mock Photo drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setUploadedPhotos([...uploadedPhotos, 'simulated_upload_file.jpg']);
  };

  const triggerManualUpload = () => {
    setUploadedPhotos([...uploadedPhotos, 'manual_upload_file.jpg']);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Simulation Header Warning */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white text-xs px-4 py-2 flex flex-col sm:flex-row justify-between items-center space-y-1 sm:space-y-0 shadow-inner z-50">
        <div className="flex items-center space-x-2">
          <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          <span className="font-bold">MyPro Market Portal Cloned Session</span>
          <span className="text-slate-200 font-medium">| Running natively under myproproducts.com/market</span>
        </div>
        <button 
          onClick={onBackToCorporate}
          className="flex items-center space-x-1.5 text-[11px] font-bold bg-white/20 hover:bg-white/30 text-white px-2.5 py-1 rounded transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Exit Portal Simulator</span>
        </button>
      </div>

      {/* Internal Portal Navbar */}
      <header className="bg-slate-950 border-b border-slate-800 py-3 px-6 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
            M
          </div>
          <div>
            <span className="font-bold text-base text-white">MyPro Market</span>
            <span className="text-[10px] text-blue-400 block font-bold tracking-widest uppercase">DISPATCH ENGINE</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-xs text-right hidden sm:block">
            <span className="block text-slate-300 font-bold">Johnathan Fletcher</span>
            <span className="text-[10px] text-green-400 font-semibold uppercase">Authorized Property Manager</span>
          </div>
          <div className="h-8 w-8 rounded-full bg-blue-600/30 border border-blue-500 flex items-center justify-center text-xs font-bold text-blue-400">
            JF
          </div>
        </div>
      </header>

      {/* Main Portal Body */}
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        
        {/* Left Hand: Tickets Queue Panel */}
        <aside className="lg:col-span-4 bg-slate-950/60 border-r border-slate-800 flex flex-col min-h-[400px] lg:h-[calc(100vh-100px)]">
          
          {/* Section Toolbar */}
          <div className="p-4 border-b border-slate-800 space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-300 flex items-center space-x-1.5">
                <Layers className="h-4.5 w-4.5 text-blue-500" />
                <span>Active Claims Queue</span>
              </h3>
              <button 
                onClick={() => setIsCreatingTicket(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center space-x-1 shadow transition-all"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>New Ticket</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                <Search className="h-3.5 w-3.5" />
              </span>
              <input
                type="text"
                placeholder="Search address, ID, contractor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-2 text-xs text-slate-300 placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Filter Pill Tabs */}
            <div className="flex gap-1.5 overflow-x-auto pb-1">
              {['All', 'Water', 'Fire', 'Wind', 'Mold'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full border transition-all ${
                    filterType === type
                      ? 'bg-blue-600/20 border-blue-500 text-blue-400'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-300'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Ticket Cards Stream */}
          <div className="flex-grow overflow-y-auto p-4 space-y-3 max-h-[350px] lg:max-h-none">
            {filteredClaims.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-500">
                No tickets matching current filters.
              </div>
            ) : (
              filteredClaims.map((claim) => {
                const isActive = activeClaimId === claim.id;
                return (
                  <div
                    key={claim.id}
                    onClick={() => { setActiveClaimId(claim.id); setIsCreatingTicket(false); }}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isActive 
                        ? 'bg-slate-900 border-blue-500 shadow-lg shadow-blue-950/50' 
                        : 'bg-slate-950/40 border-slate-800 hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-mono font-bold text-slate-500">{claim.id}</span>
                      <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${
                        claim.status === 'Completed'
                          ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                          : claim.status === 'Under Audit'
                          ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                          : claim.status === 'In Progress'
                          ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {claim.status}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-200 mt-2 line-clamp-1">{claim.propertyAddress}</h4>
                    
                    <div className="mt-3 flex justify-between items-center text-[11px] text-slate-400">
                      <div className="flex items-center space-x-1.5">
                        <span className={`h-2 w-2 rounded-full ${
                          claim.damageType === 'Water' ? 'bg-blue-500' : claim.damageType === 'Fire' ? 'bg-orange-500' : 'bg-teal-500'
                        }`} />
                        <span>{claim.damageType} Mitigation</span>
                      </div>
                      <span className="font-bold text-slate-300">{claim.estimatedCost}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </aside>

        {/* Right Hand / Main stage details panel */}
        <main className="lg:col-span-8 bg-slate-900 p-6 overflow-y-auto flex flex-col justify-between lg:h-[calc(100vh-100px)]">
          <AnimatePresence mode="wait">
            
            {/* Create Ticket Dashboard Wizard */}
            {isCreatingTicket ? (
              <motion.form
                key="create-form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                onSubmit={handleCreateTicket}
                className="space-y-6 bg-slate-950/50 rounded-2xl border border-slate-800 p-6 max-w-xl mx-auto w-full my-auto"
              >
                <div>
                  <h3 className="text-base font-bold text-white">Create New Claim & Dispatch Ticket</h3>
                  <p className="text-xs text-slate-400 mt-1">Initiate instant automated contractor compliance checking.</p>
                </div>

                <div className="space-y-4">
                  {/* Incident Property Location */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Property Address
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500 pointer-events-none">
                        <MapPin className="h-4 w-4" />
                      </span>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 520 Alabama St, Houston, TX 77006"
                        value={newAddress}
                        onChange={(e) => setNewAddress(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Damage Category */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                        Damage Category
                      </label>
                      <select
                        value={newDamageType}
                        onChange={(e) => setNewDamageType(e.target.value as any)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-slate-100 focus:outline-none"
                      >
                        <option value="Water">Water Damage</option>
                        <option value="Fire">Fire Remediation</option>
                        <option value="Wind">Wind/Harp Damage</option>
                        <option value="Mold">Mold Remediation</option>
                      </select>
                    </div>

                    {/* Cost limit estimate */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                        Approval Limit (Estimated)
                      </label>
                      <select
                        value={newEstimatedCost}
                        onChange={(e) => setNewEstimatedCost(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-slate-100 focus:outline-none"
                      >
                        <option value="$1,500">$1,500 Cap</option>
                        <option value="$3,500">$3,500 Cap</option>
                        <option value="$5,000">$5,000 Cap</option>
                        <option value="$10,000+">Enterprise Audit Needed</option>
                      </select>
                    </div>
                  </div>

                  {/* Photo Attachment Drag & Drop Mock */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Loss Damage Photos (Drag and Drop Support)
                    </label>
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                        isDragging 
                          ? 'border-blue-500 bg-blue-600/10' 
                          : 'border-slate-800 bg-slate-900/50 hover:bg-slate-900'
                      }`}
                    >
                      <UploadCloud className="h-8 w-8 text-slate-500 mx-auto mb-2" />
                      <div className="text-xs font-bold text-slate-300">
                        Drag & Drop local photo evidence here
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1">
                        Supports JPG, PNG formats up to 10MB
                      </p>
                      <button
                        type="button"
                        onClick={triggerManualUpload}
                        className="mt-3 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded text-[11px] font-semibold"
                      >
                        Manually Select File
                      </button>

                      {uploadedPhotos.length > 0 && (
                        <div className="mt-4 border-t border-slate-800 pt-3 text-left">
                          <div className="text-[10px] font-bold text-slate-400 uppercase">Attached files ({uploadedPhotos.length}):</div>
                          <div className="mt-1.5 space-y-1.5">
                            {uploadedPhotos.map((file, index) => (
                              <div key={index} className="flex items-center space-x-2 text-[11px] text-green-400">
                                <FileText className="h-3.5 w-3.5" />
                                <span>{file} (Simulated Uploaded)</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                </div>

                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsCreatingTicket(false)}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-lg text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow shadow-blue-900"
                  >
                    Launch Programmatic Dispatch
                  </button>
                </div>
              </motion.form>
            ) : (
              
              /* Claim Detail Screen */
              <motion.div
                key="detail-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                {/* Detail Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-5 space-y-4 md:space-y-0">
                  <div>
                    <div className="flex items-center space-x-2.5">
                      <span className="text-xs font-mono bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20 font-bold">
                        {activeClaim.id}
                      </span>
                      <span className="text-xs text-slate-400">Reported: {activeClaim.reportedDate}</span>
                    </div>
                    <h2 className="text-xl font-extrabold text-white mt-1.5">{activeClaim.propertyAddress}</h2>
                  </div>

                  <div className="flex space-x-2">
                    <div className="bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-right">
                      <span className="block text-[9px] text-slate-500 font-bold uppercase tracking-wider">Estimated Cost</span>
                      <span className="text-sm font-extrabold text-green-400">{activeClaim.estimatedCost}</span>
                    </div>
                  </div>
                </div>

                {/* Grid stats & workflow tracker */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  
                  {/* Left Column: Vetted contractor profile */}
                  <div className="md:col-span-6 bg-slate-950/40 border border-slate-800 rounded-2xl p-5 space-y-4">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center space-x-1.5">
                      <ShieldCheck className="h-4.5 w-4.5 text-green-500" />
                      <span>Vetted Contractor Status</span>
                    </h3>

                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3.5">
                      <div>
                        <span className="block text-[10px] text-slate-500 font-semibold">Assigned Vendor</span>
                        <span className="text-sm font-extrabold text-white">{activeClaim.assignedPro}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="block text-[10px] text-slate-500 font-semibold">Overall Rating</span>
                          <span className="font-bold text-yellow-400">{activeClaim.proRating}</span>
                        </div>
                        <div>
                          <span className="block text-[10px] text-slate-500 font-semibold">Direct Dispatch Phone</span>
                          <span className="font-bold text-slate-300">{activeClaim.proPhone}</span>
                        </div>
                      </div>
                    </div>

                    {/* Real-time audit checks */}
                    <div className="space-y-2.5">
                      <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Verification Audits</h4>
                      
                      <div className="flex justify-between items-center text-xs p-2.5 bg-slate-900/50 rounded border border-slate-800">
                        <span className="text-slate-400 font-medium">State Licensing Status</span>
                        <span className="text-green-400 font-bold flex items-center space-x-1">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Active / Certified</span>
                        </span>
                      </div>

                      <div className="flex justify-between items-center text-xs p-2.5 bg-slate-900/50 rounded border border-slate-800">
                        <span className="text-slate-400 font-medium">GL Insurance Verification ($2M)</span>
                        <span className="text-green-400 font-bold flex items-center space-x-1">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Active / Insured</span>
                        </span>
                      </div>

                      <div className="flex justify-between items-center text-xs p-2.5 bg-slate-900/50 rounded border border-slate-800">
                        <span className="text-slate-400 font-medium">Employee Background Auditing</span>
                        <span className="text-green-400 font-bold flex items-center space-x-1">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>100% Passed</span>
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Right Column: Interactive Timeline milestones */}
                  <div className="md:col-span-6 bg-slate-950/40 border border-slate-800 rounded-2xl p-5 space-y-4">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center space-x-1.5">
                      <Activity className="h-4.5 w-4.5 text-blue-500" />
                      <span>Ecosystem Dispatch Timeline</span>
                    </h3>

                    {/* Step Timeline */}
                    <div className="space-y-4 relative pl-5 border-l border-slate-800">
                      
                      {/* Step 1 */}
                      <div className="relative">
                        <span className="absolute -left-7.5 top-0.5 h-5 w-5 rounded-full bg-green-500 flex items-center justify-center text-white text-[10px] font-bold border border-slate-900 shadow">
                          <Check className="h-3 w-3" />
                        </span>
                        <div>
                          <h4 className="text-xs font-bold text-white">1. Smart Loss Intake</h4>
                          <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">
                            Loss filed automatically via property software. Vetting triggers run.
                          </p>
                        </div>
                      </div>

                      {/* Step 2 */}
                      <div className="relative">
                        <span className={`absolute -left-7.5 top-0.5 h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold border border-slate-900 shadow ${
                          activeClaim.status !== 'Intake' ? 'bg-green-500 text-white' : 'bg-blue-600 text-white animate-pulse'
                        }`}>
                          {activeClaim.status !== 'Intake' ? <Check className="h-3 w-3" /> : '2'}
                        </span>
                        <div>
                          <h4 className={`text-xs font-bold ${activeClaim.status === 'Intake' ? 'text-blue-400' : 'text-white'}`}>
                            2. Programmatic Dispatch matching
                          </h4>
                          <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">
                            Active vendor Lone Star Remediation accepted and approved scope criteria.
                          </p>
                        </div>
                      </div>

                      {/* Step 3 */}
                      <div className="relative">
                        <span className={`absolute -left-7.5 top-0.5 h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold border border-slate-900 shadow ${
                          ['En Route', 'In Progress', 'Under Audit', 'Completed'].includes(activeClaim.status) ? 'bg-green-500 text-white' : 'bg-slate-700 text-slate-400'
                        }`}>
                          {['En Route', 'In Progress', 'Under Audit', 'Completed'].includes(activeClaim.status) ? <Check className="h-3 w-3" /> : '3'}
                        </span>
                        <div>
                          <h4 className="text-xs font-bold text-white">3. Active Field Tracking</h4>
                          <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">
                            Service pros log GPS breadcrumbs, structural dry logs, and milestone photos directly.
                          </p>
                        </div>
                      </div>

                      {/* Step 4 */}
                      <div className="relative">
                        <span className={`absolute -left-7.5 top-0.5 h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold border border-slate-900 shadow ${
                          activeClaim.status === 'Completed' ? 'bg-green-500 text-white' : activeClaim.status === 'Under Audit' ? 'bg-blue-600 text-white animate-pulse' : 'bg-slate-700 text-slate-400'
                        }`}>
                          {activeClaim.status === 'Completed' ? <Check className="h-3 w-3" /> : '4'}
                        </span>
                        <div>
                          <h4 className="text-xs font-bold text-white">4. Carrier Automated Audit</h4>
                          <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">
                            Loss folder synchronized instantly with carrier platform, validating claims standards.
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>

                {/* Bottom photo evidence logs */}
                <div className="p-5 bg-slate-950/30 border border-slate-800 rounded-2xl">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Loss Document & Photo Evidence Feed</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="h-28 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-center items-center text-center p-3 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-blue-600/20 transition-colors pointer-events-none" />
                      <FileText className="h-7 w-7 text-blue-400 mb-1.5" />
                      <span className="text-[10px] font-semibold text-slate-300">DryLog_Houston.pdf</span>
                      <span className="text-[9px] text-slate-500 mt-0.5">1.2 MB</span>
                    </div>

                    <div className="h-28 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-center items-center text-center p-3 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-blue-600/20 transition-colors pointer-events-none" />
                      <FileText className="h-7 w-7 text-blue-400 mb-1.5" />
                      <span className="text-[10px] font-semibold text-slate-300">MoistureMap.xml</span>
                      <span className="text-[9px] text-slate-500 mt-0.5">340 KB</span>
                    </div>

                    <div className="h-28 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-center items-center text-center p-3 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-blue-600/20 transition-colors pointer-events-none" />
                      <UploadCloud className="h-7 w-7 text-blue-400 mb-1.5" />
                      <span className="text-[10px] font-semibold text-slate-300">Moisture_Photo_1.jpg</span>
                      <span className="text-[9px] text-slate-500 mt-0.5">3.5 MB</span>
                    </div>

                    <button 
                      onClick={() => setIsCreatingTicket(true)}
                      className="h-28 rounded-xl border-2 border-dashed border-slate-800 hover:border-blue-500/50 hover:bg-slate-900/50 transition-all flex flex-col justify-center items-center text-center p-3 focus:outline-none"
                    >
                      <Plus className="h-6 w-6 text-slate-500" />
                      <span className="text-[10px] font-bold text-slate-400 mt-1">Upload New Evidence</span>
                    </button>
                  </div>
                </div>

              </motion.div>
            )}

          </AnimatePresence>
        </main>

      </div>
    </div>
  );
}
