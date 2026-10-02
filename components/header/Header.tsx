"use client";

import { useTheme } from "@/lib/theme";
import { Lang } from "@/models/enums";
import { NavDict } from "@/models/types";
import { BookOpen, FileText, Menu, Settings, User, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LanguageSelector } from "./languageSelector/LanguageSelector";
import { NavLinks, type NavSection } from "./navLinks/NavLinks";
import { ThemeToggle } from "./themeToggle/ThemeToggle";

const Header = ({
  dict,
  selectedLang,
}: {
  dict: NavDict;
  selectedLang: Lang;
}) => {
  const sections: NavSection[] = [
    { id: "information", label: dict.information, icon: User },
    { id: "skills", label: dict.skills, icon: Settings },
    { id: "experience", label: dict.experience, icon: FileText },
    { id: "publications", label: dict.publications, icon: BookOpen },
  ];
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
      setScrollProgress(
        docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0,
      );

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

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
    router.push(`/${lang}`);
    router.refresh();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo / Name */}
          <button
            onClick={() => scrollToSection("information")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="text-xl font-bold tracking-tight">
              <span className="neon-text">JM</span>
              <span className="text-muted-foreground font-light">MG</span>
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLinks
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

            {/* Mobile Menu Button */}
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
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? "max-h-64 border-t border-border" : "max-h-0"
        }`}
      >
        <nav className="glass px-4 py-4 space-y-1">
          <NavLinks
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
