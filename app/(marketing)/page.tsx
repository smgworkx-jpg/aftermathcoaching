import Link from "next/link";
import { ArrowRight, ChevronRight, Dumbbell, ShieldCheck } from "lucide-react";
import { Panel } from "@/components/ui/panel";
import { Ticker } from "@/components/ui/ticker";
import { RequestCoachingButton } from "@/components/billing/request-coaching-button";

const pillars = [
  {
    title: "Precision programming",
    copy: "Every set, target, tempo, and progression is written for your response — not copied off a template and renamed.",
    points: ["Sets, loads, and RIR prescribed", "Rebuilt when the data moves", "Substitutions for every machine"],
  },
  {
    title: "Weekly intelligence",
    copy: "Check-ins convert how the week actually felt into the next week's decision. Nothing waits a month to be noticed.",
    points: ["Bodyweight, energy, sleep, stress", "Reviewed inside 48 hours", "Written rationale, every change"],
  },
  {
    title: "Visible momentum",
    copy: "Adherence, load, bodyweight, and habits land in one view, so progress is a number you can point at.",
    points: ["Trend over daily noise", "Habit streaks that matter", "Photo and strength history"],
  },
];

const method = [
  ["01", "Assess", "Baseline your training age, recovery capacity, schedule, and the constraints you actually live with."],
  ["02", "Engineer", "Build the shortest reliable path from where you are to the physique you asked for."],
  ["03", "Execute", "Ship clear daily work with zero interpretation cost. Open the app, do the thing, log it."],
  ["04", "Refine", "Read the weekly signal and adjust before a plateau gets the chance to compound."],
];

const receipts = [
  ["94.6%", "Weekly check-in rate"],
  ["2.4h", "Median coach reply"],
  ["11.3 lb", "Median 16-week gain"],
  ["18 / 24", "Athletes in a build phase"],
];

export default function HomePage() {
  return (
    <main>
      {/* ---- Hero: left-weighted poster with an overlapping data slab ---- */}
      <section className="relative overflow-hidden px-4 pb-16 pt-32 lg:px-8 lg:pb-24 lg:pt-44">
        <div className="pointer-events-none absolute -right-24 top-40 hidden h-[42rem] w-64 rotate-12 stripes opacity-[.07] lg:block" />
        <div className="mx-auto max-w-7xl">
          <div className="grid items-end gap-10 lg:grid-cols-[1.15fr_.85fr]">
            <div className="relative z-10">
              <div className="reveal sticker">
                <span className="size-1.5 bg-void" /> Q3 intake · 4 seats
              </div>
              <h1 className="headline reveal delay-1 mt-6 text-[clamp(3.4rem,11vw,9rem)] text-bone">
                Your physique.
                <br />
                <span className="hollow">Under command.</span>
              </h1>
              <div className="reveal delay-2 mt-8 flex flex-col gap-6 border-l-4 border-neon pl-5 sm:max-w-xl">
                <p className="text-base leading-7 text-ash md:text-lg">
                  High-touch bodybuilding coaching run on exact programming, weekly accountability, and the data to
                  make every phase count. Small roster, no autopilot.
                </p>
              </div>
              <div className="reveal delay-3 mt-9 flex flex-wrap gap-4">
                <RequestCoachingButton className="btn btn-bone h-14 px-8 text-xs">
                  Start your transformation <ArrowRight size={16} />
                </RequestCoachingButton>
                <Link href="/#system" className="btn btn-outline h-14 px-8 text-xs">
                  See the system
                </Link>
              </div>
            </div>

            <div className="reveal delay-4 relative">
              <div className="absolute -inset-3 hidden stripes opacity-[.08] md:block" />
              <Panel tone="ultra" className="relative rotate-[-1.25deg] p-4 md:p-6">
                <div className="flex items-start justify-between gap-4 border-b-2 border-edge pb-4">
                  <div>
                    <div className="mono-label">Athlete console</div>
                    <div className="headline mt-1.5 text-3xl text-bone">Friday / Pull II</div>
                  </div>
                  <div className="grid size-10 shrink-0 place-items-center border-2 border-neon bg-neon text-bone">
                    <Dumbbell size={18} />
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <Metric value="92%" label="Adherence" />
                  <Metric value="183.4" label="Bodyweight" />
                  <Metric value="+7.2%" label="Strength" />
                </div>
                <div className="mt-4 border-2 border-edge bg-void p-4">
                  <div className="flex items-center justify-between">
                    <span className="mono-label text-bone">Training momentum</span>
                    <span className="mono-label text-lilac">12 weeks</span>
                  </div>
                  <div className="mt-6 flex h-24 items-end gap-1.5">
                    {[34, 48, 41, 58, 52, 67, 64, 79, 73, 84, 88, 96].map((height, index) => (
                      <div
                        key={index}
                        className={index === 11 ? "flex-1 bg-bone" : "flex-1 bg-neon"}
                        style={{ height: `${height}%`, opacity: index === 11 ? 1 : 0.35 + index * 0.055 }}
                      />
                    ))}
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between gap-3 border-2 border-neon bg-ultra/20 p-4">
                  <div className="min-w-0">
                    <div className="mono-label">Next protocol</div>
                    <div className="mt-1 truncate text-sm font-semibold text-bone">Upper-back density · 6 exercises</div>
                  </div>
                  <ChevronRight className="shrink-0 text-lilac" size={18} />
                </div>
              </Panel>
              <div className="absolute -bottom-6 -left-4 hidden items-center gap-3 border-2 border-bone bg-bone p-3 text-void shadow-[5px_5px_0_0_var(--color-ultra)] md:flex">
                <ShieldCheck size={18} />
                <div>
                  <div className="font-display text-sm uppercase leading-none">Check-in reviewed</div>
                  <div className="mono-label text-[.55rem] text-void/60">Coach response ready</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-2 gap-px border-2 border-edge bg-edge lg:grid-cols-4">
            {receipts.map(([value, label]) => (
              <div key={label} className="bg-coal p-5">
                <div className="mono-data font-display text-3xl text-lilac md:text-4xl">{value}</div>
                <div className="mono-label mt-2">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Ticker
        items={["Precision programming", "Weekly check-ins", "No cookie-cutter blocks", "Small roster", "Data over vibes"]}
      />

      {/* ---- System: zig-zag rows, not a row of equal cards ---- */}
      <section id="system" className="px-4 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 border-b-2 border-edge pb-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
            <div>
              <div className="eyebrow flex items-center gap-3">
                <span className="h-2.5 w-10 stripes-tight" />
                The operating system
              </div>
              <h2 className="headline mt-4 text-5xl text-bone md:text-8xl">
                Less noise.
                <br />
                <span className="text-neon">More signal.</span>
              </h2>
            </div>
            <p className="text-base leading-7 text-ash">
              Blacklinez replaces scattered spreadsheets, recycled plans, and reactive check-ins with one disciplined
              system built for measurable physique outcomes.
            </p>
          </div>

          <div className="mt-4">
            {pillars.map(({ title, copy, points }, index) => (
              <article
                key={title}
                className={`group grid gap-6 border-b-2 border-edge py-10 lg:grid-cols-2 lg:gap-16 ${index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}
              >
                <div className="flex items-start gap-5">
                  <span className="hollow-num shrink-0 text-6xl leading-none md:text-8xl">0{index + 1}</span>
                  <div>
                    <h3 className="headline text-3xl text-bone md:text-5xl">{title}</h3>
                    <p className="mt-4 max-w-md leading-7 text-ash">{copy}</p>
                  </div>
                </div>
                <ul className="grid content-start gap-px self-center border-2 border-edge bg-edge">
                  {points.map((point) => (
                    <li key={point} className="flex items-center gap-3 bg-coal p-4 transition group-hover:bg-slab">
                      <span className="size-2 shrink-0 rotate-45 bg-neon" />
                      <span className="text-sm text-bone">{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Method: hazard-ruled step list ---- */}
      <section id="method" className="border-y-2 border-edge bg-coal px-4 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="eyebrow">The Blacklinez method</div>
              <h2 className="headline mt-4 text-5xl text-bone md:text-7xl">Structure creates freedom.</h2>
            </div>
            <p className="max-w-sm leading-7 text-ash">
              Know the target. Execute the session. Report the signal. Adapt without emotion.
            </p>
          </div>
          <div className="mt-12 border-t-2 border-edge">
            {method.map(([num, title, copy]) => (
              <div
                key={num}
                className="group grid items-center gap-3 border-b-2 border-edge py-7 transition hover:bg-slab sm:grid-cols-[5rem_14rem_1fr] sm:gap-6"
              >
                <span className="font-display text-2xl text-neon transition group-hover:text-bone">{num}</span>
                <span className="headline text-3xl text-bone md:text-4xl">{title}</span>
                <span className="leading-7 text-ash transition group-hover:text-bone">{copy}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Ticker
        tone="bone"
        reverse
        speed="slow"
        items={["Apply now", "Limited roster", "Reviewed personally", "No payment to apply"]}
      />

      {/* ---- Closing call: full-bleed purple block ---- */}
      <section className="relative overflow-hidden bg-ultra px-4 py-20 text-bone lg:px-8 lg:py-28">
        <div className="pointer-events-none absolute inset-0 opacity-20 stripes-bone" />
        <div className="relative mx-auto max-w-5xl text-center">
          <div className="mono-label text-bone/70">Applications open</div>
          <h2 className="headline mt-4 text-[clamp(3rem,10vw,8rem)] text-bone">Ready to cross the line?</h2>
          <p className="mx-auto mt-5 max-w-xl leading-7 text-bone/80">
            Send your numbers and your goal. If the fit is right, you get a plan built around your week — not someone
            else&apos;s.
          </p>
          <div className="mt-9 flex justify-center">
            <RequestCoachingButton className="btn btn-bone h-16 px-10 text-sm">
              Apply for coaching <ArrowRight size={18} />
            </RequestCoachingButton>
          </div>
        </div>
      </section>

      <footer className="border-t-2 border-edge bg-void px-4 py-10 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div className="mono-label">© 2026 Aftermath X · Blacklinez Systems</div>
          <div className="flex flex-wrap gap-5">
            <Link className="mono-label transition hover:text-bone" href="/pricing">Coaching</Link>
            <Link className="mono-label transition hover:text-bone" href="/login">Sign in</Link>
            <Link className="mono-label transition hover:text-bone" href="/signup">Create account</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-2 border-edge bg-void p-3">
      <div className="mono-data font-display text-2xl text-bone">{value}</div>
      <div className="mono-label mt-1 text-[.52rem]">{label}</div>
    </div>
  );
}
