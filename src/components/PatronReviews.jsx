import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Star, Quote, ShieldCheck } from 'lucide-react';
import { PATRON_REVIEWS } from '../data/brandData';

gsap.registerPlugin(ScrollTrigger);

/**
 * Haute Parfumerie Reviews & Patron Testimonials
 * Inspired by the reference video's curated reviews section (00:16-00:18)
 * Elegant editorial quotes with verified collector credentials and refined typography.
 */
export default function PatronReviews() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      gsap.fromTo(
        cardsRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
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

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className="relative py-14 sm:py-20 md:py-28 bg-ivory-warm/30 border-t border-b border-navy-900/10 overflow-hidden"
    >
      {/* Background Subtle Pattern Overlay */}
      <div
        className="absolute inset-0 bg-brand-pattern opacity-[0.035] pointer-events-none bg-cover bg-center"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        
        {/* Section Header with Client Approval Badge */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
            <span className="w-6 h-px bg-navy-900/40" />
            <span className="text-[10px] sm:text-[11px] tracking-widest-xl sm:tracking-widest-2xl uppercase font-semibold text-navy-muted">
              05 // CURATED REVIEWS
            </span>
            <span className="w-6 h-px bg-navy-900/40" />
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-navy-900 font-light mb-3 sm:mb-4">
            Voices of the Connoisseurs
          </h2>
          <p className="text-navy-muted text-xs sm:text-base font-light mb-4">
            Curated patron reflections demonstrating editorial tone and brand presentation.
          </p>

          {/* Client Sign-off Flag Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-navy-900/15 rounded text-[10px] sm:text-[11px] text-navy-muted shadow-sm max-w-full text-left">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
            <span>Creative Direction Draft — Sample Patron Copy Pending Client Confirmation</span>
          </div>
        </div>

        {/* Reviews 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
          {PATRON_REVIEWS.map((review, idx) => (
            <div
              key={review.id}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="bg-white p-5 sm:p-8 md:p-9 rounded-sm border border-navy-900/10 shadow-luxury hover:shadow-luxury-hover transition-all duration-300 flex flex-col justify-between group hover:border-navy-900/30"
            >
              <div>
                {/* 5-Star Diamond Rating */}
                <div className="flex items-center gap-1.5 mb-4 sm:mb-6 text-navy-900">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="text-xs text-navy-900">★</span>
                  ))}
                </div>

                {/* Editorial Quote */}
                <p className="font-serif text-base sm:text-lg md:text-xl text-navy-900 font-light italic leading-relaxed mb-4 sm:mb-6">
                  "{review.quote}"
                </p>
              </div>

              {/* Author & Verification Footnote */}
              <div className="pt-6 border-t border-navy-900/5">
                <div className="font-serif text-base text-navy-900 font-medium">
                  {review.author}
                </div>
                <div className="text-[11px] text-navy-muted font-light mb-1">
                  {review.title}
                </div>
                <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase text-navy-900/60 tracking-wider">
                  <ShieldCheck className="w-3 h-3 text-navy-800" />
                  <span>{review.verified}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
