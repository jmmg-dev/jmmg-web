import { Building2 } from "lucide-react";
import { ProgressBar } from "../progressBar/ProgressBar";

type BusinessSkillsProps = {
  title: string;
  skills: { id: string; label: string; level: number }[];
};

export const BusinessSkills = ({ title, skills }: BusinessSkillsProps) => {
  return (
    <div className="card-interactive flex flex-col rounded-xl border border-border bg-card p-6 lg:h-full">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg bg-primary/10 p-2">
          <Building2 className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
      </div>
      <div className="custom-scrollbar grid grid-cols-1 content-start gap-5 pr-2 sm:grid-cols-2 lg:min-h-0 lg:flex-1 lg:overflow-y-auto">
        {skills.map((skill, index) => (
          <ProgressBar
            key={skill.id}
            name={skill.label}
            level={skill.level}
            delay={index * 100}
          />
        ))}
      </div>
    </div>
  );
};
