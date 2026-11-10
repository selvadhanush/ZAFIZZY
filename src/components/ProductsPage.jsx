import React, { useState, useMemo, useEffect } from 'react';
import { ArrowRight, X, Search } from 'lucide-react';
import { PRODUCTS, AUDIENCES, splitList } from '../data/products';

const AUDIENCE_COPY = {
  both: 'The complete ZÄFIZZY atelier — every flacon, for every wearer.',
  him: 'Deep, commanding compositions — woods, oud, amber and spice — suited to him.',
  her: 'Luminous florals, creamy gourmands and soft ambers — suited to her.',
};

const PROFILE_ROWS = [
  ['olfactive', 'Olfactive Character'],
  ['type', 'Type'],
  ['category', 'Category'],
  ['family', 'Fragrance Family'],
  ['style', 'Style'],
  ['gender', 'Gender'],
  ['concentration', 'Concentration'],
  ['character', 'Character'],
  ['season', 'Season'],
  ['bestFor', 'Best For'],
  ['performance', 'Performance'],
];

function Chip({ children }) {
  return (
    <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-ivory-warm/60 border border-navy-900/10 rounded-sm text-[10px] sm:text-[11px] font-sans text-navy-900">
      {children}
    </span>
  );
}

function ProductCard({ product, onOpen, onInquire }) {
  const { profile } = product;
  const family = splitList(profile.family).slice(0, 3);
  return (
    <article className="group bg-white/95 rounded-sm border border-navy-900/10 shadow-luxury hover:shadow-luxury-hover transition-[box-shadow,transform] duration-300 hover:-translate-y-1 flex flex-col overflow-hidden">
      <button
        type="button"
        onClick={() => onOpen(product)}
        className="relative block w-full aspect-[4/5] bg-black overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-950"
        aria-label={`View details for ${product.name}`}
      >
        <img
          src={product.image}
          alt={`${product.name} flacon`}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        {profile.concentration && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 rounded text-[9px] sm:text-[10px] font-mono font-semibold tracking-wider uppercase text-navy-950 border border-navy-900/10 shadow-sm">
            {profile.concentration.split('|')[0].trim()}
          </span>
        )}
        <span className="absolute bottom-3 right-3 px-2.5 py-1 bg-navy-950 text-white rounded text-[9px] sm:text-[10px] font-mono tracking-wider uppercase shadow-sm">
          {product.gender === 'women' ? 'For Her' : 'Unisex'}
        </span>
      </button>

      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <span className="text-[10px] font-mono tracking-widest uppercase text-navy-950/60 font-semibold mb-1.5">
          {product.code}
        </span>
        <h3 className="font-serif text-xl sm:text-2xl text-navy-950 font-normal leading-tight">
          {product.name}
        </h3>
        {product.byline && (
          <p className="text-[11px] font-serif italic text-navy-muted mt-0.5">{product.byline}</p>
        )}
        <p className="text-[10px] font-mono uppercase tracking-widest text-navy-950/60 mt-2 mb-3">
          {product.blend}
        </p>

        {family.length > 0 && (
          <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-4">
            {family.map((f) => <Chip key={f}>{f}</Chip>)}
          </div>
        )}

        <div className="mt-auto pt-3 border-t border-navy-900/10 flex items-center gap-2">
          <button
            type="button"
            onClick={() => onOpen(product)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 border border-navy-900/20 text-navy-950 text-[11px] font-mono uppercase tracking-wider rounded-sm hover:bg-navy-900/5 transition-colors"
          >
            Details
          </button>
          <button
            type="button"
            onClick={() => onInquire(product)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-navy-950 text-white text-[11px] font-mono uppercase tracking-wider rounded-sm hover:bg-navy-800 transition-colors"
          >
            Inquire <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
}

function ProductModal({ product, onClose, onInquire }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const { profile } = product;
  const direction = splitList(profile.direction);

  return (
    <div
      className="fixed inset-0 z-[60] bg-navy-950/60 flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
    >
      <div
        className="relative w-full max-w-5xl max-h-[92vh] bg-white rounded-sm shadow-2xl overflow-y-auto md:overflow-hidden flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 border border-navy-900/15 flex items-center justify-center text-navy-950 hover:bg-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="md:w-5/12 bg-black shrink-0">
          <img src={product.image} alt={`${product.name} flacon`} className="w-full h-64 sm:h-80 md:h-full object-cover object-center" />
        </div>

        <div className="md:w-7/12 p-5 sm:p-8 md:overflow-y-auto">
          <span className="text-[10px] font-mono tracking-widest uppercase text-navy-950/60 font-semibold">
            {product.code} // {product.blend}
          </span>
          <h3 className="font-serif text-2xl sm:text-4xl text-navy-950 font-normal leading-tight mt-1">
            {product.name}
          </h3>
          {product.byline && <p className="text-sm font-serif italic text-navy-muted">{product.byline}</p>}

          <p className="text-navy-900 text-xs sm:text-sm font-normal leading-relaxed mt-4 mb-6">
            {product.description}
          </p>

          <span className="text-[10px] uppercase font-mono tracking-widest text-navy-950/50 block mb-3">
            FRAGRANCE PROFILE
          </span>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-6">
            {PROFILE_ROWS.filter(([k]) => profile[k]).map(([k, label]) => (
              <div key={k} className={k === 'olfactive' || k === 'bestFor' || k === 'performance' || k === 'character' ? 'sm:col-span-2' : ''}>
                <dt className="text-[9px] uppercase tracking-wider font-mono text-navy-950/40">{label}</dt>
                <dd className="text-xs text-navy-950 font-medium leading-relaxed">
                  {splitList(profile[k]).join(' · ')}
                </dd>
              </div>
            ))}
          </dl>

          {direction.length > 0 && (
            <div className="mb-6">
              <span className="text-[9px] uppercase tracking-wider font-mono text-navy-950/40 block mb-1.5">
                OLFACTIVE DIRECTION
              </span>
              <div className="flex flex-wrap gap-1.5">
                {direction.map((d) => <Chip key={d}>{d}</Chip>)}
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={() => onInquire(product)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-navy-950 text-white text-xs font-mono uppercase tracking-widest rounded-sm hover:bg-navy-800 transition-colors"
          >
            Inquire Private Atelier <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage({ audience = 'both', onOpenConcierge }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);

  const current = AUDIENCES.find((a) => a.key === audience) || AUDIENCES[0];

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => current.match(p)).filter((p) => {
      if (!q) return true;
      const hay = [p.name, p.code, p.blend, ...Object.values(p.profile)].join(' ').toLowerCase();
      return hay.includes(q);
    });
  }, [current, query]);

  const setAudience = (key) => { window.location.hash = `#/collection/${key}`; };
  const inquire = (p) => { setSelected(null); if (onOpenConcierge) onOpenConcierge(p.name); };

  return (
    <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 bg-ivory-warm/40 border-b border-navy-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-2 sm:mb-3">
              <span className="w-8 sm:w-10 h-[1.5px] bg-navy-950/70" />
              <span className="text-[10px] sm:text-xs tracking-widest-xl sm:tracking-widest-2xl uppercase text-navy-950 font-semibold font-mono">
                THE ATELIER COLLECTION
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl text-navy-950 font-normal leading-tight">
              {current.label}
            </h1>
          </div>
          <p className="max-w-md text-navy-muted text-xs sm:text-sm font-light leading-relaxed">
            {AUDIENCE_COPY[current.key]}
          </p>
        </div>

        {/* Audience tabs + search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 sm:mb-10">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {AUDIENCES.map((a) => (
              <button
                key={a.key}
                type="button"
                onClick={() => setAudience(a.key)}
                aria-pressed={a.key === current.key}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-sm text-[10px] sm:text-xs font-mono uppercase tracking-widest transition-colors ${
                  a.key === current.key
                    ? 'bg-navy-950 text-white shadow-md'
                    : 'bg-white/80 text-navy-900/80 hover:bg-white hover:text-navy-950 border border-navy-900/10'
                }`}
              >
                {a.label}
              </button>
            ))}
          </div>

          <label className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-navy-950/50" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, note or code"
              className="w-full pl-9 pr-3 py-2 bg-white/90 border border-navy-900/15 rounded-sm text-xs text-navy-950 placeholder:text-navy-950/40 focus:outline-none focus:ring-2 focus:ring-navy-950"
            />
          </label>
        </div>

        <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-navy-950/60 mb-4">
          {items.length} {items.length === 1 ? 'flacon' : 'flacons'}
        </p>

        {/* Grid */}
        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} onOpen={setSelected} onInquire={inquire} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-navy-muted text-sm font-light">
            No flacons match “{query}”.
          </div>
        )}
      </div>

      {selected && (
        <ProductModal product={selected} onClose={() => setSelected(null)} onInquire={inquire} />
      )}
    </section>
  );
}
