import { AuthForm } from "@/components/auth/auth-form";
import { AuthShell } from "@/components/auth/auth-shell";

export default function LoginPage() {
  return (
    <AuthShell
      eyebrow="Secure access"
      title="Enter the"
      outlined="console."
      description="Your protocols, check-ins, habit standards, and progress history — all in one place, waiting exactly where you left them."
      points={["Today's session, already prescribed", "Check-in history and coach notes", "Bodyweight and strength trends"]}
    >
      <AuthForm mode="login" />
    </AuthShell>
  );
}
