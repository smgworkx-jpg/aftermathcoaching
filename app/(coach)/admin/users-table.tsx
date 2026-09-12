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
  admin: "text-alert",
  coach: "text-lilac",
  client: "text-bone",
};

export function UsersTable({ users }: { users: AdminUser[] }) {
  return (
    <div>
      <div className="mono-label hidden grid-cols-[1.6fr_1fr_7rem_7rem] gap-4 border-b-2 border-edge px-5 py-3 text-[.52rem] md:grid">
        <span>User</span>
        <span>Role</span>
        <span>Billing</span>
        <span className="text-right">Status</span>
      </div>
      {users.length === 0 && (
        <div className="p-8 text-center">
          <div className="mx-auto mb-5 h-1.5 w-20 stripes-tight" />
          <div className="headline text-2xl text-bone">No users yet</div>
          <p className="mt-2 text-sm text-ash">Accounts appear here as soon as the first athlete applies.</p>
        </div>
      )}
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
    <div
      className={`grid items-center gap-4 border-b-2 border-edge px-5 py-4 last:border-b-0 md:grid-cols-[1.6fr_1fr_7rem_7rem] ${pending ? "opacity-40" : ""}`}
    >
      <div className="flex items-center gap-3">
        <div className="grid size-10 shrink-0 place-items-center border-2 border-edge bg-void font-mono text-[.62rem] font-bold text-lilac">
          {(user.name || user.email).slice(0, 2).toUpperCase()}
        </div>
        <div className="min-w-0">
          <div className="truncate font-display text-lg uppercase leading-none text-bone">{user.name || "Unnamed"}</div>
          <div className="mono-label mt-1.5 truncate text-[.52rem] normal-case tracking-normal">{user.email}</div>
        </div>
      </div>
      <div>
        <select
          value={role}
          onChange={(e) => changeRole(e.target.value as AppRole)}
          disabled={pending}
          aria-label={`Role for ${user.email}`}
          className={`field-input h-10 cursor-pointer font-mono text-[.62rem] font-bold uppercase tracking-[.16em] ${roleStyles[role]}`}
        >
          <option value="admin">Admin</option>
          <option value="coach">Coach</option>
          <option value="client">Client</option>
        </select>
      </div>
      <div className="mono-label text-[.55rem]">
        {user.hasSubscription ? <span className="text-lilac">Subscribed</span> : <span>None</span>}
      </div>
      <div className="flex md:justify-end">
        <button
          onClick={toggleActive}
          disabled={pending}
          className={`mono-label border-2 px-2.5 py-1.5 text-[.55rem] transition ${active ? "border-neon text-lilac hover:bg-neon hover:text-bone" : "border-alert text-alert hover:bg-alert hover:text-bone"}`}
        >
          {active ? "Active" : "Suspended"}
        </button>
      </div>
    </div>
  );
}
