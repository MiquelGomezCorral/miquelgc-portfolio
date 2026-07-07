import initTranslations from "@/app/i18n"
import { notFound } from "next/navigation"
import TranslationsProvider from "@/app/[locale]/(utils)/TranslationsProvider"
import {projectNameSpaces} from "@/app/[locale]/(utils)/(constants)/nameSpaces.d"

import { ProjectPageTemplate } from "@/app/[locale]/projects/project_template"
import { getProjects } from "@/app/[locale]/(utils)/(constants)/project.text.d"

import { SmokingComponent } from "@/app/[locale]/projects/smoking/smoking";

const i18nNamespaces = projectNameSpaces
export default async function ProjectPage({ params }: { params: any }) {
  const { locale } = await params;
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  const Projects = getProjects(t)
  const Smoking = Projects.find((project) => project.id === "smoking")
  if (!Smoking) notFound()

  return(
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <ProjectPageTemplate object={Smoking} t={t} params={{locale: locale}} headerDisplay={<SmokingComponent/>} stickyHeader/>
    </TranslationsProvider>
  )
}

