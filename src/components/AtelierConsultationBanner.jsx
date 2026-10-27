import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Sparkles, Calendar, Mail, MapPin } from 'lucide-react';
import { BRAND_IDENTITY } from '../data/brandData';

gsap.registerPlugin(ScrollTrigger);

/**
 * Private Consultation & Atelier Concierge Banner
 * Inspired directly by the split consultation section (00:24-00:26) in the reference video!
 * A rich split-color luxury layout (Midnight Navy & Warm Ivory) with direct concierge action.
 */
export default function AtelierConsultationBanner({ onOpenConcierge }) {
  const bannerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      gsap.fromTo(
        bannerRef.current,
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bannerRef.current,
            start: 'top 92%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, bannerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative py-12 sm:py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div
          ref={bannerRef}
          className="relative rounded-sm overflow-hidden border border-navy-900/10 shadow-2xl grid grid-cols-1 lg:grid-cols-12"
        >
          {/* Left Column: Atmospheric Terroir Image & Pattern Sheen */}
          <div className="lg:col-span-5 relative min-h-[240px] sm:min-h-[280px] lg:min-h-[380px] bg-navy-950 flex flex-col justify-between p-6 sm:p-8 md:p-10 text-white overflow-hidden">
            <img
              src={BRAND_IDENTITY.assets.fragranceWorld}
              alt="ZÄFIZZY Botanical Terroir"
              className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-navy-950/40 pointer-events-none" />

            <div className="relative z-10 flex items-center gap-2 text-mist-blue text-[11px] sm:text-xs font-mono uppercase tracking-widest mb-4 sm:mb-0">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PRIVATE SALON SITTINGS</span>
            </div>

            <div className="relative z-10">
              <span className="text-[9px] sm:text-[10px] font-mono uppercase text-mist-blue/70 block mb-1">
                COMPLIMENTARY OLFACTORY STUDY
              </span>
              <p className="font-serif text-xl sm:text-2xl md:text-3xl font-light text-white leading-snug">
                "Fragrance is the most intimate garment one wears. Allow us to orchestrate your custom signature."
              </p>
            </div>
          </div>

          {/* Right Column: Midnight Navy Action Callout matching reference video */}
          <div className="lg:col-span-7 bg-navy-900 text-white p-6 sm:p-10 md:p-14 flex flex-col justify-between relative">
            {/* Background Pattern Sheen */}
            <div
              className="absolute inset-0 bg-brand-pattern opacity-10 mix-blend-screen pointer-events-none bg-cover bg-center"
              aria-hidden="true"
            />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <span className="w-6 h-px bg-mist-blue/40" />
                <span className="text-[10px] sm:text-[11px] tracking-widest-xl sm:tracking-widest-2xl uppercase font-semibold text-mist-blue">
                  07 // PRIVATE CONCIERGE
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-light text-white leading-tight mb-3 sm:mb-4">
                Book Your Atelier Consultation
              </h2>

              <p className="text-mist-blue/80 text-xs sm:text-sm font-light leading-relaxed max-w-xl mb-6 sm:mb-8">
                Reserve an individual sensory consultation with our senior nose. We offer bespoke bottle engraving, private salon samplings, and worldwide white-glove atelier dispatch.
              </p>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-[10px] sm:text-[11px] font-mono text-mist-blue/70 mb-8 sm:mb-10">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-mist-blue" />
                  <span>PARIS // GRASSE // DUBAI</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-mist-blue" />
                  <span>PRIVATE APPOINTMENT</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                onClick={onOpenConcierge}
                className="btn-luxury-shimmer inline-flex items-center justify-center gap-3 bg-white text-navy-900 text-xs uppercase tracking-widest-xl px-7 py-3.5 sm:px-8 sm:py-4 rounded-sm hover:bg-ivory-warm transition-all font-medium shadow-luxury w-full sm:w-auto"
              >
                <span>Request Private Appointment</span>
                <ArrowUpRight className="w-4 h-4 text-navy-900" />
              </button>

              <span className="text-[11px] sm:text-xs text-mist-blue/60 font-mono tracking-wider text-center sm:text-left">
                Simulated Concierge Desk
              </span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
