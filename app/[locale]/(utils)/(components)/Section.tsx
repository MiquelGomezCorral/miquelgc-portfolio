// import cn from "classnames"

import GlowingText from "@/app/[locale]/(utils)/(components)/GlowingText";
import { Icon } from "@/app/[locale]/(utils)/(components)/IconsButtons";


export function Section({id, title, iconName, ...props}:{id: string, title: string, iconName: string, children: React.ReactNode}){
  return(
    <section id={id} className="w-full flex flex-col gap-6 group">
      <SectionHeader title={title} iconName={iconName}/>
      {props.children}
    </section>
  )
}
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