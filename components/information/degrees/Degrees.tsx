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
    <div className="bg-card border border-border rounded-xl p-6 card-interactive">
      <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
        <GraduationCap className="w-5 h-5 text-primary" />
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
