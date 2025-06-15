"use client"

import { ButtonLink } from "@/app/[locale]/(utils)/(components)/ButtonLink";
import { IconLink } from "./Icons";
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
        <ButtonLink link="#header" notAddToStack stayPage className="group-hover/arrow:opacity-100">
          {t("up")}
        </ButtonLink>
      </div>

      { (currentPage === "/projects") ?
        <ButtonLink link="/">
          {t("discover")}
        </ButtonLink>
        :
        <ButtonLink link="/projects">
          {t("projects")}
        </ButtonLink>
      }
    </>
  )
}