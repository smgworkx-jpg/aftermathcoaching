import { getUser } from "@netlify/identity";
import { redirect } from "next/navigation";
import { resolveRole, type AppRole } from "./roles";

export async function requireRole(allowed: AppRole[]) {
  const user = await getUser().catch(() => null);
  if (!user) redirect("/login");

  const role = resolveRole(user.roles, user.role);
  if (!allowed.includes(role)) redirect(role === "client" ? "/app" : "/dashboard");

  return { user, role };
}
