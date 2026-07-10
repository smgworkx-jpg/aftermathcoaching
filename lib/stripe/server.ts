import Stripe from "stripe";

// Server-only Stripe client. Returns null when STRIPE_SECRET_KEY is not
// configured so callers can degrade gracefully (build never breaks; the UI
// shows a clear "billing not configured" message instead of crashing).
let cached: Stripe | null = null;

export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  if (!cached) cached = new Stripe(key);
  return cached;
}
