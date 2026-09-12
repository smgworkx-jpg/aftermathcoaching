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
      <SectionHeader
        eyebrow="Account control"
        title="Settings"
        description="Keep your profile and training preferences current."
      />
      <div className="grid gap-6 lg:grid-cols-[1fr_.6fr]">
        <Panel className="p-6 md:p-8">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="field-label">Full name<input className="field-input" defaultValue={name} /></label>
            <label className="field-label">Email<input className="field-input" defaultValue={email} readOnly /></label>
            <label className="field-label">Timezone<input className="field-input" defaultValue="America/New_York" /></label>
            <label className="field-label">Units<input className="field-input" defaultValue="Imperial" /></label>
          </div>
          <div className="mt-7 border-t-2 border-edge pt-6">
            <Button>Save profile</Button>
          </div>
        </Panel>

        <Panel tone={isActive ? "ultra" : "default"} className="p-6">
          <div className="mono-label">Coaching subscription</div>
          <div className="headline mt-3 text-3xl text-bone">{COACHING_PLAN.name}</div>
          <div className="mono-data mt-2 text-sm text-ash">{priceDisplay(COACHING_PLAN.amountCents)} / month</div>
          <div className="my-6 h-1.5 stripes-tight" />
          {isActive ? (
            <div>
              <div className="mono-label inline-flex items-center gap-2 border-2 border-neon px-2.5 py-1.5 text-lilac">
                <span className="size-2 bg-neon" /> {sub?.status === "trialing" ? "Trialing" : "Active"}
              </div>
              {sub?.currentPeriodEnd && (
                <p className="mono-label mt-4 text-[.55rem]">
                  Renews {new Date(sub.currentPeriodEnd).toLocaleDateString()}
                </p>
              )}
            </div>
          ) : (
            <div>
              <p className="mb-5 text-sm leading-6 text-ash">
                {sub ? "Your subscription is not active right now." : "Activate coaching to unlock the full protocol."}
              </p>
              <SubscribeButton className="btn btn-primary w-full">
                Subscribe — {priceDisplay(COACHING_PLAN.amountCents)}/mo
              </SubscribeButton>
            </div>
          )}
        </Panel>
      </div>
    </>
  );
}
