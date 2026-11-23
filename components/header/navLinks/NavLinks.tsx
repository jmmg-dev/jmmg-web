import { House, type LucideIcon } from "lucide-react";
import Link from "next/link";

export type NavSection = {
  id: string;
  label: string;
  icon: LucideIcon;
};

type NavLinksProps = {
  /** Link back to the home page, shown before the sections */
  home?: { href: string; label: string };
  sections: NavSection[];
  activeSection: string;
  onSelect: (sectionId: string) => void;
  variant: "desktop" | "mobile";
};

export const NavLinks = ({
  home,
  sections,
  activeSection,
  onSelect,
  variant,
}: NavLinksProps) => {
  if (variant === "mobile") {
    return (
      <>
        {home && (
          <Link
            href={home.href}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-all duration-300 hover:bg-secondary hover:text-foreground"
          >
            <House className="h-4 w-4" />
            <span>{home.label}</span>
          </Link>
        )}
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              onClick={() => onSelect(section.id)}
              className={`flex w-full cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-300 ${
                isActive
                  ? "neon-text bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
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
      {home && (
        <Link
          href={home.href}
          className="relative flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-foreground"
        >
          <House className="h-4 w-4" />
          <span>{home.label}</span>
        </Link>
      )}
      {sections.map((section) => {
        const Icon = section.icon;
        const isActive = activeSection === section.id;
        return (
          <button
            key={section.id}
            onClick={() => onSelect(section.id)}
            className={`relative flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ${
              isActive
                ? "neon-text text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="h-4 w-4" />
            <span>{section.label}</span>
            {isActive && (
              <span className="absolute right-4 bottom-0 left-4 h-0.5 rounded-full bg-primary" />
            )}
          </button>
        );
      })}
    </>
  );
};
