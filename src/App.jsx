import React, { useState } from 'react';
import Navbar from './components/Navbar';
import PerfumeExperience from './components/3d/PerfumeExperience';
import BrandPhilosophy from './components/BrandPhilosophy';
import SignatureFragrance from './components/SignatureFragrance';
import FragranceWorld from './components/FragranceWorld';
import ClosingBrandStatement from './components/ClosingBrandStatement';
import ConciergeDrawer from './components/ConciergeDrawer';
import BrandAuditModal from './components/BrandAuditModal';

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
          <PerfumeExperience
            onOpenAudit={() => setAuditOpen(true)}
            onOpenConcierge={() => setConciergeOpen(true)}
          />
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

      {/* Client Concierge & Inquiries Drawer */}
      <ConciergeDrawer
        isOpen={conciergeOpen}
        onClose={() => setConciergeOpen(false)}
      />

      {/* Art Direction & 3D Technical Audit Modal */}
      <BrandAuditModal
        isOpen={auditOpen}
        onClose={() => setAuditOpen(false)}
      />
    </div>
  );
}
