import { Settings } from "lucide-react";
import { ProgressBar } from "../progressBar/ProgressBar";

type TechnicalSkillsProps = {
  title: string;
  skills: { name: string; level: number }[];
};

export const TechnicalSkills = ({ title, skills }: TechnicalSkillsProps) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 card-interactive">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Settings className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
      </div>
      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {skills.map((skill, index) => (
          <ProgressBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            delay={index * 50}
          />
        ))}
      </div>
    </div>
  );
};
