

import { notFound } from "next/navigation"
import initTranslations from "@/app/i18n"
import TranslationsProvider from "@/app/[locale]/(utils)/TranslationsProvider"
import {projectNameSpaces} from "@/app/[locale]/(utils)/(constants)/nameSpaces.d"

import { ProjectPageTemplate } from "@/app/[locale]/projects/project_template"
// import { getProjects } from "@/app/[locale]/(utils)/(constants)/project.text.d"
import { getGithubProjects } from "@/app/[locale]/(utils)/(constants)/github-projects"

const i18nNamespaces = projectNameSpaces
const locales = ["en", "es"] as const

export default async function ProjectPage({ params }: { params: any }) {
  const { locale, slug } = await params
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  const Projects = await getGithubProjects(locale, t)
  const Project = Projects.find(p => p.link.endsWith(`/${slug}`))
  if (!Project) notFound()
    
  return (
      <TranslationsProvider
        namespaces={i18nNamespaces}
        locale={locale}
        resources={resources}
      >
        <ProjectPageTemplate object={Project} t={t} params={{locale: locale}}/>
      </TranslationsProvider>
    )
}

export async function generateStaticParams() {
  const { t } = await initTranslations('en', i18nNamespaces);
  const projects = await getGithubProjects("en", t); // Use a dummy translation function for generating static params
  return locales.flatMap(locale =>
    projects.map(p => ({ locale, slug: p.link.split("/").pop()! }))
  )
}
