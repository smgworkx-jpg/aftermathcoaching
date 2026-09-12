import Link from "next/link";

// Stacked logotype: a solid purple slab holding the AX monogram, with the
// wordmark set in the display face. The slab shifts on hover like a stamp.
export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3">
      <span className="relative grid size-10 shrink-0 place-items-center border-2 border-neon bg-neon text-bone transition group-hover:border-ultra group-hover:bg-ultra">
        <span className="font-display text-lg leading-none tracking-tight text-bone">AX</span>
        <span className="absolute -bottom-1 -right-1 size-2 bg-bone" />
      </span>
      {!compact && (
        <span className="leading-none">
          <span className="block font-display text-xl uppercase tracking-wide text-bone">Aftermath X</span>
          <span className="mono-label mt-1 block text-[.55rem] text-lilac">Blacklinez Systems</span>
        </span>
      )}
    </Link>
  );
}
