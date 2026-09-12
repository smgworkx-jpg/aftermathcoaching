import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { RequestCoachingButton } from "@/components/billing/request-coaching-button";

const links = [
  { href: "/#system", label: "System" },
  { href: "/#method", label: "Method" },
  { href: "/pricing", label: "Coaching" },
];

export function MarketingHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="h-1.5 stripes-tight" />
      <div className="border-b-2 border-edge bg-void/92 backdrop-blur">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-8">
          <BrandMark />
          <nav className="hidden items-center gap-1 md:flex">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="border-2 border-transparent px-3 py-2 font-mono text-[.66rem] font-bold uppercase tracking-[.2em] text-ash transition hover:border-edge hover:bg-coal hover:text-bone"
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="hidden border-2 border-edge px-4 py-2.5 font-mono text-[.66rem] font-bold uppercase tracking-[.2em] text-bone transition hover:border-neon hover:text-lilac sm:block"
            >
              Sign in
            </Link>
            <RequestCoachingButton className="btn btn-primary h-11 px-5 text-[.66rem]">Apply</RequestCoachingButton>
          </div>
        </div>
        <nav className="flex border-t-2 border-edge md:hidden">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="flex-1 border-r-2 border-edge py-2.5 text-center font-mono text-[.6rem] font-bold uppercase tracking-[.16em] text-ash last:border-r-0"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
