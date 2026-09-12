import { SectionHeader } from "@/components/layout/section-header";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";

export default function ClientCheckInsPage() {
  return (
    <>
      <SectionHeader
        eyebrow="Weekly review"
        title="Check-in"
        description="Submit honest signals. The quality of the adjustment depends on the quality of the data."
      />
      <Panel className="mx-auto max-w-3xl p-5 md:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="field-label">Bodyweight<input className="field-input" placeholder="186.0 lb" /></label>
          <label className="field-label">Energy / 10<input className="field-input" type="number" min="1" max="10" /></label>
          <label className="field-label">Sleep / 10<input className="field-input" type="number" min="1" max="10" /></label>
          <label className="field-label">Stress / 10<input className="field-input" type="number" min="1" max="10" /></label>
          <label className="field-label sm:col-span-2">What went well?<textarea className="field-input" /></label>
          <label className="field-label sm:col-span-2">What was hard?<textarea className="field-input" /></label>
          <label className="field-label sm:col-span-2">What support do you need?<textarea className="field-input" /></label>
        </div>
        <div className="mt-7 border-t-2 border-edge pt-6">
          <Button className="w-full sm:w-auto">Submit weekly check-in</Button>
        </div>
      </Panel>
    </>
  );
}
