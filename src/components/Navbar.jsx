import React, { useLayoutEffect, useState } from 'react';
import { Ellipsis, X, ShieldCheck } from 'lucide-react';
import { BRAND_IDENTITY } from '../data/brandData';

export default function Navbar({ isHome, onOpenAudit, onOpenConcierge }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heroActive, setHeroActive] = useState(isHome);

  useLayoutEffect(() => {
    const updateHeroActive = () => {
      const hero = document.getElementById('experience');
      // Match the hero ScrollTrigger's end: 'bottom bottom'.
      setHeroActive(Boolean(isHome && hero && hero.getBoundingClientRect().bottom > window.innerHeight));
    };
    window.addEventListener('scroll', updateHeroActive, { passive: true });
    window.addEventListener('resize', updateHeroActive);
    updateHeroActive();
    return () => {
      window.removeEventListener('scroll', updateHeroActive);
      window.removeEventListener('resize', updateHeroActive);
    };
  }, [isHome]);

  const transparent = isHome && heroActive && !mobileMenuOpen;
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
    { label: "About Us", route: "#/about" },
  ];

  const handleNavClick = (e, link) => {
    e.preventDefault();
    setMobileMenuOpen(false);
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
        className={`fixed top-0 left-0 w-full z-50 border-b py-3 ${
          transparent ? 'bg-transparent border-transparent shadow-none' : 'bg-white border-black/10 shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center">
          {/* Brand identity */}
          <a
            href="#"
            className={`justify-self-start group focus:outline-none focus-visible:ring-2 ${transparent ? 'focus-visible:ring-white' : 'focus-visible:ring-navy-900'}`}
            aria-label="ZÄFIZZY Home"
          >
            <img
              src={BRAND_IDENTITY.assets.logo}
              alt="ZÄFIZZY Perfumers & Perfumery"
              className={`h-7 sm:h-9 md:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105 ${transparent ? 'brightness-0 invert' : ''}`}
            />
          </a>

          <img
            src={BRAND_IDENTITY.assets.bismillah}
            alt="Bismillah ir-Rahman ir-Rahim"
            className={`w-[56vw] max-w-[340px] h-auto object-contain ${transparent ? 'brightness-0 invert' : ''}`}
          />

          {/* Navigation menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`justify-self-end min-h-[44px] min-w-[44px] flex items-center justify-center p-2 focus:outline-none ${transparent ? 'text-white' : 'text-black'}`}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="navigation-drawer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Ellipsis className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Navigation drawer */}
      <div
        id="navigation-drawer"
        className={`fixed inset-0 z-40 bg-navy-950/15 transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={`fixed top-0 right-0 w-5/6 max-w-sm h-full bg-gradient-to-b from-white/70 to-white/45 backdrop-blur-2xl backdrop-saturate-150 border-l border-white/60 shadow-[0_8px_40px_rgba(10,22,43,0.25),inset_1px_0_0_rgba(255,255,255,0.8)] p-6 sm:p-8 flex flex-col justify-between overflow-y-auto transition-transform duration-300 ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-black/10">
              <div className="flex items-center">
                <img
                  src={BRAND_IDENTITY.assets.logo}
                  alt="ZÄFIZZY Logo"
                  className="h-8 w-auto object-contain"
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

            <nav className="mt-8 flex flex-col gap-6" aria-label="Main navigation">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label} className="border-b border-black/10">
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
                    href={link.route || link.href || '#'}
                    onClick={(e) => handleNavClick(e, link)}
                    className="text-sm uppercase tracking-widest-xl text-black font-semibold py-2 border-b border-black/10 hover:text-black/60 transition-colors flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                  </a>
                )
              )}
            </nav>
          </div>

          <div className="space-y-3 pt-6 border-t border-black/10">
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
