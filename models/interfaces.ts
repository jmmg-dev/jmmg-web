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
}

export interface ExperienceLabels {
  projects: string;
  technologies: string;
  currently: string;
}

export interface PublicationsLabels {
  intro: string;
}

export interface Information {
  nav: NavLabels;
  info: InfoLabels;
  skills: SkillsLabels;
  experience: ExperienceLabels;
  publications: PublicationsLabels;
  footer: string;
  personalInfo: PersonalInfo;
  professionalInfo: ProfessionalInfo;
}
