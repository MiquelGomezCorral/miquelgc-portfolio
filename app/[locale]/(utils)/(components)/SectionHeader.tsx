// import cn from "classnames"

import GlowingText from "@/app/[locale]/(utils)/(components)/GlowingText";
import { Icon } from "@/app/[locale]/(utils)/(components)/IconsButtons";

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