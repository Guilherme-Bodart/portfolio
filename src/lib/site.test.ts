import assert from "node:assert/strict";
import test, { afterEach } from "node:test";
import { absoluteUrl, getSiteUrl } from "./site";

const originalEnv = { ...process.env };

afterEach(() => {
  process.env = { ...originalEnv };
});

test("getSiteUrl should use NEXT_PUBLIC_SITE_URL when valid", () => {
  process.env.NEXT_PUBLIC_SITE_URL = "https://portfolio.example.com";
  assert.equal(getSiteUrl(), "https://portfolio.example.com");
});

test("getSiteUrl should fallback to localhost when invalid", () => {
  process.env.NEXT_PUBLIC_SITE_URL = "not-a-url";
  assert.equal(getSiteUrl(), "http://localhost:3000");
});

test("absoluteUrl should normalize paths", () => {
  process.env.NEXT_PUBLIC_SITE_URL = "https://portfolio.example.com";
  assert.equal(absoluteUrl("/pt"), "https://portfolio.example.com/pt");
  assert.equal(
    absoluteUrl("en/projects/portfolio"),
    "https://portfolio.example.com/en/projects/portfolio"
  );
});
