# JMMG.dev

Personal portfolio of Juan Manuel Muñoz González, Front End Architect. A bilingual Next.js site with a full-screen animated showcase, a catalog of personal projects and an online CV.

Live site: [jmmg.dev](https://jmmg.dev)

---

## Features

### Home

- **Full-screen carousel** with an intro and one section per discipline (Architecture, Development, UX/UI and AI). Each section combines animated scenes and screenshots, can be paused, and has a dedicated mobile layout.
- **Project catalog** for kitforweb, Play RxJS and CSS Layout Lab. Every section takes the colours and typefaces of its own website, with a browser window cycling through real screens and a phone preview that scrolls the mobile version.
- **Build animation**: an SVG castle assembled brick by brick, played once when it enters the viewport.

### CV

- Profile, career summary, education and professional milestones.
- Technical, business and language skills, with a professional growth chart.
- Experience timeline with technologies and projects per company.
- Downloadable PDF version.

### Across the site

- **Bilingual (English and Spanish)**, server-rendered from one JSON file per language. The selected language is kept in a cookie.
- **Light and dark themes**, persisted in a cookie.
- **SEO per language**: canonical URLs, `hreflang` alternates with `x-default`, Open Graph and Twitter metadata, `sitemap.xml` and `robots.txt`.
- **Reduced motion support**: every animation has a static fallback.

## Projects

Personal projects featured in the catalog, built for the developer community.

| Project            | Description                                                                                                                         | Website                                          | Source                                               |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ---------------------------------------------------- |
| **kitforweb**      | Online toolkit with the everyday utilities developers need, running entirely in the browser so data never leaves the user's machine | [kitforweb.com](https://kitforweb.com)           | [GitHub](https://github.com/jmmg-dev/kitforweb)      |
| **Play RxJS**      | Interactive, visual RxJS documentation with editable examples that run in real time                                                 | [playrxjs.com](https://playrxjs.com)             | [GitHub](https://github.com/jmmg-dev/play-rxjs)      |
| **CSS Layout Lab** | Interactive lab to master CSS layouts, from block and inline to flexbox and grid                                                    | [css-layout-lab.com](https://css-layout-lab.com) | [GitHub](https://github.com/jmmg-dev/css-layout-lab) |

## Tech stack

| Area      | Technology                                                                                                                   |
| --------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Framework | [Next.js 16](https://nextjs.org/) (App Router, Turbopack)                                                                    |
| Library   | [React 19](https://react.dev/)                                                                                               |
| Language  | [TypeScript 5.7](https://www.typescriptlang.org/)                                                                            |
| Styling   | [Tailwind CSS 4](https://tailwindcss.com/) with OKLCH design tokens                                                          |
| Charts    | [Recharts](https://recharts.org/)                                                                                            |
| Icons     | [lucide-react](https://lucide.dev/)                                                                                          |
| Analytics | [Vercel Analytics](https://vercel.com/analytics)                                                                             |
| Tooling   | [Playwright](https://playwright.dev/) and [sharp](https://sharp.pixelplumbing.com/), used to capture the project screenshots |

## Getting started

Requirements: Node.js 20.9 or later.

```bash
npm install
npm run dev
```

The site runs at [http://localhost:3000](http://localhost:3000) and redirects to `/en` or `/es` depending on the last language used.

### Scripts

| Script          | Description                   |
| --------------- | ----------------------------- |
| `npm run dev`   | Starts the development server |
| `npm run build` | Creates the production build  |
| `npm run start` | Serves the production build   |

## Content and translations

All page copy lives in one file per language:

```
public/information/en.json
public/information/es.json
```

Both files are read on the server from the `[lang]` route segment, so every page is rendered already translated, without client-side language state. Experience, skills and publications are defined in `lib/data.ts`, and the project catalog in `lib/projects.ts`, using inline `{ en, es }` pairs.

## Project screenshots

The screens shown in the project catalog are captures of each live website, taken with Playwright by the `capture-projects` skill (`.claude/skills/capture-projects`). The skill writes the images and a `manifest.json` per project to `public/images/projects/`, and `lib/projects.ts` reads the screens, the mobile capture and the public URL from those manifests. The captured screens are configured in `.claude/skills/capture-projects/projects.config.mjs`.

## Project structure

```
app/
  [lang]/              Localized routes (en, es)
    page.tsx           Home: carousel and project catalog
    cv/page.tsx        CV
    layout.tsx         Metadata, canonical URLs and hreflang per language
  sitemap.ts           Sitemap with language alternates
  robots.ts            robots.txt
  theme/               Theme provider
  layout.tsx           Root layout

components/
  hero/                Home carousel
  projects/            Project catalog, previews and build animation
  header/              Navigation, language and theme controls
  footer/              Footer
  information/         CV profile, career, education, milestones and hobbies
  skills/              Skills and growth chart
  experience/          Experience timeline
  publications/        Publications (currently hidden)

lib/                   Content data, projects, fonts, constants and theme context
models/                Shared TypeScript types
middleware.ts          Language redirect and cookies
styles/                Tailwind CSS setup, design tokens and animations

public/
  images/              Carousel, project captures, logos and CV images
  information/         Translations (en.json, es.json)

design/                Source material that is not deployed
```

## License

This is the code of a personal portfolio. It may be used as a structural reference, but its content and personal branding may not be reused.

## Contact

Juan Manuel Muñoz González · [LinkedIn](https://www.linkedin.com/in/juan-manuel-mu%C3%B1oz-gonz%C3%A1lez/) · [GitHub](https://github.com/jmmg-dev)
