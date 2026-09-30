import { Globe } from "lucide-react";

type LanguageSkillsProps = {
  title: string;
  languages: { id: string; label: string; level: number; info: string }[];
};

export const LanguageSkills = ({ title, languages }: LanguageSkillsProps) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 card-interactive lg:h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Globe className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
      </div>
      <div className="space-y-5 lg:flex-1 lg:min-h-0 lg:overflow-y-auto pr-2 custom-scrollbar">
        {languages.map((lang, index) => (
          <div key={lang.id}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">{lang.label}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                {lang.info}
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full rounded-full progress-bar progress-track"
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
