import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, ProductVariety } from '../types';
import { formatPKR } from '../utils/security';
import {
  Sparkles,
  ShoppingBag,
  Heart,
  Eye,
  Check,
  Star,
  ShieldCheck,
  Zap,
  MessageCircle,
  TrendingUp,
  Tag
} from 'lucide-react';
import { motion } from 'motion/react';

export const FeaturedShowcase: React.FC = () => {
  const {
    products,
    addToCart,
    toggleWishlist,
    isWishlisted,
    setSelectedProductModal,
    setWhatsAppModalItem
  } = useStore();

  // Get the 3 featured products sorted by featuredRank
  const featuredProducts = products
    .filter((p) => p.featured)
    .sort((a, b) => (a.featuredRank || 99) - (b.featuredRank || 99));

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#242530] gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#c5a880]/15 text-[#c5a880] text-xs font-bold tracking-wider uppercase mb-2 border border-[#c5a880]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dubai Flagship Icons</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-wide">
            The Iconic UAE Collection
          </h2>
          <p className="text-sm text-zinc-400 mt-1 max-w-xl">
            Our most sought-after salon hair solutions and authentic Emirati fragrances, flown directly from Dubai to your doorstep.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-zinc-300">
          <div className="flex -space-x-2">
            <span className="w-7 h-7 rounded-full bg-emerald-900/80 border border-emerald-500/40 flex items-center justify-center text-[10px] text-emerald-300 font-bold">
              ✓
            </span>
            <span className="w-7 h-7 rounded-full bg-amber-900/80 border border-amber-500/40 flex items-center justify-center text-[10px] text-amber-300 font-bold">
              ★
            </span>
          </div>
          <span>Over 1,200+ Verified 5-Star Reviews</span>
        </div>
      </div>

      {/* 3 Prominent Featured Product Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {featuredProducts.map((product) => (
          <FeaturedProductCard
            key={product.id}
            product={product}
            onAddToCart={addToCart}
            onToggleWishlist={toggleWishlist}
            isWishlisted={isWishlisted(product.id)}
            onQuickView={() => setSelectedProductModal(product)}
            onWhatsAppOrder={(variety) =>
              setWhatsAppModalItem({ product, variety })
            }
          />
        ))}
      </div>
    </section>
  );
};

interface FeaturedCardProps {
  product: Product;
  onAddToCart: (p: Product, v: ProductVariety, qty: number) => void;
  onToggleWishlist: (id: string) => void;
  isWishlisted: boolean;
  onQuickView: () => void;
  onWhatsAppOrder: (variety: ProductVariety) => void;
}

const FeaturedProductCard: React.FC<FeaturedCardProps> = ({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onQuickView,
  onWhatsAppOrder
}) => {
  const defaultVariety: ProductVariety = product.varieties?.[0] || {
    id: 'default',
    name: 'Standard',
    type: 'shade',
    inStock: true,
    stockQty: 10
  };
  const [selectedVariety, setSelectedVariety] = useState<ProductVariety>(
    defaultVariety
  );
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const currentVariety = selectedVariety || defaultVariety;
  const safeVarieties = Array.isArray(product.varieties) && product.varieties.length > 0
    ? product.varieties
    : [defaultVariety];

  // Price calculations based on quantity and wholesale tier
  const isBundle = selectedQuantity >= 2 && product.pricing?.bundleDiscountPrice;
  const isWholesale =
    selectedQuantity >= (product.pricing?.minWholesaleQty || 5) &&
    product.pricing?.wholesalePrice;

  const currentUnitPrice = isWholesale
    ? product.pricing?.wholesalePrice || 0
    : isBundle
    ? product.pricing?.bundleDiscountPrice || 0
    : product.pricing?.retailPrice || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-b from-[#16171f] to-[#121319] rounded-2xl border border-[#2c2e3d] hover:border-[#c5a880]/60 transition-all shadow-xl overflow-hidden flex flex-col group relative"
    >
      {/* Top Badges & Wishlist */}
      <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#0d0e13]">
        <img
          src={currentVariety.image || product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121319] via-transparent to-black/30" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10">
          <span className="px-2.5 py-0.5 rounded-full bg-[#c5a880] text-[#0c0d10] text-[10px] font-black tracking-wider uppercase shadow-md">
            {product.tags?.[0] || 'Dubai Import'}
          </span>
          {product.pricing?.originalPrice && (
            <span className="px-2 py-0.5 rounded-full bg-rose-600/90 text-white text-[10px] font-bold shadow-md">
              Save {Math.round((1 - (product.pricing.retailPrice || 0) / product.pricing.originalPrice) * 100)}%
            </span>
          )}
        </div>

        {/* Wishlist & Quick View */}
        <div className="absolute top-3.5 right-3.5 flex items-center gap-2 z-10">
          <button
            onClick={() => onToggleWishlist(product.id)}
            className={`p-2 rounded-full backdrop-blur-md transition-colors ${
              isWishlisted
                ? 'bg-rose-500 text-white'
                : 'bg-black/60 text-white hover:bg-black/80 hover:text-rose-300'
            }`}
            title="Add to Wishlist"
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={onQuickView}
            className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black/80 hover:text-[#c5a880] transition-colors"
            title="Inspect Details"
            aria-label="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Origin / Volume tag */}
        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-[11px] text-zinc-300 bg-[#0d0e13]/80 backdrop-blur-md py-1 px-3 rounded-lg border border-zinc-700/50">
          <span className="truncate">🇦🇪 {product.origin}</span>
          <span className="font-semibold text-[#c5a880] shrink-0">
            {product.volumeOrWeight}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1 text-amber-400 text-xs">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-bold text-zinc-200">{product.rating}</span>
              <span className="text-zinc-500">({product.reviewCount} reviews)</span>
            </div>
            <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {currentVariety.stockQty || 10} In Stock
            </span>
          </div>

          {/* Title & Subtitle */}
          <h3
            onClick={onQuickView}
            className="text-base font-bold text-white hover:text-[#c5a880] transition-colors cursor-pointer line-clamp-2 leading-snug"
          >
            {product.name}
          </h3>
          <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
            {product.subtitle}
          </p>

          {/* Interactive Variety / Shade / Flavor Selector */}
          <div className="mt-4 pt-3.5 border-t border-[#262835]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-zinc-300 uppercase tracking-wider">
                Select {(safeVarieties[0]?.type || 'Option').toUpperCase()}:
              </span>
              <span className="text-xs font-bold text-[#c5a880]">
                {currentVariety.name}
              </span>
            </div>

            {/* Variety Swatches / Pills */}
            <div className="flex flex-wrap gap-2">
              {safeVarieties.map((variety) => {
                const isSelected = currentVariety.id === variety.id;
                return (
                  <button
                    key={variety.id}
                    onClick={() => setSelectedVariety(variety)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#29241b] border-[#c5a880] text-amber-200 ring-1 ring-[#c5a880]/50'
                        : 'bg-[#15161c] border-[#2c2d3a] text-zinc-400 hover:border-zinc-600 hover:text-zinc-200'
                    }`}
                  >
                    {variety.hexColor && (
                      <span
                        className="w-3 h-3 rounded-full border border-black/40 shrink-0"
                        style={{ backgroundColor: variety.hexColor }}
                      />
                    )}
                    <span className="truncate max-w-[120px]">{(variety.name || '').split('(')[0]}</span>
                    {isSelected && <Check className="w-3 h-3 text-[#c5a880] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Key USP bullet */}
          <div className="mt-3 bg-[#0e0f14] p-2.5 rounded-xl border border-zinc-800/80 text-[11px] text-zinc-300">
            <div className="flex items-start gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#c5a880] shrink-0 mt-0.5" />
              <span className="line-clamp-1 font-medium">{product.usp?.[0] || '100% Authentic UAE Import'}</span>
            </div>
          </div>
        </div>

        {/* Pricing & CTA Controls */}
        <div className="mt-5 pt-4 border-t border-[#262835]">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-extrabold text-white">
                  {formatPKR(currentUnitPrice)}
                </span>
                {product.pricing?.originalPrice && (
                  <span className="text-xs text-zinc-500 line-through">
                    {formatPKR(product.pricing.originalPrice)}
                  </span>
                )}
              </div>
              {product.pricing?.wholesalePrice && (
                <span className="text-[10px] text-amber-400 block font-medium">
                  Wholesale: {formatPKR(product.pricing.wholesalePrice)} (Buy {product.pricing.minWholesaleQty || 5}+)
                </span>
              )}
            </div>

            {/* Quantity Stepper */}
            <div className="flex items-center border border-[#353746] rounded-lg bg-[#14151b] overflow-hidden">
              <button
                onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                className="px-2.5 py-1 text-zinc-400 hover:text-white hover:bg-zinc-800 text-xs font-bold"
              >
                -
              </button>
              <span className="px-2 py-1 text-xs font-bold text-white min-w-[24px] text-center">
                {selectedQuantity}
              </span>
              <button
                onClick={() => setSelectedQuantity(selectedQuantity + 1)}
                className="px-2.5 py-1 text-zinc-400 hover:text-white hover:bg-zinc-800 text-xs font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onAddToCart(product, currentVariety, selectedQuantity)}
              className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#c5a880] to-[#b3956b] hover:from-[#d1b58f] hover:to-[#c2a378] text-[#0d0e12] font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-transform active:scale-95 cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Bag</span>
            </button>

            <button
              onClick={() => onWhatsAppOrder(currentVariety)}
              className="py-2.5 px-3 rounded-xl bg-[#1b3d2b] hover:bg-[#235038] border border-emerald-500/40 text-emerald-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              title="Instant WhatsApp Order without checkout forms"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp Buy</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
