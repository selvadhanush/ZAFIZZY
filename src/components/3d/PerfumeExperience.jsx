import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroFrameSequence from './HeroFrameSequence';

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
  const leftPanelRef = useRef(null);

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

      // Left editorial panel: visible at the start, fades up and out as the bottle sequence begins
      tl.fromTo(leftPanelRef.current,
        { opacity: 1, y: 0 },
        { opacity: 0, y: -30, duration: 0.12, ease: 'power2.inOut' },
        0.06
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

          {/* LEFT EDITORIAL PANEL (desktop) */}
          <div
            ref={leftPanelRef}
            className="hidden md:flex absolute left-12 lg:left-20 top-1/2 -translate-y-1/2 max-w-sm flex-col items-start pointer-events-auto will-change-transform"
          >
            <span className="flex items-center gap-3 text-[11px] font-mono tracking-widest-xl uppercase text-champagne mb-5">
              <span className="w-10 h-[1.5px] bg-champagne/70" />
              Perfumers &amp; Perfumery
            </span>
            <h1 className="font-serif text-5xl lg:text-6xl font-light text-white leading-[1.05] tracking-tight mb-5">
              ZÄFIZZY
              <span className="block italic text-champagne text-3xl lg:text-4xl mt-2">Acquire the World</span>
            </h1>
            <p className="text-white/70 text-sm font-light leading-relaxed mb-8">
              Ultra-premium niche perfumery — oud, amber and rare florals, composed with depth, finesse and unmistakable character.
            </p>
            <a
              href="#/collection/both"
              className="btn-luxury-shimmer inline-flex items-center gap-3 bg-white text-navy-950 text-xs uppercase tracking-widest-xl px-7 py-3.5 rounded-sm hover:bg-champagne transition-colors"
            >
              Explore the Collection <span aria-hidden="true">→</span>
            </a>
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
