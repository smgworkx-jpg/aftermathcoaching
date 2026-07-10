"use server";

import { admin } from "@netlify/identity";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { users } from "@/db/schema";
import { requireRole } from "@/lib/auth/server";
import type { AppRole } from "@/lib/auth/roles";

const ROLES: AppRole[] = ["admin", "coach", "client"];

// Change a user's role. Netlify Identity is the source of truth for
// authorization, so we update app_metadata.roles there, then mirror the role
// into the application database.
export async function setUserRole(identityId: string, role: AppRole) {
  await requireRole(["admin"]);
  if (!ROLES.includes(role)) throw new Error("Invalid role");

  const current = await admin.getUser(identityId).catch(() => null);
  await admin.updateUser(identityId, {
    app_metadata: { ...(current?.appMetadata ?? {}), roles: [role] },
  });

  await db
    .update(users)
    .set({ role, updatedAt: new Date() })
    .where(eq(users.identityId, identityId));

  revalidatePath("/admin");
}

// Toggle a user's active flag in the application database (used to soft-suspend
// accounts without deleting Identity records).
export async function setUserActive(identityId: string, isActive: boolean) {
  await requireRole(["admin"]);
  await db
    .update(users)
    .set({ isActive, updatedAt: new Date() })
    .where(eq(users.identityId, identityId));
  revalidatePath("/admin");
}
