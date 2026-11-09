import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

const page = (path: string): MetadataRoute.Sitemap => {
  const languages = {
    en: `${SITE_URL}/en${path}`,
    es: `${SITE_URL}/es${path}`,
    "x-default": `${SITE_URL}/en${path}`,
  };
  return [
    { url: languages.en, lastModified: new Date(), alternates: { languages } },
    { url: languages.es, lastModified: new Date(), alternates: { languages } },
  ];
};

export default function sitemap(): MetadataRoute.Sitemap {
  return [...page(""), ...page("/cv")];
}
