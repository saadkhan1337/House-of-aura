import React from 'react';
import { Sparkles, MessageCircle, ArrowDown, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { BRAND_CONFIG } from '../data/constants';

export const HeroSection: React.FC = () => {
  const scrollToProducts = () => {
    const el = document.getElementById('products-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsAppGeneral = () => {
    const phone = BRAND_CONFIG.phoneRaw;
    const message = encodeURIComponent(
      "Assalam-o-Alaikum! I am visiting The House of Aura website and would like to inquire about your Dubai luxury hair care & fragrances."
    );
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#111218] via-[#0d0e14] to-[#0c0d12] border-b border-[#232430]">
      {/* Background Subtle Luxury Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#c5a880]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Editorial */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a880]/15 border border-[#c5a880]/30 text-[#c5a880] text-xs font-semibold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct UAE Luxury Imports</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-[1.08]">
                THE HOUSE OF AURA
              </h1>
              <p className="text-lg sm:text-2xl font-serif italic text-[#c5a880] tracking-wide">
                Beauty, Care &amp; Arabian Luxury
              </p>
            </div>

            <p className="text-sm sm:text-base text-zinc-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
              Curated salon hair essentials and authentic Emirati fragrances, brought to you directly from Dubai. Pure ingredients, zero compromise.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={scrollToProducts}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#c5a880] to-[#b3956b] hover:from-[#d1b58f] hover:to-[#c2a378] text-[#0d0e12] font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-[#c5a880]/20 transition-all cursor-pointer hover:scale-[1.02]"
              >
                <span>Shop Collection</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={handleWhatsAppGeneral}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-emerald-700/80 hover:bg-emerald-600 border border-emerald-500/40 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 transition-all cursor-pointer hover:scale-[1.02]"
              >
                <MessageCircle className="w-4 h-4 text-emerald-200" />
                <span>WhatsApp Us ({BRAND_CONFIG.phoneDisplay})</span>
              </button>
            </div>

            {/* Micro Trust Stats */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-zinc-800/80 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <span className="text-lg sm:text-xl font-bold text-white font-serif">100%</span>
                <p className="text-[11px] text-zinc-400">Authentic UAE Stock</p>
              </div>
              <div>
                <span className="text-lg sm:text-xl font-bold text-[#c5a880] font-serif">Open</span>
                <p className="text-[11px] text-zinc-400">Parcel on Delivery</p>
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
                  src="/images/hero_house_of_aura.png"
                  alt="The House of Aura - Dubai Luxury Hair Care & Arabian Fragrances"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Floating Badge */}
                <div className="absolute bottom-3 left-3 right-3 bg-[#14151e]/90 backdrop-blur-md p-3 rounded-xl border border-[#3b3d4f] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-[#c5a880]/20 text-[#c5a880] flex items-center justify-center font-bold text-base">
                      🇦🇪
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">
                        Direct Dubai Import
                      </h4>
                      <p className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        In Stock • Cash on Delivery
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={scrollToProducts}
                    className="px-3 py-1.5 bg-[#c5a880] text-[#0c0d10] font-bold text-xs rounded-lg hover:bg-[#d4b78f] cursor-pointer"
                  >
                    View All
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
