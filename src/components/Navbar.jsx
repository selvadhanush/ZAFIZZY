import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Compass, ShieldCheck, Box } from 'lucide-react';
import { BRAND_IDENTITY } from '../data/brandData';

export default function Navbar({ onOpenAudit, onOpenConcierge }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: "3D Experience", href: "#experience" },
    { label: "Philosophy", href: "#philosophy" },
    { label: "Flacon Dossier", href: "#signature" },
    { label: "Terroir", href: "#world" },
    { label: "Reviews", href: "#reviews" },
    { label: "Gazette", href: "#gazette" },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md border-b border-navy-900/10 py-3 shadow-sm'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
          {/* Brand Identity / Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-900"
            aria-label="ZÄFIZZY Home"
          >
            <img
              src={BRAND_IDENTITY.assets.logo}
              alt="ZÄFIZZY Perfumers & Perfumery"
              className="h-9 sm:h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-xs uppercase tracking-widest-xl text-navy-900/80 hover:text-navy-900 transition-colors relative py-1 group flex items-center gap-1.5"
              >
                {link.label === "3D Experience" && (
                  <Box className="w-3.5 h-3.5 text-navy-800" />
                )}
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-navy-900 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
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
            className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-navy-900 focus:outline-none"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-navy-950/70 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={`fixed top-0 right-0 w-5/6 max-w-sm h-full bg-white shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto transition-transform duration-300 ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-navy-900/10">
              <img
                src={BRAND_IDENTITY.assets.logo}
                alt="ZÄFIZZY Logo"
                className="h-9 w-auto object-contain"
              />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center p-1 text-navy-900"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mt-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm uppercase tracking-widest-xl text-navy-900 font-medium py-2 border-b border-navy-900/5 hover:text-navy-muted transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  {link.label === "3D Experience" && <Box className="w-4 h-4 text-navy-800" />}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-6 border-t border-navy-900/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAudit();
              }}
              className="w-full py-3 text-xs uppercase tracking-widest border border-navy-900/20 text-navy-900 flex items-center justify-center gap-2"
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
