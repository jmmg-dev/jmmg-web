import { getInformationAction } from "@/actions/information";
import { pageMetadata } from "@/lib/seo";
import { Lang } from "@/models/enums";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ lang: string }>;
};

/**
 * Only "en" and "es" are languages. Any other first segment (e.g. /llms.txt, which skips the
 * middleware because of the dot) is a 404 instead of failing to read its translation file.
 */
const isLang = (value: string): value is Lang =>
  (Object.values(Lang) as string[]).includes(value);

/** Home page metadata (and the defaults inherited by the other pages), in the route's language */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const { seo, personalInfo } = await getInformationAction(lang);

  return {
    ...pageMetadata(lang, "", seo.home, seo.siteName),
    authors: [{ name: personalInfo.name, url: personalInfo.urlIn }],
    creator: personalInfo.name,
    robots: {
      index: true,
      follow: true,
    },
    verification: {
      google: "M42-CWYHkJsp3HGRXlv_ynK4N46oRi8Y6txTAqY311k",
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return <>{children}</>;
}
