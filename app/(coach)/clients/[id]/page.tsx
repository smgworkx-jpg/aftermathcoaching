import { Calendar, ClipboardCheck, Dumbbell, MessageSquare, Pencil } from "lucide-react";
import { SectionHeader } from "@/components/layout/section-header";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { ProgressRing } from "@/components/ui/progress-ring";
import { weightData, workoutExercises } from "@/lib/demo-data";

const profile = [
  ["Goal", "Muscle gain"],
  ["Experience", "Advanced"],
  ["Training", "5 days"],
  ["Check-in", "Friday"],
  ["Steps", "10,400"],
  ["Timezone", "EST"],
];

export default function ClientDetailPage() {
  return (
    <>
      <SectionHeader
        eyebrow="Athlete profile / active"
        title="Mason Cole"
        description="Mass phase · Week 8 of 16 · Next check-in due today"
        action={
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary"><MessageSquare size={15} /> Message</Button>
            <Button><Pencil size={15} /> Edit protocol</Button>
          </div>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1.3fr_.7fr]">
        <div className="grid content-start gap-6">
          <Panel className="p-5 md:p-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 className="headline text-2xl text-bone">Performance trajectory</h2>
              <span className="mono-label border-2 border-neon px-2.5 py-1.5 text-lilac">+2.2 lb / 8 weeks</span>
            </div>
            <div className="mt-8 flex h-44 items-end gap-2.5">
              {weightData.map((value, index) => (
                <div key={index} className="group relative flex-1">
                  <div className="mono-label absolute -top-6 w-full text-center text-[.52rem] text-lilac opacity-0 transition group-hover:opacity-100">
                    {value}
                  </div>
                  <div
                    className={index === weightData.length - 1 ? "bg-bone" : "bg-neon"}
                    style={{ height: `${40 + (value - 183) * 20}px`, opacity: index === weightData.length - 1 ? 1 : 0.4 + index * 0.07 }}
                  />
                </div>
              ))}
            </div>
            <div className="mono-label mt-3 flex justify-between border-t-2 border-edge pt-3 text-[.52rem]">
              <span>Week 1</span>
              <span>Week 8</span>
            </div>
          </Panel>

          <Panel className="p-5 md:p-6">
            <div className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-edge pb-4">
              <h2 className="headline text-2xl text-bone">Current program</h2>
              <span className="mono-label">Blacklinez Mass I</span>
            </div>
            {workoutExercises.slice(0, 3).map((exercise, index) => (
              <div key={exercise.name} className="flex items-center gap-4 border-b-2 border-edge py-4 last:border-b-0">
                <span className="hollow-num shrink-0 text-3xl leading-none">0{index + 1}</span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-bone">{exercise.name}</div>
                  <div className="mono-label mt-1 text-[.52rem]">{exercise.note}</div>
                </div>
                <div className="mono-data shrink-0 font-display text-lg text-lilac">{exercise.prescription}</div>
              </div>
            ))}
          </Panel>
        </div>

        <div className="grid content-start gap-6">
          <Panel className="grid gap-6 p-5 sm:grid-cols-2">
            <ProgressRing value={94} label="training" />
            <ProgressRing value={86} label="habits" />
          </Panel>
          <Panel className="p-5">
            <div className="mono-label">Quick profile</div>
            <div className="mt-5 grid grid-cols-2 gap-px border-2 border-edge bg-edge">
              {profile.map(([label, value]) => (
                <div key={label} className="bg-coal p-3">
                  <div className="mono-label text-[.5rem]">{label}</div>
                  <div className="mt-1 text-sm text-bone">{value}</div>
                </div>
              ))}
            </div>
          </Panel>
          <Panel tone="ultra" className="p-5">
            <div className="flex items-center gap-2.5">
              <ClipboardCheck size={16} className="text-lilac" />
              <h2 className="headline text-xl text-bone">Coach note</h2>
            </div>
            <p className="mt-4 text-sm leading-6 text-ash">
              Push food up if the seven-day average stalls again. Elbow is tolerating neutral-grip work well.
            </p>
            <button className="mono-label mt-5 border-2 border-edge px-3 py-2 text-lilac transition hover:border-neon hover:text-bone">
              Update private note
            </button>
          </Panel>
          <div className="grid grid-cols-2 gap-px border-2 border-edge bg-edge">
            <Quick icon={Dumbbell} label="Program" />
            <Quick icon={Calendar} label="Check-ins" />
          </div>
        </div>
      </div>
    </>
  );
}

function Quick({ icon: Icon, label }: { icon: typeof Dumbbell; label: string }) {
  return (
    <button className="mono-label flex items-center justify-center gap-2 bg-coal p-4 text-lilac transition hover:bg-neon hover:text-void">
      <Icon size={15} /> {label}
    </button>
  );
}
