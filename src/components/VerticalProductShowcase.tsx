import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { BRAND_CONFIG } from '../data/constants';
import { formatPKR } from '../utils/security';
import {
  Sparkles,
  ShoppingBag,
  Heart,
  Check,
  Star,
  ShieldCheck,
  Zap,
  MessageCircle,
  Truck,
  Eye,
  Clock,
  Droplets,
  Flame,
  Award
} from 'lucide-react';
import { motion } from 'motion/react';

export const VerticalProductShowcase: React.FC = () => {
  const { products, addToCart, toggleWishlist, isWishlisted, showToast } = useStore();

  // Selected varieties for each of the 3 products
  const appleProduct = products.find((p) => p.id === 'apple-ammonia-free-hair-cream') || products[0];
  const cosmoProduct = products.find((p) => p.id === 'hoa-cosmo-keratin-shampoo-1000ml') || products[1];
  const bakhoorProduct = products.find((p) => p.id === 'hoa-bakhoor-hamidi') || products[2];

  // Local interactive states
  const [selectedAppleShade, setSelectedAppleShade] = useState(appleProduct?.varieties[0]?.id || 'var-natural-black-1');
  const [appleDealType, setAppleDealType] = useState<'single' | 'duo'>('single');

  const [cosmoDealType, setCosmoDealType] = useState<'single' | 'duo'>('single');

  const [selectedBakhoorScent, setSelectedBakhoorScent] = useState(bakhoorProduct?.varieties[0]?.id || 'var-hamidi-black-oud');
  const [bakhoorTier, setBakhoorTier] = useState<'single' | 'duo' | 'trio' | 'set8'>('single');

  // WhatsApp Checkout Helper
  const openWhatsAppOrder = (productName: string, dealText: string, price: number) => {
    const phone = BRAND_CONFIG.supportPhone;
    const msg = encodeURIComponent(
      `Assalam o Alaikum! I want to order from The House of Aura:\n\n🛍️ *Product:* ${productName}\n📦 *Selection / Deal:* ${dealText}\n💰 *Price:* ${formatPKR(price)}\n\nPlease confirm availability and dispatch schedule!`
    );
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24">
      {/* ───────────────────────────────────────────────────────────────── */}
      {/* CHAPTER 1: APPLE AMMONIA-FREE HAIR CREAM (500ml + 500ml JUMBO)    */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <div id="apple-hair-cream" className="relative rounded-3xl bg-[#12131a]/80 border border-[#2b2c3a] p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl backdrop-blur-xl">
        {/* Background ambient glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#c5a880]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Product Visual Stage */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden aspect-square max-w-lg mx-auto bg-gradient-to-b from-[#1c1d27] to-[#0e0f14] border border-[#36384a] shadow-2xl group">
              <img
                src="/images/apple_hair_color_3d_unified.jpg?v=20260830_unified"
                alt="Apple Ammonia-Free Hair Cream 500ml+500ml Jumbo Pack"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              {/* Floating 96h Clock Badge */}
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-500/40 flex items-center gap-2 text-xs font-bold text-emerald-400">
                <Clock className="w-3.5 h-3.5" />
                <span>96h Leave-In Shine & Fragrance</span>
              </div>

              {/* Jumbo Pack Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#14151e]/90 backdrop-blur-md p-3.5 rounded-xl border border-[#3b3d4f] flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-semibold text-[#c5a880] uppercase tracking-wider">Jumbo Value Kit</div>
                  <div className="text-sm font-bold text-white">500ml + 500ml (Agent A + B)</div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                  Zero Scalp Stains
                </span>
              </div>
            </div>
          </div>

          {/* Right: Product Narrative & Interactive Actions */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-bold tracking-wider uppercase mb-3 border border-emerald-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Dubai Salon Flagship #1</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                Apple Ammonia-Free Black Hair Cream
              </h2>
              <p className="text-base text-[#c5a880] font-medium mt-1">
                500ml + 500ml Jumbo Value Pack • Clear Water Type (Zero Towel & Scalp Stains)
              </p>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed">
              Experience the revolutionary herbal formula from Dubai. Infused with natural green apple extracts, it provides 100% white hair coverage with pure clear water technology—delivering intense, natural black radiance for up to 96 hours without harsh ammonia odors.
            </p>

            {/* Key USPs */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs text-zinc-300 bg-white/5 p-2.5 rounded-lg border border-white/10">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Ammonia & Lead Free</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-300 bg-white/5 p-2.5 rounded-lg border border-white/10">
                <Droplets className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Clear Water (No Stains)</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-300 bg-white/5 p-2.5 rounded-lg border border-white/10">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>96h Gloss & Aroma</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-300 bg-white/5 p-2.5 rounded-lg border border-white/10">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Open Parcel Inspection</span>
              </div>
            </div>

            {/* Interactive Shade Selector */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2.5">
                Select Your Shade:
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {appleProduct.varieties.map((shade) => {
                  const isSelected = selectedAppleShade === shade.id;
                  return (
                    <button
                      key={shade.id}
                      onClick={() => setSelectedAppleShade(shade.id)}
                      className={`p-3 rounded-xl border text-left transition-all relative ${
                        isSelected
                          ? 'border-[#c5a880] bg-[#c5a880]/15 shadow-md'
                          : 'border-[#2e3040] bg-[#161722] hover:border-zinc-500'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/20"
                          style={{ backgroundColor: shade.hexColor }}
                        />
                        <span className="text-xs font-bold text-white truncate">{shade.name.split(' ')[0]}</span>
                      </div>
                      <div className="text-[11px] text-zinc-400 truncate">{shade.name.split(' ').slice(1).join(' ')}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Deal Selector: Single vs Duo */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2.5">
                Choose Pack Option:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setAppleDealType('single')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    appleDealType === 'single'
                      ? 'border-[#c5a880] bg-[#c5a880]/15 ring-1 ring-[#c5a880]'
                      : 'border-[#2e3040] bg-[#161722] hover:border-zinc-500'
                  }`}
                >
                  <div className="text-xs font-semibold text-zinc-400">Single Jumbo Pack</div>
                  <div className="text-lg font-bold text-white mt-0.5">{formatPKR(2499)}</div>
                  <div className="text-[11px] text-zinc-500 line-through">Rs. 3,800</div>
                </button>

                <button
                  onClick={() => setAppleDealType('duo')}
                  className={`p-3.5 rounded-xl border text-left transition-all relative ${
                    appleDealType === 'duo'
                      ? 'border-emerald-500 bg-emerald-500/15 ring-1 ring-emerald-500'
                      : 'border-[#2e3040] bg-[#161722] hover:border-zinc-500'
                  }`}
                >
                  <span className="absolute -top-2 right-3 px-2 py-0.5 rounded-full bg-emerald-500 text-black font-extrabold text-[10px] uppercase">
                    Save Rs. 500
                  </span>
                  <div className="text-xs font-semibold text-emerald-400">Pack of 2 (Duo Deal)</div>
                  <div className="text-lg font-bold text-white mt-0.5">{formatPKR(4500)}</div>
                  <div className="text-[11px] text-emerald-400/80">Rs. 2,250 / pack</div>
                </button>
              </div>
            </div>

            {/* Direct Order Actions */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  const currentShade = appleProduct.varieties.find((v) => v.id === selectedAppleShade);
                  const dealName = appleDealType === 'single' ? `Single Pack (${currentShade?.name})` : `Pack of 2 Duo (${currentShade?.name})`;
                  const price = appleDealType === 'single' ? 2499 : 4500;
                  openWhatsAppOrder('Apple Ammonia-Free Hair Cream (500ml+500ml)', dealName, price);
                }}
                className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-sm shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Order on WhatsApp (COD)</span>
              </button>

              <button
                onClick={() => {
                  const currentShade = appleProduct.varieties.find((v) => v.id === selectedAppleShade);
                  addToCart(appleProduct, currentShade, appleDealType === 'single' ? 1 : 2);
                  showToast('success', 'Added to Bag!', `${appleProduct.name} (${appleDealType === 'single' ? 'Single' : 'Duo'})`);
                }}
                className="py-3.5 px-6 rounded-xl bg-[#c5a880] hover:bg-[#d6ba94] text-[#0c0d12] font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* CHAPTER 2: COSMO KERATIN SHAMPOO (1000ml JUMBO BOTTLE)           */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <div id="cosmo-keratin-shampoo" className="relative rounded-3xl bg-[#12131a]/80 border border-[#2b2c3a] p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl backdrop-blur-xl">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Product Narrative & Actions */}
          <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 text-xs font-bold tracking-wider uppercase mb-3 border border-amber-500/30">
                <Award className="w-3.5 h-3.5" />
                <span>Azaadi Sale Flat 59% OFF</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                COSMO Hair Naturals — Keratin Shampoo
              </h2>
              <p className="text-base text-[#c5a880] font-medium mt-1">
                1000ml (1 Litre) Jumbo Salon Dispenser Bottle • Sulfate & Paraben Free
              </p>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed">
              Formulated in UAE for extreme weather protection. Enriched with hydrolyzed keratin micro-proteins and essential biotin to repair heat-damaged strands, eliminate frizz, and fortify hair roots from the very first wash.
            </p>

            {/* Key USPs */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs text-zinc-300 bg-white/5 p-2.5 rounded-lg border border-white/10">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Sulfate & Paraben Free</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-300 bg-white/5 p-2.5 rounded-lg border border-white/10">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Hydrolyzed Keratin Protein</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-300 bg-white/5 p-2.5 rounded-lg border border-white/10">
                <Droplets className="w-4 h-4 text-amber-400 shrink-0" />
                <span>1000ml Salon Pump Dispenser</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-300 bg-white/5 p-2.5 rounded-lg border border-white/10">
                <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>TCS Express Direct Delivery</span>
              </div>
            </div>

            {/* Deal Selector: Single vs Duo */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2.5">
                Choose Pack Option:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setCosmoDealType('single')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    cosmoDealType === 'single'
                      ? 'border-[#c5a880] bg-[#c5a880]/15 ring-1 ring-[#c5a880]'
                      : 'border-[#2e3040] bg-[#161722] hover:border-zinc-500'
                  }`}
                >
                  <div className="text-xs font-semibold text-zinc-400">1000ml Single Bottle</div>
                  <div className="text-lg font-bold text-white mt-0.5">{formatPKR(1970)}</div>
                  <div className="text-[11px] text-zinc-500 line-through">Rs. 4,800 (59% OFF)</div>
                </button>

                <button
                  onClick={() => setCosmoDealType('duo')}
                  className={`p-3.5 rounded-xl border text-left transition-all relative ${
                    cosmoDealType === 'duo'
                      ? 'border-amber-500 bg-amber-500/15 ring-1 ring-amber-500'
                      : 'border-[#2e3040] bg-[#161722] hover:border-zinc-500'
                  }`}
                >
                  <span className="absolute -top-2 right-3 px-2 py-0.5 rounded-full bg-amber-500 text-black font-extrabold text-[10px] uppercase">
                    Mega Value Deal
                  </span>
                  <div className="text-xs font-semibold text-amber-400">Pack of 2 (2000ml)</div>
                  <div className="text-lg font-bold text-white mt-0.5">{formatPKR(3000)}</div>
                  <div className="text-[11px] text-amber-400/80">Only Rs. 1,500 / bottle</div>
                </button>
              </div>
            </div>

            {/* Direct Order Actions */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  const dealName = cosmoDealType === 'single' ? 'Single 1000ml Bottle (Rs. 1,970)' : 'Pack of 2 Bottles (Rs. 3,000)';
                  const price = cosmoDealType === 'single' ? 1970 : 3000;
                  openWhatsAppOrder('COSMO Keratin Shampoo (1000ml)', dealName, price);
                }}
                className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-sm shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Order on WhatsApp (COD)</span>
              </button>

              <button
                onClick={() => {
                  addToCart(cosmoProduct, cosmoProduct.varieties[0], cosmoDealType === 'single' ? 1 : 2);
                  showToast('success', 'Added to Bag!', `${cosmoProduct.name} (${cosmoDealType === 'single' ? 'Single' : 'Duo'})`);
                }}
                className="py-3.5 px-6 rounded-xl bg-[#c5a880] hover:bg-[#d6ba94] text-[#0c0d12] font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </button>
            </div>
          </div>

          {/* Right: Product Visual Stage */}
          <div className="lg:col-span-6 relative order-1 lg:order-2">
            <div className="relative rounded-2xl overflow-hidden aspect-square max-w-lg mx-auto bg-gradient-to-b from-[#1c1d27] to-[#0e0f14] border border-[#36384a] shadow-2xl group">
              <img
                src="/images/cosmo_keratin_shampoo_3d_unified.jpg?v=20260830_unified"
                alt="COSMO Keratin Shampoo 1000ml Jumbo Size"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              {/* Flat 59% OFF Badge */}
              <div className="absolute top-4 right-4 bg-rose-600/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-rose-400/40 text-xs font-bold text-white">
                FLAT 59% OFF
              </div>

              {/* 1000ml Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#14151e]/90 backdrop-blur-md p-3.5 rounded-xl border border-[#3b3d4f] flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-semibold text-[#c5a880] uppercase tracking-wider">Salon Grade</div>
                  <div className="text-sm font-bold text-white">1000ml (1 Litre) Jumbo Size</div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold border border-amber-500/30">
                  Keratin Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* CHAPTER 3: BAKHOOR HAMIDI (8 ARABIAN FRAGRANCES COLLECTION)       */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <div id="bakhoor-hamidi" className="relative rounded-3xl bg-[#12131a]/80 border border-[#2b2c3a] p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a880]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Product Visual Stage */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden aspect-square max-w-lg mx-auto bg-gradient-to-b from-[#1c1d27] to-[#0e0f14] border border-[#36384a] shadow-2xl group">
              <img
                src="/images/bakhoor_hamidi_3d_unified.jpg?v=20260830_unified"
                alt="Bakhoor Hamidi 8 Arabian Fragrances Collection"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              {/* 8 Flavours Badge */}
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#c5a880]/40 flex items-center gap-2 text-xs font-bold text-[#c5a880]">
                <Flame className="w-3.5 h-3.5" />
                <span>8 Royal UAE Scent Tins</span>
              </div>

              {/* 48h Aroma Throw Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#14151e]/90 backdrop-blur-md p-3.5 rounded-xl border border-[#3b3d4f] flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-semibold text-[#c5a880] uppercase tracking-wider">Aged Agarwood</div>
                  <div className="text-sm font-bold text-white">48+ Hours Lingering Aroma</div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#c5a880]/20 text-[#c5a880] text-xs font-bold border border-[#c5a880]/30">
                  Taif Rose & Amber
                </span>
              </div>
            </div>
          </div>

          {/* Right: Product Narrative & Interactive Actions */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a880]/15 text-[#c5a880] text-xs font-bold tracking-wider uppercase mb-3 border border-[#c5a880]/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Art of Scent • Dubai Collection</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                Bakhoor Hamidi — 8 Arabian Fragrances
              </h2>
              <p className="text-base text-[#c5a880] font-medium mt-1">
                Authentic Emirati Agarwood Infusions in Airtight Royal Jars
              </p>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed">
              The premier palace incense collection by Hamidi Dubai. Authentic aged agarwood soaked in precious essential oils, Cambodian oud, and Taif rose. Fill your home, fabrics, and spaces with an intoxicating oriental aura that lasts for days.
            </p>

            {/* Interactive 8-Scent Tabs */}
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Available Arabian Scent Profiles:
              </label>
              <div className="grid grid-cols-4 gap-2">
                {bakhoorProduct.varieties.map((v) => {
                  const isSelected = selectedBakhoorScent === v.id;
                  const shortName = v.name.replace('Bakhoor ', '').split(' (')[0];
                  return (
                    <button
                      key={v.id}
                      onClick={() => setSelectedBakhoorScent(v.id)}
                      className={`p-2 rounded-lg border text-center transition-all ${
                        isSelected
                          ? 'border-[#c5a880] bg-[#c5a880]/20 text-white font-bold'
                          : 'border-[#282936] bg-[#14151e] text-zinc-400 hover:text-white hover:border-zinc-500'
                      }`}
                    >
                      <div className="text-[11px] truncate">{shortName}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tiered Pricing Matrix */}
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Select Bundle Tier:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {/* Single */}
                <button
                  onClick={() => setBakhoorTier('single')}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    bakhoorTier === 'single'
                      ? 'border-[#c5a880] bg-[#c5a880]/15 ring-1 ring-[#c5a880]'
                      : 'border-[#282936] bg-[#14151e] hover:border-zinc-500'
                  }`}
                >
                  <div className="text-[10px] text-zinc-400 font-semibold uppercase">Single Jar</div>
                  <div className="text-sm font-bold text-white mt-0.5">{formatPKR(1999)}</div>
                </button>

                {/* Duo */}
                <button
                  onClick={() => setBakhoorTier('duo')}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    bakhoorTier === 'duo'
                      ? 'border-[#c5a880] bg-[#c5a880]/15 ring-1 ring-[#c5a880]'
                      : 'border-[#282936] bg-[#14151e] hover:border-zinc-500'
                  }`}
                >
                  <div className="text-[10px] text-[#c5a880] font-semibold uppercase">Pack of 2</div>
                  <div className="text-sm font-bold text-white mt-0.5">{formatPKR(3500)}</div>
                </button>

                {/* Trio */}
                <button
                  onClick={() => setBakhoorTier('trio')}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    bakhoorTier === 'trio'
                      ? 'border-emerald-500 bg-emerald-500/15 ring-1 ring-emerald-500'
                      : 'border-[#282936] bg-[#14151e] hover:border-zinc-500'
                  }`}
                >
                  <div className="text-[10px] text-emerald-400 font-semibold uppercase">Pack of 3</div>
                  <div className="text-sm font-bold text-white mt-0.5">{formatPKR(4300)}</div>
                </button>

                {/* 8-Piece Set */}
                <button
                  onClick={() => setBakhoorTier('set8')}
                  className={`p-2.5 rounded-xl border text-left transition-all relative ${
                    bakhoorTier === 'set8'
                      ? 'border-amber-500 bg-amber-500/20 ring-1 ring-amber-500'
                      : 'border-[#282936] bg-[#14151e] hover:border-zinc-500'
                  }`}
                >
                  <div className="text-[10px] text-amber-400 font-bold uppercase">8-Piece Set</div>
                  <div className="text-sm font-bold text-white mt-0.5">{formatPKR(8000)}</div>
                </button>
              </div>
            </div>

            {/* Direct Order Actions */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  const currentScent = bakhoorProduct.varieties.find((v) => v.id === selectedBakhoorScent);
                  let tierLabel = 'Single Jar';
                  let price = 1999;
                  if (bakhoorTier === 'duo') {
                    tierLabel = 'Pack of 2 (Duo)';
                    price = 3500;
                  } else if (bakhoorTier === 'trio') {
                    tierLabel = 'Pack of 3 (Trio)';
                    price = 4300;
                  } else if (bakhoorTier === 'set8') {
                    tierLabel = 'Complete 8-Piece Luxury Set';
                    price = 8000;
                  }
                  openWhatsAppOrder('Bakhoor Hamidi (Arabian Scent)', `${tierLabel} [Selected: ${currentScent?.name}]`, price);
                }}
                className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-sm shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Order on WhatsApp (COD)</span>
              </button>

              <button
                onClick={() => {
                  const currentScent = bakhoorProduct.varieties.find((v) => v.id === selectedBakhoorScent);
                  const qty = bakhoorTier === 'single' ? 1 : bakhoorTier === 'duo' ? 2 : bakhoorTier === 'trio' ? 3 : 8;
                  addToCart(bakhoorProduct, currentScent, qty);
                  showToast('success', 'Added to Bag!', `${bakhoorProduct.name} (${bakhoorTier.toUpperCase()})`);
                }}
                className="py-3.5 px-6 rounded-xl bg-[#c5a880] hover:bg-[#d6ba94] text-[#0c0d12] font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
