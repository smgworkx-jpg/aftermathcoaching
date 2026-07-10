import { Check } from "lucide-react";
import { SubscribeButton } from "@/components/billing/subscribe-button";
import { COACHING_PLAN, priceDisplay } from "@/lib/stripe/config";

const features = [
  "Custom training program",
  "Weekly check-ins & review",
  "Habit tracking & accountability",
  "Direct coach messaging",
  "Advanced progress analysis",
  "Monthly strategy call",
];

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 pb-24 pt-40">
      <div className="text-center">
        <div className="eyebrow">Coaching investment</div>
        <h1 className="mt-4 font-display text-6xl font-bold uppercase tracking-[-.04em] md:text-8xl">Choose your standard.</h1>
        <p className="mx-auto mt-5 max-w-xl text-slate-400">
          Premium 1:1 coaching with the systems, feedback, and accountability required to execute — one price, everything included.
        </p>
      </div>
      <div className="mx-auto mt-14 max-w-md">
        <div className="relative border border-violet-400/45 bg-violet-500/[.08] p-8 shadow-[0_0_60px_rgba(139,92,246,.12)]">
          <div className="absolute right-0 top-0 bg-violet-500 px-3 py-1 text-[9px] font-bold uppercase tracking-[.2em]">All access</div>
          <h2 className="font-display text-3xl font-bold uppercase">{COACHING_PLAN.name}</h2>
          <div className="mt-6 font-display text-7xl font-bold">
            {priceDisplay(COACHING_PLAN.amountCents)}
            <span className="text-sm font-normal text-slate-500"> / month</span>
          </div>
          <div className="my-7 h-px bg-white/[.08]" />
          <ul className="space-y-4">
            {features.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                <Check size={15} className="text-violet-300" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <SubscribeButton className="clip-button block w-full bg-violet-500 px-5 py-4 text-center text-xs font-bold uppercase tracking-[.15em] text-white transition hover:bg-violet-400 disabled:opacity-60">
              Start coaching — {priceDisplay(COACHING_PLAN.amountCents)}/mo
            </SubscribeButton>
          </div>
          <p className="mt-4 text-center text-[11px] text-slate-500">Secure checkout via Stripe · Cancel anytime</p>
        </div>
      </div>
    </main>
  );
}
