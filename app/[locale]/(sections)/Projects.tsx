import initTranslations from "@/app/i18n";

import { Section } from '@/app/[locale]/(utils)/(components)/Section';
import { SeeMoreProject, Project } from "@/app/[locale]/projects/elements";
import { getProjects } from "@/app/[locale]/(utils)/(constants)/project.text.d";

const i18nNamespaces = ["projects"]
export default async function Projects({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const { t } = await initTranslations(locale, i18nNamespaces);
  const ProjectS = Object.values(getProjects(t))

  const num_project = 4
  return (
    <Section id={t("id")} title={t("title")} iconName={t("icon")} link="/projects" classname="group/proyects">
    
      <main className="flex flex-col justify-center gap-6">
        {ProjectS.slice(0,num_project).map((object, idx) =>
          <Project key={idx} object={object}/>
        )}
      </main>
      
      <SeeMoreProject object={ProjectS[num_project]} text={t("see-more")} />

    </Section>
  )
}

