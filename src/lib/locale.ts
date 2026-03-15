import type { Locale } from "@/data/portfolio";

export const portfolioLocales: Locale[] = ["pt", "en"];
export const defaultPortfolioLocale: Locale = "pt";

export function isPortfolioLocale(value: string): value is Locale {
  return portfolioLocales.includes(value as Locale);
}

export function normalizePortfolioLocale(value: string | undefined): Locale {
  if (!value) {
    return defaultPortfolioLocale;
  }

  return isPortfolioLocale(value) ? value : defaultPortfolioLocale;
}

export function localeToHtmlLang(locale: Locale) {
  return locale === "pt" ? "pt-BR" : "en";
}

export function withLocalePath(locale: Locale, path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return normalizedPath === "/" ? `/${locale}` : `/${locale}${normalizedPath}`;
}

export function switchLocalePath(pathname: string, nextLocale: Locale) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return `/${nextLocale}`;
  }

  if (isPortfolioLocale(segments[0])) {
    segments[0] = nextLocale;
    return `/${segments.join("/")}`;
  }

  return `/${nextLocale}/${segments.join("/")}`;
}
