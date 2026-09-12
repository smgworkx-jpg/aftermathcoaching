import { Plus } from "lucide-react";
import { SectionHeader } from "@/components/layout/section-header";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";

export default function NewProgramPage() {
  return (
    <>
      <SectionHeader
        eyebrow="Program builder"
        title="New protocol"
        description="Create a durable training structure, then assign a copy to each athlete."
        action={<Button variant="secondary">Save draft</Button>}
      />
      <Panel className="p-6 md:p-8">
        <div className="grid gap-5 md:grid-cols-2">
          <label className="field-label">Program name<input className="field-input" placeholder="Blacklinez Mass II" /></label>
          <label className="field-label">Duration<input className="field-input" placeholder="12 weeks" /></label>
        </div>
        <div className="mt-8 border-2 border-dashed border-neon/50 bg-void p-8 text-center md:p-12">
          <div className="mx-auto mb-6 h-1.5 w-24 stripes-tight" />
          <div className="headline text-3xl text-bone md:text-4xl">Add your first training day</div>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-ash">
            Structure exercises, prescriptions, and coaching notes in the order the athlete will see them.
          </p>
          <Button className="mt-7"><Plus size={15} /> Add workout day</Button>
        </div>
      </Panel>
    </>
  );
}
