import { eq } from "drizzle-orm";
import { getUser } from "@netlify/identity";
import { SectionHeader } from "@/components/layout/section-header";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { SubscribeButton } from "@/components/billing/subscribe-button";
import { db } from "@/db";
import { subscriptions, users } from "@/db/schema";
import { COACHING_PLAN, priceDisplay } from "@/lib/stripe/config";

const ACTIVE_STATUSES = new Set(["active", "trialing"]);

export default async function ClientSettingsPage() {
  const identity = await getUser().catch(() => null);
  const name = identity?.name ?? "";
  const email = identity?.email ?? "";

  let sub: (typeof subscriptions.$inferSelect) | undefined;
  if (identity) {
    const [dbUser] = await db.select().from(users).where(eq(users.identityId, identity.id)).limit(1).catch(() => []);
    if (dbUser) {
      [sub] = await db.select().from(subscriptions).where(eq(subscriptions.clientId, dbUser.id)).limit(1).catch(() => []);
    }
  }
  const isActive = sub ? ACTIVE_STATUSES.has(sub.status) : false;

  return (
    <>
      <SectionHeader eyebrow="Account control" title="Settings" description="Keep your profile and training preferences current." />
      <div className="grid gap-5 lg:grid-cols-[1fr_.6fr]">
        <Panel className="p-6">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="field-label">Full name<input className="field-input" defaultValue={name} /></label>
            <label className="field-label">Email<input className="field-input" defaultValue={email} readOnly /></label>
            <label className="field-label">Timezone<input className="field-input" defaultValue="America/New_York" /></label>
            <label className="field-label">Units<input className="field-input" defaultValue="Imperial" /></label>
          </div>
          <Button className="mt-6">Save profile</Button>
        </Panel>

        <Panel className="p-6">
          <div className="eyebrow">Coaching subscription</div>
          <div className="mt-4 font-display text-3xl font-bold text-white">{COACHING_PLAN.name}</div>
          <div className="mt-1 text-sm text-slate-500">{priceDisplay(COACHING_PLAN.amountCents)} / month</div>
          <div className="my-5 h-px bg-white/[.08]" />
          {isActive ? (
            <div>
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-300">
                <span className="size-2 rounded-full bg-emerald-400" /> {sub?.status === "trialing" ? "Trialing" : "Active"}
              </div>
              {sub?.currentPeriodEnd && (
                <p className="mt-3 text-xs text-slate-600">Renews {new Date(sub.currentPeriodEnd).toLocaleDateString()}</p>
              )}
            </div>
          ) : (
            <div>
              <p className="mb-4 text-sm text-slate-500">
                {sub ? "Your subscription is not active." : "Activate your coaching to unlock the full protocol."}
              </p>
              <SubscribeButton className="clip-button block w-full bg-violet-500 px-5 py-3.5 text-center text-xs font-bold uppercase tracking-[.15em] text-white transition hover:bg-violet-400 disabled:opacity-60">
                Subscribe — {priceDisplay(COACHING_PLAN.amountCents)}/mo
              </SubscribeButton>
            </div>
          )}
        </Panel>
      </div>
    </>
  );
}
