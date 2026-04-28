"use server";
import { InformationDict } from "@/models/types";
import { ProfessionalInfo } from "../../models/interfaces";
export const CareerDescription = async ({
  dict,
  professionalInfo,
}: {
  dict: InformationDict;
  professionalInfo: ProfessionalInfo;
}) => {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
        <span className="w-8 h-0.5 bg-primary rounded-full" />
        {dict.career}
      </h2>
      <p className="whitespace-pre-line text-muted-foreground leading-relaxed text-pretty">
        {professionalInfo.career}
      </p>
    </div>
  );
};
