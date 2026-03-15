const DEFAULT_SITE_URL = "http://localhost:3000";

export function getSiteUrl() {
  const rawValue =
    process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? DEFAULT_SITE_URL;

  try {
    const parsedUrl = new URL(rawValue);
    return parsedUrl.origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export function absoluteUrl(pathname: string) {
  const normalizedPathname = pathname.startsWith("/")
    ? pathname
    : `/${pathname}`;
  return `${getSiteUrl()}${normalizedPathname}`;
}
