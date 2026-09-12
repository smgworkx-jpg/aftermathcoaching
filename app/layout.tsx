import type { Metadata } from "next";
import { Anton, Azeret_Mono, Chivo } from "next/font/google";
import { AuthCallback } from "@/components/auth/auth-callback";
import "./globals.css";

// Anton for poster headlines, Chivo for body copy, Azeret Mono for labels and
// hard numbers — the three voices of the "Press" design language.
const display = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton" });
const body = Chivo({ subsets: ["latin"], variable: "--font-chivo" });
const mono = Azeret_Mono({ subsets: ["latin"], variable: "--font-azeret" });

export const metadata: Metadata = {
  title: { default: "Aftermath X | Blacklinez Coaching", template: "%s | Aftermath X" },
  description: "Premium online physique coaching for disciplined athletes.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} ${mono.variable}`}>
        <AuthCallback />
        {children}
      </body>
    </html>
  );
}
