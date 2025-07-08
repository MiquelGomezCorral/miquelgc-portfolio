
import initTranslations from "@/app/i18n"
import TranslationsProvider from "@/app/[locale]/(utils)/TranslationsProvider"
import { ProjectPageTemplate } from "@/app/[locale]/projects/project_template"
import { getProjects } from "@/app/[locale]/(utils)/(constants)/project.text.d"

const i18nNamespaces = ['projects', 'header', 'footer']
export default async function ProjectPage({ params }: { params: any }) {
  const { locale } = await params;
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  const {ProceduralAnimations} = getProjects(t)
  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <ProjectPageTemplate object={ProceduralAnimations} t={t} params={{locale: locale}}/>
    </TranslationsProvider>
  )
}