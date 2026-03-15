import type { Metadata } from "next";
import { Suspense } from "react";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Portfolio | Guilherme Bodart",
    template: "%s",
  },
  description:
    "Developer portfolio with projects, stack, expertise, and results. Portfólio de desenvolvedor com projetos e resultados.",
  alternates: {
    canonical: "/pt",
    languages: {
      "pt-BR": "/pt",
      en: "/en",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${plusJakarta.variable} ${spaceGrotesk.variable} antialiased`}
      >
        {children}
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
      </body>
    </html>
  );
}
