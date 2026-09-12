import type { LucideIcon } from "lucide-react";
import { Panel } from "@/components/ui/panel";

export function StatCard({
  label,
  value,
  detail,
  icon: Icon,
  urgent = false,
}: {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
  urgent?: boolean;
}) {
  return (
    <Panel tone={urgent ? "alert" : "default"} lift className="relative overflow-hidden p-5">
      <div className={`absolute right-0 top-0 h-full w-2 ${urgent ? "stripes-alert" : "stripes-tight opacity-70"}`} />
      <div className="flex items-start justify-between gap-3 pr-4">
        <div className={`grid size-9 shrink-0 place-items-center border-2 ${urgent ? "border-alert text-alert" : "border-edge text-lilac"}`}>
          <Icon size={16} />
        </div>
        <div className="mono-label pt-1 text-right">{label}</div>
      </div>
      <div className="mt-7 font-display text-5xl leading-none text-bone">{value}</div>
      <div className={`mt-4 border-t-2 pt-3 font-mono text-[.62rem] uppercase tracking-[.12em] ${urgent ? "border-alert/30 text-alert" : "border-edge text-ash"}`}>
        {detail}
      </div>
    </Panel>
  );
}
