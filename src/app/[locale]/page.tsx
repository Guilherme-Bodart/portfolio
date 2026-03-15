import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomePage } from "@/components/portfolio/home-page";
import { homeContentByLocale } from "@/data/portfolio";
import {
  isPortfolioLocale,
  localeToHtmlLang,
  portfolioLocales,
} from "@/lib/locale";

type HomePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return portfolioLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isPortfolioLocale(locale)) {
    return {};
  }

  const copy = homeContentByLocale[locale].copy;
  const title =
    locale === "pt" ? "Portfólio | Guilherme Bodart" : "Portfolio | Guilherme Bodart";

  return {
    title,
    description: copy.heroDescription,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        "pt-BR": "/pt",
        en: "/en",
      },
    },
    openGraph: {
      title,
      description: copy.heroDescription,
      url: `/${locale}`,
      type: "website",
      locale: localeToHtmlLang(locale).replace("-", "_"),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: copy.heroDescription,
    },
  };
}

export default async function LocalizedHomePage({ params }: HomePageProps) {
  const { locale } = await params;

  if (!isPortfolioLocale(locale)) {
    notFound();
  }

  return <HomePage initialLocale={locale} />;
}
