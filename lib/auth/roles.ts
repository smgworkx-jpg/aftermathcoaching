export type AppRole = "admin" | "coach" | "client";

export function resolveRole(roles?: string[], role?: string): AppRole {
  if (roles?.includes("admin") || role === "admin") return "admin";
  if (roles?.includes("coach") || role === "coach") return "coach";
  return "client";
}

export function roleHome(role: AppRole) {
  return role === "client" ? "/app" : "/dashboard";
}
