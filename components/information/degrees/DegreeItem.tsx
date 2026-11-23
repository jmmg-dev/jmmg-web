"use server";
import { Degree } from "@/models/interfaces";

export const DegreeItem = async ({ degree }: { degree: Degree }) => {
  return (
    <div className="relative border-l-2 border-primary/30 pl-6">
      <div className="absolute top-0 -left-1.5 h-3 w-3 rounded-full bg-primary" />
      <p className="font-semibold text-foreground">{degree.name}</p>
      <p className="mt-1 text-sm text-muted-foreground">{degree.institution}</p>
      <span className="mt-2 inline-block rounded bg-primary/10 px-2 py-1 font-mono text-xs text-primary">
        {degree.startDate}
      </span>
      <span className="text-muted-foreground"> - </span>
      <span className="mt-2 inline-block rounded bg-primary/10 px-2 py-1 font-mono text-xs text-primary">
        {degree.endDate}
      </span>
    </div>
  );
};
