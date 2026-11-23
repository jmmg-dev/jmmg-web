import { Settings } from "lucide-react";
import { ProgressBar } from "../progressBar/ProgressBar";

type SkillGroup = {
  id: string;
  label: string;
  skills: { name: string; level: number }[];
};

type TechnicalSkillsProps = {
  title: string;
  groups: SkillGroup[];
};

export const TechnicalSkills = ({ title, groups }: TechnicalSkillsProps) => {
  return (
    <div className="card-interactive flex flex-col rounded-xl border border-border bg-card p-6 lg:h-140">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg bg-primary/10 p-2">
          <Settings className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
      </div>
      <div className="custom-scrollbar min-h-0 flex-1 space-y-6 overflow-y-auto pr-2">
        {groups.map((group) => (
          <div key={group.id}>
            <p className="mb-3 text-xs font-semibold tracking-wide text-muted-foreground">
              {group.label}
            </p>
            <div className="space-y-4">
              {group.skills.map((skill, index) => (
                <ProgressBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  delay={index * 50}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
