"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  ArrowUpRight,
  Code2,
  Database,
  FileText,
  Github,
  Globe,
  Layers3,
  Linkedin,
  Mail,
  Menu,
  MessageCircleMore,
  Moon,
  Rocket,
  Server,
  Sparkles,
  Sun,
  Wrench,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  homeContentByLocale,
  type ExpertiseIconKey,
} from "@/data/portfolio";
import { CursorGlow } from "@/components/motion/cursor-glow";
import { usePortfolioPreferences } from "@/components/portfolio/use-portfolio-preferences";
import { ProjectLogo } from "@/components/portfolio/project-logo";
import { trackEvent } from "@/lib/analytics";

const expertiseIcons: Record<ExpertiseIconKey, LucideIcon> = {
  layers: Layers3,
  server: Server,
  database: Database,
  rocket: Rocket,
};

const reveal: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const stagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09 },
  },
};

type AnimatedTextProps = {
  text: string;
  className?: string;
  reducedMotion: boolean;
  stepMs?: number;
  maxDelayMs?: number;
};

function AnimatedText({
  text,
  className,
  reducedMotion,
  stepMs = 42,
  maxDelayMs = 2000,
}: AnimatedTextProps) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    let intervalId = 0;
    let index = 0;

    const startId = window.setTimeout(() => {
      if (reducedMotion) {
        setDisplayText(text);
        return;
      }

      const chars = Array.from(text);
      if (chars.length === 0) {
        setDisplayText("");
        return;
      }

      const durationMs = Math.min(2000, Math.max(420, Math.min(maxDelayMs, chars.length * stepMs)));
      const intervalMs = Math.max(14, Math.floor(durationMs / chars.length));
      setDisplayText("");

      intervalId = window.setInterval(() => {
        index += 1;
        setDisplayText(chars.slice(0, index).join(""));

        if (index >= chars.length) {
          window.clearInterval(intervalId);
        }
      }, intervalMs);
    }, 0);

    return () => {
      window.clearTimeout(startId);
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [maxDelayMs, reducedMotion, stepMs, text]);

  return <span className={className}>{reducedMotion ? text : displayText}</span>;
}

export function HomePage() {
  const { locale, setLocale, theme, toggleTheme } = usePortfolioPreferences();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [projectWindowStart, setProjectWindowStart] = useState(0);
  const [uniqueVisitors, setUniqueVisitors] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  const phoneNumber = "5527999787337";
  const message = encodeURIComponent("Olá Guilherme, vi o teu portfólio e gostaria de conversar!");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  const content = homeContentByLocale[locale];
  const copy = content.copy;
  const visibleProjectCount = 4;
  const shouldRotateProjects = content.projects.length > visibleProjectCount;

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    async function loadUniqueVisitors() {
      try {
        const response = await fetch("/api/analytics/unique-visitors", {
          signal: controller.signal,
        });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as { totalUsers?: number | null };

        if (
          isMounted &&
          typeof data.totalUsers === "number" &&
          Number.isFinite(data.totalUsers) &&
          data.totalUsers >= 0
        ) {
          setUniqueVisitors(data.totalUsers);
        }
      } catch {
        // no-op: snapshot keeps static metrics when analytics is unavailable
      }
    }

    loadUniqueVisitors();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (!shouldRotateProjects) {
      return undefined;
    }

    const rotationInterval = window.setInterval(() => {
      setProjectWindowStart((current) => (current + 1) % content.projects.length);
    }, 12000);

    return () => window.clearInterval(rotationInterval);
  }, [content.projects.length, shouldRotateProjects]);

  const visibleProjects = useMemo(() => {
    if (!shouldRotateProjects) {
      return content.projects;
    }

    return Array.from({ length: visibleProjectCount }, (_, offset) => {
      const projectIndex = (projectWindowStart + offset) % content.projects.length;
      return content.projects[projectIndex];
    });
  }, [content.projects, projectWindowStart, shouldRotateProjects]);

  const snapshotItems = useMemo(() => {
    const numberFormat = new Intl.NumberFormat(locale === "pt" ? "pt-BR" : "en-US");
    const visitorsValue = uniqueVisitors === null ? "--" : numberFormat.format(uniqueVisitors);
    const visitorsLabel =
      locale === "pt"
        ? "pessoas unicas viram este portfolio"
        : "unique people visited this portfolio";

    return [{ value: visitorsValue, label: visitorsLabel }, ...content.snapshot];
  }, [content.snapshot, locale, uniqueVisitors]);

  const trackNavigationClick = (target: string, location: string) => {
    trackEvent("nav_click", { target, location, locale });
  };

  const trackContactClick = (channel: string, location: string) => {
    trackEvent("contact_click", { channel, location, locale });
  };

  const orbLeftY = useSpring(useTransform(scrollY, [0, 900], [0, -120]), {
    stiffness: 120,
    damping: 24,
    mass: 0.35,
  });
  const orbRightY = useSpring(useTransform(scrollY, [0, 900], [0, 95]), {
    stiffness: 120,
    damping: 24,
    mass: 0.35,
  });
  const heroAsideY = useSpring(useTransform(scrollY, [0, 950], [0, 48]), {
    stiffness: 120,
    damping: 26,
    mass: 0.4,
  });

  return (
    <div className="relative isolate overflow-x-hidden pb-24">
      <CursorGlow />
      <div className="grid-pattern pointer-events-none absolute inset-0 -z-20 opacity-55" />
      <motion.div
        style={shouldReduceMotion ? undefined : { y: orbLeftY }}
        className="orb pointer-events-none absolute -left-20 top-20 -z-10 h-64 w-64 rounded-full bg-accent/25 blur-3xl"
      />
      <motion.div
        style={shouldReduceMotion ? undefined : { y: orbRightY }}
        className="orb pointer-events-none absolute -right-16 top-72 -z-10 h-56 w-56 rounded-full bg-highlight/30 blur-3xl [animation-delay:1.7s]"
      />

      <header className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-8 md:px-10">
        <div className="rounded-full border border-line/80 bg-card/90 px-4 py-3 backdrop-blur-xl md:px-6">
          <nav className="flex items-center justify-between gap-4">
            <a href="#home" className="font-display text-sm font-semibold tracking-wide md:text-base">
              Guilherme.Bodart.dev
            </a>
            <div className="hidden items-center gap-6 text-sm text-muted md:flex">
              <a
                href="#projects"
                onClick={() => trackNavigationClick("projects", "header")}
                className="transition hover:text-foreground"
              >
                {copy.navProjects}
              </a>
              <a
                href="#expertise"
                onClick={() => trackNavigationClick("expertise", "header")}
                className="transition hover:text-foreground"
              >
                {copy.navExpertise}
              </a>
              <a
                href="#contact"
                onClick={() => trackNavigationClick("contact", "header")}
                className="transition hover:text-foreground"
              >
                {copy.navContact}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-1 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => {
                    setLocale("pt");
                    trackEvent("locale_change", { from: locale, to: "pt", location: "home_header" });
                  }}
                  className={`px-1 py-1 transition ${locale === "pt"
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
                    trackEvent("locale_change", { from: locale, to: "en", location: "home_header" });
                  }}
                  className={`px-1 py-1 transition ${locale === "en"
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
                    location: "home_header",
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
              <button
                type="button"
                onClick={() => {
                  const nextState = !isMobileMenuOpen;
                  trackEvent(nextState ? "mobile_menu_open" : "mobile_menu_close", { locale });
                  setIsMobileMenuOpen(nextState);
                }}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-card-strong text-foreground transition hover:-translate-y-0.5 hover:shadow-lg md:hidden"
                aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-nav-menu"
              >
                {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </nav>
        </div>
      </header>
      {isMobileMenuOpen ? (
        <div className="fixed inset-0 z-40 md:hidden" id="mobile-nav-menu">
          <button
            type="button"
            onClick={() => {
              trackEvent("mobile_menu_close", { locale, location: "overlay" });
              setIsMobileMenuOpen(false);
            }}
            aria-label="Fechar menu"
            className="absolute inset-0 bg-background/60 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: 320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="absolute right-0 top-0 h-full w-[min(20rem,88vw)] border-l border-line bg-card p-6 shadow-2xl"
          >
            <div className="mb-8 flex items-center justify-between">
              <p className="text-sm font-semibold text-foreground">Menu</p>
              <button
                type="button"
                onClick={() => {
                  trackEvent("mobile_menu_close", { locale, location: "drawer_button" });
                  setIsMobileMenuOpen(false);
                }}
                aria-label="Fechar menu"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-card-strong text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-col gap-2 text-sm text-muted">
              <a
                href="#projects"
                onClick={() => {
                  trackNavigationClick("projects", "mobile_menu");
                  setIsMobileMenuOpen(false);
                }}
                className="rounded-xl px-3 py-2 transition hover:bg-card-strong hover:text-foreground"
              >
                {copy.navProjects}
              </a>
              <a
                href="#expertise"
                onClick={() => {
                  trackNavigationClick("expertise", "mobile_menu");
                  setIsMobileMenuOpen(false);
                }}
                className="rounded-xl px-3 py-2 transition hover:bg-card-strong hover:text-foreground"
              >
                {copy.navExpertise}
              </a>
              <a
                href="#contact"
                onClick={() => {
                  trackNavigationClick("contact", "mobile_menu");
                  setIsMobileMenuOpen(false);
                }}
                className="rounded-xl px-3 py-2 transition hover:bg-card-strong hover:text-foreground"
              >
                {copy.navContact}
              </a>
            </div>
          </motion.aside>
        </div>
      ) : null}

      <main className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-10">
        <motion.section
          id="home"
          variants={stagger}
          initial="hidden"
          animate="show"
          className="grid gap-10 pb-20 pt-14 md:grid-cols-[2fr_1fr] md:pt-24"
        >
          <motion.div variants={reveal} className="space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent-soft px-3 py-1.5 text-xs font-medium text-accent">
              <Sparkles className="h-3.5 w-3.5" />
              {copy.heroBadge}
            </div>

            <h1 className="min-h-[2.7em] font-display text-4xl leading-tight md:min-h-[2.2em] md:text-6xl">
              {copy.heroTitleLine1}
              <span className="block text-accent">{copy.heroTitleLine2}</span>
            </h1>

            <p className="min-h-[8rem] max-w-2xl text-base leading-8 text-muted md:min-h-[7rem] md:text-lg">
              {copy.heroDescription}
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="#projects"
                onClick={() => trackNavigationClick("projects", "hero_cta")}
                className="inline-flex h-12 w-[11.25rem] items-center justify-center gap-2 rounded-full bg-foreground px-5 text-sm font-semibold text-background transition hover:-translate-y-1 hover:shadow-xl"
              >
                {copy.heroPrimaryCta}
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="#expertise"
                onClick={() => trackNavigationClick("expertise", "hero_cta")}
                className="inline-flex h-12 w-[11.25rem] items-center justify-center gap-2 rounded-full border border-line bg-card-strong px-5 text-sm font-semibold text-foreground transition hover:-translate-y-1 hover:shadow-lg"
              >
                {copy.heroSecondaryCta}
                <Code2 className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          <motion.div style={shouldReduceMotion ? undefined : { y: heroAsideY }}>
            <motion.aside variants={reveal} className="rounded-3xl border border-line bg-card p-6 shadow-xl shadow-foreground/5 backdrop-blur-lg">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                {copy.snapshotTitle}
              </p>
              <div className="mt-6 space-y-5">
                {snapshotItems.map((item) => (
                  <div key={`${item.value}-${item.label}`} className="rounded-2xl border border-line bg-card-strong p-4">
                    <p className="text-3xl font-semibold">{item.value}</p>
                    <p className="text-sm text-muted">{item.label}</p>
                  </div>
                ))}
              </div>
            </motion.aside>
          </motion.div>
        </motion.section>

        <motion.section
          id="about"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.16 }}
          variants={stagger}
          className="space-y-7 py-8"
        >
          <motion.div variants={reveal} className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{copy.aboutTitle}</p>
            <h2 className="font-display text-3xl md:text-4xl">{copy.aboutTitle}</h2>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
            <motion.article
              variants={reveal}
              whileHover={shouldReduceMotion ? { y: -3 } : { y: -5 }}
              className="rounded-3xl border border-line bg-card p-6 shadow-lg shadow-foreground/5"
            >
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                {copy.aboutSummaryTitle}
              </p>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-muted">
                {content.aboutSummary.map((line) => (
                  <li key={line} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </motion.article>

            <motion.article
              variants={reveal}
              whileHover={shouldReduceMotion ? { y: -3 } : { y: -5 }}
              className="rounded-3xl border border-line bg-card p-6 shadow-lg shadow-foreground/5"
            >
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                {copy.aboutHistoryTitle}
              </p>
              <div className="history-scroll mt-5 max-h-64 overflow-y-auto pr-1">
                <div className="relative pl-6">
                  <span aria-hidden className="absolute bottom-2 left-[9px] top-2 w-px bg-line/80" />

                  {content.workHistory.map((item) => (
                    <div key={`${item.company}-${item.period}`} className="relative pb-4 last:pb-0">
                      <span
                        aria-hidden
                        className="absolute -left-[20px] top-2.5 h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_0_2px_var(--color-card-strong)]"
                      />

                      <div className="rounded-2xl border border-line/80 bg-card-strong/90 p-4">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <p className="text-sm font-semibold">{item.company}</p>
                            <p className="text-xs text-muted">{item.role}</p>
                          </div>
                          <p className="text-xs text-muted">{item.period}</p>
                        </div>
                        <p className="mt-2 text-xs text-muted">{item.location}</p>
                        <p className="mt-3 text-sm leading-6 text-muted">{item.summary}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>
          </div>
        </motion.section>

        <motion.section
          id="projects"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.16 }}
          variants={stagger}
          className="space-y-8 py-12"
        >
          <motion.div variants={reveal} className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
              {copy.selectedWork}
            </p>
            <h2 className="font-display text-3xl md:text-4xl">{copy.projectsTitle}</h2>
            <p className="max-w-3xl text-muted">{copy.projectsDescription}</p>
            {shouldRotateProjects ? (
              <p className="text-xs text-muted">
                {locale === "pt"
                  ? `${visibleProjectCount} de ${content.projects.length} projetos`
                  : `${visibleProjectCount} of ${content.projects.length} projects`}
              </p>
            ) : null}
          </motion.div>

          <motion.div variants={stagger} className="grid gap-6 md:grid-cols-2">
            {visibleProjects.map((project, index) => (
              <motion.article
                key={`project-slot-${index}`}
                whileHover={shouldReduceMotion ? { y: -4 } : { y: -6 }}
                className="group relative min-h-[36rem] overflow-hidden rounded-3xl border border-line bg-card p-6 shadow-lg shadow-foreground/5 will-change-transform md:min-h-[38rem]"
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-highlight/10 opacity-0 transition duration-500 group-hover:opacity-100" />
                <div className="relative flex h-full flex-col gap-5">
                  <div className="flex min-h-[6.75rem] items-start justify-between gap-4">
                    <div className="min-w-0">
                      <AnimatedText
                        text={project.category}
                        reducedMotion={Boolean(shouldReduceMotion)}
                        className="font-mono text-xs uppercase tracking-[0.16em] text-muted"
                        stepMs={44}
                        maxDelayMs={1600}
                      />
                      <AnimatedText
                        text={project.name}
                        reducedMotion={Boolean(shouldReduceMotion)}
                        className="mt-2 block text-2xl font-semibold leading-tight"
                        stepMs={48}
                        maxDelayMs={1800}
                      />
                    </div>
                    <div className="mt-1 inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-line bg-card-strong">
                      <ProjectLogo
                        key={`${project.slug}-${theme}-mini`}
                        slug={project.slug}
                        theme={theme}
                        variant="mini"
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                        fallback={
                          <Globe className="h-5 w-5 text-muted transition group-hover:text-accent" />
                        }
                      />
                    </div>
                  </div>

                  <AnimatedText
                    text={project.overview}
                    reducedMotion={Boolean(shouldReduceMotion)}
                    className="block min-h-[6.5rem] text-sm leading-7 text-muted"
                    stepMs={42}
                    maxDelayMs={3600}
                  />

                  <div className="flex min-h-[4.75rem] flex-wrap content-start gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-line bg-card-strong px-3 py-1 text-xs font-medium text-foreground"
                      >
                        <AnimatedText
                          text={tech}
                          reducedMotion={Boolean(shouldReduceMotion)}
                          className="leading-none"
                          stepMs={34}
                          maxDelayMs={1000}
                        />
                      </span>
                    ))}
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="min-h-[9rem] rounded-2xl border border-line bg-card-strong p-3">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                        <AnimatedText
                          text={copy.role}
                          reducedMotion={Boolean(shouldReduceMotion)}
                          className="block"
                          stepMs={30}
                          maxDelayMs={420}
                        />
                      </p>
                      <AnimatedText
                        text={project.role}
                        reducedMotion={Boolean(shouldReduceMotion)}
                        className="mt-2 block text-xs leading-5 text-muted"
                        stepMs={38}
                        maxDelayMs={3000}
                      />
                    </div>
                    <div className="min-h-[9rem] rounded-2xl border border-line bg-card-strong p-3">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                        <AnimatedText
                          text={copy.impact}
                          reducedMotion={Boolean(shouldReduceMotion)}
                          className="block"
                          stepMs={30}
                          maxDelayMs={420}
                        />
                      </p>
                      <AnimatedText
                        text={project.impact}
                        reducedMotion={Boolean(shouldReduceMotion)}
                        className="mt-2 block text-xs leading-5 text-muted"
                        stepMs={38}
                        maxDelayMs={3000}
                      />
                    </div>
                  </div>

                  <div className="mt-auto flex flex-wrap gap-4 pt-2 text-sm font-medium">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() =>
                        trackEvent("project_open_live", {
                          slug: project.slug,
                          slot: index + 1,
                          locale,
                        })
                      }
                      className="inline-flex items-center gap-2 text-foreground transition hover:text-accent"
                    >
                      <AnimatedText
                        text={project.liveLabel ?? copy.openProject}
                        reducedMotion={Boolean(shouldReduceMotion)}
                        className="block"
                        stepMs={30}
                        maxDelayMs={560}
                      />
                      <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                    <Link
                      href={`/projects/${project.slug}`}
                      onClick={() =>
                        trackEvent("project_open_case", {
                          slug: project.slug,
                          slot: index + 1,
                          locale,
                        })
                      }
                      className="inline-flex items-center gap-2 text-foreground transition hover:text-accent"
                    >
                      <AnimatedText
                        text={copy.caseStudy}
                        reducedMotion={Boolean(shouldReduceMotion)}
                        className="block"
                        stepMs={30}
                        maxDelayMs={560}
                      />
                      <FileText className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          id="expertise"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.16 }}
          variants={stagger}
          className="space-y-8 py-12"
        >
          <motion.div variants={reveal} className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{copy.myExpertise}</p>
            <h2 className="font-display text-3xl md:text-4xl">{copy.expertiseTitle}</h2>
            <p className="max-w-3xl text-muted">{copy.expertiseDescription}</p>
          </motion.div>

          <motion.div variants={stagger} className="grid gap-5 md:grid-cols-2">
            {content.expertise.map((item) => {
              const Icon = expertiseIcons[item.icon];

              return (
                <motion.article
                  key={item.title}
                  variants={reveal}
                  whileHover={shouldReduceMotion ? { y: -4 } : { y: -6, scale: 1.01 }}
                  className="rounded-3xl border border-line bg-card p-6 shadow-lg shadow-foreground/5 backdrop-blur-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-accent-soft p-2.5 text-accent">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-muted">{item.description}</p>

                  <ul className="mt-5 space-y-2 text-sm text-muted">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              );
            })}
          </motion.div>
        </motion.section>

        <motion.section
          id="contact"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={reveal}
          className="py-14"
        >
          <div className="rounded-[2rem] border border-line bg-card p-8 shadow-xl shadow-foreground/5 backdrop-blur-lg md:p-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="space-y-3">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{copy.contact}</p>
                <h2 className="font-display text-3xl md:text-4xl">{copy.contactTitle}</h2>
                <p className="max-w-2xl text-muted">{copy.contactDescription}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 w-full max-w-md">
                {/* Linha 1 */}
                <a
                  href="https://github.com/Guilherme-Bodart"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackContactClick("github", "contact_section")}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-line bg-card-strong px-4 py-3 text-sm font-semibold text-foreground transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>

                <a
                  href="https://www.linkedin.com/in/guilherme-bodart-819205194/"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackContactClick("linkedin", "contact_section")}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-line bg-card-strong px-4 py-3 text-sm font-semibold text-foreground transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>

                {/* Linha 2 */}
                <a
                  href="mailto:guilhermebodart73@gmail.com"
                  onClick={() => trackContactClick("email", "contact_section")}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-4 py-3 text-sm font-semibold text-background transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <Mail className="h-4 w-4" />
                  {copy.sendEmail}
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackContactClick("whatsapp", "contact_section")}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-4 py-3 text-sm font-semibold text-background transition hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2"
                >
                  <MessageCircleMore className="h-4 w-4" />
                  {copy.whatsapp}
                </a>
              </div>

            </div>
          </div>
        </motion.section>

        <footer className="flex flex-col items-start justify-between gap-3 border-t border-line py-8 text-sm text-muted md:flex-row md:items-center">
          <p>{copy.footerMain}</p>
          <p className="inline-flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            {copy.footerSub}
          </p>
        </footer>
      </main>
    </div>
  );
}
