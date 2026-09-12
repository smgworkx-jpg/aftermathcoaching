import { Send } from "lucide-react";
import { SectionHeader } from "@/components/layout/section-header";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";

const thread = [
  { from: "coach", text: "How did the elbow feel on the neutral-grip work today?", time: "10:22" },
  { from: "athlete", text: "No irritation. Top set moved better than last week too.", time: "10:41" },
  { from: "coach", text: "Top set looked cleaner. Hold the load next week and beat total reps.", time: "10:44" },
];

export default function ClientMessagesPage() {
  return (
    <>
      <SectionHeader eyebrow="Direct coaching" title="Messages" description="One focused thread with your coach." />
      <Panel className="mx-auto max-w-3xl overflow-hidden">
        <div className="flex items-center gap-3 border-b-2 border-edge p-4">
          <div className="grid size-10 shrink-0 place-items-center border-2 border-neon bg-neon font-mono text-[.62rem] font-extrabold text-bone">
            AC
          </div>
          <div>
            <div className="font-display text-lg uppercase leading-none text-bone">Coach Alexander</div>
            <div className="mono-label mt-1.5 text-[.52rem] text-lilac">Usually replies within 3 hours</div>
          </div>
        </div>
        <div className="min-h-[26rem] space-y-4 p-4 md:p-5">
          {thread.map((message) => (
            <div
              key={message.text}
              className={`max-w-[85%] border-2 p-4 ${message.from === "athlete" ? "ml-auto border-neon bg-ultra/25" : "border-edge bg-void"}`}
            >
              <p className="text-sm leading-6 text-bone">{message.text}</p>
              <div className="mono-label mt-2 text-[.5rem]">{message.time}</div>
            </div>
          ))}
        </div>
        <div className="flex gap-3 border-t-2 border-edge p-3">
          <input className="field-input flex-1" placeholder="Message your coach…" />
          <Button className="px-4" aria-label="Send message"><Send size={16} /></Button>
        </div>
      </Panel>
    </>
  );
}
