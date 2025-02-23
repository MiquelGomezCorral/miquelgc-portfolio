"use client"

import { IconLink, IconCopy, Icon} from "@/app/(utils)/(components)/IconsButtons";
import { DownloadCV } from "@/app/(utils)/(components)/Utils";
import { Curriculum, Email, Github, GithubLink, Linkedin, LinkedinLink } from "@/app/(utils)/(constants)/constants.d";
import { GoBackButton } from '@/app/(utils)/(components)/GoBackButton';
import { FormSendEmail } from "@/app/(utils)/(components)/FormSendEmail";

export default function Footer() {

  
  return (
    <footer id="footer" className="pt-10 w-full flex justify-between gap-10">
      <GoBackButton />
      <FormSendEmail/>
      <div className="w-full border rounded-xl p-4 ">
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
      </div>
      <nav className="flex flex-col gap-4 p-4 border rounded-xl min-w-72 text-xs">
        <DownloadCV>
          <Icon 
            src="download-document" title={Curriculum}
            width={20} height={20}  
            text={Curriculum}
            hover
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