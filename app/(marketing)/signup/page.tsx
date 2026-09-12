import { AuthForm } from "@/components/auth/auth-form";
import { AuthShell } from "@/components/auth/auth-shell";

export default function SignupPage() {
  return (
    <AuthShell
      eyebrow="Begin the process"
      title="Build your"
      outlined="profile."
      description="Create your secure account first. Your coach connects the full protocol once your application is reviewed and the block is scoped."
      points={["Takes under a minute", "No payment to create an account", "Application can follow straight after"]}
    >
      <AuthForm mode="signup" />
    </AuthShell>
  );
}
