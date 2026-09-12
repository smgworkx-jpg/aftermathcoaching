import Link from "next/link";
import { Activity, ArrowRight, ClipboardCheck, MessageSquare, Plus, Users } from "lucide-react";
import { SectionHeader } from "@/components/layout/section-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { Panel } from "@/components/ui/panel";
import { Button } from "@/components/ui/button";
import { ProgressRing } from "@/components/ui/progress-ring";
import { clients } from "@/lib/demo-data";

const activity = [
  ["MC", "Mason logged Pull II", "4 min"],
  ["DK", "Darius submitted check-in", "22 min"],
  ["EB", "Ethan hit a rep PR", "1 hr"],
];

export default function CoachDashboard() {
  return (
    <>
      <SectionHeader
        eyebrow="Friday, July 10"
        title="Command center"
        description="Prioritize the athletes who need your eyes today."
        action={<Link href="/clients"><Button><Plus size={15} /> Add client</Button></Link>}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active clients" value="24" detail="3 onboarding this week" icon={Users} />
        <StatCard label="Pending check-ins" value="07" detail="2 require attention" icon={ClipboardCheck} urgent />
        <StatCard label="Unread messages" value="12" detail="Oldest is 43 minutes" icon={MessageSquare} />
        <StatCard label="Avg. adherence" value="89%" detail="+4.2% over last month" icon={Activity} />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.45fr_.55fr]">
        <Panel className="overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-edge p-5">
            <div>
              <h2 className="headline text-2xl text-bone">Priority queue</h2>
              <p className="mono-label mt-1.5">Sorted by check-in and adherence signal</p>
            </div>
            <Link className="mono-label flex items-center gap-2 text-lilac transition hover:text-bone" href="/clients">
              View roster <ArrowRight size={13} />
            </Link>
          </div>
          <div>
            {clients.map((client, index) => (
              <Link
                href={`/clients/${index + 1}`}
                key={client.name}
                className="grid items-center gap-4 border-b-2 border-edge p-4 transition last:border-b-0 hover:bg-slab sm:grid-cols-[1.4fr_1fr_5rem_5rem]"
              >
                <div className="flex items-center gap-3">
                  <div className="grid size-10 shrink-0 place-items-center border-2 border-edge bg-void font-mono text-[.62rem] font-bold text-lilac">
                    {client.name.split(" ").map((part) => part[0]).join("")}
                  </div>
                  <div className="min-w-0">
                    <div className="font-display text-lg uppercase leading-none text-bone">{client.name}</div>
                    <div className="mono-label mt-1.5 text-[.55rem]">{client.phase}</div>
                  </div>
                </div>
                <div>
                  <div className="mono-label mb-1.5 flex justify-between text-[.55rem]">
                    <span>Adherence</span>
                    <span className="text-lilac">{client.adherence}%</span>
                  </div>
                  <div className="h-2.5 border border-edge bg-void">
                    <div className="h-full bg-neon" style={{ width: `${client.adherence}%` }} />
                  </div>
                </div>
                <div className={`mono-label text-[.58rem] ${client.checkIn === "Overdue" ? "text-alert" : "text-ash"}`}>
                  {client.checkIn}
                </div>
                <div className="mono-data text-right font-display text-xl text-bone">{client.trend}</div>
              </Link>
            ))}
          </div>
        </Panel>

        <div className="grid content-start gap-6">
          <Panel className="p-5">
            <h2 className="headline text-2xl text-bone">Roster signal</h2>
            <p className="mono-label mt-1.5">7-day aggregate</p>
            <div className="mt-6">
              <ProgressRing value={89} label="adherence" />
            </div>
            <div className="mt-6 grid grid-cols-3 gap-px border-2 border-edge bg-edge">
              <Mini value="21" label="On track" />
              <Mini value="03" label="At risk" />
              <Mini value="02" label="New" />
            </div>
          </Panel>
          <Panel className="p-5">
            <div className="mono-label">Recent activity</div>
            <div className="mt-5 space-y-4">
              {activity.map(([initials, text, time]) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="grid size-8 shrink-0 place-items-center bg-neon font-mono text-[.55rem] font-extrabold text-bone">
                    {initials}
                  </div>
                  <div className="min-w-0 flex-1 text-xs text-bone">{text}</div>
                  <div className="mono-label shrink-0 text-[.52rem]">{time}</div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </>
  );
}

function Mini({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-coal p-3 text-center">
      <div className="mono-data font-display text-2xl text-bone">{value}</div>
      <div className="mono-label mt-1 text-[.5rem]">{label}</div>
    </div>
  );
}
