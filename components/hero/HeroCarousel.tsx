"use client";

import { PROJECTS } from "@/lib/projects";
import { Lang } from "@/models/enums";
import type { HeroDict } from "@/models/types";
import {
  FileUser,
  Linkedin,
  Mail,
  Pause,
  Play,
  Check,
  SendHorizontal,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

/**
 * - pan-x / pan-x-rev: más ancha que la pantalla, se recorre de izquierda a derecha o al revés.
 * - pan-y: más alta que la pantalla, se recorre de arriba a abajo.
 * - reveal: cubre la pantalla y entra como JMMG en la entrada (de grande y desenfocada a su tamaño).
 * - still: cubre la pantalla y solo aparece con el fundido.
 * - appear: imagen recortada (con transparencia), centrada y grande; entra como JMMG y se queda quieta.
 * - float: imagen recortada (con transparencia), centrada y grande; entra aún más grande, se asienta
 *   en su tamaño y al final se aleja y desaparece.
 */
type Motion = "pan-x" | "pan-x-rev" | "pan-y" | "float" | "appear" | "reveal" | "still";

/** Tono del fondo de la imagen: decide si el texto va en claro o en oscuro. */
type Tone = "dark" | "light";

type FrameBase = {
  duration: number;
  /** Color de fondo de la imagen: el hero lo toma para que no queden huecos. */
  bg: string;
  tone: Tone;
  /** Si la tiene, sustituye a la descripción de la diapositiva mientras se ve esta imagen. */
  description?: string;
};

type ImageFrame = FrameBase & {
  src: string;
  width: number;
  height: number;
  motion: Motion;
  /**
   * Animación encima de la imagen:
   * - prompt: se escribe "Run all the tasks" en una caja de prompt de IA y se envía.
   * - answer: la IA responde y va completando las tareas.
   */
  overlay?: "prompt" | "answer";
};

/**
 * Escenas animadas:
 * - type-kitforweb: se escribe "kitforweb" con su tipografía y su cursor, y se pulsa intro.
 * - logo-playrxjs: el logo de Play RxJS entra de grande a su tamaño, como JMMG en la entrada,
 *   con dos bolas de su diagrama de canicas girando alrededor en sentidos contrarios
 *   hasta que salen disparadas cada una hacia un lado.
 * - type-code: sobre una captura de código se escribe "npm run dev" y se pulsa intro.
 * - tech-icons: los logos de las tecnologías se superponen y desaparecen, cada uno con un efecto.
 */
type Scene = "type-kitforweb" | "logo-playrxjs" | "type-code" | "tech-icons";
type SceneFrame = FrameBase & { scene: Scene };

type Frame = ImageFrame | SceneFrame;

/** Texto que se escribe, por trozos con su color. */
type TypePart = { text: string; color: string };

const KITFORWEB: TypePart[] = [
  { text: "kit", color: "#E2E8F0" },
  { text: "for", color: "#22D3EE" },
  { text: "web", color: "#E2E8F0" },
];

// Colores del tema oscuro de VS Code, como en la captura de fondo
// Siempre en inglés, como se escribiría a un agente de IA
const RUN_ALL_TASKS: TypePart[] = [{ text: "Run all the tasks", color: "#E2E8F0" }];

// Respuesta de la IA: las mismas tareas que su panel en la imagen
const AI_ANSWER = "On it! Running your tasks in parallel:";
const AI_TASKS = [
  "Implement authentication",
  "Write documentation",
  "Run tests",
  "Deploy to production",
];

const NPM_RUN_DEV: TypePart[] = [
  { text: "$ ", color: "#6A9955" },
  { text: "npm ", color: "#DCDCAA" },
  { text: "run ", color: "#9CDCFE" },
  { text: "dev", color: "#CE9178" },
];

/** Logos de tecnologías y el efecto con el que entra y sale cada uno. */
const TECH = [
  { src: "/hero/tech/nestjs.webp", fx: "blur" },
  { src: "/hero/tech/tailwind.svg", fx: "skew" },
  { src: "/hero/tech/angular.svg", fx: "flip" },
  { src: "/hero/tech/docker.svg", fx: "iris" },
  { src: "/hero/tech/nextjs.svg", fx: "glitch" },
  { src: "/hero/tech/rxjs.svg", fx: "spin" },
  { src: "/hero/tech/webpack.svg", fx: "warp" },
] as const;

/** Línea que se escribe letra a letra con su cursor; al acabar se "pulsa intro". */
const TypeLine = ({ parts, cursor }: { parts: TypePart[]; cursor: string }) => (
  <p
    className="hero-type"
    style={{ "--chars": parts.reduce((n, p) => n + p.text.length, 0) } as CSSProperties}
  >
    <span className="hero-type-text">
      {parts.map((part) => (
        <span key={part.text} style={{ color: part.color }}>
          {part.text}
        </span>
      ))}
    </span>
    <span className="hero-type-cursor" style={{ background: cursor }} />
  </p>
);


type Slide = {
  id: string;
  /** Sin título ni descripción: diapositiva de entrada con la marca. */
  intro?: boolean;
  title?: string;
  description?: string;
  /** Diapositiva sin imágenes: cuánto dura. */
  duration?: number;
  frames: Frame[];
};

type Position = { slide: number; frame: number };

const INTRO_MS = 5200;
const DARK_BG = "#0B1120";
const INTRO_STYLE = { bg: DARK_BG, tone: "dark" as Tone };

const frameKey = ({ slide, frame }: Position) => `${slide}-${frame}`;


export const HeroCarousel = ({
  lang,
  dict,
  linkedin,
  email,
  controls,
}: {
  lang: Lang;
  dict: HeroDict;
  linkedin: string;
  email: string;
  controls: { pause: string; play: string };
}) => {
  // Enlaces a mis webs, con su logo
  const projects = PROJECTS.flatMap((p) => {
    const href = p.url ?? p.repo;
    return href ? [{ href, label: p.name, image: p.logo.icon.src, crop: p.logo.icon.crop }] : [];
  });

  const kit = { bg: "#0A1017", tone: "dark" as Tone };
  const rxjs = { bg: "#161117", tone: "dark" as Tone };
  const code = { bg: "#1E1E1E", tone: "dark" as Tone };
  const tech = { bg: "#07070D", tone: "dark" as Tone };
  const shot = (name: string, width: number, height: number) => ({
    src: `/hero/${name}.webp`,
    width,
    height,
  });

  const slides: Slide[] = [
    { id: "intro", intro: true, duration: INTRO_MS, frames: [] },
    {
      id: "architecture",
      title: dict.architecture.title,
      description: dict.architecture.description,
      frames: [
        { ...shot("architecture-1", 2322, 1306), src: "/hero/architecture-1.svg", motion: "pan-x", duration: 5500, ...INTRO_STYLE },
        { ...shot("architecture-2", 2101, 2934), src: "/hero/architecture-2.svg", motion: "pan-y", duration: 6500, ...INTRO_STYLE },
      ],
    },
    {
      id: "ux",
      title: dict.ux.title,
      description: dict.ux.description,
      frames: [
        { scene: "type-kitforweb", duration: 1800, ...kit },
        { ...shot("kit-0", 1854, 833), motion: "reveal", duration: 3200, ...kit },
        { scene: "logo-playrxjs", duration: 2600, ...rxjs },
        { ...shot("rxjs-0", 1897, 903), motion: "still", duration: 2600, ...rxjs },
      ],
    },
    {
      id: "dev",
      title: dict.dev.title,
      frames: [
        { scene: "type-code", duration: 3000, ...code, description: dict.dev.experience },
        { scene: "tech-icons", duration: 6800, ...tech, description: dict.dev.skills },
      ],
    },
    {
      id: "ai",
      title: dict.ai.title,
      frames: [
        { ...shot("ia", 1672, 941), motion: "appear", overlay: "prompt", duration: 5600, ...INTRO_STYLE, description: dict.ai.control },
        { ...shot("ia-2", 1672, 941), motion: "float", overlay: "answer", duration: 8500, ...INTRO_STYLE, description: dict.ai.productivity },
      ],
    },
  ];

  const ref = useRef<HTMLElement>(null);
  // `previous`: imagen que se queda debajo mientras entra la nueva con el fundido.
  const [{ pos, previous }, setStep] = useState<{ pos: Position; previous: Position | null }>({
    pos: { slide: 0, frame: 0 },
    previous: null,
  });
  // Las imágenes se piden por diapositivas: la actual y la siguiente.
  const [loadedUpTo, setLoadedUpTo] = useState(1);
  const [userPaused, setUserPaused] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.2,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setLoadedUpTo((n) => Math.max(n, pos.slide + 1));
  }, [pos.slide]);

  const frameCounts = slides.map((s) => s.frames.length).join(",");
  const next = useCallback(() => {
    const counts = frameCounts.split(",").map(Number);
    setStep(({ pos: current }) => ({
      previous: current,
      pos:
        current.frame + 1 < counts[current.slide]
          ? { ...current, frame: current.frame + 1 }
          : { slide: (current.slide + 1) % counts.length, frame: 0 },
    }));
  }, [frameCounts]);

  const playing = !userPaused && visible;
  const slide = slides[pos.slide];
  const current = slide.frames[pos.frame];
  const { bg, tone } = current ?? INTRO_STYLE;
  const description = current?.description ?? slide.description;
  const duration = current?.duration ?? slide.duration ?? INTRO_MS;
  const activeKey = frameKey(pos);
  const previousKey = previous ? frameKey(previous) : null;
  const nextPos: Position =
    pos.frame + 1 < slide.frames.length
      ? { ...pos, frame: pos.frame + 1 }
      : { slide: (pos.slide + 1) % slides.length, frame: 0 };
  const nextKey = frameKey(nextPos);

  // Temporizador de cada imagen: al acabar pasa a la siguiente. Al pausar guarda lo que
  // le queda y al reanudar sigue desde ahí, igual que las animaciones CSS (data-paused).
  // Antes era una animación CSS invisible, pero si acababa antes de que React cargara
  // la página se perdía el aviso y el carrusel se quedaba parado.
  const timer = useRef({ key: "", remaining: 0 });
  useEffect(() => {
    if (timer.current.key !== activeKey) timer.current = { key: activeKey, remaining: duration };
    if (!playing) return;
    const startedAt = performance.now();
    const id = window.setTimeout(next, timer.current.remaining);
    return () => {
      window.clearTimeout(id);
      timer.current.remaining = Math.max(0, timer.current.remaining - (performance.now() - startedAt));
    };
  }, [activeKey, duration, playing, next]);

  // Descarga y decodifica la siguiente imagen antes de que le toque, para que entre sin esperas.
  useEffect(() => {
    const img = ref.current?.querySelector(`[data-frame="${nextKey}"]`);
    if (img instanceof HTMLImageElement && img.src) img.decode().catch(() => {});
  }, [nextKey, loadedUpTo]);

  return (
    <section
      ref={ref}
      aria-roledescription="carousel"
      aria-label={dict.label}
      className="hero relative h-svh min-h-120 w-full overflow-hidden"
      style={{ "--hero-bg": bg } as CSSProperties}
      data-tone={tone}
      data-paused={playing ? undefined : ""}
    >
      {/* Imágenes de todas las diapositivas, apiladas; la activa aparece con un fundido */}
      {slides.map((s, si) =>
        s.frames.map((f, fi) => {
          const key = frameKey({ slide: si, frame: fi });
          const state = key === activeKey ? "active" : key === previousKey ? "previous" : "idle";
          if ("scene" in f) {
            return (
              <div
                key={key}
                aria-hidden
                className="hero-frame hero-scene"
                data-frame={key}
                data-scene={f.scene}
                data-state={state}
                style={{ backgroundColor: f.bg }}
              >
                {f.scene === "type-kitforweb" && <TypeLine parts={KITFORWEB} cursor="#22D3EE" />}
                {f.scene === "type-code" && (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={si <= loadedUpTo ? "/hero/code.webp" : undefined}
                      width={1827}
                      height={964}
                      alt=""
                      decoding="async"
                      className="hero-scene-bg"
                    />
                    <div className="hero-type-panel">
                      <TypeLine parts={NPM_RUN_DEV} cursor="#AEAFAD" />
                    </div>
                  </>
                )}
                {f.scene === "tech-icons" && (
                  <div className="hero-tech-stage">
                    <span className="hero-tech-aura" />
                    <span className="hero-tech-ring" />
                    {TECH.map((t, i) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={t.src}
                        src={si <= loadedUpTo ? t.src : undefined}
                        alt=""
                        decoding="async"
                        className="hero-tech"
                        data-fx={t.fx}
                        style={{ "--i": i } as CSSProperties}
                      />
                    ))}
                  </div>
                )}
                {f.scene === "logo-playrxjs" && (
                  <div className="hero-orbit-stage">
                    <span className="hero-orbit-ring" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/logos/playrxjs/logo-play-rxjs.svg"
                      width={484}
                      height={106}
                      alt=""
                      className="hero-scene-logo"
                    />
                    <span className="hero-orbit" data-dir="cw">
                      <span className="hero-ball" data-color="pink">
                        1
                      </span>
                    </span>
                    <span className="hero-orbit" data-dir="ccw">
                      <span className="hero-ball" data-color="cyan">
                        a
                      </span>
                    </span>
                  </div>
                )}
              </div>
            );
          }
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={key}
              src={si <= loadedUpTo ? f.src : undefined}
              width={f.width}
              height={f.height}
              alt=""
              aria-hidden
              decoding="async"
              fetchPriority="low"
              className="hero-frame"
              data-frame={key}
              data-motion={f.motion}
              data-state={state}
              style={
                {
                  "--ar": f.width / f.height,
                  animationDuration: `${f.duration}ms`,
                } as CSSProperties
              }
            />
          );
        }),
      )}

      <div aria-hidden className="hero-scrim pointer-events-none absolute inset-0" />

      {/* Animaciones encima de las imágenes (prompt y respuesta de la IA) */}
      {slides.map((s, si) =>
        s.frames.map((f, fi) => {
          if (!("overlay" in f) || !f.overlay) return null;
          const key = frameKey({ slide: si, frame: fi });
          const state = key === activeKey ? "active" : key === previousKey ? "previous" : "idle";
          return (
            <div
              key={`overlay-${key}`}
              aria-hidden
              className="hero-overlay pointer-events-none absolute inset-0 grid place-items-center px-4"
              data-overlay={f.overlay}
              data-state={state}
            >
              {f.overlay === "prompt" ? (
                <div className="hero-type-panel" data-variant="prompt">
                  <Sparkles aria-hidden className="hero-prompt-icon" />
                  <TypeLine parts={RUN_ALL_TASKS} cursor="#38BDF8" />
                  <span aria-hidden className="hero-prompt-send">
                    <SendHorizontal />
                  </span>
                </div>
              ) : (
                <div className="hero-answer">
                  <p className="hero-answer-head">
                    <Sparkles aria-hidden className="hero-prompt-icon" />
                    <span
                      className="hero-answer-text"
                      style={{ "--chars": AI_ANSWER.length } as CSSProperties}
                    >
                      {AI_ANSWER}
                    </span>
                  </p>
                  <ul className="hero-answer-tasks">
                    {AI_TASKS.map((task, i) => (
                      <li key={task} style={{ "--i": i } as CSSProperties}>
                        <span className="hero-answer-check">
                          <Check />
                        </span>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        }),
      )}


      {slide.intro ? (
        <div key={`intro-${activeKey}`} className="absolute inset-0 grid place-items-center px-4">
          <div className="text-center">
            <p className="hero-intro-brand font-bold leading-none tracking-tight">
              <span className="hero-neon">JM</span>
              <span className="hero-muted font-light">MG</span>
              <span className="hero-neon text-[0.45em]">.dev</span>
            </p>
            <p className="hero-intro-subtitle hero-soft mt-6 text-sm font-light uppercase tracking-[0.35em] sm:text-lg">
              {dict.subtitle}
            </p>
          </div>
        </div>
      ) : (
        <div key={`copy-${pos.slide}`} className="absolute inset-0">
          {/* Arriba a la izquierda: marca y título de la sección */}
          <div className="absolute top-6 left-4 sm:top-8 sm:left-8 lg:left-12">
            <p className="hero-in text-xl font-bold tracking-tight sm:text-2xl" style={{ "--i": 0 } as CSSProperties}>
              <span className="hero-neon">JM</span>
              <span className="hero-muted font-light">MG</span>
              <span className="hero-neon text-[0.65em]">.dev</span>
            </p>
            <h2
              className="hero-in hero-fg mt-2 text-5xl font-black uppercase leading-none tracking-[0.12em] sm:text-7xl lg:text-8xl"
              style={{ "--i": 1 } as CSSProperties}
            >
              {slide.title}
            </h2>
          </div>
        </div>
      )}

      {/* Abajo: enlaces y descripción */}
      <div className="absolute inset-x-0 bottom-0 px-4 pb-8 sm:px-8 sm:pb-10 lg:px-12 lg:pb-14">
        <div className="flex flex-col-reverse gap-6 pr-14 md:flex-row md:items-end md:gap-10">
          {/* Enlaces fijos en todas las secciones menos la entrada: mis webs, LinkedIn, CV y correo */}
          {!slide.intro && (
          <div className="hero-in flex shrink-0 flex-col gap-3 md:w-72" style={{ "--i": 2 } as CSSProperties}>
            <ul className="flex gap-3">
              {projects.map(({ href, label, image, crop }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className="hero-icon"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={image} alt="" className={`hero-icon-logo ${crop ? "object-left" : ""}`} />
                  </a>
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-2 gap-3">
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-btn"
                data-variant="primary"
              >
                <Linkedin aria-hidden className="h-5 w-5" />
                {dict.linkedin}
              </a>
              <Link href={`/${lang}/cv`} className="hero-btn">
                <FileUser aria-hidden className="h-5 w-5" />
                {dict.cv}
              </Link>
            </div>
            <a href={`mailto:${email}`} className="hero-btn">
              <Mail aria-hidden className="h-5 w-5" />
              {dict.email}
            </a>
          </div>
          )}

          {description && (
            <p
              key={`desc-${description}`}
              className="hero-in hero-soft max-w-3xl text-base font-semibold leading-relaxed text-pretty sm:text-lg"
              style={{ "--i": 3 } as CSSProperties}
            >
              {description}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={() => setUserPaused((v) => !v)}
          aria-label={userPaused ? controls.play : controls.pause}
          title={userPaused ? controls.play : controls.pause}
          className="hero-icon hero-pause absolute right-4 bottom-8 sm:right-8 sm:bottom-10 lg:right-12 lg:bottom-14"
        >
          {userPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
        </button>
      </div>
    </section>
  );
};
