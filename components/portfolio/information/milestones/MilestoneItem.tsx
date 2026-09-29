"use server";
import { Milestone } from "@/models/interfaces";

export const MilestoneItem = async ({
  milestone,
}: {
  milestone: Milestone;
}) => {
  return (
    <>
      <div className="flex items-start gap-4">
        <span className="flex-shrink-0 text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">
          {milestone.date}
        </span>
        <p className="text-foreground">{milestone.name}</p>
      </div>
      <p className="text-muted-foreground text-sm mb-7">
        {milestone.description}
      </p>
    </>
  );
};
