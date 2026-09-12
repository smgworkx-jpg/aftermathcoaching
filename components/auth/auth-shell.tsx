import { BrandMark } from "@/components/brand-mark";
import { Panel } from "@/components/ui/panel";

// Split-screen poster: a loud left column with the pitch, and the form itself
// in a slab on the right. Collapses to a single column on small screens.
export function AuthShell({
  eyebrow,
  title,
  outlined,
  description,
  points,
  children,
}: {
  eyebrow: string;
  title: string;
  outlined: string;
  description: string;
  points: string[];
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto grid max-w-7xl gap-10 px-4 pb-20 pt-32 lg:grid-cols-[1.05fr_.95fr] lg:gap-16 lg:px-8 lg:pt-44">
      <section className="relative">
        <div className="pointer-events-none absolute -left-4 top-0 hidden h-full w-2 stripes lg:block" />
        <div className="lg:pl-8">
          <div className="eyebrow">{eyebrow}</div>
          <h1 className="headline mt-4 text-[clamp(3rem,8vw,6.5rem)] text-bone">
            {title}
            <br />
            <span className="hollow">{outlined}</span>
          </h1>
          <p className="mt-6 max-w-md leading-7 text-ash">{description}</p>
          <ul className="mt-9 grid gap-px border-2 border-edge bg-edge">
            {points.map((point) => (
              <li key={point} className="flex items-center gap-3 bg-coal p-4">
                <span className="size-2 shrink-0 rotate-45 bg-neon" />
                <span className="text-sm text-bone">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative">
        <Panel className="p-6 md:p-8">
          <BrandMark />
          <div className="my-6 h-1.5 stripes-tight" />
          {children}
        </Panel>
      </section>
    </main>
  );
}
