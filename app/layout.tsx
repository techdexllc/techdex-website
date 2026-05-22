import type { Metadata } from "next";
import {
  Instrument_Serif,
  Inter_Tight,
  JetBrains_Mono,
  Fraunces,
  DM_Sans,
  Archivo_Narrow,
} from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter-tight",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

const archivoNarrow = Archivo_Narrow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-archivo-narrow",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TechDex — We build the rare software that ships, scales, and runs itself.",
  description:
    "A senior-only technical partnership for founders and operators. SaaS/MVP, ERP, API & Backend, and AI automation with Claude, n8n, and Make.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fontClasses = [
    instrumentSerif.variable,
    interTight.variable,
    jetbrainsMono.variable,
    fraunces.variable,
    dmSans.variable,
    archivoNarrow.variable,
  ].join(" ");

  return (
    <html
      lang="en"
      data-palette="obsidian"
      data-bg="aurora"
      data-type="warm"
      className={fontClasses}
    >
      <body>{children}</body>
    </html>
  );
}
