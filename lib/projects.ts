import { Lang } from "@/models/enums";
import type { CSSProperties } from "react";

type Localized = Record<Lang, string>;

/** Sistema visual de la web del proyecto, aplicado a su sección del catálogo. */
export interface ProjectTheme {
  scheme: "dark" | "light";
  /** Fondo de la sección (color y degradados de la web). */
  background: string;
  /** Fondo sólido, para los degradados de lectura sobre las capturas. */
  base: string;
  foreground: string;
  muted: string;
  border: string;
  surface: string;
  /** Color principal: botón primario. */
  accent: string;
  accentForeground: string;
  /** Color secundario: numeración y detalles. */
  highlight: string;
  /** Degradado del subtítulo; sin él se usa `highlight`. */
  textGradient?: string;
  /** Halo detrás de las capturas. */
  glow: string;
  fontHeading: string;
  fontBody: string;
  fontMono: string;
  headingWeight: number;
  headingTracking: string;
  radius: string;
  buttonRadius: string;
}

export interface ProjectScreen {
  /** Ruta que se muestra en la barra del navegador. */
  path: string;
  image: string;
}

export interface ProjectLogo {
  /** Logotipo completo, en la variante que encaja con `theme.scheme`. */
  wordmark: { src: string; width: number; height: number };
  /** Icono cuadrado. Con `crop`, se recorta el lado izquierdo de un logo horizontal. */
  icon: { src: string; crop?: boolean };
}

export interface Project {
  id: string;
  name: string;
  /** URL pública. Sin ella, la sección muestra "Próximamente". */
  url?: string;
  repo?: string;
  tagline: Localized;
  description: Localized;
  stack: string[];
  theme: ProjectTheme;
  /** Pantallas del carrusel de escritorio (capture-projects.mjs). */
  screens: ProjectScreen[];
  /** Captura larga de móvil, para el scroll del teléfono. */
  mobile: string;
  logo: ProjectLogo;
}

const MONO = "var(--font-p-jetbrains), ui-monospace, monospace";

const screens = (id: string, paths: string[]): ProjectScreen[] =>
  paths.map((path, i) => ({
    path,
    image: `/projects/${id}/en-desktop-screen-${i + 1}.webp`,
  }));

export const PROJECTS: Project[] = [
  {
    id: "kitforweb",
    name: "kitforweb",
    url: "https://kitforweb.com",
    repo: "https://github.com/kitforweb/kitforweb",
    tagline: {
      en: "Web developer tools that never see your data",
      es: "Utilidades para desarrolladores que nunca ven tus datos",
    },
    description: {
      en: "Developer utilities for JSON, JWT, regex, CSS, Mermaid and more, running entirely in the browser. Paste production tokens or customer data without fear: nothing leaves your machine, and it keeps working offline.",
      es: "Utilidades para JSON, JWT, regex, CSS, Mermaid y mucho más, que se ejecutan enteras en el navegador. Puedes pegar tokens de producción o datos de clientes sin miedo: nada sale de tu equipo y funciona sin conexión.",
    },
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    theme: {
      scheme: "dark",
      background:
        "radial-gradient(900px 480px at 0% 0%, lab(84% -47 -19 / 0.07), transparent 70%), lab(4.39% -0.61 -5.14)",
      base: "lab(4.39% -0.61 -5.14)",
      foreground: "lab(90.74% -1.63 -3.3)",
      muted: "lab(67.52% -2.64 -6.84)",
      border: "lab(18.74% -1.27 -7.18)",
      surface: "lab(8.29% -1.09 -7.11)",
      accent: "lab(84.05% -46.9 -19.24)",
      accentForeground: "lab(4.39% -0.61 -5.14)",
      highlight: "lab(84.05% -46.9 -19.24)",
      glow: "lab(84% -47 -19 / 0.35)",
      fontHeading: MONO,
      fontBody: "var(--font-p-geist), ui-sans-serif, system-ui, sans-serif",
      fontMono: MONO,
      headingWeight: 700,
      headingTracking: "-0.025em",
      radius: "0.5rem",
      buttonRadius: "0.5rem",
    },
    screens: screens("kitforweb", ["", "/json-to-typescript", "/jwt-decoder", "/regex-builder"]),
    mobile: "/projects/kitforweb/en-mobile-full.webp",
    logo: {
      wordmark: { src: "/logos/kitforweb/logo-dark.svg", width: 567, height: 91 },
      icon: { src: "/logos/kitforweb/logo-icon.svg" },
    },
  },
  {
    id: "playrxjs",
    name: "Play RxJS",
    url: "https://playrxjs.vercel.app",
    tagline: {
      en: "Play, run, learn RxJS",
      es: "Juega, ejecuta y aprende RxJS",
    },
    description: {
      en: "Interactive RxJS documentation with more than 150 operators explained through editable examples. Change the code, run it and watch the console react in real time, with sandboxes and real-life patterns.",
      es: "Documentación interactiva de RxJS con más de 150 operadores explicados con ejemplos editables. Cambia el código, ejecútalo y observa cómo reacciona la consola en tiempo real, con sandboxes y casos reales.",
    },
    stack: ["Angular", "RxJS", "TypeScript"],
    theme: {
      scheme: "dark",
      background:
        "radial-gradient(900px 500px at 85% -10%, rgb(242 153 251 / 0.13), transparent 60%), radial-gradient(800px 500px at -10% 30%, rgb(163 254 255 / 0.08), transparent 60%), #161117",
      base: "#161117",
      foreground: "#f5f2f0",
      muted: "rgb(245 242 240 / 0.7)",
      border: "rgb(242 153 251 / 0.14)",
      surface: "#241c26",
      accent: "#f299fb",
      accentForeground: "#2f2630",
      highlight: "#a3feff",
      textGradient: "linear-gradient(120deg, #f299fb 0%, #c9b6ff 50%, #a3feff 100%)",
      glow: "rgb(242 153 251 / 0.35)",
      fontHeading: MONO,
      fontBody: "var(--font-p-space-grotesk), system-ui, sans-serif",
      fontMono: MONO,
      headingWeight: 700,
      headingTracking: "-0.05em",
      radius: "14px",
      buttonRadius: "999px",
    },
    screens: screens("playrxjs", [
      "",
      "/operators/combination",
      "/operators/combination/combineLatest",
      "/basic-concepts/marbleDiagrams",
    ]),
    mobile: "/projects/playrxjs/en-mobile-full.webp",
    logo: {
      wordmark: { src: "/logos/playrxjs/logo-play-rxjs.svg", width: 484, height: 106 },
      icon: { src: "/logos/playrxjs/logo-prx.svg" },
    },
  },
  {
    id: "css-layout-lab",
    name: "CSS Layout Lab",
    repo: "https://github.com/CSS-Layout-Lab/css-layout-lab",
    tagline: {
      en: "Learn CSS layouts by playing with them",
      es: "Aprende layouts en CSS experimentando con ellos",
    },
    description: {
      en: "An interactive lab to master CSS layouts, from block and inline to flexbox, grid, container queries and anchor positioning, with live HTML and CSS editors that update the result as you type.",
      es: "Un laboratorio interactivo para dominar los layouts en CSS, desde block e inline hasta flexbox, grid, container queries y anchor positioning, con editores de HTML y CSS en vivo que actualizan el resultado al escribir.",
    },
    stack: ["Next.js", "TypeScript", "CSS Grid", "Flexbox"],
    theme: {
      scheme: "light",
      background:
        "radial-gradient(960px 544px at 8% -128px, rgb(255 201 174 / 0.28), transparent 70%), radial-gradient(960px 544px at 95% 32px, rgb(169 205 246 / 0.28), transparent 70%), #fbfaf7",
      base: "#fbfaf7",
      foreground: "#1b1e26",
      muted: "rgb(27 30 38 / 0.68)",
      border: "rgb(27 30 38 / 0.1)",
      surface: "#ffffff",
      accent: "#1b1e26",
      accentForeground: "#ffffff",
      highlight: "#a8417f",
      textGradient: "linear-gradient(100deg, #f08f63, #d274b4 55%, #4f94e8)",
      glow: "rgb(240 143 99 / 0.3)",
      fontHeading: "var(--font-p-inter-tight), var(--font-p-instrument), system-ui, sans-serif",
      fontBody: "var(--font-p-instrument), system-ui, sans-serif",
      fontMono: MONO,
      headingWeight: 600,
      headingTracking: "-0.045em",
      radius: "14px",
      buttonRadius: "999px",
    },
    screens: screens("css-layout-lab", ["", "/flex", "/grid", "/grid/grid-template-areas"]),
    mobile: "/projects/css-layout-lab/en-mobile-full.webp",
    logo: {
      wordmark: { src: "/logos/css-layout-lab/css-layout-lab.svg", width: 436, height: 80 },
      icon: { src: "/logos/css-layout-lab/css-layout-lab-icon.svg" },
    },
  },
];

/** Variables CSS con el sistema visual de la web del proyecto. */
export const projectThemeVars = ({ theme }: Project) =>
  ({
    "--p-bg": theme.background,
    "--p-base": theme.base,
    "--p-fg": theme.foreground,
    "--p-muted": theme.muted,
    "--p-border": theme.border,
    "--p-surface": theme.surface,
    "--p-accent": theme.accent,
    "--p-accent-fg": theme.accentForeground,
    "--p-highlight": theme.highlight,
    "--p-text-gradient": theme.textGradient ?? "none",
    "--p-glow": theme.glow,
    "--p-font-heading": theme.fontHeading,
    "--p-font-body": theme.fontBody,
    "--p-font-mono": theme.fontMono,
    "--p-heading-weight": theme.headingWeight,
    "--p-heading-tracking": theme.headingTracking,
    "--p-radius": theme.radius,
    "--p-btn-radius": theme.buttonRadius,
    colorScheme: theme.scheme,
  }) as CSSProperties;
