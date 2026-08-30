import React, { useState } from 'react';
import { X, User as UserIcon, Package, MapPin, Heart, LogOut, Building2, Plus, Trash2, CheckCircle2, Truck, ExternalLink, Mail, Phone, Calendar } from 'lucide-react';
import { Order, Product, SavedAddress, User } from '../types';
import { formatPKR } from '../utils/security';

interface CustomerProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  orders: Order[];
  wishlistProducts: Product[];
  onLogout: () => void;
  onSelectProduct: (product: Product) => void;
  onAddAddress: (address: SavedAddress) => void;
  onDeleteAddress: (addressId: string) => void;
  onOpenEmailSimulation: (order: Order) => void;
  onTrackOrder: (order: Order) => void;
}

export const CustomerProfileDrawer: React.FC<CustomerProfileDrawerProps> = ({
  isOpen,
  onClose,
  user,
  orders,
  wishlistProducts,
  onLogout,
  onSelectProduct,
  onAddAddress,
  onDeleteAddress,
  onOpenEmailSimulation,
  onTrackOrder
}) => {
  if (!isOpen || !user) return null;

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'wishlist'>('orders');
  
  // Address form state
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newTitle, setNewTitle] = useState('Home / Apartment');
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('Karachi');
  const [newProvince, setNewProvince] = useState('Sindh');
  const [newPostal, setNewPostal] = useState('');

  const handleSaveNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStreet.trim()) return;

    const newAddr: SavedAddress = {
      id: `addr-${Date.now()}`,
      title: newTitle,
      fullName: user.name,
      phone: user.phone,
      addressLine: newStreet.trim(),
      city: newCity,
      province: newProvince,
      postalCode: newPostal || undefined,
      isDefault: (user.savedAddresses?.length || 0) === 0
    };

    onAddAddress(newAddr);
    setIsAddingAddress(false);
    setNewStreet('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div
          id="customer-profile-drawer"
          className="w-screen max-w-md bg-[#121212] border-l border-[#262626] text-white flex flex-col shadow-2xl"
        >
          {/* Header */}
          <div className="p-5 bg-[#0c0c0c] border-b border-[#262626] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#D4AF37] text-black font-serif font-black text-lg flex items-center justify-center">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-lg font-bold text-white leading-none">{user.name}</h3>
                  {user.accountType === 'wholesale' && (
                    <span className="bg-[#D4AF37] text-black text-[9px] font-black px-2 py-0.5 rounded uppercase">
                      Salon VIP
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#a1a1aa] mt-1">{user.email}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-[#71717a] hover:text-white rounded-full hover:bg-[#1f1f1f]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="grid grid-cols-3 border-b border-[#262626] text-xs font-bold uppercase tracking-wider bg-[#171717]">
            <button
              id="profile-tab-orders"
              onClick={() => setActiveTab('orders')}
              className={`py-3 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                activeTab === 'orders'
                  ? 'border-[#D4AF37] text-[#D4AF37] bg-[#1d1a12]'
                  : 'border-transparent text-[#a1a1aa] hover:text-white'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Orders ({(orders?.length || 0)})</span>
            </button>

            <button
              id="profile-tab-addresses"
              onClick={() => setActiveTab('addresses')}
              className={`py-3 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                activeTab === 'addresses'
                  ? 'border-[#D4AF37] text-[#D4AF37] bg-[#1d1a12]'
                  : 'border-transparent text-[#a1a1aa] hover:text-white'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Addresses ({(user?.savedAddresses?.length || 0)})</span>
            </button>

            <button
              id="profile-tab-wishlist"
              onClick={() => setActiveTab('wishlist')}
              className={`py-3 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                activeTab === 'wishlist'
                  ? 'border-[#D4AF37] text-[#D4AF37] bg-[#1d1a12]'
                  : 'border-transparent text-[#a1a1aa] hover:text-white'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>Wishlist ({(wishlistProducts?.length || 0)})</span>
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {/* TAB 1: PAST ORDERS & TRACKING */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                {(orders?.length || 0) === 0 ? (
                  <div className="text-center py-12 text-[#71717a]">
                    <Package className="w-12 h-12 mx-auto mb-3 opacity-30 text-[#D4AF37]" />
                    <p className="text-sm font-semibold text-white">No Orders Placed Yet</p>
                    <p className="text-xs mt-1">Explore our Dubai collection and make your first luxury purchase.</p>
                  </div>
                ) : (
                  (orders || []).map((order) => (
                    <div
                      key={order.id}
                      id={`order-item-${order.id}`}
                      className="bg-[#181818] border border-[#2e2e2e] rounded-sm p-4 hover:border-[#D4AF37]/50 transition-colors"
                    >
                      <div className="flex items-center justify-between border-b border-[#262626] pb-2.5 mb-3">
                        <div>
                          <div className="text-xs font-mono font-bold text-[#D4AF37]">{order.id}</div>
                          <div className="text-[10px] text-[#71717a] flex items-center gap-1 mt-0.5">
                            <Calendar className="w-3 h-3" />
                            {new Date(order.createdAt).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </div>
                        </div>
                        <span className="bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                          {order.status}
                        </span>
                      </div>

                      {/* Items preview */}
                      <div className="space-y-2 mb-3">
                        {(order?.items || []).map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2.5 text-xs">
                            <img
                              src={item.image}
                              alt={item.productName}
                              className="w-9 h-9 object-cover rounded bg-[#222] border border-[#333]"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-white font-medium truncate">{item.productName}</p>
                              <p className="text-[10px] text-[#a1a1aa]">
                                {item.varietyName} • Qty: {item.quantity}
                              </p>
                            </div>
                            <span className="text-xs font-bold text-white">{formatPKR(item.totalPrice)}</span>
                          </div>
                        ))}
                      </div>

                      {/* Summary & Email Preview Trigger */}
                      <div className="pt-2.5 border-t border-[#262626] flex items-center justify-between text-xs">
                        <div>
                          <span className="text-[11px] text-[#a1a1aa]">Total Paid/COD:</span>
                          <span className="font-bold text-[#D4AF37] ml-1.5">{formatPKR(order.totalAmount)}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onOpenEmailSimulation(order)}
                            className="flex items-center gap-1 text-[11px] text-[#D4AF37] hover:underline font-semibold bg-[#262013] border border-[#D4AF37]/40 px-2 py-1 rounded"
                            title="Preview automated confirmation email sent for this order"
                          >
                            <Mail className="w-3 h-3" />
                            <span>Email Receipt</span>
                          </button>

                          <button
                            onClick={() => onTrackOrder(order)}
                            className="flex items-center gap-1 text-[11px] text-white hover:text-[#D4AF37] font-semibold bg-[#222] border border-[#333] px-2 py-1 rounded"
                          >
                            <Truck className="w-3 h-3" />
                            <span>Live Track</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB 2: SAVED ADDRESSES (1-CLICK AUTOFILL READY) */}
            {activeTab === 'addresses' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#a1a1aa]">Saved addresses auto-fill checkout in 1 click:</span>
                  {!isAddingAddress && (
                    <button
                      onClick={() => setIsAddingAddress(true)}
                      className="text-xs text-[#D4AF37] hover:underline flex items-center gap-1 font-bold"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add New
                    </button>
                  )}
                </div>

                {/* Add Address Form */}
                {isAddingAddress && (
                  <form onSubmit={handleSaveNewAddress} className="p-4 bg-[#181818] border border-[#333] rounded-sm space-y-3">
                    <div className="flex justify-between items-center text-xs font-bold text-white border-b border-[#262626] pb-2">
                      <span>Add Delivery Address</span>
                      <button
                        type="button"
                        onClick={() => setIsAddingAddress(false)}
                        className="text-gray-400 hover:text-white"
                      >
                        Cancel
                      </button>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">
                        Address Nickname
                      </label>
                      <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="e.g. Home, Studio, DHA Office"
                        className="w-full bg-[#111] border border-[#333] p-2 text-xs rounded text-white"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">
                        Complete Street Address
                      </label>
                      <textarea
                        value={newStreet}
                        onChange={(e) => setNewStreet(e.target.value)}
                        placeholder="House / Apartment #, Street #, Sector..."
                        rows={2}
                        required
                        className="w-full bg-[#111] border border-[#333] p-2 text-xs rounded text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">City</label>
                        <select
                          value={newCity}
                          onChange={(e) => setNewCity(e.target.value)}
                          className="w-full bg-[#111] border border-[#333] p-2 text-xs rounded text-white"
                        >
                          <option value="Karachi">Karachi</option>
                          <option value="Lahore">Lahore</option>
                          <option value="Islamabad">Islamabad</option>
                          <option value="Rawalpindi">Rawalpindi</option>
                          <option value="Faisalabad">Faisalabad</option>
                          <option value="Multan">Multan</option>
                          <option value="Peshawar">Peshawar</option>
                          <option value="Quetta">Quetta</option>
                          <option value="Sialkot">Sialkot</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Province</label>
                        <select
                          value={newProvince}
                          onChange={(e) => setNewProvince(e.target.value)}
                          className="w-full bg-[#111] border border-[#333] p-2 text-xs rounded text-white"
                        >
                          <option value="Sindh">Sindh</option>
                          <option value="Punjab">Punjab</option>
                          <option value="Khyber Pakhtunkhwa">KPK</option>
                          <option value="Balochistan">Balochistan</option>
                          <option value="Islamabad Capital">Islamabad ICT</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#D4AF37] text-black font-bold py-2 text-xs uppercase tracking-wider rounded"
                    >
                      Save Address
                    </button>
                  </form>
                )}

                {/* List of saved addresses */}
                {(user?.savedAddresses || []).map((addr) => (
                  <div
                    key={addr.id}
                    className="p-3.5 bg-[#181818] border border-[#2a2a2a] rounded-sm flex items-start justify-between gap-2"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-white">{addr.title}</span>
                        {addr.isDefault && (
                          <span className="bg-emerald-950 text-emerald-300 text-[9px] px-1.5 py-0.2 rounded border border-emerald-800 font-semibold">
                            Primary
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#a1a1aa] mt-1">{addr.addressLine}</p>
                      <p className="text-[11px] text-[#71717a] mt-0.5">
                        {addr.city}, {addr.province} {addr.postalCode ? `(${addr.postalCode})` : ''}
                      </p>
                      <p className="text-[11px] text-[#a1a1aa] mt-1 flex items-center gap-1">
                        <Phone className="w-3 h-3 text-[#D4AF37]" /> {addr.phone}
                      </p>
                    </div>

                    <button
                      onClick={() => onDeleteAddress(addr.id)}
                      className="text-gray-500 hover:text-red-400 p-1"
                      title="Delete Address"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 3: SAVED WISHLIST */}
            {activeTab === 'wishlist' && (
              <div className="space-y-3">
                {(wishlistProducts?.length || 0) === 0 ? (
                  <div className="text-center py-12 text-[#71717a]">
                    <Heart className="w-12 h-12 mx-auto mb-3 opacity-30 text-[#D4AF37]" />
                    <p className="text-sm font-semibold text-white">Your Wishlist is Empty</p>
                    <p className="text-xs mt-1">Tap the heart on any Dubai product to save it for later.</p>
                  </div>
                ) : (
                  (wishlistProducts || []).map((p) => (
                    <div
                      key={p.id}
                      className="p-3 bg-[#181818] border border-[#2a2a2a] rounded-sm flex items-center gap-3 hover:border-[#D4AF37]/50 transition-colors"
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-12 h-12 object-contain rounded bg-[#222] border border-[#333]"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-white truncate">{p.name}</h4>
                        <p className="text-[11px] text-[#a1a1aa] truncate">{p.subtitle}</p>
                        <span className="text-xs font-bold text-[#D4AF37]">{formatPKR(p.pricing?.retailPrice || 0)}</span>
                      </div>
                      <button
                        onClick={() => {
                          onSelectProduct(p);
                          onClose();
                        }}
                        className="bg-[#D4AF37] text-black font-bold text-[11px] px-3 py-1.5 rounded-sm uppercase tracking-wider hover:bg-[#e0bc46]"
                      >
                        View
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Footer Logout */}
          <div className="p-4 bg-[#0c0c0c] border-t border-[#262626] flex items-center justify-between">
            <div className="text-[11px] text-[#71717a]">
              Member ID: <span className="text-[#a1a1aa] font-mono">{user.id.substring(0, 12)}</span>
            </div>
            <button
              id="profile-logout-btn"
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-bold uppercase tracking-wider"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
