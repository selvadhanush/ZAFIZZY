import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, ArrowUpRight } from 'lucide-react';
import HeroFrameSequence from './HeroFrameSequence';
import { BRAND_IDENTITY } from '../../data/brandData';

gsap.registerPlugin(ScrollTrigger);

/**
 * Master Scroll-Driven Bottle Sequence Experience
 * High-performance architecture:
 * 1. ZERO React re-renders on pointer movement (pointerRef mutation)
 * 2. GSAP timeline drives DOM overlay opacities and transforms with hardware acceleration
 * 3. Dedicated GPU opacity layer handles White-to-Navy transition with zero layout reflow
 */
export default function PerfumeExperience({ onOpenAudit, onOpenConcierge }) {
  const containerRef = useRef(null);
  const scrollProgressRef = useRef(0);

  // DOM Refs for direct hardware-accelerated animations (No React re-render thrashing)
  const scene4Ref = useRef(null);
  const scene5Ref = useRef(null);

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

      // Master scroll timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
          fastScrollEnd: true,
          onUpdate: (self) => {
            const p = self.progress;
            scrollProgressRef.current = p;

          },
        },
      });

      // ─── Choreographed GSAP Transitions Across the Remaining Scenes ───

      // SCENE 4: Nocturnal Terroir Text
      tl.fromTo(scene4Ref.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.10, ease: 'power2.out' },
        0.23
      );
      tl.to(scene4Ref.current,
        { opacity: 0, y: -30, duration: 0.08, ease: 'power2.in' },
        0.42
      );

      // Keep the closing brand statement visible through the end of the scroll.
      tl.fromTo(scene5Ref.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.08, ease: 'power2.out' },
        0.46
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
          {/* DYNAMIC SCENE CONTENT */}

          {/* SCENE 4: ATMOSPHERIC TERROIR TRANSITION */}
          <div
            ref={scene4Ref}
            className="will-change-transform mt-8 max-w-xl self-start pointer-events-auto opacity-0"
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
