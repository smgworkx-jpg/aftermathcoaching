import Link from "next/link";
import { Activity, ArrowRight, ClipboardCheck, MessageSquare, Plus, Users } from "lucide-react";
import { SectionHeader } from "@/components/layout/section-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { Panel } from "@/components/ui/panel";
import { Button } from "@/components/ui/button";
import { ProgressRing } from "@/components/ui/progress-ring";
import { clients } from "@/lib/demo-data";

export default function CoachDashboard() {
  return <>
    <SectionHeader eyebrow="Friday, July 10" title="Command center" description="Prioritize the athletes who need your eyes today." action={<Link href="/clients"><Button><Plus size={16}/> Add client</Button></Link>} />
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><StatCard label="Active clients" value="24" detail="3 onboarding this week" icon={Users}/><StatCard label="Pending check-ins" value="07" detail="2 require attention" icon={ClipboardCheck} urgent/><StatCard label="Unread messages" value="12" detail="Oldest is 43 minutes" icon={MessageSquare}/><StatCard label="Avg. adherence" value="89%" detail="+4.2% over last month" icon={Activity}/></div>
    <div className="mt-5 grid gap-5 xl:grid-cols-[1.45fr_.55fr]">
      <Panel className="overflow-hidden"><div className="flex items-center justify-between border-b border-white/[.06] p-5"><div><h2 className="font-display text-xl font-bold uppercase text-white">Client priority queue</h2><p className="mt-1 text-xs text-slate-600">Sorted by check-in and adherence signal</p></div><Link className="flex items-center gap-2 text-xs text-violet-300" href="/clients">View roster <ArrowRight size={14}/></Link></div><div className="divide-y divide-white/[.05]">{clients.map((client,index)=><Link href={`/clients/${index+1}`} key={client.name} className="grid items-center gap-4 p-4 transition hover:bg-white/[.025] sm:grid-cols-[1.4fr_1fr_80px_90px]"><div className="flex items-center gap-3"><div className="grid size-9 place-items-center border border-white/[.08] bg-white/[.03] text-xs font-bold text-slate-300">{client.name.split(" ").map(p=>p[0]).join("")}</div><div><div className="text-sm font-semibold text-white">{client.name}</div><div className="text-[11px] text-slate-600">{client.phase}</div></div></div><div><div className="mb-1 flex justify-between text-[10px] text-slate-500"><span>Adherence</span><span>{client.adherence}%</span></div><div className="h-1 bg-white/[.05]"><div className="h-full bg-violet-500" style={{width:`${client.adherence}%`}}/></div></div><div className={`text-xs ${client.checkIn==="Overdue"?"text-fuchsia-300":"text-slate-400"}`}>{client.checkIn}</div><div className="text-right text-xs text-slate-400">{client.trend}</div></Link>)}</div></Panel>
      <div className="grid gap-5"><Panel className="p-5"><div className="flex items-center justify-between"><div><h2 className="font-display text-xl font-bold uppercase">Roster signal</h2><p className="mt-1 text-xs text-slate-600">7-day aggregate</p></div><ProgressRing value={89} label="adherence"/></div><div className="mt-5 grid grid-cols-3 gap-2 text-center"><Mini value="21" label="On track"/><Mini value="3" label="At risk"/><Mini value="2" label="New"/></div></Panel><Panel className="p-5"><div className="eyebrow">Recent activity</div><div className="mt-5 space-y-5">{[["MC","Mason logged Pull II","4 min"],["DK","Darius submitted check-in","22 min"],["ER","Ethan hit a rep PR","1 hr"]].map(([initials,text,time])=><div key={text} className="flex items-center gap-3"><div className="grid size-8 place-items-center bg-violet-500/10 text-[10px] font-bold text-violet-300">{initials}</div><div className="min-w-0 flex-1 text-xs text-slate-300">{text}</div><div className="text-[10px] text-slate-700">{time}</div></div>)}</div></Panel></div>
    </div>
  </>;
}

function Mini({value,label}:{value:string;label:string}) { return <div className="border border-white/[.06] bg-white/[.02] p-3"><div className="font-display text-xl font-bold text-white">{value}</div><div className="text-[9px] uppercase tracking-wider text-slate-600">{label}</div></div> }
