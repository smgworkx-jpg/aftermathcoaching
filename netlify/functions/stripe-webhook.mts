import Stripe from "stripe";
import { getStripe } from "../../lib/stripe/server";
import { db } from "../../db";
import { subscriptions } from "../../db/schema";
import { eq } from "drizzle-orm";

// Netlify serves this at /.netlify/functions/stripe-webhook. Point a Stripe
// webhook endpoint at that URL and set STRIPE_WEBHOOK_SECRET so the platform can
// verify signatures. It keeps the subscriptions table in sync with Stripe.

type OurStatus = "trialing" | "active" | "past_due" | "canceled" | "inactive";

function mapStatus(stripeStatus: string): OurStatus {
  switch (stripeStatus) {
    case "trialing":
      return "trialing";
    case "active":
      return "active";
    case "past_due":
    case "unpaid":
      return "past_due";
    case "canceled":
    case "incomplete_expired":
      return "canceled";
    default:
      return "inactive";
  }
}

function toDate(seconds: number | null | undefined) {
  return seconds ? new Date(seconds * 1000) : null;
}

async function syncSubscription(sub: Stripe.Subscription) {
  const clientId = sub.metadata?.dbUserId;
  if (!clientId) return; // Nothing to attach it to.
  const planId = sub.metadata?.planId || null;
  const item = sub.items?.data?.[0] as (Stripe.SubscriptionItem & { current_period_start?: number; current_period_end?: number }) | undefined;
  const periodStart = (sub as unknown as { current_period_start?: number }).current_period_start ?? item?.current_period_start;
  const periodEnd = (sub as unknown as { current_period_end?: number }).current_period_end ?? item?.current_period_end;

  const values = {
    clientId,
    planId,
    stripeCustomerId: typeof sub.customer === "string" ? sub.customer : sub.customer?.id ?? null,
    stripeSubscriptionId: sub.id,
    status: mapStatus(sub.status),
    currentPeriodStart: toDate(periodStart),
    currentPeriodEnd: toDate(periodEnd),
    cancelAtPeriodEnd: sub.cancel_at_period_end ?? false,
    updatedAt: new Date(),
  };

  await db
    .insert(subscriptions)
    .values(values)
    .onConflictDoUpdate({ target: subscriptions.stripeSubscriptionId, set: values });
}

const handler = async (req: Request) => {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) {
    return Response.json({ error: "Webhook not configured" }, { status: 503 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) return Response.json({ error: "Missing signature" }, { status: 400 });

  const payload = await req.text();
  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(payload, signature, secret);
  } catch (err) {
    return Response.json({ error: `Signature verification failed: ${(err as Error).message}` }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.subscription) {
          const subId = typeof session.subscription === "string" ? session.subscription : session.subscription.id;
          const sub = await stripe.subscriptions.retrieve(subId);
          // Carry checkout metadata onto the subscription if the subscription lacks it.
          if (!sub.metadata?.dbUserId && session.metadata?.dbUserId) {
            sub.metadata = { ...sub.metadata, ...session.metadata };
          }
          await syncSubscription(sub);
        }
        break;
      }
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        await syncSubscription(event.data.object as Stripe.Subscription);
        break;
      }
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice & { subscription?: string };
        if (invoice.subscription) {
          await db
            .update(subscriptions)
            .set({ status: "past_due", updatedAt: new Date() })
            .where(eq(subscriptions.stripeSubscriptionId, invoice.subscription));
        }
        break;
      }
      default:
        break;
    }
  } catch (err) {
    return Response.json({ error: `Handler error: ${(err as Error).message}` }, { status: 500 });
  }

  return Response.json({ received: true });
};

export default handler;
