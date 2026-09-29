"use client";

import { useI18n } from "@/lib/i18n";
import { publications } from "@/lib/data";
import { PublicationCard } from "./publicationCard/PublicationCard";

const PublicationsSection = () => {
  const { t, language } = useI18n();

  return (
    <section id="publications" className="py-16 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-0.5 bg-primary rounded-full" />
            {t("publications")}
          </h2>
          <p className="text-muted-foreground leading-relaxed text-pretty max-w-3xl italic">
            {t("publicationsIntro")}
          </p>
        </div>

        {/* Publications Grid */}
        <div className="space-y-8">
          {publications.map((pub, index) => (
            <PublicationCard
              key={index}
              title={pub.title}
              date={pub.date}
              image={pub.image}
              description={pub.description[language]}
              websiteUrl={pub.websiteUrl}
              githubUrl={pub.githubUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PublicationsSection;
