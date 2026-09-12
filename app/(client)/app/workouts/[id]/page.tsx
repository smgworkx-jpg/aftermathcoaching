"use client";

import { useState } from "react";
import { Check, Clock, Dumbbell, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { workoutExercises } from "@/lib/demo-data";

export default function WorkoutLoggerPage() {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const totalSets = workoutExercises.length * 3;
  const doneSets = Object.values(completed).filter(Boolean).length;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b-2 border-edge pb-5">
        <div>
          <div className="mono-label flex items-center gap-3">
            <span className="h-2.5 w-8 stripes-tight" />
            Week 8 / day 5
          </div>
          <h1 className="headline mt-3 text-5xl text-bone md:text-6xl">Pull II</h1>
          <p className="mono-label mt-2">Upper-back density · 6 exercises</p>
        </div>
        <div className="border-2 border-edge bg-coal px-4 py-3 text-right">
          <div className="mono-data flex items-center gap-2 text-lg text-bone">
            <Clock size={15} className="text-lilac" /> 00:00
          </div>
          <div className="mono-label mt-1 text-[.5rem]">Session time</div>
        </div>
      </div>

      <div className="space-y-4">
        {workoutExercises.map((exercise, exerciseIndex) => (
          <section key={exercise.name} className="slab">
            <div className="flex items-center gap-3 border-b-2 border-edge p-4">
              <div className="grid size-9 shrink-0 place-items-center border-2 border-neon bg-neon font-mono text-xs font-extrabold text-void">
                {exerciseIndex + 1}
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="truncate font-display text-lg uppercase leading-none text-bone">{exercise.name}</h2>
                <div className="mono-label mt-1.5 truncate text-[.52rem]">{exercise.prescription} · {exercise.note}</div>
              </div>
            </div>
            <div className="p-3">
              <div className="mono-label mb-2 grid grid-cols-[2.2rem_1fr_1fr_3rem] gap-2 px-1 text-center text-[.5rem]">
                <span>Set</span>
                <span>Weight</span>
                <span>Reps</span>
                <span>Done</span>
              </div>
              {[1, 2, 3].map((set) => {
                const key = `${exerciseIndex}-${set}`;
                const isDone = Boolean(completed[key]);
                return (
                  <div key={set} className="mb-2 grid grid-cols-[2.2rem_1fr_1fr_3rem] gap-2">
                    <div className="mono-data grid place-items-center text-sm text-ash">{set}</div>
                    <input inputMode="decimal" className="field-input min-w-0 text-center" placeholder={set === 1 ? "180" : "—"} />
                    <input inputMode="numeric" className="field-input min-w-0 text-center" placeholder={set === 1 ? "9" : "—"} />
                    <button
                      onClick={() => setCompleted((state) => ({ ...state, [key]: !state[key] }))}
                      aria-label={`Mark set ${set} complete`}
                      aria-pressed={isDone}
                      className={`grid h-12 place-items-center border-2 transition ${isDone ? "border-neon bg-neon text-void" : "border-edge text-ash hover:border-neon"}`}
                    >
                      <Check size={16} strokeWidth={3} />
                    </button>
                  </div>
                );
              })}
              <button className="mono-label mt-1 flex items-center gap-2 px-1 py-2 text-[.52rem] text-lilac transition hover:text-bone">
                <History size={13} /> Previous: 175 × 10, 9, 8
              </button>
            </div>
          </section>
        ))}
      </div>

      <div className="sticky bottom-20 mt-6 border-2 border-neon bg-coal p-3 lg:bottom-4">
        <div className="mono-label mb-2 flex items-center justify-between px-1">
          <span>Sets logged</span>
          <span className="mono-data text-lilac">{doneSets} / {totalSets}</span>
        </div>
        <Button className="w-full"><Dumbbell size={16} /> Complete workout</Button>
      </div>
    </div>
  );
}
