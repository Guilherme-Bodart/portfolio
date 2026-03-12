"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Database,
  Droplet,
  Flame,
  Github,
  Layers3,
  Leaf,
  Moon,
  ShieldCheck,
  Sun,
  Workflow,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  type FeatureIconKey,
  type ProjectSlug,
} from "@/data/portfolio";
import { detailCopyByLocale, projectDetailsByLocale } from "@/data/project-details";
import { usePortfolioPreferences } from "@/components/portfolio/use-portfolio-preferences";
import { CursorGlow } from "@/components/motion/cursor-glow";
import { ProjectLogo } from "@/components/portfolio/project-logo";
import { trackEvent } from "@/lib/analytics";

const featureIcons: Record<FeatureIconKey, LucideIcon> = {
  layers: Layers3,
  workflow: Workflow,
  zap: Zap,
  shield: ShieldCheck,
};

const reveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const stagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

type ProjectDetailPageProps = {
  slug: ProjectSlug;
};

export function ProjectDetailPage({ slug }: ProjectDetailPageProps) {
  const { locale, setLocale, theme, toggleTheme } = usePortfolioPreferences();
  const shouldReduceMotion = useReducedMotion();
  const isDarkTheme = theme === "dark";

  const copy = detailCopyByLocale[locale];
  const project = projectDetailsByLocale[locale][slug];
  const battleCards = [
    {
      title: copy.challengeTitle,
      content: project.challenge,
      icon: Flame,
      colorClass: isDarkTheme
        ? "bg-rose-400 shadow-[0_0_0_1px_rgba(251,113,133,0.75),0_0_24px_rgba(244,63,94,0.95),0_0_44px_rgba(244,63,94,0.55)]"
        : "bg-rose-500 shadow-[0_0_16px_rgba(244,63,94,0.45)]",
    },
    {
      title: copy.solutionTitle,
      content: project.solution,
      icon: Leaf,
      colorClass: isDarkTheme
        ? "bg-emerald-400 shadow-[0_0_0_1px_rgba(52,211,153,0.75),0_0_24px_rgba(16,185,129,0.95),0_0_44px_rgba(16,185,129,0.55)]"
        : "bg-emerald-500 shadow-[0_0_16px_rgba(16,185,129,0.45)]",
    },
    {
      title: copy.outcomeTitle,
      content: project.outcome,
      icon: Droplet,
      colorClass: isDarkTheme
        ? "bg-sky-400 shadow-[0_0_0_1px_rgba(56,189,248,0.75),0_0_24px_rgba(14,165,233,0.95),0_0_44px_rgba(14,165,233,0.55)]"
        : "bg-sky-500 shadow-[0_0_16px_rgba(14,165,233,0.45)]",
    },
  ];

  return (
    <div className="relative isolate overflow-x-hidden pb-24">
      <CursorGlow />
      <div className="grid-pattern pointer-events-none absolute inset-0 -z-20 opacity-55" />

      <header className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-8 md:px-10">
        <div className="rounded-full border border-line/80 bg-card/90 px-4 py-3 backdrop-blur-xl md:px-6">
          <nav className="flex items-center justify-between gap-4">
            <Link
              href="/"
              onClick={() => trackEvent("back_to_home_click", { slug: project.slug, locale })}
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              {copy.backToHome}
            </Link>
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-1 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => {
                    setLocale("pt");
                    trackEvent("locale_change", { from: locale, to: "pt", location: "project_detail" });
                  }}
                  className={`px-1 py-1 transition ${
                    locale === "pt"
                      ? "text-foreground"
                      : "text-foreground/55 hover:text-foreground"
                  }`}
                  aria-pressed={locale === "pt"}
                >
                  {copy.langPt}
                </button>
                <span className="text-foreground/35">/</span>
                <button
                  type="button"
                  onClick={() => {
                    setLocale("en");
                    trackEvent("locale_change", { from: locale, to: "en", location: "project_detail" });
                  }}
                  className={`px-1 py-1 transition ${
                    locale === "en"
                      ? "text-foreground"
                      : "text-foreground/55 hover:text-foreground"
                  }`}
                  aria-pressed={locale === "en"}
                >
                  {copy.langEn}
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  trackEvent("theme_toggle", {
                    from: theme,
                    to: theme === "light" ? "dark" : "light",
                    location: "project_detail",
                  });
                  toggleTheme();
                }}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-card-strong text-foreground transition hover:-translate-y-0.5 hover:shadow-lg"
                aria-label={theme === "light" ? "Ativar tema escuro" : "Ativar tema claro"}
              >
                {theme === "light" ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
              </button>
            </div>
          </nav>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-12 md:px-10">
        <motion.section
          variants={stagger}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
          <motion.div variants={reveal} className="space-y-3 border-t border-line pt-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                {project.name}
              </p>
              <ProjectLogo
                key={`${slug}-${theme}-full`}
                slug={slug}
                theme={theme}
                variant="full"
                miniFallbackClassName="h-[76px] w-[76px] object-cover"
                width={300}
                height={92}
                className="h-12 w-auto object-contain md:h-14"
              />
            </div>
            <h1 className="font-display text-4xl md:text-5xl">{project.subtitle}</h1>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  trackEvent("project_detail_live_click", {
                    slug: project.slug,
                    locale,
                  })
                }
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                {project.liveLabel}
                <ArrowUpRight className="h-4 w-4" />
              </a>
              {project.repoUrl ? (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() =>
                    trackEvent("project_detail_repo_click", {
                      slug: project.slug,
                      locale,
                    })
                  }
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-card-strong px-4 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  {project.repoLabel ?? "GitHub"}
                  <Github className="h-4 w-4" />
                </a>
              ) : null}
            </div>
          </motion.div>

          <motion.div
            variants={reveal}
            className="rounded-3xl border border-line bg-card p-6 shadow-xl shadow-foreground/5 backdrop-blur-lg md:p-8"
          >
            <h2 className="text-2xl font-semibold">{copy.overviewTitle}</h2>
            <p className="mt-4 max-w-3xl text-muted">{project.overview}</p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {project.metrics.map((metric) => (
                <div key={`${metric.value}-${metric.label}`} className="rounded-2xl border border-line bg-card-strong p-4">
                  <p className="text-3xl font-semibold">{metric.value}</p>
                  <p className="mt-1 text-sm text-muted">{metric.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={stagger} className="grid gap-4 md:grid-cols-3">
            {battleCards.map((card) => (
              <motion.article
                key={card.title}
                variants={reveal}
                whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                className="relative rounded-2xl border border-line bg-card p-5"
              >
                <span
                  aria-hidden
                  className={`absolute right-4 top-4 inline-flex h-7 w-7 items-center justify-center rounded-full text-white ring-2 ${isDarkTheme ? "ring-white/55" : "ring-white/30"} ${card.colorClass}`}
                >
                  <card.icon
                    className={`h-4 w-4 ${
                      isDarkTheme
                        ? "drop-shadow-[0_0_6px_rgba(255,255,255,0.65)]"
                        : ""
                    }`}
                  />
                </span>
                <h3 className="text-lg font-semibold">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{card.content}</p>
              </motion.article>
            ))}
          </motion.div>

          <motion.section
            variants={reveal}
            className="rounded-3xl border border-line bg-card p-6 shadow-lg shadow-foreground/5 md:p-8"
          >
            <h2 className="text-2xl font-semibold">{copy.architectureTitle}</h2>
            <div className="mt-6 grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="inline-flex items-center gap-2 text-lg font-semibold">
                  <Layers3 className="h-5 w-5 text-accent" />
                  {copy.frontendTitle}
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-muted">
                  {project.frontendStack.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="inline-flex items-center gap-2 text-lg font-semibold">
                  <Database className="h-5 w-5 text-highlight" />
                  {copy.backendTitle}
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-muted">
                  {project.backendStack.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-highlight" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.section>

          <motion.section
            variants={reveal}
            className="rounded-3xl border border-line bg-card p-6 shadow-lg shadow-foreground/5 md:p-8"
          >
            <h2 className="text-2xl font-semibold">{copy.featuresTitle}</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {project.features.map((feature) => {
                const Icon = featureIcons[feature.icon];

                return (
                  <motion.article
                    key={feature.title}
                    whileHover={shouldReduceMotion ? undefined : { y: -3 }}
                    className="rounded-2xl border border-line bg-card-strong p-4"
                  >
                    <div className="inline-flex rounded-xl bg-accent-soft p-2 text-accent">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="mt-3 text-base font-semibold">{feature.title}</h3>
                    <p className="mt-1 text-sm text-muted">{feature.description}</p>
                  </motion.article>
                );
              })}
            </div>
          </motion.section>

          <motion.section
            variants={reveal}
            className="rounded-3xl border border-line bg-card p-6 shadow-lg shadow-foreground/5 md:p-8"
          >
            <h2 className="text-2xl font-semibold">{copy.securityTitle}</h2>
            <ul className="mt-5 space-y-3 text-sm text-muted">
              {project.securityReliability.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.section>

          <motion.section
            variants={reveal}
            className="rounded-3xl border border-line bg-card p-6 shadow-lg shadow-foreground/5 md:p-8"
          >
            <h2 className="text-2xl font-semibold">{copy.qualityTitle}</h2>
            <ul className="mt-5 space-y-3 text-sm text-muted">
              {project.codeQuality.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-highlight" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.section>

          {project.nextSteps.length > 0 ? (
            <motion.section
              variants={reveal}
              className="rounded-3xl border border-line bg-card p-6 shadow-lg shadow-foreground/5 md:p-8"
            >
              <h2 className="text-2xl font-semibold">{copy.nextStepsTitle}</h2>
              <ol className="mt-5 space-y-3 text-sm text-muted">
                {project.nextSteps.map((item, index) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-[11px] font-semibold text-accent">
                      {index + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </motion.section>
          ) : null}
        </motion.section>
      </main>
    </div>
  );
}
