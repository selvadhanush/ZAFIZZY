import React, { useState, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import BrandPhilosophy from './components/BrandPhilosophy';
import SignatureFragrance from './components/SignatureFragrance';
import FragranceWorld from './components/FragranceWorld';
import ClosingBrandStatement from './components/ClosingBrandStatement';
import { BRAND_IDENTITY } from './data/brandData';

// Lazy-loaded 3D WebGL Canvas & Modals
const PerfumeExperience = lazy(() => import('./components/3d/PerfumeExperience'));
const ConciergeDrawer = lazy(() => import('./components/ConciergeDrawer'));
const BrandAuditModal = lazy(() => import('./components/BrandAuditModal'));

export default function App() {
  const [auditOpen, setAuditOpen] = useState(false);
  const [conciergeOpen, setConciergeOpen] = useState(false);

  const handleInspectNotes = () => {
    const el = document.getElementById('experience');
    if (el) {
      // Scroll to Scene 3 (approx 50% through the 3D scroll experience)
      const top = el.offsetTop + el.offsetHeight * 0.48;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-navy-900 selection:bg-navy-900 selection:text-white flex flex-col font-sans">
      {/* Refined Navigation Bar */}
      <Navbar
        onOpenAudit={() => setAuditOpen(true)}
        onOpenConcierge={() => setConciergeOpen(true)}
      />

      {/* Main Single-Page Narrative Flow */}
      <main id="main-content" className="flex-grow">
        
        {/* 1. Master Real-Time 3D Scroll-Driven Storytelling Experience */}
        <section id="experience">
          <Suspense
            fallback={
              <div className="w-full h-screen flex flex-col items-center justify-center bg-white text-navy-900 p-8 text-center">
                <div className="relative w-44 h-60 mb-6 flex items-center justify-center">
                  <img
                    src={BRAND_IDENTITY.assets.signatureBottle}
                    alt="ZÄFIZZY Flacon"
                    className="max-h-full max-w-full object-contain filter drop-shadow-xl animate-pulse"
                  />
                </div>
                <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-widest text-navy-muted">
                  <span className="w-2 h-2 rounded-full bg-navy-900 animate-ping" />
                  <span>INITIALIZING 3D FLACON CHOREOGRAPHY...</span>
                </div>
                <p className="text-[11px] font-serif italic text-navy-muted/70">
                  Haute Parfumerie Real-Time Ray Refraction
                </p>
              </div>
            }
          >
            <PerfumeExperience
              onOpenAudit={() => setAuditOpen(true)}
              onOpenConcierge={() => setConciergeOpen(true)}
            />
          </Suspense>
        </section>

        {/* 2. Brand Philosophy Manifesto */}
        <BrandPhilosophy />

        {/* 3. The Signature Flacon Technical Dossier & Atelier Metrics */}
        <SignatureFragrance onInspectNotes={handleInspectNotes} />

        {/* 4. The Fragrance World: Atmospheric Terroir & Extraction */}
        <FragranceWorld />
      </main>

      {/* 5. Closing Brand Statement & Editorial Footer */}
      <ClosingBrandStatement
        onOpenAudit={() => setAuditOpen(true)}
        onOpenConcierge={() => setConciergeOpen(true)}
      />

      {/* Client Concierge & Inquiries Drawer (Lazy loaded on interaction) */}
      {conciergeOpen && (
        <Suspense fallback={null}>
          <ConciergeDrawer
            isOpen={conciergeOpen}
            onClose={() => setConciergeOpen(false)}
          />
        </Suspense>
      )}

      {/* Art Direction & 3D Technical Audit Modal (Lazy loaded on interaction) */}
      {auditOpen && (
        <Suspense fallback={null}>
          <BrandAuditModal
            isOpen={auditOpen}
            onClose={() => setAuditOpen(false)}
          />
        </Suspense>
      )}
    </div>
  );
}
