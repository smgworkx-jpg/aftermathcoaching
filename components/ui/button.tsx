import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "bone" | "ghost";
  size?: "md" | "sm" | "lg";
};

export function Button({ className, variant = "primary", size = "md", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "btn",
        variant === "primary" && "btn-primary",
        variant === "secondary" && "btn-outline",
        variant === "bone" && "btn-bone",
        variant === "ghost" && "btn-ghost",
        size === "sm" && "h-10 px-3.5 text-[.62rem]",
        size === "lg" && "h-14 px-8 text-xs",
        className,
      )}
      {...props}
    />
  );
}
