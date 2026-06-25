import initTranslations from "@/app/i18n";
import { projectNameSpaces } from "@/app/[locale]/(utils)/(constants)/nameSpaces.d"

import { Section } from '@/app/[locale]/(utils)/(components)/Section';
import { SeeMoreProject, Project } from "@/app/[locale]/projects/elements";
import { getGithubProjects } from "@/app/[locale]/(utils)/(constants)/github-projects";
import CONFIG from "@/app/[locale]/(utils)/(constants)/configuration";


// import { getProjects } from "@/app/[locale]/(utils)/(constants)/project.text.d";

const i18nNamespaces = projectNameSpaces
export default async function Projects({ params }: { params: any }) {
  const { locale } = await params;
  const { t } = await initTranslations(locale, i18nNamespaces);
  // const ProjectS = Object.values(getProjects(t))
  const Projects = await getGithubProjects(locale as "en" | "es", t)

  return (
    <Section id={t("id")} title={t("title")} iconName={t("icon")} link="/projects" classname="group/proyects">
    
      <main className="flex flex-col justify-center gap-6">
        {Projects.slice(0, CONFIG.numProjectsLanding).map((object, idx) =>
          <Project key={idx} object={object}/>
        )}
      </main>
      
      <SeeMoreProject object={Projects[Math.min(CONFIG.numProjectsLanding, Projects.length - 1)]} text={t("see-more")} />

    </Section>
  )
}

