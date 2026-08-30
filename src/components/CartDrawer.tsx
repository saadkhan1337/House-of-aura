import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, Sparkles, MessageSquare } from 'lucide-react';
import { CartItem } from '../types';
import { useStore } from '../context/StoreContext';
import { applyCoupon, formatPKR } from '../utils/security';

interface CartDrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
  items?: CartItem[];
  onUpdateQuantity?: (cartItemId: string, newQty: number) => void;
  onRemoveItem?: (cartItemId: string) => void;
  onProceedToCheckout?: () => void;
  onWhatsAppOrder?: (appliedCouponCode?: string) => void;
  appliedCoupon?: string;
  onApplyCoupon?: (code: string) => void;
  onRemoveCoupon?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = (props) => {
  const store = useStore();

  const isOpen = props.isOpen !== undefined ? props.isOpen : store.isCartOpen;
  const onClose = props.onClose || (() => store.setIsCartOpen(false));
  const items = props.items !== undefined ? props.items : store.cart;
  const onUpdateQuantity = props.onUpdateQuantity || store.updateCartQuantity;
  const onRemoveItem = props.onRemoveItem || store.removeFromCart;
  const onProceedToCheckout = props.onProceedToCheckout || (() => {
    store.setIsCartOpen(false);
    store.setIsCheckoutOpen(true);
  });

  const [localCoupon, setLocalCoupon] = useState<string>('');
  const appliedCoupon = props.appliedCoupon !== undefined ? props.appliedCoupon : localCoupon;
  const onApplyCoupon = props.onApplyCoupon || ((code: string) => setLocalCoupon(code));
  const onRemoveCoupon = props.onRemoveCoupon || (() => setLocalCoupon(''));

  const onWhatsAppOrder = props.onWhatsAppOrder || ((couponCode) => {
    store.setIsCartOpen(false);
    const cartList = Array.isArray(items) ? items : Array.isArray(store.cart) ? store.cart : [];
    if (cartList.length > 0 && cartList[0]?.product) {
      store.setWhatsAppModalItem({
        product: cartList[0].product,
        variety: cartList[0].selectedVariety
      });
    }
  });

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  const safeItems = Array.isArray(items) ? items : [];

  // Calculate Subtotal
  const subtotal = safeItems.reduce((acc, item) => {
    const unitPrice = item?.appliedUnitPrice || item?.product?.pricing?.retailPrice || 0;
    const qty = item?.quantity || 1;
    return acc + unitPrice * qty;
  }, 0);

  // Free shipping threshold = PKR 3,500
  const freeShippingThreshold = store.freeShippingThreshold || 3500;
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 250;
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  // Apply coupon calculation
  const couponData = appliedCoupon ? applyCoupon(appliedCoupon, subtotal) : null;
  const discountAmount = couponData?.valid ? couponData.discountAmount : 0;
  const totalAmount = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;

    const result = applyCoupon(couponInput, subtotal);
    if (result.valid) {
      onApplyCoupon(result.code);
      setCouponInput('');
    } else {
      setCouponError('Invalid promo code. Try AURA10 or DUBAI15.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div
          id="shopping-bag-drawer"
          className="w-screen max-w-md bg-[#121212] border-l border-[#262626] text-white flex flex-col shadow-2xl"
        >
          {/* Header */}
          <div className="p-5 bg-[#0c0c0c] border-b border-[#262626] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="font-serif text-lg font-bold text-white uppercase tracking-wider">
                Shopping Bag ({safeItems.reduce((sum, i) => sum + (i?.quantity || 1), 0)})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[#222] text-[#71717a] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-[#181818] p-3 border-b border-[#262626] text-xs">
            <div className="flex justify-between items-center mb-1.5 font-semibold">
              {remainingForFreeShipping === 0 ? (
                <span className="text-emerald-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> FREE 48-Hour Express Shipping Unlocked!
                </span>
              ) : (
                <span className="text-[#a1a1aa]">
                  Add <strong className="text-[#D4AF37]">{formatPKR(remainingForFreeShipping)}</strong> more for Free Shipping
                </span>
              )}
              <span className="text-[10px] text-[#71717a]">{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#262626] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#D4AF37] to-[#e5c158] transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-[#222]">
            {safeItems.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30 text-[#D4AF37]" />
                <p className="text-sm font-serif font-bold text-white">Your Shopping Bag is Empty</p>
                <p className="text-xs text-[#a1a1aa] mt-1 max-w-xs mx-auto">
                  Browse our authentic Dubai hair care, Arabian Bakhoor, and salon collections.
                </p>
              </div>
            ) : (
              safeItems.map((item) => {
                if (!item || !item.product) return null;
                const variety = item.selectedVariety || item.product.varieties?.[0] || {
                  id: 'default',
                  name: 'Standard',
                  type: 'shade',
                  inStock: true,
                  stockQty: 10
                };
                const itemUnitPrice = item.appliedUnitPrice || item.product.pricing?.retailPrice || 0;

                return (
                  <div key={item.id} id={`cart-item-${item.id}`} className="pt-3 first:pt-0 flex gap-3">
                    <img
                      src={variety.image || item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-contain rounded bg-[#1a1a1a] border border-[#2a2a2a] p-1 flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-bold text-white truncate max-w-[170px]">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-gray-500 hover:text-red-400 p-0.5"
                          title="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-[#a1a1aa] mt-0.5 flex items-center gap-1.5">
                        {variety.hexColor && (
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-black/50"
                            style={{ backgroundColor: variety.hexColor }}
                          />
                        )}
                        <span>{variety.name}</span>
                      </div>

                      {item.isWholesaleApplied && (
                        <span className="inline-block text-[9px] bg-amber-950/80 border border-amber-700 text-amber-300 px-1.5 py-0.2 rounded font-bold uppercase mt-1">
                          Wholesale Rate Applied
                        </span>
                      )}

                      {/* Pricing & Quantity Controls */}
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center border border-[#333] bg-[#181818] rounded-sm text-xs">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-0.5 text-[#a1a1aa] hover:text-white font-bold"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-white min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-0.5 text-[#a1a1aa] hover:text-white font-bold"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-bold text-[#D4AF37]">
                            {formatPKR(itemUnitPrice * item.quantity)}
                          </span>
                          {item.quantity > 1 && (
                            <div className="text-[10px] text-[#71717a]">
                              {formatPKR(itemUnitPrice)} ea
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Promo Code & Order Summary Footer */}
          {safeItems.length > 0 && (
            <div className="p-4 bg-[#0c0c0c] border-t border-[#262626] space-y-3">
              {/* Promo Code Input */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-[#191919] border border-[#D4AF37]/50 p-2 rounded-sm text-xs">
                  <div className="flex items-center gap-1.5 text-[#D4AF37]">
                    <Tag className="w-3.5 h-3.5" />
                    <span className="font-bold">{appliedCoupon} Applied</span>
                    <span className="text-[#a1a1aa]">(-{formatPKR(discountAmount)})</span>
                  </div>
                  <button
                    onClick={onRemoveCoupon}
                    className="text-red-400 hover:text-red-300 text-[10px] uppercase font-bold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCouponSubmit} className="space-y-1">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Promo Code (AURA10 / DUBAI15)"
                      className="flex-1 bg-[#181818] border border-[#333] px-3 py-1.5 text-xs text-white uppercase rounded-sm outline-none focus:border-[#D4AF37]"
                    />
                    <button
                      type="submit"
                      className="bg-[#262626] hover:bg-[#333] text-white px-3 py-1.5 text-xs font-bold uppercase rounded-sm border border-[#3a3a3a]"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && <p className="text-[10px] text-red-400">{couponError}</p>}
                </form>
              )}

              {/* Price Calculation Lines */}
              <div className="space-y-1.5 text-xs pt-1">
                <div className="flex justify-between text-[#a1a1aa]">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">{formatPKR(subtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount</span>
                    <span>-{formatPKR(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#a1a1aa]">
                  <span>Delivery (TCS/Leopard Express)</span>
                  <span className="text-white font-medium">
                    {shippingFee === 0 ? <strong className="text-emerald-400 font-bold">FREE</strong> : formatPKR(shippingFee)}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-bold text-white border-t border-[#262626] pt-2">
                  <span>Grand Total</span>
                  <span className="text-[#D4AF37] text-base">{formatPKR(totalAmount)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                {/* Primary Web Checkout */}
                <button
                  id="cart-proceed-checkout-btn"
                  onClick={() => {
                    onClose();
                    onProceedToCheckout();
                  }}
                  className="w-full bg-[#D4AF37] hover:bg-[#e5c158] text-black font-bold py-3 text-xs uppercase tracking-wider rounded-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
                >
                  <span>Proceed to Secure Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* 1-Click WhatsApp Instant Order */}
                <button
                  id="cart-whatsapp-order-btn"
                  onClick={() => {
                    onClose();
                    onWhatsAppOrder(appliedCoupon || undefined);
                  }}
                  className="w-full bg-[#1b2b20] hover:bg-[#23382a] text-[#25D366] border border-[#25D366]/40 font-bold py-2 text-xs uppercase tracking-wider rounded-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>1-Click WhatsApp Quick Order</span>
                </button>
              </div>

              <div className="text-[10px] text-[#71717a] text-center flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
                <span>Cash on Delivery & Open Parcel Inspection Verified</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
