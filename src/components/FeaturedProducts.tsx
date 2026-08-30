import React, { useState } from 'react';
import { Sparkles, ShoppingBag, Heart, Check, Star, ShieldCheck, Flame, ArrowRight, Eye } from 'lucide-react';
import { Product, ProductVariety } from '../types';
import { formatPKR } from '../utils/security';

interface FeaturedProductsProps {
  products: Product[];
  onAddToCart: (product: Product, variety: ProductVariety, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  onQuickView: (product: Product) => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
  onQuickView
}) => {
  // Sort featured by rank (1: Apple Hair Color, 2: Cosmo Shampoo, 3: Bakhoor Hamidi)
  const safeProducts = Array.isArray(products) ? products : [];
  const featured = safeProducts
    .filter((p) => p?.featured)
    .sort((a, b) => (a?.featuredRank || 99) - (b?.featuredRank || 99));

  // Maintain local selected variety state for each featured card
  const [selectedVarieties, setSelectedVarieties] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    featured.forEach((p) => {
      if (Array.isArray(p?.varieties) && p.varieties.length > 0 && p.varieties[0]?.id) {
        initial[p.id] = p.varieties[0].id;
      }
    });
    return initial;
  });

  // Track quantity added state
  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    featured.forEach((p) => {
      init[p.id] = 1;
    });
    return init;
  });

  const handleSelectVariety = (productId: string, varietyId: string) => {
    setSelectedVarieties((prev) => ({ ...prev, [productId]: varietyId }));
  };

  const handleQuantityChange = (productId: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[productId] || 1;
      const next = Math.max(1, Math.min(20, current + delta));
      return { ...prev, [productId]: next };
    });
  };

  return (
    <section id="featured-dubai-selections" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#262626] gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-bold uppercase tracking-[0.25em] mb-1.5">
            <Sparkles className="w-4 h-4" /> Crown Jewels of Dubai Imports
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-wide">
            Signature House Hero Products
          </h2>
          <p className="text-sm text-[#a1a1aa] mt-1.5 max-w-2xl">
            Our 3 most coveted Dubai salon-grade formulations. Verified batch imports, direct cold-storage transit, and guaranteed authenticity.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="bg-[#1c1c1c] text-[#D4AF37] px-3 py-1.5 rounded text-xs font-bold border border-[#333] flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" /> 100% Sealed Dubai Imports
          </span>
          <span className="bg-[#1c1c1c] text-red-400 px-3 py-1.5 rounded text-xs font-bold border border-[#333] flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5" /> High Demand Stock
          </span>
        </div>
      </div>

      {/* 3 Featured Products Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {featured.map((product) => {
          const defaultVariety: ProductVariety = product.varieties?.[0] || {
            id: 'default',
            name: 'Standard',
            type: 'shade',
            inStock: true,
            stockQty: 10
          };
          const safeVarieties = Array.isArray(product.varieties) && product.varieties.length > 0
            ? product.varieties
            : [defaultVariety];

          const selectedVarId = selectedVarieties[product.id] || safeVarieties[0]?.id;
          const currentVariety = safeVarieties.find((v) => v.id === selectedVarId) || safeVarieties[0] || defaultVariety;
          const qty = quantities[product.id] || 1;
          const isWishlisted = isInWishlist(product.id);

          // Calculate effective price based on quantity (bundle pricing if qty >= 2)
          const isBundleApplicable = qty >= 2 && product.pricing?.bundleDiscountPrice;
          const unitPrice = isBundleApplicable ? product.pricing.bundleDiscountPrice! : product.pricing?.retailPrice || 0;
          const totalPrice = unitPrice * qty;

          return (
            <div
              key={product.id}
              id={`featured-card-${product.id}`}
              className="bg-[#111111] border border-[#2a2a2a] hover:border-[#D4AF37] rounded-sm flex flex-col transition-all duration-300 shadow-xl group overflow-hidden"
            >
              {/* Product Visual Container */}
              <div className="relative h-64 sm:h-72 bg-gradient-to-b from-[#1c1c1c] to-[#121212] overflow-hidden flex items-center justify-center p-6 border-b border-[#262626]">
                <img
                  src={currentVariety.image || product.image}
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  <span className="bg-[#D4AF37] text-black font-black text-[10px] px-2.5 py-0.5 rounded-sm uppercase tracking-wider shadow-md">
                    #{product.featuredRank || 1} {product.tags?.[0] || 'Bestseller'}
                  </span>
                  <span className="bg-black/80 backdrop-blur-sm text-white border border-[#333] text-[9px] font-semibold px-2 py-0.5 rounded-sm uppercase">
                    {(product.origin || 'Dubai').split(',')[0]}
                  </span>
                </div>

                {/* Quick Action Buttons on Image */}
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                  <button
                    onClick={() => onToggleWishlist(product)}
                    className={`p-2 rounded-full backdrop-blur-md transition-all ${
                      isWishlisted
                        ? 'bg-red-500 text-white'
                        : 'bg-black/60 text-[#a1a1aa] hover:text-white hover:bg-black'
                    }`}
                    title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={() => onQuickView(product)}
                    className="p-2 rounded-full bg-black/60 backdrop-blur-md text-[#a1a1aa] hover:text-white hover:bg-black transition-all"
                    title="Quick Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* In stock live pill */}
                <div className="absolute bottom-3 left-3 bg-emerald-950/80 border border-emerald-700/50 text-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  {currentVariety.stockQty || 10} in Dubai Stock
                </div>
              </div>

              {/* Product Info & Variety Selector Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Rating & Category */}
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-[#a1a1aa] font-medium tracking-wide uppercase text-[10px]">
                      {product.category}
                    </span>
                    <div className="flex items-center gap-1 text-[#D4AF37]">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="font-bold text-white text-xs">{product.rating}</span>
                      <span className="text-[#71717a] text-[11px]">({product.reviewCount})</span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors leading-snug line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#a1a1aa] mt-1 line-clamp-2 leading-relaxed">
                    {product.subtitle}
                  </p>

                  {/* Interactive Variety / Shade / Flavor Picker */}
                  <div className="mt-4 pt-3 border-t border-[#222]">
                    <div className="flex items-center justify-between text-[11px] mb-2 font-semibold">
                      <span className="text-[#d4d4d8] uppercase tracking-wider">
                        Select {(currentVariety.type || 'shade').toUpperCase()}:
                      </span>
                      <span className="text-[#D4AF37] font-medium truncate max-w-[140px]">
                        {currentVariety.name}
                      </span>
                    </div>

                    {/* Variety Chips */}
                    <div className="flex flex-wrap gap-2">
                      {safeVarieties.map((v) => {
                        const isSelected = v.id === selectedVarId;
                        return (
                          <button
                            key={v.id}
                            onClick={() => handleSelectVariety(product.id, v.id)}
                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-xs transition-all border ${
                              isSelected
                                ? 'border-[#D4AF37] bg-[#221c0e] text-white font-bold'
                                : 'border-[#333] bg-[#171717] text-[#a1a1aa] hover:border-[#555] hover:text-white'
                            }`}
                          >
                            {v.hexColor && (
                              <span
                                className="w-3 h-3 rounded-full border border-black/40 shadow-inner flex-shrink-0"
                                style={{ backgroundColor: v.hexColor }}
                              />
                            )}
                            <span className="truncate max-w-[120px] text-[11px]">{v.name}</span>
                            {isSelected && <Check className="w-3 h-3 text-[#D4AF37]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* USP Bullet Highlights */}
                  <div className="mt-3.5 space-y-1 text-[11px] text-[#a1a1aa]">
                    {(product.usp || []).slice(0, 2).map((uspItem, idx) => (
                      <div key={idx} className="flex items-start gap-1.5">
                        <span className="text-[#D4AF37] font-bold">✓</span>
                        <span className="line-clamp-1">{uspItem}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing & Add to Bag Footer */}
                <div className="mt-5 pt-3 border-t border-[#222]">
                  {/* Price Row */}
                  <div className="flex items-baseline justify-between mb-3">
                    <div>
                      <div className="text-xl font-bold text-white tracking-tight">
                        {formatPKR(unitPrice)}
                        {qty > 1 && (
                          <span className="text-xs font-normal text-[#a1a1aa] ml-1.5">
                            each (Total: {formatPKR(totalPrice)})
                          </span>
                        )}
                      </div>
                      {product.pricing.originalPrice && (
                        <div className="text-[11px] text-[#71717a] line-through">
                          Regular: {formatPKR(product.pricing.originalPrice)}
                        </div>
                      )}
                    </div>

                    {isBundleApplicable && (
                      <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                        Bundle Deal
                      </span>
                    )}
                  </div>

                  {/* Quantity & CTA Buttons */}
                  <div className="flex items-center gap-2">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-[#333] bg-[#171717] rounded-sm text-xs">
                      <button
                        onClick={() => handleQuantityChange(product.id, -1)}
                        className="px-2.5 py-1.5 text-[#a1a1aa] hover:text-white hover:bg-[#222] font-bold transition-colors"
                      >
                        -
                      </button>
                      <span className="px-2 font-bold text-white text-xs min-w-[20px] text-center">
                        {qty}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(product.id, 1)}
                        className="px-2.5 py-1.5 text-[#a1a1aa] hover:text-white hover:bg-[#222] font-bold transition-colors"
                      >
                        +
                      </button>
                    </div>

                    {/* Add to Cart CTA */}
                    <button
                      id={`add-cart-btn-${product.id}`}
                      onClick={() => onAddToCart(product, currentVariety, qty)}
                      className="flex-1 bg-[#D4AF37] hover:bg-[#e0bc46] text-black font-bold py-2 px-3 text-xs uppercase tracking-wider rounded-sm flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>ADD TO BAG</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
