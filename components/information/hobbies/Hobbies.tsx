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
    <div className="bg-card border border-border rounded-xl p-6 card-interactive">
      <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
        <Heart className="w-5 h-5 text-primary" />
        {dict.hobbies}
      </h3>
      <div className="flex flex-wrap gap-3 justify-center">
        {hobbies.map((hobby, index) => {
          return <HobbiesItem key={index} hobby={hobby} />;
        })}
      </div>
    </div>
  );
};
