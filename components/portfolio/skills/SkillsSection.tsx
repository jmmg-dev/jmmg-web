"use client";

import { useI18n } from "@/lib/i18n";
import {
  technicalSkills,
  professionalGrowthData,
  languageSkills,
  businessSkills,
} from "@/lib/data";
import { TechnicalSkills } from "./technicalSkills/TechnicalSkills";
import { ProfessionalGrowthChart } from "./professionalGrowthChart/ProfessionalGrowthChart";
import { LanguageSkills } from "./languageSkills/LanguageSkills";
import { BusinessSkills } from "./businessSkills/BusinessSkills";

const SkillsSection = () => {
  const { t } = useI18n();

  const chartData = professionalGrowthData.map((item) => ({
    name: item.skill,
    "2020": item[2020],
    "2022": item[2022],
    "2024": item[2024],
    "2026": item[2026],
  }));

  const translatedLanguages = languageSkills.map((lang) => ({
    id: lang.name,
    label: t(lang.name),
    level: lang.level,
    isNative: lang.isNative,
  }));

  const translatedBusinessSkills = businessSkills.map((skill) => ({
    id: skill.name,
    label: t(skill.name),
    level: skill.level,
  }));

  return (
    <section id="skills" className="py-16 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-0.5 bg-primary rounded-full" />
            {t("skills")}
          </h2>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TechnicalSkills title={t("technicalSkills")} skills={technicalSkills} />
          <ProfessionalGrowthChart title={t("professionalGrowth")} data={chartData} />
          <LanguageSkills title={t("languages")} languages={translatedLanguages} />
          <BusinessSkills title={t("businessSkills")} skills={translatedBusinessSkills} />
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
