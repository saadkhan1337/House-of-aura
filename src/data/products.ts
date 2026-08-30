import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'hoa-apple-hair-color',
    name: 'Apple Hair Color Cream (Ammonia-Free)',
    subtitle: 'Dubai Formulation with Organic Moroccan Argan & Apple Extract',
    category: 'Hair Care',
    displayCategoryTab: ['All', 'Hair Care'],
    description: 'A revolutionary salon-grade instant hair coloring system imported directly from Dubai. Formulated with organic green apple stem cells and cold-pressed Moroccan argan oil to deliver 100% grey coverage with zero scalp irritation and brilliant diamond shine in just 15 minutes.',
    usp: [
      '100% Ammonia-Free & PPD-Safe Formula',
      'Infused with Apple Stem Cells & Argan Oil',
      '100% Grey Coverage in 15 Minutes',
      'Certified Dubai Municipality Cosmetic Grade'
    ],
    rating: 4.9,
    reviewCount: 342,
    featured: true,
    featuredRank: 1,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80'
    ],
    varieties: [
      {
        id: 'var-natural-black-1',
        name: '1.0 Natural Black',
        type: 'shade',
        hexColor: '#0c0c0c',
        inStock: true,
        stockQty: 48,
        badge: 'Top Shade'
      },
      {
        id: 'var-dark-brown-3',
        name: '3.0 Dark Velvet Brown',
        type: 'shade',
        hexColor: '#301e14',
        inStock: true,
        stockQty: 35,
        badge: 'Bestseller'
      },
      {
        id: 'var-chocolate-brown-4',
        name: '4.3 Golden Chocolate',
        type: 'shade',
        hexColor: '#4e2f1d',
        inStock: true,
        stockQty: 29
      },
      {
        id: 'var-burgundy-wine-5',
        name: '5.6 Arabian Burgundy Wine',
        type: 'shade',
        hexColor: '#5c1024',
        inStock: true,
        stockQty: 18,
        badge: 'Trending'
      },
      {
        id: 'var-espresso-rich-2',
        name: '2.0 Rich Espresso Coffee',
        type: 'shade',
        hexColor: '#20140e',
        inStock: true,
        stockQty: 22
      }
    ],
    pricing: {
      retailPrice: 3450,
      originalPrice: 4200,
      bundleDiscountPrice: 3100, // For 2+ units
      wholesalePrice: 2450,
      minWholesaleQty: 6
    },
    tags: ['Bestseller', 'Dubai Import', 'Limited Stock'],
    origin: 'Dubai Industrial City, UAE',
    volumeOrWeight: '120ml Kit (Color + Developer + Gloves + Serum)',
    howToUse: 'Mix Colorant and Developer in 1:1 ratio. Apply evenly to dry, unwashed hair from roots to ends. Leave for 15-20 minutes, then rinse thoroughly with lukewarm water.',
    ingredients: 'Pyrus Malus (Apple) Fruit Extract, Argania Spinosa Kernel Oil, Keratin Peptides, Cetearyl Alcohol, Oleic Acid, Ascorbic Acid, Fragrance, Dubai Ultra-Pure Water.'
  },
  {
    id: 'hoa-cosmo-shampoo',
    name: 'Cosmo Salon Hydrating Keratin Shampoo',
    subtitle: 'Professional Sulfate-Free Moisture Lock & Follicle Therapy',
    category: 'Hair Care',
    displayCategoryTab: ['All', 'Hair Care'],
    description: 'Formulated for elite Dubai styling salons, Cosmo Hydrating Shampoo penetrates deep within the hair cortex to restore elasticity, eliminate frizz, and shield hair from harsh water mineral buildup. Free from parabens, sulfates, and harsh salts.',
    usp: [
      '100% Sulfate, Paraben & Salt Free',
      'Active Hydrolyzed Keratin & Biotin Complex',
      'Safe for Color-Treated & Keratin-Treated Hair',
      'Provides 72-Hour Anti-Frizz Humidity Shield'
    ],
    rating: 4.85,
    reviewCount: 219,
    featured: true,
    featuredRank: 2,
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=900&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=900&q=80'
    ],
    varieties: [
      {
        id: 'var-keratin-nourish',
        name: 'Keratin & Argan Therapy (500ml)',
        type: 'flavor',
        hexColor: '#d4af37',
        inStock: true,
        stockQty: 62,
        badge: 'Salon Pick'
      },
      {
        id: 'var-biotin-thickening',
        name: 'Biotin & Collagen Volumizing (500ml)',
        type: 'flavor',
        hexColor: '#8a2be2',
        inStock: true,
        stockQty: 40,
        badge: 'Hair Density'
      },
      {
        id: 'var-tea-tree-scalp',
        name: 'Arabian Tea Tree & Mint Scalp Detox (500ml)',
        type: 'flavor',
        hexColor: '#2e8b57',
        inStock: true,
        stockQty: 25
      },
      {
        id: 'var-jumbo-salon-1000',
        name: 'Salon Master Professional Jug (1000ml)',
        type: 'size',
        hexColor: '#1c1c1c',
        inStock: true,
        stockQty: 19,
        badge: 'Value Size'
      }
    ],
    pricing: {
      retailPrice: 2800,
      originalPrice: 3500,
      bundleDiscountPrice: 2500,
      wholesalePrice: 1950,
      minWholesaleQty: 6
    },
    tags: ['Bestseller', 'Dubai Import', 'Salon Exclusive'],
    origin: 'Sharjah Free Zone, UAE',
    volumeOrWeight: '500ml / 1000ml Dispenser Pump',
    howToUse: 'Apply generous amount to wet hair, gently massage scalp in circular motions for 2 minutes to activate micro-circulation, then rinse thoroughly. Follow with Cosmo Keratin Mask.',
    ingredients: 'Aqua, Sodium Cocoyl Isethionate, Hydrolyzed Keratin, Biotin, Argania Spinosa Kernel Oil, Camellia Sinensis Leaf Extract, Panthenol (Pro-Vitamin B5), Citric Acid.'
  },
  {
    id: 'hoa-bakhoor-hamidi',
    name: 'Bakhoor Hamidi Deluxe Incense Tablets',
    subtitle: 'Traditional Emirati Agarwood with Taif Rose & Ambergris',
    category: 'Fragrances',
    displayCategoryTab: ['All', 'Arabian Bakhoor', 'Fragrances'],
    description: 'Immerse your space in the authentic aromatic grandeur of Dubai palaces. Handcrafted using premium Cambodi agarwood chips soaked in opulent pure oud oil, rare Taif rose attar, and warm golden amber. Long-lasting aromatic smoke that permeates fabrics and spaces for up to 48 hours.',
    usp: [
      'Authentic UAE Artisan Pressed Tablets (Easy Burn)',
      'Rich Cambodian Agarwood & Royal Taif Rose Infusion',
      '48+ Hours Lingering Luxury Fragrance Throw',
      'Includes Velvet Gift Box & Gold Embossed Seal'
    ],
    rating: 4.96,
    reviewCount: 412,
    featured: true,
    featuredRank: 3,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=900&q=80'
    ],
    varieties: [
      {
        id: 'var-hamidi-royal-oud',
        name: 'Royal Cambodi Oud (40g Tablets)',
        type: 'scent',
        hexColor: '#4a2c11',
        inStock: true,
        stockQty: 38,
        badge: 'Most Popular'
      },
      {
        id: 'var-hamidi-taif-rose',
        name: 'Taif Rose & Musk (40g Tablets)',
        type: 'scent',
        hexColor: '#a83258',
        inStock: true,
        stockQty: 27,
        badge: 'Floral Woody'
      },
      {
        id: 'var-hamidi-golden-amber',
        name: 'Golden Amber & Saffron (40g Tablets)',
        type: 'scent',
        hexColor: '#d4af37',
        inStock: true,
        stockQty: 30
      },
      {
        id: 'var-hamidi-collector-combo',
        name: '3-in-1 Royal Trio Gift Box (120g)',
        type: 'pack',
        hexColor: '#1a1a1a',
        inStock: true,
        stockQty: 14,
        badge: 'Gift Deluxe'
      }
    ],
    pricing: {
      retailPrice: 5200,
      originalPrice: 6500,
      bundleDiscountPrice: 4700,
      wholesalePrice: 3800,
      minWholesaleQty: 4
    },
    tags: ['Bestseller', 'Dubai Import', 'Limited Stock'],
    origin: 'Deira Perfume Souk, Dubai UAE',
    volumeOrWeight: '40g / 120g Pressed Tablet Tin',
    howToUse: 'Place one tablet on electric burner (mabkhara) or ignited natural charcoal. Allow the rich fragrant smoke to scent living rooms, meditation corners, and garments.',
    ingredients: 'Crushed Cambodian Agarwood, Parfum (Pure Oud Oil, Taif Rose, Amber, Saffron, Sandalwood, Musk), Natural Tree Resins.'
  },
  {
    id: 'hoa-royal-oud-edp',
    name: 'Sultanate De Dubai Royal Oud EDP (100ml)',
    subtitle: 'Extrait De Parfum with Rare Cambodian Oud & Smoky Amber',
    category: 'Fragrances',
    displayCategoryTab: ['All', 'Fragrances'],
    description: 'An unapologetically majestic Dubai fragrance crafted for discerning individuals. Boasting an ultra-high 30% oil concentration for 24+ hour projection with magnetic sillage.',
    usp: [
      '30% Extrait De Parfum High Concentration',
      'Over 24-Hour Lasting on Fabrics',
      'Presented in Heavy Crystal Flacon with 24K Gold Cap',
      'Imported directly from Dubai Perfumers'
    ],
    rating: 4.92,
    reviewCount: 158,
    featured: false,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80'
    ],
    varieties: [
      {
        id: 'var-oud-edp-100',
        name: 'Standard Flacon (100ml EDP)',
        type: 'size',
        hexColor: '#c5a880',
        inStock: true,
        stockQty: 20,
        badge: 'Classic'
      },
      {
        id: 'var-oud-edp-gift',
        name: 'Deluxe Gift Set (100ml + 12ml Travel Atomizer)',
        type: 'pack',
        hexColor: '#171717',
        inStock: true,
        stockQty: 11,
        badge: 'Exclusive'
      }
    ],
    pricing: {
      retailPrice: 6800,
      originalPrice: 8500,
      bundleDiscountPrice: 6200,
      wholesalePrice: 4900,
      minWholesaleQty: 3
    },
    tags: ['Dubai Import', 'Trending'],
    origin: 'Downtown Dubai, UAE',
    volumeOrWeight: '100ml Extrait De Parfum',
    howToUse: 'Spray 2-3 pumps onto pulse points (wrists, collarbone, behind ears) or onto clothing for maximum projection.',
    ingredients: 'Alcohol Denat., Fragrance (Parfum), Aqua, Oud Wood Extract, Benzyl Benzoate, Limonene, Linalool, Coumarin.'
  },
  {
    id: 'hoa-moroccan-hair-mask',
    name: 'Aura Velvet Argan Hair Treatment Butter',
    subtitle: 'Ultra-Nourishing Deep Repair Mask with Caviar Protein',
    category: 'Hair Care',
    displayCategoryTab: ['All', 'Hair Care', 'Salon Deals'],
    description: 'Transform heat-damaged, frizzy, and chemically processed hair into pure silk. Infused with double-filtered Moroccan argan butter, black caviar extract, and silk amino acids.',
    usp: [
      'Repairs Split Ends & Bleach Damage in 1 Use',
      'Zero Greasy Residue, Instant Glass Hair Shine',
      'Favorite formula for Dubai Bridal Hair Stylists',
      'Color-Safe & Dermatologically Tested'
    ],
    rating: 4.88,
    reviewCount: 174,
    featured: false,
    image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=900&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=900&q=80'
    ],
    varieties: [
      {
        id: 'var-mask-350',
        name: 'Retail Tub (350ml)',
        type: 'size',
        hexColor: '#b8860b',
        inStock: true,
        stockQty: 45
      },
      {
        id: 'var-mask-1000-salon',
        name: 'Salon Bulk Tub (1000ml)',
        type: 'size',
        hexColor: '#2b1d0c',
        inStock: true,
        stockQty: 28,
        badge: 'Salon Deal'
      }
    ],
    pricing: {
      retailPrice: 3200,
      originalPrice: 4000,
      bundleDiscountPrice: 2850,
      wholesalePrice: 2200,
      minWholesaleQty: 5
    },
    tags: ['Dubai Import', 'Organic Infused'],
    origin: 'Ras Al Khaimah, UAE',
    volumeOrWeight: '350ml / 1000ml',
    howToUse: 'Apply to damp hair from mid-lengths to ends after shampooing. Leave on for 5-10 minutes (or 20 minutes under a hot towel for deep salon steam), then rinse.',
    ingredients: 'Argania Spinosa Butter, Hydrolyzed Silk, Caviar Extract, Behentrimonium Methosulfate, Shea Butter, Tocopheryl Acetate.'
  },
  {
    id: 'hoa-velvet-matte-lipstick-set',
    name: 'Desert Bloom Silk Matte Lip Vault (6-Piece)',
    subtitle: 'Transfer-Proof Non-Drying Middle Eastern Nudes & Corals',
    category: 'Cosmetics',
    displayCategoryTab: ['All', 'Cosmetics'],
    description: 'An opulent box of 6 ultra-pigmented, velvet-matte liquid lipsticks crafted to withstand warm climates with 16-hour smudge-proof longevity and hyaluronic acid moisture cushion.',
    usp: [
      '16-Hour Transfer-Proof Waterproof Wear',
      'Infused with Jojoba Oil & Hyaluronic Hydration',
      'Curated for South Asian & Middle Eastern Skin Tones',
      'Includes Custom Magnetic Gold Box'
    ],
    rating: 4.81,
    reviewCount: 96,
    featured: false,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=80'
    ],
    varieties: [
      {
        id: 'var-lip-vault-nudes',
        name: 'The Dubai Nudes Vault (6 Shades)',
        type: 'pack',
        hexColor: '#a0522d',
        inStock: true,
        stockQty: 32,
        badge: 'Best Value'
      },
      {
        id: 'var-lip-vault-royals',
        name: 'The Royal Reds & Berries Vault (6 Shades)',
        type: 'pack',
        hexColor: '#800020',
        inStock: true,
        stockQty: 21
      }
    ],
    pricing: {
      retailPrice: 4200,
      originalPrice: 5500,
      bundleDiscountPrice: 3800,
      wholesalePrice: 2900,
      minWholesaleQty: 4
    },
    tags: ['Dubai Import', 'Trending'],
    origin: 'Dubai Design District, UAE',
    volumeOrWeight: '6 x 5ml Tubes in Velvet Display',
    howToUse: 'Outline lips with precision applicator tip and fill in one single swipe. Allow 60 seconds to set into a weightless matte veil.',
    ingredients: 'Isododecane, Dimethicone, Trimethylsiloxysilicate, Simmondsia Chinensis (Jojoba) Seed Oil, Sodium Hyaluronate, Vitamin E, CI 77491, CI 77492.'
  },
  {
    id: 'hoa-salon-master-wholesale-bundle',
    name: 'Salon Master Professional Wholesale Starter Kit',
    subtitle: 'Bulk Deal: 12x Apple Color + 6x Cosmo Shampoo + 4x Bakhoor',
    category: 'Salon Wholesale',
    displayCategoryTab: ['All', 'Salon Deals', 'Salon Wholesale'],
    description: 'The ultimate turnkey luxury inventory package designed specifically for premium salon owners, beauty studios, and wholesale distributors in Pakistan. Guaranteed Dubai authenticity certificates included with every shipment.',
    usp: [
      'Includes 12x Apple Colors + 6x Cosmo Shampoos + 4x Bakhoor Tins',
      'Over 42% Profit Margin for Salon Operations',
      'Free VIP Express Air Shipment Across Pakistan',
      'Official Authorized Salon Partner Window Decal & Display Stand'
    ],
    rating: 5.0,
    reviewCount: 64,
    featured: false,
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=900&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=900&q=80'
    ],
    varieties: [
      {
        id: 'var-kit-standard-mix',
        name: 'Standard Salon Assortment (22 Items Total)',
        type: 'pack',
        hexColor: '#d4af37',
        inStock: true,
        stockQty: 15,
        badge: 'Salon Deal'
      },
      {
        id: 'var-kit-mega-studio',
        name: 'Mega Studio Tier (44 Items + Free Electric Mabkhara)',
        type: 'pack',
        hexColor: '#1f2937',
        inStock: true,
        stockQty: 8,
        badge: 'Distributor VIP'
      }
    ],
    pricing: {
      retailPrice: 65000,
      originalPrice: 89000,
      bundleDiscountPrice: 62000,
      wholesalePrice: 49500,
      minWholesaleQty: 1
    },
    tags: ['Salon Exclusive', 'Dubai Import', 'Limited Stock'],
    origin: 'Dubai Logistics City, UAE',
    volumeOrWeight: 'Full Commercial Shipping Crate (14.5 kg)',
    howToUse: 'Commercial stock ready for direct client application or retail salon display.',
    ingredients: 'Standardized Dubai Certified Formulas. Includes Certificate of Analysis and Invoice.'
  }
];

export const CATEGORY_TABS = [
  'All',
  'Hair Care',
  'Arabian Bakhoor',
  'Fragrances',
  'Cosmetics',
  'Salon Deals',
  'Salon Wholesale'
] as const;
