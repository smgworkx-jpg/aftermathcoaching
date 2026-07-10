import { BarChart3, BookOpen, ClipboardCheck, CreditCard, Dumbbell, LayoutDashboard, MessageSquare, Settings, Shield, Users } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { requireRole } from "@/lib/auth/server";
import { ensureDbUser } from "@/lib/auth/sync";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/clients", label: "Clients", icon: Users },
  { href: "/programs", label: "Programs", icon: Dumbbell },
  { href: "/check-ins", label: "Check-ins", icon: ClipboardCheck },
  { href: "/messages", label: "Messages", icon: MessageSquare },
  { href: "/exercise-library", label: "Exercise library", icon: BookOpen },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/billing", label: "Billing", icon: CreditCard },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default async function CoachLayout({ children }: { children: React.ReactNode }) {
  const { user, role } = await requireRole(["admin", "coach"]);
  await ensureDbUser(user, role).catch(() => null);
  const items = role === "admin" ? [...nav, { href: "/admin", label: "Admin", icon: Shield }] : nav;
  return <AppShell nav={items} label="Coach console" person={user.name ?? "Coach"}>{children}</AppShell>;
}
