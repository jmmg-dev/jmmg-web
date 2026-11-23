import { experiences } from "@/lib/data";
import { Lang } from "@/models/enums";
import { ExperienceItem } from "./experienceItem/ExperienceItem";

const ExperienceSection = ({
  title,
  currentlyLabel,
  lang,
}: {
  title: string;
  currentlyLabel: string;
  lang: Lang;
}) => {
  return (
    <section id="experience" className="py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="mb-4 flex items-center gap-3 text-3xl font-bold text-foreground sm:text-4xl">
            <span className="h-0.5 w-8 rounded-full bg-primary" />
            {title}
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute top-0 bottom-0 left-0 hidden w-px transform bg-border md:left-1/2 md:block md:-translate-x-1/2" />

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <ExperienceItem
                key={exp.company}
                experience={exp}
                isEven={index % 2 === 0}
                lang={lang}
                currentlyLabel={currentlyLabel}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
