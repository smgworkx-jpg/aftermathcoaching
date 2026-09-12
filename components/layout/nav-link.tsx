"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// Client-side active-state wrapper. The icon and label are rendered on the
// server and passed through as children, so the nav arrays can keep holding
// Lucide components.
export function NavLink({
  href,
  children,
  className,
  activeClassName,
  idleClassName,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  idleClassName?: string;
}) {
  const pathname = usePathname() ?? "";
  const active = pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link href={href} aria-current={active ? "page" : undefined} className={cn(className, active ? activeClassName : idleClassName)}>
      {children}
    </Link>
  );
}
