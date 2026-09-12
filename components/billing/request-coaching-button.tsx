"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  className?: string;
  children: React.ReactNode;
};

// Opens a modal that collects the applicant's stats before anything is charged
// or any account is created. The submission is stored in the coaching_requests
// table for the coach to review.
export function RequestCoachingButton({ className, children }: Props) {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", age: "", sex: "", bodyweight: "", goals: "" });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch("/.netlify/functions/coaching-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name || undefined,
          email: form.email || undefined,
          age: form.age ? Number(form.age) : undefined,
          sex: form.sex || undefined,
          bodyweightKg: form.bodyweight ? Number(form.bodyweight) : undefined,
          goals: form.goals,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Could not send the request. Please try again.");
        return;
      }
      setDone(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSending(false);
    }
  }

  const field =
    "field-input w-full";

  return (
    <>
      <button className={className} onClick={() => { setOpen(true); setDone(false); setError(""); }}>
        {children}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => !sending && setOpen(false)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto border border-violet-400/25 bg-[#11131a]/95 p-7 shadow-[0_0_80px_rgba(139,92,246,.2)] backdrop-blur-xl md:p-9"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute right-4 top-4 text-slate-500 transition hover:text-white"
              onClick={() => !sending && setOpen(false)}
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {done ? (
              <div className="py-6 text-center">
                <div className="eyebrow">Request received</div>
                <h2 className="mt-3 font-display text-3xl font-bold uppercase">You&apos;re on the list</h2>
                <p className="mt-4 text-sm leading-6 text-slate-400">
                  Your application is in review. If it&apos;s a fit, your coach reaches out personally with next steps
                  and enrollment details.
                </p>
                <div className="mt-8">
                  <Button variant="secondary" onClick={() => setOpen(false)}>Close</Button>
                </div>
              </div>
            ) : (
              <>
                <div className="eyebrow">Coaching application</div>
                <h2 className="mt-3 font-display text-3xl font-bold uppercase">Request coaching</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Tell us where you&apos;re starting from. Everything is reviewed personally — no bots, no auto-approval.
                </p>

                <form className="mt-7 space-y-4" onSubmit={submit}>
                  <label className="field-label block">
                    Name
                    <input
                      className={field}
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </label>
                  <label className="field-label block">
                    Email
                    <input
                      className={field}
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </label>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <label className="field-label block">
                      Age
                      <input
                        className={field}
                        type="number"
                        min={13}
                        max={100}
                        placeholder="28"
                        value={form.age}
                        onChange={(e) => setForm({ ...form, age: e.target.value })}
                      />
                    </label>
                    <label className="field-label block">
                      Sex
                      <select
                        className={field}
                        value={form.sex}
                        onChange={(e) => setForm({ ...form, sex: e.target.value })}
                      >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </label>
                    <label className="field-label block">
                      Bodyweight
                      <input
                        className={field}
                        type="number"
                        step="0.1"
                        min={0}
                        placeholder="kg"
                        value={form.bodyweight}
                        onChange={(e) => setForm({ ...form, bodyweight: e.target.value })}
                      />
                    </label>
                  </div>
                  <label className="field-label block">
                    Goals
                    <textarea
                      className={`${field} min-h-24 resize-y`}
                      required
                      placeholder="What do you want to achieve? Timeline, past training, injuries, anything relevant."
                      value={form.goals}
                      onChange={(e) => setForm({ ...form, goals: e.target.value })}
                    />
                  </label>

                  {error && <p className="border border-fuchsia-400/20 bg-fuchsia-500/10 p-3 text-sm text-fuchsia-200">{error}</p>}

                  <div className="pt-2">
                    <Button className="w-full" disabled={sending || !form.goals.trim()}>
                      {sending ? "Sending…" : "Submit application"}
                    </Button>
                  </div>
                  <p className="text-center text-[11px] text-slate-600">
                    No payment and no account required to apply.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
