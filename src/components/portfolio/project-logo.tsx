"use client";

import { useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import type { ProjectSlug, ThemeMode } from "@/data/portfolio";

type LogoVariant = "full" | "mini";

type ProjectLogoProps = {
  slug: ProjectSlug;
  theme: ThemeMode;
  variant?: LogoVariant;
  alt?: string;
  className?: string;
  miniFallbackClassName?: string;
  width: number;
  height: number;
  fallback?: ReactNode;
};

type ThemeLogoPaths = {
  light: string[];
  dark: string[];
};

type VariantLogoPaths = {
  mini: ThemeLogoPaths;
  full: ThemeLogoPaths;
};

const logoPathMap: Record<ProjectSlug, VariantLogoPaths> = {
  portfolio: {
    mini: {
      light: ["/logos/portfolio/mini.svg", "/logos/portfolio/mini-dark.svg"],
      dark: ["/logos/portfolio/mini-dark.svg", "/logos/portfolio/mini.svg"],
    },
    full: {
      light: ["/logos/portfolio/full.svg", "/logos/portfolio/full-dark.svg"],
      dark: ["/logos/portfolio/full-dark.svg", "/logos/portfolio/full.svg"],
    },
  },
  mangastracker: {
    mini: {
      light: ["/logos/mangastracker/mini.svg", "/logos/mangastracker/mini-dark.svg"],
      dark: ["/logos/mangastracker/mini-dark.svg", "/logos/mangastracker/mini.svg"],
    },
    full: {
      light: ["/logos/mangastracker/full.svg", "/logos/mangastracker/full-dark.svg"],
      dark: ["/logos/mangastracker/full-dark.svg", "/logos/mangastracker/full.svg"],
    },
  },
  "manga-tracker-sync": {
    mini: {
      light: ["/logos/manga-tracker-sync/mini.svg", "/logos/manga-tracker-sync/mini-dark.svg"],
      dark: ["/logos/manga-tracker-sync/mini-dark.svg", "/logos/manga-tracker-sync/mini.svg"],
    },
    full: {
      light: ["/logos/manga-tracker-sync/full.svg", "/logos/manga-tracker-sync/full-dark.svg"],
      dark: ["/logos/manga-tracker-sync/full-dark.svg", "/logos/manga-tracker-sync/full.svg"],
    },
  },
  "atman-systems": {
    mini: {
      light: ["/logos/atman-systems/mini.svg"],
      dark: ["/logos/atman-systems/mini.svg"],
    },
    full: {
      light: ["/logos/atman-systems/full.svg"],
      dark: ["/logos/atman-systems/full.svg"],
    },
  },
  "atman-landing": {
    mini: {
      light: ["/logos/atman-landing/mini.png"],
      dark: ["/logos/atman-landing/mini.png"],
    },
    full: {
      light: ["/logos/atman-landing/full.svg"],
      dark: ["/logos/atman-landing/full.svg"],
    },
  },
  "chocolate-doceria": {
    mini: {
      light: ["/logos/chocolate-doceria/mini.svg"],
      dark: ["/logos/chocolate-doceria/mini.svg"],
    },
    full: {
      light: ["/logos/chocolate-doceria/full.PNG"],
      dark: ["/logos/chocolate-doceria/full.PNG"],
    },
  },
};

function buildCandidates(
  slug: ProjectSlug,
  variant: LogoVariant,
  theme: ThemeMode
): string[] {
  const requested = logoPathMap[slug][variant][theme];
  const alternateVariant = variant === "mini" ? "full" : "mini";
  const alternate = logoPathMap[slug][alternateVariant][theme];
  const candidates = [...requested, ...alternate];

  return Array.from(new Set(candidates));
}

export function ProjectLogo({
  slug,
  theme,
  variant = "mini",
  alt,
  className,
  miniFallbackClassName,
  width,
  height,
  fallback = null,
}: ProjectLogoProps) {
  const candidates = useMemo(
    () => buildCandidates(slug, variant, theme),
    [slug, variant, theme]
  );
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  if (candidateIndex >= candidates.length) {
    return <>{fallback}</>;
  }

  const source = candidates[candidateIndex];
  const usesMiniAsset = /\/mini(?:-dark)?\./.test(source);
  const resolvedClassName = [
    className ?? "",
    usesMiniAsset ? "rounded-full" : "",
    usesMiniAsset ? miniFallbackClassName ?? "" : "",
    isLoaded ? "opacity-100" : "opacity-0",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Image
      key={source}
      src={source}
      alt={alt ?? `${slug} logo`}
      width={width}
      height={height}
      className={resolvedClassName}
      onLoad={() => setIsLoaded(true)}
      onError={() => {
        setIsLoaded(false);
        setCandidateIndex((current) => current + 1);
      }}
    />
  );
}
