import { getInformationAction } from "@/actions/information";
import ExperienceSection from "@/components/experience/ExperienceSection";
import Header from "@/components/header/Header";
import InformationSection from "@/components/information/InformationSection";
import PublicationsSection from "@/components/publications/PublicationsSection";
import SkillsSection from "@/components/skills/SkillsSection";
import { Lang } from "@/models/enums";

const Portfolio = async ({ params }: { params: { lang: Lang } }) => {
  const { lang } = await params;
  const dict = (await import(`@/messages/${lang}.json`)).default;
  const information = await getInformationAction(lang);

  return (
    <div className="min-h-screen bg-background">
      <Header dict={dict.nav} selectedLang={lang} />
      <main>
        <InformationSection information={information} dict={dict.info} />
        <SkillsSection />
        <ExperienceSection />
        <PublicationsSection />

        {/* Footer */}
        <footer className="py-8 border-t border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
              <p>
                &copy; {new Date().getFullYear()} JMMG.
                <span className="ms-2"> {dict.footer} </span>
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Portfolio;
