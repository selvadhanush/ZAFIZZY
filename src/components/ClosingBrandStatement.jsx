import React from 'react';
import { ArrowUpRight, Sparkles, ShieldCheck, Mail, Globe, MapPin } from 'lucide-react';
import { BRAND_IDENTITY } from '../data/brandData';

export default function ClosingBrandStatement({ onOpenAudit, onOpenConcierge }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-white pt-28 pb-16 border-t border-navy-900/10 overflow-hidden">
      {/* Background Light Field & Pattern Sheen */}
      <div
        className="absolute inset-0 bg-brand-pattern opacity-[0.04] pointer-events-none bg-cover bg-center"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Memorable Closing Composition */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          
          {/* Supplied Exact Logo Image */}
          <div className="flex justify-center mb-8">
            <img
              src={BRAND_IDENTITY.assets.logo}
              alt="ZÄFIZZY Brand Logo — Perfumers & Perfumery"
              className="h-16 sm:h-20 md:h-24 w-auto object-contain transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Closing Brand Statement */}
          <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-navy-900 font-light leading-snug mb-8">
            "To wear <span className="font-normal italic">ZÄFIZZY</span> is to inhabit a realm where memory, architecture, and noble raw essence converge."
          </p>

          <p className="text-navy-muted text-sm sm:text-base font-light max-w-xl mx-auto mb-10">
            For bespoke consultations, private boutique acquisitions, and private commissions, connect with our olfactory concierge.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenConcierge}
              className="btn-luxury-shimmer inline-flex items-center gap-3 bg-navy-900 text-white text-xs uppercase tracking-widest-xl px-8 py-4 rounded-sm hover:bg-navy-800 transition-all shadow-luxury hover:shadow-luxury-hover"
            >
              <span>Inquire Private Atelier</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenAudit}
              className="inline-flex items-center gap-2 border border-navy-900/20 text-navy-900 text-xs uppercase tracking-widest px-6 py-4 rounded-sm hover:bg-navy-900/5 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-navy-800" />
              <span>Review Identity Specifications</span>
            </button>
          </div>

        </div>

        {/* Divider */}
        <div className="w-full h-px bg-navy-900/10 mb-12" />

        {/* Footer Navigation & Brand Credits */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 text-xs">
          
          {/* Column 1: House of ZÄFIZZY */}
          <div className="space-y-3">
            <span className="font-mono text-[11px] tracking-widest uppercase text-navy-900 font-semibold block">
              HOUSE OF ZÄFIZZY
            </span>
            <p className="text-navy-muted leading-relaxed font-light">
              Haute perfumery atelier dedicated to structural elegance, noble botanical extractions, and sensory permanence.
            </p>
            <div className="text-[11px] font-mono text-navy-900/60">
              {BRAND_IDENTITY.tagline}
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-2">
            <span className="font-mono text-[11px] tracking-widest uppercase text-navy-900 font-semibold block mb-3">
              DISCOVER
            </span>
            <ul className="space-y-2 text-navy-muted">
              <li><a href="#philosophy" className="hover:text-navy-900 transition-colors">Philosophy Manifesto</a></li>
              <li><a href="#signature" className="hover:text-navy-900 transition-colors">The Signature Flacon</a></li>
              <li><a href="#notes" className="hover:text-navy-900 transition-colors">Olfactory Pyramid</a></li>
              <li><a href="#world" className="hover:text-navy-900 transition-colors">Atmospheric Terroir</a></li>
            </ul>
          </div>

          {/* Column 3: Atelier Locations */}
          <div className="space-y-2">
            <span className="font-mono text-[11px] tracking-widest uppercase text-navy-900 font-semibold block mb-3">
              SALONS & ATELIERS
            </span>
            <ul className="space-y-2 text-navy-muted font-light">
              <li className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-navy-900" /> Grasse — Private Laboratory</li>
              <li className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-navy-900" /> Paris — Place Vendôme Salon</li>
              <li className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-navy-900" /> Dubai — Private Suite</li>
            </ul>
          </div>

          {/* Column 4: Back to Top & Digital Brand Stamp */}
          <div className="flex flex-col justify-between items-start md:items-end">
            <button
              onClick={scrollToTop}
              className="text-[11px] uppercase tracking-widest text-navy-900 hover:text-navy-muted transition-colors py-2 flex items-center gap-2 group"
            >
              <span>Return to Top</span>
              <span className="transition-transform group-hover:-translate-y-1">↑</span>
            </button>

            <div className="text-left md:text-right mt-6 md:mt-0 text-[11px] text-navy-muted/70 font-mono">
              <div>WHITE & NAVY EDITION</div>
              <div>© {new Date().getFullYear()} {BRAND_IDENTITY.name}. ALL RIGHTS RESERVED.</div>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}
