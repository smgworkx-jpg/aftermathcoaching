import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type PanelProps = HTMLAttributes<HTMLDivElement> & {
  tone?: "default" | "ultra" | "alert" | "bone";
  shadow?: "default" | "tight" | "none";
  lift?: boolean;
};

export function Panel({ className, tone = "default", shadow = "default", lift = false, ...props }: PanelProps) {
  return (
    <div
      className={cn(
        "slab",
        tone === "ultra" && "slab-ultra",
        tone === "alert" && "slab-alert",
        tone === "bone" && "slab-bone",
        shadow === "tight" && "slab-tight",
        shadow === "none" && "slab-flush",
        lift && "slab-lift",
        className,
      )}
      {...props}
    />
  );
}
