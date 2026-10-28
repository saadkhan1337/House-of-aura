/**
 * tenants/house_of_aura/website/api/hoa/traffic/event.ts
 * 
 * Vercel Serverless Function — Public Traffic Telemetry Ingestion
 */

const ALLOWED_EVENTS = new Set([
  "PAGE_VIEW",
  "PRODUCT_VIEW",
  "ADD_TO_CART",
  "CHECKOUT_STARTED",
  "ORDER_CREATED"
]);

async function upstashCommand(url: string, token: string, command: any[]): Promise<any> {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(command)
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Upstash error: ${txt}`);
  }
  const data = await res.json();
  return data.result;
}

export default async function handler(req: any, res: any) {
  const origin = req.headers?.origin || "";
  const allowedOrigins = [
    "https://thehouseofaura.online",
    "https://www.thehouseofaura.online",
    "http://localhost:3000"
  ];

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method Not Allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const eventType = (body.event_type || "").trim().toUpperCase();

    if (!ALLOWED_EVENTS.has(eventType)) {
      return res.status(400).json({ success: false, error: `Invalid event_type: '${eventType}'` });
    }

    const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
    const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

    const eventPayload = {
      event_id: body.event_id || `evt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      session_id: body.session_id || "anonymous",
      timestamp: body.timestamp || new Date().toISOString(),
      event_type: eventType,
      source: (body.source || "direct").slice(0, 50),
      medium: (body.medium || "none").slice(0, 50),
      campaign: (body.campaign || "").slice(0, 100),
      landing_page: (body.landing_page || "/").slice(0, 200),
      product_id: (body.product_id || "").slice(0, 100)
    };

    if (upstashUrl && upstashToken) {
      await upstashCommand(upstashUrl, upstashToken, [
        "XADD",
        "hoa:stream:traffic",
        "*",
        "payload",
        JSON.stringify(eventPayload),
        "timestamp",
        eventPayload.timestamp
      ]);
    }

    return res.status(201).json({ success: true, event_id: eventPayload.event_id });

  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message || "Failed to record traffic event" });
  }
}
