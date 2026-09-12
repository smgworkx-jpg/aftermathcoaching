import { Camera } from "lucide-react";
import { SectionHeader } from "@/components/layout/section-header";
import { Panel } from "@/components/ui/panel";
import { weightData } from "@/lib/demo-data";

export default function ProgressPage() {
  return (
    <>
      <SectionHeader eyebrow="Outcome history" title="Progress" description="Your trend matters more than any single day." />
      <Panel className="p-5 md:p-6">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-edge pb-5">
          <h2 className="headline text-2xl text-bone">Bodyweight trend</h2>
          <div className="text-right">
            <div className="mono-data font-display text-4xl leading-none text-bone">186.0 lb</div>
            <div className="mono-label mt-1.5 text-lilac">+2.2 lb this phase</div>
          </div>
        </div>
        <div className="mt-10 flex h-48 items-end gap-2.5">
          {weightData.map((value, index) => (
            <div key={index} className="group relative flex-1">
              <div className="mono-label absolute -top-6 w-full text-center text-[.5rem] text-lilac opacity-0 transition group-hover:opacity-100">
                {value}
              </div>
              <div
                className={index === weightData.length - 1 ? "bg-bone" : "bg-neon"}
                style={{ height: `${48 + (value - 183) * 30}px`, opacity: index === weightData.length - 1 ? 1 : 0.4 + index * 0.07 }}
              />
            </div>
          ))}
        </div>
        <div className="mono-label mt-3 flex justify-between border-t-2 border-edge pt-3 text-[.52rem]">
          <span>Week 1</span>
          <span>Week 8</span>
        </div>
      </Panel>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {["Front", "Side", "Back"].map((angle) => (
          <Panel key={angle} lift className="aspect-[3/4] p-3">
            <div className="grid h-full place-items-center border-2 border-dashed border-edge bg-void">
              <div className="text-center">
                <Camera size={20} className="mx-auto text-lilac" />
                <div className="headline mt-4 text-2xl text-ash">{angle}</div>
                <div className="mono-label mt-1.5 text-[.5rem]">Upload photo</div>
              </div>
            </div>
          </Panel>
        ))}
      </div>
    </>
  );
}
