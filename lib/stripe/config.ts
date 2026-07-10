// Central pricing + Stripe configuration.
//
// The publishable key is safe to expose in client-side code by Stripe's design
// (it can only create tokens, never move money). The secret key and webhook
// secret are read from server-only environment variables and never live here.
export const STRIPE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ??
  "pk_live_51TEH57PSq3RAqMmH506tNgnxvgKcL4FkScS5XluLgh9qRYiJX1xKjUd0Ce7XhgVSeirMMSiASzidZFFUYknaQ0Wx00faSHluKB";

// Single premium 1:1 coaching plan.
export const COACHING_PLAN = {
  name: "Blacklinez Coaching",
  description: "Premium 1:1 online physique coaching.",
  amountCents: 10000, // $100.00 / month
  currency: "usd",
  interval: "month" as const,
} as const;

export const priceDisplay = (cents: number) =>
  `$${(cents / 100).toLocaleString("en-US", { minimumFractionDigits: cents % 100 === 0 ? 0 : 2 })}`;
