import { Building2 } from "lucide-react";
import { ProgressBar } from "../progressBar/ProgressBar";

type BusinessSkillsProps = {
  title: string;
  skills: { id: string; label: string; level: number }[];
};

export const BusinessSkills = ({ title, skills }: BusinessSkillsProps) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 card-interactive lg:h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Building2 className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:flex-1 lg:min-h-0 content-start lg:overflow-y-auto pr-2 custom-scrollbar">
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
