import { cn } from "@/lib/utils";

// Scrolling marquee band. Two identical tracks slide in lockstep so the loop
// never shows a gap; the animation is disabled under reduced-motion.
export function Ticker({
  items,
  className,
  tone = "ultra",
  speed = "normal",
  reverse = false,
}: {
  items: string[];
  className?: string;
  tone?: "ultra" | "bone" | "void";
  speed?: "normal" | "slow";
  reverse?: boolean;
}) {
  const track = (
    <div className="ticker-track" aria-hidden="true">
      {items.map((item, index) => (
        <span key={`${item}-${index}`} className="flex items-center gap-[2.25rem] whitespace-nowrap">
          <span className="font-display text-sm uppercase tracking-[.18em] md:text-base">{item}</span>
          <span className={cn("size-1.5 rotate-45", tone === "ultra" ? "bg-bone/50" : "bg-neon")} />
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        "ticker border-y-2 py-2.5",
        tone === "ultra" && "border-neon bg-ultra text-bone",
        tone === "bone" && "border-bone bg-bone text-void",
        tone === "void" && "border-edge bg-coal text-lilac",
        speed === "slow" && "ticker-slow",
        reverse && "ticker-reverse",
        className,
      )}
    >
      {track}
      {track}
    </div>
  );
}
