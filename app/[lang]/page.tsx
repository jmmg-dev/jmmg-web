import { getInformationAction } from "@/actions/information";
import ExperienceSection from "@/components/experience/ExperienceSection";
import Header from "@/components/header/Header";
import InformationSection from "@/components/information/InformationSection";
import PublicationsSection from "@/components/publications/PublicationsSection";
import SkillsSection from "@/components/skills/SkillsSection";
import { Lang } from "@/models/enums";

const Portfolio = async ({ params }: { params: { lang: Lang } }) => {
  const { lang } = await params;
  const data = await getInformationAction(lang);

  return (
    <div className="min-h-screen bg-background">
      <Header dict={data.nav} selectedLang={lang} />
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

        {/* Footer */}
        <footer className="py-8 border-t border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
              <p>
                &copy; {new Date().getFullYear()} JMMG.
                <span className="ms-2"> {data.footer} </span>
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Portfolio;
