export type Locale = "pt" | "en";
export type ThemeMode = "light" | "dark";

export type ProjectSlug =
  | "portfolio"
  | "mangastracker"
  | "atman-systems"
  | "atman-landing"
  | "chocolate-doceria"
  | "manga-tracker-sync";

export type ExpertiseIconKey = "layers" | "server" | "database" | "rocket";
export type FeatureIconKey = "layers" | "workflow" | "zap" | "shield";

export type SnapshotMetric = {
  value: string;
  label: string;
};

export type ProjectCard = {
  slug: ProjectSlug;
  name: string;
  category: string;
  overview: string;
  role: string;
  impact: string;
  stack: string[];
  liveUrl: string;
  liveLabel?: string;
  repoUrl?: string;
  repoLabel?: string;
};

export type ExpertiseItem = {
  title: string;
  description: string;
  icon: ExpertiseIconKey;
  bullets: string[];
};

export type WorkHistoryItem = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
};

export type HomeCopy = {
  navProjects: string;
  navExpertise: string;
  navContact: string;
  contactCta: string;
  langPt: string;
  langEn: string;
  heroBadge: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroDescription: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  aboutTitle: string;
  aboutSummaryTitle: string;
  aboutHistoryTitle: string;
  selectedWork: string;
  projectsTitle: string;
  projectsDescription: string;
  role: string;
  impact: string;
  openProject: string;
  caseStudy: string;
  myExpertise: string;
  expertiseTitle: string;
  expertiseDescription: string;
  contact: string;
  contactTitle: string;
  contactDescription: string;
  sendEmail: string;
  whatsapp: string;
  footerMain: string;
  footerSub: string;
  snapshotTitle: string;
};

export type HomeContent = {
  copy: HomeCopy;
  snapshot: SnapshotMetric[];
  aboutSummary: string[];
  workHistory: WorkHistoryItem[];
  projects: ProjectCard[];
  expertise: ExpertiseItem[];
};

const homeProjectsPt: ProjectCard[] = [
  {
    slug: "portfolio",
    name: "Portfolio Pessoal",
    category: "Site pessoal",
    overview:
      "Portfólio pessoal construído para apresentar projetos com contexto técnico real, histórico profissional e contato direto.",
    role:
      "Arquitetura e desenvolvimento completo com Next.js, TypeScript, Tailwind CSS e Framer Motion, incluindo i18n PT/EN e página de case por projeto.",
    impact:
      "Base profissional para posicionamento, captação de oportunidades e atualização contínua sem retrabalho estrutural.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://github.com/Guilherme-Bodart/portfolio",
    liveLabel: "Ver no GitHub",
  },
  {
    slug: "mangastracker",
    name: "MangasTracker",
    category: "Web App",
    overview:
      "Aplicação para acompanhar mangás e organizar progresso de leitura com foco em usabilidade e acesso rápido.",
    role: "Desenvolvimento full stack com Next.js, estrutura de páginas e fluxo principal do produto.",
    impact: "Centraliza acompanhamento e gestão de leitura em um único ambiente.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://mangastracker.vercel.app/pt/contact",
    liveLabel: "Abrir projeto",
  },
  {
    slug: "atman-systems",
    name: "Hellius (Atman)",
    category: "Produto web",
    overview:
      "Atuação no sistema Hellius (aba de Produtos da Atman), com foco em operação georreferenciada e evolução contínua do produto.",
    role:
      "Desenvolvimento e sustentação full stack com Angular no frontend e Node.js no backend, incluindo integrações com Google Maps e OpenStreetMap.",
    impact:
      "Melhoria de estabilidade do sistema, fluxo mais leve após correções e melhor suporte para rotina operacional.",
    stack: ["Angular", "TypeScript", "Node.js", "SCSS", "Google Maps API", "OpenStreetMap"],
    liveUrl: "https://atmansystems.com",
    liveLabel: "Abrir projeto",
  },
  {
    slug: "atman-landing",
    name: "Atman Systems Landing",
    category: "Site/Landing institucional",
    overview:
      "Construção do site e landing institucional da Atman para apresentar serviços, proposta de valor e canais de contato com leitura clara.",
    role:
      "Implementação frontend em Angular com organização por seções, hierarquia de conteúdo e fluxo de navegação orientado à conversão.",
    impact:
      "Comunicação comercial mais objetiva, melhor experiência de leitura e base pronta para evolução contínua de conteúdo institucional.",
    stack: ["Angular", "TypeScript", "SCSS", "SEO técnico"],
    liveUrl: "https://atmansystems.com",
    liveLabel: "Abrir projeto",
  },
  {
    slug: "chocolate-doceria",
    name: "Chocolate e Doceria",
    category: "Landing comercial multi-tenant",
    overview:
      "Landing personalizada em Next.js 16 com schema tipado, catálogo por categoria e foco em conversão via WhatsApp.",
    role:
      "Arquitetura frontend com App Router, Tailwind CSS 4, Framer Motion, Embla Carousel e configuração por tenant/locale.",
    impact:
      "Base escalável para múltiplos clientes, SEO técnico bilíngue e manutenção contínua sem reescrita do núcleo.",
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Framer Motion", "Embla Carousel"],
    liveUrl: "https://chocolateedoceria.vercel.app",
    liveLabel: "Abrir projeto",
  },
  {
    slug: "manga-tracker-sync",
    name: "Manga Tracker Sync",
    category: "Extensão Web",
    overview:
      "Extensão web integrada ao ecossistema Manga Tracker, com sincronização no navegador (Firefox hoje e expansão para Chrome e Opera).",
    role:
      "Desenvolvimento da extensão, integração com APIs do tracker e publicação inicial no Firefox Add-ons com base pronta para multi-browser.",
    impact:
      "Atualização de progresso sem sair do contexto de leitura e estrutura preparada para distribuição em novas lojas.",
    stack: ["WebExtensions API", "JavaScript", "Firefox", "Chrome (planejado)", "Opera (planejado)"],
    liveUrl: "https://addons.mozilla.org/pt-BR/firefox/addon/manga-tracker-sync/",
    liveLabel: "Ver no Add-ons",
  },
];

const homeProjectsEn: ProjectCard[] = [
  {
    slug: "portfolio",
    name: "Personal Portfolio",
    category: "Personal website",
    overview:
      "Personal portfolio built to present projects with real technical context, work history, and direct contact channels.",
    role:
      "End-to-end architecture and implementation with Next.js, TypeScript, Tailwind CSS, and Framer Motion, including PT/EN i18n and project case pages.",
    impact:
      "Professional base for positioning, opportunity generation, and continuous updates without structural rework.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://github.com/Guilherme-Bodart/portfolio",
    liveLabel: "View on GitHub",
  },
  {
    slug: "mangastracker",
    name: "MangasTracker",
    category: "Web App",
    overview:
      "An app to track manga and organize reading progress with fast access and usability as core priorities.",
    role: "Full stack implementation with Next.js, page architecture, and core product flows.",
    impact: "Centralizes reading tracking and progress management in a single workspace.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://mangastracker.vercel.app/pt/contact",
    liveLabel: "Open project",
  },
  {
    slug: "atman-systems",
    name: "Hellius (Atman)",
    category: "Web product",
    overview:
      "Work on Hellius (Atman's Products section), focused on geo-enabled workflows and continuous product evolution.",
    role:
      "Full stack development and support with Angular frontend and Node.js backend, including Google Maps and OpenStreetMap integrations.",
    impact:
      "Improved system stability, lighter flow after fixes, and stronger support for operational routines.",
    stack: ["Angular", "TypeScript", "Node.js", "SCSS", "Google Maps API", "OpenStreetMap"],
    liveUrl: "https://atmansystems.com",
    liveLabel: "Open project",
  },
  {
    slug: "atman-landing",
    name: "Atman Systems Landing",
    category: "Institutional website/landing",
    overview:
      "Built Atman's institutional website/landing to present services, value proposition, and contact channels with clear information architecture.",
    role:
      "Angular frontend implementation with section-based structure, content hierarchy, and conversion-oriented navigation.",
    impact:
      "Clearer commercial communication, better reading flow, and a maintainable base for ongoing institutional content updates.",
    stack: ["Angular", "TypeScript", "SCSS", "Technical SEO"],
    liveUrl: "https://atmansystems.com",
    liveLabel: "Open project",
  },
  {
    slug: "chocolate-doceria",
    name: "Chocolate e Doceria",
    category: "Multi-tenant commercial landing",
    overview:
      "Custom Next.js 16 landing with typed schema, category-driven catalog, and WhatsApp-first conversion flow.",
    role:
      "Frontend architecture with App Router, Tailwind CSS 4, Framer Motion, Embla Carousel, and tenant/locale-driven configuration.",
    impact:
      "Scalable base for multiple clients, bilingual technical SEO, and continuous maintenance without core rewrites.",
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Framer Motion", "Embla Carousel"],
    liveUrl: "https://chocolateedoceria.vercel.app",
    liveLabel: "Open project",
  },
  {
    slug: "manga-tracker-sync",
    name: "Manga Tracker Sync",
    category: "Web Extension",
    overview:
      "Web extension integrated with Manga Tracker, enabling in-browser sync (Firefox live today, Chrome and Opera planned).",
    role:
      "Extension architecture, tracker API integration, and Firefox Add-ons release with multi-browser-ready foundation.",
    impact:
      "Faster progress sync inside real reading flow and reusable base for broader browser distribution.",
    stack: ["WebExtensions API", "JavaScript", "Firefox", "Chrome (planned)", "Opera (planned)"],
    liveUrl: "https://addons.mozilla.org/pt-BR/firefox/addon/manga-tracker-sync/",
    liveLabel: "View on Add-ons",
  },
];

const expertisePt: ExpertiseItem[] = [
  {
    title: "Frontend que converte",
    description:
      "Interfaces limpas e objetivas com foco em conversão, narrativa visual e manutenção consistente.",
    icon: "layers",
    bullets: [
      "Arquitetura de componentes escalável",
      "Animações que guiam atenção sem ruído",
      "Responsividade e acessibilidade aplicadas no fluxo real",
    ],
  },
  {
    title: "Backend e APIs",
    description:
      "Base técnica robusta para autenticação, processamento de dados e integração sem quebrar o produto.",
    icon: "server",
    bullets: [
      "REST APIs e tarefas assíncronas",
      "Autenticação, autorização e hardening",
      "Observabilidade com logs e rastreabilidade",
    ],
  },
  {
    title: "Dados e integrações",
    description:
      "Integração de serviços e dados para sustentar decisões de produto com visão de operação.",
    icon: "database",
    bullets: [
      "Pipelines e ETL enxutos",
      "Dashboards orientados a negócio",
      "Integrações com APIs externas e parceiros",
    ],
  },
  {
    title: "Execução e qualidade",
    description:
      "Entrega iterativa com padrão técnico alto e ciclos curtos de melhoria contínua.",
    icon: "rocket",
    bullets: [
      "Code review orientado a impacto",
      "Testes de fluxo crítico",
      "Performance e DX no dia a dia",
    ],
  },
];

const expertiseEn: ExpertiseItem[] = [
  {
    title: "Frontend that converts",
    description:
      "Clean and focused interfaces built for conversion, strong product storytelling, and maintainability.",
    icon: "layers",
    bullets: [
      "Scalable component architecture",
      "Motion that guides attention without noise",
      "Accessibility and responsive behavior in real scenarios",
    ],
  },
  {
    title: "Backend and APIs",
    description:
      "Robust technical foundation for auth, data workflows, and integrations that scale safely.",
    icon: "server",
    bullets: [
      "REST APIs and async workloads",
      "Authentication, authorization, and hardening",
      "Observability with useful logs and traceability",
    ],
  },
  {
    title: "Data and integrations",
    description:
      "Connecting tools and data to support product decisions with operational clarity.",
    icon: "database",
    bullets: [
      "Lean ETL and pipeline design",
      "Business-oriented dashboards",
      "External API and partner integrations",
    ],
  },
  {
    title: "Execution and quality",
    description:
      "Iterative delivery with high engineering standards and short feedback loops.",
    icon: "rocket",
    bullets: [
      "Impact-driven code reviews",
      "Critical-flow testing",
      "Performance and developer experience",
    ],
  },
];

const aboutSummaryPt: string[] = [
  "Desenvolvedor full stack com foco em produtos web escaláveis e experiência de uso clara.",
  "Especialista em Angular, React, TypeScript e Node.js, com forte atuação em integrações de APIs.",
  "Experiência prática com dashboards, mapas georreferenciados e melhoria contínua de performance em produção.",
];

const aboutSummaryEn: string[] = [
  "Full stack developer focused on scalable web products and clear user experience.",
  "Strong hands-on background with Angular, React, TypeScript, and Node.js plus API integrations.",
  "Practical experience building dashboards, geo-enabled flows, and continuous production performance improvements.",
];

const workHistoryPt: WorkHistoryItem[] = [
  {
    company: "Atman Systems",
    role: "Analista de Software",
    period: "Junho 2021 - Dezembro 2025",
    location: "Vitória, ES",
    summary:
      "Desenvolvimento e sustentação de aplicações web com Angular/TypeScript, backend Node.js, dashboards e integrações com Google Maps/OpenStreetMap.",
  },
  {
    company: "Ministério Público do Trabalho (MPT-ES)",
    role: "Estagiário de Desenvolvimento",
    period: "Março 2019 - Março 2021",
    location: "Vitória, ES",
    summary:
      "Desenvolvimento de aplicativo mobile para controle de ponto com React Native e Redux, atuando do frontend até a integração com backend.",
  },
];

const workHistoryEn: WorkHistoryItem[] = [
  {
    company: "Atman Systems",
    role: "Software Analyst",
    period: "June 2021 - December 2025",
    location: "Vitoria, ES",
    summary:
      "Development and maintenance of web applications with Angular/TypeScript, Node.js backend services, dashboards, and Google Maps/OpenStreetMap integrations.",
  },
  {
    company: "Public Labor Prosecutor's Office (MPT-ES)",
    role: "Development Intern",
    period: "March 2019 - March 2021",
    location: "Vitoria, ES",
    summary:
      "Built a mobile time-tracking app with React Native and Redux, contributing from UI implementation to backend integration.",
  },
];

export const homeContentByLocale: Record<Locale, HomeContent> = {
  pt: {
    copy: {
      navProjects: "Projetos",
      navExpertise: "Minha Expertise",
      navContact: "Contato",
      contactCta: "Contato",
      langPt: "PT",
      langEn: "EN",
      heroBadge: "Desenvolvedor full stack com foco em qualidade de produto",
      heroTitleLine1: "Portfólio simples na leitura,",
      heroTitleLine2: "forte na execução.",
      heroDescription:
        "Desenvolvo produtos digitais com foco em clareza, performance e resultado. Aqui você encontra contexto técnico real: stack, papel de execução e impacto de negócio.",
      heroPrimaryCta: "Ver projetos",
      heroSecondaryCta: "Minha expertise",
      aboutTitle: "Sobre mim",
      aboutSummaryTitle: "Resumo rápido",
      aboutHistoryTitle: "Histórico profissional",
      selectedWork: "Projetos em destaque",
      projectsTitle: "Projetos com contexto técnico e impacto",
      projectsDescription:
        "Estes são os projetos atuais em produção. Cada card mostra stack, contexto de entrega e links reais.",
      role: "Papel",
      impact: "Impacto",
      openProject: "Abrir projeto",
      caseStudy: "Case detalhado",
      myExpertise: "Minha Expertise",
      expertiseTitle: "Como eu construo produtos",
      expertiseDescription:
        "Frentes de atuação claras para mostrar rapidamente o que eu resolvo e como eu entrego.",
      contact: "Contato",
      contactTitle: "Vamos construir algo útil",
      contactDescription:
        "Aberto para projetos com desafio técnico real, foco em produto e execução consistente.",
      sendEmail: "Enviar e-mail",
      whatsapp: "Whatsapp",
      footerMain: "© 2026 Guilherme Bodart",
      footerSub: "Construído com Next.js, TypeScript e Tailwind CSS",
      snapshotTitle: "Snapshot",
    },
    snapshot: [
      { value: "6", label: "projetos publicados" },
      { value: "3 + 2 + 1", label: "3 Next.js, 2 Angular e 1 extensão Web" },
    ],
    aboutSummary: aboutSummaryPt,
    workHistory: workHistoryPt,
    projects: homeProjectsPt,
    expertise: expertisePt,
  },
  en: {
    copy: {
      navProjects: "Projects",
      navExpertise: "My Expertise",
      navContact: "Contact",
      contactCta: "Contact",
      langPt: "PT",
      langEn: "EN",
      heroBadge: "Full stack developer focused on product quality",
      heroTitleLine1: "Simple to read portfolio,",
      heroTitleLine2: "strong on execution.",
      heroDescription:
        "I build digital products focused on clarity, performance, and measurable outcomes. Here you'll find real technical context: stack, delivery role, and business impact.",
      heroPrimaryCta: "View projects",
      heroSecondaryCta: "My expertise",
      aboutTitle: "About me",
      aboutSummaryTitle: "Quick summary",
      aboutHistoryTitle: "Work history",
      selectedWork: "Selected work",
      projectsTitle: "Projects with technical context and impact",
      projectsDescription:
        "These are current production projects. Each card shows stack, delivery context, and real links.",
      role: "Role",
      impact: "Impact",
      openProject: "Open project",
      caseStudy: "Detailed case",
      myExpertise: "My Expertise",
      expertiseTitle: "How I build products",
      expertiseDescription:
        "Clear delivery tracks that show what I solve and how I execute.",
      contact: "Contact",
      contactTitle: "Let's build something useful",
      contactDescription:
        "Open to product work with real technical challenges and strong execution needs.",
      sendEmail: "Send email",
      whatsapp: "Whatsapp",
      footerMain: "© 2026 Guilherme Bodart",
      footerSub: "Built with Next.js, TypeScript, and Tailwind CSS",
      snapshotTitle: "Snapshot",
    },
    snapshot: [
      { value: "6", label: "published projects" },
      { value: "3 + 2 + 1", label: "3 Next.js, 2 Angular, and 1 Web extension" },
    ],
    aboutSummary: aboutSummaryEn,
    workHistory: workHistoryEn,
    projects: homeProjectsEn,
    expertise: expertiseEn,
  },
};

export const projectSlugs: ProjectSlug[] = [
  "portfolio",
  "mangastracker",
  "atman-systems",
  "atman-landing",
  "chocolate-doceria",
  "manga-tracker-sync",
];

export function isProjectSlug(value: string): value is ProjectSlug {
  return projectSlugs.includes(value as ProjectSlug);
}
