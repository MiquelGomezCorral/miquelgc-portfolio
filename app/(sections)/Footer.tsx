import { IconLink, IconCopy, Icon} from "../(utils)/(components)/IconsButtons";
import { DownloadCV } from "../(utils)/(components)/Utils";
import { Curriculum, Email, Github, GithubLink, Linkedin, LinkedinLink } from "../(utils)/(constants)/constants.d";

export default function Footer() {
  return (
    <footer className="pt-20 w-full flex justify-between gap-10">
      <div className="w-full border rounded-xl p-4 ">
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
      </div>
      <nav className="flex flex-col gap-4 p-4 border rounded-xl min-w-72 text-xs">
        <DownloadCV>
          <Icon 
            src="download-document" title={Curriculum}
            width={20} height={20}  
            text={Curriculum}
          />
        </DownloadCV>
        <IconCopy 
          src="email" title={Email}
          width={20} height={20} 
          copyText={Email}
          text={Email}
        />
        <IconLink 
          src="linkedin" title={Linkedin}
          width={20} height={20}  
          link={LinkedinLink}
          text={Linkedin}
          blank         
          />
        <IconLink 
          src="github" title={Github}
          width={20} height={20} 
          link={GithubLink}            
          text={Github}
          blank         
        />
      </nav>
    </footer>
  )
}