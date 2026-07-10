import { Plus, Search } from "lucide-react";
import { SectionHeader } from "@/components/layout/section-header";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";

export function ModulePage({ eyebrow, title, description, rows, cta = "Create new" }: { eyebrow: string; title: string; description: string; rows: { title: string; meta: string; status: string }[]; cta?: string }) {
  return <><SectionHeader eyebrow={eyebrow} title={title} description={description} action={<Button><Plus size={16}/>{cta}</Button>}/><div className="mb-4 flex items-center gap-3 border border-white/[.07] bg-white/[.025] px-4 py-3 text-slate-600"><Search size={16}/><span className="text-sm">Search {title.toLowerCase()}…</span></div><Panel className="overflow-hidden">{rows.map((row,index)=><div key={row.title} className="flex items-center gap-4 border-b border-white/[.05] p-5 last:border-0 hover:bg-white/[.02]"><div className="font-display text-lg text-slate-700">{String(index+1).padStart(2,"0")}</div><div className="min-w-0 flex-1"><div className="text-sm font-semibold text-white">{row.title}</div><div className="mt-1 text-xs text-slate-600">{row.meta}</div></div><div className="text-[10px] font-bold uppercase tracking-[.16em] text-violet-300">{row.status}</div></div>)}</Panel></>;
}
