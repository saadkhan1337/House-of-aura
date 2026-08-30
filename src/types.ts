export type CategoryType = 'All' | 'Hair Care' | 'Arabian Bakhoor' | 'Fragrances' | 'Cosmetics' | 'Salon Deals' | 'Salon Wholesale';

export type TagType = 'Bestseller' | 'Dubai Import' | 'Limited Stock' | 'Salon Exclusive' | 'Organic Infused' | 'Trending';

export interface ProductVariety {
  id: string;
  name: string;
  type: 'shade' | 'scent' | 'size' | 'flavor' | 'pack';
  hexColor?: string;
  inStock: boolean;
  stockQty: number;
  badge?: string;
  image?: string;
}

export interface PricingTier {
  retailPrice: number; // in PKR
  originalPrice?: number; // for discount strikethrough
  bundleDiscountPrice?: number; // buy 2+ save
  wholesalePrice?: number; // for salon owners or bulk
  minWholesaleQty: number; // min qty for wholesale rate
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'Hair Care' | 'Fragrances' | 'Cosmetics' | 'Salon Wholesale';
  displayCategoryTab: CategoryType[];
  description: string;
  usp: string[];
  rating: number;
  reviewCount: number;
  featured: boolean;
  featuredRank?: number; // 1: Apple Hair Color, 2: Cosmo Shampoo, 3: Bakhoor Hamidi
  image: string;
  galleryImages: string[];
  varieties: ProductVariety[];
  pricing: PricingTier;
  tags: TagType[];
  origin: string; // e.g. "Dubai, United Arab Emirates"
  volumeOrWeight: string; // e.g. "500ml", "40g Tablets", "100ml EDP"
  howToUse: string;
  ingredients: string;
}

export interface CartItem {
  id: string; // cart item unique id: `${productId}-${varietyId}`
  product: Product;
  selectedVariety: ProductVariety;
  quantity: number;
  appliedUnitPrice: number;
  isWholesaleApplied: boolean;
}

export type AccountType = 'retail' | 'wholesale';

export interface SavedAddress {
  id: string;
  title: string; // e.g. "Home", "Salon / Studio", "Work"
  fullName: string;
  phone: string;
  addressLine: string;
  city: string;
  province: string;
  postalCode?: string;
  isDefault?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  accountType: AccountType;
  salonName?: string;
  savedAddresses: SavedAddress[];
  createdAt: string;
}

export type OrderStatus = 'Processing' | 'Verified' | 'Shipped from Hub' | 'Out for Delivery' | 'Delivered';

export interface OrderItem {
  productId: string;
  productName: string;
  varietyName: string;
  varietyType: string;
  image: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  isWholesale: boolean;
}

export interface Order {
  id: string; // e.g. "HOA-PK-84920"
  createdAt: string;
  items: OrderItem[];
  customer: {
    fullName: string;
    email: string;
    phone: string;
    accountType: AccountType;
  };
  shippingAddress: {
    addressLine: string;
    city: string;
    province: string;
    postalCode?: string;
  };
  paymentMethod: 'Cash on Delivery (COD)' | 'Online Bank / EasyPaisa' | 'Credit/Debit Card';
  paymentStatus: 'Pending (Pay on Delivery)' | 'Paid Verified';
  status: OrderStatus;
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  totalAmount: number;
  appliedCoupon?: string;
  notes?: string;
  estimatedDelivery: string;
  trackingCourier: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message?: string;
}
