
import { Foto } from "@/app/[locale]/(utils)/(components)/Foto";
import { DownloadCV } from "@/app/[locale]/(utils)/(components)/Utils";
import GlowingText from "@/app/[locale]/(utils)/(components)/GlowingText";
import { WritingText } from "@/app/[locale]/(utils)/(components)/TypingText";
import { qualitiesEN, qualitiesES} from "@/app/[locale]/(utils)/(constants)/infosSection.text"
import { IconGlowingLink, IconCopy, IconGlowingCopy, IconGlowingButton } from "@/app/[locale]/(utils)/(components)/Icons";
import { Location, Email, Github, GithubLink, Linkedin, LinkedinLink, Curriculum, CurriculumSiglas } from "@/app/[locale]/(utils)/(constants)/constants.text.d"

import initTranslations from "@/app/i18n"
import { infoSectionNameSpaces } from "@/app/[locale]/(utils)/(constants)/nameSpaces.d"

const i18nNamespaces = infoSectionNameSpaces

export default async function InfoSection({ params }: { params: { locale: string } }) {
  const {t} = await initTranslations(params.locale, i18nNamespaces)
  
  return (
    <section id="Info-Section" className='w-full flex flex-col xl:flex-row-reverse justify-between items-center gap-24 xl:gap-10'>
      <Foto />

      <aside className="flex flex-col gap-6 max-w-3xl text-center xl:text-start">
        <h1 className='text-3xl sm:text-5xl text-balance flex flex-col md:flex-row justify-center xl:justify-start gap-4 font-bold whitespace-nowrap'>
          {t("salute")} <GlowingText>Miquel Gómez!</GlowingText>
        </h1>
        <h2 className="text-lg sm:text-2xl flex justify-center items-center xl:justify-start gap-2 text-nowrap overflow-hidden">
          {t("student")}  
          <GlowingText> 
            <WritingText list={params.locale === "en" ? qualitiesEN : qualitiesES}/> <WritingBar /> 
          </GlowingText>
        </h2>
        <p className="text-sm sm:text-base text-miquel-white-500 flex flex-col gap-2">
          <span>
            <IconCopy
              src="location-pin" title={Location}
              width={20} height={20}
              copyText={Location}
              text={Location}
            />
          </span>

          <span>
            {t("description").split(/(\*\*[^*]+\*\*)/).map((part: string, i: number) =>
              part.startsWith('**') && part.endsWith('**')
                ? <span key={i} className="font-bold text-miquel-white-200">{part.slice(2, -2)}</span>
                : part
            )}
          </span>
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
          <IconGlowingLink
            src="linkedin" title={Linkedin}
            width={20} height={20}
            link={LinkedinLink}
            blank
          />
          <IconGlowingLink
            src="github" title={Github}
            width={20} height={20}
            link={GithubLink}
            blank type="tech-white"
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

