import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Bell, Command, Search } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { SignOutButton } from "@/components/auth/sign-out-button";

export type NavItem = { href: string; label: string; icon: LucideIcon };

export function AppShell({ children, nav, label, person }: { children: React.ReactNode; nav: NavItem[]; label: string; person: string }) {
  return (
    <div className="min-h-screen bg-app">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-white/[.06] bg-[#0b0c11]/90 p-5 backdrop-blur-xl lg:flex lg:flex-col">
        <BrandMark />
        <div className="mt-10 px-3 text-[10px] font-bold uppercase tracking-[.3em] text-slate-600">{label}</div>
        <nav className="mt-4 flex-1 space-y-1">{nav.map(({ href, label: navLabel, icon: Icon }, index) => <Link key={href} className={`group flex items-center gap-3 px-3 py-2.5 text-sm transition ${index === 0 ? "nav-active text-white" : "text-slate-500 hover:bg-white/[.03] hover:text-white"}`} href={href}><Icon size={17} className={index === 0 ? "text-violet-300" : "group-hover:text-violet-300"} />{navLabel}</Link>)}</nav>
        <div className="border-t border-white/[.06] pt-4"><SignOutButton /></div>
      </aside>
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-18 items-center justify-between border-b border-white/[.06] bg-[#09090d]/75 px-5 backdrop-blur-xl lg:px-8">
          <div className="flex items-center gap-3 lg:hidden"><BrandMark compact /><span className="font-display text-sm font-bold uppercase tracking-[.16em] text-white">Blacklinez</span></div>
          <div className="hidden max-w-md flex-1 items-center gap-3 border border-white/[.07] bg-white/[.025] px-4 py-2 text-slate-600 lg:flex"><Search size={16} /><span className="text-sm">Search clients, programs, exercises…</span><kbd className="ml-auto flex items-center gap-1 text-[10px]"><Command size={11} /> K</kbd></div>
          <div className="ml-auto flex items-center gap-4"><button className="relative text-slate-400"><Bell size={19} /><span className="absolute -right-0.5 -top-0.5 size-1.5 rounded-full bg-violet-400 shadow-[0_0_10px_#a855f7]" /></button><div className="h-7 w-px bg-white/[.08]" /><div className="text-right"><div className="text-xs font-semibold text-white">{person}</div><div className="text-[10px] uppercase tracking-[.14em] text-violet-300">{label}</div></div><div className="grid size-9 place-items-center border border-violet-400/30 bg-violet-500/10 text-xs font-bold text-violet-200">{person.split(" ").map((part) => part[0]).join("")}</div></div>
        </header>
        <main className="mx-auto max-w-[1600px] p-5 pb-24 lg:p-8">{children}</main>
      </div>
      <nav className="fixed inset-x-3 bottom-3 z-50 flex justify-around border border-white/[.08] bg-[#11131a]/95 p-2 shadow-2xl backdrop-blur-xl lg:hidden">{nav.slice(0, 5).map(({ href, label: navLabel, icon: Icon }, index) => <Link key={href} className={`flex min-w-14 flex-col items-center gap-1 px-2 py-1 text-[9px] uppercase tracking-wide ${index === 0 ? "text-violet-300" : "text-slate-500"}`} href={href}><Icon size={18} />{navLabel}</Link>)}</nav>
    </div>
  );
}
