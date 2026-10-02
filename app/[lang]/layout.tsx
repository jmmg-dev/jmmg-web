import { Lang } from "@/models/enums";
import { Metadata } from "next";

type Props = {
  params: Promise<{ lang: Lang }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;

  const isEs = lang === Lang.es;

  return {
    title: isEs
      ? "Juan Manuel Muñoz González | Arquitecto Front End"
      : "Juan Manuel Muñoz González | Front End Architect",
    description: isEs
      ? "Portfolio de Juan Manuel Muñoz González, Arquitecto Front End con más de 20 años de experiencia liderando arquitecturas micro-frontend, sistemas a gran escala y desarrollo asistido por IA para empresas como Repsol, Accenture y HBX Group."
      : "Portfolio of Juan Manuel Muñoz González, Front End Architect with 20+ years of experience leading micro-frontend architectures, enterprise-scale systems, and AI-assisted development for companies like Repsol, Accenture, and HBX Group.",
    keywords: isEs
      ? [
          "Arquitecto Front End",
          "Micro-frontends",
          "Module Federation",
          "Angular",
          "Next.js",
          "React",
          "TypeScript",
          "Liderazgo Técnico",
          "Desarrollo Asistido por IA",
          "Arquitectura Empresarial",
        ]
      : [
          "Front End Architect",
          "Micro-frontends",
          "Module Federation",
          "Angular",
          "Next.js",
          "React",
          "TypeScript",
          "Technical Leadership",
          "AI-Assisted Development",
          "Enterprise Architecture",
        ],
    authors: [{ name: "Juan Manuel Muñoz González" }],
    creator: "Juan Manuel Muñoz González",
    openGraph: {
      type: "website",
      locale: isEs ? "es_ES" : "en_US",
      title: isEs
        ? "Juan Manuel Muñoz González | Arquitecto Front End"
        : "Juan Manuel Muñoz González | Front End Architect",
      description: isEs
        ? "Arquitecto Front End especializado en arquitecturas micro-frontend, liderazgo técnico y desarrollo asistido por IA."
        : "Front End Architect specializing in micro-frontend architectures, technical leadership, and AI-assisted development.",
      siteName: "JM Portfolio",
    },
    twitter: {
      card: "summary_large_image",
      title: isEs
        ? "Juan Manuel Muñoz González | Arquitecto Front End"
        : "Juan Manuel Muñoz González | Front End Architect",
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      languages: {
        "es-ES": "/es",
        "en-US": "/en",
      },
    },
  };
}

export default async function LangLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
