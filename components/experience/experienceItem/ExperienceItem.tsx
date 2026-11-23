import type { experiences } from "@/lib/data";
import type { Lang } from "@/models/enums";
import { UserRound, Calendar } from "lucide-react";
import { CompanyLogo } from "../companyLogo/CompanyLogo";

type Experience = (typeof experiences)[number];

type ExperienceItemProps = {
  experience: Experience;
  isEven: boolean;
  lang: Lang;
  currentlyLabel: string;
};

export const ExperienceItem = ({
  experience,
  isEven,
  lang,
  currentlyLabel,
}: ExperienceItemProps) => {
  const displayEndDate = experience.endDate || currentlyLabel;

  return (
    <div
      className={`relative flex flex-col gap-8 md:flex-row ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Timeline Dot */}
      <div className="neon-glow absolute top-0 left-0 hidden h-4 w-4 transform rounded-full border-4 border-background bg-primary md:left-1/2 md:block md:-translate-x-1/2" />

      {/* Date Column */}
      <div
        className={`md:w-1/2 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"}`}
      >
        <div
          className={`mb-4 flex items-center gap-2 text-muted-foreground ${isEven ? "md:justify-end" : "md:justify-start"}`}
        >
          <Calendar className="h-4 w-4" />
          <span className="font-mono text-sm">
            {experience.startDate} - {displayEndDate}
          </span>
        </div>
        <div className={`${isEven ? "md:flex md:justify-end" : ""}`}>
          <CompanyLogo company={experience.company} />
        </div>
      </div>

      {/* Content Column */}
      <div className={`md:w-1/2 ${isEven ? "md:pl-12" : "md:pr-12"}`}>
        <div className="card-interactive rounded-xl border border-border bg-card p-6">
          {/* Role */}
          <div className="mb-4 flex items-start gap-3">
            <div className="flex-shrink-0 rounded-lg bg-primary/10 p-2">
              <UserRound className="h-4 w-4 text-primary" />
            </div>
            <p className="text-sm leading-relaxed">
              <span className="font-semibold text-foreground">
                {experience.role[lang]}:
              </span>{" "}
              <span className="text-muted-foreground">
                {experience.description[lang]}
              </span>
            </p>
          </div>

          {/* Projects */}
          {experience.projects.map((project, projectIndex) => (
            <div key={projectIndex} className="mb-4">
              <h3 className="mb-2 font-semibold text-foreground">
                {project.name}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {project.description[lang]}
              </p>
            </div>
          ))}

          {/* Technologies */}
          <div className="border-t border-border pt-4">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {experience.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
