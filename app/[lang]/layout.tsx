import { getInformationAction } from "@/actions/information";
import { pageMetadata } from "@/lib/seo";
import { Lang } from "@/models/enums";
import { Metadata } from "next";

type Props = {
  params: Promise<{ lang: Lang }>;
};

/** Home page metadata (and the defaults inherited by the other pages), in the route's language */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
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
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
