"use client";

import { PROJECTS } from "@/lib/projects";
import { Lang } from "@/models/enums";
import type { HeroDict } from "@/models/types";
import {
  ArrowRight,
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
 * - pan-x / pan-x-rev: wider than the screen, panned left to right or the other way round.
 * - pan-y: taller than the screen, panned top to bottom.
 * - reveal: covers the screen and enters like JMMG in the intro (from big and blurred to its size).
 * - still: covers the screen and only fades in.
 * - appear: cut-out image (with transparency), centred and large; enters like JMMG and stays still.
 * - float: cut-out image (with transparency), centred and large; enters even bigger, settles
 *   at its size and at the end zooms out and disappears.
 */
type Motion = "pan-x" | "pan-x-rev" | "pan-y" | "float" | "appear" | "reveal" | "still";

/** Tone of the image background: decides whether the text is light or dark. */
type Tone = "dark" | "light";

type FrameBase = {
  duration: number;
  /** Background colour of the image: the hero takes it so no gaps show. */
  bg: string;
  tone: Tone;
  /** If set, replaces the slide description while this image is shown. */
  description?: string;
};

type ImageFrame = FrameBase & {
  src: string;
  width: number;
  height: number;
  motion: Motion;
  /**
   * Animation on top of the image:
   * - prompt: "Run all the tasks" is typed into an AI prompt box and sent.
   * - answer: the AI replies and completes the tasks one by one.
   */
  overlay?: "prompt" | "answer";
};

/**
 * Animated scenes:
 * - type-kitforweb: "kitforweb" is typed in its typeface with its cursor, then enter is pressed.
 * - logo-playrxjs: the Play RxJS logo shrinks from big to its size, like JMMG in the intro,
 *   with two balls from its marble diagram orbiting it in opposite directions
 *   until each one shoots off to one side.
 * - type-code: "npm run dev" is typed over a code capture, then enter is pressed.
 * - tech-icons: the technology logos overlap and disappear, each one with its own effect.
 */
type Scene = "type-kitforweb" | "logo-playrxjs" | "type-code" | "tech-icons";
type SceneFrame = FrameBase & { scene: Scene };

type Frame = ImageFrame | SceneFrame;

/** Typed text, split into chunks with their colour. */
type TypePart = { text: string; color: string };

const KITFORWEB: TypePart[] = [
  { text: "kit", color: "#E2E8F0" },
  { text: "for", color: "#22D3EE" },
  { text: "web", color: "#E2E8F0" },
];

// Always in English, as you would write to an AI agent
const RUN_ALL_TASKS: TypePart[] = [{ text: "Run all the tasks", color: "#E2E8F0" }];

// AI answer: the same tasks as the panel in the image
const AI_ANSWER = "On it! Running your tasks in parallel:";
const AI_TASKS = [
  "Implement authentication",
  "Write documentation",
  "Run tests",
  "Deploy to production",
];

// VS Code dark theme colours, as in the background capture
const NPM_RUN_DEV: TypePart[] = [
  { text: "$ ", color: "#6A9955" },
  { text: "npm ", color: "#DCDCAA" },
  { text: "run ", color: "#9CDCFE" },
  { text: "dev", color: "#CE9178" },
];

/** Technology logos and the effect each one enters and leaves with. */
const TECH = [
  { src: "/images/carousel/tech/angular.svg", fx: "flip" },
  { src: "/images/carousel/tech/nextjs.svg", fx: "glitch" },
  { src: "/images/carousel/tech/nestjs.webp", fx: "blur" },
  { src: "/images/carousel/tech/tailwind.svg", fx: "skew" },
  { src: "/images/carousel/tech/docker.svg", fx: "iris" },
  { src: "/images/carousel/tech/rxjs.svg", fx: "spin" },
  { src: "/images/carousel/tech/webpack.svg", fx: "warp" },
] as const;

/** Line typed letter by letter with its cursor; at the end "enter" is pressed. */
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
  /** No title or description: intro slide with the brand. */
  intro?: boolean;
  title?: string;
  description?: string;
  /** Slide without images: how long it lasts. */
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
  // Links to my websites, with their logo
  const projects = PROJECTS.flatMap((p) => {
    const href = p.url ?? p.repo;
    return href ? [{ href, label: p.name, image: p.logo.icon.src, crop: p.logo.icon.crop }] : [];
  });

  const kit = { bg: "#0A1017", tone: "dark" as Tone };
  const rxjs = { bg: "#161117", tone: "dark" as Tone };
  const code = { bg: "#1E1E1E", tone: "dark" as Tone };
  const tech = { bg: "#07070D", tone: "dark" as Tone };
  const shot = (name: string, width: number, height: number) => ({
    src: `/images/carousel/${name}.webp`,
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
        { ...shot("architecture-1", 2322, 1306), src: "/images/carousel/architecture-1.svg", motion: "pan-x", duration: 5500, ...INTRO_STYLE },
        { ...shot("architecture-2", 2101, 2934), src: "/images/carousel/architecture-2.svg", motion: "pan-y", duration: 6500, ...INTRO_STYLE },
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
  // `previous`: image that stays underneath while the new one fades in.
  const [{ pos, previous }, setStep] = useState<{ pos: Position; previous: Position | null }>({
    pos: { slide: 0, frame: 0 },
    previous: null,
  });
  // Images are requested per slide: the current one and the next.
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

  // Pause: bottom right on desktop, next to the top links on mobile
  const pauseButton = (className: string) => (
    <button
      type="button"
      onClick={() => setUserPaused((v) => !v)}
      aria-label={userPaused ? controls.play : controls.pause}
      title={userPaused ? controls.play : controls.pause}
      className={className}
    >
      {userPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
    </button>
  );
  const duration = current?.duration ?? slide.duration ?? INTRO_MS;
  const activeKey = frameKey(pos);
  const previousKey = previous ? frameKey(previous) : null;
  const nextPos: Position =
    pos.frame + 1 < slide.frames.length
      ? { ...pos, frame: pos.frame + 1 }
      : { slide: (pos.slide + 1) % slides.length, frame: 0 };
  const nextKey = frameKey(nextPos);

  // Timer for each image: when it ends, the next one starts. Pausing stores the time
  // left and resuming continues from there, like the CSS animations (data-paused).
  // It used to be an invisible CSS animation, but if it ended before React hydrated
  // the page the event was lost and the carousel got stuck.
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

  // Downloads and decodes the next image ahead of time, so it enters without delay.
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
      data-slide={slide.id}
      data-paused={playing ? undefined : ""}
    >
      {/* Images of every slide, stacked; the active one fades in */}
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
                      src={si <= loadedUpTo ? "/images/carousel/code.webp" : undefined}
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
                      src="/images/logos/playrxjs/logo-play-rxjs.svg"
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

      {/* Animations on top of the images (AI prompt and answer) */}
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
        <div key={`intro-${activeKey}`} className="absolute inset-0 grid place-items-center px-4 pb-[12svh] md:pb-0">
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
          {/* Top left: brand and section title */}
          <div className="absolute top-6 left-4 sm:top-8 sm:left-8 lg:left-12">
            <p className="hero-in text-xl font-bold tracking-tight sm:text-2xl" style={{ "--i": 0 } as CSSProperties}>
              <span className="hero-neon">JM</span>
              <span className="hero-muted font-light">MG</span>
              <span className="hero-neon text-[0.65em]">.dev</span>
            </p>
            <h2
              className="hero-in hero-fg mt-6 text-[8.5vw] sm:mt-2 font-black uppercase leading-none tracking-[0.12em] sm:text-7xl lg:text-8xl"
              style={{ "--i": 1 } as CSSProperties}
            >
              {slide.title}
            </h2>
          </div>
        </div>
      )}

      {/* Mobile, top right: LinkedIn, CV and email (same order as the buttons below) and pause */}
      <div className="absolute top-6 right-4 flex items-center gap-2 sm:top-8 sm:right-8 md:hidden">
        {!slide.intro && (
          <>
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={dict.linkedin}
              title={dict.linkedin}
              className="hero-icon hero-icon-sm"
              data-variant="primary"
            >
              <Linkedin aria-hidden className="h-4 w-4" />
            </a>
            <Link href={`/${lang}/cv`} aria-label={dict.cv} title={dict.cv} className="hero-icon hero-icon-sm">
              <span aria-hidden className="text-xs font-bold tracking-wide">CV</span>
            </Link>
            <a href={`mailto:${email}`} aria-label={dict.email} title={dict.email} className="hero-icon hero-icon-sm">
              <Mail aria-hidden className="h-4 w-4" />
            </a>
          </>
        )}
        {pauseButton("hero-icon hero-icon-sm hero-pause")}
      </div>

      {/* Bottom: links and description */}
      <div className="absolute inset-x-0 bottom-0 px-4 pb-8 sm:px-8 sm:pb-10 lg:px-12 lg:pb-14">
        <div className="flex flex-col-reverse gap-6 md:flex-row md:items-end md:gap-10 md:pr-14">
          {/* Links fixed on every section except the intro: my websites, LinkedIn, CV and email */}
          {!slide.intro && (
          <div className="hero-in hidden shrink-0 flex-col gap-3 md:flex md:w-72" style={{ "--i": 2 } as CSSProperties}>
            <ul className="flex gap-4">
              {projects.map(({ href, label, image, crop }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className="hero-app"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={image} alt="" className={crop ? "object-left" : ""} />
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
                {dict.linkedin}
                <Linkedin aria-hidden className="h-4 w-4" />
              </a>
              {/* Same content as the "View my CV" button in the projects section */}
              <Link href={`/${lang}/cv`} className="hero-btn group">
                {dict.cv}
                <ArrowRight
                  aria-hidden
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>
            <a href={`mailto:${email}`} className="hero-btn">
              {dict.email}
              <Mail aria-hidden className="h-4 w-4" />
            </a>
          </div>
          )}

          {description && (
            <p
              key={`desc-${description}`}
              className="hero-in hero-soft text-base md:max-w-3xl font-semibold leading-relaxed text-pretty sm:text-lg"
              style={{ "--i": 3 } as CSSProperties}
            >
              {description}
            </p>
          )}
        </div>

        {pauseButton("hero-icon hero-pause hero-pause-desktop absolute right-8 bottom-10 lg:right-12 lg:bottom-14")}
      </div>
    </section>
  );
};
