import Link from "next/link";
import { ArrowRight, Check, ChevronRight, ClipboardCheck, Dumbbell, Flame, MessageSquare, Scale } from "lucide-react";
import { SectionHeader } from "@/components/layout/section-header";
import { Panel } from "@/components/ui/panel";
import { ProgressRing } from "@/components/ui/progress-ring";
import { habits } from "@/lib/demo-data";

export default function ClientDashboard() {
  return (
    <>
      <SectionHeader
        eyebrow="Friday / week 8"
        title="Execute the day"
        description="Four tasks stand between you and a complete day."
      />

      <div className="grid gap-6 xl:grid-cols-[1.25fr_.75fr]">
        <div className="grid content-start gap-6">
          <Panel tone="ultra" className="relative overflow-hidden p-6 md:p-8">
            <div className="absolute right-0 top-0 h-full w-2.5 stripes-tight" />
            <div className="mono-label flex items-center gap-2 text-lilac">
              <Flame size={13} /> Today&apos;s protocol
            </div>
            <h2 className="headline mt-4 text-5xl text-bone md:text-7xl">
              Pull II
              <br />
              <span className="hollow text-4xl md:text-5xl">Upper-back density</span>
            </h2>
            <div className="mono-label mt-7 flex flex-wrap gap-x-6 gap-y-2">
              <span>6 exercises</span>
              <span>21 working sets</span>
              <span>~72 minutes</span>
            </div>
            <Link href="/app/workouts/1" className="btn btn-bone mt-8 h-14 px-8 text-xs">
              Start workout <ArrowRight size={16} />
            </Link>
          </Panel>

          <Panel className="p-5 md:p-6">
            <div className="flex flex-wrap items-end justify-between gap-5 border-b-2 border-edge pb-5">
              <div>
                <div className="mono-label">Daily commitments</div>
                <h2 className="headline mt-2 text-3xl text-bone">Habits</h2>
              </div>
              <ProgressRing value={50} label="complete" />
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {habits.map((habit) => (
                <button
                  key={habit.name}
                  className={`flex items-center gap-3 border-2 p-4 text-left transition ${habit.complete ? "border-neon bg-ultra/25" : "border-edge bg-void hover:border-neon/50"}`}
                >
                  <span className={`grid size-6 shrink-0 place-items-center border-2 ${habit.complete ? "border-neon bg-neon text-void" : "border-edge text-transparent"}`}>
                    <Check size={13} strokeWidth={3} />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-display text-base uppercase leading-none text-bone">{habit.name}</span>
                    <span className="mono-label mt-1.5 block text-[.52rem]">{habit.detail}</span>
                  </span>
                </button>
              ))}
            </div>
          </Panel>
        </div>

        <div className="grid content-start gap-6">
          <Panel className="p-5">
            <div className="mono-label border-b-2 border-edge pb-3">Current signal</div>
            <div className="mt-5 grid grid-cols-2 gap-px border-2 border-edge bg-edge">
              <Summary icon={Scale} value="186.0" label="lb · +0.4" />
              <Summary icon={Dumbbell} value="94%" label="training" />
              <Summary icon={ClipboardCheck} value="Today" label="check-in due" />
              <Summary icon={MessageSquare} value="02" label="unread" />
            </div>
          </Panel>

          <Panel className="p-5">
            <div className="flex items-end justify-between gap-3">
              <div>
                <div className="mono-label">Phase position</div>
                <h2 className="headline mt-2 text-2xl text-bone">Blacklinez Mass I</h2>
              </div>
              <div className="mono-data shrink-0 font-display text-4xl leading-none text-lilac">
                8<span className="text-base text-ash">/16</span>
              </div>
            </div>
            <div className="mt-5 flex gap-1">
              {Array.from({ length: 16 }).map((_, index) => (
                <span key={index} className={`h-4 flex-1 border ${index < 8 ? "border-neon bg-neon" : "border-edge bg-void"}`} />
              ))}
            </div>
            <div className="mono-label mt-3 flex justify-between text-[.5rem]">
              <span>Started May 15</span>
              <span>8 weeks remain</span>
            </div>
          </Panel>

          <Link href="/app/messages">
            <Panel lift className="flex items-center gap-4 p-5">
              <div className="grid size-11 shrink-0 place-items-center border-2 border-neon bg-neon text-void">
                <MessageSquare size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="mono-label text-[.52rem]">Coach Alexander · 22 min ago</div>
                <div className="mt-1.5 truncate text-sm text-bone">Top set looked cleaner. Hold the load…</div>
              </div>
              <ChevronRight className="shrink-0 text-ash" size={17} />
            </Panel>
          </Link>
        </div>
      </div>
    </>
  );
}

function Summary({ icon: Icon, value, label }: { icon: typeof Scale; value: string; label: string }) {
  return (
    <div className="bg-coal p-4">
      <Icon size={15} className="text-lilac" />
      <div className="mono-data mt-5 font-display text-2xl text-bone">{value}</div>
      <div className="mono-label mt-1 text-[.5rem]">{label}</div>
    </div>
  );
}
