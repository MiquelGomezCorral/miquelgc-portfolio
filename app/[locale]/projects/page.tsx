
import { ProjectsSearch } from "./ProjectsSearch";
import Header from "@/app/[locale]/(sections)/Header";
import Footer from "@/app/[locale]/(sections)/Footer";

import initTranslations from "@/app/i18n"
import TranslationsProvider from "@/app/[locale]/(utils)/TranslationsProvider"
import { projectNameSpaces } from "@/app/[locale]/(utils)/(constants)/nameSpaces.d"
import { getGithubProjects } from "@/app/[locale]/(utils)/(constants)/github-projects";

const i18nNamespaces = projectNameSpaces
export default async function ProjectsPage({ params }: { params: any }) {
  const { locale } = await params;
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  // const Projects = Object.values(getProjects(t))
  const Projects = await getGithubProjects(locale, t, "main")
  const Others = await getGithubProjects(locale, t, "other")
  
  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <Header />

      <main className="max-w-[110rem] w-full flex flex-col gap-16 px-4 md:px-10 xl:px-48 2xl:px-64">
        <section className="w-full h-full flex flex-col gap-6 bg-miquel-background text-white ">
          <header className="w-full pb-20 flex justify-center">
            <h1 
              className="text-6xl sm:text-8xl font-bold 
              bg-[length:200%_100%] bg-gradient-to-r from-miquel-blue-400 via-indigo-700 to-miquel-blue-400 
              bg-clip-text text-transparent animate-shimmer pb-2"
            > 
              {t("title")}
            </h1>
          </header>

          <ProjectsSearch main={Projects} others={Others} locale={locale} />
        </section>
      </main>

      <div id="footer" className="w-full bg-gradient-to-b from-miquel-background to-black flex justify-center ">
        <Footer params={{locale: locale}}/>
      </div>
    </TranslationsProvider>
  )
}


