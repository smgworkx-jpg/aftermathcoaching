"use client";

import { useState } from "react";

// Starts Stripe Checkout for the coaching subscription. Redirects unauthenticated
// visitors to sign up first, and surfaces a clear message if billing is not yet
// configured on the server.
export function SubscribeButton({ className, children }: { className?: string; children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function start() {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/.netlify/functions/create-checkout", { method: "POST" });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.url) {
        window.location.assign(data.url);
        return;
      }
      if (res.status === 401) {
        window.location.assign(data.redirect ?? "/signup");
        return;
      }
      setMessage(data.error ?? "Unable to start checkout. Please try again.");
    } catch {
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button className={className} onClick={start} disabled={loading}>
        {loading ? "Redirecting…" : children}
      </button>
      {message && <p className="mono-label mt-3 text-center text-[.55rem] text-alert">{message}</p>}
    </>
  );
}
