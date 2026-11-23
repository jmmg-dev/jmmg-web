"use server";
import { Hobbie } from "@/models/interfaces";
import { InformationDict } from "@/models/types";
import { Heart } from "lucide-react";
import { HobbiesItem } from "./HobbiesItem";

export const Hobbies = async ({
  dict,
  hobbies,
}: {
  dict: InformationDict;
  hobbies: Hobbie[];
}) => {
  return (
    <div className="card-interactive rounded-xl border border-border bg-card p-6">
      <h3 className="mb-6 flex items-center gap-3 text-xl font-bold text-foreground">
        <Heart className="h-5 w-5 text-primary" />
        {dict.hobbies}
      </h3>
      <div className="flex flex-wrap justify-center gap-3">
        {hobbies.map((hobby, index) => {
          return <HobbiesItem key={index} hobby={hobby} />;
        })}
      </div>
    </div>
  );
};
