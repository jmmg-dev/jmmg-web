"use server";
import { Degree } from "@/models/interfaces";
import { InformationDict } from "@/models/types";
import { GraduationCap } from "lucide-react";
import { DegreeItem } from "./DegreeItem";

export const Degrees = async ({
  dict,
  degrees,
}: {
  dict: InformationDict;
  degrees: Degree[];
}) => {
  return (
    <div className="card-interactive rounded-xl border border-border bg-card p-6">
      <h3 className="mb-6 flex items-center gap-3 text-xl font-bold text-foreground">
        <GraduationCap className="h-5 w-5 text-primary" />
        {dict.degrees}
      </h3>
      <div className="space-y-6">
        {degrees.map((degree, index) => (
          <DegreeItem key={index} degree={degree} />
        ))}
      </div>
    </div>
  );
};
