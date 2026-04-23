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
      ? "Portfolio de Juan Manuel Muñoz González - Arquitecto Front End con más de 20 años de experiencia en desarrollo de software, especializado en Angular, React y arquitectura empresarial."
      : "Portfolio of Juan Manuel Muñoz González - Front End Architect with 20+ years of experience in software development, specializing in Angular, React, and enterprise architecture.",
    keywords: [
      "Front End Architect",
      "Angular",
      "React",
      "TypeScript",
      "JavaScript",
      "Software Architecture",
      isEs ? "Arquitectura de Software" : "Web Architecture",
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
        ? "Portfolio con más de 20 años de experiencia en desarrollo Front End"
        : "Portfolio showcasing 20+ years of Front End development experience",
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
