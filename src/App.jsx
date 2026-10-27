import React, { useState, lazy, Suspense } from 'react';
import BrandPreloader from './components/BrandPreloader';
import Navbar from './components/Navbar';
import PerfumeExperience from './components/3d/PerfumeExperience';
import BrandPhilosophy from './components/BrandPhilosophy';
import PerfumeCollectionShowcase from './components/PerfumeCollectionShowcase';
import SignatureFragrance from './components/SignatureFragrance';
import PoemDuoComparison from './components/PoemDuoComparison';
import FragranceWorld from './components/FragranceWorld';
import PatronReviews from './components/PatronReviews';
import AtelierGazette from './components/AtelierGazette';
import AtelierConsultationBanner from './components/AtelierConsultationBanner';
import ClosingBrandStatement from './components/ClosingBrandStatement';
import { BRAND_IDENTITY } from './data/brandData';

// Modals remain lazy loaded on interaction
const ConciergeDrawer = lazy(() => import('./components/ConciergeDrawer'));
const BrandAuditModal = lazy(() => import('./components/BrandAuditModal'));

export default function App() {
  const [auditOpen, setAuditOpen] = useState(false);
  const [conciergeOpen, setConciergeOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleInspectNotes = () => {
    const el = document.getElementById('experience');
    if (el) {
      // Scroll to Scene 3 (approx 50% through the 3D scroll experience)
      const top = el.offsetTop + el.offsetHeight * 0.48;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen text-navy-900 selection:bg-navy-900 selection:text-white flex flex-col font-sans">
      {/* Luxury Brand Preloader (matching yusufbhaifragrances.in style) */}
      <BrandPreloader onLoaded={() => setIsLoaded(true)} />

      {/* Fixed Site Background (BG.png) — Stays completely fixed while scrolling */}
      <div
        className="fixed inset-0 w-full h-full pointer-events-none bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: "url('/assets/BG.png')",
          backgroundAttachment: 'fixed',
        }}
        aria-hidden="true"
      />

      {/* Refined Navigation Bar */}
      <Navbar
        onOpenAudit={() => setAuditOpen(true)}
        onOpenConcierge={() => setConciergeOpen(true)}
      />

      {/* Main Single-Page Narrative Flow */}
      <main id="main-content" className="relative z-10 flex-grow">
        
        {/* 1. Master Real-Time 3D Scroll-Driven Storytelling Experience */}
        <section id="experience" className="relative w-full">
          <PerfumeExperience
            onOpenAudit={() => setAuditOpen(true)}
            onOpenConcierge={() => setConciergeOpen(true)}
          />
        </section>

        {/* 2. Brand Philosophy Manifesto */}
        <BrandPhilosophy />

        {/* 2.5 Curated Perfume Collection — Scroll-Driven Card Transition (Left to Right) */}
        <PerfumeCollectionShowcase />

        {/* 3. The Signature Flacon Technical Dossier & Atelier Metrics */}
        <SignatureFragrance onInspectNotes={handleInspectNotes} />

        {/* 3.5 The Poem Collection — Dual Olfactory Masterworks (For Him & For Her Drag Slider) */}
        <PoemDuoComparison onOpenConcierge={() => setConciergeOpen(true)} />

        {/* 4. The Fragrance World: Atmospheric Terroir & Window Parallax */}
        <FragranceWorld />

        {/* 5. Curated Patron Reviews & International Collector Quotes */}
        <PatronReviews />

        {/* 6. Atelier Gazette: Dispatches and Science of Haute Parfumerie */}
        <AtelierGazette />

        {/* 7. Private Olfactory Consultation & Bespoke Commissioning Banner */}
        <AtelierConsultationBanner onOpenConcierge={() => setConciergeOpen(true)} />
      </main>

      {/* 8. Closing Brand Statement & Editorial Footer */}
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
