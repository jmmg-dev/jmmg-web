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

export const technicalSkills = [
  { name: "Angular", level: 95 },
  { name: "Angular Material", level: 90 },
  { name: "BackBone", level: 70 },
  { name: "BootStrap", level: 85 },
  { name: "Brain.js (AI)", level: 60 },
  { name: "CSS 3", level: 95 },
  { name: "Express", level: 80 },
  { name: "Full Rest", level: 90 },
  { name: "HTML 5", level: 95 },
  { name: "JavaScript", level: 95 },
  { name: "TypeScript", level: 95 },
  { name: "React", level: 85 },
  { name: "Node.js", level: 80 },
  { name: "NgRx", level: 90 },
  { name: "RxJS", level: 90 },
  { name: "Sass", level: 85 },
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
    2026: 70,
  },
  {
    skill: "English",
    2020: 40,
    2022: 50,
    2024: 55,
    2026: 65,
  },
];

export const languageSkills = [
  { name: "spanish", level: 100, isNative: true },
  { name: "english", level: 65, isNative: false },
];

export const businessSkills = [
  { name: "architecturalVision", level: 95 },
  { name: "standardsAndBestPractices", level: 95 },
  { name: "problemSolving", level: 90 },
  { name: "teamManagement", level: 85 },
];

export const experiences = [
  {
    company: "Vintegris",
    logo: "vintegris",
    startDate: "01/2023",
    endDate: null,
    role: {
      en: "Front End Architect. Design of the architecture and tech leadership of the Front End team.",
      es: "Arquitecto Front End. Diseño de la arquitectura y liderazgo técnico del equipo Front End.",
    },
    projects: [
      {
        name: "nebulaSUITE 2.0",
        description: {
          en: "Applications for digital certificate management. Design of microsite-based architecture using a proprietary component library and leadership in development. Distribution of Front End team tasks, code reviews, and establishment of work methodologies.",
          es: "Aplicaciones para la gestión de certificados digitales. Diseño de arquitectura basada en micrositios usando una librería de componentes propietaria y liderazgo en desarrollo. Distribución de tareas del equipo Front End, revisiones de código y establecimiento de metodologías de trabajo.",
        },
      },
    ],
    technologies: [
      "Angular",
      "BootStrap",
      "CSS 3",
      "Express",
      "Full Rest",
      "HTML 5",
      "Library Components",
      "NgRx",
      "Node Js",
      "RxJS",
      "Sass",
      "SPA (Micro-sites)",
    ],
  },
  {
    company: "Signicat",
    logo: "signicat",
    startDate: "07/2022",
    endDate: "01/2023",
    role: {
      en: "Front End Developer working on digital identity solutions.",
      es: "Desarrollador Front End trabajando en soluciones de identidad digital.",
    },
    projects: [
      {
        name: "Digital Identity Platform",
        description: {
          en: "Development of digital identity verification components and user authentication flows.",
          es: "Desarrollo de componentes de verificación de identidad digital y flujos de autenticación de usuarios.",
        },
      },
    ],
    technologies: ["Angular", "TypeScript", "RxJS", "NgRx", "SCSS", "REST APIs"],
  },
  {
    company: "Accenture",
    logo: "accenture",
    startDate: "11/2020",
    endDate: "07/2022",
    role: {
      en: "Front End Architect for multiple enterprise clients.",
      es: "Arquitecto Front End para múltiples clientes empresariales.",
    },
    projects: [
      {
        name: "Enterprise Solutions",
        description: {
          en: "Architecture design and implementation for various enterprise-level applications.",
          es: "Diseño e implementación de arquitectura para varias aplicaciones de nivel empresarial.",
        },
      },
    ],
    technologies: ["Angular", "React", "TypeScript", "Micro-frontends", "Design Systems"],
  },
  {
    company: "GoldenRace",
    logo: "goldenrace",
    startDate: "12/2019",
    endDate: "11/2020",
    role: {
      en: "Senior Front End Developer for gaming platform.",
      es: "Desarrollador Front End Senior para plataforma de gaming.",
    },
    projects: [
      {
        name: "Gaming Platform",
        description: {
          en: "Development of real-time gaming interfaces and betting platforms.",
          es: "Desarrollo de interfaces de gaming en tiempo real y plataformas de apuestas.",
        },
      },
    ],
    technologies: ["Angular", "WebSockets", "Canvas", "TypeScript", "RxJS"],
  },
];

export const publications = [
  {
    title: "CRUD Angular + NgRx with signals",
    date: "01/2026",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20pantalla%202026-04-20%20084741-KnQrpjB0DboNg7P2iE9Otlv67Xx95Y.png",
    description: {
      en: "CRUD Angular + NgRx with Signals is a reference website and repository that shows how to build a complete CRUD application using Angular, NgRx, and Signals. It is aimed at junior and senior developers interested in architecture, state management, and recommended patterns. The project includes unit and end-to-end (E2E) tests.",
      es: "CRUD Angular + NgRx con Signals es un sitio web de referencia y repositorio que muestra cómo construir una aplicación CRUD completa usando Angular, NgRx y Signals. Está dirigido a desarrolladores junior y senior interesados en arquitectura, gestión de estado y patrones recomendados. El proyecto incluye pruebas unitarias y de extremo a extremo (E2E).",
    },
    websiteUrl: "https://crud-angular-ngrx-signals.vercel.app",
    githubUrl: "https://github.com/example/crud-angular-ngrx",
  },
  {
    title: "CSS Layout Lab",
    date: "10/2025",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20pantalla%202026-04-20%20084741-KnQrpjB0DboNg7P2iE9Otlv67Xx95Y.png",
    description: {
      en: "CSS Layout Lab is an interactive space to learn and experiment with the different ways of building layouts in CSS: from classic models like block and inline, to modern tools like flexbox and grid.",
      es: "CSS Layout Lab es un espacio interactivo para aprender y experimentar con las diferentes formas de construir layouts en CSS: desde modelos clásicos como block e inline, hasta herramientas modernas como flexbox y grid.",
    },
    websiteUrl: "https://css-layout-lab.vercel.app",
    githubUrl: null,
  },
];

export const degrees = [
  {
    title: { en: "Web Development Advanced Technician", es: "Técnico Superior en Desarrollo de Aplicaciones Web" },
    institution: "IES Campanillas",
    year: "2006",
  },
  {
    title: { en: "Computer Science Degree", es: "Ingeniería Técnica en Informática de Gestión" },
    institution: "Universidad de Málaga",
    year: "2008",
  },
];

export const milestones = [
  { year: "2024", title: { en: "First Front End Architecture from scratch", es: "Primera Arquitectura Front End desde cero" } },
  { year: "2023", title: { en: "Led team of 8 developers", es: "Lideré equipo de 8 desarrolladores" } },
  { year: "2022", title: { en: "Micro-frontend implementation", es: "Implementación de micro-frontends" } },
  { year: "2021", title: { en: "Design System creation", es: "Creación de Design System" } },
  { year: "2020", title: { en: "Angular certified developer", es: "Desarrollador certificado en Angular" } },
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
