import { Plus, Search } from "lucide-react";
import { SectionHeader } from "@/components/layout/section-header";
import { Button } from "@/components/ui/button";

export function ModulePage({
  eyebrow,
  title,
  description,
  rows,
  cta = "Create new",
}: {
  eyebrow: string;
  title: string;
  description: string;
  rows: { title: string; meta: string; status: string }[];
  cta?: string;
}) {
  return (
    <>
      <SectionHeader eyebrow={eyebrow} title={title} description={description} action={<Button><Plus size={15} /> {cta}</Button>} />
      <div className="mb-5 flex items-center gap-3 border-2 border-edge bg-coal px-4 py-3 text-ash">
        <Search size={15} />
        <span className="mono-label">Search {title.toLowerCase()}</span>
      </div>
      <div className="space-y-3">
        {rows.map((row, index) => (
          <article key={row.title} className="slab slab-lift group flex items-center gap-5 p-4 md:p-5">
            <span className="hollow-num shrink-0 text-4xl leading-none">{String(index + 1).padStart(2, "0")}</span>
            <div className="min-w-0 flex-1">
              <h2 className="font-display text-xl uppercase leading-tight text-bone">{row.title}</h2>
              <p className="mt-1 truncate text-xs text-ash">{row.meta}</p>
            </div>
            <span className="mono-label shrink-0 border-2 border-edge px-2.5 py-1.5 text-lilac transition group-hover:border-neon">
              {row.status}
            </span>
          </article>
        ))}
      </div>
    </>
  );
}
