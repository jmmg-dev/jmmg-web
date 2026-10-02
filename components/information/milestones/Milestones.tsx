"use server";
import { Milestone } from "@/models/interfaces";
import { InformationDict } from "@/models/types";
import { Award } from "lucide-react";
import { MilestoneItem } from "./MilestoneItem";

export const Milestones = async ({
  dict,
  milestones,
}: {
  dict: InformationDict;
  milestones: Milestone[];
}) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 card-interactive">
      <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
        <Award className="w-5 h-5 text-primary" />
        {dict.professionalMilestones}
      </h3>
      <div className="space-y-4 lg:max-h-[200px] lg:overflow-y-auto">
        {milestones.map((milestone, index) => (
          <MilestoneItem key={index} milestone={milestone} />
        ))}
      </div>
    </div>
  );
};
