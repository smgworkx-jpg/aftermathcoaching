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
  active: "text-emerald-300",
  trialing: "text-violet-300",
  past_due: "text-fuchsia-300",
  canceled: "text-slate-600",
  inactive: "text-slate-600",
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
        <StatCard label="Plans" value={String(plans.length)} detail="Configured coaching plans" icon={CreditCard} urgent={subs.some((s) => s.status === "past_due")} />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[.5fr_1fr]">
        <Panel className="p-5">
          <div className="eyebrow">Plans</div>
          <div className="mt-5 space-y-4">
            {plans.length === 0 && <p className="text-sm text-slate-500">No plans configured.</p>}
            {plans.map((plan) => (
              <div key={plan.id} className="border border-white/[.06] bg-white/[.02] p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-white">{plan.name}</div>
                  <div className="font-display text-lg font-bold text-white">{priceDisplay(plan.amountCents)}</div>
                </div>
                <div className="mt-1 flex items-center justify-between text-[11px] text-slate-600">
                  <span>{activeSubs.filter((s) => s.planId === plan.id).length} active</span>
                  <span className="uppercase tracking-wide">/ {plan.interval}</span>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="overflow-hidden">
          <div className="border-b border-white/[.06] p-5">
            <h2 className="font-display text-xl font-bold uppercase text-white">Subscriptions</h2>
            <p className="mt-1 text-xs text-slate-600">All subscription records, most recent first</p>
          </div>
          <div className="divide-y divide-white/[.05]">
            {subs.length === 0 && <div className="p-6 text-sm text-slate-500">No subscriptions yet. They appear here once clients check out.</div>}
            {subs.map((sub) => {
              const client = userById.get(sub.clientId);
              const plan = sub.planId ? planById.get(sub.planId) : undefined;
              return (
                <div key={sub.id} className="flex items-center gap-4 p-5">
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-white">{client?.fullName ?? client?.email ?? "Unknown client"}</div>
                    <div className="mt-1 text-xs text-slate-600">{plan?.name ?? "Coaching"} · {plan ? priceDisplay(plan.amountCents) : ""}</div>
                  </div>
                  <div className={`text-[10px] font-bold uppercase tracking-[.16em] ${statusStyle[sub.status] ?? "text-slate-400"}`}>
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
