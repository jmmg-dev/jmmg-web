#!/usr/bin/env node
// Captura las webs de los proyectos para el catálogo de jmmg.dev.
//
// Uso (desde la raíz del repo del portfolio):
//   node .claude/skills/capture-projects/scripts/capture.mjs              todos
//   node .claude/skills/capture-projects/scripts/capture.mjs kitforweb    solo uno
//   node .claude/skills/capture-projects/scripts/capture.mjs --local      desde localhost (localUrl)
//   (por defecto, de la primera de `urls` que sirva la web; ver projects.config.mjs)
//   node .claude/skills/capture-projects/scripts/capture.mjs --check      solo comprueba que respondan
//
// Salida en public/projects/<id>/:
//   en-desktop-screen-<n>.webp   pantallas del carrusel del navegador
//   en-mobile-hero.webp          primera pantalla en móvil
//   en-mobile-full.webp          página larga en móvil (scroll del teléfono)
//   manifest.json                lo que lee lib/projects.ts
//
// Códigos de salida: 0 todo bien · 1 error (servidor caído, fallo de Playwright) ·
// 2 capturas hechas pero alguna acción no se encontró (revisar).

import { chromium } from 'playwright';
import sharp from 'sharp';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DEFAULTS, PROJECTS } from '../projects.config.mjs';

const REPO_ROOT = fileURLToPath(new URL('../../../../', import.meta.url));
const OUT_DIR = path.join(REPO_ROOT, 'public', 'projects');
const { lang: LANG } = DEFAULTS;

// Alto máximo (px CSS) de la captura larga de móvil. Con deviceScaleFactor 2 salen
// 8000 px reales, por debajo del límite de WebP (16383 px).
const MAX_FULL_HEIGHT = 4000;

// Oculta indicadores de desarrollo (Next.js, Angular) y barras de scroll.
const CLEAN_CSS = `
  nextjs-portal, [data-nextjs-toast], [data-next-badge-root] { display: none !important; }
  ::-webkit-scrollbar { display: none !important; }
  * { scrollbar-width: none !important; }
`;

const args = process.argv.slice(2);
const checkOnly = args.includes('--check');
const useLocal = args.includes('--local');
/** URL desde la que se captura cada proyecto (la resuelve checkServers). */
const resolved = new Map();
const baseUrl = (p) => resolved.get(p.id);
const ids = args.filter((a) => !a.startsWith('--'));
const targets = ids.length ? PROJECTS.filter((p) => ids.includes(p.id)) : PROJECTS;

const unknown = ids.filter((id) => !PROJECTS.some((p) => p.id === id));
if (unknown.length) {
  console.error(`✗ Proyecto desconocido: ${unknown.join(', ')}. Disponibles: ${PROJECTS.map((p) => p.id).join(', ')}`);
  process.exit(1);
}

const warnings = [];
const warn = (msg) => {
  warnings.push(msg);
  console.warn(`  ⚠ ${msg}`);
};

// ---------- Servidores ----------

async function probe(url, expect) {
  try {
    const res = await fetch(`${url}/${LANG}`, { signal: AbortSignal.timeout(15000), redirect: 'follow' });
    if (!res.ok) return `HTTP ${res.status}`;
    if (expect && !(await res.text()).includes(expect)) return `responde, pero no es la web (no contiene "${expect}")`;
    return null;
  } catch {
    return 'no responde';
  }
}

async function checkServers() {
  const down = [];
  for (const p of targets) {
    const candidates = useLocal ? [p.localUrl] : p.urls;
    const tried = [];
    for (const url of candidates) {
      const problem = await probe(url, useLocal ? null : p.expect);
      if (!problem) {
        resolved.set(p.id, url);
        break;
      }
      tried.push(`${url}: ${problem}`);
    }
    if (resolved.has(p.id)) {
      console.log(`✓ ${p.id} → ${resolved.get(p.id)}`);
      if (tried.length) console.log(`  · descartadas: ${tried.join(' · ')}`);
    } else {
      down.push(`${p.id} (${tried.join(' · ')})`);
    }
  }
  if (down.length) {
    console.error(`✗ Servidores no disponibles:\n  - ${down.join('\n  - ')}`);
    process.exit(1);
  }
}

// ---------- Acciones ----------

async function runAction(page, action, where) {
  const optional = action.optional === true;
  const miss = (what) => (optional ? console.log(`  · ${what} (opcional, se omite)`) : warn(`${where}: ${what}`));

  if (action.wait) {
    await page.waitForTimeout(action.wait);
    return;
  }

  if (action.click) {
    const button = page.getByRole('button', { name: action.click, exact: true });
    const target = (await button.count()) ? button : page.getByRole('link', { name: action.click, exact: true });
    if (!(await target.count())) return miss(`no hay botón "${action.click}"`);
    const visible = target.filter({ visible: true });
    const el = (await visible.count()) ? visible.first() : target.first();
    await el.scrollIntoViewIfNeeded().catch(() => {});
    await el.click({ timeout: 5000 }).catch((e) => miss(`no se pudo pulsar "${action.click}": ${e.message.split('\n')[0]}`));
    await page.waitForTimeout(DEFAULTS.actionMs);
    return;
  }

  if (action.fill) {
    const field = page.getByLabel(action.fill.label, { exact: true });
    if (!(await field.count())) return miss(`no hay campo "${action.fill.label}"`);
    await field.first().fill(action.fill.value);
    await page.waitForTimeout(DEFAULTS.actionMs);
    return;
  }

  if (action.scrollTo) {
    const heading = page.getByRole('heading', { name: action.scrollTo });
    const target = (await heading.count()) ? heading.first() : page.getByText(action.scrollTo, { exact: false }).first();
    if (!(await target.count())) return miss(`no se encuentra "${action.scrollTo}" para hacer scroll`);
    // scrollIntoView mueve también contenedores con scroll propio (layouts tipo app shell)
    await target.evaluate((el, offset) => {
      el.scrollIntoView({ block: 'start', behavior: 'instant' });
      let node = el.parentElement;
      while (node && node !== document.documentElement) {
        const { overflowY } = getComputedStyle(node);
        if (/(auto|scroll)/.test(overflowY) && node.scrollHeight > node.clientHeight) {
          node.scrollTop -= offset;
          return;
        }
        node = node.parentElement;
      }
      window.scrollBy(0, -offset);
    }, action.offset ?? DEFAULTS.scrollOffset);
    await page.waitForTimeout(DEFAULTS.actionMs);
    return;
  }

  warn(`${where}: acción no reconocida ${JSON.stringify(action)}`);
}

// ---------- Utilidades de página ----------

async function open(page, url) {
  const res = await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
  if (res && !res.ok()) warn(`${url} devolvió HTTP ${res.status()}`);
  await page.addStyleTag({ content: CLEAN_CSS });
  await page.waitForTimeout(DEFAULTS.settleMs);
}

async function tidy(page) {
  // Sin foco ni hover que ensucien la captura
  await page.evaluate(() => document.activeElement instanceof HTMLElement && document.activeElement.blur());
  await page.mouse.move(0, 0);
  await page.waitForTimeout(250);
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

// Layouts tipo "app shell" (sidebar + panel con overflow propio): el documento mide
// una pantalla y el scroll ocurre dentro de un elemento. Para la captura larga se
// despliegan esos contenedores para que el contenido fluya en la página.
async function expandInnerScroll(page) {
  return page.evaluate(() => {
    const root = document.documentElement;
    if (root.scrollHeight > window.innerHeight + 1) return false;
    const scrollers = [...document.body.querySelectorAll('*')].filter((el) => {
      const { overflowY } = getComputedStyle(el);
      return /(auto|scroll)/.test(overflowY) && el.scrollHeight > el.clientHeight + 1;
    });
    if (!scrollers.length) return false;
    const relax = (el) => {
      el.style.setProperty('height', 'auto', 'important');
      el.style.setProperty('max-height', 'none', 'important');
      el.style.setProperty('min-height', 'auto', 'important'); // min-h-0 colapsaría items flex
      el.style.setProperty('overflow', 'visible', 'important');
    };
    for (const el of scrollers) for (let n = el; n && n !== root; n = n.parentElement) relax(n);
    relax(root);
    return true;
  });
}

async function previousUrl(project, dir) {
  try {
    const { url } = JSON.parse(await readFile(path.join(dir, 'manifest.json'), 'utf8'));
    if (url) return url;
  } catch {}
  return project.urls.at(-1);
}

const toWebp = (buffer, file) => sharp(buffer).webp({ quality: 82 }).toFile(file);

const newContext = (browser, project, viewport, isMobile) =>
  browser.newContext({
    viewport,
    deviceScaleFactor: 2,
    isMobile,
    hasTouch: isMobile,
    colorScheme: project.colorScheme ?? 'dark',
    reducedMotion: 'no-preference',
  });

// ---------- Main ----------

await checkServers();
if (checkOnly) process.exit(0);

const browser = await chromium.launch();
const written = [];

try {
  for (const project of targets) {
    const dir = path.join(OUT_DIR, project.id);
    await mkdir(dir, { recursive: true });
    const manifest = {
      generatedAt: new Date().toISOString(),
      source: baseUrl(project),
      // URL pública que enlaza el catálogo. Con --local se conserva la que ya hubiera.
      url: useLocal ? await previousUrl(project, dir) : baseUrl(project),
      screens: [],
      mobile: '',
    };

    // Escritorio: una captura por pantalla, cada una en una página nueva
    const desktop = await newContext(browser, project, DEFAULTS.desktop, false);
    for (const [i, screen] of project.screens.entries()) {
      const n = i + 1;
      const url = `${baseUrl(project)}/${LANG}${screen.path}`;
      console.log(`→ ${project.id} · pantalla ${n}  ${url}`);
      const page = await desktop.newPage();
      await open(page, url);
      for (const action of screen.actions ?? []) await runAction(page, action, `${project.id} pantalla ${n}`);
      await tidy(page);
      const file = `${LANG}-desktop-screen-${n}.webp`;
      await toWebp(await page.screenshot(), path.join(dir, file));
      manifest.screens.push({ path: screen.path, image: `/projects/${project.id}/${file}` });
      written.push(path.join('public', 'projects', project.id, file));
      await page.close();
    }
    await desktop.close();

    // Móvil: primera pantalla + página larga
    const mobile = await newContext(browser, project, DEFAULTS.mobile, true);
    const mpage = await mobile.newPage();
    console.log(`→ ${project.id} · móvil`);
    await open(mpage, `${baseUrl(project)}/${LANG}`);
    await scrollThrough(mpage);
    await toWebp(await mpage.screenshot(), path.join(dir, `${LANG}-mobile-hero.webp`));
    if (await expandInnerScroll(mpage)) await mpage.waitForTimeout(300);
    const height = await mpage.evaluate(() => document.documentElement.scrollHeight);
    const full = await mpage.screenshot({
      fullPage: true,
      clip: { x: 0, y: 0, width: DEFAULTS.mobile.width, height: Math.min(height, MAX_FULL_HEIGHT) },
    });
    await toWebp(full, path.join(dir, `${LANG}-mobile-full.webp`));
    await mobile.close();
    manifest.mobile = `/projects/${project.id}/${LANG}-mobile-full.webp`;
    written.push(path.join('public', 'projects', project.id, `${LANG}-mobile-hero.webp`));
    written.push(path.join('public', 'projects', project.id, `${LANG}-mobile-full.webp`));

    await writeFile(path.join(dir, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  }
} finally {
  await browser.close();
}

console.log(`\nCapturas escritas (${written.length}):\n  ${written.join('\n  ')}`);
if (warnings.length) {
  console.warn(`\n⚠ ${warnings.length} aviso(s), revisa esas capturas:\n  - ${warnings.join('\n  - ')}`);
  process.exit(2);
}
console.log('\n✓ Listo, sin avisos.');
