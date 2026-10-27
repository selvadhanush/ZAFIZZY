import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Layers, Sliders, Box, ArrowUp } from 'lucide-react';
import { BRAND_IDENTITY, FRAGRANCE_DATA } from '../data/brandData';

gsap.registerPlugin(ScrollTrigger);

export default function SignatureFragrance({ onInspectNotes }) {
  const sectionRef = useRef(null);
  const bottleWrapRef = useRef(null);
  const textColRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      gsap.fromTo(
        bottleWrapRef.current,
        { scale: 0.96, opacity: 0.85, y: 20 },
        {
          scale: 1.02,
          opacity: 1,
          y: -10,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1.2,
          },
        }
      );

      gsap.fromTo(textColRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToExperience = () => {
    const el = document.getElementById('experience');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="signature"
      ref={sectionRef}
      className="relative py-14 sm:py-20 md:py-28 bg-white/70 backdrop-blur-[1px] overflow-hidden border-t border-navy-900/10"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-mist-blue/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-8 sm:mb-14">
          <div className="flex items-center gap-2 sm:gap-2.5 mb-2 sm:mb-3">
            <span className="w-6 sm:w-8 h-[1.5px] bg-navy-950/60" />
            <span className="text-[10px] sm:text-xs tracking-widest-xl sm:tracking-widest-2xl uppercase font-semibold font-mono text-navy-950">
              02 // ATELIER SPECIFICATIONS
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-navy-950 font-normal leading-tight">
            The Flacon Architecture
          </h2>
          <p className="text-navy-900 text-xs sm:text-sm md:text-base font-normal mt-2 sm:mt-3">
            Formulated to bridge architectural permanence and transient fragrance sillage.
          </p>
        </div>

        {/* 2-Column Product Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Product Studio Photography */}
          <div className="lg:col-span-6 relative flex justify-center">
            
            <div
              ref={bottleWrapRef}
              className="relative w-full max-w-md bg-ivory-warm/40 rounded-sm p-3.5 sm:p-6 border border-navy-900/10 shadow-luxury group"
            >
              <div className="relative overflow-hidden rounded">
                <img
                  src={BRAND_IDENTITY.assets.signatureBottle}
                  alt="ZÄFIZZY Flacon Specimen"
                  className="w-full h-auto object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Technical Specifications Footnote */}
              <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-navy-900/10 flex items-center justify-between text-[11px] sm:text-xs text-navy-900 font-mono font-medium">
                <span>FLACON SPECIMEN: N° 01</span>
                <span>EXTRAIT DE PARFUM // 100ML</span>
              </div>
            </div>

            <div className="absolute -inset-4 border border-navy-900/5 -z-10 rounded-sm pointer-events-none hidden sm:block" />
          </div>

          {/* Right Column: Editorial Specifications Dossier */}
          <div ref={textColRef} className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Product Name & Subhead */}
            <div className="mb-5 sm:mb-8">
              <span className="text-[10px] sm:text-xs font-mono tracking-widest text-navy-950 font-semibold uppercase block mb-1">
                {FRAGRANCE_DATA.edition}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-navy-950 font-medium">
                {FRAGRANCE_DATA.flaconName}
              </h3>
              <p className="text-[11px] sm:text-xs uppercase tracking-widest text-navy-950 font-semibold mt-1 font-mono">
                {FRAGRANCE_DATA.concentration}
              </p>
            </div>

            {/* Description */}
            <p className="text-navy-900 text-sm sm:text-base md:text-lg font-normal leading-relaxed mb-6 sm:mb-10">
              {FRAGRANCE_DATA.conceptDescription}
            </p>

            {/* Editorial Metrics (Sleek Linework, No Clunky Cards) */}
            <div className="border-t border-b border-navy-900/10 py-4 sm:py-6 mb-6 sm:mb-10 space-y-3 sm:space-y-4">
              <div className="text-[10px] sm:text-[11px] uppercase tracking-widest text-navy-900 font-semibold mb-1.5 sm:mb-2">
                Atelier Technical Dossier
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 sm:gap-y-4 gap-x-8">
                {FRAGRANCE_DATA.details.map((detail) => (
                  <div key={detail.label} className="border-b border-navy-900/5 pb-2.5 sm:pb-3">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-navy-muted block font-mono">
                      {detail.label}
                    </span>
                    <span className="text-xs sm:text-sm text-navy-900 font-medium mt-0.5 block">
                      {detail.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Group */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5 w-full sm:w-auto">
              <button
                onClick={scrollToExperience}
                className="btn-luxury-shimmer inline-flex items-center justify-center gap-2.5 bg-navy-900 text-white text-xs uppercase tracking-widest-xl px-7 py-3.5 rounded-sm hover:bg-navy-800 transition-colors shadow-sm w-full sm:w-auto"
              >
                <Box className="w-3.5 h-3.5" />
                <span>Return to 3D Turntable</span>
              </button>

              <button
                onClick={onInspectNotes}
                className="inline-flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-navy-900/80 hover:text-navy-900 transition-colors py-3 px-2 w-full sm:w-auto"
              >
                <span>Jump to Olfactory Notes</span>
                <span className="font-mono">→</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
