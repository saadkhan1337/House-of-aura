import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, ShieldCheck, Check, Truck, Info, Sparkles, Building2 } from 'lucide-react';
import { Product, ProductVariety } from '../types';
import { formatPKR } from '../utils/security';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, variety: ProductVariety, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: boolean;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isInWishlist
}) => {
  if (!product) return null;

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
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'howToUse' | 'ingredients' | 'wholesale'>('overview');
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const safeVarieties = Array.isArray(product.varieties) && product.varieties.length > 0
    ? product.varieties
    : [defaultVariety];

  const selectedVariety =
    safeVarieties.find((v) => v.id === selectedVarietyId) ||
    defaultVariety;

  const allImages = [product.image, ...(product.galleryImages || [])];
  const isBundle = quantity >= 2 && product.pricing?.bundleDiscountPrice;
  const currentUnitPrice = isBundle
    ? product.pricing.bundleDiscountPrice!
    : product.pricing?.retailPrice || 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div
        id="quick-view-modal-container"
        className="relative w-full max-w-4xl bg-[#121212] border-2 border-[#D4AF37] rounded-lg shadow-2xl text-white overflow-hidden my-6"
      >
        {/* Close Button */}
        <button
          id="close-quickview-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#1e1e1e] hover:bg-[#333] text-gray-400 hover:text-white transition-colors border border-[#333]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Gallery Column */}
          <div className="p-6 bg-[#0c0c0c] border-b md:border-b-0 md:border-r border-[#262626] flex flex-col justify-between">
            <div>
              {/* Main Image Display */}
              <div className="relative h-72 sm:h-80 bg-gradient-to-b from-[#181818] to-[#0f0f0f] rounded-lg overflow-hidden flex items-center justify-center p-4 border border-[#262626]">
                <img
                  src={allImages[activeImageIndex] || product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />

                <div className="absolute top-3 left-3 bg-[#D4AF37] text-black font-black text-[10px] px-2.5 py-0.5 rounded uppercase tracking-wider">
                  {product.tags[0] || 'Dubai Import'}
                </div>

                <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm border border-[#333] text-[10px] text-emerald-400 font-bold px-2.5 py-1 rounded flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Verified Sealed Batch: {product.origin}
                </div>
              </div>

              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-14 h-14 rounded border overflow-hidden flex-shrink-0 transition-all ${
                        activeImageIndex === idx
                          ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/30'
                          : 'border-[#333] opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Micro Delivery Trust */}
            <div className="mt-6 pt-4 border-t border-[#222] grid grid-cols-2 gap-2 text-[11px] text-[#a1a1aa]">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#D4AF37]" />
                <span>2-3 Days Nationwide Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>Open Parcel on Request</span>
              </div>
            </div>
          </div>

          {/* Right: Info & Controls Column */}
          <div className="p-6 flex flex-col justify-between">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-[#a1a1aa] uppercase font-bold tracking-widest text-[10px]">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-[#D4AF37]">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-bold text-white text-xs">{product.rating}</span>
                  <span className="text-[#71717a] text-[11px]">({product.reviewCount} customer reviews)</span>
                </div>
              </div>

              <h2 className="font-serif text-2xl font-bold text-white leading-tight">
                {product.name}
              </h2>
              <p className="text-xs text-[#a1a1aa] mt-1">
                {product.subtitle}
              </p>

              {/* Price Banner */}
              <div className="my-4 p-3 bg-[#181818] border border-[#282828] rounded-sm flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-[#D4AF37] tracking-tight">
                    {formatPKR(currentUnitPrice)}
                  </div>
                  {product.pricing.originalPrice && (
                    <div className="text-xs text-[#71717a] line-through">
                      Regular Price: {formatPKR(product.pricing.originalPrice)}
                    </div>
                  )}
                </div>

                {product.pricing.bundleDiscountPrice && (
                  <div className="text-right">
                    <span className="text-[10px] text-amber-300 font-bold bg-amber-950/80 border border-amber-800 px-2 py-0.5 rounded uppercase block mb-0.5">
                      Buy 2+ for {formatPKR(product.pricing.bundleDiscountPrice)}/each
                    </span>
                    <span className="text-[10px] text-[#a1a1aa]">Automatic volume discount</span>
                  </div>
                )}
              </div>

              {/* Varieties Selection */}
              <div className="mb-4">
                <div className="text-xs text-[#d4d4d8] font-bold uppercase tracking-wider mb-2 flex justify-between">
                  <span>Choose {selectedVariety?.type.toUpperCase()}:</span>
                  <span className="text-[#D4AF37] font-semibold">{selectedVariety?.name}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {safeVarieties.map((v) => {
                    const isSel = v.id === selectedVarietyId;
                    return (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVarietyId(v.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs transition-all border ${
                          isSel
                            ? 'border-[#D4AF37] bg-[#29200c] text-white font-bold'
                            : 'border-[#333] bg-[#1a1a1a] text-[#a1a1aa] hover:border-[#555]'
                        }`}
                      >
                        {v.hexColor && (
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black"
                            style={{ backgroundColor: v.hexColor }}
                          />
                        )}
                        <span>{v.name}</span>
                        {isSel && <Check className="w-3 h-3 text-[#D4AF37]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Detail Tabs */}
              <div className="mt-4 border-t border-[#262626] pt-3">
                <div className="flex border-b border-[#262626] text-xs gap-4 mb-3">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`pb-1.5 font-bold uppercase tracking-wider transition-colors ${
                      activeTab === 'overview'
                        ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]'
                        : 'text-[#71717a] hover:text-white'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('howToUse')}
                    className={`pb-1.5 font-bold uppercase tracking-wider transition-colors ${
                      activeTab === 'howToUse'
                        ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]'
                        : 'text-[#71717a] hover:text-white'
                    }`}
                  >
                    Usage Guide
                  </button>
                  <button
                    onClick={() => setActiveTab('ingredients')}
                    className={`pb-1.5 font-bold uppercase tracking-wider transition-colors ${
                      activeTab === 'ingredients'
                        ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]'
                        : 'text-[#71717a] hover:text-white'
                    }`}
                  >
                    Ingredients
                  </button>
                  <button
                    onClick={() => setActiveTab('wholesale')}
                    className={`pb-1.5 font-bold uppercase tracking-wider transition-colors ${
                      activeTab === 'wholesale'
                        ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]'
                        : 'text-[#71717a] hover:text-white'
                    }`}
                  >
                    Salon Bulk
                  </button>
                </div>

                <div className="text-xs text-[#a1a1aa] leading-relaxed max-h-28 overflow-y-auto pr-1">
                  {activeTab === 'overview' && (
                    <div>
                      <p className="mb-2">{product.description}</p>
                      <div className="space-y-1">
                        {product.usp.map((u, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-white">
                            <span className="text-[#D4AF37]">✦</span>
                            <span>{u}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'howToUse' && (
                    <div>
                      <p className="font-semibold text-white mb-1">Dubai Salon Application Protocol:</p>
                      <p>{product.howToUse}</p>
                    </div>
                  )}

                  {activeTab === 'ingredients' && (
                    <div>
                      <p className="font-semibold text-white mb-1">Certified Active Formulation:</p>
                      <p className="font-mono text-[11px] text-[#888]">{product.ingredients}</p>
                    </div>
                  )}

                  {activeTab === 'wholesale' && (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between bg-[#191919] p-2 rounded border border-[#2a2a2a]">
                        <span className="text-white font-medium">Salon Wholesale Rate:</span>
                        <span className="text-emerald-400 font-bold">
                          {product.pricing.wholesalePrice ? formatPKR(product.pricing.wholesalePrice) : 'Contact Sales'}
                        </span>
                      </div>
                      <p className="text-[11px]">
                        Minimum Wholesale Quantity: <strong className="text-white">{product.pricing.minWholesaleQty} units</strong>. For salon bulk orders, switch to Wholesale Mode in the catalog or order via WhatsApp.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Actions Row */}
            <div className="mt-6 pt-4 border-t border-[#262626] flex items-center gap-3">
              {/* Quantity */}
              <div className="flex items-center border border-[#333] bg-[#1a1a1a] rounded-sm text-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-[#a1a1aa] hover:text-white font-bold"
                >
                  -
                </button>
                <span className="px-3 font-bold text-white min-w-[24px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-[#a1a1aa] hover:text-white font-bold"
                >
                  +
                </button>
              </div>

              {/* Add to Bag */}
              <button
                id="modal-add-to-bag-btn"
                onClick={() => {
                  onAddToCart(product, selectedVariety, quantity);
                  onClose();
                }}
                className="flex-1 bg-[#D4AF37] hover:bg-[#e5c158] text-black font-bold py-2.5 px-4 text-xs uppercase tracking-wider rounded-sm flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ADD TO BAG ({formatPKR(currentUnitPrice * quantity)})</span>
              </button>

              {/* Wishlist */}
              <button
                onClick={() => onToggleWishlist(product)}
                className={`p-2.5 rounded-sm border transition-all ${
                  isInWishlist
                    ? 'border-red-500 bg-red-500/20 text-red-400'
                    : 'border-[#333] bg-[#1a1a1a] text-[#a1a1aa] hover:text-white'
                }`}
                title="Save to Wishlist"
              >
                <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
