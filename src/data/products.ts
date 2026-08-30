import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'hoa-apple-hair-color',
    name: 'Apple Ammonia-Free Hair Cream (500ml + 500ml Jumbo Value Pack)',
    subtitle: 'Clear Water Type • Zero Stains on Scalp or Clothes • 96 Hours Lasting Shine',
    category: 'Hair Care',
    displayCategoryTab: ['All', 'Hair Care'],
    description: 'A revolutionary salon-grade instant hair coloring system imported directly from Dubai. Formulated with clear water technology to guarantee zero stains on skin or garments, 100% grey coverage in 15 minutes, and 96 hours of radiant diamond shine and delicate fragrance.',
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
    image: '/images/apple_hair_color_3d.jpg',
    galleryImages: [
      '/images/apple_hair_color_3d.jpg',
      '/images/apple_hair_color_jumbo.jpg'
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
        name: '3.0 Dark Velvet Brown',
        type: 'shade',
        hexColor: '#301e14',
        inStock: true,
        stockQty: 60,
        badge: 'Bestseller'
      },
      {
        id: 'var-chocolate-brown-4',
        name: '4.3 Medium Chocolate Brown',
        type: 'shade',
        hexColor: '#4e2f1d',
        inStock: true,
        stockQty: 45
      }
    ],
    pricing: {
      retailPrice: 2499,
      originalPrice: 3800,
      bundleDiscountPrice: 4500, // Pack of 2 Deal
      wholesalePrice: 1850,
      minWholesaleQty: 6
    },
    tags: ['Bestseller', 'Jumbo 500ml+500ml', 'Clear Water Type', 'Ammonia Free'],
    origin: 'Dubai Industrial City, UAE',
    volumeOrWeight: '500ml + 500ml Jumbo Dual Pump Pack',
    howToUse: 'Mix Colorant and Developer in 1:1 ratio. Apply evenly to dry hair from roots to ends. Leave for 15-20 minutes, then rinse thoroughly with clear water.',
    ingredients: 'Pyrus Malus (Apple) Fruit Extract, Cold-Pressed Moroccan Argan Oil, Hydrolyzed Keratin Peptides, Ascorbic Acid, Fragrance, Dubai Ultra-Pure Water.'
  },
  {
    id: 'hoa-cosmo-shampoo',
    name: 'COSMO Hair Naturals - Keratin Shampoo (1000ml Jumbo Size)',
    subtitle: 'Sulfate & Paraben Free • Anti-Hair Fall & Keratin Repair • Straight & Shiny Hair',
    category: 'Hair Care',
    displayCategoryTab: ['All', 'Hair Care'],
    description: 'Imported from UAE, Cosmo Keratin Shampoo is enriched with hydrolyzed keratin protein and vital botanical extracts. Specially designed to eliminate frizz, restore split ends, strengthen follicles against breakage, and keep hair silky straight for 72 hours.',
    usp: [
      '1000ml Jumbo Professional Salon Dispenser Pump',
      '100% Sulfate & Paraben Free Formula',
      'Anti-Hair Fall & Active Keratin Moisture Lock',
      'Delivers Straight, Glossy & Silky Smooth Texture'
    ],
    rating: 4.88,
    reviewCount: 374,
    featured: true,
    featuredRank: 2,
    image: '/images/cosmo_keratin_shampoo_3d.jpg',
    galleryImages: [
      '/images/cosmo_keratin_shampoo_3d.jpg',
      '/images/cosmo_keratin_shampoo_1000ml.jpg'
    ],
    varieties: [
      {
        id: 'var-cosmo-1000ml',
        name: '1000ml Jumbo Salon Dispenser Bottle',
        type: 'size',
        hexColor: '#d4af37',
        inStock: true,
        stockQty: 95,
        badge: 'Jumbo Size'
      }
    ],
    pricing: {
      retailPrice: 1970, // Azaadi Sale Flat 59% OFF
      originalPrice: 4800,
      bundleDiscountPrice: 3000, // Pack of 2 Deal
      wholesalePrice: 1450,
      minWholesaleQty: 6
    },
    tags: ['Azaadi Sale 59% OFF', '1000ml Jumbo Size', 'Sulfate Free', 'Anti-Hair Fall'],
    origin: 'Sharjah Free Zone, UAE',
    volumeOrWeight: '1000ml (1 Litre) Jumbo Pump Bottle',
    howToUse: 'Pump generous amount into hands, massage deeply into scalp and wet hair for 2-3 minutes to activate keratin therapy, then rinse with cool water.',
    ingredients: 'Aqua, Hydrolyzed Keratin Protein, Biotin, Argania Spinosa Kernel Oil, Panthenol (Pro-Vitamin B5), Citric Acid, Natural Essential Oils.'
  },
  {
    id: 'hoa-bakhoor-hamidi',
    name: 'Bakhoor Hamidi — The Art of Scent (8 Arabian Fragrances)',
    subtitle: 'Authentic Emirati Agarwood & Pure Attar Soak • 48-Hour Lingering Palace Aroma',
    category: 'Fragrances',
    displayCategoryTab: ['All', 'Arabian Bakhoor', 'Fragrances'],
    description: 'The definitive royal incense collection from Hamidi Dubai. Each airtight jar contains aged Cambodian agarwood chips deeply infused with rare floral attars, pure ambergris, and Taif rose. Ideal for burning on traditional brass charcoal mabkharas or electric burners.',
    usp: [
      '8 Iconic Dubai Scent Profiles in Airtight Jars',
      'Real Cambodian Agarwood Soaked in Pure Oud Oils',
      '48+ Hours Lingering Fragrance Throw in Rooms & Fabrics',
      'Bundle Deals: Duo (Rs. 3,500), Trio (Rs. 4,300), Full 8-Set (Rs. 8,000)'
    ],
    rating: 4.97,
    reviewCount: 520,
    featured: true,
    featuredRank: 3,
    image: '/images/bakhoor_hamidi_3d.jpg',
    galleryImages: [
      '/images/bakhoor_hamidi_3d.jpg',
      '/images/bakhoor_hamidi_8flavours.jpg'
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
        id: 'var-hamidi-bayt-al-oud',
        name: 'Bakhoor Bayt Al Oud (Deep Woody Heritage)',
        type: 'scent',
        hexColor: '#4a2c11',
        inStock: true,
        stockQty: 28
      },
      {
        id: 'var-hamidi-al-zuhur',
        name: 'Bakhoor Al Zuhur (Fresh Arabian Rose Blossom)',
        type: 'scent',
        hexColor: '#8a2be2',
        inStock: true,
        stockQty: 32
      },
      {
        id: 'var-hamidi-oud-maghrib',
        name: 'Bakhoor Oud Maghrib (Exotic Moroccan Saffron Oud)',
        type: 'scent',
        hexColor: '#008080',
        inStock: true,
        stockQty: 25
      },
      {
        id: 'var-hamidi-khalifa',
        name: 'Bakhoor Khalifa (Regal Velvet Musk)',
        type: 'scent',
        hexColor: '#222222',
        inStock: true,
        stockQty: 30,
        badge: 'Royal Scent'
      },
      {
        id: 'var-hamidi-oud-abiyad',
        name: 'Bakhoor Oud Abiyad (Pure White Cashmere Oud)',
        type: 'scent',
        hexColor: '#e0e0e0',
        inStock: true,
        stockQty: 35
      }
    ],
    pricing: {
      retailPrice: 1999, // Single jar
      originalPrice: 2800,
      bundleDiscountPrice: 3500, // Pack of 2 Deal (Duo)
      wholesalePrice: 1350,
      minWholesaleQty: 8
    },
    tags: ['8 Dubai Fragrances', 'Royal Incense', 'Agarwood', 'Bestseller'],
    origin: 'Deira Perfume Souk, Dubai UAE',
    volumeOrWeight: 'Airtight Glass & Gold Metal Jar with Mabkhara Compatiblity',
    howToUse: 'Place a small spoonful or tablet on heated charcoal or an electric incense burner (mabkhara). Let the aromatic smoke perfume the living area, clothing, and prayer spaces.',
    ingredients: 'Crushed Cambodian Agarwood, Pure Oud Oil, Amber, Taif Rose Attar, Saffron, Sandalwood, Musk, Natural Aromatic Resins.'
  }
];

export const CATEGORY_TABS = [
  'All',
  'Hair Care',
  'Arabian Bakhoor',
  'Fragrances'
];
