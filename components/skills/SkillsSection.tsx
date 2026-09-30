"use client";

import {
  technicalSkillGroups,
  professionalGrowthData,
  languageSkills,
  businessSkills,
} from "@/lib/data";
import { SkillsDict } from "@/models/types";
import { TechnicalSkills } from "./technicalSkills/TechnicalSkills";
import { ProfessionalGrowthChart } from "./professionalGrowthChart/ProfessionalGrowthChart";
import { LanguageSkills } from "./languageSkills/LanguageSkills";
import { BusinessSkills } from "./businessSkills/BusinessSkills";

const SkillsSection = ({
  title,
  dict,
}: {
  title: string;
  dict: SkillsDict;
}) => {
  const t = dict as unknown as Record<string, string>;

  const chartData = professionalGrowthData.map((item) => ({
    name: item.skill,
    "2020": item[2020],
    "2022": item[2022],
    "2024": item[2024],
    "2026": item[2026],
  }));

  const translatedTechnicalSkillGroups = technicalSkillGroups.map((group) => ({
    id: group.id,
    label: t[group.id],
    skills: group.skills,
  }));

  const translatedLanguages = languageSkills.map((lang) => ({
    id: lang.name,
    label: t[lang.name],
    level: lang.level,
    info: t[lang.info],
  }));

  const translatedBusinessSkills = businessSkills.map((skill) => ({
    id: skill.name,
    label: t[skill.name],
    level: skill.level,
  }));

  return (
    <section id="skills" className="py-16 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-0.5 bg-primary rounded-full" />
            {title}
          </h2>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TechnicalSkills
            title={dict.technicalSkills}
            groups={translatedTechnicalSkillGroups}
          />
          <div className="flex flex-col gap-8 lg:h-140">
            <div className="lg:flex-3 lg:min-h-0">
              <BusinessSkills
                title={dict.businessSkills}
                skills={translatedBusinessSkills}
              />
            </div>
            <div className="lg:flex-2 lg:min-h-0">
              <LanguageSkills
                title={dict.languages}
                languages={translatedLanguages}
              />
            </div>
          </div>
          <div className="lg:col-span-2">
            <ProfessionalGrowthChart
              title={dict.professionalGrowth}
              data={chartData}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
