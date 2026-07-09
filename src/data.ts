import { Product, Audience } from './types';

export const products: Product[] = [
  {
    id: 'market',
    name: 'MyPro Market',
    tagline: 'The Property Damage Claims & Dispatch Network',
    description: 'Our flagship B2B platform connects insurance carriers, property managers, and vetted contractors in a seamless, automated workflow. Accelerate response times, ensure compliance, and achieve full transparent tracking from dispatch to audit.',
    status: 'active',
    badge: 'Core Platform',
    features: [
      'Automated dispatch matching with background-vetted pros',
      'Real-time claims milestone tracking & photo documentation',
      'Integrated compliance, licensing, and insurance verification',
      'Direct-To-Contractor Job Assignments'
    ],
    benefits: [
      'Reduces claims cycle duration by up to 40%',
      'Eliminates unvetted contractor liability risks',
      'Boosts policyholder satisfaction scores by 18pt+'
    ],
    externalUrl: 'https://mypromarket.co'
  },
  {
    id: 'readyhub',
    name: 'MyPro Ready Hub',
    tagline: 'Disaster Preparedness & AI Content Inventory',
    description: 'Empower your household or tenants and protect your assets. MyPro Ready Hub provides interactive disaster checklists, an AI-powered room content inventory scanner from video, a secure document & prescription cabinet, and localized real-time disaster alerts.',
    status: 'active',
    badge: 'New Launch',
    features: [
      'Interactive disaster-specific checklists (Hurricanes, Wildfires, Floods, Freezes)',
      'AI room inventory scanner generating contents lists from video walkthroughs',
      'Secure digital cabinet for vital prescriptions and insurance documents',
      'Real-time disaster alerts and evacuation guidelines based on your Zip Code'
    ],
    benefits: [
      'Reduces pre-evacuation stress and accelerates checklist tracking',
      'Generates direct proof of contents for 100% accurate insurance payouts',
      'Keeps medical lists and vital documents secure and accessible offline'
    ]
  },
  {
    id: 'claimassist',
    name: 'MyPro Claim Assist',
    tagline: 'Insurance Claims Management & Documentation for Homeowners',
    description: 'Empowering homeowners through complex recovery. MyPro Claim Assist is a dedicated, secure application designed specifically to help homeowners organize, document, and manage their property damage claims, communications, and repair receipts.',
    status: 'upcoming',
    badge: 'Coming Soon',
    features: [
      'Step-by-step claims roadmaps customized to your insurance carrier',
      'Receipt & estimate organizer to keep track of every repair expense',
      'Secure claims communications log with adjusters and contractors',
      'Interactive checklist to identify overlooked claim line items'
    ],
    benefits: [
      'Helps homeowners secure higher, fairer claim payouts from carriers',
      'Dramatically reduces anxiety and administrative confusion during repairs',
      'Maintains an audit-ready digital folder of all claim and construction records'
    ]
  }
];

export const audiences: Audience[] = [
  {
    id: 'carriers',
    title: 'Insurance Carriers',
    icon: 'Shield',
    tagline: 'Slash Claims Cycle Times and Control Leakage',
    burden: 'Carriers are bogged down by delayed damage reports, lack of field transparency, and bloated administrative costs from manually auditing contractor invoices.',
    solution: 'MyPro provides instant programmatic dispatch to 100% vetted, compliant local contractors. Complete real-time photo/video evidence and automated invoice validation ensure audit-ready files.',
    keyBenefits: [
      'Real-time milestone reporting from the field',
      'Programmatic fraud and invoice-inflation mitigation',
      'Dramatically higher Policyholder Net Promoter Scores (NPS)'
    ],
    stats: {
      label: 'Avg Cycle Reduction',
      value: '40%',
      description: 'from claim report to final vetted closure.'
    }
  },
  {
    id: 'managers',
    title: 'Property Managers',
    icon: 'Building',
    tagline: 'Streamline Portfolio Upkeep & Mitigate Risk',
    burden: 'Managing reactive maintenance across hundreds of doors means dealing with unreliable vendors, liability risks from unvetted labor, and frustrated residents.',
    solution: 'Deploy a single automated dashboard. Residents report issues, and MyPro instantly schedules verified, insured pros, tracking completion milestones transparently.',
    keyBenefits: [
      'Automated tenant notification and status updates',
      'Guaranteed compliance checks on 100% of field labor',
      'Consolidated, portfolio-wide billing and tax documentation'
    ],
    stats: {
      label: 'Staff Hours Saved',
      value: '18 hr',
      description: 'saved per week on maintenance administration.'
    }
  },
  {
    id: 'consumers',
    title: 'Property Owners & Consumers',
    icon: 'Home',
    tagline: 'Trust, Transparency, and Stress-Free Recovery',
    burden: 'After experiencing property damage, owners are left anxious, cold-called by non-vetted contractors, and blind to the status of their insurance claims.',
    solution: 'Get a clear, visual tracker of your claim progress. Rest easy knowing every contractor entering your home has passed strict safety, license, and background vetting.',
    keyBenefits: [
      'Visual timeline from initial damage inspection to sign-off',
      'Direct secure messaging with verified service professionals',
      'No surprise fees - full transparency backed by carrier pre-approvals'
    ],
    stats: {
      label: 'Customer Rating',
      value: '4.9/5',
      description: 'average customer satisfaction index for dispatched work.'
    }
  },
  {
    id: 'contractors',
    title: 'Contractors',
    icon: 'Briefcase',
    tagline: 'Focus on Craft, Not Chasing Invoices',
    burden: 'Contractors spend over 30% of their time bidding on jobs, driving across town for estimates, and waiting 60+ days for insurance carrier approvals.',
    solution: 'Receive clean, pre-scoped claims directly within your service radius. Achieve faster payouts via standardized electronic funds transfer upon digital proof-of-work.',
    keyBenefits: [
      'Zero customer-acquisition cost (CAC) for dispatched work',
      'Pre-approved scopes of work matching local carrier criteria',
      'Digital sign-off triggers automated payout routing'
    ],
    stats: {
      label: 'Days to Payment',
      value: '< 5 days',
      description: 'average billing-to-payout cycle on MyPro network.'
    }
  }
];
