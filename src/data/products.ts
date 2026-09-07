import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'hoa-apple-hair-color',
    name: 'Apple Italian Ammonia-Free Hair Color (500ml + 500ml Jumbo Twin Pack)',
    subtitle: 'Clear Water Type • Zero Stains on Scalp or Clothes • 96 Hours Lasting Shine',
    category: 'Hair Care',
    displayCategoryTab: ['All', 'Hair Care'],
    description: 'A revolutionary salon-grade instant hair coloring cream imported directly from Dubai. Formulated with clear water technology to guarantee zero stains on skin or garments, 100% gray coverage in 15-20 minutes, and 96 hours of radiant diamond shine.',
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
    image: '/images/apple_hair_color_3d_unified.jpg',
    galleryImages: [
      '/images/apple_hair_color_3d_unified.jpg',
      '/images/apple_hair_color.png',
      '/images/variants/apple_pouch_500ml_front.jpg'
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
      }
    ],
    pricing: {
      retailPrice: 2499,
      originalPrice: 3800,
      bundleDiscountPrice: 4500,
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
      }
    ],
    pricing: {
      retailPrice: 1999,
      originalPrice: 2800,
      bundleDiscountPrice: 3500,
      wholesalePrice: 1350,
      minWholesaleQty: 8
    },
    tags: ['Dubai Fragrances', 'Royal Incense', 'Agarwood', 'Bestseller'],
    origin: 'Deira Perfume Souk, Dubai UAE',
    volumeOrWeight: 'Airtight Crystal & Gold Jar',
    howToUse: 'Place a small piece on heated charcoal or an electric incense burner (mabkhara). Let the aromatic smoke perfume the living area, clothing, and prayer spaces.',
    ingredients: 'Crushed Cambodian Agarwood, Pure Oud Oil, Amber, Taif Rose Attar, Saffron, Sandalwood, Musk, Natural Aromatic Resins.'
  },
  {
    id: 'hoa-hamidi-fragrance',
    name: 'Hamidi Arabian Luxury Fragrance (Royal Attar & Eau de Parfum)',
    subtitle: 'Master-Crafted in Dubai • Taif Rose, Warm Spices & Velvet White Oudh',
    category: 'Fragrances',
    displayCategoryTab: ['All', 'Fragrances'],
    description: 'A distinguished royal fragrance from the masters of Arabian perfumery in Dubai. Featuring an opulent opening of Taif rose and rare spices, unfurling into a heart of amber and crowned with a long-lasting base of pure white oudh.',
    usp: [
      'Master-Crafted in Dubai with Premium Natural Essences',
      'Opening with Taif Rose & Warm Spices, Settling into White Oudh',
      'Ultra Long-Lasting 24-Hour Sillage & Projection',
      'Luxury Faceted Crystal Flacon with Golden Crown Cap'
    ],
    rating: 4.96,
    reviewCount: 312,
    featured: true,
    featuredRank: 4,
    image: '/images/hamidi_fragrance.png',
    galleryImages: [
      '/images/hamidi_fragrance.png'
    ],
    varieties: [
      {
        id: 'var-fragrance-edp-100ml',
        name: '100ml Eau de Parfum Spray',
        type: 'size',
        hexColor: '#d4af37',
        inStock: true,
        stockQty: 50,
        badge: 'Dubai Edition'
      }
    ],
    pricing: {
      retailPrice: 2850,
      originalPrice: 4500,
      bundleDiscountPrice: 5200,
      wholesalePrice: 2100,
      minWholesaleQty: 4
    },
    tags: ['Authentic Dubai Import', 'Haute Perfumery', 'Taif Rose', 'White Oudh'],
    origin: 'Dubai, UAE',
    volumeOrWeight: '100ml Luxury Flacon',
    howToUse: 'Spray directly onto pulse points (wrists, neck, chest) for maximum projection and all-day fragrance throw.',
    ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua, Agarwood (Oud) Oil, Taif Rose Essence, Amber, Benzyl Salicylate, Linalool, Limonene.'
  }
];

export const CATEGORY_TABS = [
  'All',
  'Hair Care',
  'Arabian Bakhoor',
  'Fragrances'
];
