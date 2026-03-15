import type { MetadataRoute } from "next";
import { projectSlugs } from "@/data/portfolio";
import { absoluteUrl } from "@/lib/site";

const locales = ["pt", "en"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const homeEntries: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: absoluteUrl(`/${locale}`),
    lastModified: new Date(),
    alternates: {
      languages: {
        "pt-BR": absoluteUrl("/pt"),
        en: absoluteUrl("/en"),
      },
    },
  }));

  const projectEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    projectSlugs.map((slug) => ({
      url: absoluteUrl(`/${locale}/projects/${slug}`),
      lastModified: new Date(),
      alternates: {
        languages: {
          "pt-BR": absoluteUrl(`/pt/projects/${slug}`),
          en: absoluteUrl(`/en/projects/${slug}`),
        },
      },
    }))
  );

  return [...homeEntries, ...projectEntries];
}
