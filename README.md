<div align="center">

# Juan Manuel Muñoz González — Portfolio

### Front End Architect · Micro-frontends · AI-assisted Development

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel&logoColor=white)](https://vercel.com/)

A bilingual, fully responsive personal portfolio built with the Next.js App Router — showcasing 20 years of Front End architecture experience, technical skills, professional history, and community publications.

</div>

---

## ✨ Features

- 🌐 **Bilingual (EN/ES)** — every string, label, and piece of content is server-rendered in the correct locale from a single JSON source per language, no client-side flash of untranslated content.
- 🎨 **Light & dark themes** — cookie-persisted, with a tailored neon accent palette per theme.
- 📊 **Interactive skills dashboard** — technical skills grouped by ecosystem (Angular, React, Architecture, AI tooling...), business skills, languages, and a Recharts-powered professional growth chart.
- 🧭 **Animated hero & scroll progress bar** — a staggered entrance animation on load and a slim progress indicator in the header as you scroll.
- 🗂️ **Experience timeline** — alternating timeline layout with per-company technologies, projects, and role descriptions.
- 📰 **Publications grid** — community articles and open-source projects, each linking out to its live demo.
- 📄 **Downloadable CV** — ATS-friendly PDF, one click away from the hero section.
- 📱 **Fully responsive** — every section has been tuned down to mobile breakpoints, not just scaled down from desktop.

## 🏗️ Tech Stack

| Layer | Choice |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| UI | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) with custom OKLCH design tokens |
| Charts | [Recharts](https://recharts.org/) |
| Icons | [lucide-react](https://lucide.dev/) |
| Analytics | [Vercel Analytics](https://vercel.com/analytics) |

## 📁 Project Structure

```
app/
  [lang]/            Localized routes — en/es, dynamic segment
    page.tsx          Assembles the whole page from a single content fetch
    layout.tsx         Per-locale metadata (title, OG, Twitter cards)
  theme/              ThemeProviders (light/dark context)
  icon.png            Favicon (App Router metadata convention)
  layout.tsx          Root HTML shell

components/
  header/             Nav, language & theme toggles, scroll progress bar
  information/        Hero, career, degrees, milestones, hobbies
  skills/             Technical/business/language skills + growth chart
  experience/         Timeline of professional experience
  publications/       Articles & open-source projects grid
  icon/               Dynamic lucide icon loader

lib/                  Static content data (experience, skills, publications) & theme context
models/               Shared TypeScript interfaces & types

public/
  images/             Optimized WebP assets
  information/        🌍 en.json / es.json — single source of truth per language

styles/               Tailwind v4 config + custom theme tokens
```

## 🌍 Content & Translations

All page copy — navigation labels, section headings, personal info, career summary, degrees, milestones, and hobbies — lives in **one file per language**:

```
public/information/en.json
public/information/es.json
```

These are fetched server-side based on the `[lang]` route segment, so every section renders already translated — no client-side locale state, no flash of the wrong language. Experience, skills, and publications data (which is more code-adjacent) lives in `lib/data.ts`, with inline `{ en, es }` pairs per field.

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run the development server (Turbopack)
npm run dev

# Build for production
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/en` or `/es`.

## 📄 License

This project is personal portfolio code. Feel free to use it as a structural reference, but please don't reuse the content or personal branding as your own.

---

<div align="center">

Built with ❤️ by **Juan Manuel Muñoz González** — [LinkedIn](https://www.linkedin.com/in/juan-manuel-mu%C3%B1oz-gonz%C3%A1lez/)

</div>
