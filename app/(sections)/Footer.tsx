
import { IconLink, IconCopy, Icon} from "@/app/(utils)/(components)/IconsButtons";
import { DownloadCV } from "@/app/(utils)/(components)/Utils";
import { Curriculum, Email, Github, GithubLink, Linkedin, LinkedinLink } from "@/app/(utils)/(constants)/constants.d";
import { GoBackButton } from '@/app/(utils)/(components)/GoBackButton';
import { FormSendEmail } from "@/app/(utils)/(components)/FormSendEmail";
import GlowingText from "@/app/(utils)/(components)/GlowingText";
import Link from "next/link";
import { HeaderButtonLink } from "@/app/(utils)/(components)/HeaderButton";

export default function Footer() {

  
  return (
    <footer id="footer" className={
      "pt-10 pb-20 w-full grid md:grid-rows-1 md:grid-cols-11 grid-cols-1 md:gap-0 gap-4 max-w-[120rem] px-4 md:px-10 xl:px-48 2xl:px-64"
    }>
      
      <section className="md:col-span-4 flex items-center ">
        <div className="flex flex-col items-center justify-center gap-6 p-4">
          <header className="flex flex-col gap-2"> 
            <h1 className="flex gap-1 text-4xl font-bold text-nowrap">Ponte en contacto<GlowingText bold>!</GlowingText></h1>
            <p className="opacity-70">{"No seas tímido y dime algo ;)"}</p>
          </header>
          
          <nav className="flex flex-col gap-4 items-start w-full">
            <DownloadCV>
              <Icon 
                src="download-document" title={Curriculum}
                width={20} height={20}  
                text={Curriculum}
                hover color glowing
              />
            </DownloadCV>
            <IconCopy 
              src="email" title={Email}
              width={20} height={20} 
              copyText={Email}
              text={Email}
              color
              glowing
            />
            <IconLink 
              src="linkedin" title={Linkedin}
              width={20} height={20}  
              link={LinkedinLink}
              text={Linkedin}
              blank         
              color
              glowing
            />
            <IconLink 
              src="github" title={Github}
              width={20} height={20} 
              link={GithubLink}            
              text={Github}
              blank         
              color
              glowing
              className="gap-2"
            />
          </nav>
        </div>
      </section>

      <section className="md:col-start-5 md:col-span-2 w-full h-full md:flex hidden flex-col items-center justify-end gap-2 md:pb-16 ">
        <ArrowUp />
      </section>

      <section className="md:col-span-4 md:col-start-8 w-full h-full max-w-[30rem]">
        <FormSendEmail/>
      </section>

      <section className="md:col-start-5 md:col-span-2 w-full h-full flex md:hidden flex-col items-center justify-end gap-2 pt-10">
        <ArrowUp />

      </section>

    </footer>
  )
}

function ArrowUp() {
  return(
    <>
      <div className="group/arrow">

        <figure className="w-full flex items-end justify-center animate-bounce transform duration-700">
          <IconLink
            link=""
            src="arrow-up" title={"Go up" }
            width={100} height={100}  
            notAddToStack
            stayPage
            hover
            className="group-hover/arrow:opacity-100"
          />
        </figure>
        <HeaderButtonLink link="" notAddToStack stayPage className="group-hover/arrow:opacity-100">
          ¡Llevame arriba!
        </HeaderButtonLink>
      </div>

      <HeaderButtonLink link="/projects">
        O... ¡Mira mis proyectos!
      </HeaderButtonLink>
    </>
  )
}