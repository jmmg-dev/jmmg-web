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
      className={`relative flex flex-col md:flex-row gap-8 ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Timeline Dot */}
      <div className="absolute left-0 md:left-1/2 top-0 w-4 h-4 rounded-full bg-primary border-4 border-background transform md:-translate-x-1/2 hidden md:block neon-glow" />

      {/* Date Column */}
      <div
        className={`md:w-1/2 ${isEven ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}`}
      >
        <div
          className={`flex items-center gap-2 text-muted-foreground mb-4 ${isEven ? "md:justify-end" : "md:justify-start"}`}
        >
          <Calendar className="w-4 h-4" />
          <span className="text-sm font-mono">
            {experience.startDate} - {displayEndDate}
          </span>
        </div>
        <div className={`${isEven ? "md:flex md:justify-end" : ""}`}>
          <CompanyLogo company={experience.company} />
        </div>
      </div>

      {/* Content Column */}
      <div className={`md:w-1/2 ${isEven ? "md:pl-12" : "md:pr-12"}`}>
        <div className="bg-card border border-border rounded-xl p-6 card-interactive">
          {/* Role */}
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
              <UserRound className="w-4 h-4 text-primary" />
            </div>
            <p className="text-sm leading-relaxed">
              <span className="text-foreground font-semibold">
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
              <h3 className="font-semibold text-foreground mb-2">
                {project.name}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {project.description[lang]}
              </p>
            </div>
          ))}

          {/* Technologies */}
          <div className="pt-4 border-t border-border">
            <div className="flex flex-wrap gap-2 items-center justify-center">
              {experience.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary border border-primary/20 rounded-full"
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
