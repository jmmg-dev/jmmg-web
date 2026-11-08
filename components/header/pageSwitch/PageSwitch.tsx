import { Lang } from "@/models/enums";
import { FileText, LayoutGrid } from "lucide-react";
import Link from "next/link";

export type Page = "projects" | "cv";

type PageSwitchProps = {
  lang: Lang;
  current: Page;
  labels: { projects: string; cv: string };
  variant: "desktop" | "mobile";
  onNavigate?: () => void;
};

export const PageSwitch = ({
  lang,
  current,
  labels,
  variant,
  onNavigate,
}: PageSwitchProps) => {
  const pages = [
    { id: "projects" as const, href: `/${lang}`, label: labels.projects, icon: LayoutGrid },
    { id: "cv" as const, href: `/${lang}/cv`, label: labels.cv, icon: FileText },
  ];

  if (variant === "mobile") {
    return (
      <div className="grid grid-cols-2 gap-2 pb-3 mb-2 border-b border-border">
        {pages.map(({ id, href, label, icon: Icon }) => (
          <Link
            key={id}
            href={href}
            onClick={onNavigate}
            aria-current={current === id ? "page" : undefined}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              current === id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary/50 text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center rounded-lg border border-border bg-secondary/50 p-0.5">
      {pages.map(({ id, href, label, icon: Icon }) => (
        <Link
          key={id}
          href={href}
          aria-current={current === id ? "page" : undefined}
          className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-all duration-200 ${
            current === id
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Icon className="h-3.5 w-3.5" />
          {label}
        </Link>
      ))}
    </div>
  );
};
