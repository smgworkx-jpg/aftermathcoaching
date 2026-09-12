"use client";

import { useState } from "react";
import Link from "next/link";
import { login, signup, AuthError } from "@netlify/identity";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { resolveRole, roleHome } from "@/lib/auth/roles";

const schema = z.object({
  name: z.string().min(2).optional(),
  email: z.email(),
  password: z.string().min(8),
});

type FormValues = z.infer<typeof schema>;

// Turn a raw auth failure into a clear, user-facing message. The most common
// login failure on this site is trying to sign in before confirming the email,
// which GoTrue reports with an "email not confirmed" message.
function describeAuthError(error: unknown, mode: "login" | "signup"): string {
  if (error instanceof AuthError) {
    if (/confirm/i.test(error.message)) {
      return "Your email isn't confirmed yet. Check your inbox for the confirmation link, then sign in.";
    }
    switch (error.status) {
      case 401:
        return "Invalid email or password.";
      case 403:
        return "Signups are currently disabled. Contact your coach for an invite.";
      case 422:
        return "Please enter a valid email and a password of at least 8 characters.";
      case 400:
        return mode === "signup" ? "That email may already be registered. Try signing in." : error.message;
      default:
        return error.message;
    }
  }
  return "Authentication failed. Please try again.";
}

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const [message, setMessage] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    setMessage("");
    try {
      const user = mode === "login"
        ? await login(values.email, values.password)
        : await signup(values.email, values.password, { full_name: values.name });

      if (mode === "signup" && !user.confirmedAt) {
        setMessage("Account created. Check your inbox to confirm your email.");
        return;
      }

      window.location.assign(roleHome(resolveRole(user.roles, user.role)));
    } catch (error) {
      setMessage(describeAuthError(error, mode));
    }
  }

  return (
    <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
      {mode === "signup" && (
        <label className="field-label">
          Full name
          <input className="field-input" autoComplete="name" {...register("name")} />
          {errors.name && <span>{errors.name.message}</span>}
        </label>
      )}
      <label className="field-label">
        Email address
        <input className="field-input" type="email" autoComplete="email" {...register("email")} />
        {errors.email && <span>{errors.email.message}</span>}
      </label>
      <label className="field-label">
        Password
        <input
          className="field-input"
          type="password"
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          {...register("password")}
        />
        {errors.password && <span>{errors.password.message}</span>}
      </label>
      {message && <p className="slab slab-ultra slab-tight p-3 text-sm leading-6 text-lilac">{message}</p>}
      <Button className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Authenticating" : mode === "login" ? "Enter the console" : "Create account"}
      </Button>
      <p className="mono-label text-center leading-5">
        {mode === "login" ? "No account yet?" : "Already enrolled?"}{" "}
        <Link className="text-lilac underline decoration-neon decoration-2 underline-offset-4 hover:text-bone" href={mode === "login" ? "/signup" : "/login"}>
          {mode === "login" ? "Apply for coaching" : "Sign in"}
        </Link>
      </p>
    </form>
  );
}
