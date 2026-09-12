import { ArrowRight, Check } from "lucide-react";
import { Panel } from "@/components/ui/panel";
import { Ticker } from "@/components/ui/ticker";
import { RequestCoachingButton } from "@/components/billing/request-coaching-button";

const included = [
  ["Custom training program", "Written for your schedule, equipment, and history"],
  ["Weekly check-ins & review", "Read and answered inside 48 hours"],
  ["Habit tracking", "The daily standards that hold the plan together"],
  ["Direct coach messaging", "One thread, no support queue"],
  ["Progress analysis", "Bodyweight, load, adherence, and photo history"],
  ["Monthly strategy call", "Zoom out, reset the target, re-plan the block"],
];

const notIncluded = ["Cookie-cutter templates", "Bot check-ins", "Locked-in contracts"];

export default function PricingPage() {
  return (
    <main className="pt-28 lg:pt-36">
      <section className="px-4 pb-14 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
            <div>
              <div className="reveal sticker">
                <span className="size-1.5 bg-void" /> Application only
              </div>
              <h1 className="headline reveal delay-1 mt-6 text-[clamp(3.2rem,10vw,8rem)] text-bone">
                Request
                <br />
                <span className="hollow">coaching.</span>
              </h1>
            </div>
            <p className="reveal delay-2 border-l-4 border-neon pl-5 text-base leading-7 text-ash">
              Premium 1:1 coaching on a deliberately small roster. There is nothing to buy on this page — send your
              stats and your goal, and the fit gets decided by a person.
            </p>
          </div>
        </div>
      </section>

      <Ticker items={["No payment to apply", "Reviewed personally", "Small roster", "Cancel anytime once enrolled"]} />

      <section className="px-4 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.25fr_.75fr] lg:gap-8">
          <Panel className="relative overflow-hidden p-6 md:p-9">
            <div className="absolute right-0 top-0 h-full w-2.5 stripes-tight" />
            <div className="mono-label">Blacklinez coaching</div>
            <div className="headline mt-3 text-5xl text-bone md:text-6xl">Everything included</div>
            <div className="mt-8 grid gap-px border-2 border-edge bg-edge sm:grid-cols-2">
              {included.map(([title, detail]) => (
                <div key={title} className="bg-coal p-5">
                  <div className="flex items-center gap-2.5">
                    <span className="grid size-5 shrink-0 place-items-center bg-neon text-bone">
                      <Check size={13} strokeWidth={3} />
                    </span>
                    <span className="font-display text-lg uppercase leading-none text-bone">{title}</span>
                  </div>
                  <p className="mt-2 pl-[1.9rem] text-xs leading-5 text-ash">{detail}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3 border-t-2 border-edge pt-6">
              <span className="mono-label">Not on the menu</span>
              {notIncluded.map((item) => (
                <span key={item} className="mono-label border-2 border-edge px-2.5 py-1 text-[.55rem] line-through decoration-alert decoration-2">
                  {item}
                </span>
              ))}
            </div>
          </Panel>

          <div className="grid content-start gap-6">
            <Panel tone="ultra" className="p-6 md:p-8">
              <div className="mono-label text-lilac">Cost to apply</div>
              <div className="headline mt-3 text-6xl text-bone">$0</div>
              <p className="mt-4 text-sm leading-6 text-ash">
                Pricing is confirmed after the fit call, once the block is scoped. Applying costs nothing and locks
                nothing in.
              </p>
              <div className="my-6 h-1.5 stripes-tight" />
              <RequestCoachingButton className="btn btn-bone w-full">
                Request coaching <ArrowRight size={16} />
              </RequestCoachingButton>
              <p className="mono-label mt-4 text-center text-[.55rem] leading-5">
                Coach reads every request personally
              </p>
            </Panel>
            <Panel className="p-6">
              <div className="mono-label">What happens next</div>
              <ol className="mt-5 space-y-4">
                {[
                  "You send stats, goals, and your training history.",
                  "Your account is created in the same step.",
                  "If it fits, you get a scoped plan and a start date.",
                ].map((step, index) => (
                  <li key={step} className="flex gap-4">
                    <span className="font-display text-xl leading-none text-neon">0{index + 1}</span>
                    <span className="text-sm leading-6 text-ash">{step}</span>
                  </li>
                ))}
              </ol>
            </Panel>
          </div>
        </div>
      </section>
    </main>
  );
}
