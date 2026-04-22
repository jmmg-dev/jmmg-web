"use client";

import { Settings, TrendingUp, Globe, Briefcase } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useI18n } from "@/lib/i18n";
import {
  technicalSkills,
  professionalGrowthData,
  languageSkills,
  businessSkills,
} from "@/lib/data";

type ProgressBarProps = {
  name: string;
  level: number;
  delay?: number;
};

const ProgressBar = ({ name, level, delay = 0 }: ProgressBarProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground">{name}</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full rounded-full progress-bar progress-track"
          style={{
            width: `${level}%`,
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
};

const SkillsSection = () => {
  const { t } = useI18n();

  const chartData = professionalGrowthData.map((item) => ({
    name: item.skill,
    "2020": item[2020],
    "2022": item[2022],
    "2024": item[2024],
    "2026": item[2026],
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
          {/* Technical Skills */}
          <div className="bg-card border border-border rounded-xl p-6 card-interactive">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <Settings className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">{t("technicalSkills")}</h3>
            </div>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {technicalSkills.map((skill, index) => (
                <ProgressBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  delay={index * 50}
                />
              ))}
            </div>
          </div>

          {/* Professional Growth Chart */}
          <div className="bg-card border border-border rounded-xl p-6 card-interactive">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">{t("professionalGrowth")}</h3>
            </div>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 70 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} />
                  <XAxis
                    dataKey="name"
                    stroke="var(--muted-foreground)"
                    fontSize={11}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    interval={0}
                    tick={{ fill: "var(--muted-foreground)" }}
                  />
                  <YAxis
                    stroke="var(--muted-foreground)"
                    fontSize={11}
                    domain={[0, 100]}
                    tick={{ fill: "var(--muted-foreground)" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      color: "var(--foreground)",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Legend
                    verticalAlign="top"
                    height={36}
                    formatter={(value) => (
                      <span style={{ color: "var(--foreground)", fontSize: "12px" }}>{value}</span>
                    )}
                  />
                  <Line
                    type="monotone"
                    dataKey="2020"
                    stroke="var(--chart-1)"
                    strokeWidth={2}
                    dot={{ fill: "var(--chart-1)", strokeWidth: 2, r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="2022"
                    stroke="var(--chart-2)"
                    strokeWidth={2}
                    dot={{ fill: "var(--chart-2)", strokeWidth: 2, r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="2024"
                    stroke="var(--chart-3)"
                    strokeWidth={2}
                    dot={{ fill: "var(--chart-3)", strokeWidth: 2, r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="2026"
                    stroke="var(--chart-4)"
                    strokeWidth={2}
                    dot={{ fill: "var(--chart-4)", strokeWidth: 2, r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Languages */}
          <div className="bg-card border border-border rounded-xl p-6 card-interactive">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <Globe className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">{t("languages")}</h3>
            </div>
            <div className="space-y-5">
              {languageSkills.map((lang, index) => (
                <div key={lang.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">{t(lang.name)}</span>
                    {lang.isNative && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                        Native
                      </span>
                    )}
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full progress-bar progress-track"
                      style={{
                        width: `${lang.level}%`,
                        transitionDelay: `${index * 100}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Business Skills */}
          <div className="bg-card border border-border rounded-xl p-6 card-interactive">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">{t("businessSkills")}</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {businessSkills.map((skill, index) => (
                <ProgressBar
                  key={skill.name}
                  name={t(skill.name)}
                  level={skill.level}
                  delay={index * 100}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
