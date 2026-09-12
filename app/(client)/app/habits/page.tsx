import { Check } from "lucide-react";
import { SectionHeader } from "@/components/layout/section-header";
import { habits } from "@/lib/demo-data";

export default function HabitsPage() {
  return (
    <>
      <SectionHeader
        eyebrow="Daily standards"
        title="Habits"
        description="Small execution targets compound into the condition you want."
      />
      <div className="max-w-3xl space-y-3">
        {habits.map((habit, index) => (
          <button
            key={habit.name}
            className={`slab slab-lift flex w-full items-center gap-4 p-5 text-left ${habit.complete ? "slab-ultra" : ""}`}
          >
            <span className={`grid size-10 shrink-0 place-items-center border-2 ${habit.complete ? "border-neon bg-neon text-bone" : "border-edge text-transparent"}`}>
              <Check size={18} strokeWidth={3} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-display text-xl uppercase leading-none text-bone">{habit.name}</span>
              <span className="mono-label mt-1.5 block text-[.52rem]">{habit.detail} · daily</span>
            </span>
            <span className="mono-data shrink-0 font-display text-2xl text-lilac">
              {index < 2 ? "07" : "05"}<span className="text-sm text-ash">/7</span>
            </span>
          </button>
        ))}
      </div>
    </>
  );
}
