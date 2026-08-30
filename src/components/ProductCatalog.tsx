import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, ProductVariety, TagType } from '../types';
import { formatPKR } from '../utils/security';
import {
  ShoppingBag,
  Heart,
  Eye,
  Star,
  Sparkles,
  SlidersHorizontal,
  Building2,
  Check,
  Package,
  Layers
} from 'lucide-react';
import { motion } from 'motion/react';

export const ProductCatalog: React.FC = () => {
  const {
    filteredProducts,
    selectedCategory,
    setSelectedCategory,
    activeTagFilter,
    setActiveTagFilter,
    searchQuery,
    setSearchQuery,
    addToCart,
    toggleWishlist,
    isWishlisted,
    setSelectedProductModal,
    setWhatsAppModalItem
  } = useStore();

  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const tags: (TagType | 'All')[] = [
    'All',
    'Bestseller',
    'Dubai Import',
    'Limited Stock',
    'Salon Exclusive',
    'Trending'
  ];

  // Sorting
  const sortedProducts = [...(filteredProducts || [])].sort((a, b) => {
    if (sortBy === 'price-asc') return (a.pricing?.retailPrice || 0) - (b.pricing?.retailPrice || 0);
    if (sortBy === 'price-desc') return (b.pricing?.retailPrice || 0) - (a.pricing?.retailPrice || 0);
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    return (a.featuredRank || 99) - (b.featuredRank || 99);
  });

  return (
    <section id="shop-catalog" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Catalog Header & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
              {selectedCategory === 'All' ? 'Complete Dubai Catalog' : `${selectedCategory} Collection`}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-[#1e202a] text-[#c5a880] text-xs font-bold border border-[#353847]">
              {sortedProducts.length} Items
            </span>
          </div>
          {searchQuery && (
            <p className="text-xs text-zinc-400 mt-1">
              Showing matching results for <span className="text-[#c5a880] font-semibold">"{searchQuery}"</span>
            </p>
          )}
        </div>

        {/* Sort & Tag Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Tag Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTagFilter(tag)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-all cursor-pointer whitespace-nowrap ${
                  activeTagFilter === tag
                    ? 'bg-[#c5a880]/20 border-[#c5a880] text-[#e6d0a7]'
                    : 'bg-[#15161d] border-[#292a36] text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 bg-[#15161d] border border-[#2a2b38] rounded-xl px-3 py-1.5 text-xs text-zinc-300">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#c5a880]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              aria-label="Sort products by"
              className="bg-transparent text-xs text-zinc-200 outline-none cursor-pointer"
            >
              <option value="featured" className="bg-[#15161d] text-zinc-200">Featured First</option>
              <option value="price-asc" className="bg-[#15161d] text-zinc-200">Price: Low to High</option>
              <option value="price-desc" className="bg-[#15161d] text-zinc-200">Price: High to Low</option>
              <option value="rating" className="bg-[#15161d] text-zinc-200">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {sortedProducts.map((product) => (
            <CatalogProductCard
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
      ) : (
        <div className="text-center py-16 px-4 bg-[#14151b] border border-[#262835] rounded-2xl">
          <Package className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-zinc-200">No items match your filter criteria</h3>
          <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
            Try resetting your search query or choosing another category from the top tabs.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setActiveTagFilter('All');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 bg-[#c5a880] text-[#0c0d10] font-bold text-xs rounded-xl"
          >
            View All Dubai Catalog
          </button>
        </div>
      )}
    </section>
  );
};

interface CatalogProductCardProps {
  product: Product;
  onAddToCart: (p: Product, v: ProductVariety, qty: number) => void;
  onToggleWishlist: (id: string) => void;
  isWishlisted: boolean;
  onQuickView: () => void;
  onWhatsAppOrder: (variety: ProductVariety) => void;
}

const CatalogProductCard: React.FC<CatalogProductCardProps> = ({
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

  const currentVariety = selectedVariety || defaultVariety;

  return (
    <div className="bg-[#15161d] rounded-2xl border border-[#272834] hover:border-[#c5a880]/50 transition-all shadow-lg flex flex-col justify-between overflow-hidden group">
      {/* Top Image Container */}
      <div className="relative h-56 w-full overflow-hidden bg-[#0e0f14]">
        <img
          src={currentVariety.image || product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#15161d] via-transparent to-black/20" />

        {/* Tag & Discount */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-[#c5a880] text-[#0c0d10]">
            {product.tags?.[0] || 'Dubai Import'}
          </span>
          {product.category === 'Salon Wholesale' && (
            <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-purple-900/90 text-purple-200 border border-purple-400/40">
              Salon Wholesale
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => onToggleWishlist(product.id)}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-colors z-10 ${
            isWishlisted
              ? 'bg-rose-500 text-white'
              : 'bg-black/60 text-white hover:bg-black/80 hover:text-rose-300'
          }`}
          title="Add to Wishlist"
          aria-label="Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Overlay Button */}
        <button
          onClick={onQuickView}
          className="absolute inset-x-4 bottom-2.5 py-1.5 bg-[#0f1015]/90 hover:bg-[#0f1015] backdrop-blur-md text-zinc-200 hover:text-white border border-zinc-700/60 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10"
        >
          <Eye className="w-3.5 h-3.5 text-[#c5a880]" />
          <span>Quick Inspect</span>
        </button>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1.5">
            <span className="text-[#c5a880] font-semibold">{product.category}</span>
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-3 h-3 fill-current" />
              <span className="font-bold text-zinc-200">{product.rating}</span>
            </div>
          </div>

          {/* Title */}
          <h3
            onClick={onQuickView}
            className="text-sm font-bold text-white hover:text-[#c5a880] transition-colors cursor-pointer line-clamp-2 leading-snug"
          >
            {product.name}
          </h3>

          {/* Variety chips preview */}
          {(product.varieties?.length || 0) > 1 && (
            <div className="mt-3 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {(product.varieties || []).map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariety(v)}
                  className={`w-4 h-4 rounded-full border transition-transform shrink-0 ${
                    currentVariety.id === v.id
                      ? 'scale-125 ring-2 ring-[#c5a880]'
                      : 'border-zinc-700 hover:scale-110'
                  }`}
                  style={{ backgroundColor: v.hexColor || '#3f3f46' }}
                  title={v.name}
                />
              ))}
              <span className="text-[10px] text-zinc-400 ml-1 truncate">
                {(currentVariety.name || '').split('(')[0]}
              </span>
            </div>
          )}
        </div>

        {/* Pricing & Add to Cart */}
        <div className="mt-4 pt-3 border-t border-[#232431]">
          <div className="flex items-baseline justify-between mb-2.5">
            <div>
              <span className="text-base font-extrabold text-white">
                {formatPKR(product.pricing?.retailPrice || 0)}
              </span>
              {product.pricing?.originalPrice && (
                <span className="text-[11px] text-zinc-500 line-through ml-1.5">
                  {formatPKR(product.pricing.originalPrice)}
                </span>
              )}
            </div>

            {product.pricing?.wholesalePrice && (
              <span className="text-[10px] text-amber-300 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-500/30">
                Bulk: {formatPKR(product.pricing.wholesalePrice)}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => onAddToCart(product, currentVariety, 1)}
              className="py-2 px-2 rounded-xl bg-[#c5a880] hover:bg-[#d6ba92] text-[#0c0d10] font-bold text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-3 h-3" />
              <span>Add to Bag</span>
            </button>

            <button
              onClick={() => onWhatsAppOrder(currentVariety)}
              className="py-2 px-2 rounded-xl bg-[#173022] hover:bg-[#20422f] border border-emerald-500/30 text-emerald-300 font-bold text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer"
            >
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
