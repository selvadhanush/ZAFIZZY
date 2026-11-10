import React, { useState } from 'react';
import { Menu, X, ShieldCheck, ChevronDown } from 'lucide-react';
import { BRAND_IDENTITY } from '../data/brandData';

export default function Navbar({ onOpenAudit, onOpenConcierge }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [collectionOpen, setCollectionOpen] = useState(false);

  // Home · Collection (For Him / For Her / For Both) · Contact · About Us
  const navLinks = [
    { label: "Home", href: "#top" },
    {
      label: "Collection",
      children: [
        { label: "For Him", route: "#/collection/him" },
        { label: "For Her", route: "#/collection/her" },
        { label: "For Both", route: "#/collection/both" },
      ],
    },
    { label: "Contact", action: "contact" },
    { label: "About Us", href: "#philosophy" },
  ];

  const handleNavClick = (e, link) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setCollectionOpen(false);
    if (link.action === "contact") {
      if (onOpenConcierge) onOpenConcierge();
      return;
    }
    if (link.route) {
      window.location.hash = link.route;
      return;
    }
    // Home / About Us: if we're on the products page, go back to the home page first.
    const onProducts = window.location.hash.startsWith('#/');
    const go = () => {
      if (link.href === "#top") {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const target = document.querySelector(link.href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    };
    if (onProducts) {
      history.pushState(null, '', window.location.pathname + window.location.search);
      window.dispatchEvent(new HashChangeEvent('hashchange'));
      setTimeout(go, 150);
    } else {
      go();
    }
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-50 bg-white border-b border-navy-900/10 py-3 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
          {/* Brand Identity / Logo & Calligraphy */}
          <a
            href="#"
            className="flex flex-col items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-900"
            aria-label="ZÄFIZZY Home"
          >
            <img
              src={BRAND_IDENTITY.assets.logo}
              alt="ZÄFIZZY Perfumers & Perfumery"
              className="h-8 sm:h-9 md:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <img
              src={BRAND_IDENTITY.assets.bismillah}
              alt="Bismillah ir-Rahman ir-Rahim"
              className="h-2.5 sm:h-3 md:h-3.5 w-auto object-contain mt-1 opacity-90 transition-opacity duration-300 group-hover:opacity-100"
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setCollectionOpen(true)}
                  onMouseLeave={() => setCollectionOpen(false)}
                  onFocus={() => setCollectionOpen(true)}
                  onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setCollectionOpen(false); }}
                >
                  <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={collectionOpen}
                    className="text-xs uppercase tracking-widest-xl text-navy-900/80 hover:text-navy-900 transition-colors py-1 flex items-center gap-1"
                  >
                    <span>{link.label}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${collectionOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 transition-opacity duration-200 ${
                      collectionOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    <div className="min-w-[160px] bg-white/95 border border-navy-900/10 shadow-luxury rounded-sm py-2">
                      {link.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.route || child.href}
                          onClick={(e) => handleNavClick(e, child)}
                          className="block px-5 py-2 text-xs uppercase tracking-widest text-navy-900/80 hover:text-navy-900 hover:bg-navy-900/5 transition-colors"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  key={link.label}
                  href={link.href || '#'}
                  onClick={(e) => handleNavClick(e, link)}
                  className="text-xs uppercase tracking-widest-xl text-navy-900/80 hover:text-navy-900 transition-colors relative py-1 group"
                >
                  <span>{link.label}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-navy-900 transition-all duration-300 group-hover:w-full" />
                </a>
              )
            )}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={onOpenAudit}
              className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-medium text-navy-muted hover:text-navy-900 transition-colors px-3 py-1.5 rounded-full border border-navy-900/15 hover:border-navy-900/40"
              title="Inspect Brand Identity Assets & 3D Specifications"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-navy-800" />
              3D Specs
            </button>

            <button
              onClick={onOpenConcierge}
              className="btn-luxury-shimmer text-xs uppercase tracking-widest-xl font-medium bg-navy-900 text-white px-5 py-2.5 rounded-sm hover:bg-navy-800 transition-colors shadow-sm"
            >
              Private Atelier
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-black focus:outline-none"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-navy-950/15 md:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={`fixed top-0 right-0 w-5/6 max-w-sm h-full bg-white/95 backdrop-blur-md backdrop-saturate-150 border-l border-white/40 shadow-[0_8px_40px_rgba(10,22,43,0.25),inset_1px_0_0_rgba(255,255,255,0.6)] p-6 sm:p-8 flex flex-col justify-between overflow-y-auto transition-transform duration-300 ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-navy-900/10">
              <div className="flex flex-col items-start">
                <img
                  src={BRAND_IDENTITY.assets.logo}
                  alt="ZÄFIZZY Logo"
                  className="h-8 w-auto object-contain"
                />
                <img
                  src={BRAND_IDENTITY.assets.bismillah}
                  alt="Bismillah ir-Rahman ir-Rahim"
                  className="h-2.5 w-auto object-contain mt-1 opacity-90"
                />
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center p-1 text-black"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mt-8 flex flex-col gap-6">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label} className="border-b border-navy-900/5">
                    <span className="text-sm uppercase tracking-widest-xl text-black font-semibold py-2 block">
                      {link.label}
                    </span>
                    <div className="flex flex-col pl-4 pb-2">
                      {link.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.route || child.href}
                          onClick={(e) => handleNavClick(e, child)}
                          className="text-xs uppercase tracking-widest text-black py-2 hover:text-black/60 transition-colors"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <a
                    key={link.label}
                    href={link.href || '#'}
                    onClick={(e) => handleNavClick(e, link)}
                    className="text-sm uppercase tracking-widest-xl text-black font-semibold py-2 border-b border-navy-900/5 hover:text-black/60 transition-colors flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                  </a>
                )
              )}
            </div>
          </div>

          <div className="space-y-3 pt-6 border-t border-navy-900/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAudit();
              }}
              className="w-full py-3 text-xs uppercase tracking-widest border border-black/30 text-black flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              Brand & 3D Specs
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConcierge();
              }}
              className="w-full py-3 text-xs uppercase tracking-widest bg-navy-900 text-white flex items-center justify-center gap-2"
            >
              Private Atelier Inquiry
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
