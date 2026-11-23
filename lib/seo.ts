import { GITHUB_ORG, SITE_URL } from "@/lib/constants";
import { Lang } from "@/models/enums";
import type { Information, PageSeo } from "@/models/interfaces";
import type { Metadata } from "next";

/** Language used for x-default and as the site's main language */
export const DEFAULT_LANG = Lang.en;
const LANGS = Object.values(Lang);

/** Region codes for hreflang and og:locale */
const LOCALES: Record<Lang, { hreflang: string; og: string }> = {
  [Lang.en]: { hreflang: "en-US", og: "en_US" },
  [Lang.es]: { hreflang: "es-ES", og: "es_ES" },
};

/**
 * Metadata of a page in one language: title, description, canonical URL, hreflang for every
 * language plus x-default, Open Graph and Twitter card. Built from the language list, so adding
 * a language needs no changes here. The social image comes from app/[lang]/opengraph-image.tsx.
 *
 * @param path Path after the language, e.g. "" for the home page or "/cv"
 */
export const pageMetadata = (
  lang: Lang,
  path: string,
  seo: PageSeo,
  siteName: string,
): Metadata => {
  const url = `/${lang}${path}`;
  const languages = Object.fromEntries(
    LANGS.map((l) => [LOCALES[l].hreflang, `/${l}${path}`]),
  );

  return {
    metadataBase: new URL(SITE_URL),
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: url,
      languages: { ...languages, "x-default": `/${DEFAULT_LANG}${path}` },
    },
    openGraph: {
      type: "website",
      url,
      siteName,
      title: seo.title,
      description: seo.description,
      locale: LOCALES[lang].og,
      alternateLocale: LANGS.filter((l) => l !== lang).map(
        (l) => LOCALES[l].og,
      ),
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },
  };
};

// ---------- Structured data (JSON-LD) ----------

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const person = (data: Information) => ({
  "@type": "Person",
  "@id": PERSON_ID,
  name: data.personalInfo.name,
  jobTitle: data.personalInfo.position,
  url: SITE_URL,
  sameAs: [data.personalInfo.urlIn, GITHUB_ORG],
  address: {
    "@type": "PostalAddress",
    addressLocality: data.personalInfo.city,
    addressCountry: "ES",
  },
  knowsAbout: [
    "Software architecture",
    "Front End architecture",
    "UX/UI",
    "Angular",
    "React",
    "Next.js",
    "TypeScript",
  ],
});

/** Home page: the website and its author */
export const homeJsonLd = (lang: Lang, data: Information) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_URL,
      name: data.seo.siteName,
      description: data.seo.home.description,
      inLanguage: LOCALES[lang].hreflang,
      publisher: { "@id": PERSON_ID },
    },
    person(data),
  ],
});

/** CV page: a profile page about its author */
export const cvJsonLd = (lang: Lang, data: Information) => ({
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: `${SITE_URL}/${lang}/cv`,
  name: data.seo.cv.title,
  description: data.seo.cv.description,
  inLanguage: LOCALES[lang].hreflang,
  isPartOf: { "@type": "WebSite", "@id": WEBSITE_ID, url: SITE_URL },
  mainEntity: person(data),
});
