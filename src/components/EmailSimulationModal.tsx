import React from 'react';
import { useStore } from '../context/StoreContext';
import { formatPKR } from '../utils/security';
import {
  X,
  Mail,
  CheckCircle2,
  Truck,
  ShieldCheck,
  Building2,
  Sparkles,
  ExternalLink,
  Package,
  Calendar,
  Clock,
  Printer
} from 'lucide-react';
import { motion } from 'motion/react';

export const EmailSimulationModal: React.FC = () => {
  const { viewingEmailSimulation, setViewingEmailSimulation } = useStore();

  if (!viewingEmailSimulation) return null;

  const order = viewingEmailSimulation;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-[#1a1b24] border border-[#37394c] rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative my-auto flex flex-col"
      >
        {/* Email Client App Bar */}
        <div className="p-4 bg-[#12131a] border-b border-[#2a2b3c] flex items-center justify-between rounded-t-3xl">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <span className="text-xs font-mono text-zinc-400 ml-2">
              Aura Mail Delivery Simulator • Inbox View
            </span>
          </div>

          <button
            onClick={() => setViewingEmailSimulation(null)}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
            aria-label="Close email simulation"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Email Metadata Header */}
        <div className="p-4 sm:p-5 bg-[#161722] border-b border-[#2b2c3d] text-xs space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div>
              <span className="text-zinc-500">From: </span>
              <strong className="text-zinc-200">The House of Aura Orders</strong>{' '}
              <span className="text-zinc-400">&lt;orders@thehouseofaura.com&gt;</span>
            </div>
            <span className="text-[11px] text-zinc-500 flex items-center gap-1">
              <Clock className="w-3 h-3" /> Just now
            </span>
          </div>

          <div>
            <span className="text-zinc-500">To: </span>
            <strong className="text-zinc-200">{order.customer?.fullName || 'Customer'}</strong>{' '}
            <span className="text-zinc-400">&lt;{order.customer?.email || 'customer@example.com'}&gt;</span>
          </div>

          <div>
            <span className="text-zinc-500">Subject: </span>
            <strong className="text-amber-200">
              [Order Confirmed: {order.id}] Your Dubai Luxury Hair Care & Fragrances Order is Verified
            </strong>
          </div>
        </div>

        {/* Rendered HTML Email Content Body */}
        <div className="p-6 sm:p-8 bg-[#ffffff] text-[#1a1a1a] font-sans flex-1 overflow-y-auto space-y-6">
          {/* Brand Header */}
          <div className="text-center pb-6 border-b border-zinc-200">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#917143] font-bold block">
              THE HOUSE OF AURA • DUBAI
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-black text-black tracking-wider mt-1">
              ORDER CONFIRMATION
            </h1>
            <p className="text-xs text-zinc-500 mt-1">
              Thank you for shopping authentic Emirati cosmetics & hair solutions.
            </p>
          </div>

          {/* Tracking Callout Box */}
          <div className="bg-[#faf7f2] border border-[#d6c4a8] rounded-2xl p-5 text-center">
            <span className="text-[10px] uppercase font-bold text-[#8c6b3e] tracking-wider block">
              Express Courier Tracking Number:
            </span>
            <span className="text-xl sm:text-2xl font-mono font-black text-[#1c1a16] mt-1 block">
              {order.id}
            </span>
            <p className="text-xs text-zinc-600 mt-1">
              Dispatched via <strong>{order.trackingCourier || 'TCS Express'}</strong> ({order.estimatedDelivery || '2-4 Days'})
            </p>
          </div>

          {/* Customer Greeting */}
          <div className="text-xs leading-relaxed text-zinc-700">
            <p className="font-semibold text-sm text-zinc-900 mb-1">
              Dear {order.customer?.fullName || 'Valued Customer'},
            </p>
            <p>
              We have received and authenticated your luxury order. Our Dubai packaging hub in Karachi is currently inspecting each bottle and sealing the box with our tamper-evident hologram tape.
            </p>
          </div>

          {/* Itemized Table */}
          <div className="border border-zinc-200 rounded-xl overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-zinc-100 text-zinc-700 border-b border-zinc-200">
                <tr>
                  <th className="p-3 font-bold">Item Description</th>
                  <th className="p-3 font-bold text-center">Qty</th>
                  <th className="p-3 font-bold text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 text-zinc-800">
                {(order.items || []).map((item, idx) => (
                  <tr key={idx}>
                    <td className="p-3">
                      <strong className="block text-zinc-900">{item.productName}</strong>
                      <span className="text-[11px] text-zinc-500">{item.varietyName}</span>
                    </td>
                    <td className="p-3 text-center font-bold">{item.quantity}</td>
                    <td className="p-3 text-right font-bold">{formatPKR(item.totalPrice)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pricing Calculation Summary */}
          <div className="bg-zinc-50 p-4 rounded-xl space-y-2 text-xs text-zinc-600">
            <div className="flex justify-between">
              <span>Items Subtotal:</span>
              <span className="font-bold text-zinc-900">{formatPKR(order.subtotal || 0)}</span>
            </div>
            {(order.discountAmount || 0) > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Wholesale / Bundle Savings:</span>
                <span>-{formatPKR(order.discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping Fee:</span>
              <span>{order.shippingFee === 0 ? <strong className="text-emerald-700">FREE Express</strong> : formatPKR(order.shippingFee || 0)}</span>
            </div>
            <div className="flex justify-between text-sm font-black text-zinc-900 pt-2 border-t border-zinc-200">
              <span>Amount Due on Delivery (COD):</span>
              <span className="text-[#8c6b3e] text-base">{formatPKR(order.totalAmount || 0)}</span>
            </div>
          </div>

          {/* Delivery Destination & Open Parcel Policy */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl">
              <h5 className="font-bold text-zinc-900 mb-1 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#8c6b3e]" />
                <span>Delivery Address</span>
              </h5>
              <p className="text-zinc-600 leading-relaxed">
                {order.shippingAddress?.addressLine || ''}<br />
                {order.shippingAddress?.city || ''}, {order.shippingAddress?.province || ''} {order.shippingAddress?.postalCode || ''}<br />
                Phone: {order.customer?.phone || 'N/A'}
              </p>
            </div>

            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl">
              <h5 className="font-bold text-emerald-900 mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Open Parcel Guarantee</span>
              </h5>
              <p className="text-emerald-800 text-[11px] leading-relaxed">
                You are authorized to open the parcel and verify original Dubai batch seals before giving payment to the courier rider.
              </p>
            </div>
          </div>

          {/* Email Footer */}
          <div className="text-center pt-6 border-t border-zinc-200 text-[11px] text-zinc-500 space-y-1">
            <p>Need support with your shipment? Reply directly or WhatsApp VIP Concierge at +92 300 0000000</p>
            <p>© {new Date().getFullYear()} The House of Aura UAE & Pakistan. All Rights Reserved.</p>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 bg-[#14151f] border-t border-[#2d2f40] flex justify-end gap-2 rounded-b-3xl">
          <button
            onClick={() => setViewingEmailSimulation(null)}
            className="px-5 py-2 bg-[#c5a880] text-[#0c0d10] font-bold text-xs rounded-xl hover:bg-[#d6ba92]"
          >
            Close Email Simulation
          </button>
        </div>
      </motion.div>
    </div>
  );
};
