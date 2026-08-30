import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { SavedAddress } from '../types';
import { formatPKR, isValidEmail, isValidPhone, sanitizeInput } from '../utils/security';
import {
  X,
  Lock,
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  Building2,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotal,
    cartItemCount,
    cartWholesaleSavings,
    freeShippingThreshold,
    user,
    savedAddresses,
    createOrder,
    setIsAuthModalOpen
  } = useStore();

  // Form states
  const [fullName, setFullName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [addressLine, setAddressLine] = useState('');
  const [city, setCity] = useState('Lahore');
  const [province, setProvince] = useState('Punjab');
  const [postalCode, setPostalCode] = useState('');
  const [orderNotes, setOrderNotes] = useState('Open parcel inspection requested on delivery.');
  const [paymentMethod, setPaymentMethod] = useState<
    'Cash on Delivery (COD)' | 'Online Bank / EasyPaisa' | 'Credit/Debit Card'
  >('Cash on Delivery (COD)');

  const [selectedSavedAddressId, setSelectedSavedAddressId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Auto-fill default saved address if user is logged in
  useEffect(() => {
    const safeAddrs = Array.isArray(savedAddresses) ? savedAddresses : [];
    if (user && safeAddrs.length > 0) {
      const defaultAddr = safeAddrs.find((a) => a.isDefault) || safeAddrs[0];
      if (defaultAddr) {
        setSelectedSavedAddressId(defaultAddr.id);
        setFullName(defaultAddr.fullName || user.name || '');
        setPhone(defaultAddr.phone || user.phone || '');
        setAddressLine(defaultAddr.addressLine || '');
        setCity(defaultAddr.city || 'Lahore');
        setProvince(defaultAddr.province || 'Punjab');
        setPostalCode(defaultAddr.postalCode || '');
      }
    }
  }, [user, savedAddresses]);

  if (!isCheckoutOpen) return null;

  const handleSelectSavedAddress = (addr: SavedAddress) => {
    setSelectedSavedAddressId(addr.id);
    setFullName(addr.fullName);
    setPhone(addr.phone);
    setAddressLine(addr.addressLine);
    setCity(addr.city);
    setProvince(addr.province);
    setPostalCode(addr.postalCode || '');
  };

  const isFreeShipping = cartTotal >= freeShippingThreshold;
  const shippingFee = isFreeShipping ? 0 : 250;
  const finalTotal = cartTotal + shippingFee;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name.';
    }
    if (!isValidEmail(email)) {
      newErrors.email = 'Please provide a valid email to receive your invoice.';
    }
    if (!isValidPhone(phone)) {
      newErrors.phone = 'Please enter a valid 11-digit phone number for courier updates.';
    }
    if (!addressLine.trim() || addressLine.trim().length < 5) {
      newErrors.addressLine = 'Please enter a complete street address with house/flat number.';
    }
    if (!city.trim()) {
      newErrors.city = 'Please enter your destination city.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsPlacingOrder(true);

    try {
      createOrder({
        customer: {
          fullName,
          email,
          phone,
          accountType: user?.accountType || 'retail'
        },
        shippingAddress: {
          addressLine,
          city,
          province,
          postalCode
        },
        paymentMethod,
        notes: orderNotes
      });
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        className="bg-[#13141c] border border-[#2c2e3d] rounded-3xl max-w-4xl w-full max-h-[94vh] overflow-y-auto shadow-2xl relative my-auto flex flex-col lg:flex-row"
      >
        {/* Close button */}
        <button
          onClick={() => setIsCheckoutOpen(false)}
          className="absolute top-4 right-4 z-20 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          aria-label="Close checkout"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Checkout Form */}
        <div className="w-full lg:w-3/5 p-6 sm:p-7 border-b lg:border-b-0 lg:border-r border-[#262736]">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#c5a880]">
              256-BIT ENCRYPTED CHECKOUT
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
            Delivery & Payment Details
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Open parcel upon delivery and inspect authenticity before paying.
          </p>

          {/* Quick Sign-in prompt for guests */}
          {!user && (
            <div className="mt-4 p-3 bg-[#191a24] border border-[#2b2c3a] rounded-xl flex items-center justify-between text-xs">
              <span className="text-zinc-300">
                Already have an Aura account?
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsCheckoutOpen(false);
                  setIsAuthModalOpen(true);
                }}
                className="text-xs font-bold text-[#c5a880] hover:underline"
              >
                Sign In to Autofill
              </button>
            </div>
          )}

          {/* Saved Addresses Selector (if logged in) */}
          {user && (savedAddresses?.length || 0) > 0 && (
            <div className="mt-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                1-Click Saved Delivery Profiles:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(savedAddresses || []).map((addr) => {
                  const isSelected = selectedSavedAddressId === addr.id;
                  return (
                    <button
                      key={addr.id}
                      type="button"
                      onClick={() => handleSelectSavedAddress(addr)}
                      className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#292218] border-[#c5a880] text-white ring-1 ring-[#c5a880]'
                          : 'bg-[#171822] border-[#2b2c3a] text-zinc-300 hover:border-zinc-600'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span>{addr.title}</span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a880]" />}
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-1 truncate">
                        {addr.addressLine}, {addr.city}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmitOrder} className="mt-5 space-y-4">
            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Recipient Full Name *
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Ayesha Malik"
                  className="w-full px-3 py-2 bg-[#101118] border border-[#2a2c3a] focus:border-[#c5a880] rounded-xl text-xs text-white outline-none"
                />
                {errors.fullName && <p className="text-[10px] text-rose-400 mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Mobile Number (WhatsApp Enabled) *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0300 1234567"
                  className="w-full px-3 py-2 bg-[#101118] border border-[#2a2c3a] focus:border-[#c5a880] rounded-xl text-xs text-white outline-none"
                />
                {errors.phone && <p className="text-[10px] text-rose-400 mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                Email Address (for Instant PDF Invoice & Tracking Slip) *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="customer@email.com"
                className="w-full px-3 py-2 bg-[#101118] border border-[#2a2c3a] focus:border-[#c5a880] rounded-xl text-xs text-white outline-none"
              />
              {errors.email && <p className="text-[10px] text-rose-400 mt-1">{errors.email}</p>}
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                Complete Street Address / Apartment / Studio No. *
              </label>
              <input
                type="text"
                value={addressLine}
                onChange={(e) => setAddressLine(e.target.value)}
                placeholder="House 12, Street 4, Sector F, DHA Phase 5"
                className="w-full px-3 py-2 bg-[#101118] border border-[#2a2c3a] focus:border-[#c5a880] rounded-xl text-xs text-white outline-none"
              />
              {errors.addressLine && <p className="text-[10px] text-rose-400 mt-1">{errors.addressLine}</p>}
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Lahore / Karachi"
                  className="w-full px-3 py-2 bg-[#101118] border border-[#2a2c3a] focus:border-[#c5a880] rounded-xl text-xs text-white outline-none"
                />
                {errors.city && <p className="text-[10px] text-rose-400 mt-1">{errors.city}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Province
                </label>
                <select
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  aria-label="Province"
                  className="w-full px-2.5 py-2 bg-[#101118] border border-[#2a2c3a] focus:border-[#c5a880] rounded-xl text-xs text-white outline-none cursor-pointer"
                >
                  <option value="Punjab">Punjab</option>
                  <option value="Sindh">Sindh</option>
                  <option value="Khyber Pakhtunkhwa">KPK</option>
                  <option value="Balochistan">Balochistan</option>
                  <option value="Islamabad Capital">Islamabad</option>
                  <option value="Azad Kashmir">AJK</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="54000"
                  className="w-full px-3 py-2 bg-[#101118] border border-[#2a2c3a] focus:border-[#c5a880] rounded-xl text-xs text-white outline-none"
                />
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                Choose Payment Method:
              </label>

              <div className="space-y-2">
                <label
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'Cash on Delivery (COD)'
                      ? 'bg-[#292218] border-[#c5a880] ring-1 ring-[#c5a880]'
                      : 'bg-[#151620] border-[#2a2c3b] hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'Cash on Delivery (COD)'}
                      onChange={() => setPaymentMethod('Cash on Delivery (COD)')}
                      className="text-[#c5a880] focus:ring-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <Banknote className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-bold text-white">
                          Cash on Delivery (COD Nationwide)
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400">
                        Pay cash to the rider upon inspecting package at your doorstep.
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                    Recommended
                  </span>
                </label>

                <label
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'Online Bank / EasyPaisa'
                      ? 'bg-[#292218] border-[#c5a880] ring-1 ring-[#c5a880]'
                      : 'bg-[#151620] border-[#2a2c3b] hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'Online Bank / EasyPaisa'}
                      onChange={() => setPaymentMethod('Online Bank / EasyPaisa')}
                      className="text-[#c5a880] focus:ring-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-sky-400" />
                        <span className="text-xs font-bold text-white">
                          Direct Bank Transfer / EasyPaisa / JazzCash
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400">
                        Account details provided on confirmation page with instant verification.
                      </p>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Special Instructions */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                Order Notes / Courier Delivery Instructions (Optional)
              </label>
              <input
                type="text"
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                placeholder="e.g. Call before delivery, open parcel requested"
                className="w-full px-3 py-2 bg-[#101118] border border-[#2a2c3a] rounded-xl text-xs text-white outline-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={isPlacingOrder}
                className="w-full py-3.5 bg-[#c5a880] hover:bg-[#d6ba92] text-[#0c0d10] font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#c5a880]/20 transition-all cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>
                  {isPlacingOrder ? 'Securing Order...' : `Confirm Order • ${formatPKR(finalTotal)}`}
                </span>
              </button>

              <p className="text-[10px] text-center text-zinc-500 mt-2">
                By confirming, your order will be dispatched via express courier with real-time tracking code.
              </p>
            </div>
          </form>
        </div>

        {/* Right Side: Order Summary */}
        <div className="w-full lg:w-2/5 p-6 sm:p-7 bg-[#101117] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#c5a880]" />
                <span>Order Summary ({cartItemCount} items)</span>
              </h3>
              <span className="text-xs font-semibold text-[#c5a880]">
                Express Dispatch
              </span>
            </div>

            {/* Items list */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1 divide-y divide-zinc-800/40">
              {(cart || []).map((item) => (
                <div key={item.id} className="pt-2 first:pt-0 flex items-center gap-3">
                  <img
                    src={item.selectedVariety?.image || item.product?.image}
                    alt={item.product?.name || 'Product'}
                    className="w-12 h-12 rounded-lg object-cover bg-zinc-900 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-white truncate">
                      {item.product?.name}
                    </h4>
                    <p className="text-[10px] text-zinc-400">
                      {item.selectedVariety?.name || 'Standard'} x{item.quantity}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-white shrink-0">
                    {formatPKR((item.appliedUnitPrice || 0) * (item.quantity || 1))}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="mt-6 pt-4 border-t border-zinc-800 space-y-2 text-xs text-zinc-300">
              <div className="flex justify-between">
                <span className="text-zinc-400">Items Subtotal:</span>
                <span className="font-semibold text-white">{formatPKR(cartTotal)}</span>
              </div>

              {cartWholesaleSavings > 0 && (
                <div className="flex justify-between text-amber-300">
                  <span>Wholesale Discount:</span>
                  <span>-{formatPKR(cartWholesaleSavings)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-zinc-400">Nationwide Shipping:</span>
                <span>
                  {isFreeShipping ? (
                    <strong className="text-emerald-400">FREE Express</strong>
                  ) : (
                    formatPKR(shippingFee)
                  )}
                </span>
              </div>

              <div className="flex justify-between text-base font-black text-white pt-3 border-t border-zinc-800">
                <span>Total Due:</span>
                <span className="text-[#c5a880] text-lg">{formatPKR(finalTotal)}</span>
              </div>
            </div>
          </div>

          {/* Security Box */}
          <div className="mt-6 p-4 rounded-2xl bg-[#161722] border border-[#2a2c3a] space-y-2 text-xs text-zinc-400">
            <div className="flex items-center gap-2 text-zinc-200 font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#c5a880]" />
              <span>Aura Buyer Protection Guarantee</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Every parcel is sealed with Dubai holographic security tape. If you find any damaged product, enjoy our instant 7-day doorstep replacement policy.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
