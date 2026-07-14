import React, { useState, useRef, useEffect } from 'react';
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
  Search, 
  UploadCloud, 
  FileText,
  Activity,
  Check,
  Menu as MenuIcon,
  LogOut,
  X,
  ChevronDown,
  ChevronUp,
  UserPlus,
  Map as MapIcon,
  Users,
  Send,
  CloudLightning,
  Play,
  Pause,
  Download,
  Trash2,
  SlidersHorizontal,
  CheckSquare
} from 'lucide-react';
import MyProMarketLogo from './MyProMarketLogo';

// Define core interfaces matching our state requirements
interface Assignment {
  type: string;
  dateAssigned: string;
  currentMilestone: string;
  contractorAssigned: string;
}

interface Participant {
  letter: string;
  name: string;
  role: string;
}

interface ChatMessage {
  sender: string;
  date: string;
  text: string;
  isSelf: boolean;
}

interface Job {
  id: string;
  address: string;
  zipCode: string;
  status: 'NEW' | 'IN PROGRESS' | 'CLOSED' | 'CANCELLED';
  currentMilestoneIndex: number; // 1 to 7 corresponding to milestones
  assignments: Assignment[];
  customer: {
    company: string;
    fullName: string;
    address: string;
    email: string;
    phone: string;
  };
  jobInfo: {
    contactName: string;
    phone: string;
    jobAddress: string;
  };
  participants: Participant[];
  contractor: {
    letter: string;
    name: string;
    email: string;
  };
  documents: string[];
  invoices: string[];
  chatHistory: ChatMessage[];
}

interface MyProMarketPortalProps {
  onBackToCorporate: () => void;
}

export default function MyProMarketPortal({ onBackToCorporate }: MyProMarketPortalProps) {
  // Current active tab state: 'jobs', 'map', 'contractors'
  const [currentTab, setCurrentTab] = useState<'jobs' | 'map' | 'contractors'>('jobs');
  
  // Selected job for detailed view (if null, displays the main list)
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  
  // List filter state
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'NEW' | 'IN PROGRESS' | 'CLOSED' | 'CANCELLED'>('ALL');
  
  // Dropdown menu state in header
  const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);
  
  // Row expansion state for the Jobs table
  const [expandedRowId, setExpandedRowId] = useState<string | null>('MPM_15');

  // Modals state
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [assignmentModalOpen, setAssignmentModalOpen] = useState(false);
  const [createJobModalOpen, setCreateJobModalOpen] = useState(false);
  
  // Modal Form Inputs
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteType, setInviteType] = useState('Homeowner');
  
  const [selectedNewAssignmentType, setSelectedNewAssignmentType] = useState('Plumbing');
  
  // Create Job Inputs
  const [newJobAddress, setNewJobAddress] = useState('');
  const [newJobZipCode, setNewJobZipCode] = useState('');
  const [newJobCustomerName, setNewJobCustomerName] = useState('');
  const [newJobCustomerPhone, setNewJobCustomerPhone] = useState('');

  // Map settings and weather overlay controls
  const [layerJobs, setLayerJobs] = useState(true);
  const [layerProperties, setLayerProperties] = useState(false); // Dense blue squares
  const [layerContractors, setLayerContractors] = useState(true); // Orange pins
  const [weatherOpen, setWeatherOpen] = useState(false);
  const [radarActive, setRadarActive] = useState(false);
  const [alertsActive, setAlertsActive] = useState(false);
  const [catTrackerActive, setCatTrackerActive] = useState(false);
  const [radarPlay, setRadarPlay] = useState(false);
  const [radarFrame, setRadarFrame] = useState(50); // Seek timeline value (percent)

  // Chat input field
  const [chatMessageText, setChatMessageText] = useState('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Stateful Jobs database preloaded with the content from your screenshots!
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: 'MPM_15',
      address: '110 S. Starling Dr',
      zipCode: '32164',
      status: 'IN PROGRESS',
      currentMilestoneIndex: 4, // 1 to 7, where 4 is "Job Completed" (blue circle #4)
      assignments: [
        {
          type: 'Plumbing',
          dateAssigned: '06/26/2026',
          currentMilestone: 'Job Completed',
          contractorAssigned: 'Legacy Partners Construction'
        },
        {
          type: 'General Construction / Remodel',
          dateAssigned: '07/01/2026',
          currentMilestone: '',
          contractorAssigned: 'Legacy Partners Construction'
        }
      ],
      customer: {
        company: 'Legacy Property Management',
        fullName: 'Jeff Ruland',
        address: '102 Flagler Plaza Dr., Palm Coast, FL',
        email: 'kerrie.ruland@gmail.com',
        phone: '(352) 535-5737'
      },
      jobInfo: {
        contactName: 'Kerrie Ruland',
        phone: '(352) 535-5737',
        jobAddress: '110 S. Starling Dr, Palm Coast, Florida 32164'
      },
      participants: [
        { letter: 'J', name: 'Jeff Ruland', role: 'Company (Job Creator)' },
        { letter: 'K', name: 'Kerrie Ruland', role: 'Job Contact' },
        { letter: 'L', name: 'Legacy Partners Construction', role: 'Contractor — Plumbing' }
      ],
      contractor: {
        letter: 'L',
        name: 'Legacy Partners Construction',
        email: 'legacy.partners.consults+gc@gmail.com'
      },
      documents: ['Plumbing_Inspection_Report.pdf'],
      invoices: [],
      chatHistory: [
        { sender: 'Jeff Ruland', date: '06/26/2026 6:12 PM', text: 'There is a plumbing leak in the bathroom shower', isSelf: true },
        { sender: 'JR Ruland', date: '06/26/2026 6:14 PM', text: 'Spoke to homeowner and scheduled an appt for 6/27 at 10:00 am', isSelf: false },
        { sender: 'Jeff Ruland', date: '07/10/2026 5:49 PM', text: 'Test', isSelf: true }
      ]
    },
    {
      id: 'MPM_16',
      address: '244 Coral Way',
      zipCode: '32114',
      status: 'NEW',
      currentMilestoneIndex: 1,
      assignments: [
        {
          type: 'Electrical',
          dateAssigned: '07/02/2026',
          currentMilestone: 'Assignment Accepted/Rejected',
          contractorAssigned: 'Lightning Spark Electric'
        }
      ],
      customer: {
        company: 'Legacy Property Management',
        fullName: 'Jeff Ruland',
        address: '102 Flagler Plaza Dr., Palm Coast, FL',
        email: 'kerrie.ruland@gmail.com',
        phone: '(352) 535-5737'
      },
      jobInfo: {
        contactName: 'Kerrie Ruland',
        phone: '(352) 535-5737',
        jobAddress: '244 Coral Way, Palm Coast, Florida 32114'
      },
      participants: [
        { letter: 'J', name: 'Jeff Ruland', role: 'Company (Job Creator)' }
      ],
      contractor: {
        letter: 'L',
        name: 'Lightning Spark Electric',
        email: 'sparky@lightningspark.com'
      },
      documents: [],
      invoices: [],
      chatHistory: []
    },
    {
      id: 'MPM_17',
      address: '1504 Coastal Boulevard',
      zipCode: '32118',
      status: 'CLOSED',
      currentMilestoneIndex: 7,
      assignments: [
        {
          type: 'Roofing Repair',
          dateAssigned: '05/10/2026',
          currentMilestone: 'Job Closed',
          contractorAssigned: 'Coastal Roofing Experts'
        }
      ],
      customer: {
        company: 'Legacy Property Management',
        fullName: 'Jeff Ruland',
        address: '102 Flagler Plaza Dr., Palm Coast, FL',
        email: 'kerrie.ruland@gmail.com',
        phone: '(352) 535-5737'
      },
      jobInfo: {
        contactName: 'Kerrie Ruland',
        phone: '(352) 535-5737',
        jobAddress: '1504 Coastal Boulevard, Daytona Beach, Florida 32118'
      },
      participants: [
        { letter: 'J', name: 'Jeff Ruland', role: 'Company (Job Creator)' },
        { letter: 'C', name: 'Coastal Roofing Experts', role: 'Contractor — Roofing' }
      ],
      contractor: {
        letter: 'C',
        name: 'Coastal Roofing Experts',
        email: 'orders@coastalroofing.com'
      },
      documents: ['Certificate_of_Completion.pdf'],
      invoices: ['Invoice_10924_Paid.pdf'],
      chatHistory: [
        { sender: 'Coastal Roofing Experts', date: '05/11/2026 9:00 AM', text: 'Roof repair has been finalized. Signing off now.', isSelf: false },
        { sender: 'Jeff Ruland', date: '05/11/2026 10:15 AM', text: 'Thank you! Perfect timing before the storms.', isSelf: true }
      ]
    },
    {
      id: 'MPM_18',
      address: '425 Whispering Pines Way',
      zipCode: '32137',
      status: 'NEW',
      currentMilestoneIndex: 1,
      assignments: [
        {
          type: 'Water Mitigation',
          dateAssigned: '07/08/2026',
          currentMilestone: 'Assignment Accepted/Rejected',
          contractorAssigned: '24/7 Restoration'
        }
      ],
      customer: {
        company: 'Legacy Property Management',
        fullName: 'Jeff Ruland',
        address: '102 Flagler Plaza Dr., Palm Coast, FL',
        email: 'kerrie.ruland@gmail.com',
        phone: '(352) 535-5737'
      },
      jobInfo: {
        contactName: 'Kerrie Ruland',
        phone: '(352) 535-5737',
        jobAddress: '425 Whispering Pines Way, Palm Coast, FL 32137'
      },
      participants: [
        { letter: 'J', name: 'Jeff Ruland', role: 'Company (Job Creator)' },
        { letter: '2', name: '24/7 Restoration', role: 'Contractor — Water Mitigation' }
      ],
      contractor: {
        letter: '2',
        name: '24/7 Restoration',
        email: 'dispatch@247restoration.com'
      },
      documents: [],
      invoices: [],
      chatHistory: []
    }
  ]);

  // Vetted Contractors list for the contractors directory page
  const [contractors] = useState([
    { name: 'Legacy Partners Construction', email: 'legacy.partners.consults+gc@gmail.com', phone: '(352) 535-5737', trade: 'General & Plumbing', rating: '4.9/5', status: 'Approved' },
    { name: 'Lightning Spark Electric', email: 'sparky@lightningspark.com', phone: '(904) 555-0144', trade: 'Electrical', rating: '4.8/5', status: 'Approved' },
    { name: 'Coastal Roofing Experts', email: 'orders@coastalroofing.com', phone: '(386) 555-8902', trade: 'Roofing', rating: '4.95/5', status: 'Approved' },
    { name: 'Jacksonville Drywall & Paint', email: 'vetted@jaxdrywall.com', phone: '(904) 555-7811', trade: 'Drywall & Renovation', rating: '4.7/5', status: 'Approved' },
    { name: 'Orlando Moisture mitigation Inc', email: 'mitigate@orlandodry.com', phone: '(407) 555-3344', trade: 'Water Mitigation', rating: '4.85/5', status: 'Approved' },
    { name: '24/7 Restoration', email: 'dispatch@247restoration.com', phone: '(904) 555-0199', trade: 'Water Mitigation', rating: '4.9/5', status: 'Approved' }
  ]);

  // Handle auto-scroll in chat
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [jobs, selectedJobId]);

  // Handle weather radar mock playback simulation
  useEffect(() => {
    let interval: any;
    if (radarPlay && radarActive) {
      interval = setInterval(() => {
        setRadarFrame((prev) => (prev >= 100 ? 0 : prev + 5));
      }, 350);
    }
    return () => clearInterval(interval);
  }, [radarPlay, radarActive]);

  // Helper variables for filtering jobs
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.address.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Derived counts for the stats widgets
  const countActive = jobs.filter(j => j.status === 'IN PROGRESS' || j.status === 'NEW').length;
  const countClosed = jobs.filter(j => j.status === 'CLOSED').length;
  const countCancelled = jobs.filter(j => j.status === 'CANCELLED').length;
  const countTotal = jobs.length;

  // Active selected job helper
  const selectedJob = jobs.find(j => j.id === selectedJobId) || jobs[0];

  // Submit invited user
  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteName || !inviteEmail) return;

    // Add to current selected job's participants list
    setJobs(prevJobs => prevJobs.map(job => {
      if (job.id === selectedJob.id) {
        return {
          ...job,
          participants: [
            ...job.participants,
            {
              letter: inviteName.charAt(0).toUpperCase(),
              name: inviteName,
              role: inviteType
            }
          ]
        };
      }
      return job;
    }));

    setInviteName('');
    setInviteEmail('');
    setInviteModalOpen(false);
  };

  // Submit adding new assignment
  const handleAddAssignmentSubmit = () => {
    // Add assignment to the selected job (or job matching expandedRowId)
    const targetJobId = selectedJobId || expandedRowId || 'MPM_15';
    
    setJobs(prevJobs => prevJobs.map(job => {
      if (job.id === targetJobId) {
        return {
          ...job,
          assignments: [
            ...job.assignments,
            {
              type: selectedNewAssignmentType,
              dateAssigned: new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
              currentMilestone: 'Assignment Accepted/Rejected',
              contractorAssigned: 'Legacy Partners Construction'
            }
          ]
        };
      }
      return job;
    }));

    setAssignmentModalOpen(false);
  };

  // Submit sending chat message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessageText.trim()) return;

    setJobs(prevJobs => prevJobs.map(job => {
      if (job.id === selectedJob.id) {
        return {
          ...job,
          chatHistory: [
            ...job.chatHistory,
            {
              sender: 'Jeff Ruland',
              date: new Date().toLocaleDateString('en-US') + ' ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
              text: chatMessageText,
              isSelf: true
            }
          ]
        };
      }
      return job;
    }));

    setChatMessageText('');
  };

  // Simulate document upload
  const handleDocumentUpload = (fileName: string) => {
    setJobs(prevJobs => prevJobs.map(job => {
      if (job.id === selectedJob.id) {
        return {
          ...job,
          documents: [...job.documents, fileName]
        };
      }
      return job;
    }));
  };

  // Simulate invoice upload
  const handleInvoiceUpload = (fileName: string) => {
    setJobs(prevJobs => prevJobs.map(job => {
      if (job.id === selectedJob.id) {
        return {
          ...job,
          invoices: [...job.invoices, fileName]
        };
      }
      return job;
    }));
  };

  // Submit new job creation
  const handleCreateJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJobAddress || !newJobZipCode) return;

    const nextIdNum = jobs.length + 15; // MPM_15, MPM_16...
    const newJob: Job = {
      id: `MPM_${nextIdNum}`,
      address: newJobAddress,
      zipCode: newJobZipCode,
      status: 'NEW',
      currentMilestoneIndex: 1,
      assignments: [],
      customer: {
        company: 'Legacy Property Management',
        fullName: newJobCustomerName || 'Jeff Ruland',
        address: '102 Flagler Plaza Dr., Palm Coast, FL',
        email: 'kerrie.ruland@gmail.com',
        phone: newJobCustomerPhone || '(352) 535-5737'
      },
      jobInfo: {
        contactName: newJobCustomerName || 'Kerrie Ruland',
        phone: newJobCustomerPhone || '(352) 535-5737',
        jobAddress: `${newJobAddress}, Palm Coast, Florida ${newJobZipCode}`
      },
      participants: [
        { letter: 'J', name: newJobCustomerName || 'Jeff Ruland', role: 'Company (Job Creator)' }
      ],
      contractor: {
        letter: 'L',
        name: 'Legacy Partners Construction',
        email: 'legacy.partners.consults+gc@gmail.com'
      },
      documents: [],
      invoices: [],
      chatHistory: []
    };

    setJobs([newJob, ...jobs]);
    setNewJobAddress('');
    setNewJobZipCode('');
    setNewJobCustomerName('');
    setNewJobCustomerPhone('');
    setCreateJobModalOpen(false);
    setSelectedJobId(newJob.id); // View details immediately
  };

  // Helper list of milestone names
  const milestoneList = [
    'Assignment Accepted/Rejected',
    'Customer Contacted',
    'Job Started',
    'Job Completed',
    'COS Uploaded',
    'Invoice Uploaded',
    'Job Closed'
  ];

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-800 flex flex-col font-sans selection:bg-[#468CDC]/20 selection:text-[#2F74CF]">
      
      {/* Simulation Header Banner */}
      <div className="bg-gradient-to-r from-[#2F74CF] to-[#1E40AF] text-white text-[11px] px-6 py-2 flex flex-col sm:flex-row justify-between items-center space-y-1 sm:space-y-0 z-50 border-b border-white/10">
        <div className="flex items-center space-x-2">
          <span className="h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse" />
          <span className="font-bold">MyPro Market Portal Sandbox</span>
          <span className="text-white/80 font-medium">| Client-side testing environment matches design specs perfectly</span>
        </div>
        <button 
          onClick={onBackToCorporate}
          className="flex items-center space-x-1.5 text-[10px] font-bold bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Exit Sandbox</span>
        </button>
      </div>

      {/* Main Navbar */}
      <header className="bg-[#468CDC] text-white py-3 px-6 shadow-md border-b border-[#2c72cf]/30 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <MyProMarketLogo size="md" />
            <button className="flex items-center space-x-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-md text-[11px] font-semibold transition-all">
              <Download className="h-3.5 w-3.5 text-white" />
              <span>Install app</span>
            </button>
          </div>

          <div className="flex items-center space-x-4">
            {/* Custom Dropdown Menu */}
            <div className="relative">
              <button 
                onClick={() => setMenuDropdownOpen(!menuDropdownOpen)}
                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 border border-white/20 rounded-lg text-xs font-bold uppercase tracking-wider transition-all"
              >
                <MenuIcon className="h-4 w-4" />
                <span>Menu</span>
                <ChevronDown className={`h-3 w-3 transition-transform ${menuDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {menuDropdownOpen && (
                  <>
                    {/* Overlay click back */}
                    <div className="fixed inset-0 z-40" onClick={() => setMenuDropdownOpen(false)} />
                    <motion.div 
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 text-slate-800"
                    >
                      <button 
                        onClick={() => { setCurrentTab('jobs'); setSelectedJobId(null); setMenuDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2.5 hover:bg-slate-50 text-xs font-semibold flex items-center space-x-2.5"
                      >
                        <Layers className="h-4 w-4 text-[#468CDC]" />
                        <span>My Jobs</span>
                      </button>
                      <button 
                        onClick={() => { setCurrentTab('contractors'); setMenuDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2.5 hover:bg-slate-50 text-xs font-semibold flex items-center space-x-2.5"
                      >
                        <Users className="h-4 w-4 text-[#468CDC]" />
                        <span>Contractors</span>
                      </button>
                      <button 
                        onClick={() => { setCurrentTab('map'); setMenuDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2.5 hover:bg-slate-50 text-xs font-semibold flex items-center space-x-2.5"
                      >
                        <MapIcon className="h-4 w-4 text-[#468CDC]" />
                        <span>View Map</span>
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* User Profile display */}
            <div className="flex items-center space-x-3 border-l border-white/20 pl-4">
              <div className="h-8 w-8 rounded-full bg-blue-100 text-[#468CDC] font-black flex items-center justify-center text-xs shadow-inner">
                L
              </div>
              <div className="text-right hidden md:block">
                <span className="block text-xs font-bold leading-tight">Legacy Property Management</span>
                <span className="text-[10px] text-blue-100 font-medium">Account Settings</span>
              </div>
              <button 
                onClick={onBackToCorporate}
                className="text-white hover:text-red-200 transition-colors p-1"
                title="Log Out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container Stage */}
      <main className="flex-grow max-w-7xl w-full mx-auto p-4 md:p-6 pb-20">
        
        {/* VIEW: Jobs Queue */}
        {currentTab === 'jobs' && (
          <div className="space-y-6">
            
            {selectedJobId === null ? (
              // List screen
              <div className="space-y-6">
                
                {/* Header title & toolbar */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <h1 className="text-3xl font-extrabold text-[#98C44E] tracking-tight">Jobs</h1>
                  
                  <div className="flex flex-wrap items-center gap-2.5">
                    {/* Search bar */}
                    <div className="relative w-full sm:w-64">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                        <Search className="h-4 w-4" />
                      </span>
                      <input
                        type="text"
                        placeholder="Search jobs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#468CDC] transition-all"
                      />
                    </div>

                    <button 
                      onClick={() => setInviteModalOpen(true)}
                      className="px-4 py-2 border-2 border-[#2F74CF] text-[#2F74CF] hover:bg-slate-50 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-colors"
                    >
                      <UserPlus className="h-4 w-4" />
                      <span>INVITE USER</span>
                    </button>

                    <button 
                      onClick={() => setCreateJobModalOpen(true)}
                      className="px-4 py-2 bg-[#98C44E] hover:bg-[#85b03f] text-white rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-colors shadow-md shadow-[#98C44E]/10"
                    >
                      <Plus className="h-4 w-4" />
                      <span>CREATE JOB</span>
                    </button>
                  </div>
                </div>

                {/* Dashboard Count Widgets */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-xl border border-slate-200 text-center shadow-sm">
                    <span className="block text-4xl font-extrabold text-[#98C44E]">{countActive}</span>
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1 block">Active Jobs</span>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-slate-200 text-center shadow-sm">
                    <span className="block text-4xl font-extrabold text-slate-400">{countClosed}</span>
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1 block">Closed</span>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-slate-200 text-center shadow-sm">
                    <span className="block text-4xl font-extrabold text-red-500">{countCancelled}</span>
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1 block">Cancelled</span>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-slate-200 text-center shadow-sm">
                    <span className="block text-4xl font-extrabold text-blue-500">{countTotal}</span>
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1 block">Total Jobs</span>
                  </div>
                </div>

                {/* Filters buttons */}
                <div className="flex flex-wrap gap-2">
                  {(['ALL', 'NEW', 'IN PROGRESS', 'CLOSED', 'CANCELLED'] as const).map((status) => {
                    const isSelected = statusFilter === status;
                    return (
                      <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`text-xs font-extrabold px-4 py-2 rounded-md transition-all ${
                          isSelected 
                            ? 'bg-[#2F74CF] text-white border border-[#2F74CF] shadow-sm' 
                            : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {status}
                      </button>
                    );
                  })}
                </div>

                {/* Jobs Table Container */}
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#468CDC] text-white text-xs font-bold uppercase tracking-wider">
                          <th className="py-3 px-4 w-10"></th>
                          <th className="py-3 px-4">JOB #</th>
                          <th className="py-3 px-4">ADDRESS</th>
                          <th className="py-3 px-4">ZIP CODE</th>
                          <th className="py-3 px-4">STATUS</th>
                          <th className="py-3 px-4 text-right">ACTION</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs">
                        {filteredJobs.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="py-8 text-center text-slate-400">
                              No jobs found matching the active filters.
                            </td>
                          </tr>
                        ) : (
                          filteredJobs.map((job) => {
                            const isExpanded = expandedRowId === job.id;
                            return (
                              <React.Fragment key={job.id}>
                                <tr className="hover:bg-slate-50/50 transition-colors font-medium">
                                  <td className="py-4 px-4 text-center">
                                    <button 
                                      onClick={() => setExpandedRowId(isExpanded ? null : job.id)}
                                      className="p-1 hover:bg-slate-100 rounded text-slate-500 transition-colors"
                                    >
                                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                    </button>
                                  </td>
                                  <td className="py-4 px-4 font-bold text-slate-900">{job.id}</td>
                                  <td className="py-4 px-4 text-slate-700 font-semibold">{job.address}</td>
                                  <td className="py-4 px-4 text-slate-500 font-mono">{job.zipCode}</td>
                                  <td className="py-4 px-4">
                                    <span className={`font-bold uppercase ${
                                      job.status === 'IN PROGRESS' ? 'text-[#98C44E]' : 
                                      job.status === 'NEW' ? 'text-amber-500' : 
                                      job.status === 'CLOSED' ? 'text-slate-400' : 'text-red-500'
                                    }`}>
                                      {job.status}
                                    </span>
                                  </td>
                                  <td className="py-4 px-4 text-right">
                                    <button
                                      onClick={() => setSelectedJobId(job.id)}
                                      className="border-2 border-[#2F74CF] text-[#2F74CF] hover:bg-[#2F74CF]/5 font-extrabold text-xs px-4 py-1.5 rounded transition-all"
                                    >
                                      VIEW
                                    </button>
                                  </td>
                                </tr>

                                {/* Expanded Assignments Detail Row */}
                                {isExpanded && (
                                  <tr className="bg-slate-50/50">
                                    <td colSpan={6} className="py-4 px-8 border-t border-slate-150">
                                      <div className="bg-white border border-slate-150 rounded-lg overflow-hidden shadow-inner">
                                        <div className="px-4 py-2 bg-slate-100 border-b border-slate-200 flex justify-between items-center">
                                          <span className="text-[11px] font-extrabold uppercase text-slate-500 tracking-wider">
                                            Active Vendor Assignments
                                          </span>
                                          <button
                                            onClick={() => { setAssignmentModalOpen(true); setExpandedRowId(job.id); }}
                                            className="px-2.5 py-1 bg-[#98C44E] hover:bg-[#85b03f] text-white text-[10px] font-bold rounded flex items-center space-x-1"
                                          >
                                            <Plus className="h-3 w-3" />
                                            <span>Add Assignment</span>
                                          </button>
                                        </div>
                                        <table className="w-full text-left text-xs">
                                          <thead>
                                            <tr className="border-b border-slate-100 text-slate-400 font-bold bg-slate-50/50">
                                              <th className="py-2.5 px-4">ASSIGNMENT TYPE</th>
                                              <th className="py-2.5 px-4">DATE ASSIGNED</th>
                                              <th className="py-2.5 px-4">CURRENT MILESTONE</th>
                                              <th className="py-2.5 px-4">CONTRACTOR ASSIGNED</th>
                                            </tr>
                                          </thead>
                                          <tbody className="divide-y divide-slate-100 font-medium">
                                            {job.assignments.length === 0 ? (
                                              <tr>
                                                <td colSpan={4} className="py-4 px-4 text-center text-slate-400 text-[11px]">
                                                  No active trade assignments found on this job.
                                                </td>
                                              </tr>
                                            ) : (
                                              job.assignments.map((asg, idx) => (
                                                <tr key={idx} className="hover:bg-slate-50/20 text-[11px]">
                                                  <td className="py-2.5 px-4 font-bold text-slate-800">{asg.type}</td>
                                                  <td className="py-2.5 px-4 text-slate-500 font-mono">{asg.dateAssigned}</td>
                                                  <td className="py-2.5 px-4">
                                                    {asg.currentMilestone ? (
                                                      <span className="text-[#98C44E] font-bold flex items-center space-x-1">
                                                        <CheckCircle2 className="h-3.5 w-3.5 text-[#98C44E]" />
                                                        <span>{asg.currentMilestone}</span>
                                                      </span>
                                                    ) : (
                                                      <span className="text-slate-400 font-normal italic">Waiting for update</span>
                                                    )}
                                                  </td>
                                                  <td className="py-2.5 px-4 font-semibold text-slate-700">{asg.contractorAssigned}</td>
                                                </tr>
                                              ))
                                            )}
                                          </tbody>
                                        </table>
                                      </div>
                                    </td>
                                  </tr>
                                )}
                              </React.Fragment>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination Footer */}
                  <div className="bg-slate-50 py-3.5 px-6 border-t border-slate-100 flex justify-center items-center">
                    <div className="flex items-center space-x-1.5">
                      <button disabled className="p-1.5 bg-white border border-slate-200 text-slate-300 rounded text-xs focus:outline-none cursor-not-allowed">
                        &lt;
                      </button>
                      <button className="px-3 py-1 bg-[#98C44E] text-white border border-[#98C44E] rounded text-xs font-bold font-mono">
                        1
                      </button>
                      <button disabled className="p-1.5 bg-white border border-slate-200 text-slate-300 rounded text-xs focus:outline-none cursor-not-allowed">
                        &gt;
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            ) : (
              // Job detailed view screen
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Back Button */}
                <button
                  onClick={() => setSelectedJobId(null)}
                  className="flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-[#2F74CF] transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Jobs</span>
                </button>

                {/* Job Info Header bar */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-5">
                  <div>
                    <h1 className="text-3xl font-extrabold text-[#98C44E] tracking-tight">Job {selectedJob.id}</h1>
                    <span className="text-xs uppercase font-extrabold text-[#98C44E] flex items-center space-x-1.5 mt-1">
                      <span className="h-2 w-2 rounded-full bg-[#98C44E] animate-pulse" />
                      <span>{selectedJob.status}</span>
                    </span>
                  </div>

                  {/* Header Actions */}
                  <div className="flex flex-wrap items-center gap-3">
                    <button 
                      onClick={() => setInviteModalOpen(true)}
                      className="px-4 py-2 bg-[#2F74CF] hover:bg-[#1E40AF] text-white font-bold rounded-lg text-xs flex items-center space-x-1.5 shadow-md shadow-[#2F74CF]/10 transition-colors"
                    >
                      <UserPlus className="h-4 w-4 text-white" />
                      <span>INVITE USER</span>
                    </button>

                    <button 
                      className="px-4 py-2 bg-[#2F74CF] hover:bg-[#1E40AF] text-white font-bold rounded-lg text-xs flex items-center space-x-1.5 shadow-md shadow-[#2F74CF]/10 transition-colors"
                    >
                      <Users className="h-4 w-4 text-white" />
                      <span>PARTICIPANTS</span>
                    </button>

                    <button 
                      onClick={() => setAssignmentModalOpen(true)}
                      className="px-4 py-2 bg-[#98C44E] hover:bg-[#85b03f] text-white font-bold rounded-lg text-xs flex items-center space-x-1.5 shadow-md shadow-[#98C44E]/10 transition-colors"
                    >
                      <Plus className="h-4 w-4 text-white" />
                      <span>NEW ASSIGNMENT</span>
                    </button>

                    {/* ASSIGNMENT TYPE dropdown */}
                    <div className="flex items-center">
                      <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider mr-2 hidden sm:inline">ASSIGNMENT TYPE:</span>
                      <select 
                        className="bg-white border-2 border-[#98C44E] text-[#98C44E] font-bold text-xs px-3 py-2 rounded-lg focus:outline-none cursor-pointer"
                        value={selectedNewAssignmentType}
                        onChange={(e) => setSelectedNewAssignmentType(e.target.value)}
                      >
                        <option value="Plumbing">Plumbing</option>
                        <option value="Electrical">Electrical</option>
                        <option value="Contents">Contents</option>
                        <option value="Fencing">Fencing</option>
                        <option value="Fire/Smoke Remediation">Fire/Smoke Remediation</option>
                        <option value="Home Inspection">Home Inspection</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 2-Column Main Content layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Column panels */}
                  <div className="lg:col-span-4 space-y-6">
                    
                    {/* Customer Info Card */}
                    <div className="bg-[#2F74CF] text-white rounded-xl shadow-md p-6 space-y-4">
                      <h3 className="text-sm font-bold tracking-wider uppercase border-b border-white/20 pb-2">
                        Customer
                      </h3>
                      
                      <div className="space-y-3 text-xs">
                        <div>
                          <span className="text-white/60 font-semibold block uppercase text-[10px] tracking-wider">COMPANY</span>
                          <span className="font-extrabold text-sm">{selectedJob.customer.company}</span>
                        </div>
                        <div>
                          <span className="text-white/60 font-semibold block uppercase text-[10px] tracking-wider">FULL NAME</span>
                          <span className="font-bold text-slate-100">{selectedJob.customer.fullName}</span>
                        </div>
                        <div>
                          <span className="text-white/60 font-semibold block uppercase text-[10px] tracking-wider">ADDRESS</span>
                          <span className="font-medium text-slate-100 leading-relaxed">{selectedJob.customer.address}</span>
                        </div>
                        <div>
                          <span className="text-white/60 font-semibold block uppercase text-[10px] tracking-wider">EMAIL</span>
                          <span className="font-mono text-slate-100">{selectedJob.customer.email}</span>
                        </div>
                        <div>
                          <span className="text-white/60 font-semibold block uppercase text-[10px] tracking-wider">PHONE</span>
                          <span className="font-bold font-mono text-slate-100">{selectedJob.customer.phone}</span>
                        </div>
                      </div>
                    </div>

                    {/* Job Information Card */}
                    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-4">
                      <h3 className="text-sm font-extrabold tracking-wider uppercase text-slate-800 border-b border-slate-100 pb-2">
                        Job Information
                      </h3>
                      
                      <div className="space-y-4 text-xs">
                        <div>
                          <span className="text-[#98C44E] font-bold block uppercase text-[9px] tracking-wider">CONTACT NAME</span>
                          <span className="font-extrabold text-slate-700">{selectedJob.jobInfo.contactName}</span>
                        </div>
                        <div>
                          <span className="text-[#98C44E] font-bold block uppercase text-[9px] tracking-wider">PHONE</span>
                          <span className="font-bold text-slate-700 font-mono">{selectedJob.jobInfo.phone}</span>
                        </div>
                        <div>
                          <span className="text-[#98C44E] font-bold block uppercase text-[9px] tracking-wider">JOB ADDRESS</span>
                          <span className="font-semibold text-slate-700 leading-relaxed">{selectedJob.jobInfo.jobAddress}</span>
                        </div>
                      </div>
                    </div>

                    {/* Job Participants Card */}
                    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-4">
                      <h3 className="text-sm font-extrabold tracking-wider uppercase text-slate-800 border-b border-slate-100 pb-2">
                        Job Participants
                      </h3>
                      
                      <div className="space-y-3">
                        {selectedJob.participants.map((part, idx) => (
                          <div key={idx} className="flex items-center space-x-3 text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                            <div className="h-8 w-8 rounded-full bg-[#2F74CF] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                              {part.letter}
                            </div>
                            <div>
                              <span className="font-extrabold text-slate-800 block">{part.name}</span>
                              <span className="text-[10px] text-slate-500 font-medium">{part.role}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Right Column panels */}
                  <div className="lg:col-span-8 space-y-6">
                    
                    {/* Milestones (7) Card */}
                    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-6">
                      <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                        <h3 className="text-sm font-extrabold tracking-wider uppercase text-slate-800">
                          Milestones (7)
                        </h3>
                        <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                          Interactive tracker (Click steps to simulate progress)
                        </span>
                      </div>

                      {/* Timeline graphic stepper */}
                      <div className="relative pt-4 pb-2">
                        {/* Connecting Track Line */}
                        <div className="absolute top-[32px] left-4 right-4 h-1 bg-slate-200 -z-10" />
                        <div 
                          className="absolute top-[32px] left-4 h-1 bg-[#98C44E] -z-10 transition-all duration-500" 
                          style={{ width: `${((selectedJob.currentMilestoneIndex - 1) / 6) * 100}%` }}
                        />

                        {/* Stepper bubbles row */}
                        <div className="flex justify-between items-start text-center">
                          {milestoneList.map((mName, idx) => {
                            const stepNum = idx + 1;
                            const isCompleted = stepNum < selectedJob.currentMilestoneIndex;
                            const isActive = stepNum === selectedJob.currentMilestoneIndex;
                            
                            return (
                              <button
                                key={idx}
                                onClick={() => {
                                  // Update current milestone index on click
                                  setJobs(prevJobs => prevJobs.map(j => {
                                    if (j.id === selectedJob.id) {
                                      return {
                                        ...j,
                                        currentMilestoneIndex: stepNum,
                                        // Update Plumbing currentMilestone as well if applicable
                                        assignments: j.assignments.map(asg => 
                                          asg.type === 'Plumbing' 
                                            ? { ...asg, currentMilestone: stepNum >= 4 ? 'Job Completed' : mName } 
                                            : asg
                                        )
                                      };
                                    }
                                    return j;
                                  }));
                                }}
                                className="flex flex-col items-center flex-1 focus:outline-none group"
                              >
                                <div className={`h-10 w-10 rounded-full flex items-center justify-center text-xs font-bold transition-all border-4 ${
                                  isCompleted 
                                    ? 'bg-[#98C44E] border-white text-white shadow-md' 
                                    : isActive 
                                    ? 'bg-[#2F74CF] border-white text-white scale-110 shadow-lg font-black ring-4 ring-[#2F74CF]/10' 
                                    : 'bg-slate-300 border-white text-slate-500 hover:bg-slate-400 hover:text-white'
                                }`}>
                                  {isCompleted ? <Check className="h-4 w-4" /> : stepNum}
                                </div>
                                <span className={`text-[9px] mt-2 font-bold leading-tight max-w-[65px] block break-words ${
                                  isActive ? 'text-[#2F74CF] font-extrabold' : isCompleted ? 'text-[#98C44E]' : 'text-slate-400'
                                }`}>
                                  {mName}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Vetted Contractor profile banner */}
                    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-lg bg-slate-900 flex items-center justify-center text-white font-extrabold text-lg">
                          {selectedJob.contractor.letter}
                        </div>
                        <div>
                          <h4 className="text-sm font-extrabold text-slate-800">{selectedJob.contractor.name}</h4>
                          <span className="text-xs text-slate-400 font-mono">{selectedJob.contractor.email}</span>
                        </div>
                      </div>

                      <div className="flex space-x-2.5">
                        <button className="px-4 py-2 border-2 border-[#2F74CF] text-[#2F74CF] hover:bg-[#2F74CF]/5 rounded-lg text-xs font-bold transition-all">
                          VIEW PROFILE
                        </button>
                        <button className="px-4 py-2 border-2 border-[#98C44E] text-[#98C44E] hover:bg-[#98C44E]/5 rounded-lg text-xs font-bold transition-all">
                          CHANGE CONTRACTOR
                        </button>
                      </div>
                    </div>

                    {/* Documents & Invoices Row Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Documents Box */}
                      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-4 flex flex-col justify-between">
                        <div>
                          <h3 className="text-xs font-extrabold tracking-wider uppercase text-slate-500 border-b border-slate-100 pb-2">
                            Documents
                          </h3>

                          {selectedJob.documents.length > 0 && (
                            <div className="mt-3 space-y-2">
                              {selectedJob.documents.map((doc, idx) => (
                                <div key={idx} className="flex items-center justify-between text-xs bg-slate-50 p-2 rounded border border-slate-100">
                                  <div className="flex items-center space-x-2 text-slate-700 font-medium">
                                    <FileText className="h-4 w-4 text-[#468CDC]" />
                                    <span className="truncate max-w-[150px]">{doc}</span>
                                  </div>
                                  <button 
                                    onClick={() => {
                                      setJobs(prevJobs => prevJobs.map(j => {
                                        if (j.id === selectedJob.id) {
                                          return { ...j, documents: j.documents.filter((_, i) => i !== idx) };
                                        }
                                        return j;
                                      }));
                                    }}
                                    className="text-red-400 hover:text-red-600 p-0.5"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Dashed Drag/Upload Area */}
                        <div 
                          onClick={() => handleDocumentUpload(`Contractor_Bid_Assigned_${Math.floor(Math.random() * 9000)}.pdf`)}
                          className="border-2 border-dashed border-slate-200 hover:border-[#468CDC] bg-slate-50/50 hover:bg-slate-50 rounded-xl p-6 text-center cursor-pointer transition-all mt-4"
                        >
                          <UploadCloud className="h-7 w-7 text-slate-400 mx-auto mb-2" />
                          <div className="text-xs font-bold text-slate-700">
                            Drag & Drop or <span className="text-[#2F74CF] underline">Choose file</span> to upload
                          </div>
                          <p className="text-[10px] text-slate-400 mt-1">PDF, DOC, JPEG supported</p>
                        </div>
                      </div>

                      {/* Invoices Box */}
                      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-4 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                            <h3 className="text-xs font-extrabold tracking-wider uppercase text-slate-500">
                              Invoices
                            </h3>
                            <button 
                              onClick={() => handleInvoiceUpload(`Plumbing_Invoice_${Math.floor(Math.random() * 9000)}.pdf`)}
                              className="px-2.5 py-1 bg-[#98C44E] hover:bg-[#85b03f] text-white text-[10px] font-bold rounded shadow-sm"
                            >
                              UPLOAD INVOICE
                            </button>
                          </div>

                          {selectedJob.invoices.length > 0 ? (
                            <div className="mt-3 space-y-2">
                              {selectedJob.invoices.map((inv, idx) => (
                                <div key={idx} className="flex items-center justify-between text-xs bg-slate-50 p-2 rounded border border-slate-100">
                                  <div className="flex items-center space-x-2 text-slate-700 font-medium">
                                    <FileText className="h-4 w-4 text-[#98C44E]" />
                                    <span className="truncate max-w-[150px]">{inv}</span>
                                  </div>
                                  <button 
                                    onClick={() => {
                                      setJobs(prevJobs => prevJobs.map(j => {
                                        if (j.id === selectedJob.id) {
                                          return { ...j, invoices: j.invoices.filter((_, i) => i !== idx) };
                                        }
                                        return j;
                                      }));
                                    }}
                                    className="text-red-400 hover:text-red-600 p-0.5"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-6 text-slate-400 text-xs italic mt-2">
                              No invoices uploaded yet.
                            </div>
                          )}
                        </div>

                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-[11px] text-slate-500 leading-relaxed">
                          Invoices are programmatically checked against B2B limits and SOC2 requirements prior to carrier payouts.
                        </div>
                      </div>

                    </div>

                    {/* Message Portal Box */}
                    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col h-[400px]">
                      <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                        <h3 className="text-xs font-extrabold tracking-wider uppercase text-slate-800">
                          Message Portal
                        </h3>
                        <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                          Real-time dispatcher channel
                        </span>
                      </div>

                      {/* Messages scroll section */}
                      <div className="flex-grow p-4 overflow-y-auto space-y-4 flex flex-col">
                        {selectedJob.chatHistory.length === 0 ? (
                          <div className="text-center text-slate-400 text-xs italic my-auto">
                            No chat history. Send a message to start communicating with the contractor.
                          </div>
                        ) : (
                          selectedJob.chatHistory.map((chat, idx) => (
                            <div 
                              key={idx} 
                              className={`flex flex-col max-w-[70%] ${chat.isSelf ? 'align-self-end ml-auto' : 'align-self-start mr-auto'}`}
                            >
                              <div className="flex justify-between items-center text-[10px] text-slate-400 px-1 mb-1">
                                <span className="font-bold">{chat.sender}</span>
                                <span className="ml-2 font-mono">{chat.date}</span>
                              </div>
                              <div className={`p-3 rounded-2xl text-xs font-semibold ${
                                chat.isSelf 
                                  ? 'bg-[#98C44E] text-white rounded-tr-none shadow-sm' 
                                  : 'bg-[#F1F5F9] text-slate-800 rounded-tl-none border border-slate-200'
                              }`}>
                                {chat.text}
                              </div>
                            </div>
                          ))
                        )}
                        <div ref={chatBottomRef} />
                      </div>

                      {/* Message input bar */}
                      <form onSubmit={handleSendMessage} className="p-3 bg-slate-50 border-t border-slate-200 flex items-center space-x-2">
                        <input
                          type="text"
                          placeholder="Type a message..."
                          value={chatMessageText}
                          onChange={(e) => setChatMessageText(e.target.value)}
                          className="flex-grow bg-white border border-slate-200 rounded-full px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#468CDC]"
                        />
                        <button
                          type="submit"
                          className="h-9 w-9 bg-[#98C44E] hover:bg-[#85b03f] text-white rounded-full flex items-center justify-center shadow-sm transition-colors flex-shrink-0 focus:outline-none"
                        >
                          <Send className="h-4 w-4" />
                        </button>
                      </form>

                    </div>

                  </div>

                </div>

              </motion.div>
            )}

          </div>
        )}

        {/* VIEW: Map view */}
        {currentTab === 'map' && (
          <div className="space-y-6">
            
            {/* Map Stage Header */}
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setCurrentTab('jobs')}
                className="flex items-center space-x-1 px-2.5 py-1 bg-white border border-slate-200 rounded-md hover:bg-slate-50 text-xs font-bold text-slate-600 transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back</span>
              </button>
              <h1 className="text-3xl font-extrabold text-[#468CDC] tracking-tight">Map</h1>
            </div>

            {/* Map Canvas & Layers Container */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Map Canvas Stages (lg:col-span-9) */}
              <div className="lg:col-span-9 bg-slate-100 rounded-2xl border border-slate-200 shadow-sm relative h-[600px] overflow-hidden flex flex-col justify-between">
                
                {/* Embedded Map Canvas representation */}
                <div className="absolute inset-0 z-0 bg-[#AAD3DF] flex items-center justify-center select-none overflow-hidden">
                  
                  {/* Custom Florida SVG/Path Mock drawing */}
                  <div className="relative w-full h-full">
                    {/* Ocean Waves Grid */}
                    <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#1E40AF_1px,transparent_1px)] [background-size:16px_16px]" />
                    
                    {/* The Land Mass Peninsula */}
                    <svg viewBox="0 0 800 600" className="w-full h-full text-[#E6F3E6] drop-shadow-md">
                      {/* Gulf Coast State Lines and Florida outline */}
                      <path 
                        d="M 50 100 L 150 110 L 250 115 L 350 130 L 400 135 L 430 180 Q 450 210 490 280 T 540 380 T 580 480 T 610 550 Q 612 555 615 550 Q 610 510 590 460 T 575 350 T 565 240 L 510 230 L 480 220 L 420 180 L 410 160 L 415 150 L 800 150 L 800 600 L 50 600 Z" 
                        fill="#F3F9F1" 
                        stroke="#B4D3B4" 
                        strokeWidth="2"
                      />
                      {/* Land Outlines */}
                      <path 
                        d="M 430 180 Q 450 210 490 280 T 540 380 T 580 480 T 610 550" 
                        fill="none" 
                        stroke="#95C295" 
                        strokeWidth="3" 
                        strokeDasharray="1 4"
                      />
                    </svg>

                    {/* Google Logo Watermark bottom left */}
                    <div className="absolute bottom-3 left-4 flex items-center space-x-1 bg-white/60 px-2 py-0.5 rounded text-[10px] font-bold text-slate-500 border border-slate-100">
                      <span className="text-blue-500">G</span>
                      <span className="text-red-500">o</span>
                      <span className="text-yellow-500">o</span>
                      <span className="text-blue-500">g</span>
                      <span className="text-green-500">l</span>
                      <span className="text-red-500">e</span>
                    </div>

                    {/* Google Keyboard Short-cut overlay bottom right */}
                    <div className="absolute bottom-3 right-4 bg-white/70 px-2 py-0.5 rounded text-[9px] font-medium text-slate-500 border border-slate-100 flex items-center space-x-2">
                      <button className="hover:underline">Keyboard shortcuts</button>
                      <span>|</span>
                      <span>Map data ©2026 Google, INEGI</span>
                      <span>|</span>
                      <button className="hover:underline">Terms</button>
                    </div>

                    {/* Dense Properties Managed Layer (hundreds of tiny blue squares) */}
                    {layerProperties && (
                      <div className="absolute inset-0 pointer-events-none z-10 animate-fade-in">
                        {/* Dense scatter representation within Florida coords */}
                        {[
                          { t: '160px', l: '440px' }, { t: '175px', l: '435px' }, { t: '185px', l: '445px' }, { t: '200px', l: '450px' },
                          { t: '210px', l: '460px' }, { t: '220px', l: '455px' }, { t: '235px', l: '465px' }, { t: '250px', l: '475px' },
                          { t: '260px', l: '470px' }, { t: '275px', l: '480px' }, { t: '290px', l: '485px' }, { t: '305px', l: '495px' },
                          { t: '320px', l: '490px' }, { t: '335px', l: '500px' }, { t: '350px', l: '510px' }, { t: '360px', l: '505px' },
                          { t: '375px', l: '515px' }, { t: '390px', l: '525px' }, { t: '405px', l: '520px' }, { t: '420px', l: '530px' },
                          { t: '430px', l: '540px' }, { t: '445px', l: '535px' }, { t: '460px', l: '545px' }, { t: '475px', l: '555px' },
                          { t: '490px', l: '550px' }, { t: '505px', l: '560px' }, { t: '520px', l: '570px' }, { t: '535px', l: '565px' },
                          { t: '540px', l: '575px' }, { t: '550px', l: '585px' }, { t: '240px', l: '430px' }, { t: '255px', l: '440px' },
                          { t: '270px', l: '450px' }, { t: '280px', l: '445px' }, { t: '295px', l: '455px' }, { t: '310px', l: '465px' },
                          { t: '325px', l: '460px' }, { t: '340px', l: '470px' }, { t: '355px', l: '480px' }, { t: '370px', l: '475px' },
                          { t: '385px', l: '485px' }, { t: '400px', l: '495px' }, { t: '415px', l: '490px' }, { t: '430px', l: '500px' },
                          { t: '445px', l: '510px' }, { t: '460px', l: '505px' }, { t: '475px', l: '515px' }, { t: '490px', l: '525px' },
                          { t: '500px', l: '530px' }, { t: '515px', l: '525px' }, { t: '525px', l: '535px' }, { t: '535px', l: '545px' }
                        ].map((pos, idx) => (
                          <div 
                            key={idx} 
                            style={{ top: pos.t, left: pos.l }} 
                            className="absolute h-2.5 w-2.5 bg-[#2F74CF] border border-white rounded shadow-sm opacity-90 scale-90" 
                          />
                        ))}
                      </div>
                    )}

                    {/* Vetted Contractors Layer (Orange circles with white dots) */}
                    {layerContractors && (
                      <div className="absolute inset-0 pointer-events-none z-20">
                        {/* Map Points */}
                        {[
                          { t: '145px', l: '425px', label: 'Jax Contractors' },
                          { t: '220px', l: '444px', label: 'Palm Coast Vetted' },
                          { t: '250px', l: '452px', label: 'Daytona Plumbing' },
                          { t: '310px', l: '460px', label: 'Orlando mitigation' },
                          { t: '360px', l: '420px', label: 'Tampa Sparky' }
                        ].map((pos, idx) => (
                          <div 
                            key={idx} 
                            style={{ top: pos.t, left: pos.l }} 
                            className="absolute flex items-center justify-center h-5 w-5 bg-[#F97316] border-2 border-white rounded-full shadow-md animate-bounce"
                          >
                            <div className="h-1.5 w-1.5 bg-white rounded-full" />
                            {/* Small Tooltip name */}
                            <span className="absolute top-6 bg-slate-900/90 text-white text-[8px] font-bold px-1 py-0.5 rounded shadow whitespace-nowrap pointer-events-none scale-0 group-hover:scale-100 transition-transform">
                              {pos.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Job Locations Layer (Green dots with white centers) */}
                    {layerJobs && (
                      <div className="absolute inset-0 pointer-events-none z-20">
                        {/* MPM_15 is at Palm Coast */}
                        <div 
                          style={{ top: '210px', l: '446px', left: '446px' }} 
                          className="absolute flex items-center justify-center h-6 w-6 bg-[#98C44E] border-2 border-white rounded-full shadow-lg"
                        >
                          <div className="h-2 w-2 bg-white rounded-full" />
                          {/* Label Badge */}
                          <span className="absolute -top-5 bg-[#2F74CF] text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                            MPM_15
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Weather Radar Overlays */}
                    {radarActive && (
                      <div className="absolute inset-0 pointer-events-none z-30 opacity-70 transition-all duration-300">
                        {/* Radial weather storm cloud cells mimicking real radar sweeps */}
                        <div 
                          style={{ 
                            top: '180px', 
                            left: '300px', 
                            width: '280px', 
                            height: '240px',
                            background: `radial-gradient(circle, rgba(239,68,68,0.7) ${radarFrame - 40}%, rgba(249,115,22,0.5) ${radarFrame - 20}%, rgba(132,204,22,0.3) ${radarFrame}%, transparent 80%)` 
                          }} 
                          className="absolute rounded-full filter blur-md transition-all duration-200" 
                        />
                        <div 
                          style={{ 
                            top: '300px', 
                            left: '420px', 
                            width: '220px', 
                            height: '200px',
                            background: `radial-gradient(circle, rgba(239,68,68,0.6) ${100 - radarFrame}%, rgba(249,115,22,0.4) ${120 - radarFrame}%, rgba(34,197,94,0.2) ${140 - radarFrame}%, transparent 85%)` 
                          }} 
                          className="absolute rounded-full filter blur-lg transition-all duration-200" 
                        />
                      </div>
                    )}

                    {/* Active Warning Alerts Translucent Polygons (Screenshot 9) */}
                    {alertsActive && (
                      <div className="absolute inset-0 pointer-events-none z-30 animate-fade-in">
                        {/* Custom polygon highlights on Coastal and Orlando counties */}
                        <svg className="w-full h-full">
                          {/* Tornado alert polygon - red */}
                          <polygon 
                            points="420,180 500,210 470,260 410,230" 
                            fill="rgba(239, 68, 68, 0.25)" 
                            stroke="rgba(239, 68, 68, 0.8)" 
                            strokeWidth="1.5" 
                            strokeDasharray="4"
                          />
                          {/* Severe Thunderstorm - orange */}
                          <polygon 
                            points="450,250 540,280 510,340 430,300" 
                            fill="rgba(249, 115, 22, 0.2)" 
                            stroke="rgba(249, 115, 22, 0.7)" 
                            strokeWidth="1.5"
                          />
                          {/* Flood Warning - blue */}
                          <polygon 
                            points="480,330 560,370 530,420 460,380" 
                            fill="rgba(59, 130, 246, 0.2)" 
                            stroke="rgba(59, 130, 246, 0.7)" 
                            strokeWidth="1.5"
                          />
                        </svg>

                        {/* Custom warning badges on map */}
                        <div style={{ top: '200px', left: '440px' }} className="absolute bg-red-600 text-white text-[8px] font-bold px-1 py-0.5 rounded flex items-center space-x-0.5">
                          <AlertCircle className="h-2.5 w-2.5" />
                          <span>TORNADO WARNING</span>
                        </div>
                        <div style={{ top: '280px', left: '460px' }} className="absolute bg-orange-500 text-white text-[8px] font-bold px-1 py-0.5 rounded flex items-center space-x-0.5">
                          <AlertCircle className="h-2.5 w-2.5" />
                          <span>SVR T-STORM</span>
                        </div>
                      </div>
                    )}

                  </div>

                </div>

                {/* Left Floating overlay Map Layers Controls (Screenshot 6/7) */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur border border-slate-200 rounded-xl p-4 shadow-lg z-20 w-52 space-y-3">
                  <h3 className="text-[11px] font-extrabold uppercase text-slate-500 tracking-wider border-b border-slate-150 pb-1.5">
                    Map Layers
                  </h3>
                  
                  <div className="space-y-2.5">
                    {/* Switch 1: Job Locations */}
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <div className="flex items-center space-x-2">
                        <span className="h-2.5 w-2.5 bg-[#98C44E] rounded-full" />
                        <span className="text-slate-600">Job Locations</span>
                      </div>
                      <button 
                        onClick={() => setLayerJobs(!layerJobs)}
                        className={`w-9 h-5 rounded-full p-0.5 transition-colors focus:outline-none ${layerJobs ? 'bg-[#98C44E]' : 'bg-slate-300'}`}
                      >
                        <div className={`bg-white w-4 h-4 rounded-full shadow transition-transform ${layerJobs ? 'translate-x-4' : ''}`} />
                      </button>
                    </div>

                    {/* Switch 2: Properties managed */}
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <div className="flex items-center space-x-2">
                        <span className="h-2.5 w-2.5 bg-[#2F74CF] rounded-full" />
                        <span className="text-slate-600">Properties</span>
                      </div>
                      <button 
                        onClick={() => setLayerProperties(!layerProperties)}
                        className={`w-9 h-5 rounded-full p-0.5 transition-colors focus:outline-none ${layerProperties ? 'bg-[#2F74CF]' : 'bg-slate-300'}`}
                      >
                        <div className={`bg-white w-4 h-4 rounded-full shadow transition-transform ${layerProperties ? 'translate-x-4' : ''}`} />
                      </button>
                    </div>

                    {/* Switch 3: Contractors */}
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <div className="flex items-center space-x-2">
                        <span className="h-2.5 w-2.5 bg-[#F97316] rounded-full" />
                        <span className="text-slate-600">Contractors</span>
                      </div>
                      <button 
                        onClick={() => setLayerContractors(!layerContractors)}
                        className={`w-9 h-5 rounded-full p-0.5 transition-colors focus:outline-none ${layerContractors ? 'bg-[#F97316]' : 'bg-slate-300'}`}
                      >
                        <div className={`bg-white w-4 h-4 rounded-full shadow transition-transform ${layerContractors ? 'translate-x-4' : ''}`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Floating Overlay WEATHER collapsible banner (Screenshot 8/9) */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur border border-slate-200 rounded-xl shadow-lg z-20 w-64 overflow-hidden">
                  {/* Weather Header Blue strip */}
                  <button 
                    onClick={() => setWeatherOpen(!weatherOpen)}
                    className="w-full bg-[#2F74CF] hover:bg-[#1E40AF] text-white px-4 py-2.5 flex items-center justify-between text-xs font-extrabold uppercase tracking-wider focus:outline-none transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <CloudLightning className="h-4 w-4" />
                      <span>Weather</span>
                    </div>
                    <ChevronDown className={`h-4 w-4 transition-transform ${weatherOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {weatherOpen && (
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden bg-white px-4 py-3.5 space-y-3 text-xs"
                      >
                        {/* Radar Switch */}
                        <div className="flex items-center justify-between font-bold text-slate-700">
                          <span>Radar</span>
                          <button 
                            onClick={() => { setRadarActive(!radarActive); if (!radarActive) setRadarPlay(true); }}
                            className={`w-9 h-5 rounded-full p-0.5 transition-colors focus:outline-none ${radarActive ? 'bg-[#2F74CF]' : 'bg-slate-300'}`}
                          >
                            <div className={`bg-white w-4 h-4 rounded-full shadow transition-transform ${radarActive ? 'translate-x-4' : ''}`} />
                          </button>
                        </div>

                        {/* Radar Play Slider (Screenshot 8) */}
                        {radarActive && (
                          <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg space-y-1.5 animate-fade-in">
                            <div className="flex items-center justify-between text-[10px] text-slate-500 font-extrabold">
                              <span>5:10 PM (forecast)</span>
                              <span className="font-mono text-[#2F74CF]">{radarFrame}%</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button 
                                onClick={() => setRadarPlay(!radarPlay)}
                                className="h-6 w-6 bg-[#2F74CF] hover:bg-[#1E40AF] text-white rounded-full flex items-center justify-center shadow focus:outline-none"
                              >
                                {radarPlay ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 pl-0.5" />}
                              </button>
                              <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                value={radarFrame} 
                                onChange={(e) => { setRadarFrame(parseInt(e.target.value)); setRadarPlay(false); }}
                                className="flex-grow accent-[#2F74CF] h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                              />
                            </div>
                          </div>
                        )}

                        {/* Active Alerts Switch */}
                        <div className="flex items-center justify-between font-bold text-slate-700">
                          <span>Active Alerts</span>
                          <button 
                            onClick={() => setAlertsActive(!alertsActive)}
                            className={`w-9 h-5 rounded-full p-0.5 transition-colors focus:outline-none ${alertsActive ? 'bg-[#98C44E]' : 'bg-slate-300'}`}
                          >
                            <div className={`bg-white w-4 h-4 rounded-full shadow transition-transform ${alertsActive ? 'translate-x-4' : ''}`} />
                          </button>
                        </div>

                        {/* Expanded Alerts checkboxes details (Screenshot 9) */}
                        {alertsActive && (
                          <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-lg text-[10px] space-y-1.5 font-bold animate-fade-in">
                            <div className="flex items-center space-x-2 text-slate-600">
                              <span className="h-2 w-2 rounded bg-red-500" />
                              <label className="flex items-center space-x-1 cursor-pointer">
                                <input type="checkbox" defaultChecked className="rounded accent-red-600" />
                                <span>Tornado</span>
                              </label>
                            </div>
                            <div className="flex items-center space-x-2 text-slate-600">
                              <span className="h-2 w-2 rounded bg-orange-400" />
                              <label className="flex items-center space-x-1 cursor-pointer">
                                <input type="checkbox" defaultChecked className="rounded accent-orange-400" />
                                <span>Severe Thunderstorm</span>
                              </label>
                            </div>
                            <div className="flex items-center space-x-2 text-slate-600">
                              <span className="h-2 w-2 rounded bg-purple-500" />
                              <label className="flex items-center space-x-1 cursor-pointer">
                                <input type="checkbox" defaultChecked className="rounded accent-purple-500" />
                                <span>Hurricane / Tropical</span>
                              </label>
                            </div>
                            <div className="flex items-center space-x-2 text-slate-600">
                              <span className="h-2 w-2 rounded bg-sky-400" />
                              <label className="flex items-center space-x-1 cursor-pointer">
                                <input type="checkbox" defaultChecked className="rounded accent-sky-400" />
                                <span>Flood</span>
                              </label>
                            </div>
                            <div className="flex items-center space-x-2 text-slate-600">
                              <span className="h-2 w-2 rounded bg-blue-700" />
                              <label className="flex items-center space-x-1 cursor-pointer">
                                <input type="checkbox" defaultChecked className="rounded accent-blue-700" />
                                <span>Winter Storm</span>
                              </label>
                            </div>
                            <div className="flex items-center space-x-2 text-slate-600">
                              <span className="h-2 w-2 rounded bg-slate-400" />
                              <label className="flex items-center space-x-1 cursor-pointer">
                                <input type="checkbox" defaultChecked className="rounded accent-slate-400" />
                                <span>Other Alerts</span>
                              </label>
                            </div>
                          </div>
                        )}

                        {/* CAT Tracker Switch */}
                        <div className="flex items-center justify-between font-bold text-slate-700">
                          <span>CAT Tracker</span>
                          <button 
                            onClick={() => setCatTrackerActive(!catTrackerActive)}
                            className={`w-9 h-5 rounded-full p-0.5 transition-colors focus:outline-none ${catTrackerActive ? 'bg-[#2F74CF]' : 'bg-slate-300'}`}
                          >
                            <div className={`bg-white w-4 h-4 rounded-full shadow transition-transform ${catTrackerActive ? 'translate-x-4' : ''}`} />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>

              {/* Sidebar Quick panel for Map references */}
              <div className="lg:col-span-3 space-y-6">
                
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 space-y-4">
                  <h3 className="text-xs font-extrabold uppercase text-slate-500 tracking-wider border-b border-slate-100 pb-2">
                    Dispatched Markers
                  </h3>
                  
                  <div className="space-y-3.5 text-xs">
                    {jobs.map((j) => (
                      <div 
                        key={j.id} 
                        onClick={() => { setCurrentTab('jobs'); setSelectedJobId(j.id); }}
                        className="p-3 bg-slate-50 border border-slate-100 rounded-lg hover:border-[#468CDC] cursor-pointer transition-all flex justify-between items-start"
                      >
                        <div>
                          <span className="font-extrabold text-slate-800 block text-[11px]">{j.id}</span>
                          <span className="text-slate-500 text-[10px] mt-0.5 block leading-normal">{j.address}</span>
                        </div>
                        <span className="font-extrabold text-[9px] uppercase bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
                          {j.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#2F74CF] text-white rounded-xl shadow-md p-5 space-y-3.5">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="h-5 w-5" />
                    <span className="text-xs font-extrabold tracking-wider uppercase">Vetted Properties Map</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-blue-50 font-medium">
                    Legacy Property Management manages over 50 structural assets in Coastal and Central Florida. Turn on the <strong>Properties</strong> layer overlay to preview your asset dense squares on the live grid!
                  </p>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* VIEW: Contractors List tab */}
        {currentTab === 'contractors' && (
          <div className="space-y-6">
            <h1 className="text-3xl font-extrabold text-[#98C44E] tracking-tight">Contractors</h1>
            
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                Pre-Vetted B2B Vendor Compliance Network
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse font-medium">
                  <thead>
                    <tr className="bg-[#468CDC] text-white font-bold">
                      <th className="py-3 px-4">COMPANY NAME</th>
                      <th className="py-3 px-4">TRADE CATEGORY</th>
                      <th className="py-3 px-4">PHONE NUMBER</th>
                      <th className="py-3 px-4">EMAIL</th>
                      <th className="py-3 px-4">AVERAGE RATING</th>
                      <th className="py-3 px-4">COMPLIANCE STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {contractors.map((vendor, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-slate-900">{vendor.name}</td>
                        <td className="py-3.5 px-4 text-slate-600 font-semibold">{vendor.trade}</td>
                        <td className="py-3.5 px-4 text-slate-500 font-mono">{vendor.phone}</td>
                        <td className="py-3.5 px-4 text-slate-500 font-mono">{vendor.email}</td>
                        <td className="py-3.5 px-4 font-bold text-yellow-500">{vendor.rating}</td>
                        <td className="py-3.5 px-4">
                          <span className="text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded border border-green-100">
                            {vendor.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Footer Branding Area */}
      <footer className="bg-[#468CDC] text-white py-10 px-6 border-t border-[#2c72cf]/30 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center space-y-3.5">
          <MyProMarketLogo size="md" />
          <div className="text-xs text-white/80 font-bold tracking-wide">
            © Copyright 2026 MyPro Market All Rights Reserved
          </div>
        </div>
      </footer>

      {/* MODAL 1: Invite User Modal (Screenshot 4) */}
      <AnimatePresence>
        {inviteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop click to close */}
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setInviteModalOpen(false)} />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden w-full max-w-md z-10 p-6 space-y-4"
            >
              {/* Header */}
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900 flex items-center space-x-1.5">
                    <UserPlus className="h-5 w-5 text-[#2F74CF]" />
                    <span>Invite User to Job #{selectedJobId || 'MPM_15'}</span>
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    Invite a user to access this job. They'll receive an email with a link to log in or create an account.
                  </p>
                </div>
                <button 
                  onClick={() => setInviteModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleInviteSubmit} className="space-y-4 text-xs font-semibold">
                <div>
                  <label className="block text-slate-500 uppercase tracking-wider mb-1.5 text-[9px] font-bold">
                    NEW USER TYPE *
                  </label>
                  <select 
                    value={inviteType}
                    onChange={(e) => setInviteType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 font-bold focus:outline-none"
                  >
                    <option value="Homeowner">Homeowner</option>
                    <option value="Tenant">Tenant</option>
                    <option value="Manager">Manager</option>
                    <option value="Contractor">Contractor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-500 uppercase tracking-wider mb-1.5 text-[9px] font-bold">
                    NEW USER NAME *
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder="Full Name"
                    value={inviteName}
                    onChange={(e) => setInviteName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 uppercase tracking-wider mb-1.5 text-[9px] font-bold">
                    NEW USER EMAIL *
                  </label>
                  <input 
                    type="email"
                    required
                    placeholder="user@example.com"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
                  />
                </div>

                {/* Form Buttons */}
                <div className="flex justify-end space-x-2.5 pt-2 border-t border-slate-100">
                  <button 
                    type="button"
                    onClick={() => setInviteModalOpen(false)}
                    className="px-4 py-2 border-2 border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-bold text-slate-500"
                  >
                    CANCEL
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-[#2F74CF] hover:bg-[#1E40AF] text-white rounded-lg text-xs font-bold shadow shadow-blue-100 flex items-center space-x-1"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>ADD USER & SEND EMAIL</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: New Assignment Modal (Screenshot 11) */}
      <AnimatePresence>
        {assignmentModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop click to close */}
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setAssignmentModalOpen(false)} />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden w-full max-w-md z-10 p-6 space-y-4"
            >
              {/* Header */}
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900">New Assignment</h3>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    Select an assignment type to add to this job:
                  </p>
                </div>
                <button 
                  onClick={() => setAssignmentModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* radio checklist scrollable container */}
              <div className="border border-slate-200 rounded-lg max-h-56 overflow-y-auto divide-y divide-slate-150 p-1.5 bg-slate-50 text-xs font-semibold text-slate-700">
                {[
                  'Contents',
                  'Electrical',
                  'Fencing',
                  'Fire/Smoke Remediation',
                  'Home Inspection',
                  'Plumbing',
                  'Roofing Repair',
                  'Drywall & Renovation',
                  'Water Mitigation'
                ].map((type) => (
                  <label 
                    key={type} 
                    className="flex items-center space-x-3 p-2.5 hover:bg-white rounded cursor-pointer transition-colors"
                  >
                    <input 
                      type="radio" 
                      name="new_asg_radio" 
                      value={type}
                      checked={selectedNewAssignmentType === type}
                      onChange={() => setSelectedNewAssignmentType(type)}
                      className="h-4.5 w-4.5 accent-[#98C44E] cursor-pointer"
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>

              {/* Form Buttons */}
              <div className="flex justify-end space-x-2.5 pt-2 border-t border-slate-100">
                <button 
                  type="button"
                  onClick={() => setAssignmentModalOpen(false)}
                  className="px-4 py-2 border-2 border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-bold text-slate-500"
                >
                  CANCEL
                </button>
                <button 
                  type="button"
                  onClick={handleAddAssignmentSubmit}
                  className="px-4 py-2 bg-[#98C44E] hover:bg-[#85b03f] text-white rounded-lg text-xs font-bold shadow shadow-[#98C44E]/10"
                >
                  ADD ASSIGNMENT
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 3: Create Job Modal */}
      <AnimatePresence>
        {createJobModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop click to close */}
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setCreateJobModalOpen(false)} />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden w-full max-w-md z-10 p-6 space-y-4"
            >
              {/* Header */}
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900">Create New Dispatch Job</h3>
                  <p className="text-[11px] text-slate-500">
                    Instantly create a new property loss job and trigger compliance vetting loops.
                  </p>
                </div>
                <button 
                  onClick={() => setCreateJobModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleCreateJobSubmit} className="space-y-4 text-xs font-semibold">
                <div>
                  <label className="block text-slate-500 uppercase tracking-wider mb-1 text-[9px] font-bold">
                    PROPERTY STREET ADDRESS *
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. 110 S. Starling Dr"
                    value={newJobAddress}
                    onChange={(e) => setNewJobAddress(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 uppercase tracking-wider mb-1 text-[9px] font-bold">
                    ZIP CODE *
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. 32164"
                    value={newJobZipCode}
                    onChange={(e) => setNewJobZipCode(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 uppercase tracking-wider mb-1 text-[9px] font-bold">
                    CUSTOMER / CONTACT FULL NAME
                  </label>
                  <input 
                    type="text"
                    placeholder="e.g. Kerrie Ruland"
                    value={newJobCustomerName}
                    onChange={(e) => setNewJobCustomerName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 uppercase tracking-wider mb-1 text-[9px] font-bold">
                    CUSTOMER PHONE NUMBER
                  </label>
                  <input 
                    type="text"
                    placeholder="e.g. (352) 535-5737"
                    value={newJobCustomerPhone}
                    onChange={(e) => setNewJobCustomerPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none font-mono"
                  />
                </div>

                {/* Form Buttons */}
                <div className="flex justify-end space-x-2.5 pt-2 border-t border-slate-100">
                  <button 
                    type="button"
                    onClick={() => setCreateJobModalOpen(false)}
                    className="px-4 py-2 border-2 border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-bold text-slate-500"
                  >
                    CANCEL
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-[#98C44E] hover:bg-[#85b03f] text-white rounded-lg text-xs font-bold shadow shadow-[#98C44E]/10"
                  >
                    CREATE DISPATCH
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
