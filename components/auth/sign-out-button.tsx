"use client";

import { LogOut } from "lucide-react";
import { logout } from "@netlify/identity";

export function SignOutButton() {
  return (
    <button
      className="flex w-full items-center gap-3 border-2 border-transparent px-3 py-2.5 font-mono text-[.68rem] font-bold uppercase tracking-[.14em] text-ash transition hover:border-alert/50 hover:bg-alert/10 hover:text-alert"
      onClick={async () => {
        await logout();
        window.location.href = "/";
      }}
    >
      <LogOut size={16} /> Sign out
    </button>
  );
}
