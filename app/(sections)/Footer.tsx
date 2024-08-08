import { IconLink, IconCopy} from "../(components)/IconsButtons";
import { Email, Github, GithubLink, Linkedin, LinkedinLink } from "../(constants)/constants.d";

export default function Footer() {
  return (
    <footer className="w-full flex justify-between gap-10">
      <div className="w-full border rounded-xl p-4 ">
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
      </div>
      <nav className="flex flex-col gap-4 p-4 border rounded-xl min-w-72 text-xs">
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