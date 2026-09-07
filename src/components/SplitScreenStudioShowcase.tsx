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
  { id: 'black_oud', name: 'Bakhoor Black Oud (Intense Agarwood)', shortName: 'Black Oud', image: '/images/studio_variants/bakhoor_black_oud.jpg', tag: 'Top Oud', color: '#1a1a1a' },
  { id: 'sheikha', name: 'Bakhoor Sheikha (Royal Floral Amber)', shortName: 'Sheikha', image: '/images/studio_variants/bakhoor_sheikha.jpg', tag: 'Bestseller', color: '#d4af37' },
  { id: 'oud_sharqia', name: 'Bakhoor Oud Sharqia (Warm Spicy)', shortName: 'Oud Sharqia', image: '/images/studio_variants/bakhoor_oud_sharqia.jpg', tag: 'Spicy', color: '#b85d19' },
  { id: 'bayt_al_oud', name: 'Bakhoor Bayt Al Oud (Deep Woody)', shortName: 'Bayt Al Oud', image: '/images/studio_variants/bakhoor_bayt_al_oud.jpg', tag: 'Woody', color: '#4a2c11' },
  { id: 'al_zuhur', name: 'Bakhoor Al Zuhur (Rose Blossom)', shortName: 'Al Zuhur', image: '/images/studio_variants/bakhoor_al_zuhur.jpg', tag: 'Floral', color: '#8a2be2' },
  { id: 'oud_maghrib', name: 'Bakhoor Oud Maghrib (Moroccan Saffron)', shortName: 'Oud Maghrib', image: '/images/studio_variants/bakhoor_oud_maghrib.jpg', tag: 'Exotic', color: '#c0392b' },
  { id: 'khalifa', name: 'Bakhoor Khalifa (Smoky Amber Oud)', shortName: 'Khalifa', image: '/images/studio_variants/bakhoor_khalifa.jpg', tag: 'Royal', color: '#7f8c8d' },
  { id: 'oud_abiyad', name: 'Bakhoor Oud Abiyad (White Musk)', shortName: 'Oud Abiyad', image: '/images/studio_variants/bakhoor_oud_abiyad.jpg', tag: 'Sweet', color: '#bdc3c7' }
];

export const SplitScreenStudioShowcase: React.FC = () => {
  const { products, addToCart, showToast } = useStore();

  // Active Main Product Tab
  const [activeTab, setActiveTab] = useState<ProductTabKey>('apple');

  // Apple Hair Cream State
  const [appleView, setAppleView] = useState<'front' | 'back'>('front');
  const [appleShade, setAppleShade] = useState('1.0 Natural Black');
  const [appleDeal, setAppleDeal] = useState<'single' | 'duo'>('single');

  // Cosmo Shampoo State (480ml)
  const [cosmoDeal, setCosmoDeal] = useState<'single' | 'duo'>('single');

  // Bakhoor Hamidi State
  const [selectedScentId, setSelectedScentId] = useState('black_oud');
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

  return (
    <section className="py-8 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* ───────────────────────────────────────────────────────────────── */}
      {/* LUXURY WELCOME GREETING & TRUST HEADER                            */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <div className="mb-8 p-5 sm:p-7 rounded-3xl bg-gradient-to-r from-[#12131b] via-[#181924] to-[#12131b] border border-[#272838] shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="relative z-10 space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a880]/15 text-[#c5a880] text-xs font-bold uppercase tracking-wider border border-[#c5a880]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct UAE Luxury Imports</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-wide">
            THE HOUSE OF AURA
          </h2>
          <p className="text-sm font-serif italic text-[#c5a880]">
            Beauty, Care & Arabian Luxury
          </p>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed pt-1">
            Curated salon hair essentials and authentic Emirati fragrances, brought to you directly from Dubai. Pure ingredients, zero compromise.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-3 shrink-0">
          <a
            href="https://wa.me/923179738321?text=Assalam%20o%20Alaikum!%20I%20want%20to%20inquire%20about%20The%20House%20of%20Aura%20products."
            target="_blank"
            rel="noreferrer"
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 text-white font-bold text-xs shadow-lg flex items-center gap-2 transition-all hover:scale-[1.02]"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>WhatsApp Us (0317-9738321)</span>
          </a>
          <div className="hidden sm:flex items-center gap-2 px-4 py-3 rounded-xl bg-[#0d0e14]/90 border border-[#2c2d3c] text-xs text-zinc-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
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
          className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'apple'
              ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
              : 'border-[#262734] bg-[#12131b] text-zinc-400'
          }`}
        >
          <span>🍏</span>
          <span>Apple 500ml</span>
        </button>

        <button
          onClick={() => setActiveTab('cosmo')}
          className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'cosmo'
              ? 'border-amber-500 bg-amber-500/20 text-amber-300'
              : 'border-[#262734] bg-[#12131b] text-zinc-400'
          }`}
        >
          <span>🧴</span>
          <span>Cosmo 480ml</span>
        </button>

        <button
          onClick={() => setActiveTab('bakhoor')}
          className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'bakhoor'
              ? 'border-[#c5a880] bg-[#c5a880]/20 text-[#c5a880]'
              : 'border-[#262734] bg-[#12131b] text-zinc-400'
          }`}
        >
          <span>🪵</span>
          <span>Bakhoor 8-Set</span>
        </button>

        <button
          onClick={() => setActiveTab('dexe')}
          className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'dexe'
              ? 'border-teal-500 bg-teal-500/20 text-teal-300'
              : 'border-[#262734] bg-[#12131b] text-zinc-400'
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
        <div className="lg:col-span-8 bg-[#111219]/90 border border-[#272836] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          {/* Ambient Lighting Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a880]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

          <AnimatePresence mode="wait">
            {/* 🍏 PRODUCT 1: APPLE AMMONIA-FREE HAIR CREAM 500ml */}
            {activeTab === 'apple' && (
              <motion.div
                key="apple-stage"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
              >
                {/* Visual Box */}
                <div className="md:col-span-6 space-y-4">
                  <div className="relative rounded-2xl overflow-hidden aspect-square bg-[#161722] border border-[#2e3042] shadow-xl group">
                    <img
                      src={
                        appleView === 'front'
                          ? '/images/studio_variants/studio_apple_pouch_500ml_front.jpg'
                          : '/images/studio_variants/studio_apple_pouch_500ml_back.jpg'
                      }
                      alt="Apple Ammonia-Free Hair Cream 500ml"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-500/40 text-[11px] font-bold text-emerald-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>96h Long Lasting Shine</span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 bg-[#13141d]/90 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-[#343648] flex items-center justify-between">
                      <span className="text-xs font-bold text-white">500ml + 500ml Jumbo Kit</span>
                      <span className="text-[11px] font-bold text-emerald-400">Clear Water Formula</span>
                    </div>
                  </div>

                  {/* Pouch Front / Back Switcher */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setAppleView('front')}
                      className={`flex-1 py-2 px-3 rounded-lg border text-xs font-bold transition-all ${
                        appleView === 'front'
                          ? 'border-[#c5a880] bg-[#c5a880]/20 text-white'
                          : 'border-[#262734] bg-[#14151e] text-zinc-400 hover:text-white'
                      }`}
                    >
                      Pouch Front View
                    </button>
                    <button
                      onClick={() => setAppleView('back')}
                      className={`flex-1 py-2 px-3 rounded-lg border text-xs font-bold transition-all ${
                        appleView === 'back'
                          ? 'border-[#c5a880] bg-[#c5a880]/20 text-white'
                          : 'border-[#262734] bg-[#14151e] text-zinc-400 hover:text-white'
                      }`}
                    >
                      Back View & Instructions
                    </button>
                  </div>
                </div>

                {/* Details & Action Box */}
                <div className="md:col-span-6 space-y-5">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[11px] font-bold uppercase border border-emerald-500/30 mb-2">
                      <Sparkles className="w-3 h-3" />
                      <span>Dubai Salon Grade</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                      Apple Ammonia-Free Black Hair Cream
                    </h3>
                    <p className="text-xs text-[#c5a880] mt-1 font-medium">
                      500ml + 500ml Jumbo Value Pack • Zero Towel & Scalp Stains
                    </p>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Pure herbal formulation from Dubai. 100% grey hair coverage with zero scalp irritation, infused with fresh green apple extracts for lasting gloss and fragrance.
                  </p>

                  {/* Shade Selection */}
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-2">
                      Select Hair Shade:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['1.0 Natural Black', '3.0 Dark Brown', '4.3 Chocolate'].map((s) => (
                        <button
                          key={s}
                          onClick={() => setAppleShade(s)}
                          className={`p-2 rounded-lg border text-xs font-bold transition-all text-center ${
                            appleShade === s
                              ? 'border-[#c5a880] bg-[#c5a880]/20 text-white'
                              : 'border-[#262734] bg-[#14151e] text-zinc-400 hover:text-white'
                          }`}
                        >
                          {s.split(' ')[0]} <span className="font-normal block text-[10px] text-zinc-400">{s.split(' ').slice(1).join(' ')}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Deal Selector */}
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-2">
                      Choose Deal Pack:
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        onClick={() => setAppleDeal('single')}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          appleDeal === 'single'
                            ? 'border-[#c5a880] bg-[#c5a880]/15 ring-1 ring-[#c5a880]'
                            : 'border-[#262734] bg-[#14151e]'
                        }`}
                      >
                        <div className="text-[11px] text-zinc-400">Single Jumbo Pack</div>
                        <div className="text-base font-bold text-white">{formatPKR(2499)}</div>
                      </button>

                      <button
                        onClick={() => setAppleDeal('duo')}
                        className={`p-3 rounded-xl border text-left transition-all relative ${
                          appleDeal === 'duo'
                            ? 'border-emerald-500 bg-emerald-500/15 ring-1 ring-emerald-500'
                            : 'border-[#262734] bg-[#14151e]'
                        }`}
                      >
                        <span className="absolute -top-2 right-2 px-1.5 py-0.5 rounded bg-emerald-500 text-black text-[9px] font-black uppercase">
                          Save Rs. 500
                        </span>
                        <div className="text-[11px] text-emerald-400">Pack of 2 Deal</div>
                        <div className="text-base font-bold text-white">{formatPKR(4499)}</div>
                      </button>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                    <button
                      onClick={() =>
                        handleWhatsAppCheckout(
                          'Apple Ammonia-Free Hair Cream (500ml+500ml)',
                          `${appleDeal === 'single' ? 'Single Pack' : 'Pack of 2 Duo'} [Shade: ${appleShade}]`,
                          appleDeal === 'single' ? 2499 : 4499
                        )
                      }
                      className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 fill-white" />
                      <span>Order on WhatsApp (COD)</span>
                    </button>
                    <button
                      onClick={() => {
                        addToCart(appleProduct, appleProduct.varieties[0], appleDeal === 'single' ? 1 : 2);
                        showToast('success', 'Added to Bag!', `${appleProduct.name}`);
                      }}
                      className="py-3 px-4 rounded-xl bg-[#c5a880] hover:bg-[#d6ba94] text-[#0c0d12] font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 🧴 PRODUCT 2: COSMO KERATIN SHAMPOO 480ml */}
            {activeTab === 'cosmo' && (
              <motion.div
                key="cosmo-stage"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
              >
                <div className="md:col-span-6 space-y-4">
                  <div className="relative rounded-2xl overflow-hidden aspect-square bg-[#161722] border border-[#2e3042] shadow-xl group">
                    <img
                      src="/images/studio_variants/studio_cosmo_480ml_single.jpg"
                      alt="COSMO Keratin Shampoo 480ml"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-rose-600/90 backdrop-blur-md px-3 py-1 rounded-full border border-rose-400/40 text-[11px] font-bold text-white">
                      FLAT 59% OFF
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 bg-[#13141d]/90 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-[#343648] flex items-center justify-between">
                      <span className="text-xs font-bold text-white">480ml Salon Bottle</span>
                      <span className="text-[11px] font-bold text-amber-400">Sulfate & Paraben Free</span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-6 space-y-5">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 text-[11px] font-bold uppercase border border-amber-500/30 mb-2">
                      <Award className="w-3 h-3" />
                      <span>Azaadi Sale 59% OFF</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                      COSMO Hair Naturals Keratin Shampoo
                    </h3>
                    <p className="text-xs text-[#c5a880] mt-1 font-medium">
                      480ml Salon Dispenser Bottle • Hydrolyzed Keratin Protein & Biotin
                    </p>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Imported directly from UAE. Formulated to repair damaged hair cuticles, stop excessive fall, and eliminate frizz with natural biotin therapy.
                  </p>

                  {/* Deals */}
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-2">
                      Choose Pack Option:
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        onClick={() => setCosmoDeal('single')}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          cosmoDeal === 'single'
                            ? 'border-[#c5a880] bg-[#c5a880]/15 ring-1 ring-[#c5a880]'
                            : 'border-[#262734] bg-[#14151e]'
                        }`}
                      >
                        <div className="text-[11px] text-zinc-400">Single 480ml Bottle</div>
                        <div className="text-base font-bold text-white">{formatPKR(1970)}</div>
                        <div className="text-[10px] text-zinc-500 line-through">Rs. 4,800</div>
                      </button>

                      <button
                        onClick={() => setCosmoDeal('duo')}
                        className={`p-3 rounded-xl border text-left transition-all relative ${
                          cosmoDeal === 'duo'
                            ? 'border-amber-500 bg-amber-500/15 ring-1 ring-amber-500'
                            : 'border-[#262734] bg-[#14151e]'
                        }`}
                      >
                        <span className="absolute -top-2 right-2 px-1.5 py-0.5 rounded bg-amber-500 text-black text-[9px] font-black uppercase">
                          Mega Deal
                        </span>
                        <div className="text-[11px] text-amber-400">Pack of 2 Bottles</div>
                        <div className="text-base font-bold text-white">{formatPKR(3000)}</div>
                        <div className="text-[10px] text-amber-300">Rs. 1,500 / bottle</div>
                      </button>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                    <button
                      onClick={() =>
                        handleWhatsAppCheckout(
                          'COSMO Keratin Shampoo (480ml)',
                          cosmoDeal === 'single' ? 'Single 480ml Bottle' : 'Pack of 2 Duo Deal (960ml)',
                          cosmoDeal === 'single' ? 1970 : 3000
                        )
                      }
                      className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 fill-white" />
                      <span>Order on WhatsApp (COD)</span>
                    </button>
                    <button
                      onClick={() => {
                        addToCart(cosmoProduct, cosmoProduct.varieties[0], cosmoDeal === 'single' ? 1 : 2);
                        showToast('success', 'Added to Bag!', `${cosmoProduct.name}`);
                      }}
                      className="py-3 px-4 rounded-xl bg-[#c5a880] hover:bg-[#d6ba94] text-[#0c0d12] font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
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
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
              >
                <div className="md:col-span-6 space-y-4">
                  <div className="relative rounded-2xl overflow-hidden aspect-square bg-[#161722] border border-[#2e3042] shadow-xl group">
                    <img
                      src={
                        bakhoorDeal === 'set8'
                          ? '/images/studio_variants/studio_bakhoor_8set_complete_vault.jpg'
                          : currentBakhoorScent.image
                      }
                      alt={bakhoorDeal === 'set8' ? 'Bakhoor Complete 8 Set' : currentBakhoorScent.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#c5a880]/40 text-[11px] font-bold text-[#c5a880] flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5" />
                      <span>{bakhoorDeal === 'set8' ? 'Complete 8-Piece Set' : currentBakhoorScent.shortName}</span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 bg-[#13141d]/90 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-[#343648] flex items-center justify-between">
                      <span className="text-xs font-bold text-white">48+ Hours Lingering Aroma</span>
                      <span className="text-[11px] font-bold text-[#c5a880]">Taif Rose & Amber</span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-6 space-y-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#c5a880]/15 text-[#c5a880] text-[11px] font-bold uppercase border border-[#c5a880]/30 mb-2">
                      <Sparkles className="w-3 h-3" />
                      <span>The Art of Scent • Dubai</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                      Bakhoor Hamidi (8 Arabian Fragrances)
                    </h3>
                    <p className="text-xs text-[#c5a880] mt-1 font-medium">
                      Aged Cambodian Agarwood Infused in Royal Attars & Ambergris
                    </p>
                  </div>

                  {/* Scent Selector */}
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-2">
                      Select Arabian Scent ({currentBakhoorScent.shortName}):
                    </label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {BAKHOOR_SCENTS.map((s) => {
                        const isSelected = selectedScentId === s.id && bakhoorDeal !== 'set8';
                        return (
                          <button
                            key={s.id}
                            onClick={() => {
                              setSelectedScentId(s.id);
                              if (bakhoorDeal === 'set8') setBakhoorDeal('single');
                            }}
                            className={`py-1.5 px-2 rounded-lg border text-center text-[10px] font-bold transition-all truncate cursor-pointer ${
                              isSelected
                                ? 'border-[#c5a880] bg-[#c5a880]/25 text-white shadow'
                                : 'border-[#262734] bg-[#14151e] text-zinc-400 hover:text-white'
                            }`}
                          >
                            {s.shortName}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Pricing Matrix Deals */}
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-2">
                      Select Package / Bundle:
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      <button
                        onClick={() => setBakhoorDeal('single')}
                        className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                          bakhoorDeal === 'single'
                            ? 'border-[#c5a880] bg-[#c5a880]/15 ring-1 ring-[#c5a880]'
                            : 'border-[#262734] bg-[#14151e]'
                        }`}
                      >
                        <div className="text-[9px] text-zinc-400">Single Jar</div>
                        <div className="text-xs font-bold text-white">{formatPKR(1999)}</div>
                      </button>

                      <button
                        onClick={() => setBakhoorDeal('duo')}
                        className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                          bakhoorDeal === 'duo'
                            ? 'border-[#c5a880] bg-[#c5a880]/15 ring-1 ring-[#c5a880]'
                            : 'border-[#262734] bg-[#14151e]'
                        }`}
                      >
                        <div className="text-[9px] text-[#c5a880]">Pack of 2</div>
                        <div className="text-xs font-bold text-white">{formatPKR(3500)}</div>
                      </button>

                      <button
                        onClick={() => setBakhoorDeal('trio')}
                        className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                          bakhoorDeal === 'trio'
                            ? 'border-emerald-500 bg-emerald-500/15 ring-1 ring-emerald-500'
                            : 'border-[#262734] bg-[#14151e]'
                        }`}
                      >
                        <div className="text-[9px] text-emerald-400">Pack of 3</div>
                        <div className="text-xs font-bold text-white">{formatPKR(4300)}</div>
                      </button>

                      <button
                        onClick={() => setBakhoorDeal('set8')}
                        className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                          bakhoorDeal === 'set8'
                            ? 'border-amber-500 bg-amber-500/20 ring-1 ring-amber-500'
                            : 'border-[#262734] bg-[#14151e]'
                        }`}
                      >
                        <div className="text-[9px] text-amber-400 font-bold">8-Set Vault</div>
                        <div className="text-xs font-bold text-white">{formatPKR(8000)}</div>
                      </button>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                    <button
                      onClick={() => {
                        let dealName = `Single Jar (${currentBakhoorScent.name})`;
                        let price = 1999;
                        if (bakhoorDeal === 'duo') {
                          dealName = `Pack of 2 Duo [${currentBakhoorScent.shortName}]`;
                          price = 3500;
                        } else if (bakhoorDeal === 'trio') {
                          dealName = `Pack of 3 Trio [${currentBakhoorScent.shortName}]`;
                          price = 4300;
                        } else if (bakhoorDeal === 'set8') {
                          dealName = 'Complete 8-Piece Luxury Set with Mabkhara';
                          price = 8000;
                        }
                        handleWhatsAppCheckout('Bakhoor Hamidi (Arabian Scent)', dealName, price);
                      }}
                      className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 fill-white" />
                      <span>Order on WhatsApp (COD)</span>
                    </button>
                    <button
                      onClick={() => {
                        const qty = bakhoorDeal === 'single' ? 1 : bakhoorDeal === 'duo' ? 2 : bakhoorDeal === 'trio' ? 3 : 8;
                        addToCart(bakhoorProduct, bakhoorProduct.varieties[0], qty);
                        showToast('success', 'Added to Bag!', `${bakhoorProduct.name}`);
                      }}
                      className="py-3 px-4 rounded-xl bg-[#c5a880] hover:bg-[#d6ba94] text-[#0c0d12] font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 🌿 PRODUCT 4: DEXE BLACK HAIR SHAMPOO 400ml */}
            {activeTab === 'dexe' && (
              <motion.div
                key="dexe-stage"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
              >
                <div className="md:col-span-6 space-y-4">
                  <div className="relative rounded-2xl overflow-hidden aspect-square bg-[#161722] border border-[#2e3042] shadow-xl group">
                    <img
                      src="/images/dexe_black_hair_shampoo.jpg"
                      alt="Dexe Black Hair Color Shampoo 400ml"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-teal-500/40 text-[11px] font-bold text-teal-300 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" />
                      <span>5-Minute Express Coverage</span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 bg-[#13141d]/90 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-[#343648] flex items-center justify-between">
                      <span className="text-xs font-bold text-white">400ml Salon Pump Bottle</span>
                      <span className="text-[11px] font-bold text-teal-400">100% Ammonia-Free</span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-6 space-y-5">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/15 text-teal-400 text-[11px] font-bold uppercase border border-teal-500/30 mb-2">
                      <Sparkles className="w-3 h-3" />
                      <span>Instant Fast Dye • 5 Minutes</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                      Dexe Black Hair Color Shampoo (400ml)
                    </h3>
                    <p className="text-xs text-[#c5a880] mt-1 font-medium">
                      400ml Jumbo Salon Dispenser • Herbal Ginseng & Argan Formula
                    </p>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed">
                    World-renowned herbal hair darkening shampoo. Infused with Chinese ginseng, black sesame, and argan oil to nourish scalp while restoring rich natural black in just 5 minutes with zero skin stains.
                  </p>

                  {/* Shade Selection */}
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-2">
                      Select Hair Shade:
                    </label>
                    <div className="p-2.5 rounded-lg border border-[#c5a880] bg-[#c5a880]/20 text-white text-xs font-bold flex items-center justify-between">
                      <span>1.0 Natural Black</span>
                      <span className="text-[11px] text-[#c5a880] font-normal">Rich Salon Black • 100% Coverage</span>
                    </div>
                  </div>

                  {/* Deal Selector */}
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-2">
                      Choose Deal Pack:
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        onClick={() => setDexeDeal('single')}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          dexeDeal === 'single'
                            ? 'border-[#c5a880] bg-[#c5a880]/15 ring-1 ring-[#c5a880]'
                            : 'border-[#262734] bg-[#14151e]'
                        }`}
                      >
                        <div className="text-[11px] text-zinc-400">Single 400ml Bottle</div>
                        <div className="text-base font-bold text-white">{formatPKR(1850)}</div>
                        <div className="text-[10px] text-zinc-500 line-through">Rs. 3,200</div>
                      </button>

                      <button
                        onClick={() => setDexeDeal('duo')}
                        className={`p-3 rounded-xl border text-left transition-all relative cursor-pointer ${
                          dexeDeal === 'duo'
                            ? 'border-teal-500 bg-teal-500/15 ring-1 ring-teal-500'
                            : 'border-[#262734] bg-[#14151e]'
                        }`}
                      >
                        <span className="absolute -top-2 right-2 px-1.5 py-0.5 rounded bg-teal-500 text-black text-[9px] font-black uppercase">
                          Save Rs. 500
                        </span>
                        <div className="text-[11px] text-teal-400">Pack of 2 Deal</div>
                        <div className="text-base font-bold text-white">{formatPKR(3200)}</div>
                        <div className="text-[10px] text-teal-300">Rs. 1,600 / bottle</div>
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
                          dexeDeal === 'single' ? 1850 : 3200
                        )
                      }
                      className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 fill-white" />
                      <span>Order on WhatsApp (COD)</span>
                    </button>
                    <button
                      onClick={() => {
                        addToCart(dexeProduct, dexeProduct.varieties[0], dexeDeal === 'single' ? 1 : 2);
                        showToast('success', 'Added to Bag!', `${dexeProduct.name}`);
                      }}
                      className="py-3 px-4 rounded-xl bg-[#c5a880] hover:bg-[#d6ba94] text-[#0c0d12] font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
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
        <div className="lg:col-span-4 space-y-4">
          <div className="px-2">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#c5a880]">
              Dubai Flagship Collection
            </h4>
            <p className="text-[11px] text-zinc-400 mt-0.5">
              Click any product below to view details & place order:
            </p>
          </div>

          {/* 🍏 Product 1 Card */}
          <button
            onClick={() => setActiveTab('apple')}
            className={`w-full p-4 rounded-2xl border text-left transition-all relative flex items-center gap-4 group cursor-pointer ${
              activeTab === 'apple'
                ? 'border-emerald-500 bg-[#161724] ring-1 ring-emerald-500 shadow-xl'
                : 'border-[#242533] bg-[#101118] hover:border-zinc-500'
            }`}
          >
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-black/50 border border-white/10 shrink-0">
              <img
                src="/images/studio_variants/studio_apple_pouch_500ml_front.jpg"
                alt="Apple Hair Cream"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 uppercase">
                <Sparkles className="w-2.5 h-2.5" />
                <span>96h Shine Formula</span>
              </div>
              <div className="text-sm font-bold text-white truncate mt-0.5">Apple Hair Cream</div>
              <div className="text-xs text-zinc-400 truncate">500ml+500ml Jumbo Kit</div>
              <div className="text-xs font-bold text-emerald-400 mt-1">{formatPKR(2499)}</div>
            </div>
            <ChevronRight className={`w-4 h-4 transition-transform ${activeTab === 'apple' ? 'text-emerald-400 translate-x-1' : 'text-zinc-600'}`} />
          </button>

          {/* 🧴 Product 2 Card */}
          <button
            onClick={() => setActiveTab('cosmo')}
            className={`w-full p-4 rounded-2xl border text-left transition-all relative flex items-center gap-4 group cursor-pointer ${
              activeTab === 'cosmo'
                ? 'border-amber-500 bg-[#161724] ring-1 ring-amber-500 shadow-xl'
                : 'border-[#242533] bg-[#101118] hover:border-zinc-500'
            }`}
          >
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-black/50 border border-white/10 shrink-0">
              <img
                src="/images/studio_variants/studio_cosmo_480ml_single.jpg"
                alt="Cosmo Keratin Shampoo"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 text-[10px] font-bold text-rose-400 uppercase">
                <span>Flat 59% OFF</span>
              </div>
              <div className="text-sm font-bold text-white truncate mt-0.5">COSMO Keratin Shampoo</div>
              <div className="text-xs text-zinc-400 truncate">480ml Salon Dispenser</div>
              <div className="text-xs font-bold text-amber-400 mt-1">{formatPKR(1970)}</div>
            </div>
            <ChevronRight className={`w-4 h-4 transition-transform ${activeTab === 'cosmo' ? 'text-amber-400 translate-x-1' : 'text-zinc-600'}`} />
          </button>

          {/* 🪵 Product 3 Card */}
          <button
            onClick={() => setActiveTab('bakhoor')}
            className={`w-full p-4 rounded-2xl border text-left transition-all relative flex items-center gap-4 group cursor-pointer ${
              activeTab === 'bakhoor'
                ? 'border-[#c5a880] bg-[#161724] ring-1 ring-[#c5a880] shadow-xl'
                : 'border-[#242533] bg-[#101118] hover:border-zinc-500'
            }`}
          >
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-black/50 border border-white/10 shrink-0">
              <img
                src="/images/studio_variants/bakhoor_black_oud.jpg"
                alt="Bakhoor Hamidi"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 text-[10px] font-bold text-[#c5a880] uppercase">
                <span>8 Royal Scent Jars</span>
              </div>
              <div className="text-sm font-bold text-white truncate mt-0.5">Bakhoor Hamidi</div>
              <div className="text-xs text-zinc-400 truncate">48h Lingering Fragrance</div>
              <div className="text-xs font-bold text-[#c5a880] mt-1">From {formatPKR(1999)}</div>
            </div>
            <ChevronRight className={`w-4 h-4 transition-transform ${activeTab === 'bakhoor' ? 'text-[#c5a880] translate-x-1' : 'text-zinc-600'}`} />
          </button>

          {/* 🌿 Product 4 Card: Dexe */}
          <button
            onClick={() => setActiveTab('dexe')}
            className={`w-full p-4 rounded-2xl border text-left transition-all relative flex items-center gap-4 group cursor-pointer ${
              activeTab === 'dexe'
                ? 'border-teal-500 bg-[#161724] ring-1 ring-teal-500 shadow-xl'
                : 'border-[#242533] bg-[#101118] hover:border-zinc-500'
            }`}
          >
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-black/50 border border-white/10 shrink-0">
              <img
                src="/images/dexe_black_hair_shampoo.jpg"
                alt="Dexe Black Hair Shampoo"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 text-[10px] font-bold text-teal-400 uppercase">
                <span>5-Min Quick Dye</span>
              </div>
              <div className="text-sm font-bold text-white truncate mt-0.5">Dexe Black Hair Shampoo</div>
              <div className="text-xs text-zinc-400 truncate">400ml Salon Pump Dispenser</div>
              <div className="text-xs font-bold text-teal-400 mt-1">{formatPKR(1850)}</div>
            </div>
            <ChevronRight className={`w-4 h-4 transition-transform ${activeTab === 'dexe' ? 'text-teal-400 translate-x-1' : 'text-zinc-600'}`} />
          </button>

          {/* Trust Guarantee Box */}
          <div className="p-4 rounded-2xl bg-[#0e0f14] border border-[#20212d] space-y-2.5">
            <div className="flex items-center gap-2 text-xs text-zinc-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Open Parcel Verification on Delivery</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-300">
              <Truck className="w-4 h-4 text-[#c5a880] shrink-0" />
              <span>Express Delivery across Pakistan</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-300">
              <Check className="w-4 h-4 text-amber-400 shrink-0" />
              <span>100% Genuine UAE Imported Stock</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
