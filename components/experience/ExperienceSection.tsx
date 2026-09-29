"use client";

import { experiences } from "@/lib/data";
import { useI18n } from "@/lib/i18n";
import { ExperienceItem } from "./experienceItem/ExperienceItem";

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
            {experiences.map((exp, index) => (
              <ExperienceItem
                key={exp.company}
                experience={exp}
                isEven={index % 2 === 0}
                language={language}
                currentlyLabel={t("currently")}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
