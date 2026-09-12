import Link from "next/link";
import { Activity, ArrowRight, BarChart3, CheckCircle2, ChevronRight, Dumbbell, MessageSquare, ShieldCheck } from "lucide-react";
import { Panel } from "@/components/ui/panel";
import { RequestCoachingButton } from "@/components/billing/request-coaching-button";

const features = [
  { icon: Dumbbell, title: "Precision programming", copy: "Every set, target, tempo, and progression engineered around your response." },
  { icon: Activity, title: "Weekly intelligence", copy: "Check-ins turn subjective feedback and hard metrics into decisive adjustments." },
  { icon: BarChart3, title: "Visible momentum", copy: "Bodyweight, adherence, habits, and performance organized into one signal." },
];

export default function HomePage() {
  return <main>
    <section className="relative overflow-hidden px-5 pb-24 pt-40 lg:px-8 lg:pb-32 lg:pt-52">
      <div className="absolute right-[-8rem] top-24 h-[34rem] w-[34rem] rounded-full bg-violet-600/15 blur-[130px]" />
      <div className="absolute right-[8%] top-32 hidden h-[30rem] w-px rotate-[24deg] bg-gradient-to-b from-transparent via-violet-400/30 to-transparent lg:block" />
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.08fr_.92fr]">
        <div className="relative z-10">
          <div className="reveal eyebrow flex items-center gap-3"><span className="h-px w-10 bg-violet-400" />Built for the relentless</div>
          <h1 className="reveal delay-1 mt-7 max-w-4xl font-display text-[clamp(4rem,9vw,8.5rem)] font-extrabold uppercase leading-[.78] tracking-[-.055em] text-white">Your physique.<br/><span className="text-transparent [-webkit-text-stroke:1px_rgba(192,132,252,.85)]">Under command.</span></h1>
          <p className="reveal delay-2 mt-8 max-w-xl text-base leading-7 text-slate-400 md:text-lg">High-touch bodybuilding coaching powered by exact programming, weekly accountability, and the data to make every phase count.</p>
          <div className="reveal delay-3 mt-9 flex flex-wrap gap-3"><RequestCoachingButton className="clip-button flex items-center gap-3 bg-violet-500 px-7 py-4 text-sm font-bold uppercase tracking-[.14em] text-white shadow-[0_0_45px_rgba(139,92,246,.25)] transition hover:bg-violet-400">Start your transformation <ArrowRight size={17}/></RequestCoachingButton><Link className="clip-button border border-white/10 bg-white/[.03] px-7 py-4 text-sm font-bold uppercase tracking-[.14em] text-white" href="/#platform">Explore platform</Link></div>
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/[.07] pt-6 text-xs text-slate-500">{["1:1 coaching", "Weekly check-ins", "Performance analytics"].map(item => <span key={item} className="flex items-center gap-2"><CheckCircle2 size={13} className="text-violet-400" />{item}</span>)}</div>
        </div>
        <div className="relative mx-auto w-full max-w-xl lg:mx-0">
          <div className="absolute -inset-10 bg-violet-500/10 blur-[80px]" />
          <Panel className="relative p-4 md:p-6">
            <div className="mb-5 flex items-center justify-between"><div><div className="text-[10px] uppercase tracking-[.25em] text-slate-500">Athlete command center</div><div className="mt-1 font-display text-2xl font-bold uppercase text-white">Friday / Pull II</div></div><div className="grid size-10 place-items-center border border-violet-400/30 bg-violet-500/10 text-violet-300"><Dumbbell size={18}/></div></div>
            <div className="grid gap-3 sm:grid-cols-3"><Metric value="92%" label="Adherence"/><Metric value="183.4" label="Bodyweight"/><Metric value="+7.5%" label="Strength"/></div>
            <div className="mt-4 border border-white/[.07] bg-black/20 p-4"><div className="flex items-center justify-between text-xs"><span className="font-semibold text-white">Training momentum</span><span className="text-violet-300">12 weeks</span></div><div className="mt-8 flex h-24 items-end gap-2">{[34,48,41,58,52,67,64,79,73,84,88,96].map((height,index)=><div key={index} className="flex-1 bg-gradient-to-t from-violet-600/20 to-violet-400" style={{height:`${height}%`,opacity:.4+index/20}} />)}</div></div>
            <div className="mt-4 flex items-center justify-between border-l-2 border-violet-400 bg-violet-500/[.07] p-4"><div><div className="text-xs text-slate-500">Next protocol</div><div className="mt-1 text-sm font-semibold text-white">Upper back density / 6 exercises</div></div><ChevronRight className="text-violet-300" size={18}/></div>
          </Panel>
          <div className="absolute -bottom-7 -left-5 hidden border border-white/[.08] bg-[#11131a]/90 p-4 shadow-2xl backdrop-blur md:block"><div className="flex items-center gap-3"><div className="grid size-9 place-items-center bg-emerald-400/10 text-emerald-300"><ShieldCheck size={17}/></div><div><div className="text-xs font-semibold text-white">Check-in reviewed</div><div className="text-[10px] text-slate-500">Coach response ready</div></div></div></div>
        </div>
      </div>
    </section>
    <section id="platform" className="border-y border-white/[.06] bg-[#0b0c11]/60 px-5 py-24 lg:px-8"><div className="mx-auto max-w-7xl"><div className="grid gap-10 lg:grid-cols-2"><div><div className="eyebrow">The operating system</div><h2 className="mt-4 font-display text-5xl font-bold uppercase leading-[.9] tracking-[-.035em] text-white md:text-7xl">Less noise.<br/>More signal.</h2></div><p className="max-w-xl self-end text-base leading-7 text-slate-400">Blacklinez replaces scattered spreadsheets, generic plans, and reactive coaching with one disciplined system built for measurable physique outcomes.</p></div><div className="mt-14 grid gap-4 md:grid-cols-3">{features.map(({icon:Icon,title,copy},index)=><Panel key={title} className="group p-6"><div className="mb-14 flex items-center justify-between"><Icon size={20} className="text-violet-300"/><span className="font-display text-xl text-slate-700">0{index+1}</span></div><h3 className="font-display text-2xl font-bold uppercase text-white">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-500">{copy}</p></Panel>)}</div></div></section>
    <section id="method" className="px-5 py-24 lg:px-8"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><div className="eyebrow">The Blacklinez method</div><h2 className="mt-4 font-display text-5xl font-bold uppercase leading-[.9] text-white">Structure creates freedom.</h2><p className="mt-6 leading-7 text-slate-500">Know the target. Execute the session. Report the signal. Adapt without emotion.</p></div><div className="space-y-px border-y border-white/[.07]">{[["01","Assess","Baseline your training, recovery, schedule, and constraints."],["02","Engineer","Build the shortest reliable path from current state to target."],["03","Execute","Deliver clear daily actions with zero interpretation cost."],["04","Refine","Review weekly data and adjust before plateaus compound."]].map(([num,title,copy])=><div key={num} className="group grid gap-4 border-b border-white/[.06] py-6 last:border-0 sm:grid-cols-[60px_160px_1fr]"><span className="font-display text-xl text-violet-400">{num}</span><span className="font-display text-2xl font-bold uppercase text-white">{title}</span><span className="text-sm leading-6 text-slate-500 group-hover:text-slate-300">{copy}</span></div>)}</div></div></section>
    <section className="px-5 pb-24 lg:px-8"><div className="mx-auto max-w-7xl overflow-hidden border border-violet-400/20 bg-violet-500/[.07] p-8 text-center shadow-[0_0_80px_rgba(91,33,182,.12)] md:p-16"><MessageSquare className="mx-auto text-violet-300"/><h2 className="mt-6 font-display text-5xl font-bold uppercase text-white md:text-7xl">Ready to cross the line?</h2><p className="mx-auto mt-4 max-w-xl text-slate-400">Apply for coaching and build the system your next physique requires.</p><RequestCoachingButton className="clip-button mt-8 inline-flex items-center gap-3 bg-white px-7 py-4 text-sm font-bold uppercase tracking-[.14em] text-black transition hover:bg-violet-100">Apply for coaching <ArrowRight size={16}/></RequestCoachingButton></div></section>
    <footer className="border-t border-white/[.06] px-5 py-8 text-xs text-slate-600 lg:px-8"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 sm:flex-row"><span>© 2026 Aftermath X. Blacklinez.</span><span>Built for disciplined transformation.</span></div></footer>
  </main>;
}

function Metric({value,label}:{value:string;label:string}) { return <div className="border border-white/[.07] bg-white/[.025] p-3"><div className="font-display text-2xl font-bold text-white">{value}</div><div className="text-[9px] uppercase tracking-[.18em] text-slate-600">{label}</div></div> }
