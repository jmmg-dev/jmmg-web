import { Heart, House, type LucideIcon } from "lucide-react";
import Link from "next/link";

export type NavSection = {
  id: string;
  label: string;
  icon: LucideIcon;
};

type NavLinksProps = {
  /** Link back to the home page, shown before the sections */
  home?: { href: string; label: string };
  /** Link to the donations section, shown after the sections */
  support?: { href: string; label: string };
  sections: NavSection[];
  activeSection: string;
  onSelect: (sectionId: string) => void;
  variant: "desktop" | "mobile";
};

export const NavLinks = ({
  home,
  support,
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
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 text-muted-foreground hover:text-foreground hover:bg-secondary"
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
        {support && (
          <Link
            href={support.href}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 text-muted-foreground hover:text-foreground hover:bg-secondary"
          >
            <Heart className="h-4 w-4 text-primary" />
            <span>{support.label}</span>
          </Link>
        )}
      </>
    );
  }

  return (
    <>
      {home && (
        <Link
          href={home.href}
          className="relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-muted-foreground hover:text-foreground"
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
      {support && (
        <Link
          href={support.href}
          className="relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-muted-foreground hover:text-foreground"
        >
          <Heart className="h-4 w-4 text-primary" />
          <span>{support.label}</span>
        </Link>
      )}
    </>
  );
};
