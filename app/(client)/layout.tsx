import { ClipboardCheck, Dumbbell, Gauge, LayoutDashboard, MessageSquare, Settings, TrendingUp } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { requireRole } from "@/lib/auth/server";
import { ensureDbUser } from "@/lib/auth/sync";

const nav = [
  { href: "/app", label: "Today", icon: LayoutDashboard },
  { href: "/app/workouts", label: "Workouts", icon: Dumbbell },
  { href: "/app/check-ins", label: "Check-ins", icon: ClipboardCheck },
  { href: "/app/progress", label: "Progress", icon: TrendingUp },
  { href: "/app/habits", label: "Habits", icon: Gauge },
  { href: "/app/messages", label: "Messages", icon: MessageSquare },
  { href: "/app/settings", label: "Settings", icon: Settings },
];

export default async function ClientLayout({ children }: { children: React.ReactNode }) {
  const { user, role } = await requireRole(["client"]);
  await ensureDbUser(user, role).catch(() => null);
  return <AppShell nav={nav} label="Athlete portal" person={user.name ?? "Athlete"}>{children}</AppShell>;
}
