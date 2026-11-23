"use server";
import { PersonalInfo } from "@/models/interfaces";
import { InformationDict } from "@/models/types";
import {
  AlertTriangle,
  // Calendar is the date of birth icon, hidden for now (see below)
  // Calendar,
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
    <div className="relative mb-20 overflow-hidden rounded-2xl">
      <div className="absolute inset-0">
        <Image
          src="/images/cv/hero-bg-dark.webp"
          alt="Web Architecture Background"
          fill
          className="hidden object-cover dark:block"
          priority
          fetchPriority="high"
        />
        <Image
          src="/images/cv/hero-bg-light.webp"
          alt="Web Architecture Background"
          fill
          className="block object-cover dark:hidden"
          priority
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/100 via-background/90 to-background/10" />
      </div>
      <div className="relative z-10 flex flex-col items-center gap-12 p-8 lg:flex-row lg:items-start lg:p-12">
        <div className="animate-fade-in-up relative flex-shrink-0 opacity-0">
          <div className="relative h-48 w-48 sm:h-56 sm:w-56 lg:h-70 lg:w-70">
            <div className="dark:neon-border absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent" />
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

        <div className="flex-1 text-center lg:text-left">
          <p
            className="animate-fade-in-up mb-2 text-2xl font-medium tracking-wide text-primary uppercase opacity-0"
            style={{ animationDelay: "0.15s" }}
          >
            {dict.hero.frontEndArchitect}
          </p>
          <h1
            className="animate-fade-in-up mb-6 text-4xl font-bold tracking-tight text-balance text-foreground opacity-0 sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "0.3s" }}
          >
            {personalInfo.name}
          </h1>

          <div
            className="animate-fade-in-up mb-8 flex flex-wrap items-center justify-center gap-4 text-foreground opacity-0 lg:justify-start"
            style={{ animationDelay: "0.45s" }}
          >
            <a
              href={`mailto:${personalInfo.email}`}
              className="link-underline flex items-center gap-2 transition-colors hover:text-primary"
            >
              <Mail className="h-4 w-4" />
              <span className="text-sm">{personalInfo.email}</span>
            </a>
            <span className="hidden text-border sm:inline">|</span>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">
                {personalInfo.city}, {personalInfo.country}
              </span>
            </div>
            {/* Date of birth, hidden for now
            <span className="hidden sm:inline text-border">|</span>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{personalInfo.date}</span>
            </div>
            */}
          </div>

          <div
            className="animate-fade-in-up flex flex-wrap items-center justify-center gap-3 opacity-0 lg:justify-start"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="flex items-center gap-3">
              <a
                href="/cv-juan-manuel-munoz-gonzalez.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download
                className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Download className="h-4 w-4" />
                <span className="text-sm font-medium">CV.pdf</span>
              </a>
              <a
                href={personalInfo.urlIn}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-primary/50 bg-transparent px-4 py-2 text-primary transition-colors hover:bg-primary/10"
              >
                <Linkedin className="h-4 w-4" />
                <span className="text-sm font-medium">LinkedIn</span>
              </a>
            </div>
            <div className="flex items-center gap-2 text-primary dark:text-white">
              <AlertTriangle className="h-4 w-4" />
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
