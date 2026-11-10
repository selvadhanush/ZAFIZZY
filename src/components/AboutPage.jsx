import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { BRAND_IDENTITY } from '../data/brandData';

const STANDARDS = ['Full Natural', 'Close to Full Natural', 'With Natural', 'Alternative'];
const CLIENTS = [
  'B2B clients',
  'B2C clients',
  'Perfume brands',
  'Emerging fragrance houses',
  'Established brands',
  'Private-label / white-label clients',
  'Clients developing their own fragrance collections',
];
const TURNKEY = ['Mixing', 'Filling', 'Crimping', 'Labelling', 'Quality-Control Stations', 'Production Workflow', 'Technical Setup', 'Manufacturing Systemization'];

function Section({ eyebrow, title, children }) {
  return (
    <section className="bg-white/90 border border-navy-900/10 rounded-sm shadow-luxury p-5 sm:p-8 md:p-10">
      {eyebrow && (
        <div className="flex items-center gap-2.5 mb-2 sm:mb-3">
          <span className="w-8 h-[1.5px] bg-navy-950/60" />
          <span className="text-[10px] sm:text-xs tracking-widest-xl uppercase font-semibold font-mono text-navy-950">
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className="font-serif text-2xl sm:text-3xl text-navy-950 font-normal leading-tight mb-4">{title}</h2>
      <div className="space-y-4 text-navy-900 text-sm sm:text-[15px] font-normal leading-relaxed">{children}</div>
    </section>
  );
}

function Chips({ items }) {
  return (
    <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
      {items.map((i) => (
        <span key={i} className="px-2.5 py-1 bg-ivory-warm/70 border border-navy-900/10 rounded-sm text-[11px] sm:text-xs font-sans text-navy-900">
          {i}
        </span>
      ))}
    </div>
  );
}

export default function AboutPage({ onOpenConcierge }) {
  return (
    <div className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 bg-ivory-warm/40 border-b border-navy-900/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 space-y-5 sm:space-y-8">
        {/* Opening */}
        <header className="text-center">
          <p dir="rtl" lang="ar" className="text-2xl sm:text-3xl text-navy-950 mb-3">بسم الله الرحمن الرحيم</p>
          <p dir="rtl" lang="ar" className="text-lg sm:text-xl text-navy-950 mb-5">السلام عليكم ورحمة الله وبركاته</p>
          <img src={BRAND_IDENTITY.assets.logo} alt="ZÄFIZZY Perfumers & Perfumery" className="h-14 sm:h-20 w-auto mx-auto object-contain mb-3" />
          <span className="text-[10px] sm:text-xs tracking-widest-xl uppercase font-semibold font-mono text-navy-950 block mb-3">
            WITH THE GRACE OF ALLAAH (SWT)
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-navy-950 font-normal leading-tight">About Us</h1>
          <p className="text-navy-muted text-sm sm:text-base font-light mt-3">
            ZAFIZZY Perfumers &amp; Perfumery — Perfumery from Pondicherry, South India.
          </p>
        </header>

        <Section title="Respected Brothers & Sisters,">
          <p dir="rtl" lang="ar" className="text-lg text-navy-950">الحمد لله رب العالمين</p>
          <p>
            With the Grace of ALLAAH (SWT), ZAFIZZY has developed more than 37,000 fragrance formulations, and this number continues to grow as we develop new formulas, refine existing compositions, and expand our range, <span lang="ar">إن شاء الله</span>.
          </p>
          <p>
            We are a freelance manufacturer, we are manufacturing fragrance oil and perfume oil from Pondicherry, South India, specializing in the formulation, synthesization, systemization, and development of premium niche fragrance oils and perfume oils, created for clients seeking a level of refinement beyond ordinary commercial fragrance offerings.
          </p>
        </Section>

        <Section eyebrow="01" title="A Different Sensory Standard">
          <p>
            At ZAFIZZY, fragrance is not simply about making something that smells pleasant. It is about creating a recognizable sensory quality — the difference between something that merely shines and something that feels genuinely precious.
          </p>
          <p>
            We often describe this distinction as the difference between crystal and diamond. Both may appear beautiful, but their character, depth, brilliance, and presence are not experienced in the same way.
          </p>
          <p>
            Our makings are developed with this philosophy in mind. We pursue smoothness, depth, balance, richness, diffusion, and character, avoiding the harsh, flat, coarse, or obviously synthetic impression associated with low-grade fragrance materials.
          </p>
          <p>
            Our objective is not to create a fragrance that simply announces itself. It is to create one that reveals itself gradually, develops beautifully on the skin, and leaves a refined impression.
          </p>
        </Section>

        <Section eyebrow="02" title="Our Material & Formulation Standards">
          <p>
            We work across carefully selected formulation approaches according to the desired fragrance character, performance, application, and client requirements:
          </p>
          <Chips items={STANDARDS} />
          <p>
            Our standard is uncompromising: no low-grade or substandard synthetic materials are intentionally used as a shortcut to achieve volume, cost reduction, or a superficial impression of quality.
          </p>
          <p>
            Every formulation is approached according to its intended olfactive identity, with attention to harmony between materials rather than simply increasing intensity.
          </p>
        </Section>

        <Section eyebrow="03" title="Developed for Longevity & Maturation">
          <p>
            Our fragrance oils and perfume oils are formulated with consideration for stability, maturation, depth, and long-term olfactive character.
          </p>
          <p>
            When appropriately formulated and stored under suitable conditions, certain fragrance compositions can mature over time, allowing their different facets to become more rounded, integrated, and harmonious. In some compositions, extended resting can contribute to a richer and smoother sensory character.
          </p>
          <p>
            However, longevity and maturation are formulation-dependent. They are influenced by the raw materials, natural content, concentration, packaging, temperature, light, oxygen exposure, and storage conditions. We therefore do not treat a single shelf-life period as applicable to every fragrance.
          </p>
        </Section>

        <Section eyebrow="04" title="More Than 37,000 Formulations">
          <p>
            With the Grace of ALLAAH (SWT), our development library has grown to <strong>37,000+ formulations</strong>, alongside <strong>130+ exclusive in-house blends</strong>.
          </p>
          <p>
            This growing formulation base gives us the ability to work across different olfactive directions, market segments, concentration levels, and client requirements while continuing to develop new compositions, <span lang="ar">إن شاء الله</span>.
          </p>
          <p>
            Our work encompasses premium, niche, ultra-premium, luxury, oriental, Arabic, French-inspired, fine, and designer-oriented fragrance directions, with formulation approaches adapted to the intended application.
          </p>
        </Section>

        <Section eyebrow="05" title="Made Against Order">
          <p>
            Our fragrance oils and perfume oils are supplied against confirmed orders.
          </p>
          <p>
            This approach allows us to concentrate on the formulation, preparation, and production requirements of each order rather than treating every fragrance as a generic mass-produced commodity.
          </p>
          <p>We serve:</p>
          <Chips items={CLIENTS} />
        </Section>

        <Section eyebrow="06" title="Private & White-Label Manufacturing">
          <p>
            For brands seeking their own identity, we provide private-label and white-label fragrance manufacturing support against order, enabling clients to develop products under their own brand identity while working with our formulation and manufacturing capabilities.
          </p>
          <p>
            Our role is to provide the technical fragrance solution while the client's brand, commercial identity, positioning, packaging, and market direction remain under the client's control.
          </p>
        </Section>

        <Section eyebrow="07" title="Turnkey Perfume Manufacturing Support">
          <p>
            We also provide complete technical support for clients establishing perfume spray manufacturing and perfumery operations.
          </p>
          <p>Our turnkey support can cover areas such as:</p>
          <Chips items={TURNKEY} />
          <p>
            The objective is to provide a practical technical framework through which the client can establish and operate their own perfume manufacturing process.
          </p>
          <p>
            All funding, capital procurement, infrastructure investment, operating expenditure, and ongoing investment management remain the responsibility of the client. ZAFIZZY focuses on delivering the fragrance, formulation, technical, and manufacturing solution while the client retains control of their investment and business operations.
          </p>
        </Section>

        <Section eyebrow="08" title="Our Philosophy">
          <p>
            For us, perfumery is not about chasing volume at the expense of character.
          </p>
          <p>
            It is about formulation discipline, material selection, sensory refinement, consistency, maturation, and craftsmanship.
          </p>
          <p>
            We believe a truly premium fragrance should not need to rely on an aggressive chemical impression to demonstrate its presence. It should possess its own identity — smooth in its opening, expressive through its development, and memorable in its dry-down.
          </p>
          <p>That is the standard we continue to pursue at ZAFIZZY.</p>
        </Section>

        {/* Closing & contact */}
        <section className="bg-navy-950 text-white rounded-sm shadow-luxury p-6 sm:p-10 text-center">
          <p dir="rtl" lang="ar" className="text-xl sm:text-2xl mb-3">الحمد لله رب العالمين</p>
          <p className="text-white/80 text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto mb-6">
            With the grace of Allaah (SWT), we continue to formulate, refine, manufacture, and develop one composition at a time.
          </p>
          <p className="font-serif text-xl sm:text-2xl mb-1">ZAFIZZY Perfumers &amp; Perfumery</p>
          <p className="text-white/70 text-sm mb-1">Perfumery from Pondicherry, South India</p>
          <p className="font-serif italic text-champagne text-lg sm:text-xl mb-8">Acquire The World</p>

          <p className="text-white/70 text-sm mb-1">Warm regards,</p>
          <p className="font-serif text-xl">Jinna</p>
          <p className="text-white/70 text-sm mb-6">
            Founder · ZAFIZZY Perfumers &amp; Perfumery · Pondicherry, South India
          </p>

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
