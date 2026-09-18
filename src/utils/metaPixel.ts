/**
 * Meta Pixel E-Commerce & Catalog Match Engine for The House of Aura
 * Integrates directly with Meta Commerce Manager & Advantage+ Catalog Ads
 * Pixel ID: 1774987870348632
 */

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

export interface MetaPixelProductEvent {
  content_ids: string[];
  content_name?: string;
  content_type: 'product' | 'product_group';
  currency: string;
  value: number;
  num_items?: number;
}

export function trackMetaEvent(
  eventName: 'ViewContent' | 'AddToCart' | 'InitiateCheckout' | 'Purchase',
  data: MetaPixelProductEvent
): void {
  try {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('track', eventName, {
        content_type: 'product',
        currency: 'PKR',
        ...data
      });
      console.log(`[Meta Pixel 1774987870348632] Tracked ${eventName}:`, data);
    }
  } catch (err) {
    console.warn('[Meta Pixel] Error sending event:', err);
  }
}

/**
 * Map internal product ID and quantity / deal to catalog SKU in facebook_catalog.csv
 */
export function mapProductToCatalogSku(productId: string, deal?: string, quantity: number = 1): string {
  const p = (productId || '').toLowerCase();
  if (p.includes('apple')) {
    return deal === 'duo' || quantity >= 2 ? 'HOA-APPLE-DUO-PACK' : 'HOA-APPLE-500ML';
  }
  if (p.includes('cosmo')) {
    return deal === 'duo' || quantity >= 2 ? 'HOA-COSMO-DUO-PACK' : 'HOA-COSMO-1000ML';
  }
  if (p.includes('bakhoor')) {
    if (deal === 'set8' || quantity >= 8) return 'HOA-BAKHOOR-8SET';
    if (deal === 'trio' || quantity >= 3) return 'HOA-BAKHOOR-TRIO';
    if (deal === 'duo' || quantity >= 2) return 'HOA-BAKHOOR-DUO';
    return 'HOA-BAKHOOR-SINGLE';
  }
  if (p.includes('dexe')) {
    return deal === 'duo' || quantity >= 2 ? 'HOA-DEXE-DUO-PACK' : 'HOA-DEXE-400ML';
  }
  return 'HOA-APPLE-500ML';
}

/**
 * Convenience helper to track Product View (ViewContent) matching facebook_catalog.csv
 */
export function trackProductView(catalogId: string, name: string, price: number): void {
  trackMetaEvent('ViewContent', {
    content_ids: [catalogId],
    content_name: name,
    content_type: 'product',
    currency: 'PKR',
    value: price
  });
}

/**
 * Convenience helper to track Add to Bag (AddToCart)
 */
export function trackAddToCart(catalogId: string, name: string, price: number, quantity: number = 1): void {
  trackMetaEvent('AddToCart', {
    content_ids: [catalogId],
    content_name: name,
    content_type: 'product',
    currency: 'PKR',
    value: price,
    num_items: quantity
  });
}

/**
 * Convenience helper to track WhatsApp COD Order & Checkout (Purchase & InitiateCheckout)
 */
export function trackWhatsAppPurchase(catalogId: string, name: string, price: number, quantity: number = 1): void {
  trackMetaEvent('InitiateCheckout', {
    content_ids: [catalogId],
    content_name: name,
    content_type: 'product',
    currency: 'PKR',
    value: price,
    num_items: quantity
  });

  trackMetaEvent('Purchase', {
    content_ids: [catalogId],
    content_name: name,
    content_type: 'product',
    currency: 'PKR',
    value: price,
    num_items: quantity
  });
}
