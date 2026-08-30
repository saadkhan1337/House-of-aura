import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { SavedAddress, Order } from '../types';
import { formatPKR, sanitizeInput, isValidPhone } from '../utils/security';
import {
  X,
  User,
  Package,
  MapPin,
  Heart,
  LogOut,
  Building2,
  Phone,
  Mail,
  Plus,
  Trash2,
  CheckCircle2,
  Truck,
  ExternalLink,
  Clock,
  FileText,
  ShoppingBag,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ProfileDrawer: React.FC = () => {
  const {
    isProfileOpen,
    setIsProfileOpen,
    user,
    logout,
    orders,
    savedAddresses,
    addSavedAddress,
    deleteSavedAddress,
    setDefaultAddress,
    wishlist,
    products,
    addToCart,
    toggleWishlist,
    setActiveOrderConfirmation,
    setViewingEmailSimulation,
    setSelectedProductModal
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'wishlist'>('orders');
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);

  // New address form state
  const [addressTitle, setAddressTitle] = useState('Home');
  const [addressFullName, setAddressFullName] = useState(user?.name || '');
  const [addressPhone, setAddressPhone] = useState(user?.phone || '');
  const [addressLine, setAddressLine] = useState('');
  const [addressCity, setAddressCity] = useState('Lahore');
  const [addressProvince, setAddressProvince] = useState('Punjab');
  const [addressPostal, setAddressPostal] = useState('');
  const [isDefaultAddress, setIsDefaultAddress] = useState(false);
  const [addressError, setAddressError] = useState('');

  if (!isProfileOpen) return null;

  const safeWishlist = Array.isArray(wishlist) ? wishlist : [];
  const safeOrders = Array.isArray(orders) ? orders : [];
  const safeAddresses = Array.isArray(savedAddresses) ? savedAddresses : [];
  const wishlistedProducts = (products || []).filter((p) => safeWishlist.includes(p.id));

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressFullName.trim() || !addressPhone.trim() || !addressLine.trim() || !addressCity.trim()) {
      setAddressError('Please fill in all required address fields.');
      return;
    }
    if (!isValidPhone(addressPhone)) {
      setAddressError('Please enter a valid 11-digit phone number.');
      return;
    }

    addSavedAddress({
      title: addressTitle,
      fullName: addressFullName,
      phone: addressPhone,
      addressLine: addressLine,
      city: addressCity,
      province: addressProvince,
      postalCode: addressPostal,
      isDefault: isDefaultAddress
    });

    setShowAddAddressForm(false);
    setAddressLine('');
    setAddressError('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsProfileOpen(false)}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-screen max-w-xl bg-[#12131a] border-l border-[#272937] text-white flex flex-col justify-between shadow-2xl relative"
        >
          {/* Header */}
          <div className="p-5 border-b border-[#242636] bg-[#161722] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#c5a880] to-amber-200 text-[#0d0e12] flex items-center justify-center font-bold text-base shadow-md">
                {user?.name.charAt(0).toUpperCase() || 'A'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold text-white leading-tight">
                    {user?.name || 'Aura Member'}
                  </h2>
                  {user?.accountType === 'wholesale' ? (
                    <span className="text-[10px] bg-purple-900/80 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/40 font-semibold">
                      Verified Salon Wholesaler
                    </span>
                  ) : (
                    <span className="text-[10px] bg-[#c5a880]/20 text-[#c5a880] px-2 py-0.5 rounded-full border border-[#c5a880]/40 font-semibold">
                      Aura VIP Client
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-400 mt-0.5">
                  {user?.email} • {user?.phone}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsProfileOpen(false)}
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              aria-label="Close profile drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="bg-[#14151f] border-b border-[#242636] px-5 flex items-center gap-6">
            <button
              onClick={() => setActiveTab('orders')}
              className={`py-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
                activeTab === 'orders'
                  ? 'border-[#c5a880] text-[#c5a880]'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Orders & Tracking ({safeOrders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`py-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
                activeTab === 'addresses'
                  ? 'border-[#c5a880] text-[#c5a880]'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Saved Addresses ({safeAddresses.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('wishlist')}
              className={`py-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
                activeTab === 'wishlist'
                  ? 'border-[#c5a880] text-[#c5a880]'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>Wishlist ({safeWishlist.length})</span>
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {/* TAB 1: ORDERS & TRACKING */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                {safeOrders.length > 0 ? (
                  safeOrders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-[#171823] border border-[#2b2c3c] rounded-2xl p-4.5 space-y-3.5 shadow-lg"
                    >
                      <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-[#c5a880] bg-[#c5a880]/15 px-2 py-0.5 rounded border border-[#c5a880]/30">
                              {order.id}
                            </span>
                            <span className="text-[11px] text-zinc-400">
                              {new Date(order.createdAt).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                              order.status === 'Delivered'
                                ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-300'
                                : order.status === 'Shipped from Hub' || order.status === 'Out for Delivery'
                                ? 'bg-sky-950/70 border-sky-500/50 text-sky-300'
                                : 'bg-amber-950/70 border-amber-500/50 text-amber-300'
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                      </div>

                      {/* 4-Step Visual Tracking Bar */}
                      <div className="bg-[#101118] p-3 rounded-xl border border-zinc-800/80">
                        <div className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider mb-2 flex items-center justify-between">
                          <span>Live Dispatch Tracker</span>
                          <span className="text-emerald-400 font-semibold">{order.trackingCourier}</span>
                        </div>
                        <div className="grid grid-cols-4 gap-1 text-center text-[10px]">
                          <div className="space-y-1">
                            <div className="h-1.5 rounded-full bg-emerald-400" />
                            <span className="text-zinc-300">Verified</span>
                          </div>
                          <div className="space-y-1">
                            <div className="h-1.5 rounded-full bg-emerald-400" />
                            <span className="text-zinc-300">Packed</span>
                          </div>
                          <div className="space-y-1">
                            <div
                              className={`h-1.5 rounded-full ${
                                order.status === 'Shipped from Hub' ||
                                order.status === 'Out for Delivery' ||
                                order.status === 'Delivered'
                                  ? 'bg-emerald-400'
                                  : 'bg-zinc-700'
                              }`}
                            />
                            <span className="text-zinc-300">In Transit</span>
                          </div>
                          <div className="space-y-1">
                            <div
                              className={`h-1.5 rounded-full ${
                                order.status === 'Delivered'
                                  ? 'bg-emerald-400'
                                  : 'bg-zinc-700'
                              }`}
                            />
                            <span className="text-zinc-300">Delivered</span>
                          </div>
                        </div>
                      </div>

                      {/* Order Items preview */}
                      <div className="space-y-2">
                        {(order.items || []).map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs text-zinc-300">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <img
                                src={item.image}
                                alt={item.productName}
                                className="w-8 h-8 rounded-lg object-cover bg-zinc-900 shrink-0"
                                referrerPolicy="no-referrer"
                              />
                              <div className="truncate">
                                <span className="font-semibold text-white truncate block">{item.productName}</span>
                                <span className="text-[10px] text-zinc-400">{item.varietyName} x{item.quantity}</span>
                              </div>
                            </div>
                            <span className="font-bold text-white shrink-0 ml-2">
                              {formatPKR(item.totalPrice)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Order Footer & Actions */}
                      <div className="flex flex-wrap items-center justify-between pt-3 border-t border-zinc-800 gap-2">
                        <div className="text-xs">
                          <span className="text-zinc-400">Total Amount: </span>
                          <strong className="text-[#c5a880] text-sm">{formatPKR(order.totalAmount)}</strong>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setActiveOrderConfirmation(order);
                            }}
                            className="px-2.5 py-1.5 bg-[#252636] hover:bg-[#323348] text-zinc-200 text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors"
                          >
                            <FileText className="w-3.5 h-3.5 text-[#c5a880]" />
                            <span>Invoice Slip</span>
                          </button>

                          <button
                            onClick={() => {
                              setViewingEmailSimulation(order);
                            }}
                            className="px-2.5 py-1.5 bg-[#172c20] hover:bg-[#203f2e] border border-emerald-500/30 text-emerald-300 text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors"
                          >
                            <Mail className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Preview Email</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-16 text-center text-zinc-400">
                    <Package className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
                    <h3 className="text-sm font-bold text-zinc-200">No Past Orders Found</h3>
                    <p className="text-xs mt-1">Your placed orders and parcel tracking codes will appear here.</p>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: SAVED ADDRESSES */}
            {activeTab === 'addresses' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Delivery Profiles (Auto-fill Checkout)
                  </h3>
                  {!showAddAddressForm && (
                    <button
                      onClick={() => setShowAddAddressForm(true)}
                      className="px-3 py-1.5 bg-[#c5a880] text-[#0c0d10] font-bold text-xs rounded-lg flex items-center gap-1 hover:bg-[#d6ba92]"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add New Address</span>
                    </button>
                  )}
                </div>

                {/* Add Address Form */}
                {showAddAddressForm && (
                  <form
                    onSubmit={handleSaveAddress}
                    className="bg-[#171824] border border-[#35374b] rounded-2xl p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                      <h4 className="text-xs font-bold text-white">Add Delivery Address</h4>
                      <button
                        type="button"
                        onClick={() => setShowAddAddressForm(false)}
                        className="text-zinc-500 hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {addressError && (
                      <p className="text-xs text-rose-400 bg-rose-950/40 p-2 rounded border border-rose-800/50">
                        {addressError}
                      </p>
                    )}

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-semibold text-zinc-400 mb-1">
                          Profile Label (e.g. Home, Studio)
                        </label>
                        <input
                          type="text"
                          value={addressTitle}
                          onChange={(e) => setAddressTitle(e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-[#101118] border border-zinc-800 rounded-lg text-xs text-white outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-zinc-400 mb-1">
                          Recipient Full Name
                        </label>
                        <input
                          type="text"
                          value={addressFullName}
                          onChange={(e) => setAddressFullName(e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-[#101118] border border-zinc-800 rounded-lg text-xs text-white outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-semibold text-zinc-400 mb-1">
                          Contact Number
                        </label>
                        <input
                          type="tel"
                          value={addressPhone}
                          onChange={(e) => setAddressPhone(e.target.value)}
                          placeholder="03001234567"
                          className="w-full px-2.5 py-1.5 bg-[#101118] border border-zinc-800 rounded-lg text-xs text-white outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-zinc-400 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          value={addressCity}
                          onChange={(e) => setAddressCity(e.target.value)}
                          placeholder="e.g. Lahore, Karachi, Islamabad"
                          className="w-full px-2.5 py-1.5 bg-[#101118] border border-zinc-800 rounded-lg text-xs text-white outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold text-zinc-400 mb-1">
                        Complete Street Address / House / Studio No.
                      </label>
                      <input
                        type="text"
                        value={addressLine}
                        onChange={(e) => setAddressLine(e.target.value)}
                        placeholder="House / Plaza number, Street, Phase, Area"
                        className="w-full px-2.5 py-1.5 bg-[#101118] border border-zinc-800 rounded-lg text-xs text-white outline-none"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <label className="flex items-center gap-2 text-xs text-zinc-400 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isDefaultAddress}
                          onChange={(e) => setIsDefaultAddress(e.target.checked)}
                          className="rounded text-[#c5a880]"
                        />
                        <span>Set as Default Delivery Address</span>
                      </label>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setShowAddAddressForm(false)}
                          className="px-3 py-1.5 bg-zinc-800 text-xs rounded-lg text-zinc-300"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-3 py-1.5 bg-[#c5a880] text-[#0c0d10] font-bold text-xs rounded-lg"
                        >
                          Save Address
                        </button>
                      </div>
                    </div>
                  </form>
                )}

                {/* Saved Address Cards */}
                {safeAddresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="bg-[#171824] border border-[#2c2d3e] rounded-2xl p-4 relative flex flex-col justify-between space-y-2"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">
                            {addr.title}
                          </span>
                          {addr.isDefault && (
                            <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-600/40 px-2 py-0.5 rounded-full font-bold">
                              Default
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          {!addr.isDefault && (
                            <button
                              onClick={() => setDefaultAddress(addr.id)}
                              className="text-[11px] text-[#c5a880] hover:underline"
                            >
                              Make Default
                            </button>
                          )}
                          <button
                            onClick={() => deleteSavedAddress(addr.id)}
                            className="p-1 text-zinc-500 hover:text-rose-400"
                            title="Delete address"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs font-semibold text-zinc-200 mt-1">
                        {addr.fullName} • <span className="text-zinc-400">{addr.phone}</span>
                      </p>
                      <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                        {addr.addressLine}, {addr.city}, {addr.province} {addr.postalCode}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 3: WISHLIST */}
            {activeTab === 'wishlist' && (
              <div className="space-y-3">
                {wishlistedProducts.length > 0 ? (
                  wishlistedProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-[#171824] border border-[#2b2c3c] rounded-2xl p-3 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-14 h-14 rounded-xl object-cover bg-zinc-900 border border-zinc-800 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <h4
                            onClick={() => {
                              setSelectedProductModal(product);
                              setIsProfileOpen(false);
                            }}
                            className="text-xs font-bold text-white truncate hover:text-[#c5a880] cursor-pointer"
                          >
                            {product.name}
                          </h4>
                          <span className="text-[11px] text-[#c5a880] font-bold block mt-0.5">
                            {formatPKR(product.pricing?.retailPrice || 0)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => {
                            const defaultVariety = product.varieties?.[0] || {
                              id: 'default',
                              name: 'Standard',
                              type: 'shade' as const,
                              inStock: true,
                              stockQty: 10
                            };
                            addToCart(product, defaultVariety, 1);
                          }}
                          className="px-3 py-1.5 bg-[#c5a880] text-[#0c0d10] font-bold text-xs rounded-xl flex items-center gap-1 shadow hover:bg-[#d6ba92]"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Bag</span>
                        </button>

                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="p-1.5 text-zinc-500 hover:text-rose-400"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-16 text-center text-zinc-400">
                    <Heart className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
                    <h3 className="text-sm font-bold text-zinc-200">Your Wishlist is Empty</h3>
                    <p className="text-xs mt-1">Tap the heart icon on any product to save it here.</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer with Logout */}
          <div className="p-4 border-t border-[#242636] bg-[#161722] flex items-center justify-between">
            <div className="text-xs text-zinc-400">
              <span>Member Since: {new Date(user?.createdAt || Date.now()).getFullYear()}</span>
            </div>

            <button
              onClick={() => {
                logout();
                setIsProfileOpen(false);
              }}
              className="px-3 py-1.5 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
