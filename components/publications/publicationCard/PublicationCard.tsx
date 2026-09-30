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
    <div className="group bg-card border border-border rounded-xl card-interactive h-full p-6">
      <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left gap-4 mb-4">
        <div className="relative w-full max-w-sm mx-auto h-48 sm:w-52 sm:h-32 sm:max-w-none sm:mx-0 shrink-0 rounded-xl overflow-hidden border border-border">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-mono">{date}</span>
            </div>
            {websiteUrl && (
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-border bg-secondary/50 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
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
                className="p-2 rounded-lg border border-border bg-secondary/50 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
                aria-label="View on GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>

          {technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 items-center justify-center sm:justify-start mt-3">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary border border-primary/20 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <p className="text-muted-foreground leading-relaxed text-pretty text-left">
        {description}
      </p>
    </div>
  );
};
