---
name: capture-projects
description: Regenerate the screenshots of Juanma's projects (kitforweb, Play RxJS, CSS Layout Lab) shown in the portfolio catalog, with example data loaded, then review them visually. Use when asked to redo, update or add project captures, screenshots or catalog images, or to add a new project or screen to the catalog.
allowed-tools: Bash(node:*), Bash(npm:*), Bash(npx:*), Read, Edit, Write, Glob
---

# Capturas de proyectos para el catálogo

El catálogo de `/[lang]` muestra, para cada proyecto, un navegador que pasa por varias
pantallas de su web y un teléfono que hace scroll. Este skill regenera esas imágenes con
Playwright y comprueba que salen con datos de ejemplo, no vacías.

## Archivos

| Archivo | Qué es |
|---|---|
| `.claude/skills/capture-projects/projects.config.mjs` | Qué pantallas se capturan de cada proyecto y qué acciones se hacen antes (pulsar **Example**, hacer scroll al código, pulsar **Run**…). **Es lo único que se edita para cambiar las capturas.** |
| `.claude/skills/capture-projects/scripts/capture.mjs` | El script. No hace falta tocarlo. |
| `public/projects/<id>/` | Salida: `en-desktop-screen-<n>.webp`, `en-mobile-hero.webp`, `en-mobile-full.webp` y `manifest.json`. |
| `lib/projects.ts` | Textos y tema visual de cada proyecto. Lee de `manifest.json` las pantallas, el móvil y la URL pública, así que **no hay que tocarlo al cambiar pantallas ni al activar un dominio**, solo al añadir un proyecto nuevo. |

## Procedimiento

Trabaja siempre desde la raíz del repo (`portfolio-next`).

1. **Requisitos.** Comprueba que `playwright` y `sharp` están en `devDependencies` de
   `package.json`. Si falta alguno: `npm i -D playwright sharp`. Si Playwright no tiene
   navegador, `npx playwright install chromium` (solo la primera vez en el equipo).

2. **Origen.** Por defecto se captura de las webs publicadas: de cada proyecto se usa la
   primera de sus `urls` que sirva la web de verdad (el dominio definitivo si ya está
   activo, si no la de Vercel), y esa URL pasa a ser el enlace del catálogo. Usa
   `--local` solo si el usuario quiere capturar cambios no desplegados; entonces los
   proyectos tienen que estar levantados en los `localUrl` (kitforweb `:5000`,
   Play RxJS `:4200`, CSS Layout Lab `:3000`), idealmente en modo producción.

3. **Comprobar que responden:**
   ```
   node .claude/skills/capture-projects/scripts/capture.mjs --check [--local]
   ```
   Muestra qué URL se usará para cada proyecto y qué candidatas se descartaron y por
   qué. Si alguno no responde en ninguna, para y díselo al usuario; no captures a medias.

4. **Capturar.** Todos, o solo los proyectos indicados por su `id`:
   ```
   node .claude/skills/capture-projects/scripts/capture.mjs [kitforweb playrxjs] [--local]
   ```
   Códigos de salida: `0` todo bien · `1` error (servidor caído, fallo de Playwright) ·
   `2` capturas hechas pero alguna acción no encontró su botón o encabezado. Con `2`, el
   final de la salida lista qué falló.

5. **Revisar cada imagen generada.** No des el trabajo por bueno sin mirarlas. Si la
   herramienta Read no muestra `.webp`, conviértelas antes a PNG en una carpeta temporal
   fuera del repo, por ejemplo:
   ```
   node -e "const s=require('sharp');s('public/projects/kitforweb/en-desktop-screen-2.webp').resize({width:1000}).png().toFile(require('os').tmpdir()+'/kfw-2.png')"
   ```
   Criterios:
   - **kitforweb, pantallas 2-4** (JSON to TypeScript, JWT Decoder, Regex Builder): la
     entrada y el resultado tienen datos de ejemplo. Un panel con "Paste or type
     something…" o el editor vacío es un fallo.
   - **Play RxJS, pantalla 4**: se ve el playground con el código del ejemplo **y** la
     consola con varias emisiones. Si la consola está vacía o a medias, sube el `wait`
     después de `Run`.
   - **Todas**: sin banners de cookies, spinners, overlays de error ni indicadores de
     desarrollo; el contenido principal ocupa la pantalla y no queda cortado por la
     cabecera fija.
   - **Móvil** (`en-mobile-full.webp`): es una página larga, no una sola pantalla.

6. **Si una captura no vale**, ajusta sus `actions` en `projects.config.mjs` y vuelve a
   capturar **solo ese proyecto**. Acciones disponibles (detalle en la cabecera del
   archivo): `click`, `scrollTo`, `fill`, `wait`. Para descubrir el texto exacto de un
   botón o encabezado, abre la página en un navegador o pide al usuario que lo mire.
   Máximo tres intentos por pantalla; si sigue mal, explica qué ves y pregunta.

7. **Comprobar el catálogo.** Ejecuta `npx tsc --noEmit` (ignora el error preexistente
   de `components/ui/form.tsx`, que es ajeno). Si el usuario tiene el portfolio en marcha
   con `npm run dev`, dile que lo revise en `/en`.

8. **Informar** en pocas líneas: qué proyectos se recapturaron, desde qué URL (y si
   alguno ha pasado a su dominio definitivo), avisos del script y cualquier captura que
   no haya quedado bien. No hagas commit salvo que el usuario lo pida.

## Añadir una pantalla o un proyecto

- **Pantalla nueva o distinta:** edita solo `screens` en `projects.config.mjs` y recaptura
  ese proyecto. El `manifest.json` nuevo actualiza el catálogo solo.
- **Proyecto nuevo:**
  1. Añádelo a `PROJECTS` en `projects.config.mjs` (`id`, `urls` en orden de
     preferencia, `expect` con un texto que solo esté en esa web, `localUrl`, `screens`,
     y `colorScheme: 'light'` si la web es clara).
  2. Captúralo.
  3. Añade su entrada en `lib/projects.ts`: `name`, `url`, `repo`, `tagline` y
     `description` en `en` y `es`, `stack`, `theme` (sácalo de los estilos reales de la
     web: fondo, colores, tipografías, radios) y `...fromManifest(<manifest importado>)`.
     Si usa una tipografía nueva, añádela en `lib/fonts.ts`.
  4. Comprueba con `npx tsc --noEmit` y revisa el resultado como en el paso 5.

## Dominios

Play RxJS y CSS Layout Lab tendrán `playrxjs.com` y `csslayoutlab.com`. Ya están
configurados como primera opción en `urls`, así que no hay que tocar nada: la primera
captura después de que estén activos los usará y el catálogo enlazará a ellos. Si el
usuario pregunta si ya han cambiado, ejecuta `--check` y mira qué URL se elige.
