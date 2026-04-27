export interface Hobbie {
  label: string;
  icon: React.ElementType;
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
  title: string;
  description: string;
  date: number;
}

export interface skill {
  name: string;
  description?: string;
  value: number;
}

export interface Arquitecture {
  name: string;
  description: string;
  img: string;
}

export interface Publications {
  date: string;
  title: string;
  description: string;
  url: string;
  urlRepository: string;
  img: string;
}

export interface Proyect {
  title: string;
  description: string;
  client: string;
  technologies: string[];
}

export interface Experience {
  position: string;
  description: string;
  startDate: string;
  endDate: string;
  company: string;
  poyects: Proyect[];
}

export interface ProfessionalSkills {
  frontendEcosystem: skill[];
  legacyMaster: skill[];
  testsAutomation: skill[];
  communication: skill[];
  backend: skill[];
  uIEngineeringAndStyling: skill[];
  cloudAndDeployment: skill[];
  backendAsAService: skill[];
  versionControlAndCI: skill[];
  aIForDevelopment: skill[];
  arquitectures: Arquitecture[];
}

export interface ProfessionalInfo {
  career: string;
  degrees: Degree[];
  milestones: Milestone[];
  professionalSkills: ProfessionalSkills;
  businessSkills: skill[];
  languageSkills: skill[];
  experiences: Experience[];
}

export interface Information {
  personalInfo: PersonalInfo;
  professionalInfo: ProfessionalInfo;
  experiences: Experience[];
}
