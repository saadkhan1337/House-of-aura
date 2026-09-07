export const BRAND_CONFIG = {
  name: 'The House of Aura',
  tagline: 'Beauty, Care & Arabian Luxury',
  estYear: '2026',
  domain: 'thehouseofaura.online',
  phoneRaw: '923179738321',
  phoneDisplay: '0317-9738321',
  email: 'concierge@thehouseofaura.online',
  facebookHandle: '/HouseOfAura',
  facebookUrl: 'https://facebook.com/HouseOfAura',
  instagramHandle: '@HouseOfAura.Official',
  instagramUrl: 'https://instagram.com/HouseOfAura.Official',
  logoUrl: '/images/house_of_aura_logo.jpg',
  dubaiHub: 'Al Rigga, Deira, Dubai, UAE',
  pakistanDispatch: 'Phase 6 DHA, Lahore / Karachi Express'
};

export function generateWhatsAppOrderUrl(productName: string, selection: string, price: number): string {
  const phone = BRAND_CONFIG.phoneRaw;
  const msg = encodeURIComponent(
    `Assalam-o-Alaikum House of Aura!\n\nI would like to order:\n🛍️ *Product:* ${productName}\n✨ *Selection:* ${selection}\n💰 *Price:* Rs. ${price.toLocaleString()}\n\nPlease confirm availability and express dispatch!`
  );
  return `https://wa.me/${phone}?text=${msg}`;
}

export function generateWhatsAppInquiryUrl(topic?: string): string {
  const phone = BRAND_CONFIG.phoneRaw;
  const text = topic
    ? `Assalam-o-Alaikum House of Aura! I would like to inquire about ${topic}.`
    : `Assalam-o-Alaikum House of Aura! I am visiting your website and have an inquiry about your Dubai luxury collection.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
