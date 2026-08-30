import React, { useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { formatPKR } from '../utils/security';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Package,
  Printer,
  Mail,
  Truck,
  MessageCircle,
  Copy,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Building2,
  X
} from 'lucide-react';
import { motion } from 'motion/react';

export const OrderSuccessModal: React.FC = () => {
  const {
    activeOrderConfirmation,
    setActiveOrderConfirmation,
    setViewingEmailSimulation,
    showToast
  } = useStore();

  const order = activeOrderConfirmation;

  useEffect(() => {
    if (order) {
      // Fire celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#c5a880', '#e4cfb4', '#d4af37', '#ffffff']
        });
      } catch (e) {
        // ignore if canvas not supported
      }
    }
  }, [order]);

  if (!order) return null;

  const handleCopyTrackingCode = () => {
    navigator.clipboard.writeText(order.id);
    showToast('success', 'Tracking Code Copied', order.id);
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto print:p-0 print:bg-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-[#14151e] border border-[#2e3040] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-auto print:border-none print:shadow-none print:bg-white print:text-black"
      >
        {/* Close Button (hidden in print) */}
        <button
          onClick={() => setActiveOrderConfirmation(null)}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-xl hover:bg-zinc-800 transition-colors print:hidden"
          aria-label="Close confirmation dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Success Icon */}
        <div className="text-center mb-6 print:mb-4">
          <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-emerald-950/50 print:border-black print:text-black">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#c5a880] print:text-black">
            ORDER CONFIRMED & VERIFIED
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1 print:text-black">
            Thank You, {order.customer?.fullName || 'Valued Customer'}!
          </h2>
          <p className="text-xs text-zinc-400 mt-1 max-w-md mx-auto print:text-zinc-700">
            Your Dubai luxury selection has been recorded. An official order confirmation receipt and parcel tracking code has been dispatched.
          </p>
        </div>

        {/* Unique Tracking Code Bar */}
        <div className="bg-[#191a26] border border-[#35374b] rounded-2xl p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 print:border-black print:bg-zinc-100">
          <div>
            <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider block print:text-zinc-700">
              Unique Order Tracking ID:
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-lg sm:text-xl font-mono font-black text-[#c5a880] print:text-black">
                {order.id}
              </span>
              <button
                onClick={handleCopyTrackingCode}
                className="p-1 text-zinc-400 hover:text-white transition-colors print:hidden"
                title="Copy Tracking ID"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="text-right sm:text-right text-xs text-zinc-300 print:text-black">
            <span className="text-zinc-400 block text-[11px]">Courier Service:</span>
            <span className="font-bold text-emerald-400 flex items-center gap-1 print:text-black">
              <Truck className="w-3.5 h-3.5" />
              {order.trackingCourier || 'TCS Express'}
            </span>
          </div>
        </div>

        {/* Interactive Email Simulation Banner Button */}
        <div className="bg-gradient-to-r from-[#17261d] to-[#121f17] border border-emerald-500/40 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-900/60 text-emerald-300 rounded-xl shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">
                Email Invoice & Tracking Dispatched
              </h4>
              <p className="text-[11px] text-zinc-300">
                Sent to <strong className="text-emerald-300">{order.customer?.email || 'your email'}</strong> with full delivery schedule.
              </p>
            </div>
          </div>

          <button
            onClick={() => setViewingEmailSimulation(order)}
            className="w-full sm:w-auto px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all shadow shrink-0 cursor-pointer"
          >
            <span>Preview Email Slip</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Invoice Itemized Details Box */}
        <div className="bg-[#101118] rounded-2xl p-4 sm:p-5 border border-zinc-800 space-y-3 mb-6 print:border-black print:bg-transparent">
          <div className="flex justify-between items-center text-xs text-zinc-400 border-b border-zinc-800 pb-2 print:border-black">
            <span>Item Description</span>
            <span>Total</span>
          </div>

          <div className="divide-y divide-zinc-800/40">
            {(order.items || []).map((item, idx) => (
              <div key={idx} className="py-2.5 first:pt-0 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-10 h-10 rounded-lg object-cover bg-zinc-900 print:hidden"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h5 className="font-bold text-white print:text-black">{item.productName}</h5>
                    <span className="text-[10px] text-zinc-400 print:text-zinc-600">
                      {item.varietyName} • Quantity: {item.quantity}
                    </span>
                  </div>
                </div>
                <span className="font-bold text-white print:text-black">
                  {formatPKR(item.totalPrice)}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing totals */}
          <div className="pt-3 border-t border-zinc-800 space-y-1.5 text-xs text-zinc-300 print:border-black print:text-black">
            <div className="flex justify-between">
              <span className="text-zinc-400">Payment Mode:</span>
              <span className="font-semibold text-white print:text-black">{order.paymentMethod || 'COD'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Delivery Address:</span>
              <span className="font-medium text-right text-zinc-300 max-w-[280px] print:text-black">
                {order.shippingAddress?.addressLine || ''}, {order.shippingAddress?.city || ''}, {order.shippingAddress?.province || ''}
              </span>
            </div>
            <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-zinc-800 print:border-black print:text-black">
              <span>Amount Payable on Delivery:</span>
              <span className="text-[#c5a880] text-base print:text-black">{formatPKR(order.totalAmount)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 print:hidden">
          <button
            onClick={handlePrintInvoice}
            className="w-full sm:flex-1 py-3 bg-[#242636] hover:bg-[#303348] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer border border-[#373a50]"
          >
            <Printer className="w-4 h-4 text-[#c5a880]" />
            <span>Print Official Invoice Slip</span>
          </button>

          <a
            href={`https://wa.me/923179738321?text=Hi%20The%20House%20of%20Aura,%20I%20just%20placed%20order%20${order.id}%20for%20${encodeURIComponent(order.items[0]?.productName || '')}`}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:flex-1 py-3 bg-[#183926] hover:bg-[#204a32] border border-emerald-500/40 text-emerald-200 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Confirm on WhatsApp</span>
          </a>

          <button
            onClick={() => setActiveOrderConfirmation(null)}
            className="w-full sm:w-auto px-5 py-3 bg-[#c5a880] hover:bg-[#d6ba92] text-[#0c0d10] font-bold text-xs rounded-xl"
          >
            Continue Shopping
          </button>
        </div>
      </motion.div>
    </div>
  );
};
