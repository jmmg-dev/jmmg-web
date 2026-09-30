import { publications } from "@/lib/data";
import { Lang } from "@/models/enums";
import { PublicationCard } from "./publicationCard/PublicationCard";

const PublicationsSection = ({
  title,
  intro,
  lang,
}: {
  title: string;
  intro: string;
  lang: Lang;
}) => {
  return (
    <section id="publications" className="py-16 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-0.5 bg-primary rounded-full" />
            {title}
          </h2>
          <p className="text-muted-foreground leading-relaxed text-pretty">
            {intro}
          </p>
        </div>

        {/* Publications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {publications.map((pub, index) => (
            <PublicationCard
              key={index}
              title={pub.title}
              date={pub.date}
              image={pub.image}
              description={pub.description[lang]}
              websiteUrl={pub.websiteUrl}
              githubUrl={pub.githubUrl}
              technologies={pub.technologies}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PublicationsSection;
