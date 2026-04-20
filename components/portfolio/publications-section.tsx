"use client";

import Image from "next/image";
import { BookOpen, Globe, Github, Calendar } from "lucide-react";
import { useI18n, type Language } from "@/lib/i18n";
import { publications } from "@/lib/data";

type PublicationCardProps = {
  title: string;
  date: string;
  image: string;
  description: string;
  websiteUrl: string | null;
  githubUrl: string | null;
};

const PublicationCard = ({
  title,
  date,
  image,
  description,
  websiteUrl,
  githubUrl,
}: PublicationCardProps) => {
  return (
    <div className="group bg-card border border-border rounded-xl overflow-hidden card-interactive">
      <div className="flex flex-col lg:flex-row">
        {/* Image */}
        <div className="relative w-full lg:w-80 h-52 lg:h-auto flex-shrink-0 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent lg:bg-gradient-to-r" />
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {title}
              </h3>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-mono">{date}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {websiteUrl && (
                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg border border-border bg-secondary/50 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
                  aria-label="Visit website"
                >
                  <Globe className="w-4 h-4" />
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg border border-border bg-secondary/50 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
                  aria-label="View on GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed text-pretty">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

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
              description={pub.description[language as Language]}
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
