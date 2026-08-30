import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Search,
  ShoppingBag,
  Heart,
  User as UserIcon,
  Sparkles,
  PhoneCall,
  Menu,
  X,
  Building2,
  ChevronDown,
  Percent
} from 'lucide-react';
import { CategoryType } from '../types';
import { CATEGORY_TABS } from '../data/products';
import { formatPKR } from '../utils/security';

export const Navbar: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    cartItemCount,
    cartTotal,
    wishlist,
    user,
    isAuthenticated,
    setIsCartOpen,
    setIsAuthModalOpen,
    setAuthModalTab,
    setIsProfileOpen,
    products,
    setSelectedProductModal
  } = useStore();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchResults = (searchQuery || '').trim()
    ? (products || [])
        .filter(
          (p) =>
            (p?.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            (p?.category || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            (Array.isArray(p?.varieties) &&
              p.varieties.some((v) =>
                (v?.name || '').toLowerCase().includes(searchQuery.toLowerCase())
              ))
        )
        .slice(0, 5)
    : [];

  return (
    <header className="sticky top-0 z-40 bg-[#0d0e12]/95 backdrop-blur-md border-b border-[#23242d] transition-all">
      {/* Luxury Announcement Bar */}
      <div className="bg-gradient-to-r from-[#17140e] via-[#241c10] to-[#17140e] border-b border-[#3d321d]/50 text-[#e6d0a7] py-1.5 px-4 text-xs font-medium tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#c5a880]/20 text-[#c5a880] border border-[#c5a880]/30">
              DUBAI DIRECT
            </span>
            <span className="text-zinc-300 truncate">
              ✨ 100% Genuine UAE Imported Hair Care & Arabian Bakhoor • Free Express Shipping on Orders Rs. 3,500+
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 shrink-0 text-[11px] text-zinc-300">
            <a
              href="https://wa.me/923000000000?text=Hi%20The%20House%20of%20Aura,%20I%20have%20a%20wholesale%20inquiry"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 hover:text-[#c5a880] transition-colors"
            >
              <Building2 className="w-3.5 h-3.5 text-[#c5a880]" />
              <span>Salon Wholesale Inquiries</span>
            </a>
            <span className="text-zinc-600">|</span>
            <div className="flex items-center gap-1 text-[#c5a880]">
              <PhoneCall className="w-3 h-3" />
              <span>WhatsApp: 0300-AURA-VIP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-zinc-300 hover:text-white rounded-lg hover:bg-zinc-800"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Brand Logo */}
          <div
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="cursor-pointer group flex flex-col items-center text-center select-none"
          >
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#c5a880] font-semibold">
                THE HOUSE OF
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-[0.15em] text-white font-serif group-hover:text-[#e4cfb4] transition-colors leading-none my-0.5">
              AURA
            </h1>
            <span className="text-[9px] uppercase tracking-[0.25em] text-zinc-400">
              DUBAI • PARIS • LAHORE
            </span>
          </div>

          {/* Desktop Instant Search Bar */}
          <div
            ref={searchContainerRef}
            className="hidden md:flex flex-1 max-w-md relative mx-4"
          >
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchDropdown(true);
                }}
                onFocus={() => setShowSearchDropdown(true)}
                placeholder="Search Apple Hair Color, Cosmo Shampoo, Bakhoor Hamidi..."
                className="w-full pl-10 pr-9 py-2.5 bg-[#14151b] border border-[#2c2d38] focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880] rounded-full text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 transition-all outline-none"
              />
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Instant Search Results Dropdown */}
            {showSearchDropdown && searchQuery.trim() && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#171821] border border-[#343644] rounded-2xl shadow-2xl overflow-hidden z-50 p-2">
                <div className="text-[11px] font-semibold text-zinc-400 px-3 py-1.5 uppercase tracking-wider flex items-center justify-between border-b border-zinc-800">
                  <span>Matching Catalog Products</span>
                  <span className="text-[#c5a880]">{(searchResults || []).length} Results</span>
                </div>

                {(searchResults || []).length > 0 ? (
                  <div className="divide-y divide-zinc-800/60 max-h-72 overflow-y-auto">
                    {searchResults.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          setSelectedProductModal(item);
                          setShowSearchDropdown(false);
                        }}
                        className="flex items-center gap-3 p-2.5 hover:bg-[#20222e] rounded-xl cursor-pointer transition-colors"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-11 h-11 rounded-lg object-cover bg-zinc-900 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-semibold text-zinc-200 truncate">
                            {item.name}
                          </h4>
                          <p className="text-[11px] text-zinc-400 truncate">
                            {item.subtitle}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs font-bold text-[#c5a880]">
                              {formatPKR(item.pricing?.retailPrice || 0)}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.2 bg-zinc-800 rounded text-zinc-400">
                              {item.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-xs text-zinc-400">
                    No products found matching "{searchQuery}". Try searching for "Hair Color", "Argan", or "Bakhoor".
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Actions (Auth, Wishlist, Bag) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-2 text-zinc-300 hover:text-white rounded-lg hover:bg-zinc-800"
              aria-label="Toggle mobile search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account / Auth Trigger */}
            {isAuthenticated && user ? (
              <button
                onClick={() => setIsProfileOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#171821] hover:bg-[#222430] border border-[#2f313f] text-zinc-200 hover:border-[#c5a880]/60 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-[#c5a880]/20 text-[#c5a880] flex items-center justify-center text-xs font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs font-medium max-w-[90px] truncate hidden sm:inline">
                  {user.name.split(' ')[0]}
                </span>
                {user.accountType === 'wholesale' && (
                  <span className="text-[9px] bg-amber-900/60 text-amber-300 px-1.5 py-0.5 rounded-full border border-amber-500/30">
                    Wholesale
                  </span>
                )}
              </button>
            ) : (
              <button
                onClick={() => {
                  setAuthModalTab('login');
                  setIsAuthModalOpen(true);
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-zinc-200 hover:text-white hover:bg-zinc-800/80 transition-colors"
              >
                <UserIcon className="w-4 h-4 text-[#c5a880]" />
                <span className="hidden sm:inline">Sign In / Register</span>
              </button>
            )}

            {/* Wishlist Trigger */}
            <button
              onClick={() => {
                if (isAuthenticated) {
                  setIsProfileOpen(true);
                } else {
                  setAuthModalTab('login');
                  setIsAuthModalOpen(true);
                }
              }}
              className="relative p-2 text-zinc-300 hover:text-white rounded-xl hover:bg-zinc-800/80 transition-colors"
              title="Saved Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {(wishlist?.length || 0) > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#c5a880] text-[#0c0d10] text-[10px] font-extrabold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#c5a880] to-[#b3956b] hover:from-[#d1b58f] hover:to-[#c2a378] text-[#0d0e12] font-bold text-xs shadow-lg shadow-[#c5a880]/20 transition-transform active:scale-95"
              aria-label="Shopping bag"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-[#0d0e12] text-[#c5a880] text-[10px] font-black rounded-full flex items-center justify-center border border-[#c5a880]/50">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">
                {cartTotal > 0 ? formatPKR(cartTotal) : 'Bag'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search Input Expanded */}
        {isSearchOpen && (
          <div className="mt-3 md:hidden">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, shades, oils..."
                className="w-full pl-10 pr-9 py-2.5 bg-[#14151b] border border-[#2c2d38] rounded-xl text-sm text-zinc-100 placeholder-zinc-500 outline-none"
              />
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Category Filter Tabs Bar */}
        <div className="mt-3.5 pt-2 border-t border-[#1f2029] flex items-center justify-between overflow-x-auto no-scrollbar gap-1 sm:gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {CATEGORY_TABS.map((tab) => {
              const isActive = selectedCategory === tab;
              return (
                <button
                  key={tab}
                  onClick={() => {
                    setSelectedCategory(tab as CategoryType);
                    setSearchQuery('');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#c5a880] text-[#0c0d10] shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-[#191a22]'
                  }`}
                >
                  {tab === 'Salon Wholesale' ? (
                    <span className="flex items-center gap-1">
                      <Building2 className="w-3 h-3" />
                      {tab}
                    </span>
                  ) : (
                    tab
                  )}
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs text-[#c5a880] shrink-0 font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dubai Verified Direct Import</span>
          </div>
        </div>
      </div>
    </header>
  );
};
