import React, { useState } from 'react';
import { X, Send, CheckCircle2, Clock, MapPin, Sparkles, Info } from 'lucide-react';
import { BRAND_IDENTITY } from '../data/brandData';

export default function ConciergeDrawer({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'Bespoke Private Flacon',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-sm flex justify-end transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white h-full shadow-2xl p-5 sm:p-8 md:p-10 flex flex-col justify-between overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-5 sm:pb-6 border-b border-navy-900/10">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-navy-muted block">
                ZÄFIZZY CONCIERGE
              </span>
              <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-navy-900 font-light mt-1">
                Private Atelier Inquiry
              </h3>
            </div>
            <button
              onClick={onClose}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-navy-900 hover:text-navy-muted transition-colors"
              aria-label="Close concierge"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {submitted ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-navy-900 text-white flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-2xl text-navy-900 font-normal">
                Inquiry Recorded
              </h4>
              <p className="text-navy-muted text-sm font-light max-w-sm mx-auto leading-relaxed">
                Consultation details validated for showcase demonstration.
              </p>
              
              {/* Explicit Integration Status */}
              <div className="p-3 bg-ivory-warm border border-navy-900/10 rounded text-[11px] text-navy-muted font-mono max-w-xs mx-auto text-left flex items-start gap-2">
                <Info className="w-3.5 h-3.5 text-navy-900 shrink-0 mt-0.5" />
                <span>
                  <strong>Client Integration Notice:</strong> Locally validated showcase state. Production email dispatch / CRM webhook ready for client deployment.
                </span>
              </div>

              <button
                onClick={resetForm}
                className="mt-6 text-xs uppercase tracking-widest text-navy-900 font-medium underline"
              >
                Return to Showcase
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <p className="text-xs text-navy-muted font-light leading-relaxed">
                Connect directly with the House of ZÄFIZZY for private flacon reserves, customized monogramming, or private salon viewings.
              </p>

              <div>
                <label className="block text-[11px] uppercase tracking-widest text-navy-900 font-medium mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lord Julian Vance"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-navy-900/20 rounded-sm text-sm text-navy-900 focus:outline-none focus:border-navy-900 transition-colors bg-ivory-light"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-widest text-navy-900 font-medium mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. client@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-navy-900/20 rounded-sm text-sm text-navy-900 focus:outline-none focus:border-navy-900 transition-colors bg-ivory-light"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-widest text-navy-900 font-medium mb-1.5">
                  Consultation Interest
                </label>
                <select
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  className="w-full px-4 py-3 border border-navy-900/20 rounded-sm text-sm text-navy-900 focus:outline-none focus:border-navy-900 transition-colors bg-ivory-light"
                >
                  <option>Bespoke Private Flacon (100ml)</option>
                  <option>Atelier Discovery Set Reservation</option>
                  <option>Private Showroom Consultation</option>
                  <option>Corporate Gift & Private Suite Commissions</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-widest text-navy-900 font-medium mb-1.5">
                  Special Notes or Olfactory Preferences
                </label>
                <textarea
                  rows={3}
                  placeholder="Mention any specific notes or delivery preferences..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 border border-navy-900/20 rounded-sm text-sm text-navy-900 focus:outline-none focus:border-navy-900 transition-colors bg-ivory-light resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full btn-luxury-shimmer py-4 bg-navy-900 text-white text-xs uppercase tracking-widest-xl font-medium rounded-sm hover:bg-navy-800 transition-all shadow-md flex items-center justify-center gap-2 mt-4"
              >
                <span>Transmit Inquiry</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

        {/* Footer info */}
        <div className="pt-6 border-t border-navy-900/10 text-[11px] text-navy-muted flex items-center justify-between font-mono">
          <span>PRIVATE ATELIER DISPATCH</span>
          <span>CONFIDENTIALITY ASSURED</span>
        </div>
      </div>
    </div>
  );
}
