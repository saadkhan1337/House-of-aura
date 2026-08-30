import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductVariety } from '../types';
import { formatPKR } from '../utils/security';
import {
  X,
  Star,
  ShieldCheck,
  ShoppingBag,
  Heart,
  Check,
  Building2,
  Sparkles,
  Truck,
  MessageCircle,
  Award,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ProductModal: React.FC = () => {
  const {
    selectedProductModal,
    setSelectedProductModal,
    addToCart,
    toggleWishlist,
    isWishlisted,
    setWhatsAppModalItem
  } = useStore();

  if (!selectedProductModal) return null;

  const product = selectedProductModal;
  const defaultVariety: ProductVariety = product.varieties?.[0] || {
    id: 'default',
    name: 'Standard',
    type: 'shade',
    inStock: true,
    stockQty: 10
  };
  const [activeImage, setActiveImage] = useState(product.image);
  const [selectedVariety, setSelectedVariety] = useState<ProductVariety>(
    defaultVariety
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'benefits' | 'howToUse' | 'ingredients' | 'wholesale'>('benefits');

  const galleryImages = Array.isArray(product.galleryImages) && product.galleryImages.length > 0
    ? product.galleryImages
    : [product.image];
  const safeVarieties = Array.isArray(product.varieties) && product.varieties.length > 0
    ? product.varieties
    : [defaultVariety];

  const isWholesaleQty = quantity >= (product.pricing?.minWholesaleQty || 5);
  const currentUnitPrice = isWholesaleQty && product.pricing?.wholesalePrice
    ? product.pricing.wholesalePrice
    : quantity >= 2 && product.pricing?.bundleDiscountPrice
    ? product.pricing.bundleDiscountPrice
    : product.pricing?.retailPrice || 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        className="bg-[#14151c] border border-[#2e303f] rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative flex flex-col md:flex-row my-auto"
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProductModal(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 text-zinc-300 hover:text-white border border-zinc-700 transition-colors"
          aria-label="Close product modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Gallery & Origin Seal */}
        <div className="w-full md:w-1/2 p-6 bg-[#0f1015] border-b md:border-b-0 md:border-r border-[#262734] flex flex-col justify-between">
          <div>
            <div className="relative rounded-2xl overflow-hidden aspect-square bg-[#0a0a0f] border border-zinc-800">
              <img
                src={activeImage || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-[#c5a880] text-[#0c0d10] px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
                {product.tags?.[0] || 'Dubai Import'}
              </div>
            </div>

            {/* Thumbnails */}
            {galleryImages.length > 1 && (
              <div className="flex gap-2.5 mt-3 overflow-x-auto pb-1">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-14 h-14 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                      activeImage === img
                        ? 'border-[#c5a880] scale-105'
                        : 'border-zinc-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Authenticity Certificate Box */}
          <div className="mt-6 p-3.5 rounded-xl bg-[#171822] border border-[#2b2c3a] text-xs text-zinc-300 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#c5a880]/20 text-[#c5a880] shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-[#c5a880] font-bold uppercase tracking-wider block">
                Direct UAE Sourcing Guarantee
              </span>
              <p className="text-[11px] text-zinc-400">
                100% Genuine batch import from {product.origin}. Includes authentic barcode and seal.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Product Details & Purchase Actions */}
        <div className="w-full md:w-1/2 p-6 sm:p-7 flex flex-col justify-between">
          <div>
            {/* Header info */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#c5a880] uppercase tracking-wider">
                {product.category}
              </span>
              <div className="flex items-center gap-1.5 text-amber-400 text-xs">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-bold text-white">{product.rating}</span>
                <span className="text-zinc-500">({product.reviewCount} customer reviews)</span>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white leading-tight">
              {product.name}
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              {product.subtitle}
            </p>

            {/* Price section */}
            <div className="mt-4 p-3.5 rounded-xl bg-[#191a24] border border-[#2b2c3b] flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-white">
                    {formatPKR(currentUnitPrice * quantity)}
                  </span>
                  {quantity > 1 && (
                    <span className="text-xs text-zinc-400">
                      ({formatPKR(currentUnitPrice)} each)
                    </span>
                  )}
                  {product.pricing?.originalPrice && (
                    <span className="text-xs text-zinc-500 line-through">
                      {formatPKR((product.pricing?.originalPrice || 0) * quantity)}
                    </span>
                  )}
                </div>
                {isWholesaleQty && (
                  <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1 mt-0.5">
                    <Sparkles className="w-3 h-3" />
                    Salon Wholesale Discount Applied!
                  </span>
                )}
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center border border-[#3e4052] rounded-xl bg-[#111218] overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 text-sm font-bold"
                >
                  -
                </button>
                <span className="px-3 py-1.5 text-sm font-bold text-white min-w-[32px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 text-sm font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Variety Selector */}
            <div className="mt-5">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
                  Select {safeVarieties[0]?.type || 'Option'}:
                </label>
                <span className="text-xs font-semibold text-[#c5a880]">
                  {selectedVariety.name} ({selectedVariety.stockQty || 10} in stock)
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {safeVarieties.map((variety) => {
                  const isSelected = selectedVariety.id === variety.id;
                  return (
                    <button
                      key={variety.id}
                      onClick={() => {
                        setSelectedVariety(variety);
                        if (variety.image) setActiveImage(variety.image);
                      }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#292318] border-[#c5a880] text-amber-100 ring-1 ring-[#c5a880]'
                          : 'bg-[#181922] border-[#2c2e3d] text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      {variety.hexColor && (
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/40"
                          style={{ backgroundColor: variety.hexColor }}
                        />
                      )}
                      <span>{variety.name}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#c5a880]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tabbed Info Section */}
            <div className="mt-5 border-t border-[#262836] pt-4">
              <div className="flex border-b border-zinc-800 text-xs font-semibold gap-4">
                <button
                  onClick={() => setActiveTab('benefits')}
                  className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'benefits'
                      ? 'border-[#c5a880] text-[#c5a880]'
                      : 'border-transparent text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  USPs & Benefits
                </button>
                <button
                  onClick={() => setActiveTab('howToUse')}
                  className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'howToUse'
                      ? 'border-[#c5a880] text-[#c5a880]'
                      : 'border-transparent text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  How to Use
                </button>
                <button
                  onClick={() => setActiveTab('ingredients')}
                  className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'ingredients'
                      ? 'border-[#c5a880] text-[#c5a880]'
                      : 'border-transparent text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Ingredients
                </button>
                <button
                  onClick={() => setActiveTab('wholesale')}
                  className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'wholesale'
                      ? 'border-[#c5a880] text-[#c5a880]'
                      : 'border-transparent text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Wholesale Tiers
                </button>
              </div>

              <div className="py-3 text-xs text-zinc-300 leading-relaxed min-h-[90px]">
                {activeTab === 'benefits' && (
                  <div className="space-y-1.5">
                    {(product.usp || []).map((u, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#c5a880] shrink-0 mt-0.5" />
                        <span>{u}</span>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === 'howToUse' && <p>{product.howToUse}</p>}
                {activeTab === 'ingredients' && <p className="font-mono text-[11px] text-zinc-400">{product.ingredients}</p>}
                {activeTab === 'wholesale' && (
                  <div className="bg-[#0f1015] p-3 rounded-xl border border-zinc-800 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Single Retail Price:</span>
                      <span className="font-bold text-white">{formatPKR(product.pricing?.retailPrice || 0)}</span>
                    </div>
                    {product.pricing?.bundleDiscountPrice && (
                      <div className="flex justify-between text-amber-300">
                        <span>Bundle Price (2+ Units):</span>
                        <span className="font-bold">{formatPKR(product.pricing.bundleDiscountPrice)} / unit</span>
                      </div>
                    )}
                    {product.pricing?.wholesalePrice && (
                      <div className="flex justify-between text-emerald-400 font-semibold">
                        <span>Salon Wholesaler ({product.pricing?.minWholesaleQty || 5}+ Units):</span>
                        <span className="font-bold">{formatPKR(product.pricing.wholesalePrice)} / unit</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-5 pt-4 border-t border-[#262836] flex flex-col sm:flex-row items-center gap-2.5">
            <button
              onClick={() => {
                addToCart(product, selectedVariety, quantity);
                setSelectedProductModal(null);
              }}
              className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-[#c5a880] hover:bg-[#d6ba92] text-[#0c0d10] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg shadow-[#c5a880]/20"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add {quantity} to Shopping Bag • {formatPKR(currentUnitPrice * quantity)}</span>
            </button>

            <button
              onClick={() => {
                setWhatsAppModalItem({ product, variety: selectedVariety });
                setSelectedProductModal(null);
              }}
              className="w-full sm:w-auto py-3 px-4 rounded-xl bg-[#173324] hover:bg-[#204531] border border-emerald-500/40 text-emerald-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Instant WhatsApp Buy</span>
            </button>

            <button
              onClick={() => toggleWishlist(product.id)}
              className={`p-3 rounded-xl border transition-colors ${
                isWishlisted(product.id)
                  ? 'bg-rose-500/20 border-rose-500 text-rose-400'
                  : 'bg-[#171822] border-[#2c2d3a] text-zinc-400 hover:text-white'
              }`}
              title="Save to Wishlist"
              aria-label="Wishlist"
            >
              <Heart className={`w-4 h-4 ${isWishlisted(product.id) ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
