import type { LucideIcon } from "lucide-react";
import { Bell, Search } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { NavLink } from "@/components/layout/nav-link";

export type NavItem = { href: string; label: string; icon: LucideIcon };

export function AppShell({
  children,
  nav,
  label,
  person,
}: {
  children: React.ReactNode;
  nav: NavItem[];
  label: string;
  person: string;
}) {
  const initials = person.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-app">
      <div className="fixed inset-x-0 top-0 z-50 h-1.5 stripes-tight" />

      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r-2 border-edge bg-coal pt-1.5 lg:flex">
        <div className="border-b-2 border-edge p-5">
          <BrandMark />
        </div>
        <div className="mono-label px-5 py-4 text-lilac">{label}</div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-4">
          {nav.map(({ href, label: navLabel, icon: Icon }) => (
            <NavLink
              key={href}
              href={href}
              className="group flex items-center gap-3 border-2 px-3 py-2.5 font-mono text-[.68rem] font-bold uppercase tracking-[.14em] transition"
              activeClassName="border-neon bg-neon text-bone shadow-[4px_4px_0_0_#1b0937]"
              idleClassName="border-transparent text-ash hover:border-edge hover:bg-slab hover:text-bone"
            >
              <Icon size={16} className="shrink-0" />
              <span className="truncate">{navLabel}</span>
            </NavLink>
          ))}
        </nav>
        <div className="border-t-2 border-edge p-3">
          <SignOutButton />
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 mt-1.5 flex h-16 items-center gap-4 border-b-2 border-edge bg-void/92 px-4 backdrop-blur lg:h-20 lg:px-8">
          <div className="lg:hidden">
            <BrandMark compact />
          </div>
          <div className="hidden max-w-sm flex-1 items-center gap-3 border-2 border-edge bg-coal px-4 py-2.5 text-ash lg:flex">
            <Search size={15} className="shrink-0" />
            <span className="mono-label truncate">Search everything</span>
            <kbd className="mono-label ml-auto border border-edge px-1.5 py-0.5 text-[.55rem] text-lilac">⌘K</kbd>
          </div>
          <div className="ml-auto flex items-center gap-3 lg:gap-5">
            <button className="relative text-ash transition hover:text-bone" aria-label="Notifications">
              <Bell size={18} />
              <span className="absolute -right-1 -top-1 size-2 bg-alert" />
            </button>
            <div className="hidden text-right sm:block">
              <div className="font-display text-sm uppercase tracking-wide text-bone">{person}</div>
              <div className="mono-label text-[.55rem] text-lilac">{label}</div>
            </div>
            <div className="grid size-10 place-items-center border-2 border-neon bg-neon font-mono text-xs font-extrabold text-bone">
              {initials}
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-[1600px] p-4 pb-28 lg:p-8 lg:pb-14">{children}</main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-50 flex justify-around border-t-2 border-edge bg-coal px-1 py-1.5 lg:hidden">
        {nav.slice(0, 5).map(({ href, label: navLabel, icon: Icon }) => (
          <NavLink
            key={href}
            href={href}
            className="flex min-w-0 flex-1 flex-col items-center gap-1 border-2 px-1 py-1.5 font-mono text-[.5rem] font-bold uppercase tracking-[.1em] transition"
            activeClassName="border-neon bg-neon text-bone"
            idleClassName="border-transparent text-ash"
          >
            <Icon size={17} />
            <span className="w-full truncate text-center">{navLabel}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
