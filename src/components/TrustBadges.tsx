import React from 'react';
import { ShieldCheck, Lock, PackageCheck, Banknote } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const badges = [
    {
      id: 'badge-ssl',
      icon: Lock,
      title: '256-Bit SSL Encrypted',
      subtitle: 'Bank-grade secure checkout',
      color: 'text-[#D4AF37]'
    },
    {
      id: 'badge-dubai',
      icon: ShieldCheck,
      title: '100% Genuine Dubai Import',
      subtitle: 'Direct from UAE manufacturer',
      color: 'text-[#D4AF37]'
    },
    {
      id: 'badge-parcel',
      icon: PackageCheck,
      title: 'Sealed & Inspected Delivery',
      subtitle: 'Open parcel option on request',
      color: 'text-[#D4AF37]'
    },
    {
      id: 'badge-cod',
      icon: Banknote,
      title: 'Cash on Delivery Verified',
      subtitle: 'Pay at your doorstep across PK',
      color: 'text-[#D4AF37]'
    }
  ];

  return (
    <div id="trust-security-badges-bar" className="w-full bg-[#0a0a0a] border-y border-[#262626] py-5 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {badges.map((b) => {
          const Icon = b.icon;
          return (
            <div
              key={b.id}
              id={b.id}
              className="flex items-center gap-3.5 p-3 rounded-lg bg-[#141414] border border-[#262626] hover:border-[#D4AF37]/50 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-[#1e1e1e] flex items-center justify-center flex-shrink-0 border border-[#333]">
                <Icon className={`w-5 h-5 ${b.color}`} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-white tracking-wide uppercase truncate">
                  {b.title}
                </div>
                <div className="text-[11px] text-[#a1a1aa] truncate">
                  {b.subtitle}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
