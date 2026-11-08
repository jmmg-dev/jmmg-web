// Capturas de los proyectos para el catálogo de jmmg.dev
// Uso:
//   npm i -D playwright sharp
//   npx playwright install chromium
//   node capture-projects.mjs              (todos los proyectos)
//   node capture-projects.mjs kitforweb    (solo uno)
//
// Salida en ./public/projects/<id>/:
//   en-desktop-screen-<n>.webp  una por pantalla (carrusel del navegador)
//   en-mobile-hero.webp         primera pantalla en móvil
//   en-mobile-full.webp         página larga en móvil (scroll del teléfono)

import { chromium } from 'playwright';
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const OUT_DIR = path.resolve('public/projects');
const LANG = 'en';

// `screens`: rutas (sin el prefijo de idioma) que se muestran en el carrusel.
// Si cambias su número, actualiza también `screens` en lib/projects.ts.
const PROJECTS = [
  {
    id: 'kitforweb',
    url: 'http://localhost:5000',
    screens: ['', '/json-to-typescript', '/jwt-decoder', '/regex-builder'],
  },
  {
    id: 'playrxjs',
    url: 'http://localhost:4200',
    screens: [
      '',
      '/operators/combination',
      '/operators/combination/combineLatest',
      '/basic-concepts/marbleDiagrams',
    ],
  },
  {
    id: 'css-layout-lab',
    url: 'http://localhost:3000',
    colorScheme: 'light',
    screens: ['', '/flex', '/grid', '/grid/grid-template-areas'],
  },
];

const ONLY = process.argv.slice(2);
const TARGETS = ONLY.length ? PROJECTS.filter((p) => ONLY.includes(p.id)) : PROJECTS;

const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };

// Oculta indicadores de desarrollo (Next.js) y barras de scroll.
const CLEAN_CSS = `
  nextjs-portal, [data-nextjs-toast], [data-next-badge-root] { display: none !important; }
  ::-webkit-scrollbar { display: none !important; }
  html { scrollbar-width: none !important; }
`;

const WAIT_AFTER_LOAD_MS = 1500;

// Alto máximo (px CSS) de la captura larga de móvil. Con deviceScaleFactor 2 salen
// 8000 px reales, por debajo del límite de WebP (16383 px).
const MAX_FULL_HEIGHT = 4000;

async function open(page, url) {
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.addStyleTag({ content: CLEAN_CSS });
  await page.waitForTimeout(WAIT_AFTER_LOAD_MS);
}

async function scrollThrough(page) {
  // Recorre la página para disparar animaciones y lazy loading.
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 200));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(800);
}

// Layouts tipo "app shell" (sidebar + panel con overflow propio): el documento
// mide una pantalla y el scroll ocurre dentro de un elemento. Para la captura
// larga se despliegan esos contenedores para que el contenido fluya en la página.
async function expandInnerScroll(page) {
  return page.evaluate(() => {
    const root = document.documentElement;
    if (root.scrollHeight > window.innerHeight + 1) return false;

    const scrollers = [...document.body.querySelectorAll('*')].filter((el) => {
      const { overflowY } = getComputedStyle(el);
      return /(auto|scroll)/.test(overflowY) && el.scrollHeight > el.clientHeight + 1;
    });
    if (scrollers.length === 0) return false;

    const relax = (el) => {
      el.style.setProperty('height', 'auto', 'important');
      el.style.setProperty('max-height', 'none', 'important');
      // min-h-0 en items flex los colapsaría al quitar la altura fija
      el.style.setProperty('min-height', 'auto', 'important');
      el.style.setProperty('overflow', 'visible', 'important');
    };
    for (const el of scrollers) {
      for (let node = el; node && node !== root; node = node.parentElement) relax(node);
    }
    relax(root);
    return true;
  });
}

async function toWebp(buffer, file) {
  await sharp(buffer).webp({ quality: 82 }).toFile(file);
}

async function newContext(browser, project, viewport, isMobile) {
  return browser.newContext({
    viewport,
    deviceScaleFactor: 2,
    isMobile,
    hasTouch: isMobile,
    colorScheme: project.colorScheme ?? 'dark',
    reducedMotion: 'no-preference',
  });
}

const browser = await chromium.launch();

try {
  for (const project of TARGETS) {
    const dir = path.join(OUT_DIR, project.id);
    await mkdir(dir, { recursive: true });

    // Escritorio: una captura por pantalla
    const desktop = await newContext(browser, project, DESKTOP, false);
    const page = await desktop.newPage();
    for (const [i, route] of project.screens.entries()) {
      const url = `${project.url}/${LANG}${route}`;
      console.log(`→ ${project.id} · desktop · pantalla ${i + 1}  (${url})`);
      await open(page, url);
      await toWebp(await page.screenshot(), path.join(dir, `${LANG}-desktop-screen-${i + 1}.webp`));
    }
    await desktop.close();

    // Móvil: primera pantalla + página larga
    const mobile = await newContext(browser, project, MOBILE, true);
    const mpage = await mobile.newPage();
    const url = `${project.url}/${LANG}`;
    console.log(`→ ${project.id} · mobile  (${url})`);
    await open(mpage, url);
    await scrollThrough(mpage);
    await toWebp(await mpage.screenshot(), path.join(dir, `${LANG}-mobile-hero.webp`));

    if (await expandInnerScroll(mpage)) await mpage.waitForTimeout(300);
    const pageHeight = await mpage.evaluate(() => document.documentElement.scrollHeight);
    const full = await mpage.screenshot({
      fullPage: true,
      clip: { x: 0, y: 0, width: MOBILE.width, height: Math.min(pageHeight, MAX_FULL_HEIGHT) },
    });
    await toWebp(full, path.join(dir, `${LANG}-mobile-full.webp`));
    await mobile.close();
  }
} finally {
  await browser.close();
}

console.log(`\nListo. Capturas en ${OUT_DIR}`);
