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
      <section className="bg-[#121318] border-y border-[#262730] py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {badges.map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <button
                  key={badge.id}
                  onClick={() => setSelectedBadge(idx)}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-[#181920]/80 hover:bg-[#20222a] border border-[#2b2c36] hover:border-[#c5a880]/50 transition-all text-left group cursor-pointer"
                >
                  <div className="p-2.5 rounded-lg bg-[#0e0f14] border border-[#2d2e3b] text-[#c5a880] group-hover:scale-105 group-hover:text-amber-300 transition-transform shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#c5a880] block mb-0.5">
                      {badge.badgeTag}
                    </span>
                    <h4 className="text-xs md:text-sm font-semibold text-zinc-100 group-hover:text-white leading-tight">
                      {badge.title}
                    </h4>
                    <p className="text-[11px] text-zinc-400 mt-0.5 hidden sm:block">
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#16171e] border border-[#383a48] rounded-2xl max-w-lg w-full p-6 shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedBadge(null)}
                className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-[#0f1015] border border-[#c5a880]/40 text-[#c5a880]">
                  {React.createElement(badges[selectedBadge].icon, { className: 'w-6 h-6' })}
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#c5a880] font-semibold">
                    The House of Aura Security Standard
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    {badges[selectedBadge].detailsTitle}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                {badges[selectedBadge].description}
              </p>

              <div className="bg-[#0f1015] rounded-xl p-4 border border-zinc-800 space-y-2 mb-6 text-xs text-zinc-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#c5a880] shrink-0" />
                  <span>Real-time courier API sync with automated tracking SMS</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#c5a880] shrink-0" />
                  <span>Verified Dubai origin declaration on customs manifest</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#c5a880] shrink-0" />
                  <span>Dedicated WhatsApp concierge support for instant queries</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedBadge(null)}
                className="w-full py-3 bg-[#c5a880] hover:bg-[#d6ba92] text-[#0c0d10] font-bold text-sm rounded-xl transition-colors"
              >
                Understood & Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
