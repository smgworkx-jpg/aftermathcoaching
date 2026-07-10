import { Activity, CreditCard, Shield, UserCog, Users } from "lucide-react";
import { admin } from "@netlify/identity";
import { SectionHeader } from "@/components/layout/section-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { Panel } from "@/components/ui/panel";
import { db } from "@/db";
import { subscriptionPlans, subscriptions, users as usersTable } from "@/db/schema";
import { requireRole } from "@/lib/auth/server";
import { resolveRole, type AppRole } from "@/lib/auth/roles";
import { ensureCoachingPlan } from "@/lib/auth/sync";
import { priceDisplay } from "@/lib/stripe/config";
import { UsersTable, type AdminUser } from "./users-table";

const ACTIVE_STATUSES = new Set(["active", "trialing", "past_due"]);

export default async function AdminPage() {
  await requireRole(["admin"]);
  await ensureCoachingPlan().catch(() => null);

  const [identityUsers, dbUsers, plans, subs] = await Promise.all([
    admin.listUsers({ perPage: 200 }).catch(() => []),
    db.select().from(usersTable).catch(() => []),
    db.select().from(subscriptionPlans).catch(() => []),
    db.select().from(subscriptions).catch(() => []),
  ]);

  const dbByIdentity = new Map(dbUsers.map((u) => [u.identityId, u]));
  const subsByClient = new Map<string, (typeof subs)[number][]>();
  for (const sub of subs) {
    const list = subsByClient.get(sub.clientId) ?? [];
    list.push(sub);
    subsByClient.set(sub.clientId, list);
  }
  const planById = new Map(plans.map((p) => [p.id, p]));

  const adminUsers: AdminUser[] = identityUsers.map((u) => {
    const dbUser = dbByIdentity.get(u.id);
    const userSubs = dbUser ? subsByClient.get(dbUser.id) ?? [] : [];
    return {
      identityId: u.id,
      name: u.name ?? "",
      email: u.email ?? "",
      role: resolveRole(u.roles, u.role) as AppRole,
      isActive: dbUser?.isActive ?? true,
      hasSubscription: userSubs.some((s) => ACTIVE_STATUSES.has(s.status)),
    };
  });

  const roleCount = (role: AppRole) => adminUsers.filter((u) => u.role === role).length;
  const activeSubs = subs.filter((s) => ACTIVE_STATUSES.has(s.status));
  const mrrCents = activeSubs.reduce((sum, s) => {
    const plan = s.planId ? planById.get(s.planId) : undefined;
    return sum + (plan?.amountCents ?? 0);
  }, 0);

  return (
    <>
      <SectionHeader
        eyebrow="Platform administration"
        title="Admin"
        description="Manage roles, accounts, and revenue across the entire platform."
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total users" value={String(adminUsers.length)} detail={`${roleCount("coach")} coaches · ${roleCount("client")} clients`} icon={Users} />
        <StatCard label="Admins" value={String(roleCount("admin"))} detail="Full platform access" icon={Shield} />
        <StatCard label="Active subscriptions" value={String(activeSubs.length)} detail={`${subs.length} total on record`} icon={CreditCard} />
        <StatCard label="Monthly recurring" value={priceDisplay(mrrCents)} detail="From active subscriptions" icon={Activity} />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.55fr_.45fr]">
        <Panel className="overflow-hidden">
          <div className="flex items-center gap-3 border-b border-white/[.06] p-5">
            <UserCog size={18} className="text-violet-300" />
            <div>
              <h2 className="font-display text-xl font-bold uppercase text-white">User management</h2>
              <p className="mt-1 text-xs text-slate-600">Change roles or suspend accounts. Role changes apply immediately.</p>
            </div>
          </div>
          <UsersTable users={adminUsers} />
        </Panel>

        <Panel className="p-5">
          <div className="eyebrow">Subscription plans</div>
          <div className="mt-5 space-y-4">
            {plans.length === 0 && <p className="text-sm text-slate-500">No plans configured.</p>}
            {plans.map((plan) => {
              const count = activeSubs.filter((s) => s.planId === plan.id).length;
              return (
                <div key={plan.id} className="border border-white/[.06] bg-white/[.02] p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-white">{plan.name}</div>
                    <div className="font-display text-lg font-bold text-white">{priceDisplay(plan.amountCents)}</div>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[11px] text-slate-600">
                    <span>{count} active</span>
                    <span className="uppercase tracking-wide">/ {plan.interval}</span>
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
