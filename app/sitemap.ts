import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = {
    en: `${SITE_URL}/en`,
    es: `${SITE_URL}/es`,
  };

  return [
    {
      url: languages.en,
      lastModified: new Date(),
      alternates: { languages },
    },
    {
      url: languages.es,
      lastModified: new Date(),
      alternates: { languages },
    },
  ];
}
