import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 px-5 text-sm font-semibold tracking-tight transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" && "clip-button bg-violet-500 text-white shadow-[0_0_30px_rgba(139,92,246,.24)] hover:bg-violet-400",
        variant === "secondary" && "clip-button border border-white/10 bg-white/[.04] text-white hover:border-violet-400/40 hover:bg-white/[.07]",
        variant === "ghost" && "text-slate-400 hover:bg-white/[.04] hover:text-white",
        className,
      )}
      {...props}
    />
  );
}
