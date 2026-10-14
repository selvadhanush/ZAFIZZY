import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Edit3, Compass, CheckCircle2 } from 'lucide-react';
import { BRAND_IDENTITY, PHILOSOPHY_PILLARS } from '../data/brandData';

gsap.registerPlugin(ScrollTrigger);

export default function BrandPhilosophy() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      // Scroll-triggered text reveal
      gsap.from(headlineRef.current, {
        scrollTrigger: {
          trigger: headlineRef.current,
          start: 'top 85%',
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      // Cards staggered reveal
      gsap.from(cardsRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.2,
        ease: 'power2.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="relative py-28 md:py-36 bg-ivory-warm/40 overflow-hidden border-t border-b border-navy-900/10"
    >
      {/* Subtle Pattern Sheet Overlay from BG.png */}
      <div
        className="absolute inset-0 bg-brand-pattern opacity-[0.04] mix-blend-multiply pointer-events-none bg-center bg-cover"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header with Client Approval Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-px bg-navy-900/40" />
              <span className="text-[11px] tracking-widest-2xl uppercase font-semibold text-navy-muted">
                01 // THE MANIFESTO
              </span>
            </div>
            <h2
              ref={headlineRef}
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-navy-900 font-light max-w-3xl leading-[1.15]"
            >
              "Fragrance is not merely an aroma; it is an <span className="italic font-normal">invisible architecture</span> of memory and presence."
            </h2>
          </div>

          {/* Client Placeholder Note */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-navy-900/15 rounded text-[11px] text-navy-muted max-w-xs shrink-0 shadow-sm">
            <Edit3 className="w-3.5 h-3.5 text-navy-800 shrink-0" />
            <span>Brand Copy Draft — Marked for Client Review & Approval</span>
          </div>
        </div>

        {/* Asymmetrical 3-Column Philosophy Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mt-12">
          {PHILOSOPHY_PILLARS.map((pillar, idx) => (
            <div
              key={pillar.number}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="relative p-8 md:p-10 bg-white/80 backdrop-blur-sm border border-navy-900/10 rounded-sm hover:border-navy-900/30 transition-all duration-300 group shadow-sm hover:shadow-luxury"
            >
              {/* Pillar Number & Monogram Motif */}
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-xs tracking-widest text-navy-900/40 font-semibold">
                  {pillar.number}
                </span>
                
                {/* 4-point Diamond Star inspired by the ZÄFIZZY logo mark */}
                <div className="w-5 h-5 flex items-center justify-center text-navy-900/30 group-hover:text-navy-900 transition-colors">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
                  </svg>
                </div>
              </div>

              {/* Pillar Subtitle */}
              <p className="text-[11px] tracking-widest-xl uppercase text-navy-muted font-medium mb-2">
                {pillar.subtitle}
              </p>

              {/* Pillar Title */}
              <h3 className="font-serif text-2xl text-navy-900 font-normal mb-4 group-hover:text-navy-950">
                {pillar.title}
              </h3>

              {/* Pillar Description */}
              <p className="text-navy-muted/90 text-sm font-light leading-relaxed">
                {pillar.description}
              </p>

              {/* Fine Bottom Accent Line */}
              <div className="mt-8 pt-4 border-t border-navy-900/5 flex items-center justify-between text-[10px] text-navy-900/40 font-mono">
                <span>ZÄFIZZY ATELIER</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">APPROVED FORMAT</span>
              </div>
            </div>
          ))}
        </div>

        {/* Brand Quote Callout */}
        <div className="mt-20 p-8 sm:p-12 bg-navy-900 text-white rounded-sm relative overflow-hidden shadow-luxury">
          <div className="absolute right-0 top-0 w-96 h-full bg-brand-pattern opacity-10 mix-blend-screen bg-cover bg-right pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl">
            <span className="text-[10px] uppercase tracking-widest-2xl text-mist-blue font-semibold block mb-3">
              CREATIVE DIRECTION MANDATE
            </span>
            <p className="font-serif text-xl sm:text-2xl md:text-3xl font-light italic leading-relaxed text-ivory-warm">
              "We reject ephemeral trends and commercial noise. We craft olfactory forms that stand as enduring monologues between the wearer and their destiny."
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="w-6 h-px bg-mist-blue/40" />
              <span className="text-xs uppercase tracking-widest text-mist-blue/80">
                HOUSE OF {BRAND_IDENTITY.name} — PERFUMERS & PERFUMERY
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
