export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  status: 'active' | 'beta' | 'upcoming' | 'testing';
  badge?: string;
  features: string[];
  benefits: string[];
  externalUrl?: string;
}

export interface Audience {
  id: string;
  title: string;
  icon: string; // Lucide icon name
  tagline: string;
  burden: string;
  solution: string;
  keyBenefits: string[];
  stats: { label: string; value: string; description: string };
}

export interface DemoInquiry {
  productId: string;
  audienceId: string;
  fullName: string;
  email: string;
  companyName: string;
  phone: string;
  companySize: string;
  message: string;
}
