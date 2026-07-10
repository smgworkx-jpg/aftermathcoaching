import type { Metadata } from "next";
import { Barlow_Condensed, Manrope } from "next/font/google";
import { AuthCallback } from "@/components/auth/auth-callback";
import "./globals.css";

const display = Barlow_Condensed({ subsets: ["latin"], variable: "--font-display", weight: ["500", "600", "700", "800"] });
const body = Manrope({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: { default: "Aftermath X | Blacklinez Coaching", template: "%s | Aftermath X" },
  description: "Premium online physique coaching for disciplined athletes.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${display.variable} ${body.variable}`}><AuthCallback />{children}</body></html>;
}
