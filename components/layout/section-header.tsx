export function SectionHeader({ eyebrow, title, description, action }: { eyebrow: string; title: string; description?: string; action?: React.ReactNode }) {
  return <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><div className="mb-2 text-[10px] font-bold uppercase tracking-[.32em] text-violet-300">{eyebrow}</div><h1 className="font-display text-3xl font-bold uppercase tracking-[-.03em] text-white md:text-4xl">{title}</h1>{description && <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{description}</p>}</div>{action}</div>;
}
