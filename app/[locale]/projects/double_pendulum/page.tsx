
import { getProjects } from "@/app/[locale]/(utils)/(constants)/project.text.d"
import { ProjectPageTemplate } from "@/app/[locale]/projects/project_template"
import initTranslations from "@/app/i18n"
import TranslationsProvider from "@/app/[locale]/(utils)/TranslationsProvider"

const i18nNamespaces = ['projects', 'header']
export default async function ProjectPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  const {DoublePendulum} = getProjects(t)
  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <ProjectPageTemplate object={DoublePendulum} t={t}/>
    </TranslationsProvider>
  )
}