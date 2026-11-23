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
    <div className="card-interactive rounded-xl border border-border bg-card p-6">
      <h3 className="mb-6 flex items-center gap-3 text-xl font-bold text-foreground">
        <Award className="h-5 w-5 text-primary" />
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
