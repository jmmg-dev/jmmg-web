import { Hobbie } from "@/models/interfaces";
import DynamicIcon from "../DynamicIcon";

export const HobbiesItem = ({ hobby }: { hobby: Hobbie }) => {
  return (
    <div
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
      title={hobby.label}
    >
      <DynamicIcon name={hobby.icon} className="w-4 h-4" />
      <span className="text-sm capitalize">{hobby.label}</span>
    </div>
  );
};
