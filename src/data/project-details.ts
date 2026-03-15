import type { FeatureIconKey } from "@/data/portfolio";
import type { Locale, ProjectSlug, SnapshotMetric } from "@/data/portfolio";

export type ProjectFeature = {
  title: string;
  description: string;
  icon: FeatureIconKey;
};

export type ProjectDetail = {
  slug: ProjectSlug;
  name: string;
  subtitle: string;
  overview: string;
  metrics: SnapshotMetric[];
  challenge: string;
  solution: string;
  outcome: string;
  frontendStack: string[];
  backendStack: string[];
  features: ProjectFeature[];
  securityReliability: string[];
  codeQuality: string[];
  nextSteps: string[];
  liveUrl: string;
  liveLabel: string;
  repoUrl?: string;
  repoLabel?: string;
};

export type DetailCopy = {
  backToHome: string;
  overviewTitle: string;
  challengeTitle: string;
  solutionTitle: string;
  outcomeTitle: string;
  architectureTitle: string;
  frontendTitle: string;
  backendTitle: string;
  featuresTitle: string;
  securityTitle: string;
  qualityTitle: string;
  nextStepsTitle: string;
  langPt: string;
  langEn: string;
  themeToDarkLabel: string;
  themeToLightLabel: string;
};

export const detailCopyByLocale: Record<Locale, DetailCopy> = {
  pt: {
    backToHome: "Voltar ao portfólio",
    overviewTitle: "Visão do projeto",
    challengeTitle: "Desafio",
    solutionTitle: "Solução",
    outcomeTitle: "Resultado",
    architectureTitle: "Arquitetura técnica",
    frontendTitle: "Frontend",
    backendTitle: "Backend e infraestrutura",
    featuresTitle: "Funcionalidades principais",
    securityTitle: "Segurança e confiabilidade",
    qualityTitle: "Qualidade de código e testes",
    nextStepsTitle: "Próximos passos",
    langPt: "PT",
    langEn: "EN",
    themeToDarkLabel: "Ativar tema escuro",
    themeToLightLabel: "Ativar tema claro",
  },
  en: {
    backToHome: "Back to portfolio",
    overviewTitle: "Project overview",
    challengeTitle: "Challenge",
    solutionTitle: "Solution",
    outcomeTitle: "Outcome",
    architectureTitle: "Technical architecture",
    frontendTitle: "Frontend",
    backendTitle: "Backend and infrastructure",
    featuresTitle: "Key features",
    securityTitle: "Security and reliability",
    qualityTitle: "Code quality and tests",
    nextStepsTitle: "Next steps",
    langPt: "PT",
    langEn: "EN",
    themeToDarkLabel: "Enable dark theme",
    themeToLightLabel: "Enable light theme",
  },
};

const detailsPt: Record<ProjectSlug, ProjectDetail> = {
  mangastracker: {
    slug: "mangastracker",
    name: "Manga Tracker",
    subtitle:
      "Plataforma de leitura com sincronização consistente e arquitetura pronta para integrações externas.",
    overview:
      "Aplicação em produção com Next.js (App Router), TypeScript e backend NestJS modular. Combina catálogo multi-fonte, lista por status e progresso por capítulo, com autenticação segura e sincronização idempotente para integrações.",
    metrics: [
      { value: "Fluxo em poucos cliques", label: "Atualização de progresso sem atrito." },
      { value: "Sync otimizada", label: "Controle de taxa e consistência no backend." },
      { value: "Integrações escaláveis", label: "Base pronta para novos parceiros." },
    ],
    challenge:
      "Unificar catálogo multi-fonte e sincronização de progresso sem aumentar complexidade de uso.",
    solution:
      "Frontend em Next.js + next-intl e backend NestJS com módulos Auth, Manga, Integrations, Observability e Tasks.",
    outcome:
      "Fluxo de leitura mais direto para usuário final e base segura para expansão de integrações.",
    frontendStack: [
      "Next.js App Router + TypeScript",
      "Tailwind CSS com componentes reutilizáveis",
      "Internacionalização com next-intl (PT/EN)",
    ],
    backendStack: [
      "NestJS modular com Auth, Manga, Integrations, Observability e Tasks",
      "Prisma + PostgreSQL",
      "Cache manager com suporte a Redis e rate limit",
    ],
    features: [
      { title: "Catálogo multi-fonte", description: "Jikan, AniList, MangaDex e MangaUpdates.", icon: "layers" },
      { title: "Lista por status", description: "Controle de leitura por estado e capítulo.", icon: "workflow" },
      { title: "Perfil e ranking", description: "Camada social para engajamento.", icon: "zap" },
      { title: "API para parceiros", description: "Onboarding seguro e sync idempotente.", icon: "shield" },
    ],
    securityReliability: [
      "JWT em cookie HttpOnly, proteção CSRF e OAuth Google.",
      "CORS por allowlist e hardening com helmet.",
      "Rate limit e idempotência em endpoints de sincronização.",
    ],
    codeQuality: [
      "Testes unitários e e2e com Vitest/Jest.",
      "Lint, typecheck e validações antes de build.",
    ],
    nextSteps: [
      "Expandir integrações com novos parceiros.",
      "Evoluir observabilidade de sincronização.",
    ],
    liveUrl: "https://mangastracker.vercel.app/pt/contact",
    liveLabel: "Abrir projeto",
  },
  portfolio: {
    slug: "portfolio",
    name: "Portfólio Pessoal",
    subtitle: "Site autoral para apresentar projetos, experiência e proposta técnica com leitura objetiva.",
    overview:
      "Este projeto é o próprio site de portfólio. Estruturei uma experiência focada em clareza, com cards de projetos rotativos, página de case por slug, internacionalização PT/EN, tema claro/escuro e componentes reutilizáveis para evolução contínua.",
    metrics: [
      { value: "Next.js + TS", label: "Base moderna com App Router e tipagem forte" },
      { value: "UI orientada à conversão", label: "Fluxo direto entre projeto, expertise e contato" },
      { value: "Manutenção simples", label: "Dados centralizados para atualizar sem retrabalho" },
    ],
    challenge:
      "Construir um portfólio com identidade própria, bom desempenho e conteúdo técnico real sem ficar pesado visualmente.",
    solution:
      "Arquitetura em Next.js com componentes modulares, Framer Motion para microanimações, dados em arquivos tipados e fallback visual para logos/projetos.",
    outcome:
      "Portfólio mais profissional para apresentar experiência real, facilitar contato e sustentar novas iterações com baixo custo de manutenção.",
    frontendStack: [
      "Next.js (App Router) + React + TypeScript",
      "Tailwind CSS com tokens de tema e variáveis globais",
      "Framer Motion para transições e entrada de seções",
      "UI responsiva com menu mobile e navegação por âncora",
    ],
    backendStack: [
      "Dados de portfólio e cases em estruturas tipadas",
      "Roteamento dinâmico em /projects/[slug]",
      "Fallback para rotas inválidas redirecionando para home",
      "Estrutura preparada para adicionar novos projetos rapidamente",
    ],
    features: [
      { title: "Cards rotativos", description: "Mostra 4 projetos por vez com rotação automática.", icon: "layers" },
      { title: "Cases detalhados", description: "Cada projeto tem página própria com contexto técnico.", icon: "workflow" },
      { title: "Tema e idioma", description: "Suporte a dark/light e PT/EN com preferência persistida.", icon: "zap" },
      { title: "Contato direto", description: "Acesso rápido para email, WhatsApp, GitHub e LinkedIn.", icon: "shield" },
    ],
    securityReliability: [
      "Tipagem forte para evitar inconsistências em dados de projeto.",
      "Fallback visual para evitar quebra quando um logo não existe.",
      "Rota inválida redirecionada para home para evitar erro seco ao usuário.",
    ],
    codeQuality: [
      "Componentes separados por responsabilidade e reutilização.",
      "Padrão consistente de dados entre card e página detalhada.",
      "Lint e typecheck como base de qualidade durante evolução.",
    ],
    nextSteps: [
      "Expandir cobertura de testes automatizados para fluxos críticos.",
      "Refinar SEO técnico por página de case para melhorar descoberta orgânica.",
    ],
    liveUrl: "https://github.com/Guilherme-Bodart/portfolio",
    liveLabel: "Ver no GitHub",
  },
  "manga-tracker-sync": {
    slug: "manga-tracker-sync",
    name: "Manga Tracker Sync",
    subtitle:
      "Extensão Web orientada a ação rápida, com sincronização direta no contexto de leitura.",
    overview:
      "Extensão WebExtensions modular com scripts por responsabilidade (background, content, popup, options e adapters). Detecta contexto de leitura e sincroniza progresso com a API sem abrir o app principal.",
    metrics: [
      { value: "Atualização em contexto", label: "Sync sem sair da página de leitura." },
      { value: "UX de baixo atrito", label: "Fluxo rápido no popup." },
      { value: "Base multi-browser", label: "Firefox publicado e Chrome/Opera planejados." },
    ],
    challenge:
      "Capturar progresso com precisão em diferentes páginas e manter experiência rápida e segura.",
    solution:
      "Arquitetura WebExtensions modular com pipeline orientado a eventos e integração com backend.",
    outcome:
      "Atualização de progresso mais rápida no uso real e base pronta para expansão.",
    frontendStack: [
      "WebExtensions: background, content, popup, options, adapters",
      "Detecção de contexto e captura de capítulo/progresso",
      "Persistência no storage da extensão",
    ],
    backendStack: [
      "Integração com API do Manga Tracker",
      "Fluxo de sessão/token controlado no backend",
      "Empacotamento e versionamento por release",
    ],
    features: [
      { title: "Detecção de leitura", description: "Mapeia contexto da página.", icon: "layers" },
      { title: "Sync em contexto", description: "Envia progresso no fluxo real de uso.", icon: "workflow" },
      { title: "Feedback imediato", description: "Popup com retorno claro de sucesso/erro.", icon: "zap" },
      { title: "Arquitetura extensível", description: "Adapters para novos sites e navegadores.", icon: "shield" },
    ],
    securityReliability: [
      "Sem exposição de secrets no frontend da extensão.",
      "Permissões minimizadas e tratamento explícito de erro.",
      "Integração sensível mediada por backend.",
    ],
    codeQuality: [
      "Separação rígida por responsabilidade.",
      "Contratos tipados por adapter e validações de release.",
    ],
    nextSteps: [
      "Publicar em Chrome Web Store e Opera Add-ons.",
      "Expandir adapters para novos domínios de leitura.",
    ],
    liveUrl: "https://addons.mozilla.org/pt-BR/firefox/addon/manga-tracker-sync/",
    liveLabel: "Ver no Add-ons",
  },
  "atman-systems": {
    slug: "atman-systems",
    name: "Hellius (Atman)",
    subtitle: "Sistema web da Atman para operação georreferenciada e suporte à decisão.",
    overview:
      "Atuei no desenvolvimento e sustentação do Hellius, produto exibido na aba de Produtos da Atman. O trabalho combinou frontend em Angular, backend em Node.js, integrações com Google Maps/OpenStreetMap e evolução contínua para manter o sistema estável em produção.",
    metrics: [
      { value: "Angular + Node.js", label: "Frontend e backend do Hellius" },
      { value: "Google Maps + OSM", label: "Integração de mapas no fluxo operacional" },
      { value: "Carga reduzida", label: "Ganho com otimizações e correções críticas" },
    ],
    challenge:
      "Evoluir um sistema com uso intensivo de mapas e dashboards sem perder desempenho nem clareza para a operação.",
    solution:
      "Arquitetura com Angular + TypeScript no frontend, serviços e APIs em Node.js no backend, integrações com Google Maps/OpenStreetMap e rotina ágil com revisão de código.",
    outcome:
      "Fluxos operacionais mais estáveis, melhor leitura em dashboards/relatórios e experiência mais leve em telas críticas.",
    frontendStack: [
      "Angular (v2+) + TypeScript",
      "Dashboards interativos e relatórios automatizados",
      "Componentização para evolução contínua do produto",
    ],
    backendStack: [
      "Node.js para regras de negócio e APIs",
      "Processamento de dados georreferenciados",
      "Integração com Google Maps API e OpenStreetMap",
      "Sustentação de produção com novas features e correções",
    ],
    features: [
      { title: "Sistema Hellius em produção", description: "Evolução contínua de módulos do produto.", icon: "layers" },
      { title: "Mapas integrados", description: "Google Maps e OpenStreetMap no fluxo principal.", icon: "workflow" },
      { title: "Dashboards e relatórios", description: "Apoio direto à tomada de decisão operacional.", icon: "zap" },
      { title: "Performance e sustentação", description: "Correções críticas e otimizações para experiência mais leve.", icon: "shield" },
    ],
    securityReliability: [
      "Atuação em correções críticas e estabilização de ambiente em produção.",
      "Integrações externas de mapa com foco em confiabilidade operacional.",
      "Colaboração em arquitetura e revisão de código para reduzir regressões.",
    ],
    codeQuality: [
      "Clean Code e tipagem consistente com TypeScript.",
      "Entrega iterativa com Scrum/Kanban.",
      "Refino contínuo para manter manutenção simples em longo prazo.",
    ],
    nextSteps: [],
    liveUrl: "https://atmansystems.com",
    liveLabel: "Abrir projeto",
  },
  "atman-landing": {
    slug: "atman-landing",
    name: "Atman Systems Landing",
    subtitle: "Site e landing institucional com foco em clareza de proposta e contato.",
    overview:
      "Atuei na implementação do site/landing institucional da Atman para apresentar serviços, proposta de valor e canais de contato de forma objetiva. O projeto priorizou leitura rápida, navegação clara e base técnica estável para evolução contínua de conteúdo.",
    metrics: [
      { value: "Angular", label: "Frontend institucional em produção" },
      { value: "Conversão orientada", label: "Seções e CTA com fluxo direto para contato" },
      { value: "SEO técnico", label: "Estrutura preparada para indexação" },
    ],
    challenge:
      "Traduzir posicionamento e serviços em uma experiência institucional clara para perfis diferentes de visitante.",
    solution:
      "Arquitetura por seções em Angular + TypeScript, hierarquia de conteúdo para leitura escaneável e ajustes contínuos de SEO/deploy.",
    outcome:
      "Comunicação comercial mais clara, jornada de contato mais direta e base pronta para expansão de páginas institucionais.",
    frontendStack: [
      "Angular + TypeScript",
      "SCSS com componentes reutilizáveis",
      "Seções modulares orientadas à conversão",
      "Navegação simples entre proposta, serviços e contato",
    ],
    backendStack: [
      "Deploy em produção com ajustes iterativos",
      "SEO técnico para metadata e indexação",
      "Integração com canais de contato e jornada comercial",
    ],
    features: [
      { title: "Mensagem institucional clara", description: "Hierarquia de conteúdo para leitura rápida.", icon: "layers" },
      { title: "Fluxo de navegação objetivo", description: "Estrutura direta entre proposta e contato.", icon: "workflow" },
      { title: "Responsividade consistente", description: "Experiência estável em desktop e mobile.", icon: "zap" },
      { title: "Base escalável", description: "Preparado para novas seções e evolução contínua.", icon: "shield" },
    ],
    securityReliability: [
      "Sustentação de produção com correções pontuais e estabilidade visual.",
      "Boas práticas de SEO técnico e configuração de ambiente.",
      "Estrutura de conteúdo orientada a manutenção simples.",
    ],
    codeQuality: [
      "Componentização reutilizável com tipagem em TypeScript.",
      "Organização por seções para facilitar evolução sem retrabalho.",
      "Entrega iterativa com foco em clareza e consistência visual.",
    ],
    nextSteps: [],
    liveUrl: "https://atmansystems.com",
    liveLabel: "Abrir projeto",
  },
  "chocolate-doceria": {
    slug: "chocolate-doceria",
    name: "Chocolate e Doceria",
    subtitle:
      "Landing comercial customizada com arquitetura multi-tenant e base escalável para múltiplos clientes.",
    overview:
      "Landing page comercial totalmente personalizada para vitrine digital e conversão. O projeto foi construído com Next.js 16 (App Router), React 19, TypeScript e Tailwind CSS 4, usando Framer Motion e componentes reutilizáveis. O catálogo navega por categorias com Embla Carousel e rota dinâmica em /[locale]/categoria/[category]. A composição da landing é orientada por schema tipado, com seções modulares e reordenáveis, sem reescrever frontend para cada cliente. A base também opera em arquitetura multi-tenant por domínio, com fallback de tenant e override por LANDING_DOMAIN_MAP em runtime na Vercel.",
    metrics: [
      { value: "Conversão orientada à ação", label: "CTA principal para WhatsApp + links de Instagram e mapa." },
      { value: "Catálogo por categoria", label: "Aprofundamento de produtos com rotas dinâmicas por slug." },
      { value: "Multi-tenant em runtime", label: "Resolução por host para escalar novas landings." },
    ],
    challenge:
      "Entregar uma landing comercial sem template rígido, com identidade personalizada, SEO técnico bilíngue e manutenção contínua para múltiplos clientes.",
    solution:
      "Arquitetura orientada por schema tipado, tema por tokens CSS, i18n com /pt e /en, metadata dinâmica por idioma/categoria e navegação responsiva com header completo no desktop e drawer no mobile.",
    outcome:
      "Vitrine digital customizada com fluxo de conversão direto e base técnica preparada para reaproveitamento, escala e manutenção contínua.",
    frontendStack: [
      "Next.js 16 (App Router), React 19, TypeScript e Tailwind CSS 4",
      "Framer Motion com componentes visuais reutilizáveis",
      "Embla Carousel no carrossel de categorias",
      "Header responsivo: desktop completo e mobile com menu lateral (drawer)",
      "i18n com rotas /pt e /en e conteúdo por locale",
      "Rota dinâmica de categoria: /[locale]/categoria/[category]",
    ],
    backendStack: [
      "Schema tipado para conteúdo e seções configuráveis por arquivo",
      "Seções modulares/reordenáveis: hero, prova social, produtos, diferenciais, sobre, processo, FAQ, CTA e contato",
      "Tema por cliente com tokens de paleta, contraste, superfícies e bordas via variáveis CSS",
      "SEO técnico com metadata dinâmica (title, description, canonical, alternates, Open Graph)",
      "Arquitetura multi-tenant por host com fallback e override via LANDING_DOMAIN_MAP",
      "Deploy dinâmico em Vercel para seleção de tenant em runtime",
      "Estrutura pronta para novas landings com script de geração",
    ],
    features: [
      { title: "Vitrine configurável por schema", description: "Conteúdo e blocos configurados sem recodificar UI.", icon: "layers" },
      { title: "Carrossel de categorias (Embla)", description: "Navegação horizontal fluida para catálogo.", icon: "workflow" },
      { title: "Navegação responsiva com drawer", description: "Paridade de links entre desktop e mobile.", icon: "zap" },
      { title: "SEO por locale e categoria", description: "Canonical, alternates e Open Graph por rota.", icon: "shield" },
      { title: "Conversão multicanal", description: "WhatsApp como CTA principal, com Instagram e mapa.", icon: "workflow" },
      { title: "Personalização por tenant", description: "Tema e mídia por cliente com resolução por domínio.", icon: "layers" },
    ],
    securityReliability: [
      "SEO técnico consistente por idioma/categoria com canonical e alternates para evitar duplicidade.",
      "Estrutura orientada a performance para carregamento estável em mobile.",
      "Responsividade real com comportamento equivalente entre desktop e mobile.",
      "Acessibilidade visual suportada por tokens de contraste e superfície.",
      "Resolução de tenant em runtime com fallback para reduzir risco operacional.",
    ],
    codeQuality: [
      "Schema e contratos tipados em TypeScript para reduzir regressões.",
      "Componentes reutilizáveis e tema desacoplado para customização segura.",
      "Pipeline com lint, typecheck e build para consistência de entrega.",
      "Checklist de mídia com proporções recomendadas para padronizar qualidade visual.",
    ],
    nextSteps: [
      "Adicionar operação de conteúdo via CMS mantendo o schema tipado.",
      "Expandir catálogo por categoria com filtros e novos blocos de prova social.",
      "Evoluir observabilidade de funil para cliques em WhatsApp, Instagram e mapa.",
    ],
    liveUrl: "https://chocolateedoceria.vercel.app",
    liveLabel: "Abrir projeto",
  },
};

const detailsEn: Record<ProjectSlug, ProjectDetail> = {
  mangastracker: {
    slug: "mangastracker",
    name: "Manga Tracker",
    subtitle: "Production-grade reading platform focused on secure sync and integration scalability.",
    overview:
      "Production web app with Next.js (App Router), TypeScript, and modular NestJS backend. It combines multi-source catalog, status-based reading lists, and chapter progress sync with secure authentication and idempotent integration flows.",
    metrics: [
      { value: "Few-click flow", label: "Low-friction progress updates." },
      { value: "Optimized sync", label: "Rate-controlled consistency in backend flows." },
      { value: "Scalable integrations", label: "Partner-ready architecture." },
    ],
    challenge:
      "Unify multi-source catalog and progress updates while keeping UX simple and reliable.",
    solution:
      "Next.js + next-intl frontend and modular NestJS backend with Auth, Manga, Integrations, Observability, and Tasks.",
    outcome:
      "Faster reading updates and secure foundation for integration growth.",
    frontendStack: [
      "Next.js App Router + TypeScript",
      "Tailwind CSS with reusable components",
      "Internationalization with next-intl (PT/EN)",
    ],
    backendStack: [
      "Modular NestJS architecture",
      "Prisma + PostgreSQL",
      "Cache manager with Redis support and rate limits",
    ],
    features: [
      { title: "Multi-source catalog", description: "Jikan, AniList, MangaDex, MangaUpdates.", icon: "layers" },
      { title: "Status list + progress", description: "Chapter updates in the core flow.", icon: "workflow" },
      { title: "Public profile + ranking", description: "Social layer for discovery.", icon: "zap" },
      { title: "Partner API", description: "Secure onboarding and idempotent sync.", icon: "shield" },
    ],
    securityReliability: [
      "JWT via HttpOnly cookies, CSRF protection, and Google OAuth.",
      "Allowlist CORS and production hardening.",
      "Rate limit + idempotency for sync endpoints.",
    ],
    codeQuality: [
      "Unit and e2e tests (Vitest/Jest).",
      "Lint + typecheck in quality gates.",
    ],
    nextSteps: [
      "Expand partner integrations.",
      "Improve sync observability.",
    ],
    liveUrl: "https://mangastracker.vercel.app/pt/contact",
    liveLabel: "Open project",
  },
  portfolio: {
    slug: "portfolio",
    name: "Personal Portfolio",
    subtitle: "Author website to present projects, experience, and technical positioning with clear reading flow.",
    overview:
      "This project is the portfolio website itself. I designed it for clarity with rotating project cards, per-project case pages by slug, PT/EN i18n, light/dark theme, and reusable components for continuous evolution.",
    metrics: [
      { value: "Next.js + TS", label: "Modern App Router base with strong typing" },
      { value: "Conversion-oriented UI", label: "Direct flow between projects, expertise, and contact" },
      { value: "Low-friction maintenance", label: "Centralized data updates without structural rework" },
    ],
    challenge:
      "Build a portfolio with clear identity, good performance, and real technical storytelling without visual noise.",
    solution:
      "Next.js architecture with modular components, Framer Motion micro-interactions, typed data files, and visual fallback strategy for project logos.",
    outcome:
      "A stronger professional website to present real delivery context, improve contact conversion, and support fast iterations.",
    frontendStack: [
      "Next.js (App Router) + React + TypeScript",
      "Tailwind CSS with theme tokens and global variables",
      "Framer Motion for section transitions and reveals",
      "Responsive UI with mobile drawer and anchor navigation",
    ],
    backendStack: [
      "Typed data structures for portfolio and case pages",
      "Dynamic routing at /projects/[slug]",
      "Invalid-route fallback redirecting users to home",
      "Structure optimized for adding new projects quickly",
    ],
    features: [
      { title: "Rotating project cards", description: "Shows 4 projects at a time with automatic rotation.", icon: "layers" },
      { title: "Detailed case pages", description: "Each project has a dedicated technical context page.", icon: "workflow" },
      { title: "Theme and locale", description: "Dark/light mode plus PT/EN preference persistence.", icon: "zap" },
      { title: "Direct contact paths", description: "Fast access to email, WhatsApp, GitHub, and LinkedIn.", icon: "shield" },
    ],
    securityReliability: [
      "Strong typing reduces inconsistencies in project data.",
      "Visual fallback handling avoids UI breaks for missing logos.",
      "Invalid routes redirect to home for smoother user experience.",
    ],
    codeQuality: [
      "Components split by responsibility and reuse.",
      "Consistent data contract between cards and detail pages.",
      "Lint and typecheck used as delivery quality gates.",
    ],
    nextSteps: [
      "Expand automated test coverage for critical user flows.",
      "Refine per-case technical SEO to improve organic discoverability.",
    ],
    liveUrl: "https://github.com/Guilherme-Bodart/portfolio",
    liveLabel: "View on GitHub",
  },
  "manga-tracker-sync": {
    slug: "manga-tracker-sync",
    name: "Manga Tracker Sync",
    subtitle: "Web extension built for fast in-context sync and multi-browser scalability.",
    overview:
      "Modular WebExtensions architecture with responsibility split across background, content, popup, options, and adapters. Detects reading context and syncs progress directly with the API.",
    metrics: [
      { value: "In-context updates", label: "Sync without leaving reading page." },
      { value: "Low-friction UX", label: "Quick action flow in popup." },
      { value: "Multi-browser base", label: "Firefox live, Chrome/Opera planned." },
    ],
    challenge:
      "Capture progress reliably across reading contexts while keeping the workflow fast and safe.",
    solution:
      "Event-driven modular extension architecture plus backend-mediated integration.",
    outcome:
      "Faster real-world updates and reusable foundation for browser/store expansion.",
    frontendStack: [
      "WebExtensions modules: background, content, popup, options, adapters",
      "Reading-context detection and chapter parsing",
      "Settings persistence in extension storage",
    ],
    backendStack: [
      "Manga Tracker API integration",
      "Backend-controlled token/session flows",
      "Release packaging and versioning",
    ],
    features: [
      { title: "Context detection", description: "Maps reading pages into sync-ready data.", icon: "layers" },
      { title: "In-context sync", description: "Updates progress from the real reading flow.", icon: "workflow" },
      { title: "Immediate feedback", description: "Clear success/error popup states.", icon: "zap" },
      { title: "Extensible adapters", description: "Ready for new sites and browsers.", icon: "shield" },
    ],
    securityReliability: [
      "No exposed frontend secrets in extension code.",
      "Minimal permissions and explicit error handling.",
      "Sensitive integration handled by backend services.",
    ],
    codeQuality: [
      "Strict separation of concerns.",
      "Typed adapter contracts and release validation.",
    ],
    nextSteps: [
      "Publish to Chrome Web Store and Opera Add-ons.",
      "Expand adapters for additional reading sites.",
    ],
    liveUrl: "https://addons.mozilla.org/pt-BR/firefox/addon/manga-tracker-sync/",
    liveLabel: "View on Add-ons",
  },
  "atman-systems": {
    slug: "atman-systems",
    name: "Hellius (Atman)",
    subtitle: "Atman's web system focused on geo-enabled operations and decision support.",
    overview:
      "I worked on development and maintenance of Hellius, listed in Atman's Products section. The delivery combined Angular frontend work, Node.js backend services, Google Maps/OpenStreetMap integrations, and continuous production support.",
    metrics: [
      { value: "Angular + Node.js", label: "End-to-end Hellius delivery" },
      { value: "Google Maps + OSM", label: "Map integrations for geo workflows" },
      { value: "Reduced load time", label: "Performance gains after critical fixes" },
    ],
    challenge:
      "Scale a map-heavy operational system while keeping performance and clarity for daily users.",
    solution:
      "Angular + TypeScript frontend architecture, Node.js backend APIs, Google Maps/OpenStreetMap integration, and agile delivery with code review.",
    outcome:
      "More stable operational flows, better dashboard/report visibility, and lighter experience in critical screens.",
    frontendStack: [
      "Angular (v2+) + TypeScript",
      "Interactive dashboards and automated reports",
      "Component-based structure for continuous evolution",
    ],
    backendStack: [
      "Node.js backend APIs and services",
      "Georeferenced data processing flows",
      "Google Maps API and OpenStreetMap integrations",
      "Production support with feature delivery and bug fixes",
    ],
    features: [
      { title: "Hellius in production", description: "Continuous evolution of operational modules.", icon: "layers" },
      { title: "Integrated maps", description: "Google Maps and OpenStreetMap in core workflows.", icon: "workflow" },
      { title: "Dashboards and reports", description: "Clearer decision support for operations.", icon: "zap" },
      { title: "Performance support", description: "Critical fixes and optimizations for lighter experience.", icon: "shield" },
    ],
    securityReliability: [
      "Critical production fixes and stabilization work.",
      "Reliable integration with external map providers.",
      "Architecture and code-review collaboration to reduce regressions.",
    ],
    codeQuality: [
      "Clean Code discipline and strong TypeScript typing.",
      "Scrum/Kanban cadence for predictable iterative delivery.",
      "Maintainable component and flow refinements over time.",
    ],
    nextSteps: [],
    liveUrl: "https://atmansystems.com",
    liveLabel: "Open project",
  },
  "atman-landing": {
    slug: "atman-landing",
    name: "Atman Systems Landing",
    subtitle: "Institutional website/landing focused on clarity and contact conversion.",
    overview:
      "I implemented Atman's institutional website/landing to present services, value proposition, and contact channels with clear information architecture. The project prioritized fast readability, direct navigation, and a stable base for ongoing content evolution.",
    metrics: [
      { value: "Angular", label: "Institutional frontend in production" },
      { value: "Conversion-oriented", label: "Section structure + CTA paths to contact" },
      { value: "Technical SEO", label: "Indexation-ready structure" },
    ],
    challenge:
      "Translate business positioning and services into a clear institutional experience for different visitor profiles.",
    solution:
      "Section-based Angular + TypeScript architecture, scannable content hierarchy, and iterative SEO/deployment refinements.",
    outcome:
      "Clearer service communication, more direct contact journey, and a scalable base for future institutional pages.",
    frontendStack: [
      "Angular + TypeScript",
      "SCSS with reusable components",
      "Conversion-oriented modular sections",
      "Simple navigation between value proposition, services, and contact",
    ],
    backendStack: [
      "Production deployment with iterative refinements",
      "Technical SEO setup for metadata and indexation",
      "Contact-channel integration for commercial flow",
    ],
    features: [
      { title: "Clear institutional message", description: "Content hierarchy built for quick scanning.", icon: "layers" },
      { title: "Objective navigation flow", description: "Direct path from value proposition to contact.", icon: "workflow" },
      { title: "Consistent responsiveness", description: "Stable experience across desktop and mobile.", icon: "zap" },
      { title: "Scalable structure", description: "Ready for new sections and continuous updates.", icon: "shield" },
    ],
    securityReliability: [
      "Production support with targeted fixes and visual stability.",
      "Technical SEO and environment configuration best practices.",
      "Maintainable content structure for low-friction updates.",
    ],
    codeQuality: [
      "Reusable component structure with TypeScript typing.",
      "Section-oriented organization for safe iterative changes.",
      "Delivery rhythm focused on consistency and readability.",
    ],
    nextSteps: [],
    liveUrl: "https://atmansystems.com",
    liveLabel: "Open project",
  },
  "chocolate-doceria": {
    slug: "chocolate-doceria",
    name: "Chocolate e Doceria",
    subtitle:
      "Custom commercial landing with multi-tenant architecture and scalable long-term maintenance.",
    overview:
      "Custom commercial landing built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS 4. It uses Framer Motion and reusable visual components, category browsing with Embla Carousel, and dynamic product pages by slug at /[locale]/categoria/[category]. The page composition is driven by typed schema files, enabling configurable/reorderable sections without rewriting frontend code. The platform also supports multi-tenant domain resolution in runtime, with host fallback and LANDING_DOMAIN_MAP override on Vercel.",
    metrics: [
      { value: "Action-driven conversion", label: "WhatsApp-first CTA with Instagram and map links." },
      { value: "Category-driven catalog", label: "Dynamic category pages for deeper product context." },
      { value: "Runtime multi-tenant", label: "Host-based tenant resolution for scalable client rollout." },
    ],
    challenge:
      "Deliver a fully custom commercial landing without rigid templates, while keeping bilingual SEO, mobile performance, and scalability for multiple clients.",
    solution:
      "Typed-schema architecture with modular/reorderable sections, CSS token-based theming, i18n routes (/pt and /en), dynamic metadata by locale/category, and responsive header + mobile drawer navigation.",
    outcome:
      "Custom storefront with direct conversion flow and a reusable engineering base for continuous maintenance and new client onboarding.",
    frontendStack: [
      "Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4",
      "Framer Motion + reusable visual components",
      "Embla Carousel for category navigation",
      "Responsive header with desktop full nav and mobile drawer",
      "i18n routes for /pt and /en with locale-aware content",
      "Dynamic category route: /[locale]/categoria/[category]",
    ],
    backendStack: [
      "Typed schema-driven landing configuration",
      "Modular/reorderable sections: hero, social proof, products, differentiators, about, process, FAQ, CTA, contact",
      "Per-client theme tokens via CSS variables",
      "Technical SEO metadata by locale/category (title, description, canonical, alternates, Open Graph)",
      "Multi-tenant by request host with tenant fallback and LANDING_DOMAIN_MAP override",
      "Vercel dynamic deployment strategy for runtime tenant selection",
      "Reusable base with generation script for new client landings",
    ],
    features: [
      { title: "Schema-configurable storefront", description: "Sections and content configured from typed files.", icon: "layers" },
      { title: "Embla category carousel", description: "Smooth horizontal browsing of product groups.", icon: "workflow" },
      { title: "Responsive nav + drawer", description: "Consistent navigation across desktop and mobile.", icon: "zap" },
      { title: "Locale/category SEO", description: "Canonical, alternates, and Open Graph per route context.", icon: "shield" },
      { title: "Multi-channel conversion", description: "WhatsApp-first flow with Instagram and map integration.", icon: "workflow" },
      { title: "Tenant-level customization", description: "Brand tokens and media by tenant/domain.", icon: "layers" },
    ],
    securityReliability: [
      "Technical SEO coverage by language and category to avoid duplicate-content issues.",
      "Performance-focused structure for stable loading on mobile storefront scenarios.",
      "Real responsive behavior with parity between desktop and mobile navigation.",
      "Accessibility-aware contrast/surface tokens to keep readable brand themes.",
      "Tenant fallback strategy to reduce runtime domain mapping risk.",
    ],
    codeQuality: [
      "TypeScript schema contracts to prevent regressions in section ordering/content setup.",
      "Reusable components and decoupled theming for safe client customization.",
      "Lint/typecheck/build quality gates in delivery pipeline.",
      "Media checklist with recommended aspect ratios for consistent visual output.",
    ],
    nextSteps: [
      "Add CMS-assisted content operations while preserving typed schema contracts.",
      "Expand category experiences with richer filters and social-proof variants.",
      "Improve funnel observability for WhatsApp, Instagram, and map interactions.",
    ],
    liveUrl: "https://chocolateedoceria.vercel.app",
    liveLabel: "Open project",
  },
};

export const projectDetailsByLocale: Record<Locale, Record<ProjectSlug, ProjectDetail>> = {
  pt: detailsPt,
  en: detailsEn,
};
