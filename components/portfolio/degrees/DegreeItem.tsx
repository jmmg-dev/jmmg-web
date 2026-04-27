"use server";
import { Degree } from "@/models/interfaces";

export const DegreeItem = async ({ degree }: { degree: Degree }) => {
  return (
    <div className="relative pl-6 border-l-2 border-primary/30">
      <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-primary" />
      <p className="font-semibold text-foreground">{degree.name}</p>
      <p className="text-sm text-muted-foreground mt-1">{degree.institution}</p>
      <span className="inline-block mt-2 text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">
        {degree.startDate}
      </span>
      <span className="text-muted-foreground"> - </span>
      <span className="inline-block mt-2 text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">
        {degree.endDate}
      </span>
    </div>
  );
};
