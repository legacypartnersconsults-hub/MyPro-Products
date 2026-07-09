import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, ArrowUpRight, Shield, Layers, ShieldAlert, Database, Building, Home, Briefcase } from 'lucide-react';
import { products } from '../data';
import MyProMarketLogo from './MyProMarketLogo';
import MyProReadyHubLogo from './MyProReadyHubLogo';
import MyProProductsLogo from './MyProProductsLogo';

interface NavbarProps {
  onRequestDemo: (productId?: string, audienceId?: string) => void;
  onNavigateToSection: (sectionId: string) => void;
  onLaunchPortal: () => void;
  onLaunchReadyHub: () => void;
}

export default function Navbar({ onRequestDemo, onNavigateToSection, onLaunchPortal, onLaunchReadyHub }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProductsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (sectionId: string) => {
    onNavigateToSection(sectionId);
    setIsOpen(false);
    setProductsDropdownOpen(false);
  };

  return (
    <nav
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleNavClick('hero')}>
            <MyProProductsLogo size="md" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Products Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                id="products-dropdown-btn"
                onClick={() => setProductsDropdownOpen(!productsDropdownOpen)}
                className={`flex items-center space-x-1.5 text-sm font-medium transition-colors ${
                  productsDropdownOpen ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>Our Products</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${productsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {productsDropdownOpen && (
                <div
                  id="products-dropdown-menu"
                  className="absolute left-1/2 -translate-x-1/2 mt-3 w-[450px] bg-white rounded-xl shadow-xl border border-slate-100 p-5 grid grid-cols-1 gap-4 focus:outline-none"
                >
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-50 pb-2">
                    Active & Upcoming Suite
                  </div>

                  {products.map((product) => {
                    const isActive = product.status === 'active';
                    return (
                      <div
                        key={product.id}
                        className={`group relative flex items-start space-x-4 p-2.5 rounded-lg transition-colors ${
                          isActive
                            ? 'hover:bg-blue-50/50 cursor-pointer'
                            : 'opacity-75 hover:bg-slate-50/50'
                        }`}
                        onClick={() => {
                          if (isActive) {
                            if (product.id === 'market') {
                              onLaunchPortal();
                            } else if (product.id === 'readyhub') {
                              onLaunchReadyHub();
                            } else if (product.externalUrl) {
                              window.open(product.externalUrl, '_blank');
                            } else {
                              handleNavClick('product-suite');
                            }
                          } else {
                            // Open demo request prefilled with this upcoming product
                            onRequestDemo(product.id);
                          }
                          setProductsDropdownOpen(false);
                        }}
                      >
                        <div className={`mt-1 flex-shrink-0 h-9 w-9 rounded-lg flex items-center justify-center ${
                          product.status === 'active' 
                            ? 'bg-slate-50 border border-slate-100 group-hover:bg-slate-100 transition-colors' 
                            : product.status === 'beta' 
                            ? 'bg-amber-50 text-amber-600' 
                            : 'bg-purple-50 text-purple-600'
                        }`}>
                          {product.id === 'market' && <MyProMarketLogo showText={false} size="sm" />}
                          {product.id === 'readyhub' && <MyProReadyHubLogo showText={false} size="sm" />}
                          {product.id === 'claimassist' && <ShieldAlert className="h-5 w-5 text-purple-600" />}
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                              {product.name}
                            </span>
                            {product.status === 'active' ? (
                              <span className="text-[10px] font-medium bg-green-50 text-green-700 px-1.5 py-0.5 rounded border border-green-100">Live</span>
                            ) : product.status === 'beta' ? (
                              <span className="text-[10px] font-medium bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded border border-amber-100">Beta</span>
                            ) : (
                              <span className="text-[10px] font-medium bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded border border-purple-100">Upcoming</span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                            {product.tagline}
                          </p>
                          {isActive && (
                            <span className="inline-flex items-center text-[11px] font-medium text-blue-600 mt-1.5">
                              Launch Application <ArrowUpRight className="ml-1 h-3 w-3" />
                            </span>
                          )}
                          {!isActive && (
                            <span className="inline-flex items-center text-[11px] font-medium text-slate-400 mt-1.5 hover:text-blue-600">
                              Join Waitlist &rarr;
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <button onClick={() => handleNavClick('product-suite')} className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Product Suite
            </button>
            <button onClick={() => handleNavClick('audience-segments')} className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Who We Serve
            </button>
            <button onClick={() => handleNavClick('roi-calculator')} className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              ROI Savings
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={onLaunchPortal}
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors px-3 py-2 rounded-lg hover:bg-slate-50 focus:outline-none"
            >
              Sign In
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div id="mobile-navigation-menu" className="md:hidden bg-white border-t border-slate-100 shadow-xl absolute top-full left-0 right-0 p-5 space-y-4">
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider pb-1">
              Active Suite
            </div>
            <button
              onClick={() => { onLaunchPortal(); setIsOpen(false); }}
              className="w-full flex items-center justify-between p-3 rounded-lg bg-blue-50/50 text-slate-800 font-medium text-left"
            >
              <div className="flex items-center space-x-3">
                <MyProMarketLogo showText={false} size="sm" />
                <div>
                  <div className="text-sm font-bold">MyPro Market</div>
                  <div className="text-xs text-slate-500">Dispatch & Vetting Network</div>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-blue-600" />
            </button>
            <button
              onClick={() => { onLaunchReadyHub(); setIsOpen(false); }}
              className="w-full flex items-center justify-between p-3 rounded-lg bg-cyan-50/50 text-slate-800 font-medium text-left mt-1"
            >
              <div className="flex items-center space-x-3">
                <MyProReadyHubLogo showText={false} size="sm" />
                <div>
                  <div className="text-sm font-bold">MyPro Ready Hub</div>
                  <div className="text-xs text-slate-500">Disaster Prep & AI Scanner</div>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-cyan-600" />
            </button>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider pb-1">
              Upcoming Solutions
            </div>
            <button
              onClick={() => { onRequestDemo('claimassist'); setIsOpen(false); }}
              className="w-full flex items-center justify-between p-3 rounded-lg bg-slate-50/80 hover:bg-slate-50 text-left"
            >
              <div className="flex items-center space-x-3">
                <ShieldAlert className="h-5 w-5 text-purple-600" />
                <div>
                  <div className="text-sm font-bold">MyPro Claim Assist</div>
                  <div className="text-xs text-slate-500">Homeowner Claim Helper</div>
                </div>
              </div>
              <span className="text-[10px] font-semibold text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-100">Coming Soon</span>
            </button>
          </div>

          <div className="border-t border-slate-100 pt-4 space-y-1">
            <button
              onClick={() => handleNavClick('product-suite')}
              className="w-full text-left p-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              Interactive Product Suite
            </button>
            <button
              onClick={() => handleNavClick('audience-segments')}
              className="w-full text-left p-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              Audience Deep-Dive
            </button>
            <button
              onClick={() => handleNavClick('roi-calculator')}
              className="w-full text-left p-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              ROI Savings Calculator
            </button>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={() => { onLaunchPortal(); setIsOpen(false); }}
              className="w-full flex items-center justify-center p-3 text-sm font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200"
            >
              Sign In
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
