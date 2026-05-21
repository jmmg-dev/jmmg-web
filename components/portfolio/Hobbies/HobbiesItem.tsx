import { Hobbie } from "@/models/interfaces";
import DynamicIcon from "../DynamicIcon";

export const HobbiesItem = ({ hobby }: { hobby: Hobbie }) => {
  return (
    <div
      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/50  text-primary transition-colors"
      title={hobby.label}
    >
      <DynamicIcon name={hobby.icon} className="w-4 h-4" />
      <span className="text-sm capitalize">{hobby.label}</span>
    </div>
  );
};
