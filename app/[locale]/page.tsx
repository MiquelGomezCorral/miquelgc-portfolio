
import InfoSection from "./(sections)/InfoSection"
import Projects from "./(sections)/Projects"
import Experience from "./(sections)/Experience"
import TechnologiesSection from "./(sections)/Technologies"
import StudiesSection from "./(sections)/Studies"
// import { useTranslation } from "react-i18next"
import initTranslations from "../i18n"
import TranslationsProvider from "@/app/[locale]/(utils)/TranslationsProvider"

const i18nNamespaces = ["sections",'experiences'];
export default async function App({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const { resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <InfoSection/>
      <Experience/> 
      <StudiesSection/> 
      <Projects/>
      <TechnologiesSection/>
    </TranslationsProvider>
  )
}

