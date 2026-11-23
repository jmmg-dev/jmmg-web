import Image from "next/image";
import { Globe, Github, Calendar } from "lucide-react";

type PublicationCardProps = {
  title: string;
  date: string;
  image: string;
  description: string;
  websiteUrl: string | null;
  githubUrl: string | null;
  technologies: string[];
};

export const PublicationCard = ({
  title,
  date,
  image,
  description,
  websiteUrl,
  githubUrl,
  technologies,
}: PublicationCardProps) => {
  return (
    <div className="group card-interactive h-full rounded-xl border border-border bg-card p-6">
      <div className="mb-4 flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left">
        {websiteUrl ? (
          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative mx-auto block h-48 w-full max-w-sm shrink-0 overflow-hidden rounded-xl border border-border sm:mx-0 sm:h-32 sm:w-52 sm:max-w-none"
            aria-label={`Visit ${title} website`}
          >
            <Image src={image} alt={title} fill className="object-cover" />
          </a>
        ) : (
          <div className="relative mx-auto h-48 w-full max-w-sm shrink-0 overflow-hidden rounded-xl border border-border sm:mx-0 sm:h-32 sm:w-52 sm:max-w-none">
            <Image src={image} alt={title} fill className="object-cover" />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <h3 className="mb-2 text-lg font-bold text-foreground transition-colors group-hover:text-primary">
            {title}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span className="font-mono text-sm">{date}</span>
            </div>
            {websiteUrl && (
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-border bg-secondary/50 p-2 text-muted-foreground transition-all hover:border-primary/50 hover:text-primary"
                aria-label="Visit website"
              >
                <Globe className="h-4 w-4" />
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-border bg-secondary/50 p-2 text-muted-foreground transition-all hover:border-primary/50 hover:text-primary"
                aria-label="View on GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
            )}
          </div>

          {technologies.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <p className="text-left leading-relaxed text-pretty text-muted-foreground">
        {description}
      </p>
    </div>
  );
};
