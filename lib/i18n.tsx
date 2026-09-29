"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type Language = "en" | "es";

type Translations = {
  [key: string]: {
    en: string;
    es: string;
  };
};

export const translations: Translations = {
  // Navigation
  information: { en: "Information", es: "Información" },
  skills: { en: "Skills", es: "Habilidades" },
  experience: { en: "Experience", es: "Experiencia" },
  publications: { en: "Publications", es: "Publicaciones" },

  // Title
  frontEndArchitect: { en: "Front End Architect", es: "Arquitecto Front End" },
  cv: { en: "CV", es: "CV" },

  // Information Section
  career: { en: "Career", es: "Carrera" },
  degrees: { en: "Degrees", es: "Estudios" },
  professionalMilestones: { en: "Professional Milestones", es: "Hitos Profesionales" },
  hobbies: { en: "Hobbies", es: "Hobbies" },
  onlyFullRemote: { en: "Only full-remote", es: "Solo full-remote" },

  // Career Description
  careerDescription: {
    en: "I have more than 20 years of experience in the software industry and have worked for major companies such as Repsol, Vodafone, Línea Directa, Banco Santander, among others. In many of these projects, I have been responsible for designing and leading the Front End architecture from scratch, which has allowed me to consolidate solid expertise in this field. My role has not only involved creating robust architectures, but also providing technical leadership to Front End development teams, establishing best practices to ensure the delivery of scalable, high-quality applications.",
    es: "Tengo más de 20 años de experiencia en la industria del software y he trabajado para grandes empresas como Repsol, Vodafone, Línea Directa, Banco Santander, entre otras. En muchos de estos proyectos, he sido responsable de diseñar y liderar la arquitectura Front End desde cero, lo que me ha permitido consolidar una sólida experiencia en este campo. Mi rol no solo ha involucrado la creación de arquitecturas robustas, sino también proporcionar liderazgo técnico a equipos de desarrollo Front End, estableciendo mejores prácticas para garantizar la entrega de aplicaciones escalables y de alta calidad.",
  },

  // Skills Section
  technicalSkills: { en: "Technical skills", es: "Habilidades técnicas" },
  skillsGroupAngular: { en: "Angular Ecosystem", es: "Ecosistema Angular" },
  skillsGroupReact: { en: "React Ecosystem", es: "Ecosistema React" },
  skillsGroupOthers: { en: "Other Frameworks JS", es: "Otros Frameworks JS" },
  skillsGroupBack: { en: "Back", es: "Back" },
  skillsGroupInfra: { en: "Infra", es: "Infra" },
  skillsGroupAI: { en: "AI", es: "IA" },
  skillsGroupStyles: { en: "Styles", es: "Estilos" },
  skillsGroupArchitectureMonolith: { en: "Monolithic Architecture", es: "Arquitectura Monolítica" },
  skillsGroupArchitectureMicrofrontend: { en: "Micro-frontend Architecture", es: "Arquitectura Micro-frontend" },
  professionalGrowth: { en: "Professional growth", es: "Crecimiento profesional" },
  languages: { en: "Languages", es: "Idiomas" },
  businessSkills: { en: "Business skills", es: "Habilidades de negocio" },
  architecturalVision: { en: "Architectural vision", es: "Visión arquitectónica" },
  standardsAndBestPractices: { en: "Standards and best practices", es: "Estándares y buenas prácticas" },
  problemSolving: { en: "Problem solving", es: "Resolución de problemas" },
  teamManagement: { en: "Team management", es: "Gestión de equipos" },
  technicalDecisions: { en: "Technical decisions", es: "Decisiones técnicas" },
  technicalLeadership: { en: "Technical leadership", es: "Liderazgo técnico" },
  technicalMentoring: { en: "Technical mentoring", es: "Mentorización técnica" },
  uxUiSupport: { en: "UX/UI support", es: "Soporte UX/UI" },
  spanish: { en: "Spanish", es: "Español" },
  english: { en: "English", es: "Inglés" },

  // Experience Section
  projects: { en: "Projects", es: "Proyectos" },
  technologies: { en: "Technologies", es: "Tecnologías" },
  currently: { en: "Currently", es: "Actualmente" },

  // Publications Section
  publicationsIntro: {
    en: "I have always been deeply grateful to all those developers who have selflessly shared their knowledge with the community. I owe a significant part of my professional training to many of them. In recent months, I have begun to share my own knowledge, thus contributing my small part to the community.",
    es: "Siempre he estado profundamente agradecido a todos aquellos desarrolladores que han compartido desinteresadamente su conocimiento con la comunidad. Debo una parte significativa de mi formación profesional a muchos de ellos. En los últimos meses, he comenzado a compartir mi propio conocimiento, contribuyendo así con mi pequeña parte a la comunidad.",
  },

  // Degrees
  degreeWebDev: { en: "Web Development Advanced Technician", es: "Técnico Superior en Desarrollo de Aplicaciones Web" },
  degreeComputerScience: { en: "Computer Science Degree", es: "Ingeniería Técnica en Informática de Gestión" },
  
  // Milestones
  milestone1: { en: "First Front End Architecture from scratch", es: "Primera Arquitectura Front End desde cero" },
  milestone2: { en: "Led team of 8 developers", es: "Lideré equipo de 8 desarrolladores" },
  milestone3: { en: "Micro-frontend implementation", es: "Implementación de micro-frontends" },
  milestone4: { en: "Design System creation", es: "Creación de Design System" },
  milestone5: { en: "Angular certified developer", es: "Desarrollador certificado en Angular" },
};

type I18nContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

type I18nProviderProps = {
  children: ReactNode;
};

export const I18nProvider = ({ children }: I18nProviderProps) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = useCallback(
    (key: string): string => {
      return translations[key]?.[language] || key;
    },
    [language]
  );

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
};
