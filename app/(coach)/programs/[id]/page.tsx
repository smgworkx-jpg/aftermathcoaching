import { SectionHeader } from "@/components/layout/section-header";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { workoutExercises } from "@/lib/demo-data";

const days = ["Push I", "Pull I", "Legs", "Upper", "Lower"];

export default function ProgramDetailPage() {
  return (
    <>
      <SectionHeader
        eyebrow="Program / active"
        title="Blacklinez Mass I"
        description="Five-day hypertrophy protocol · 16 weeks"
        action={<Button>Assign to client</Button>}
      />
      <div className="grid gap-6 lg:grid-cols-2">
        {days.map((day, dayIndex) => (
          <Panel key={day} lift className="p-5">
            <div className="flex items-end justify-between gap-3 border-b-2 border-edge pb-3">
              <h2 className="headline text-3xl text-bone">{day}</h2>
              <span className="mono-label">Day {dayIndex + 1}</span>
            </div>
            {workoutExercises.slice(0, 3).map((exercise, index) => (
              <div key={exercise.name} className="flex items-center gap-3 border-b-2 border-edge py-3 last:border-b-0">
                <span className="mono-label shrink-0 text-[.55rem] text-lilac">0{index + 1}</span>
                <div className="min-w-0 flex-1 truncate text-sm text-bone">{exercise.name}</div>
                <span className="mono-data shrink-0 text-xs text-lilac">{exercise.prescription}</span>
              </div>
            ))}
          </Panel>
        ))}
      </div>
    </>
  );
}
