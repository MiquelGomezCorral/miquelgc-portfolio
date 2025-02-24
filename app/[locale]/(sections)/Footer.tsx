
import { IconLink, IconCopy, Icon} from "@/app/[locale]/(utils)/(components)/IconsButtons";
import { DownloadCV } from "@/app/[locale]/(utils)/(components)/Utils";
import { Curriculum, Email, Github, GithubLink, Linkedin, LinkedinLink } from "@/app/[locale]/(utils)/(constants)/constants.d";
import { FormSendEmail } from "@/app/[locale]/(utils)/(components)/FormSendEmail";
import GlowingText from "@/app/[locale]/(utils)/(components)/GlowingText";
import { ArrowUp } from "@/app/[locale]/(utils)/(components)/ArrowUp";

export default function Footer() {
  return (
    <footer id="footer" className={
      "pt-10 pb-20 w-full grid md:grid-rows-1 md:grid-cols-11 grid-cols-1 place-items-center md:gap-0 gap-4 max-w-[120rem] px-4 md:px-10 xl:px-48 2xl:px-64"
    }>
      
      <section className="md:col-span-4 flex md:justify-start justify-center items-center">
        <div className="flex flex-col items-center justify-center gap-6 p-4">
          <header className="flex flex-col md:items-start items-center gap-2"> 
            <h1 className="flex gap-1 text-4xl font-bold text-nowrap">Ponte en contacto<GlowingText bold>!</GlowingText></h1>
            <p className="opacity-70">{"No seas tímido y dime algo ;)"}</p>
          </header>
          
          <nav className="flex flex-col gap-4  md:items-start items-center w-full">
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

      <section className="w-full h-full flex md:hidden flex-col items-center justify-end gap-2 pt-10">
        <ArrowUp />

      </section>

    </footer>
  )
}

