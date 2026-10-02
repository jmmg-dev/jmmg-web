"use server";
import { PersonalInfo } from "@/models/interfaces";
import { InformationDict } from "@/models/types";
import {
  AlertTriangle,
  Calendar,
  Download,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";
import Image from "next/image";

export const Hero = async ({
  dict,
  personalInfo,
}: {
  dict: InformationDict;
  personalInfo: PersonalInfo;
}) => {
  return (
    <div className="relative rounded-2xl overflow-hidden mb-20">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg-dark.webp"
          alt="Web Architecture Background"
          fill
          className="object-cover hidden dark:block"
          priority
          fetchPriority="high"
        />
        <Image
          src="/images/hero-bg-light.webp"
          alt="Web Architecture Background"
          fill
          className="object-cover block dark:hidden"
          priority
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/100 via-background/90 to-background/10" />
      </div>
      <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start gap-12 p-8 lg:p-12">
        <div className="relative flex-shrink-0 animate-fade-in-up opacity-0">
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-70 lg:h-70">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent dark:neon-border" />
            <Image
              src="/images/photo.webp"
              alt={personalInfo.name}
              fill
              className="rounded-2xl object-cover grayscale"
              priority
              fetchPriority="high"
            />
          </div>
        </div>

        <div className="flex-1 text-center lg:text-left ">
          <p
            className="text-primary text-2xl font-medium mb-2 tracking-wide uppercase animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.15s" }}
          >
            {dict.hero.frontEndArchitect}
          </p>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight text-balance animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.3s" }}
          >
            {personalInfo.name}
          </h1>

          <div
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-foreground mb-8 animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.45s" }}
          >
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

          <div
            className="flex flex-wrap items-center justify-center lg:justify-start gap-3 animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="flex items-center gap-3">
              <a
                href="/cv-juan-manuel-munoz-gonzalez.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">CV.pdf</span>
              </a>
              <a
                href={personalInfo.urlIn}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/50 bg-transparent text-primary hover:bg-primary/10 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span className="text-sm font-medium">LinkedIn</span>
              </a>
            </div>
            <div className="flex items-center gap-2 text-primary dark:text-white">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm font-medium">
                {dict.hero.onlyFullRemote}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
