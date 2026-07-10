import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { Panel } from "@/components/ui/panel";

export function StatCard({ label, value, detail, icon: Icon, urgent = false }: { label: string; value: string; detail: string; icon: LucideIcon; urgent?: boolean }) {
  return <Panel className="group relative overflow-hidden p-5"><div className={`absolute -right-8 -top-8 size-24 rounded-full blur-3xl ${urgent ? "bg-fuchsia-500/20" : "bg-violet-500/10"}`} /><div className="flex items-start justify-between"><div className="grid size-9 place-items-center border border-white/[.08] bg-white/[.03] text-violet-300"><Icon size={17} /></div><ArrowUpRight size={15} className="text-slate-700 transition group-hover:text-violet-300" /></div><div className="mt-8 font-display text-4xl font-bold tracking-[-.04em] text-white">{value}</div><div className="mt-1 text-xs font-semibold uppercase tracking-[.15em] text-slate-400">{label}</div><div className="mt-4 border-t border-white/[.06] pt-3 text-xs text-slate-600">{detail}</div></Panel>;
}
