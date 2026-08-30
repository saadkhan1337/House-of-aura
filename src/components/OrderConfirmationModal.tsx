import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Copy, Check, Printer, Mail, Truck, Package, ShieldCheck, Sparkles, MessageSquare, ArrowRight, ExternalLink } from 'lucide-react';
import { Order } from '../types';
import { formatPKR } from '../utils/security';

interface OrderConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  onOpenEmailSimulation: () => void;
  onOpenWhatsApp: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  isOpen,
  onClose,
  order,
  onOpenEmailSimulation,
  onOpenWhatsApp
}) => {
  if (!isOpen || !order) return null;

  const [copied, setCopied] = useState(false);

  // Trigger confetti burst on appearance
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#e5c158', '#ffffff', '#10b981']
      });
    } catch {
      // safe fallback if canvas is not initialized
    }
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(order.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div
        id="order-confirmation-success-modal"
        className="relative w-full max-w-2xl bg-[#121212] border-2 border-[#D4AF37] rounded-lg shadow-2xl text-white overflow-hidden my-6"
      >
        {/* Top Celebration Gold Banner */}
        <div className="bg-gradient-to-r from-[#201808] via-[#2f240b] to-[#201808] border-b border-[#D4AF37]/50 p-6 text-center relative">
          <div className="w-16 h-16 rounded-full bg-[#D4AF37] text-black flex items-center justify-center mx-auto mb-3 shadow-lg ring-4 ring-[#D4AF37]/20">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="inline-flex items-center gap-1 text-[#D4AF37] text-xs font-bold uppercase tracking-[0.2em] mb-1">
            <Sparkles className="w-3.5 h-3.5" /> Order Placed Successfully
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Thank You For Your Order!
          </h2>

          <p className="text-xs text-[#d4d4d8] mt-1.5 max-w-md mx-auto">
            Your genuine Dubai imports order has been verified and registered with House of Aura dispatch logistics.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Tracking Code Highlight Box */}
          <div className="p-4 bg-[#181818] border border-[#333] rounded-sm flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <span className="text-[10px] text-[#a1a1aa] uppercase font-bold tracking-widest block">
                Official Tracking Number
              </span>
              <span className="text-xl sm:text-2xl font-mono font-bold text-[#D4AF37] tracking-wider">
                {order.id}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyCode}
                className="bg-[#222] hover:bg-[#2e2e2e] border border-[#444] text-white text-xs px-3 py-2 rounded-sm font-semibold flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#D4AF37]" />}
                <span>{copied ? 'Copied' : 'Copy Code'}</span>
              </button>

              <button
                onClick={handlePrintInvoice}
                className="bg-[#222] hover:bg-[#2e2e2e] border border-[#444] text-white text-xs px-3 py-2 rounded-sm font-semibold flex items-center gap-1.5 transition-colors"
                title="Download or Print Invoice"
              >
                <Printer className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Invoice Slip</span>
              </button>
            </div>
          </div>

          {/* Interactive Email Simulation Preview Trigger Banner */}
          <div className="p-4 bg-gradient-to-r from-[#17201c] to-[#121c17] border border-emerald-700/50 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700 mt-0.5 sm:mt-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                  <span>Automated Confirmation Email Dispatched</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>
                <p className="text-[11px] text-[#a1a1aa] mt-0.5">
                  Order Confirmation &amp; Receipt sent to <strong className="text-white">{order.customer?.email || 'your email'}</strong> with Delivery Tracking details.
                </p>
              </div>
            </div>

            <button
              id="view-simulated-email-btn"
              onClick={onOpenEmailSimulation}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider px-3.5 py-2 rounded-sm flex items-center gap-1.5 whitespace-nowrap transition-colors shadow-md"
            >
              <span>Preview Email Slip</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Live Order Pipeline Tracker */}
          <div className="p-4 bg-[#161616] border border-[#262626] rounded-sm space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center justify-between">
              <span>Logistics Status Pipeline</span>
              <span className="text-[11px] font-normal text-[#a1a1aa]">{order.trackingCourier || 'TCS Express'}</span>
            </div>

            <div className="grid grid-cols-4 gap-2 pt-2">
              <div className="text-center">
                <div className="w-7 h-7 rounded-full bg-[#D4AF37] text-black font-bold text-xs flex items-center justify-center mx-auto mb-1">
                  ✓
                </div>
                <div className="text-[10px] font-bold text-white">Verified</div>
                <div className="text-[9px] text-[#a1a1aa]">Just now</div>
              </div>

              <div className="text-center">
                <div className="w-7 h-7 rounded-full bg-[#2a2a2a] text-[#D4AF37] border border-[#D4AF37] font-bold text-xs flex items-center justify-center mx-auto mb-1 animate-pulse">
                  2
                </div>
                <div className="text-[10px] font-bold text-[#D4AF37]">Depot Sealed</div>
                <div className="text-[9px] text-[#a1a1aa]">Karachi Hub</div>
              </div>

              <div className="text-center opacity-50">
                <div className="w-7 h-7 rounded-full bg-[#1e1e1e] text-gray-500 font-bold text-xs flex items-center justify-center mx-auto mb-1">
                  3
                </div>
                <div className="text-[10px] font-medium text-gray-400">Air Transit</div>
                <div className="text-[9px] text-[#71717a]">TCS Priority</div>
              </div>

              <div className="text-center opacity-50">
                <div className="w-7 h-7 rounded-full bg-[#1e1e1e] text-gray-500 font-bold text-xs flex items-center justify-center mx-auto mb-1">
                  4
                </div>
                <div className="text-[10px] font-medium text-gray-400">Delivered</div>
                <div className="text-[9px] text-[#71717a]">{(order.estimatedDelivery || '').split('by')[0] || '2-4 Business Days'}</div>
              </div>
            </div>
          </div>

          {/* Quick Summary Breakdown */}
          <div className="p-4 bg-[#141414] border border-[#262626] rounded-sm text-xs space-y-2">
            <div className="flex justify-between text-[#a1a1aa]">
              <span>Delivery To:</span>
              <span className="text-white font-medium">
                {order.customer?.fullName || 'Customer'} ({order.shippingAddress?.city || 'Pakistan'})
              </span>
            </div>
            <div className="flex justify-between text-[#a1a1aa]">
              <span>Contact Phone:</span>
              <span className="text-white font-medium">{order.customer?.phone || 'N/A'}</span>
            </div>
            <div className="flex justify-between text-[#a1a1aa]">
              <span>Payment Type:</span>
              <span className="text-white font-medium">{order.paymentMethod || 'COD'}</span>
            </div>
            <div className="flex justify-between text-[#a1a1aa] border-t border-[#262626] pt-2">
              <span className="font-bold text-white">Total Amount Due:</span>
              <span className="font-bold text-[#D4AF37] text-sm">{formatPKR(order.totalAmount)}</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 bg-[#D4AF37] hover:bg-[#e0bc46] text-black font-bold py-3 text-xs uppercase tracking-wider rounded-sm flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenWhatsApp}
              className="bg-[#1b2b20] hover:bg-[#23382a] text-[#25D366] border border-[#25D366]/40 font-bold py-3 px-4 text-xs uppercase tracking-wider rounded-sm flex items-center justify-center gap-2 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Order Support</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
