"use client";

import { experiences } from "@/lib/data";
import { useI18n, type Language } from "@/lib/i18n";
import { Briefcase, Calendar, ExternalLink } from "lucide-react";

type CompanyLogoProps = {
  company: string;
};

const CompanyLogo = ({ company }: CompanyLogoProps) => {
  const logoClasses = "text-xl font-bold";

  switch (company.toLowerCase()) {
    case "vintegris":
      return (
        <span className={`${logoClasses} text-primary neon-text italic`}>
          vintegris
        </span>
      );
    case "signicat":
      return (
        <span className="bg-emerald-600 text-white px-4 py-1.5 rounded-lg font-bold text-lg">
          Signicat
        </span>
      );
    case "accenture":
      return (
        <span className={`${logoClasses} text-foreground`}>
          accenture<span className="text-purple-500 ml-0.5">{">"}</span>
        </span>
      );
    case "goldenrace":
      return (
        <span
          className={`${logoClasses} uppercase tracking-wider text-foreground`}
        >
          <span className="font-black">Golden</span>
          <span className="font-light">Race</span>
        </span>
      );
    default:
      return (
        <span className={`${logoClasses} text-foreground`}>{company}</span>
      );
  }
};

const ExperienceSection = () => {
  const { t, language } = useI18n();

  return (
    <section id="experience" className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-0.5 bg-primary rounded-full" />
            {t("experience")}
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border transform md:-translate-x-1/2 hidden md:block" />

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              const displayEndDate = exp.endDate || t("currently");

              return (
                <div
                  key={exp.company}
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
                        {exp.startDate} - {displayEndDate}
                      </span>
                    </div>
                    <div
                      className={`${isEven ? "md:flex md:justify-end" : ""}`}
                    >
                      <CompanyLogo company={exp.company} />
                    </div>
                  </div>

                  {/* Content Column */}
                  <div
                    className={`md:w-1/2 ${isEven ? "md:pl-12" : "md:pr-12"}`}
                  >
                    <div className="bg-card border border-border rounded-xl p-6 card-interactive">
                      {/* Role */}
                      <div className="flex items-start gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                          <Briefcase className="w-4 h-4 text-primary" />
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {exp.role[language as Language]}
                        </p>
                      </div>

                      {/* Projects */}
                      {exp.projects.map((project, projectIndex) => (
                        <div key={projectIndex} className="mb-4">
                          <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                            {project.name}
                            <ExternalLink className="w-3 h-3 text-muted-foreground" />
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {project.description[language as Language]}
                          </p>
                        </div>
                      ))}

                      {/* Technologies */}
                      <div className="pt-4 border-t border-border">
                        <div className="flex flex-wrap gap-2 items-center justify-center">
                          {exp.technologies.map((tech) => (
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
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
