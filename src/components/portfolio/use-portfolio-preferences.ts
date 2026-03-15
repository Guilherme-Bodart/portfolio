"use client";

import { useEffect, useState } from "react";
import type { Locale, ThemeMode } from "@/data/portfolio";
import { localeToHtmlLang } from "@/lib/locale";

const LOCALE_KEY = "portfolio-locale";
const THEME_KEY = "portfolio-theme";

function getInitialLocale(): Locale {
  if (typeof window === "undefined") {
    return "pt";
  }

  const stored = window.localStorage.getItem(LOCALE_KEY);

  if (stored === "pt" || stored === "en") {
    return stored;
  }

  return window.navigator.language.toLowerCase().startsWith("en") ? "en" : "pt";
}

function getInitialTheme(): ThemeMode {
  if (typeof window === "undefined") {
    return "light";
  }

  const stored = window.localStorage.getItem(THEME_KEY);

  if (stored === "light" || stored === "dark") {
    return stored;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function usePortfolioPreferences(initialLocale?: Locale) {
  const [locale, setLocale] = useState<Locale>(
    () => initialLocale ?? getInitialLocale()
  );
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

  useEffect(() => {
    window.localStorage.setItem(LOCALE_KEY, locale);
    document.documentElement.lang = localeToHtmlLang(locale);
  }, [locale]);

  useEffect(() => {
    window.localStorage.setItem(THEME_KEY, theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };

  return {
    locale,
    setLocale,
    theme,
    setTheme,
    toggleTheme,
  };
}
