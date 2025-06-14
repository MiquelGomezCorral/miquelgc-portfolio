"use client"

import { HeaderButtonLink } from "@/app/[locale]/(utils)/(components)/HeaderButton";
import { IconLink } from "./IconsButtons";
import { usePageStackStore } from "@/app/[locale]/(global_state)/state"
import { useTranslation } from "react-i18next";

export function ArrowUp() {
  const { currentPage } = usePageStackStore()
  const {t} = useTranslation("footer")
  return(
    <>
      <div className="group/arrow">

        <figure className="w-full flex items-end justify-center animate-bounce transform duration-700">
          <IconLink
            link="#header"
            src="arrow-up" title={"Go up"}
            width={100} height={100}  
            notAddToStack
            stayPage
            hover
            className="group-hover/arrow:opacity-100"
          />
        </figure>
        <HeaderButtonLink link="#header" notAddToStack stayPage className="group-hover/arrow:opacity-100">
          {t("up")}
        </HeaderButtonLink>
      </div>

      { (currentPage === "/projects") ?
        <HeaderButtonLink link="/">
          {t("discover")}
        </HeaderButtonLink>
        :
        <HeaderButtonLink link="/projects">
          {t("projects")}
        </HeaderButtonLink>
      }
    </>
  )
}