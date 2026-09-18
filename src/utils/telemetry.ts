/**
 * tenants/house_of_aura/website/src/utils/telemetry.ts
 * 
 * House of Aura — Production Telemetry & Order Ingestion Client
 * Tracks business-required traffic events and synchronizes orders to the backend.
 */

export type TrafficEventType =
  | 'PAGE_VIEW'
  | 'PRODUCT_VIEW'
  | 'ADD_TO_CART'
  | 'CHECKOUT_STARTED'
  | 'ORDER_CREATED';

const SESSION_KEY = 'hoa_telemetry_session_id';

export function getOrCreateSessionId(): string {
  try {
    let sid = sessionStorage.getItem(SESSION_KEY);
    if (!sid) {
      sid = 'sess_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now().toString(36);
      sessionStorage.setItem(SESSION_KEY, sid);
    }
    return sid;
  } catch (e) {
    return 'sess_fallback_' + Date.now();
  }
}

function getReferralSource(): { source: string; medium?: string; campaign?: string } {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source');
    const utmMedium = urlParams.get('utm_medium');
    const utmCampaign = urlParams.get('utm_campaign');

    if (utmSource) {
      return {
        source: utmSource.toLowerCase(),
        medium: utmMedium?.toLowerCase() || 'cpc',
        campaign: utmCampaign || undefined
      };
    }

    const ref = document.referrer ? new URL(document.referrer).hostname : '';
    if (ref.includes('instagram.com')) return { source: 'instagram', medium: 'social' };
    if (ref.includes('facebook.com')) return { source: 'facebook', medium: 'social' };
    if (ref.includes('tiktok.com')) return { source: 'tiktok', medium: 'social' };
    if (ref.includes('google.com')) return { source: 'google', medium: 'organic' };
    if (ref) return { source: ref, medium: 'referral' };

    return { source: 'direct', medium: 'none' };
  } catch (e) {
    return { source: 'direct', medium: 'none' };
  }
}

export async function trackTrafficEvent(
  eventType: TrafficEventType,
  productId?: string
): Promise<void> {
  const refInfo = getReferralSource();
  const payload = {
    event_id: 'evt_' + Math.random().toString(36).substring(2, 10) + '_' + Date.now(),
    session_id: getOrCreateSessionId(),
    timestamp: new Date().toISOString(),
    event_type: eventType,
    source: refInfo.source,
    medium: refInfo.medium,
    campaign: refInfo.campaign,
    landing_page: window.location.pathname || '/',
    product_id: productId
  };

  const endpoints = ['/api/hoa/traffic/event', 'http://localhost:8000/api/hoa/traffic/event'];
  for (const ep of endpoints) {
    try {
      const res = await fetch(ep, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) break;
    } catch (e) {
      // Continue to next endpoint or drop gracefully
    }
  }
}

export async function submitOrderToBackend(orderPayload: any): Promise<{ success: boolean; orderId?: string }> {
  const endpoints = ['/api/hoa/orders', 'http://localhost:8000/api/hoa/orders'];
  for (const ep of endpoints) {
    try {
      const res = await fetch(ep, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });
      if (res.ok) {
        const data = await res.json();
        return {
          success: true,
          orderId: data.order?.order_id
        };
      }
    } catch (e) {
      // Try next endpoint
    }
  }
  return { success: false };
}
