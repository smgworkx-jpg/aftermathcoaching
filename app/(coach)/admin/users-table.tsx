"use client";

import { useState, useTransition } from "react";
import type { AppRole } from "@/lib/auth/roles";
import { setUserActive, setUserRole } from "./actions";

export type AdminUser = {
  identityId: string;
  name: string;
  email: string;
  role: AppRole;
  isActive: boolean;
  hasSubscription: boolean;
};

const roleStyles: Record<AppRole, string> = {
  admin: "text-fuchsia-300",
  coach: "text-violet-300",
  client: "text-slate-300",
};

export function UsersTable({ users }: { users: AdminUser[] }) {
  return (
    <div className="divide-y divide-white/[.05]">
      <div className="hidden grid-cols-[1.6fr_1fr_120px_110px] gap-4 px-5 py-3 text-[10px] font-bold uppercase tracking-[.16em] text-slate-600 md:grid">
        <span>User</span>
        <span>Role</span>
        <span>Billing</span>
        <span className="text-right">Status</span>
      </div>
      {users.length === 0 && <div className="p-6 text-sm text-slate-500">No users found yet.</div>}
      {users.map((user) => (
        <Row key={user.identityId} user={user} />
      ))}
    </div>
  );
}

function Row({ user }: { user: AdminUser }) {
  const [pending, startTransition] = useTransition();
  const [role, setRole] = useState<AppRole>(user.role);
  const [active, setActive] = useState(user.isActive);

  function changeRole(next: AppRole) {
    setRole(next);
    startTransition(() => setUserRole(user.identityId, next));
  }

  function toggleActive() {
    const next = !active;
    setActive(next);
    startTransition(() => setUserActive(user.identityId, next));
  }

  return (
    <div className={`grid items-center gap-4 px-5 py-4 md:grid-cols-[1.6fr_1fr_120px_110px] ${pending ? "opacity-50" : ""}`}>
      <div className="flex items-center gap-3">
        <div className="grid size-9 shrink-0 place-items-center border border-white/[.08] bg-white/[.03] text-xs font-bold text-slate-300">
          {(user.name || user.email).slice(0, 2).toUpperCase()}
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-white">{user.name || "—"}</div>
          <div className="truncate text-[11px] text-slate-600">{user.email}</div>
        </div>
      </div>
      <div>
        <select
          value={role}
          onChange={(e) => changeRole(e.target.value as AppRole)}
          disabled={pending}
          className={`field-input h-9 cursor-pointer bg-[#11131a] text-xs font-semibold uppercase tracking-wide ${roleStyles[role]}`}
        >
          <option value="admin">Admin</option>
          <option value="coach">Coach</option>
          <option value="client">Client</option>
        </select>
      </div>
      <div className="text-[11px] uppercase tracking-wide">
        {user.hasSubscription ? <span className="text-emerald-300">Subscribed</span> : <span className="text-slate-600">None</span>}
      </div>
      <div className="flex justify-start md:justify-end">
        <button
          onClick={toggleActive}
          disabled={pending}
          className={`px-3 py-1 text-[10px] font-bold uppercase tracking-[.14em] transition ${active ? "text-emerald-300 hover:text-emerald-200" : "text-slate-600 hover:text-slate-400"}`}
        >
          {active ? "Active" : "Suspended"}
        </button>
      </div>
    </div>
  );
}
