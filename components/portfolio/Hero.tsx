"use server";
import { PersonalInfo } from "@/models/interfaces";
import { InformationDict } from "@/models/types";
import { AlertTriangle, Calendar, Linkedin, Mail, MapPin } from "lucide-react";
import Image from "next/image";

export const Hero = async ({
  dict,
  personalInfo,
}: {
  dict: InformationDict;
  personalInfo: PersonalInfo;
}) => {
  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 mb-20">
      <div className="relative flex-shrink-0">
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-70 lg:h-70">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent dark:neon-border" />
          <Image
            src="/images/profile.jpg"
            alt={personalInfo.name}
            fill
            className="rounded-2xl object-cover grayscale"
            priority
          />
        </div>
      </div>

      <div className="flex-1 text-center lg:text-left">
        <p className="text-primary text-2xl font-medium mb-2 tracking-wide uppercase">
          {dict.hero.frontEndArchitect}
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight text-balance">
          {personalInfo.name}
        </h1>

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
              {personalInfo.city}, {personalInfo.country}
            </span>
          </div>
          <span className="hidden sm:inline text-border">|</span>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">{personalInfo.date}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
          <a
            href={personalInfo.urlIn}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <Linkedin className="w-4 h-4" />
            <span className="text-sm font-medium">LinkedIn</span>
          </a>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/50 text-primary">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm font-medium">
              {dict.hero.onlyFullRemote}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
