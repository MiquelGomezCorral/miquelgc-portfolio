import cn from "classnames"
import Link from "next/link"

import { HeaderButtonLink } from "@/app/[locale]/(utils)/(components)/HeaderButton";
import GlowingText from "@/app/[locale]/(utils)/(components)/GlowingText";
import { Icon } from "@/app/[locale]/(utils)/(components)/IconsButtons";


export function Section({id, title, iconName, link, classname, ...props}:{id: string, title: string, iconName: string, link?: string, classname?: string, children: React.ReactNode}){
  return(
    <section id={id} className={cn("w-full flex flex-col gap-6 group", classname)}>
      {
        link ? 
        <HeaderButtonLink link={link} className="w-full">
          <SectionHeader title={title} iconName={iconName}/>
        </HeaderButtonLink>
        :
        <SectionHeader title={title} iconName={iconName}/>
      }

      {props.children}
    </section>


  )
}

// <section id="projects" className="w-full flex flex-col gap-6 group/proyects">

//   <header className="w-full py-4 border-b-2 border-b-miquel-white-200/50">
//     <HeaderButtonLink link="/projects" className="text-5xl font-bold opacity-70 group-hover/proyects:opacity-100 transform duration-300 flex gap-2">
//         <GlowingText className="flex">
//           <Icon 
//             src={`html`}
//             width={50}
//             height={50}
//             type="color"
//             title={'Projects'}
//             />
//         </GlowingText>
//       {t("title")}
//     </HeaderButtonLink>
//   </header>
export function SectionHeader({title, iconName}:{title: string, iconName: string}){
  return(
    <header className="w-full py-4 border-b-2 border-b-miquel-white-200/50 text-5xl font-bold transform duration-300 flex gap-4">
      <GlowingText>
        <Icon 
          src={iconName}
          width={50}
          height={50}
          type="color"
          title={title}
        />
      </GlowingText>
      {title}
    </header>
  )
}
