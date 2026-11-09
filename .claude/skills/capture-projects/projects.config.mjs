// Qué se captura de cada proyecto para el catálogo de jmmg.dev.
//
// `urls`: direcciones de la web publicada, por orden de preferencia. Se usa la primera
// que responda y cuya página contenga el texto `expect` (así un dominio recién comprado
// con página de aparcamiento no cuenta). Esa URL se guarda en manifest.json y es la que
// enlaza el catálogo: cuando el dominio definitivo esté activo, basta con volver a
// capturar. `localUrl` se usa con --local, para cambios aún no desplegados.
//
// Cada pantalla de `screens` es una ruta (sin el prefijo de idioma) y, opcionalmente,
// una lista de `actions` que se ejecutan antes de la captura, en orden:
//
//   { click: 'Example' }                  pulsa el botón con ese texto accesible (exacto)
//   { click: 'Run', optional: true }      igual, pero si no existe solo avisa
//   { scrollTo: 'Interactive playground' } lleva ese encabezado (o texto) arriba del todo
//   { fill: { label: 'Pattern', value: '^\\d+$' } }  rellena un campo por su etiqueta
//   { wait: 800 }                         espera en milisegundos
//
// Todas las acciones fallan "en blando": si algo no se encuentra, el script lo avisa,
// sigue y termina con código 2 para que se revise esa captura.

export const DEFAULTS = {
  lang: 'en',
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
  /** Pausa tras cargar cada página, para animaciones de entrada. */
  settleMs: 1500,
  /** Pausa tras cada acción, para que se pinte el resultado. */
  actionMs: 700,
  /** Altura de la cabecera fija que queda por encima al hacer scrollTo. */
  scrollOffset: 80,
};

export const PROJECTS = [
  {
    id: 'kitforweb',
    urls: ['https://kitforweb.com'],
    expect: 'kitforweb',
    localUrl: 'http://localhost:5000',
    screens: [
      { path: '' },
      { path: '/json-to-typescript', actions: [{ click: 'Example' }] },
      { path: '/jwt-decoder', actions: [{ click: 'Example' }] },
      { path: '/regex-builder', actions: [{ click: 'Example' }] },
    ],
  },
  {
    id: 'playrxjs',
    urls: ['https://playrxjs.com', 'https://play-rxjs.vercel.app'],
    expect: 'Play RxJS',
    localUrl: 'http://localhost:4200',
    screens: [
      { path: '' },
      { path: '/operators/combination' },
      { path: '/operators/combination/combineLatest' },
      {
        // El playground con el código del ejemplo, ya ejecutado.
        // El ejemplo emite durante ~5 s; se espera a que la consola esté completa.
        path: '/operators/combination/combineLatest',
        actions: [
          { scrollTo: 'Interactive playground' },
          { click: 'Run' },
          { wait: 5500 },
        ],
      },
    ],
  },
  {
    id: 'css-layout-lab',
    urls: ['https://csslayoutlab.com', 'https://css-layout-lab-pearl.vercel.app'],
    expect: 'CSS Layout Lab',
    localUrl: 'http://localhost:3000',
    colorScheme: 'light',
    screens: [{ path: '' }, { path: '/flex' }, { path: '/grid' }, { path: '/grid/grid-template-areas' }],
  },
];
