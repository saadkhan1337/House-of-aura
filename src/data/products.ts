import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'hoa-apple-hair-color',
    name: 'Apple Ammonia-Free Black Hair Cream (500ml + 500ml Jumbo Kit)',
    subtitle: '500ml + 500ml Jumbo Value Pack • Zero Towel & Scalp Stains',
    category: 'Hair Care',
    displayCategoryTab: ['All', 'Hair Care'],
    description: 'Pure herbal formulation from Dubai. 100% grey hair coverage with zero scalp irritation, infused with fresh green apple extracts for lasting gloss and fragrance.',
    usp: [
      '500ml + 500ml Jumbo Dual-Bottle Value Pack',
      'Clear Water Type: Zero Stains on Scalp or Clothes',
      '96 Hours Long Lasting Diamond Shine & Fragrance',
      '100% Ammonia-Free & PPD-Safe Scalp Comfort'
    ],
    rating: 4.95,
    reviewCount: 489,
    featured: true,
    featuredRank: 1,
    image: '/images/studio_variants/studio_apple_pouch_500ml_front.jpg',
    galleryImages: [
      '/images/studio_variants/studio_apple_pouch_500ml_front.jpg',
      '/images/studio_variants/studio_apple_pouch_500ml_back.jpg'
    ],
    varieties: [
      {
        id: 'var-natural-black-1',
        name: '1.0 Natural Black',
        type: 'shade',
        hexColor: '#0c0c0c',
        inStock: true,
        stockQty: 85,
        badge: 'Top Shade'
      },
      {
        id: 'var-dark-brown-3',
        name: '3.0 Dark Brown',
        type: 'shade',
        hexColor: '#301e14',
        inStock: true,
        stockQty: 60,
        badge: 'Bestseller'
      },
      {
        id: 'var-chocolate-4-3',
        name: '4.3 Chocolate',
        type: 'shade',
        hexColor: '#4a2d18',
        inStock: true,
        stockQty: 40,
        badge: 'Popular'
      }
    ],
    pricing: {
      retailPrice: 2499,
      originalPrice: 3800,
      bundleDiscountPrice: 4499,
      wholesalePrice: 1750,
      minWholesaleQty: 6
    },
    tags: ['Bestseller', 'Jumbo 500ml+500ml', 'Clear Water Type', 'Ammonia Free'],
    origin: 'Italian Technology • Dubai Bottled',
    volumeOrWeight: '1000ml Total (500ml + 500ml)',
    howToUse: 'Mix Colorant and Developer in 1:1 ratio. Apply evenly to dry hair from roots to ends. Leave for 15-20 minutes, then rinse thoroughly with clear water.',
    ingredients: 'Pyrus Malus (Apple) Fruit Extract, Cold-Pressed Moroccan Argan Oil, Hydrolyzed Keratin Peptides, Ascorbic Acid, Fragrance, Dubai Ultra-Pure Water.'
  },
  {
    id: 'hoa-cosmo-shampoo',
    name: 'COSMO Keratin & Argan Anti-Hair Fall Shampoo (1000ml Jumbo Size)',
    subtitle: 'Sulfate & Paraben Free • Anti-Hair Fall & Keratin Repair • Straight & Shiny Hair',
    category: 'Hair Care',
    displayCategoryTab: ['All', 'Hair Care'],
    description: 'Imported from UAE, Cosmo Keratin Shampoo is enriched with hydrolyzed keratin protein and pure Moroccan argan oil. Specially designed to eliminate frizz, restore split ends, strengthen follicles against breakage, and keep hair silky straight for 72 hours.',
    usp: [
      '1000ml Professional Salon Dispenser Pump Bottle',
      '100% Sulfate & Paraben Free Clean Formula',
      'Anti-Hair Fall & Active Keratin Moisture Lock',
      'Delivers Straight, Glossy & Silky Smooth Texture'
    ],
    rating: 4.88,
    reviewCount: 374,
    featured: true,
    featuredRank: 2,
    image: '/images/cosmo_keratin_shampoo_3d_unified.jpg',
    galleryImages: [
      '/images/cosmo_keratin_shampoo_3d_unified.jpg',
      '/images/cosmo_keratin_shampoo_1000ml.jpg',
      '/images/cosmo_shampoo.png'
    ],
    varieties: [
      {
        id: 'var-cosmo-1000ml',
        name: '1000ml Salon Pump Bottle',
        type: 'size',
        hexColor: '#d4af37',
        inStock: true,
        stockQty: 95,
        badge: 'Salon Size'
      }
    ],
    pricing: {
      retailPrice: 1970,
      originalPrice: 4800,
      bundleDiscountPrice: 3000,
      wholesalePrice: 1450,
      minWholesaleQty: 6
    },
    tags: ['Azaadi Sale 59% OFF', '1000ml Salon Bottle', 'Sulfate Free', 'Anti-Hair Fall'],
    origin: 'Sharjah Free Zone, UAE',
    volumeOrWeight: '1000ml Salon Pump Bottle',
    howToUse: 'Pump generous amount into hands, massage deeply into scalp and wet hair for 2-3 minutes to activate keratin therapy, then rinse with cool water.',
    ingredients: 'Aqua, Hydrolyzed Keratin Protein, Biotin, Argania Spinosa Kernel Oil, Panthenol (Pro-Vitamin B5), Citric Acid, Natural Essential Oils.'
  },
  {
    id: 'hoa-bakhoor-hamidi',
    name: 'Hamidi Royal Arabian Bakhoor (Airtight Crystal & Gold Jar)',
    subtitle: 'Authentic Emirati Agarwood & Pure Attar Soak • 48-Hour Lingering Palace Aroma',
    category: 'Fragrances',
    displayCategoryTab: ['All', 'Arabian Bakhoor', 'Fragrances'],
    description: 'The definitive royal incense collection from Hamidi Dubai. Each airtight jar contains aged Cambodian agarwood chips deeply infused with rare floral attars, pure ambergris, and Taif rose. Ideal for burning on traditional charcoal mabkharas or electric burners.',
    usp: [
      'Airtight Crystal Glass Jar with Golden Luxury Seal',
      'Real Cambodian Agarwood Soaked in Pure Oud Oils',
      '48+ Hours Lingering Fragrance Throw in Rooms & Fabrics',
      'Ideal for Homes, Offices & Luxury Salons'
    ],
    rating: 4.97,
    reviewCount: 520,
    featured: true,
    featuredRank: 3,
    image: '/images/bakhoor_hamidi_3d_unified.jpg',
    galleryImages: [
      '/images/bakhoor_hamidi_3d_unified.jpg',
      '/images/bakhoor_hamidi_8flavours.jpg',
      '/images/hamidi_bakhoor.png'
    ],
    varieties: [
      {
        id: 'var-hamidi-black-oud',
        name: 'Bakhoor Black Oud (Intense Smokey Agarwood)',
        type: 'scent',
        hexColor: '#1a1a1a',
        inStock: true,
        stockQty: 40,
        badge: 'Top Oud'
      },
      {
        id: 'var-hamidi-sheikha',
        name: 'Bakhoor Sheikha (Royal Floral Amber)',
        type: 'scent',
        hexColor: '#d4af37',
        inStock: true,
        stockQty: 35,
        badge: 'Bestseller'
      },
      {
        id: 'var-hamidi-oud-sharqia',
        name: 'Bakhoor Oud Sharqia (Warm Spicy Oriental)',
        type: 'scent',
        hexColor: '#b85d19',
        inStock: true,
        stockQty: 30
      },
      {
        id: 'var-hamidi-al-zuhur',
        name: 'Bakhoor Al Zuhur (Fresh Arabian Florals)',
        type: 'scent',
        hexColor: '#c97a8e',
        inStock: true,
        stockQty: 25
      },
      {
        id: 'var-hamidi-bayt-al-oud',
        name: 'Bakhoor Bayt Al Oud (Deep Woody Heritage)',
        type: 'scent',
        hexColor: '#4a2e1b',
        inStock: true,
        stockQty: 30
      },
      {
        id: 'var-hamidi-khalifa',
        name: 'Bakhoor Khalifa (Imperial Amber & Musk)',
        type: 'scent',
        hexColor: '#966d3b',
        inStock: true,
        stockQty: 28
      },
      {
        id: 'var-hamidi-oud-abiyad',
        name: 'Bakhoor Oud Abiyad (Velvet White Oud)',
        type: 'scent',
        hexColor: '#e6ded4',
        inStock: true,
        stockQty: 32
      },
      {
        id: 'var-hamidi-oud-maghrib',
        name: 'Bakhoor Oud Maghrib (Exotic Sunset Saffron)',
        type: 'scent',
        hexColor: '#8c3d26',
        inStock: true,
        stockQty: 25
      }
    ],
    pricing: {
      retailPrice: 1999,
      originalPrice: 2800,
      bundleDiscountPrice: 3500,
      wholesalePrice: 1350,
      minWholesaleQty: 8
    },
    tags: ['Dubai Fragrances', 'Royal Incense', 'Agarwood', '8 Scent Varieties', 'Bestseller'],
    origin: 'Deira Perfume Souk, Dubai UAE',
    volumeOrWeight: 'Airtight Crystal & Gold Jar',
    howToUse: 'Place a small piece on heated charcoal or an electric incense burner (mabkhara). Let the aromatic smoke perfume the living area, clothing, and prayer spaces.',
    ingredients: 'Crushed Cambodian Agarwood, Pure Oud Oil, Amber, Taif Rose Attar, Saffron, Sandalwood, Musk, Natural Aromatic Resins.'
  },
  {
    id: 'hoa-dexe-black-hair-shampoo',
    name: 'Dexe Black Hair Color Shampoo (400ml Jumbo Pump Bottle)',
    subtitle: 'Instant 5-Minute Natural Black Color • Herbal Plant Formula • 100% Ammonia-Free',
    category: 'Hair Care',
    displayCategoryTab: ['All', 'Hair Care'],
    description: 'The world-renowned Dexe Black Hair Shampoo transforms white or gray hair to rich, natural black in just 5 minutes. Formulated with herbal plant extracts including Chinese ginseng, black sesame, and argan oil, it deeply nourishes the scalp while providing long-lasting, salon-grade black coverage without staining skin.',
    usp: [
      'Instant Rich Natural Black Hair in Just 5 Minutes',
      '100% Ammonia-Free & PPD-Safe Scalp Nourishing Formula',
      'Easy Shampoo-In Application: Wash, Wait 5 Mins & Rinse',
      'Long-Lasting Up to 30 Days Shine & Fade-Resistant Color'
    ],
    rating: 4.93,
    reviewCount: 418,
    featured: true,
    featuredRank: 4,
    image: '/images/dexe_black_hair_shampoo.jpg',
    galleryImages: [
      '/images/dexe_black_hair_shampoo.jpg'
    ],
    varieties: [
      {
        id: 'var-dexe-black-400ml',
        name: '400ml Natural Black (Salon Dispenser)',
        type: 'shade',
        hexColor: '#0a0a0a',
        inStock: true,
        stockQty: 120,
        badge: 'Natural Black'
      }
    ],
    pricing: {
      retailPrice: 1850,
      originalPrice: 3200,
      bundleDiscountPrice: 3200,
      wholesalePrice: 1250,
      minWholesaleQty: 6
    },
    tags: ['5-Minute Fast Dye', 'Natural Black', 'Ammonia Free', 'Herbal Extract'],
    origin: 'Imported Salon Grade Formula',
    volumeOrWeight: '400ml Salon Pump Dispenser',
    howToUse: 'Wet hair thoroughly and dry slightly with a towel. Wear protective gloves, pump an adequate amount onto palms, mix well, and massage into hair for 5 minutes. Leave on for 5 to 10 minutes, then rinse completely with clean water.',
    ingredients: 'Herbal Ginseng Extract, Black Sesame Extract, Hydrolyzed Keratin, Argania Spinosa Kernel Oil, Pure Water, Natural Color Actives.'
  }
];

export const CATEGORY_TABS = [
  'All',
  'Hair Care',
  'Arabian Bakhoor'
];
