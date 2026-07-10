import { BrandMark } from "@/components/brand-mark";
import { AuthForm } from "@/components/auth/auth-form";

export default function SignupPage() { return <main className="grid min-h-screen place-items-center px-5 pb-16 pt-32"><div className="w-full max-w-md border border-white/[.08] bg-[#11131a]/85 p-7 shadow-2xl backdrop-blur-xl md:p-9"><BrandMark/><div className="mt-10 eyebrow">Begin the process</div><h1 className="mt-3 font-display text-4xl font-bold uppercase">Build your profile</h1><p className="mt-2 text-sm leading-6 text-slate-500">Create your secure account. Your coach connects the full protocol after enrollment.</p><AuthForm mode="signup"/></div></main> }
