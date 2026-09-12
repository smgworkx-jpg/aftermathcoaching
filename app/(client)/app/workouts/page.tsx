import Link from "next/link";
import { ChevronRight, Dumbbell } from "lucide-react";
import { SectionHeader } from "@/components/layout/section-header";
import { Panel } from "@/components/ui/panel";

const days = ["Push I", "Pull I", "Legs", "Upper", "Pull II"];

export default function WorkoutsPage() {
  return (
    <>
      <SectionHeader eyebrow="Active protocol" title="Workouts" description="Blacklinez Mass I · Week 8 of 16" />
      <div className="grid gap-4 md:grid-cols-2">
        {days.map((day, index) => {
          const today = index === days.length - 1;
          return (
            <Link href="/app/workouts/1" key={day}>
              <Panel lift tone={today ? "ultra" : "default"} className="flex items-center gap-4 p-5">
                <div className={`grid size-12 shrink-0 place-items-center border-2 ${today ? "border-neon bg-neon text-void" : "border-edge text-lilac"}`}>
                  <Dumbbell size={19} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mono-label text-[.52rem]">Day {index + 1} · {today ? "Today" : "Complete"}</div>
                  <div className="headline mt-1.5 text-2xl text-bone">{day}</div>
                </div>
                <ChevronRight className="shrink-0 text-ash" />
              </Panel>
            </Link>
          );
        })}
      </div>
    </>
  );
}
