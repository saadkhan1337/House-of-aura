import React, { useState } from 'react';
import { ShoppingBag, Heart, Star, Eye, ShieldCheck, Check } from 'lucide-react';
import { Product, ProductVariety } from '../types';
import { formatPKR } from '../utils/security';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, variety: ProductVariety, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: boolean;
  onQuickView: (product: Product) => void;
  isWholesaleMode: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
  onQuickView,
  isWholesaleMode
}) => {
  const defaultVariety: ProductVariety = product.varieties?.[0] || {
    id: 'default',
    name: 'Standard',
    type: 'shade',
    inStock: true,
    stockQty: 10
  };

  const [selectedVarietyId, setSelectedVarietyId] = useState<string>(
    defaultVariety.id
  );

  const safeVarieties = Array.isArray(product.varieties) && product.varieties.length > 0
    ? product.varieties
    : [defaultVariety];

  const selectedVariety =
    safeVarieties.find((v) => v.id === selectedVarietyId) ||
    defaultVariety;

  const effectivePrice = isWholesaleMode && product.pricing?.wholesalePrice
    ? product.pricing.wholesalePrice
    : product.pricing?.retailPrice || 0;

  return (
    <div
      id={`product-card-${product.id}`}
      className="bg-[#111111] border border-[#262626] hover:border-[#D4AF37]/80 rounded-sm flex flex-col justify-between overflow-hidden group transition-all duration-300 shadow-md hover:shadow-2xl hover:shadow-[#D4AF37]/5"
    >
      {/* Top Image Box */}
      <div className="relative h-56 bg-gradient-to-b from-[#1a1a1a] to-[#121212] flex items-center justify-center p-4 border-b border-[#222]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
        />

        {/* Tags */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1 max-w-[80%]">
          {(product.tags || []).slice(0, 2).map((t, idx) => (
            <span
              key={idx}
              className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-sm ${
                t === 'Bestseller'
                  ? 'bg-[#D4AF37] text-black'
                  : t === 'Dubai Import'
                  ? 'bg-[#222] text-white border border-[#444]'
                  : 'bg-red-950 text-red-300 border border-red-800/50'
              }`}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Action icons */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onToggleWishlist(product)}
            className={`p-2 rounded-full backdrop-blur-md transition-all ${
              isInWishlist
                ? 'bg-red-500 text-white'
                : 'bg-black/60 text-[#a1a1aa] hover:text-white hover:bg-black'
            }`}
            title={isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart className={`w-3.5 h-3.5 ${isInWishlist ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={() => onQuickView(product)}
            className="p-2 rounded-full bg-black/60 backdrop-blur-md text-[#a1a1aa] hover:text-white hover:bg-black transition-all"
            title="Quick View"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Authentic Dubai Tag Bottom */}
        <div className="absolute bottom-2 right-2 text-[9px] text-[#a1a1aa] bg-black/70 px-1.5 py-0.5 rounded border border-[#333] flex items-center gap-1">
          <ShieldCheck className="w-2.5 h-2.5 text-[#D4AF37]" /> Dubai UAE
        </div>
      </div>

      {/* Info & Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px] mb-1.5">
            <span className="text-[#a1a1aa] uppercase font-semibold tracking-wider text-[10px]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-[#D4AF37]">
              <Star className="w-3 h-3 fill-current" />
              <span className="font-bold text-xs text-white">{product.rating}</span>
              <span className="text-[#71717a] text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          <h3 className="font-serif text-base font-bold text-white group-hover:text-[#D4AF37] transition-colors leading-snug line-clamp-1">
            {product.name}
          </h3>
          <p className="text-[11px] text-[#a1a1aa] line-clamp-2 mt-1 leading-relaxed">
            {product.subtitle}
          </p>

          {/* Variety chips preview */}
          {safeVarieties.length > 1 && (
            <div className="mt-3">
              <div className="text-[10px] text-[#a1a1aa] uppercase tracking-wider mb-1 font-semibold flex items-center justify-between">
                <span>{(selectedVariety?.type || 'shade').toUpperCase()}: {(selectedVariety?.name || '').split('(')[0]}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {safeVarieties.slice(0, 4).map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVarietyId(v.id)}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] border transition-all ${
                      v.id === selectedVarietyId
                        ? 'border-[#D4AF37] bg-[#241c0b] text-white font-bold'
                        : 'border-[#333] bg-[#171717] text-[#a1a1aa] hover:border-[#555]'
                    }`}
                  >
                    {v.hexColor && (
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-black/40"
                        style={{ backgroundColor: v.hexColor }}
                      />
                    )}
                    <span className="truncate max-w-[80px]">{(v.name || '').split(' ')[0]}</span>
                    {v.id === selectedVarietyId && <Check className="w-2.5 h-2.5 text-[#D4AF37]" />}
                  </button>
                ))}
                {safeVarieties.length > 4 && (
                  <button
                    onClick={() => onQuickView(product)}
                    className="text-[10px] text-[#D4AF37] hover:underline px-1 py-0.5"
                  >
                    +{safeVarieties.length - 4} more
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Pricing & Add to Cart */}
        <div className="mt-4 pt-3 border-t border-[#222]">
          <div className="flex items-baseline justify-between mb-2.5">
            <div>
              <span className="text-lg font-bold text-white tracking-tight">
                {formatPKR(effectivePrice)}
              </span>
              {product.pricing?.originalPrice && !isWholesaleMode && (
                <span className="text-[10px] text-[#71717a] line-through ml-1.5">
                  {formatPKR(product.pricing.originalPrice)}
                </span>
              )}
            </div>
            {isWholesaleMode ? (
              <span className="text-[10px] text-amber-300 font-bold bg-amber-950/80 border border-amber-800 px-1.5 py-0.5 rounded">
                Min {product.pricing?.minWholesaleQty || 5} units
              </span>
            ) : (
              <span className="text-[10px] text-emerald-400 font-medium">In Stock</span>
            )}
          </div>

          <button
            onClick={() => onAddToCart(product, selectedVariety, isWholesaleMode ? (product.pricing?.minWholesaleQty || 5) : 1)}
            className="w-full bg-[#1c1c1c] hover:bg-[#D4AF37] text-white hover:text-black font-bold py-2 px-3 text-xs uppercase tracking-wider rounded-sm flex items-center justify-center gap-2 border border-[#333] hover:border-[#D4AF37] transition-all"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{isWholesaleMode ? `ADD MIN PACK (${product.pricing?.minWholesaleQty || 5})` : 'ADD TO BAG'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
