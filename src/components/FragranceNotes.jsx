import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Clock, Compass, CheckCircle2, ChevronRight, Droplet } from 'lucide-react';
import { BRAND_IDENTITY, FRAGRANCE_DATA } from '../data/brandData';

gsap.registerPlugin(ScrollTrigger);

export default function FragranceNotes() {
  const [activeStage, setActiveStage] = useState('top');
  const sectionRef = useRef(null);
  const bottleAnchorRef = useRef(null);
  const cardRef = useRef(null);

  const stages = [
    { key: 'top', label: 'Top Notes', time: '0 — 20 Min', desc: 'Awakening' },
    { key: 'heart', label: 'Heart Notes', time: '20 Min — 4 Hrs', desc: 'Core Spine' },
    { key: 'base', label: 'Base Notes', time: '4 — 16+ Hrs', desc: 'Enduring Sillage' },
  ];

  const currentData = FRAGRANCE_DATA.notesPyramid[activeStage];

  useEffect(() => {
    // Stage transition animation
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [activeStage]);

  return (
    <section
      id="notes"
      ref={sectionRef}
      className="relative py-28 md:py-36 bg-ivory-warm/30 border-t border-b border-navy-900/10 overflow-hidden"
    >
      {/* Background Floral Pattern Sheen from BG.png */}
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
              03 // OLFACTORY CHOREOGRAPHY
            </span>
            <span className="w-6 h-px bg-navy-900/40" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-navy-900 font-light mb-4">
            The Three Temporal Stages
          </h2>
          <p className="text-navy-muted text-sm sm:text-base font-light">
            Fragrance unfolds as a living continuum over skin and time. Explore how the botanical composition evolves from initial dawn brightness into nocturnal sillage.
          </p>
        </div>

        {/* Stage Navigation Selector Tabs */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex p-1.5 bg-white border border-navy-900/10 rounded-full shadow-sm">
            {stages.map((stage) => {
              const isActive = activeStage === stage.key;
              return (
                <button
                  key={stage.key}
                  onClick={() => setActiveStage(stage.key)}
                  className={`px-5 sm:px-8 py-2.5 rounded-full text-xs uppercase tracking-widest transition-all duration-300 font-medium ${
                    isActive
                      ? 'bg-navy-900 text-white shadow-sm'
                      : 'text-navy-muted hover:text-navy-900 hover:bg-navy-900/5'
                  }`}
                  aria-pressed={isActive}
                >
                  <span className="hidden sm:inline">{stage.label}</span>
                  <span className="sm:hidden">{stage.key.toUpperCase()}</span>
                  <span className="ml-2 text-[10px] opacity-75 font-mono hidden md:inline">
                    ({stage.time})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Stage Grid: Interactive Flacon with Dynamic Spatial Callout Markers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left / Center Flacon with Choreographed Olfactory Markers */}
          <div className="lg:col-span-5 relative flex justify-center order-2 lg:order-1">
            <div
              ref={bottleAnchorRef}
              className="relative max-w-xs sm:max-w-sm rounded-sm bg-white p-4 border border-navy-900/10 shadow-luxury"
            >
              <img
                src={BRAND_IDENTITY.assets.signatureBottle}
                alt="ZÄFIZZY Flacon with Active Olfactory Layer"
                className="w-full h-auto object-cover rounded"
              />

              {/* Dynamic Coordinate Marker Ring */}
              <div
                className={`absolute inset-4 rounded pointer-events-none transition-all duration-500 border ${
                  activeStage === 'top'
                    ? 'border-navy-900/40 ring-4 ring-navy-900/5'
                    : activeStage === 'heart'
                    ? 'border-navy-900/50 ring-4 ring-navy-900/10'
                    : 'border-navy-950/70 ring-4 ring-navy-950/15'
                }`}
              />

              {/* Spatial Stage Anchor Badges */}
              <div
                className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-navy-900 text-white text-[10px] tracking-widest font-mono uppercase rounded-full shadow-md transition-all duration-300 ${
                  activeStage === 'top' ? 'scale-110 ring-2 ring-mist-blue' : 'opacity-70'
                }`}
              >
                TOP ACCORD // 0-20M
              </div>

              <div
                className={`absolute top-1/2 -right-4 -translate-y-1/2 px-3 py-1 bg-white border border-navy-900/20 text-navy-900 text-[10px] tracking-widest font-mono uppercase rounded shadow-md transition-all duration-300 ${
                  activeStage === 'heart' ? 'scale-110 border-navy-900 font-semibold' : 'opacity-70'
                }`}
              >
                HEART SPINE // 4H
              </div>

              <div
                className={`absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-navy-950 text-white text-[10px] tracking-widest font-mono uppercase rounded-full shadow-md transition-all duration-300 ${
                  activeStage === 'base' ? 'scale-110 ring-2 ring-mist-blue' : 'opacity-70'
                }`}
              >
                BASE SILLAGE // 16H+
              </div>
            </div>
          </div>

          {/* Right Column: Stage Description & Detailed Accords */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div
              ref={cardRef}
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
                      className="p-4 rounded bg-ivory-light border border-navy-900/5 hover:border-navy-900/20 transition-all group"
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
