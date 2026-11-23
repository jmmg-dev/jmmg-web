"use client";

import { useTheme } from "@/lib/theme";
import { Lang } from "@/models/enums";
import { NavDict } from "@/models/types";
// BookOpen is the publications icon, hidden for now (see the sections below)
import {
  /* BookOpen, */ FileText,
  Heart,
  Menu,
  Settings,
  User,
  X,
} from "lucide-react";
import { SUPPORT_ID } from "@/lib/constants";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { LanguageSelector } from "./languageSelector/LanguageSelector";
import { NavLinks, type NavSection } from "./navLinks/NavLinks";
import { ThemeToggle } from "./themeToggle/ThemeToggle";

/** "other" is any page without its own sections or language switch target, such as the 404 page */
type Page = "projects" | "cv" | "other";

const Header = ({
  dict,
  selectedLang,
  page,
  hideAtTop = false,
}: {
  dict: NavDict;
  selectedLang: Lang;
  page: Page;
  /** Hides the header until the page is scrolled (full-screen hero on the home page). */
  hideAtTop?: boolean;
}) => {
  // The scroll sections only exist on the CV page. Memoised so the scroll effect below only
  // starts again when they really change, not on every render.
  const sections: NavSection[] = useMemo(
    () =>
      page === "cv"
        ? [
            { id: "information", label: dict.information, icon: User },
            { id: "skills", label: dict.skills, icon: Settings },
            { id: "experience", label: dict.experience, icon: FileText },
            // Publications hidden for now, like its section on the CV page
            // { id: "publications", label: dict.publications, icon: BookOpen },
          ]
        : [],
    [page, dict.information, dict.skills, dict.experience],
  );
  // Donations section at the end of the home page: an in-page jump there, the home page plus the anchor elsewhere
  const supportHref =
    page === "projects" ? `#${SUPPORT_ID}` : `/${selectedLang}#${SUPPORT_ID}`;
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("information");
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0);

      const sectionElements = sections.map((s) => ({
        id: s.id,
        element: document.getElementById(s.id),
      }));

      for (const section of sectionElements) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    let rafId: number | null = null;
    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        handleScroll();
        rafId = null;
      });
    };

    handleScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsMenuOpen(false);
  };

  const handlerLanguage = (lang: Lang) => {
    router.push(page === "cv" ? `/${lang}/cv` : `/${lang}`);
    router.refresh();
  };

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass shadow-lg" : "bg-transparent"
      } ${
        hideAtTop && !isScrolled && !isMenuOpen
          ? "pointer-events-none -translate-y-full opacity-0 has-focus-visible:pointer-events-auto has-focus-visible:translate-y-0 has-focus-visible:opacity-100"
          : ""
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo / Name */}
          <Link
            href={`/${selectedLang}`}
            className="flex cursor-pointer items-center gap-2"
            aria-label={dict.projects}
          >
            <span className="text-xl font-bold tracking-tight">
              <span className="neon-text">JM</span>
              <span className="font-light text-muted-foreground">MG</span>
              <span className="neon-text text-sm">.dev</span>
            </span>
          </Link>

          {/* Desktop Navigation, from lg: below that the CV sections and the controls do not fit
              in one row (at 768 px the heart was cut off), so tablets use the menu button */}
          <nav className="hidden items-center gap-1 lg:flex">
            <NavLinks
              home={
                sections.length
                  ? { href: `/${selectedLang}`, label: dict.home }
                  : undefined
              }
              sections={sections}
              activeSection={activeSection}
              onSelect={scrollToSection}
              variant="desktop"
            />
          </nav>

          {/* Right side controls */}
          <div className="flex items-center gap-2">
            <LanguageSelector
              selectedLang={selectedLang}
              onSelect={handlerLanguage}
            />

            <ThemeToggle theme={theme} onToggle={toggleTheme} />

            {/* Heart to the donations section, on every screen size (only the mobile menu button goes after it) */}
            <Link
              href={supportHref}
              aria-label={dict.support}
              title={dict.support}
              className="rounded-lg border border-border bg-secondary/50 p-2 text-primary transition-colors hover:border-primary"
            >
              <Heart aria-hidden className="h-4 w-4 fill-current" />
            </Link>

            {/* Mobile Menu Button: only where there are sections to jump to (CV page) */}
            {sections.length > 0 && (
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="rounded-lg border border-border bg-secondary/50 p-2 text-muted-foreground transition-colors hover:text-foreground lg:hidden"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          isMenuOpen ? "max-h-96 border-t border-border" : "max-h-0"
        }`}
      >
        <nav className="glass space-y-1 px-4 py-4">
          <NavLinks
            home={
              sections.length
                ? { href: `/${selectedLang}`, label: dict.home }
                : undefined
            }
            sections={sections}
            activeSection={activeSection}
            onSelect={scrollToSection}
            variant="mobile"
          />
        </nav>
      </div>

      {/* Scroll Progress Bar */}
      <div
        className="neon-glow absolute bottom-0 left-0 h-0.5 bg-primary transition-[width] duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </header>
  );
};

export default Header;
