import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { BRAND_CONFIG, generateWhatsAppOrderUrl } from '../data/constants';
import { formatPKR } from '../utils/security';
import {
  Sparkles,
  ShoppingBag,
  MessageCircle,
  Check,
  Star,
  Eye,
  Award,
  Flame,
  X,
  Camera
} from 'lucide-react';

export const CleanProductShowcase: React.FC = () => {
  const {
    products,
    addToCart,
    setSelectedProductModal,
    showToast,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery
  } = useStore();

  // Local state for interactive choices
  const [appleShade, setAppleShade] = useState('1.0 Natural Black');
  const [bakhoorScent, setBakhoorScent] = useState('Sheikha');

  // Image view toggle: 'real' (actual warehouse package photo) vs 'studio' (editorial studio render)
  const [imageViewMode, setImageViewMode] = useState<'real' | 'studio'>('real');

  const appleProduct = products.find((p) => p.id === 'hoa-apple-hair-color') || products[0];
  const cosmoProduct = products.find((p) => p.id === 'hoa-cosmo-shampoo') || products[1];
  const bakhoorProduct = products.find((p) => p.id === 'hoa-bakhoor-hamidi') || products[2];
  const fragranceProduct = products.find((p) => p.id === 'hoa-hamidi-fragrance') || products[3] || products[0];

  const handleAddToCart = (product: any, optionName: string) => {
    const variety =
      product.varieties?.find((v: any) => v.name.includes(optionName)) ||
      product.varieties?.[0];
    addToCart(product, variety, 1);
    showToast(
      'success',
      'Added to Shopping Bag',
      `${product.name.split('(')[0].trim()} is ready in your bag.`
    );
  };

  const getDiscountPercent = (retail: number, original?: number) => {
    if (!original || original <= retail) return null;
    return Math.round(((original - retail) / original) * 100);
  };

  // Determine visibility based on selected category & search
  const isMatch = (product: any, catTags: string[]) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = (product?.name || '').toLowerCase().includes(q);
      const matchSub = (product?.subtitle || '').toLowerCase().includes(q);
      const matchDesc = (product?.description || '').toLowerCase().includes(q);
      if (!matchName && !matchSub && !matchDesc) return false;
    }
    if (selectedCategory === 'All' || selectedCategory === 'Salon Wholesale') return true;
    return catTags.includes(selectedCategory);
  };

  const showApple = isMatch(appleProduct, ['Hair Care']);
  const showCosmo = isMatch(cosmoProduct, ['Hair Care']);
  const showBakhoor = isMatch(bakhoorProduct, ['Arabian Bakhoor', 'Fragrances']);
  const showFragrance = isMatch(fragranceProduct, ['Fragrances']);

  const visibleCount = [showApple, showCosmo, showBakhoor, showFragrance].filter(Boolean).length;

  return (
    <section id="products-section" className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a880]/15 border border-[#c5a880]/30 text-[#c5a880] text-xs font-semibold tracking-widest uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Dubai Imports</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
          Signature Essentials
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 mt-2.5 font-light leading-relaxed">
          Authentic Dubai formulations. Salon-grade efficacy, pure ingredients, and royal Arabian fragrances delivered straight to your doorstep.
        </p>

        {/* Real Packaging vs Studio View Toggle */}
        <div className="mt-5 inline-flex items-center p-1 rounded-xl bg-[#161720] border border-[#2b2c3a]">
          <button
            type="button"
            onClick={() => setImageViewMode('real')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              imageViewMode === 'real'
                ? 'bg-[#c5a880] text-[#0d0e12] shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Real Packaging Photos</span>
          </button>
          <button
            type="button"
            onClick={() => setImageViewMode('studio')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              imageViewMode === 'studio'
                ? 'bg-[#c5a880] text-[#0d0e12] shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Studio Presentation</span>
          </button>
        </div>

        {/* Filter State Banner if Category or Search is active */}
        {(selectedCategory !== 'All' || searchQuery.trim()) && (
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-800/80 border border-zinc-700 text-xs text-zinc-200">
            <span>
              Showing {visibleCount} product{visibleCount !== 1 ? 's' : ''} for{' '}
              <strong className="text-[#c5a880]">
                {searchQuery.trim() ? `"${searchQuery}"` : selectedCategory}
              </strong>
            </span>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="ml-1 p-0.5 rounded-full bg-zinc-700 hover:bg-zinc-600 text-zinc-300 hover:text-white"
              title="Clear Filter"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-9">
        {/* PRODUCT 1: APPLE HAIR COLOR */}
        {showApple && (
          <div className="rounded-3xl bg-[#13141c] border border-[#262734] hover:border-[#c5a880]/50 transition-all p-5 sm:p-7 flex flex-col justify-between group shadow-xl">
            <div>
              {/* Visual with Badge */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#0c0d12] mb-5 border border-zinc-800">
                <img
                  src={
                    imageViewMode === 'real'
                      ? '/images/apple_hair_color_3d_unified.jpg'
                      : '/images/apple_hair_color.png'
                  }
                  alt="Apple Ammonia-Free Hair Color Jumbo Twin Pack"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/apple_hair_color.png';
                  }}
                />
                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#c5a880]/40 text-[#c5a880] text-xs font-bold flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>👑 Salon #1 Choice</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProductModal(appleProduct)}
                  className="absolute top-3 right-3 p-2 rounded-xl bg-black/60 hover:bg-black text-zinc-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
                  title="Quick View Details"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Title & Specs */}
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs uppercase tracking-wider text-[#c5a880] font-semibold">
                  Professional Hair Color
                </span>
                <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>4.95 (489)</span>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2 leading-tight">
                Apple Italian Ammonia-Free Hair Color
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mb-4 font-light">
                1000ml Jumbo Twin Pack (500ml Color + 500ml Developer). Clear Water Formula guarantees zero stains on scalp or clothes with 100% gray coverage in 15-20 minutes.
              </p>

              {/* Key Bullets */}
              <ul className="space-y-1.5 mb-5 text-xs text-zinc-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% Ammonia-Free &amp; PPD Safe (Zero scalp burn)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Clear Water Type: Zero stains on skin or garments</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>96 Hours lasting diamond shine &amp; fresh scent</span>
                </li>
              </ul>

              {/* Shade Selector */}
              <div className="mb-5 p-3 rounded-xl bg-[#0c0d12] border border-zinc-800">
                <span className="text-[11px] uppercase tracking-wider text-zinc-400 block mb-2 font-semibold">
                  Select Your Shade:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAppleShade('1.0 Natural Black')}
                    className={`py-2 px-3 rounded-lg border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      appleShade === '1.0 Natural Black'
                        ? 'border-[#c5a880] bg-[#c5a880]/20 text-white shadow-sm'
                        : 'border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full bg-black border border-zinc-600 inline-block shrink-0" />
                    <span>1.0 Dark Black</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAppleShade('3.0 Dark Velvet Brown')}
                    className={`py-2 px-3 rounded-lg border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      appleShade === '3.0 Dark Velvet Brown'
                        ? 'border-[#c5a880] bg-[#c5a880]/20 text-white shadow-sm'
                        : 'border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full bg-[#3d2415] border border-amber-800 inline-block shrink-0" />
                    <span>3.0 Dark Brown</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Pricing & Actions */}
            <div className="pt-4 border-t border-zinc-800/80">
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-white">
                    {formatPKR(appleProduct.pricing.retailPrice)}
                  </span>
                  {appleProduct.pricing.originalPrice && (
                    <span className="text-xs text-zinc-500 line-through ml-2">
                      {formatPKR(appleProduct.pricing.originalPrice)}
                    </span>
                  )}
                </div>
                {getDiscountPercent(appleProduct.pricing.retailPrice, appleProduct.pricing.originalPrice) && (
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Save {getDiscountPercent(appleProduct.pricing.retailPrice, appleProduct.pricing.originalPrice)}%
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <a
                  href={generateWhatsAppOrderUrl(
                    appleProduct.name,
                    `Shade: ${appleShade}`,
                    appleProduct.pricing.retailPrice
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 transition-all cursor-pointer hover:scale-[1.02]"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                  <span>Order on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => handleAddToCart(appleProduct, appleShade)}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#20222e] hover:bg-[#2c2f3f] border border-[#3b3d52] text-zinc-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#c5a880]" />
                  <span>Add to Bag</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PRODUCT 2: COSMO KERATIN SHAMPOO */}
        {showCosmo && (
          <div className="rounded-3xl bg-[#13141c] border border-[#262734] hover:border-[#c5a880]/50 transition-all p-5 sm:p-7 flex flex-col justify-between group shadow-xl">
            <div>
              {/* Visual with Badge */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#0c0d12] mb-5 border border-zinc-800">
                <img
                  src={
                    imageViewMode === 'real'
                      ? '/images/cosmo_keratin_shampoo_3d_unified.jpg'
                      : '/images/cosmo_shampoo.png'
                  }
                  alt="Cosmo Keratin & Argan Anti-Hair Fall Shampoo 1000ml"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/cosmo_shampoo.png';
                  }}
                />
                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>⚡ 59% Azaadi Offer</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProductModal(cosmoProduct)}
                  className="absolute top-3 right-3 p-2 rounded-xl bg-black/60 hover:bg-black text-zinc-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
                  title="Quick View Details"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Title & Specs */}
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs uppercase tracking-wider text-[#c5a880] font-semibold">
                  Intensive Hair Care
                </span>
                <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>4.88 (374)</span>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2 leading-tight">
                Cosmo Keratin &amp; Argan Shampoo
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mb-4 font-light">
                1000ml Jumbo Salon Pump Bottle. Enriched with hydrolyzed keratin protein and pure Moroccan argan oil to stop severe hair fall and rebuild damaged cuticles.
              </p>

              {/* Key Bullets */}
              <ul className="space-y-1.5 mb-5 text-xs text-zinc-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% Sulfate &amp; Paraben Free Clean Formula</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Stops severe hair fall and breakage in 3 washes</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Safe for keratin, rebonded and colored hair</span>
                </li>
              </ul>

              {/* Size Spec Box */}
              <div className="mb-5 p-3 rounded-xl bg-[#0c0d12] border border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-zinc-400 block font-semibold">
                    Standard Size
                  </span>
                  <span className="text-xs font-bold text-white">1000ml Salon Pump Bottle</span>
                </div>
                <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                  In Stock UAE
                </span>
              </div>
            </div>

            {/* Pricing & Actions */}
            <div className="pt-4 border-t border-zinc-800/80">
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-white">
                    {formatPKR(cosmoProduct.pricing.retailPrice)}
                  </span>
                  {cosmoProduct.pricing.originalPrice && (
                    <span className="text-xs text-zinc-500 line-through ml-2">
                      {formatPKR(cosmoProduct.pricing.originalPrice)}
                    </span>
                  )}
                </div>
                {getDiscountPercent(cosmoProduct.pricing.retailPrice, cosmoProduct.pricing.originalPrice) && (
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Flat {getDiscountPercent(cosmoProduct.pricing.retailPrice, cosmoProduct.pricing.originalPrice)}% OFF
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <a
                  href={generateWhatsAppOrderUrl(
                    cosmoProduct.name,
                    '1000ml Salon Pump Bottle',
                    cosmoProduct.pricing.retailPrice
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 transition-all cursor-pointer hover:scale-[1.02]"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                  <span>Order on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => handleAddToCart(cosmoProduct, '1000ml')}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#20222e] hover:bg-[#2c2f3f] border border-[#3b3d52] text-zinc-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#c5a880]" />
                  <span>Add to Bag</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PRODUCT 3: HAMIDI ROYAL BAKHOOR */}
        {showBakhoor && (
          <div className="rounded-3xl bg-[#13141c] border border-[#262734] hover:border-[#c5a880]/50 transition-all p-5 sm:p-7 flex flex-col justify-between group shadow-xl">
            <div>
              {/* Visual with Badge */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#0c0d12] mb-5 border border-zinc-800">
                <img
                  src={
                    imageViewMode === 'real'
                      ? '/images/bakhoor_hamidi_3d_unified.jpg'
                      : '/images/hamidi_bakhoor.png'
                  }
                  alt="Hamidi Royal Arabian Bakhoor Airtight Jar"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/hamidi_bakhoor.png';
                  }}
                />
                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-purple-500/40 text-purple-300 text-xs font-bold flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-purple-400" />
                  <span>✨ 48-Hour Sillage</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProductModal(bakhoorProduct)}
                  className="absolute top-3 right-3 p-2 rounded-xl bg-black/60 hover:bg-black text-zinc-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
                  title="Quick View Details"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Title & Specs */}
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs uppercase tracking-wider text-[#c5a880] font-semibold">
                  Royal Incense
                </span>
                <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>4.97 (520)</span>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2 leading-tight">
                Hamidi Royal Arabian Bakhoor
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mb-4 font-light">
                Handcrafted Cambodian Agarwood chips soaked in rare floral attars, pure ambergris, and Taif rose. Airtight luxury crystal glass jar with golden seal.
              </p>

              {/* Key Bullets */}
              <ul className="space-y-1.5 mb-5 text-xs text-zinc-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Real Cambodian Agarwood infused with pure oudh</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>48+ Hours lingering throw in rooms, fabrics &amp; majlis</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Compatible with charcoal and electric burners</span>
                </li>
              </ul>

              {/* Scent Selector */}
              <div className="mb-5 p-3 rounded-xl bg-[#0c0d12] border border-zinc-800">
                <span className="text-[11px] uppercase tracking-wider text-zinc-400 block mb-2 font-semibold">
                  Choose Arabian Scent Profile:
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { name: 'Black Oud', tag: 'Smokey' },
                    { name: 'Sheikha', tag: 'Floral Amber' },
                    { name: 'Oud Sharqia', tag: 'Warm Spicy' }
                  ].map((scent) => (
                    <button
                      key={scent.name}
                      type="button"
                      onClick={() => setBakhoorScent(scent.name)}
                      className={`py-2 px-2 rounded-lg border text-center transition-all cursor-pointer ${
                        bakhoorScent === scent.name
                          ? 'border-[#c5a880] bg-[#c5a880]/20 text-white'
                          : 'border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      <span className="text-xs font-bold block">{scent.name}</span>
                      <span className="text-[10px] text-[#c5a880] block font-light">
                        {scent.tag}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Pricing & Actions */}
            <div className="pt-4 border-t border-zinc-800/80">
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-white">
                    {formatPKR(bakhoorProduct.pricing.retailPrice)}
                  </span>
                  {bakhoorProduct.pricing.originalPrice && (
                    <span className="text-xs text-zinc-500 line-through ml-2">
                      {formatPKR(bakhoorProduct.pricing.originalPrice)}
                    </span>
                  )}
                </div>
                {getDiscountPercent(bakhoorProduct.pricing.retailPrice, bakhoorProduct.pricing.originalPrice) && (
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Save {getDiscountPercent(bakhoorProduct.pricing.retailPrice, bakhoorProduct.pricing.originalPrice)}%
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <a
                  href={generateWhatsAppOrderUrl(
                    bakhoorProduct.name,
                    `Scent: ${bakhoorScent}`,
                    bakhoorProduct.pricing.retailPrice
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 transition-all cursor-pointer hover:scale-[1.02]"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                  <span>Order on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => handleAddToCart(bakhoorProduct, bakhoorScent)}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#20222e] hover:bg-[#2c2f3f] border border-[#3b3d52] text-zinc-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#c5a880]" />
                  <span>Add to Bag</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PRODUCT 4: HAMIDI LUXURY FRAGRANCE */}
        {showFragrance && (
          <div className="rounded-3xl bg-[#13141c] border border-[#262734] hover:border-[#c5a880]/50 transition-all p-5 sm:p-7 flex flex-col justify-between group shadow-xl">
            <div>
              {/* Visual with Badge */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#0c0d12] mb-5 border border-zinc-800">
                <img
                  src="/images/hamidi_fragrance.png"
                  alt="Hamidi Arabian Luxury Fragrance Royal Attar"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-sky-500/40 text-sky-300 text-xs font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                  <span>🇦🇪 Authentic Dubai Import</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProductModal(fragranceProduct)}
                  className="absolute top-3 right-3 p-2 rounded-xl bg-black/60 hover:bg-black text-zinc-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
                  title="Quick View Details"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Title & Specs */}
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs uppercase tracking-wider text-[#c5a880] font-semibold">
                  Haute Perfumery
                </span>
                <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>4.96 (312)</span>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2 leading-tight">
                Hamidi Arabian Luxury Fragrance
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mb-4 font-light">
                100ml Eau de Parfum spray in a faceted crystal flacon with golden crown cap. Master-crafted in Dubai with rare floral attars, saffron, and white oudh.
              </p>

              {/* Key Bullets */}
              <ul className="space-y-1.5 mb-5 text-xs text-zinc-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Opening with Taif Rose &amp; warm spices, drying into White Oudh</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>24-Hour long projection that commands royalty</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Heavy crystal flacon with luxury gift packaging</span>
                </li>
              </ul>

              {/* Scent Profile Info Box */}
              <div className="mb-5 p-3 rounded-xl bg-[#0c0d12] border border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-zinc-400 block font-semibold">
                    Volume &amp; Concentration
                  </span>
                  <span className="text-xs font-bold text-white">100ml Eau de Parfum (EDP)</span>
                </div>
                <span className="text-xs text-[#c5a880] font-semibold bg-[#c5a880]/10 px-2.5 py-1 rounded-md border border-[#c5a880]/20">
                  100% Genuine Dubai
                </span>
              </div>
            </div>

            {/* Pricing & Actions */}
            <div className="pt-4 border-t border-zinc-800/80">
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-white">
                    {formatPKR(fragranceProduct.pricing.retailPrice)}
                  </span>
                  {fragranceProduct.pricing.originalPrice && (
                    <span className="text-xs text-zinc-500 line-through ml-2">
                      {formatPKR(fragranceProduct.pricing.originalPrice)}
                    </span>
                  )}
                </div>
                {getDiscountPercent(fragranceProduct.pricing.retailPrice, fragranceProduct.pricing.originalPrice) && (
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Save {getDiscountPercent(fragranceProduct.pricing.retailPrice, fragranceProduct.pricing.originalPrice)}%
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <a
                  href={generateWhatsAppOrderUrl(
                    fragranceProduct.name,
                    '100ml Crystal Flacon',
                    fragranceProduct.pricing.retailPrice
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 transition-all cursor-pointer hover:scale-[1.02]"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                  <span>Order on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => handleAddToCart(fragranceProduct, '100ml')}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#20222e] hover:bg-[#2c2f3f] border border-[#3b3d52] text-zinc-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#c5a880]" />
                  <span>Add to Bag</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {visibleCount === 0 && (
        <div className="text-center py-12">
          <p className="text-zinc-400 text-sm">No products found matching your search.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="mt-3 px-4 py-2 bg-[#c5a880] text-[#0c0d10] font-bold text-xs rounded-xl cursor-pointer"
          >
            Show All Products
          </button>
        </div>
      )}
    </section>
  );
};
