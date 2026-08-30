import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductVariety, CartItem, User, SavedAddress, Order, CategoryType, TagType, ToastMessage, AccountType } from '../types';
import { INITIAL_PRODUCTS } from '../data/products';
import { generateOrderTrackingCode, sanitizeInput } from '../utils/security';

interface StoreContextType {
  products: Product[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: CategoryType;
  setSelectedCategory: (c: CategoryType) => void;
  activeTagFilter: TagType | 'All';
  setActiveTagFilter: (t: TagType | 'All') => void;
  filteredProducts: Product[];
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, variety?: ProductVariety, qty?: number) => void;
  updateCartQuantity: (cartItemId: string, newQty: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemCount: number;
  cartWholesaleSavings: number;
  freeShippingThreshold: number;
  freeShippingProgress: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // Auth & Profile
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string, rememberMe?: boolean) => Promise<boolean>;
  signup: (userData: { name: string; email: string; phone: string; password?: string; accountType: AccountType; salonName?: string }) => Promise<boolean>;
  loginAsGuest: (name: string, email: string, phone: string) => User;
  googleLogin: () => Promise<boolean>;
  logout: () => void;
  savedAddresses: SavedAddress[];
  addSavedAddress: (address: Omit<SavedAddress, 'id'>) => void;
  deleteSavedAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  orders: Order[];
  createOrder: (orderPayload: {
    customer: { fullName: string; email: string; phone: string; accountType: AccountType };
    shippingAddress: { addressLine: string; city: string; province: string; postalCode?: string };
    paymentMethod: 'Cash on Delivery (COD)' | 'Online Bank / EasyPaisa' | 'Credit/Debit Card';
    notes?: string;
    appliedCoupon?: string;
  }) => Order;

  // Toasts
  toasts: ToastMessage[];
  showToast: (type: ToastMessage['type'], title: string, message?: string) => void;
  removeToast: (id: string) => void;

  // Modal Controls
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalTab: 'login' | 'signup';
  setAuthModalTab: (tab: 'login' | 'signup') => void;
  isProfileOpen: boolean;
  setIsProfileOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  selectedProductModal: Product | null;
  setSelectedProductModal: (p: Product | null) => void;
  activeOrderConfirmation: Order | null;
  setActiveOrderConfirmation: (o: Order | null) => void;
  viewingEmailSimulation: Order | null;
  setViewingEmailSimulation: (o: Order | null) => void;
  whatsAppModalItem: { product: Product; variety: ProductVariety } | null;
  setWhatsAppModalItem: (item: { product: Product; variety: ProductVariety } | null) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 3500;

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');
  const [activeTagFilter, setActiveTagFilter] = useState<TagType | 'All'>('All');

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('hoa_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
      return [];
    } catch {
      return [];
    }
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('hoa_wishlist');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
      return [];
    } catch {
      return [];
    }
  });

  // Auth User
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('hoa_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object' && parsed.id) {
          return {
            ...parsed,
            savedAddresses: Array.isArray(parsed.savedAddresses) ? parsed.savedAddresses : []
          };
        }
      }
      return null;
    } catch {
      return null;
    }
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('hoa_orders');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return [
      {
        id: 'HOA-PK-78219',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        items: [
          {
            productId: 'apple-hair-color-shampoo',
            productName: 'Apple Instant 5-Minute Herbal Hair Color Shampoo',
            varietyName: 'Natural Black (#01)',
            varietyType: 'shade',
            image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80',
            quantity: 2,
            unitPrice: 1750,
            totalPrice: 3500,
            isWholesale: false
          }
        ],
        customer: {
          fullName: 'Fatima Al-Zahra',
          email: 'fatima.zahra@example.com',
          phone: '03001234567',
          accountType: 'retail'
        },
        shippingAddress: {
          addressLine: 'House 44, Street 12, Phase 6 DHA',
          city: 'Lahore',
          province: 'Punjab',
          postalCode: '54000'
        },
        paymentMethod: 'Cash on Delivery (COD)',
        paymentStatus: 'Pending (Pay on Delivery)',
        status: 'Shipped from Hub',
        subtotal: 3500,
        shippingFee: 0,
        discountAmount: 0,
        totalAmount: 3500,
        estimatedDelivery: 'Tomorrow afternoon',
        trackingCourier: 'TCS Express Pakistan'
      }
    ];
  });

  // Saved Addresses
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>(() => {
    try {
      const saved = localStorage.getItem('hoa_addresses');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return [
      {
        id: 'addr-1',
        title: 'Primary Residence',
        fullName: 'Fatima Al-Zahra',
        phone: '03001234567',
        addressLine: 'House 44, Street 12, Phase 6 DHA',
        city: 'Lahore',
        province: 'Punjab',
        postalCode: '54000',
        isDefault: true
      }
    ];
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Modal Controls
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'signup'>('login');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProductModal, setSelectedProductModal] = useState<Product | null>(null);
  const [activeOrderConfirmation, setActiveOrderConfirmation] = useState<Order | null>(null);
  const [viewingEmailSimulation, setViewingEmailSimulation] = useState<Order | null>(null);
  const [whatsAppModalItem, setWhatsAppModalItem] = useState<{ product: Product; variety: ProductVariety } | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('hoa_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('hoa_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('hoa_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('hoa_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('hoa_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('hoa_addresses', JSON.stringify(savedAddresses));
  }, [savedAddresses]);

  // Toast Helper
  const showToast = (type: ToastMessage['type'], title: string, message?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Filtered Products Logic
  const filteredProducts = (products || []).filter((product) => {
    if (!product) return false;
    // Category match
    const matchesCategory =
      selectedCategory === 'All' ||
      product.category === selectedCategory ||
      (Array.isArray(product.displayCategoryTab) && product.displayCategoryTab.includes(selectedCategory));

    // Tag match
    const matchesTag =
      activeTagFilter === 'All' || (Array.isArray(product.tags) && product.tags.includes(activeTagFilter));

    // Search query match
    const cleanQuery = (searchQuery || '').trim().toLowerCase();
    const matchesSearch =
      !cleanQuery ||
      (product.name && product.name.toLowerCase().includes(cleanQuery)) ||
      (product.subtitle && product.subtitle.toLowerCase().includes(cleanQuery)) ||
      (product.category && product.category.toLowerCase().includes(cleanQuery)) ||
      (Array.isArray(product.varieties) && product.varieties.some((v) => v?.name && v.name.toLowerCase().includes(cleanQuery))) ||
      (Array.isArray(product.usp) && product.usp.some((u) => u && u.toLowerCase().includes(cleanQuery)));

    return matchesCategory && matchesTag && matchesSearch;
  });

  // Calculate Cart Pricing with wholesale tier detection
  const isWholesaleUser = user?.accountType === 'wholesale';

  const cartCalculations = (cart || [])
    .filter((item) => item && item.product && item.product.pricing)
    .map((item) => {
      const product = item.product;
      const minQty = product.pricing?.minWholesaleQty || 5;
      const isWholesaleQty = item.quantity >= minQty;
      const isEligibleWholesale = isWholesaleUser || isWholesaleQty;

      let appliedUnitPrice = product.pricing?.retailPrice || 0;
      let isWholesale = false;

      if (isEligibleWholesale && product.pricing?.wholesalePrice) {
        appliedUnitPrice = product.pricing.wholesalePrice;
        isWholesale = true;
      } else if (item.quantity >= 2 && product.pricing?.bundleDiscountPrice) {
        appliedUnitPrice = product.pricing.bundleDiscountPrice;
      }

      const selectedVariety = item.selectedVariety || (product.varieties && product.varieties[0]) || {
        id: 'default',
        name: 'Standard',
        type: 'shade',
        inStock: true,
        stockQty: 10
      };

      return {
        ...item,
        selectedVariety,
        appliedUnitPrice,
        isWholesaleApplied: isWholesale
      };
    });

  const cartTotal = cartCalculations.reduce(
    (sum, item) => sum + (item.appliedUnitPrice || 0) * (item.quantity || 1),
    0
  );

  const cartItemCount = (cart || []).reduce((sum, item) => sum + (item?.quantity || 1), 0);

  const standardTotalWithoutDiscounts = (cart || []).reduce(
    (sum, item) => sum + (item?.product?.pricing?.retailPrice || 0) * (item?.quantity || 1),
    0
  );

  const cartWholesaleSavings = Math.max(0, standardTotalWithoutDiscounts - cartTotal);

  const freeShippingProgress = Math.min(100, Math.round((cartTotal / FREE_SHIPPING_THRESHOLD) * 100));

  // Cart operations
  const addToCart = (product: Product, variety?: ProductVariety, qty: number = 1) => {
    const defaultVariety: ProductVariety = product.varieties?.[0] || {
      id: 'default',
      name: 'Standard',
      type: 'shade',
      inStock: true,
      stockQty: 10
    };
    const chosenVariety = variety || defaultVariety;
    const cartItemId = `${product.id}-${chosenVariety.id}`;

    setCart((prev) => {
      const safePrev = Array.isArray(prev) ? prev : [];
      const existing = safePrev.find((item) => item.id === cartItemId);
      if (existing) {
        return safePrev.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [
        ...safePrev,
        {
          id: cartItemId,
          product,
          selectedVariety: chosenVariety,
          quantity: qty,
          appliedUnitPrice: product.pricing?.retailPrice || 0,
          isWholesaleApplied: false
        }
      ];
    });

    showToast(
      'success',
      'Added to Aura Shopping Bag',
      `${product.name} (${chosenVariety.name}) x${qty}`
    );
  };

  const updateCartQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      (prev || []).map((item) =>
        item.id === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const removeFromCart = (cartItemId: string) => {
    const item = (cart || []).find((i) => i.id === cartItemId);
    setCart((prev) => (prev || []).filter((i) => i.id !== cartItemId));
    if (item) {
      showToast('info', 'Removed from Bag', item.product?.name);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    const safeWishlist = Array.isArray(wishlist) ? wishlist : [];
    const exists = safeWishlist.includes(productId);
    const product = (products || []).find((p) => p.id === productId);
    if (exists) {
      setWishlist((prev) => (prev || []).filter((id) => id !== productId));
      showToast('info', 'Removed from Wishlist', product?.name);
    } else {
      setWishlist((prev) => [...(prev || []), productId]);
      showToast('success', 'Saved to Wishlist ❤️', product?.name);
    }
  };

  const isWishlisted = (productId: string) => (wishlist || []).includes(productId);

  // Authentication operations
  const login = async (email: string, password?: string, rememberMe: boolean = true) => {
    const cleanEmail = sanitizeInput(email);
    // Simulated sleek authentication
    const mockUser: User = {
      id: 'usr_' + Math.random().toString(36).substring(2, 9),
      name: cleanEmail.split('@')[0].replace('.', ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
      email: cleanEmail,
      phone: '03001234567',
      accountType: cleanEmail.includes('salon') || cleanEmail.includes('wholesale') ? 'wholesale' : 'retail',
      salonName: cleanEmail.includes('salon') ? 'Aura Elite Hair & Spa Studio' : undefined,
      savedAddresses: savedAddresses,
      createdAt: new Date().toISOString()
    };
    setUser(mockUser);
    showToast('success', 'Login Successful', `Welcome back, ${mockUser.name}!`);
    return true;
  };

  const signup = async (userData: {
    name: string;
    email: string;
    phone: string;
    password?: string;
    accountType: AccountType;
    salonName?: string;
  }) => {
    const newUser: User = {
      id: 'usr_' + Math.random().toString(36).substring(2, 9),
      name: sanitizeInput(userData.name),
      email: sanitizeInput(userData.email),
      phone: sanitizeInput(userData.phone),
      accountType: userData.accountType,
      salonName: userData.salonName ? sanitizeInput(userData.salonName) : undefined,
      savedAddresses: [],
      createdAt: new Date().toISOString()
    };
    setUser(newUser);
    showToast('success', 'Account Created Successfully', `Welcome to The House of Aura, ${newUser.name}!`);
    return true;
  };

  const loginAsGuest = (name: string, email: string, phone: string): User => {
    const guestUser: User = {
      id: 'guest_' + Math.random().toString(36).substring(2, 9),
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      phone: sanitizeInput(phone),
      accountType: 'retail',
      savedAddresses: [],
      createdAt: new Date().toISOString()
    };
    return guestUser;
  };

  const googleLogin = async () => {
    const mockGoogleUser: User = {
      id: 'usr_g_' + Math.random().toString(36).substring(2, 9),
      name: 'Sarah Khan',
      email: 'sarah.khan@gmail.com',
      phone: '03219876543',
      accountType: 'retail',
      savedAddresses: savedAddresses,
      createdAt: new Date().toISOString()
    };
    setUser(mockGoogleUser);
    showToast('success', 'Google 1-Click Login Connected', `Signed in as ${mockGoogleUser.email}`);
    return true;
  };

  const logout = () => {
    setUser(null);
    showToast('info', 'Logged Out', 'You have been signed out successfully.');
  };

  // Address operations
  const addSavedAddress = (addrData: Omit<SavedAddress, 'id'>) => {
    const newAddr: SavedAddress = {
      ...addrData,
      id: 'addr-' + Math.random().toString(36).substring(2, 7),
      fullName: sanitizeInput(addrData.fullName),
      phone: sanitizeInput(addrData.phone),
      addressLine: sanitizeInput(addrData.addressLine),
      city: sanitizeInput(addrData.city),
      province: sanitizeInput(addrData.province),
      postalCode: addrData.postalCode ? sanitizeInput(addrData.postalCode) : undefined
    };
    setSavedAddresses((prev) => [newAddr, ...prev]);
    showToast('success', 'Address Saved', `${newAddr.title} added to your delivery profiles.`);
  };

  const deleteSavedAddress = (id: string) => {
    setSavedAddresses((prev) => prev.filter((a) => a.id !== id));
    showToast('info', 'Address Deleted');
  };

  const setDefaultAddress = (id: string) => {
    setSavedAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id }))
    );
    showToast('success', 'Default Delivery Address Updated');
  };

  // Order Creation
  const createOrder = (orderPayload: {
    customer: { fullName: string; email: string; phone: string; accountType: AccountType };
    shippingAddress: { addressLine: string; city: string; province: string; postalCode?: string };
    paymentMethod: 'Cash on Delivery (COD)' | 'Online Bank / EasyPaisa' | 'Credit/Debit Card';
    notes?: string;
    appliedCoupon?: string;
  }): Order => {
    const trackingId = generateOrderTrackingCode();
    const isFreeShip = cartTotal >= FREE_SHIPPING_THRESHOLD;
    const shippingFee = isFreeShip ? 0 : 250;
    const totalAmount = cartTotal + shippingFee;

    const newOrder: Order = {
      id: trackingId,
      createdAt: new Date().toISOString(),
      items: cartCalculations.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        varietyName: item.selectedVariety.name,
        varietyType: item.selectedVariety.type,
        image: item.product.image,
        quantity: item.quantity,
        unitPrice: item.appliedUnitPrice,
        totalPrice: item.appliedUnitPrice * item.quantity,
        isWholesale: item.isWholesaleApplied
      })),
      customer: {
        fullName: sanitizeInput(orderPayload.customer.fullName),
        email: sanitizeInput(orderPayload.customer.email),
        phone: sanitizeInput(orderPayload.customer.phone),
        accountType: orderPayload.customer.accountType
      },
      shippingAddress: {
        addressLine: sanitizeInput(orderPayload.shippingAddress.addressLine),
        city: sanitizeInput(orderPayload.shippingAddress.city),
        province: sanitizeInput(orderPayload.shippingAddress.province),
        postalCode: orderPayload.shippingAddress.postalCode ? sanitizeInput(orderPayload.shippingAddress.postalCode) : undefined
      },
      paymentMethod: orderPayload.paymentMethod,
      paymentStatus: orderPayload.paymentMethod === 'Cash on Delivery (COD)' ? 'Pending (Pay on Delivery)' : 'Paid Verified',
      status: 'Verified',
      subtotal: cartTotal,
      shippingFee,
      discountAmount: cartWholesaleSavings,
      totalAmount,
      appliedCoupon: orderPayload.appliedCoupon,
      notes: orderPayload.notes ? sanitizeInput(orderPayload.notes) : undefined,
      estimatedDelivery: 'Within 2-3 Business Days via Express Courier',
      trackingCourier: 'TCS / Leopards Express'
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setActiveOrderConfirmation(newOrder);
    setIsCheckoutOpen(false);

    showToast(
      'success',
      `Order Confirmed (${newOrder.id})`,
      'Receipt and tracking dispatched to ' + newOrder.customer.email
    );

    return newOrder;
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        activeTagFilter,
        setActiveTagFilter,
        filteredProducts,
        cart: cartCalculations,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        cartItemCount,
        cartWholesaleSavings,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        freeShippingProgress,
        wishlist,
        toggleWishlist,
        isWishlisted,
        user,
        isAuthenticated: !!user,
        login,
        signup,
        loginAsGuest,
        googleLogin,
        logout,
        savedAddresses,
        addSavedAddress,
        deleteSavedAddress,
        setDefaultAddress,
        orders,
        createOrder,
        toasts,
        showToast,
        removeToast,
        isCartOpen,
        setIsCartOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        isProfileOpen,
        setIsProfileOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        selectedProductModal,
        setSelectedProductModal,
        activeOrderConfirmation,
        setActiveOrderConfirmation,
        viewingEmailSimulation,
        setViewingEmailSimulation,
        whatsAppModalItem,
        setWhatsAppModalItem
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
