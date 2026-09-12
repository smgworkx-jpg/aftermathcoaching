import { CreditCard, DollarSign, Users } from "lucide-react";
import { SectionHeader } from "@/components/layout/section-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { Panel } from "@/components/ui/panel";
import { db } from "@/db";
import { subscriptionPlans, subscriptions, users } from "@/db/schema";
import { requireRole } from "@/lib/auth/server";
import { ensureCoachingPlan } from "@/lib/auth/sync";
import { priceDisplay } from "@/lib/stripe/config";

const ACTIVE_STATUSES = new Set(["active", "trialing", "past_due"]);

const statusStyle: Record<string, string> = {
  active: "border-neon text-lilac",
  trialing: "border-neon text-lilac",
  past_due: "border-alert text-alert",
  canceled: "border-edge text-ash",
  inactive: "border-edge text-ash",
};

export default async function BillingPage() {
  await requireRole(["admin", "coach"]);
  await ensureCoachingPlan().catch(() => null);

  const [plans, subs, allUsers] = await Promise.all([
    db.select().from(subscriptionPlans).catch(() => []),
    db.select().from(subscriptions).catch(() => []),
    db.select().from(users).catch(() => []),
  ]);

  const planById = new Map(plans.map((p) => [p.id, p]));
  const userById = new Map(allUsers.map((u) => [u.id, u]));
  const activeSubs = subs.filter((s) => ACTIVE_STATUSES.has(s.status));
  const mrrCents = activeSubs.reduce((sum, s) => sum + (s.planId ? planById.get(s.planId)?.amountCents ?? 0 : 0), 0);

  return (
    <>
      <SectionHeader
        eyebrow="Revenue operations"
        title="Billing"
        description="Live subscription state synced from Stripe. Plans, active revenue, and payment status in one view."
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Monthly recurring" value={priceDisplay(mrrCents)} detail="From active subscriptions" icon={DollarSign} />
        <StatCard label="Active subscriptions" value={String(activeSubs.length)} detail={`${subs.length} total on record`} icon={Users} />
        <StatCard
          label="Plans"
          value={String(plans.length)}
          detail="Configured coaching plans"
          icon={CreditCard}
          urgent={subs.some((s) => s.status === "past_due")}
        />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[.5fr_1fr]">
        <Panel className="p-5">
          <div className="mono-label border-b-2 border-edge pb-3">Plans</div>
          <div className="mt-5 space-y-4">
            {plans.length === 0 && <p className="text-sm text-ash">No plans configured yet.</p>}
            {plans.map((plan) => (
              <div key={plan.id} className="border-2 border-edge bg-void p-4">
                <div className="flex items-end justify-between gap-3">
                  <div className="font-display text-lg uppercase leading-none text-bone">{plan.name}</div>
                  <div className="mono-data font-display text-xl text-lilac">{priceDisplay(plan.amountCents)}</div>
                </div>
                <div className="mono-label mt-2 flex items-center justify-between text-[.52rem]">
                  <span>{activeSubs.filter((s) => s.planId === plan.id).length} active</span>
                  <span>/ {plan.interval}</span>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="overflow-hidden">
          <div className="border-b-2 border-edge p-5">
            <h2 className="headline text-2xl text-bone">Subscriptions</h2>
            <p className="mono-label mt-1.5">All subscription records, most recent first</p>
          </div>
          <div>
            {subs.length === 0 && (
              <div className="p-8 text-center">
                <div className="mx-auto mb-5 h-1.5 w-20 stripes-tight" />
                <div className="headline text-2xl text-bone">Nothing billed yet</div>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-ash">
                  Subscription records appear here the moment a client completes checkout.
                </p>
              </div>
            )}
            {subs.map((sub) => {
              const client = userById.get(sub.clientId);
              const plan = sub.planId ? planById.get(sub.planId) : undefined;
              return (
                <div key={sub.id} className="flex items-center gap-4 border-b-2 border-edge p-5 last:border-b-0">
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-display text-lg uppercase leading-none text-bone">
                      {client?.fullName ?? client?.email ?? "Unknown client"}
                    </div>
                    <div className="mono-label mt-1.5 text-[.55rem]">
                      {plan?.name ?? "Coaching"}{plan ? ` · ${priceDisplay(plan.amountCents)}` : ""}
                    </div>
                  </div>
                  <div className={`mono-label shrink-0 border-2 px-2.5 py-1.5 text-[.55rem] ${statusStyle[sub.status] ?? "border-edge text-ash"}`}>
                    {sub.status.replace("_", " ")}
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>
      </div>
    </>
  );
}
