import initTranslations from "@/app/i18n"
import TranslationsProvider from "@/app/[locale]/(utils)/TranslationsProvider"
import {projectPagesNameSpaces} from "@/app/[locale]/(utils)/(constants)/nameSpaces.d"

import { ProjectPageTemplate } from "@/app/[locale]/projects/project_template"
import { getProjects } from "@/app/[locale]/(utils)/(constants)/project.text.d"

const i18nNamespaces = projectPagesNameSpaces
export default async function ProjectPage({ params }: { params: any }) {
  const { locale } = await params;
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  const {Porfolio} = getProjects(t)
  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <ProjectPageTemplate object={Porfolio} t={t} params={{locale: locale}}/>
    </TranslationsProvider>
  )
}