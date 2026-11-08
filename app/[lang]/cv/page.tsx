import { getInformationAction } from "@/actions/information";
import ExperienceSection from "@/components/experience/ExperienceSection";
import { Footer } from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import InformationSection from "@/components/information/InformationSection";
import PublicationsSection from "@/components/publications/PublicationsSection";
import SkillsSection from "@/components/skills/SkillsSection";
import { Lang } from "@/models/enums";
import { Metadata } from "next";

type Props = {
  params: Promise<{ lang: Lang }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === Lang.es;
  const title = isEs
    ? "CV | Juan Manuel Muñoz González, Arquitecto Front End"
    : "CV | Juan Manuel Muñoz González, Front End Architect";

  return {
    title,
    openGraph: { title },
    alternates: {
      canonical: `/${lang}/cv`,
      languages: { "es-ES": "/es/cv", "en-US": "/en/cv" },
    },
  };
}

const CvPage = async ({ params }: Props) => {
  const { lang } = await params;
  const data = await getInformationAction(lang);

  return (
    <div className="min-h-screen bg-background">
      <Header dict={data.nav} selectedLang={lang} page="cv" />
      <main>
        <InformationSection information={data} dict={data.info} />
        <SkillsSection title={data.nav.skills} dict={data.skills} />
        <ExperienceSection
          title={data.nav.experience}
          currentlyLabel={data.experience.currently}
          lang={lang}
        />
        <PublicationsSection
          title={data.nav.publications}
          intro={data.publications.intro}
          lang={lang}
        />
        <Footer text={data.footer} />
      </main>
    </div>
  );
};

export default CvPage;
