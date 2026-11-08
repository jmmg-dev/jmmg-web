"use client";

import { PROJECTS, projectThemeVars } from "@/lib/projects";
import { Lang } from "@/models/enums";
import type { ProjectsDict } from "@/models/types";
import { ArrowDown, ArrowUpRight, Pause, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

/** Tiempo que se muestra cada pantalla; cada web dura `screens.length` pasos. */
const SCREEN_MS = 2600;

type Position = { chapter: number; screen: number };
/** `previous`: pantalla que queda debajo mientras entra la nueva web con el barrido. */
type Step = Position & { previous: Position | null };

/**
 * Hero de la home: recorre las capturas de cada web a pantalla completa y, sobre
 * ellas, muestra sus textos con la tipografía y los colores de esa web.
 */
export const ProjectShowcase = ({ lang, dict }: { lang: Lang; dict: ProjectsDict }) => {
  const ref = useRef<HTMLElement>(null);
  const [step, setStep] = useState<Step>({ chapter: 0, screen: 0, previous: null });
  const { previous } = step;
  const [userPaused, setUserPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [focused, setFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  // Solo la primera captura se pide al cargar; el resto, cuando la página ya está lista.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    media.addEventListener("change", onChange);

    const load = () => window.setTimeout(() => setReady(true), 600);
    let timer: number | undefined;
    if (document.readyState === "complete") timer = load();
    else window.addEventListener("load", () => (timer = load()), { once: true });

    return () => {
      media.removeEventListener("change", onChange);
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.25,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const goTo = useCallback((chapter: number, screen = 0) => {
    setStep((current) =>
      current.chapter === chapter
        ? { ...current, screen }
        : { chapter, screen, previous: { chapter: current.chapter, screen: current.screen } },
    );
  }, []);

  const next = useCallback(() => {
    setStep((current) => {
      const total = PROJECTS[current.chapter].screens.length;
      if (current.screen + 1 < total) return { ...current, screen: current.screen + 1 };
      return {
        chapter: (current.chapter + 1) % PROJECTS.length,
        screen: 0,
        previous: { chapter: current.chapter, screen: current.screen },
      };
    });
  }, []);

  const autoplay = !reducedMotion;
  const playing = autoplay && !userPaused && visible && !focused;
  const project = PROJECTS[step.chapter];
  const host = project.url ? new URL(project.url).host : project.id;
  const path = project.screens[step.screen]?.path || "/";

  return (
    <section
      ref={ref}
      aria-roledescription="carousel"
      aria-label={dict.showcase}
      className="showcase relative mx-auto w-[calc(100%-1.5rem)] max-w-440 overflow-hidden sm:w-[calc(100%-3rem)]"
      style={projectThemeVars(project)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
    >
      {/* Capas de cada web: la activa entra con un barrido sobre la anterior */}
      {PROJECTS.map((p, c) => {
        const state =
          c === step.chapter ? "active" : c === previous?.chapter ? "previous" : "idle";
        return (
          <div
            key={p.id}
            aria-hidden={state !== "active"}
            className="showcase-chapter absolute inset-0"
            data-state={state}
            data-wipe={previous !== null && state === "active" ? "" : undefined}
            style={projectThemeVars(p)}
          >
            <div aria-hidden className="showcase-aura absolute" />
            {/* Ventana flotante en perspectiva con las pantallas de la web */}
            <div className="showcase-window absolute">
              <div className="showcase-window-bar flex items-center gap-1.5 px-4">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>
              <div className="relative h-full overflow-hidden">
              {p.screens.map((screen, s) => {
                const first = c === 0 && s === 0;
                const isShown =
                  (state === "active" && s === step.screen) ||
                  (state === "previous" && s === previous?.screen);
                return (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={screen.image}
                    src={first || ready ? screen.image : undefined}
                    alt=""
                    decoding="async"
                    fetchPriority={first ? "high" : "low"}
                    className="showcase-shot absolute inset-0 h-full w-full object-cover object-top-left"
                    data-active={isShown}
                  />
                );
              })}
              </div>
            </div>
            <div aria-hidden className="showcase-scrim absolute inset-0" />
          </div>
        );
      })}

      <div aria-hidden className="showcase-grain pointer-events-none absolute inset-0" />

      {/* Numeral gigante de fondo, con la tipografía de la web */}
      <span
        key={`n-${step.chapter}`}
        aria-hidden
        className="showcase-numeral pointer-events-none absolute top-2 left-10 hidden select-none leading-none md:block lg:left-14"
      >
        {String(step.chapter + 1).padStart(2, "0")}
      </span>

      {/* Textos de la web activa */}
      <div className="relative z-10 flex h-full flex-col justify-end px-5 pb-36 sm:px-10 sm:pb-40 lg:px-16 lg:pb-44">
        <div
          key={step.chapter}
          className="showcase-copy max-w-xl xl:max-w-2xl"
          aria-live={playing ? "off" : "polite"}
        >
          <p className="showcase-meta flex items-center gap-3 whitespace-nowrap text-xs sm:text-sm" style={{ "--i": 0 } as CSSProperties}>
            <span className="showcase-dot" aria-hidden />
            <span>
              {String(step.chapter + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
            </span>
            <span aria-hidden className="opacity-40">
              —
            </span>
            <span className="truncate">
              {host}
              <span key={path} className="showcase-path">
                {path === "/" ? "" : path}
              </span>
            </span>
          </p>

          <h2 className="showcase-title mt-5" style={{ "--i": 1 } as CSSProperties}>
            <span className="sr-only">{project.name}</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.logo.wordmark.src}
              width={project.logo.wordmark.width}
              height={project.logo.wordmark.height}
              alt=""
              className="showcase-wordmark w-auto"
            />
          </h2>

          <p
            className="showcase-tagline mt-4 text-xl font-semibold text-balance sm:text-2xl lg:text-3xl"
            data-gradient={project.theme.textGradient ? "" : undefined}
            style={{ "--i": 3 } as CSSProperties}
          >
            {project.tagline[lang]}
          </p>

          <p
            className="showcase-description mt-4 hidden max-w-xl leading-relaxed md:line-clamp-2"
            style={{ "--i": 4 } as CSSProperties}
          >
            {project.description[lang]}
          </p>

          <div className="showcase-actions mt-7 flex flex-wrap gap-3" style={{ "--i": 5 } as CSSProperties}>
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-btn project-btn-primary"
              >
                {dict.visit}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
            <a href={`#${project.id}`} className="project-btn showcase-btn-glass">
              {dict.discover}
              <ArrowDown className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Pestañas con progreso (estilo stories) */}
      <div className="absolute inset-x-0 bottom-0 z-20 px-3 pb-3 sm:px-6 sm:pb-6">
        <div className="showcase-tabs flex items-stretch gap-1 p-1.5 sm:gap-2 sm:p-2">
          {PROJECTS.map((p, c) => {
            const isActive = c === step.chapter;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => goTo(c)}
                aria-current={isActive}
                aria-label={p.name}
                className="showcase-tab flex-1 px-3 py-2.5 text-left sm:px-4 sm:py-3"
                style={{ fontFamily: p.theme.fontHeading }}
              >
                <span className="flex gap-1" aria-hidden>
                  {p.screens.map((screen, s) => {
                    const done = c < step.chapter || (isActive && s < step.screen);
                    const current = isActive && s === step.screen;
                    return (
                      <span key={screen.image} className="showcase-seg h-0.75 flex-1 overflow-hidden rounded-full">
                        <span
                          key={`${step.chapter}-${step.screen}`}
                          className="showcase-seg-fill block h-full"
                          data-state={done ? "done" : current ? (autoplay ? "running" : "done") : "todo"}
                          style={{
                            animationDuration: `${SCREEN_MS}ms`,
                            animationPlayState: playing ? "running" : "paused",
                          }}
                          onAnimationEnd={current ? next : undefined}
                        />
                      </span>
                    );
                  })}
                </span>
                <span className="mt-3 flex items-center gap-2.5">
                  <span
                    aria-hidden
                    className="showcase-tab-icon size-7 shrink-0 overflow-hidden sm:size-8"
                    style={{ borderRadius: p.theme.radius }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.logo.icon.src}
                      alt=""
                      className={`h-full w-full object-cover ${p.logo.icon.crop ? "object-left" : ""}`}
                    />
                  </span>
                  <span className="hidden font-mono text-[11px] opacity-60 lg:inline">
                    {String(c + 1).padStart(2, "0")}
                  </span>
                  <span className="hidden truncate text-sm font-semibold sm:inline sm:text-base">
                    {p.name}
                  </span>
                </span>
              </button>
            );
          })}

          {autoplay && (
            <button
              type="button"
              onClick={() => setUserPaused((v) => !v)}
              aria-label={userPaused ? dict.play : dict.pause}
              className="showcase-tab grid w-11 shrink-0 place-items-center sm:w-14"
            >
              {userPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
