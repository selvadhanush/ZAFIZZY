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
        { scale: 0.92, borderRadius: '24px', opacity: 0.8 },
        {
          scale: 1,
          borderRadius: '4px',
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: imageFrameRef.current,
            start: 'top 80%',
            end: 'center 45%',
            scrub: true,
          },
        }
      );

      // Narrative text reveal
      gsap.from(narrativeColRef.current, {
        scrollTrigger: {
          trigger: narrativeColRef.current,
          start: 'top 75%',
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="world"
      ref={sectionRef}
      className="relative py-32 md:py-40 bg-navy-950 text-white overflow-hidden"
    >
      {/* Brand Signature Pattern Sheet overlay on dark navy */}
      <div
        className="absolute inset-0 bg-brand-pattern opacity-[0.06] mix-blend-screen pointer-events-none bg-cover bg-center"
        aria-hidden="true"
      />

      {/* Atmospheric Soft Lighting Field */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-navy-800/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-mist-blue/40" />
            <span className="text-[11px] tracking-widest-2xl uppercase font-semibold text-mist-blue">
              04 // ATMOSPHERIC TERROIR
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-light leading-tight">
            The Fragrance World
          </h2>
          <p className="text-mist-blue/70 text-base md:text-lg font-light mt-4">
            Where wild maritime coastlines collide with noble botanical cultivation. An ode to Mediterranean horizons and midnight calm.
          </p>
        </div>

        {/* Scroll-Expanding Cinematic Landscape */}
        <div className="relative mb-20 overflow-hidden">
          <div
            ref={imageFrameRef}
            className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden shadow-2xl border border-white/10"
          >
            <img
              src={BRAND_IDENTITY.assets.fragranceWorld}
              alt="ZÄFIZZY Fragrance World Campaign — Noble raw botanicals and coastal terroir"
              className="w-full h-full object-cover object-center"
            />

            {/* Gradient Sheen & Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-navy-950/20 pointer-events-none" />

            {/* Floating Editorial Caption */}
            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 max-w-md bg-navy-900/80 backdrop-blur-md p-4 sm:p-6 rounded border border-white/10">
              <span className="text-[10px] uppercase font-mono tracking-widest text-mist-blue block mb-1">
                TERROIR STUDY // BOTANICAL STILL LIFE
              </span>
              <p className="text-xs sm:text-sm text-ivory-warm font-serif italic">
                Blue Tuscan Iris, sun-drenched Calabrian bergamot slices, aromatic wild lavender, and Atlantic mineral sea salt.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Editorial Narrative Columns */}
        <div ref={narrativeColRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          
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
