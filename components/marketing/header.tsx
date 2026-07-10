import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";

export function MarketingHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[.06] bg-[#09090d]/75 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <BrandMark />
        <nav className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-[.16em] text-slate-400 md:flex">
          <Link className="transition hover:text-white" href="/#platform">Platform</Link>
          <Link className="transition hover:text-white" href="/#method">Method</Link>
          <Link className="transition hover:text-white" href="/pricing">Pricing</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link className="hidden px-4 py-2 text-sm text-slate-300 sm:block" href="/login">Sign in</Link>
          <Link className="clip-button bg-violet-500 px-5 py-3 text-xs font-bold uppercase tracking-[.14em] text-white" href="/signup">Apply now</Link>
        </div>
      </div>
    </header>
  );
}
