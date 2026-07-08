"use client"

import { ButtonLink } from "@/app/[locale]/(utils)/(components)/ButtonsHeader";
import { IconLink } from "./Icons";
import { usePathname } from "next/navigation"
import { useTranslation } from "react-i18next";

export function ArrowUp() {
  const pathname = usePathname()
  const {t} = useTranslation("footer")
  const isProjectsPage = pathname === "/projects" || pathname === "/es/projects"

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

      { isProjectsPage ?
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
