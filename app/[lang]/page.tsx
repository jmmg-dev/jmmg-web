import { getInformationAction } from "@/actions/information";
import { Footer } from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { HeroCarousel } from "@/components/hero/HeroCarousel";
import { BrickWall } from "@/components/projects/brickWall/BrickWall";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { projectFontVariables } from "@/lib/fonts";
import { PROJECTS } from "@/lib/projects";
import { homeJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Lang } from "@/models/enums";
import { GITHUB_ORG } from "@/lib/constants";
import { ArrowRight, Github, Linkedin } from "lucide-react";
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
      <JsonLd data={homeJsonLd(lang, data)} />
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
                  className="h-20 w-20 shrink-0 rounded-full object-cover ring-2 ring-primary/40 ring-offset-2 ring-offset-background grayscale sm:h-24 sm:w-24"
                />
                {/* Name and role, with the CV and GitHub tiles to their right (below them if there is no room).
                    Both have the height, border and corners of the GitHub tile in the carousel. */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                  <div>
                    <p className="font-semibold text-foreground">
                      {data.personalInfo.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {data.info.hero.frontEndArchitect}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {/* LinkedIn, icon only, filled with the theme colour like in the carousel */}
                    <a
                      href={data.personalInfo.urlIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      title="LinkedIn"
                      className="grid h-16 w-16 sm:h-18 sm:w-18 place-items-center rounded-[22%] border border-primary bg-primary text-primary-foreground transition-[opacity,transform] hover:-translate-y-0.5 hover:scale-105 hover:opacity-90"
                    >
                      <Linkedin aria-hidden className="h-[45%] w-[45%]" />
                    </a>
                    {/* "CV" with the arrow below, in a square like the LinkedIn and GitHub tiles */}
                    <Link
                      href={`/${lang}/cv`}
                      aria-label={dict.viewCv}
                      title={dict.viewCv}
                      className="group flex h-16 w-16 sm:h-18 sm:w-18 flex-col items-center justify-center rounded-[22%] border border-border font-mono text-base font-bold leading-none text-foreground transition-[color,border-color,transform] hover:-translate-y-0.5 hover:border-primary hover:text-primary"
                    >
                      CV
                      <ArrowRight
                        aria-hidden
                        className="mt-1 h-5 w-5 transition-transform group-hover:translate-x-0.5"
                      />
                    </Link>
                    <a
                      href={GITHUB_ORG}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      title="GitHub"
                      className="grid h-16 w-16 sm:h-18 sm:w-18 place-items-center rounded-[22%] border border-border text-foreground transition-[color,border-color,transform] hover:-translate-y-0.5 hover:scale-105 hover:border-primary hover:text-primary"
                    >
                      <Github aria-hidden className="h-[55%] w-[55%]" />
                    </a>
                  </div>
                </div>
              </div>
              {/* Linked logos of my websites, with a wall being built next to them */}
              <div className="mt-3 flex items-end gap-6 sm:mt-1">
                <ul className="flex gap-2">
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
                <BrickWall className="hidden h-24 min-w-0 flex-1 sm:block" />
              </div>
            </div>
            <div className="lg:col-span-5 lg:pt-10">
              <p className="text-lg leading-relaxed text-muted-foreground">
                {dict.intro}
              </p>
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
