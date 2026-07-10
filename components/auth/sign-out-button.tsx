"use client";

import { LogOut } from "lucide-react";
import { logout } from "@netlify/identity";

export function SignOutButton() {
  return <button className="flex w-full items-center gap-3 px-3 py-2 text-sm text-slate-500 transition hover:text-white" onClick={async () => { await logout(); window.location.href = "/"; }}><LogOut size={16} /> Sign out</button>;
}
