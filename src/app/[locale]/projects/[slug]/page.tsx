import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetailPage } from "@/components/portfolio/project-detail-page";
import { isProjectSlug, projectSlugs } from "@/data/portfolio";
import { projectDetailsByLocale } from "@/data/project-details";
import {
  isPortfolioLocale,
  localeToHtmlLang,
  portfolioLocales,
} from "@/lib/locale";

type ProjectPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export function generateStaticParams() {
  return portfolioLocales.flatMap((locale) =>
    projectSlugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isPortfolioLocale(locale) || !isProjectSlug(slug)) {
    return {};
  }

  const project = projectDetailsByLocale[locale][slug];
  const title = `${project.name} | Guilherme Bodart`;
  const description = project.subtitle;

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/projects/${slug}`,
      languages: {
        "pt-BR": `/pt/projects/${slug}`,
        en: `/en/projects/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/projects/${slug}`,
      type: "article",
      locale: localeToHtmlLang(locale).replace("-", "_"),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function LocalizedProjectPage({ params }: ProjectPageProps) {
  const { locale, slug } = await params;

  if (!isPortfolioLocale(locale) || !isProjectSlug(slug)) {
    notFound();
  }

  return <ProjectDetailPage slug={slug} initialLocale={locale} />;
}
