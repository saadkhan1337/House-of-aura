import React, { useState } from 'react';
import { X, MessageSquare, Send, Phone, ShieldCheck, Sparkles, Building2, Package, Check } from 'lucide-react';
import { CartItem } from '../types';
import { formatPKR } from '../utils/security';

interface WhatsAppSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems?: CartItem[];
  appliedCoupon?: string;
}

export const WhatsAppSupportModal: React.FC<WhatsAppSupportModalProps> = ({
  isOpen,
  onClose,
  cartItems = [],
  appliedCoupon
}) => {
  if (!isOpen) return null;

  const [customerName, setCustomerName] = useState('');
  const [city, setCity] = useState('Karachi');
  const [inquiryType, setInquiryType] = useState<'quick-order' | 'wholesale' | 'tracking' | 'product-advice'>('quick-order');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [customQuery, setCustomQuery] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const whatsappNumber = '+92 313 2541373';
  const whatsappClean = '923132541373';

  // Build simulated WhatsApp message text
  const generateMessage = () => {
    let msg = `*THE HOUSE OF AURA - DUBAI LUXURY ORDER CONCIERGE*\n`;
    if (customerName) msg += `Customer Name: ${customerName}\n`;
    if (city) msg += `City: ${city}\n`;
    msg += `Inquiry Type: ${inquiryType.toUpperCase()}\n\n`;

    if (inquiryType === 'quick-order' && (cartItems?.length || 0) > 0) {
      msg += `*Selected Dubai Products:*\n`;
      (cartItems || []).forEach((item, idx) => {
        const prodName = item.product?.name || 'Product';
        const varName = item.selectedVariety?.name || 'Standard';
        const qty = item.quantity || 1;
        const unitPrice = item.appliedUnitPrice || 0;
        msg += `${idx + 1}. ${prodName} (${varName}) x ${qty} = ${formatPKR(unitPrice * qty)}\n`;
      });
      const subtotal = (cartItems || []).reduce((acc, i) => acc + (i.appliedUnitPrice || 0) * (i.quantity || 1), 0);
      msg += `\n*Subtotal:* ${formatPKR(subtotal)}\n`;
      if (appliedCoupon) msg += `*Applied Voucher:* ${appliedCoupon}\n`;
      msg += `Payment Preference: Cash on Delivery (COD)\n`;
    } else if (inquiryType === 'wholesale') {
      msg += `*Salon Wholesale Quotation Request:*\n`;
      msg += `I am a salon owner / distributor interested in bulk pricing for Apple Hair Color, Cosmo Shampoo, and Bakhoor Hamidi.\n`;
    } else if (inquiryType === 'tracking') {
      msg += `*Order Tracking Inquiry:*\n`;
      msg += `Please check tracking status for Order Code: ${trackingNumber || '[HOA-PK-XXXXX]'}\n`;
    }

    if (customQuery.trim()) {
      msg += `\n*Note:* ${customQuery.trim()}\n`;
    }

    return msg;
  };

  const handleSendWhatsApp = () => {
    const text = generateMessage();
    const encoded = encodeURIComponent(text);
    const url = `https://wa.me/${whatsappClean}?text=${encoded}`;
    window.open(url, '_blank');
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(generateMessage());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div
        id="whatsapp-support-modal"
        className="relative w-full max-w-lg bg-[#121212] border-2 border-[#25D366] rounded-lg shadow-2xl text-white overflow-hidden my-6"
      >
        {/* Top WhatsApp Banner */}
        <div className="bg-gradient-to-r from-[#0d1e13] to-[#122e1c] p-4 sm:p-5 border-b border-[#25D366]/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#25D366] text-black flex items-center justify-center font-bold">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white leading-tight">
                WhatsApp VIP Concierge
              </h3>
              <p className="text-[11px] text-emerald-300 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
                Official Live Representative: {whatsappNumber}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#222] text-[#71717a] hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
          {/* Inquiry Options */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#a1a1aa] block mb-1.5">
              Select Assistance Request:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setInquiryType('quick-order')}
                className={`p-2.5 rounded-sm border text-left flex items-center gap-2 transition-all ${
                  inquiryType === 'quick-order'
                    ? 'border-[#25D366] bg-[#14291c] text-white font-bold'
                    : 'border-[#333] bg-[#171717] text-[#a1a1aa]'
                }`}
              >
                <Package className="w-4 h-4 text-[#25D366]" />
                <span>1-Click Order Placement</span>
              </button>

              <button
                type="button"
                onClick={() => setInquiryType('wholesale')}
                className={`p-2.5 rounded-sm border text-left flex items-center gap-2 transition-all ${
                  inquiryType === 'wholesale'
                    ? 'border-[#25D366] bg-[#14291c] text-white font-bold'
                    : 'border-[#333] bg-[#171717] text-[#a1a1aa]'
                }`}
              >
                <Building2 className="w-4 h-4 text-[#25D366]" />
                <span>Salon Wholesale Rates</span>
              </button>

              <button
                type="button"
                onClick={() => setInquiryType('tracking')}
                className={`p-2.5 rounded-sm border text-left flex items-center gap-2 transition-all ${
                  inquiryType === 'tracking'
                    ? 'border-[#25D366] bg-[#14291c] text-white font-bold'
                    : 'border-[#333] bg-[#171717] text-[#a1a1aa]'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-[#25D366]" />
                <span>Live Order Tracking</span>
              </button>

              <button
                type="button"
                onClick={() => setInquiryType('product-advice')}
                className={`p-2.5 rounded-sm border text-left flex items-center gap-2 transition-all ${
                  inquiryType === 'product-advice'
                    ? 'border-[#25D366] bg-[#14291c] text-white font-bold'
                    : 'border-[#333] bg-[#171717] text-[#a1a1aa]'
                }`}
              >
                <Sparkles className="w-4 h-4 text-[#25D366]" />
                <span>Hair &amp; Shade Advice</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] uppercase font-bold text-[#a1a1aa] block mb-1">Your Name</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Bilal Ahmed"
                className="w-full bg-[#181818] border border-[#333] p-2 text-xs rounded text-white outline-none focus:border-[#25D366]"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-[#a1a1aa] block mb-1">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Karachi, Lahore, etc."
                className="w-full bg-[#181818] border border-[#333] p-2 text-xs rounded text-white outline-none focus:border-[#25D366]"
              />
            </div>
          </div>

          {inquiryType === 'tracking' && (
            <div>
              <label className="text-[10px] uppercase font-bold text-[#a1a1aa] block mb-1">
                Order Tracking Code (e.g. HOA-PK-84920)
              </label>
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="HOA-PK-XXXXX"
                className="w-full bg-[#181818] border border-[#333] p-2 text-xs rounded text-white outline-none focus:border-[#25D366] font-mono"
              />
            </div>
          )}

          <div>
            <label className="text-[10px] uppercase font-bold text-[#a1a1aa] block mb-1">
              Custom Notes or Special Delivery Instructions
            </label>
            <textarea
              value={customQuery}
              onChange={(e) => setCustomQuery(e.target.value)}
              placeholder="Ask about shade matching, salon discounts, or shipping time..."
              rows={2}
              className="w-full bg-[#181818] border border-[#333] p-2 text-xs rounded text-white outline-none focus:border-[#25D366]"
            />
          </div>

          {/* Formatted Message Preview */}
          <div>
            <div className="flex justify-between items-center text-[10px] uppercase font-bold text-[#71717a] mb-1">
              <span>Prepared WhatsApp Message:</span>
              <button
                type="button"
                onClick={handleCopyMessage}
                className="text-[#25D366] hover:underline flex items-center gap-1"
              >
                {isCopied ? <Check className="w-3 h-3" /> : null}
                <span>{isCopied ? 'Copied' : 'Copy Text'}</span>
              </button>
            </div>
            <pre className="p-3 bg-[#0d0d0d] border border-[#262626] rounded text-[11px] text-[#a1a1aa] whitespace-pre-wrap font-mono max-h-28 overflow-y-auto">
              {generateMessage()}
            </pre>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2">
            <button
              id="send-whatsapp-btn"
              type="button"
              onClick={handleSendWhatsApp}
              className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold py-3 px-4 text-xs uppercase tracking-wider rounded-sm flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Open WhatsApp &amp; Send Message</span>
            </button>
          </div>

          <div className="text-[10px] text-center text-[#71717a] flex items-center justify-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#25D366]" />
            <span>Direct WhatsApp order line verified by The House of Aura management</span>
          </div>
        </div>
      </div>
    </div>
  );
};
