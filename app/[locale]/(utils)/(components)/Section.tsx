import cn from "classnames"

import { ButtonLink } from "@/app/[locale]/(utils)/(components)/ButtonsHeader";
import GlowingText from "@/app/[locale]/(utils)/(components)/GlowingText";
import { Icon } from "@/app/[locale]/(utils)/(components)/Icons";
import { Divider } from "@/app/[locale]/(utils)/(components)/Divider";


export function Section({id, title, iconName, link, classname, ...props}:{id: string, title: string, iconName: string, link?: string, classname?: string, children: React.ReactNode}){
  return(
    <section id={id} className={cn("w-full flex flex-col gap-6 group", classname)}>
      {
        link ? 
        <ButtonLink link={link} className="w-full">
          <SectionHeader title={title} iconName={iconName} adjustIcon/>
        </ButtonLink>
        :
        <SectionHeader title={title} iconName={iconName}/>
      }
      {props.children}
    </section>
  )
}

export function SectionHeader({title, iconName, adjustIcon}:{title: string, iconName: string, adjustIcon?: boolean}){
  return(
    <header className="w-full text-5xl text-balance font-bold flex-col gap-4">{/*  border-b-2 border-b-miquel-white-200/50 */}
      <section className="flex w-full gap-4">
        <GlowingText className="relative inline-block" adjust={adjustIcon}>
          <Icon 
            src={iconName}
            width={50}
            height={50}
            type="color"
            title={title}
          />
        </GlowingText>
        {title}
      </section>

      <Divider />
    </header>
  )
}
