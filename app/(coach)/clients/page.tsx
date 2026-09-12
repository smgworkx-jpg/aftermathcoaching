import Link from "next/link";
import { Filter, Plus, Search } from "lucide-react";
import { SectionHeader } from "@/components/layout/section-header";
import { Button } from "@/components/ui/button";
import { clients } from "@/lib/demo-data";

export default function ClientsPage() {
  return (
    <>
      <SectionHeader
        eyebrow="Roster management"
        title="Clients"
        description="One view of each athlete's phase, adherence, and next coaching action."
        action={<Button><Plus size={15} /> Invite client</Button>}
      />

      <div className="mb-5 flex flex-wrap gap-3">
        <div className="flex min-w-56 flex-1 items-center gap-3 border-2 border-edge bg-coal px-4 py-3 text-ash">
          <Search size={15} />
          <span className="mono-label">Search athletes</span>
        </div>
        <Button variant="secondary"><Filter size={15} /> Filter</Button>
      </div>

      <div className="space-y-3">
        {clients.map((client, index) => (
          <Link href={`/clients/${index + 1}`} key={client.name} className="block">
            <article
              className={`slab slab-lift grid gap-4 p-5 md:grid-cols-[1.5fr_1fr_.7fr_.8fr] md:items-center ${client.status === "attention" ? "slab-alert" : ""}`}
            >
              <div className="flex items-center gap-4">
                <div className="grid size-12 shrink-0 place-items-center border-2 border-neon bg-neon font-mono text-xs font-extrabold text-void">
                  {client.name.split(" ").map((part) => part[0]).join("")}
                </div>
                <div className="min-w-0">
                  <h2 className="headline text-2xl text-bone">{client.name}</h2>
                  <div className="mono-label mt-1">{client.adherence}% adherence</div>
                </div>
              </div>
              <div>
                <div className="mono-label text-[.52rem]">Phase</div>
                <div className="mt-1 text-sm text-bone">{client.phase}</div>
              </div>
              <div>
                <div className="mono-label text-[.52rem]">Check-in</div>
                <div className={`mt-1 text-sm ${client.checkIn === "Overdue" ? "text-alert" : "text-bone"}`}>{client.checkIn}</div>
              </div>
              <div className="md:text-right">
                <span className={`mono-label border-2 px-2.5 py-1.5 text-[.55rem] ${client.status === "attention" ? "border-alert text-alert" : "border-edge text-lilac"}`}>
                  {client.status}
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </>
  );
}
