import assert from "node:assert/strict";
import test from "node:test";
import {
  defaultPortfolioLocale,
  isPortfolioLocale,
  normalizePortfolioLocale,
  switchLocalePath,
  withLocalePath,
} from "./locale";

test("normalizePortfolioLocale should fallback to default locale", () => {
  assert.equal(normalizePortfolioLocale(undefined), defaultPortfolioLocale);
  assert.equal(normalizePortfolioLocale("es"), defaultPortfolioLocale);
});

test("isPortfolioLocale should validate supported locales", () => {
  assert.equal(isPortfolioLocale("pt"), true);
  assert.equal(isPortfolioLocale("en"), true);
  assert.equal(isPortfolioLocale("fr"), false);
});

test("withLocalePath should build localized URLs", () => {
  assert.equal(withLocalePath("pt"), "/pt");
  assert.equal(withLocalePath("en", "/projects/portfolio"), "/en/projects/portfolio");
});

test("switchLocalePath should swap existing locale segment", () => {
  assert.equal(switchLocalePath("/pt/projects/portfolio", "en"), "/en/projects/portfolio");
});

test("switchLocalePath should prepend locale to non-localized paths", () => {
  assert.equal(switchLocalePath("/projects/portfolio", "pt"), "/pt/projects/portfolio");
});
