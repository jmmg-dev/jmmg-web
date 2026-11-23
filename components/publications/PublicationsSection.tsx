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
    <section id="publications" className="bg-secondary/30 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="mb-4 flex items-center gap-3 text-3xl font-bold text-foreground sm:text-4xl">
            <span className="h-0.5 w-8 rounded-full bg-primary" />
            {title}
          </h2>
          <p className="leading-relaxed text-pretty text-muted-foreground">
            {intro}
          </p>
        </div>

        {/* Publications Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
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
