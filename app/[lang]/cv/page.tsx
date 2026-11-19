import { getInformationAction } from "@/actions/information";
import ExperienceSection from "@/components/experience/ExperienceSection";
import { Footer } from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import InformationSection from "@/components/information/InformationSection";
// Publications hidden for now; uncomment this import and the section below to show them again
// import PublicationsSection from "@/components/publications/PublicationsSection";
import { JsonLd } from "@/components/seo/JsonLd";
import SkillsSection from "@/components/skills/SkillsSection";
import { cvJsonLd, pageMetadata } from "@/lib/seo";
import { Lang } from "@/models/enums";
import { Metadata } from "next";

type Props = {
  params: Promise<{ lang: Lang }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const { seo } = await getInformationAction(lang);
  return pageMetadata(lang, "/cv", seo.cv, seo.siteName);
}

const CvPage = async ({ params }: Props) => {
  const { lang } = await params;
  const data = await getInformationAction(lang);

  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={cvJsonLd(lang, data)} />
      <Header dict={data.nav} selectedLang={lang} page="cv" />
      <main>
        <InformationSection information={data} dict={data.info} />
        <SkillsSection title={data.nav.skills} dict={data.skills} />
        <ExperienceSection
          title={data.nav.experience}
          currentlyLabel={data.experience.currently}
          lang={lang}
        />
        {/* Publications hidden for now (also its link in the header)
        <PublicationsSection
          title={data.nav.publications}
          intro={data.publications.intro}
          lang={lang}
        />
        */}
        <Footer lang={lang} data={data} />
      </main>
    </div>
  );
};

export default CvPage;
