"use client"

import { HeaderButtonLink } from "@/app/[locale]/(utils)/(components)/HeaderButton";
import { IconLink } from "./IconsButtons";
import { usePageStackStore } from "@/app/[locale]/(global_state)/state"

export function ArrowUp() {
  const { currentPage } = usePageStackStore()

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

      { (currentPage === "/projects") ?
        <HeaderButtonLink link="/">
          O... ¡Enterate bien de quién soy!
        </HeaderButtonLink>
        :
        <HeaderButtonLink link="/projects">
          O... ¡Mira mis proyectos!
        </HeaderButtonLink>
      }
    </>
  )
}