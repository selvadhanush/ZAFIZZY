import React from 'react';
import { Clock, Droplet } from 'lucide-react';
import { BRAND_IDENTITY, FRAGRANCE_DATA } from '../data/brandData';

export default function FragranceNotes() {
  const currentData = FRAGRANCE_DATA.notesPyramid.top;

  return (
    <section
      id="notes"
      className="relative py-28 md:py-36 bg-ivory-warm/30 border-t border-b border-navy-900/10 overflow-hidden"
    >
      {/* Background Floral Pattern Sheen from BG.webp */}
      <div
        className="absolute inset-0 bg-brand-pattern opacity-[0.05] pointer-events-none bg-cover bg-center"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-navy-900/40" />
            <span className="text-[11px] tracking-widest-2xl uppercase font-semibold text-navy-muted">
              03 // OLFACTORY COMPOSITION
            </span>
            <span className="w-6 h-px bg-navy-900/40" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-navy-900 font-light mb-4">
            The Olfactory Composition
          </h2>
          <p className="text-navy-muted text-sm sm:text-base font-light">
            Fragrance unfolds as a living continuum over skin and time. Explore how the botanical composition evolves from initial dawn brightness into nocturnal sillage.
          </p>
        </div>

        {/* Main Stage Grid: Interactive Flacon with Dynamic Spatial Callout Markers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left / Center Flacon with Choreographed Olfactory Markers */}
          <div className="lg:col-span-5 relative flex justify-center order-2 lg:order-1">
            <div
              className="relative max-w-xs sm:max-w-sm rounded-sm bg-white p-4 border border-navy-900/10 shadow-luxury"
            >
              <img
                src={BRAND_IDENTITY.assets.signatureBottle}
                alt="ZÄFIZZY Flacon with Active Olfactory Layer"
                className="w-full h-auto object-cover rounded"
              />

              <div
                className="absolute inset-4 rounded pointer-events-none border border-navy-900/40 ring-4 ring-navy-900/5"
              />

              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-navy-900 text-white text-[10px] tracking-widest font-mono uppercase rounded-full shadow-md scale-110 ring-2 ring-mist-blue"
              >
                TOP ACCORD // 0-20M
              </div>
            </div>
          </div>

          {/* Right Column: Stage Description & Detailed Accords */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div
              className="bg-white p-8 sm:p-10 rounded-sm border border-navy-900/10 shadow-luxury"
            >
              {/* Active Stage Header */}
              <div className="flex flex-wrap items-center justify-between pb-6 border-b border-navy-900/10 gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-navy-muted uppercase mb-1">
                    <Clock className="w-3.5 h-3.5 text-navy-900" />
                    <span>Active Phase: {currentData.phase}</span>
                  </div>
                  <h3 className="font-serif text-3xl sm:text-4xl text-navy-900 font-light">
                    {currentData.title}
                  </h3>
                </div>

                <div className="px-4 py-1.5 bg-ivory-warm rounded-full border border-navy-900/10 text-xs font-medium text-navy-900">
                  {currentData.theme}
                </div>
              </div>

              {/* Stage Concept Paragraph */}
              <p className="py-6 text-navy-muted text-base font-light leading-relaxed">
                {currentData.description}
              </p>

              {/* Accord Items Breakdown */}
              <div className="space-y-4 pt-2">
                <span className="text-[11px] uppercase tracking-widest text-navy-900 font-semibold block">
                  Noble Botanical Ingredients:
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {currentData.accords.map((accord, i) => (
                    <div
                      key={accord.name}
                      className="p-4 rounded bg-ivory-light border border-navy-900/5 hover:border-navy-900/20 transition-[color,background-color,border-color,box-shadow,opacity,transform] group"
                    >
                      <div className="flex items-center gap-2 text-[10px] font-mono text-navy-muted mb-1">
                        <Droplet className="w-3 h-3 text-navy-800" />
                        <span>{accord.origin}</span>
                      </div>
                      <h4 className="font-serif text-lg text-navy-900 font-medium group-hover:text-navy-950">
                        {accord.name}
                      </h4>
                      <p className="text-xs text-navy-muted/80 mt-1 italic">
                        "{accord.note}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Client Verification Footer */}
              <div className="mt-8 pt-6 border-t border-navy-900/10 flex items-center justify-between text-[11px] text-navy-muted">
                <span>Olfactory architecture placeholder</span>
                <span className="font-mono text-navy-900/60">ZÄFIZZY DOSSIER 2026</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
