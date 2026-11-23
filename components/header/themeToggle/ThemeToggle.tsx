import { Theme } from "@/models/enums";
import { Moon, Sun } from "lucide-react";

type ThemeToggleProps = {
  theme: Theme;
  onToggle: () => void;
};

export const ThemeToggle = ({ theme, onToggle }: ThemeToggleProps) => {
  return (
    <button
      onClick={onToggle}
      className="cursor-pointer rounded-lg border border-border bg-secondary/50 p-2 text-muted-foreground transition-colors hover:text-foreground"
      aria-label="Toggle theme"
    >
      {theme === Theme.dark ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );
};
