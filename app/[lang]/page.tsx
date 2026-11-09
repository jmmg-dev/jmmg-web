import { getInformationAction } from "@/actions/information";
import { Footer } from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { HeroCarousel } from "@/components/hero/HeroCarousel";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { projectFontVariables } from "@/lib/fonts";
import { PROJECTS } from "@/lib/projects";
import { Lang } from "@/models/enums";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  params: Promise<{ lang: Lang }>;
};

const ProjectsPage = async ({ params }: Props) => {
  const { lang } = await params;
  const data = await getInformationAction(lang);
  const dict = data.projects;
  // My websites, linked next to the description (falls back to the repository when there is no site)
  const projectLinks = PROJECTS.flatMap((p) => {
    const href = p.url ?? p.repo;
    return href ? [{ ...p, href }] : [];
  });

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
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-balance sm:text-5xl">
                {dict.title}
              </h1>
              {/* Photo, name and link to the CV */}
              <div className="mt-8 flex items-center justify-center gap-5 sm:justify-start">
                <Image
                  src="/images/photo.webp"
                  alt={data.personalInfo.name}
                  width={112}
                  height={112}
                  className="h-24 w-24 shrink-0 rounded-full object-cover ring-2 ring-primary/40 ring-offset-2 ring-offset-background grayscale sm:h-28 sm:w-28"
                />
                <div>
                  <p className="font-semibold text-foreground">{data.personalInfo.name}</p>
                  <p className="text-sm text-muted-foreground">{data.info.hero.frontEndArchitect}</p>
                  <Link
                    href={`/${lang}/cv`}
                    className="group mt-3 inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-4 py-2 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
                  >
                    {dict.viewCv}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 lg:pt-10">
              {/* Linked logos of my websites */}
              <ul className="mb-6 flex gap-8 sm:gap-4">
                {projectLinks.map((p) => (
                  <li key={p.id}>
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={p.name}
                      title={p.name}
                      className="block transition-transform hover:-translate-y-0.5 hover:scale-105"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.logo.icon.src}
                        alt=""
                        width={72}
                        height={72}
                        className={`h-16 w-16 object-cover sm:h-18 sm:w-18 ${p.logo.icon.crop ? "object-left" : ""}`}
                      />
                    </a>
                  </li>
                ))}
              </ul>
              <p className="text-lg leading-relaxed text-muted-foreground">{dict.intro}</p>
            </div>
          </div>
        </section>

        <ProjectsSection lang={lang} dict={dict} />
        <Footer lang={lang} data={data} />
      </main>
    </div>
  );
};

export default ProjectsPage;
