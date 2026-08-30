import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  Home,
  Grid,
  ShoppingBag,
  User,
  MessageCircle,
  Sparkles
} from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const {
    cartItemCount,
    setIsCartOpen,
    setIsProfileOpen,
    setIsAuthModalOpen,
    isAuthenticated,
    setSelectedCategory
  } = useStore();

  const handleHomeClick = () => {
    setSelectedCategory('All');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShopClick = () => {
    const el = document.getElementById('shop-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
      setIsProfileOpen(true);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0e0f15]/95 backdrop-blur-lg border-t border-[#232431] px-2 py-2">
      <div className="grid grid-cols-5 items-center justify-around text-center">
        {/* Home */}
        <button
          onClick={handleHomeClick}
          className="flex flex-col items-center justify-center p-1 text-zinc-400 hover:text-[#c5a880] transition-colors"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-1">Home</span>
        </button>

        {/* Shop / Categories */}
        <button
          onClick={handleShopClick}
          className="flex flex-col items-center justify-center p-1 text-zinc-400 hover:text-[#c5a880] transition-colors"
        >
          <Grid className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-1">Catalog</span>
        </button>

        {/* Cart Bag */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center p-1 text-zinc-300 hover:text-[#c5a880] transition-colors relative"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-[#c5a880] text-[#0c0d10] text-[9px] font-black rounded-full flex items-center justify-center shadow">
                {cartItemCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold mt-1">Bag</span>
        </button>

        {/* Profile */}
        <button
          onClick={handleProfileClick}
          className="flex flex-col items-center justify-center p-1 text-zinc-400 hover:text-[#c5a880] transition-colors"
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-1">
            {isAuthenticated ? 'Profile' : 'Account'}
          </span>
        </button>

        {/* WhatsApp VIP */}
        <a
          href="https://wa.me/923000000000?text=Hi%20The%20House%20of%20Aura,%20I%20need%20assistance%20with%20an%20order."
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center justify-center p-1 text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-1">WhatsApp</span>
        </a>
      </div>
    </div>
  );
};
