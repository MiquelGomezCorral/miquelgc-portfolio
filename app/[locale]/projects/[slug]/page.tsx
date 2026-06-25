

import { notFound } from "next/navigation"
import initTranslations from "@/app/i18n"
import TranslationsProvider from "@/app/[locale]/(utils)/TranslationsProvider"
import {projectNameSpaces} from "@/app/[locale]/(utils)/(constants)/nameSpaces.d"

import { ProjectPageTemplate } from "@/app/[locale]/projects/project_template"
// import { getProjects } from "@/app/[locale]/(utils)/(constants)/project.text.d"
import { getGithubProjects } from "@/app/[locale]/(utils)/(constants)/github-projects"

const i18nNamespaces = projectNameSpaces
export default async function ProjectPage({ params }: { params: any }) {
  const { locale, slug } = await params
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  const projects = await getGithubProjects(locale, t)
  const project = projects.find(p => p.link.endsWith(`/${slug}`))
  if (!project) notFound()
    
  return (
      <TranslationsProvider
        namespaces={i18nNamespaces}
        locale={locale}
        resources={resources}
      >
        <ProjectPageTemplate object={project} t={t} params={{locale: locale}}/>
      </TranslationsProvider>
    )
}

export async function generateStaticParams() {
  const { t, resources } = await initTranslations('en', i18nNamespaces);
  const projects = await getGithubProjects("en", t); // Use a dummy translation function for generating static params
  return projects.map(p => ({ slug: p.link.split("/").pop()! }))
}
