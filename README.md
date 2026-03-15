# Portfolio - Guilherme Bodart

Portfólio pessoal em Next.js com páginas em PT/EN, cases por projeto, animações com Framer Motion e integração com Google Analytics 4.

## Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS 4
- Framer Motion
- Google Analytics 4 (eventos e page views)

## Funcionalidades

- Rotas localizadas: `/pt` e `/en`
- Página de case por projeto: `/{locale}/projects/{slug}`
- Seletor de idioma com persistência em `localStorage`
- Tema claro/escuro com persistência
- Snapshot com total de visitantes únicos (GA4 Data API)
- SEO técnico com metadata dinâmica, `sitemap.xml` e `robots.txt`
- Fallback visual para logos de projetos

## Estrutura principal

- `src/app/[locale]/page.tsx`: home por idioma
- `src/app/[locale]/projects/[slug]/page.tsx`: case por idioma e slug
- `src/components/portfolio/home-page.tsx`: UI principal da home
- `src/components/portfolio/project-detail-page.tsx`: UI dos cases
- `src/data/portfolio.ts`: conteúdo da home (PT/EN)
- `src/data/project-details.ts`: conteúdo detalhado dos cases (PT/EN)
- `src/app/api/analytics/unique-visitors/route.ts`: endpoint para total de usuários no GA4

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha:

- `NEXT_PUBLIC_SITE_URL`: URL canônica do site (usada em metadata/sitemap/robots)
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: ID do GA4 (frontend)
- `GA4_PROPERTY_ID`: propriedade GA4 para Data API
- `GA4_SERVICE_ACCOUNT_EMAIL`: e-mail da service account
- `GA4_SERVICE_ACCOUNT_PRIVATE_KEY`: chave privada da service account
- `GA4_ANALYTICS_START_DATE`: data inicial para cálculo de `totalUsers`

## Scripts

- `pnpm dev`: ambiente local
- `pnpm lint`: lint com ESLint
- `pnpm typecheck`: checagem de tipos TypeScript
- `pnpm test`: testes com Node test runner (`tsx --test`)
- `pnpm build`: build de produção
- `pnpm start`: sobe build de produção

## Qualidade e CI

Pipeline em `.github/workflows/ci.yml` executa:

1. Lint
2. Typecheck
3. Testes
4. Build

## Execução local

```bash
pnpm install
pnpm dev
```

Abra `http://localhost:3000` (redireciona para `/pt`).
