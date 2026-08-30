import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatPKR, sanitizePhoneForWhatsApp } from '../utils/security';
import {
  X,
  MessageCircle,
  Sparkles,
  Truck,
  CheckCircle2,
  Phone,
  User,
  MapPin
} from 'lucide-react';
import { motion } from 'motion/react';

export const WhatsAppModal: React.FC = () => {
  const { whatsAppModalItem, setWhatsAppModalItem, user } = useStore();

  const [customerName, setCustomerName] = useState(user?.name || '');
  const [customerCity, setCustomerCity] = useState('Lahore');
  const [quantity, setQuantity] = useState(1);

  if (!whatsAppModalItem) return null;

  const { product, variety } = whatsAppModalItem;
  const unitPrice = quantity >= 2 && product?.pricing?.bundleDiscountPrice
    ? product.pricing.bundleDiscountPrice
    : product?.pricing?.retailPrice || 0;
  const totalPrice = unitPrice * quantity;

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    const nameText = customerName.trim() ? customerName : 'Aura Customer';
    const cityText = customerCity.trim() ? customerCity : 'Pakistan';

    const message = `*✨ THE HOUSE OF AURA - QUICK WHATSAPP ORDER*\n\n` +
      `*Product:* ${product.name}\n` +
      `*Selected Option:* ${variety.name}\n` +
      `*Quantity:* ${quantity}\n` +
      `*Total Price:* ${formatPKR(totalPrice)} (Cash on Delivery)\n\n` +
      `*Customer Details:*\n` +
      `• Name: ${nameText}\n` +
      `• City: ${cityText}\n\n` +
      `Please confirm stock availability and dispatch with open parcel inspection!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/923132541373?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    setWhatsAppModalItem(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-[#14151e] border border-[#2e303f] rounded-3xl max-w-md w-full p-6 shadow-2xl relative my-auto"
      >
        <button
          onClick={() => setWhatsAppModalItem(null)}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-xl hover:bg-zinc-800 transition-colors"
          aria-label="Close WhatsApp modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">
              1-Tap WhatsApp Fast Buy
            </span>
            <h3 className="text-lg font-serif font-bold text-white leading-tight">
              Order via WhatsApp
            </h3>
          </div>
        </div>

        {/* Product Preview Card */}
        <div className="bg-[#0f1015] p-3 rounded-2xl border border-zinc-800 flex items-center gap-3 mb-4">
          <img
            src={variety.image || product.image}
            alt={product.name}
            className="w-14 h-14 rounded-xl object-cover bg-zinc-900 shrink-0"
            referrerPolicy="no-referrer"
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-white truncate">{product.name}</h4>
            <div className="flex items-center gap-1.5 text-[11px] text-zinc-300 mt-0.5">
              {variety.hexColor && (
                <span
                  className="w-2.5 h-2.5 rounded-full border border-black/40"
                  style={{ backgroundColor: variety.hexColor }}
                />
              )}
              <span className="truncate">{variety.name}</span>
            </div>
            <span className="text-xs font-bold text-[#c5a880] mt-0.5 block">
              {formatPKR(totalPrice)}
            </span>
          </div>
        </div>

        {/* Form Details */}
        <form onSubmit={handleSendWhatsApp} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Your Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Fatima Khan"
                className="w-full pl-9 pr-3 py-2 bg-[#101117] border border-[#2b2c3a] focus:border-emerald-500 rounded-xl text-xs text-white outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                Destination City
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={customerCity}
                  onChange={(e) => setCustomerCity(e.target.value)}
                  placeholder="e.g. Karachi"
                  className="w-full pl-9 pr-3 py-2 bg-[#101117] border border-[#2b2c3a] focus:border-emerald-500 rounded-xl text-xs text-white outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                Quantity
              </label>
              <div className="flex items-center border border-[#2b2c3a] rounded-xl bg-[#101117] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-zinc-400 hover:text-white text-xs font-bold"
                >
                  -
                </button>
                <span className="flex-1 py-2 text-xs font-bold text-white text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-zinc-400 hover:text-white text-xs font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#22c55e] hover:bg-[#16a34a] text-black font-extrabold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 transition-all cursor-pointer mt-4"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Launch WhatsApp & Confirm Order</span>
          </button>
        </form>
      </motion.div>
    </div>
  );
};
