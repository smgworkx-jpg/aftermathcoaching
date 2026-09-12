import { Activity, ClipboardCheck, Dumbbell, Users } from "lucide-react";
import { SectionHeader } from "@/components/layout/section-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { Panel } from "@/components/ui/panel";

const adherence = [72, 78, 74, 82, 80, 85, 88, 91, 87, 90, 92, 89];

export default function AnalyticsPage() {
  return (
    <>
      <SectionHeader
        eyebrow="Business intelligence"
        title="Analytics"
        description="Monitor athlete outcomes and the operating health of the coaching roster."
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Retention" value="94%" detail="Trailing 90 days" icon={Users} />
        <StatCard label="Check-in rate" value="91%" detail="On time this week" icon={ClipboardCheck} />
        <StatCard label="Workout rate" value="88%" detail="Across active roster" icon={Dumbbell} />
        <StatCard label="Response time" value="2.4h" detail="Median coach reply" icon={Activity} />
      </div>
      <Panel className="mt-8 p-5 md:p-6">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-edge pb-4">
          <h2 className="headline text-2xl text-bone">Roster adherence</h2>
          <span className="mono-label">Last 12 weeks</span>
        </div>
        <div className="mt-8 flex h-52 items-end gap-2">
          {adherence.map((height, index) => (
            <div key={index} className="flex flex-1 flex-col items-center gap-2">
              <div
                className={index === adherence.length - 1 ? "w-full bg-bone" : "w-full bg-neon"}
                style={{ height: `${height * 1.6}px`, opacity: index === adherence.length - 1 ? 1 : 0.35 + index * 0.05 }}
              />
              <span className="mono-label hidden text-[.5rem] sm:block">{index + 1}</span>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}
