import { getUser } from "@netlify/identity";
import { getStripe } from "../../lib/stripe/server";
import { COACHING_PLAN } from "../../lib/stripe/config";
import { ensureCoachingPlan, ensureDbUser } from "../../lib/auth/sync";
import { db } from "../../db";
import { subscriptions } from "../../db/schema";
import { eq } from "drizzle-orm";

// Creates a Stripe Checkout Session for the monthly coaching subscription and
// returns its URL. The client redirects the browser to that URL.
const handler = async (req: Request) => {
  if (req.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  const user = await getUser().catch(() => null);
  if (!user) {
    return Response.json({ error: "Please sign in to subscribe.", redirect: "/login" }, { status: 401 });
  }

  const stripe = getStripe();
  if (!stripe) {
    return Response.json(
      { error: "Billing is not configured yet. Add STRIPE_SECRET_KEY to enable checkout." },
      { status: 503 },
    );
  }

  const dbUser = await ensureDbUser(user, "client");
  const plan = await ensureCoachingPlan();

  // Reuse an existing Stripe customer for this client if we have one on file.
  const existing = await db
    .select({ customerId: subscriptions.stripeCustomerId })
    .from(subscriptions)
    .where(eq(subscriptions.clientId, dbUser.id))
    .limit(1);

  let customerId = existing[0]?.customerId ?? undefined;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      name: user.name,
      metadata: { dbUserId: dbUser.id, identityId: user.id },
    });
    customerId = customer.id;
  }

  const origin = new URL(req.url).origin;

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: COACHING_PLAN.currency,
          unit_amount: COACHING_PLAN.amountCents,
          recurring: { interval: COACHING_PLAN.interval },
          product_data: { name: COACHING_PLAN.name, description: COACHING_PLAN.description },
        },
      },
    ],
    success_url: `${origin}/app?checkout=success`,
    cancel_url: `${origin}/app/settings?checkout=cancelled`,
    subscription_data: {
      metadata: { dbUserId: dbUser.id, identityId: user.id, planId: plan?.id ?? "" },
    },
    metadata: { dbUserId: dbUser.id, identityId: user.id, planId: plan?.id ?? "" },
  });

  return Response.json({ url: session.url });
};

export default handler;
