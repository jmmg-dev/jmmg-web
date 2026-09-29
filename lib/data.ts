export const personalInfo = {
  name: "Juan Manuel Muñoz González",
  email: "jmmugoz@gmail.com",
  birthDate: "15/05/1984",
  location: {
    city: "Málaga",
    country: "Spain",
  },
  linkedIn: "https://www.linkedin.com/in/juanmamunoz/",
  profileImage: "/images/profile.jpg",
};

export const technicalSkillGroups = [
  {
    id: "skillsGroupArchitectureMicrofrontend",
    skills: [
      { name: "Design System", level: 97 },
      { name: "Module Federation (Webpack & Vite)", level: 95 },
      { name: "Single-spa.js", level: 95 },
    ],
  },
  {
    id: "skillsGroupArchitectureMonolith",
    skills: [{ name: "Nx", level: 80 }],
  },
  {
    id: "skillsGroupAngular",
    skills: [
      { name: "Angular", level: 95 },
      { name: "Angular Material", level: 90 },
      { name: "NgRx", level: 95 },
      { name: "RxJS", level: 90 },
      { name: "Signals", level: 95 },
      { name: "SSR", level: 90 },
      { name: "Standalone Components", level: 95 },
    ],
  },
  {
    id: "skillsGroupReact",
    skills: [
      { name: "Next.js", level: 90 },
      { name: "React", level: 85 },
      { name: "Redux", level: 85 },
      { name: "Server Components", level: 90 },
      { name: "shadcn/ui", level: 92 },
      { name: "SSR", level: 93 },
    ],
  },
  {
    id: "skillsGroupOthers",
    skills: [
      { name: "BackBone", level: 80 },
      { name: "Vue.js", level: 85 },
    ],
  },
  {
    id: "skillsGroupStyles",
    skills: [
      { name: "BootStrap", level: 95 },
      { name: "CSS 3", level: 90 },
      { name: "Less", level: 91 },
      { name: "Sass", level: 92 },
      { name: "Tailwind", level: 85 },
    ],
  },
  {
    id: "skillsGroupBack",
    skills: [
      { name: "Express", level: 77 },
      { name: "NestJS", level: 75 },
      { name: "Slim (PHP)", level: 75 },
    ],
  },
  {
    id: "skillsGroupInfra",
    skills: [
      { name: "AWS", level: 70 },
      { name: "Azure", level: 65 },
      { name: "GitHub", level: 90 },
      { name: "GitLab", level: 85 },
      { name: "Supabase", level: 70 },
      { name: "Vercel", level: 71 },
    ],
  },
  {
    id: "skillsGroupAI",
    skills: [
      { name: "Claude Code", level: 95 },
      { name: "GitHub Copilot", level: 90 },
      { name: "MCP", level: 85 },
      { name: "Prompt Engineering", level: 90 },
      { name: "Skill Creation", level: 85 },
    ],
  },
  {
    id: "skillsGroupDoc",
    skills: [
      { name: "Confluence", level: 90 },
      { name: "Excalidraw", level: 92 },
      { name: "PlantUML", level: 91 },
    ],
  },
];

export const professionalGrowthData = [
  {
    skill: "Architecture",
    2020: 0,
    2022: 70,
    2024: 90,
    2026: 95,
  },
  {
    skill: "Micro-frontends",
    2020: 70,
    2022: 80,
    2024: 90,
    2026: 85,
  },
  {
    skill: "Technical leadership",
    2020: 75,
    2022: 80,
    2024: 85,
    2026: 90,
  },
  {
    skill: "Best practices",
    2020: 80,
    2022: 90,
    2024: 95,
    2026: 90,
  },
  {
    skill: "UX/UI",
    2020: 70,
    2022: 75,
    2024: 80,
    2026: 85,
  },
  {
    skill: "JS frameworks",
    2020: 85,
    2022: 90,
    2024: 90,
    2026: 85,
  },
  {
    skill: "Applied AI",
    2020: 0,
    2022: 30,
    2024: 50,
    2026: 80,
  },
  {
    skill: "English",
    2020: 40,
    2022: 50,
    2024: 55,
    2026: 70,
  },
];

export const languageSkills = [
  { name: "spanish", level: 100, info: "languageInfoNative" },
  { name: "english", level: 70, info: "languageInfoProfessional" },
];

export const businessSkills = [
  { name: "architecturalVision", level: 95 },
  { name: "standardsAndBestPractices", level: 95 },
  { name: "problemSolving", level: 99 },
  { name: "teamManagement", level: 95 },
  { name: "technicalDecisions", level: 95 },
  { name: "technicalLeadership", level: 95 },
  { name: "technicalMentoring", level: 95 },
  { name: "uxUiSupport", level: 90 },
];

export const experiences = [
  {
    company: "Plexus",
    logoImage: "/images/companies/plexus.webp",
    startDate: "06/2026",
    endDate: null,
    role: {
      en: "Front End Architect",
      es: "Arquitecto Front End",
    },
    description: {
      en: "Leadership of the Front End architecture, including its documentation, technical support for the development team, and mentoring.",
      es: "Liderazgo de la arquitectura Front End, incluyendo su documentación, soporte técnico al equipo de desarrollo y mentorización.",
    },
    projects: [
      {
        name: "HotelBeds - Perfect Stay",
        description: {
          en: "Integration of Perfect Stay packages into the HotelBeds platform for HBX Group, the world's largest B2B bedbank, within a highly complex distributed architecture.",
          es: "Integración de los paquetes de Perfect Stay en la plataforma HotelBeds para HBX Group, la mayor B2B bedbank del mundo, dentro de una arquitectura distribuida de gran complejidad.",
        },
      },
      {
        name: "HotelBeds Rebranding",
        description: {
          en: "Led the Front End architecture behind HotelBeds' rebranding, supporting the rollout of the company's new brand identity and designs across the platform.",
          es: "Lideré la arquitectura Front End del rebranding de HotelBeds, dando soporte al despliegue de la nueva identidad de marca y diseños de la compañía en la plataforma.",
        },
      },
    ],
    technologies: [
      "PlantUML",
      "Confluence",
      "Module Federation",
      "System Design",
      "Nx",
      "Angular",
      "Angular Material",
    ],
  },
  {
    company: "Vintegris",
    logoImage: "/images/companies/vintegris.webp",
    startDate: "01/2023",
    endDate: "06/2026",
    role: {
      en: "Front End Architect",
      es: "Arquitecto Front End",
    },
    description: {
      en: "Design, documentation, and analysis of the architecture, plus tech leadership, mentoring, and technical support for the Front End team.",
      es: "Diseño, documentación y análisis de la arquitectura, además de liderazgo técnico, mentorización y soporte técnico al equipo Front End.",
    },
    projects: [
      {
        name: "nebulaSUITE 2.0",
        description: {
          en: "Applications for digital certificate management. Design of microsite-based architecture using a proprietary component library and leadership in development. Distribution of Front End team tasks, code reviews, and establishment of work methodologies.",
          es: "Aplicaciones para la gestión de certificados digitales. Diseño de la arquitectura basada en microsites mediante librería de componentes propia y liderazgo del desarrollo. Distribución del trabajo del equipo de Front End, code-review y establecimiento de metodologías de trabajo.",
        },
      },
    ],
    technologies: [
      "PlantUML",
      "Confluence",
      "Module Federation",
      "Single-spa.js",
      "System Design",
      "Angular",
      "NgRx",
      "RxJS",
      "Node Js",
      "Express",
      "BootStrap",
    ],
  },
  {
    company: "Signicat",
    logoImage: "/images/companies/signicat.webp",
    startDate: "07/2022",
    endDate: "01/2023",
    role: {
      en: "Front End Architect",
      es: "Front End Architect",
    },
    description: {
      en: "Design, refactoring, documentation, and analysis of the architecture, along with technical leadership, mentoring, and technical support for the three Front End teams.",
      es: "Diseño, refactorización, documentación y análisis de la arquitectura, junto con liderazgo técnico, mentorización y soporte técnico a los tres equipos de Front End.",
    },
    projects: [
      {
        name: "Signicat Products",
        description: {
          en: "Applications for digital certificate and facial recognition management. Design and refactoring of various identification products for Signicat. Training and code reviews for different Front End teams. Establishment of methodologies for achieving robust and scalable applications.",
          es: "Aplicaciones para la gestión de certificados digitales e identificación facial. Diseño y refactorización de los distintos productos de identificación de la compañía Signicat. Formación y code-review de los distintos equipos de Front End. Establecimiento de metodologías para la consecución de aplicaciones robustas y escalables.",
        },
      },
    ],
    technologies: [
      "PlantUML",
      "Confluence",
      "Angular",
      "Angular Material",
      "NgRx",
      "RxJS",
      "PrimeNg",
      "Webpack",
    ],
  },
  {
    company: "Accenture",
    logoImage: "/images/companies/accenture.webp",
    startDate: "11/2020",
    endDate: "07/2022",
    role: {
      en: "Front End Architect / Consulting Manager",
      es: "Front End Architect / Consultor manager",
    },
    description: {
      en: "Architecture design, documentation, and analysis, combined with technical consulting, mentoring, and technical support for development teams.",
      es: "Diseño, documentación y análisis de arquitectura, combinado con consultoría técnica, mentorización y soporte técnico a los equipos de desarrollo.",
    },
    projects: [
      {
        name: "Repsol Aria",
        description: {
          en: "Design and development of the architecture for the Aria platform, software responsible for managing Repsol's Big Data. Awarded in 2023 as the best Big Data platform by Expoquimia. Leadership of the Front End teams.",
          es: "Diseño y desarrollo de la arquitectura de la plataforma Aria, software encargado de la administración Big Data de Repsol. Premiada en 2023, como la mejor plataforma de Big Data por Expoquimia. Liderazgo de los equipos de Front End.",
        },
      },
      {
        name: "Vodafone IDM",
        description: {
          en: "Software responsible for managing identities on the platform. Design and solutions for the IDM architecture at Vodafone.",
          es: "Software encargado de la administración de identidades de la plataforma. Diseño y soluciones para la arquitectura IDM de Vodafone.",
        },
      },
      {
        name: "Santander Iberia Plus",
        description: {
          en: "Application that manages offers and bonuses for Santander clients. Front End architecture design and consulting.",
          es: "Aplicativo que gestiona ofertas y bonos para clientes del Santander. Diseño y consultoría de la Arquitectura Front End.",
        },
      },
    ],
    technologies: [
      "PlantUML",
      "Confluence",
      "System Design",
      "Angular",
      "Angular Material",
      "NgRx",
      "RxJS",
      "Vue.js",
    ],
  },
  {
    company: "Golden Race",
    logoImage: "/images/companies/golden.webp",
    startDate: "12/2019",
    endDate: "11/2020",
    role: {
      en: "Front End Senior",
      es: "Front End Senior",
    },
    description: {
      en: "Development of real-time betting and gaming applications, focused on performance and user experience.",
      es: "Desarrollo de aplicaciones de apuestas y juego en tiempo real, con foco en el rendimiento y la experiencia de usuario.",
    },
    projects: [
      {
        name: "Games 2.0",
        description: {
          en: "Online and retail gambling video games. Development of new games and maintenance of existing ones using web technology, improving application performance through best development practices.",
          es: "Videojuegos de apuestas online y retail. Desarrollo de nuevos juegos y mantenimiento de los existentes mediante tecnología web, mejorando el rendimiento del aplicativo a través de buenas prácticas de desarrollo.",
        },
      },
    ],
    technologies: [
      "Angular",
      "RxJS",
      "RESTful API",
      "Web Socket",
      "CSS 3",
      "HTML 5",
      "Sass",
      "Angular Animations",
    ],
  },
  {
    company: "CMC",
    logoImage: "/images/companies/cmc.webp",
    startDate: "08/2017",
    endDate: "12/2019",
    role: {
      en: "Full Stack Developer",
      es: "Full Stack Developer",
    },
    description: {
      en: "Development and maintenance of banking applications for Unicaja Banco, leading the development team.",
      es: "Desarrollo y mantenimiento de aplicaciones bancarias para Unicaja Banco, liderando el equipo de desarrollo.",
    },
    projects: [
      {
        name: "Unicaja electronic forms",
        description: {
          en: "Development and maintenance of electronic forms for Unicaja Banco, coordinating the development team's tasks.",
          es: "Desarrollo y mantenimiento de los formularios electrónicos de Unicaja Banco, coordinando las tareas del equipo de desarrollo.",
        },
      },
    ],
    technologies: [
      "Angular",
      "RxJS",
      "RESTful API",
      "CSS 3",
      "HTML 5",
      "Sass",
      "DocPath",
    ],
  },
  {
    company: "Lambda Automotive",
    logoImage: "/images/companies/lambda.webp",
    startDate: "05/2014",
    endDate: "08/2017",
    role: {
      en: "Full Stack Developer",
      es: "Full Stack Developer",
    },
    description: {
      en: "Front End architecture design and development for Efiasistencia 2.0, a nationwide roadside assistance platform.",
      es: "Diseño y desarrollo de la arquitectura Front End de Efiasistencia 2.0, una plataforma de asistencia en carretera a nivel nacional.",
    },
    projects: [
      {
        name: "Efiasistencia 2.0",
        description: {
          en: "Application that centralizes roadside incidents for major insurance companies. Design of the Front End architecture and leadership in development, including the middleware layer for SOAP communications.",
          es: "Aplicativo que centraliza los siniestros en carretera de las principales compañías de seguro. Diseño de la arquitectura Front End y liderazgo del desarrollo, incluyendo la capa intermedia para las comunicaciones SOAP.",
        },
      },
    ],
    technologies: [
      "Angular",
      "RESTful API",
      "BackBone",
      "PHP",
      "SOAP",
      "API Google Maps",
      "Jquery",
      "Js",
      "CSS 3",
      "HTML 5",
      "Sass",
    ],
  },
  {
    company: "Delaware",
    logoImage: "/images/companies/delaware.webp",
    startDate: "06/2008",
    endDate: "05/2014",
    role: {
      en: "Full Stack Developer",
      es: "Full Stack Developer",
    },
    description: {
      en: "Development and maintenance of banking applications for Unicaja Banco.",
      es: "Desarrollo y mantenimiento de aplicaciones bancarias para Unicaja Banco.",
    },
    projects: [
      {
        name: "Unicaja electronic forms",
        description: {
          en: "Development and maintenance of electronic forms for Unicaja Banco.",
          es: "Desarrollo y mantenimiento de los formularios electrónicos de Unicaja Banco.",
        },
      },
    ],
    technologies: ["PHP", "Js", "HTML", "CSS", "DocPath"],
  },
  {
    company: "Isoft",
    logoImage: "/images/companies/isoft.webp",
    startDate: "05/2006",
    endDate: "06/2008",
    role: {
      en: "Junior Developer",
      es: "Desarrollador Junior",
    },
    description: {
      en: "Junior developer contributing to the development of healthcare management applications for the S.A.S.",
      es: "Desarrollador Junior, contribuyendo al desarrollo de aplicaciones de gestión sanitaria para el S.A.S.",
    },
    projects: [
      {
        name: "Isoft Sanidad",
        description: {
          en: "Healthcare management application. Development and implementation of software across multiple healthcare centers, supporting day-to-day clinical operations.",
          es: "Aplicativo de gestión sanitaria. Desarrollo e implementación del software en distintos centros sanitarios, dando soporte a la operativa clínica diaria.",
        },
      },
    ],
    technologies: [
      "Java",
      "PHP",
      "Js",
      "Jquery",
      "HTML",
      "CSS",
      "PowerBuilder",
    ],
  },
];

export const publications = [
  {
    title: "CRUD Angular + NgRx with signals",
    date: "01/2026",
    image: "/images/publications/crudngrx.webp",
    description: {
      en: "CRUD Angular + NgRx with Signals is a reference website and repository that shows how to build a complete CRUD application using Angular, NgRx, and Signals. It is aimed at junior and senior developers interested in architecture, state management, and recommended patterns. The project includes unit and end-to-end (E2E) tests.",
      es: "CRUD Angular + NgRx con Signals es una web y un repositorio de referencia que muestra cómo construir una aplicación CRUD completa utilizando Angular, NgRx y Signals. Está dirigido a desarrolladores junior y senior interesados en arquitectura, gestión de estado y patrones recomendados. El proyecto incluye pruebas unitarias y end-to-end (E2E).",
    },
    websiteUrl: "https://juanmamunoz.github.io/crud-ngrx-signals/#/login",
    githubUrl: "https://github.com/JuanmaMunoz/crud-ngrx-signals",
  },
  {
    title: "CSS Layout Lab",
    date: "10/2025",
    image: "/images/publications/layoutlab.webp",
    description: {
      en: "CSS Layout Lab is an interactive space to learn and experiment with the different ways of building layouts in CSS: from classic models like block and inline, to modern tools like flexbox and grid.",
      es: "CSS Layout Lab es un espacio interactivo para aprender y experimentar con las distintas formas de construir layouts en CSS: desde los modelos clásicos como block e inline, hasta herramientas modernas como flexbox y grid.",
    },
    websiteUrl: "https://juanmamunoz.github.io/css-layout-lab/#/home",
    githubUrl: null,
  },
  {
    title: "Signals Vs Subjects Vs NgRx",
    date: "06/2025",
    image: "/images/publications/signalvssubjects.webp",
    description: {
      en: "Signals vs Subjects vs NgRx is a documentation that analyzes the different tools available in Angular applications for managing data models. It provides a comparison between Signals, RxJS subjects, and NgRx, describing their main characteristics, advantages and disadvantages, as well as the most suitable use cases for each approach.",
      es: "Signals vs Subjects vs NgRx es una documentación que analiza las distintas herramientas disponibles en aplicaciones desarrolladas con Angular para la gestión de modelos de datos. Presenta una comparativa clara entre Signals, los subjects de RxJS y NgRx, destacando sus diferencias, casos de uso y ventajas.",
    },
    websiteUrl: "https://juanmamunoz.github.io/signalsVsRxJsVsNgRx/#/",
    githubUrl: null,
  },
  {
    title: "Play RxJS",
    date: "02/2025",
    image: "/images/publications/playrxjs.webp",
    description: {
      en: "Play RxJS is a friendly and interactive RxJS documentation that allows users to explore, in real time and through simple examples, the behavior of all operators and the main features of RxJS. It is aimed at both junior and senior developers.",
      es: "Play RxJS es una documentación interactiva y amigable de RxJS que permite al usuario comprobar, en tiempo real y mediante ejemplos sencillos, el funcionamiento de todos los operadores y las principales funcionalidades de RxJS. Está orientada tanto a desarrolladores junior como senior.",
    },
    websiteUrl: "https://juanmamunoz.github.io/playRxjs/#/home",
    githubUrl: null,
  },
];

export const degrees = [
  {
    title: {
      en: "Web Development Advanced Technician",
      es: "Técnico Superior en Desarrollo de Aplicaciones Web",
    },
    institution: "IES Campanillas",
    year: "2006",
  },
  {
    title: {
      en: "Computer Science Degree",
      es: "Ingeniería Técnica en Informática de Gestión",
    },
    institution: "Universidad de Málaga",
    year: "2008",
  },
];

export const milestones = [
  {
    year: "2024",
    title: {
      en: "First Front End Architecture from scratch",
      es: "Primera Arquitectura Front End desde cero",
    },
  },
  {
    year: "2023",
    title: {
      en: "Led team of 8 developers",
      es: "Lideré equipo de 8 desarrolladores",
    },
  },
  {
    year: "2022",
    title: {
      en: "Micro-frontend implementation",
      es: "Implementación de micro-frontends",
    },
  },
  {
    year: "2021",
    title: { en: "Design System creation", es: "Creación de Design System" },
  },
  {
    year: "2020",
    title: {
      en: "Angular certified developer",
      es: "Desarrollador certificado en Angular",
    },
  },
];

export const hobbies = [
  "hiking",
  "swimming",
  "gaming",
  "music",
  "cycling",
  "badminton",
  "travel",
];
