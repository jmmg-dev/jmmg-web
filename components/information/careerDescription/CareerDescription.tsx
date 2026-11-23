"use server";
import { InformationDict } from "@/models/types";
import { ProfessionalInfo } from "@/models/interfaces";
export const CareerDescription = async ({
  dict,
  professionalInfo,
}: {
  dict: InformationDict;
  professionalInfo: ProfessionalInfo;
}) => {
  return (
    <div className="mb-16">
      <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-foreground">
        <span className="h-0.5 w-8 rounded-full bg-primary" />
        {dict.career}
      </h2>
      <p className="leading-relaxed text-pretty whitespace-pre-line text-muted-foreground">
        {professionalInfo.career}
      </p>
    </div>
  );
};
