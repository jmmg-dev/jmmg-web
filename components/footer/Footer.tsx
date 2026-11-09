import { PROJECTS } from "@/lib/projects";
import { Lang } from "@/models/enums";
import type { Information } from "@/models/interfaces";
import { ArrowRight, ArrowUpRight, Github, Linkedin } from "lucide-react";
import Link from "next/link";

const GITHUB_ORG = "https://github.com/jmmg-dev";

/** Pie de página: marca y lema, mis webs, enlaces de contacto y copyright. */
export const Footer = ({ lang, data }: { lang: Lang; data: Information }) => {
  // Mis webs; CSS Layout Lab va a su repositorio hasta que tenga web publicada
  const projects = PROJECTS.flatMap((p) => {
    const href = p.url ?? p.repo;
    return href ? [{ ...p, href }] : [];
  });

  const links = [
    { href: data.personalInfo.urlIn, label: data.hero.linkedin, icon: Linkedin, external: true },
    { href: GITHUB_ORG, label: "GitHub", icon: Github, external: true },
    { href: `/${lang}/cv`, label: data.hero.cv, icon: ArrowRight, external: false },
  ];

  return (
    <footer className="relative border-t border-border bg-secondary/20">
      {/* Línea de luz en el color del tema */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
      />

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 md:grid-cols-12 lg:px-8">
        {/* Marca, lema y quién soy */}
        <div className="md:col-span-5">
          <Link href={`/${lang}`} className="inline-block text-2xl font-bold tracking-tight">
            <span className="neon-text">JM</span>
            <span className="font-light text-muted-foreground">MG</span>
            <span className="neon-text text-base">.dev</span>
          </Link>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.3em] text-primary">
            {data.hero.subtitle}
          </p>
          <p className="mt-6 text-sm text-foreground">{data.personalInfo.name}</p>
          <p className="text-sm text-muted-foreground">{data.info.hero.frontEndArchitect}</p>
        </div>

        {/* Mis webs */}
        <nav aria-label={data.nav.projects} className="md:col-span-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {data.nav.projects}
          </p>
          <ul className="mt-5 space-y-3">
            {projects.map((p) => (
              <li key={p.id}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 text-sm text-foreground transition-colors hover:text-primary"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.logo.icon.src}
                    alt=""
                    width={32}
                    height={32}
                    loading="lazy"
                    className="h-8 w-8 rounded-lg transition-transform group-hover:scale-105"
                  />
                  {p.name}
                  <ArrowUpRight
                    aria-hidden
                    className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* LinkedIn, GitHub y CV */}
        <nav aria-label={data.footerConnect} className="md:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {data.footerConnect}
          </p>
          <ul className="mt-5 space-y-3">
            {links.map(({ href, label, icon: Icon, external }) => {
              const className =
                "group inline-flex items-center gap-3 text-sm text-foreground transition-colors hover:text-primary";
              const content = (
                <>
                  <span className="grid h-8 w-8 place-items-center rounded-lg border border-border bg-background/60 transition-colors group-hover:border-primary">
                    <Icon aria-hidden className="h-4 w-4" />
                  </span>
                  {label}
                </>
              );
              return (
                <li key={href}>
                  {external ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
                      {content}
                    </a>
                  ) : (
                    <Link href={href} className={className}>
                      {content}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Copyright */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p>
            &copy; {new Date().getFullYear()} JMMG.dev. {data.footer}
          </p>
          <p className="font-mono">jmmg.dev</p>
        </div>
      </div>
    </footer>
  );
};
