import type { LucideIcon } from "lucide-react";

export type NavSection = {
  id: string;
  label: string;
  icon: LucideIcon;
};

type NavLinksProps = {
  sections: NavSection[];
  activeSection: string;
  onSelect: (sectionId: string) => void;
  variant: "desktop" | "mobile";
};

export const NavLinks = ({
  sections,
  activeSection,
  onSelect,
  variant,
}: NavLinksProps) => {
  if (variant === "mobile") {
    return (
      <>
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              onClick={() => onSelect(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium cursor-pointer transition-all duration-300 ${
                isActive
                  ? "bg-primary/10 text-primary neon-text"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{section.label}</span>
            </button>
          );
        })}
      </>
    );
  }

  return (
    <>
      {sections.map((section) => {
        const Icon = section.icon;
        const isActive = activeSection === section.id;
        return (
          <button
            key={section.id}
            onClick={() => onSelect(section.id)}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all duration-300 ${
              isActive
                ? "text-primary neon-text"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="h-4 w-4" />
            <span>{section.label}</span>
            {isActive && (
              <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full" />
            )}
          </button>
        );
      })}
    </>
  );
};
