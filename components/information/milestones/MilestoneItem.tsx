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
        <span className="flex-shrink-0 rounded bg-primary/10 px-2 py-1 font-mono text-xs text-primary">
          {milestone.date}
        </span>
        <p className="text-foreground">{milestone.name}</p>
      </div>
      <p className="mb-7 text-sm text-muted-foreground">
        {milestone.description}
      </p>
    </>
  );
};
