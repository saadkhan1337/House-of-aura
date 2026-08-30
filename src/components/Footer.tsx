import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  ShieldCheck,
  Lock,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Building2,
  Sparkles,
  Truck,
  Heart
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setSelectedCategory, setIsAuthModalOpen, setAuthModalTab } = useStore();

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat as any);
    const el = document.getElementById('shop-catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0b0c10] border-t border-[#20212b] text-zinc-400 text-xs pt-12 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#c5a880] font-bold">
                THE HOUSE OF
              </span>
              <span className="text-2xl font-serif font-bold text-white tracking-[0.15em] my-0.5">
                AURA
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-500">
                DUBAI • PARIS • LAHORE
              </span>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              Pakistan's premier destination for genuine UAE imported hair color treatments, salon-grade restorative keratin systems, and authentic Arabian agarwood incense.
            </p>

            <div className="flex items-center gap-2 text-zinc-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-[11px] font-semibold">100% Genuine UAE Customs Clearances</span>
            </div>
          </div>

          {/* Catalog Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Signature Collections
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleCategoryClick('Hair Care')}
                  className="hover:text-[#c5a880] transition-colors"
                >
                  Apple Herbal Hair Color Shampoos
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Hair Care')}
                  className="hover:text-[#c5a880] transition-colors"
                >
                  Cosmo Salon Keratin & Argan Systems
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Arabian Bakhoor')}
                  className="hover:text-[#c5a880] transition-colors"
                >
                  Hamidi Dubai Royal Bakhoor & Incense
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Fragrances')}
                  className="hover:text-[#c5a880] transition-colors"
                >
                  Lattafa Yara & Asad Eau de Parfum
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Salon Wholesale')}
                  className="hover:text-[#c5a880] transition-colors text-purple-300 font-semibold"
                >
                  Salon Master Botox & Protein Kits (Wholesale)
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care & Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Customer Guarantees
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Open Parcel on Delivery Permitted</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Free Express Shipping on Rs. 3,500+</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>24-Hour Dispatch via TCS & Leopards</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>7-Day Doorstep Replacement Policy</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>256-Bit SSL Encrypted Checkout</span>
              </li>
            </ul>
          </div>

          {/* Contact & Wholesale Hub */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              VIP Concierge & Support
            </h4>
            <div className="space-y-2 text-xs">
              <a
                href="https://wa.me/923000000000"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:underline"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>WhatsApp: +92 300 0000000</span>
              </a>

              <div className="flex items-center gap-2 text-zinc-300">
                <Mail className="w-4 h-4 text-[#c5a880] shrink-0" />
                <span>concierge@thehouseofaura.com</span>
              </div>

              <div className="flex items-start gap-2 text-zinc-400 pt-1">
                <MapPin className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                <span>
                  <strong>UAE Hub:</strong> Al Rigga, Deira, Dubai<br />
                  <strong>PK Dispatch:</strong> Phase 6 DHA, Lahore
                </span>
              </div>

              <button
                onClick={() => {
                  setAuthModalTab('signup');
                  setIsAuthModalOpen(true);
                }}
                className="mt-2 w-full py-2 bg-[#1d1f2b] hover:bg-[#282b3c] border border-purple-500/30 text-purple-300 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Salon Owner Wholesale Account</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-zinc-500">
          <div>
            © {new Date().getFullYear()} The House of Aura. All Rights Reserved. Luxury Dubai Imports.
          </div>
          <div className="flex items-center gap-3">
            <span>🔒 256-Bit SSL Protection</span>
            <span>•</span>
            <span>💵 Cash on Delivery Verified</span>
            <span>•</span>
            <span>🇦🇪 UAE Certificate of Origin</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
