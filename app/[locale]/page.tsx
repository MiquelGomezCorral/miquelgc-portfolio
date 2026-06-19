
import InfoSection from "./(sections)/InfoSection"
import Projects from "./(sections)/Projects"
import Experience from "./(sections)/Experience"
import TechnologiesSection from "./(sections)/Technologies"
import StudiesSection from "./(sections)/Studies"
import CertificationsSection from "./(sections)/Certifications"
import Header from "@/app/[locale]/(sections)/Header";
import Footer from "@/app/[locale]/(sections)/Footer";
// import { useTranslation } from "react-i18next"
import initTranslations from "@/app/i18n"
import TranslationsProvider from "@/app/[locale]/(utils)/TranslationsProvider"
import { allNameSpaces } from "@/app/[locale]/(utils)/(constants)/nameSpaces.d"


const i18nNamespaces = allNameSpaces
export default async function App({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <Header />

      <main className="max-w-[110rem] w-full flex flex-col gap-16 px-4 md:px-10 xl:px-48 2xl:px-64">
        <InfoSection params={{locale: locale}}/>
        <Experience/> 
        <StudiesSection/> 
        <Projects params={{locale: locale}}/>
        <TechnologiesSection params={{locale: locale}}/>
        <CertificationsSection/> 
      </main>
      
      <div id="footer" className="w-full bg-gradient-to-b from-miquel-background to-black flex justify-center ">
        <Footer params={{locale: locale}}/>
      </div>
    </TranslationsProvider>
  )
}

