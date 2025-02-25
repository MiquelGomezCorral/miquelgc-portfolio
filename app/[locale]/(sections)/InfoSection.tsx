
import { IconLGlowingLink, IconCopy, IconGlowingCopy, IconGlowingButton } from "@/app/[locale]/(utils)/(components)/IconsButtons";
import { Location, Email, Github, GithubLink, Linkedin, LinkedinLink, Curriculum, CurriculumSiglas } from "@/app/[locale]/(utils)/(constants)/constants.text.d"
import { DownloadCV } from "@/app/[locale]/(utils)/(components)/Utils";
import { WritingText } from "@/app/[locale]/(utils)/(components)/TypingText";
import { Foto } from "@/app/[locale]/(utils)/(components)/Foto";
import GlowingText from "@/app/[locale]/(utils)/(components)/GlowingText";
import initTranslations from "@/app/i18n"
import { qualitiesEN, qualitiesES} from "@/app/[locale]/(utils)/(constants)/infosSection.text"

const i18nNamespaces = ["info-section"]

export default async function InfoSection({ params }: { params: { locale: string } }) {
  const {t} = await initTranslations(params.locale, i18nNamespaces)
  
  return (
    <section id="Info-Section" className='w-full flex flex-col xl:flex-row-reverse justify-between items-center gap-24 xl:gap-10'>
      <Foto />

      <aside className="flex flex-col gap-6 max-w-3xl text-center xl:text-start">
        <h1 className='text-3xl sm:text-5xl flex flex-col md:flex-row justify-center xl:justify-start gap-4 font-bold whitespace-nowrap'>
          {t("salute")} <GlowingText>Miquel Gómez!</GlowingText>
        </h1>
        <h2 className="text-lg sm:text-2xl flex justify-center items-center xl:justify-start gap-2 text-nowrap overflow-hidden">
          {t("student")}  
          <GlowingText> 
            <WritingText list={params.locale === "en" ? qualitiesEN : qualitiesES}/> <WritingBar /> 
          </GlowingText>
        </h2>
        <p className="text-sm sm:text-base text-miquel-white-500 flex flex-col gap-2">
          <span >
            <IconCopy
              src="location-pin" title={Location}
              width={20} height={20}
              copyText={Location}
              text={Location}
            />
          </span>

          {t("description")}
        </p>


        <footer className="flex flex-wrap justify-center xl:justify-start gap-4">
          <DownloadCV>
            <IconGlowingButton
              src="download-document" title={Curriculum}
              width={20} height={20}
              text={CurriculumSiglas}
              solid
            />
          </DownloadCV>
          <IconGlowingCopy
            src="email" title={Email}
            width={20} height={20}
            copyText={Email}
            text={Email}
          />
          <IconLGlowingLink
            src="linkedin" title={Linkedin}
            width={20} height={20}
            link={LinkedinLink}
            blank
          />
          <IconLGlowingLink
            src="github" title={Github}
            width={20} height={20}
            link={GithubLink}
            blank
          />
        </footer>
      </aside>
    </section>
  )
}

function WritingBar() {
  return (
    <span className="duration-200 animate-fade-in-out">
      |
    </span>
  )
}

