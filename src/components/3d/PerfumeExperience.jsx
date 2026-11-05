import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Droplet, ArrowUpRight } from 'lucide-react';
import HeroFrameSequence from './HeroFrameSequence';
import { BRAND_IDENTITY, FRAGRANCE_DATA, HERO_PILLARS } from '../../data/brandData';

gsap.registerPlugin(ScrollTrigger);

/**
 * Master Scroll-Driven Bottle Sequence Experience
 * High-performance architecture:
 * 1. ZERO React re-renders on pointer movement (pointerRef mutation)
 * 2. GSAP timeline drives DOM overlay opacities and transforms with hardware acceleration
 * 3. Dedicated GPU opacity layer handles White-to-Navy transition with zero layout reflow
 */
const STAGE_LABELS = [
  'STAGE I: THE REVEAL',
  'STAGE II: FLACON INSPECTION',
  'STAGE III: OLFACTORY NOTES',
  'STAGE IV: NOCTURNAL TERROIR',
  'STAGE V: THE MASTERWORK',
];

export default function PerfumeExperience({ onOpenAudit, onOpenConcierge }) {
  const containerRef = useRef(null);
  const scrollProgressRef = useRef(0);

  // DOM Refs for direct hardware-accelerated animations (No React re-render thrashing)
  const progressTextRef = useRef(null);
  const stageTextRef = useRef(null);
  const scene1Ref = useRef(null);
  const pillarsRef = useRef(null);
  const scene2Ref = useRef(null);
  const scene3Ref = useRef(null);
  const scene4Ref = useRef(null);
  const scene5Ref = useRef(null);

  const [activeNoteStage, setActiveNoteStage] = useState('top');
  const [reducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  // GSAP ScrollTrigger Master Timeline (GPU Accelerated Scoped Cleanup)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        scrollProgressRef.current = 0;
        return;
      }

      let lastPct = -1;
      let lastStage = -1;

      // Master scroll timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          fastScrollEnd: true,
          onUpdate: (self) => {
            const p = self.progress;
            scrollProgressRef.current = p;

            // Direct DOM percentage update (0 React re-renders) — only when the value changes
            const pct = Math.round(p * 100);
            if (pct !== lastPct && progressTextRef.current) {
              lastPct = pct;
              progressTextRef.current.textContent = `${pct}%`;
            }

            // Direct Stage Name Text — only when the stage changes
            const stage = p < 0.22 ? 0 : p < 0.46 ? 1 : p < 0.70 ? 2 : p < 0.88 ? 3 : 4;
            if (stage !== lastStage && stageTextRef.current) {
              lastStage = stage;
              stageTextRef.current.textContent = STAGE_LABELS[stage];
            }

            // Discreet Note Switcher (Top, Heart, Base)
            if (p >= 0.46 && p < 0.54) {
              setActiveNoteStage((prev) => (prev !== 'top' ? 'top' : prev));
            } else if (p >= 0.54 && p < 0.62) {
              setActiveNoteStage((prev) => (prev !== 'heart' ? 'heart' : prev));
            } else if (p >= 0.62 && p < 0.70) {
              setActiveNoteStage((prev) => (prev !== 'base' ? 'base' : prev));
            }
          },
        },
      });

      // ─── Choreographed GSAP Transitions Across the 5 Scenes ───

      // SCENE 1: Headline visible at start, fades up & out as pillars rise
      tl.fromTo(scene1Ref.current, { opacity: 1, y: 0 }, { opacity: 0, y: -30, duration: 0.16, ease: 'power2.inOut' }, 0.08);

      // 4 HERO PILLAR CARDS (Inspired directly by reference video 00:03-00:06):
      // Slide up from bottom over the pinned bottle, pause, then fade out
      tl.fromTo(pillarsRef.current,
        { opacity: 0, y: 70 },
        { opacity: 1, y: 0, duration: 0.10, ease: 'power2.out' },
        0.09
      );
      tl.to(pillarsRef.current,
        { opacity: 0, y: -30, duration: 0.08, ease: 'power2.in' },
        0.20
      );

      // SCENE 2: 360° Inspection Card
      tl.fromTo(scene2Ref.current,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.10, ease: 'power2.out' },
        0.23
      );
      tl.to(scene2Ref.current,
        { opacity: 0, x: -30, duration: 0.08, ease: 'power2.in' },
        0.42
      );

      // SCENE 3: Olfactory Notes Macro Card
      tl.fromTo(scene3Ref.current,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.10, ease: 'power2.out' },
        0.46
      );
      tl.to(scene3Ref.current,
        { opacity: 0, x: -30, duration: 0.08, ease: 'power2.in' },
        0.68
      );

      // SCENE 4: Nocturnal Terroir Text
      tl.fromTo(scene4Ref.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.10, ease: 'power2.out' },
        0.71
      );
      tl.to(scene4Ref.current,
        { opacity: 0, y: -30, duration: 0.08, ease: 'power2.in' },
        0.85
      );

      // SCENE 5: The Final Masterwork Settle (Pure white studio framing)
      tl.fromTo(scene5Ref.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.08, ease: 'power2.out' },
        0.88
      );
      tl.to(scene5Ref.current,
        { opacity: 0, y: -20, duration: 0.03, ease: 'power2.in' },
        0.97
      );

      // Global ScrollTrigger measurement refresh
      ScrollTrigger.refresh();
    }, containerRef);

    // Refresh triggers once all image assets settle
    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="hero-dark relative w-full h-[540vh] bg-[#060606] text-navy-900"
    >
      {/* STICKY FULLSCREEN VIEWPORT CONTAINER */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center bg-[#060606]">
        
        {/* Ambient warm amber halo */}
        <div className="absolute w-[600px] lg:w-[900px] h-[600px] lg:h-[900px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(201,160,92,0.10)_0%,transparent_65%)]" />

        {/* SCROLL-SCRUBBED BOTTLE SEQUENCE (static poster under prefers-reduced-motion) */}
        <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
          {reducedMotion ? (
            <img
              src="/hero-frames/poster.webp"
              alt="ZÄFIZZY Amber Oud perfume bottle"
              className="w-full h-full object-contain"
            />
          ) : (
            <HeroFrameSequence scrollProgressRef={scrollProgressRef} />
          )}
        </div>

        {/* SYNCHRONIZED EDITORIAL OVERLAYS (Z-20) */}
        <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-4 sm:p-6 md:p-12">
          
          {/* Top Brand Indicator Bar */}
          <div className="flex items-center justify-between text-[10px] sm:text-xs tracking-widest-xl sm:tracking-widest-2xl uppercase font-mono opacity-80 pt-16 sm:pt-14 md:pt-12">
            <div className="flex items-center gap-2 text-navy-900">
              <span className="w-2 h-2 rounded-full bg-navy-900 animate-pulse" />
              <span>3D CHOREOGRAPHY // </span>
              <span ref={progressTextRef} className="font-semibold font-mono">0%</span>
            </div>
            <div ref={stageTextRef} className="hidden sm:block font-mono text-navy-muted">
              STAGE I: THE REVEAL
            </div>
          </div>

          {/* DYNAMIC SCENE CONTENT */}

          {/* SCENE 1: THE REVEAL */}
          <div
            ref={scene1Ref}
            className="will-change-transform max-w-xl self-start pointer-events-auto"
          >
            <div className="flex items-center gap-2.5 mb-2 sm:mb-3">
              <div className="w-8 sm:w-10 h-[1.5px] bg-navy-950/70" />
              <span className="text-[10px] sm:text-xs tracking-widest-xl sm:tracking-widest-2xl uppercase text-navy-950 font-semibold font-mono">
                {BRAND_IDENTITY.subheading}
              </span>
              <span className="text-xs text-navy-950/50 font-mono">/</span>
              <span className="text-xs sm:text-sm font-serif font-semibold italic text-navy-950">
                {BRAND_IDENTITY.arabicScript}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-navy-950 leading-[1.12] sm:leading-[1.08] tracking-tight mb-4 sm:mb-6">
              THE ESSENCE OF <br />
              <span className="italic font-medium text-navy-950">ACQUIRED WORLDS.</span>
            </h1>

            <p className="text-navy-900 text-xs sm:text-sm md:text-base font-normal leading-relaxed max-w-md mb-6 sm:mb-8">
              A bespoke architectural fragrance that bridges luminous botanical awakening and deep midnight sillage.
            </p>

            <div className="flex items-center gap-2.5 text-[10px] sm:text-xs tracking-widest uppercase text-navy-950 font-semibold">
              <span className="animate-bounce">↓</span>
              <span>Scroll to Begin 3D Flacon Exploration</span>
            </div>
          </div>

          {/* 4 HERO PILLAR CARDS (Directly inspired by reference video 00:03-00:06) */}
          <div
            ref={pillarsRef}
            className="will-change-transform w-full self-center pointer-events-auto opacity-0"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 max-w-6xl mx-auto">
              {HERO_PILLARS.map((pillar) => (
                <div
                  key={pillar.code}
                  className="bg-white/90 p-3 sm:p-5 rounded-sm border border-navy-900/10 shadow-luxury hover:border-navy-900/30 transition-[color,background-color,border-color,box-shadow,opacity,transform] duration-300"
                >
                  <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-navy-muted uppercase mb-1.5 sm:mb-2">
                    <span>{pillar.code} //</span>
                    <span>{pillar.category}</span>
                  </div>
                  <h3 className="font-serif text-xs sm:text-base lg:text-lg text-navy-900 font-medium mb-1">
                    {pillar.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-navy-muted/90 font-light leading-relaxed line-clamp-2 sm:line-clamp-none">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* SCENE 2: THE 360° INSPECTION */}
          <div
            ref={scene2Ref}
            className="will-change-transform max-w-sm sm:max-w-md self-center sm:self-end text-center sm:text-right pointer-events-auto opacity-0"
          >
            <span className="text-[10px] font-mono tracking-widest uppercase text-navy-muted block mb-1.5 sm:mb-2">
              02 // THREE-DIMENSIONAL TURNTABLE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-navy-900 font-light mb-2.5 sm:mb-4">
              Crystalline Facets & Luminous Essence
            </h2>
            <p className="text-navy-muted text-xs sm:text-sm font-light leading-relaxed mb-4 sm:mb-6">
              Rotated gracefully in real-time space as you scroll. The hand-beveled optical crystal glass captures natural refraction, encasing the rich amber-brown alcohol perfume essence and brushed midnight navy cap.
            </p>
            <div className="p-3 sm:p-4 bg-white/95 border border-navy-900/10 rounded inline-block text-left text-[10px] sm:text-[11px] text-navy-900 font-mono space-y-1 sm:space-y-1.5 shadow-luxury w-full sm:w-auto">
              <div>FLACON: Optical Crystal Glass (IOR 1.52)</div>
              <div>LIQUID: Aged Amber-Brown Alcohol Extrait (Full Capacity)</div>
              <div>BASE: Solid Crystal "Glace d'Eau" Foundation</div>
              <div>CAP: Brushed Midnight Navy Metal & Chrome Bevel</div>
              <div>EMBLEM: Applied ZÄFIZZY Brand Silkscreen</div>
            </div>
          </div>

          {/* SCENE 3: OLFACTORY NOTES CHOREOGRAPHY */}
          <div
            ref={scene3Ref}
            className="will-change-transform max-w-sm sm:max-w-md lg:max-w-lg self-center sm:self-end w-full pointer-events-auto opacity-0"
          >
            <div className="bg-white/95 p-4 sm:p-6 md:p-7 rounded-sm border border-navy-900/10 shadow-luxury">
              {/* Note Stage Tabs */}
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-navy-900/10 mb-3 sm:mb-4">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <Droplet className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-navy-900" />
                  <span className="text-[11px] sm:text-xs uppercase tracking-widest font-semibold text-navy-900">
                    {FRAGRANCE_DATA.notesPyramid[activeNoteStage].title}
                  </span>
                </div>
                <span className="text-[9px] sm:text-[10px] font-mono text-navy-muted uppercase">
                  {FRAGRANCE_DATA.notesPyramid[activeNoteStage].phase}
                </span>
              </div>

              {/* Stage Switcher Controls */}
              <div className="flex gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                {['top', 'heart', 'base'].map((stg) => (
                  <button
                    key={stg}
                    onClick={() => setActiveNoteStage(stg)}
                    className={`px-2.5 sm:px-3 py-1 rounded text-[9px] sm:text-[10px] uppercase tracking-wider font-mono transition-colors ${
                      activeNoteStage === stg
                        ? 'bg-navy-900 text-white font-medium'
                        : 'bg-navy-900/5 text-navy-muted hover:text-navy-900'
                    }`}
                  >
                    {stg.toUpperCase()}
                  </button>
                ))}
              </div>

              <p className="text-[11px] sm:text-xs text-navy-muted font-light mb-3 sm:mb-4 leading-relaxed">
                {FRAGRANCE_DATA.notesPyramid[activeNoteStage].description}
              </p>

              {/* Accords Grid */}
              <div className="space-y-1.5 sm:space-y-2.5">
                {FRAGRANCE_DATA.notesPyramid[activeNoteStage].accords.map((accord) => (
                  <div key={accord.name} className="p-2 sm:p-2.5 bg-ivory-warm/40 rounded border border-navy-900/5 flex items-center justify-between">
                    <div>
                      <strong className="text-[11px] sm:text-xs text-navy-900 font-serif block">{accord.name}</strong>
                      <span className="text-[9px] sm:text-[10px] text-navy-muted/80 italic">"{accord.note}"</span>
                    </div>
                    <span className="text-[9px] sm:text-[10px] text-navy-muted font-mono">{accord.origin}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SCENE 4: ATMOSPHERIC TERROIR TRANSITION */}
          <div
            ref={scene4Ref}
            className="will-change-transform max-w-xl self-start pointer-events-auto opacity-0"
          >
            <span className="text-[10px] font-mono tracking-widest uppercase text-mist-blue block mb-1.5 sm:mb-2">
              04 // NOCTURNAL TERROIR
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-white font-light mb-3 sm:mb-4">
              Where Midnight Coastlines Meet Pure Essence
            </h2>
            <p className="text-mist-blue/80 text-xs sm:text-sm font-light leading-relaxed mb-4 sm:mb-6">
              Harvested during dawn's earliest moisture window before solar evaporation dissipates delicate molecular esters. Extracted via cold supercritical CO₂ to preserve botanical truth.
            </p>
            <div className="flex flex-wrap items-center gap-2 sm:gap-6 text-[10px] sm:text-[11px] font-mono text-mist-blue/70">
              <div>GRASSE, FRANCE</div>
              <div className="w-1 h-1 rounded-full bg-mist-blue" />
              <div>MEDITERRANEAN BASIN</div>
              <div className="w-1 h-1 rounded-full bg-mist-blue" />
              <div>100% PURE EXTRACTION</div>
            </div>
          </div>

          {/* SCENE 5: THE FINAL HERO MASTERWORK */}
          <div
            ref={scene5Ref}
            className="will-change-transform max-w-xl self-center text-center pointer-events-auto opacity-0 w-full px-2"
          >
            <img
              src={BRAND_IDENTITY.assets.logo}
              alt="ZÄFIZZY"
              className="h-9 sm:h-12 mx-auto mb-3 sm:mb-4 object-contain"
            />
            <p className="font-serif text-xl sm:text-2xl md:text-3xl text-navy-950 font-normal leading-snug mb-5 sm:mb-6">
              "To wear ZÄFIZZY is to inhabit a realm where memory, architecture, and noble essence converge."
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
              <button
                onClick={onOpenConcierge}
                className="btn-luxury-shimmer inline-flex items-center justify-center gap-3 bg-navy-900 text-white text-xs uppercase tracking-widest-xl px-8 py-3.5 rounded-sm hover:bg-navy-800 transition-[color,background-color,border-color,box-shadow,opacity,transform] shadow-luxury w-full sm:w-auto"
              >
                <span>Inquire Private Atelier</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenAudit}
                className="inline-flex items-center justify-center gap-2 border border-navy-900/20 text-navy-900 text-xs uppercase tracking-widest px-6 py-3.5 rounded-sm hover:bg-navy-900/5 transition-colors w-full sm:w-auto"
              >
                <ShieldCheck className="w-4 h-4 text-navy-800" />
                <span>Examine 3D Dossier</span>
              </button>
            </div>
          </div>

          {/* Bottom Navigation Hint */}
          <div className="flex items-center justify-between text-[9px] sm:text-[11px] font-mono opacity-60 text-navy-muted">
            <span className="hidden md:inline">DESKTOP: POINTER PARALLAX ACTIVE</span>
            <span>CONTINUE SCROLLING FOR BRAND ATELIER & SPECIFICATIONS ↓</span>
          </div>

        </div>

      </div>
    </div>
  );
}
