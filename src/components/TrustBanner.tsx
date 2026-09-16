import React, { useState } from 'react';
import { Lock, ShieldCheck, PackageCheck, Banknote, Sparkles, CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const TrustBanner: React.FC = () => {
  const [selectedBadge, setSelectedBadge] = useState<number | null>(null);

  const badges = [
    {
      id: 1,
      icon: Lock,
      title: '256-Bit SSL Encryption',
      subtitle: 'Bank-Grade Data Security',
      color: 'text-amber-300',
      badgeTag: '🔒 SSL Protected',
      detailsTitle: 'Enterprise-Grade 256-Bit SSL Checkout Protection',
      description:
        'All client transactions, passwords, and personal details are encrypted using SHA-256 RSA keys. We never store raw payment details or share your contact number with third-party telemarketers.'
    },
    {
      id: 2,
      icon: ShieldCheck,
      title: '100% Dubai Import Guarantee',
      subtitle: 'Direct UAE Customs Clearance',
      color: 'text-[#d4af37]',
      badgeTag: '🛡️ Dubai Genuine',
      detailsTitle: 'Direct Dubai Import & Authentic Emirati Sourcing',
      description:
        'Every bottle, sachet, and incense brick is sourced directly from licensed manufacturing labs in Dubai, Sharjah, and Abu Dhabi. Each package features verified holographic security stickers and batch tracking numbers.'
    },
    {
      id: 3,
      icon: PackageCheck,
      title: 'Open Parcel on Delivery',
      subtitle: 'Inspect Before Payment',
      color: 'text-emerald-400',
      badgeTag: '📦 Open Parcel Policy',
      detailsTitle: '100% Transparent Inspection on Arrival',
      description:
        'We believe in radical trust. You have full right to open and inspect your parcel in the presence of the courier rider before handing over Cash on Delivery. Zero risk, total satisfaction guaranteed.'
    },
    {
      id: 4,
      icon: Banknote,
      title: 'Verified COD Across Pakistan',
      subtitle: 'Karachi to Peshawar Express',
      color: 'text-sky-400',
      badgeTag: '💵 Verified COD',
      detailsTitle: 'Nationwide Cash on Delivery with Live Tracking',
      description:
        'Enjoy fast dispatch via TCS, Leopards, and Call Courier. Orders dispatched within 24 hours with SMS and WhatsApp tracking alerts from hub departure to your doorstep.'
    }
  ];

  return (
    <>
      <section className="bg-gradient-to-b from-[#f9f7f2] to-[#f2ebe0] border-y border-[#e5d9c7] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs uppercase tracking-widest text-[#8c6b38] font-bold block mb-1">
              Guaranteed Reliability
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-zinc-900">
              Why Pakistan Trusts The House of Aura
            </h3>
            <p className="text-xs text-zinc-600 mt-1 font-normal">
              Click any badge to view our security protocols and customer protection policies.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {badges.map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <button
                  key={badge.id}
                  onClick={() => setSelectedBadge(idx)}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white hover:bg-[#fcfbf9] border border-[#e8dfd3] hover:border-[#c5a880] shadow-sm hover:shadow-md transition-all text-left group cursor-pointer"
                >
                  <div className="p-2.5 rounded-lg bg-[#faf6ee] border border-[#e8dfd3] text-[#8c6b38] group-hover:scale-105 transition-transform shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8c6b38] block mb-0.5">
                      {badge.badgeTag}
                    </span>
                    <h4 className="text-xs md:text-sm font-bold text-zinc-900 group-hover:text-black leading-tight">
                      {badge.title}
                    </h4>
                    <p className="text-[11px] text-zinc-500 mt-0.5 font-medium">
                      {badge.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Security Detail Modal */}
      <AnimatePresence>
        {selectedBadge !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white border border-[#e8dfd3] rounded-2xl max-w-lg w-full p-6 shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedBadge(null)}
                className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-zinc-700 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-[#faf6ee] border border-[#c5a880]/40 text-[#8c6b38]">
                  {React.createElement(badges[selectedBadge].icon, { className: 'w-6 h-6' })}
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#8c6b38] font-bold">
                    The House of Aura Security Standard
                  </span>
                  <h3 className="text-lg font-bold text-zinc-900 font-serif">
                    {badges[selectedBadge].detailsTitle}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-zinc-600 leading-relaxed mb-6">
                {badges[selectedBadge].description}
              </p>

              <div className="bg-[#faf8f5] rounded-xl p-4 border border-stone-200 space-y-2.5 mb-6 text-xs text-zinc-700 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Real-time courier API sync with automated tracking SMS</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Verified Dubai origin declaration on customs manifest</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Open Parcel Guarantee — inspect in front of courier rider</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8c6b38] shrink-0" />
                  <span>Dedicated WhatsApp concierge support for instant queries</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedBadge(null)}
                className="w-full py-3 bg-[#c5a880] hover:bg-[#b89569] text-zinc-950 font-black text-sm rounded-xl shadow-md transition-all cursor-pointer"
              >
                Understood &amp; Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
