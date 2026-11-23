import { Globe } from "lucide-react";

type LanguageSkillsProps = {
  title: string;
  languages: { id: string; label: string; level: number; info: string }[];
};

export const LanguageSkills = ({ title, languages }: LanguageSkillsProps) => {
  return (
    <div className="card-interactive flex flex-col rounded-xl border border-border bg-card p-6 lg:h-full">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg bg-primary/10 p-2">
          <Globe className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
      </div>
      <div className="custom-scrollbar space-y-5 pr-2 lg:min-h-0 lg:flex-1 lg:overflow-y-auto">
        {languages.map((lang, index) => (
          <div key={lang.id}>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                {lang.label}
              </span>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                {lang.info}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="progress-bar progress-track h-full rounded-full"
                style={{
                  width: `${lang.level}%`,
                  transitionDelay: `${index * 100}ms`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
