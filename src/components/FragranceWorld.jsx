import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, Sparkles, MapPin, Feather } from 'lucide-react';
import { BRAND_IDENTITY } from '../data/brandData';

gsap.registerPlugin(ScrollTrigger);

export default function FragranceWorld() {
  const sectionRef = useRef(null);
  const imageFrameRef = useRef(null);
  const narrativeColRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      // Scroll-based image frame expansion from masked/cropped to full luxury aspect
      gsap.fromTo(
        imageFrameRef.current,
        { scale: 0.94, borderRadius: '20px', opacity: 0.85 },
        {
          scale: 1,
          borderRadius: '4px',
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: imageFrameRef.current,
            start: 'top 92%',
            end: 'center 50%',
            scrub: true,
          },
        }
      );

      // Narrative text reveal
      gsap.fromTo(
        narrativeColRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: narrativeColRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="world"
      ref={sectionRef}
      className="relative py-14 sm:py-20 md:py-28 bg-navy-950 text-white overflow-hidden"
    >
      {/* Brand Signature Pattern Sheet overlay on dark navy */}
      <div
        className="absolute inset-0 bg-brand-pattern opacity-[0.06] mix-blend-screen pointer-events-none bg-cover bg-center"
        aria-hidden="true"
      />

      {/* Atmospheric Soft Lighting Field */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-navy-800/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-10 sm:mb-16">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <span className="w-6 h-px bg-mist-blue/40" />
            <span className="text-[10px] sm:text-[11px] tracking-widest-xl sm:tracking-widest-2xl uppercase font-semibold text-mist-blue">
              04 // ATMOSPHERIC TERROIR
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-light leading-tight">
            The Fragrance World
          </h2>
          <p className="text-mist-blue/70 text-xs sm:text-base md:text-lg font-light mt-3 sm:mt-4 leading-relaxed">
            Where wild maritime coastlines collide with noble botanical cultivation. An ode to Mediterranean horizons and midnight calm.
          </p>
        </div>

        {/* Scroll-Expanding Cinematic Landscape Window with Centered Floating Card (Video 00:11-00:15) */}
        <div className="relative mb-12 sm:mb-20 overflow-hidden">
          <div
            ref={imageFrameRef}
            className="relative w-full min-h-[400px] sm:min-h-[480px] md:min-h-[560px] flex items-center justify-center overflow-hidden shadow-2xl border border-white/10 rounded"
          >
            <img
              src={BRAND_IDENTITY.assets.fragranceWorld}
              alt="ZÄFIZZY Fragrance World Campaign — Noble raw botanicals and coastal terroir"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
            />

            {/* Gradient Sheen & Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/35 to-navy-950/40 pointer-events-none" />

            {/* Centered Floating Luxury Card (Inspired by 00:11-00:15) */}
            <div className="relative z-10 max-w-xl mx-3 sm:mx-auto bg-white/95 text-navy-900 backdrop-blur-md p-5 sm:p-8 md:p-10 rounded-sm shadow-2xl border border-white/40 text-center">
              {/* Monogram emblem */}
              <div className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-3 sm:mb-4 flex items-center justify-center text-navy-900">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                  <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
                </svg>
              </div>

              <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-widest-xl sm:tracking-widest-2xl text-navy-muted block mb-1.5 sm:mb-2">
                04 // BOTANICAL PROVENANCE
              </span>

              <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-navy-900 font-light mb-2.5 sm:mb-4">
                The Terroir of ZÄFIZZY
              </h3>

              <p className="text-navy-muted text-xs sm:text-sm font-light leading-relaxed max-w-md mx-auto mb-4 sm:mb-6">
                Our rare botanicals are sourced from private estates spanning the sun-drenched terraced hills of Grasse to maritime cliffs of Calabria and the Tuscan iris plains.
              </p>

              <div className="flex items-center justify-center gap-3 sm:gap-4 text-[9px] sm:text-[10px] font-mono text-navy-900/60 uppercase">
                <span>GRASSE</span>
                <span className="w-1 h-1 rounded-full bg-navy-900/40" />
                <span>FLORENCE</span>
                <span className="w-1 h-1 rounded-full bg-navy-900/40" />
                <span>CALABRIA</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Editorial Narrative Columns */}
        <div ref={narrativeColRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 md:gap-12">
          
          <div className="p-6 rounded border border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-2 text-mist-blue text-xs font-mono mb-3">
              <MapPin className="w-3.5 h-3.5" />
              <span>TERROIR D'ORIGINE</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-white font-light mb-3">
              Nocturnal Harvest
            </h3>
            <p className="text-mist-blue/70 text-xs sm:text-sm font-light leading-relaxed">
              Petals gathered strictly during dawn's earliest moisture window, before solar evaporation dissipates volatile molecular esters.
            </p>
          </div>

          <div className="p-6 rounded border border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-2 text-mist-blue text-xs font-mono mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>COLD EXTRACTION</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-white font-light mb-3">
              Purity of Essence
            </h3>
            <p className="text-mist-blue/70 text-xs sm:text-sm font-light leading-relaxed">
              Supercritical CO₂ distillation extracts essential oils without thermal degradation, preserving the crisp botanical integrity of each harvest.
            </p>
          </div>

          <div className="p-6 rounded border border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-2 text-mist-blue text-xs font-mono mb-3">
              <Feather className="w-3.5 h-3.5" />
              <span>ORGANIC INTEGRITY</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-white font-light mb-3">
              Architectural Sillage
            </h3>
            <p className="text-mist-blue/70 text-xs sm:text-sm font-light leading-relaxed">
              A fragrance formulated without artificial stabilizers. It adapts naturally to personal skin chemistry, projecting a distinct intimate sillage.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
