import { PROJECTS } from "@/lib/projects";
import { Lang } from "@/models/enums";
import type { ProjectsDict } from "@/models/types";
import { ProjectCard } from "./projectCard/ProjectCard";

export const ProjectsSection = ({ lang, dict }: { lang: Lang; dict: ProjectsDict }) => {
  return (
    <div id="projects">
      {PROJECTS.map((project, index) => (
        <ProjectCard key={project.id} project={project} lang={lang} dict={dict} index={index} />
      ))}
    </div>
  );
};
