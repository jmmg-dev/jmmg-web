"use client";

import { useTheme } from "@/lib/theme";
import { Lang } from "@/models/enums";
import { NavDict } from "@/models/types";
// BookOpen is the publications icon, hidden for now (see the sections below)
import { /* BookOpen, */ FileText, Heart, Menu, Settings, User, X } from "lucide-react";
import { SUPPORT_ID } from "@/lib/constants";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LanguageSelector } from "./languageSelector/LanguageSelector";
import { NavLinks, type NavSection } from "./navLinks/NavLinks";
import { ThemeToggle } from "./themeToggle/ThemeToggle";

type Page = "projects" | "cv";

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
  // The scroll sections only exist on the CV page
  const sections: NavSection[] =
    page === "cv"
      ? [
          { id: "information", label: dict.information, icon: User },
          { id: "skills", label: dict.skills, icon: Settings },
          { id: "experience", label: dict.experience, icon: FileText },
          // Publications hidden for now, like its section on the CV page
          // { id: "publications", label: dict.publications, icon: BookOpen },
        ]
      : [];
  // Donations section at the end of the home page: an in-page jump there, the home page plus the anchor elsewhere
  const supportHref = page === "projects" ? `#${SUPPORT_ID}` : `/${selectedLang}#${SUPPORT_ID}`;
  // In the menu only where there is one (CV page); the home page has just the heart
  const support = sections.length ? { href: supportHref, label: dict.support } : undefined;
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
  }, []);

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
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
            className="flex items-center gap-2 cursor-pointer"
            aria-label={dict.projects}
          >
            <span className="text-xl font-bold tracking-tight">
              <span className="neon-text">JM</span>
              <span className="text-muted-foreground font-light">MG</span>
              <span className="neon-text text-sm">.dev</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLinks
              home={sections.length ? { href: `/${selectedLang}`, label: dict.home } : undefined}
              support={support}
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

            {/* Mobile Menu Button: only where there are sections to jump to (CV page) */}
            {sections.length > 0 && (
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg border border-border bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors md:hidden"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </button>
            )}

            {/* Heart to the donations section, on every screen size, last of the controls */}
            <Link
              href={supportHref}
              aria-label={dict.support}
              title={dict.support}
              className="p-2 rounded-lg border border-border bg-secondary/50 text-primary hover:border-primary transition-colors"
            >
              <Heart aria-hidden className="h-4 w-4 fill-current" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? "max-h-96 border-t border-border" : "max-h-0"
        }`}
      >
        <nav className="glass px-4 py-4 space-y-1">
          <NavLinks
            home={sections.length ? { href: `/${selectedLang}`, label: dict.home } : undefined}
            support={support}
            sections={sections}
            activeSection={activeSection}
            onSelect={scrollToSection}
            variant="mobile"
          />
        </nav>
      </div>

      {/* Scroll Progress Bar */}
      <div
        className="absolute bottom-0 left-0 h-0.5 bg-primary neon-glow transition-[width] duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </header>
  );
};

export default Header;
