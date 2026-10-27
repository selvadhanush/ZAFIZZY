import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Clock, BookOpen } from 'lucide-react';
import { GAZETTE_POSTS } from '../data/brandData';

gsap.registerPlugin(ScrollTrigger);

/**
 * The Atelier Gazette / Editorial Insights
 * Inspired by the reference video's blog posts section (00:20-00:23)
 * Elegant 3-column articles with subtle image zoom and fine editorial tags.
 */
export default function AtelierGazette() {
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
      id="gazette"
      ref={sectionRef}
      className="relative py-14 sm:py-20 md:py-28 bg-white/70 backdrop-blur-[1px] border-b border-navy-900/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-4 sm:gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="w-6 h-px bg-navy-900/40" />
              <span className="text-[10px] sm:text-[11px] tracking-widest-xl sm:tracking-widest-2xl uppercase font-semibold text-navy-muted">
                06 // ATELIER GAZETTE
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-navy-900 font-light leading-tight">
              Essays in Olfactory Form
            </h2>
          </div>

          <div className="text-[11px] sm:text-xs uppercase tracking-widest font-mono text-navy-muted flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-navy-900" />
            <span>DISPATCHES FROM GRASSE & VENICE</span>
          </div>
        </div>

        {/* 3-Column Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {GAZETTE_POSTS.map((post, idx) => (
            <article
              key={post.id}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="group cursor-pointer flex flex-col justify-between bg-ivory-warm/20 rounded-sm border border-navy-900/10 p-4 sm:p-5 hover:border-navy-900/30 transition-all duration-300 hover:shadow-luxury"
            >
              <div>
                {/* Image Frame with Gentle Scale on Hover */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-sm mb-6 bg-navy-950">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-navy-950/10 group-hover:bg-transparent transition-colors duration-300" />
                </div>

                {/* Tag & Read Time */}
                <div className="flex items-center justify-between text-[10px] font-mono tracking-widest uppercase text-navy-muted mb-3">
                  <span className="px-2 py-0.5 bg-white border border-navy-900/10 rounded">
                    {post.tag}
                  </span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl sm:text-2xl text-navy-900 font-normal mb-3 group-hover:text-navy-950 transition-colors">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-navy-muted text-xs sm:text-sm font-light leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              </div>

              {/* Bottom Metadata & Link */}
              <div className="pt-4 border-t border-navy-900/10 flex items-center justify-between text-[11px] font-mono text-navy-900/60 group-hover:text-navy-900 transition-colors">
                <span>{post.date}</span>
                <span className="inline-flex items-center gap-1 font-semibold text-navy-900">
                  Read Essay <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
