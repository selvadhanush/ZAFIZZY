import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ArrowRight, Droplet, Clock, ShieldCheck, Compass } from 'lucide-react';
import { PERFUME_EDITIONS } from '../data/brandData';

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-Driven Perfume Collection Showcase
 * Positioned right above 02 // ATELIER SPECIFICATIONS (The Flacon Architecture)
 * 
 * Animation Mechanics:
 * As user scrolls down, perfume cards transition one by one:
 * - Each card glides in from the left, rests at centre, then exits right
 * - Fully reversible upon upward scroll with zero jitter
 */
export default function PerfumeCollectionShowcase() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const cards = cardsRef.current;
      if (!cards || cards.length === 0) return;

      // Each card travels the full stage, scrubbed by scroll: enters from the LEFT edge,
      // glides to the CENTRE, dwells, then exits to the RIGHT and fades out. Fully reversible.
      const STEP = 2.2;   // timeline units between successive card entries
      const TOTAL = STEP * (cards.length - 1) + 2.5;
      cards.forEach((card) => {
        if (card) gsap.set(card, { xPercent: -110, opacity: 0 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          onUpdate: (self) => {
            const t = self.progress * TOTAL;
            const next = Math.min(cards.length - 1, Math.floor((t + 0.1) / STEP));
            setActiveIndex((prev) => (prev !== next ? next : prev));
          },
        },
      });

      cards.forEach((card, i) => {
        if (!card) return;
        const at = i * STEP;
        // Enter: left end -> centre
        tl.fromTo(card,
          { xPercent: -110, opacity: 0 },
          { xPercent: 0, opacity: 1, ease: 'power2.out', duration: 1.0, immediateRender: true },
          at
        );
        // Exit: centre -> right, disappearing
        tl.to(card,
          { xPercent: 110, opacity: 0, ease: 'power2.in', duration: 1.0 },
          at + 1.5
        );
      });
      tl.to({}, { duration: 0 }, TOTAL); // pad timeline to TOTAL
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
      id="curated-editions"
      ref={sectionRef}
      className="relative w-full h-[320vh] bg-ivory-warm/30 border-t border-b border-navy-900/10"
    >
      {/* Subtle Pattern Overlay */}
      <div
        className="absolute inset-0 bg-brand-pattern opacity-[0.035] pointer-events-none bg-center bg-cover"
        aria-hidden="true"
      />

      {/* STICKY FULLSCREEN VIEWPORT CONTAINER */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between py-4 sm:py-6 md:py-12 px-3 sm:px-6 md:px-12 z-10">
        
        {/* Top Section Header */}
        <div className="max-w-4xl mx-auto w-full flex flex-col sm:flex-row sm:items-end justify-between gap-2.5 sm:gap-4">
          <div>
            <div className="flex items-center gap-2 sm:gap-2.5 mb-1 sm:mb-2">
              <span className="w-6 sm:w-8 h-[1.5px] bg-navy-950/60" />
              <span className="text-[10px] sm:text-xs tracking-widest-xl sm:tracking-widest-2xl uppercase font-semibold font-mono text-navy-950">
                01.5 // THE ATELIER EDITIONS
              </span>
            </div>
            <h2 className="font-serif text-xl sm:text-3xl md:text-4xl text-navy-950 font-normal leading-tight">
              Curated Perfume Flacons
            </h2>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
            {/* Active Card Indicator */}
            <div className="flex items-center gap-1.5 font-mono text-xs text-navy-950 bg-white/80 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded border border-navy-900/10 shadow-sm">
              <span className="font-semibold text-navy-950">0{activeIndex + 1}</span>
              <span className="text-navy-950/40">/</span>
              <span className="text-navy-950/60">03</span>
              <span className="ml-2 text-[10px] tracking-wider uppercase text-navy-950/60 font-sans hidden sm:inline">
                SCROLL TRANSITION
              </span>
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center gap-1.5">
              {[0, 1, 2].map((idx) => (
                <span
                  key={idx}
                  className={`h-1.5 rounded-full transition-[color,background-color,border-color,box-shadow,opacity,transform] duration-300 ${
                    activeIndex === idx
                      ? 'w-6 bg-navy-950'
                      : 'w-1.5 bg-navy-950/20'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ─── Center Viewport: Horizontal Transitioning Cards Stack ─── */}
        <div className="relative w-full max-w-4xl mx-auto h-[530px] sm:h-[490px] md:h-[490px] max-h-[76vh] flex items-center justify-center my-auto">
          {PERFUME_EDITIONS.map((perfume, idx) => (
            <div
              key={perfume.id}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="absolute inset-0 w-full h-full bg-white/95 rounded-sm border border-navy-900/10 shadow-luxury p-3.5 sm:p-6 md:p-10 flex flex-col md:flex-row items-center gap-3 sm:gap-6 md:gap-10 overflow-hidden"
              style={{ willChange: 'transform, opacity' }}
            >
              {/* Left Column: Flacon Visual & Accent Badge */}
              <div className="w-full md:w-5/12 h-24 sm:h-40 md:h-full relative flex items-center justify-center bg-gradient-to-b from-ivory-warm/60 to-mist-blue/20 rounded border border-navy-900/5 p-2 sm:p-4 overflow-hidden group shrink-0">
                <img
 decoding="async"
                  src={perfume.image}
                  alt={perfume.name}
                  className="max-h-full max-w-full object-contain filter drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Floating Concentration Pill */}
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 py-0.5 sm:px-2.5 sm:py-1 bg-white/90 rounded text-[9px] sm:text-[10px] font-mono font-semibold tracking-wider uppercase text-navy-950 border border-navy-900/10 shadow-sm">
                  {perfume.concentration.split(' ')[0]} EXTRAIT
                </div>

                {/* Floating Volume / Liquid Tone Pill */}
                <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 px-2 py-0.5 sm:px-2.5 sm:py-1 bg-navy-950 text-white rounded text-[9px] sm:text-[10px] font-mono tracking-wider uppercase shadow-sm">
                  {perfume.volume}
                </div>
              </div>

              {/* Right Column: Perfume Identity & Story */}
              <div className="w-full md:w-7/12 flex flex-col justify-between h-full overflow-y-auto md:overflow-visible pr-1 md:pr-0">
                <div>
                  {/* Top Badge & Star Monogram */}
                  <div className="flex items-center justify-between mb-1 sm:mb-2">
                    <span className="text-[10px] sm:text-[11px] font-mono tracking-widest-xl uppercase text-navy-950/70 font-semibold">
                      {perfume.editionNumber} // {perfume.tag}
                    </span>
                    <div className="w-4 h-4 flex items-center justify-center text-navy-950/50">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                        <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
                      </svg>
                    </div>
                  </div>

                  {/* Perfume Name */}
                  <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-navy-950 font-normal leading-tight mb-0.5 sm:mb-1">
                    {perfume.name}
                  </h3>

                  {/* Subtitle / Liquid Persona */}
                  <p className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-navy-950/60 mb-2 sm:mb-3">
                    {perfume.subtitle} • {perfume.liquidTone}
                  </p>

                  {/* Narrative Excerpt */}
                  <p className="text-navy-900 text-xs sm:text-sm font-normal leading-relaxed mb-2 sm:mb-4 line-clamp-2 sm:line-clamp-3 md:line-clamp-none">
                    {perfume.story}
                  </p>

                  {/* Olfactory Accords */}
                  <div className="mb-2 sm:mb-4">
                    <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-widest text-navy-950/50 block mb-1">
                      KEY ACCORDS
                    </span>
                    <div className="flex flex-wrap gap-1 sm:gap-1.5">
                      {perfume.accords.map((accord, aIdx) => (
                        <span
                          key={aIdx}
                          className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-ivory-warm/60 border border-navy-900/10 rounded-sm text-[10px] sm:text-[11px] font-sans text-navy-900"
                        >
                          {accord}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Specs Row & Action Button */}
                <div className="pt-2 sm:pt-3 border-t border-navy-900/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
                  <div className="grid grid-cols-3 gap-2 sm:gap-3 text-[9px] sm:text-[10px] font-mono text-navy-950/70">
                    {perfume.specs.map((spec, sIdx) => (
                      <div key={sIdx}>
                        <div className="text-[8px] sm:text-[9px] uppercase tracking-wider text-navy-950/40">
                          {spec.label}
                        </div>
                        <div className="font-medium text-navy-950 truncate">
                          {spec.val}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={scrollToExperience}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 bg-navy-950 text-white text-[11px] sm:text-xs font-mono uppercase tracking-wider rounded-sm hover:bg-navy-800 transition-colors shadow-sm shrink-0 w-full sm:w-auto"
                  >
                    <span>3D Inspect</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Scroll Instruction Cue */}
        <div className="max-w-4xl mx-auto w-full flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-navy-950/50 pt-1.5 sm:pt-2 border-t border-navy-900/10">
          <span>ZÄFIZZY ATELIER COLLECTIONS</span>
          <span className="hidden sm:inline tracking-wider">
            SCROLL: CARDS GLIDE LEFT ➔ CENTRE ➔ RIGHT
          </span>
          <span>HAUTE PARFUMERIE</span>
        </div>

      </div>
    </section>
  );
}
