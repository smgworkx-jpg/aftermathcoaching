// A segmented block meter — the brutalist stand-in for a progress ring. Ten
// hard cells fill from the left; the count and label sit underneath.
export function ProgressRing({ value, label }: { value: number; label: string }) {
  const filled = Math.round(Math.min(Math.max(value, 0), 100) / 10);
  return (
    <div className="min-w-28">
      <div className="flex items-end justify-between gap-2">
        <span className="font-display text-3xl leading-none text-bone">{value}%</span>
        <span className="mono-label pb-0.5">{label}</span>
      </div>
      <div className="mt-2 flex gap-1">
        {Array.from({ length: 10 }).map((_, index) => (
          <span
            key={index}
            className={`h-4 flex-1 border ${index < filled ? "border-neon bg-neon" : "border-edge bg-void"}`}
          />
        ))}
      </div>
    </div>
  );
}
