import { getInformationAction } from "@/actions/information";
import { Footer } from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { HeroCarousel } from "@/components/hero/HeroCarousel";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { projectFontVariables } from "@/lib/fonts";
import { Lang } from "@/models/enums";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

type Props = {
  params: Promise<{ lang: Lang }>;
};

const ProjectsPage = async ({ params }: Props) => {
  const { lang } = await params;
  const data = await getInformationAction(lang);
  const dict = data.projects;

  return (
    <div className={`min-h-screen bg-background ${projectFontVariables}`}>
      <Header dict={data.nav} selectedLang={lang} page="projects" hideAtTop />
      <main>
        <HeroCarousel
          lang={lang}
          dict={data.hero}
          linkedin={data.personalInfo.urlIn}
          email={data.personalInfo.email}
          controls={{ pause: dict.pause, play: dict.play }}
        />

        <section className="relative overflow-hidden py-24 sm:py-32">
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-[420px] opacity-50 [background:radial-gradient(50%_60%_at_50%_0%,var(--neon),transparent_70%)] [mask-image:linear-gradient(to_bottom,black,transparent)] dark:opacity-20"
          />
          <div className="reveal relative mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
            <div className="lg:col-span-7">
              <p className="font-mono text-sm uppercase tracking-widest text-primary">
                {dict.eyebrow}
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-balance sm:text-6xl">
                {dict.title}
              </h1>
            </div>
            <div className="lg:col-span-5 lg:pt-10">
              <p className="text-lg leading-relaxed text-muted-foreground">{dict.intro}</p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <div className="text-sm">
                  <p className="font-semibold text-foreground">{data.personalInfo.name}</p>
                  <p className="text-muted-foreground">{data.info.hero.frontEndArchitect}</p>
                </div>
                <Link
                  href={`/${lang}/cv`}
                  className="group inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
                >
                  {dict.viewCv}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <ProjectsSection lang={lang} dict={dict} />
        <Footer text={data.footer} />
      </main>
    </div>
  );
};

export default ProjectsPage;
