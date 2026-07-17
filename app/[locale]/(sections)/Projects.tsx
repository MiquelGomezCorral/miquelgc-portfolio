import initTranslations from "@/app/i18n";
import { projectNameSpaces } from "@/app/[locale]/(utils)/(constants)/nameSpaces.d"

import { Section } from '@/app/[locale]/(utils)/(components)/Section';
import { SeeMoreProject, Project } from "@/app/[locale]/projects/elements";
import { getGithubProjects } from "@/app/[locale]/(utils)/(constants)/github-projects";
import CONFIG from "@/app/[locale]/(utils)/(constants)/configuration";


import { getProjects } from "@/app/[locale]/(utils)/(constants)/project.text.d";

const i18nNamespaces = projectNameSpaces
export default async function Projects({ params }: { params: any }) {
  const { locale } = await params;
  const { t } = await initTranslations(locale, i18nNamespaces);
  const ProjectsWeb = getProjects(t)
  const Projects = await getGithubProjects(locale as "en" | "es", t, "main")

  const bestProjects = [...ProjectsWeb, ...Projects].sort((a, b) => (b.relevancy ?? 0) - (a.relevancy ?? 0)).slice(0, CONFIG.numProjectsLanding)

  return (
    <Section id={t("id")} title={t("title")} iconName={t("icon")} link="/projects" classname="group/proyects" activeScale="bigButtons">
    
      <main className="flex flex-col justify-center gap-6">
        {bestProjects.map((object, idx) =>
          <Project key={idx} object={object}/>
        )}
      </main>
      
      <SeeMoreProject object={bestProjects[Math.min(CONFIG.numProjectsLanding, bestProjects.length - 1)]} text={t("see-more")} />

    </Section>
  )
}

