/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductSuite from './components/ProductSuite';
import DemoRequestForm from './components/DemoRequestForm';
import Footer from './components/Footer';
import MyProMarketWebsite from './components/MyProMarketWebsite';
import MyProMarketSignIn from './components/MyProMarketSignIn';
import MyProMarketPortal from './components/MyProMarketPortal';
import MyProReadyHubWebsite from './components/MyProReadyHubWebsite';
import { PrivacyPolicyModal, TermsOfServiceModal } from './components/LegalModals';

export default function App() {
  const [demoFormOpen, setDemoFormOpen] = useState(false);
  const [preselectedProduct, setPreselectedProduct] = useState<string>('');
  const [preselectedAudience, setPreselectedAudience] = useState<string>('');
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [activeView, setActiveView] = useState<'corporate' | 'market' | 'readyhub' | 'signin' | 'portal'>(() => {
    // Basic path-based detection on load
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path === '/market') return 'market';
      if (path === '/readyhub') return 'readyhub';
    }
    return 'corporate';
  });

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/market') {
        setActiveView('market');
      } else if (path === '/readyhub') {
        setActiveView('readyhub');
      } else {
        setActiveView('corporate');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleOpenDemoForm = (productId?: string, audienceId?: string) => {
    setPreselectedProduct(productId || '');
    setPreselectedAudience(audienceId || '');
    setDemoFormOpen(true);
  };

  const handleNavigateToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleLaunchPortal = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    window.history.pushState({}, '', '/market');
    setActiveView('market');
  };

  const handleLaunchReadyHub = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    window.history.pushState({}, '', '/readyhub');
    setActiveView('readyhub');
  };

  const handleBackToCorporate = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    window.history.pushState({}, '', '/');
    setActiveView('corporate');
  };

  if (activeView === 'market') {
    return (
      <>
        <MyProMarketWebsite 
          onBackToCorporate={handleBackToCorporate} 
          onRequestDemo={(p, a) => handleOpenDemoForm(p, a)} 
          onLaunchApp={() => {
            window.scrollTo({ top: 0, behavior: 'instant' });
            setActiveView('signin');
          }}
        />
        <DemoRequestForm
          isOpen={demoFormOpen}
          onClose={() => setDemoFormOpen(false)}
          preselectedProductId={preselectedProduct}
          preselectedAudienceId={preselectedAudience}
          isMarketOnly={true}
        />
      </>
    );
  }

  if (activeView === 'readyhub') {
    return (
      <>
        <MyProReadyHubWebsite 
          onBackToCorporate={handleBackToCorporate} 
          onRequestDemo={(p) => handleOpenDemoForm(p)} 
        />
        <DemoRequestForm
          isOpen={demoFormOpen}
          onClose={() => setDemoFormOpen(false)}
          preselectedProductId={preselectedProduct}
          preselectedAudienceId={preselectedAudience}
        />
      </>
    );
  }

  if (activeView === 'signin') {
    return (
      <MyProMarketSignIn 
        onSignInSuccess={() => {
          window.scrollTo({ top: 0, behavior: 'instant' });
          setActiveView('portal');
        }}
        onBackToWebsite={() => {
          window.scrollTo({ top: 0, behavior: 'instant' });
          setActiveView('market');
        }}
      />
    );
  }

  if (activeView === 'portal') {
    return (
      <MyProMarketPortal 
        onBackToCorporate={() => {
          window.scrollTo({ top: 0, behavior: 'instant' });
          setActiveView('market');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
      
      {/* 1. Header Navigation Bar */}
      <Navbar
        onRequestDemo={(p, a) => handleOpenDemoForm(p, a)}
        onNavigateToSection={handleNavigateToSection}
        onLaunchPortal={handleLaunchPortal}
        onLaunchReadyHub={handleLaunchReadyHub}
      />

      {/* 2. Main Hero Presentation Section */}
      <Hero
        onRequestDemo={(p) => handleOpenDemoForm(p)}
        onExploreSuite={() => handleNavigateToSection('product-suite')}
        onLaunchPortal={handleLaunchPortal}
      />

      {/* 3. The Interactive Product Suite */}
      <ProductSuite
        onRequestDemo={(p) => handleOpenDemoForm(p)}
        onLaunchPortal={handleLaunchPortal}
        onLaunchReadyHub={handleLaunchReadyHub}
      />

      {/* 5. Footer and Certifications */}
      <Footer
        onNavigateToSection={handleNavigateToSection}
        onRequestDemo={() => handleOpenDemoForm()}
        onLaunchPortal={handleLaunchPortal}
        onOpenPrivacy={() => setPrivacyOpen(true)}
        onOpenTerms={() => setTermsOpen(true)}
      />

      {/* 6. Multi-step Demo Inquiry Modal Wizard */}
      <DemoRequestForm
        isOpen={demoFormOpen}
        onClose={() => setDemoFormOpen(false)}
        preselectedProductId={preselectedProduct}
        preselectedAudienceId={preselectedAudience}
      />

      {/* Legal Modals for Carrier and User Compliance */}
      <PrivacyPolicyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      <TermsOfServiceModal isOpen={termsOpen} onClose={() => setTermsOpen(false)} />

    </div>
  );
}
