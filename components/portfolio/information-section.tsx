"use client";

import Image from "next/image";
import {
  Linkedin,
  AlertTriangle,
  MapPin,
  Calendar,
  Mail,
  GraduationCap,
  Award,
  Footprints,
  Waves,
  Gamepad2,
  Music,
  Bike,
  Plane,
  Heart,
} from "lucide-react";
import { useI18n, type Language } from "@/lib/i18n";
import { personalInfo, degrees, milestones, hobbies } from "@/lib/data";

const hobbyIcons: Record<string, React.ElementType> = {
  hiking: Footprints,
  swimming: Waves,
  gaming: Gamepad2,
  music: Music,
  cycling: Bike,
  badminton: Footprints,
  travel: Plane,
};

const InformationSection = () => {
  const { t, language } = useI18n();

  return (
    <section id="information" className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 mb-20">
          {/* Profile Image */}
          <div className="relative flex-shrink-0">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent dark:neon-border" />
              <Image
                src={personalInfo.profileImage}
                alt={personalInfo.name}
                fill
                className="rounded-2xl object-cover grayscale"
                priority
              />
            </div>
          </div>

          {/* Hero Content */}
          <div className="flex-1 text-center lg:text-left">
            <p className="text-primary font-medium mb-2 tracking-wide uppercase text-sm">
              {t("frontEndArchitect")}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight text-balance">
              {personalInfo.name}
            </h1>
            
            {/* Contact Details */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-muted-foreground mb-8">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 hover:text-primary transition-colors link-underline"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm">{personalInfo.email}</span>
              </a>
              <span className="hidden sm:inline text-border">|</span>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">
                  {personalInfo.location.city}, {personalInfo.location.country}
                </span>
              </div>
              <span className="hidden sm:inline text-border">|</span>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{personalInfo.birthDate}</span>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <a
                href={personalInfo.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
              >
                <Linkedin className="w-4 h-4" />
                <span className="text-sm font-medium">LinkedIn</span>
              </a>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/50 text-primary">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm font-medium">{t("onlyFullRemote")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Career Description */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <span className="w-8 h-0.5 bg-primary rounded-full" />
            {t("career")}
          </h2>
          <p className="text-muted-foreground leading-relaxed text-pretty max-w-4xl text-lg">
            {t("careerDescription")}
          </p>
        </div>

        {/* Degrees & Milestones Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Degrees */}
          <div className="bg-card border border-border rounded-xl p-6 card-interactive">
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
              <GraduationCap className="w-5 h-5 text-primary" />
              {t("degrees")}
            </h3>
            <div className="space-y-6">
              {degrees.map((degree, index) => (
                <div key={index} className="relative pl-6 border-l-2 border-primary/30">
                  <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-primary" />
                  <p className="font-semibold text-foreground">
                    {degree.title[language as Language]}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {degree.institution}
                  </p>
                  <span className="inline-block mt-2 text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                    {degree.year}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Milestones */}
          <div className="bg-card border border-border rounded-xl p-6 card-interactive">
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Award className="w-5 h-5 text-primary" />
              {t("professionalMilestones")}
            </h3>
            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start gap-4">
                  <span className="flex-shrink-0 text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                    {milestone.year}
                  </span>
                  <p className="text-muted-foreground">
                    {milestone.title[language as Language]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hobbies */}
        <div className="bg-card border border-border rounded-xl p-6 card-interactive">
          <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Heart className="w-5 h-5 text-primary" />
            {t("hobbies")}
          </h3>
          <div className="flex flex-wrap gap-3">
            {hobbies.map((hobby) => {
              const Icon = hobbyIcons[hobby] || Heart;
              return (
                <div
                  key={hobby}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  title={hobby}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm capitalize">{hobby}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InformationSection;
