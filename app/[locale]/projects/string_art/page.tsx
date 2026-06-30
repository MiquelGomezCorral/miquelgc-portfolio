import initTranslations from "@/app/i18n"
import TranslationsProvider from "@/app/[locale]/(utils)/TranslationsProvider"
import {projectNameSpaces} from "@/app/[locale]/(utils)/(constants)/nameSpaces.d"

import { ProjectPageTemplate } from "@/app/[locale]/projects/project_template"
import { getProjects } from "@/app/[locale]/(utils)/(constants)/project.text.d"

import { StringArtComponent } from "@/app/[locale]/projects/string_art/string_art";
import NotFound from "@/app/[locale]/projects/[slug]/not-found";

const i18nNamespaces = projectNameSpaces
export default async function ProjectPage({ params }: { params: any }) {
  const { locale } = await params;
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  const Projects = getProjects(t)
  const StringArt = Projects.find((project) => project.id === "string-art")
  return(
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      {StringArt ? (
        <ProjectPageTemplate object={StringArt} t={t} params={{locale: locale}} headerDisplay={<StringArtComponent/>}/>
      ) : (
        <NotFound />
      )}
    </TranslationsProvider>
  )
}

