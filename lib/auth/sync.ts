import { eq } from "drizzle-orm";
import { db } from "../../db";
import { subscriptionPlans, users } from "../../db/schema";
import { COACHING_PLAN } from "../stripe/config";
import type { AppRole } from "./roles";
import type { User } from "@netlify/identity";

// Mirror a Netlify Identity user into the application database. Identity remains
// the source of truth for authentication; this keeps a durable, queryable row so
// coaching relationships, subscriptions, and progress data can reference the user.
export async function ensureDbUser(identityUser: User, role: AppRole) {
  const email = identityUser.email ?? `${identityUser.id}@unknown.local`;
  const fullName = identityUser.name ?? email.split("@")[0];

  const [row] = await db
    .insert(users)
    .values({ identityId: identityUser.id, email, fullName, role })
    .onConflictDoUpdate({
      target: users.identityId,
      set: { email, fullName, role, updatedAt: new Date() },
    })
    .returning();

  return row;
}

// Ensure the single coaching plan exists in the database. Idempotent — safe to
// call on every checkout or admin page load.
export async function ensureCoachingPlan() {
  const existing = await db
    .select()
    .from(subscriptionPlans)
    .where(eq(subscriptionPlans.name, COACHING_PLAN.name))
    .limit(1);

  if (existing.length) return existing[0];

  const [row] = await db
    .insert(subscriptionPlans)
    .values({
      name: COACHING_PLAN.name,
      description: COACHING_PLAN.description,
      amountCents: COACHING_PLAN.amountCents,
      interval: COACHING_PLAN.interval,
      active: true,
    })
    .returning();

  return row;
}
