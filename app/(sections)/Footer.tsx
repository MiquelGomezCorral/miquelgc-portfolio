
import { IconLink, IconCopy, Icon} from "@/app/(utils)/(components)/IconsButtons";
import { DownloadCV } from "@/app/(utils)/(components)/Utils";
import { Curriculum, Email, Github, GithubLink, Linkedin, LinkedinLink } from "@/app/(utils)/(constants)/constants.d";
import { GoBackButton } from '@/app/(utils)/(components)/GoBackButton';
import { FormSendEmail } from "@/app/(utils)/(components)/FormSendEmail";
import GlowingText from "@/app/(utils)/(components)/GlowingText";

export default function Footer() {

  
  return (
    <footer id="footer" className="pt-10 w-full grid grid-rows-1 grid-cols-11">
      
      <main className="col-span-4 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-6 p-4">
          <header className="flex flex-col gap-2"> 
            <h1 className="flex gap-1 text-4xl font-bold">Ponte en contacto<GlowingText bold>!</GlowingText></h1>
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
      </main>

      <section className="col-start-5 w-full h-full">
        <GoBackButton />
      </section>

      <section className="col-span-4 col-start-8 w-full h-full">
        <FormSendEmail/>
      </section>


    </footer>
  )
}