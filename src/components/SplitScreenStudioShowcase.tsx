import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { BRAND_CONFIG } from '../data/constants';
import { formatPKR } from '../utils/security';
import {
  Sparkles,
  ShoppingBag,
  Check,
  ShieldCheck,
  MessageCircle,
  Truck,
  Clock,
  Flame,
  Award,
  ChevronRight,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type ProductTabKey = 'apple' | 'cosmo' | 'bakhoor' | 'dexe';

interface BakhoorScentConfig {
  id: string;
  name: string;
  shortName: string;
  image: string;
  tag: string;
  color: string;
}

const BAKHOOR_SCENTS: BakhoorScentConfig[] = [
  { id: 'black_oud', name: 'Bakhoor Black Oud (Intense Agarwood)', shortName: 'Black Oud', image: '/images/bakhoor_black_oud_offer_1799.jpg', tag: 'Top Oud', color: '#1a1a1a' },
  { id: 'sheikha', name: 'Bakhoor Sheikha (Royal Floral Amber)', shortName: 'Sheikha', image: '/images/creatives/bakhoor_sheikha_showcase.jpg', tag: 'Bestseller', color: '#d4af37' },
  { id: 'oud_sharqia', name: 'Bakhoor Oud Sharqia (Warm Spicy)', shortName: 'Oud Sharqia', image: '/images/bakhoor_oud_sharqia_official.jpg', tag: 'Spicy', color: '#b85d19' },
  { id: 'bayt_al_oud', name: 'Bakhoor Bayt Al Oud (Deep Woody)', shortName: 'Bayt Al Oud', image: '/images/bakhoor_bayt_al_oud_offer_1799.jpg', tag: 'Woody', color: '#4a2c11' },
  { id: 'al_zuhur', name: 'Bakhoor Al Zuhur (Rose Blossom)', shortName: 'Al Zuhur', image: '/images/bakhoor_al_zuhur_offer_1799.jpg', tag: 'Floral', color: '#8a2be2' },
  { id: 'oud_maghrib', name: 'Bakhoor Oud Maghrib (Moroccan Saffron)', shortName: 'Oud Maghrib', image: '/images/bakhoor_oud_maghrib_official.jpg', tag: 'Exotic', color: '#c0392b' },
  { id: 'khalifa', name: 'Bakhoor Khalifa (Smoky Amber Oud)', shortName: 'Khalifa', image: '/images/bakhoor_khalifa_official.jpg', tag: 'Royal', color: '#7f8c8d' },
  { id: 'oud_abiyad', name: 'Bakhoor Oud Abiyad (White Musk)', shortName: 'Oud Abiyad', image: '/images/bakhoor_oud_abiyad_official.jpg', tag: 'Sweet', color: '#bdc3c7' }
];

export const SplitScreenStudioShowcase: React.FC = () => {
  const { products, addToCart, showToast } = useStore();

  // Active Main Product Tab
  const [activeTab, setActiveTab] = useState<ProductTabKey>('apple');

  // Apple Hair Cream State
  const [appleShade, setAppleShade] = useState('Dark Brown');
  const [secondAppleShade, setSecondAppleShade] = useState('Medium Brown');
  const [appleDeal, setAppleDeal] = useState<'single' | 'duo'>('single');

  // Cosmo Shampoo State (1000ml)
  const [cosmoDeal, setCosmoDeal] = useState<'single' | 'duo'>('single');

  // Bakhoor Hamidi State
  const [selectedScentId, setSelectedScentId] = useState('black_oud');
  const [secondScentId, setSecondScentId] = useState('bayt_al_oud');
  const [thirdScentId, setThirdScentId] = useState('al_zuhur');
  const [bakhoorDeal, setBakhoorDeal] = useState<'single' | 'duo' | 'trio' | 'set8'>('single');

  // Dexe Hair Color Shampoo State (400ml)
  const [dexeDeal, setDexeDeal] = useState<'single' | 'duo'>('single');

  // Direct WhatsApp Checkout Helper
  const handleWhatsAppCheckout = (title: string, spec: string, price: number) => {
    const phone = BRAND_CONFIG.supportPhone;
    const message = encodeURIComponent(
      `Assalam o Alaikum! I want to order from The House of Aura:\n\n🛍️ *Product:* ${title}\n📦 *Selection / Deal:* ${spec}\n💰 *Price:* ${formatPKR(price)}\n\nPlease confirm availability and express dispatch!`
    );
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  // Compute Active Product Data safely
  const appleProduct = products.find((p) => p.id === 'apple-ammonia-free-hair-cream') || products[0];
  const cosmoProduct = products.find((p) => p.id === 'hoa-cosmo-keratin-shampoo-1000ml') || products[1];
  const bakhoorProduct = products.find((p) => p.id === 'hoa-bakhoor-hamidi') || products[2];
  const dexeProduct = products.find((p) => p.id === 'hoa-dexe-black-hair-shampoo') || products[3] || products[0];

  const currentBakhoorScent = BAKHOOR_SCENTS.find((s) => s.id === selectedScentId) || BAKHOOR_SCENTS[0];
  const secondBakhoorScent = BAKHOOR_SCENTS.find((s) => s.id === secondScentId) || BAKHOOR_SCENTS[3];
  const thirdBakhoorScent = BAKHOOR_SCENTS.find((s) => s.id === thirdScentId) || BAKHOOR_SCENTS[4];

  return (
    <section className="py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* ───────────────────────────────────────────────────────────────── */}
      {/* LUXURY WELCOME GREETING & TRUST HEADER                            */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <div className="mb-5 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-white via-[#fcfbf9] to-[#f7f2ea] border border-[#e8dfd3] shadow-md relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative z-10 space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a880]/20 text-[#8c6b38] text-xs font-bold uppercase tracking-wider border border-[#c5a880]/40">
            <Sparkles className="w-3.5 h-3.5 text-[#b38a48]" />
            <span>Direct UAE Luxury Imports</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-zinc-900 tracking-wide">
            THE HOUSE OF AURA
          </h2>
          <p className="text-sm font-serif italic text-[#9b7b4a]">
            Beauty, Care & Arabian Luxury
          </p>
          <p className="text-xs sm:text-sm text-zinc-600 max-w-2xl leading-relaxed pt-1">
            Curated salon hair essentials and authentic Emirati fragrances, brought to you directly from Dubai. Pure ingredients, zero compromise.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-3 shrink-0">
          <a
            href="https://wa.me/923179738321?text=Assalam%20o%20Alaikum!%20I%20want%20to%20inquire%20about%20The%20House%20of%20Aura%20products."
            target="_blank"
            rel="noreferrer"
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 flex items-center gap-2 transition-all hover:scale-[1.02]"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>WhatsApp Us (0317-9738321)</span>
          </a>
          <div className="hidden sm:flex items-center gap-2 px-4 py-3 rounded-xl bg-white border border-stone-200 text-xs text-zinc-700 shadow-sm font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Open Parcel on Delivery</span>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* MOBILE TOP TAB SWITCHER (4 Products)                             */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <div className="lg:hidden flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setActiveTab('apple')}
          className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'apple'
              ? 'border-zinc-900 bg-zinc-900 text-[#f5ebd9] shadow-md'
              : 'border-stone-200 bg-white text-zinc-700 hover:bg-stone-50'
          }`}
        >
          <span>🍏</span>
          <span>Apple 500ml</span>
        </button>

        <button
          onClick={() => setActiveTab('cosmo')}
          className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'cosmo'
              ? 'border-zinc-900 bg-zinc-900 text-[#f5ebd9] shadow-md'
              : 'border-stone-200 bg-white text-zinc-700 hover:bg-stone-50'
          }`}
        >
          <span>🧴</span>
          <span>Cosmo 1000ml</span>
        </button>

        <button
          onClick={() => setActiveTab('bakhoor')}
          className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'bakhoor'
              ? 'border-zinc-900 bg-zinc-900 text-[#f5ebd9] shadow-md'
              : 'border-stone-200 bg-white text-zinc-700 hover:bg-stone-50'
          }`}
        >
          <span>🪵</span>
          <span>Bakhoor 8-Set</span>
        </button>

        <button
          onClick={() => setActiveTab('dexe')}
          className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'dexe'
              ? 'border-zinc-900 bg-zinc-900 text-[#f5ebd9] shadow-md'
              : 'border-stone-200 bg-white text-zinc-700 hover:bg-stone-50'
          }`}
        >
          <span>🌿</span>
          <span>Dexe 400ml</span>
        </button>
      </div>

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* MAIN SPLIT-SCREEN CONSOLE: LEFT STAGE | RIGHT 4-PRODUCT MENU     */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* LEFT SIDE (8 COLS): DYNAMIC LUXURY SPOTLIGHT STAGE             */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <div className="lg:col-span-8 bg-white border border-[#e8dfd3] rounded-3xl p-6 sm:p-8 lg:p-9 shadow-xl shadow-stone-200/50 relative overflow-hidden">
          {/* Ambient Lighting Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a880]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

          <AnimatePresence mode="wait">
            {/* 🍏 PRODUCT 1: APPLE AMMONIA-FREE HAIR CREAM 500ml */}
            {activeTab === 'apple' && (
              <motion.div
                key="apple-stage"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
              >
                {/* Visual Box */}
                <div className="md:col-span-6 space-y-3">
                  {appleDeal === 'duo' ? (
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      {/* Box 1 */}
                      <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-white border border-[#e8dfd3] shadow-sm hover:shadow-md transition-all group flex flex-col relative p-2">
                        <div className="absolute top-2 left-2 z-10 bg-emerald-700/90 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-bold text-white shadow-sm">
                          Box 1: {appleShade}
                        </div>
                        <div className="flex-1 w-full flex items-center justify-center p-1 bg-[#faf8f5] rounded-xl overflow-hidden">
                          <img
                            src="/images/apple_hair_cream_offer_2499.jpg"
                            alt={`Apple Hair Cream - Box 1 (${appleShade})`}
                            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="pt-1.5 text-center text-[10px] text-zinc-700 font-bold truncate">
                          500ml + 500ml Kit
                        </div>
                      </div>

                      {/* Box 2 */}
                      <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-white border border-[#e8dfd3] shadow-sm hover:shadow-md transition-all group flex flex-col relative p-2">
                        <div className="absolute top-2 left-2 z-10 bg-emerald-700/90 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-bold text-white shadow-sm">
                          Box 2: {secondAppleShade}
                        </div>
                        <div className="flex-1 w-full flex items-center justify-center p-1 bg-[#faf8f5] rounded-xl overflow-hidden">
                          <img
                            src="/images/apple_hair_cream_offer_2499.jpg"
                            alt={`Apple Hair Cream - Box 2 (${secondAppleShade})`}
                            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="pt-1.5 text-center text-[10px] text-zinc-700 font-bold truncate">
                          500ml + 500ml Kit
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-[4/5] sm:aspect-square rounded-2xl overflow-hidden bg-white border border-[#e8dfd3] shadow-md group relative p-3 flex flex-col">
                      <div className="absolute top-3 left-3 z-10 bg-emerald-700/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-white flex items-center gap-1.5 shadow-sm">
                        <Clock className="w-3.5 h-3.5" />
                        <span>96h Long Lasting Shine</span>
                      </div>

                      <div className="flex-1 w-full flex items-center justify-center p-2 bg-[#faf8f5] rounded-xl overflow-hidden">
                        <img
                          src="/images/apple_hair_cream_offer_2499.jpg"
                          alt="Apple Ammonia-Free Hair Cream 500ml"
                          className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <div className="pt-2 flex items-center justify-between text-xs px-1">
                        <span className="font-bold text-zinc-900">500ml + 500ml Jumbo Kit</span>
                        <span className="font-bold text-emerald-700">Clear Water Formula</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Details & Action Box */}
                <div className="md:col-span-6 space-y-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase border border-emerald-300 mb-1.5">
                      <Sparkles className="w-3 h-3 text-emerald-700" />
                      <span>Dubai Salon Grade</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900">
                      Apple Ammonia-Free Black Hair Cream
                    </h3>
                    <p className="text-xs text-[#9b7b4a] mt-0.5 font-semibold">
                      500ml + 500ml Jumbo Value Pack • Zero Towel & Scalp Stains
                    </p>
                  </div>

                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Pure herbal formulation from Dubai. 100% grey hair coverage with zero scalp irritation, infused with fresh green apple extracts for lasting gloss and fragrance.
                  </p>

                  {/* Deal Selector */}
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-700 uppercase mb-1.5">
                      Choose Deal Pack:
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        onClick={() => setAppleDeal('single')}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          appleDeal === 'single'
                            ? 'border-[#c5a880] bg-[#faf6ef] ring-2 ring-[#c5a880] shadow-sm'
                            : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50'
                        }`}
                      >
                        <div className="text-[11px] text-zinc-500 font-medium">Single Jumbo Pack</div>
                        <div className="text-base font-extrabold text-zinc-900">{formatPKR(2499)}</div>
                        <div className="text-[10px] text-zinc-400 line-through">Rs. 3,500</div>
                      </button>

                      <button
                        onClick={() => setAppleDeal('duo')}
                        className={`p-3 rounded-xl border text-left transition-all relative cursor-pointer ${
                          appleDeal === 'duo'
                            ? 'border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-600 shadow-sm'
                            : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50'
                        }`}
                      >
                        <span className="absolute -top-2 right-2 px-1.5 py-0.5 rounded bg-emerald-600 text-white text-[9px] font-black uppercase shadow-xs">
                          Save Rs. 498
                        </span>
                        <div className="text-[11px] text-emerald-800 font-bold">Pack of 2 Deal</div>
                        <div className="text-base font-extrabold text-zinc-900">{formatPKR(4500)}</div>
                        <div className="text-[10px] text-emerald-700">Rs. 2,250 / pack</div>
                      </button>
                    </div>
                  </div>

                  {/* Shade Selection */}
                  {appleDeal === 'duo' ? (
                    <div className="space-y-2.5">
                      <div>
                        <label className="block text-[11px] font-bold text-zinc-700 uppercase mb-1">
                          Box 1 Shade ({appleShade}):
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {['Dark Brown', 'Medium Brown'].map((s) => (
                            <button
                              key={`box1-${s}`}
                              onClick={() => setAppleShade(s)}
                              className={`p-2 rounded-lg border text-xs font-bold transition-all text-center cursor-pointer ${
                                appleShade === s
                                  ? 'border-zinc-900 bg-zinc-900 text-[#f5ebd9] shadow-sm'
                                  : 'border-stone-200 bg-white text-zinc-700 hover:bg-stone-50'
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-zinc-700 uppercase mb-1">
                          Box 2 Shade ({secondAppleShade}):
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {['Dark Brown', 'Medium Brown'].map((s) => (
                            <button
                              key={`box2-${s}`}
                              onClick={() => setSecondAppleShade(s)}
                              className={`p-2 rounded-lg border text-xs font-bold transition-all text-center cursor-pointer ${
                                secondAppleShade === s
                                  ? 'border-emerald-700 bg-emerald-700 text-white shadow-sm'
                                  : 'border-stone-200 bg-white text-zinc-700 hover:bg-stone-50'
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-700 uppercase mb-1.5">
                        Select Hair Shade ({appleShade}):
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {['Dark Brown', 'Medium Brown'].map((s) => (
                          <button
                            key={s}
                            onClick={() => setAppleShade(s)}
                            className={`p-2.5 rounded-lg border text-xs font-bold transition-all text-center cursor-pointer ${
                              appleShade === s
                                ? 'border-zinc-900 bg-zinc-900 text-[#f5ebd9] shadow-sm'
                                : 'border-stone-200 bg-white text-zinc-700 hover:bg-stone-50'
                            }`}
                          >
                            {s} <span className="font-normal block text-[10px] text-emerald-700">In Stock</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTAs */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                    <button
                      onClick={() =>
                        handleWhatsAppCheckout(
                          'Apple Ammonia-Free Hair Cream (500ml+500ml)',
                          appleDeal === 'single'
                            ? `Single Jumbo Pack [${appleShade}]`
                            : `Pack of 2 Deal [Box 1: ${appleShade}, Box 2: ${secondAppleShade}]`,
                          appleDeal === 'single' ? 2499 : 4500
                        )
                      }
                      className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
                    >
                      <MessageCircle className="w-4 h-4 fill-white" />
                      <span>Order on WhatsApp (COD)</span>
                    </button>
                    <button
                      onClick={() => {
                        addToCart(appleProduct, appleProduct.varieties[0], appleDeal === 'single' ? 1 : 2);
                        showToast('success', 'Added to Bag!', `${appleProduct.name}`);
                      }}
                      className="py-3 px-4 rounded-xl bg-[#c5a880] hover:bg-[#b89569] text-zinc-950 font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-all hover:scale-[1.01]"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 🧴 PRODUCT 2: COSMO KERATIN SHAMPOO 1000ml */}
            {activeTab === 'cosmo' && (
              <motion.div
                key="cosmo-stage"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
              >
                <div className="md:col-span-6 space-y-3">
                  {cosmoDeal === 'duo' ? (
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      {/* Bottle 1 */}
                      <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-white border border-[#e8dfd3] shadow-sm hover:shadow-md transition-all group flex flex-col relative p-2">
                        <div className="absolute top-2 left-2 z-10 bg-amber-600/90 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-bold text-white shadow-sm">
                          Bottle 1 (1000ml)
                        </div>
                        <div className="flex-1 w-full flex items-center justify-center p-1 bg-[#faf8f5] rounded-xl overflow-hidden">
                          <img
                            src="/images/cosmo_keratin_daraz_showcase.jpg"
                            alt="COSMO Keratin Shampoo 1000ml Bottle 1"
                            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="pt-1.5 text-center text-[10px] text-zinc-700 font-bold truncate">
                          Sulfate & Paraben Free
                        </div>
                      </div>

                      {/* Bottle 2 */}
                      <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-white border border-[#e8dfd3] shadow-sm hover:shadow-md transition-all group flex flex-col relative p-2">
                        <div className="absolute top-2 left-2 z-10 bg-amber-600/90 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-bold text-white shadow-sm">
                          Bottle 2 (1000ml)
                        </div>
                        <div className="flex-1 w-full flex items-center justify-center p-1 bg-[#faf8f5] rounded-xl overflow-hidden">
                          <img
                            src="/images/cosmo_keratin_daraz_showcase.jpg"
                            alt="COSMO Keratin Shampoo 1000ml Bottle 2"
                            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="pt-1.5 text-center text-[10px] text-zinc-700 font-bold truncate">
                          Sulfate & Paraben Free
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-[4/5] sm:aspect-square rounded-2xl overflow-hidden bg-white border border-[#e8dfd3] shadow-md group relative p-3 flex flex-col">
                      <div className="absolute top-3 right-3 z-10 bg-rose-600 text-white text-[11px] font-black px-3 py-1 rounded-full shadow-sm">
                        FLAT 59% OFF
                      </div>

                      <div className="flex-1 w-full flex items-center justify-center p-2 bg-[#faf8f5] rounded-xl overflow-hidden">
                        <img
                          src="/images/cosmo_keratin_daraz_showcase.jpg"
                          alt="COSMO Keratin Shampoo 1000ml Jumbo Size"
                          className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <div className="pt-2 flex items-center justify-between text-xs px-1">
                        <span className="font-bold text-zinc-900">1000ml Jumbo Salon Bottle</span>
                        <span className="font-bold text-amber-700">Sulfate & Paraben Free</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="md:col-span-6 space-y-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-bold uppercase border border-amber-300 mb-1.5">
                      <Award className="w-3 h-3 text-amber-700" />
                      <span>Special UAE Offer 59% OFF</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900">
                      COSMO Hair Naturals Keratin Shampoo
                    </h3>
                    <p className="text-xs text-[#9b7b4a] mt-0.5 font-semibold">
                      1000ml Jumbo Salon Dispenser Bottle • Hydrolyzed Keratin Protein & Biotin
                    </p>
                  </div>

                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Imported directly from UAE. Formulated to repair damaged hair cuticles, stop excessive fall, and eliminate frizz with natural biotin therapy.
                  </p>

                  {/* Deals */}
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-700 uppercase mb-1.5">
                      Choose Pack Option:
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        onClick={() => setCosmoDeal('single')}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          cosmoDeal === 'single'
                            ? 'border-[#c5a880] bg-[#faf6ef] ring-2 ring-[#c5a880] shadow-sm'
                            : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50'
                        }`}
                      >
                        <div className="text-[11px] text-zinc-500 font-medium">Single 1000ml Bottle</div>
                        <div className="text-base font-extrabold text-zinc-900">{formatPKR(1970)}</div>
                        <div className="text-[10px] text-zinc-400 line-through">Rs. 4,800</div>
                      </button>

                      <button
                        onClick={() => setCosmoDeal('duo')}
                        className={`p-3 rounded-xl border text-left transition-all relative cursor-pointer ${
                          cosmoDeal === 'duo'
                            ? 'border-amber-600 bg-amber-50/70 ring-2 ring-amber-600 shadow-sm'
                            : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50'
                        }`}
                      >
                        <span className="absolute -top-2 right-2 px-1.5 py-0.5 rounded bg-amber-600 text-white text-[9px] font-black uppercase shadow-xs">
                          Mega Deal
                        </span>
                        <div className="text-[11px] text-amber-800 font-bold">Pack of 2 (2000ml)</div>
                        <div className="text-base font-extrabold text-zinc-900">{formatPKR(3000)}</div>
                        <div className="text-[10px] text-amber-700">Rs. 1,500 / bottle</div>
                      </button>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                    <button
                      onClick={() =>
                        handleWhatsAppCheckout(
                          'COSMO Keratin Shampoo (1000ml)',
                          cosmoDeal === 'single' ? 'Single 1000ml Bottle' : 'Pack of 2 Duo Deal (2000ml)',
                          cosmoDeal === 'single' ? 1970 : 3000
                        )
                      }
                      className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
                    >
                      <MessageCircle className="w-4 h-4 fill-white" />
                      <span>Order on WhatsApp (COD)</span>
                    </button>
                    <button
                      onClick={() => {
                        addToCart(cosmoProduct, cosmoProduct.varieties[0], cosmoDeal === 'single' ? 1 : 2);
                        showToast('success', 'Added to Bag!', `${cosmoProduct.name}`);
                      }}
                      className="py-3 px-4 rounded-xl bg-[#c5a880] hover:bg-[#b89569] text-zinc-950 font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-all hover:scale-[1.01]"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 🪵 PRODUCT 3: BAKHOOR HAMIDI 8 SCENTS */}
            {activeTab === 'bakhoor' && (
              <motion.div
                key="bakhoor-stage"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
              >
                {/* Visual Box */}
                <div className="md:col-span-6 space-y-3">
                  {bakhoorDeal === 'duo' ? (
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      {/* Jar 1 */}
                      <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-white border border-[#e8dfd3] shadow-sm hover:shadow-md transition-all group flex flex-col relative p-2">
                        <div className="absolute top-2 left-2 z-10 bg-[#1a1917]/90 backdrop-blur-md px-2 py-0.5 rounded-md border border-[#c5a880]/50 text-[10px] font-bold text-[#e6ca9e] shadow-sm truncate max-w-[85%]">
                          Jar 1: {currentBakhoorScent.shortName}
                        </div>
                        <div className="flex-1 w-full flex items-center justify-center p-1 bg-[#faf8f5] rounded-xl overflow-hidden">
                          <img
                            src={currentBakhoorScent.image}
                            alt={currentBakhoorScent.name}
                            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="pt-1.5 text-center text-[10px] text-zinc-700 font-bold truncate">
                          Airtight Crystal Jar
                        </div>
                      </div>

                      {/* Jar 2 */}
                      <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-white border border-[#e8dfd3] shadow-sm hover:shadow-md transition-all group flex flex-col relative p-2">
                        <div className="absolute top-2 left-2 z-10 bg-[#1a1917]/90 backdrop-blur-md px-2 py-0.5 rounded-md border border-[#c5a880]/50 text-[10px] font-bold text-[#e6ca9e] shadow-sm truncate max-w-[85%]">
                          Jar 2: {secondBakhoorScent.shortName}
                        </div>
                        <div className="flex-1 w-full flex items-center justify-center p-1 bg-[#faf8f5] rounded-xl overflow-hidden">
                          <img
                            src={secondBakhoorScent.image}
                            alt={secondBakhoorScent.name}
                            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="pt-1.5 text-center text-[10px] text-zinc-700 font-bold truncate">
                          Airtight Crystal Jar
                        </div>
                      </div>
                    </div>
                  ) : bakhoorDeal === 'trio' ? (
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      {/* Jar 1 */}
                      <div className="aspect-[3/4] sm:aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden bg-white border border-[#e8dfd3] shadow-sm hover:shadow-md transition-all group flex flex-col relative p-1.5 sm:p-2">
                        <div className="absolute top-1.5 left-1.5 z-10 bg-[#1a1917]/90 backdrop-blur-md px-1.5 py-0.5 rounded text-[9px] font-bold text-[#e6ca9e] shadow-sm truncate max-w-[90%]">
                          1: {currentBakhoorScent.shortName}
                        </div>
                        <div className="flex-1 w-full flex items-center justify-center p-1 bg-[#faf8f5] rounded-lg overflow-hidden">
                          <img
                            src={currentBakhoorScent.image}
                            alt={currentBakhoorScent.name}
                            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="pt-1 text-center text-[9px] text-zinc-700 font-bold truncate">
                          {currentBakhoorScent.shortName}
                        </div>
                      </div>

                      {/* Jar 2 */}
                      <div className="aspect-[3/4] sm:aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden bg-white border border-[#e8dfd3] shadow-sm hover:shadow-md transition-all group flex flex-col relative p-1.5 sm:p-2">
                        <div className="absolute top-1.5 left-1.5 z-10 bg-[#1a1917]/90 backdrop-blur-md px-1.5 py-0.5 rounded text-[9px] font-bold text-[#e6ca9e] shadow-sm truncate max-w-[90%]">
                          2: {secondBakhoorScent.shortName}
                        </div>
                        <div className="flex-1 w-full flex items-center justify-center p-1 bg-[#faf8f5] rounded-lg overflow-hidden">
                          <img
                            src={secondBakhoorScent.image}
                            alt={secondBakhoorScent.name}
                            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="pt-1 text-center text-[9px] text-zinc-700 font-bold truncate">
                          {secondBakhoorScent.shortName}
                        </div>
                      </div>

                      {/* Jar 3 */}
                      <div className="aspect-[3/4] sm:aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden bg-white border border-[#e8dfd3] shadow-sm hover:shadow-md transition-all group flex flex-col relative p-1.5 sm:p-2">
                        <div className="absolute top-1.5 left-1.5 z-10 bg-[#1a1917]/90 backdrop-blur-md px-1.5 py-0.5 rounded text-[9px] font-bold text-[#e6ca9e] shadow-sm truncate max-w-[90%]">
                          3: {thirdBakhoorScent.shortName}
                        </div>
                        <div className="flex-1 w-full flex items-center justify-center p-1 bg-[#faf8f5] rounded-lg overflow-hidden">
                          <img
                            src={thirdBakhoorScent.image}
                            alt={thirdBakhoorScent.name}
                            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="pt-1 text-center text-[9px] text-zinc-700 font-bold truncate">
                          {thirdBakhoorScent.shortName}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-[4/5] sm:aspect-square rounded-2xl overflow-hidden bg-white border border-[#e8dfd3] shadow-md group relative p-3 flex flex-col">
                      <div className="absolute top-3 left-3 z-10 bg-[#1a1917]/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#c5a880]/50 text-[11px] font-bold text-[#e6ca9e] flex items-center gap-1.5 shadow-sm">
                        <Flame className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span>
                          {bakhoorDeal === 'set8' ? 'Complete 8-Piece Vault' : currentBakhoorScent.shortName}
                        </span>
                      </div>

                      <div className="flex-1 w-full flex items-center justify-center p-2 bg-[#faf8f5] rounded-xl overflow-hidden">
                        <img
                          src={
                            bakhoorDeal === 'set8'
                              ? '/images/bakhoor_8set_art_of_scent.jpg'
                              : currentBakhoorScent.image
                          }
                          alt={bakhoorDeal === 'set8' ? 'Bakhoor Complete 8 Set' : currentBakhoorScent.name}
                          className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <div className="pt-2 flex items-center justify-between text-xs px-1">
                        <span className="font-bold text-zinc-900">48+ Hours Lingering Aroma</span>
                        <span className="font-bold text-[#9b7b4a]">Taif Rose & Amber</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Details & Actions */}
                <div className="md:col-span-6 space-y-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#c5a880]/20 text-[#8c6b38] text-[11px] font-bold uppercase border border-[#c5a880]/40 mb-1.5">
                      <Sparkles className="w-3 h-3 text-[#b38a48]" />
                      <span>The Art of Scent • Dubai</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900">
                      Bakhoor Hamidi (8 Arabian Fragrances)
                    </h3>
                    <p className="text-xs text-[#9b7b4a] mt-0.5 font-semibold">
                      Aged Cambodian Agarwood Infused in Royal Attars & Ambergris
                    </p>
                  </div>

                  {/* Pricing Matrix Deals First */}
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-700 uppercase mb-1.5">
                      Select Package / Deal:
                    </label>
                    <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                      <button
                        onClick={() => setBakhoorDeal('single')}
                        className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                          bakhoorDeal === 'single'
                            ? 'border-[#c5a880] bg-[#faf6ef] ring-2 ring-[#c5a880] shadow-sm'
                            : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50'
                        }`}
                      >
                        <div className="text-[9px] text-zinc-500 font-medium">Single Jar</div>
                        <div className="text-xs font-extrabold text-zinc-900">{formatPKR(1799)}</div>
                        <div className="text-[9px] text-zinc-400 line-through">Rs. 2,499</div>
                      </button>

                      <button
                        onClick={() => setBakhoorDeal('duo')}
                        className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                          bakhoorDeal === 'duo'
                            ? 'border-[#c5a880] bg-[#faf6ef] ring-2 ring-[#c5a880] shadow-sm'
                            : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50'
                        }`}
                      >
                        <div className="text-[9px] text-[#9b7b4a] font-bold">Pack of 2</div>
                        <div className="text-xs font-extrabold text-zinc-900">{formatPKR(2999)}</div>
                        <div className="text-[9px] text-emerald-700 font-bold">Save Rs. 599</div>
                      </button>

                      <button
                        onClick={() => setBakhoorDeal('trio')}
                        className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                          bakhoorDeal === 'trio'
                            ? 'border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-600 shadow-sm'
                            : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50'
                        }`}
                      >
                        <div className="text-[9px] text-emerald-800 font-bold">Pack of 3</div>
                        <div className="text-xs font-extrabold text-zinc-900">{formatPKR(4000)}</div>
                        <div className="text-[9px] text-emerald-700 font-bold">Save 1,397</div>
                      </button>

                      <button
                        onClick={() => setBakhoorDeal('set8')}
                        className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                          bakhoorDeal === 'set8'
                            ? 'border-amber-600 bg-amber-50/70 ring-2 ring-amber-600 shadow-sm'
                            : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50'
                        }`}
                      >
                        <div className="text-[9px] text-amber-800 font-bold">8-Set Vault</div>
                        <div className="text-xs font-extrabold text-zinc-900">{formatPKR(7499)}</div>
                        <div className="text-[9px] text-amber-700">Luxury Tray</div>
                      </button>
                    </div>
                  </div>

                  {/* Dynamic Scent Selector for Single / Duo / Trio */}
                  {bakhoorDeal === 'single' && (
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-700 uppercase mb-1.5">
                        Select Arabian Scent ({currentBakhoorScent.shortName}):
                      </label>
                      <div className="grid grid-cols-4 gap-1.5">
                        {BAKHOOR_SCENTS.map((s) => (
                          <button
                            key={s.id}
                            onClick={() => setSelectedScentId(s.id)}
                            className={`py-1.5 px-2 rounded-lg border text-center text-[10px] font-bold transition-all truncate cursor-pointer ${
                              selectedScentId === s.id
                                ? 'border-zinc-900 bg-zinc-900 text-[#f5ebd9] shadow-sm'
                                : 'border-stone-200 bg-white text-zinc-700 hover:bg-stone-50'
                            }`}
                          >
                            {s.shortName}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {bakhoorDeal === 'duo' && (
                    <div className="space-y-2.5">
                      <div>
                        <label className="block text-[11px] font-bold text-[#8c6b38] uppercase mb-1">
                          Jar 1 Scent ({currentBakhoorScent.shortName}):
                        </label>
                        <div className="grid grid-cols-4 gap-1.5">
                          {BAKHOOR_SCENTS.map((s) => (
                            <button
                              key={`duo-1-${s.id}`}
                              onClick={() => setSelectedScentId(s.id)}
                              className={`py-1.5 px-2 rounded-lg border text-center text-[10px] font-bold transition-all truncate cursor-pointer ${
                                selectedScentId === s.id
                                  ? 'border-zinc-900 bg-zinc-900 text-[#f5ebd9] shadow-sm'
                                  : 'border-stone-200 bg-white text-zinc-700 hover:bg-stone-50'
                              }`}
                            >
                              {s.shortName}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-emerald-800 uppercase mb-1">
                          Jar 2 Scent ({secondBakhoorScent.shortName}):
                        </label>
                        <div className="grid grid-cols-4 gap-1.5">
                          {BAKHOOR_SCENTS.map((s) => (
                            <button
                              key={`duo-2-${s.id}`}
                              onClick={() => setSecondScentId(s.id)}
                              className={`py-1.5 px-2 rounded-lg border text-center text-[10px] font-bold transition-all truncate cursor-pointer ${
                                secondScentId === s.id
                                  ? 'border-emerald-700 bg-emerald-700 text-white shadow-sm'
                                  : 'border-stone-200 bg-white text-zinc-700 hover:bg-stone-50'
                              }`}
                            >
                              {s.shortName}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {bakhoorDeal === 'trio' && (
                    <div className="space-y-2">
                      <div>
                        <label className="block text-[10px] font-bold text-[#8c6b38] uppercase mb-0.5">
                          Jar 1 Scent ({currentBakhoorScent.shortName}):
                        </label>
                        <div className="grid grid-cols-4 gap-1">
                          {BAKHOOR_SCENTS.map((s) => (
                            <button
                              key={`trio-1-${s.id}`}
                              onClick={() => setSelectedScentId(s.id)}
                              className={`py-1 px-1.5 rounded-lg border text-center text-[9px] font-bold transition-all truncate cursor-pointer ${
                                selectedScentId === s.id
                                  ? 'border-zinc-900 bg-zinc-900 text-[#f5ebd9] shadow-sm'
                                  : 'border-stone-200 bg-white text-zinc-700 hover:bg-stone-50'
                              }`}
                            >
                              {s.shortName}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-emerald-800 uppercase mb-0.5">
                          Jar 2 Scent ({secondBakhoorScent.shortName}):
                        </label>
                        <div className="grid grid-cols-4 gap-1">
                          {BAKHOOR_SCENTS.map((s) => (
                            <button
                              key={`trio-2-${s.id}`}
                              onClick={() => setSecondScentId(s.id)}
                              className={`py-1 px-1.5 rounded-lg border text-center text-[9px] font-bold transition-all truncate cursor-pointer ${
                                secondScentId === s.id
                                  ? 'border-emerald-700 bg-emerald-700 text-white shadow-sm'
                                  : 'border-stone-200 bg-white text-zinc-700 hover:bg-stone-50'
                              }`}
                            >
                              {s.shortName}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-amber-800 uppercase mb-0.5">
                          Jar 3 Scent ({thirdBakhoorScent.shortName}):
                        </label>
                        <div className="grid grid-cols-4 gap-1">
                          {BAKHOOR_SCENTS.map((s) => (
                            <button
                              key={`trio-3-${s.id}`}
                              onClick={() => setThirdScentId(s.id)}
                              className={`py-1 px-1.5 rounded-lg border text-center text-[9px] font-bold transition-all truncate cursor-pointer ${
                                thirdScentId === s.id
                                  ? 'border-amber-700 bg-amber-700 text-white shadow-sm'
                                  : 'border-stone-200 bg-white text-zinc-700 hover:bg-stone-50'
                              }`}
                            >
                              {s.shortName}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {bakhoorDeal === 'set8' && (
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                      <span className="font-bold">✨ Master Collection Includes All 8 Scents:</span> Black Oud, Sheikha, Oud Sharqia, Bayt Al Oud, Al Zuhur, Oud Maghrib, Khalifa, and Oud Abiyad in a presentation tray.
                    </div>
                  )}

                  {/* CTAs */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                    <button
                      onClick={() => {
                        let dealTitle = 'Bakhoor Hamidi';
                        let dealPrice = 1799;
                        let dealSpec = currentBakhoorScent.name;

                        if (bakhoorDeal === 'duo') {
                          dealTitle = 'Bakhoor Hamidi Pack of 2 Deal';
                          dealPrice = 2999;
                          dealSpec = `Jar 1: ${currentBakhoorScent.shortName} + Jar 2: ${secondBakhoorScent.shortName} (Save Rs. 599)`;
                        } else if (bakhoorDeal === 'trio') {
                          dealTitle = 'Bakhoor Hamidi Pack of 3 Deal';
                          dealPrice = 4000;
                          dealSpec = `Jar 1: ${currentBakhoorScent.shortName} + Jar 2: ${secondBakhoorScent.shortName} + Jar 3: ${thirdBakhoorScent.shortName} (Save Rs. 1,397)`;
                        } else if (bakhoorDeal === 'set8') {
                          dealTitle = 'Bakhoor Hamidi 8-Set Heritage Vault';
                          dealPrice = 7499;
                          dealSpec = 'Complete 8 Scents Collection with Presentation Tray';
                        }

                        handleWhatsAppCheckout(dealTitle, dealSpec, dealPrice);
                      }}
                      className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
                    >
                      <MessageCircle className="w-4 h-4 fill-white" />
                      <span>Order on WhatsApp (COD)</span>
                    </button>
                    <button
                      onClick={() => {
                        const qty = bakhoorDeal === 'duo' ? 2 : bakhoorDeal === 'trio' ? 3 : bakhoorDeal === 'set8' ? 8 : 1;
                        addToCart(bakhoorProduct, bakhoorProduct.varieties[0], qty);
                        showToast('success', 'Added to Bag!', `${bakhoorProduct.name}`);
                      }}
                      className="py-3 px-4 rounded-xl bg-[#c5a880] hover:bg-[#b89569] text-zinc-950 font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-all hover:scale-[1.01]"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 🌿 PRODUCT 4: DEXE HAIR COLOR SHAMPOO 400ml */}
            {activeTab === 'dexe' && (
              <motion.div
                key="dexe-stage"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
              >
                <div className="md:col-span-6 space-y-3">
                  {dexeDeal === 'duo' ? (
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      {/* Bottle 1 */}
                      <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-white border border-[#e8dfd3] shadow-sm hover:shadow-md transition-all group flex flex-col relative p-2">
                        <div className="absolute top-2 left-2 z-10 bg-teal-700/90 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-bold text-white shadow-sm">
                          Bottle 1 (400ml)
                        </div>
                        <div className="flex-1 w-full flex items-center justify-center p-1 bg-[#faf8f5] rounded-xl overflow-hidden">
                          <img
                            src="/images/dexe_hair_shampoo_offer_2099.jpg"
                            alt="Dexe Black Hair Color Shampoo Bottle 1"
                            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="pt-1.5 text-center text-[10px] text-zinc-700 font-bold truncate">
                          100% Ammonia-Free
                        </div>
                      </div>

                      {/* Bottle 2 */}
                      <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-white border border-[#e8dfd3] shadow-sm hover:shadow-md transition-all group flex flex-col relative p-2">
                        <div className="absolute top-2 left-2 z-10 bg-teal-700/90 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-bold text-white shadow-sm">
                          Bottle 2 (400ml)
                        </div>
                        <div className="flex-1 w-full flex items-center justify-center p-1 bg-[#faf8f5] rounded-xl overflow-hidden">
                          <img
                            src="/images/dexe_hair_shampoo_offer_2099.jpg"
                            alt="Dexe Black Hair Color Shampoo Bottle 2"
                            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="pt-1.5 text-center text-[10px] text-zinc-700 font-bold truncate">
                          100% Ammonia-Free
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-[4/5] sm:aspect-square rounded-2xl overflow-hidden bg-white border border-[#e8dfd3] shadow-md group relative p-3 flex flex-col">
                      <div className="absolute top-3 left-3 z-10 bg-teal-700 text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                        <Zap className="w-3.5 h-3.5" />
                        <span>5-Minute Express Coverage</span>
                      </div>

                      <div className="flex-1 w-full flex items-center justify-center p-2 bg-[#faf8f5] rounded-xl overflow-hidden">
                        <img
                          src="/images/dexe_hair_shampoo_offer_2099.jpg"
                          alt="Dexe Black Hair Color Shampoo 400ml"
                          className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <div className="pt-2 flex items-center justify-between text-xs px-1">
                        <span className="font-bold text-zinc-900">400ml Salon Pump Bottle</span>
                        <span className="font-bold text-teal-700">100% Ammonia-Free</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="md:col-span-6 space-y-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-900 text-[11px] font-bold uppercase border border-teal-300 mb-1.5">
                      <Sparkles className="w-3 h-3 text-teal-700" />
                      <span>Instant Fast Dye • 5 Minutes</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900">
                      Dexe Black Hair Color Shampoo (400ml)
                    </h3>
                    <p className="text-xs text-[#9b7b4a] mt-0.5 font-semibold">
                      400ml Jumbo Salon Dispenser • Herbal Ginseng & Argan Formula
                    </p>
                  </div>

                  <p className="text-xs text-zinc-600 leading-relaxed">
                    World-renowned herbal hair darkening shampoo. Infused with Chinese ginseng, black sesame, and argan oil to nourish scalp while restoring rich natural black in just 5 minutes with zero skin stains.
                  </p>

                  {/* Shade Selection */}
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-700 uppercase mb-1.5">
                      Select Hair Shade:
                    </label>
                    <div className="p-2.5 rounded-lg border border-stone-200 bg-[#faf8f5] text-zinc-900 text-xs font-bold flex items-center justify-between">
                      <span>1.0 Natural Black</span>
                      <span className="text-[11px] text-[#9b7b4a] font-normal">Rich Salon Black • 100% Coverage</span>
                    </div>
                  </div>

                  {/* Deal Selector */}
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-700 uppercase mb-1.5">
                      Choose Deal Pack:
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        onClick={() => setDexeDeal('single')}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          dexeDeal === 'single'
                            ? 'border-[#c5a880] bg-[#faf6ef] ring-2 ring-[#c5a880] shadow-sm'
                            : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50'
                        }`}
                      >
                        <div className="text-[11px] text-zinc-500 font-medium">Single 400ml Bottle</div>
                        <div className="text-base font-extrabold text-zinc-900">{formatPKR(2099)}</div>
                        <div className="text-[10px] text-zinc-400 line-through">Rs. 3,000</div>
                      </button>

                      <button
                        onClick={() => setDexeDeal('duo')}
                        className={`p-3 rounded-xl border text-left transition-all relative cursor-pointer ${
                          dexeDeal === 'duo'
                            ? 'border-teal-700 bg-teal-50/70 ring-2 ring-teal-700 shadow-sm'
                            : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50'
                        }`}
                      >
                        <span className="absolute -top-2 right-2 px-1.5 py-0.5 rounded bg-teal-700 text-white text-[9px] font-black uppercase shadow-xs">
                          Save Rs. 398
                        </span>
                        <div className="text-[11px] text-teal-800 font-bold">Pack of 2 Deal</div>
                        <div className="text-base font-extrabold text-zinc-900">{formatPKR(3800)}</div>
                        <div className="text-[10px] text-teal-700">Rs. 1,900 / bottle</div>
                      </button>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                    <button
                      onClick={() =>
                        handleWhatsAppCheckout(
                          'Dexe Black Hair Color Shampoo (400ml)',
                          dexeDeal === 'single' ? 'Single 400ml Bottle' : 'Pack of 2 Bottles Deal (800ml)',
                          dexeDeal === 'single' ? 2099 : 3800
                        )
                      }
                      className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
                    >
                      <MessageCircle className="w-4 h-4 fill-white" />
                      <span>Order on WhatsApp (COD)</span>
                    </button>
                    <button
                      onClick={() => {
                        addToCart(dexeProduct, dexeProduct.varieties[0], dexeDeal === 'single' ? 1 : 2);
                        showToast('success', 'Added to Bag!', `${dexeProduct.name}`);
                      }}
                      className="py-3 px-4 rounded-xl bg-[#c5a880] hover:bg-[#b89569] text-zinc-950 font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-all hover:scale-[1.01]"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* RIGHT SIDE (4 COLS): 4-PRODUCT SELECTOR MENU                   */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <div className="lg:col-span-4 space-y-3.5">
          <div className="px-1">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#8c6b38]">
              Dubai Flagship Collection
            </h4>
            <p className="text-[11px] text-zinc-500 mt-0.5">
              Click any product below to view details & place order:
            </p>
          </div>

          {/* 🍏 Product 1 Card */}
          <button
            onClick={() => setActiveTab('apple')}
            className={`w-full p-3.5 rounded-2xl border text-left transition-all relative flex items-center gap-3.5 group cursor-pointer ${
              activeTab === 'apple'
                ? 'border-2 border-emerald-600 bg-white ring-2 ring-emerald-600/20 shadow-lg'
                : 'border border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50 shadow-sm'
            }`}
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-[#faf8f5] border border-stone-200 shrink-0 p-1 flex items-center justify-center">
              <img
                src="/images/apple_hair_cream_offer_2499.jpg"
                alt="Apple Hair Cream"
                className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 uppercase">
                <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                <span>96h Shine Formula</span>
              </div>
              <div className="text-sm font-serif font-bold text-zinc-900 truncate mt-0.5">Apple Hair Cream</div>
              <div className="text-xs text-zinc-500 truncate">500ml+500ml Jumbo Kit</div>
              <div className="text-xs font-black text-emerald-700 mt-1">{formatPKR(2499)}</div>
            </div>
            <ChevronRight className={`w-4 h-4 transition-transform ${activeTab === 'apple' ? 'text-emerald-700 translate-x-1' : 'text-zinc-400'}`} />
          </button>

          {/* 🧴 Product 2 Card */}
          <button
            onClick={() => setActiveTab('cosmo')}
            className={`w-full p-3.5 rounded-2xl border text-left transition-all relative flex items-center gap-3.5 group cursor-pointer ${
              activeTab === 'cosmo'
                ? 'border-2 border-amber-600 bg-white ring-2 ring-amber-600/20 shadow-lg'
                : 'border border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50 shadow-sm'
            }`}
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-[#faf8f5] border border-stone-200 shrink-0 p-1 flex items-center justify-center">
              <img
                src="/images/cosmo_keratin_daraz_showcase.jpg"
                alt="Cosmo Keratin Shampoo"
                className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 text-[10px] font-bold text-rose-600 uppercase">
                <span>Flat 59% OFF</span>
              </div>
              <div className="text-sm font-serif font-bold text-zinc-900 truncate mt-0.5">COSMO Keratin Shampoo</div>
              <div className="text-xs text-zinc-500 truncate">1000ml Jumbo Dispenser</div>
              <div className="text-xs font-black text-amber-700 mt-1">{formatPKR(1970)}</div>
            </div>
            <ChevronRight className={`w-4 h-4 transition-transform ${activeTab === 'cosmo' ? 'text-amber-700 translate-x-1' : 'text-zinc-400'}`} />
          </button>

          {/* 🪵 Product 3 Card */}
          <button
            onClick={() => setActiveTab('bakhoor')}
            className={`w-full p-3.5 rounded-2xl border text-left transition-all relative flex items-center gap-3.5 group cursor-pointer ${
              activeTab === 'bakhoor'
                ? 'border-2 border-[#c5a880] bg-white ring-2 ring-[#c5a880]/30 shadow-lg'
                : 'border border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50 shadow-sm'
            }`}
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-[#faf8f5] border border-stone-200 shrink-0 p-1 flex items-center justify-center">
              <img
                src="/images/bakhoor_black_oud_offer_1799.jpg"
                alt="Bakhoor Hamidi"
                className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 text-[10px] font-bold text-[#8c6b38] uppercase">
                <span>8 Royal Scent Jars</span>
              </div>
              <div className="text-sm font-serif font-bold text-zinc-900 truncate mt-0.5">Bakhoor Hamidi</div>
              <div className="text-xs text-zinc-500 truncate">48h Lingering Fragrance</div>
              <div className="text-xs font-black text-[#8c6b38] mt-1">From {formatPKR(1799)}</div>
            </div>
            <ChevronRight className={`w-4 h-4 transition-transform ${activeTab === 'bakhoor' ? 'text-[#8c6b38] translate-x-1' : 'text-zinc-400'}`} />
          </button>

          {/* 🌿 Product 4 Card: Dexe */}
          <button
            onClick={() => setActiveTab('dexe')}
            className={`w-full p-3.5 rounded-2xl border text-left transition-all relative flex items-center gap-3.5 group cursor-pointer ${
              activeTab === 'dexe'
                ? 'border-2 border-teal-700 bg-white ring-2 ring-teal-700/20 shadow-lg'
                : 'border border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50 shadow-sm'
            }`}
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-[#faf8f5] border border-stone-200 shrink-0 p-1 flex items-center justify-center">
              <img
                src="/images/dexe_hair_shampoo_offer_2099.jpg"
                alt="Dexe Black Hair Shampoo"
                className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 text-[10px] font-bold text-teal-700 uppercase">
                <span>5-Min Quick Dye</span>
              </div>
              <div className="text-sm font-serif font-bold text-zinc-900 truncate mt-0.5">Dexe Black Hair Shampoo</div>
              <div className="text-xs text-zinc-500 truncate">400ml Salon Pump Dispenser</div>
              <div className="text-xs font-black text-teal-700 mt-1">{formatPKR(2099)}</div>
            </div>
            <ChevronRight className={`w-4 h-4 transition-transform ${activeTab === 'dexe' ? 'text-teal-700 translate-x-1' : 'text-zinc-400'}`} />
          </button>

          {/* Trust Guarantee Box */}
          <div className="p-4 rounded-2xl bg-white border border-[#e8dfd3] shadow-sm space-y-2.5">
            <div className="flex items-center gap-2 text-xs text-zinc-700 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Open Parcel Verification on Delivery</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-700 font-medium">
              <Truck className="w-4 h-4 text-[#8c6b38] shrink-0" />
              <span>Express Delivery across Pakistan</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-700 font-medium">
              <Check className="w-4 h-4 text-amber-600 shrink-0" />
              <span>100% Genuine UAE Imported Stock</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
