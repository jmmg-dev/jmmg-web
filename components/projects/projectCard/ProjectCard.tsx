import { projectThemeVars, type Project } from "@/lib/projects";
import { Lang } from "@/models/enums";
import type { ProjectsDict } from "@/models/types";
import { ArrowUpRight, Github } from "lucide-react";
import { ScreenCarousel } from "../screenCarousel/ScreenCarousel";

type ProjectCardProps = {
  project: Project;
  lang: Lang;
  dict: ProjectsDict;
  index: number;
};

export const ProjectCard = ({ project, lang, dict, index }: ProjectCardProps) => {
  const reversed = index % 2 === 1;
  const number = String(index + 1).padStart(2, "0");
  const host = project.url ? new URL(project.url).host : project.id;

  const preview = (
    <div className="project-preview group relative">
      <div aria-hidden className="project-glow absolute -inset-8 rounded-[3rem] blur-3xl" />

      <div className="relative transition-transform duration-500 group-hover:-translate-y-1">
        <ScreenCarousel
          screens={project.screens}
          host={host}
          alt={`${project.name}: ${project.tagline[lang]}`}
          eager={index === 0}
        />
      </div>

      {/* Teléfono: hace scroll por la web al pasar el ratón */}
      <div className="project-phone absolute -bottom-8 right-4 hidden w-[21%] overflow-hidden sm:block lg:-right-6">
        <div className="relative aspect-[390/844] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.mobile}
            alt=""
            loading="lazy"
            decoding="async"
            className="project-scroll absolute inset-0 h-full w-full object-cover object-top"
          />
        </div>
      </div>
    </div>
  );

  return (
    <section
      id={project.id}
      aria-labelledby={`${project.id}-title`}
      className="project-section relative overflow-x-clip py-24 sm:py-28 lg:py-36"
      data-gradient={project.theme.textGradient ? "" : undefined}
      style={projectThemeVars(project)}
    >
      {/* Más ancho que el resto de la página para que la pantalla y el móvil se vean más grandes */}
      <div className="reveal mx-auto grid max-w-[76rem] items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-20 lg:px-8">
        <div className={`lg:col-span-8 ${reversed ? "lg:order-2" : ""}`}>
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${dict.visit}: ${project.name}`}
              className="project-link block"
            >
              {preview}
            </a>
          ) : (
            preview
          )}
        </div>

        <div className={`lg:col-span-4 ${reversed ? "lg:order-1" : ""}`}>
          <span className="project-number text-sm">{number} /</span>
          <h2 id={`${project.id}-title`} className="project-title mt-4">
            <span className="sr-only">{project.name}</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.logo.wordmark.src}
              width={project.logo.wordmark.width}
              height={project.logo.wordmark.height}
              alt=""
              loading="lazy"
              className="project-wordmark w-auto max-w-full"
            />
          </h2>
          <p className="project-tagline mt-3 text-lg font-semibold sm:text-xl">
            {project.tagline[lang]}
          </p>
          <p className="project-description mt-5 leading-relaxed">{project.description[lang]}</p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li key={tech} className="project-chip px-2.5 py-1 text-xs">
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {/* Siempre los dos botones; sin enlace se muestran desactivados ("Próximamente") */}
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-btn project-btn-primary"
              >
                {dict.visit}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            ) : (
              <span
                aria-disabled="true"
                title={dict.comingSoon}
                className="project-btn project-btn-primary cursor-not-allowed opacity-50"
              >
                {dict.visit}
                <ArrowUpRight className="h-4 w-4" />
              </span>
            )}
            {project.repo ? (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="project-btn project-btn-ghost"
              >
                {dict.code}
                <Github className="h-4 w-4" />
              </a>
            ) : (
              <span
                aria-disabled="true"
                title={dict.comingSoon}
                className="project-btn project-btn-ghost cursor-not-allowed opacity-50"
              >
                {dict.code}
                <Github className="h-4 w-4" />
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
