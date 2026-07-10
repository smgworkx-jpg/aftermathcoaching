import Link from "next/link";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3">
      <span className="relative grid size-9 place-items-center overflow-hidden border border-violet-400/40 bg-violet-500/10 shadow-[0_0_28px_rgba(139,92,246,.2)] [clip-path:polygon(0_0,100%_0,100%_72%,72%_100%,0_100%)]">
        <span className="absolute h-px w-7 rotate-[-43deg] bg-violet-300" />
        <span className="font-display text-xs font-bold tracking-[-.08em] text-white">AX</span>
      </span>
      {!compact && <span><span className="block font-display text-lg font-bold uppercase tracking-[.14em] text-white">Aftermath X</span><span className="block text-[9px] uppercase tracking-[.42em] text-violet-300">Blacklinez Systems</span></span>}
    </Link>
  );
}
