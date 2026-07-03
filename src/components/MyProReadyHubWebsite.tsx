import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, ShieldAlert, CheckSquare, Square, Video, Plus, Trash2, 
  FileText, Lock, AlertTriangle, Search, Camera, Sparkles, Download, 
  UploadCloud, Check, ChevronRight, RefreshCw, FileCheck, ShieldCheck,
  MapPin, AlertCircle, Heart, Key, Clock, Copy, FileCode
} from 'lucide-react';
import MyProReadyHubLogo from './MyProReadyHubLogo';

interface MyProReadyHubWebsiteProps {
  onBackToCorporate: () => void;
  onRequestDemo: (productId: string) => void;
}

// Interface for dynamic lists
interface Prescription {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  notes: string;
}

interface UploadedDocument {
  id: string;
  name: string;
  size: string;
  category: string;
  uploadedAt: string;
}

export default function MyProReadyHubWebsite({ onBackToCorporate, onRequestDemo }: MyProReadyHubWebsiteProps) {
  const [activeTab, setActiveTab] = useState<'checklist' | 'scanner' | 'cabinet' | 'alerts'>('checklist');
  const [selectedDisaster, setSelectedDisaster] = useState<'hurricane' | 'wildfire' | 'flood' | 'freeze'>('hurricane');
  
  // Logo Studio State
  const [logoAssetMode, setLogoAssetMode] = useState<'icon' | 'full'>('full');
  const [copiedLogo, setCopiedLogo] = useState(false);
  const [logoBgType, setLogoBgType] = useState<'transparent' | 'dark' | 'light'>('transparent');
  
  // 1. Checklist State
  const [checklists, setChecklists] = useState({
    hurricane: [
      { id: 'h1', text: 'Secure window shutters and reinforce doors', category: 'Home Securing', checked: false },
      { id: 'h2', text: 'Gather 1 gallon of water per person per day (3-day supply)', category: 'Supplies', checked: true },
      { id: 'h3', text: 'Charge all power banks and emergency lighting', category: 'Energy', checked: false },
      { id: 'h4', text: 'Clear lawn furniture, toys, and light objects inside', category: 'Home Securing', checked: false },
      { id: 'h5', text: 'Confirm evacuation route maps are printed offline', category: 'Safety', checked: false },
      { id: 'h6', text: 'Secure vital medicine and standard first-aid kit', category: 'Supplies', checked: true },
    ],
    wildfire: [
      { id: 'w1', text: 'Clear dry brush and flammable leaves 30ft from home', category: 'Defensible Space', checked: false },
      { id: 'w2', text: 'Prepare family N95 respirators / air filtration masks', category: 'Safety', checked: false },
      { id: 'w3', text: 'Pack emergency go-bags with essentials and deeds', category: 'Go-Bag', checked: true },
      { id: 'w4', text: 'Set vehicle ventilation to recirculate air only', category: 'Safety', checked: false },
      { id: 'w5', text: 'Shut off gas valves and close home ventilation points', category: 'Home Securing', checked: false },
    ],
    flood: [
      { id: 'f1', text: 'Move valuable electronics and carpet off floor levels', category: 'Home Securing', checked: false },
      { id: 'f2', text: 'Set up sandbags at basement or ground-level thresholds', category: 'Waterproofing', checked: false },
      { id: 'f3', text: 'Unplug major electrical items to avoid short circuits', category: 'Home Securing', checked: true },
      { id: 'f4', text: 'Store fresh emergency drinking water in sealed jugs', category: 'Supplies', checked: false },
      { id: 'f5', text: 'Identify nearest elevated public ground/shelter', category: 'Safety', checked: false },
    ],
    freeze: [
      { id: 'z1', text: 'Wrap outdoor faucets and expose under-sink pipes', category: 'Pipe Safety', checked: true },
      { id: 'z2', text: 'Drip warm water through interior faucets continuously', category: 'Pipe Safety', checked: false },
      { id: 'z3', text: 'Gather wool blankets, heavy winter gear, and warm caps', category: 'Supplies', checked: false },
      { id: 'z4', text: 'Confirm alternative indoor safe heating fuel is filled', category: 'Energy', checked: false },
      { id: 'z5', text: 'Fill vehicle gas tank fully to prevent fuel line freezes', category: 'Safety', checked: false },
    ]
  });

  const getLogoSvgContent = () => {
    const bgStyle = {
      transparent: '',
      dark: ' style="background:#020617; padding: 20px; border-radius: 8px;"',
      light: ' style="background:#ffffff; padding: 20px; border-radius: 8px;"'
    }[logoBgType];

    if (logoAssetMode === 'icon') {
      return `<svg viewBox="0 0 140 120" fill="none" xmlns="http://www.w3.org/2000/svg"${bgStyle}>
  <!-- Protective Shield Outline - Color Hex #6AD5F9 -->
  <path d="M 12 28 C 42 10, 98 10, 128 28 C 128 72, 108 104, 70 118 C 32 104, 12 72, 12 28 Z" stroke="#6AD5F9" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" />
  
  <!-- Brand Mark Group Scaled to Fit Perfectly inside Shield -->
  <g transform="translate(26.5, 26) scale(0.70)" stroke-linecap="round" stroke-linejoin="round">
    <!-- Chimney - Color Hex #6AD5F9 -->
    <rect x="24" y="14" width="11" height="30" fill="#6AD5F9" />
    <!-- Inner Protected Home Roof - Color Hex #6AD5F9 -->
    <path d="M 2 58 L 62 12 L 92 38" stroke="#6AD5F9" stroke-width="10" />
    <!-- Glowing Window/Beacon - Divided into four equal squares - Color Hex #6AD5F9 -->
    <rect x="51" y="44" width="10" height="10" fill="#6AD5F9" rx="1.5" />
    <rect x="63" y="44" width="10" height="10" fill="#6AD5F9" rx="1.5" />
    <rect x="51" y="56" width="10" height="10" fill="#6AD5F9" rx="1.5" />
    <rect x="63" y="56" width="10" height="10" fill="#6AD5F9" rx="1.5" />
    <!-- Ready Green Checkmark - Color Hex #98CC44 -->
    <path d="M 21 78 L 51 104 L 111 58" stroke="#98CC44" stroke-width="11" />
  </g>
</svg>`;
    } else {
      const textFill1 = logoBgType === 'light' ? '#0f172a' : '#6AD5F9';
      const textFill2 = '#98CC44';
      const textFill3 = logoBgType === 'light' ? '#1e293b' : '#6AD5F9';
      const subTextFill = logoBgType === 'light' ? '#475569' : '#94a3b8';

      return `<svg viewBox="0 0 440 120" fill="none" xmlns="http://www.w3.org/2000/svg"${bgStyle}>
  <g transform="translate(10, 0)">
    <!-- Protective Shield Outline - Color Hex #6AD5F9 -->
    <path d="M 12 28 C 42 10, 98 10, 128 28 C 128 72, 108 104, 70 118 C 32 104, 12 72, 12 28 Z" stroke="#6AD5F9" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" />
    
    <!-- Brand Mark Group Scaled to Fit Perfectly inside Shield -->
    <g transform="translate(26.5, 26) scale(0.70)" stroke-linecap="round" stroke-linejoin="round">
      <!-- Chimney - Color Hex #6AD5F9 -->
      <rect x="24" y="14" width="11" height="30" fill="#6AD5F9" />
      <!-- Inner Protected Home Roof - Color Hex #6AD5F9 -->
      <path d="M 2 58 L 62 12 L 92 38" stroke="#6AD5F9" stroke-width="10" />
      <!-- Glowing Window/Beacon - Divided into four equal squares - Color Hex #6AD5F9 -->
      <rect x="51" y="44" width="10" height="10" fill="#6AD5F9" rx="1.5" />
      <rect x="63" y="44" width="10" height="10" fill="#6AD5F9" rx="1.5" />
      <rect x="51" y="56" width="10" height="10" fill="#6AD5F9" rx="1.5" />
      <rect x="63" y="56" width="10" height="10" fill="#6AD5F9" rx="1.5" />
      <!-- Ready Green Checkmark - Color Hex #98CC44 -->
      <path d="M 21 78 L 51 104 L 111 58" stroke="#98CC44" stroke-width="11" />
    </g>
  </g>
  <text x="160" y="62" fill="${textFill1}" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="900" letter-spacing="-1">My</text>
  <text x="210" y="62" fill="${textFill2}" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="900" letter-spacing="-1">Pro</text>
  <text x="270" y="62" fill="${textFill3}" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="900" letter-spacing="-1">Ready Hub</text>
  <text x="160" y="85" fill="${subTextFill}" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="bold" letter-spacing="1">BY MYPRO PRODUCTS • SECURE</text>
</svg>`;
    }
  };

  const handleCopyLogoCode = () => {
    const code = getLogoSvgContent();
    navigator.clipboard.writeText(code);
    setCopiedLogo(true);
    setTimeout(() => setCopiedLogo(false), 2000);
  };

  const handleDownloadLogoSvg = () => {
    const code = getLogoSvgContent();
    const blob = new Blob([code], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mypro-readyhub-logo-${logoAssetMode}-${logoBgType}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const toggleChecklistItem = (disaster: 'hurricane' | 'wildfire' | 'flood' | 'freeze', id: string) => {
    setChecklists(prev => ({
      ...prev,
      [disaster]: prev[disaster].map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    }));
  };

  const currentChecklist = checklists[selectedDisaster];
  const checkedCount = currentChecklist.filter(c => c.checked).length;
  const progressPercent = Math.round((checkedCount / currentChecklist.length) * 100);

  // 2. AI Video Scanner State
  const [selectedRoom, setSelectedRoom] = useState<'living' | 'kitchen' | 'bedroom' | 'office'>('living');
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'completed'>('idle');
  const [scanProgress, setScanProgress] = useState(0);
  const [scannedItems, setScannedItems] = useState<{ name: string; category: string; value: number; confidence: number }[]>([]);
  const [activeScanText, setActiveScanText] = useState('Initializing AI Lens...');

  const roomAssets = {
    living: [
      { name: 'Samsung 65" QLED Smart TV', category: 'Electronics', value: 1200, confidence: 99 },
      { name: 'Leather L-Shape Sectional Sofa', category: 'Furniture', value: 2400, confidence: 96 },
      { name: 'Sonos Arc Premium Soundbar', category: 'Electronics', value: 899, confidence: 94 },
      { name: 'Oak Wood Console Table & Mirror', category: 'Furniture', value: 450, confidence: 88 },
      { name: 'Dyson Purifier Hot+Cool Fan', category: 'Appliances', value: 650, confidence: 95 }
    ],
    kitchen: [
      { name: 'KitchenAid Double Door Refrigerator', category: 'Appliances', value: 2800, confidence: 98 },
      { name: 'Breville Barista Espresso Machine', category: 'Appliances', value: 750, confidence: 97 },
      { name: 'Premium Copper Cookware 12pc Set', category: 'Housewares', value: 600, confidence: 91 },
      { name: 'Vitamilk Pro High-Speed Blender', category: 'Appliances', value: 350, confidence: 89 },
      { name: 'Marble Island Dining Table + 4 Chairs', category: 'Furniture', value: 1800, confidence: 93 }
    ],
    bedroom: [
      { name: 'Tempur-Pedic King Size Mattress Set', category: 'Furniture', value: 3500, confidence: 95 },
      { name: 'Apple iPad Pro 12.9" (256GB)', category: 'Electronics', value: 1099, confidence: 99 },
      { name: 'Solid Walnut Wood 6-Drawer Dresser', category: 'Furniture', value: 1200, confidence: 91 },
      { name: 'Bose QuietComfort Headphones', category: 'Electronics', value: 349, confidence: 97 },
      { name: 'Hand-Woven Wool Accent Rug', category: 'Home Decor', value: 550, confidence: 85 }
    ],
    office: [
      { name: 'Apple MacBook Pro 16" M3 Max', category: 'Electronics', value: 3499, confidence: 99 },
      { name: 'Herman Miller Aeron Ergonomic Chair', category: 'Furniture', value: 1450, confidence: 98 },
      { name: 'Dell UltraSharp 38" Curved Monitor', category: 'Electronics', value: 1100, confidence: 96 },
      { name: 'Fully Jarvis Bamboo Standing Desk', category: 'Furniture', value: 850, confidence: 93 },
      { name: 'Sony Alpha 7 IV Mirrorless Camera', category: 'Electronics', value: 2500, confidence: 94 }
    ]
  };

  const handleStartScan = () => {
    setScanState('scanning');
    setScanProgress(0);
    setScannedItems([]);
    
    const scanPhases = [
      { progress: 10, text: 'Detecting space boundaries & room lighting...' },
      { progress: 30, text: 'Mapping furniture depths & structural items...' },
      { progress: 55, text: 'Extracting secondary appliance serial footprints...' },
      { progress: 80, text: 'Recognizing high-value digital devices & serials...' },
      { progress: 100, text: 'Compiling structured insurance-ready claim list...' }
    ];

    let phaseIdx = 0;
    const interval = setInterval(() => {
      setScanProgress(p => {
        const nextProgress = p + 2;
        if (nextProgress >= 100) {
          clearInterval(interval);
          setScanState('completed');
          setScannedItems(roomAssets[selectedRoom]);
          return 100;
        }
        
        const phase = scanPhases[phaseIdx];
        if (phase && nextProgress >= phase.progress) {
          setActiveScanText(phase.text);
          phaseIdx++;
        }
        return nextProgress;
      });
    }, 80);
  };

  // 3. Document & Prescription Cabinet State
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    { id: 'p1', name: 'Albuterol Sulfate', dosage: '90 mcg/actuation', frequency: '2 puffs every 4 hours as needed', notes: 'Keep in dry cabinet, rescue inhaler for asthma' },
    { id: 'p2', name: 'Lisinopril', dosage: '10 mg', frequency: '1 tablet daily', notes: 'For high blood pressure, take with water in morning' }
  ]);
  const [documents, setDocuments] = useState<UploadedDocument[]>([
    { id: 'd1', name: 'Homeowners_Insurance_Policy.pdf', size: '2.4 MB', category: 'Insurance', uploadedAt: '2026-04-12' },
    { id: 'd2', name: 'Property_Title_Deed_Signed.pdf', size: '5.8 MB', category: 'Legal', uploadedAt: '2026-05-01' }
  ]);

  // Form Inputs
  const [newRxName, setNewRxName] = useState('');
  const [newRxDosage, setNewRxDosage] = useState('');
  const [newRxFreq, setNewRxFreq] = useState('');
  const [newRxNotes, setNewRxNotes] = useState('');
  
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleAddRx = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRxName) return;

    const newRx: Prescription = {
      id: 'p-' + Date.now(),
      name: newRxName,
      dosage: newRxDosage || 'As directed',
      frequency: newRxFreq || 'As needed',
      notes: newRxNotes || 'No notes'
    };

    setPrescriptions([...prescriptions, newRx]);
    setNewRxName('');
    setNewRxDosage('');
    setNewRxFreq('');
    setNewRxNotes('');
  };

  const handleDeleteRx = (id: string) => {
    setPrescriptions(prescriptions.filter(p => p.id !== id));
  };

  const handleFileUploadSimulate = (fileName: string, category: string) => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(p => {
        if (p === null) return 0;
        if (p >= 100) {
          clearInterval(interval);
          const newDoc: UploadedDocument = {
            id: 'd-' + Date.now(),
            name: fileName,
            size: (Math.random() * 4 + 1).toFixed(1) + ' MB',
            category: category,
            uploadedAt: new Date().toISOString().split('T')[0]
          };
          setDocuments(prev => [...prev, newDoc]);
          setTimeout(() => setUploadProgress(null), 1000);
          return 100;
        }
        return p + 10;
      });
    }, 150);
  };

  const handleDeleteDoc = (id: string) => {
    setDocuments(documents.filter(d => d.id !== id));
  };

  // 4. Zip Warning Alerts State
  const [zipInput, setZipInput] = useState('77001');
  const [activeAlert, setActiveAlert] = useState<{
    status: 'severe' | 'moderate' | 'clear';
    title: string;
    description: string;
    evacRoute: string;
    instructions: string[];
    shelters: string[];
  }>({
    status: 'severe',
    title: 'Extreme Coastal Storm Surge Warning',
    description: 'Life-threatening coastal surge flooding is projected within the next 24 hours. Category 3 storm intensity expected at landfall.',
    evacRoute: 'Interstate 45 Northbound is designated as the primary evacuation corridor. Contralane routing active.',
    instructions: [
      'Elevate essential appliances and wrap main sewer traps.',
      'Charge cellphones and backup batteries to maximum immediately.',
      'Relocate inland if local authorities issue mandatory orders.'
    ],
    shelters: [
      'Houston GRB Convention Center (Capacity: 10,000)',
      'Reliant Park Arena Hall C (Capacity: 6,500)'
    ]
  });

  const handleZipSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanZip = zipInput.trim();
    if (!cleanZip) return;

    if (cleanZip.startsWith('33') || cleanZip === '33101' || cleanZip === '33139') {
      setActiveAlert({
        status: 'severe',
        title: 'Active Hurricane Evacuation Directive (Zone A/B)',
        description: 'Major Hurricane threat confirmed. Winds in excess of 120 mph and massive tidal action expected in Miami coastal bays.',
        evacRoute: 'Florida Turnpike Northbound. Lanes converted to one-way evacuation flow starting mile marker 0.',
        instructions: [
          'Board up all glass surfaces or activate electronic storm shutters.',
          'Fill car gas tanks fully and load non-perishable go-bags.',
          'Mandatory evacuation is active for coastal and island sectors.'
        ],
        shelters: [
          'Miami-Dade Fair & Expo Center (Pet Friendly)',
          'FUI Arena Complex Shelter East'
        ]
      });
    } else if (cleanZip.startsWith('90') || cleanZip === '90210' || cleanZip === '95060') {
      setActiveAlert({
        status: 'moderate',
        title: 'High-Velocity Dry Wind & Red Flag Fire Danger',
        description: 'Humidity below 12% combined with 45mph Santa Ana wind gusts has prompted red flag wildfire conditions.',
        evacRoute: 'Pacific Coast Highway North/South remains open. Canyon access roads may be restricted.',
        instructions: [
          'Maintain 30-foot defensible clear zones around shingles.',
          'Leave vehicles backed into driveways with keys in ignition.',
          'Report any active smoke trails immediately to emergency services.'
        ],
        shelters: [
          'Santa Monica Civic Auditorium',
          'West LA Community Youth Center'
        ]
      });
    } else if (cleanZip === '77001' || cleanZip.startsWith('77')) {
      setActiveAlert({
        status: 'severe',
        title: 'Extreme Coastal Storm Surge Warning',
        description: 'Life-threatening coastal surge flooding is projected within the next 24 hours. Category 3 storm intensity expected at landfall.',
        evacRoute: 'Interstate 45 Northbound is designated as the primary evacuation corridor. Contralane routing active.',
        instructions: [
          'Elevate essential appliances and wrap main sewer traps.',
          'Charge cellphones and backup batteries to maximum immediately.',
          'Relocate inland if local authorities issue mandatory orders.'
        ],
        shelters: [
          'Houston GRB Convention Center (Capacity: 10,000)',
          'Reliant Park Arena Hall C (Capacity: 6,500)'
        ]
      });
    } else {
      setActiveAlert({
        status: 'clear',
        title: 'No Active Extreme Weather Threats',
        description: 'Your location has no active major disaster warnings. General preparedness protocols remain recommended.',
        evacRoute: 'Normal traffic routes active. Keep an emergency map in your vehicle glove compartment.',
        instructions: [
          'Check expiration dates on bottled emergency water annually.',
          'Test home smoke and carbon monoxide detectors monthly.',
          'Update your AI room video scans once every quarter.'
        ],
        shelters: []
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-cyan-500/20 selection:text-cyan-400">
      
      {/* 1. standalone Banner notifying that it is part of MyPro Products umbrella */}
      <div className="bg-slate-900 text-slate-300 text-xs px-4 py-2.5 flex flex-col sm:flex-row justify-between items-center space-y-1.5 sm:space-y-0 shadow-sm border-b border-slate-800 relative z-50">
        <div className="flex items-center space-x-3">
          <span className="font-medium text-slate-200">
            MyPro Ready Hub ensures communities stay safe, prepared, and connected.
          </span>
          <span className="hidden sm:inline text-slate-700">|</span>
          <a href="#alerts" className="font-semibold text-cyan-400 hover:text-cyan-300 underline flex items-center space-x-1">
            <span>View Active Disaster Alerts &rarr;</span>
          </a>
        </div>
        <button 
          onClick={onBackToCorporate}
          className="flex items-center space-x-1 font-bold bg-[#98C44E] hover:bg-[#85b03f] text-white px-3 py-1 rounded transition-colors text-[11px] cursor-pointer"
        >
          <ArrowLeft className="h-3 w-3" />
          <span>Back to MyPro Products Suite</span>
        </button>
      </div>

      {/* 2. Header Navigation */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <MyProReadyHubLogo size="md" />
            <span className="text-[10px] font-bold text-cyan-400 px-1.5 py-0.5 bg-cyan-950/50 border border-cyan-800/60 rounded select-none">LIVE APP</span>
          </div>

          {/* Action */}
          <button 
            onClick={() => onRequestDemo('readyhub')}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-slate-950 font-bold rounded-lg text-sm transition-all hover:shadow-lg hover:shadow-cyan-500/20 active:scale-95 cursor-pointer"
          >
            Enterprise Demo
          </button>
        </div>
      </header>

      {/* 2. Brand Visual Hero Slogan */}
      <section className="relative py-20 px-6 overflow-hidden border-b border-slate-900 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(106,213,249,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(152,196,78,0.06),transparent_50%)]" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-lime-500/5 rounded-full blur-3xl" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full mb-6">
            <Sparkles className="h-4 w-4 text-lime-400" />
            <span className="text-xs font-semibold text-slate-300">
              Introducing MyPro Ready Hub &mdash; Premium Citizen Safety App
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Protect Your Assets. <br />
            <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-lime-400 bg-clip-text text-transparent">
              Prepare for the Unexpected.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 mt-6 max-w-2xl mx-auto leading-relaxed">
            A specialized full-featured platform featuring customized crisis checklists, localized Zip warning systems, AI video content cataloging, and highly secure digital cabinets for vital documents and prescriptions.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-12 pt-8 border-t border-slate-900 text-left">
            <div className="p-4 bg-slate-900/50 border border-slate-800/80 rounded-xl">
              <div className="text-xs text-slate-500 font-semibold uppercase tracking-widest">Active Checklists</div>
              <div className="text-2xl font-bold text-cyan-400 mt-1">4 Major Hazards</div>
            </div>
            <div className="p-4 bg-slate-900/50 border border-slate-800/80 rounded-xl">
              <div className="text-xs text-slate-500 font-semibold uppercase tracking-widest">AI Video Audit</div>
              <div className="text-2xl font-bold text-lime-400 mt-1">98% Match Rate</div>
            </div>
            <div className="p-4 bg-slate-900/50 border border-slate-800/80 rounded-xl">
              <div className="text-xs text-slate-500 font-semibold uppercase tracking-widest">Encryption Level</div>
              <div className="text-2xl font-bold text-white mt-1">AES-256 Bit</div>
            </div>
            <div className="p-4 bg-slate-900/50 border border-slate-800/80 rounded-xl">
              <div className="text-xs text-slate-500 font-semibold uppercase tracking-widest">Zip Tracking</div>
              <div className="text-2xl font-bold text-cyan-400 mt-1">Real-Time Alerts</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Interactivity Console */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Navigation Sidebar Panel */}
          <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2 sticky top-28">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest px-3 py-1 mb-2">
              Ready Hub Features
            </div>
            
            <button
              onClick={() => setActiveTab('checklist')}
              className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl text-left font-semibold text-sm transition-all cursor-pointer ${
                activeTab === 'checklist'
                  ? 'bg-gradient-to-r from-cyan-950 to-slate-900 text-cyan-400 border-l-4 border-cyan-400'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <CheckSquare className="h-5 w-5" />
              <span>Interactive Disaster Checklist</span>
            </button>

            <button
              onClick={() => setActiveTab('scanner')}
              className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl text-left font-semibold text-sm transition-all cursor-pointer ${
                activeTab === 'scanner'
                  ? 'bg-gradient-to-r from-cyan-950 to-slate-900 text-cyan-400 border-l-4 border-cyan-400'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Video className="h-5 w-5" />
              <span>AI Room Content Scanner</span>
            </button>

            <button
              onClick={() => setActiveTab('cabinet')}
              className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl text-left font-semibold text-sm transition-all cursor-pointer ${
                activeTab === 'cabinet'
                  ? 'bg-gradient-to-r from-cyan-950 to-slate-900 text-cyan-400 border-l-4 border-cyan-400'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <FileText className="h-5 w-5" />
              <span>Medical & Doc Cabinet</span>
            </button>

            <button
              onClick={() => setActiveTab('alerts')}
              className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl text-left font-semibold text-sm transition-all cursor-pointer ${
                activeTab === 'alerts'
                  ? 'bg-gradient-to-r from-cyan-950 to-slate-900 text-cyan-400 border-l-4 border-cyan-400'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <AlertTriangle className="h-5 w-5" />
              <span>Zip Code Alert Center</span>
            </button>

            <div className="pt-6 border-t border-slate-800 mt-6 px-3">
              <div className="flex items-center space-x-2 text-[11px] text-slate-500 font-semibold mb-2">
                <Lock className="h-3.5 w-3.5 text-lime-400" />
                <span>LOCAL & SECURE STORAGE</span>
              </div>
              <p className="text-[10px] text-slate-600 leading-normal">
                All uploaded documents, prescription lists, and video scanned logs are encrypted on-device. No data leaves your secure zone.
              </p>
            </div>
          </div>

          {/* Interactive Feature Terminal */}
          <div className="lg:col-span-9 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden min-h-[550px] flex flex-col justify-between">
            
            <AnimatePresence mode="wait">
              {/* TAB 1: INTERACTIVE CHECKLISTS */}
              {activeTab === 'checklist' && (
                <motion.div
                  key="checklist"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="p-6 md:p-8 flex-grow"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-800 pb-4 mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                        <CheckSquare className="h-5 w-5 text-cyan-400" />
                        <span>Interactive Disaster Preparedness Checklists</span>
                      </h2>
                      <p className="text-xs text-slate-400 mt-1">
                        Select a disaster scenario below. Ensure your household is ready and check off completed guidelines.
                      </p>
                    </div>

                    {/* Progress Bar Circle/Pill */}
                    <div className="mt-4 md:mt-0 flex items-center space-x-3 bg-slate-950 px-3 py-2 rounded-lg border border-slate-800">
                      <div className="h-8 w-8 rounded-full border-2 border-slate-800 flex items-center justify-center font-bold text-xs text-lime-400">
                        {progressPercent}%
                      </div>
                      <div className="text-[11px] font-mono">
                        <div className="text-slate-400">Total Completion</div>
                        <div className="text-slate-500">{checkedCount} of {currentChecklist.length} tasks ready</div>
                      </div>
                    </div>
                  </div>

                  {/* Hazard Selector */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                    {(['hurricane', 'wildfire', 'flood', 'freeze'] as const).map(disaster => (
                      <button
                        key={disaster}
                        onClick={() => setSelectedDisaster(disaster)}
                        className={`py-2 px-3 rounded-lg border font-bold text-xs capitalize transition-all cursor-pointer text-center ${
                          selectedDisaster === disaster
                            ? 'bg-gradient-to-r from-cyan-950 to-cyan-900 text-cyan-400 border-cyan-500/50 shadow shadow-cyan-950'
                            : 'bg-slate-950 text-slate-400 border-slate-800/80 hover:bg-slate-800/50'
                        }`}
                      >
                        {disaster === 'freeze' ? 'Winter Freeze' : disaster}
                      </button>
                    ))}
                  </div>

                  {/* Checklist Table */}
                  <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden divide-y divide-slate-900">
                    {currentChecklist.map(item => (
                      <div 
                        key={item.id}
                        onClick={() => toggleChecklistItem(selectedDisaster, item.id)}
                        className={`flex items-center justify-between p-4 cursor-pointer hover:bg-slate-900/30 transition-all ${
                          item.checked ? 'bg-slate-900/10' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <button className="mt-0.5 text-cyan-400 hover:text-cyan-300">
                            {item.checked ? (
                              <CheckSquare className="h-5 w-5 text-lime-400" />
                            ) : (
                              <Square className="h-5 w-5 text-slate-700 hover:text-cyan-400" />
                            )}
                          </button>
                          <div>
                            <p className={`text-xs font-medium leading-relaxed ${item.checked ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
                              {item.text}
                            </p>
                            <span className="inline-block text-[9px] font-bold uppercase tracking-widest text-slate-500 mt-1">
                              {item.category}
                            </span>
                          </div>
                        </div>
                        
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                          item.checked 
                            ? 'bg-lime-950/40 text-lime-400 border-lime-900/50' 
                            : 'bg-slate-900 text-slate-400 border-slate-800'
                        }`}>
                          {item.checked ? 'Completed' : 'Pending'}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Progress Indicator Slider bar */}
                  <div className="mt-6 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="flex justify-between items-center text-xs font-semibold text-slate-400 mb-2">
                      <span>Total Hazard Readiness Track</span>
                      <span className="text-lime-400 font-mono">{progressPercent}% Ready</span>
                    </div>
                    <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-400 to-lime-400 transition-all duration-500" 
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: AI VIDEO CONTENT INVENTORY */}
              {activeTab === 'scanner' && (
                <motion.div
                  key="scanner"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="p-6 md:p-8 flex-grow"
                >
                  <div className="border-b border-slate-800 pb-4 mb-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                        <Video className="h-5 w-5 text-cyan-400" />
                        <span>AI Room Content Video Inventory Scanner</span>
                      </h2>
                      <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-lime-400 bg-lime-950/40 px-2 py-0.5 rounded border border-lime-900/50">
                        <Sparkles className="h-3 w-3" />
                        <span>AI MODEL: READY-VISION v2</span>
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Option to video each room and let AI catalog appliances, devices, and furniture with estimated values for rapid insurance recovery.
                    </p>
                  </div>

                  {/* Room Selection Tabs */}
                  <div className="grid grid-cols-4 gap-2 mb-6">
                    {(['living', 'kitchen', 'bedroom', 'office'] as const).map(room => (
                      <button
                        key={room}
                        onClick={() => {
                          setSelectedRoom(room);
                          setScanState('idle');
                        }}
                        className={`py-1.5 px-2 rounded-lg border font-bold text-xs capitalize transition-all cursor-pointer ${
                          selectedRoom === room
                            ? 'bg-slate-800 text-white border-slate-700'
                            : 'bg-slate-950 text-slate-400 border-slate-900/80 hover:bg-slate-800/20'
                        }`}
                      >
                        {room === 'living' ? 'Living Room' : room === 'kitchen' ? 'Kitchen' : room === 'bedroom' ? 'Master Bed' : 'Home Office'}
                      </button>
                    ))}
                  </div>

                  {/* Scanner Emulator Display */}
                  <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden p-6 relative">
                    {/* Background camera grid lines */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#6AD5F9_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

                    {scanState === 'idle' && (
                      <div className="py-12 flex flex-col items-center justify-center text-center">
                        <div className="h-16 w-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-4 text-cyan-400 relative">
                          <Camera className="h-7 w-7" />
                          <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-lime-500 border-2 border-slate-950 animate-ping" />
                          <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-lime-500 border-2 border-slate-950" />
                        </div>
                        <h4 className="text-sm font-bold text-white capitalize">Scan {selectedRoom === 'living' ? 'Living Room' : selectedRoom === 'kitchen' ? 'Kitchen' : selectedRoom === 'bedroom' ? 'Master Bed' : 'Home Office'} Contents</h4>
                        <p className="text-xs text-slate-500 mt-2 max-w-sm">
                          Simulate recording your room with a mobile camera. The Ready Hub AI will detect items and extract serial footprints for insurance proof.
                        </p>
                        <button
                          onClick={handleStartScan}
                          className="mt-6 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-slate-950 font-bold rounded-lg text-xs tracking-wide transition-all shadow-md shadow-cyan-950 flex items-center space-x-2 cursor-pointer"
                        >
                          <Camera className="h-4 w-4" />
                          <span>Record & AI Scan Walkthrough</span>
                        </button>
                      </div>
                    )}

                    {scanState === 'scanning' && (
                      <div className="py-8 flex flex-col items-center justify-center text-center">
                        {/* Recording circular scanning frame */}
                        <div className="relative h-28 w-28 rounded-full border-4 border-slate-800 flex items-center justify-center mb-6">
                          {/* Pulsing red record dot */}
                          <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center space-x-1.5 bg-slate-950/80 backdrop-blur px-2 py-0.5 rounded-full border border-slate-800">
                            <span className="h-1.5 w-1.5 bg-red-500 rounded-full animate-ping" />
                            <span className="text-[8px] font-mono font-bold text-red-500">REC</span>
                          </div>

                          {/* Spinners */}
                          <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400 animate-[spin_10s_linear_infinite]" />
                          <div className="absolute inset-2 rounded-full border border-lime-400 animate-[spin_5s_linear_infinite_reverse]" />
                          <Camera className="h-8 w-8 text-slate-400 animate-pulse" />
                        </div>

                        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-lg p-3 font-mono text-left">
                          <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                            <span>Processing Video Feed...</span>
                            <span className="text-cyan-400 font-bold">{scanProgress}%</span>
                          </div>
                          
                          {/* Scanning status slider bar */}
                          <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-cyan-400 to-lime-400" style={{ width: `${scanProgress}%` }} />
                          </div>

                          <div className="mt-3 flex items-center space-x-2 text-[10px] text-lime-400">
                            <RefreshCw className="h-3.5 w-3.5 animate-spin flex-shrink-0" />
                            <span className="truncate">{activeScanText}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {scanState === 'completed' && (
                      <div>
                        {/* Success banner */}
                        <div className="flex items-center justify-between bg-lime-950/30 border border-lime-900/50 rounded-xl p-4 mb-6">
                          <div className="flex items-center space-x-3">
                            <div className="h-8 w-8 rounded-full bg-lime-500 text-slate-950 flex items-center justify-center">
                              <Check className="h-5 w-5" />
                            </div>
                            <div>
                              <h5 className="text-xs font-bold text-white capitalize">{selectedRoom} Walkthrough Analyzed!</h5>
                              <p className="text-[11px] text-slate-400">Ready Hub successfully matched {scannedItems.length} items with digital serial footprints.</p>
                            </div>
                          </div>
                          
                          <button 
                            onClick={handleStartScan}
                            className="flex items-center space-x-1.5 text-[10px] font-bold text-cyan-400 hover:text-cyan-300 bg-slate-900 border border-slate-800 px-2.5 py-1.5 rounded"
                          >
                            <RefreshCw className="h-3 w-3" />
                            <span>Scan Again</span>
                          </button>
                        </div>

                        {/* Inventory Table List */}
                        <div className="border border-slate-900 rounded-lg overflow-hidden divide-y divide-slate-900 font-mono text-xs">
                          <div className="grid grid-cols-12 bg-slate-900 p-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                            <span className="col-span-6">Detected Asset / Model</span>
                            <span className="col-span-3 text-center">Category</span>
                            <span className="col-span-2 text-right">Value</span>
                            <span className="col-span-1 text-right">Conf.</span>
                          </div>

                          {scannedItems.map((item, idx) => (
                            <div key={idx} className="grid grid-cols-12 p-3 text-slate-300 hover:bg-slate-900/20 transition-all items-center">
                              <span className="col-span-6 text-white font-medium flex items-center space-x-1.5">
                                <span className="h-1.5 w-1.5 bg-cyan-400 rounded-full" />
                                <span className="truncate">{item.name}</span>
                              </span>
                              <span className="col-span-3 text-slate-400 text-center text-[10px]">{item.category}</span>
                              <span className="col-span-2 text-lime-400 text-right font-bold">${item.value}</span>
                              <span className="col-span-1 text-slate-500 text-right text-[10px]">{item.confidence}%</span>
                            </div>
                          ))}
                        </div>

                        {/* Export Panel Footer */}
                        <div className="mt-6 flex justify-between items-center bg-slate-900 border border-slate-800/80 rounded-xl p-4">
                          <div>
                            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">ESTIMATED CONTENTS VALUE</div>
                            <div className="text-xl font-bold text-white mt-0.5">
                              ${scannedItems.reduce((acc, curr) => acc + curr.value, 0).toLocaleString()} <span className="text-xs font-normal text-slate-400">Total Cover</span>
                            </div>
                          </div>

                          <button 
                            onClick={() => alert('PDF generation is simulated. In production, this compiles signed, geo-tagged, timestamped room lists for immediate insurance claim payouts.')}
                            className="px-4 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs font-bold text-slate-300 flex items-center space-x-2 transition-colors cursor-pointer"
                          >
                            <Download className="h-4 w-4 text-cyan-400" />
                            <span>Export Insurance PDF</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* TAB 3: DOCUMENT & PRESCRIPTION CABINET */}
              {activeTab === 'cabinet' && (
                <motion.div
                  key="cabinet"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="p-6 md:p-8 flex-grow"
                >
                  <div className="border-b border-slate-800 pb-4 mb-6">
                    <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-cyan-400" />
                      <span>Encrypted Document & Vital Prescription Cabinet</span>
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Keep lists of essential medical prescriptions and secure copies of homeowners deeds and policies, backed up and available offline.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Prescriptions Sub-panel */}
                    <div className="bg-slate-950 border border-slate-850 p-5 rounded-xl">
                      <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-4">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-2">
                          <Heart className="h-4.5 w-4.5 text-red-400" />
                          <span>Vital Prescriptions Cabinet</span>
                        </span>
                        <span className="text-[10px] bg-red-950/40 text-red-400 border border-red-900/50 px-2 py-0.5 rounded">
                          {prescriptions.length} Active Rx
                        </span>
                      </div>

                      {/* Rx Lists */}
                      <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1 mb-4">
                        {prescriptions.length === 0 ? (
                          <div className="text-center py-6 text-slate-600 text-xs">No vital medicines stored. Add yours below.</div>
                        ) : (
                          prescriptions.map(rx => (
                            <div key={rx.id} className="p-3 bg-slate-900/60 border border-slate-900 rounded-lg flex justify-between items-start text-xs">
                              <div className="space-y-0.5 max-w-[85%]">
                                <h6 className="font-bold text-white text-xs">{rx.name}</h6>
                                <p className="text-slate-400 text-[11px] font-medium">Dosage: <span className="text-slate-300">{rx.dosage}</span></p>
                                <p className="text-slate-400 text-[11px] font-medium">Frequency: <span className="text-slate-300">{rx.frequency}</span></p>
                                {rx.notes && <p className="text-[10px] text-slate-500 italic truncate mt-1">Note: {rx.notes}</p>}
                              </div>
                              <button 
                                onClick={() => handleDeleteRx(rx.id)}
                                className="text-slate-600 hover:text-red-400 transition-colors p-1"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          ))
                        )}
                      </div>

                      {/* Add Rx Form */}
                      <form onSubmit={handleAddRx} className="space-y-3 pt-3 border-t border-slate-900">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Add Vital Medicine</div>
                        <div className="grid grid-cols-2 gap-2">
                          <input 
                            type="text" 
                            placeholder="Medicine Name (e.g. Insulin)" 
                            value={newRxName} 
                            onChange={e => setNewRxName(e.target.value)}
                            className="bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                            required
                          />
                          <input 
                            type="text" 
                            placeholder="Dosage (e.g. 100 units)" 
                            value={newRxDosage} 
                            onChange={e => setNewRxDosage(e.target.value)}
                            className="bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <input 
                            type="text" 
                            placeholder="Frequency" 
                            value={newRxFreq} 
                            className="col-span-2 bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                            onChange={e => setNewRxFreq(e.target.value)}
                          />
                          <button 
                            type="submit"
                            className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-slate-950 text-xs font-bold rounded flex items-center justify-center space-x-1 cursor-pointer"
                          >
                            <Plus className="h-4 w-4" />
                            <span>Add</span>
                          </button>
                        </div>
                      </form>
                    </div>

                    {/* Documents Sub-panel */}
                    <div className="bg-slate-950 border border-slate-850 p-5 rounded-xl">
                      <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-4">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-2">
                          <FileCheck className="h-4.5 w-4.5 text-cyan-400" />
                          <span>Secure Vaulted Documents</span>
                        </span>
                        <span className="text-[10px] bg-cyan-950/40 text-cyan-400 border border-cyan-900/50 px-2 py-0.5 rounded">
                          {documents.length} Safe Files
                        </span>
                      </div>

                      {/* Documents List */}
                      <div className="space-y-3 max-h-[200px] overflow-y-auto pr-1 mb-4">
                        {documents.map(doc => (
                          <div key={doc.id} className="p-3 bg-slate-900/60 border border-slate-900 rounded-lg flex justify-between items-center text-xs">
                            <div className="flex items-center space-x-2.5 max-w-[80%]">
                              <FileText className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                              <div className="truncate">
                                <h6 className="font-bold text-white text-xs truncate">{doc.name}</h6>
                                <p className="text-slate-500 text-[10px] mt-0.5">{doc.size} &bull; {doc.category} &bull; Uploaded {doc.uploadedAt}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="p-1 text-slate-500 hover:text-slate-300">
                                <Lock className="h-3.5 w-3.5 text-lime-400" />
                              </span>
                              <button 
                                onClick={() => handleDeleteDoc(doc.id)}
                                className="text-slate-600 hover:text-red-400 transition-colors p-1"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Document Drag Drop Upload Box Emulator */}
                      <div 
                        onDragOver={e => { e.preventDefault(); setDragActive(true); }}
                        onDragLeave={() => setDragActive(false)}
                        onDrop={e => { e.preventDefault(); setDragActive(false); handleFileUploadSimulate('Uploaded_ID_Card.pdf', 'Identification'); }}
                        className={`border-2 border-dashed rounded-lg p-5 flex flex-col items-center justify-center text-center transition-all ${
                          dragActive 
                            ? 'border-cyan-400 bg-cyan-950/20' 
                            : 'border-slate-800 bg-slate-900/30 hover:border-slate-700'
                        }`}
                      >
                        {uploadProgress !== null ? (
                          <div className="w-full">
                            <div className="text-[10px] font-mono text-cyan-400 mb-1.5 font-bold">Uploading to Encrypted Cabinet: {uploadProgress}%</div>
                            <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-cyan-400 to-lime-400" style={{ width: `${uploadProgress}%` }} />
                            </div>
                          </div>
                        ) : (
                          <>
                            <UploadCloud className="h-8 w-8 text-slate-500 mb-2" />
                            <p className="text-[11px] text-slate-400">
                              <span className="font-bold text-cyan-400 underline cursor-pointer" onClick={() => handleFileUploadSimulate('Household_Deed_Signed.pdf', 'Legal')}>
                                Click to Upload
                              </span> or drag and drop files here
                            </p>
                            <p className="text-[9px] text-slate-600 mt-1">PDF, JPG, PNG, DOC (Max size: 10MB)</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 4: REAL-TIME LOCAL NOTIFICATIONS */}
              {activeTab === 'alerts' && (
                <motion.div
                  key="alerts"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="p-6 md:p-8 flex-grow"
                >
                  <div className="border-b border-slate-800 pb-4 mb-6">
                    <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5 text-cyan-400" />
                      <span>ZIP Code Real-Time Disaster Warn Engine</span>
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Enter your Zip Code to query local NOAA weather warning feeds. Keeps your family alerted on shelter locations and evacuation directives.
                    </p>
                  </div>

                  {/* Zip Search form */}
                  <form onSubmit={handleZipSearch} className="max-w-md flex space-x-3 mb-8">
                    <div className="relative flex-grow">
                      <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                      <input 
                        type="text" 
                        maxLength={5}
                        placeholder="Enter 5-digit ZIP (e.g. 77001, 33101)" 
                        value={zipInput}
                        onChange={e => setZipInput(e.target.value.replace(/\D/g, ''))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg flex items-center space-x-2 transition-colors border border-slate-700 cursor-pointer"
                    >
                      <Search className="h-3.5 w-3.5 text-cyan-400" />
                      <span>Check Alerts</span>
                    </button>
                  </form>

                  {/* Alert Display Card */}
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
                    {/* Glowing side accent line */}
                    <div className={`absolute top-0 bottom-0 left-0 w-1.5 ${
                      activeAlert.status === 'severe' 
                        ? 'bg-red-500' 
                        : activeAlert.status === 'moderate' 
                        ? 'bg-amber-500' 
                        : 'bg-green-500'
                    }`} />

                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className={`text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded border ${
                            activeAlert.status === 'severe'
                              ? 'bg-red-950/50 text-red-400 border-red-900/60 animate-pulse'
                              : activeAlert.status === 'moderate'
                              ? 'bg-amber-950/50 text-amber-400 border-amber-900/60'
                              : 'bg-green-950/50 text-green-400 border-green-900/60'
                          }`}>
                            {activeAlert.status === 'severe' ? 'CRITICAL DANGER' : activeAlert.status === 'moderate' ? 'ACTIVE ADVISORY' : 'ALL CLEAR'}
                          </span>
                          <span className="text-xs font-mono text-slate-500">ZIP: {zipInput} &bull; Checked Just Now</span>
                        </div>
                        
                        <h4 className="text-lg font-bold text-white mt-3">{activeAlert.title}</h4>
                        <p className="text-xs text-slate-400 mt-2 leading-relaxed">{activeAlert.description}</p>
                      </div>

                      {activeAlert.status !== 'clear' && (
                        <AlertCircle className={`h-8 w-8 flex-shrink-0 ${activeAlert.status === 'severe' ? 'text-red-500' : 'text-amber-500'}`} />
                      )}
                    </div>

                    {/* Evacuation and shelter modules */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-slate-900">
                      
                      {/* Left: Evacuation corrider */}
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center space-x-1.5">
                          <MapPin className="h-4 w-4 text-cyan-400" />
                          <span>EVACUATION ROUTE</span>
                        </span>
                        <p className="text-xs text-slate-300 font-mono leading-relaxed bg-slate-900/40 p-3 rounded-lg border border-slate-900">{activeAlert.evacRoute}</p>
                      </div>

                      {/* Right: Emergency Instructions */}
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center space-x-1.5">
                          <Clock className="h-4 w-4 text-lime-400" />
                          <span>IMMEDIATE DIRECTIVES</span>
                        </span>
                        <ul className="text-xs text-slate-300 space-y-1.5 font-medium pl-3 list-disc">
                          {activeAlert.instructions.map((inst, idx) => (
                            <li key={idx} className="leading-relaxed">{inst}</li>
                          ))}
                        </ul>
                      </div>

                    </div>

                    {/* Shelters if available */}
                    {activeAlert.shelters.length > 0 && (
                      <div className="mt-6 pt-6 border-t border-slate-900">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center space-x-1.5 mb-2">
                          <ShieldCheck className="h-4 w-4 text-lime-400" />
                          <span>RECOMMENDED PUBLIC SHELTERS</span>
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {activeAlert.shelters.map((sh, idx) => (
                            <div key={idx} className="p-3 bg-slate-900/80 border border-slate-850 rounded-lg flex items-center space-x-2 text-xs">
                              <div className="h-6 w-6 rounded-full bg-slate-950 flex items-center justify-center text-lime-400 text-[10px] font-bold">
                                {idx + 1}
                              </div>
                              <span className="text-slate-300 font-semibold">{sh}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer action */}
            <div className="p-6 bg-slate-950/60 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-2.5">
                <div className="h-6 w-6 bg-lime-500/15 border border-lime-500/30 rounded-full flex items-center justify-center text-lime-400">
                  <Lock className="h-3.5 w-3.5" />
                </div>
                <span className="text-[11px] text-slate-400 font-medium">Safe and HIPAA compliant health documentation data.</span>
              </div>

              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => alert('Offline mode backup simulated. No internet connection needed.')}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-850 text-slate-400 border border-slate-800 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Simulate Offline Mode
                </button>
                <button 
                  onClick={() => onRequestDemo('readyhub')}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-lime-500 hover:opacity-95 text-slate-950 text-xs font-bold rounded-lg transition-all shadow cursor-pointer"
                >
                  Request Hub Corporate Demo
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Feature Breakdowns Grid Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-900">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-lime-400 uppercase tracking-widest bg-lime-950/40 px-3 py-1.5 rounded-full border border-lime-900/50">
            PREPARATION TECHNOLOGY
          </span>
          <h2 className="text-3xl font-extrabold text-white tracking-tight mt-4">
            Under the Hood of MyPro Ready Hub
          </h2>
          <p className="text-sm text-slate-400 mt-3 max-w-xl mx-auto">
            Providing high-contrast UI assets, advanced image/video recognition overlays, and secure cryptographic storage for state-level readiness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 h-16 w-16 bg-cyan-500/5 rounded-bl-full group-hover:bg-cyan-500/10 transition-colors" />
            <div className="h-10 w-10 bg-cyan-950 border border-cyan-800 rounded-lg flex items-center justify-center mb-4 text-cyan-400">
              <Camera className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">AI Vision Serial Footprints</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Video scans parse major appliance tags, matching them against serial archives to guarantee purchase evidence if local homes are completely destroyed.
            </p>
          </div>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 h-16 w-16 bg-lime-500/5 rounded-bl-full group-hover:bg-lime-500/10 transition-colors" />
            <div className="h-10 w-10 bg-lime-950 border border-lime-800 rounded-lg flex items-center justify-center mb-4 text-lime-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">Cryptographic Device Vault</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              All documents are stored using zero-knowledge on-device AES security, enabling instant medical and identity access even with local telecom cell drops.
            </p>
          </div>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 h-16 w-16 bg-cyan-500/5 rounded-bl-full group-hover:bg-cyan-500/10 transition-colors" />
            <div className="h-10 w-10 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-center mb-4 text-cyan-400">
              <MapPin className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">NOAA Warning Sync</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Syncs with national oceanic feeds to filter alert reports precisely to your ZIP code, suggesting targeted survival checklists to handle rapid storms.
            </p>
          </div>

        </div>

        {/* LOGO STUDIO & DOWNLOAD TOOL */}
        <div id="readyhub-logo-studio" className="mt-16 p-8 bg-slate-900/60 border border-slate-800 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 h-40 w-40 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-bl-full pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-4">
              <span className="inline-flex items-center space-x-1.5 text-[10px] font-bold text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded-full border border-cyan-800/40 uppercase tracking-wider">
                <FileCode className="h-3 w-3" />
                <span>Vector Branding Suite</span>
              </span>
              <h3 className="text-2xl font-extrabold text-white tracking-tight">
                Ready Hub Logo & Brand Mark Exporter
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                The brand asset features the protective outer security shield, our signature interior refuge home structure with a 4-pane active glowing window, and the green certification checkmark of safety readiness—now perfectly fitted within the safety boundary.
              </p>
              
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                    1. Brand Asset Format
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setLogoAssetMode('full')}
                      className={`flex-1 py-2 px-3 rounded-lg border font-bold text-xs transition-all cursor-pointer text-center ${
                        logoAssetMode === 'full'
                          ? 'bg-cyan-950 text-cyan-400 border-cyan-800'
                          : 'bg-slate-950 text-slate-400 border-slate-900 hover:bg-slate-900/50'
                      }`}
                    >
                      Full Logo with Typography
                    </button>
                    <button
                      onClick={() => setLogoAssetMode('icon')}
                      className={`flex-1 py-2 px-3 rounded-lg border font-bold text-xs transition-all cursor-pointer text-center ${
                        logoAssetMode === 'icon'
                          ? 'bg-cyan-950 text-cyan-400 border-cyan-800'
                          : 'bg-slate-950 text-slate-400 border-slate-900 hover:bg-slate-900/50'
                      }`}
                    >
                      Brand Mark Icon Only
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                    2. Background Presentation
                  </label>
                  <div className="flex gap-2">
                    {(['transparent', 'dark', 'light'] as const).map((bg) => (
                      <button
                        key={bg}
                        onClick={() => setLogoBgType(bg)}
                        className={`flex-1 py-1.5 px-2 rounded-lg border font-bold text-xs capitalize transition-all cursor-pointer text-center ${
                          logoBgType === bg
                            ? 'bg-slate-800 text-white border-slate-700'
                            : 'bg-slate-950 text-slate-500 border-slate-900 hover:bg-slate-900/30'
                        }`}
                      >
                        {bg}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Preview & Action Column */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center relative min-h-[180px]">
                {/* Checkerboard Pattern for Transparent */}
                {logoBgType === 'transparent' && (
                  <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(45deg,#ccc_25%,transparent_25%),linear-gradient(-45deg,#ccc_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#ccc_75%),linear-gradient(-45deg,transparent_75%,#ccc_75%)] bg-[size:16px_16px] bg-[position:0_0,0_8px,8px_-8px,8px_0px] pointer-events-none" />
                )}
                
                <div 
                  className={`transition-all duration-300 p-6 rounded-lg ${
                    logoBgType === 'dark' ? 'bg-[#020617] border border-slate-900' : logoBgType === 'light' ? 'bg-white border border-slate-200' : ''
                  }`}
                >
                  {logoAssetMode === 'icon' ? (
                    <MyProReadyHubLogo showText={false} size="lg" />
                  ) : (
                    <MyProReadyHubLogo showText={true} size="lg" />
                  )}
                </div>

                <span className="absolute bottom-2 right-3 text-[10px] font-mono text-slate-600">
                  Live Studio Preview
                </span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={handleCopyLogoCode}
                  className="flex items-center justify-center space-x-2 py-3 px-4 bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-900 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer active:scale-95"
                >
                  {copiedLogo ? (
                    <>
                      <Check className="h-4 w-4 text-lime-400" />
                      <span className="text-lime-400">Copied SVG to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 text-cyan-400" />
                      <span>Copy SVG Code</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleDownloadLogoSvg}
                  className="flex items-center justify-center space-x-2 py-3 px-4 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-slate-950 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md shadow-cyan-950 active:scale-95"
                >
                  <Download className="h-4 w-4" />
                  <span>Download SVG File</span>
                </button>
              </div>

              {/* Source Preview Code (Truncated display) */}
              <div className="bg-slate-950 border border-slate-850 rounded-lg p-3 font-mono text-[10px] text-slate-500 relative max-h-[85px] overflow-y-auto">
                <div className="flex justify-between items-center text-slate-600 text-[9px] font-bold uppercase tracking-wider mb-1.5 pb-1 border-b border-slate-900">
                  <span>VECTOR SOURCE OUTPUT</span>
                  <span>SVG XML FORMAT</span>
                </div>
                <pre className="text-slate-400 leading-normal truncate whitespace-pre-wrap select-all">
                  {getLogoSvgContent()}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Footer and Certifications */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded bg-gradient-to-tr from-cyan-500 to-lime-500 flex items-center justify-center text-slate-950">
              <span className="font-bold text-sm">M</span>
            </div>
            <span className="text-sm font-semibold text-slate-300">&copy; 2026 MyPro Ready Hub. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
            <span className="hover:text-cyan-400 cursor-pointer" onClick={onBackToCorporate}>Products Home</span>
            <span>&bull;</span>
            <span>HIPAA Compliant</span>
            <span>&bull;</span>
            <span>FEMA-Certified Layout</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
