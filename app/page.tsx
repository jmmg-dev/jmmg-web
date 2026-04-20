"use client";

import ExperienceSection from "@/components/portfolio/experience-section";
import Header from "@/components/portfolio/header";
import InformationSection from "@/components/portfolio/information-section";
import PublicationsSection from "@/components/portfolio/publications-section";
import SkillsSection from "@/components/portfolio/skills-section";

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <InformationSection />
        <SkillsSection />
        <ExperienceSection />
        <PublicationsSection />

        {/* Footer */}
        <footer className="py-8 border-t border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
              <p>
                &copy; {new Date().getFullYear()} Juan Manuel Muñoz González.
                All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Portfolio;
