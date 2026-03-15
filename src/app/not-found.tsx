import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center px-6 py-16 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">404</p>
      <h1 className="mt-3 font-display text-3xl md:text-4xl">
        Página não encontrada
      </h1>
      <p className="mt-3 text-sm text-muted md:text-base">
        O link pode estar desatualizado. Use os atalhos abaixo para voltar ao
        portfólio.
      </p>
      <h2 className="mt-8 font-display text-2xl md:text-3xl">Page not found</h2>
      <p className="mt-3 text-sm text-muted md:text-base">
        The link may be outdated. Use one of the shortcuts below to return to
        the portfolio.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/pt"
          className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-sm font-semibold text-background transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          Ir para PT
        </Link>
        <Link
          href="/en"
          className="inline-flex h-11 items-center justify-center rounded-full border border-line bg-card-strong px-6 text-sm font-semibold text-foreground transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          Go to EN
        </Link>
      </div>
    </main>
  );
}
