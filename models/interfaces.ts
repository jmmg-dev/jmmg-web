export interface Hobbie {
  label: string;
  icon: string;
}

export interface PersonalInfo {
  name: string;
  date: string;
  city: string;
  country: string;
  urlIn: string;
  email: string;
  position: string;
  hobbies: Hobbie[];
}

export interface Degree {
  name: string;
  institution: string;
  endDate: number;
  startDate: number;
}

export interface Milestone {
  name: string;
  description: string;
  date: string;
}

export interface ProfessionalInfo {
  career: string;
  degrees: Degree[];
  milestones: Milestone[];
}

export interface NavLabels {
  projects: string;
  cv: string;
  information: string;
  skills: string;
  experience: string;
  publications: string;
}

export interface InfoLabels {
  hero: {
    frontEndArchitect: string;
    onlyFullRemote: string;
  };
  career: string;
  degrees: string;
  professionalMilestones: string;
  hobbies: string;
}

export interface SkillsLabels {
  technicalSkills: string;
  skillsGroupAngular: string;
  skillsGroupReact: string;
  skillsGroupOthers: string;
  skillsGroupBack: string;
  skillsGroupInfra: string;
  skillsGroupAI: string;
  skillsGroupDoc: string;
  skillsGroupStyles: string;
  skillsGroupArchitectureMonolith: string;
  skillsGroupArchitectureMicrofrontend: string;
  professionalGrowth: string;
  languages: string;
  businessSkills: string;
  architecturalVision: string;
  standardsAndBestPractices: string;
  problemSolving: string;
  teamManagement: string;
  technicalDecisions: string;
  technicalLeadership: string;
  technicalMentoring: string;
  uxUiSupport: string;
  spanish: string;
  english: string;
  languageInfoNative: string;
  languageInfoProfessional: string;
  growthArchitecture: string;
  growthMicrofrontends: string;
  growthTechnicalLeadership: string;
  growthBestPractices: string;
  growthDocumentation: string;
  growthMentoring: string;
  growthAppliedAI: string;
  growthEnglish: string;
}

export interface ExperienceLabels {
  projects: string;
  technologies: string;
  currently: string;
}

export interface PublicationsLabels {
  intro: string;
}

export interface ProjectsLabels {
  eyebrow: string;
  title: string;
  intro: string;
  visit: string;
  code: string;
  comingSoon: string;
  viewCv: string;
  cvTitle: string;
  discover: string;
  showcase: string;
  pause: string;
  play: string;
}

export interface HeroLabels {
  label: string;
  subtitle: string;
  architecture: {
    title: string;
    description: string;
  };
  ux: {
    title: string;
    description: string;
  };
  dev: {
    title: string;
    experience: string;
    skills: string;
  };
  ai: {
    title: string;
    control: string;
    productivity: string;
  };
  linkedin: string;
  email: string;
  cv: string;
  scroll: string;
}

export interface Information {
  nav: NavLabels;
  info: InfoLabels;
  skills: SkillsLabels;
  experience: ExperienceLabels;
  publications: PublicationsLabels;
  projects: ProjectsLabels;
  hero: HeroLabels;
  footer: string;
  footerConnect: string;
  personalInfo: PersonalInfo;
  professionalInfo: ProfessionalInfo;
}
