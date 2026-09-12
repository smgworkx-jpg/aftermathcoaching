"use client";

import { useEffect, useState } from "react";
import { handleAuthCallback, AuthError } from "@netlify/identity";
import { resolveRole, roleHome } from "@/lib/auth/roles";

// Netlify Identity confirmation, recovery, invite, and OAuth links redirect back
// to the site with the token in the URL hash (e.g. `#confirmation_token=...`).
// Nothing processes that hash unless `handleAuthCallback()` runs on page load, so
// without this component clicking the confirmation email did nothing — the account
// was never confirmed and the user could never log in. Mounted in the root layout
// so it runs on whatever page the email link lands on.
export function AuthCallback() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!window.location.hash.includes("_token=") && !window.location.hash.includes("error=")) return;

    (async () => {
      try {
        const result = await handleAuthCallback();
        if (!result) return;

        switch (result.type) {
          case "confirmation":
          case "oauth":
          case "email_change":
            // Session is established — send the user to their role's home.
            if (result.user) {
              window.location.assign(roleHome(resolveRole(result.user.roles, result.user.role)));
              return;
            }
            break;
          case "recovery":
            setMessage("Recovery link verified. Open Settings to set a new password.");
            return;
          case "invite":
            setMessage("Invite verified. Finish setting up your account, then sign in.");
            return;
        }
      } catch (error) {
        setMessage(error instanceof AuthError ? error.message : "We couldn't complete that link. Please try again.");
      }
    })();
  }, []);

  if (!message) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-[60] border-b-2 border-neon bg-ultra px-4 py-3 text-center font-mono text-xs font-bold uppercase tracking-[.16em] text-void">
      {message}
    </div>
  );
}
