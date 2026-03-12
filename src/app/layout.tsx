import type { Metadata } from "next";
import { Suspense } from "react";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
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
  title: "Portfolio | Guilherme",
  description:
    "Developer portfolio with projects, stack, expertise, and results. Portfólio de desenvolvedor com projetos e resultados.",
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

