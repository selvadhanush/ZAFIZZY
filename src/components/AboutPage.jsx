import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { BRAND_IDENTITY } from '../data/brandData';

function Section({ eyebrow, title, children }) {
  return (
    <section className="bg-white/90 border border-navy-900/10 rounded-sm shadow-luxury p-5 sm:p-8 md:p-10">
      <div className="flex items-center gap-2.5 mb-2 sm:mb-3">
        <span className="w-8 h-[1.5px] bg-navy-950/60" />
        <span className="text-[10px] sm:text-xs tracking-widest-xl uppercase font-semibold font-mono text-navy-950">
          {eyebrow}
        </span>
      </div>
      <h2 className="font-serif text-2xl sm:text-3xl text-navy-950 font-normal leading-tight mb-4">{title}</h2>
      <div className="space-y-4 text-navy-900 text-sm sm:text-[15px] font-normal leading-relaxed">{children}</div>
    </section>
  );
}

export default function AboutPage({ onOpenConcierge }) {
  return (
    <div className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 bg-ivory-warm/40 border-b border-navy-900/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 space-y-5 sm:space-y-8">
        <header className="text-center">
          <p dir="rtl" lang="ar" className="text-2xl sm:text-3xl text-navy-950 mb-3">بسم الله الرحمن الرحيم</p>
          <p className="text-[10px] sm:text-xs tracking-widest-xl uppercase font-semibold font-mono text-navy-950 mb-5">
            IN THE NAME OF ALLAH, THE BENEFICENT, THE MERCIFUL
          </p>
          <img src={BRAND_IDENTITY.assets.logo} alt="ZÄFIZZY Perfumers & Perfumery" className="h-14 sm:h-20 w-auto mx-auto object-contain mb-3" />
          <h1 className="font-serif text-3xl sm:text-5xl text-navy-950 font-normal leading-tight">ABOUT ZAFIZZY</h1>
          <p className="text-navy-950 text-sm sm:text-base font-semibold tracking-wide mt-4">ZAFIZZY PERFUMERS &amp; PERFUMERY</p>
          <p className="text-navy-muted text-sm sm:text-base font-light mt-2">Independent Fragrance Formulation Lab</p>
          <p className="text-navy-muted text-sm sm:text-base font-light mt-1">Perfumery from Pondicherry, South India.</p>
        </header>

        <Section eyebrow="01" title="WITH THE GRACE OF ALLAAH (SWT)">
          <p>
            ZAFIZZY Perfumers &amp; Perfumery is an independent freelance fragrance manufacturer specializing in the formulation, synthesization, systemization, and development of premium fragrance oils and perfume oils.
          </p>
          <p>
            With more than 37,000 fragrance formulations developed and 130+ exclusive in-house blends, we pursue distinctive compositions through formulation knowledge, considered material selection, and continuous refinement.
          </p>
        </Section>

        <Section eyebrow="02" title="OUR PHILOSOPHY">
          <p className="font-serif text-lg sm:text-xl text-navy-950">Beyond Ordinary Fragrance. Beyond Conventional Standards.</p>
          <p>We believe true fragrance excellence is defined by character, balance, depth, smoothness, and refinement, not simply intensity.</p>
          <p>Inspired by the distinction between Crystal and Diamond, our philosophy is to develop compositions with individuality, richness, and a distinctive olfactive character.</p>
          <p>A truly refined fragrance should not merely announce its presence; it should reveal its character.</p>
        </Section>

        <Section eyebrow="03" title="OUR VISION">
          <p>To advance the art and discipline of independent perfumery through knowledge, innovation, and formulation excellence.</p>
        </Section>

        <Section eyebrow="04" title="OUR MISSION">
          <p className="font-serif text-lg sm:text-xl text-navy-950">Formulate with Knowledge. Manufacture with Discipline. Refine with Purpose.</p>
          <p>To develop distinctive fragrance compositions and deliver specialized manufacturing solutions through thoughtful material selection, technical precision, and continuous refinement.</p>
        </Section>

        <Section eyebrow="05" title="WHAT WE DO">
          <p>Premium fragrance oil and perfume oil manufacturing.</p>
          <p>Full Natural, Close to Full Natural, With Natural, and Alternative formulations.</p>
          <p>Bespoke fragrance formulation and development.</p>
          <p>Private-label and white-label manufacturing.</p>
          <p>Turnkey perfume manufacturing and technical support. End-to-end Solutions</p>
        </Section>

        <Section eyebrow="06" title="OUR CLIENTS">
          <p>B2B | B2C | Independent Perfumers | Emerging Fragrance Houses | Established Brands | Private-Label Businesses.</p>
        </Section>

        <Section eyebrow="07" title="MANUFACTURING MOQ">
          <p>Normally 5 kg per item. Lower quantities may be considered for new starters, subject to feasibility and agreement.</p>
        </Section>

        <section className="bg-navy-950 text-white font-bold rounded-sm shadow-luxury p-6 sm:p-10 text-center">
          <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-6">
            We are not here merely to manufacture fragrances. We are here to advance the way fragrances are formulated, refined, and developed.
          </p>
          <p dir="rtl" lang="ar" className="text-xl sm:text-2xl mb-3">الحمد لله رب العالمين</p>
          <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-6">
            WITH THE GRACE OF ALLAAH (SWT), our journey continues, <span lang="ar" dir="rtl">إن شاء الله</span>.
          </p>
          <p className="font-serif text-xl sm:text-2xl mb-1">Jinna | Founder</p>
          <p className="text-white/70 text-sm mb-1">ZAFIZZY PERFUMERS &amp; PERFUMERY</p>
          <p className="font-serif not-italic font-extrabold text-white text-lg sm:text-xl mb-8">ACQUIRE THE WORLD.</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://wa.me/917448874772"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-white text-navy-950 text-xs font-mono uppercase tracking-widest rounded-sm hover:bg-champagne transition-colors"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp +91 74488 74772
            </a>
            <a
              href="tel:+917448874772"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 border border-white/40 text-white text-xs font-mono uppercase tracking-widest rounded-sm hover:bg-white/10 transition-colors"
            >
              <Phone className="w-4 h-4" /> Call
            </a>
            <button
              type="button"
              onClick={onOpenConcierge}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 border border-white/40 text-white text-xs font-mono uppercase tracking-widest rounded-sm hover:bg-white/10 transition-colors"
            >
              Private Atelier Inquiry
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
