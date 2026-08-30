import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  Sparkles,
  ShoppingBag,
  Building2,
  ShieldCheck,
  Award,
  ArrowRight,
  Truck,
  Star
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setSelectedCategory, setIsAuthModalOpen, setAuthModalTab } = useStore();

  const scrollToCatalog = (category?: string) => {
    if (category) {
      setSelectedCategory(category as any);
    }
    const el = document.getElementById('shop-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#111218] via-[#0d0e14] to-[#0c0d12] border-b border-[#232430]">
      {/* Background Subtle Luxury Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#c5a880]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Editorial */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a880]/15 border border-[#c5a880]/30 text-[#c5a880] text-xs font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Imported Direct from Dubai, UAE</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.15]">
              Pure Arabian Elegance & Salon-Grade Hair Essentials
            </h1>

            <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Experience the pinnacle of Emirati luxury. From instant herbal grey coverage shampoos and 1000ml salon keratin systems to aged royal Cambodian agarwood bukhoor and viral Dubai fragrances.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => scrollToCatalog('All')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#c5a880] to-[#b3956b] hover:from-[#d1b58f] hover:to-[#c2a378] text-[#0d0e12] font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-[#c5a880]/20 transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Explore Dubai Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setAuthModalTab('signup');
                  setIsAuthModalOpen(true);
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#1a1b24] hover:bg-[#252734] border border-[#37394c] text-zinc-200 font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Building2 className="w-4 h-4 text-purple-400" />
                <span>Register Salon Wholesale</span>
              </button>
            </div>

            {/* Micro Trust Stats */}
            <div className="pt-4 grid grid-cols-3 gap-2 border-t border-zinc-800/80 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <span className="text-lg sm:text-xl font-bold text-white font-serif">100%</span>
                <p className="text-[11px] text-zinc-400">Dubai Verified Sourcing</p>
              </div>
              <div>
                <span className="text-lg sm:text-xl font-bold text-[#c5a880] font-serif">500+</span>
                <p className="text-[11px] text-zinc-400">Partner Hair Studios</p>
              </div>
              <div>
                <span className="text-lg sm:text-xl font-bold text-emerald-400 font-serif">24h</span>
                <p className="text-[11px] text-zinc-400">Express Nationwide Dispatch</p>
              </div>
            </div>
          </div>

          {/* Right Featured Hero Visual Collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md rounded-3xl p-3 bg-gradient-to-tr from-[#2d2719] via-[#1a1b24] to-[#12131a] border border-[#c5a880]/40 shadow-2xl">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-black">
                <img
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80"
                  alt="The House of Aura Dubai Collection"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Floating Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#14151e]/90 backdrop-blur-md p-3.5 rounded-xl border border-[#3b3d4f] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#c5a880]/20 text-[#c5a880] flex items-center justify-center font-bold">
                      🇦🇪
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">
                        Apple Hair Color & Hamidi Bakhoor
                      </h4>
                      <p className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        In Stock • Free Delivery Rs. 3,500+
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => scrollToCatalog('Hair Care')}
                    className="px-3 py-1.5 bg-[#c5a880] text-[#0c0d10] font-bold text-xs rounded-lg hover:bg-[#d4b78f]"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
